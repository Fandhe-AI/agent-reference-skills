---
source: https://orm.drizzle.team/docs/transactions
---

# Transactions

SQL transaction is a grouping of one or more SQL statements that interact with a database. A transaction in its entirety can commit to a database as a single logical unit or rollback (become undone) as a single logical unit.

## Signature / Usage

```ts
const db = drizzle(...)

await db.transaction(async (tx) => {
  await tx.update(accounts).set({ balance: sql`${accounts.balance} - 100.00` }).where(eq(users.name, 'Dan'));
  await tx.update(accounts).set({ balance: sql`${accounts.balance} + 100.00` }).where(eq(users.name, 'Andrew'));
});
```

Nested transactions use `savepoints`:

```ts
await db.transaction(async (tx) => {
  await tx.update(accounts).set({ balance: sql`${accounts.balance} - 100.00` }).where(eq(users.name, 'Dan'));

  await tx.transaction(async (tx2) => {
    await tx2.update(users).set({ name: "Mr. Dan" }).where(eq(users.name, "Dan"));
  });
});
```

Rollback whenever needed:

```ts
await db.transaction(async (tx) => {
  const [account] = await tx.select({ balance: accounts.balance }).from(accounts).where(eq(users.name, 'Dan'));
  if (account.balance < 100) {
    // This throws an exception that rollbacks the transaction.
    tx.rollback()
  }

  await tx.update(accounts).set({ balance: sql`${accounts.balance} - 100.00` }).where(eq(users.name, 'Dan'));
  await tx.update(accounts).set({ balance: sql`${accounts.balance} + 100.00` }).where(eq(users.name, 'Andrew'));
});
```

Return values from the transaction:

```ts
const newBalance: number = await db.transaction(async (tx) => {
  await tx.update(accounts).set({ balance: sql`${accounts.balance} - 100.00` }).where(eq(users.name, 'Dan'));
  await tx.update(accounts).set({ balance: sql`${accounts.balance} + 100.00` }).where(eq(users.name, 'Andrew'));

  const [account] = await tx.select({ balance: accounts.balance }).from(accounts).where(eq(users.name, 'Dan'));
  return account.balance;
});
```

Relational queries can also run inside a transaction:

```ts
const db = drizzle({ schema })

await db.transaction(async (tx) => {
  await tx.query.users.findMany({
    with: { accounts: true }
  });
});
```

## Options / Props

Dialect-specific transaction configuration (`PgTransactionConfig`):

| Name | Type | Description |
| --- | --- | --- |
| isolationLevel | `"read uncommitted" \| "read committed" \| "repeatable read" \| "serializable"` | SQL transaction isolation level |
| accessMode | `"read only" \| "read write"` | Whether the transaction can modify data |
| deferrable | `boolean` | Whether the transaction is deferrable |

```ts
await db.transaction(
  async (tx) => {
    await tx.update(accounts).set({ balance: sql`${accounts.balance} - 100.00` }).where(eq(users.name, "Dan"));
  }, {
    isolationLevel: "read committed",
    accessMode: "read write",
    deferrable: true,
  }
);
```

## Notes

- Transcribed from `pg/transactions.mdx` (pg is the canonical dialect)

## Related

- [Batch API](./batch-api.md)
- [Cache](./cache.md)
