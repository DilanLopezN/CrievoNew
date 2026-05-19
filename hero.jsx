// Hero section with kinetic typography
const { useEffect: useEffectH, useRef: useRefH, useState: useStateH } = React;

function Hero({ t, lang }) {
  const blobRef = useRefH(null);

  return (
    <section id="home" className="hero" style={{ paddingTop: 180, paddingBottom: 80, overflow: 'hidden' }}>
      <div className="halo" style={{ width: 600, height: 600, background: 'var(--purple-deep)', top: '5%', right: '-10%', opacity: 0.4 }} />
      <div className="halo" style={{ width: 500, height: 500, background: 'var(--magenta)', bottom: '10%', left: '-15%', opacity: 0.25 }} />

      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 72 }}>
          <div className="eyebrow reveal">{t.hero.eyebrow}</div>
          <div className="eyebrow reveal" style={{ color: 'var(--ink-mute)' }}>
            <span style={{ width: 8, height: 8, background: 'var(--lime)', borderRadius: '50%', boxShadow: '0 0 12px var(--lime)' }} />
            {lang === 'pt' ? 'Aceitando 2 projetos · Q3 2026' : 'Booking 2 projects · Q3 2026'}
          </div>
        </div>

        <h1 className="hero-title">
          <span className="hero-line reveal">
            <span className="hero-word">{t.hero.titleA}</span>
            <span className="hero-orb">
              <span className="orb-inner" />
              <span className="orb-ring" />
            </span>
          </span>
          <span className="hero-line reveal hero-line-italic">
            <span className="hero-word italic">{t.hero.titleB}</span>
          </span>
          <span className="hero-line reveal">
            <span className="hero-word">{t.hero.titleC}</span>
          </span>
          <span className="hero-line reveal hero-line-mark">
            <span className="hero-word">{t.hero.titleD}</span>
            <span className="hero-cursor" />
          </span>
        </h1>

        <div className="hero-bottom reveal">
          <p className="hero-sub">{t.hero.sub}</p>
          <div className="hero-actions">
            <Magnetic><a href="#contact" className="btn btn-primary">{t.hero.ctaPrimary} <span className="arrow">→</span></a></Magnetic>
            <Magnetic><a href="#work" className="btn">{t.hero.ctaSecondary} <span className="arrow">→</span></a></Magnetic>
          </div>
        </div>

        <div className="hero-stats reveal">
          {t.hero.stats.map((s, i) => (
            <div key={i} className="hero-stat">
              <div className="hero-stat-k">{s.k}</div>
              <div className="hero-stat-v">{s.v}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .hero-title {
          font-size: clamp(60px, 11vw, 200px);
          font-weight: 500;
          line-height: 0.88;
          letter-spacing: -0.05em;
          margin-bottom: 80px;
        }
        .hero-line {
          display: flex;
          align-items: center;
          gap: 32px;
          flex-wrap: wrap;
        }
        .hero-line-italic { padding-left: 8vw; }
        .hero-line-mark { justify-content: flex-end; }
        .hero-word.italic {
          font-style: italic;
          font-weight: 300;
          color: var(--purple-bright);
          background: linear-gradient(180deg, var(--purple-bright), var(--purple-deep));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-orb {
          width: clamp(60px, 9vw, 140px);
          height: clamp(60px, 9vw, 140px);
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, var(--purple-bright), var(--purple-deep) 50%, #2a0a4a 100%);
          position: relative;
          flex-shrink: 0;
          box-shadow: 0 0 80px rgba(168, 85, 247, 0.7), inset -10px -10px 30px rgba(0,0,0,0.4);
          animation: float 6s ease-in-out infinite;
        }
        .hero-orb .orb-inner {
          position: absolute;
          inset: 12%;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, rgba(255,255,255,0.4), transparent 50%);
        }
        .hero-orb .orb-ring {
          position: absolute;
          inset: -16px;
          border-radius: 50%;
          border: 1px solid rgba(168, 85, 247, 0.4);
          animation: spin 12s linear infinite;
        }
        .hero-orb .orb-ring::before {
          content: "";
          position: absolute;
          top: -4px; left: 50%;
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--lime);
          box-shadow: 0 0 16px var(--lime);
          transform: translateX(-50%);
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .hero-cursor {
          display: inline-block;
          width: clamp(12px, 1.5vw, 20px);
          height: clamp(60px, 9vw, 140px);
          background: var(--purple);
          margin-left: 8px;
          animation: blink 1s steps(2) infinite;
          box-shadow: 0 0 24px var(--purple);
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
        .hero-bottom {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          padding: 48px 0;
          border-top: 1px solid var(--line);
          align-items: end;
        }
        .hero-sub {
          font-size: clamp(16px, 1.4vw, 19px);
          color: var(--ink-dim);
          max-width: 540px;
          line-height: 1.5;
        }
        .hero-actions {
          display: flex;
          gap: 16px;
          justify-self: end;
          flex-wrap: wrap;
        }
        .hero-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 48px;
          padding-top: 48px;
          border-top: 1px solid var(--line);
        }
        .hero-stat-k {
          font-size: clamp(36px, 4.5vw, 64px);
          font-weight: 500;
          letter-spacing: -0.04em;
          color: var(--ink);
          margin-bottom: 8px;
        }
        .hero-stat-v {
          font-family: var(--font-mono);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--ink-mute);
        }
        @media (max-width: 880px) {
          .hero-bottom { grid-template-columns: 1fr; }
          .hero-actions { justify-self: start; }
          .hero-line-italic { padding-left: 0; }
          .hero-line-mark { justify-content: flex-start; }
          .hero-stats { grid-template-columns: 1fr; gap: 24px; }
        }
      `}</style>
    </section>
  );
}

window.Hero = Hero;
