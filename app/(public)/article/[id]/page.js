import Link from 'next/link';
import {
  Clock, Eye, Share2, Bookmark, Send, MessageCircle, Link2,
  ArrowRight, ArrowLeft, Sparkles, Users,
} from 'lucide-react';
import Reveal from '../../../../components/Reveal';
import TiltCard from '../../../../components/TiltCard';

import { notFound } from 'next/navigation';
import { db } from '../../../../lib/db';

const FALLBACK_IMG = '/bacground.png';
const resolveImage = (url) => {
  if (!url) return FALLBACK_IMG;
  if (url.startsWith('http') || url.startsWith('/')) return url;
  return `https://images.unsplash.com/photo-${url}?auto=format&fit=crop&q=80&w=1200`;
};

export default async function ArticleDetail({ params }) {
  const { id } = await params;
  const slug = decodeURIComponent(id);
  
  const article = await db.orm.public.Article.where({ slug }).first();
  if (!article) return notFound();

  let categoryName = 'أخبار';
  if (article.categoryId) {
    const cat = await db.orm.public.Category.where({ id: article.categoryId }).first();
    if (cat) categoryName = cat.name;
  }

  const related = await db.orm.public.Article
    .where((a) => a.id.neq(article.id))
    .orderBy((a) => a.createdAt.desc())
    .limit(3)
    .all();

  return (
    <div>
      {/* Clean Header Redesign */}
      <div className="container" style={{ marginTop: '3rem', marginBottom: '2rem' }}>
        <Reveal>
          <header style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
            <span className="pill pill-brand" style={{ marginBottom: '1.2rem' }}><Sparkles size={14} /> {categoryName}</span>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.3, marginBottom: '1.5rem', color: 'var(--ink-900)' }}>
              {article.title}
            </h1>
            
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.6rem', fontWeight: 600 }}>
                <span className="avatar" style={{ width: 36, height: 36, fontSize: '1rem' }}>م</span> بقلم <strong style={{ color: 'var(--ink-900)' }}>المحرر</strong>
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem', fontWeight: 500 }}><Clock size={16} /> {new Date(article.createdAt).toLocaleDateString('ar-EG')}</span>
            </div>
          </header>
        </Reveal>

        <Reveal className="d2">
          <div style={{ position: 'relative', width: '100%', maxWidth: 1000, margin: '0 auto', paddingTop: '50%', borderRadius: 'var(--radius-2xl)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
            <img src={resolveImage(article.imageUrl)} alt={article.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </Reveal>
      </div>

      <div className="container" style={{ marginBottom: '4rem', position: 'relative', zIndex: 3 }}>
        <article className="panel" style={{ maxWidth: 860, margin: '0 auto', padding: 'clamp(1.5rem, 4vw, 3.5rem)', background: 'var(--paper)', marginTop: '-4rem' }}>

          <Reveal className="prose">
            <p className="first-letter">
              {article.excerpt || article.content.substring(0, 100)}
            </p>
            <div style={{ whiteSpace: 'pre-wrap' }}>
              {article.content}
            </div>
          </Reveal>

          {article.images && article.images.length > 1 && (
            <Reveal className="d3" style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
              <h3 style={{ marginBottom: '1.5rem', color: 'var(--ink-900)' }}>معرض الصور</h3>
              <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                {article.images.slice(1).map((img, idx) => (
                  <div key={idx} style={{ position: 'relative', paddingTop: '75%', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                    <img src={resolveImage(img)} alt={`صورة إضافية ${idx + 1}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            </Reveal>
          )}
          
          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <Link href="/" className="btn btn-ghost"><ArrowRight size={16} /> العودة للرئيسية</Link>
          </div>
        </article>
      </div>

      {/* Related */}
      <section className="container" style={{ marginBottom: '4rem' }}>
        <Reveal className="section-head">
          <div>
            <div className="eyebrow"><Sparkles size={15} /> اقرأ أيضاً</div>
            <h2>مقالات ذات صلة</h2>
          </div>
        </Reveal>

        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {related.map((r, i) => (
            <Reveal key={r.id} delay={i + 1}>
              <TiltCard style={{ height: '100%' }}>
                <Link href={`/article/${r.slug}`} style={{ display: 'block', height: '100%' }}>
                  <article className="card">
                    <div className="card-img-wrapper">
                      <span className="card-badge pill pill-glass">مقال</span>
                      <img className="card-img" src={resolveImage(r.imageUrl)} alt={r.title} />
                    </div>
                    <div className="card-content">
                      <h3 className="card-title">{r.title}</h3>
                      <div className="card-meta">
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem' }}><Users size={14} /> المحرر</span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem' }}><Clock size={14} /> {new Date(r.createdAt).toLocaleDateString('ar-EG')}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              </TiltCard>
            </Reveal>
          ))}
          {related.length === 0 && (
            <p style={{ color: 'var(--text-secondary)' }}>لا توجد مقالات ذات صلة.</p>
          )}
        </div>
      </section>
    </div>
  );
}
