const WINDOW_MS = 60_000; // 1 minute

const hits = new Map<string, number>();

/** Returns true if the request should be allowed, false if rate-limited. */
export function rateLimit(ip: string): boolean {
  const now = Date.now();
  const lastHit = hits.get(ip);

  if (lastHit && now - lastHit < WINDOW_MS) {
    return false;
  }

  hits.set(ip, now);

  // Lazy cleanup — prevent unbounded growth
  if (hits.size > 10_000) {
    for (const [key, ts] of hits) {
      if (now - ts > WINDOW_MS) hits.delete(key);
    }
  }

  return true;
}
