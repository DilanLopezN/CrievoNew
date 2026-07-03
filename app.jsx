// Main App + Nav + Marquee strip
const { useState, useEffect } = React;

function Nav({ lang, setLang, t }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = ['home', 'services', 'work', 'process', 'impact', 'contact'];
    const sections = ids.map(id => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return;
    const io = new IntersectionObserver((entries) => {
      // pick the entry with biggest intersection ratio that's currently intersecting
      const visible = entries.filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: '-30% 0px -50% 0px', threshold: [0, 0.2, 0.5, 1] });
    sections.forEach(s => io.observe(s));
    return () => io.disconnect();
  }, [lang]);

  // expose active section to body for global accents + toggle .section-active class
  useEffect(() => {
    document.body.dataset.activeSection = active;
    document.querySelectorAll('section').forEach(s => {
      s.classList.toggle('section-active', s.id === active);
    });
  }, [active]);

  const link = (id, label) => (
    <li>
      <a href={`#${id}`} className={active === id ? 'is-active' : ''}>
        <span className="nav-marker" />
        {label}
      </a>
    </li>
  );

  return (
    <nav className={"nav " + (scrolled ? "scrolled" : "")}>
      <a href="#home" className="logo">
        <img className="logo-mark" src="assets/logo-white.png" alt="" />
        <span>Crievo</span>
      </a>
      <ul className="nav-links">
        {link('services', t.nav.services)}
        {link('work', t.nav.work)}
        {link('process', t.nav.process)}
        {link('impact', t.nav.impact)}
        {link('contact', t.nav.contact)}
        <li>
          <div className="lang-toggle">
            <button className={lang === 'pt' ? 'active' : ''} onClick={() => setLang('pt')}>PT</button>
            <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
          </div>
        </li>
      </ul>
    </nav>
  );
}

function SectionDivider({ variant = 'line' }) {
  return (
    <div className={`section-divider divider-${variant} reveal`}>
      {variant === 'line' && (
        <>
          <span className="divider-line" />
          <span className="divider-orb" />
          <span className="divider-line" />
        </>
      )}
      {variant === 'dots' && (
        <div className="divider-dots">
          {Array.from({ length: 24 }).map((_, i) => <span key={i} style={{ animationDelay: `${i * 0.06}s` }} />)}
        </div>
      )}
      {variant === 'pulse' && (
        <div className="divider-pulse">
          <span className="divider-pulse-bar" />
        </div>
      )}
    </div>
  );
}

function WhatsAppFAB({ t }) {
  const phone = '5511926288319'; // 55 (BR) + 11 (SP) + número
  const w = t.whatsapp || {};
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(w.message || '')}`;
  return (
    <a className="wa-fab" href={href} target="_blank" rel="noopener noreferrer" aria-label={w.aria}>
      <svg className="wa-fab-icon" viewBox="0 0 32 32" width="26" height="26" aria-hidden="true" focusable="false">
        <path fill="currentColor" d="M16.001 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.6 4.46 1.74 6.4L3.2 28.8l6.56-1.72a12.74 12.74 0 0 0 6.24 1.62h.005c7.06 0 12.8-5.74 12.8-12.8 0-3.42-1.33-6.64-3.75-9.06A12.71 12.71 0 0 0 16.001 3.2Zm0 23.04h-.004a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-4.02 1.05 1.07-3.92-.25-.4a10.6 10.6 0 0 1-1.63-5.66c0-5.86 4.77-10.63 10.64-10.63 2.84 0 5.51 1.11 7.52 3.12a10.56 10.56 0 0 1 3.11 7.52c0 5.87-4.77 10.64-10.63 10.64Zm5.83-7.96c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1 1.25-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.54-.71-.55-.18-.01-.4-.01-.61-.01-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65 0 1.56 1.14 3.07 1.3 3.28.16.21 2.24 3.42 5.42 4.8.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.89-.77 2.16-1.52.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37Z"/>
      </svg>
      <span className="wa-fab-label">{w.label}</span>
      <style>{`
        .wa-fab {
          position: fixed;
          left: 24px;
          bottom: 24px;
          z-index: 2147483645;
          display: inline-flex;
          align-items: center;
          gap: 0;
          height: 58px;
          padding: 0 16px;
          border-radius: 999px;
          background: #25D366;
          color: #06270f;
          text-decoration: none;
          font-family: var(--font-mono);
          font-size: 13px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          box-shadow: 0 10px 30px rgba(37, 211, 102, 0.35), 0 0 0 0 rgba(37, 211, 102, 0.5);
          transition: transform 0.3s var(--ease-spring), box-shadow 0.3s var(--ease), padding 0.3s var(--ease);
          animation: waPulse 2.8s ease-in-out infinite;
        }
        .wa-fab-icon { flex-shrink: 0; }
        .wa-fab-label {
          max-width: 0;
          overflow: hidden;
          white-space: nowrap;
          opacity: 0;
          transition: max-width 0.4s var(--ease), opacity 0.3s var(--ease), margin-left 0.4s var(--ease);
        }
        .wa-fab:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 40px rgba(37, 211, 102, 0.5);
          animation: none;
        }
        .wa-fab:hover .wa-fab-label {
          max-width: 160px;
          opacity: 1;
          margin-left: 10px;
        }
        @keyframes waPulse {
          0%, 100% { box-shadow: 0 10px 30px rgba(37, 211, 102, 0.35), 0 0 0 0 rgba(37, 211, 102, 0.5); }
          50% { box-shadow: 0 10px 30px rgba(37, 211, 102, 0.35), 0 0 0 12px rgba(37, 211, 102, 0); }
        }
        @media (max-width: 720px) {
          .wa-fab { left: 16px; bottom: 16px; height: 54px; padding: 0 14px; }
        }
      `}</style>
    </a>
  );
}

function MarqueeStrip({ items }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {doubled.map((it, i) => (
          <span key={i} className="marquee-item">
            <span className="star">✦</span>
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "hue": 280,
  "accent": "#a855f7",
  "showCursor": true,
  "showGrid": true,
  "showGrain": true,
  "intensity": 8
}/*EDITMODE-END*/;

function App() {
  const [lang, setLang] = useState('pt');
  const [tweaks, setTweak] = window.useTweaks ? window.useTweaks(TWEAK_DEFAULTS) : [TWEAK_DEFAULTS, () => {}];

  const t = window.CRIEVO_COPY[lang];

  useCursor();
  useReveal();

  // Apply tweaks as CSS vars on root
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--purple', tweaks.accent);
    // Derive other shades from hue
    const h = tweaks.hue;
    root.style.setProperty('--purple-bright', `oklch(0.78 0.18 ${h})`);
    root.style.setProperty('--purple-deep', `oklch(0.50 0.22 ${h})`);
    root.style.setProperty('--magenta', `oklch(0.65 0.27 ${(h + 40) % 360})`);
    root.style.setProperty('--line', `oklch(0.65 0.20 ${h} / 0.16)`);
    root.style.setProperty('--line-strong', `oklch(0.65 0.20 ${h} / 0.42)`);
    document.body.classList.toggle('no-cursor', !tweaks.showCursor);
    document.body.classList.toggle('no-grid', !tweaks.showGrid);
    document.body.classList.toggle('no-grain', !tweaks.showGrain);
  }, [tweaks]);

  // Re-trigger reveal observer whenever lang changes (so re-rendered text re-animates)
  useEffect(() => {
    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => {
        el.classList.add('in');
      });
    }, 50);
  }, [lang]);

  const TP = window.TweaksPanel;
  const TweakSection = window.TweakSection;
  const TweakSlider = window.TweakSlider;
  const TweakToggle = window.TweakToggle;
  const TweakColor = window.TweakColor;
  const TweakRadio = window.TweakRadio;

  return (
    <>
      <div className="grid-bg" />
      <div className="cursor-blob" />
      <div className="cursor-dot" />

      <Nav lang={lang} setLang={setLang} t={t} />
      <Hero t={t} lang={lang} />
      <SectionDivider />
      <MarqueeStrip items={t.marquee} />
      <Services t={t} />
      <SectionDivider variant="dots" />
      <Stats t={t} />
      <Work t={t} />
      <SectionDivider variant="pulse" />
      <Process t={t} />
      <Impact t={t} lang={lang} />
      <Logos t={t} />
      <SectionDivider variant="dots" />
      <Contact t={t} lang={lang} />
      <Footer t={t} lang={lang} />

      <WhatsAppFAB t={t} />

      {TP && (
        <TP title="Tweaks">
          <TweakSection title="Color">
            <TweakColor
              label="Accent"
              value={tweaks.accent}
              options={['#a855f7', '#d946ef', '#7c3aed', '#06b6d4', '#22d3ee', '#84cc16']}
              onChange={(v) => {
                // also bump hue when user picks
                const map = {'#a855f7':280,'#d946ef':310,'#7c3aed':265,'#06b6d4':190,'#22d3ee':195,'#84cc16':100};
                setTweak({ accent: v, hue: map[v] || 280 });
              }}
            />
            <TweakSlider label="Hue shift" value={tweaks.hue} min={0} max={360} step={5}
              onChange={(v) => setTweak('hue', v)} />
          </TweakSection>
          <TweakSection title="FX">
            <TweakToggle label="Custom cursor" value={tweaks.showCursor} onChange={(v) => setTweak('showCursor', v)} />
            <TweakToggle label="Grid background" value={tweaks.showGrid} onChange={(v) => setTweak('showGrid', v)} />
            <TweakToggle label="Film grain" value={tweaks.showGrain} onChange={(v) => setTweak('showGrain', v)} />
            <TweakSlider label="Animation intensity" value={tweaks.intensity} min={1} max={10} step={1}
              onChange={(v) => setTweak('intensity', v)} />
          </TweakSection>
        </TP>
      )}
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
