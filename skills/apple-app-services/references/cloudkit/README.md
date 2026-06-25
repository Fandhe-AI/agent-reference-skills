# CloudKit

| Name | Description | Path |
|------|-------------|------|
| CKContainer | Conduit to the app's CloudKit databases; manages database access and account status | [ckcontainer.md](./ckcontainer.md) |
| CKDatabase | Collection of record zones and subscriptions; primary interface for reading and writing data | [ckdatabase.md](./ckdatabase.md) |
| CKRecord | Dictionary of key-value pairs that stores app data; fundamental unit of all CloudKit transactions | [ckrecord.md](./ckrecord.md) |
| CKRecord.ID | Unique identifier for a record, composed of a name string and a zone ID | [ckrecord-id.md](./ckrecord-id.md) |
| CKRecord.Reference | Many-to-one relationship between records in the same zone; supports cascading deletes | [ckrecord-reference.md](./ckrecord-reference.md) |
| CKQuery | Search criteria (record type + NSPredicate + sort descriptors) for querying a database | [ckquery.md](./ckquery.md) |
| CKQueryOperation | Executes a CKQuery asynchronously; supports cursor-based pagination | [ckqueryoperation.md](./ckqueryoperation.md) |
| CKFetchRecordsOperation | Retrieves one or more records by ID; reports results per-record as they arrive | [ckfetchrecordsoperation.md](./ckfetchrecordsoperation.md) |
| CKModifyRecordsOperation | Saves and/or deletes records in a single batch; supports conflict policies and atomic writes | [ckmodifyrecordsoperation.md](./ckmodifyrecordsoperation.md) |
| CKSubscription | Abstract base for persistent server-side queries that trigger push notifications on changes | [cksubscription.md](./cksubscription.md) |
| CKQuerySubscription | Sends push notifications when records matching a predicate are created, updated, or deleted | [ckquerysubscription.md](./ckquerysubscription.md) |
| CKAsset | External file (image, video, binary blob) attached to a CKRecord | [ckasset.md](./ckasset.md) |
| CKShare | Specialized CKRecord that manages shared record hierarchies and their participants | [ckshare.md](./ckshare.md) |
| CKError | Structured error type for CloudKit failures; provides conflict resolution and retry helpers | [ckerror.md](./ckerror.md) |
| CKRecordZone | Named database partition grouping related records; custom zones support atomic writes and sync | [ckrecordzone.md](./ckrecordzone.md) |
| CKSyncEngine | High-level sync manager for continuous two-way sync of private database records | [cksyncengine.md](./cksyncengine.md) |
