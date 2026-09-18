'use server';

import { db } from '../../../lib/db';
import { hashPassword } from '../../../lib/password';
import { redirect } from 'next/navigation';

export async function createUserAction(prevState, formData) {
  const email = formData.get('email');
  const password = formData.get('password');
  const role = formData.get('role') || 'ADMIN';

  if (!email || !password) {
    return { error: 'Please provide both email and password.' };
  }

  try {
    const existing = await db.orm.public.User.where({ email }).first();
    if (existing) {
      return { error: 'User with this email already exists.' };
    }

    const hashedPassword = await hashPassword(password);
    
    await db.orm.public.User.create({
      email,
      password: hashedPassword,
      role,
    });
  } catch (err) {
    console.error(err);
    return { error: 'Failed to create user.' };
  }

  redirect('/admin/users');
}
