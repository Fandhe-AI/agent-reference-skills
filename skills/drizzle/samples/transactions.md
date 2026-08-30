---
source: https://orm.drizzle.team/docs/transactions
---

# Transactions

Group multiple statements into a single atomic unit, with support for savepoints, rollback, return values, and isolation-level configuration.

```ts
const db = drizzle(...)

await db.transaction(async (tx) => {
  await tx.update(accounts).set({ balance: sql`${accounts.balance} - 100.00` }).where(eq(users.name, 'Dan'));
  await tx.update(accounts).set({ balance: sql`${accounts.balance} + 100.00` }).where(eq(users.name, 'Andrew'));
});
```

Rollback based on business logic, and dialect-specific transaction config:

```ts
await db.transaction(async (tx) => {
  const [account] = await tx.select({ balance: accounts.balance }).from(accounts).where(eq(users.name, 'Dan'));
  if (account.balance < 100) {
    // This throws an exception that rollbacks the transaction.
    tx.rollback()
  }

  await tx.update(accounts).set({ balance: sql`${accounts.balance} - 100.00` }).where(eq(users.name, 'Dan'));
  await tx.update(accounts).set({ balance: sql`${accounts.balance} + 100.00` }).where(eq(users.name, 'Andrew'));
}, {
  isolationLevel: "read committed",
  accessMode: "read write",
  deferrable: true,
});
```

## Notes

- Nested `tx.transaction(async (tx2) => {...})` calls implement SQL savepoints.
- `tx.rollback()` throws internally to abort and roll back the transaction — you don't need to catch/rethrow it yourself.
- `db.transaction(...)` can return a value that becomes the resolved value of the outer `await`.
- Relational queries (`tx.query.<table>.findMany(...)`) work the same inside a transaction as outside it. The Upstash cache extension does not support caching queries run inside a transaction (see `upstash-cache.md`).
