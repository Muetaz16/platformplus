'use client';

import { useActionState, useState } from 'react';
import { createArticleAction } from '../actions';
import Link from 'next/link';

export default function ArticleForm({ categories }) {
  const [state, formAction, isPending] = useActionState(createArticleAction, null);
  const [imageInputs, setImageInputs] = useState([0]);

  const addImageInput = () => {
    setImageInputs([...imageInputs, Date.now()]);
  };

  const removeImageInput = (idToRemove) => {
    setImageInputs(imageInputs.filter(id => id !== idToRemove));
  };

  return (
    <div dir="rtl">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', margin: 0 }}>إضافة مقال جديد</h1>
        <Link href="/admin/articles" className="btn" style={{ border: '1px solid var(--border-color)' }}>
          إلغاء
        </Link>
      </div>

      <div className="card" style={{ maxWidth: '800px' }}>
        {state?.error && (
          <div style={{ padding: '0.75rem', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '4px', marginBottom: '1rem', fontSize: '0.875rem' }}>
            {state.error}
          </div>
        )}

        <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label htmlFor="title" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>العنوان الرئيسي</label>
            <input type="text" id="title" name="title" required className="field" style={{ width: '100%' }} />
          </div>
          
          <div>
            <label htmlFor="slug" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>الرابط (Slug)</label>
            <input type="text" id="slug" name="slug" required className="field" style={{ width: '100%', textAlign: 'left' }} dir="ltr" pattern="^[a-z0-9-]+$" title="يجب أن يحتوي فقط على أحرف إنجليزية صغيرة، وأرقام، وشرطات (-)" />
          </div>

          <div>
            <label htmlFor="categoryId" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>القسم</label>
            <select id="categoryId" name="categoryId" className="field" style={{ width: '100%' }}>
              <option value="">اختيار القسم (اختياري)</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="excerpt" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>ملخص المقال</label>
            <textarea id="excerpt" name="excerpt" className="field" style={{ width: '100%', minHeight: '80px', resize: 'vertical' }}></textarea>
          </div>

          <div>
            <label htmlFor="content" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>المحتوى</label>
            <textarea id="content" name="content" required className="field" style={{ width: '100%', minHeight: '300px', resize: 'vertical', lineHeight: '1.8' }}></textarea>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>رفع صورة/صور الغلاف</label>
            {imageInputs.map((id, index) => (
              <div key={id} style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input type="file" name="imageFiles" accept="image/*" multiple className="field" style={{ width: '100%', textAlign: 'left' }} dir="ltr" />
                {index > 0 && (
                  <button type="button" onClick={() => removeImageInput(id)} className="btn btn-ghost" style={{ padding: '0.5rem', color: 'var(--accent)' }}>
                    حذف
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addImageInput} className="btn btn-ghost" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem', marginTop: '0.5rem' }}>
              + إضافة حقل رفع صورة أخرى
            </button>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>يمكنك اختيار أكثر من صورة في نفس الحقل، أو إضافة حقول إضافية. الصورة الأولى ستكون الغلاف الرئيسي.</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="checkbox" id="published" name="published" defaultChecked style={{ width: '1.25rem', height: '1.25rem', accentColor: 'var(--brand)' }} />
            <label htmlFor="published" style={{ fontWeight: 500 }}>نشر فوراً</label>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="checkbox" id="isTrending" name="isTrending" style={{ width: '1.25rem', height: '1.25rem', accentColor: 'var(--brand)' }} />
            <label htmlFor="isTrending" style={{ fontWeight: 500 }}>تحديد كـ "أخبار شائعة" (Trending)</label>
          </div>

          <button type="submit" className="btn btn-primary" disabled={isPending} style={{ padding: '0.75rem', marginTop: '1rem' }}>
            {isPending ? 'جاري الحفظ...' : 'نشر المقال'}
          </button>
        </form>
      </div>
    </div>
  );
}
