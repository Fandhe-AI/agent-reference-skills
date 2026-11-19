# Storage Write / Read API and CDC

| Name | Description | Path |
|---|---|---|
| Introduction to the Storage Write API | Choosing between gRPC streaming and the REST endpoint | [write-api-intro.md](./write-api-intro.md) |
| Storage Write API (gRPC) | Stream types, permissions, connections, partitioned tables, client libraries | [write-api-grpc.md](./write-api-grpc.md) |
| Storage Write API (REST) | Legacy `tabledata.insertAll` streaming, de-duplication, template tables, troubleshooting | [write-api-rest.md](./write-api-rest.md) |
| Change data capture ingestion | `_CHANGE_TYPE`, `max_staleness`, custom ordering, BACKGROUND reservations, limitations | [change-data-capture.md](./change-data-capture.md) |
| Storage Read API | Read sessions, Avro / Arrow schema mapping, permissions, limitations | [storage.md](./storage.md) |
