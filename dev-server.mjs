// Servidor de desenvolvimento local — SEM dependências (só Node 18+).
// Serve os arquivos estáticos E roda a função api/contact.js, igual a Vercel.
// Uso:  node dev-server.mjs   (ou: npm run dev)
//
// Para o formulário enviar email de verdade, crie um arquivo .env com:
//   RESEND_API_KEY=re_xxx
// (copie de .env.example). Sem a chave, a página funciona mas o form retorna erro.

import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('.', import.meta.url));
const PORT = process.env.PORT || 3000;

// --- carrega .env manualmente (sem dotenv) ---
const envPath = join(ROOT, '.env');
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  }
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.jsx': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
};

// importa o MESMO handler que roda na Vercel
const { default: contactHandler } = await import('./api/contact.js');

function readBody(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (c) => (data += c));
    req.on('end', () => {
      try { resolve(data ? JSON.parse(data) : {}); }
      catch { resolve({}); }
    });
  });
}

// adapta o (req,res) do Node para a interface que a função da Vercel espera
function vercelRes(nodeRes) {
  return {
    statusCode: 200,
    setHeader: (k, v) => nodeRes.setHeader(k, v),
    status(c) { this.statusCode = c; return this; },
    json(obj) {
      nodeRes.statusCode = this.statusCode;
      nodeRes.setHeader('Content-Type', 'application/json');
      nodeRes.end(JSON.stringify(obj));
      return this;
    },
  };
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  // rota da API
  if (url.pathname === '/api/contact') {
    const body = req.method === 'POST' ? await readBody(req) : undefined;
    return contactHandler({ method: req.method, headers: req.headers, body }, vercelRes(res));
  }

  // arquivos estáticos
  let pathname = decodeURIComponent(url.pathname);
  if (pathname === '/') pathname = '/index.html';
  const filePath = normalize(join(ROOT, pathname));
  if (!filePath.startsWith(ROOT)) { // bloqueia path traversal
    res.statusCode = 403; res.end('Forbidden'); return;
  }
  try {
    const file = await readFile(filePath);
    res.setHeader('Content-Type', MIME[extname(filePath)] || 'application/octet-stream');
    res.end(file);
  } catch {
    res.statusCode = 404; res.end('Not found');
  }
});

server.listen(PORT, () => {
  const hasKey = !!process.env.RESEND_API_KEY;
  console.log(`\n  Crievo rodando em  http://localhost:${PORT}\n`);
  console.log(`  Resend: ${hasKey ? 'API key carregada ✓ (form envia email)' : 'sem RESEND_API_KEY — crie um .env para o form enviar email'}\n`);
});
