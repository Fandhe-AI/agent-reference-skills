---
source: https://developers.cloudflare.com/workers/observability/traces/spans-and-attributes/
---

# Spans and attributes

Reference of the spans and attributes captured automatically by Workers tracing (no code changes or SDK required).

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/workers/observability/traces/custom-spans/#tracinggetactivespan (annotating the active span with additional attributes).

```ts
import { tracing } from "cloudflare:workers";

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext) {
		const user = await authenticate(request, env);

		// No custom span is active, so this annotates the root span
		tracing.getActiveSpan()?.setAttributes({
			"user.id": user.id,
			"user.plan": user.plan,
		});

		return tracing.enterSpan("render", async () => {
			// ...
			return new Response("OK");
		});
	},
};
```

## Options / Props

Attributes available on all spans:

| Attribute | Description |
|-----------|-------------|
| `cloud.provider` | Always `cloudflare` |
| `cloud.platform` | Always `cloudflare.workers` |
| `faas.name` | The name of your Worker |
| `faas.invocation_id` | Unique identifier for this Worker invocation |
| `faas.version` | Deployed version tag of your Worker |
| `faas.invoked_region` | Region where the Worker was invoked |
| `service.name` | The name of your Worker |
| `cloudflare.colo` | Three-letter IATA code of the data center that processed the request (e.g. `SFO`, `LHR`) |
| `cloudflare.script_name` | The name of your Worker |
| `cloudflare.script_tags` | Tags associated with your Worker deployment |
| `cloudflare.script_version.id` | Version identifier of your deployed Worker |
| `cloudflare.durable_object.id` | Durable Object instance ID, set on root and child spans for Durable Object invocations |
| `cloudflare.invocation.sequence.number` | Counter on every emitted span and log to order items with identical timestamps |
| `telemetry.sdk.language` | `javascript` |
| `telemetry.sdk.name` | `cloudflare` |

Attributes available on all root spans:

| Attribute | Description |
|-----------|-------------|
| `faas.trigger` | Trigger that invoked the Worker (e.g. `http`, `cron`, `queue`, `email`) |
| `cloudflare.ray_id` | Unique identifier for every request through Cloudflare |
| `cloudflare.handler_type` | Handler type (e.g. `fetch`, `scheduled`, `queue`, `email`, `alarm`) |
| `cloudflare.entrypoint` | Entrypoint invoked (e.g. the name of your Durable Object) |
| `cloudflare.execution_model` | `stateless`, `stateful` for Durable Objects |
| `cloudflare.outcome` | Invocation outcome (e.g. `ok`, `exception`, `exceededCpu`, `exceededMemory`) |
| `cloudflare.cpu_time_ms` | CPU time used, in milliseconds |
| `cloudflare.wall_time_ms` | Wall time used, in milliseconds |

Warning attributes (both set together when a non-fatal error condition occurs while recording a span):

| Attribute | Description |
|-----------|-------------|
| `cloudflare.warning.type` | Closed-set identifier of the warning. Defined value: `span_not_ended` (the span was still open when its parent invocation span closed; it is force-closed and the warning attached). |
| `cloudflare.warning.message` | Free-form, human-readable explanation. |

### Runtime API spans

| Span | Attributes | Description |
|------|------------|-------------|
| `fetch` | `network.protocol.name`, `network.protocol.version`, `url.full`, `url.scheme`, `url.path`, `url.query`, `server.port`, `server.address`, `user_agent.original`, `http.request.method`, `http.request.header.content-type`, `http.request.header.content-length`, `http.request.header.accept`, `http.request.header.accept-encoding`, `http.request.body.size`, `http.response.status_code`, `http.response.body.size` | Runtime API `fetch` call |
| `cache_put` | `cache.request.url`, `cache.request.method`, `cache.request.payload.status_code`, `cache.request.payload.header.cache_control`, `cache.request.payload.header.cache_tag`, `cache.request.payload.header.etag`, `cache.request.payload.header.expires`, `cache.request.payload.header.last_modified`, `cache.request.payload.size`, `cache.response.success` | Cache API `put` |
| `cache_match` | `cache.request.ignore_method`, `cache.request.url`, `cache.request.method`, `cache.request.header.range`, `cache.request.header.if_modified_since`, `cache.request.header.if_none_match`, `cache.response.status_code`, `cache.response.body.size`, `cache.response.cache_status`, `cache.response.success` | Cache API `match` |
| `cache_delete` | `cache.request.ignore_method`, `cache.request.url`, `cache.request.method`, `cache.response.status_code`, `cache.response.success` | Cache API `delete` |

### Handler spans

| Span | Attributes | Description |
|------|------------|-------------|
| Fetch Handler | `cloudflare.verified_bot_category`, `cloudflare.asn`, `cloudflare.response.time_to_first_byte_ms`, `geo.timezone`, `geo.continent.code`, `geo.country.code`, `geo.locality.name`, `geo.locality.region`, `user_agent.original`, `user_agent.os.name`, `user_agent.os.version`, `user_agent.browser.name`, `user_agent.browser.major_version`, `user_agent.browser.version`, `user_agent.engine.name`, `user_agent.engine.version`, `user_agent.device.type`, `user_agent.device.vendor`, `user_agent.device.model`, `http.request.method`, `http.request.header.accept`, `http.request.header.accept-encoding`, `http.request.header.accept-language`, `url.full`, `url.path`, `network.protocol.name` | Fetch handler invocation |
| Scheduled Handler | `faas.cron`, `cloudflare.scheduled_time` | Scheduled handler invocation |
| Queue Handler | `cloudflare.queue.name`, `cloudflare.queue.batch_size` | Queue handler invocation |
| RPC Handler | `jsrpc.method` | RPC handler invocation |
| Email Handler | `cloudflare.email.from`, `cloudflare.email.to`, `cloudflare.email.size` | Email handler invocation |
| Tail Handler | `cloudflare.trace.count` | Tail handler invocation |
| Alarm Handler | `cloudflare.scheduled_time` | Durable Object alarm handler invocation |

### RPC spans

RPC spans are emitted for RPC calls between Workers and from Workers to Durable Objects. Caller and callee spans use the execution color of where they run.

| Span | Attributes | Description |
|------|------------|-------------|
| RPC session | none | Caller-side span for the lifetime of an RPC session; no additional RPC-specific attributes |
| RPC invocation | (shares the RPC call attributes below) | Callee-side span for an RPC invocation in the target Worker or Durable Object |
| RPC call | `jsrpc.method`, `jsrpc.operation`, `jsrpc.target_kind`, `jsrpc.caller_span_id` | Caller- or callee-side span for an individual method call or property access |

RPC call attributes:

| Attribute | Description |
|-----------|-------------|
| `jsrpc.method` | The method name or property path |
| `jsrpc.operation` | The operation type: `call` or `getProperty` |
| `jsrpc.target_kind` | The type of RPC target |
| `jsrpc.caller_span_id` | On callee-side spans, the corresponding caller-side `jsRpcCall` span ID |

### D1 spans

| Span | Attributes | Description |
|------|------------|-------------|
| All D1 spans | `db.system.name`, `db.operation.name`, `db.query.text`, `cloudflare.binding.type`, `cloudflare.d1.response.size_after`, `cloudflare.d1.response.rows_read`, `cloudflare.d1.response.rows_written`, `cloudflare.d1.response.last_row_id`, `cloudflare.d1.response.changed_db`, `cloudflare.d1.response.changes`, `cloudflare.d1.response.served_by_region`, `cloudflare.d1.response.served_by_primary`, `cloudflare.d1.response.sql_duration_ms`, `cloudflare.d1.response.total_attempts` | Attributes available on every D1 span |
| `d1_batch` | `db.operation.batch.size`, `cloudflare.d1.query.bookmark`, `cloudflare.d1.response.bookmark` | D1 `batch` |
| `d1_exec` | none | D1 `exec`; no additional attributes |
| `d1_first` | `cloudflare.d1.query.bookmark`, `cloudflare.d1.response.bookmark` | D1 prepared statement `first` |
| `d1_run` | `cloudflare.d1.query.bookmark`, `cloudflare.d1.response.bookmark` | D1 prepared statement `run` |
| `d1_all` | `cloudflare.d1.query.bookmark`, `cloudflare.d1.response.bookmark` | D1 prepared statement `all` |
| `d1_raw` | `cloudflare.d1.query.bookmark`, `cloudflare.d1.response.bookmark` | D1 prepared statement `raw` |

### Browser Run spans

| Span | Attributes | Description |
|------|------------|-------------|
| `browser_rendering_fetch` | none | Browser Run; no listed attributes |

### Workers KV spans

| Span | Attributes | Description |
|------|------------|-------------|
| All KV spans | `db.system.name`, `db.operation.name`, `cloudflare.binding.name`, `cloudflare.binding.type` | Attributes available on every KV span |
| `kv_get` | `cloudflare.kv.query.keys`, `cloudflare.kv.query.keys.count`, `cloudflare.kv.query.type`, `cloudflare.kv.query.cache_ttl`, `cloudflare.kv.response.size`, `cloudflare.kv.response.returned_rows`, `cloudflare.kv.response.metadata`, `cloudflare.kv.response.cache_status` | KV `get` |
| `kv_getWithMetadata` | `cloudflare.kv.query.keys`, `cloudflare.kv.query.keys.count`, `cloudflare.kv.query.type`, `cloudflare.kv.query.cache_ttl`, `cloudflare.kv.response.size`, `cloudflare.kv.response.returned_rows`, `cloudflare.kv.response.metadata`, `cloudflare.kv.response.cache_status` | KV `getWithMetadata` |
| `kv_put` | `cloudflare.kv.query.keys`, `cloudflare.kv.query.keys.count`, `cloudflare.kv.query.value_type`, `cloudflare.kv.query.expiration`, `cloudflare.kv.query.expiration_ttl`, `cloudflare.kv.query.metadata`, `cloudflare.kv.query.payload.size` | KV `put` |
| `kv_delete` | `cloudflare.kv.query.keys`, `cloudflare.kv.query.keys.colunt` | KV `delete`; `colunt` is spelled that way in the official docs |
| `kv_list` | `cloudflare.kv.query.prefix`, `cloudflare.kv.query.limit`, `cloudflare.kv.query.cursor`, `cloudflare.kv.response.size`, `cloudflare.kv.response.returned_rows`, `cloudflare.kv.response.list_complete`, `cloudflare.kv.response.cursor`, `cloudflare.kv.response.cache_status`, `cloudflare.kv.response.expiration` | KV `list` |

### R2 spans

| Span | Attributes | Description |
|------|------------|-------------|
| All R2 spans | `cloudflare.binding.type`, `cloudflare.binding.name`, `cloudflare.r2.bucket`, `cloudflare.r2.operation`, `cloudflare.r2.response.success`, `cloudflare.r2.error.message`, `cloudflare.r2.error.code` | Attributes available on every R2 span |
| `r2_head` | `cloudflare.r2.request.key`, `cloudflare.r2.response.etag`, `cloudflare.r2.response.size`, `cloudflare.r2.response.uploaded`, `cloudflare.r2.response.checksum.value`, `cloudflare.r2.response.checksum.type`, `cloudflare.r2.response.storage_class`, `cloudflare.r2.response.ssec_key`, `cloudflare.r2.response.content_type`, `cloudflare.r2.response.content_encoding`, `cloudflare.r2.response.content_disposition`, `cloudflare.r2.response.content_language`, `cloudflare.r2.response.cache_control`, `cloudflare.r2.response.cache_expiry`, `cloudflare.r2.response.custom_metadata` | R2 bucket `head` |
| `r2_get` | `cloudflare.r2.request.key`, `cloudflare.r2.request.range.offset`, `cloudflare.r2.request.range.length`, `cloudflare.r2.request.range.suffix`, `cloudflare.r2.request.range`, `cloudflare.r2.request.ssec_key`, `cloudflare.r2.request.only_if.etag_matches`, `cloudflare.r2.request.only_if.etag_does_not_match`, `cloudflare.r2.request.only_if.uploaded_before`, `cloudflare.r2.request.only_if.uploaded_after`, `cloudflare.r2.response.etag`, `cloudflare.r2.response.size`, `cloudflare.r2.response.uploaded`, `cloudflare.r2.response.checksum.value`, `cloudflare.r2.response.checksum.type`, `cloudflare.r2.response.storage_class`, `cloudflare.r2.response.ssec_key`, `cloudflare.r2.response.content_type`, `cloudflare.r2.response.content_encoding`, `cloudflare.r2.response.content_disposition`, `cloudflare.r2.response.content_language`, `cloudflare.r2.response.cache_control`, `cloudflare.r2.response.cache_expiry`, `cloudflare.r2.response.custom_metadata` | R2 bucket `get` |
| `r2_put` | `cloudflare.r2.request.key`, `cloudflare.r2.request.size`, `cloudflare.r2.request.checksum.type`, `cloudflare.r2.request.checksum.value`, `cloudflare.r2.request.custom_metadata`, `cloudflare.r2.request.http_metadata.content_type`, `cloudflare.r2.request.http_metadata.content_encoding`, `cloudflare.r2.request.http_metadata.content_disposition`, `cloudflare.r2.request.http_metadata.content_language`, `cloudflare.r2.request.http_metadata.cache_control`, `cloudflare.r2.request.http_metadata.cache_expiry`, `cloudflare.r2.request.storage_class`, `cloudflare.r2.request.ssec_key`, `cloudflare.r2.request.only_if.etag_matches`, `cloudflare.r2.request.only_if.etag_does_not_match`, `cloudflare.r2.request.only_if.uploaded_before`, `cloudflare.r2.request.only_if.uploaded_after`, `cloudflare.r2.response.etag`, `cloudflare.r2.response.size`, `cloudflare.r2.response.uploaded`, `cloudflare.r2.response.checksum.value`, `cloudflare.r2.response.checksum.type`, `cloudflare.r2.response.storage_class`, `cloudflare.r2.response.ssec_key`, `cloudflare.r2.response.content_type`, `cloudflare.r2.response.content_encoding`, `cloudflare.r2.response.content_disposition`, `cloudflare.r2.response.content_language`, `cloudflare.r2.response.cache_control`, `cloudflare.r2.response.cache_expiry`, `cloudflare.r2.response.custom_metadata` | R2 bucket `put` |
| `r2_list` | `cloudflare.r2.request.limit`, `cloudflare.r2.request.prefix`, `cloudflare.r2.request.cursor`, `cloudflare.r2.request.delimiter`, `cloudflare.r2.request.start_after`, `cloudflare.r2.request.include.http_metadata`, `cloudflare.r2.request.include.custom_metadata`, `cloudflare.r2.response.returned_objects`, `cloudflare.r2.response.delimited_prefixes`, `cloudflare.r2.response.truncated`, `cloudflare.r2.response.cursor` | R2 bucket `list` |
| `r2_delete` | `cloudflare.r2.request.keys` | R2 bucket `delete` |
| `r2_createMultipartUpload` | `cloudflare.r2.request.key`, `cloudflare.r2.request.custom_metadata`, `cloudflare.r2.request.http_metadata.content_type`, `cloudflare.r2.request.http_metadata.content_encoding`, `cloudflare.r2.request.http_metadata.content_disposition`, `cloudflare.r2.request.http_metadata.content_language`, `cloudflare.r2.request.http_metadata.cache_control`, `cloudflare.r2.request.http_metadata.cache_expiry`, `cloudflare.r2.request.storage_class`, `cloudflare.r2.request.ssec_key`, `cloudflare.r2.response.upload_id` | R2 `createMultipartUpload` |
| `r2_uploadPart` | `cloudflare.r2.request.key`, `cloudflare.r2.request.upload_id`, `cloudflare.r2.request.part_number`, `cloudflare.r2.request.ssec_key`, `cloudflare.r2.request.size`, `cloudflare.r2.response.etag` | R2 multipart `uploadPart` |
| `r2_abortMultipartUpload` | `cloudflare.r2.request.key`, `cloudflare.r2.request.upload_id` | R2 multipart `abort` |
| `r2_completeMultipartUpload` | `cloudflare.r2.request.key`, `cloudflare.r2.request.upload_id`, `cloudflare.r2.request.uploaded_parts`, `cloudflare.r2.response.etag`, `cloudflare.r2.response.size`, `cloudflare.r2.response.uploaded`, `cloudflare.r2.response.checksum.value`, `cloudflare.r2.response.checksum.type`, `cloudflare.r2.response.storage_class`, `cloudflare.r2.response.ssec_key`, `cloudflare.r2.response.content_type`, `cloudflare.r2.response.content_encoding`, `cloudflare.r2.response.content_disposition`, `cloudflare.r2.response.content_language`, `cloudflare.r2.response.cache_control`, `cloudflare.r2.response.cache_expiry`, `cloudflare.r2.response.custom_metadata` | R2 multipart `complete` |

### Durable Object spans

| Span | Attributes | Description |
|------|------------|-------------|
| `durable_object_subrequest` | none | Durable Object API; no listed attributes |
| `durable_object_storage_exec` | `db.system.name`, `db.operation.name`, `db.query.text`, `cloudflare.durable_object.query.bindings`, `cloudflare.durable_object.response.rows_read`, `cloudflare.durable_object.response.rows_written` | Storage SQL API `exec` |
| `durable_object_storage_getDatabaseSize` | `db.operation.name`, `cloudflare.durable_object.response.db_size` | Storage SQL API database size |
| `durable_object_storage_kv_get` | `cloudflare.durable_object.kv.query.keys`, `cloudflare.durable_object.kv.query.keys.count` | Storage SQL API KV `get` |
| `durable_object_storage_kv_put` | `cloudflare.durable_object.kv.query.keys`, `cloudflare.durable_object.kv.query.keys.count` | Storage SQL API KV `put` |
| `durable_object_storage_kv_delete` | `cloudflare.durable_object.kv.query.keys`, `cloudflare.durable_object.kv.query.keys.count`, `cloudflare.durable_object.kv.response.deleted_count` | Storage SQL API KV `delete` |
| `durable_object_storage_kv_list` | `cloudflare.durable_object.kv.query.start`, `cloudflare.durable_object.kv.query.startAfter`, `cloudflare.durable_object.kv.query.end`, `cloudflare.durable_object.kv.query.prefix`, `cloudflare.durable_object.kv.query.reverse`, `cloudflare.durable_object.kv.query.limit` | Storage SQL API KV `list` |
| `durable_object_storage_get` | none | Storage KV API (legacy); no listed attributes |
| `durable_object_storage_put` | none | Storage KV API (legacy); no listed attributes |
| `durable_object_storage_delete` | none | Storage KV API (legacy); no listed attributes |
| `durable_object_storage_list` | none | Storage KV API (legacy); no listed attributes |
| `durable_object_storage_deleteAll` | none | Storage KV API (legacy); no listed attributes |
| `durable_object_alarms_getAlarm` | none | Alarms API; no listed attributes |
| `durable_object_alarms_setAlarm` | none | Alarms API; no listed attributes |
| `durable_object_alarms_deleteAlarm` | none | Alarms API; no listed attributes |

### Images, Email, Queues and Rate limiting spans

| Span | Attributes | Description |
|------|------------|-------------|
| `images_output` | `cloudflare.binding.type`, `cloudflare.images.options.format`, `cloudflare.images.options.quality`, `cloudflare.images.options.background`, `cloudflare.images.options.anim`, `cloudflare.images.options.transforms`, `cloudflare.images.error.code` | Images binding `output` |
| `images_info` | `cloudflare.binding.type`, `cloudflare.images.options.encoding`, `cloudflare.images.result.format`, `cloudflare.images.result.file_size`, `cloudflare.images.result.width`, `cloudflare.images.result.height`, `cloudflare.images.error.code` | Images binding `info` |
| `reply_email` | none | Email; no listed attributes |
| `forward_email` | none | Email; no listed attributes |
| `send_email` | none | Email; no listed attributes |
| `queue_send` | none | Queues; no listed attributes |
| `queue_sendBatch` | none | Queues; no listed attributes |
| `ratelimit_run` | none | Rate limiting; no listed attributes |

## Notes

- Span and attribute names may change during the tracing beta (see [traces.md](./traces.md)).
- Docs inconsistency: the official `kv_delete` entry spells `cloudflare.kv.query.keys.colunt`; it is likely a typo of `count`, but kept verbatim.

## Related

- [traces.md](./traces.md)
- [custom-spans.md](./custom-spans.md)
