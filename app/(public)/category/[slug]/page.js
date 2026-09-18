import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, Eye, Sparkles, Users } from 'lucide-react';
import { db } from '../../../../lib/db';
import Reveal from '../../../../components/Reveal';

import TiltCard from '../../../../components/TiltCard';

const FALLBACK_IMG = '/bacground.png';
const resolveImage = (url) => {
  if (!url) return FALLBACK_IMG;
  if (url.startsWith('http') || url.startsWith('/')) return url;
  return `https://images.unsplash.com/photo-${url}?auto=format&fit=crop&q=80&w=900`;
};

export default async function CategoryPage({ params }) {
  const rawSlug = (await params).slug;
  const slug = decodeURIComponent(rawSlug);

  const category = await db.orm.public.Category.where({ slug }).first();
  if (!category) {
    return notFound();
  }

  const articles = await db.orm.public.Article
    .where({ categoryId: category.id, published: true })
    .orderBy((a) => a.createdAt.desc())
    .all();

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem 3rem', minHeight: '60vh' }}>
      <Reveal as="section" style={{ marginBottom: '3.5rem' }}>
        <div className="section-head">
          <div>
            <div className="eyebrow"><Sparkles size={15} /> التصنيف</div>
            <h2>{category.name}</h2>
          </div>
        </div>
      </Reveal>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
        {articles.map((a, i) => (
          <Reveal key={a.id} delay={i + 1}>
            <TiltCard style={{ height: '100%' }}>
              <Link href={`/article/${a.slug}`} style={{ display: 'block', height: '100%' }}>
                <article className="card">
                  <div className="card-img-wrapper">
                    <span className="card-badge pill pill-glass">مقال</span>
                    <img className="card-img" src={resolveImage(a.imageUrl)} alt={a.title} />
                  </div>
                  <div className="card-content">
                    <h3 className="card-title" style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{a.title}</h3>
                    <p className="card-excerpt" style={{ marginBottom: '1rem', flex: 1 }}>{a.excerpt || (a.content && a.content.substring(0, 100)) + '...'}</p>
                    <div className="card-meta">
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem' }}><Users size={14} /> المحرر</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem' }}><Clock size={14} /> {new Date(a.createdAt).toLocaleDateString('ar-EG')}</span>
                    </div>
                  </div>
                </article>
              </Link>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      {articles.length === 0 && (
          <Reveal>
            <div style={{ padding: '4rem 2rem', textAlign: 'center', background: 'var(--paper)', borderRadius: 24, border: '1px solid var(--border-color)' }}>
              <div style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                <Sparkles size={32} style={{ margin: '0 auto', opacity: 0.5 }} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>لا توجد مقالات في الوقت الحالي</h3>
              <p style={{ color: 'var(--text-secondary)' }}>لم يتم نشر أي مقالات في تصنيف "{category.name}" بعد.</p>
              <Link href="/" className="btn btn-primary" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>العودة للرئيسية</Link>
            </div>
          </Reveal>
        )}
    </div>
  );
}
