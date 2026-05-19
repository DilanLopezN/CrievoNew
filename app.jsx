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
        <span className="logo-mark">C</span>
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
