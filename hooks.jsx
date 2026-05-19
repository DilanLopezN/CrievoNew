// Cursor + scroll reveal helpers + scramble text
const { useEffect, useRef, useState } = React;

function useCursor() {
  useEffect(() => {
    const blob = document.querySelector('.cursor-blob');
    const dot = document.querySelector('.cursor-dot');
    if (!blob || !dot) return;
    let bx = window.innerWidth / 2, by = window.innerHeight / 2;
    let dx = bx, dy = by;
    let tx = bx, ty = by;
    const move = e => { tx = e.clientX; ty = e.clientY; };
    window.addEventListener('mousemove', move);
    let raf;
    const loop = () => {
      bx += (tx - bx) * 0.08;
      by += (ty - by) * 0.08;
      dx += (tx - dx) * 0.35;
      dy += (ty - dy) * 0.35;
      blob.style.transform = `translate(${bx}px, ${by}px) translate(-50%, -50%)`;
      dot.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    const onEnter = () => dot.classList.add('hover');
    const onLeave = () => dot.classList.remove('hover');
    document.querySelectorAll('a, button, .magnetic, .work-card, .service-card').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', move); };
  }, []);
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  });
}

// Scramble text component
function Scramble({ text, trigger = 0, delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const chars = '!<>-_\\/[]{}—=+*^?#________';
    let frame = 0;
    let queue = [];
    const oldText = el.dataset.current || '';
    const newText = text;
    const length = Math.max(oldText.length, newText.length);
    queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 20) + delay;
      const end = start + Math.floor(Math.random() * 30) + 12;
      queue.push({ from, to, start, end, char: '' });
    }
    let raf;
    const update = () => {
      let output = '';
      let complete = 0;
      for (let i = 0; i < queue.length; i++) {
        let { from, to, start, end, char } = queue[i];
        if (frame >= end) {
          complete++;
          output += to;
        } else if (frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = chars[Math.floor(Math.random() * chars.length)];
            queue[i].char = char;
          }
          output += `<span style="color: var(--purple-bright); opacity:0.85">${char}</span>`;
        } else {
          output += from;
        }
      }
      el.innerHTML = output;
      if (complete === queue.length) { el.dataset.current = newText; return; }
      frame++;
      raf = requestAnimationFrame(update);
    };
    update();
    return () => cancelAnimationFrame(raf);
  }, [text, trigger]);
  return <span ref={ref} className="scramble" />;
}

// Animated counter
function CountUp({ to, prefix = '', suffix = '', decimals = 0 }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const start = performance.now();
          const dur = 1800;
          const tick = (t) => {
            const p = Math.min(1, (t - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(to * eased);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  const display = decimals ? value.toFixed(decimals) : Math.floor(value).toString();
  return <span ref={ref} className="mono">{prefix}{display}{suffix}</span>;
}

// Magnetic wrapper
function Magnetic({ children, strength = 0.35 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };
    const onLeave = () => { el.style.transform = ''; };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [strength]);
  return <span ref={ref} className="magnetic" style={{ display: 'inline-block', transition: 'transform 0.4s var(--ease)' }}>{children}</span>;
}

Object.assign(window, { useCursor, useReveal, Scramble, CountUp, Magnetic });
