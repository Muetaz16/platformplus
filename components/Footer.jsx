import Link from 'next/link';
import { Newspaper } from 'lucide-react';



export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col" style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '.6rem', fontFamily: 'Cairo, sans-serif', fontSize: '1.35rem', fontWeight: 900, justifyContent: 'center' }}>
              <img src="/logo-plus.jpeg" alt="منصة بلس" style={{ height: 40, width: 40, borderRadius: 11, objectFit: 'cover', boxShadow: 'var(--shadow-brand)' }} />
              <span>منصة <span className="logo-plus">+</span></span>
            </div>
            <p className="text-secondary" style={{ marginTop: '1.5rem', maxWidth: 400, marginInline: 'auto' }}>
              منصّتك الذكية للأخبار والتحليلات المعمّقة. نرصد لك المشهد المحلي والدولي بمصداقية وسرعة على مدار الساعة.
            </p>
            <div className="social-row" style={{ justifyContent: 'center', marginTop: '1.5rem' }}>
              <a className="social-btn" href="https://www.facebook.com/plusplatform" target="_blank" rel="noopener noreferrer" aria-label="فيسبوك">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a className="social-btn" href="https://www.tiktok.com/@plusplatformly" target="_blank" rel="noopener noreferrer" aria-label="تيك توك">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} منصة بلس — جميع الحقوق محفوظة.</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem' }}>
            <Newspaper size={16} /> صُنع بشغف لصحافة أفضل
          </span>
        </div>
      </div>
    </footer>
  );
}
