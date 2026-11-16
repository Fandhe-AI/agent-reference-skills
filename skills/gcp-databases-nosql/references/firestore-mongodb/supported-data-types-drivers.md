---
source: https://docs.cloud.google.com/firestore/mongodb-compatibility/docs/supported-data-types-drivers
---

# Supported MongoDB data types and drivers

Supported BSON types, `_id` types, driver versions, third-party tools, and the mapping between BSON types and Firestore values.

## Signature / Usage

### Write BSON types with the Firestore Node.js client

```javascript
const { RegexValue, Decimal128Value, BsonTimestamp } = require('@google-cloud/firestore');

// Setting fields with BSON data types
const res = await db.collection('foo').doc('bar').set({
  regex: new RegexValue('myRegexPattern', 'i'),
  decimal: new Decimal128Value('0.73e-7'),
  bsonTimestamp: new BsonTimestamp(1732754912, 500),
});
```

## Options / Props

### BSON types

Supported: 32-bit Integer, 64-bit Integer, Array, Binary Data, Boolean, Date, Decimal128, Double, MaxKey, MinKey, Null, Object, ObjectId, Regular Expression, String, Timestamp. Not supported: DBPointer, JavaScript, JavaScript (with scope), Symbol, Undefined.

### Document `_id`

Top-level `_id` must be ObjectId, String, 64-bit Integer, 32-bit Integer, Double, Binary, Object, or Boolean. Total `_id` size must not exceed 1500 bytes. Each value within an Object-typed ID must be a supported ID type or an Array of supported ID types. Other BSON types are not supported.

### Drivers

| Language | Driver versions |
| --- | --- |
| Java | 5.x |
| Node.js | 6.x, 5.x |
| Python | 4.x, 3.x (x >= 12) |
| Go | 2.x |
| C# | 3.x |
| Ruby | 2.x (x >= 16) |

OIDC authentication from Google Cloud: Go, C#, Ruby in all supported versions; Java from 4.10, Node.js from 6.7, Python from 4.7.

### Third-party tools

`mongoimport` (see bulk data loading), `mongoexport`, `mongodump`, `mongorestore` (see bulk data loading), `mongosh`, Mongoose, MongoDB Compass.

### BSON to Firestore mapping

| BSON type | Firestore representation |
| --- | --- |
| Double, String, Object, Array, Boolean, Null, 64-bit Integer | Direct equivalents (`double_value`, `string_value`, `map_value`, `array_value`, `boolean_value`, `null_value`, `integer_value`) |
| Binary (subtype 0) | `bytes_value` |
| Date | `timestamp_value`; stored at microsecond precision, anything beyond millisecond is lost converting to BSON |
| 32-bit Integer | map with key `__int__` |
| Binary (non-zero subtype) | map with key `__binary__` (subtype byte prepended to data) |
| ObjectId | map with key `__oid__` (lowercase hex string) |
| Timestamp (internal) | map with key `__request_timestamp__` (`seconds`, `increment`) |
| Regular Expression | map with key `__regex__` (`pattern`, `options`) |
| MinKey / MaxKey | maps with keys `__min__` / `__max__` (null value) |
| Decimal128 | map with key `__decimal128__` (string) |
| Firestore GeoPoint | BSON `{ "__fs_geopoint__": { "latitude": 37.42, "longitude": -122.08 } }` |
| Firestore Vector | BSON `{ "__fs_vector__": [ 1.0, 2.0 ] }` |
| Firestore Document Ref | BSON `{ "__fs_ref__": "projects/.../documents/col/doc" }` |

## Notes

- Field names matching `__.*__` are escaped by adding `r:` in Firestore: BSON `__foo__` becomes `__r:foo__`.
- Some tools need a connection string; `gcloud firestore databases connection-string` returns it (https://docs.cloud.google.com/sdk/gcloud/reference/firestore/databases/connection-string).
- The source also shows Java, Android Java and Go samples for BSON types, and older supported-feature pages (4.0, 3.6).
- Source inconsistency: this page includes Boolean among the allowed top-level `_id` types, while the behavior-differences page lists ObjectId, String, 64-bit integer, 32-bit integer, Double, Binary and Object only. Avoid Boolean `_id` values unless you have verified them against your database.
- Source: https://docs.cloud.google.com/firestore/mongodb-compatibility/docs/supported-data-types-drivers (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [behavior-differences.md](./behavior-differences.md)
- [supported-features-80.md](./supported-features-80.md)
- [connect.md](./connect.md)
