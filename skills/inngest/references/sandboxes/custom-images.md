# Custom images

Build an image with Docker, upload the saved archive via the Builds API, wait for it to publish, then start Sandboxes from it with `image.custom()`. Selection (`image.custom()`) and building are separate operations; the SDK helper does not run `docker build`, upload a Dockerfile, or pull from a registry.

## Signature / Usage

Shell setup (same Bash session for all steps):

```sh
set -euo pipefail

API="https://api.inngest.com/v2"
IMAGE_NAME="my-python"
IMAGE_TAG="v1"
ARCHIVE="image.tar"

API_HEADERS=(-H "Authorization: Bearer $INNGEST_SIGNING_KEY")
if [[ -n "${INNGEST_ENV:-}" ]]; then
  API_HEADERS+=(-H "X-Inngest-Env: $INNGEST_ENV")
fi
```

1. Build a Docker image. `app.py`:

```python
from flask import Flask
import os

app = Flask(__name__)

@app.get("/")
def hello():
    return f"hello from {os.environ['APP_ENV']}\n"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
```

`Dockerfile`:

```text
FROM python:3.12-slim
WORKDIR /app
RUN pip install --no-cache-dir flask==3.0.3 requests==2.32.3
COPY app.py .
ENV APP_ENV=custom-image
CMD ["python", "app.py"]
```

```sh
docker build --platform linux/amd64 -t "$IMAGE_NAME:$IMAGE_TAG" .
docker save "$IMAGE_NAME:$IMAGE_TAG" --output "$ARCHIVE"
```

2. Create an upload:

```sh
UPLOAD_SIZE_BYTES=$(wc -c < "$ARCHIVE" | tr -d '[:space:]')
UPLOAD_SHA256=$(shasum -a 256 "$ARCHIVE" | cut -d ' ' -f 1)

jq -n \
  --arg tag "$IMAGE_TAG" \
  --argjson size "$UPLOAD_SIZE_BYTES" \
  --arg sha "$UPLOAD_SHA256" \
  '{tag: $tag, architecture: "amd64", uploadSizeBytes: $size, uploadSha256: $sha}' \
  > build-request.json

curl --fail-with-body --silent --show-error \
  --request POST "$API/builds/$IMAGE_NAME" \
  "${API_HEADERS[@]}" \
  --header "Content-Type: application/json" \
  --data-binary @build-request.json \
  --output build-upload.json

BUILD_ID=$(jq -er '.data.id' build-upload.json)
```

3. Upload the archive and commit:

```sh
UPLOAD_URL=$(jq -er '.uploadUrl' build-upload.json)
UPLOAD_HEADERS=()
while IFS=$'\t' read -r key value; do
  UPLOAD_HEADERS+=(-H "$key: $value")
done < <(jq -r '.uploadHeaders // {} | to_entries[] | [.key, .value] | @tsv' build-upload.json)

curl --fail-with-body --silent --show-error \
  --request PUT "$UPLOAD_URL" \
  "${UPLOAD_HEADERS[@]}" \
  --upload-file "$ARCHIVE"
```

```sh
curl --fail-with-body --silent --show-error \
  --request POST "$API/builds/$IMAGE_NAME/$BUILD_ID/commit" \
  "${API_HEADERS[@]}" \
  --header "Content-Type: application/json" \
  --data '{}' \
  --output build-status.json
```

4. Wait for the image to be ready:

```sh
for attempt in {1..120}; do
  curl --fail-with-body --silent --show-error \
    "$API/builds/$BUILD_ID" \
    "${API_HEADERS[@]}" \
    --output build-status.json

  status=$(jq -er '.data.status' build-status.json)
  case "$status" in
    ready) break ;;
    failed) jq '.data' build-status.json; exit 1 ;;
    pending|uploaded) sleep 5 ;;
    *) printf 'Unexpected build status: %s\n' "$status" >&2; exit 1 ;;
  esac
done

if [[ "$status" != ready ]]; then
  printf 'Stopped waiting; inspect build %s before starting another.\n' "$BUILD_ID" >&2
  exit 1
fi

jq '.data | {name, tag, status, artifactDigest}' build-status.json
```

5. Launch a Sandbox from the image (trusted server-side code):

```ts
import { Inngest } from "inngest";
import { image } from "inngest/experimental";

const inngest = new Inngest({ id: "custom-image-demo", isDev: false });

const sandbox = await inngest.sandboxes.create({
  name: `python-${crypto.randomUUID()}`,
  vcpu: 2,
  memoryMb: 2048,
  from: image.custom("my-python:v1"),
  runningTimeout: "3m",
});

try {
  const result = await sandbox.commands.run([
    "python3",
    "-c",
    "import os, flask, requests; print(os.environ['APP_ENV'])",
  ]);
  console.log(result.stdout); // custom-image
  console.log(sandbox.imageRef, sandbox.imageDigest);
} finally {
  await sandbox.destroy();
}
```

## Options / Props

### Create upload response (HTTP 201)

| Field | Meaning |
|-------|---------|
| `data.id` | Build ID for Commit and Get |
| `data.name`, `data.tag` | Published image name and tag |
| `data.status` | Initially `pending` |
| `uploadUrl` | Signed URL for uploading the archive |
| `uploadHeaders` | Headers to send unchanged with the upload |
| `expiresAt` | Deadline for using the signed upload URL |

### Build routes

| Method | Route | Purpose |
|--------|-------|---------|
| `GET` | `/v2/builds` | List builds in the current workspace |
| `GET` | `/v2/builds/{buildId}` | Inspect a build and its error or artifact digest |
| `POST` | `/v2/builds/{buildId}/cancel` | Cancel unfinished work |

### Limits and errors

- One `linux/amd64` image per archive; `architecture` must be `amd64`.
- Uploads must be between 1 byte and 5 GiB; expanded image data also has a 5 GiB limit.
- Image names are workspace-local (e.g. `my-python`), not an `inngest/` name or registry URL.
- At most ten unfinished builds per workspace; builds use temporary Sandbox capacity and count against account runtime concurrency.
- `400 invalid_field_format` for invalid input; `400 image_upload_invalid` on Commit if the upload is missing or mismatched; `404 image_build_not_found`; `409 image_build_finished` on commit/cancel of a finished build; `429 rate_limited` for too many unfinished builds.

## Notes

- Sandboxes are experimental (imported from `inngest/experimental`; TypeScript SDK 4.25.0+).
- Open beta, Pro plans and above. Requires Docker with `linux/amd64` build support, Bash, `curl`, `jq`, `shasum`, `INNGEST_SIGNING_KEY`, and SDK 4.25 or newer. Include `X-Inngest-Env` when selecting another environment; upload and launch in the same workspace.
- Use `docker save`, not `docker export`. Do not upload a multi-platform image index or a build context. A local Docker tag alone does not publish an image.
- `uploadSha256` is 64 lowercase hex characters without a `sha256:` prefix and is the archive checksum, not the image artifact digest.
- The upload goes directly to storage: do not attach your signing key to the PUT; treat the signed URL as a temporary credential and do not publish `build-upload.json`.
- Commit normally returns HTTP 202 with `data.status: "uploaded"`; it verifies the upload and starts conversion, and does not run your Dockerfile remotely. `uploaded` covers conversion and publication (no separate `building` status). A failed build includes `data.error`. Build logs are not exposed.
- The wait loop is about ten minutes; reaching it does not cancel the build. Keep the build ID and inspect it before starting another upload. Save `artifactDigest` to identify the exact artifact independent of a tag.
- Do not bake credentials into a Dockerfile or image layer; use workspace secrets at launch.
- Inside a function use the same `from` option with `step.sandbox.create("create-python", options)` and stable step IDs. With REST set `"image": "my-python:v1"` on `POST /v2/sandboxes`.
- The image's `ENTRYPOINT` and `CMD` run like `docker run`, with the image's `ENV` and `WORKDIR`. If the command exits (any code), the Sandbox stops and becomes `TERMINATED`; e.g. `alpine` runs `/bin/sh` and stops immediately, so use a long-running command such as `CMD ["tail", "-f", "/dev/null"]`. With neither set, the Sandbox stays `RUNNING` until stopped or destroyed. Commands run as `root`; a Dockerfile `USER` is recorded but not applied yet.
- Cancellation can show as `failed` with a cancellation error and does not remove an already-published image. To change an image, repeat the upload flow with a new tag (e.g. `v2`); existing Sandboxes keep their pinned artifact, so use a new Sandbox name to launch the new version.
- If an API response is lost, inspect existing builds rather than repeatedly creating uploads. A checksum mismatch can reject the storage upload or fail the asynchronous build; inspect both the PUT response and build status.
- Source: https://www.inngest.com/docs-markdown/sandboxes/features/custom-images (retrieved 2026-11-14)

## Related

- [Base images](./base-images.md)
- [Features overview](./features-overview.md)
