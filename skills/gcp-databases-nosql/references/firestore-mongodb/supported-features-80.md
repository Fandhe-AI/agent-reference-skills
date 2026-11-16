---
source: https://docs.cloud.google.com/firestore/mongodb-compatibility/docs/supported-features-80
---

# Supported features: 8.0

Breakdown of MongoDB 8.0 features supported by Firestore with MongoDB compatibility: query, update and aggregation operators, geospatial, indexes, and database / administrative commands.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/firestore/mongodb-compatibility/docs/indexing (this page has no code); a supported 2dsphere index:

```javascript
db.restaurants.createIndex({"location" : "2dsphere", "region": "2dsphere"})
```

## Options / Props

### Query and projection operators

| Group | Supported | Not supported |
| --- | --- | --- |
| Array | `$all`, `$elemMatch`, `$size` | |
| Bitwise | | `$bitsAllClear`, `$bitsAllSet`, `$bitsAnyClear`, `$bitsAnySet` |
| Comment | | `$comment` |
| Comparison | `$eq`, `$gt`, `$gte`, `$in`, `$lt`, `$lte`, `$ne`, `$nin` | |
| Element | `$exists`, `$type` | |
| Evaluation | `$expr`, `$mod`, `$regex`, `$text` | `$jsonSchema`, `$where` |
| Logical | `$and`, `$nor`, `$not`, `$or` | |
| Projection | `$`, `$elemMatch`, `$slice`, `$meta` (partial: `textScore` only) | |

### Update operators

All supported: array (`$`, `$[]`, `$[<identifier>]`, `$addToSet`, `$pop`, `$pull`, `$pullAll`, `$push`), `$bit`, field (`$currentDate`, `$inc`, `$max`, `$min`, `$mul`, `$rename`, `$set`, `$setOnInsert`, `$unset`), modifiers (`$each`, `$position`, `$slice`, `$sort`).

### Aggregation pipeline

| Group | Supported | Not supported |
| --- | --- | --- |
| Accumulators | `$addToSet`, `$avg`, `$count`, `$first`, `$last`, `$max`, `$mergeObjects`, `$min`, `$push`, `$sum` | `$accumulator`, `$bottom`, `$bottomN`, `$firstN`, `$lastN`, `$maxN`, `$median`, `$minN`, `$percentile`, `$stdDevPop`, `$stdDevSamp`, `$top`, `$topN` |
| Accumulator expressions | `$avg`, `$first`, `$last`, `$max`, `$median`, `$min`, `$percentile`, `$sum` | `$stdDevPop`, `$stdDevSamp` |
| Arithmetic (no `decimal128`) | `$abs`, `$add`, `$ceil`, `$divide`, `$exp`, `$floor`, `$ln`, `$log`, `$log10`, `$mod`, `$multiply`, `$pow`, `$round`, `$sqrt`, `$subtract`, `$trunc` | |
| Array | `$arrayElemAt`, `$arrayToObject`, `$concatArrays`, `$filter`, `$firstN`, `$in`, `$indexOfArray`, `$isArray`, `$lastN`, `$map`, `$maxN`, `$minN`, `$objectToArray`, `$range`, `$reduce`, `$reverseArray`, `$size`, `$slice`, `$sortArray`, `$zip` | |
| Bitwise / Boolean / Comparison | `$bitAnd`, `$bitNot`, `$bitOr`, `$bitXor`; `$and`, `$not`, `$or`; `$cmp`, `$eq`, `$gt`, `$gte`, `$lt`, `$lte`, `$ne` | |
| Conditional / Data size / Literal / Variable | `$cond`, `$ifNull`, `$switch`; `$binarySize`, `$bsonSize`; `$literal`; `$let` | |
| Date | `$dateAdd`, `$dateDiff`, `$dateFromParts`, `$dateFromString`, `$dateSubtract`, `$dateToParts`, `$dateToString`, `$dateTrunc`, `$dayOfMonth`, `$dayOfWeek`, `$dayOfYear`, `$hour`, `$isoDayOfWeek`, `$isoWeek`, `$isoWeekYear`, `$millisecond`, `$minute`, `$month`, `$second`, `$toDate`, `$week`, `$year` | |
| Timestamp | | `$tsIncrement`, `$tsSecond` |
| Miscellaneous | `$getField`, `$natural` (ascending), `$rand` | `$sampleRate`, `$toHashedIndexKey` |
| Object | `$mergeObjects`, `$objectToArray` | `$setField` |
| Set | `$allElementsTrue`, `$anyElementTrue`, `$setDifference`, `$setEquals`, `$setIntersection`, `$setIsSubset`, `$setUnion` | |
| Stages | `$addFields`, `$bucket`, `$collStats`, `$count`, `$documents`, `$facet`, `$group`, `$limit`, `$lookup`, `$match`, `$project`, `$replaceRoot`, `$replaceWith`, `$sample`, `$set`, `$skip`, `$sort`, `$sortByCount`, `$unionWith`, `$unset`, `$unwind` | `$bucketAuto`, `$changeStream`, `$currentOp`, `$geoNear`, `$graphLookup`, `$indexStats`, `$listLocalSessions`, `$listSessions`, `$merge`, `$out`, `$planCacheStats`, `$redact`, `$search`, `$setWindowFields` |
| String | `$concat`, `$dateFromString`, `$dateToString`, `$indexOfBytes`, `$indexOfCP`, `$ltrim`, `$regexFind`, `$regexFindAll`, `$regexMatch`, `$replaceAll`, `$replaceOne`, `$rtrim`, `$split`, `$strcasecmp`, `$strLenBytes`, `$strLenCP`, `$substr`, `$substrBytes`, `$substrCP`, `$toLower`, `$toString`, `$toUpper`, `$trim` | |
| System variables | `$$NOW`, `$$REMOVE`, `$$ROOT` | `$$CLUSTERTIME`, `$$CURRENT`, `$$DESCEND`, `$$KEEP`, `$$PRUNE` |
| Text | `$meta` | |
| Trigonometry | | `$acos`, `$acosh`, `$asin`, `$asinh`, `$atan`, `$atan2`, `$atanh`, `$cos`, `$cosh`, `$degreesToRadians`, `$radiansToDegrees`, `$sin`, `$sinh`, `$tan`, `$tanh` |
| Type | `$convert`, `$isNumber`, `$toBool`, `$toDate`, `$toDecimal`, `$toDouble`, `$toInt`, `$toLong`, `$toObjectId`, `$toString`, `$type` | |

### Geospatial

Supported selector: `$near`. Not supported: `$box`, `$center`, `$centerSphere`, `$geometry`, `$maxDistance`, `$minDistance`, `$polygon`, `$uniqueDocs`, `$geoIntersects`, `$geoWithin`, `$nearSphere`.

### Indexes

| Item | Supported | Not supported |
| --- | --- | --- |
| Index types | 2dsphere, Compound, Multikey, Single Field, Text | 2d, Hashed |
| Properties | Background, Non-Sparse, Sparse, Text, TTL, Unique | Case Insensitive, Hidden, Partial, Wildcard, Vector |

### Database and administrative commands

| Group | Supported | Not supported |
| --- | --- | --- |
| Aggregation | `aggregate`, `count`, `distinct` | `group` (the `$group` stage is supported), `mapReduce` |
| Authentication | | `authenticate`, `getnonce`, `logout` |
| Query / write | `delete`, `find`, `findAndModify`, `getLastError`, `getMore`, `insert`, `update` | `watch` (change streams), `eval`, `getPrevError`, GridFS, `parallelCollectionScan`, `replaceOne` (driver method works via `update`), `resetError` |
| Session | `abortTransaction`, `commitTransaction`, `endSessions`; sessions via the `startSession` driver method | `killAllSessions`, `killAllSessionsByPattern`, `killSessions`, `refreshSessions` |
| Administrative | `create`, `createIndex`, `createIndexes`, `drop`, `dropIndex`, `killCursors`, `listCollections`, `listDatabases`, `listIndexes` | `cloneCollectionAsCapped`, `collMod`, `convertToCapped`, `copydb`, `createView`, `currentOp`, `dropDatabase`, `dropIndexes`, `filemd5`, `getAuditConfig`, `killOp`, `reIndex`, `renameCollection`, `setAuditConfig` |
| Diagnostic | `buildInfo`, `collStats`, `connectionStatus`, `explain`, `hello`, `hostInfo` | `connPoolStats`, `dataSize`, `dbHash`, `dbStats`, `features`, `listCommands`, `profiler`, `serverStatus`, `top`, `whatsmyuri` |
| User / role management | | `createUser`, `dropAllUsersFromDatabase`, `dropUser`, `grantRolesToUser`, `revokeRolesFromUser`, `updateUser`, `usersInfo`, `createRole`, `dropRole`, `dropAllRolesFromDatabase`, `grantPrivilegesToRole`, `grantRolesToRole`, `invalidateUserCache`, `revokePrivilegesFromRole`, `revokeRolesFromRole`, `rolesInfo`, `updateRole` |

## Notes

- To delete a database use the database delete flow (not `dropDatabase`); delete indexes as described in `indexing.md`; manage database access through IAM and SCRAM user credentials (see `connect.md`), not MongoDB user / role commands. Deleting a database is destructive; try it on a disposable database first.
- Source inconsistency: the source's update-operator table also lists `$percentile` among the array update operators, but `$percentile` is an aggregation accumulator / expression, not a MongoDB update operator, so it is left out of the list above. The source also lists `$percentile` as unsupported for the `$group` accumulator but supported as an accumulator expression.
- Pages for MongoDB 7.0, 6.0 and 5.0 exist at the same path pattern (`supported-features-70`, `-60`, `-50`).
- Source inconsistency: the command table marks `dropIndexes` as not supported, while the behavior-differences page lists `dropIndexes` among commands with no unsupported fields. Delete indexes with `dropIndex` (supported; see `indexing.md`).
- Source: https://docs.cloud.google.com/firestore/mongodb-compatibility/docs/supported-features-80 (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/firestore/mongodb-compatibility/docs/indexing (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [behavior-differences.md](./behavior-differences.md)
- [indexing.md](./indexing.md)
- [supported-data-types-drivers.md](./supported-data-types-drivers.md)
