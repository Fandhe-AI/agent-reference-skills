---
source: https://docs.cloud.google.com/artifact-analysis/docs/investigate-vulnerabilities
---

# Investigate vulnerabilities

Pre-constructed API calls and filters that use `ListOccurrences` to retrieve scan results and the status of artifacts when a new vulnerability is announced. The content is designed for automatic scanning metadata. If images have exceeded the 30-day continuous analysis window, push to Artifact Registry again to run a new scan.

## Signature / Usage

### View all the vulnerability metadata for an image

Use the filter `kind=VULNERABILITY` with the project ID and the full resource URL (including `https://`):

```bash
curl -G -H "Content-Type: application/json" \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  --data-urlencode "filter=(kind=\"VULNERABILITY\" AND resourceUrl=\"RESOURCE_URL\")" \
  https://containeranalysis.googleapis.com/v1/projects/PROJECT_ID/occurrences
```

### Check for a specific vulnerability in a project

The vulnerability ID is part of the `noteName` field (prefix `CVE` for CVE IDs, `GHSA` for GHSA IDs), for example:

```text
vulnerabilities:
  HIGH:
  - name: projects/my-project/occurrences/1234fh2c-699a-462f-b920-93a80f56f544
    resourceUri: https://my_region-docker.pkg.dev/my-project/my-repo/my-image@sha256:8a1a79b587797c5164ec95977cf7aaaa828694a615947bdaed6a327d5b6a17bb
    noteName: projects/goog-vulnz/notes/CVE-2021-32798
    kind: VULNERABILITY
    ...
  - name: projects/my-project/occurrences/OCCURRENCE_ID
    resourceUri: https://my_region-docker.pkg.dev/my-project/my-repo/my-image@sha256:8a1a79b587797c5164ec95977cf7aaaa828694a615947bdaed6a327d5b6a17bb
    noteName: projects/goog-vulnz/notes/GHSA-884p-74jh-xrg2
    kind: VULNERABILITY
    ...
```

List affected images in the project:

```bash
curl -G -H "Content-Type: application/json" \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  --data-urlencode "filter=(noteProjectId=\"goog-vulnz\" AND noteId=\"VULN_ID\")" \
  https://containeranalysis.googleapis.com/v1/projects/PROJECT_ID/occurrences
```

### Search for vulnerabilities across multiple projects

Use curl globbing; there is no support for a single API call across multiple projects.

```bash
PROJECT_IDS="PROJECT_ID_1,PROJECT_ID_2"

curl -G -H "Content-Type: application/json" \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://containeranalysis.googleapis.com/v1/projects/{$PROJECT_IDS}/occurrences"
```

### View all the metadata for a project

```bash
curl -X GET -H "Content-Type: application/json" -H \
  "Authorization: Bearer $(gcloud auth print-access-token)" \
  https://containeranalysis.googleapis.com/v1/projects/PROJECT_ID/occurrences
```

### Check for a specific package in a project

```bash
curl -G -H "Content-Type: application/json" \
   -H "Authorization: Bearer $(gcloud auth print-access-token)" \
--data-urlencode "filter=(dependencyPackageName=\"PACKAGE_NAME\")" \
    https://containeranalysis.googleapis.com/v1/projects/PROJECT_ID/occurrences
```

### View all package metadata for an image

Use `kind="PACKAGE"` with the project ID and full image resource URL. The output includes a dependency list with name, version and license information.

```bash
curl -G -H "Content-Type: application/json" \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  --data-urlencode "filter=(kind=\"PACKAGE\" AND resourceUrl=\"RESOURCE_URL\")" \
  https://containeranalysis.googleapis.com/v1/projects/PROJECT_ID/occurrences
```

### Query a specific occurrence for all available details

For example after a Pub/Sub notification, whose payload includes an occurrence ID. Output includes package type, severity, CVSS score and fix information if available.

```bash
curl -X GET -H "Content-Type: application/json" -H \
  "Authorization: Bearer $(gcloud auth print-access-token)" \
  https://containeranalysis.googleapis.com/v1/projects/PROJECT_ID/occurrences/OCCURRENCE_ID
```

## Options / Props

| Placeholder | Description |
|-------------|-------------|
| `PROJECT_ID` | Google Cloud project ID |
| `RESOURCE_URL` | Complete image URL `https://HOST_NAME/PROJECT_ID/IMAGE_ID@sha256:HASH`; `https://` must be included |
| `VULN_ID` | CVE ID or GHSA ID, such as `CVE-2021-32798` or `GHSA-884p-74jh-xrg2` |
| `PACKAGE_NAME` | Name of the package |
| `OCCURRENCE_ID` | A numerical value from an occurrences list, or the numerical value at the end of the URL in a Pub/Sub message |

### Filters used

| Filter | Purpose |
|--------|---------|
| `kind="VULNERABILITY"` + `resourceUrl` | Vulnerability occurrences for an image |
| `noteProjectId="goog-vulnz"` + `noteId` | Occurrences of one vulnerability |
| `dependencyPackageName` | Artifacts depending on a package |
| `kind="PACKAGE"` + `resourceUrl` | Package metadata for an image |

## Notes

- All examples use `ListOccurrences` and need the Container Analysis Occurrences Viewer role (`roles/containeranalysis.occurrences.viewer`) on the analyzed project. Owners of the analyzed project already have the permissions.
- The examples use the access token of the current gcloud account via `gcloud auth print-access-token`; do not paste the token into shared terminals or CI logs.
- Client libraries and gcloud commands are alternatives to the REST calls; see the source page.
- Source: https://docs.cloud.google.com/artifact-analysis/docs/investigate-vulnerabilities (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [severity-levels.md](./severity-levels.md)
- [scan-os-on-demand.md](./scan-os-on-demand.md)
- [container-scanning-overview.md](./container-scanning-overview.md)
