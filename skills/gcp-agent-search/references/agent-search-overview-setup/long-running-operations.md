---
source: https://docs.cloud.google.com/generative-ai-app-builder/docs/long-running-operations
---

# Manage long-running operations

List, get, poll and cancel long-running operations (LRO) in Agent Search (formerly Vertex AI Search; Discovery Engine API). An LRO tracks methods that can take a long time, for example `documents.import`.

## Signature / Usage

### List long-running operations (REST)

Call `operations.list`. `DATA_STORE_ID` is the ID of the data store created with your engine; in the console URL it appears after `engines/` and before `/data`.

```bash
curl -X GET \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    "https://discoveryengine.googleapis.com/v1/projects/PROJECT_ID/locations/global/collections/default_collection/dataStores/DATA_STORE_ID/operations"
```

### List long-running operations (Python)

```python
from typing import Optional

from google.cloud import discoveryengine
from google.longrunning import operations_pb2

# TODO(developer): Uncomment these variables before running the sample.
# project_id = "YOUR_PROJECT_ID"
# location = "YOUR_PROCESSOR_LOCATION"  # Options: "global"
# search_engine_id = "YOUR_SEARCH_ENGINE_ID"

# Create filter in https://google.aip.dev/160 syntax
# operations_filter = "YOUR_FILTER"


def list_operations_sample(
    project_id: str,
    location: str,
    search_engine_id: str,
    operations_filter: Optional[str] = None,
) -> operations_pb2.ListOperationsResponse:
    # Create a client
    client = discoveryengine.DocumentServiceClient()

    # The full resource name of the search engine branch.
    name = f"projects/{project_id}/locations/{location}/collections/default_collection/dataStores/{search_engine_id}"

    # Make ListOperations request
    request = operations_pb2.ListOperationsRequest(
        name=name,
        filter=operations_filter,
    )

    # Make ListOperations request
    response = client.list_operations(request=request)

    # Print the Operation Information
    for operation in response.operations:
        print(operation)

    return response
```

### Get details about an operation (REST)

The operation name comes from the response of the call that started the LRO (for example `documents.import`), or from listing operations. The start of that response looks like this (the twin's sample has a trailing comma, so it is tagged `text`):

```text
{
  "operations": [
    {
      "name": "projects/12345/locations/global/collections/default_collection/dataStores/my-datastore_4321/branches/0/operations/import-documents-56789",
      "metadata": {
        "@type": "type.googleapis.com/google.cloud.discoveryengine.v1.ImportDocumentsMetadata",
      }
    }
  ]
}
```

Call `operations.get` on the resource that created the operation. `OPERATION_NAME` is the operation name without quotes:

```bash
curl -X GET \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    "https://discoveryengine.googleapis.com/v1/OPERATION_NAME"
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

Calls `operations.get` repeatedly with a backoff of 10 seconds between requests; stop the polling job (`Control+Z`) after the status shows `"done": true`. For example, `OPERATION_NAME` is `projects/12345/locations/global/collections/default_collection/dataStores/my-datastore_4321/branches/0/operations/import-documents-56789`.

```bash
while true; \
    do curl -X GET \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    "https://discoveryengine.googleapis.com/v1/OPERATION_NAME"; \
    sleep 10; \
    done
```

### Poll an operation (Python)

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

Adapted (not in the official docs): the HTTP method `post` is written in upper case `POST`, because HTTP methods are case-sensitive and `cancel` is a POST method.

```bash
curl -X POST \
   -H "Authorization: Bearer $(gcloud auth print-access-token)" \
   "https://discoveryengine.googleapis.com/v1/OPERATION_NAME":cancel
```

A successful cancellation returns an empty JSON object. To verify, call `operations.get`; a cancelled operation returns the error `"code": 1` (the `CANCELLED` status code):

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
  - Empty JSON object: Successful cancellation request
  - `operations.get` returns error `"code": 1`: The operation was cancelled (`CANCELLED` status code)
- The record of an operation is kept for approximately 30 days after the operation finishes; you can't view or list an operation after that time.
- Long running operations can't be filtered or paginated in Agent Search: when you call `operations.list` you can't use the `filter`, `pageSize` or `pageToken` fields. The Python list sample still has an `operations_filter` argument (default `None`); the source does not say how it interacts with this restriction.
- The REST list call uses the data store resource (`.../dataStores/DATA_STORE_ID/operations`); the Python samples use `DocumentServiceClient` and Application Default Credentials.
- Corrected from the official docs: the source writes `curl -X post` in the cancel example; changed to `curl -X POST` (the Discovery document `discoveryengine.v1` defines every `operations.cancel` method with `httpMethod` `POST`). The twin's cancel response sample is tagged `bash` and the first sample has a trailing comma after the `@type` value (not valid JSON); the former is tagged `json` here and the latter `text`.
- The source says to stop the polling loop with `Control+Z`; the loop does not exit on its own when `"done": true` appears. Run it only against an operation you started yourself.
- Cancelling an operation (for example an import) stops the job; do it in a disposable project first if unsure.
- The cancel response sample in the source shows a `v1alpha` `ImportDocumentsMetadata` type although the request uses `v1`; kept as written.
- Source: https://docs.cloud.google.com/generative-ai-app-builder/docs/long-running-operations (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-engine-es.md](./create-engine-es.md)
