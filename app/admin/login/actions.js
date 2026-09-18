'use server';

import { db } from '../../../lib/db';
import { verifyPassword } from '../../../lib/password';
import { signToken } from '../../../lib/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(prevState, formData) {
  const email = formData.get('email');
  const password = formData.get('password');
  const remember = formData.get('remember') === 'on';

  if (!email || !password) {
    return { error: 'Please provide both email and password.' };
  }

  try {
    const user = await db.orm.public.User.where({ email }).all().first();
    
    if (!user) {
      return { error: 'Invalid credentials.' };
    }

    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
      return { error: 'Invalid credentials.' };
    }

    // Set cookie
    const token = await signToken({ id: user.id, email: user.email, role: user.role });
    const cookieStore = await cookies();
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: remember ? 60 * 60 * 24 * 30 : 60 * 60 * 24, // 30 days or 1 day
    });

  } catch (err) {
    console.error(err);
    return { error: 'An unexpected error occurred.' };
  }

  // Redirect must happen outside try/catch
  redirect('/admin');
}
