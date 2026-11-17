---
source: https://docs.cloud.google.com/endpoint-verification/docs/overview
---

# Endpoint Verification overview

Endpoint Verification is a Chrome extension that collects and reports device inventory (encryption status, OS and other details) by constantly syncing with Google Cloud, creating an inventory of devices with Chrome browser that access an organization's data. It is part of Chrome Enterprise Premium and is available to all Google Cloud, Cloud Identity, Google Workspace for Business and Google Workspace for Enterprise customers.

## Signature / Usage

### Device attribute used by an access level

Access levels use the attributes that Endpoint Verification collects. This CEL condition from the device-based access level guide allows access only from encrypted devices:

```text
device.encryption_status == DeviceEncryptionStatus.ENCRYPTED
```

## Notes

- Access Context Manager references the device attributes collected by Endpoint Verification to enforce fine-grained access control with access levels.
- With third-party client integrations (such as CrowdStrike and Microsoft Intune), those clients collect real-time device information; Endpoint Verification communicates with them and makes their data available to Access Context Manager.
- Use it when you want an overview of the security posture of laptops and desktops used to access organization resources, including unmanaged personal devices.
- Snippet taken from https://docs.cloud.google.com/endpoint-verification/docs/creating-device-access-level
- Source: https://docs.cloud.google.com/endpoint-verification/docs/overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [endpoint-verification-quickstart.md](./endpoint-verification-quickstart.md)
- [creating-device-access-level.md](./creating-device-access-level.md)
- [overview.md](./overview.md)
