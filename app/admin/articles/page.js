import Link from 'next/link';
import { db } from '../../../lib/db';

export const dynamic = 'force-dynamic';

export default async function AdminArticles() {
  const articles = await db.orm.public.Article.all();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', margin: 0 }}>إدارة المقالات</h1>
        <Link href="/admin/articles/new" className="btn btn-primary">
          + إضافة مقال جديد
        </Link>
      </div>

      <div className="card" style={{ padding: '0', display: 'block' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }} dir="rtl">
          <thead style={{ backgroundColor: 'var(--bg-color)', borderBottom: '1px solid var(--border-color)' }}>
            <tr>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>العنوان</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>الحالة</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>التاريخ</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.875rem', textAlign: 'left' }}>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((a) => (
              <tr key={a.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>
                  <div style={{ marginBottom: '0.25rem' }}>{a.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }} dir="ltr">/article/{a.slug}</div>
                </td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  {a.published ? (
                    <span style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>منشور</span>
                  ) : (
                    <span style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>مسودة</span>
                  )}
                </td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }} dir="ltr">
                  {new Date(a.createdAt).toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' })}
                </td>
                <td style={{ padding: '1rem 1.5rem', textAlign: 'left' }}>
                  <button className="btn" style={{ padding: '0.25rem 0.5rem', backgroundColor: 'transparent', color: 'var(--secondary)' }}>تعديل</button>
                  <button className="btn" style={{ padding: '0.25rem 0.5rem', backgroundColor: 'transparent', color: 'var(--accent)' }}>حذف</button>
                </td>
              </tr>
            ))}
            {articles.length === 0 && (
              <tr>
                <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  لا يوجد مقالات حالياً.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
