// Services + Process + Stats sections
function Services({ t }) {
  return (
    <section id="services" className="services">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">{t.services.eyebrow}</div>
          <h2 className="section-title">
            {t.services.title}<br />
            <span className="muted">{t.services.title2}</span>
          </h2>
          <p className="section-sub">{t.services.sub}</p>
        </div>

        <div className="services-grid">
          {t.services.items.map((s, i) => (
            <article key={i} className="service-card reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="service-num mono">{s.n}</div>
              <div className="service-tag mono">{s.tag}</div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-body">{s.body}</p>
              <div className="service-tags">
                {s.tags.map(tag => <span key={tag} className="chip mono">{tag}</span>)}
              </div>
              <div className="service-corner">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M10 30 L30 10 M30 10 H14 M30 10 V26" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .section-head {
          max-width: 880px;
          margin-bottom: 96px;
        }
        .section-head .eyebrow { margin-bottom: 24px; }
        .section-title {
          font-size: clamp(44px, 6vw, 88px);
          font-weight: 500;
          letter-spacing: -0.04em;
          line-height: 0.95;
          margin-bottom: 32px;
        }
        .section-title .muted {
          color: var(--ink-mute);
          font-style: italic;
          font-weight: 300;
        }
        .section-sub {
          font-size: 18px;
          color: var(--ink-dim);
          max-width: 600px;
          line-height: 1.5;
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .service-card {
          padding: 40px 32px;
          background: linear-gradient(180deg, rgba(168, 85, 247, 0.04), rgba(168, 85, 247, 0));
          border: 1px solid var(--line);
          border-radius: 20px;
          position: relative;
          overflow: hidden;
          transition: all 0.4s var(--ease);
          min-height: 480px;
          display: flex;
          flex-direction: column;
        }
        .service-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at var(--mx, 50%) var(--my, 0%), rgba(168, 85, 247, 0.18), transparent 50%);
          opacity: 0;
          transition: opacity 0.4s;
          pointer-events: none;
        }
        .service-card:hover { border-color: var(--line-strong); transform: translateY(-4px); }
        .service-card:hover::before { opacity: 1; }
        .service-num {
          font-size: 14px;
          color: var(--purple-bright);
          margin-bottom: 24px;
        }
        .service-tag {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: var(--ink-mute);
          margin-bottom: 12px;
        }
        .service-title {
          font-size: 36px;
          font-weight: 500;
          letter-spacing: -0.02em;
          margin-bottom: 16px;
          line-height: 1;
        }
        .service-body {
          color: var(--ink-dim);
          line-height: 1.55;
          margin-bottom: 32px;
          flex: 1;
        }
        .service-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 24px;
        }
        .chip {
          display: inline-flex;
          padding: 6px 12px;
          border: 1px solid var(--line-strong);
          border-radius: 999px;
          font-size: 11px;
          color: var(--ink-dim);
          background: rgba(168, 85, 247, 0.06);
        }
        .service-corner {
          color: var(--purple);
          align-self: flex-end;
          opacity: 0.6;
          transition: all 0.4s var(--ease);
        }
        .service-card:hover .service-corner {
          color: var(--purple-bright);
          opacity: 1;
          transform: translate(4px, -4px);
        }
        @media (max-width: 1080px) {
          .services-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}

function Process({ t }) {
  return (
    <section id="process" className="process">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">{t.process.eyebrow}</div>
          <h2 className="section-title">
            {t.process.title}<br />
            <span className="muted">{t.process.title2}</span>
          </h2>
        </div>

        <div className="process-track">
          <div className="process-line"><span className="process-line-fill" /></div>
          {t.process.steps.map((s, i) => (
            <div key={i} className="process-step reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="process-dot">
                <span className="process-dot-inner" />
              </div>
              <div className="process-num mono">{s.n}</div>
              <h3 className="process-title">{s.t}</h3>
              <p className="process-body">{s.d}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .process-track {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          position: relative;
          padding-top: 60px;
        }
        .process-line {
          position: absolute;
          top: 76px;
          left: 12.5%;
          right: 12.5%;
          height: 1px;
          background: var(--line);
          z-index: 1;
        }
        .process-line-fill {
          display: block;
          height: 100%;
          width: 100%;
          background: linear-gradient(90deg, var(--purple), var(--magenta), var(--purple));
          background-size: 200% 100%;
          animation: shimmer 4s linear infinite;
        }
        @keyframes shimmer {
          to { background-position: -200% 0; }
        }
        .process-step {
          position: relative;
          z-index: 2;
          padding-right: 24px;
        }
        .process-dot {
          width: 32px; height: 32px;
          border-radius: 50%;
          background: var(--bg);
          border: 1px solid var(--line-strong);
          display: grid;
          place-items: center;
          margin-bottom: 32px;
          position: relative;
        }
        .process-dot-inner {
          width: 12px; height: 12px;
          border-radius: 50%;
          background: var(--purple);
          box-shadow: 0 0 20px var(--purple);
        }
        .process-num {
          font-size: 11px;
          color: var(--ink-mute);
          text-transform: uppercase;
          letter-spacing: 0.18em;
          margin-bottom: 12px;
        }
        .process-title {
          font-size: 28px;
          font-weight: 500;
          letter-spacing: -0.02em;
          margin-bottom: 12px;
        }
        .process-body {
          color: var(--ink-dim);
          line-height: 1.5;
          font-size: 15px;
        }
        @media (max-width: 880px) {
          .process-track { grid-template-columns: 1fr; gap: 32px; }
          .process-line { display: none; }
        }
      `}</style>
    </section>
  );
}

function Stats({ t }) {
  return (
    <section id="stats" className="stats" style={{ padding: '60px 0' }}>
      <div className="container">
        <div className="stats-grid">
          {t.stats.items.map((s, i) => (
            <div key={i} className="stat-block reveal" style={{ transitionDelay: `${i * 0.05}s` }}>
              <div className="stat-num">
                <CountUp to={s.n} prefix={s.prefix || ''} suffix={s.suffix || ''} decimals={s.n % 1 ? 1 : 0} />
              </div>
              <div className="stat-label mono">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          border: 1px solid var(--line);
          border-radius: 20px;
          overflow: hidden;
          background: linear-gradient(180deg, rgba(168, 85, 247, 0.06), rgba(168, 85, 247, 0));
        }
        .stat-block {
          padding: 48px 32px;
          border-right: 1px solid var(--line);
          position: relative;
        }
        .stat-block:last-child { border-right: 0; }
        .stat-num {
          font-size: clamp(40px, 5vw, 72px);
          font-weight: 500;
          letter-spacing: -0.04em;
          line-height: 1;
          margin-bottom: 12px;
          color: var(--ink);
        }
        .stat-label {
          font-size: 11px;
          color: var(--ink-mute);
          text-transform: uppercase;
          letter-spacing: 0.18em;
        }
        @media (max-width: 880px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .stat-block { border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); }
          .stat-block:nth-child(2n) { border-right: 0; }
          .stat-block:nth-last-child(-n+2) { border-bottom: 0; }
        }
      `}</style>
    </section>
  );
}

Object.assign(window, { Services, Process, Stats });
