import React from "react";

export function InfiniteMovingCards({ items = [], direction = "right", speed = "slow" }) {
  const duration = speed === "slow" ? "40s" : speed === "fast" ? "12s" : "24s";
  const dir = direction === "right" ? "normal" : "reverse";

  // Duplicate items so the marquee appears continuous
  const doubled = [...items, ...items];

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <style>{`
        .imc-track {
          display: flex;
          gap: 1rem;
          align-items: center;
          animation-name: imc-move;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes imc-move {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .imc-card {
          min-width: 320px;
          max-width: 420px;
          background: rgba(255,255,255,0.9);
          color: #111;
          padding: 1rem;
          border-radius: 0.5rem;
          box-shadow: 0 6px 18px rgba(0,0,0,0.08);
        }
        .imc-quote { font-size: 0.95rem; line-height: 1.4; }
        .imc-meta { margin-top: 0.75rem; font-weight: 600; }
      `}</style>

      <div
        className="imc-track"
        style={{
          width: "200%",
          animationDuration: duration,
          animationDirection: dir,
        }}
      >
        {doubled.map((t, i) => (
          <div className="imc-card" key={i}>
            <div className="imc-quote">{t.quote}</div>
            <div className="imc-meta">{t.name} — <span style={{ fontWeight: 400 }}>{t.title}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InfiniteMovingCards;
