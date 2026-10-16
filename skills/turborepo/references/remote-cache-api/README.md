# remote-cache-api

| Name | Description | Path |
| --- | --- | --- |
| Artifacts endpoints | Endpoints for checking status, storing, retrieving, and querying cache artifacts. All require `Authorization: Bearer <token>`. | [artifacts.md](./artifacts.md) |
| Record cache usage events | `POST /artifacts/events` records cache usage analytics events. The body is an array of cache usage events. | [events.md](./events.md) |
| Remote Cache API | The HTTP interface that any remote cache server must implement to be compatible with Turborepo. Spec: OpenAPI 3.0.3, API version 1.0.0 (MIT). | [overview.md](./overview.md) |
