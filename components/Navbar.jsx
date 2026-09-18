'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X, Search, TrendingUp } from 'lucide-react';

const BASE_LINKS = [
  { href: '/', label: 'الرئيسية' },
];

const TICKER = [
  'ارتفاع مؤشرات البورصة المحلية بنسبة 2.4% في تعاملات اليوم',
  'قمة اقتصادية إقليمية تنطلق الأسبوع المقبل في طرابلس',
  'إطلاق مشروع الطاقة الشمسية الأكبر في المنطقة',
  'اتفاقيات تعاون جديدة في قطاع التكنولوجيا والاتصالات',
];

export default function Navbar({ categories = [] }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const dynamicLinks = categories.map(c => ({ href: `/category/${c.slug}`, label: c.name }));
  const ALL_LINKS = [...BASE_LINKS, ...dynamicLinks];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>

      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="container flex items-center justify-between">
          <Link href="/" className="logo" onClick={() => setOpen(false)}>
            <img src="/logo-plus.jpeg" alt="منصة بلس" />
            <span>منصة <span className="logo-plus">+</span></span>
          </Link>

          <div className="nav-links">
            {ALL_LINKS.map((l) => (
              <Link key={l.href} href={l.href}>{l.label}</Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button className="share-btn nav-cta" aria-label="بحث" style={{ width: 42, height: 42 }}>
              <Search size={18} />
            </button>
            <button
              className="share-btn"
              aria-label="القائمة"
              style={{ width: 42, height: 42 }}
              onClick={() => setOpen((v) => !v)}
              data-mobile
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div
          style={{
            overflow: 'hidden',
            maxHeight: open ? 360 : 0,
            transition: 'max-height .45s cubic-bezier(.4,0,.2,1)',
          }}
        >
          <div className="container" style={{ padding: '0.5rem 1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '.35rem' }}>
            {ALL_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{ padding: '.8rem 1rem', borderRadius: 12, fontWeight: 700, color: 'var(--ink-800)' }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <style>{`
        [data-mobile] { display: grid; }
        @media (min-width: 860px) { [data-mobile] { display: none; } }
      `}</style>
    </>
  );
}
