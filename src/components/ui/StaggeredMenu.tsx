import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface MenuItem {
  label: string;
  link: string;
  ariaLabel?: string;
}

interface SocialItem {
  label: string;
  link: string;
}

interface StaggeredMenuProps {
  position?: 'left' | 'right';
  colors?: string[];
  items?: MenuItem[];
  socialItems?: SocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  logoUrl?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  changeMenuColorOnOpen?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
  closeOnClickAway?: boolean;
}

export function StaggeredMenu({
  position = 'right',
  colors = ['#2D1B36', '#1A0F1A', '#3D2B46'],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className = '',
  logoUrl = '',
  menuButtonColor = '#fff',
  openMenuButtonColor = '#fff',
  accentColor = '#B000FF',
  changeMenuColorOnOpen = true,
  onMenuOpen,
  onMenuClose,
  closeOnClickAway = true,
}: StaggeredMenuProps) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const socialLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const socialTitleRef = useRef<HTMLHeadingElement | null>(null);
  const openRef = useRef(false);
  const busyRef = useRef(false);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const toggleMenu = useCallback(() => {
    if (busyRef.current) return;
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);

    const panel = panelRef.current;
    if (!panel) return;

    busyRef.current = true;

    const offscreen = position === 'left' ? -100 : 100;

    if (target) {
      // Kill any existing tweens
      if (tlRef.current) {
        tlRef.current.kill();
        tlRef.current = null;
      }

      // Reset everything
      gsap.set(panel, { xPercent: offscreen, opacity: 0 });
      gsap.set(menuItemsRef.current, { y: 50, opacity: 0 });
      gsap.set(socialLinksRef.current, { y: 30, opacity: 0 });
      if (socialTitleRef.current) gsap.set(socialTitleRef.current, { opacity: 0 });

      // Create staggered timeline
      const tl = gsap.timeline({
        onComplete: () => { busyRef.current = false; }
      });

      // Panel slides in
      tl.to(panel, {
        xPercent: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power4.out',
      }, 0);

      // Menu items stagger in
      tl.to(menuItemsRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out',
        stagger: 0.08,
        overwrite: 'auto',
      }, 0.15);

      // Socials fade in
      if (socialTitleRef.current) {
        tl.to(socialTitleRef.current, {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        }, 0.35);
      }
      tl.to(socialLinksRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: 'power3.out',
        stagger: 0.06,
        overwrite: 'auto',
      }, 0.4);

      tlRef.current = tl;
      onMenuOpen?.();

    } else {
      // Close
      const tl = gsap.timeline({
        onComplete: () => { busyRef.current = false; }
      });

      tl.to(panel, {
        xPercent: offscreen,
        opacity: 0,
        duration: 0.35,
        ease: 'power3.in',
      }, 0);

      tlRef.current = tl;
      onMenuClose?.();
    }

    // Toggle button color
    if (changeMenuColorOnOpen && toggleRef.current) {
      gsap.to(toggleRef.current, {
        color: target ? openMenuButtonColor : menuButtonColor,
        duration: 0.3,
        ease: 'power2.out',
        delay: 0.15,
      });
    }
  }, [position, menuButtonColor, openMenuButtonColor, changeMenuColorOnOpen, onMenuOpen, onMenuClose]);

  // Click outside to close
  useLayoutEffect(() => {
    if (!closeOnClickAway || !open) return;
    const handleClick = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        toggleRef.current &&
        !toggleRef.current.contains(e.target as Node)
      ) {
        toggleMenu();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open, closeOnClickAway, toggleMenu]);

  return (
    <div className={`staggered-menu-wrapper ${className}`} style={{ position: 'relative', zIndex: 40, width: '100%', height: '100%' }}>
      {/* Toggle Button */}
      <button
        ref={toggleRef}
        onClick={toggleMenu}
        style={{
          position: 'absolute',
          top: '1.5rem',
          right: position === 'right' ? '1.5rem' : 'auto',
          left: position === 'left' ? '1.5rem' : 'auto',
          background: 'transparent',
          border: 'none',
          color: menuButtonColor,
          fontSize: '14px',
          cursor: 'pointer',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontFamily: 'inherit',
        }}
      >
        {open ? 'Close' : 'Menu'}
        <span style={{ fontSize: '18px' }}>{open ? '✕' : '☰'}</span>
      </button>

      {/* Panel with layers */}
      <div
        ref={panelRef}
        style={{
          position: 'fixed',
          top: 0,
          [position]: 0,
          width: 'clamp(280px, 35vw, 420px)',
          height: '100%',
          background: colors[0] || '#1A0F1A',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          padding: '4rem 2rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 40,
          opacity: 0,
          borderLeft: position === 'right' ? '1px solid rgba(255,255,255,0.06)' : 'none',
          borderRight: position === 'left' ? '1px solid rgba(255,255,255,0.06)' : 'none',
          boxShadow: '0 0 60px rgba(0,0,0,0.5)',
        }}
        data-open={open}
      >
        {/* Layer effects (like the original) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: colors[1] || '#2D1B36',
            opacity: 0.5,
            transform: 'translateX(10px) scale(0.98)',
            borderRadius: '0 20px 20px 0',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: colors[2] || '#3D2B46',
            opacity: 0.3,
            transform: 'translateX(20px) scale(0.96)',
            borderRadius: '0 20px 20px 0',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Menu Items */}
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, flex: 1, marginTop: '1rem' }}>
            {items.map((item, idx) => (
              <li
                key={idx}
                ref={el => { menuItemsRef.current[idx] = el; }}
                style={{
                  marginBottom: '0.5rem',
                  overflow: 'hidden',
                  opacity: 0,
                  transform: 'translateY(50px)',
                }}
              >
                <a
                  href={item.link}
                  aria-label={item.ariaLabel || item.label}
                  style={{
                    display: 'block',
                    color: '#fff',
                    fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                    fontWeight: 700,
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    letterSpacing: '-0.02em',
                    paddingRight: '1.5em',
                    position: 'relative',
                    transition: 'color 0.25s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = accentColor)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#fff')}
                >
                  {item.label}
                  {displayItemNumbering && (
                    <span
                      style={{
                        position: 'absolute',
                        right: '2.2em',
                        top: '0.2em',
                        fontSize: 'clamp(0.8rem, 1.2vw, 1rem)',
                        fontWeight: 400,
                        color: accentColor,
                        opacity: 0.6,
                      }}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Socials */}
          {displaySocials && socialItems.length > 0 && (
            <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <h3
                ref={socialTitleRef}
                style={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: accentColor,
                  margin: '0 0 0.75rem',
                  opacity: 0,
                }}
              >
                Socials
              </h3>
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                {socialItems.map((s, i) => (
                  <a
                    key={i}
                    ref={el => { socialLinksRef.current[i] = el; }}
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#fff',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      opacity: 0,
                      transform: 'translateY(30px)',
                      transition: 'opacity 0.3s, color 0.3s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.color = accentColor; }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.6'; e.currentTarget.style.color = '#fff'; }}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StaggeredMenu;
