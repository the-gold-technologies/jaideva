"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { RefreshCw } from "lucide-react";

const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function genCode(len = 6): string {
  return Array.from(
    { length: len },
    () => CHARS[Math.floor(Math.random() * CHARS.length)],
  ).join("");
}

// --- Canvas Wave CAPTCHA Renderer ---
function drawCaptcha(canvas: HTMLCanvasElement, code: string) {
  const W = canvas.width;
  const H = canvas.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Background gradient
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#f8fafc");
  bg.addColorStop(1, "#fff7ed");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Noise dots
  for (let i = 0; i < 70; i++) {
    ctx.beginPath();
    ctx.arc(
      Math.random() * W,
      Math.random() * H,
      Math.random() * 2,
      0,
      Math.PI * 2,
    );
    ctx.fillStyle = `hsla(${Math.random() * 360}, 60%, 60%, 0.35)`;
    ctx.fill();
  }

  // Noise lines
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.moveTo(Math.random() * W, Math.random() * H);
    ctx.lineTo(Math.random() * W, Math.random() * H);
    ctx.strokeStyle = `hsla(${Math.random() * 360}, 50%, 55%, 0.3)`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Characters with wave offset
  const charW = W / (code.length + 1);
  const colors = [
    "#0C356A",
    "#C86218",
    "#002b5c",
    "#b45309",
    "#1e3a8a",
    "#9a3412",
  ];

  code.split("").forEach((ch, i) => {
    const x = charW * (i + 0.7);
    const yBase = H / 2 + 6;
    const waveY = Math.sin((i / code.length) * Math.PI * 2) * 7;
    const angle = ((Math.random() - 0.5) * Math.PI) / 8;
    const size = 22 + Math.random() * 5;

    ctx.save();
    ctx.translate(x, yBase + waveY);
    ctx.rotate(angle);
    ctx.font = `900 ${size}px 'Courier New', monospace`;
    ctx.fillStyle = colors[i % colors.length];
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Subtle shadow
    ctx.shadowColor = "rgba(0,0,0,0.12)";
    ctx.shadowBlur = 2;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;

    ctx.fillText(ch, 0, 0);
    ctx.restore();
  });

  // Wave overlay line across characters
  ctx.beginPath();
  ctx.moveTo(0, H / 2);
  for (let x = 0; x < W; x++) {
    ctx.lineTo(x, H / 2 + Math.sin((x / W) * Math.PI * 3) * 4);
  }
  ctx.strokeStyle = "rgba(200,98,24,0.3)";
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

// --- Canvas Component ---
function CaptchaCanvas({ code }: { code: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      drawCaptcha(canvasRef.current, code);
    }
  }, [code]);

  return (
    <canvas
      ref={canvasRef}
      width={170}
      height={46}
      className="rounded-lg border border-gray-300 bg-white shadow-xs select-none block h-[46px]"
      aria-label="CAPTCHA image"
    />
  );
}

// --- Public CaptchaInput Component ---
interface CaptchaProps {
  value: string;
  onChange: (v: string) => void;
  isValid: boolean;
  onRefresh: () => void;
  code: string;
}

export function CaptchaInput({
  value,
  onChange,
  isValid,
  onRefresh,
  code,
}: CaptchaProps) {
  return (
    <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
      {/* Canvas CAPTCHA image */}
      <div className="shrink-0">
        <CaptchaCanvas code={code} />
      </div>

      {/* Refresh button */}
      <button
        type="button"
        onClick={onRefresh}
        className="h-[46px] w-[46px] flex items-center justify-center text-gray-500 hover:text-[#C86218] transition-colors cursor-pointer rounded-lg hover:bg-gray-100 border border-gray-300 bg-white shrink-0"
        title="Generate new CAPTCHA"
      >
        <RefreshCw size={16} />
      </button>

      {/* Text input */}
      <input
        type="text"
        value={value}
        onChange={(e) =>
          onChange(e.target.value.toUpperCase().replace(/\s/g, ""))
        }
        maxLength={6}
        placeholder="ENTER CODE"
        autoComplete="off"
        className={`h-[46px] flex-1 min-w-[140px] px-3.5 py-2.5 text-xs sm:text-sm border-2 rounded-lg focus:outline-none transition-colors font-mono tracking-[0.2em] uppercase font-bold ${
          value.length === 6
            ? isValid
              ? "border-green-500 bg-green-50/60 text-green-800"
              : "border-red-400 bg-red-50/60 text-red-800"
            : "border-gray-300 focus:border-[#002b5c] bg-white text-gray-800 placeholder:text-gray-400 placeholder:tracking-normal placeholder:font-sans"
        }`}
      />
    </div>
  );
}

// --- Hook ---
export function useCaptcha() {
  const [code, setCode] = useState(genCode);
  const [input, setInput] = useState("");

  const refresh = useCallback(() => {
    setCode(genCode());
    setInput("");
  }, []);

  const isValid = input.trim().toUpperCase() === code;

  return { code, input, setInput, refresh, isValid };
}
