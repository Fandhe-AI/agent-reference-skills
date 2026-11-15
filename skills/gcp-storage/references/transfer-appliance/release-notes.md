---
source: https://docs.cloud.google.com/transfer-appliance/docs/4.0/release-notes
---

# Transfer Appliance 4.0 release notes

Production updates to Transfer Appliance 4.0: features, changes and announcements. Feed: https://docs.cloud.google.com/feeds/transferappliance-4.0-release-notes.xml

## Signature / Usage

Release note entries mention the appliance `ta mount` tool (snippet from the transfer-data page):

```bash
ta unmount --target=/mnt/ta_data_base/ta_mounts/MOUNT_POINT
```

## Options / Props

| Date | Update |
|---|---|
| December 18, 2023 | GA data export appliance in the US (Cloud Storage to appliance, shipped to you) |
| October 31, 2023 | Alpha gcloud support: `gcloud alpha transfer appliances` (view results, draft orders, clone orders) |
| October 09, 2023 | `ta mount` / `ta unmount` for your own NFS or CIFS shares |
| September 27, 2023 | New console setup experience for permissions and credentials |
| March 08, 2023 | `ta check` diagnoses and fixes configuration issues |
| November 10, 2022 | SMB file share support |
| September 14, 2022 | Auto-generated log files of transferred and failed data |
| September 09, 2022 | Optional Remote Wipe before returning an appliance |
| September 02, 2022 | Lock/unlock to move an appliance between data centers securely |
| August 17, 2022 | Edge Appliance GA |
| August 12, 2022 | Suspend mode before moving an appliance |
| July 12, 2022 | TA7 appliance, up to 7TB, online and offline modes |
| June 29, 2022 | Cloud Monitoring of stored data and online transfer state |
| June 16, 2022 | Order from the Cloud console |
| June 02, 2021 | Transfer Appliance Cloud Setup Application |
| March 30, 2021 | Version 4.0 orderable in Singapore; version 2.2 deprecated |
| November 04, 2020 | Version 4.0 released |

## Notes

- Snippet taken from https://docs.cloud.google.com/transfer-appliance/docs/4.0/transfer-data (the source twin has no code block).
- Source: https://docs.cloud.google.com/transfer-appliance/docs/4.0/release-notes (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [transfer-data.md](./transfer-data.md)
