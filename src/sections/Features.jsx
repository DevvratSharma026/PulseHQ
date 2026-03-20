import { memo, useEffect, useRef, useState } from 'react'

/* ── Mini Heatmap ── */
const MiniHeatmap = memo(() => {
  const COLS = 16, ROWS = 5
  const COLORS = ['#0d1526','#003d2a','#005c38','#00b07a','#00e5a0']
  const [grid, setGrid] = useState(() =>
    Array.from({ length: COLS }, () =>
      Array.from({ length: ROWS }, () => Math.floor(Math.random() * 5))
    )
  )
  useEffect(() => {
    const t = setInterval(() => {
      setGrid(g => {
        const next = g.map(col => [...col])
        const c = Math.floor(Math.random() * COLS)
        const r = Math.floor(Math.random() * ROWS)
        next[c][r] = Math.floor(Math.random() * 5)
        return next
      })
    }, 400)
    return () => clearInterval(t)
  }, [])
  return (
    <div style={{ display:'flex', gap:3 }}>
      {grid.map((col, ci) => (
        <div key={ci} style={{ display:'flex', flexDirection:'column', gap:3 }}>
          {col.map((v, ri) => (
            <div key={ri} style={{ width:10, height:10, borderRadius:2, background:COLORS[v], transition:'background 0.4s' }} />
          ))}
        </div>
      ))}
    </div>
  )
})
MiniHeatmap.displayName = 'MiniHeatmap'

/* ── Focus Hours Arc ── */
const FocusArc = memo(() => {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    let p = 0
    const t = setInterval(() => {
      p = p >= 100 ? 0 : p + 1
      setProgress(p)
    }, 30)
    return () => clearInterval(t)
  }, [])
  const hours = ['12a','3a','6a','9a','12p','3p','6p','9p']
  const cx = 60, cy = 60, r = 46
  const total = 2 * Math.PI * r
  // highlight 9pm-11pm = roughly 270-330 degrees
  const peakStart = (270 / 360) * total
  const peakLen = (60 / 360) * total
  return (
    <div style={{ position:'relative', width:120, height:80, overflow:'hidden' }}>
      <svg width="120" height="120" style={{ position:'absolute', top:0, left:0 }}>
        {/* Track */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1a2a45" strokeWidth="6" />
        {/* Peak highlight */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#00e5a0" strokeWidth="6"
          strokeDasharray={`${peakLen} ${total - peakLen}`}
          strokeDashoffset={-peakStart}
          strokeLinecap="round" opacity="0.9"
          style={{ filter:'drop-shadow(0 0 4px #00e5a0)' }}
        />
        {/* Dim rest */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#00b07a" strokeWidth="3"
          strokeDasharray={`${total * (progress / 100)} ${total}`}
          strokeDashoffset="0" strokeLinecap="round" opacity="0.25"
        />
        {/* Center label */}
        <text x={cx} y={cy - 4} textAnchor="middle" fill="#00e5a0" fontSize="13" fontFamily="DM Mono,monospace" fontWeight="500">9pm</text>
        <text x={cx} y={cy + 10} textAnchor="middle" fill="#6b82a8" fontSize="8" fontFamily="DM Mono,monospace">peak zone</text>
      </svg>
    </div>
  )
})
FocusArc.displayName = 'FocusArc'

/* ── Repo Health Ring ── */
const HealthRing = memo(() => {
  const [score, setScore] = useState(0)
  const target = 87
  useEffect(() => {
    let s = 0
    const t = setInterval(() => {
      s = Math.min(target, s + 2)
      setScore(s)
      if (s >= target) clearInterval(t)
    }, 20)
    return () => clearInterval(t)
  }, [])
  const r = 36, cx = 44, cy = 44
  const total = 2 * Math.PI * r
  const filled = (score / 100) * total
  const color = score > 70 ? '#00e5a0' : score > 40 ? '#f5a623' : '#ff4d6a'
  return (
    <div style={{ display:'flex', alignItems:'center', gap:16 }}>
      <svg width="88" height="88">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1a2a45" strokeWidth="7" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="7"
          strokeDasharray={`${filled} ${total - filled}`}
          strokeDashoffset={total * 0.25}
          strokeLinecap="round"
          style={{ transition:'stroke-dasharray 0.05s', filter:`drop-shadow(0 0 6px ${color})` }}
        />
        <text x={cx} y={cy + 5} textAnchor="middle" fill={color} fontSize="18" fontFamily="DM Mono,monospace" fontWeight="500">{score}</text>
      </svg>
      <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
        {[['Commits','high'],['PR time','med'],['Issues','high']].map(([l,v]) => (
          <div key={l} style={{ display:'flex', gap:6, alignItems:'center' }}>
            <span style={{ fontFamily:'DM Mono,monospace', fontSize:8, color:'#6b82a8' }}>{l}</span>
            <div style={{ width:40, height:3, borderRadius:2, background:'#1a2a45', overflow:'hidden' }}>
              <div style={{ width: v==='high'?'80%':'45%', height:'100%', background: v==='high'?'#00e5a0':'#f5a623', borderRadius:2 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
})
HealthRing.displayName = 'HealthRing'

/* ── Team Velocity Lines ── */
const TeamLines = memo(() => {
  const W = 160, H = 50
  const MEMBERS = [
    { color:'#00e5a0', pts:[10,35,28,42,22,38,30,45,20,40] },
    { color:'#00c8ff', pts:[25,20,35,18,30,25,22,28,32,22] },
    { color:'#f5a623', pts:[38,32,42,28,36,40,44,35,38,42] },
  ]
  const [offset, setOffset] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setOffset(o => (o + 1) % 20), 80)
    return () => clearInterval(t)
  }, [])
  function path(pts) {
    const xs = pts.filter((_, i) => i % 2 === 0)
    const ys = pts.filter((_, i) => i % 2 === 1)
    return xs.map((x, i) => `${i===0?'M':'L'}${(x/50)*W},${ys[i]}`).join(' ')
  }
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
      <svg width={W} height={H} style={{ overflow:'visible' }}>
        {MEMBERS.map((m, i) => (
          <g key={i}>
            <path d={path(m.pts)} fill="none" stroke={m.color} strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
            <circle cx={(m.pts[m.pts.length-2]/50)*W} cy={m.pts[m.pts.length-1]}
              r="3" fill={m.color} style={{ filter:`drop-shadow(0 0 3px ${m.color})` }} />
          </g>
        ))}
      </svg>
      <div style={{ display:'flex', gap:10 }}>
        {['@aria','@marcus','@dev3'].map((n,i) => (
          <div key={n} style={{ display:'flex', alignItems:'center', gap:4 }}>
            <div style={{ width:6, height:6, borderRadius:'50%', background:MEMBERS[i].color }} />
            <span style={{ fontFamily:'DM Mono,monospace', fontSize:8, color:'#6b82a8' }}>{n}</span>
          </div>
        ))}
      </div>
    </div>
  )
})
TeamLines.displayName = 'TeamLines'

/* ── Weekly Digest Email ── */
const DigestEmail = memo(() => (
  <div style={{
    background:'#080d1a', border:'1px solid #1a2a45', borderRadius:10,
    overflow:'hidden', width:'100%',
  }}>
    <div style={{ background:'#0d1526', padding:'8px 12px', borderBottom:'1px solid #1a2a45', display:'flex', alignItems:'center', gap:8 }}>
      <div style={{ width:20, height:20, borderRadius:6, background:'rgba(0,229,160,0.15)', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <span style={{ fontSize:10 }}>📬</span>
      </div>
      <div>
        <div style={{ fontFamily:'DM Mono,monospace', fontSize:9, color:'#e2eaf7' }}>Your Weekly Pulse — Mar 17</div>
        <div style={{ fontFamily:'DM Mono,monospace', fontSize:8, color:'#3a506e' }}>digest@pulsehq.dev</div>
      </div>
    </div>
    <div style={{ padding:'10px 12px', display:'flex', flexDirection:'column', gap:6 }}>
      <div style={{ fontFamily:'DM Mono,monospace', fontSize:8, color:'#6b82a8' }}>This week you shipped:</div>
      <div style={{ display:'flex', alignItems:'flex-end', gap:3, height:24 }}>
        {[14,22,8,31,19,7,11].map((v,i) => (
          <div key={i} style={{
            flex:1, borderRadius:'2px 2px 0 0',
            height:`${(v/31)*24}px`,
            background: i===3?'#00e5a0':'#1a2a45',
          }} />
        ))}
      </div>
      <div style={{ display:'flex', justifyContent:'space-between' }}>
        <span style={{ fontFamily:'DM Mono,monospace', fontSize:8, color:'#00e5a0' }}>↑ 23% vs last week</span>
        <span style={{ fontFamily:'DM Mono,monospace', fontSize:8, color:'#3a506e' }}>112 commits</span>
      </div>
    </div>
  </div>
))
DigestEmail.displayName = 'DigestEmail'

/* ── Read-only Permissions ── */
const Permissions = memo(() => {
  const scopes = [
    { name:'repo:read', allowed:true },
    { name:'commit:read', allowed:true },
    { name:'issues:read', allowed:true },
    { name:'repo:write', allowed:false },
    { name:'delete_repo', allowed:false },
  ]
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:4, width:'100%' }}>
      <div style={{ fontFamily:'DM Mono,monospace', fontSize:8, color:'#3a506e', marginBottom:2, letterSpacing:'0.1em', textTransform:'uppercase' }}>OAuth scopes requested</div>
      {scopes.map(s => (
        <div key={s.name} style={{
          display:'flex', alignItems:'center', justifyContent:'space-between',
          padding:'5px 10px', borderRadius:6,
          background: s.allowed ? 'rgba(0,229,160,0.04)' : 'rgba(255,77,106,0.04)',
          border: `1px solid ${s.allowed ? 'rgba(0,229,160,0.12)' : 'rgba(255,77,106,0.12)'}`,
        }}>
          <span style={{ fontFamily:'DM Mono,monospace', fontSize:9, color: s.allowed?'#6b82a8':'#3a506e' }}>{s.name}</span>
          <span style={{ fontSize:10 }}>{s.allowed ? '✅' : '❌'}</span>
        </div>
      ))}
    </div>
  )
})
Permissions.displayName = 'Permissions'

/* ── Visual map ── */
const VISUALS = [MiniHeatmap, FocusArc, HealthRing, TeamLines, DigestEmail, Permissions]

const FEATURES = [
  { title:'Commit Heatmap', desc:'A richer GitHub-style contribution graph. See time-of-day patterns, language breakdown per day, and streak tracking at a glance.', accent:'#00e5a0', tag:'Core' },
  { title:'Focus Hours', desc:"PulseHQ detects your peak coding window from commit timestamps. Know exactly when you're in flow — and protect that time.", accent:'#00c8ff', tag:'Insights' },
  { title:'Repo Health Score', desc:'A single composite score per repo based on commit frequency, PR merge time, and issue close rate. No noise — just signal.', accent:'#f5a623', tag:'Core' },
  { title:'Team Velocity', desc:"Sprint-over-sprint line charts showing how your team's output trends over time. Monitor health without micromanaging.", accent:'#00e5a0', tag:'Team' },
  { title:'Weekly Digest', desc:'Auto-generated Monday morning summary: what you shipped, what\'s stale, and what to focus on this week. Straight to your inbox.', accent:'#00c8ff', tag:'Reports' },
  { title:'Read-only Access', desc:"PulseHQ only requests read-only GitHub scopes. Your code never leaves GitHub's servers. Zero write permissions, ever.", accent:'#f5a623', tag:'Security' },
]

const FeatureCard = memo(({ title, desc, accent, tag, Visual }) => (
  <div style={{
    position:'relative',
    background:'#0d1526',
    border:'1px solid #1a2a45',
    borderRadius:20,
    padding:24,
    display:'flex', flexDirection:'column', gap:16,
    transition:'border-color 0.3s, transform 0.3s',
    cursor:'default',
  }}
    onMouseEnter={e => { e.currentTarget.style.borderColor='#2a3f60'; e.currentTarget.style.transform='translateY(-4px)' }}
    onMouseLeave={e => { e.currentTarget.style.borderColor='#1a2a45'; e.currentTarget.style.transform='translateY(0)' }}
  >
    {/* Tag */}
    <span style={{
      fontFamily:'DM Mono,monospace', fontSize:9, letterSpacing:'0.15em', textTransform:'uppercase',
      padding:'3px 8px', borderRadius:4, width:'fit-content',
      background:`${accent}18`, color:accent,
    }}>{tag}</span>

    {/* Mini visual */}
    <div style={{
      background:'#080d1a', border:'1px solid #1a2a45', borderRadius:12,
      padding:14, minHeight:90,
      display:'flex', alignItems:'center', justifyContent:'center',
      overflow:'hidden',
    }}>
      <Visual />
    </div>

    {/* Text */}
    <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
      <h3 style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:17, color:'#e2eaf7', margin:0 }}>{title}</h3>
      <p style={{ fontFamily:'Syne,sans-serif', fontSize:13, color:'#6b82a8', lineHeight:1.65, margin:0 }}>{desc}</p>
    </div>

    {/* Corner glow */}
    <div style={{
      position:'absolute', bottom:0, right:0, width:80, height:80,
      borderRadius:'0 0 20px 0', opacity:0,
      background:`radial-gradient(circle at bottom right, ${accent}10, transparent)`,
      pointerEvents:'none', transition:'opacity 0.3s',
    }} className="card-corner-glow" />
  </div>
))
FeatureCard.displayName = 'FeatureCard'

const Features = memo(() => (
  <section id="features" style={{ padding:'112px 48px' }}>
    <div style={{ maxWidth:1280, margin:'0 auto' }}>
      <div style={{ maxWidth:560, marginBottom:64 }}>
        <span style={{ fontFamily:'DM Mono,monospace', fontSize:10, color:'#00e5a0', letterSpacing:'0.2em', textTransform:'uppercase', display:'block', marginBottom:12 }}>
          ── Features
        </span>
        <h2 style={{ fontFamily:'Syne,sans-serif', fontWeight:600, fontSize:'clamp(2rem,3.5vw,3rem)', color:'#e2eaf7', lineHeight:1.1, margin:'0 0 16px' }}>
          Everything your codebase<br />
          <span style={{ color:'#00e5a0' }}>is trying to tell you.</span>
        </h2>
        <p style={{ fontFamily:'Syne,sans-serif', fontSize:17, color:'#6b82a8', lineHeight:1.65, margin:0 }}>
          Built for solo devs and engineering teams who want real insight — not vanity graphs.
        </p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
        {FEATURES.map((f, i) => {
          const Visual = VISUALS[i]
          return <FeatureCard key={f.title} {...f} Visual={Visual} />
        })}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          #features > div > div:last-child { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 640px) {
          #features > div > div:last-child { grid-template-columns: 1fr !important; }
          #features { padding: 80px 24px !important; }
        }
        .card-corner-glow { opacity: 0 !important; }
      `}</style>
    </div>
  </section>
))

Features.displayName = 'Features'
export default Features
