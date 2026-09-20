import '../globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'لوحة التحكم - منصة بلس',
};

export const dynamic = 'force-dynamic';

export default function AdminLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <div className="admin-layout">
          <aside className="admin-sidebar">
            <Link href="/" className="logo" style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
              <img src="/logo-plus.jpeg" alt="Logo" style={{ height: '24px', marginLeft: '0.5rem', verticalAlign: 'middle', borderRadius: '4px' }} />
              منصة بلس
            </Link>
            
            <nav className="admin-nav">
              <Link href="/admin" className="admin-nav-link">لوحة التحكم</Link>
              <Link href="/admin/articles" className="admin-nav-link">المقالات</Link>
              <Link href="/admin/categories" className="admin-nav-link">الأقسام</Link>
              <Link href="/admin/users" className="admin-nav-link">المدراء</Link>
            </nav>
            
            <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
              <Link href="/" className="admin-nav-link" style={{ display: 'block' }}>&rarr; العودة للموقع</Link>
            </div>
          </aside>
          
          <main className="admin-main">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
