// Contact + Footer
const { useState: useStateC } = React;

function Contact({ t, lang }) {
  const [sent, setSent] = useStateC(false);
  const [form, setForm] = useStateC({ name: '', email: '', company: '', project: 'Website', msg: '' });
  const projectTypes = lang === 'pt'
    ? ['Website', 'Sistema Web', 'ERP', 'E-commerce', 'App', 'Outro']
    : ['Website', 'Web System', 'ERP', 'E-commerce', 'App', 'Other'];

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4500);
  };

  return (
    <section id="contact" className="contact">
      <div className="halo" style={{ width: 700, height: 700, background: 'var(--purple-deep)', top: '20%', left: '50%', transform: 'translateX(-50%)', opacity: 0.3 }} />
      <div className="container">
        <div className="contact-head reveal">
          <div className="eyebrow">{t.contact.eyebrow}</div>
          <h2 className="contact-title">
            {t.contact.title}<br />
            <span className="muted">{t.contact.title2}</span>
          </h2>
          <p className="contact-sub">{t.contact.sub}</p>
        </div>

        <form className="contact-form reveal" onSubmit={submit}>
          <div className="form-row">
            <label className="field">
              <span className="field-label mono">01 · {t.contact.name}</span>
              <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            </label>
            <label className="field">
              <span className="field-label mono">02 · {t.contact.email}</span>
              <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            </label>
          </div>
          <div className="form-row">
            <label className="field">
              <span className="field-label mono">03 · {t.contact.company}</span>
              <input type="text" value={form.company} onChange={e => setForm({...form, company: e.target.value})} />
            </label>
            <label className="field">
              <span className="field-label mono">04 · {t.contact.project}</span>
              <select value={form.project} onChange={e => setForm({...form, project: e.target.value})}>
                {projectTypes.map(p => <option key={p}>{p}</option>)}
              </select>
            </label>
          </div>
          <label className="field">
            <span className="field-label mono">05 · {t.contact.msg}</span>
            <textarea rows="5" required value={form.msg} onChange={e => setForm({...form, msg: e.target.value})} />
          </label>
          <div className="form-actions">
            <button type="submit" className={"btn btn-primary " + (sent ? "sent" : "")}>
              {sent ? t.contact.sent : t.contact.send} <span className="arrow">{sent ? "✓" : "→"}</span>
            </button>
            <div className="form-hint mono">
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--lime)', boxShadow: '0 0 10px var(--lime)', display: 'inline-block', marginRight: 10 }} />
              {lang === 'pt' ? 'Resposta em 24h · Contrato em até 5 dias' : 'Reply in 24h · Contract within 5 days'}
            </div>
          </div>
        </form>
      </div>

      <style>{`
        .contact { padding-top: 160px; padding-bottom: 100px; }
        .contact-head {
          text-align: center;
          max-width: 880px;
          margin: 0 auto 80px;
        }
        .contact-head .eyebrow {
          justify-content: center;
        }
        .contact-title {
          font-size: clamp(48px, 8vw, 120px);
          font-weight: 500;
          letter-spacing: -0.05em;
          line-height: 0.95;
          margin: 32px 0 32px;
        }
        .contact-title .muted {
          color: var(--purple-bright);
          font-style: italic;
          font-weight: 300;
          background: linear-gradient(180deg, var(--purple-bright), var(--purple-deep));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .contact-sub {
          font-size: 18px;
          color: var(--ink-dim);
          line-height: 1.5;
          max-width: 600px;
          margin: 0 auto;
        }
        .contact-form {
          max-width: 880px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 48px;
          border: 1px solid var(--line-strong);
          border-radius: 28px;
          background: linear-gradient(180deg, rgba(168, 85, 247, 0.06), rgba(8, 0, 15, 0.5));
          backdrop-filter: blur(10px);
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .field {
          display: flex;
          flex-direction: column;
          padding: 14px 18px;
          background: rgba(8, 0, 15, 0.5);
          border: 1px solid var(--line);
          border-radius: 14px;
          transition: border-color 0.3s;
        }
        .field:focus-within { border-color: var(--purple); }
        .field-label {
          font-size: 10px;
          color: var(--ink-mute);
          text-transform: uppercase;
          letter-spacing: 0.18em;
          margin-bottom: 6px;
        }
        .field input, .field textarea, .field select {
          background: transparent;
          border: 0;
          color: var(--ink);
          font-family: var(--font-display);
          font-size: 16px;
          outline: none;
          width: 100%;
          resize: vertical;
          cursor: none;
        }
        .field select { cursor: none; appearance: none; padding-right: 20px; }
        .field textarea { font-family: var(--font-display); }
        .form-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 16px;
          flex-wrap: wrap;
          gap: 16px;
        }
        .form-hint {
          font-size: 11px;
          color: var(--ink-mute);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          display: inline-flex;
          align-items: center;
        }
        .btn.sent {
          background: var(--lime);
          border-color: var(--lime);
          color: var(--bg);
        }
        @media (max-width: 720px) {
          .form-row { grid-template-columns: 1fr; }
          .contact-form { padding: 28px; }
        }
      `}</style>
    </section>
  );
}

function Footer({ t, lang }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-mark">C</span>
              <span style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.04em' }}>Crievo</span>
            </div>
            <p className="footer-tag mono">{t.footer.tag}</p>
          </div>

          <div className="footer-cols">
            <div className="footer-col">
              <h4 className="mono">Estúdio</h4>
              <a href="#services">{t.nav.services}</a>
              <a href="#process">{t.nav.process}</a>
              <a href="#stack">{t.nav.stack}</a>
            </div>
            <div className="footer-col">
              <h4 className="mono">{lang === 'pt' ? 'Trabalho' : 'Work'}</h4>
              <a href="#work">{t.nav.work}</a>
              <a href="#contact">{t.nav.contact}</a>
            </div>
            <div className="footer-col">
              <h4 className="mono">Social</h4>
              <a href="#">Instagram ↗</a>
              <a href="#">LinkedIn ↗</a>
              <a href="#">GitHub ↗</a>
              <a href="#">Behance ↗</a>
            </div>
          </div>
        </div>

        <div className="footer-mega">
          <div className="footer-mega-inner">CRIEVO</div>
        </div>

        <div className="footer-bottom">
          <div className="mono" style={{ color: 'var(--ink-mute)', fontSize: 12 }}>{t.footer.rights}</div>
          <div className="mono" style={{ color: 'var(--ink-mute)', fontSize: 12, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 6, height: 6, background: 'var(--purple)', borderRadius: '50%', boxShadow: '0 0 8px var(--purple)' }} />
            {t.footer.built}
          </div>
        </div>
      </div>
      <style>{`
        .footer { padding: 80px 0 32px; border-top: 1px solid var(--line); position: relative; z-index: 2; }
        .footer-top {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          padding-bottom: 60px;
        }
        .footer-brand { max-width: 360px; }
        .footer-logo { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
        .footer-tag { font-size: 12px; color: var(--ink-mute); text-transform: uppercase; letter-spacing: 0.15em; line-height: 1.6; }
        .footer-cols {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .footer-col h4 {
          font-size: 11px;
          color: var(--purple-bright);
          text-transform: uppercase;
          letter-spacing: 0.18em;
          margin-bottom: 16px;
          font-weight: 500;
        }
        .footer-col a {
          display: block;
          color: var(--ink-dim);
          text-decoration: none;
          margin-bottom: 8px;
          font-size: 15px;
          transition: color 0.2s;
        }
        .footer-col a:hover { color: var(--ink); }
        .footer-mega {
          padding: 40px 0;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          overflow: hidden;
          margin-bottom: 32px;
        }
        .footer-mega-inner {
          font-family: var(--font-display);
          font-size: clamp(120px, 22vw, 360px);
          font-weight: 500;
          letter-spacing: -0.06em;
          line-height: 0.85;
          background: linear-gradient(180deg, var(--purple-bright) 0%, var(--purple-deep) 60%, transparent 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          text-align: center;
          white-space: nowrap;
        }
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        @media (max-width: 880px) {
          .footer-top { grid-template-columns: 1fr; gap: 40px; }
          .footer-cols { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 560px) {
          .footer-cols { grid-template-columns: 1fr; }
        }
      `}</style>
    </footer>
  );
}

Object.assign(window, { Contact, Footer });
