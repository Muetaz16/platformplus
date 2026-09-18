import '../globals.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ScrollProgress from '../../components/ScrollProgress';
import BackgroundFX from '../../components/BackgroundFX';
import { db } from '../../lib/db';

export const metadata = {
  title: 'منصة بلس — أخبار ذكية وتحليلات احترافية',
  description: 'منصّة بلس: أحدث الأخبار والتحليلات المعمّقة من ليبيا والعالم، بتغطية حصرية على مدار الساعة.',
};

export default async function RootLayout({ children }) {
  let categories = [];
  try {
    categories = await db.orm.public.Category.all();
  } catch (err) {
    console.error(err);
  }

  return (
    <html lang="ar" dir="rtl">
      <body>
        <BackgroundFX />
        <ScrollProgress />
        <Navbar categories={categories} />
        <main style={{ minHeight: '80vh' }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
