---
source: https://docs.cloud.google.com/endpoint-verification/docs/quickstart
---

# Set up Endpoint Verification on your devices

Quickstart for turning on Endpoint Verification for an organizational unit in the Google Admin console, force-installing the Chrome extension, and viewing the device list. All steps are in the Google Admin console.

## Signature / Usage

### Create a device-based access level from the collected attributes

After devices report their attributes, a basic access level can require them. Example from the device-based access level guide (the YAML file lists device policy attributes):

Adapted (not in the official docs): a space is added before the line-continuation backslash after the file name (the source has `--basic-level-spec=FILE_NAME.yaml\`, which breaks the continuation).

```bash
gcloud access-context-manager levels create ACCESS_LEVEL_NAME \
--title=TITLE \
--basic-level-spec=FILE_NAME.yaml \
--policy=POLICY_NAME
```

## Options / Props

### Requirements

| Item | Requirement |
|---|---|
| Admin account | Google Workspace administrator account with the Service Settings privilege |
| Devices | An organizational unit with at least one device running ChromeOS; Apple Mac OS X El Capitan (10.11) or later; Microsoft Windows 10 and 11; or Linux Debian and Ubuntu |
| Browser | Chrome 110 or later (can be installed on any Chromium-based browser, supported only on Chrome) |

### Extension settings in the Admin console

| Setting | Effect |
|---|---|
| Allow access to keys | Lets the extension access client certificates and keys on ChromeOS |
| Allow enterprise challenge | Lets the extension use the Verified Access feature on ChromeOS |
| Installation policy | Select Force install |

## Notes

- Endpoint Verification is turned on by default. To confirm: Admin console, Devices, Mobile & endpoints, Settings, Universal, Data access, Device signals, and ensure "Collect device signals using endpoint verification" is selected.
- Install path: Chrome, Apps & extensions, Users & browsers, select the organizational unit, Add from Chrome Web Store, search "Endpoint Verification". View devices under Devices, Endpoints.
- Clean up: in Device signals, clear the "Monitor which devices access organization data" checkbox and save (the quickstart uses this wording, which differs from the checkbox label used when turning it on).
- The source page has Admin console steps only; the gcloud example comes from the device-based access level guide.
- Snippet taken from https://docs.cloud.google.com/endpoint-verification/docs/creating-device-access-level
- Corrected from the official docs: `--basic-level-spec=FILE_NAME.yaml\` (no space before the backslash, which joins the next flag onto the file name).
- Source: https://docs.cloud.google.com/endpoint-verification/docs/quickstart (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [endpoint-verification-overview.md](./endpoint-verification-overview.md)
- [creating-device-access-level.md](./creating-device-access-level.md)
