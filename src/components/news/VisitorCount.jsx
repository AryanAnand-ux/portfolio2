import { useEffect, useState } from 'react';

const NAMESPACE = 'aryan-portfolio2';
const COUNTER = 'visitors';
const API = 'https://abacus.jasoncameron.dev';
const CACHE_KEY = 'nw-visitor-count';
const SEEN_KEY = 'nw-visit-counted';

const readCache = () => {
  try {
    const value = Number(window.localStorage.getItem(CACHE_KEY));
    return Number.isFinite(value) && value > 0 ? value : null;
  } catch {
    return null;
  }
};

const storeCache = (value) => {
  try {
    window.localStorage.setItem(CACHE_KEY, String(value));
  } catch {
    /* private mode — stay silent */
  }
};

const VisitorCount = () => {
  const [count, setCount] = useState(readCache);

  useEffect(() => {
    let cancelled = false;

    const fetchCount = async () => {
      // Count once per session; read-only on repeat views.
      let counted = true;
      try {
        counted = window.sessionStorage.getItem(SEEN_KEY) === '1';
        if (!counted) window.sessionStorage.setItem(SEEN_KEY, '1');
      } catch {
        /* private mode — read-only */
      }

      try {
        const res = await window.fetch(
          `${API}/${counted ? 'info' : 'hit'}/${NAMESPACE}/${COUNTER}`,
          { mode: 'cors' }
        );
        if (!res.ok) throw new Error(`counter responded ${res.status}`);
        const data = await res.json();
        let value = Number(data?.value);
        if (!Number.isFinite(value)) {
          if (data?.exists === false) {
            // Counter expired or missing — recreate by counting this visit.
            const retry = await window.fetch(`${API}/hit/${NAMESPACE}/${COUNTER}`, {
              mode: 'cors',
            });
            if (!retry.ok) return;
            value = Number((await retry.json())?.value);
          }
          if (!Number.isFinite(value)) return;
        }
        if (cancelled) return;
        setCount(value);
        storeCache(value);
      } catch {
        /* offline or API down — keep the cached count, or stay hidden */
      }
    };

    fetchCount();
    return () => {
      cancelled = true;
    };
  }, []);

  if (count == null) return null;
  return (
    <span className="nw-visitors" title="Total visits recorded at the front desk">
      Visitors on record: <b>{count.toLocaleString('en-IN')}</b>
    </span>
  );
};

export default VisitorCount;
