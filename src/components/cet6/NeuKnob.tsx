"use client"

import { useCallback, useRef, useState } from "react"

/**
 * 新拟物旋钮：上下拖动（或滚轮/方向键）旋转，按 step 吸附。
 * - 外圈用 conic/描边弧亮出「已选范围」
 * - 指针指向当前值，中心显示数值
 */
export function NeuKnob({
  value,
  min,
  max,
  step,
  onChange,
  unit = "",
  label,
}: {
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
  unit?: string
  label?: string
}) {
  const [dragging, setDragging] = useState(false)
  const drag = useRef<{ y: number; v: number } | null>(null)

  const clampSnap = useCallback(
    (v: number) => {
      const snapped = Math.round((v - min) / step) * step + min
      return Math.max(min, Math.min(max, snapped))
    },
    [min, max, step],
  )

  const ratio = (value - min) / Math.max(1, max - min)
  const angle = -135 + ratio * 270

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId)
    drag.current = { y: e.clientY, v: value }
    setDragging(true)
  }
  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!drag.current) return
    // 200px 行程覆盖整个可选范围；向上拖 = 增大
    const delta = ((drag.current.y - e.clientY) / 200) * (max - min)
    onChange(clampSnap(drag.current.v + delta))
  }
  function onPointerUp() {
    drag.current = null
    setDragging(false)
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowUp" || e.key === "ArrowRight") {
      e.preventDefault()
      onChange(clampSnap(value + step))
    } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
      e.preventDefault()
      onChange(clampSnap(value - step))
    }
  }

  // 刻度：每 25% 一条短刻度线
  const ticks = Array.from({ length: 17 }, (_, i) => i)

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-label={label}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
        onWheel={(e) => {
          e.preventDefault()
          onChange(clampSnap(value + (e.deltaY < 0 ? step : -step)))
        }}
        className="neu-knob neu-raised relative h-24 w-24 cursor-grab touch-none rounded-full bg-slate-50 active:cursor-grabbing"
        style={{ transform: dragging ? "scale(0.98)" : undefined, transition: "transform .15s ease" }}
      >
        {/* 刻度 */}
        {ticks.map((i) => {
          const a = (-135 + (i / (ticks.length - 1)) * 270) * (Math.PI / 180)
          const r1 = 40
          const r2 = 44
          const lit = i / (ticks.length - 1) <= ratio
          return (
            <span
              key={i}
              className="absolute left-1/2 top-1/2 rounded-full"
              style={{
                width: lit ? 2 : 1,
                height: lit ? 6 : 4,
                background: lit ? "#14b8a6" : "var(--color-slate-300)",
                transform: `translate(-50%,-50%) rotate(${(a * 180) / Math.PI}deg) translateY(-${r1 + (r2 - r1) / 2}px)`,
              }}
            />
          )
        })}
        {/* 指针 */}
        <span
          className="absolute left-1/2 top-1/2 origin-bottom rounded-full bg-teal-600"
          style={{
            width: 3,
            height: 22,
            transform: `translate(-50%,-100%) rotate(${angle}deg)`,
            transformOrigin: "50% 100%",
            transition: dragging ? "none" : "transform .25s cubic-bezier(.34,1.56,.64,1)",
            boxShadow: "0 0 6px rgba(20,184,166,.6)",
          }}
        />
        {/* 中心凹槽 + 数值 */}
        <span className="neu-inset absolute inset-[26px] flex flex-col items-center justify-center rounded-full bg-slate-50">
          <span className="text-lg font-semibold leading-none tabular-nums text-slate-900">{value}</span>
          {unit && <span className="mt-0.5 text-[9px] text-slate-400">{unit}</span>}
        </span>
      </div>
      {label && <span className="text-[11px] text-slate-400">{label}</span>}
    </div>
  )
}
