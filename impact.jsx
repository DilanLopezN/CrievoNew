// Impact section — sales metrics that close deals
function Impact({ t, lang }) {
  return (
    <section id="impact" className="impact">
      <div className="halo" style={{ width: 600, height: 600, background: 'var(--purple-deep)', top: '20%', right: '-15%', opacity: 0.3 }} />
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">{t.impact.eyebrow}</div>
          <h2 className="section-title">
            {t.impact.title}<br />
            <span className="muted">{t.impact.title2}</span>
          </h2>
          <p className="section-sub">{t.impact.sub}</p>
        </div>

        <div className="impact-grid">
          {t.impact.cards.map((c, i) => (
            <article key={i} className="impact-card reveal" style={{ transitionDelay: `${i * 0.06}s` }}>
              <div className="impact-metric">{c.metric}</div>
              <div className="impact-label mono">{c.label}</div>
              <p className="impact-desc">{c.desc}</p>
              <div className="impact-note mono">
                <span className="impact-bullet" />
                {c.note}
              </div>
              <div className="impact-bar">
                <span className="impact-bar-fill" />
              </div>
            </article>
          ))}
        </div>

        <div className="impact-cta reveal">
          <Magnetic>
            <a href="#contact" className="btn btn-primary">{t.impact.cta} <span className="arrow">→</span></a>
          </Magnetic>
          <div className="mono" style={{ color: 'var(--ink-mute)', fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            {lang === 'pt' ? 'Garantia contratual de ROI ou seu dinheiro de volta' : 'Contractual ROI guarantee or money back'}
          </div>
        </div>
      </div>

      <style>{`
        .impact { position: relative; }
        .impact-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          border: 1px solid var(--line);
          border-radius: 24px;
          overflow: hidden;
          background: linear-gradient(180deg, rgba(168, 85, 247, 0.06), transparent);
        }
        .impact-card {
          padding: 40px 32px 32px;
          border-right: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          position: relative;
          overflow: hidden;
          transition: background 0.5s var(--ease);
        }
        .impact-card:nth-child(3n) { border-right: 0; }
        .impact-card:nth-last-child(-n+3) { border-bottom: 0; }
        .impact-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 100%, rgba(168, 85, 247, 0.18), transparent 60%);
          opacity: 0;
          transition: opacity 0.5s var(--ease);
          pointer-events: none;
        }
        .impact-card:hover::before { opacity: 1; }
        .impact-card:hover .impact-bar-fill { width: 100%; }
        .impact-metric {
          font-size: clamp(48px, 5vw, 72px);
          font-weight: 500;
          letter-spacing: -0.05em;
          line-height: 1;
          margin-bottom: 16px;
          background: linear-gradient(180deg, var(--ink) 50%, var(--purple-bright) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          position: relative;
          z-index: 2;
        }
        .impact-label {
          font-size: 11px;
          color: var(--purple-bright);
          text-transform: uppercase;
          letter-spacing: 0.18em;
          margin-bottom: 16px;
          position: relative;
          z-index: 2;
        }
        .impact-desc {
          color: var(--ink-dim);
          line-height: 1.55;
          font-size: 15px;
          margin-bottom: 28px;
          position: relative;
          z-index: 2;
          min-height: 70px;
        }
        .impact-note {
          font-size: 10px;
          color: var(--ink-mute);
          text-transform: uppercase;
          letter-spacing: 0.18em;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding-bottom: 20px;
          position: relative;
          z-index: 2;
        }
        .impact-bullet {
          width: 6px; height: 6px;
          background: var(--lime);
          border-radius: 50%;
          box-shadow: 0 0 8px var(--lime);
        }
        .impact-bar {
          position: absolute;
          left: 32px; right: 32px; bottom: 24px;
          height: 2px;
          background: rgba(168, 85, 247, 0.12);
          border-radius: 2px;
          overflow: hidden;
        }
        .impact-bar-fill {
          display: block;
          width: 30%;
          height: 100%;
          background: linear-gradient(90deg, var(--purple), var(--magenta));
          border-radius: 2px;
          transition: width 1.2s var(--ease);
          box-shadow: 0 0 12px rgba(168, 85, 247, 0.6);
        }
        .impact-cta {
          margin-top: 48px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 24px;
          padding: 32px;
          border: 1px solid var(--line-strong);
          border-radius: 20px;
          background: linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(217, 70, 239, 0.05));
        }
        @media (max-width: 1080px) {
          .impact-grid { grid-template-columns: repeat(2, 1fr); }
          .impact-card:nth-child(3n) { border-right: 1px solid var(--line); }
          .impact-card:nth-child(2n) { border-right: 0; }
          .impact-card:nth-last-child(-n+3) { border-bottom: 1px solid var(--line); }
          .impact-card:nth-last-child(-n+2) { border-bottom: 0; }
        }
        @media (max-width: 720px) {
          .impact-grid { grid-template-columns: 1fr; }
          .impact-card { border-right: 0 !important; border-bottom: 1px solid var(--line) !important; }
          .impact-card:last-child { border-bottom: 0 !important; }
        }
      `}</style>
    </section>
  );
}

window.Impact = Impact;
