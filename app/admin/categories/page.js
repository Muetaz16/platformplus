import Link from 'next/link';
import { db } from '../../../lib/db';

export const dynamic = 'force-dynamic';

export default async function AdminCategories() {
  const categories = await db.orm.public.Category.all();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', margin: 0 }}>الأقسام (القائمة)</h1>
        <Link href="/admin/categories/new" className="btn btn-primary">
          + إضافة قسم جديد
        </Link>
      </div>

      <div className="card" style={{ padding: '0', display: 'block', maxWidth: '800px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }} dir="rtl">
          <thead style={{ backgroundColor: 'var(--bg-color)', borderBottom: '1px solid var(--border-color)' }}>
            <tr>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>الاسم</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>الرابط (Slug)</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.875rem', textAlign: 'left' }}>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>{cat.name}</td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }} dir="ltr">/{cat.slug}</td>
                <td style={{ padding: '1rem 1.5rem', textAlign: 'left' }}>
                  <button className="btn" style={{ padding: '0.25rem 0.5rem', backgroundColor: 'transparent', color: 'var(--secondary)' }}>تعديل</button>
                  <button className="btn" style={{ padding: '0.25rem 0.5rem', backgroundColor: 'transparent', color: 'var(--accent)' }}>حذف</button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan="3" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  لا يوجد أقسام حالياً.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
