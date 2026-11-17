---
source: https://docs.cloud.google.com/artifact-analysis/docs/create-vex
---

# Create VEX statements

Preview: this feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms and is available "as is" with possibly limited support. Artifact Analysis can store a Vulnerability Exploitability eXchange (VEX) statement for every container image pushed to Artifact Registry. A VEX statement is a security advisory stating whether a product is affected by a known vulnerability and gives the publisher, the artifact, and the VEX status for each known vulnerability.

## Signature / Usage

Artifact Analysis supports the Common Security Advisory Format (CSAF) 2.0 standard in JSON; use the CSAF schema to produce a statement. The example is a VEX statement for an Artifact Registry image with one `cve` branch. You must define `product_status` for each CVE, and create a `cve` branch for each vulnerability listed.

```json
{
  "document": {
    "csaf_version": "2.0",
    "lang": "en-US",
    "publisher": {
      "name": "Sample-Company",
      "namespace": "https://sample-company.com"
    },
    "title": "Vex document 1.1"
  },
  "product_tree": {
    "branches": [
      {
        "name": "https://LOCATION-docker.pkg.dev/PROJECT_ID/REPO_NAME/IMAGE_NAME",
        "product": {
          "name": "PRODUCT_NAME",
          "product_id": "IMAGE_NAME"
        }
      }
    ]
  },
  "vulnerabilities": [
    {
      "cve": "CVE_ID",
      "product_status": {
        "PRODUCT_STATUS": [
          "IMAGE_NAME"
        ]
      }
    }
  ]
}
```

## Options / Props

### VEX status

| Status | Meaning |
|--------|---------|
| Not affected | No remediation is required regarding this vulnerability |
| Affected | Remediation actions are recommended |
| Fixed | A fix has been applied in this version of the product |
| Under Investigation | Status yet to be determined; the publisher provides an update in a later release |

### Placeholders

| Placeholder | Description |
|-------------|-------------|
| `PRODUCT_NAME` | Human-readable product name; use the full canonical name including version number and other attributes |
| `LOCATION` | Region or multi-regional location of the repository |
| `PROJECT_ID` | Project that contains the repository |
| `REPO_NAME` | Docker repository name in Artifact Registry |
| `IMAGE_NAME` | Image name |
| `CVE_ID` | Vulnerability identifier such as `CVE-2017-11164` |
| `PRODUCT_STATUS` | One of `known_affected`, `known_not_affected`, `under_investigation`, `fixed` |

### Required roles (on the project)

| Purpose | Role |
|---------|------|
| Create and update notes | Container Analysis Notes Editor (`roles/containeranalysis.notes.editor`) |

## Notes

- `product_tree.branches.name` is the image URI; including it associates the VEX statement with a specific Docker image.
- Prerequisite: container images in an Artifact Registry repository.
- Vulnerability assessment (VEX) is stored as a Grafeas VulnerabilityAssessment note (see [metadata-management-overview.md](./metadata-management-overview.md)). Upload and view VEX statements: https://docs.cloud.google.com/artifact-analysis/docs/upload-vex and https://docs.cloud.google.com/artifact-analysis/docs/view-vex.
- Source: https://docs.cloud.google.com/artifact-analysis/docs/create-vex (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [metadata-management-overview.md](./metadata-management-overview.md)
- [sbom-overview.md](./sbom-overview.md)
