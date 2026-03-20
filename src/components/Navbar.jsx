import { memo, useState, useEffect } from 'react'
import { Activity, Menu, X } from 'lucide-react'

const NAV_LINKS = ['Features', 'How it works', 'Pricing', 'Docs']

const Navbar = memo(() => {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass border-b border-[var(--border)]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-md bg-[var(--pulse)] flex items-center justify-center animate-glow">
            <Activity size={14} className="text-[var(--void)] stroke-[2.5]" />
          </div>
          <span className="font-mono font-medium text-[var(--text)] tracking-wider text-sm">
            PULSE<span className="text-[var(--pulse)]">HQ</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase().replace(/ /g, '-')}`}
                className="font-mono text-xs text-[var(--text-muted)] hover:text-[var(--pulse)] transition-colors tracking-widest uppercase"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href="#" className="font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
            Sign in
          </a>
          <a
            href="#"
            className="font-mono text-xs px-4 py-2 rounded border border-[var(--pulse)] text-[var(--pulse)] hover:bg-[var(--pulse)] hover:text-[var(--void)] transition-all duration-200 tracking-wider"
          >
            Connect GitHub →
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-[var(--text-muted)]"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass border-t border-[var(--border)] px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/ /g, '-')}`}
              className="font-mono text-xs text-[var(--text-muted)] tracking-widest uppercase"
              onClick={() => setOpen(false)}
            >
              {link}
            </a>
          ))}
          <a
            href="#"
            className="font-mono text-xs px-4 py-2 rounded border border-[var(--pulse)] text-[var(--pulse)] text-center"
          >
            Connect GitHub →
          </a>
        </div>
      )}
    </nav>
  )
})

Navbar.displayName = 'Navbar'
export default Navbar
