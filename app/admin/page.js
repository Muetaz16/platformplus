import { db } from '../../lib/db';

export default async function AdminDashboard() {
  const [articleAgg, categoryAgg, userAgg, recentArticles] = await Promise.all([
    db.orm.public.Article.aggregate((a) => ({ count: a.count() })),
    db.orm.public.Category.aggregate((a) => ({ count: a.count() })),
    db.orm.public.User.aggregate((a) => ({ count: a.count() })),
    db.orm.public.Article.orderBy((a) => a.createdAt.desc()).limit(5).all(),
  ]);


  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>نظرة عامة</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ marginBottom: '3rem' }}>
        <div className="card" style={{ padding: '1.5rem', display: 'block' }}>
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>إجمالي المقالات</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>{articleAgg.count}</p>
        </div>
        <div className="card" style={{ padding: '1.5rem', display: 'block' }}>
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>إجمالي المدراء</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>{userAgg.count}</p>
        </div>
        <div className="card" style={{ padding: '1.5rem', display: 'block' }}>
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>الأقسام النشطة</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>{categoryAgg.count}</p>
        </div>
      </div>

      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>النشاط الأخير</h2>
      <div className="card" style={{ padding: '0', display: 'block' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
          <thead style={{ backgroundColor: 'var(--bg-color)', borderBottom: '1px solid var(--border-color)' }}>
            <tr>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>الإجراء</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>العنصر</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>الوقت</th>
            </tr>
          </thead>
          <tbody>
            {recentArticles.length > 0 ? recentArticles.map((article) => (
              <tr key={article.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span style={{ backgroundColor: article.published ? 'rgba(59, 130, 246, 0.1)' : 'rgba(100, 116, 139, 0.1)', color: article.published ? 'var(--secondary)' : 'var(--text-secondary)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                    {article.published ? 'منشور' : 'مسودة'}
                  </span>
                </td>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>{article.title}</td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }} dir="ltr">
                  {new Date(article.createdAt).toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' })}
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="3" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  لا يوجد مقالات حتى الآن
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
