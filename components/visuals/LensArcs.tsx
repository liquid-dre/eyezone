interface LensArcsProps {
  className?: string;
}

export default function LensArcs({ className = "" }: LensArcsProps) {
  return (
    <div className={`lens-arcs ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 800 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="lens-circle lens-circle-1"
          cx="400"
          cy="400"
          r="200"
          stroke="var(--blue-200)"
          strokeWidth="1"
          strokeOpacity="0.4"
          fill="none"
        />
        <circle
          className="lens-circle lens-circle-2"
          cx="400"
          cy="400"
          r="300"
          stroke="var(--blue-200)"
          strokeWidth="0.5"
          strokeOpacity="0.25"
          fill="none"
        />
        <circle
          className="lens-circle lens-circle-3"
          cx="400"
          cy="400"
          r="380"
          stroke="var(--blue-100)"
          strokeWidth="0.5"
          strokeOpacity="0.15"
          fill="none"
        />
        {/* Refraction arcs */}
        <path
          className="lens-arc lens-arc-1"
          d="M200 400 Q400 200 600 400"
          stroke="var(--blue-300)"
          strokeWidth="0.75"
          strokeOpacity="0.3"
          fill="none"
        />
        <path
          className="lens-arc lens-arc-2"
          d="M200 400 Q400 600 600 400"
          stroke="var(--blue-300)"
          strokeWidth="0.75"
          strokeOpacity="0.3"
          fill="none"
        />
      </svg>
    </div>
  );
}
