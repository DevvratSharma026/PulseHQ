import { memo } from 'react'
import DashboardMockup from '../components/DashboardMockup'
import { ArrowRight, Github } from 'lucide-react'

const BADGES = [
  { text: '14,000+ devs', dot: '#00e5a0' },
  { text: 'GitHub & GitLab', dot: '#00c8ff' },
  { text: 'No tracking', dot: '#f5a623' },
]

const Hero = memo(() => (
  <section id="hero" style={{
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    padding: '96px 48px 64px',
    overflow: 'hidden',
  }}>
    {/* Grid bg */}
    <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />

    {/* Glow blobs */}
    <div style={{
      position: 'absolute', top: '30%', left: '30%',
      width: 600, height: 400, background: '#00e5a0', borderRadius: '50%',
      opacity: 0.05, filter: 'blur(120px)', pointerEvents: 'none',
    }} />
    <div style={{
      position: 'absolute', top: '50%', right: '5%',
      width: 400, height: 400, background: '#00c8ff', borderRadius: '50%',
      opacity: 0.04, filter: 'blur(100px)', pointerEvents: 'none',
    }} />

    {/* Two-column grid — never wraps on desktop */}
    <div style={{
      position: 'relative', zIndex: 10,
      maxWidth: 1280, width: '100%', margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 64,
      alignItems: 'center',
    }}>

      {/* LEFT — copy */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Eyebrow */}
        <div  style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '6px 14px', borderRadius: 999,
          border: '1px solid #1a2a45', background: '#0d1526',
          width: 'fit-content',
        }}>
          <div className="animate-glow" style={{ width: 6, height: 6, borderRadius: '50%', background: '#00e5a0', flexShrink: 0 }} />
          <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 10, color: '#6b82a8', letterSpacing: '0.15em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
            Git analytics · now in beta
          </span>
        </div>

        {/* Headline */}
        <h1  style={{
          fontFamily: '"Syne", sans-serif', fontWeight: 600,
          fontSize: 'clamp(2rem, 3.2vw, 3.5rem)',
          lineHeight: 1.07, letterSpacing: '-0.02em', color: '#e2eaf7',
          margin: 0,
        }}>
          See your code<br />
          <span className="glow-text" style={{ color: '#00e5a0' }}>the way data does.</span>
        </h1>

        {/* Sub */}
        <p  style={{
          fontFamily: '"Syne", sans-serif', fontSize: '1rem',
          lineHeight: 1.75, color: '#6b82a8', maxWidth: 440, margin: 0,
        }}>
          PulseHQ transforms your raw commit history into a living intelligence dashboard —
          so you always know <span style={{ color: '#e2eaf7' }}>when</span> you build best,{' '}
          <span style={{ color: '#e2eaf7' }}>what</span> needs attention, and{' '}
          <span style={{ color: '#e2eaf7' }}>how</span> your team is moving.
        </p>

        {/* Badges */}
        <div  style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {BADGES.map(b => (
            <span key={b.text} style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontFamily: '"DM Mono", monospace', fontSize: 10,
              color: '#6b82a8', padding: '4px 10px', borderRadius: 6,
              border: '1px solid #1a2a45', background: '#0d1526',
              letterSpacing: '0.12em', textTransform: 'uppercase',
            }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: b.dot, flexShrink: 0 }} />
              {b.text}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div  style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
          <a href="#" className="animate-glow" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '12px 22px', borderRadius: 10,
            background: '#00e5a0', color: '#050810',
            fontFamily: '"Syne", sans-serif', fontWeight: 700, fontSize: 14,
            textDecoration: 'none',
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            Connect GitHub — free
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <a href="#how-it-works" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '12px 22px', borderRadius: 10,
            border: '1px solid #1a2a45', color: '#6b82a8',
            fontFamily: '"Syne", sans-serif', fontSize: 14,
            textDecoration: 'none',
          }}>
            See how it works
          </a>
        </div>

        {/* Social proof */}
        <p  style={{
          fontFamily: '"DM Mono", monospace', fontSize: 10,
          color: '#2a3f60', letterSpacing: '0.12em', margin: 0,
        }}>
          Trusted by engineers at{' '}
          <span style={{ color: '#6b82a8' }}>Vercel · Linear · Supabase · Railway</span>
        </p>
      </div>

      {/* RIGHT — dashboard, always visible */}
      <div className="animate-float" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        filter: 'drop-shadow(0 0 40px rgba(0,229,160,0.28)) drop-shadow(0 0 90px rgba(0,229,160,0.13))',
      }}>
        <DashboardMockup />
      </div>

    </div>

    {/* Responsive: stack on mobile */}
    <style>{`
      @media (max-width: 900px) {
        #hero > div:last-child {
          grid-template-columns: 1fr !important;
          gap: 48px !important;
        }
      }
    `}</style>
  </section>
))

Hero.displayName = 'Hero'
export default Hero
