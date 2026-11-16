---
source: https://docs.cloud.google.com/firestore/native/docs/query-data/order-limit-data
---

# Order and limit data

Order query results with `orderBy()` and cap them with `limit()` on the Core operations interface. By default a query returns documents in ascending order by document ID.

## Signature / Usage

First 3 cities alphabetically (Node.js):

```javascript
const firstThreeRes = await citiesRef.orderBy('name').limit(3).get();
```

Python, last items:

```python
cities_ref = db.collection("cities")
query = cities_ref.order_by("name").limit_to_last(2)
results = query.get()
```

Descending order:

```javascript
const lastThreeRes = await citiesRef.orderBy('name', 'desc').limit(3).get();
```

```python
cities_ref = db.collection("cities")
query = cities_ref.order_by("name", direction=firestore.Query.DESCENDING).limit(3)
results = query.stream()
```

Multiple fields (state, then population descending):

```javascript
const byStateByPopRes = await citiesRef.orderBy('state').orderBy('population', 'desc').get();
```

```python
cities_ref = db.collection("cities")
ordered_city_ref = cities_ref.order_by("state").order_by(
    "population", direction=firestore.Query.DESCENDING
)
```

Combine `where()` with `orderBy()` and `limit()`:

```javascript
const biggestRes = await citiesRef.where('population', '>', 2500000)
  .orderBy('population').limit(2).get();
```

```python
cities_ref = db.collection("cities")
query = (
    cities_ref.where(filter=FieldFilter("population", ">", 2500000))
    .order_by("population")
    .limit(2)
)
results = query.stream()
```

## Options / Props

| Rule | Detail |
|------|--------|
| `limit()` value | Must be greater than or equal to zero |
| Default order | Ascending by document ID |
| Range filter + order | With a range comparison (`<`, `<=`, `>`, `>=`), the first ordering must be on the same field |
| Existence | An `orderBy()` clause filters for existence of the field: documents without the field are not returned |
| Inequality | An inequality filter on a field implies ordering by that field (documents without it are not returned) |

## Notes

- Workarounds for the existence effect: run separate queries for each ordering, or assign a value for all fields that you order by.
- The page's text uses Web method names while samples cover many languages. Go uses `OrderBy("name", firestore.Asc).Limit(3)` and `LimitToLast(3)`; Java has `limitToLast(3)`.
- This page covers the Core operations interface. For the Pipeline operations interface in Enterprise edition see the Pipeline `limit` stage: https://docs.cloud.google.com/firestore/native/docs/pipeline/stages/transformation/limit
- The source's Java existence examples contain a syntax error (`or("country", USA")`) and are omitted; the first one (`whereEqualTo("country", "USA").orderBy("population")`) shows that documents without `population` are not returned.
- The source also shows Web, Swift, Objective-C, Kotlin, Android Java, Dart, Java, C++, Go, PHP, Unity, C# and Ruby samples that are omitted. Firebase mobile/web SDK setup is out of scope of this skill.
- Firestore pages: Google Cloud's managed document database, distinct from Supabase Postgres (`supabase`) and Cloudflare KV / D1 (`cloudflare-storage`).
- Source: https://docs.cloud.google.com/firestore/native/docs/query-data/order-limit-data (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-database-server-client-library.md](./create-database-server-client-library.md)
- [emulator.md](./emulator.md)
