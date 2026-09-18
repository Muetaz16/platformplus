/**
 * Ambient animated background — drifting glow orbs + rising particles.
 * Purely decorative (pointer-events: none), sits behind all content.
 * Motion is CSS-only and disabled under prefers-reduced-motion (see globals.css).
 */
export default function BackgroundFX() {
  const particles = Array.from({ length: 14 });
  return (
    <div className="bg-fx" aria-hidden>
      <span className="orb orb-1" />
      <span className="orb orb-2" />
      <span className="orb orb-3" />
      <span className="orb orb-4" />
      <span className="beam" />
      <div className="particles">
        {particles.map((_, i) => (
          <span className="particle" key={i} style={{ '--i': i }} />
        ))}
      </div>
    </div>
  );
}
