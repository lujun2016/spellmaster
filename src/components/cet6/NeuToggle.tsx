"use client"

/**
 * 新拟物拨动开关。
 * 滑块用 spring 缓动（会轻微过冲再回弹），打开时指示灯亮、图标由灰变青。
 */
export function NeuToggle({
  checked,
  onChange,
  size = "md",
}: {
  checked: boolean
  onChange: (v: boolean) => void
  size?: "sm" | "md"
}) {
  const h = size === "sm" ? "h-7" : "h-9"
  const w = size === "sm" ? "w-14" : "w-[4.25rem]"
  const knob = size === "sm" ? "h-5 w-5" : "h-7 w-7"
  const travel = size === "sm" ? "left-[2.05rem]" : "left-[2.15rem]"

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`neu-toggle neu-inset relative ${h} ${w} shrink-0 rounded-full transition-shadow`}
    >
      <span
        className={[
          "absolute top-1 flex items-center justify-center rounded-full bg-slate-50 transition-all duration-300",
          knob,
          checked ? travel : "left-1",
        ].join(" ")}
        style={{
          transitionTimingFunction: "cubic-bezier(.34,1.56,.64,1)",
          boxShadow: "-2px -2px 5px var(--neu-hi), 2px 2px 6px var(--neu-lo)",
        }}
      >
        <span
          className={[
            "h-2 w-2 rounded-full transition-all duration-300",
            checked ? "bg-teal-500" : "bg-slate-300",
          ].join(" ")}
          style={checked ? { boxShadow: "0 0 6px #14b8a6, 0 0 12px rgba(20,184,166,.55)" } : undefined}
        />
      </span>
      <span
        className={[
          "absolute inset-0 flex items-center px-2 text-[9px] font-semibold tracking-wide transition-colors duration-300",
          checked ? "justify-start text-teal-700" : "justify-end text-slate-400",
        ].join(" ")}
      >
        {checked ? "ON" : "OFF"}
      </span>
    </button>
  )
}
