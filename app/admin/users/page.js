import Link from 'next/link';
import { db } from '../../../lib/db';

export const dynamic = 'force-dynamic';

export default async function AdminUsers() {
  const users = await db.orm.public.User.all();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', margin: 0 }}>إدارة المدراء</h1>
        <Link href="/admin/users/new" className="btn btn-primary">
          + إضافة مدير جديد
        </Link>
      </div>

      <div className="card" style={{ padding: '0', display: 'block' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }} dir="rtl">
          <thead style={{ backgroundColor: 'var(--bg-color)', borderBottom: '1px solid var(--border-color)' }}>
            <tr>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>البريد الإلكتروني</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>الدور</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>تاريخ الإنشاء</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 500 }} dir="ltr">{user.email}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'var(--brand)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                    {user.role === 'ADMIN' ? 'مدير عام' : 'محرر'}
                  </span>
                </td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }} dir="ltr">
                  {new Date(user.createdAt).toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' })}
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="3" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  لا يوجد مدراء حالياً.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
