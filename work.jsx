// Work / Stack / Logos sections
function Work({ t }) {
  return (
    <section id="work" className="work">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">{t.work.eyebrow}</div>
          <h2 className="section-title">
            {t.work.title}<br />
            <span className="muted">{t.work.title2}</span>
          </h2>
        </div>

        <div className="work-grid">
          {t.work.items.map((w, i) => (
            <article key={i} className="work-card reveal" style={{ transitionDelay: `${(i % 2) * 0.08}s` }}>
              <div className={`work-thumb thumb-${i}`}>
                <div className="thumb-inner">
                  <div className="thumb-shape" />
                  <div className="thumb-grid" />
                </div>
                <div className="work-tag mono">{w.tag}</div>
              </div>
              <div className="work-meta">
                <div className="work-client mono">{w.c}</div>
                <h3 className="work-title">{w.t}</h3>
                <p className="work-desc">{w.d}</p>
                <div className="work-arrow">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M8 24 L24 8 M24 8 H12 M24 8 V20" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .work-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }
        .work-card {
          border: 1px solid var(--line);
          border-radius: 24px;
          overflow: hidden;
          background: var(--bg-2);
          transition: all 0.4s var(--ease);
          cursor: none;
        }
        .work-card:hover { transform: translateY(-6px); border-color: var(--line-strong); }
        .work-thumb {
          aspect-ratio: 16 / 10;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid var(--line);
          background: var(--bg-3);
        }
        .thumb-inner {
          position: absolute; inset: 0;
          display: grid;
          place-items: center;
        }
        .thumb-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(to right, rgba(168, 85, 247, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(168, 85, 247, 0.08) 1px, transparent 1px);
          background-size: 32px 32px;
          opacity: 0.6;
        }
        .thumb-shape {
          position: relative;
          z-index: 2;
          transition: transform 0.7s var(--ease);
        }
        .work-card:hover .thumb-shape { transform: scale(1.06) rotate(-2deg); }

        .thumb-0 { background: radial-gradient(ellipse at 30% 50%, rgba(168, 85, 247, 0.4), var(--bg-3)); }
        .thumb-0 .thumb-shape {
          width: 280px; height: 180px;
          background: linear-gradient(135deg, var(--purple), var(--purple-deep));
          clip-path: polygon(0 0, 100% 0, 100% 75%, 75% 100%, 0 100%);
          box-shadow: 0 0 80px rgba(168, 85, 247, 0.5);
        }
        .thumb-0 .thumb-shape::before {
          content: "ERP";
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          font-family: var(--font-mono);
          font-size: 14px;
          color: rgba(255,255,255,0.85);
          letter-spacing: 0.3em;
        }
        .thumb-1 { background: radial-gradient(ellipse at 70% 40%, rgba(217, 70, 239, 0.35), var(--bg-3)); }
        .thumb-1 .thumb-shape {
          width: 220px; height: 220px;
          border-radius: 50%;
          background: conic-gradient(from 180deg, var(--magenta), var(--purple), var(--purple-deep), var(--magenta));
          box-shadow: 0 0 80px rgba(217, 70, 239, 0.45);
          position: relative;
        }
        .thumb-1 .thumb-shape::after {
          content: "";
          position: absolute;
          inset: 22%;
          border-radius: 50%;
          background: var(--bg-3);
        }
        .thumb-2 { background: linear-gradient(135deg, rgba(168, 85, 247, 0.18), var(--bg-3)); }
        .thumb-2 .thumb-shape {
          display: grid;
          gap: 10px;
          width: 320px;
        }
        .thumb-2 .thumb-shape::before, .thumb-2 .thumb-shape::after {
          content: "";
          height: 14px;
          border-radius: 4px;
          background: linear-gradient(90deg, var(--purple), transparent);
        }
        .thumb-2 .thumb-shape::after {
          width: 60%;
          background: linear-gradient(90deg, var(--magenta), transparent);
        }
        .thumb-3 { background: radial-gradient(ellipse at 50% 100%, rgba(124, 58, 237, 0.4), var(--bg-3)); }
        .thumb-3 .thumb-shape {
          width: 260px; height: 200px;
          background: var(--bg);
          border: 1px solid var(--purple);
          border-radius: 16px;
          position: relative;
          box-shadow: 0 0 60px rgba(168, 85, 247, 0.4), 12px 12px 0 var(--purple-deep);
          overflow: hidden;
        }
        .thumb-3 .thumb-shape::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 24px;
          background: var(--bg-2);
          border-bottom: 1px solid var(--line);
        }
        .thumb-3 .thumb-shape::after {
          content: "";
          position: absolute;
          inset: 32px 16px 16px 16px;
          background:
            linear-gradient(180deg, var(--purple) 1px, transparent 1px) repeat-y,
            linear-gradient(90deg, transparent 0%, rgba(168, 85, 247, 0.15) 100%);
          background-size: 100% 24px, 100% 100%;
          opacity: 0.6;
        }

        .work-tag {
          position: absolute;
          top: 20px; right: 20px;
          padding: 8px 14px;
          background: rgba(8, 0, 15, 0.75);
          backdrop-filter: blur(10px);
          border: 1px solid var(--line-strong);
          border-radius: 999px;
          font-size: 11px;
          color: var(--ink);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          z-index: 3;
        }
        .work-meta {
          padding: 32px;
          position: relative;
        }
        .work-client {
          font-size: 11px;
          color: var(--purple-bright);
          text-transform: uppercase;
          letter-spacing: 0.18em;
          margin-bottom: 12px;
        }
        .work-title {
          font-size: 32px;
          font-weight: 500;
          letter-spacing: -0.02em;
          margin-bottom: 12px;
          line-height: 1.05;
        }
        .work-desc {
          color: var(--ink-dim);
          line-height: 1.5;
          padding-right: 60px;
        }
        .work-arrow {
          position: absolute;
          right: 32px;
          bottom: 32px;
          color: var(--purple);
          transition: all 0.4s var(--ease);
        }
        .work-card:hover .work-arrow {
          color: var(--purple-bright);
          transform: translate(4px, -4px);
        }
        @media (max-width: 880px) {
          .work-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}

const STACK = [
  { name: "React", cat: "Frontend" },
  { name: "Next.js", cat: "Frontend" },
  { name: "TypeScript", cat: "Language" },
  { name: "Node.js", cat: "Backend" },
  { name: "Python", cat: "Backend" },
  { name: "PostgreSQL", cat: "Database" },
  { name: "Redis", cat: "Database" },
  { name: "AWS", cat: "Cloud" },
  { name: "Docker", cat: "Infra" },
  { name: "Kubernetes", cat: "Infra" },
  { name: "GraphQL", cat: "API" },
  { name: "Stripe", cat: "Payments" },
  { name: "Figma", cat: "Design" },
  { name: "Tailwind", cat: "CSS" },
  { name: "Three.js", cat: "3D" },
  { name: "GSAP", cat: "Motion" },
];

function Stack({ t }) {
  return (
    <section id="stack" className="stack">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">{t.stack.eyebrow}</div>
          <h2 className="section-title">
            {t.stack.title} <span className="muted">{t.stack.title2}</span>
          </h2>
          <p className="section-sub">{t.stack.sub}</p>
        </div>

        <div className="stack-grid">
          {STACK.map((s, i) => (
            <div key={s.name} className="stack-cell reveal" style={{ transitionDelay: `${i * 0.03}s` }}>
              <div className="stack-name">{s.name}</div>
              <div className="stack-cat mono">{s.cat}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .stack-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-top: 1px solid var(--line);
          border-left: 1px solid var(--line);
        }
        .stack-cell {
          padding: 32px 24px;
          border-right: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          position: relative;
          transition: all 0.4s var(--ease);
          background: var(--bg);
          overflow: hidden;
        }
        .stack-cell::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(168, 85, 247, 0.15), transparent);
          opacity: 0;
          transition: opacity 0.4s;
        }
        .stack-cell:hover::before { opacity: 1; }
        .stack-cell:hover { transform: translateY(-2px); }
        .stack-name {
          font-size: 24px;
          font-weight: 500;
          letter-spacing: -0.02em;
          margin-bottom: 8px;
          position: relative;
          z-index: 2;
        }
        .stack-cat {
          font-size: 11px;
          color: var(--ink-mute);
          text-transform: uppercase;
          letter-spacing: 0.18em;
          position: relative;
          z-index: 2;
        }
        @media (max-width: 880px) {
          .stack-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </section>
  );
}

const LOGOS = ["VEXORA", "KLINT", "NORDEN", "FOLIE", "STRATA", "ZENITH", "ARCO", "MERIDIAN", "OBLIK", "PRAXIS"];

function Logos({ t }) {
  return (
    <section className="logos-section" style={{ padding: '80px 0' }}>
      <div className="container">
        <div className="reveal" style={{ marginBottom: 48 }}>
          <div className="eyebrow">{t.logos.eyebrow}</div>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 500, letterSpacing: '-0.04em', marginTop: 24, maxWidth: 760 }}>
            {t.logos.title}
          </h2>
        </div>
      </div>
      <div className="logos-marquee">
        <div className="logos-track">
          {[...LOGOS, ...LOGOS].map((l, i) => (
            <div key={i} className="logo-pill">
              <span className="logo-dot" />
              {l}
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .logos-marquee {
          overflow: hidden;
          padding: 24px 0;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          background: linear-gradient(180deg, rgba(168, 85, 247, 0.04), transparent);
        }
        .logos-track {
          display: flex;
          gap: 24px;
          animation: marquee 32s linear infinite;
          width: max-content;
        }
        .logo-pill {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          padding: 18px 32px;
          border: 1px solid var(--line-strong);
          border-radius: 999px;
          font-family: var(--font-display);
          font-size: 22px;
          letter-spacing: 0.04em;
          color: var(--ink-dim);
          background: rgba(168, 85, 247, 0.05);
          white-space: nowrap;
          transition: all 0.3s var(--ease);
        }
        .logo-pill:hover {
          color: var(--ink);
          border-color: var(--purple);
        }
        .logo-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--purple);
          box-shadow: 0 0 12px var(--purple);
        }
      `}</style>
    </section>
  );
}

Object.assign(window, { Work, Stack, Logos });
