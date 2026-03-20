import { memo, useState, useEffect, useRef } from 'react'

/* ── Step 1 mockup: GitHub OAuth popup ── */
const OAuthMockup = memo(() => (
  <div style={{ display:'flex', flexDirection:'column', gap:12, width:'100%' }}>
    <div style={{
      background:'#0d1526', border:'1px solid #1a2a45', borderRadius:12, overflow:'hidden',
    }}>
      <div style={{ background:'#080d1a', padding:'8px 14px', borderBottom:'1px solid #1a2a45', display:'flex', alignItems:'center', gap:8 }}>
        <div style={{ display:'flex', gap:5 }}>
          {['#ff4d6a','#f5a623','#00e5a0'].map(c=><div key={c} style={{width:8,height:8,borderRadius:'50%',background:c}}/>)}
        </div>
        <span style={{ fontFamily:'DM Mono,monospace', fontSize:9, color:'#3a506e', flex:1, textAlign:'center' }}>github.com/login/oauth</span>
      </div>
      <div style={{ padding:16, display:'flex', flexDirection:'column', gap:10, alignItems:'center' }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#e2eaf7"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        <div style={{ fontFamily:'Syne,sans-serif', fontSize:11, color:'#e2eaf7', textAlign:'center' }}>
          <strong>PulseHQ</strong> wants to access your GitHub
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:4, width:'100%' }}>
          {['Read access to code','Read commit history','Read repository metadata'].map(s=>(
            <div key={s} style={{ display:'flex', alignItems:'center', gap:6 }}>
              <span style={{ color:'#00e5a0', fontSize:10 }}>✓</span>
              <span style={{ fontFamily:'DM Mono,monospace', fontSize:9, color:'#6b82a8' }}>{s}</span>
            </div>
          ))}
        </div>
        <button style={{
          width:'100%', padding:'8px', borderRadius:8, border:'none',
          background:'#00e5a0', color:'#050810',
          fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:11, cursor:'pointer',
        }}>Authorize PulseHQ</button>
      </div>
    </div>
  </div>
))
OAuthMockup.displayName = 'OAuthMockup'

/* ── Step 2 mockup: Processing animation ── */
const ProcessingMockup = memo(() => {
  const repos = ['repolens-ai','ai-notes-app','portfolio-os','aurum-web','pulse-hq']
  const [done, setDone] = useState(0)
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    setDone(0); setProgress(0)
    let p = 0
    const t = setInterval(() => {
      p = Math.min(100, p + 2)
      setProgress(p)
      setDone(Math.floor((p / 100) * repos.length))
      if (p >= 100) clearInterval(t)
    }, 60)
    return () => clearInterval(t)
  }, [])
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:10, width:'100%' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span style={{ fontFamily:'DM Mono,monospace', fontSize:9, color:'#00c8ff', letterSpacing:'0.1em', textTransform:'uppercase' }}>Analyzing repositories</span>
        <span style={{ fontFamily:'DM Mono,monospace', fontSize:9, color:'#00c8ff' }}>{progress}%</span>
      </div>
      <div style={{ height:4, background:'#1a2a45', borderRadius:2, overflow:'hidden' }}>
        <div style={{ height:'100%', width:`${progress}%`, background:'linear-gradient(90deg,#00c8ff,#00e5a0)', borderRadius:2, transition:'width 0.06s linear' }} />
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
        {repos.map((r, i) => (
          <div key={r} style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{
              width:14, height:14, borderRadius:'50%', flexShrink:0,
              background: i < done ? 'rgba(0,229,160,0.15)' : '#0d1526',
              border: `1px solid ${i < done ? '#00e5a0' : '#1a2a45'}`,
              display:'flex', alignItems:'center', justifyContent:'center',
              transition:'all 0.3s',
            }}>
              {i < done && <span style={{ fontSize:8, color:'#00e5a0' }}>✓</span>}
            </div>
            <span style={{ fontFamily:'DM Mono,monospace', fontSize:9, color: i < done ? '#e2eaf7' : '#3a506e', transition:'color 0.3s' }}>{r}</span>
            {i < done && <span style={{ fontFamily:'DM Mono,monospace', fontSize:8, color:'#00e5a0', marginLeft:'auto' }}>
              {Math.floor(Math.random() * 800 + 100)} commits
            </span>}
          </div>
        ))}
      </div>
    </div>
  )
})
ProcessingMockup.displayName = 'ProcessingMockup'

/* ── Step 3 mockup: Mini dashboard lighting up ── */
const DashboardLitMockup = memo(() => {
  const [lit, setLit] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setLit(true), 300)
    return () => clearTimeout(t)
  }, [])
  const HEAT_COLORS = ['#0d1526','#003d2a','#005c38','#00b07a','#00e5a0']
  const heat = Array.from({length:12}, () => Array.from({length:5}, () => Math.floor(Math.random()*5)))
  return (
    <div style={{
      background:'#080d1a', border:'1px solid #1a2a45', borderRadius:12,
      overflow:'hidden', width:'100%',
      opacity: lit ? 1 : 0.2, transition:'opacity 0.8s ease',
      boxShadow: lit ? '0 0 20px rgba(0,229,160,0.1)' : 'none',
    }}>
      <div style={{ background:'#050810', padding:'6px 12px', borderBottom:'1px solid #1a2a45', display:'flex', alignItems:'center', gap:6 }}>
        {['#ff4d6a','#f5a623','#00e5a0'].map(c=><div key={c} style={{width:7,height:7,borderRadius:'50%',background:c}}/>)}
        <span style={{ fontFamily:'DM Mono,monospace', fontSize:8, color:'#3a506e', flex:1, textAlign:'center' }}>pulsehq.dev/dashboard</span>
        <div style={{ width:5,height:5,borderRadius:'50%', background: lit?'#00e5a0':'#1a2a45', boxShadow: lit?'0 0 6px #00e5a0':'none', transition:'all 0.5s' }} />
      </div>
      <div style={{ padding:10, display:'flex', flexDirection:'column', gap:8 }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:6 }}>
          {[['1,284','Commits','#00e5a0'],['23d','Streak','#00c8ff'],['87','Health','#f5a623']].map(([v,l,c])=>(
            <div key={l} style={{ background:'#0d1526', border:'1px solid #1a2a45', borderRadius:6, padding:'6px 8px' }}>
              <div style={{ fontFamily:'DM Mono,monospace', fontSize:13, fontWeight:500, color:c }}>{v}</div>
              <div style={{ fontFamily:'DM Mono,monospace', fontSize:7, color:'#3a506e' }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ display:'flex', gap:2 }}>
          {heat.map((col,ci)=>(
            <div key={ci} style={{display:'flex',flexDirection:'column',gap:2}}>
              {col.map((v,ri)=><div key={ri} style={{width:8,height:8,borderRadius:1,background:HEAT_COLORS[v]}}/>)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
})
DashboardLitMockup.displayName = 'DashboardLitMockup'

const STEPS = [
  {
    num: '01',
    title: 'Connect your GitHub',
    desc: 'One OAuth click. Read-only access only. Works with public and private repos. GitLab coming soon.',
    accent: '#00e5a0',
    Mockup: OAuthMockup,
  },
  {
    num: '02',
    title: 'We crunch the data',
    desc: 'PulseHQ processes your full commit history in under 30 seconds — timestamps, languages, branches, PR cycles.',
    accent: '#00c8ff',
    Mockup: ProcessingMockup,
  },
  {
    num: '03',
    title: 'Your dashboard is live',
    desc: 'A real-time intelligence layer on your codebase. Share it, embed it in your portfolio, or keep it private.',
    accent: '#f5a623',
    Mockup: DashboardLitMockup,
  },
]

const HowItWorks = memo(() => {
  const [active, setActive] = useState(0)
  const timerRef = useRef(null)

  const goTo = (i) => {
    setActive(i)
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => setActive(a => (a + 1) % 3), 4000)
  }

  useEffect(() => {
    timerRef.current = setInterval(() => setActive(a => (a + 1) % 3), 4000)
    return () => clearInterval(timerRef.current)
  }, [])

  const ActiveMockup = STEPS[active].Mockup

  return (
    <section id="how-it-works" style={{
      padding:'112px 48px',
      background:'#080d1a',
      borderTop:'1px solid #1a2a45',
      borderBottom:'1px solid #1a2a45',
    }}>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>

        {/* Header */}
        <div style={{ maxWidth:560, marginBottom:64 }}>
          <span style={{ fontFamily:'DM Mono,monospace', fontSize:10, color:'#00e5a0', letterSpacing:'0.2em', textTransform:'uppercase', display:'block', marginBottom:12 }}>
            ── How it works
          </span>
          <h2 style={{ fontFamily:'Syne,sans-serif', fontWeight:600, fontSize:'clamp(2rem,3.5vw,3rem)', color:'#e2eaf7', lineHeight:1.1, margin:0 }}>
            From GitHub to insights<br />
            <span style={{ color:'#00e5a0' }}>in 30 seconds.</span>
          </h2>
        </div>

        {/* Two-column: steps list + live mockup */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'center' }}>

          {/* Left: step list */}
          <div style={{ display:'flex', flexDirection:'column', gap:4, position:'relative' }}>
            {/* Vertical line */}
            <div style={{
              position:'absolute', left:22, top:28, bottom:28, width:1,
              background:'linear-gradient(180deg, #00e5a0, #00c8ff, #f5a623)',
              opacity:0.15,
            }} />

            {STEPS.map((step, i) => (
              <div
                key={step.num}
                onClick={() => goTo(i)}
                style={{
                  display:'flex', gap:20, alignItems:'flex-start',
                  padding:'20px 24px', borderRadius:16, cursor:'pointer',
                  background: active===i ? `${step.accent}08` : 'transparent',
                  border: `1px solid ${active===i ? step.accent+'30' : 'transparent'}`,
                  transition:'all 0.3s',
                  position:'relative',
                }}
              >
                {/* Number circle */}
                <div style={{
                  width:44, height:44, borderRadius:'50%', flexShrink:0,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  background: active===i ? `${step.accent}18` : '#0d1526',
                  border: `2px solid ${active===i ? step.accent : '#1a2a45'}`,
                  boxShadow: active===i ? `0 0 16px ${step.accent}30` : 'none',
                  transition:'all 0.3s',
                  position:'relative', zIndex:1,
                }}>
                  <span style={{
                    fontFamily:'DM Mono,monospace', fontWeight:500, fontSize:14,
                    color: active===i ? step.accent : '#3a506e',
                    transition:'color 0.3s',
                  }}>{step.num}</span>
                </div>

                <div style={{ display:'flex', flexDirection:'column', gap:6, paddingTop:2 }}>
                  <h3 style={{
                    fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:18,
                    color: active===i ? '#e2eaf7' : '#6b82a8',
                    margin:0, transition:'color 0.3s',
                  }}>{step.title}</h3>
                  <p style={{
                    fontFamily:'Syne,sans-serif', fontSize:13,
                    color: active===i ? '#6b82a8' : '#3a506e',
                    lineHeight:1.65, margin:0, transition:'color 0.3s',
                  }}>{step.desc}</p>
                </div>

                {/* Active indicator bar */}
                {active===i && (
                  <div style={{
                    position:'absolute', left:0, top:'20%', bottom:'20%',
                    width:3, borderRadius:2, background:step.accent,
                    boxShadow:`0 0 8px ${step.accent}`,
                  }} />
                )}
              </div>
            ))}
          </div>

          {/* Right: live mockup window */}
          <div style={{
            background:'#0d1526', border:'1px solid #1a2a45', borderRadius:20,
            overflow:'hidden',
            boxShadow:`0 0 40px ${STEPS[active].accent}12`,
            transition:'box-shadow 0.5s',
          }}>
            {/* Fake browser bar */}
            <div style={{
              background:'#080d1a', padding:'10px 16px',
              borderBottom:'1px solid #1a2a45',
              display:'flex', alignItems:'center', gap:8,
            }}>
              <div style={{ display:'flex', gap:5 }}>
                {['#ff4d6a','#f5a623','#00e5a0'].map(c=><div key={c} style={{width:9,height:9,borderRadius:'50%',background:c}}/>)}
              </div>
              <div style={{
                flex:1, background:'#0d1526', border:'1px solid #1a2a45',
                borderRadius:6, padding:'4px 10px',
                fontFamily:'DM Mono,monospace', fontSize:9, color:'#3a506e',
                textAlign:'center',
              }}>
                step {STEPS[active].num} of 03
              </div>
              {/* Progress dots */}
              <div style={{ display:'flex', gap:4 }}>
                {STEPS.map((s,i)=>(
                  <div key={i} onClick={()=>goTo(i)} style={{
                    width: active===i?16:6, height:6, borderRadius:3,
                    background: active===i ? s.accent : '#1a2a45',
                    transition:'all 0.3s', cursor:'pointer',
                  }} />
                ))}
              </div>
            </div>

            {/* Mockup content */}
            <div style={{ padding:24, minHeight:280, display:'flex', alignItems:'center' }}>
              <ActiveMockup key={active} />
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #how-it-works > div > div:last-child {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          #how-it-works { padding: 80px 24px !important; }
        }
      `}</style>
    </section>
  )
})

HowItWorks.displayName = 'HowItWorks'
export default HowItWorks
