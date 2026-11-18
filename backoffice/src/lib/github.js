const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const REPO = 'jefferson-rankmyapp/aso-impact-map';
const FILE_PATH = 'data.json';
const BRANCH = 'main';

export async function readData() {
  const url = `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}?ref=${BRANCH}`;
  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
    }
  });
  if (!res.ok) throw new Error(`GitHub API error: ${res.status} — verifique o VITE_GITHUB_TOKEN`);
  const file = await res.json();
  const bytes = atob(file.content.replace(/\n/g, ''));
  const uint8 = new Uint8Array([...bytes].map(c => c.charCodeAt(0)));
  const content = new TextDecoder('utf-8').decode(uint8);
  return { data: JSON.parse(content), sha: file.sha };
}

export async function writeData(data, sha, message = 'content: update via backoffice') {
  const json = JSON.stringify(data, null, 2);
  const encoded = btoa(unescape(encodeURIComponent(json)));
  const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      content: encoded,
      sha,
      branch: BRANCH,
      committer: {
        name: 'Jefferson Freitas',
        email: 'jefferson.freitas@rankmyapp.com.br',
      }
    })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`Erro ao salvar: ${err.message || res.status}`);
  }
  return await res.json();
}
