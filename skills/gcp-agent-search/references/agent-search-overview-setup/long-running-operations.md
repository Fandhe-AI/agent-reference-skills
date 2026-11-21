---
source: https://docs.cloud.google.com/generative-ai-app-builder/docs/long-running-operations
---

# Manage long-running operations

List, get, poll and cancel long-running operations (LRO) in Agent Search (formerly Vertex AI Search; Discovery Engine API). An LRO tracks methods that can take a long time, for example `documents.import`.

## Signature / Usage

### List long-running operations (REST)

Call `operations.list`. `DATA_STORE_ID` is the ID of the data store created with your engine. Get it from the data store itself: in the console go to **AI Applications** > **Data Stores**, click the name of your data store and read the data store ID on its **Data** page, or take the last segment of the data store resource name (`.../dataStores/DATA_STORE_ID`). The segment after `engines/` in a console URL is the app (engine) ID, not the data store ID.

Adapted (not in the official docs): The access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero. The whole command runs in a subshell that starts with `set +x`, so shell tracing (`set -x`) does not print the token, and `TOKEN` does not stay in your shell.

```bash
( set +x; TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
curl --fail-with-body -X GET \
    -H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
    "https://discoveryengine.googleapis.com/v1/projects/PROJECT_ID/locations/global/collections/default_collection/dataStores/DATA_STORE_ID/operations" )
```

### List long-running operations (Python)

Adapted (not in the official docs): the source sample also takes an `operations_filter` argument, tells you to create the filter in AIP-160 syntax and passes it as `filter=operations_filter` in `ListOperationsRequest`; that argument, its comment lines and the then-unused `from typing import Optional` import are removed, because the same page says `operations.list` in Agent Search can't use the `filter` field. `search_engine_id` / `YOUR_SEARCH_ENGINE_ID` are renamed `data_store_id` / `YOUR_DATA_STORE_ID`, because the value goes in the `dataStores/` segment. The rest of the sample is unchanged.

```python
from google.cloud import discoveryengine
from google.longrunning import operations_pb2

# TODO(developer): Uncomment these variables before running the sample.
# project_id = "YOUR_PROJECT_ID"
# location = "YOUR_PROCESSOR_LOCATION"  # Options: "global"
# data_store_id = "YOUR_DATA_STORE_ID"


def list_operations_sample(
    project_id: str,
    location: str,
    data_store_id: str,
) -> operations_pb2.ListOperationsResponse:
    # Create a client
    client = discoveryengine.DocumentServiceClient()

    # The full resource name of the search engine branch.
    name = f"projects/{project_id}/locations/{location}/collections/default_collection/dataStores/{data_store_id}"

    # Make ListOperations request
    request = operations_pb2.ListOperationsRequest(
        name=name,
    )

    # Make ListOperations request
    response = client.list_operations(request=request)

    # Print the Operation Information
    for operation in response.operations:
        print(operation)

    return response
```

### Get details about an operation (REST)

The operation name comes from the response of the call that started the LRO, or from listing operations. A call such as `documents.import` returns a single operation, and its name is the top-level `name` field (the same shape as the `operations.get` response below). A list response (`operations.list`) holds the names in `operations[].name`, for example:

Adapted (not in the official docs): the trailing comma after the `"@type"` value is removed, because JSON does not allow a comma before a closing brace.

```json
{
  "operations": [
    {
      "name": "projects/12345/locations/global/collections/default_collection/dataStores/my-datastore_4321/branches/0/operations/import-documents-56789",
      "metadata": {
        "@type": "type.googleapis.com/google.cloud.discoveryengine.v1.ImportDocumentsMetadata"
      }
    }
  ]
}
```

Call `operations.get` on the resource that created the operation. `OPERATION_NAME` is the operation name without quotes:

Adapted (not in the official docs): The access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero. The whole command runs in a subshell that starts with `set +x`, so shell tracing (`set -x`) does not print the token, and `TOKEN` does not stay in your shell.

```bash
( set +x; TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
curl --fail-with-body -X GET \
    -H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
    "https://discoveryengine.googleapis.com/v1/OPERATION_NAME" )
```

The first lines of the response look something like this:

```json
{
      "name": "projects/12345/locations/global/collections/default_collection/dataStores/my-datastore_4321/branches/0/operations/import-documents-56789",
      "metadata": {
        "@type": "type.googleapis.com/google.cloud.discoveryengine.v1.ImportDocumentsMetadata"
      }
    }
```

### Get details about an operation (Python)

```python
from google.cloud import discoveryengine
from google.longrunning import operations_pb2

# TODO(developer): Uncomment these variables before running the sample.
# Example: `projects/{project}/locations/{location}/collections/{default_collection}/dataStores/{search_engine_id}/branches/{0}/operations/{operation_id}`
# operation_name = "YOUR_OPERATION_NAME"


def get_operation_sample(operation_name: str) -> operations_pb2.Operation:
    # Create a client
    client = discoveryengine.DocumentServiceClient()

    # Make GetOperation request
    request = operations_pb2.GetOperationRequest(name=operation_name)
    operation = client.get_operation(request=request)

    # Print the Operation Information
    print(operation)

    return operation
```

### Poll an operation (REST)

Calls `operations.get` repeatedly with a backoff of 10 seconds between requests; stop the polling loop with `Ctrl+C` after the status shows `"done": true` (`Ctrl+Z` only suspends the job, which keeps sending requests if it is resumed). For example, `OPERATION_NAME` is `projects/12345/locations/global/collections/default_collection/dataStores/my-datastore_4321/branches/0/operations/import-documents-56789`.

`--fail-with-body` needs curl 7.76.0 or later.

Adapted (not in the official docs): The access token is read into `TOKEN` on each pass (a token that expires during a long poll is refreshed) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. A failed token fetch, or an HTTP error such as 404 or 403 (`curl --fail-with-body`), stops the loop with a message, and `[ "$rc" -eq 0 ]` returns non-zero. The whole command runs in a subshell that starts with `set +x`, so shell tracing (`set -x`) does not print the token, and `TOKEN` does not stay in your shell.

```bash
( set +x; rc=0; while true; \
    do TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] || { rc=1; echo "token fetch failed" >&2; break; }; \
    curl --fail-with-body -X GET \
    -H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
    "https://discoveryengine.googleapis.com/v1/OPERATION_NAME" || { rc=$?; echo "request failed" >&2; break; }; \
    sleep 10; \
    done; [ "$rc" -eq 0 ] )
```

### Poll an operation (Python)

Adapted (not in the official docs): added a check that raises `ValueError` when `limit` is zero or negative; otherwise the loop never runs and `return operation` raises `UnboundLocalError`.

```python
from time import sleep

from google.cloud import discoveryengine
from google.longrunning import operations_pb2

# TODO(developer): Uncomment these variables before running the sample.
# Example: `projects/{project}/locations/{location}/collections/{default_collection}/dataStores/{search_engine_id}/branches/{0}/operations/{operation_id}`
# operation_name = "YOUR_OPERATION_NAME"


def poll_operation_sample(
    operation_name: str, limit: int = 10
) -> operations_pb2.Operation:
    if limit <= 0:
        raise ValueError("limit must be a positive integer")

    # Create a client
    client = discoveryengine.DocumentServiceClient()

    # Make GetOperation request
    request = operations_pb2.GetOperationRequest(name=operation_name)

    for _ in range(limit):
        operation = client.get_operation(request=request)
        # Print the Operation Information
        print(operation)

        # Stop polling when Operation is no longer running
        if operation.done:
            break

        # Wait 10 seconds before polling again
        sleep(10)

    return operation
```

### Cancel an operation (REST)

Call `operations.cancel`. `OPERATION_NAME` is the name of the operation to cancel, for example `projects/12345/locations/global/collections/default_collection/dataStores/my-datastore_4321/branches/0/operations/import-documents-56789`.

Adapted (not in the official docs): the HTTP method `post` is written in upper case `POST`, because HTTP methods are case-sensitive and `cancel` is a POST method. Also, the access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero. The whole command runs in a subshell that starts with `set +x`, so shell tracing (`set -x`) does not print the token, and `TOKEN` does not stay in your shell.

```bash
( set +x; TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
curl --fail-with-body -X POST \
   -H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
   "https://discoveryengine.googleapis.com/v1/OPERATION_NAME":cancel )
```

An empty JSON object means the cancellation request was accepted; cancellation is asynchronous and best-effort, so the operation can still complete. Before you rely on the job having stopped, call `operations.get` and check for `"done": true` with the error `"code": 1` (the `CANCELLED` status code):

```json
{
  "name": "projects/12345/locations/global/collections/default_collection/dataStores/my-datastore_4321/branches/0/operations/import-documents-56789",
  "metadata": {
    "@type": "type.googleapis.com/google.cloud.discoveryengine.v1alpha.ImportDocumentsMetadata",
    "createTime": "2025-04-28T21:29:21.199190Z",
    "updateTime": "2025-04-28T21:31:29.076865Z"
  },
  "done": true,
  "error": {
    "code": 1,
    "message": "Operation projects/12345/locations/global/collections/default_collection/dataStores/my-datastore_4321/branches/0/operations/import-documents-56789 is cancelled."
  }
}
```

### Cancel an operation (Python)

```python
from google.cloud import discoveryengine
from google.longrunning import operations_pb2

# TODO(developer): Uncomment these variables before running the sample.
# Example: `projects/{project}/locations/{location}/collections/{default_collection}/dataStores/{search_engine_id}/branches/{0}/operations/{operation_id}`
# operation_name = "YOUR_OPERATION_NAME"


def cancel_operation_sample(operation_name: str) -> None:
    # Create a client
    client = discoveryengine.DocumentServiceClient()

    # Make CancelOperation request
    request = operations_pb2.CancelOperationRequest(name=operation_name)
    client.cancel_operation(request=request)

    return
```

## Notes

- Cancel results:
  - Error `"code": 400` and `"status": "FAILED_PRECONDITION"`: The request couldn't be canceled
  - Empty JSON object: the cancellation request was accepted (not proof that the job stopped)
  - `operations.get` returns error `"code": 1`: The operation was cancelled (`CANCELLED` status code)
- The record of an operation is kept for approximately 30 days after the operation finishes; you can't view or list an operation after that time.
- Long running operations can't be filtered or paginated in Agent Search: when you call `operations.list` you can't use the `filter`, `pageSize` or `pageToken` fields.
- Corrected from the official docs: the source says "Long running operations can't be filtered or paginated in Agent Search. That is, when you call the `operations.list` method, you can't use the `filter`, `pageSize`, or `pageToken` fields.", yet its own Python list sample contains `# Create filter in https://google.aip.dev/160 syntax`, `# operations_filter = "YOUR_FILTER"`, the parameter `operations_filter: Optional[str] = None,` and `filter=operations_filter,` in `ListOperationsRequest`. The source keeps both; the sample on this page drops the filter argument (and `from typing import Optional`, which only that parameter used) so that it follows the stated restriction.
- Corrected from the official docs: the source says "`DATA_STORE_ID`: The ID of the Agent Search data store that was created with your engine. In the Google Cloud console URL, the data store ID appears after `engines/` and before `/data`." The `engines/` segment names the app, whose ID can differ from its data store's, while the path is `dataStores/DATA_STORE_ID/operations`; the page takes the data store ID from the console's **Data Stores** page, as create-engine-es (see Source) does.
- Corrected from the official docs: the list sample's `search_engine_id` (`# search_engine_id = "YOUR_SEARCH_ENGINE_ID"`) goes in the `dataStores/` segment, so it is renamed `data_store_id`. The other samples' `Example:` comments keep `{search_engine_id}`; pass the data store ID there, not the app ID.
- The REST list call uses the data store resource (`.../dataStores/DATA_STORE_ID/operations`); the Python samples use `DocumentServiceClient` and Application Default Credentials.
- Corrected from the official docs: the source writes `curl -X post` in the cancel example; changed to `curl -X POST` (the Discovery document `discoveryengine.v1` defines every `operations.cancel` method with `httpMethod` `POST`). The source tags the cancel response sample `bash`; it is tagged `json` here (the content is unchanged).
- Corrected from the official docs: the source says "Stop the polling job (`Control+Z`) after the status shows `"done": true`." `Control+Z` only suspends the loop, which does not exit on its own at `"done": true`, so the page says to end it with `Ctrl+C`. Run it only against an operation you started yourself.
- Cancelling an operation (for example an import) asks the job to stop; it can still complete. Do it in a disposable project first if unsure.
- Corrected from the official docs: the source says "A successful cancellation results in an empty JSON object." The `operations.cancel` description in the `discoveryengine.v1` Discovery document says "Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed." and "On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`", so the empty object is treated as an accepted request, confirmed with `operations.get`.
- The cancel response sample in the source shows a `v1alpha` `ImportDocumentsMetadata` type although the request uses `v1`; kept as written.
- Corrected from the official docs: the source's operations-list sample writes `"@type": "type.googleapis.com/google.cloud.discoveryengine.v1.ImportDocumentsMetadata",` with a trailing comma before the closing `}` of `metadata`; JSON does not allow trailing commas, so the comma is removed and the block is tagged `json`.
- Corrected from the official docs: `poll_operation_sample(operation_name, limit=10)` ran `for _ in range(limit):` and then `return operation` without checking `limit`; `limit` must be a positive integer.
- Corrected from the official docs: the source's `-H "Authorization: Bearer $(gcloud auth print-access-token)"` puts the token in curl's process arguments; the examples read it into `TOKEN` and pass it as a header file (`man curl` 8.7.1, `-H`: "This option can take an argument in @filename style" ... "Added in 7.55.0."; `printf` is a shell builtin, `<(...)` needs bash or zsh). `--fail-with-body` (curl 7.76.0 or later) is added so that an HTTP 4xx/5xx response exits non-zero. The command runs in a subshell that starts with `set +x`, so `set -x` tracing does not print the token, and `TOKEN` does not stay in the calling shell.
- Corrected from the official docs: the source introduces the `operations` array above with "if you call `documents.import`, the start of the response looks something like this:". In the `discoveryengine.v1` Discovery document `documents.import` returns `GoogleLongrunningOperation` (one operation with a top-level `name`), and `operations.list` returns `GoogleLongrunningListOperationsResponse`, whose `operations` field is "A list of operations that matches the specified filter in the request.", so the array is labelled as a list response here.
- Source: https://docs.cloud.google.com/generative-ai-app-builder/docs/long-running-operations (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/generative-ai-app-builder/docs/create-engine-es (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-engine-es.md](./create-engine-es.md)
