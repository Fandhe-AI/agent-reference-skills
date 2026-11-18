---
source: https://docs.cloud.google.com/assured-open-source-software/docs/access-metadata-using-container-analysis
---

# Access metadata using the Artifact Analysis API

Assured OSS publishes security metadata for every package version in Artifact Analysis using the Grafeas model: build details, vulnerability status, test results and license information. This page applies to the free tier only; Cloud Storage access is documented on a separate Assured OSS page.

## Signature / Usage

### Note name format

Set up Application Default Credentials first. If you use your own service account in your project, enable the Artifact Analysis API.

```text
projects/<project_id>/notes/<language>-<package_id>-<version>
```

### Fetch the package note with curl

Adapted (not in the official docs): quoted `$URL` so the shell does not split or expand it.

```bash
curl  -H "Content-Type: application/json" -H   "Authorization: Bearer $(gcloud auth print-access-token)" "$URL"
```

Java URL: `https://containeranalysis.googleapis.com/v1/projects/cloud-aoss/notes/JAVA-org.jsoup_jsoup-1.15.2`. Python URL: `https://containeranalysis.googleapis.com/v1/projects/cloud-aoss/notes/PYTHON-Flask-Cors-3.0.10`.

### Sample metadata

```text
{
  "name": "projects/cloud-aoss/notes/JAVA-org.jsoup_jsoup-1.15.2",
  "kind": "PACKAGE",
  "relatedUrl": [
    {
      "url": "projects/cloud-aoss/occurrences/621d7e7b-8e6c-4313-b24b-eae3a1d1b884",
      "label": "ORIGINAL_SOURCE_PROVENANCE"
    },
    {
      "url": "https://containeranalysis.googleapis.com/v1/projects/cloud-aoss/occurrences/a0967d97-634c-4066-b6da-0a723273a165",
      "label": "BUILD_OCCURRENCE"
    },
    {
      "url": "projects/cloud-aoss/occurrences/6005db73-7310-44f9-9a36-6ca0174732a1",
      "label": "TEST_OCCURRENCE"
    },
    {
      "url": "projects/cloud-aoss/notes/GHSA-gp7f-rwcx-9369",
      "label": "VULNERABILITY_GHSA-gp7f-rwcx-9369"
    }
  ],
  "createTime": "2022-10-12T06:48:19.162016Z",
  "updateTime": "2022-10-18T05:31:15.081736Z",
  "package": {
    "distribution": [
      {
        "cpeUri": "cpe:2.3:a:JAVA::org.jsoup:jsoup:1.15.2:*:*:*:*:*:*:*",
        "url": "https://us-maven.pkg.dev/.../org/jsoup/jsoup/1.15.2/jsoup-1.15.2.jar",
        "description": "..."
      },
      {
        "cpeUri": "cpe:2.3:a:JAVA::org.jsoup:jsoup:1.15.2:*:*:*:*:*:*:*",
        "url": "https://us-maven.pkg.dev/.../org/jsoup/jsoup/1.15.2/jsoup-1.15.2-sources.jar",
        "description": "..."
      }
]}}
```

### Download the sample Python script

```bash
pip install google-cloud-containeranalysis
```

```bash
pip install --upgrade google-cloud-kms
pip install --upgrade cryptography
```

Adapted (not in the official docs): joined the broken two-line command and added the line-continuation backslash.

```bash
gcloud storage cp gs://cloud-aoss/utils/python-download-metadata/v1.1/download_metadata.py \
    PATH_TO_LOCAL_STORE --recursive
```

```bash
python ./download_metadata.py -l 'JAVA' -p 'org.apache.logging.log4j:log4j-core' -v '2.17.1'
```

Adapted (not in the official docs): removed the stray trailing backtick after `-s`.

```bash
python ./download_metadata.py -l 'JAVA' -p 'org.apache.logging.log4j:log4j-core' -v '2.17.1' -s
```

## Options / Props

### Note name parts

| Part | Description |
|------|-------------|
| `Project_ID` | Alphanumeric identifier of the Google Cloud project (`cloud-aoss` in the examples) |
| `Package Language` | `JAVA` or `PYTHON`, uppercase |
| `Package_ID` | Java: `groupId_artifactId`; Python: `packageName`. Case sensitive; valid casing is in the list of packages in Assured OSS |
| `Version` | Package version |

### Metadata for each package version

| Object | Link label in `relatedUrl` | Content |
|--------|----------------------------|---------|
| PackageNote | - | `distribution` entries (one per artifact, with location and digest `url` for signature and hash) and `relatedURL` links |
| BuildOccurrence | `BUILD_OCCURRENCE` | `intotoStatement` containing SLSA v0.2 provenance |
| BuildOccurrence | `ORIGINAL_SOURCE_PROVENANCE` | Original source (GitHub) details as Source |
| AttestationOccurrence | `TEST_OCCURRENCE` | Serialized JSON payload of all security testing done on the package version |
| AttestationOccurrence | `PACKAGE_ATTESTATION_OCCURRENCE` | Package note payload and its signature, used to verify the integrity of the package note |
| VulnerabilityNote and VulnerabilityOccurrence | `VULNERABILITY_<id>` | Per vulnerability: summary or description, severity, CVSSV3 score, affected and fixed versions, remediation |

## Notes

- Use `GetNote` and `GetOccurrence` (API or `curl`) with the names in `relatedUrl`; for `BUILD_OCCURRENCE` remove the leading `https://containeranalysis.googleapis.com/v1/`, for other entities use the value directly as `note_name` or `occurrence_name`.
- `curl` with `gcloud auth print-access-token` puts a short-lived token on the command line and process list; do not paste it into shared terminals or CI logs.
- In the sample note the `...` in the distribution URLs and `description` is elision in the source, which is why the sample is shown as `text` rather than valid JSON. The `-s` option of the script verifies signatures in the metadata; use a package name and version available in Assured OSS. Verify the script's own signature before running it (see [verify-packages.md](./verify-packages.md)).
- Adapted from the official docs: the curl command ends with an unquoted `$URL`.
- Corrected from the official docs: the original `gcloud storage cp` example for `download_metadata.py` was split over two lines without a continuation, and the `-s` example ended with a stray backtick.
- Source: https://docs.cloud.google.com/assured-open-source-software/docs/access-metadata-using-container-analysis (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [verify-packages.md](./verify-packages.md)
- [package-signature-overview.md](./package-signature-overview.md)
- [download-python-packages.md](./download-python-packages.md)
