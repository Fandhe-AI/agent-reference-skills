# Create a DB Adapter

Better Auth のカスタム DB アダプター作成ガイド。Better Auth provides `createAdapterFactory` to simplify custom database adapter development. The function handles schema configurations, ID generation, JSON parsing, key mapping, and joins — allowing developers to focus on database logic.

## Signature / Usage

### 1. Import and Configure

Begin by importing `createAdapterFactory` and defining your adapter's configuration interface:

```typescript
import { createAdapterFactory, type DBAdapterDebugLogOption } from "better-auth/adapters";

interface CustomAdapterConfig {
  debugLogs?: DBAdapterDebugLogOption;
  usePlural?: boolean;
}

export const myAdapter = (config: CustomAdapterConfig = {}) =>
  createAdapterFactory({
    // implementation follows
  });
```

### 2. Set Adapter Configuration

The config object provides metadata and capability declarations:

```typescript
config: {
  adapterId: "custom-adapter",
  adapterName: "Custom Adapter",
  usePlural: config.usePlural ?? false,
  debugLogs: config.debugLogs ?? false,
  supportsJSON: false,
  supportsDates: true,
  supportsBooleans: true,
  supportsNumericIds: true,
}
```

See `## Options / Props` for the capability flags.

### 3. Implement Adapter Methods

The adapter function receives helper utilities and must return methods for database operations.

### Core Adapter Methods

#### `create`

"The `create` method is used to create a new record in the database."

```typescript
create: async ({ model, data, select }) => {
  return await db.insert(model).values(data);
}
```

#### `update`

"The `update` method is used to update a record in the database."

```typescript
update: async ({ model, where, update }) => {
  return await db.update(model).set(update).where(where);
}
```

#### `updateMany`

Updates multiple records; must return the count of updated records.

#### `delete`

Removes a single record matching the where clause.

#### `deleteMany`

"The `deleteMany` method is used to delete multiple records from the database." Returns the deletion count.

#### `findOne`

"The `findOne` method is used to find a single record in the database."

```typescript
findOne: async ({ model, where, select, join }) => {
  return await db.select().from(model).where(where).limit(1);
}
```

#### `findMany`

"The `findMany` method is used to find multiple records in the database."

```typescript
findMany: async ({ model, where, limit, sortBy, offset, join }) => {
  return await db.select().from(model).where(where)
    .limit(limit).offset(offset).orderBy(sortBy);
}
```

#### `count`

"The `count` method is used to count the number of records in the database."

#### `consumeOne`

Atomically deletes a single matching record and returns it, so two concurrent requests cannot both consume the same row. It powers single-use credentials such as one-time verification challenges. Parameters: `model`, `where`. Returns `Promise<T | null>` (the consumed record, or `null` if no row matched, including when another request consumed it first); implementations must delete at most one matching row.

```typescript
consumeOne: async ({ model, where }) => {
  // Single DELETE ... RETURNING is atomic, so only one caller gets the row.
  const [row] = await db.delete(model).where(where).returning();
  return row ?? null;
};
```

The upstream example is illustrative: a plain `DELETE ... WHERE ... RETURNING` affects every matching row, so a real adapter must target exactly one row (e.g. pick one row by primary/unique key within the same atomic statement or transaction) to honor the at-most-one-row contract.

`consumeOne` is optional: without it, Better Auth uses a conditional delete and returns the record only when exactly one row was deleted.

#### `incrementOne`

Atomically updates one matching record by applying numeric deltas and optional set values, then returns the updated row. It powers guarded counters such as rate limits, quotas, and one-winner state transitions. Parameters: `model`, `where` (must still match for the increment to apply), `increment` (numeric deltas such as `{ count: 1 }` or `{ remaining: -1 }`), `set` (optional fields set in the same atomic operation; `undefined` leaves a field unchanged, `null` clears it). Returns `Promise<T | null>` (the updated record, or `null` if no row matched); implementations must update at most one matching row.

```typescript
incrementOne: async ({ model, where, increment, set }) => {
  const [row] = await db
    .update(model)
    .set({
      ...set,
      count: sql`${model.count} + ${increment.count ?? 0}`,
    })
    .where(where)
    .returning();
  return row ?? null;
};
```

The upstream example is illustrative: a plain `UPDATE ... WHERE ... RETURNING` affects every matching row, so a real adapter must target exactly one row (e.g. pick one row by primary/unique key within the same atomic statement or transaction) to honor the at-most-one-row contract. The example only maps `count`; a real implementation must apply every key in `increment` atomically (e.g. build `field = field + delta` for each entry) and leave other fields to `set`.

`incrementOne` is optional: without it, Better Auth uses conditional updates with bounded retries; if retries are exhausted, the operation throws and the increment is not recorded. Use native increments for heavily contended counters and security controls such as failed-attempt limits. Fallbacks reuse your adapter's CRUD methods and need complete, stable row snapshots with mapped IDs, atomic conditional writes, exact affected-row counts, and null comparisons that also match absent nullable fields.

### Available Helper Parameters

Adapters receive these utilities from the factory (see `## Options / Props` for the full list).

### Advanced Configuration

#### Custom Key Mapping

Map keys between Better Auth and your database:

```typescript
mapKeysTransformInput: {
  id: "_id"  // MongoDB example
},
mapKeysTransformOutput: {
  _id: "id"
}
```

#### Custom Data Transformation

```typescript
customTransformInput: ({ field, data }) => {
  if (field === "id") return "123";
  return data;
}
```

#### Transaction Support

Declare transaction capability:

```typescript
transaction: (callback) => {
  // Execute callback within a transaction
}
```

#### Join Support

Set `supportsJoin: true` for native database joins; otherwise Better Auth handles them via multiple queries.

### Testing Your Adapter

Install test utilities:

```bash
npm install -D @better-auth/test-utils
```

Create tests using the provided suite:

```typescript
import { testAdapter, createTestSuite } from "@better-auth/test-utils/adapter";

const { execute } = await testAdapter({
  adapter: (options) => myAdapter(),
  runMigrations: async (options) => {
    // Run your migrations
  },
  tests: [createTestSuite("Normal", ({ test, adapter }) => [
    test("should create and find a user", async () => {
      // Your test logic
    })
  ])],
});

execute();
```

### Optional Methods

#### `createSchema`

Allows the CLI to generate database schemas for your adapter, accepting table definitions and output file path.

#### `options`

Return custom configuration passed to your adapter for later use.

## Options / Props

**Config capability flags:**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `supportsJSON` | boolean | — | Whether the database handles JSON natively |
| `supportsDates` | boolean | — | Whether dates are supported |
| `supportsBooleans` | boolean | — | Whether boolean types exist |
| `supportsNumericIds` | boolean | — | Whether auto-incrementing IDs are available |
| `supportsJoin` | boolean | — | Whether the database supports native joins (otherwise Better Auth handles them via multiple queries) |

**Helper parameters passed to the adapter function:**

| Name | Description |
| --- | --- |
| `options` | Better Auth configuration |
| `schema` | User's database schema |
| `debugLog` | Debug logging function |
| `getFieldName` | Transform field names for the database |
| `getModelName` | Transform model names for the database |
| `transformInput` | Process data before saving |
| `transformOutput` | Process data after retrieval |
| `transformWhereClause` | Convert where conditions |

## Notes

- "All `model` values are already transformed into the correct model name for the database"
- "We will automatically fill in any missing fields you return based on the user's `schema` configuration"
- `consumeOne` and `incrementOne` were required for custom database adapters in 1.7.0 through 1.7.2 and are optional again from 1.7.3 (1.7 upgrade guide). Built-in adapters use their native implementations. Make sure your adapter provides atomic conditional writes and accurate affected-row counts; the factory fallbacks check the stored values before writing and reject unsafe snapshots or exhausted retries. The `debugLogs` object accepts the keys `create`, `update`, `updateMany`, `findOne`, `findMany`, `delete`, `deleteMany`, `consumeOne`, `incrementOne`, `count`.
- Fallback counters (when `incrementOne` is not implemented) must be finite numbers, with null or missing values starting at zero. Use native methods for `bigint` counters, OR predicates on structured values, or trigger-generated return values. Fields not updated by the increment fallback reflect the initial read.
- The `select` parameter optimizes queries but doesn't restrict returned data — the framework handles filtering
- This architecture minimizes boilerplate while maintaining flexibility for diverse database systems and custom requirements
