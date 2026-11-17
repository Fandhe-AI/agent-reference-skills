---
source: https://docs.cloud.google.com/audit-manager/docs/locations
---

# Audit Manager locations

Audit Manager is available in the regions and multi-region listed below. Use these values for the `--location` flag and the `LOCATION` path segment when running audits and schedules.

## Signature / Usage

```bash
gcloud audit-manager audit-schedules list \
    --RESOURCE_TYPE=RESOURCE_ID \
    --location=LOCATION
```

## Options / Props

### Americas

| Region | Description |
|---|---|
| `northamerica-northeast1` | Montréal, Canada |
| `northamerica-northeast2` | Toronto, Canada |
| `us-central1` | Iowa, US |
| `us-east1` | South Carolina, US |
| `us-east4` | Northern Virginia, US |
| `us-east5` | Columbus, US |
| `us-south1` | Dallas, US |
| `us-west1` | Oregon, US |
| `us-west2` | Los Angeles, US |
| `us-west3` | Salt Lake City, US |
| `us-west4` | Las Vegas, US |

### Asia Pacific

| Region | Description |
|---|---|
| `asia-east1` | Changhua County, Taiwan |
| `asia-northeast1` | Tokyo, Japan |
| `asia-northeast2` | Osaka, Japan |
| `asia-south1` | Mumbai, India |
| `asia-south2` | Delhi, India |
| `asia-southeast1` | Singapore |

### Australia

| Region | Description |
|---|---|
| `australia-southeast1` | Sydney, Australia |
| `australia-southeast2` | Melbourne, Australia |

### Europe

| Region | Description |
|---|---|
| `europe-north1` | Hamina, Finland |
| `europe-southwest1` | Madrid, Spain |
| `europe-west1` | St. Ghislain, Belgium |
| `europe-west2` | London, UK |
| `europe-west3` | Frankfurt, Germany |
| `europe-west4` | Eemshaven, Netherlands |
| `europe-west6` | Zürich, Switzerland |
| `europe-west8` | Milan, Italy |
| `europe-west9` | Paris, France |
| `europe-west10` | Berlin, Germany |
| `europe-west12` | Turin, Italy |

### Multi-regions

| Multi-region | Description |
|---|---|
| `global` | Any data center where Audit Manager is available |

## Notes

- Replace `--RESOURCE_TYPE=RESOURCE_ID` with `--organization=ORGANIZATION_ID`, `--folder=FOLDER_ID` or `--project=PROJECT_ID` (the gcloud help for this command lists these flags); the placeholder form is the official docs' notation.
- The source marks some regions with a leaf icon linking to Google's region carbon page; the marker is omitted here.
- Snippet taken from https://docs.cloud.google.com/audit-manager/docs/run-audit
- Enrollment uses the `global` location (`.../locations/global:enrollResource`).
- Source: https://docs.cloud.google.com/audit-manager/docs/locations (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [run-audit.md](./run-audit.md)
- [enroll-resource.md](./enroll-resource.md)
