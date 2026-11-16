---
source: https://docs.cloud.google.com/datastore/docs/concepts/indexes
---

# Indexes

Every Datastore mode query is computed from one or more indexes: built-in single property indexes (automatic) and composite indexes defined in `index.yaml`. Indexes affect storage cost and write latency, and exploding indexes can make commits fail.

## Signature / Usage

### Exclude a property from indexes (Node.js)

```js
const task = [
  {
    name: 'category',
    value: 'Personal',
  },
  {
    name: 'created',
    value: new Date(),
  },
  {
    name: 'done',
    value: false,
  },
  {
    name: 'priority',
    value: 4,
  },
  {
    name: 'percent_complete',
    value: 10.0,
  },
  {
    name: 'description',
    value: 'Learn Cloud Datastore',
    excludeFromIndexes: true,
  },
];
```

### Query on an excluded property (returns nothing)

```sql
# Will not return any results!
SELECT * FROM Task WHERE description = 'A task description.'
```

### Avoid an exploding index

```yaml
indexes:
- kind: Task
  properties:
  - name: tags
  - name: created
- kind: Task
  properties:
  - name: collaborators
  - name: created
```

### Deploy / manage indexes

Adapted (not in the official docs): added the required `--collection-group` and `--field-config` flags; the source's command omits them and gcloud rejects it with "--collection-group must be specified".

```bash
gcloud firestore indexes composite create --api-scope=datastore-mode-api  --query-scope=QUERY_SCOPE --database=DATABASE_ID \
  --collection-group=KIND --field-config=field-path=PROPERTY_1,order=ascending --field-config=field-path=PROPERTY_2,order=descending
```

```bash
gcloud alpha datastore indexes create index.yaml --database=DATABASE_ID
```

Replace `DATABASE_ID` with a database ID and `QUERY_SCOPE` with `collection-recursive` (ancestor indexes) or `collection-group` (non-ancestor indexes). `KIND` is the entity kind (the collection group of the index) and `PROPERTY_1` / `PROPERTY_2` are the indexed properties; repeat `--field-config` once per property (`order` is `ascending` or `descending`).

### Projection query index

```yaml
indexes:
- kind: Task
  properties:
  - name: priority
  - name: percent_complete
  - name: created
```

## Options / Props

| Index type | Built-in | Composite |
|---|---|---|
| Defined by | Automatic (ascending and descending per property) | `index.yaml` (not creatable in the console) |
| Shown in console Indexes page | No | Yes (view only) |
| Needed for | Kindless ancestor/key filters; ancestor + equality; inequality on a single property; ancestor + equality + key inequality; one sort order with no filters | Ancestor + inequality; inequality + equality on other properties; descending key sort; multiple sort orders; filters + sort orders |

## Notes

- A query that cannot be served by built-in or composite indexes fails. The Datastore emulator can generate the needed `index.yaml` entries instead of failing.
- An entity appears in an index only if it has an indexed value for every property in the index. An explicit null value counts as a value.
- Excluding a property removes it from any composite index that uses it. Changing excluded to indexed does not affect existing entities: rewrite them (get, then put) so they enter the index. Changing indexed to excluded only affects entities written afterwards.
- Mixed value types sort by value type first; all integers sort before all floats (`38` before `37.5`).
- Exploding index example: three `tags` and three `collaborators` values need 9 entries; the two manual indexes above need 6. Any `commit` that would exceed the index entry or size limit fails with "Too many indexed properties" or "Index entries too large". A new index that would exceed the limits shows in the `Error` state; fix it by removing it from `index.yaml`, running `datastore indexes cleanup`, reformulating the index or removing the offending entities, re-adding it, and running `datastore indexes create`. `cleanup` deletes indexes; try on a disposable database first.
- Projection queries require all projected properties to be in an index. Projecting the same properties consistently (`priority`, `percent_complete`, `created`) needs one index instead of two. Adding a new property (`created`) to an existing query's projection requires a new index.
- `gcloud app deploy` does not deploy `index.yaml` automatically; list it as an argument or run `gcloud datastore indexes create`. `appcfg.py` / `appcfg.sh` deploy it automatically.
- Corrected from the official docs: the `gcloud firestore` command was `gcloud firestore indexes composite create --api-scope=datastore-mode-api  --query-scope=QUERY_SCOPE --database=DATABASE_ID` (no `--collection-group` / `--field-config`, both required per the gcloud 593.0.0 help text).
- `gcloud firestore` manages a single Datastore mode index; `gcloud datastore` with `index.yaml` manages all indexes of a database.
- The source also shows C#, Go, Java, PHP, Python and Ruby samples; they are omitted here.
- Source: https://docs.cloud.google.com/datastore/docs/concepts/indexes (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [limits.md](./limits.md)
- [errors.md](./errors.md)
- [transactions.md](./transactions.md)
- [multitenancy.md](./multitenancy.md)
