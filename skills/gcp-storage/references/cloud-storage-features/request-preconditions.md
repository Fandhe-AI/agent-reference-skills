---
source: https://docs.cloud.google.com/storage/docs/request-preconditions
---

# Request preconditions

Preconditions make a request proceed only if the target bucket or object is in the expected state. They prevent race conditions in mutating requests and mixed metadata/data reads.

## Signature / Usage

### Upload with a generation-match precondition

The example requires a pre-existing object with that name whose generation matches the supplied number.

```bash
gcloud storage cp OBJECT_LOCATION gs://DESTINATION_BUCKET_NAME --if-generation-match=GENERATION
```

`GENERATION` is the generation of the object you are replacing (for example `1122334455667788`), `OBJECT_LOCATION` the local path, `DESTINATION_BUCKET_NAME` the bucket.

JSON API (requires gcloud CLI to generate the access token):

Adapted (not in the official docs): removed a stray double quote after `OBJECT_NAME` in the URL so the URL is a single well-formed quoted string.

```bash
curl -X POST --data-binary @OBJECT_LOCATION \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: OBJECT_CONTENT_TYPE" \
  "https://storage.googleapis.com/upload/storage/v1/b/BUCKET_NAME/o?uploadType=media&name=OBJECT_NAME&ifGenerationMatch=GENERATION"
```

XML API:

```bash
curl -X PUT --data-binary @OBJECT_LOCATION \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: OBJECT_CONTENT_TYPE" \
  -H "x-goog-if-generation-match: GENERATION" \
  "https://storage.googleapis.com/BUCKET_NAME/OBJECT_NAME"
```

### Scenarios

- Multiple request retries: get the object's metadata, then use its generation in a generation-match precondition on the delete request so only that generation can be deleted. Use `x-goog-if-generation-match: 0` / `ifGenerationMatch=0` on the following upload so retries cannot write the object twice. Unintended attempts fail with `412 Precondition Failed`.
- Object metadata association: use the generation returned by the metadata request in a generation-match precondition on the data/metadata-update request (and optionally the metageneration in a metageneration-match precondition).
- Local copy freshness: use the local copy's generation in a generation-not-match precondition on the download; if unchanged the request fails with `304 Not Modified` and nothing is downloaded.

## Options / Props

| JSON API | XML API | Behavior |
|---|---|---|
| `ifGenerationMatch` query parameter | `x-goog-if-generation-match` header | Proceeds if `generation` matches; else `412 Precondition Failed` |
| `ifMetagenerationMatch` query parameter | `x-goog-if-metageneration-match` header | Proceeds if `metageneration` matches; else `412 Precondition Failed` |
| `ifGenerationNotMatch` query parameter | N/A | Proceeds if `generation` does not match; else `304 Not Modified` |
| `ifMetagenerationNotMatch` query parameter | N/A | Proceeds if `metageneration` does not match; else `304 Not Modified` |
| `If-Match` header | `If-Match` header | Data-retrieval requests; proceeds if `ETag` matches; else `412 Precondition Failed` |
| `If-None-Match` header | `If-None-Match` header | Data-retrieval requests; proceeds if `ETag` does not match; else `304 Not Modified` |
| N/A | `If-Modified-Since` header | Proceeds if `Last-Modified` is after the value; else `304 Not Modified` |
| N/A | `If-Unmodified-Since` header | Proceeds if `Last-Modified` is earlier than or equal to the value; else `412 Precondition Failed` |

Composition: generation-match and metageneration-match for the destination object, and generation-match for each source object (a mismatch fails with `412`). Copy/rewrite: standard preconditions for the destination; the JSON API supports generation and metageneration preconditions for the source via `ifSource`-prefixed query parameters; the XML API supports all of its preconditions for the source via `x-goog-copy-source-` prefixed headers.

The value `0` in a generation-match precondition: proceeds only if no object with that name exists, or only noncurrent versions exist; a live version causes `412 Precondition Failed`. Use `0` only when writing object data; no other request can succeed with it.

## Notes

- Multiple preconditions can be combined; if any fails, the whole request fails.
- Buckets have a metageneration but no generation; do not use generation preconditions on bucket requests.
- If you use a metageneration precondition on an object request, always also use a generation precondition.
- In buckets with live and noncurrent versions, requests apply to the live version unless a generation is explicitly included; a general request with preconditions fails if the live version does not match, even if a noncurrent version does.
- Prefer generation/metageneration preconditions over ETags: they track all updates including metadata changes and are consistent across APIs (ETags are not).
- Preconditions cannot be used in XML API multipart uploads (returns `400 NotImplemented`).
- Cost: a precondition often requires an extra metadata request (up to doubling the network portion of latency, plus an operation charge and usually a networking charge). Mitigate by storing generation numbers locally and by knowing which objects are new (use `0`).
- Corrected from the official docs: the JSON API example URL contained `OBJECT_NAME"&ifGenerationMatch=GENERATION"` with a stray quote.
- The source also shows diagrams; they are omitted here.
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Source: https://docs.cloud.google.com/storage/docs/request-preconditions (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [consistency.md](./consistency.md)
- [metadata.md](./metadata.md)
