'use client';

import { useActionState, useState } from 'react';
import { loginAction } from './actions';
import { Mail, Lock, ShieldAlert, ArrowRight, Eye, EyeOff } from 'lucide-react';
import '../../globals.css';
import Link from 'next/link';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, var(--bg-color) 0%, rgba(99, 102, 241, 0.05) 100%)',
      padding: '1rem',
    }} dir="rtl">
      
      <div className="card" style={{ 
        width: '100%', 
        maxWidth: '420px', 
        padding: '2.5rem', 
        borderRadius: '24px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(10px)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative background element */}
        <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '150px', height: '150px', background: 'var(--brand)', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.15, zIndex: 0 }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <div style={{ width: 64, height: 64, borderRadius: '16px', background: 'var(--brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 10px 25px rgba(99, 102, 241, 0.3)' }}>
               <ShieldAlert size={32} />
            </div>
          </div>
          
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', textAlign: 'center', fontWeight: 800 }}>تسجيل الدخول</h1>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.95rem' }}>
            مرحباً بك مجدداً في لوحة تحكم منصة بلس
          </p>
          
          {state?.error && (
            <div style={{ padding: '1rem', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '12px', marginBottom: '1.5rem', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ minWidth: '4px', height: '100%', backgroundColor: '#ef4444', borderRadius: '4px' }} />
              {state.error === 'Invalid credentials.' ? 'بيانات الدخول غير صحيحة.' : 
               state.error === 'Please provide both email and password.' ? 'الرجاء إدخال البريد الإلكتروني وكلمة المرور.' : 
               'حدث خطأ غير متوقع. يرجى المحاولة لاحقاً.'}
            </div>
          )}

          <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--ink-700)' }}>البريد الإلكتروني</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="admin@example.com"
                  required 
                  className="field" 
                  style={{ width: '100%', boxSizing: 'border-box', paddingRight: '2.75rem', paddingLeft: '1rem', borderRadius: '12px', color: '#0f172a', backgroundColor: 'rgba(0,0,0,0.03)', border: '1px solid #cbd5e1' }}
                  dir="ltr"
                />
              </div>
            </div>
            
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label htmlFor="password" style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ink-700)' }}>كلمة المرور</label>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  id="password" 
                  name="password"
                  placeholder="••••••••" 
                  required 
                  className="field" 
                  style={{ width: '100%', boxSizing: 'border-box', paddingRight: '2.75rem', paddingLeft: '2.75rem', borderRadius: '12px', color: '#0f172a', backgroundColor: 'rgba(0,0,0,0.03)', border: '1px solid #cbd5e1' }}
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
                  aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="checkbox" id="remember" name="remember" style={{ width: '1rem', height: '1rem', accentColor: 'var(--brand)', cursor: 'pointer' }} />
              <label htmlFor="remember" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', cursor: 'pointer', userSelect: 'none' }}>
                تذكرني
              </label>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={isPending}
              style={{ marginTop: '0.5rem', width: '100%', padding: '0.85rem', borderRadius: '12px', fontSize: '1rem', fontWeight: 600, display: 'flex', justifyContent: 'center', gap: '0.5rem', alignItems: 'center' }}
            >
              {isPending ? 'جاري الدخول...' : (
                <>
                  دخول للوحة التحكم
                  <ArrowRight size={18} style={{ transform: 'rotate(180deg)' }} />
                </>
              )}
            </button>
          </form>
          
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Link href="/" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
              العودة للموقع
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
