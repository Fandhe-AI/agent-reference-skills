---
source: https://docs.cloud.google.com/transfer-appliance/docs/4.0/procedure-guide
---

# Transfer Appliance procedure guide

High-level procedure for ordering, installing, filling and returning a Transfer Appliance, including expected interactions with Google.

## Signature / Usage

Commands named in the source (inline in the original text, run on the appliance when finishing the copy):

```bash
ta finalize
ta status
```

`ta finalize` prints the passcode you enter in the form from the email "Google Transfer Appliance Return Instructions"; `ta status` shows it again. Google replies with the shipping label.

### Steps

1. Before ordering: check power, cooling and space against the specifications; identify servers/folders; confirm permissions to the data.
2. Apply for the appliance in the same project as the destination bucket and choose offline or online mode.
3. Project setup: appliances page, **Open Setup Checklist**: `Enable API`, `Authorize the service accounts`, and (online only) create and download a key for the appliance service account.
4. Receive: confirm receipt, validate it was not tampered with, submit the Attestation Passcode in the console to obtain credentials, configure IP network ports, connect, configure the software.
5. Copy data (online-capable and enabled: streamed to the bucket, and files and empty directories are deleted from the appliance after a successful copy; otherwise finalize), then package and return it.
6. After return: verify receipt and completion emails, validate the data in the destination bucket, optionally request a wipe certificate.

## Options / Props

Data criteria before ordering:

| Criterion | Limit |
|---|---|
| File size | Less than 5 TB each |
| File names | Follow Cloud Storage object naming guidelines |
| File types | Regular files or Unix hidden files (start with `.`) |
| Folders | Must contain files (empty folders are not created in Cloud Storage) |
| Path length | 1024 bytes, including the optional object prefix |

Permissions needed for project setup: `iam.serviceAccounts.getIamPolicy`, `resourcemanager.projects.getIamPolicy`, `resourcemanager.projects.setIamPolicy`, `storage.buckets.getIamPolicy`, `storage.buckets.setIamPolicy` (via custom or predefined roles).

## Notes

- Offline mode cannot be toggled after receiving the appliance; online mode can be toggled between online and offline.
- Online transfer needs the appliance service account (`ID@PROJECT_ID.iam.gserviceaccount.com`, whose key is uploaded to the appliance) and the project's Storage Transfer Service service agent (`project-PROJECT_NUMBER@storage-transfer-service.iam.gserviceaccount.com`); grant the checklist's listed roles to those two only. The session service account and the Google-managed tenant-project service agent shown in the checklist are only for offline mode. Create the key only for the appliance service account. A downloaded key is a long-lived credential; store it securely.
- If you cannot use the checklist (for example, keys are disallowed in the order project), configure APIs, service accounts and roles manually: https://docs.cloud.google.com/transfer-appliance/docs/4.0/prepare-online
- The attestation passcode and the finalize passcode are specific to each appliance; match the session ID printed on the shipping case.
- Do not delete source data until you verify it in Cloud Storage. Extra directories `storage-transfer`, `transferappliance` and sometimes `cloud-ingest` appear in the bucket and can be deleted afterwards.
- Source inconsistency: this page states the file size limit as less than 5 terabytes (TB); the known-limitations page states 5 TiB per object (the Cloud Storage object maximum). 5 TB and 5 TiB differ by about 10%.
- Source: https://docs.cloud.google.com/transfer-appliance/docs/4.0/procedure-guide (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [transfer-data.md](./transfer-data.md)
- [known-limitations.md](./known-limitations.md)
