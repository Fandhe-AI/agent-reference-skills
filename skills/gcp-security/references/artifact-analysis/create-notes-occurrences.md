---
source: https://docs.cloud.google.com/artifact-analysis/docs/create-notes-occurrences
---

# Create custom notes and occurrences

Provide your own metadata to Artifact Analysis (optional; not required to use the service). The example creates attestation metadata for images with the API: as a provider you create a note in your project for each attestation, and an occurrence in your customer's project for each occurrence of that attestation. The same steps store any supported kind of metadata.

## Signature / Usage

### Create a note

Create `note.json` (the note ID cannot exceed 100 characters):

```json
{
  "shortDescription": "A brief Description of the note",
  "longDescription": "A longer description of the note",
  "kind": "ATTESTATION",
  "attestation": {
    "hint": {
      "humanReadableName": "my-attestation-authority"
    }
  }
}
```

Adapted (not in the official docs): query parameter `noteId` (v1 Discovery name), the URL quoted against shell globbing, and `-v` dropped so the bearer token is not printed.

```bash
curl -H "Content-Type: application/json" -H \
  "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://containeranalysis.googleapis.com/v1/projects/PROVIDER_PROJECT_ID/notes?noteId=NOTE_ID" -d @note.json
```

### Create an occurrence

Create `occurrence.json`:

```json
{
  "resourceUri": "your-resource-uri-here",
  "noteName": "projects/your-note-project/notes/your-note-id",
  "kind": "ATTESTATION",
  "attestation": {
    "serializedPayload": "eW91ci1wYXlsb2FkLWhlcmU=",
    "signatures": [
      {
        "publicKeyId": "your-key-id-here",
        "signature": "eW91ci1zaWduYXR1cmUtaGVyZQ=="
      }
    ]
  }
}
```

Adapted (not in the official docs): `-v` dropped so the bearer token is not printed.

```bash
curl -H "Content-Type: application/json" -H \
  "Authorization: Bearer $(gcloud auth print-access-token)" \
  https://containeranalysis.googleapis.com/v1/projects/PROVIDER_PROJECT_ID/occurrences/ -d @occurrence.json
```

### Get all occurrences for a specific note

Lists occurrences of an attestation across your customers' projects with `projects.notes.occurrences.list`:

```text
GET https://containeranalysis.googleapis.com/v1/projects/PROJECT_ID/notes/NOTE_ID/occurrences
```

## Options / Props

| Field / placeholder | Description |
|---------------------|-------------|
| `PROVIDER_PROJECT_ID` | Your project ID |
| `NOTE_ID` | Identifier for the note; string of at most 100 characters |
| `kind` | `ATTESTATION` in this example; any kind of metadata supported by Artifact Analysis can be stored the same way |
| `attestation.hint.humanReadableName` | Human-readable name of the attestation authority (note) |
| `resourceUri` | Resource the occurrence is attached to (occurrence) |
| `noteName` | `projects/<note project>/notes/<note id>` the occurrence refers to |
| `serializedPayload`, `signatures[].signature` | Base64 values in the occurrence; the sample values are placeholders |
| `signatures[].publicKeyId` | Identifier of the key that verifies the signature, given as is (not Base64-encoded); the sample value is a placeholder |

## Notes

- Before you begin: learn how to set up access control for metadata in your project (skip it if you only consume occurrences created by Artifact Analysis container scanning).
- Adapted from the official docs: the note URL used `?note_id=NOTE_ID` unquoted; the Discovery document names the parameter `noteId`.
- Adapted from the official docs: both curl commands used `curl -v`, which prints the request headers including the `Authorization` bearer token; `-v` is dropped.
- Source inconsistency: the source says the provider creates the occurrence in the customer's project, while its occurrence curl uses `PROVIDER_PROJECT_ID` ("your project ID"), and its placeholder list for that command also names `NOTE_ID`, which the URL does not contain. The v1 `parent` of `projects.occurrences.create` is the project under which the occurrence is to be created.
- Keep real payloads and signatures out of version control; the base64 strings shown decode to the placeholder text `your-payload-here` and `your-signature-here`.
- The Java, Go, Node.js, Ruby and Python client-library samples of the source page (create note, create occurrence, list note occurrences, plus Ruby helpers for discovery and Pub/Sub) are omitted; the REST forms above cover the same calls. Client libraries: https://docs.cloud.google.com/artifact-analysis/docs/reference/libraries.
- Pub/Sub notifications: https://docs.cloud.google.com/artifact-analysis/docs/pub-sub-notifications.
- Source: https://docs.cloud.google.com/artifact-analysis/docs/create-notes-occurrences (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [metadata-management-overview.md](./metadata-management-overview.md)
- [investigate-vulnerabilities.md](./investigate-vulnerabilities.md)
