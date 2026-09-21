import { useEffect, useRef, useState } from 'react';

const LENS = 184;
const SCALE = 1.6;

const SKELETON_BARS = ['', 's', '', 'x', '', 's', '', '', 's', '', 'x', ''];

const Column = ({ title, bars, children }) => (
  <div className="fm-col">
    <div className="fm-col-h">{title}</div>
    <div className="fm-col-r" aria-hidden="true" />
    {bars.map((size, i) => (
      <div key={i} className={`fm-col-l ${size}`} aria-hidden="true" />
    ))}
    {children}
  </div>
);

const SceneColumns = ({ withPortrait = false, portraitRef }) => (
  <>
    <Column title="The Morning Brief" bars={SKELETON_BARS} />
    <Column title="Markets &amp; Metals" bars={SKELETON_BARS} />
    <Column title="On the Record" bars={SKELETON_BARS.slice(0, 5)}>
      {withPortrait && (
        <div ref={portraitRef} className="fm-portrait" aria-hidden="true">
          AA
        </div>
      )}
      {withPortrait && <div className="fm-col-l s" aria-hidden="true" />}
    </Column>
    <Column title="Home &amp; Exports" bars={SKELETON_BARS} />
    <Column title="The Weather" bars={SKELETON_BARS} />
  </>
);

const NewsIntro = ({ onDone }) => {
  const lensRef = useRef(null);
  const winRef = useRef(null);
  const innerRef = useRef(null);
  const subjectRef = useRef(null);
  const stampRef = useRef(null);
  const sheetRef = useRef(null);
  const doneRef = useRef(onDone);
  const rafRef = useRef(0);
  const foundRef = useRef(false);
  const timersRef = useRef([]);

  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    doneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      const t = window.setTimeout(() => doneRef.current?.(), 0);
      return () => window.clearTimeout(t);
    }

    document.body.classList.add('is-locked');
    const timers = timersRef.current;

    const moveLens = (clientX, clientY) => {
      const lens = lensRef.current;
      const win = winRef.current;
      const inner = innerRef.current;
      if (!lens || !win || !inner) return;

      lens.style.opacity = '1';
      lens.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      win.style.transform = `translate3d(${clientX - LENS / 2}px, ${clientY - LENS / 2}px, 0)`;
      inner.style.transformOrigin = '0 0';
      inner.style.transform = `translate3d(${LENS / 2 - clientX * SCALE}px, ${
        LENS / 2 - clientY * SCALE
      }px, 0) scale(${SCALE})`;

      const subject = subjectRef.current;
      if (subject && !foundRef.current) {
        const rect = subject.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.hypot(clientX - cx, clientY - cy);
        if (dist < 130) {
          foundRef.current = true;
          stampRef.current?.classList.add('is-showing');
          timers.push(
            window.setTimeout(() => {
              sheetRef.current?.classList.add('is-raising');
              setExiting(true);
              timers.push(
                window.setTimeout(() => {
                  document.body.classList.remove('is-locked');
                  doneRef.current?.();
                }, 520)
              );
            }, 850)
          );
        }
      }
    };

    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;

    const onPointerMove = (event) => {
      lastX = event.clientX;
      lastY = event.clientY;
      if (!rafRef.current) {
        rafRef.current = window.requestAnimationFrame(() => {
          moveLens(lastX, lastY);
          rafRef.current = 0;
        });
      }
    };

    const onPointerDown = (event) => {
      moveLens(event.clientX, event.clientY);
      lastX = event.clientX;
      lastY = event.clientY;
    };

    const skip = () => {
      if (foundRef.current) return;
      foundRef.current = true;
      document.body.classList.remove('is-locked');
      doneRef.current?.();
    };

    const onKey = (event) => {
      if (event.key === 'Escape') skip();
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKey);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      timers.forEach((t) => window.clearTimeout(t));
      document.body.classList.remove('is-locked');
    };
  }, []);

  return (
    <div className={`fm-intro ${exiting ? 'fm-intro--exit' : ''}`} role="presentation">
      <div className="fm-zoom" aria-hidden="true">
        <div className="fm-scene fm-scene--base">
          <SceneColumns withPortrait portraitRef={subjectRef} />
        </div>
      </div>

      <div className="fm-masthead">
        <div className="fm-masthead-k">Wanted</div>
        <div className="fm-masthead-t">Aryan Anand</div>
        <div className="fm-masthead-r" aria-hidden="true" />
      </div>

      <div className="fm-dim" aria-hidden="true" />
      <div className="fm-grain" aria-hidden="true" />

      <div
        ref={lensRef}
        className="fm-lens"
        style={{ opacity: 0, top: 0, left: 0 }}
        aria-hidden="true"
      >
        <div className="fm-lens-glass" />
        <div className="fm-lens-rim" />
        <div className="fm-lens-handle" />
      </div>

      <div ref={winRef} className="fm-magwin" style={{ width: LENS, height: LENS }} aria-hidden="true">
        <div ref={innerRef} className="fm-maginner" style={{ width: '100vw', height: '100vh' }}>
          <div className="fm-scene fm-scene--mag">
            <SceneColumns withPortrait />
          </div>
        </div>
      </div>

      <div ref={stampRef} className="fm-stampwrap">
        <div className="fm-stamp">Subject Located</div>
      </div>

      <div className="fm-hint">Take the glass &mdash; find the subject</div>

      <button
        className="fm-skip"
        type="button"
        onClick={() => {
          if (foundRef.current) return;
          foundRef.current = true;
          document.body.classList.remove('is-locked');
          doneRef.current?.();
        }}
      >
        Skip intro &rarr;
      </button>

      <div ref={sheetRef} className="fm-sheet" aria-hidden="true" />
    </div>
  );
};

export default NewsIntro;