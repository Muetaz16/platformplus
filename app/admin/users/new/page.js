'use client';

import { useActionState } from 'react';
import { createUserAction } from '../actions';
import Link from 'next/link';

export default function NewUserPage() {
  const [state, formAction, isPending] = useActionState(createUserAction, null);

  return (
    <div dir="rtl">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', margin: 0 }}>إضافة مدير جديد</h1>
        <Link href="/admin/users" className="btn" style={{ border: '1px solid var(--border-color)' }}>
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
            <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>البريد الإلكتروني</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required 
              className="field" 
              style={{ width: '100%', textAlign: 'left' }}
              dir="ltr"
            />
          </div>
          
          <div>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>كلمة المرور</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              required 
              className="field" 
              style={{ width: '100%', textAlign: 'left' }}
              dir="ltr"
            />
          </div>

          <div>
            <label htmlFor="role" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>الدور الصلاحي</label>
            <select id="role" name="role" className="field" style={{ width: '100%' }}>
              <option value="ADMIN">مدير عام</option>
              <option value="EDITOR">محرر</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={isPending}
            style={{ padding: '0.75rem', marginTop: '1rem' }}
          >
            {isPending ? 'جاري الحفظ...' : 'إنشاء حساب'}
          </button>
        </form>
      </div>
    </div>
  );
}
