---
source: https://docs.expo.dev/versions/v58.0.0/sdk/sqlite/
---

# SQLite

`expo-sqlite` gives your app access to a database that can be queried through a SQLite API. The database is persisted across restarts of the app.

## Signature / Usage

```sh
npx expo install expo-sqlite
```

```js
import * as SQLite from 'expo-sqlite';
```

Basic CRUD operations:

```js
const db = await SQLite.openDatabaseAsync('databaseName');

// `execAsync()` is useful for bulk queries when you want to execute altogether.
// Note that `execAsync()` does not escape parameters and may lead to SQL injection.
await db.execAsync(`
PRAGMA journal_mode = WAL;
CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
INSERT INTO test (value, intValue) VALUES ('test1', 123);
INSERT INTO test (value, intValue) VALUES ('test2', 456);
INSERT INTO test (value, intValue) VALUES ('test3', 789);
`);

// `runAsync()` is useful when you want to execute some write operations.
const result = await db.runAsync('INSERT INTO test (value, intValue) VALUES (?, ?)', 'aaa', 100);
console.log(result.lastInsertRowId, result.changes);
await db.runAsync('UPDATE test SET intValue = ? WHERE value = ?', 999, 'aaa'); // Binding unnamed parameters from variadic arguments
await db.runAsync('UPDATE test SET intValue = ? WHERE value = ?', [999, 'aaa']); // Binding unnamed parameters from array
await db.runAsync('DELETE FROM test WHERE value = $value', { $value: 'aaa' }); // Binding named parameters from object

// `getFirstAsync()` is useful when you want to get a single row from the database.
const firstRow = await db.getFirstAsync('SELECT * FROM test');

// `getAllAsync()` is useful when you want to get all results as an array of objects.
const allRows = await db.getAllAsync('SELECT * FROM test');

// `getEachAsync()` is useful when you want to iterate SQLite query cursor.
for await (const row of db.getEachAsync('SELECT * FROM test')) {
  console.log(row.id, row.value, row.intValue);
}
```

Prepared statements (always finalize, preferably in `try...finally`):

```ts
const statement = await db.prepareAsync(
  'INSERT INTO test (value, intValue) VALUES ($value, $intValue)'
);
try {
  let result = await statement.executeAsync({ $value: 'bbb', $intValue: 101 });
  console.log('bbb and 101:', result.lastInsertRowId, result.changes);
} finally {
  await statement.finalizeAsync();
}
```

Tagged template literals API (`db.sql`, parameters are bound safely):

```ts
interface User {
  id: number;
  name: string;
  age: number;
}

const db = await SQLite.openDatabaseAsync('mydb.db');
const sql = db.sql;

const age = 21;
const users = await sql<User>`SELECT * FROM users WHERE age > ${age}`;
// Type: User[]

// Mutable queries like INSERT/UPDATE/DELETE return SQLiteRunResult metadata
const result =
  (await sql`INSERT INTO users (name, age) VALUES (${'Alice'}, ${30})`) as SQLite.SQLiteRunResult;

// Get first row only
const user = await sql<User>`SELECT * FROM users WHERE id = ${1}`.first();

// Iterate over results
for await (const user of sql<User>`SELECT * FROM users`.each()) {
  console.log(user.name);
}

// Synchronous API
const syncUsers = sql<User>`SELECT * FROM users WHERE age > ${21}`.allSync();
const syncUser = sql<User>`SELECT * FROM users WHERE id = ${1}`.firstSync();
```

Provider and hook:

```tsx
import { View } from 'react-native';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';

export default function App() {
  return (
    <SQLiteProvider databaseName="test.db">
      <Main />
    </SQLiteProvider>
  );
}

export function Main() {
  const db = useSQLiteContext();
  console.log('sqlite version', db.getFirstSync('SELECT sqlite_version()'));
  return <View />;
}
```

With `React.Suspense` (pass `useSuspense`; fragment, `Header`, `Content` and `migrateDbIfNeeded` are app-defined):

```tsx
import { Suspense } from 'react';
import { Text } from 'react-native';
import { SQLiteProvider } from 'expo-sqlite';

<Suspense fallback={<Text>Loading...</Text>}>
  <SQLiteProvider databaseName="test.db" onInit={migrateDbIfNeeded} useSuspense>
    <Header />
    <Content />
  </SQLiteProvider>
</Suspense>
```

Transactions:

```js
const db = await SQLite.openDatabaseAsync('databaseName');

await db.withTransactionAsync(async () => {
  const result = await db.getFirstAsync('SELECT COUNT(*) FROM USERS');
  console.log('Count:', result['COUNT(*)']);
});

await db.withExclusiveTransactionAsync(async (txn) => {
  await txn.execAsync('UPDATE test SET name = "aaa"');
});
```

Import an existing database file:

```tsx
<SQLiteProvider databaseName="test.db" assetSource={{ assetId: require('./assets/test.db') }}>
  <Header />
  <Content />
</SQLiteProvider>
```

Share a database with an App Group on iOS:

```json
{
  "expo": {
    "ios": {
      "bundleIdentifier": "com.myapp",
      "entitlements": {
        "com.apple.security.application-groups": ["group.com.myapp"]
      }
    }
  }
}
```

```tsx
import { SQLiteProvider, defaultDatabaseDirectory } from 'expo-sqlite';
import { Paths } from 'expo-file-system';
import { useMemo } from 'react';
import { Platform, View } from 'react-native';

export default function App() {
  const dbDirectory = useMemo(() => {
    if (Platform.OS === 'ios') {
      return Object.values(Paths.appleSharedContainers)?.[0]?.uri;
      // or `Paths.appleSharedContainers['group.com.myapp']?.uri` to choose specific container
    }
    return defaultDatabaseDirectory;
  }, []);

  return (
    <View style={styles.container}>
      <SQLiteProvider databaseName="test.db" directory={dbDirectory}>
        <Header />
        <Content />
      </SQLiteProvider>
    </View>
  );
}
```

Binary data (`Uint8Array`) and PRAGMA:

```ts
await db.execAsync('PRAGMA journal_mode = WAL');
await db.execAsync('PRAGMA foreign_keys = ON');

const blob = new Uint8Array([0x00, 0x01, 0x02, 0x03, 0x04, 0x05]);
await db.runAsync('INSERT INTO blobs (data) VALUES (?)', blob);
const row = await db.getFirstAsync<{ data: Uint8Array }>('SELECT * FROM blobs');
```

Key-value storage (drop-in for `@react-native-async-storage/async-storage`) and `localStorage`:

```ts
import Storage from 'expo-sqlite/kv-store';

await Storage.setItem('key', JSON.stringify({ entity: 'value' }));
const value = await Storage.getItem('key');

// synchronous APIs
Storage.setItemSync('key', 'value');
const syncValue = Storage.getItemSync('key');
```

```ts
import 'expo-sqlite/localStorage/install';

globalThis.localStorage.setItem('key', 'value');
console.log(globalThis.localStorage.getItem('key')); // 'value'
```

SQLCipher (set `useSQLCipher` in the config plugin, run `npx expo prebuild`, then right after opening the database):

```ts
const db = await SQLite.openDatabaseAsync('databaseName');
await db.execAsync(`PRAGMA key = 'password'`);
```

## Options / Props

Config plugin properties (Android and iOS; `android` / `ios` sub-objects override the shared values):

| Name | Default | Description |
| --- | --- | --- |
| `customBuildFlags` | — | Custom build flags passed to the SQLite build process (for example `"-DSQLITE_ENABLE_DBSTAT_VTAB=1 -DSQLITE_ENABLE_SNAPSHOT=1"`). |
| `enableFTS` | `true` | Enable the FTS3, FTS4 and FTS5 extensions. |
| `useSQLCipher` | `false` | Use the SQLCipher implementations instead of the default SQLite. |
| `withSQLiteVecExtension` | `false` | Include the sqlite-vec extension in `bundledExtensions`. |

```json
{
  "expo": {
    "plugins": [
      [
        "expo-sqlite",
        {
          "enableFTS": true,
          "useSQLCipher": true,
          "android": {
            "enableFTS": false,
            "useSQLCipher": false
          },
          "ios": {
            "customBuildFlags": "-DSQLITE_ENABLE_DBSTAT_VTAB=1 -DSQLITE_ENABLE_SNAPSHOT=1"
          }
        }
      ]
    ]
  }
}
```

Module functions (`SQLite.*`):

| Name | Platforms | Returns | Description |
| --- | --- | --- | --- |
| `openDatabaseAsync(databaseName: string, options?: SQLiteOpenOptions, directory?: string)` | Android, iOS, macOS, tvOS, Web | `Promise<SQLiteDatabase>` | Opens a database. `directory` defaults to `defaultDatabaseDirectory`; not supported on web. |
| `openDatabaseSync(...)` | same | `SQLiteDatabase` | Synchronous variant; may block the JS thread. |
| `deleteDatabaseAsync(databaseName, directory?)` / `deleteDatabaseSync(...)` | same | `Promise<void>` / `void` | Deletes a database file. |
| `deserializeDatabaseAsync(serializedData: Uint8Array, options?)` / `deserializeDatabaseSync(...)` | same | `Promise<SQLiteDatabase>` / `SQLiteDatabase` | Deserializes into a memory database. |
| `backupDatabaseAsync(options: { destDatabase, destDatabaseName, sourceDatabase, sourceDatabaseName })` / `backupDatabaseSync(options)` | same | `Promise<void>` / `void` | Backs up a database to another database. |
| `addDatabaseChangeListener(listener: (event: DatabaseChangeEvent) => void)` | same | `EventSubscription` | Requires `enableChangeListener: true` when opening the database. |
| `configureWeb(options: SQLiteWebOptions)` | Web | `void` | Configures SQLite on web (for example a custom `wasmURL`); call before opening any database; each call replaces the previous options; throws if `wasmURL` changes after a database is opened. No effect on Android, iOS and server rendering. |
| `deepEqual(a, b)` | all | `boolean` | Deep equality of two objects. |

Constants: `SQLite.AsyncStorage` and `SQLite.Storage` (default `SQLiteStorage` instance, drop-in for `AsyncStorage`; `Storage` is an alias), `SQLite.bundledExtensions` (`Record<string, { entryPoint: string, libPath: string } | undefined>`), `SQLite.defaultDatabaseDirectory`, `SQLite.SQLiteProvider`.

`SQLiteProvider` props and `useSQLiteContext(): SQLiteDatabase` (use only within a `SQLiteProvider`):

| Prop | Type | Description |
| --- | --- | --- |
| databaseName | `string` | Name of the database file to open. |
| children | `ReactNode` | Children to render. |
| assetSource (optional) | `SQLiteProviderAssetSource` | Import a bundled database file: `{ assetId: number, forceOverwrite?: boolean }` (`forceOverwrite` default `false`). |
| directory (optional) | `string` | Directory of the database file. Default: `defaultDatabaseDirectory` |
| onInit (optional) | `(db: SQLiteDatabase) => Promise<void>` | Initialization handler run before rendering children (for example migrations). |
| onError (optional) | `(error: Error) => void` | Error handler. Default: rethrow the error. |
| options (optional) | `SQLiteOpenOptions` | Open options. |
| useSuspense (optional) | `boolean` | Enable `React.Suspense` integration. Default: `false` |

`SQLiteDatabase` (all of these are supported on Android, iOS, macOS, tvOS and Web unless noted). Properties (read only): `databasePath: string`, `nativeDatabase`, `options: SQLiteOpenOptions`.

| Method | Returns | Description |
| --- | --- | --- |
| `execAsync(source)` / `execSync(source)` | `Promise<void>` / `void` | Executes all SQL queries in the string. Queries are not escaped. |
| `runAsync(source, params)` / `runSync` | `Promise<SQLiteRunResult>` / `SQLiteRunResult` | Executes a statement; wraps prepare + execute + finalize. |
| `getFirstAsync<T>(source, params)` / `getFirstSync` | `Promise<T \| null>` / `T \| null` | First row. |
| `getAllAsync<T>(source, params)` / `getAllSync` | `Promise<T[]>` / `T[]` | All rows. |
| `getEachAsync<T>(source, params)` / `getEachSync` | `AsyncIterableIterator<T>` / `IterableIterator<T>` | Row-by-row iteration. |
| `prepareAsync(source)` / `prepareSync(source)` | `Promise<SQLiteStatement>` / `SQLiteStatement` | Creates a prepared statement. |
| `sql(strings, ...values)` | `SQLiteTaggedQuery<T>` | Tagged template literals (Bun-style) API using prepared statements. |
| `withTransactionAsync(task: () => Promise<void>)` / `withTransactionSync(task)` | `Promise<void>` / `void` | Transaction with automatic commit/rollback. Not exclusive: other async queries may be included. |
| `withExclusiveTransactionAsync(task: (txn) => Promise<void>)` (not on Web) | `Promise<void>` | Only queries on `txn` run inside the transaction; once it becomes a write transaction other async writes abort with `database is locked`. |
| `isInTransactionAsync()` / `isInTransactionSync()` | `Promise<boolean>` / `boolean` | Whether the database is in a transaction. |
| `serializeAsync(databaseName = 'main')` / `serializeSync` | `Promise<Uint8Array>` / `Uint8Array` | Serializes the database. |
| `createSessionAsync(dbName = 'main')` / `createSessionSync` | `Promise<SQLiteSession>` / `SQLiteSession` | Creates a session (SQLite session extension). |
| `loadExtensionAsync(libPath, entryPoint?)` / `loadExtensionSync` (not on Web) | `Promise<void>` / `void` | Loads a SQLite extension, for example `SQLite.bundledExtensions['sqlite-vec']`. |
| `interruptSync()` (not on Web) | `void` | Interrupts running async operations on this connection; interrupting a write rolls back its explicit transaction; throws if closing is in progress. |
| `closeAsync()` / `closeSync()` | `Promise<void>` / `void` | Closes the database. Interrupt and await pending operations first. |

`SQLiteStatement`: `executeAsync<T>(params): Promise<SQLiteExecuteAsyncResult<T>>`, `executeSync<T>(params): SQLiteExecuteSyncResult<T>`, `finalizeAsync()` / `finalizeSync()`, `getColumnNamesAsync(): Promise<string[]>` / `getColumnNamesSync(): string[]`. Orphaned statements are finalized when the database closes, but finalize them as soon as possible.

Execute results (`SQLiteExecuteAsyncResult` extends `AsyncIterableIterator<T>`; `SQLiteExecuteSyncResult` extends `IterableIterator<T>`): properties `changes: number`, `lastInsertRowId: number`; methods `getAllAsync()` / `getAllSync()`, `getFirstAsync()` / `getFirstSync()` (the cursor must be in its initial state, otherwise call `resetAsync()` / `resetSync()` first).

`SQLiteTaggedQuery<T>` (`PromiseLike`): awaiting returns an array of objects; `first()` / `firstSync()`, `values()` / `valuesSync()` (arrays of values), `each()` / `eachSync()`, `allSync()`.

`SQLiteStorage` (key-value store backed by SQLite; the constructor accepts a `databaseName`): `getItem` / `getItemAsync` / `getItemSync`, `setItem` / `setItemAsync` / `setItemSync` (value may be a string or an update function `SQLiteStorageSetItemUpdateFunction(prevValue: string | null): string`), `removeItem` / `removeItemAsync` / `removeItemSync`, `mergeItem`, `multiGet`, `multiSet`, `multiMerge`, `multiRemove`, `getAllKeys` / `getAllKeysAsync` / `getAllKeysSync`, `getKeyByIndexAsync` / `getKeyByIndexSync`, `getLengthAsync` / `getLengthSync`, `clear` / `clearAsync` / `clearSync`, `close` / `closeAsync` / `closeSync`.

`SQLiteSession`: `attachAsync(table)` / `attachSync`, `enableAsync(enabled)` / `enableSync`, `createChangesetAsync()` / `createChangesetSync`, `createInvertedChangesetAsync()` / `createInvertedChangesetSync`, `applyChangesetAsync(changeset)` / `applyChangesetSync`, `invertChangesetAsync(changeset)` / `invertChangesetSync`, `closeAsync()` / `closeSync`.

Types:

| Type | Definition |
| --- | --- |
| `SQLiteOpenOptions` | `enableChangeListener?: boolean` (default `false`), `useNewConnection?: boolean` (default `false`) |
| `SQLiteRunResult` | `changes: number`, `lastInsertRowId: number` |
| `SQLiteBindValue` | `string \| number \| null \| boolean \| SQLiteBindBlobValue` (`Uint8Array` for blobs) |
| `SQLiteBindParams` | `Record<string, SQLiteBindValue>` (named parameters `:VVV`, `@VVV` or `$VVV`; `$VVV` recommended) |
| `SQLiteVariadicBindParams` | `SQLiteBindValue[]` |
| `DatabaseChangeEvent` | `databaseName` (`main` by default or an `ATTACH DATABASE` name), `databaseFilePath`, `tableName`, `rowId` |
| `SQLiteWebOptions` | `wasmURL?: string` (custom wa-sqlite WebAssembly build from the `expo/wa-sqlite` revision matching the `expo-sqlite` version) |
| `Changeset` | `Uint8Array` |

Common API cheatsheet:

| `SQLiteDatabase` | `SQLiteStatement` | Use case |
| --- | --- | --- |
| `runAsync()` | `executeAsync()` | SQL write operations (`INSERT`, `UPDATE`, `DELETE`). |
| `getFirstAsync()` | `executeAsync()` + `getFirstAsync()` | Single row, e.g. `getFirstAsync('SELECT * FROM Users WHERE id = ?', userId)`. |
| `getAllAsync()` | `executeAsync()` + `getAllAsync()` | Smaller result sets, e.g. queries with a `LIMIT`. |
| `getEachAsync()` | `executeAsync()` + `for-await-of` | Large result sets incrementally (one row at a time), e.g. infinite scrolling. |

## Notes

- Platforms (frontmatter `platforms`): Android, iOS, macOS, tvOS, Web, Included in Expo Go. On Apple TV the database file lives in the caches directory instead of the documents directory.
- Distinct from ORMs: this page is the `expo-sqlite` driver API itself. The drizzle skill covers Drizzle ORM and its expo-sqlite driver connection; this page links Drizzle ORM and Knex.js (`knex-expo-sqlite-dialect`) only as third-party integrations.
- Security: SQL injection is possible when user input is passed to SQLite unescaped. Prepared statements (and the `sql` tagged template API) bind parameters safely; `execAsync()` / `execSync()` do not escape queries.
- Async transactions: with `withTransactionAsync()`, any query that runs while the transaction is active is included in it, even queries written outside the scope function. Use `withExclusiveTransactionAsync()` for strict scoping. Tip: enable WAL journal mode (`PRAGMA journal_mode = WAL`) when creating a new database.
- Web setup: configure Metro to support wasm files and serve `Cross-Origin-Embedder-Policy` and `Cross-Origin-Opener-Policy` headers for `SharedArrayBuffer` (run `npx expo customize metro.config.js` if there is no metro.config.js). On EAS Hosting the headers can be set through the `expo-router` plugin `headers` option (`"Cross-Origin-Embedder-Policy": "credentialless"`, `"Cross-Origin-Opener-Policy": "same-origin"`). The config plugin properties such as `enableFTS` apply only to Android and iOS; web uses a prebuilt WebAssembly build without FTS (build your own from `expo/wa-sqlite` with Emscripten and pass it to `configureWeb({ wasmURL })`).
- `import 'expo-sqlite/localStorage/install'` is a no-op on web and is excluded from the production JS bundle.
- SQLCipher is supported on Android, iOS and macOS, and is not supported in Expo Go.
- Dev tools: `expo-sqlite` includes a DevTools inspector plugin enabled automatically in development (press Shift + M in the Expo CLI terminal and select Open expo-sqlite); the `drizzle-studio-expo` plugin is an alternative.
- The Provider example omits `onInit` and adds import lines relative to the official snippet; the Suspense example is a fragment with imports added.
- The source example calls withExclusiveTransactionAsync without await; await was added because it returns a Promise.
- Source code: https://github.com/expo/expo/tree/sdk-58/packages/expo-sqlite

## Related

- [FileSystem](./filesystem.md)
- [Crypto](./crypto.md)
