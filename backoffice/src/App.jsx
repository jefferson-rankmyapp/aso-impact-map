import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Navigate, useParams, useNavigate } from 'react-router-dom';
import { readData, writeData } from './lib/github.js';
import { validateData } from './lib/validation.js';

// ─── Auth ────────────────────────────────────────────────────────────────────

const PASS_KEY = 'aso_bo_auth';
const EXPECTED = import.meta.env.VITE_BACKOFFICE_PASSWORD || 'aso2026';

function Login({ onAuth }) {
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  function submit(e) {
    e.preventDefault();
    if (pw === EXPECTED) { sessionStorage.setItem(PASS_KEY, '1'); onAuth(); }
    else setErr('Senha incorreta.');
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#0f172a' }}>
      <form onSubmit={submit} style={{ background: '#1e293b', padding: 40, borderRadius: 12, minWidth: 320, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <h2 style={{ margin: 0, color: '#f1f5f9', fontSize: 20 }}>🗺️ ASO Backoffice</h2>
        <p style={{ margin: 0, color: '#94a3b8', fontSize: 13 }}>Acesso restrito à equipe RankMyApp.</p>
        <input
          type="password" placeholder="Senha" value={pw} onChange={e => { setPw(e.target.value); setErr(''); }}
          autoComplete="current-password"
          style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #334155', background: '#0f172a', color: '#f1f5f9', fontSize: 15 }}
          autoFocus
        />
        {err && <p style={{ margin: 0, color: '#f87171', fontSize: 13 }}>{err}</p>}
        <button type="submit" style={{ padding: '10px 0', borderRadius: 8, background: '#6366f1', color: '#fff', border: 'none', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>
          Entrar
        </button>
      </form>
    </div>
  );
}

// ─── Data Context ────────────────────────────────────────────────────────────

const DataCtx = createContext(null);
export function useData() { return useContext(DataCtx); }

function DataProvider({ children }) {
  const [data, setData] = useState(null);
  const [sha, setSha] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  const load = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const result = await readData();
      setData(result.data); setSha(result.sha);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const save = useCallback(async (newData, message) => {
    setSaving(true);
    try {
      const result = await writeData(newData, sha, message);
      setData(newData);
      setSha(result.content.sha);
      setLastSaved(new Date());
    } finally { setSaving(false); }
  }, [sha]);

  const validation = data ? validateData(data) : { errors: [], warnings: [], valid: true };

  return (
    <DataCtx.Provider value={{ data, sha, loading, error, saving, lastSaved, save, reload: load, validation }}>
      {children}
    </DataCtx.Provider>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const S = {
  layout: { display: 'flex', height: '100vh', background: '#0f172a', color: '#f1f5f9', fontFamily: 'system-ui, sans-serif', fontSize: 14 },
  sidebar: { width: 220, background: '#1e293b', display: 'flex', flexDirection: 'column', borderRight: '1px solid #334155', flexShrink: 0 },
  sidebarHeader: { padding: '20px 16px 12px', borderBottom: '1px solid #334155' },
  sidebarTitle: { margin: 0, fontSize: 15, fontWeight: 700, color: '#f1f5f9' },
  sidebarSub: { margin: '4px 0 0', fontSize: 11, color: '#64748b' },
  nav: { flex: 1, padding: '8px 0', display: 'flex', flexDirection: 'column' },
  navLink: { display: 'flex', alignItems: 'center', gap: 8, padding: '9px 16px', color: '#94a3b8', textDecoration: 'none', fontSize: 13, borderLeft: '2px solid transparent' },
  navLinkActive: { color: '#818cf8', borderLeftColor: '#6366f1', background: 'rgba(99,102,241,0.08)' },
  sidebarFooter: { padding: '12px 16px', borderTop: '1px solid #334155', fontSize: 11, color: '#64748b' },
  content: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  topbar: { padding: '14px 24px', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#1e293b' },
  page: { flex: 1, overflowY: 'auto', padding: 24 },
  card: { background: '#1e293b', borderRadius: 10, border: '1px solid #334155', padding: 20, marginBottom: 16 },
  h2: { margin: '0 0 16px', fontSize: 18, fontWeight: 700 },
  h3: { margin: '0 0 10px', fontSize: 15, fontWeight: 600 },
  label: { display: 'block', fontSize: 12, color: '#94a3b8', marginBottom: 4, fontWeight: 500 },
  input: { width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid #334155', background: '#0f172a', color: '#f1f5f9', fontSize: 13, boxSizing: 'border-box' },
  textarea: { width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid #334155', background: '#0f172a', color: '#f1f5f9', fontSize: 13, boxSizing: 'border-box', resize: 'vertical', minHeight: 80 },
  select: { width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid #334155', background: '#0f172a', color: '#f1f5f9', fontSize: 13 },
  btn: { padding: '7px 14px', borderRadius: 6, border: 'none', fontWeight: 600, fontSize: 13, cursor: 'pointer' },
  btnPrimary: { background: '#6366f1', color: '#fff' },
  btnDanger: { background: '#ef4444', color: '#fff' },
  btnSecondary: { background: '#334155', color: '#f1f5f9' },
  tag: { display: 'inline-block', padding: '2px 8px', borderRadius: 20, fontSize: 11, fontWeight: 600, marginRight: 4, marginBottom: 4 },
  badge: { display: 'inline-block', padding: '2px 7px', borderRadius: 20, fontSize: 11, fontWeight: 600 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 },
  row: { display: 'flex', gap: 12, alignItems: 'flex-start' },
  divider: { border: 'none', borderTop: '1px solid #334155', margin: '16px 0' },
  errorBox: { background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 12, fontSize: 13, color: '#fca5a5' },
  warnBox: { background: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 12, fontSize: 13, color: '#fde047' },
};

// ─── Sidebar ─────────────────────────────────────────────────────────────────

const NAV = [
  { to: '/dashboard', icon: '🏠', label: 'Dashboard' },
  { to: '/personas', icon: '👤', label: 'Personas & Cenários' },
  { to: '/dimensions', icon: '🔗', label: 'Dimensões' },
  { to: '/tools', icon: '🛠️', label: 'Tools RMA' },
];

function Sidebar({ onLogout }) {
  const { lastSaved, saving } = useData();
  return (
    <div style={S.sidebar}>
      <div style={S.sidebarHeader}>
        <h1 style={S.sidebarTitle}>🗺️ ASO Backoffice</h1>
        <p style={S.sidebarSub}>Mapa de Impacto</p>
      </div>
      <nav style={S.nav}>
        {NAV.map(({ to, icon, label }) => (
          <NavLink key={to} to={to} style={({ isActive }) => ({ ...S.navLink, ...(isActive ? S.navLinkActive : {}) })}>
            <span>{icon}</span><span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <div style={S.sidebarFooter}>
        {saving && <div style={{ marginBottom: 6, color: '#818cf8' }}>⟳ Salvando…</div>}
        {lastSaved && !saving && <div style={{ marginBottom: 6 }}>✓ {lastSaved.toLocaleTimeString('pt-BR')}</div>}
        <button onClick={onLogout} style={{ ...S.btn, ...S.btnSecondary, width: '100%', padding: '6px 0' }}>Sair</button>
      </div>
    </div>
  );
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

function Dashboard() {
  const { data, validation, reload, saving } = useData();
  if (!data) return <Loader />;
  const personas = Object.values(data.personas || {});
  const scenarios = personas.flatMap(p => p.scenarios || []);
  return (
    <div style={S.page}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <h2 style={{ ...S.h2, margin: 0 }}>Dashboard</h2>
        <button onClick={reload} disabled={saving} style={{ ...S.btn, ...S.btnSecondary }}>↺ Recarregar</button>
      </div>
      <div style={{ ...S.grid, gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 20 }}>
        {[
          { label: 'Dimensões', value: Object.keys(data.dimensions || {}).length, icon: '🔗' },
          { label: 'Personas', value: personas.length, icon: '👤' },
          { label: 'Cenários', value: scenarios.length, icon: '📋' },
          { label: 'Tools RMA', value: Object.keys(data.tools || {}).length, icon: '🛠️' },
        ].map(({ label, value, icon }) => (
          <div key={label} style={S.card}>
            <div style={{ fontSize: 28 }}>{icon}</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#818cf8', lineHeight: 1.1 }}>{value}</div>
            <div style={{ color: '#64748b', fontSize: 12, marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </div>
      {validation.errors.length > 0 && (
        <div style={S.errorBox}>
          <strong>⚠ {validation.errors.length} erro(s) de validação</strong>
          <ul style={{ margin: '6px 0 0', paddingLeft: 18 }}>
            {validation.errors.map((e, i) => <li key={i}>{e}</li>)}
          </ul>
        </div>
      )}
      {validation.warnings.length > 0 && (
        <div style={S.warnBox}>
          <strong>⚡ {validation.warnings.length} aviso(s)</strong>
          <ul style={{ margin: '6px 0 0', paddingLeft: 18 }}>
            {validation.warnings.map((w, i) => <li key={i}>{w}</li>)}
          </ul>
        </div>
      )}
      <div style={S.card}>
        <h3 style={S.h3}>Cenários por persona</h3>
        {personas.map(p => (
          <div key={p.id || p.label} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span style={{ width: 120, color: '#94a3b8' }}>{p.label}</span>
            <div style={{ flex: 1, background: '#0f172a', borderRadius: 4, height: 8, overflow: 'hidden' }}>
              <div style={{ width: `${(p.scenarios?.length || 0) / 8 * 100}%`, background: '#6366f1', height: '100%' }} />
            </div>
            <span style={{ color: '#818cf8', fontWeight: 700, minWidth: 20 }}>{p.scenarios?.length || 0}</span>
          </div>
        ))}
      </div>
      <div style={S.card}>
        <h3 style={S.h3}>Versão dos dados</h3>
        <code style={{ color: '#a5b4fc', fontSize: 12 }}>v{data.version || '?'} · gerado em {data.generated_at?.split('T')[0] || '?'}</code>
      </div>
    </div>
  );
}

// ─── Loader ──────────────────────────────────────────────────────────────────

function Loader({ msg = 'Carregando…' }) {
  return <div style={{ padding: 40, color: '#64748b', textAlign: 'center' }}>{msg}</div>;
}

// ─── PersonaList ─────────────────────────────────────────────────────────────

function PersonaList() {
  const { data, loading, error } = useData();
  const navigate = useNavigate();
  if (loading) return <Loader />;
  if (error) return <div style={{ ...S.errorBox, margin: 24 }}>{error}</div>;
  const personas = Object.entries(data.personas || {});
  return (
    <div style={S.page}>
      <h2 style={S.h2}>Personas & Cenários</h2>
      <div style={S.grid}>
        {personas.map(([id, p]) => (
          <div key={id} style={{ ...S.card, cursor: 'pointer', marginBottom: 0 }} onClick={() => navigate(`/personas/${id}`)}>
            <div style={{ fontSize: 24, marginBottom: 6 }}>{p.icon || '👤'}</div>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>{p.label}</div>
            <div style={{ color: '#64748b', fontSize: 12, marginBottom: 8 }}>{p.role}</div>
            <span style={{ ...S.badge, background: 'rgba(99,102,241,0.15)', color: '#818cf8' }}>
              {p.scenarios?.length || 0} cenários
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ScenarioEditor ─────────────────────────────────────────────────────────

function ScenarioEditor({ scenario, data, onChange, onDelete }) {
  const [tab, setTab] = useState('basic');
  const dims = Object.entries(data.dimensions || {});
  const tools = Object.entries(data.tools || {});

  function field(key, value) { onChange({ ...scenario, [key]: value }); }

  const tabs = [
    { id: 'basic', label: 'Básico' },
    { id: 'path', label: 'Caminho Causal' },
    { id: 'steps', label: 'Diagnóstico' },
    { id: 'tools', label: 'Tools' },
    { id: 'analyses', label: 'Análises' },
  ];

  return (
    <div style={{ ...S.card, marginBottom: 12 }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 14, borderBottom: '1px solid #334155', paddingBottom: 10, alignItems: 'center' }}>
        <div style={{ flex: 1, fontWeight: 700, color: '#818cf8' }}>#{scenario.id}</div>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ ...S.btn, ...(tab === t.id ? S.btnPrimary : S.btnSecondary), padding: '4px 10px', fontSize: 12 }}>{t.label}</button>
        ))}
        <button onClick={onDelete} style={{ ...S.btn, ...S.btnDanger, padding: '4px 8px', fontSize: 11 }}>✕</button>
      </div>

      {tab === 'basic' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={S.row}>
            <div style={{ flex: 1 }}>
              <label style={S.label}>ID (slug único)</label>
              <input style={S.input} value={scenario.id} onChange={e => field('id', e.target.value)} />
            </div>
            <div style={{ flex: 2 }}>
              <label style={S.label}>Título</label>
              <input style={S.input} value={scenario.title || ''} onChange={e => field('title', e.target.value)} />
            </div>
          </div>
          <div>
            <label style={S.label}>Descrição</label>
            <textarea style={S.textarea} value={scenario.description || ''} onChange={e => field('description', e.target.value)} />
          </div>
          <div>
            <label style={S.label}>Resultado esperado</label>
            <input style={S.input} value={scenario.outcome || ''} onChange={e => field('outcome', e.target.value)} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={S.label}>Urgência</label>
              <select style={S.select} value={scenario.urgency || 'média'} onChange={e => field('urgency', e.target.value)}>
                <option value="baixa">Baixa</option>
                <option value="média">Média</option>
                <option value="alta">Alta</option>
                <option value="crítica">Crítica</option>
              </select>
            </div>
            <div>
              <label style={S.label}>Impacto estimado</label>
              <input style={S.input} value={scenario.impact || ''} onChange={e => field('impact', e.target.value)} placeholder="ex: +15% retenção" />
            </div>
          </div>
          <div>
            <label style={S.label}>Tags (separadas por vírgula)</label>
            <input style={S.input} value={(scenario.tags || []).join(', ')} onChange={e => field('tags', e.target.value.split(',').map(t => t.trim()).filter(Boolean))} placeholder="ex: retenção, churn, ux" />
          </div>
        </div>
      )}

      {tab === 'path' && (
        <div>
          <label style={S.label}>Dimensões no caminho causal (selecione na ordem)</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
            {dims.map(([id, d]) => {
              const selected = (scenario.path || []).includes(id);
              const idx = (scenario.path || []).indexOf(id);
              return (
                <button key={id} onClick={() => {
                  const path = [...(scenario.path || [])];
                  if (selected) path.splice(idx, 1);
                  else path.push(id);
                  field('path', path);
                }} style={{ ...S.btn, ...(selected ? { background: d.color, color: '#fff' } : S.btnSecondary), fontSize: 12, position: 'relative' }}>
                  {selected && <span style={{ position: 'absolute', top: -6, right: -6, background: '#0f172a', borderRadius: '50%', width: 16, height: 16, fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #334155', color: '#818cf8' }}>{idx + 1}</span>}
                  {d.icon} {d.label}
                </button>
              );
            })}
          </div>
          {(scenario.path || []).length > 0 && (
            <div style={{ background: '#0f172a', borderRadius: 8, padding: 12 }}>
              <div style={{ fontSize: 12, color: '#64748b', marginBottom: 6 }}>Caminho selecionado:</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, alignItems: 'center' }}>
                {(scenario.path || []).map((id, i) => (
                  <React.Fragment key={id}>
                    <span style={{ ...S.tag, background: (data.dimensions[id]?.color || '#6366f1') + '22', color: data.dimensions[id]?.color || '#818cf8' }}>
                      {data.dimensions[id]?.icon} {data.dimensions[id]?.label || id}
                    </span>
                    {i < scenario.path.length - 1 && <span style={{ color: '#475569' }}>→</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
          <hr style={S.divider} />
          <label style={S.label}>Arestas ativas (ex: performance-ratings)</label>
          <input style={S.input} value={(scenario.activeEdges || []).join(', ')} onChange={e => field('activeEdges', e.target.value.split(',').map(t => t.trim()).filter(Boolean))} placeholder="performance-ratings, ratings-aquisicao" />
          <div style={{ marginTop: 6, fontSize: 11, color: '#64748b' }}>
            Arestas disponíveis: {(data.edges || []).map(([f, t]) => `${f}-${t}`).join(' · ')}
          </div>
        </div>
      )}

      {tab === 'steps' && (
        <div>
          <label style={S.label}>Passos de diagnóstico (máximo 5 recomendado)</label>
          {(scenario.steps || []).map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'flex-start' }}>
              <div style={{ background: '#6366f1', color: '#fff', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0, marginTop: 8 }}>{i + 1}</div>
              <input style={{ ...S.input, flex: 1 }} value={step} onChange={e => {
                const steps = [...(scenario.steps || [])]; steps[i] = e.target.value; field('steps', steps);
              }} placeholder={`Passo ${i + 1}…`} />
              <button onClick={() => { const steps = [...(scenario.steps || [])]; steps.splice(i, 1); field('steps', steps); }} style={{ ...S.btn, ...S.btnDanger, marginTop: 4, padding: '4px 8px' }}>✕</button>
            </div>
          ))}
          <button onClick={() => field('steps', [...(scenario.steps || []), ''])} style={{ ...S.btn, ...S.btnSecondary, marginTop: 4 }}>+ Adicionar passo</button>
        </div>
      )}

      {tab === 'tools' && (
        <div>
          <label style={S.label}>Recomendações de tools RankMyApp</label>
          {(scenario.recommendations || []).map((rec, i) => (
            <div key={i} style={{ ...S.card, background: '#0f172a', marginBottom: 8, padding: 12 }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
                <select style={{ ...S.select, flex: 2 }} value={rec.slug || ''} onChange={e => {
                  const recs = [...(scenario.recommendations || [])];
                  const tool = data.tools?.[e.target.value];
                  recs[i] = { ...recs[i], slug: e.target.value, tool: tool?.name || e.target.value };
                  field('recommendations', recs);
                }}>
                  <option value="">— Selecionar tool —</option>
                  {tools.map(([slug, t]) => <option key={slug} value={slug}>{t.name}</option>)}
                </select>
                <button onClick={() => { const recs = [...(scenario.recommendations || [])]; recs.splice(i, 1); field('recommendations', recs); }} style={{ ...S.btn, ...S.btnDanger, padding: '4px 8px' }}>✕</button>
              </div>
              <input style={S.input} value={rec.why || ''} onChange={e => {
                const recs = [...(scenario.recommendations || [])]; recs[i] = { ...recs[i], why: e.target.value }; field('recommendations', recs);
              }} placeholder="Por que esta tool? O que ela resolve neste cenário…" />
            </div>
          ))}
          <button onClick={() => field('recommendations', [...(scenario.recommendations || []), { slug: '', tool: '', why: '' }])} style={{ ...S.btn, ...S.btnSecondary }}>+ Adicionar tool</button>
        </div>
      )}

      {tab === 'analyses' && (
        <div>
          <label style={S.label}>Análises recomendadas (mínimo 3)</label>
          {(scenario.analyses || []).map((a, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <input style={{ ...S.input, flex: 1 }} value={a} onChange={e => {
                const analyses = [...(scenario.analyses || [])]; analyses[i] = e.target.value; field('analyses', analyses);
              }} placeholder="Ex: Comparativo de ratings últimos 90 dias…" />
              <button onClick={() => { const analyses = [...(scenario.analyses || [])]; analyses.splice(i, 1); field('analyses', analyses); }} style={{ ...S.btn, ...S.btnDanger, padding: '4px 8px' }}>✕</button>
            </div>
          ))}
          <button onClick={() => field('analyses', [...(scenario.analyses || []), ''])} style={{ ...S.btn, ...S.btnSecondary }}>+ Adicionar análise</button>
        </div>
      )}
    </div>
  );
}

// ─── PersonaDetail ───────────────────────────────────────────────────────────

function PersonaDetail() {
  const { personaId } = useParams();
  const { data, save, saving } = useData();
  const navigate = useNavigate();
  const [persona, setPersona] = useState(null);
  const [dirty, setDirty] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (data?.personas?.[personaId]) {
      setPersona(JSON.parse(JSON.stringify(data.personas[personaId])));
      setDirty(false);
    }
  }, [data, personaId]);

  if (!persona) return <Loader />;

  function updatePersona(p) { setPersona(p); setDirty(true); }

  function updateScenario(idx, sc) {
    const scenarios = [...(persona.scenarios || [])];
    scenarios[idx] = sc;
    updatePersona({ ...persona, scenarios });
  }

  function deleteScenario(idx) {
    if (!confirm('Remover este cenário?')) return;
    const scenarios = [...(persona.scenarios || [])];
    scenarios.splice(idx, 1);
    updatePersona({ ...persona, scenarios });
  }

  function addScenario() {
    const id = `${personaId}-sc${Date.now()}`;
    const newSc = { id, title: 'Novo cenário', description: '', path: [], activeEdges: [], steps: [], recommendations: [], analyses: [], tags: [], urgency: 'média', impact: '' };
    updatePersona({ ...persona, scenarios: [...(persona.scenarios || []), newSc] });
  }

  async function handleSave() {
    const newData = { ...data, personas: { ...data.personas, [personaId]: persona } };
    try {
      await save(newData, `content: persona ${personaId} — ${persona.label}`);
      setDirty(false);
      setMsg('Salvo!');
      setTimeout(() => setMsg(''), 3000);
    } catch (e) { setMsg('Erro: ' + e.message); }
  }

  return (
    <div style={S.page}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <button onClick={() => navigate('/personas')} style={{ ...S.btn, ...S.btnSecondary, padding: '6px 10px' }}>← Voltar</button>
        <h2 style={{ ...S.h2, margin: 0, flex: 1 }}>{persona.icon || '👤'} {persona.label}</h2>
        {dirty && <span style={{ color: '#fde047', fontSize: 12 }}>● Alterações não salvas</span>}
        {msg && <span style={{ color: '#4ade80', fontSize: 12 }}>{msg}</span>}
        <button onClick={handleSave} disabled={!dirty || saving} style={{ ...S.btn, ...S.btnPrimary, opacity: (!dirty || saving) ? 0.5 : 1 }}>
          {saving ? 'Salvando…' : '💾 Salvar'}
        </button>
      </div>

      <div style={S.card}>
        <h3 style={S.h3}>Perfil da persona</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <label style={S.label}>Nome / Label</label>
            <input style={S.input} value={persona.label} onChange={e => updatePersona({ ...persona, label: e.target.value })} />
          </div>
          <div>
            <label style={S.label}>Role</label>
            <input style={S.input} value={persona.role || ''} onChange={e => updatePersona({ ...persona, role: e.target.value })} />
          </div>
        </div>
        <div style={{ marginTop: 12 }}>
          <label style={S.label}>Descrição</label>
          <textarea style={S.textarea} value={persona.description || ''} onChange={e => updatePersona({ ...persona, description: e.target.value })} />
        </div>
        <div style={{ marginTop: 12 }}>
          <label style={S.label}>Objetivos (separados por vírgula)</label>
          <input style={S.input} value={(persona.objectives || []).join(', ')} onChange={e => updatePersona({ ...persona, objectives: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })} />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <h3 style={{ ...S.h3, margin: 0 }}>Cenários ({persona.scenarios?.length || 0})</h3>
        <button onClick={addScenario} style={{ ...S.btn, ...S.btnPrimary }}>+ Novo cenário</button>
      </div>

      {(persona.scenarios || []).map((sc, i) => (
        <ScenarioEditor key={sc.id || i} scenario={sc} data={data} onChange={sc => updateScenario(i, sc)} onDelete={() => deleteScenario(i)} />
      ))}
    </div>
  );
}

// ─── DimensionsPage ──────────────────────────────────────────────────────────

function DimensionsPage() {
  const { data, loading } = useData();
  if (loading) return <Loader />;
  const dims = Object.entries(data.dimensions || {});
  return (
    <div style={S.page}>
      <h2 style={S.h2}>Dimensões do Mapa</h2>
      <p style={{ color: '#64748b', marginBottom: 20 }}>As dimensões são read-only nesta versão. Edite diretamente no <code>data.json</code> para alterações estruturais.</p>
      <div style={S.grid}>
        {dims.map(([id, d]) => (
          <div key={id} style={{ ...S.card, borderLeft: `3px solid ${d.color}`, marginBottom: 0 }}>
            <div style={{ fontSize: 22, marginBottom: 4 }}>{d.icon}</div>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>{d.label}</div>
            <div style={{ color: '#64748b', fontSize: 12, marginBottom: 10, lineHeight: 1.5 }}>{d.description?.slice(0, 100)}…</div>
            {d.impacts?.length > 0 && (
              <div style={{ fontSize: 11 }}>
                <span style={{ color: '#64748b' }}>Impacta: </span>
                {d.impacts.map(i => (
                  <span key={i} style={{ ...S.tag, background: (data.dimensions[i]?.color || '#6366f1') + '22', color: data.dimensions[i]?.color || '#818cf8' }}>
                    {data.dimensions[i]?.icon} {data.dimensions[i]?.label || i}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ ...S.card, marginTop: 16 }}>
        <h3 style={S.h3}>Arestas causais ({data.edges?.length || 0})</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {(data.edges || []).map(([f, t]) => (
            <span key={`${f}-${t}`} style={{ ...S.tag, background: '#1e293b', border: '1px solid #334155', color: '#94a3b8' }}>
              {data.dimensions[f]?.icon} {f} → {data.dimensions[t]?.icon} {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ToolsPage ───────────────────────────────────────────────────────────────

function ToolsPage() {
  const { data, save, saving } = useData();
  const [tools, setTools] = useState(null);
  const [dirty, setDirty] = useState(false);
  const [msg, setMsg] = useState('');
  const [search, setSearch] = useState('');
  const [editSlug, setEditSlug] = useState(null);
  const [draft, setDraft] = useState(null);

  useEffect(() => {
    if (data?.tools) { setTools(JSON.parse(JSON.stringify(data.tools))); setDirty(false); }
  }, [data]);

  if (!tools) return <Loader />;

  function startEdit(slug) {
    setEditSlug(slug);
    setDraft(JSON.parse(JSON.stringify(tools[slug] || { name: '', slug: '', description: '', plan: 'starter', dims: [], problems: '', delivers: '' })));
  }

  function saveDraft() {
    const newTools = { ...tools, [editSlug]: { ...draft, slug: editSlug } };
    setTools(newTools); setDirty(true); setEditSlug(null); setDraft(null);
  }

  function deleteTool(slug) {
    if (!confirm(`Remover tool "${slug}"?`)) return;
    const newTools = { ...tools }; delete newTools[slug];
    setTools(newTools); setDirty(true);
  }

  function addTool() {
    const slug = `nova-tool-${Date.now()}`;
    setTools({ ...tools, [slug]: { name: 'Nova Tool', slug, description: '', plan: 'starter', dims: [], problems: '', delivers: '' } });
    setDirty(true);
    startEdit(slug);
  }

  async function handleSave() {
    const newData = { ...data, tools };
    try {
      await save(newData, 'content: tools catalog update');
      setDirty(false); setMsg('Salvo!'); setTimeout(() => setMsg(''), 3000);
    } catch (e) { setMsg('Erro: ' + e.message); }
  }

  const dims = Object.entries(data.dimensions || {});
  const filtered = Object.entries(tools).filter(([slug, t]) =>
    search === '' || t.name?.toLowerCase().includes(search.toLowerCase()) || slug.includes(search.toLowerCase())
  );
  const PLANS = ['free', 'starter', 'pro', 'advanced'];
  const PLAN_COLORS = { free: '#64748b', starter: '#22c55e', pro: '#3b82f6', advanced: '#a855f7' };

  return (
    <div style={S.page}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <h2 style={{ ...S.h2, margin: 0, flex: 1 }}>Tools RankMyApp ({Object.keys(tools).length})</h2>
        {dirty && <span style={{ color: '#fde047', fontSize: 12 }}>● Não salvo</span>}
        {msg && <span style={{ color: '#4ade80', fontSize: 12 }}>{msg}</span>}
        <button onClick={handleSave} disabled={!dirty || saving} style={{ ...S.btn, ...S.btnPrimary, opacity: (!dirty || saving) ? 0.5 : 1 }}>
          {saving ? 'Salvando…' : '💾 Salvar'}
        </button>
        <button onClick={addTool} style={{ ...S.btn, ...S.btnSecondary }}>+ Nova tool</button>
      </div>

      <input style={{ ...S.input, marginBottom: 16, maxWidth: 300 }} placeholder="Buscar tool…" value={search} onChange={e => setSearch(e.target.value)} />

      {editSlug !== null && draft && (
        <div style={{ ...S.card, border: '1px solid #6366f1' }}>
          <h3 style={S.h3}>Editando: {editSlug}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={S.label}>Slug (ID único)</label>
              <input style={S.input} value={editSlug} readOnly style={{ ...S.input, opacity: 0.5 }} />
            </div>
            <div>
              <label style={S.label}>Nome</label>
              <input style={S.input} value={draft.name || ''} onChange={e => setDraft({ ...draft, name: e.target.value })} />
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={S.label}>Descrição</label>
            <textarea style={S.textarea} value={draft.description || ''} onChange={e => setDraft({ ...draft, description: e.target.value })} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={S.label}>Plano mínimo</label>
              <select style={S.select} value={draft.plan || 'starter'} onChange={e => setDraft({ ...draft, plan: e.target.value })}>
                {PLANS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label style={S.label}>Dimensões que impacta</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 4 }}>
                {dims.map(([id, d]) => {
                  const sel = (draft.dims || []).includes(id);
                  return (
                    <button key={id} onClick={() => {
                      const dims2 = [...(draft.dims || [])];
                      if (sel) dims2.splice(dims2.indexOf(id), 1); else dims2.push(id);
                      setDraft({ ...draft, dims: dims2 });
                    }} style={{ ...S.btn, ...(sel ? { background: d.color, color: '#fff' } : S.btnSecondary), padding: '3px 8px', fontSize: 11 }}>
                      {d.icon} {d.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={S.label}>Problema que resolve</label>
              <textarea style={{ ...S.textarea, minHeight: 60 }} value={draft.problems || ''} onChange={e => setDraft({ ...draft, problems: e.target.value })} />
            </div>
            <div>
              <label style={S.label}>O que entrega</label>
              <textarea style={{ ...S.textarea, minHeight: 60 }} value={draft.delivers || ''} onChange={e => setDraft({ ...draft, delivers: e.target.value })} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={saveDraft} style={{ ...S.btn, ...S.btnPrimary }}>✓ Confirmar</button>
            <button onClick={() => { setEditSlug(null); setDraft(null); }} style={{ ...S.btn, ...S.btnSecondary }}>Cancelar</button>
          </div>
        </div>
      )}

      <div style={S.grid}>
        {filtered.map(([slug, t]) => (
          <div key={slug} style={{ ...S.card, marginBottom: 0, opacity: editSlug === slug ? 0.4 : 1 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 6 }}>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{t.name}</div>
              <span style={{ ...S.badge, background: (PLAN_COLORS[t.plan] || '#64748b') + '22', color: PLAN_COLORS[t.plan] || '#64748b', flexShrink: 0, marginLeft: 6 }}>{t.plan}</span>
            </div>
            <div style={{ color: '#64748b', fontSize: 12, marginBottom: 8, lineHeight: 1.5 }}>{t.description?.slice(0, 80) || '—'}…</div>
            {(t.dims || []).length > 0 && (
              <div style={{ marginBottom: 8, display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                {(t.dims || []).map(d => (
                  <span key={d} style={{ ...S.tag, background: (data.dimensions[d]?.color || '#6366f1') + '22', color: data.dimensions[d]?.color || '#818cf8' }}>
                    {data.dimensions[d]?.icon}
                  </span>
                ))}
              </div>
            )}
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={() => startEdit(slug)} style={{ ...S.btn, ...S.btnSecondary, flex: 1, padding: '5px 0' }}>✏️ Editar</button>
              <button onClick={() => deleteTool(slug)} style={{ ...S.btn, ...S.btnDanger, padding: '5px 8px' }}>✕</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Shell ───────────────────────────────────────────────────────────────────

function Shell({ onLogout }) {
  const { loading, error, reload } = useData();
  if (loading) return <div style={{ ...S.layout, alignItems: 'center', justifyContent: 'center' }}><Loader msg="Carregando dados do GitHub…" /></div>;
  if (error) return (
    <div style={{ ...S.layout, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12 }}>
      <div style={{ ...S.errorBox, maxWidth: 400 }}><strong>Erro ao carregar dados:</strong><br />{error}</div>
      <button onClick={reload} style={{ ...S.btn, ...S.btnPrimary }}>Tentar novamente</button>
    </div>
  );
  return (
    <div style={S.layout}>
      <Sidebar onLogout={onLogout} />
      <div style={S.content}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/personas" element={<PersonaList />} />
          <Route path="/personas/:personaId" element={<PersonaDetail />} />
          <Route path="/dimensions" element={<DimensionsPage />} />
          <Route path="/tools" element={<ToolsPage />} />
        </Routes>
      </div>
    </div>
  );
}

// ─── App root ────────────────────────────────────────────────────────────────

export default function App() {
  const [authed, setAuthed] = useState(!!sessionStorage.getItem(PASS_KEY));

  function logout() { sessionStorage.removeItem(PASS_KEY); setAuthed(false); }

  if (!authed) return <Login onAuth={() => setAuthed(true)} />;

  return (
    <BrowserRouter>
      <DataProvider>
        <Shell onLogout={logout} />
      </DataProvider>
    </BrowserRouter>
  );
}
