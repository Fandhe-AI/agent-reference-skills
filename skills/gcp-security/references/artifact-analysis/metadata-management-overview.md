---
source: https://docs.cloud.google.com/artifact-analysis/docs/metadata-management-overview
---

# Metadata management overview

Artifact Analysis stores metadata describing important events about an artifact (container image, VM or software package) so it can be retrieved later to audit the software supply chain, even after the artifact is retired. It is built on Grafeas, an open source component metadata API, and works as a centralized metadata store for components in Artifact Registry or any other location.

## Signature / Usage

The Grafeas model has two entities:

- A **provider** that creates metadata stored in **notes**. A note describes a high-level piece of metadata (for example build provenance); providers that perform the analysis typically own and create notes.
- A **customer** that identifies whether the metadata in a note applies to their artifacts. If so, it is represented as an **occurrence** of the note: when the note was found on a software artifact (for example the package a vulnerability was found in and remediation steps, or the images resulting from a build).

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

## Options / Props

### Supported metadata types

| Metadata type | Description / usage in Google Cloud services |
|---------------|-----------------------------------------------|
| Vulnerability | Vulnerability information for audited files; Artifact Analysis generates occurrences from external databases of publicly disclosed security issues |
| Build | Build provenance; Cloud Build generates it and Artifact Analysis stores it if you build the image with Cloud Build |
| Package | Packages installed in your image |
| Discovery | Information about the initial scan of images; provided only for vulnerability scans |
| Attestation | Image certification information; Binary Authorization reads it and can use it to gate deployments |
| Vulnerability assessment | Stores an uploaded VEX statement in the Grafeas VulnerabilityAssessment note format |
| SBOM reference | Additional metadata to locate and verify SBOMs |

## Notes

- Recommendation: store notes and occurrences in separate projects for fine-grained access control. Notes must be editable only by the note owner and read-only for customers with access to occurrences referencing them. Write access to occurrences should only be granted to users who can link a note to the occurrence; any user can have read access to occurrences.
- As of September 2025, Artifact Analysis no longer supports storing third-party vulnerabilities in notes; note storage is supported only for vulnerabilities generated from Google Cloud scans.
- Third-party metadata providers can store and retrieve all of the listed metadata types for their customers' images.
- Snippet taken from https://docs.cloud.google.com/artifact-analysis/docs/create-notes-occurrences
- Source: https://docs.cloud.google.com/artifact-analysis/docs/metadata-management-overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-notes-occurrences.md](./create-notes-occurrences.md)
- [sbom-overview.md](./sbom-overview.md)
- [create-vex.md](./create-vex.md)
- [artifact-analysis.md](./artifact-analysis.md)
