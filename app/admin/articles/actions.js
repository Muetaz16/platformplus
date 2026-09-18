'use server';

import { db } from '../../../lib/db';
import { redirect } from 'next/navigation';
import { promises as fs } from 'fs';
import path from 'path';

export async function createArticleAction(prevState, formData) {
  const title = formData.get('title');
  const slug = formData.get('slug');
  const content = formData.get('content');
  const excerpt = formData.get('excerpt');
  const categoryId = formData.get('categoryId');
  const published = formData.get('published') === 'on';
  const isTrending = formData.get('isTrending') === 'on';
  
  let imageUrl = null;
  const imageFiles = formData.getAll('imageFiles');
  const uploadedImages = [];

  for (const imageFile of imageFiles) {
    if (imageFile && imageFile.size > 0) {
      try {
        const buffer = Buffer.from(await imageFile.arrayBuffer());
        const ext = path.extname(imageFile.name) || '';
        const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        await fs.writeFile(path.join(uploadDir, filename), buffer);
        uploadedImages.push(`/uploads/${filename}`);
      } catch (err) {
        console.error('File upload error:', err);
      }
    }
  }

  if (uploadedImages.length > 0) {
    imageUrl = uploadedImages[0];
  }

  try {
    const existing = await db.orm.public.Article.where({ slug }).first();
    if (existing) {
      return { error: 'Article with this slug already exists.' };
    }

    await db.orm.public.Article.create({
      title,
      slug,
      content,
      excerpt,
      imageUrl,
      images: uploadedImages,
      categoryId: categoryId || null,
      published,
      isTrending,
    });
  } catch (err) {
    console.error(err);
    return { error: 'Failed to create article.' };
  }

  redirect('/admin/articles');
}
