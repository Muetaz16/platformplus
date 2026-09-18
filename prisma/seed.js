import { db } from '../lib/db.js';
import bcrypt from 'bcrypt';

async function main() {
  const adminEmail = 'motaz@gmail.com';
  const adminPassword = 'M0taz$$$';

  // Check if admin exists
  // For Prisma 8, queries use db.orm.<Model> or db.sql
  // Using ORM for simplicity
  const existingAdmin = await db.orm.public.User.where({ email: adminEmail }).all().first();

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await db.orm.public.User.create({
      email: adminEmail,
      password: hashedPassword,
      role: 'ADMIN',
    });
    console.log(`Admin user created: ${adminEmail}`);
  } else {
    console.log(`Admin user already exists: ${adminEmail}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.close();
  });
