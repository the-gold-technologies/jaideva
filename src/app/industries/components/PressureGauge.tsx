import React from "react";

interface PressureGaugeProps {
  value?: number; // 0 to 100
  label?: string;
  sublabel?: string;
}

export default function PressureGauge({
  value = 78,
  label = "OIL VISCOSITY & PRESSURE",
  sublabel = "PEAK EFFICIENCY",
}: PressureGaugeProps) {
  const cx = 160;
  const cy = 160;
  const startAngle = 135;
  const endAngle = 405;
  const majorTicks = 9;

  const toXY = (angleDeg: number, r: number) => {
    const rad = (angleDeg * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

  const needleFraction = Math.min(Math.max(value / 100, 0), 1);
  const needleAngle = startAngle + needleFraction * (endAngle - startAngle);
  const needleTip = toXY(needleAngle, 98);
  const needleBaseA = toXY(needleAngle + 90, 7);
  const needleBaseB = toXY(needleAngle - 90, 7);

  const ticks = Array.from({ length: majorTicks }, (_, i) => {
    const angle = startAngle + (i * (endAngle - startAngle)) / (majorTicks - 1);
    const outer = toXY(angle, 126);
    const inner = toXY(angle, 110);
    const isOptimal = i >= 5 && i <= 7;
    return { outer, inner, isOptimal, i };
  });

  return (
    <div className="relative flex flex-col items-center">
      {/* Ambient glow behind gauge */}
      <div className="absolute inset-0 -z-10 rounded-full bg-[#F4B24D]/15 blur-2xl" />

      <svg
        viewBox="0 0 320 320"
        className="h-[260px] w-[260px] sm:h-[300px] sm:w-[300px] drop-shadow-[0_12px_32px_rgba(0,0,0,0.5)]"
        role="img"
        aria-label="Oil pressure and viscosity monitoring gauge"
      >
        <defs>
          <radialGradient id="gaugeBg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0a2240" />
            <stop offset="70%" stopColor="#05162a" />
            <stop offset="100%" stopColor="#020b16" />
          </radialGradient>
          <linearGradient id="needleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#C86218" />
          </linearGradient>
          <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="60%" stopColor="#F4B24D" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Bezel */}
        <circle
          cx={cx}
          cy={cy}
          r={150}
          fill="none"
          stroke="#1e3a61"
          strokeWidth={4}
        />
        <circle
          cx={cx}
          cy={cy}
          r={144}
          fill="url(#gaugeBg)"
          stroke="#0d284a"
          strokeWidth={2}
        />

        {/* Inner Gauge Rim Track */}
        <circle
          cx={cx}
          cy={cy}
          r={128}
          fill="none"
          stroke="#0b2342"
          strokeWidth={6}
        />

        {/* Optimal Range Arc Highlight (135 to 405 deg) */}
        <path
          d="M 69.5 250.5 A 128 128 0 1 1 250.5 250.5"
          fill="none"
          stroke="url(#arcGrad)"
          strokeWidth={3}
          strokeDasharray="4 6"
          opacity="0.4"
        />

        {/* Ticks */}
        {ticks.map((t) => (
          <line
            key={t.i}
            x1={t.inner.x}
            y1={t.inner.y}
            x2={t.outer.x}
            y2={t.outer.y}
            stroke={t.isOptimal ? "#22c55e" : "#F4B24D"}
            strokeWidth={t.isOptimal ? 3.5 : 2}
            strokeLinecap="round"
            filter={t.isOptimal ? "url(#glow)" : undefined}
          />
        ))}

        {/* Center Target Indicator Arc */}
        <circle
          cx={cx}
          cy={cy}
          r={45}
          fill="none"
          stroke="#0e325c"
          strokeWidth={1.5}
          strokeDasharray="3 4"
        />

        {/* Needle with drop shadow and smooth styling */}
        <polygon
          points={`${needleTip.x},${needleTip.y} ${needleBaseA.x},${needleBaseA.y} ${needleBaseB.x},${needleBaseB.y}`}
          fill="url(#needleGrad)"
          filter="url(#glow)"
        />

        {/* Center Cap with dual ring */}
        <circle
          cx={cx}
          cy={cy}
          r={16}
          fill="#0a2240"
          stroke="#F4B24D"
          strokeWidth={3}
        />
        <circle cx={cx} cy={cy} r={6} fill="#F4B24D" />

        {/* Technical Sub-readout Text */}
        <text
          x={cx}
          y={cy + 60}
          textAnchor="middle"
          fill="#F4B24D"
          fontSize="10"
          fontWeight={800}
          letterSpacing="2.5"
        >
          {label}
        </text>
        <text
          x={cx}
          y={cy + 80}
          textAnchor="middle"
          fill="#ffffff"
          fontSize="13"
          fontWeight={900}
          letterSpacing="1.5"
        >
          {sublabel}
        </text>
      </svg>
    </div>
  );
}
