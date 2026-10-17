---
source: https://ai.google.dev/api/all-methods
---

# All methods

Index of every REST resource and method of the Gemini API service `generativelanguage.googleapis.com`.

## Signature / Usage

```text
Service endpoint: https://generativelanguage.googleapis.com
(all URIs below are relative to this service endpoint)
```

## Options / Props

REST resources listed in the page index:

| Resource |
|------|
| `v1beta.auth_tokens`, `v1beta.batches`, `v1beta.cachedContents`, `v1beta.corpora`, `v1beta.corpora.operations`, `v1beta.corpora.permissions`, `v1beta.dynamic` |
| `v1beta.environments`, `v1beta.environments.files.media` |
| `v1beta.fileSearchStores`, `v1beta.fileSearchStores.documents`, `v1beta.fileSearchStores.operations`, `v1beta.fileSearchStores.upload.operations` |
| `v1beta.files`, `v1beta.generatedFiles`, `v1beta.generatedFiles.operations`, `v1beta.media` |
| `v1beta.models`, `v1beta.models.operations`, `v1beta.tunedModels`, `v1beta.tunedModels.operations`, `v1beta.tunedModels.permissions` |

Methods (as tabulated in the source):

| Resource | Method | HTTP | Description |
|------|------|------|-------------|
| auth_tokens | create | `POST /v1beta/auth_tokens` | Creates a token that can be used to constrain the behavior of a BidiGenerateContent session. |
| batches | cancel | `POST /v1beta/{name=batches/*}:cancel` | Starts asynchronous cancellation on a long-running operation. |
| batches | delete | `DELETE /v1beta/{name=batches/*}` | Deletes a long-running operation. |
| batches | get | `GET /v1beta/{name=batches/*}` | Gets the latest state of a long-running operation. |
| batches | list | `GET /v1beta/{name=batches}` | Lists operations that match the specified filter in the request. |
| batches | updateEmbedContentBatch | `PATCH /v1beta/{embedContentBatch.name=batches/*}:updateEmbedContentBatch` | Updates a batch of EmbedContent requests for batch processing. |
| batches | updateGenerateContentBatch | `PATCH /v1beta/{generateContentBatch.name=batches/*}:updateGenerateContentBatch` | Updates a batch of GenerateContent requests for batch processing. |
| cachedContents | create | `POST /v1beta/cachedContents` | Creates CachedContent resource. |
| cachedContents | delete | `DELETE /v1beta/{name=cachedContents/*}` | Deletes CachedContent resource. |
| cachedContents | get | `GET /v1beta/{name=cachedContents/*}` | Reads CachedContent resource. |
| cachedContents | list | `GET /v1beta/cachedContents` | Lists CachedContents. |
| cachedContents | patch | `PATCH /v1beta/{cachedContent.name=cachedContents/*}` | Updates CachedContent resource (only expiration is updatable). |
| fileSearchStores | create | `POST /v1beta/fileSearchStores` | Creates an empty `FileSearchStore`. |
| fileSearchStores | delete | `DELETE /v1beta/{name=fileSearchStores/*}` | Deletes a `FileSearchStore`. |
| fileSearchStores | get | `GET /v1beta/{name=fileSearchStores/*}` | Gets information about a specific `FileSearchStore`. |
| fileSearchStores | importFile | `POST /v1beta/{fileSearchStoreName=fileSearchStores/*}:importFile` | Imports a `File` from File Service to a `FileSearchStore`. |
| fileSearchStores | list | `GET /v1beta/fileSearchStores` | Lists all `FileSearchStores` owned by the user. |
| fileSearchStores.documents | delete | `DELETE /v1beta/{name=fileSearchStores/*/documents/*}` | Deletes a `Document`. |
| fileSearchStores.documents | get | `GET /v1beta/{name=fileSearchStores/*/documents/*}` | Gets information about a specific `Document`. |
| fileSearchStores.documents | list | `GET /v1beta/{parent=fileSearchStores/*}/documents` | Lists all `Document`s in a `Corpus`. |
| fileSearchStores.operations | get | `GET /v1beta/{name=fileSearchStores/*/operations/*}` | Gets the latest state of a long-running operation. |
| fileSearchStores.upload.operations | get | `GET /v1beta/{name=fileSearchStores/*/upload/operations/*}` | Gets the latest state of a long-running operation. |
| files | delete | `DELETE /v1beta/{name=files/*}` | Deletes the `File`. |
| files | get | `GET /v1beta/{name=files/*}` | Gets the metadata for the given `File`. |
| files | list | `GET /v1beta/files` | Lists the metadata for `File`s owned by the requesting project. |
| files | register | `POST /v1beta/files:register` | Registers a Google Cloud Storage files with FileService. |
| media | download | `GET /v1beta/{parent=environments/*}/files` | Retrieves file metadata or directory contents from an environment's snapshot. |
| media | upload | `POST /v1beta/files`, `POST /upload/v1beta/files` | Creates a `File`. |
| media | uploadToFileSearchStore | `POST /v1beta/{fileSearchStoreName=fileSearchStores/*}:uploadToFileSearchStore`, `POST /upload/v1beta/{fileSearchStoreName=fileSearchStores/*}:uploadToFileSearchStore` | Uploads data to a FileSearchStore, preprocesses and chunks before storing it in a FileSearchStore Document. |
| models | asyncBatchEmbedContent | `POST /v1beta/{batch.model=models/*}:asyncBatchEmbedContent` | Enqueues a batch of `EmbedContent` requests for batch processing. |
| models | batchEmbedContents | `POST /v1beta/{model=models/*}:batchEmbedContents` | Generates multiple embedding vectors from the input `Content` which consists of a batch of strings represented as `EmbedContentRequest` objects. |
| models | batchGenerateContent | `POST /v1beta/{batch.model=models/*}:batchGenerateContent` | Enqueues a batch of `GenerateContent` requests for batch processing. |
| models | countTokens | `POST /v1beta/{model=models/*}:countTokens` | Runs a model's tokenizer on input `Content` and returns the token count. |
| models | embedContent | `POST /v1beta/{model=models/*}:embedContent` | Generates a text embedding vector from the input `Content` using the specified Gemini Embedding model. |
| models | generateContent | `POST /v1beta/{model=models/*}:generateContent` | Generates a model response given an input `GenerateContentRequest`. |
| models | get | `GET /v1beta/{name=models/*}` | Gets information about a specific `Model` such as its version number, token limits, parameters and other metadata. |
| models | list | `GET /v1beta/models` | Lists the `Model`s available through the Gemini API. |
| models | predict | `POST /v1beta/{model=models/*}:predict` | Performs a prediction request. |
| models | predictLongRunning | `POST /v1beta/{model=models/*}:predictLongRunning` | Same as Predict but returns an LRO. |
| models | streamGenerateContent | `POST /v1beta/{model=models/*}:streamGenerateContent` | Generates a streamed response from the model given an input `GenerateContentRequest`. |
| interactions | CreateCredential | `POST /v1beta/credentials` | Creates a credential. |
| interactions | CreateInteraction | `POST /v1beta/interactions` | Creates a new interaction. |
| interactions | cancelInteractionById | `POST /v1beta/interactions/{id}/cancel` | Cancels an interaction by id. |
| interactions | ListCredentials | `GET /v1beta/credentials` | Lists credentials for a project. |
| interactions | GetCredential | `GET /v1beta/credentials/{id}` | Gets metadata of a single credential (no secret fields). |
| interactions | getInteractionById | `GET /v1beta/interactions/{id}` | Retrieves the full details of a single interaction based on its `Interaction.id`. |
| interactions | UpdateCredential | `PATCH /v1beta/credentials/{id}` | Updates a credential. |
| interactions | DeleteCredential | `DELETE /v1beta/credentials/{id}` | Deletes a credential. |
| interactions | deleteInteraction | `DELETE /v1beta/interactions/{id}` | Deletes the interaction by id. |
| agents | CreateAgent | `POST /v1beta/agents` | Creates a new Agent (Typed version for SDK). |
| agents | ListAgents | `GET /v1beta/agents` | Lists all Agents. |
| agents | GetAgent | `GET /v1beta/agents/{id}` | Gets a specific Agent. |
| agents | DeleteAgent | `DELETE /v1beta/agents/{id}` | Deletes an Agent. |
| webhooks | CreateWebhook | `POST /v1beta/webhooks` | Creates a new Webhook. |
| webhooks | PingWebhook | `POST /v1beta/webhooks/{id}:ping` | Sends a ping event to a Webhook. |
| webhooks | RotateSigningSecret | `POST /v1beta/webhooks/{id}:rotateSigningSecret` | Generates a new signing secret for a Webhook. |
| webhooks | ListWebhooks | `GET /v1beta/webhooks` | Lists all Webhooks. |
| webhooks | GetWebhook | `GET /v1beta/webhooks/{id}` | Gets a specific Webhook. |
| webhooks | UpdateWebhook | `PATCH /v1beta/webhooks/{id}` | Updates an existing Webhook. |
| webhooks | DeleteWebhook | `DELETE /v1beta/webhooks/{id}` | Deletes a Webhook. |
| triggers | CreateTrigger | `POST /v1beta/triggers` | Creates a new trigger that will invoke the specified agent on the given cron schedule. |
| triggers | RunTrigger | `POST /v1beta/triggers/{trigger_id}/executions` | Runs a trigger immediately. |
| triggers | ListTriggers | `GET /v1beta/triggers` | Lists triggers for a project. |
| triggers | GetTrigger | `GET /v1beta/triggers/{id}` | Gets details of a single trigger. |
| triggers | ListTriggerExecutions | `GET /v1beta/triggers/{trigger_id}/executions` | Lists executions for a trigger. |
| triggers | UpdateTrigger | `PATCH /v1beta/triggers/{id}` | Updates a trigger. |
| triggers | DeleteTrigger | `DELETE /v1beta/triggers/{id}` | Deletes a trigger. |
| environments | CreateEnvironment | `POST /v1beta/environments` | Creates an environment. |
| environments | ListEnvironments | `GET /v1beta/environments` | Lists environments. |
| environments | GetEnvironmentFiles | `GET /v1beta/environments/{environment}/files/{path}` | Retrieves file metadata or directory contents from an environment's snapshot. |
| environments | GetEnvironment | `GET /v1beta/environments/{id}` | Gets an environment. |
| environments | StartEnvironmentFileUpload | `PUT /upload/v1beta/environments/{environment}/files/{path}` | Starts a resumable upload session for a file in an environment workspace. |
| environments | DeleteEnvironment | `DELETE /v1beta/environments/{id}` | Deletes an environment. |

## Notes

- All paths on this page are `v1beta`; v1 surfaces (Interactions API v1 and the v1 routes in the api-versions table) are not tabulated here. Source page lists `corpora`, `generatedFiles`, `tunedModels`, `dynamic` and their `operations` / `permissions` resources in its index but tabulates no methods for them in the fetched text.
- Docs fetched 2026-10-16. The `tokens` / `embeddings` / `batch` / `files` / `caching` / `file-search` pages in this directory give per-resource detail.

## Related

- [Overview](./overview.md)
- [Generating content](./generate-content.md)
- [Batch API](./batch.md)
- [Agents API](./agents.md)
