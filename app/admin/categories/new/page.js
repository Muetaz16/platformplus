'use client';

import { useActionState } from 'react';
import { createCategoryAction } from '../actions';
import Link from 'next/link';

export default function NewCategoryPage() {
  const [state, formAction, isPending] = useActionState(createCategoryAction, null);

  return (
    <div dir="rtl">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', margin: 0 }}>إضافة قسم جديد</h1>
        <Link href="/admin/categories" className="btn" style={{ border: '1px solid var(--border-color)' }}>
          إلغاء
        </Link>
      </div>

      <div className="card" style={{ maxWidth: '600px' }}>
        {state?.error && (
          <div style={{ padding: '0.75rem', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '4px', marginBottom: '1rem', fontSize: '0.875rem' }}>
            {state.error}
          </div>
        )}

        <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>اسم القسم</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              required 
              className="field" 
              style={{ width: '100%' }}
            />
          </div>
          
          <div>
            <label htmlFor="slug" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>الرابط (Slug)</label>
            <input 
              type="text" 
              id="slug" 
              name="slug" 
              required 
              className="field" 
              style={{ width: '100%', textAlign: 'left' }}
              dir="ltr"
              pattern="^[a-z0-9-]+$"
              title="يجب أن يحتوي فقط على أحرف إنجليزية صغيرة، وأرقام، وشرطات (-)"
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={isPending}
            style={{ padding: '0.75rem', marginTop: '1rem' }}
          >
            {isPending ? 'جاري الحفظ...' : 'إنشاء القسم'}
          </button>
        </form>
      </div>
    </div>
  );
}
