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

Runtime API spans:

- `fetch`: `network.protocol.name`, `network.protocol.version`, `url.full`, `url.scheme`, `url.path`, `url.query`, `server.port`, `server.address`, `user_agent.original`, `http.request.method`, `http.request.header.content-type`, `http.request.header.content-length`, `http.request.header.accept`, `http.request.header.accept-encoding`, `http.request.body.size`, `http.response.status_code`, `http.response.body.size`
- `cache_put`: `cache.request.url`, `cache.request.method`, `cache.request.payload.status_code`, `cache.request.payload.header.cache_control`, `cache.request.payload.header.cache_tag`, `cache.request.payload.header.etag`, `cache.request.payload.header.expires`, `cache.request.payload.header.last_modified`, `cache.request.payload.size`, `cache.response.success`
- `cache_match`: `cache.request.ignore_method`, `cache.request.url`, `cache.request.method`, `cache.request.header.range`, `cache.request.header.if_modified_since`, `cache.request.header.if_none_match`, `cache.response.status_code`, `cache.response.body.size`, `cache.response.cache_status`, `cache.response.success`
- `cache_delete`: `cache.request.ignore_method`, `cache.request.url`, `cache.request.method`, `cache.response.status_code`, `cache.response.success`

Handler spans:

- Fetch Handler: `cloudflare.verified_bot_category`, `cloudflare.asn`, `cloudflare.response.time_to_first_byte_ms`, `geo.timezone`, `geo.continent.code`, `geo.country.code`, `geo.locality.name`, `geo.locality.region`, `user_agent.original`, `user_agent.os.name`, `user_agent.os.version`, `user_agent.browser.name`, `user_agent.browser.major_version`, `user_agent.browser.version`, `user_agent.engine.name`, `user_agent.engine.version`, `user_agent.device.type`, `user_agent.device.vendor`, `user_agent.device.model`, `http.request.method`, `http.request.header.accept`, `http.request.header.accept-encoding`, `http.request.header.accept-language`, `url.full`, `url.path`, `network.protocol.name`
- Scheduled Handler: `faas.cron`, `cloudflare.scheduled_time`
- Queue Handler: `cloudflare.queue.name`, `cloudflare.queue.batch_size`
- RPC Handler: `jsrpc.method`
- Email Handler: `cloudflare.email.from`, `cloudflare.email.to`, `cloudflare.email.size`
- Tail Handler: `cloudflare.trace.count`
- Alarm Handler: `cloudflare.scheduled_time`

RPC spans (between Workers and from Workers to Durable Objects): RPC session (caller-side span for the session lifetime, no extra attributes), RPC invocation (callee-side span), RPC call (caller- or callee-side span for an individual method call or property access). Caller and callee spans use the execution color of where they run. Attributes: `jsrpc.method` (method name or property path), `jsrpc.operation` (`call` or `getProperty`), `jsrpc.target_kind` (type of RPC target), `jsrpc.caller_span_id` (on callee-side spans, the corresponding caller-side `jsRpcCall` span ID).

D1 spans:

- All D1 spans: `db.system.name`, `db.operation.name`, `db.query.text`, `cloudflare.binding.type`, `cloudflare.d1.response.size_after`, `cloudflare.d1.response.rows_read`, `cloudflare.d1.response.rows_written`, `cloudflare.d1.response.last_row_id`, `cloudflare.d1.response.changed_db`, `cloudflare.d1.response.changes`, `cloudflare.d1.response.served_by_region`, `cloudflare.d1.response.served_by_primary`, `cloudflare.d1.response.sql_duration_ms`, `cloudflare.d1.response.total_attempts`
- `d1_batch`: `db.operation.batch.size`, `cloudflare.d1.query.bookmark`, `cloudflare.d1.response.bookmark`
- `d1_exec`: no additional attributes
- `d1_first`: `cloudflare.d1.query.bookmark`, `cloudflare.d1.response.bookmark`
- `d1_run`: `cloudflare.d1.query.bookmark`, `cloudflare.d1.response.bookmark`
- `d1_all`: `cloudflare.d1.query.bookmark`, `cloudflare.d1.response.bookmark`
- `d1_raw`: `cloudflare.d1.query.bookmark`, `cloudflare.d1.response.bookmark`

Other binding spans:

- `browser_rendering_fetch` (Browser Run): no listed attributes
- KV, all spans: `db.system.name`, `db.operation.name`, `cloudflare.binding.name`, `cloudflare.binding.type`
  - `kv_get`: `cloudflare.kv.query.keys`, `cloudflare.kv.query.keys.count`, `cloudflare.kv.query.type`, `cloudflare.kv.query.cache_ttl`, `cloudflare.kv.response.size`, `cloudflare.kv.response.returned_rows`, `cloudflare.kv.response.metadata`, `cloudflare.kv.response.cache_status`
  - `kv_getWithMetadata`: `cloudflare.kv.query.keys`, `cloudflare.kv.query.keys.count`, `cloudflare.kv.query.type`, `cloudflare.kv.query.cache_ttl`, `cloudflare.kv.response.size`, `cloudflare.kv.response.returned_rows`, `cloudflare.kv.response.metadata`, `cloudflare.kv.response.cache_status`
  - `kv_put`: `cloudflare.kv.query.keys`, `cloudflare.kv.query.keys.count`, `cloudflare.kv.query.value_type`, `cloudflare.kv.query.expiration`, `cloudflare.kv.query.expiration_ttl`, `cloudflare.kv.query.metadata`, `cloudflare.kv.query.payload.size`
  - `kv_delete`: `cloudflare.kv.query.keys`, `cloudflare.kv.query.keys.colunt` (spelled `colunt` in the official docs)
  - `kv_list`: `cloudflare.kv.query.prefix`, `cloudflare.kv.query.limit`, `cloudflare.kv.query.cursor`, `cloudflare.kv.response.size`, `cloudflare.kv.response.returned_rows`, `cloudflare.kv.response.list_complete`, `cloudflare.kv.response.cursor`, `cloudflare.kv.response.cache_status`, `cloudflare.kv.response.expiration`
- R2, all spans: `cloudflare.binding.type`, `cloudflare.binding.name`, `cloudflare.r2.bucket`, `cloudflare.r2.operation`, `cloudflare.r2.response.success`, `cloudflare.r2.error.message`, `cloudflare.r2.error.code`
  - `r2_head`:
    - `cloudflare.r2.request.key`
    - `cloudflare.r2.response.etag`
    - `cloudflare.r2.response.size`
    - `cloudflare.r2.response.uploaded`
    - `cloudflare.r2.response.checksum.value`
    - `cloudflare.r2.response.checksum.type`
    - `cloudflare.r2.response.storage_class`
    - `cloudflare.r2.response.ssec_key`
    - `cloudflare.r2.response.content_type`
    - `cloudflare.r2.response.content_encoding`
    - `cloudflare.r2.response.content_disposition`
    - `cloudflare.r2.response.content_language`
    - `cloudflare.r2.response.cache_control`
    - `cloudflare.r2.response.cache_expiry`
    - `cloudflare.r2.response.custom_metadata`
  - `r2_get`:
    - `cloudflare.r2.request.key`
    - `cloudflare.r2.request.range.offset`
    - `cloudflare.r2.request.range.length`
    - `cloudflare.r2.request.range.suffix`
    - `cloudflare.r2.request.range`
    - `cloudflare.r2.request.ssec_key`
    - `cloudflare.r2.request.only_if.etag_matches`
    - `cloudflare.r2.request.only_if.etag_does_not_match`
    - `cloudflare.r2.request.only_if.uploaded_before`
    - `cloudflare.r2.request.only_if.uploaded_after`
    - `cloudflare.r2.response.etag`
    - `cloudflare.r2.response.size`
    - `cloudflare.r2.response.uploaded`
    - `cloudflare.r2.response.checksum.value`
    - `cloudflare.r2.response.checksum.type`
    - `cloudflare.r2.response.storage_class`
    - `cloudflare.r2.response.ssec_key`
    - `cloudflare.r2.response.content_type`
    - `cloudflare.r2.response.content_encoding`
    - `cloudflare.r2.response.content_disposition`
    - `cloudflare.r2.response.content_language`
    - `cloudflare.r2.response.cache_control`
    - `cloudflare.r2.response.cache_expiry`
    - `cloudflare.r2.response.custom_metadata`
  - `r2_put`:
    - `cloudflare.r2.request.key`
    - `cloudflare.r2.request.size`
    - `cloudflare.r2.request.checksum.type`
    - `cloudflare.r2.request.checksum.value`
    - `cloudflare.r2.request.custom_metadata`
    - `cloudflare.r2.request.http_metadata.content_type`
    - `cloudflare.r2.request.http_metadata.content_encoding`
    - `cloudflare.r2.request.http_metadata.content_disposition`
    - `cloudflare.r2.request.http_metadata.content_language`
    - `cloudflare.r2.request.http_metadata.cache_control`
    - `cloudflare.r2.request.http_metadata.cache_expiry`
    - `cloudflare.r2.request.storage_class`
    - `cloudflare.r2.request.ssec_key`
    - `cloudflare.r2.request.only_if.etag_matches`
    - `cloudflare.r2.request.only_if.etag_does_not_match`
    - `cloudflare.r2.request.only_if.uploaded_before`
    - `cloudflare.r2.request.only_if.uploaded_after`
    - `cloudflare.r2.response.etag`
    - `cloudflare.r2.response.size`
    - `cloudflare.r2.response.uploaded`
    - `cloudflare.r2.response.checksum.value`
    - `cloudflare.r2.response.checksum.type`
    - `cloudflare.r2.response.storage_class`
    - `cloudflare.r2.response.ssec_key`
    - `cloudflare.r2.response.content_type`
    - `cloudflare.r2.response.content_encoding`
    - `cloudflare.r2.response.content_disposition`
    - `cloudflare.r2.response.content_language`
    - `cloudflare.r2.response.cache_control`
    - `cloudflare.r2.response.cache_expiry`
    - `cloudflare.r2.response.custom_metadata`
  - `r2_list`:
    - `cloudflare.r2.request.limit`
    - `cloudflare.r2.request.prefix`
    - `cloudflare.r2.request.cursor`
    - `cloudflare.r2.request.delimiter`
    - `cloudflare.r2.request.start_after`
    - `cloudflare.r2.request.include.http_metadata`
    - `cloudflare.r2.request.include.custom_metadata`
    - `cloudflare.r2.response.returned_objects`
    - `cloudflare.r2.response.delimited_prefixes`
    - `cloudflare.r2.response.truncated`
    - `cloudflare.r2.response.cursor`
  - `r2_delete`: `cloudflare.r2.request.keys`
  - `r2_createMultipartUpload`:
    - `cloudflare.r2.request.key`
    - `cloudflare.r2.request.custom_metadata`
    - `cloudflare.r2.request.http_metadata.content_type`
    - `cloudflare.r2.request.http_metadata.content_encoding`
    - `cloudflare.r2.request.http_metadata.content_disposition`
    - `cloudflare.r2.request.http_metadata.content_language`
    - `cloudflare.r2.request.http_metadata.cache_control`
    - `cloudflare.r2.request.http_metadata.cache_expiry`
    - `cloudflare.r2.request.storage_class`
    - `cloudflare.r2.request.ssec_key`
    - `cloudflare.r2.response.upload_id`
  - `r2_uploadPart`:
    - `cloudflare.r2.request.key`
    - `cloudflare.r2.request.upload_id`
    - `cloudflare.r2.request.part_number`
    - `cloudflare.r2.request.ssec_key`
    - `cloudflare.r2.request.size`
    - `cloudflare.r2.response.etag`
  - `r2_abortMultipartUpload`: `cloudflare.r2.request.key`, `cloudflare.r2.request.upload_id`
  - `r2_completeMultipartUpload`:
    - `cloudflare.r2.request.key`
    - `cloudflare.r2.request.upload_id`
    - `cloudflare.r2.request.uploaded_parts`
    - `cloudflare.r2.response.etag`
    - `cloudflare.r2.response.size`
    - `cloudflare.r2.response.uploaded`
    - `cloudflare.r2.response.checksum.value`
    - `cloudflare.r2.response.checksum.type`
    - `cloudflare.r2.response.storage_class`
    - `cloudflare.r2.response.ssec_key`
    - `cloudflare.r2.response.content_type`
    - `cloudflare.r2.response.content_encoding`
    - `cloudflare.r2.response.content_disposition`
    - `cloudflare.r2.response.content_language`
    - `cloudflare.r2.response.cache_control`
    - `cloudflare.r2.response.cache_expiry`
    - `cloudflare.r2.response.custom_metadata`
- Durable Object API: `durable_object_subrequest` (no listed attributes)
- Durable Object Storage SQL API:
  - `durable_object_storage_exec`: `db.system.name`, `db.operation.name`, `db.query.text`, `cloudflare.durable_object.query.bindings`, `cloudflare.durable_object.response.rows_read`, `cloudflare.durable_object.response.rows_written`
  - `durable_object_storage_getDatabaseSize`: `db.operation.name`, `cloudflare.durable_object.response.db_size`
  - `durable_object_storage_kv_get`: `cloudflare.durable_object.kv.query.keys`, `cloudflare.durable_object.kv.query.keys.count`
  - `durable_object_storage_kv_put`: `cloudflare.durable_object.kv.query.keys`, `cloudflare.durable_object.kv.query.keys.count`
  - `durable_object_storage_kv_delete`: `cloudflare.durable_object.kv.query.keys`, `cloudflare.durable_object.kv.query.keys.count`, `cloudflare.durable_object.kv.response.deleted_count`
  - `durable_object_storage_kv_list`: `cloudflare.durable_object.kv.query.start`, `cloudflare.durable_object.kv.query.startAfter`, `cloudflare.durable_object.kv.query.end`, `cloudflare.durable_object.kv.query.prefix`, `cloudflare.durable_object.kv.query.reverse`, `cloudflare.durable_object.kv.query.limit`
- Durable Object Storage KV API (legacy), no listed attributes: `durable_object_storage_get`, `durable_object_storage_put`, `durable_object_storage_delete`, `durable_object_storage_list`, `durable_object_storage_deleteAll`
- Durable Object alarms, no listed attributes: `durable_object_alarms_getAlarm`, `durable_object_alarms_setAlarm`, `durable_object_alarms_deleteAlarm`
- Images `images_output`: `cloudflare.binding.type`, `cloudflare.images.options.format`, `cloudflare.images.options.quality`, `cloudflare.images.options.background`, `cloudflare.images.options.anim`, `cloudflare.images.options.transforms`, `cloudflare.images.error.code`
- Images `images_info`: `cloudflare.binding.type`, `cloudflare.images.options.encoding`, `cloudflare.images.result.format`, `cloudflare.images.result.file_size`, `cloudflare.images.result.width`, `cloudflare.images.result.height`, `cloudflare.images.error.code`
- Email, no listed attributes: `reply_email`, `forward_email`, `send_email`
- Queues, no listed attributes: `queue_send`, `queue_sendBatch`
- Rate limiting, no listed attributes: `ratelimit_run`

## Notes

- Span and attribute names may change during the tracing beta (see [traces.md](./traces.md)).
- Docs inconsistency: the official `kv_delete` entry spells `cloudflare.kv.query.keys.colunt`; it is likely a typo of `count`, but kept verbatim.

## Related

- [traces.md](./traces.md)
- [custom-spans.md](./custom-spans.md)
