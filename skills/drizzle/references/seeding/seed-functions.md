---
source: https://orm.drizzle.team/docs/seed-functions
---

# Generators

Generator functions passed into `seed(db, schema).refine((f) => ({...}))` to control how each column's fake data is produced.

## Signature / Usage

```ts
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  posts: {
    columns: {
      title: funcs.valuesFromArray({
        values: ["Title1", "Title2", "Title3"],
        isUnique: true,
      }),
    },
  },
}));
```

## Options / Props

| Generator | Key params | Description |
| --- | --- | --- |
| `default` | `defaultValue`, `arraySize` | Always returns the same given value |
| `valuesFromArray` | `values` (`any[]` or weighted `{weight, values}[]`), `isUnique`, `arraySize` | Picks values from a given array |
| `intPrimaryKey` | — | Sequential integers starting from 1 |
| `number` | `isUnique`, `precision`, `minValue`, `maxValue`, `arraySize` | Floating point numbers in a range |
| `int` | `isUnique`, `minValue`, `maxValue`, `arraySize` | Integers in a range |
| `boolean` | `arraySize` | `true`/`false` |
| `date` | `minDate`, `maxDate`, `arraySize` | Date within range |
| `time` | `min`, `max`, `arraySize` | 24-hour time |
| `timestamp` | `min`, `max`, `arraySize` | Timestamp |
| `datetime` | `min`, `max`, `arraySize` | Datetime object |
| `year` | `arraySize` | Year in `YYYY` format |
| `json` | `arraySize` | Fixed-structure JSON object |
| `interval` | `isUnique`, `arraySize` | Time interval, e.g. `1 year 12 days 5 minutes` |
| `string` | `isUnique`, `arraySize` | Random string |
| `uuid` | `arraySize` | v4 UUID string |
| `firstName` / `lastName` / `fullName` | `isUnique`, `arraySize` | Person names |
| `email` | `arraySize` | Unique email address |
| `phoneNumber` | `template`, `prefixes`, `generatedDigitsNumbers`, `arraySize` | Phone numbers, via template or prefix list |
| `country` / `city` / `state` / `streetAddress` / `postcode` | `isUnique` (except `state`), `arraySize` | Address components |
| `jobTitle` | `arraySize` | Job title |
| `companyName` | `isUnique`, `arraySize` | Company name |
| `loremIpsum` | `sentencesCount`, `arraySize` | Lorem ipsum text |
| `point` | `isUnique`, `minXValue`/`maxXValue`, `minYValue`/`maxYValue`, `arraySize` | 2D point |
| `line` | `isUnique`, `minAValue..maxCValue`, `arraySize` | 2D line (`a*x + b*y + c = 0`) |
| `bitString` | `isUnique`, `dimensions`, `arraySize` | Bit string, e.g. `'010'` |
| `inet` | `isUnique`, `ipAddress` (`'ipv4' \| 'ipv6'`), `includeCidr`, `arraySize` | IP address |
| `geometry` | `isUnique`, `type` (`'point'`), `srid` (`4326 \| 3857`), `decimalPlaces`, `arraySize` | Geometry object |
| `vector` | `isUnique`, `decimalPlaces`, `dimensions`, `minValue`, `maxValue`, `arraySize` | Numeric vector |
| `weightedRandom` | array of `{ weight, value }` | Probabilistic selection across multiple generator strategies for a single column or `with` relation count |

## Notes

- `arraySize`, when set on any generator, produces one-dimensional arrays of that length instead of a single value.
- `isUnique` defaults to the database column's own uniqueness constraint unless overridden.
- `weightedRandom` can be used both for column value generation and for the `with` relation count (e.g. `{ weight: 0.6, count: [1,2,3] }`).
- `geometry` has a known limitation: `arraySize > 1` on a `geometry(point, srid)[]` column errors, and non-zero `srid` on a `geometry(point)` column errors during seeding (workarounds: use `arraySize: 1`, or `srid: 0`).
- `weightedRandom` itself is documented on `seed-overview` (Weighted Random section), not on this `seed-functions.mdx` page; included here as a table entry for discoverability alongside the other generators.
- Transcribed from root `seed-functions.mdx`.

## Related

- [seed-overview](./seed-overview.md)
- [seed-limitations](./seed-limitations.md)
