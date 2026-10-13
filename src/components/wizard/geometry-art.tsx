import type { GeometryId } from "@/data/wizard";
import { cn } from "@/lib/utils";

export function GeometryArt({
  id,
  className,
}: {
  id: GeometryId;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-28 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#e8f1fb] to-[#f7fafc]",
        className
      )}
    >
      <svg
        viewBox="0 0 160 100"
        className="h-24 w-full max-w-[180px]"
        aria-hidden
      >
        {id === "shell" && <ShellArt />}
        {id === "solid" && <SolidArt />}
        {id === "complex" && <ComplexArt />}
        {id === "tray" && <TrayArt />}
        {id === "flexible" && <FlexibleArt />}
        {id === "unsure" && <UnsureArt />}
      </svg>
    </div>
  );
}

function ShellArt() {
  return (
    <g fill="none" stroke="#2877df" strokeWidth="2.5" strokeLinecap="round">
      <path
        d="M28 72 V38 C28 28 40 22 52 22 H108 C120 22 132 28 132 38 V72"
        fill="#cfe2f8"
        fillOpacity="0.85"
      />
      <path d="M40 72 H120" stroke="#1c4776" />
      <path d="M48 48 H112" stroke="#7eb0ea" strokeWidth="2" />
      <circle cx="56" cy="58" r="3.5" fill="#2877df" stroke="none" />
      <circle cx="104" cy="58" r="3.5" fill="#2877df" stroke="none" />
    </g>
  );
}

function SolidArt() {
  return (
    <g>
      <path
        d="M40 70 L40 38 L78 22 L120 38 L120 70 L78 86 Z"
        fill="#cfe2f8"
        stroke="#2877df"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M40 38 L78 54 L120 38 M78 54 V86"
        fill="none"
        stroke="#1c4776"
        strokeWidth="2"
      />
    </g>
  );
}

function ComplexArt() {
  return (
    <g fill="#cfe2f8" stroke="#2877df" strokeWidth="2.2" strokeLinejoin="round">
      <rect x="34" y="30" width="92" height="48" rx="8" />
      <rect x="48" y="42" width="18" height="24" rx="3" fill="#eaf2ff" />
      <rect x="74" y="42" width="18" height="24" rx="3" fill="#eaf2ff" />
      <rect x="100" y="46" width="14" height="16" rx="3" fill="#eaf2ff" />
      <circle cx="57" cy="54" r="3" fill="#2877df" stroke="none" />
      <circle cx="83" cy="54" r="3" fill="#2877df" stroke="none" />
      <path d="M48 78 H112" stroke="#1c4776" strokeWidth="2" />
    </g>
  );
}

function TrayArt() {
  return (
    <g fill="none" stroke="#2877df" strokeWidth="2.4" strokeLinejoin="round">
      <path
        d="M26 34 H134 L122 72 H38 Z"
        fill="#cfe2f8"
      />
      <path d="M40 42 H120 L112 64 H48 Z" fill="#eaf2ff" stroke="#7eb0ea" />
      <path d="M30 34 H130" stroke="#1c4776" />
    </g>
  );
}

function FlexibleArt() {
  return (
    <g fill="none" stroke="#2877df" strokeWidth="2.4" strokeLinecap="round">
      <path
        d="M30 55 C48 28 70 28 80 50 C90 72 112 72 130 48"
        fill="#cfe2f8"
        fillOpacity="0.7"
      />
      <path
        d="M36 62 C54 82 78 82 88 60 C98 40 118 40 128 58"
        stroke="#7eb0ea"
      />
      <circle cx="48" cy="48" r="3" fill="#2877df" stroke="none" />
      <circle cx="112" cy="58" r="3" fill="#2877df" stroke="none" />
    </g>
  );
}

function UnsureArt() {
  return (
    <g>
      <rect
        x="42"
        y="28"
        width="76"
        height="52"
        rx="12"
        fill="#eaf2ff"
        stroke="#2877df"
        strokeWidth="2.4"
        strokeDasharray="6 5"
      />
      <text
        x="80"
        y="62"
        textAnchor="middle"
        fill="#2877df"
        fontSize="28"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="700"
      >
        ?
      </text>
    </g>
  );
}
