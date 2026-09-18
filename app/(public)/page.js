import Link from 'next/link';
import {
  Flame, Clock, Eye, ArrowLeft, Sparkles, Radio, Users,
  Newspaper, Globe, Cpu, Briefcase, TrendingUp, Send,
} from 'lucide-react';
import Reveal from '../../components/Reveal';
import TiltCard from '../../components/TiltCard';
import { db } from '../../lib/db';

const FALLBACK_IMG = '/bacground.png';
const resolveImage = (url) => {
  if (!url) return FALLBACK_IMG;
  if (url.startsWith('http') || url.startsWith('/')) return url;
  return `https://images.unsplash.com/photo-${url}?auto=format&fit=crop&q=80&w=900`;
};

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [trendingArticles, featuredArticles, dbCategories] = await Promise.all([
    db.orm.public.Article
      .where({ published: true, isTrending: true })
      .orderBy((a) => a.createdAt.desc())
      .limit(4)
      .all(),
    db.orm.public.Article
      .where({ published: true })
      .orderBy((a) => a.createdAt.desc())
      .limit(3)
      .all(),
    db.orm.public.Category.all(),
  ]);

  const FEATURES = featuredArticles.map((a, i) => ({
    id: a.imageUrl,
    cat: a.categoryId ? (dbCategories.find(c => c.id === a.categoryId)?.name || 'أخبار') : 'أخبار',
    title: a.title,
    author: 'المحرر', // We don't have author field yet
    time: new Date(a.createdAt).toLocaleDateString(),
    big: i === 0,
    slug: a.slug,
  }));

  const LATEST = trendingArticles.map((a) => ({
    id: a.imageUrl,
    cat: a.categoryId ? (dbCategories.find(c => c.id === a.categoryId)?.name || 'أخبار') : 'أخبار',
    title: a.title,
    excerpt: a.excerpt || a.content.substring(0, 100) + '...',
    author: 'المحرر',
    time: new Date(a.createdAt).toLocaleDateString(),
    slug: a.slug,
  }));

  const CATEGORIES = [
    { label: 'كل الأخبار', icon: Newspaper, active: true, href: '/' },
    ...dbCategories.map(c => ({ label: c.name, icon: Globe, href: `/category/${c.slug}` }))
  ];

  const MOST_READ = featuredArticles.slice(0, 5);

  const STATS = [
    { num: '+2.5M', label: 'قارئ شهرياً', icon: Users },
    { num: '+12K', label: 'مقال منشور', icon: Newspaper },
    { num: '24/7', label: 'تغطية مستمرة', icon: Radio },
    { num: '98%', label: 'رضا القرّاء', icon: Sparkles },
  ];

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem 3rem' }}>
      {/* ===== HERO ===== */}
      <Reveal as="section" style={{ marginBottom: '3.5rem' }}>
        <div className="hero">
          <div className="hero-media">
            <img src="/bacground.png" alt="صورة الأخبار الرئيسية" />
          </div>
        </div>
      </Reveal>

      {/* ===== STATS STRIP ===== */}
      <Reveal className="stat-strip" style={{ marginBottom: '4rem' }}>
        {STATS.map(({ num, label, icon: Icon }, i) => (
          <div className="stat" key={i}>
            <div style={{ display: 'inline-grid', placeItems: 'center', width: 44, height: 44, borderRadius: 14, background: 'rgba(99,102,241,.12)', color: 'var(--brand)', marginBottom: '.6rem' }}>
              <Icon size={22} />
            </div>
            <div className="num gradient-text">{num}</div>
            <div className="label">{label}</div>
          </div>
        ))}
      </Reveal>

      {/* ===== CATEGORY CHIPS ===== */}
      <Reveal className="category-chips" style={{ marginBottom: '2.5rem', justifyContent: 'center' }}>
        {CATEGORIES.map(({ label, icon: Icon, active, href }) => (
          <Link href={href} className={`chip${active ? ' active' : ''}`} key={label}>
            <Icon size={16} /> {label}
          </Link>
        ))}
      </Reveal>

      {/* ===== FEATURED BENTO ===== */}
      <section style={{ marginBottom: '4.5rem' }}>
        <Reveal className="section-head">
          <div>
            <div className="eyebrow"><Sparkles size={15} /> مختارات المحرّرين</div>
            <h2>أبرز الأخبار</h2>
          </div>
        </Reveal>

        <div className="bento">
          {FEATURES.map((f, i) => (
            <Reveal key={f.id} delay={i + 1} className={f.big ? 'feature-lg' : ''}>
              <TiltCard className={f.big ? 'feature-lg' : ''} style={{ height: '100%' }}>
                <Link href={`/article/${f.slug}`} className={`feature${f.big ? ' feature-lg' : ''}`}>
                  <img src={resolveImage(f.id)} alt={f.title} />
                  <div className="feature-body">
                    <span className="pill pill-glass"><Flame size={13} /> {f.cat}</span>
                    <h3>{f.title}</h3>
                    <div className="meta-row">
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.35rem' }}><Users size={14} /> {f.author}</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.35rem' }}><Clock size={14} /> {f.time}</span>
                    </div>
                  </div>
                </Link>
              </TiltCard>
            </Reveal>
          ))}
          {FEATURES.length === 0 && (
            <div style={{ padding: '2rem', textAlign: 'center', gridColumn: '1 / -1', color: 'var(--text-secondary)' }}>
              No featured articles yet. Add some in the admin panel!
            </div>
          )}
        </div>
      </section>

      {/* ===== MAIN + SIDEBAR ===== */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem' }}>

        <div style={{ flex: '1 1 62%', minWidth: 320 }}>
          <Reveal className="section-head">
            <div>
              <div className="eyebrow"><Radio size={15} /> محدّث الآن</div>
              <h2>الأخبار الشائعة</h2>
            </div>
          </Reveal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {LATEST.map((a, i) => (
              <Reveal key={a.id} delay={Math.min(i + 1, 4)}>
                <Link href={`/article/${a.slug}`} style={{ display: 'block' }}>
                  <article className="card list-card" style={{ flexDirection: 'row', alignItems: 'stretch' }}>
                    <div className="list-img">
                      <img src={resolveImage(a.id)} alt={a.title}
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .8s var(--ease)' }} className="card-img" />
                    </div>
                    <div className="card-content">
                      <span className="card-category">{a.cat}</span>
                      <h3 className="card-title">{a.title}</h3>
                      <p className="card-excerpt">{a.excerpt}</p>
                      <div className="card-meta">
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem' }}>
                          <span className="avatar">{a.author.charAt(0)}</span>
                          <strong style={{ color: 'var(--ink-800)' }}>{a.author}</strong>
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.3rem' }}><Clock size={14} /> {a.time}</span>
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </Reveal>
            ))}
            {LATEST.length === 0 && (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                No latest articles yet.
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside style={{ flex: '1 1 30%', minWidth: 300, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <Reveal className="panel" delay={2}>
            <div className="section-head" style={{ marginBottom: '1.2rem' }}>
              <div>
                <div className="eyebrow"><Flame size={14} /> الأكثر قراءة</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
              {MOST_READ.map((t, i) => (
                <div className="rank-item" key={i}>
                  <span className="rank-num">{`٠${i + 1}`}</span>
                  <Link href={`/article/${t.slug}`}>{t.title}</Link>
                </div>
              ))}
              {MOST_READ.length === 0 && (
                <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                  No articles.
                </div>
              )}
            </div>
          </Reveal>
        </aside>
      </div>
    </div>
  );
}
