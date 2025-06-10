# pb-bot

Discord bot created for the Panal Band discord server

![](./src/images/server-logo.png)

## Example

This file is basically for, how to create a new command just copy the code base and edit for ur needs

For buttons using action row

`UPDATE`: Per the docs, it is recommended to **create new embeds**, but you use the original embed to pre-populate the new embed. Then, just update what you need and edit the message with the new embed

@example:

```js
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('').setDescription(''),
  async autocomplete(interaction) {},
  async execute(interaction) {
    // some code here
  },
};
```

## 🛠️ Database & Prisma Setup

1. Prerequisites
   • Node.js ≥ 18
   • PostgreSQL 17 running locally (GUI tools like TablePlus, DBeaver, or pgAdmin are recommended for DB management)

⸻

2. Configure Database Connection

- Create your PostgreSQL database (with your preferred client or CLI):

```bash
createdb discordbot
```

- Copy the environment file example and edit your connection string:

```bash
cp .env.example .env
```

Edit .env:

```bash
DATABASE_URL="postgresql://your_user:your_password@localhost:5432/discordbot?schema=public"
```

⸻

3. Initialize Prisma

Run in your project root:

```bash
npx prisma init
```

This will create a prisma/ folder and a prisma/schema.prisma file.

⸻

4. Define Your Schema

Set up your models in prisma/schema.prisma, e.g.:

```prisma
model User {
id String @id @default(cuid())
name String?
createdAt DateTime @default(now()) @db.Timestamptz(6)
updatedAt DateTime @default(now()) @updatedAt @db.Timestamptz(6)
messages Message[]
}

model Message {
id String @id @default(cuid())
content String
userId String
user User @relation(fields: [userId], references: [id], onDelete: Cascade)
createdAt DateTime @default(now()) @db.Timestamptz(6)
}
```

⸻

5. Run Your First Migration

Generate and apply migrations:

```bash
npx prisma migrate dev --name init
```

⸻

6. Generate Prisma Client

Every time you change your schema:

```bash
npx prisma generate
```

⸻

7. Seed Initial Data

Create prisma/seed.js (or prisma/seed.ts for TypeScript):

```javascript
// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      name: 'Test User',
      messages: {
        create: [{ content: 'Hello world!' }],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Run:

```bash
npx prisma db seed
```

⸻

8. Useful Commands

• Reset the database (DANGEROUS, wipes data):

```bash
npx prisma migrate reset
```

• View migration status:

```bash
npx prisma migrate status
```

• Open Prisma Studio (web GUI):

```bash
npx prisma studio
```

⸻

🚦 Troubleshooting
• If you have connection issues, double-check your DATABASE_URL and ensure PostgreSQL is running.
• Use npx prisma migrate reset if the DB schema drifts from your migrations.
• On Windows, run your terminal as Administrator if you encounter permissions errors.

⸻
