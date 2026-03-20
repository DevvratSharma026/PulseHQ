import { memo, useEffect, useRef, useState } from 'react'
import { GitCommit, GitBranch, Star, TrendingUp, Circle } from 'lucide-react'

const WEEKS = 24
const DAYS = 7
const HEAT_COLORS = ['#0d1526', '#003d2a', '#005c38', '#00b07a', '#00e5a0']

function genHeat() {
  return Array.from({ length: WEEKS }, () =>
    Array.from({ length: DAYS }, (_, d) => {
      const bias = d >= 1 && d <= 4 ? 0.25 : 0
      const v = Math.random() + bias
      return v < 0.15 ? 0 : v < 0.4 ? 1 : v < 0.65 ? 2 : v < 0.85 ? 3 : 4
    })
  )
}

function genSpark(len = 18) {
  let v = 55
  return Array.from({ length: len }, () => {
    v = Math.max(15, Math.min(88, v + (Math.random() - 0.45) * 14))
    return Math.round(v)
  })
}

const BAR_DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

function genBars() {
  return BAR_DAYS.map(d => ({ d, v: Math.floor(Math.random() * 65) + 12 }))
}

const COMMITS = [
  { hash: 'a3f9c1', msg: 'feat: add auth middleware', time: '2m', branch: 'main' },
  { hash: 'b77d02', msg: 'fix: memory leak in socket', time: '19m', branch: 'dev' },
  { hash: 'c12e45', msg: 'refactor: split api service', time: '1h', branch: 'main' },
]

function sparkPath(data, W, H) {
  const max = Math.max(...data), min = Math.min(...data)
  const range = max - min || 1
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * W,
    H - ((v - min) / range) * H * 0.78 - H * 0.1,
  ])
  return pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')
}

const DashboardMockup = memo(() => {
  const [heat]       = useState(genHeat)
  const [spark, setSpark] = useState(genSpark)
  const [bars, setBars]   = useState(genBars)
  const [ping, setPing]   = useState(false)
  const [activeCmt, setActiveCmt] = useState(0)
  const raf = useRef(null)
  const tick = useRef(0)

  useEffect(() => {
    let last = 0
    const loop = ts => {
      if (ts - last > 2000) {
        last = ts
        tick.current++
        setSpark(p => [...p.slice(1), Math.max(15, Math.min(88, p[p.length - 1] + (Math.random() - 0.45) * 14))])
        setPing(true); setTimeout(() => setPing(false), 400)
        if (tick.current % 3 === 0) setActiveCmt(c => (c + 1) % COMMITS.length)
        if (tick.current % 6 === 0) setBars(genBars)
      }
      raf.current = requestAnimationFrame(loop)
    }
    raf.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf.current)
  }, [])

  const W = 160, H = 44
  const path = sparkPath(spark, W, H)
  const areaPath = `${path} L${W},${H} L0,${H}Z`

  return (
    <div className="relative w-full" style={{ maxWidth: 600 }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', inset: -20,
        background: 'radial-gradient(ellipse at center, rgba(0,229,160,0.08) 0%, transparent 70%)',
        pointerEvents: 'none', borderRadius: 32,
      }} />

      {/* Card */}
      <div style={{
        background: 'rgba(11,18,34,0.92)',
        border: '1px solid #1a2a45',
        borderRadius: 20,
        overflow: 'hidden',
        backdropFilter: 'blur(16px)',
        boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,229,160,0.06)',
      }}>
        {/* Title bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 16px', borderBottom: '1px solid #1a2a45',
          background: 'rgba(5,8,16,0.6)',
        }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {['#ff4d6a','#f5a623','#00e5a0'].map(c => (
              <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
            ))}
          </div>
          <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 10, color: '#3a506e', letterSpacing: '0.1em' }}>
            pulsehq.dev — dashboard
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{
              width: 6, height: 6, borderRadius: '50%',
              background: ping ? '#00e5a0' : '#1a2a45',
              transition: 'background 0.2s',
              boxShadow: ping ? '0 0 8px #00e5a0' : 'none',
            }} />
            <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 9, color: '#3a506e' }}>live</span>
          </div>
        </div>

        <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>

          {/* Stat row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {[
              { label: 'Commits', val: '1,284', color: '#00e5a0', delta: '+12%' },
              { label: 'Streak', val: '23d', color: '#00c8ff' },
              { label: 'Branches', val: '8', color: '#f5a623' },
              { label: 'Repos', val: '14', color: '#6b82a8' },
            ].map(s => (
              <div key={s.label} style={{
                background: '#0d1526', border: '1px solid #1a2a45',
                borderRadius: 10, padding: '8px 10px',
              }}>
                <div style={{ fontFamily: '"DM Mono", monospace', fontSize: 9, color: '#6b82a8', marginBottom: 3 }}>{s.label}</div>
                <div style={{ fontFamily: '"DM Mono", monospace', fontSize: 14, fontWeight: 500, color: s.color }}>{s.val}</div>
                {s.delta && <div style={{ fontFamily: '"DM Mono", monospace', fontSize: 9, color: '#00e5a0', marginTop: 2 }}>{s.delta}</div>}
              </div>
            ))}
          </div>

          {/* Heatmap */}
          <div style={{ background: '#080d1a', border: '1px solid #1a2a45', borderRadius: 12, padding: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 9, color: '#6b82a8', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Commit activity</span>
              <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 9, color: '#00e5a0' }}>24 weeks</span>
            </div>
            <div style={{ display: 'flex', gap: 3 }}>
              {heat.map((week, wi) => (
                <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {week.map((val, di) => (
                    <div key={di} style={{
                      width: 9, height: 9, borderRadius: 2,
                      background: HEAT_COLORS[val],
                      transition: 'background 0.5s',
                    }} />
                  ))}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 6, justifyContent: 'flex-end' }}>
              <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 8, color: '#2a3f60' }}>less</span>
              {HEAT_COLORS.map((c, i) => <div key={i} style={{ width: 8, height: 8, borderRadius: 2, background: c }} />)}
              <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 8, color: '#2a3f60' }}>more</span>
            </div>
          </div>

          {/* Sparkline + Bar chart */}
          <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 8 }}>
            {/* Velocity */}
            <div style={{ background: '#080d1a', border: '1px solid #1a2a45', borderRadius: 12, padding: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 9, color: '#6b82a8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Velocity</span>
                <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 9, color: '#00e5a0' }}>{Math.round(spark[spark.length - 1])} loc/d</span>
              </div>
              <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ height: 40, display: 'block' }}>
                <defs>
                  <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00e5a0" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#00e5a0" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={areaPath} fill="url(#sg)" />
                <path d={path} fill="none" stroke="#00e5a0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Daily bars */}
            <div style={{ background: '#080d1a', border: '1px solid #1a2a45', borderRadius: 12, padding: 12 }}>
              <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 9, color: '#6b82a8', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>Daily</span>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 40 }}>
                {bars.map(({ d, v }, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, height: '100%', justifyContent: 'flex-end' }}>
                    <div style={{
                      width: '100%',
                      height: `${(v / 77) * 36}px`,
                      borderRadius: '2px 2px 0 0',
                      background: v > 50 ? '#00e5a0' : v > 30 ? '#00b07a' : '#1a2a45',
                      opacity: v > 50 ? 1 : v > 30 ? 0.75 : 0.4,
                      transition: 'height 0.6s ease, background 0.4s',
                    }} />
                    <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 7, color: '#2a3f60' }}>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent commits */}
          <div style={{ background: '#080d1a', border: '1px solid #1a2a45', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{
              padding: '8px 12px', borderBottom: '1px solid #1a2a45',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 9, color: '#6b82a8', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Recent commits</span>
              <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 8, color: '#2a3f60' }}>↑ syncing</span>
            </div>
            {COMMITS.map((c, i) => (
              <div key={c.hash} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '7px 12px',
                borderBottom: i < COMMITS.length - 1 ? '1px solid #1a2a45' : 'none',
                background: i === activeCmt ? 'rgba(0,229,160,0.04)' : 'transparent',
                transition: 'background 0.4s',
              }}>
                <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 9, color: '#00e5a0', flexShrink: 0 }}>{c.hash}</span>
                <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 9, color: '#e2eaf7', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.msg}</span>
                <span style={{
                  fontFamily: '"DM Mono", monospace', fontSize: 8, padding: '2px 6px', borderRadius: 4, flexShrink: 0,
                  background: c.branch === 'main' ? 'rgba(0,229,160,0.1)' : 'rgba(0,200,255,0.1)',
                  color: c.branch === 'main' ? '#00e5a0' : '#00c8ff',
                }}>{c.branch}</span>
                <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 8, color: '#2a3f60', flexShrink: 0 }}>{c.time}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
})

DashboardMockup.displayName = 'DashboardMockup'
export default DashboardMockup
