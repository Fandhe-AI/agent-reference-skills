# Create a DB Adapter

Better Auth のカスタム DB アダプター作成ガイド。

## 概要

Better Auth provides `createAdapterFactory` to simplify custom database adapter development. The function handles schema configurations, ID generation, JSON parsing, key mapping, and joins — allowing developers to focus on database logic.

## 手順

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

**Key Configuration Options:**
- `supportsJSON`: Whether the database handles JSON natively
- `supportsDates`: Whether dates are supported
- `supportsBooleans`: Whether boolean types exist
- `supportsNumericIds`: Whether auto-incrementing IDs are available

### 3. Implement Adapter Methods

The adapter function receives helper utilities and must return methods for database operations.

## Core Adapter Methods

### `create`

"The `create` method is used to create a new record in the database."

```typescript
create: async ({ model, data, select }) => {
  return await db.insert(model).values(data);
}
```

### `update`

"The `update` method is used to update a record in the database."

```typescript
update: async ({ model, where, update }) => {
  return await db.update(model).set(update).where(where);
}
```

### `updateMany`

Updates multiple records; must return the count of updated records.

### `delete`

Removes a single record matching the where clause.

### `deleteMany`

"The `deleteMany` method is used to delete multiple records from the database." Returns the deletion count.

### `findOne`

"The `findOne` method is used to find a single record in the database."

```typescript
findOne: async ({ model, where, select, join }) => {
  return await db.select().from(model).where(where).limit(1);
}
```

### `findMany`

"The `findMany` method is used to find multiple records in the database."

```typescript
findMany: async ({ model, where, limit, sortBy, offset, join }) => {
  return await db.select().from(model).where(where)
    .limit(limit).offset(offset).orderBy(sortBy);
}
```

### `count`

"The `count` method is used to count the number of records in the database."

## Available Helper Parameters

Adapters receive these utilities from the factory:

- `options`: Better Auth configuration
- `schema`: User's database schema
- `debugLog`: Debug logging function
- `getFieldName`: Transform field names for the database
- `getModelName`: Transform model names for the database
- `transformInput`: Process data before saving
- `transformOutput`: Process data after retrieval
- `transformWhereClause`: Convert where conditions

## Advanced Configuration

### Custom Key Mapping

Map keys between Better Auth and your database:

```typescript
mapKeysTransformInput: {
  id: "_id"  // MongoDB example
},
mapKeysTransformOutput: {
  _id: "id"
}
```

### Custom Data Transformation

```typescript
customTransformInput: ({ field, data }) => {
  if (field === "id") return "123";
  return data;
}
```

### Transaction Support

Declare transaction capability:

```typescript
transaction: (callback) => {
  // Execute callback within a transaction
}
```

### Join Support

Set `supportsJoin: true` for native database joins; otherwise Better Auth handles them via multiple queries.

## Testing Your Adapter

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

## Optional Methods

### `createSchema`

Allows the CLI to generate database schemas for your adapter, accepting table definitions and output file path.

### `options`

Return custom configuration passed to your adapter for later use.

## 注意点

- "All `model` values are already transformed into the correct model name for the database"
- "We will automatically fill in any missing fields you return based on the user's `schema` configuration"
- The `select` parameter optimizes queries but doesn't restrict returned data — the framework handles filtering
- This architecture minimizes boilerplate while maintaining flexibility for diverse database systems and custom requirements
