'use server';

import { db } from '../../../lib/db';
import { redirect } from 'next/navigation';
import { or } from '@prisma/orm-postgres/orm-client';

export async function createCategoryAction(prevState, formData) {
  const name = formData.get('name');
  const slug = formData.get('slug');

  if (!name || !slug) {
    return { error: 'Please provide both name and slug.' };
  }

  try {
    const existing = await db.orm.public.Category.where((c) => or(
      c.name.eq(name),
      c.slug.eq(slug)
    )).first();

    if (existing) {
      return { error: 'Category with this name or slug already exists.' };
    }

    await db.orm.public.Category.create({
      name,
      slug,
    });
  } catch (err) {
    console.error(err);
    return { error: 'Failed to create category.' };
  }

  redirect('/admin/categories');
}
