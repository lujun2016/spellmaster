"use client"

/**
 * 机械滚轮数字：每一位独立成一条竖直数字带，数值变化时滚到新位置。
 *
 * 细节：
 *  - 越靠右的位翻得越快（个位 260ms、十位 350ms…），模拟机械进位；
 *  - 缓动曲线带轻微过冲（cubic-bezier 上端 >1），停下时会"回弹"一下；
 *  - 用 CSS transition 而不是 JS 逐帧，交给合成器，长列表也不掉帧。
 */
export function MechanicalNumber({
  value,
  minDigits = 1,
  className = "",
}: {
  value: number
  minDigits?: number
  className?: string
}) {
  const n = Math.max(0, Math.floor(Number.isFinite(value) ? value : 0))
  const digits = n.toString().padStart(Math.max(1, minDigits), "0").split("").map(Number)

  return (
    <span className={`inline-flex overflow-hidden leading-none tabular-nums ${className}`} style={{ height: "1.15em" }}>
      {digits.map((d, i) => (
        <Digit key={`${i}-${digits.length}`} value={d} index={i} total={digits.length} />
      ))}
    </span>
  )
}

function Digit({ value, index, total }: { value: number; index: number; total: number }) {
  // 越靠右（个位）越快；越靠左（高位）越慢，视觉上像机械进位
  const duration = 260 + (total - 1 - index) * 90
  return (
    <span className="relative inline-block overflow-hidden" style={{ width: "0.62em", height: "1.15em" }}>
      <span
        className="absolute inset-x-0 top-0 flex flex-col"
        style={{
          transform: `translateY(-${value * 1.15}em)`,
          transition: `transform ${duration}ms cubic-bezier(.34,1.56,.64,1)`,
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <span key={n} className="flex items-center justify-center" style={{ height: "1.15em" }}>
            {n}
          </span>
        ))}
      </span>
    </span>
  )
}
