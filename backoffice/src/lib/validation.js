export function validateData(data) {
  const errors = [];
  const warnings = [];
  const dimIds = Object.keys(data.dimensions || {});
  const toolSlugs = Object.keys(data.tools || {});
  const edgeKeys = (data.edges || []).map(([f, t]) => `${f}-${t}`);

  // Validar arestas
  for (const [from, to] of (data.edges || [])) {
    if (!dimIds.includes(from)) errors.push(`Aresta referencia dimensão inexistente: "${from}"`);
    if (!dimIds.includes(to)) errors.push(`Aresta referencia dimensão inexistente: "${to}"`);
  }

  // Validar impactos/causedBy nas dimensões
  for (const [id, dim] of Object.entries(data.dimensions || {})) {
    for (const impact of (dim.impacts || [])) {
      if (!dimIds.includes(impact)) errors.push(`Dimensão "${id}" impacta dimensão inexistente: "${impact}"`);
    }
    for (const cause of (dim.causedBy || [])) {
      if (!dimIds.includes(cause)) errors.push(`Dimensão "${id}" causedBy dimensão inexistente: "${cause}"`);
    }
  }

  // Validar cenários
  const scenarioIds = new Set();
  for (const [pId, persona] of Object.entries(data.personas || {})) {
    for (const sc of (persona.scenarios || [])) {
      // IDs duplicados
      if (scenarioIds.has(sc.id)) errors.push(`ID duplicado de cenário: "${sc.id}"`);
      scenarioIds.add(sc.id);

      // Dimensões no path
      for (const dimId of (sc.path || [])) {
        if (!dimIds.includes(dimId)) {
          errors.push(`Cenário "${sc.id}" (${pId}) referencia dimensão inexistente: "${dimId}"`);
        }
      }

      // Arestas ativas
      for (const edge of (sc.activeEdges || [])) {
        if (!edgeKeys.includes(edge)) {
          warnings.push(`Cenário "${sc.id}" referencia aresta inexistente: "${edge}"`);
        }
      }

      // Tools nas recomendações
      for (const rec of (sc.recommendations || [])) {
        if (rec.slug && !toolSlugs.includes(rec.slug)) {
          warnings.push(`Cenário "${sc.id}" recomenda tool inexistente: "${rec.slug}"`);
        }
      }

      if (!sc.steps || sc.steps.length === 0) {
        warnings.push(`Cenário "${sc.id}" não tem passos de diagnóstico`);
      }
      if (sc.steps && sc.steps.length > 5) {
        warnings.push(`Cenário "${sc.id}" tem ${sc.steps.length} passos (máximo recomendado: 5)`);
      }
      if (!sc.analyses || sc.analyses.length < 3) {
        warnings.push(`Cenário "${sc.id}" tem ${sc.analyses?.length || 0} análise(s) — recomendado: 3`);
      }
    }
  }

  return { errors, warnings, valid: errors.length === 0 };
}
