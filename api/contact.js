// Vercel Serverless Function — sends the contact form via Resend.
// The RESEND_API_KEY lives only here (server-side env var) and is never exposed
// to the browser. Configure it in Vercel → Project → Settings → Environment Variables.

const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'Crievo <contato@crievo.tech>';
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'dilanlopez009@gmail.com';

const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set');
    return res.status(500).json({ error: 'Email service not configured' });
  }

  // Vercel parses JSON bodies automatically; fall back to manual parse just in case.
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  const { name, email, company, project, msg, lang } = body || {};

  // Validation
  if (!name || !email || !msg) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
    return res.status(400).json({ error: 'Invalid email' });
  }
  if (String(msg).length > 5000) {
    return res.status(400).json({ error: 'Message too long' });
  }

  const isPt = lang !== 'en';
  const subject = `Novo briefing — ${name}${company ? ' · ' + company : ''}`;

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#1a1430">
      <div style="background:#08000f;color:#f5f0ff;padding:24px 28px;border-radius:14px 14px 0 0">
        <h2 style="margin:0;font-size:20px">Novo contato pelo site Crievo</h2>
        <p style="margin:6px 0 0;color:#b8a8d4;font-size:13px">crievo.tech · formulário de contato</p>
      </div>
      <div style="border:1px solid #eee;border-top:0;border-radius:0 0 14px 14px;padding:24px 28px">
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="padding:6px 0;color:#888;width:130px">Nome</td><td style="padding:6px 0"><strong>${esc(name)}</strong></td></tr>
          <tr><td style="padding:6px 0;color:#888">Email</td><td style="padding:6px 0"><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
          <tr><td style="padding:6px 0;color:#888">Empresa</td><td style="padding:6px 0">${esc(company) || '—'}</td></tr>
          <tr><td style="padding:6px 0;color:#888">Tipo de projeto</td><td style="padding:6px 0">${esc(project) || '—'}</td></tr>
        </table>
        <p style="margin:18px 0 6px;color:#888;font-size:14px">Mensagem</p>
        <div style="background:#faf7ff;border:1px solid #ece5fb;border-radius:10px;padding:14px 16px;white-space:pre-wrap;font-size:14px;line-height:1.5">${esc(msg)}</div>
        <p style="margin:20px 0 0;color:#aaa;font-size:12px">Idioma do visitante: ${isPt ? 'Português' : 'English'}</p>
      </div>
    </div>`;

  const text = `Novo contato pelo site Crievo\n\nNome: ${name}\nEmail: ${email}\nEmpresa: ${company || '—'}\nTipo de projeto: ${project || '—'}\n\nMensagem:\n${msg}`;

  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject,
        html,
        text,
      }),
    });

    if (!resendRes.ok) {
      const detail = await resendRes.text();
      console.error('Resend API error', resendRes.status, detail);
      return res.status(502).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Unexpected error sending email:', err);
    return res.status(500).json({ error: 'Unexpected error' });
  }
}
