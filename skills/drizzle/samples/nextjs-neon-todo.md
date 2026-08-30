---
source: https://orm.drizzle.team/docs/tutorials/drizzle-nextjs-neon
---

# Next.js + Neon: server actions CRUD

Wire a Drizzle table to Next.js server actions backed by Neon Postgres, revalidating the page after each mutation.

```ts
// src/db/drizzle.ts
import { config } from "dotenv";
import { drizzle } from 'drizzle-orm/neon-http';

config({ path: ".env" });

export const db = drizzle(process.env.DATABASE_URL!);
```

```ts
// src/db/schema.ts
import { integer, text, boolean, pgTable } from "drizzle-orm/pg-core";

export const todo = pgTable("todo", {
  id: integer("id").primaryKey(),
  text: text("text").notNull(),
  done: boolean("done").default(false).notNull(),
});
```

```ts
// src/actions/todoAction.ts
"use server";
import { eq, not } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { todo } from "@/db/schema";

export const getData = async () => {
  return await db.select().from(todo);
};

export const addTodo = async (id: number, text: string) => {
  await db.insert(todo).values({ id, text });
  revalidatePath("/");
};

export const toggleTodo = async (id: number) => {
  await db.update(todo).set({ done: not(todo.done) }).where(eq(todo.id, id));
  revalidatePath("/");
};

export const deleteTodo = async (id: number) => {
  await db.delete(todo).where(eq(todo.id, id));
  revalidatePath("/");
};
```

```tsx
// src/app/page.tsx
import { getData } from "@/actions/todoAction";
import Todos from "@/components/todos";

export default async function Home() {
  const data = await getData();
  return <Todos todos={data} />;
}
```

## Notes

- `drizzle-orm/neon-http` queries over HTTP — fastest for single, non-interactive statements from serverless functions/server actions; use `neon-serverless` (WebSocket) instead if you need session-scoped interactive transactions.
- Server actions (`"use server"`) call `db` directly server-side; call `revalidatePath("/")` after every mutation so the server component re-fetches fresh data.
- Generate/apply schema changes with `npx drizzle-kit generate` then `npx drizzle-kit migrate` (or `npx drizzle-kit push` for local prototyping).
- Neon-specific connection variants (HTTP vs WebSocket vs node-postgres/postgres.js) are covered in `connect-neon.md`.
