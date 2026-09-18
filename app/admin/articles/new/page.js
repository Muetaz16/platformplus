import { db } from '../../../../lib/db';
import ArticleForm from './ArticleForm';

export const dynamic = 'force-dynamic';

export default async function NewArticlePage() {
  const categories = await db.orm.public.Category.all();

  return <ArticleForm categories={categories} />;
}
