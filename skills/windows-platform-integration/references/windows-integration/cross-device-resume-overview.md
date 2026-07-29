# Windows Resume (cross-device task continuity)

Lets a mobile/companion app publish activity context so the user can continue that task on their Windows PC through the taskbar **Resume badge**. Implemented entirely via Windows Push Notification Service (WNS) raw notifications rather than a dedicated WinRT API, and requires Microsoft approval before it can be enabled.

## Signature / Usage

```javascript
// App server sends a WNS raw notification carrying Resume metadata to the
// channel URI previously registered by the Windows app.
const axios = require('axios');

const headers = {
  "Content-Type": "application/octet-stream",
  "X-WNS-Type": "wns/raw",
  "Authorization": "Bearer YOUR_ACCESS_TOKEN",
  "X-WNS-RawNotificationType": "wns/raw/resume",
  "X-WNS-ResumeMetadata": JSON.stringify({
    title: "Continue call from…",
    expiry: "300",
    type: "1"
  })
};

axios.post(channelUri, payload, { headers })
  .then(res => console.log(`Response Status: ${res.status}`))
  .catch(err => console.error(`Error Status: ${err.response?.status}`));
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `X-WNS-Type` | header | Must be `wns/raw` — required for every WNS raw notification request used by Resume. |
| `X-WNS-RawNotificationType` | header | Set to `wns/raw/resume` to mark the raw notification as a Resume continuity signal. |
| `X-WNS-ResumeMetadata` | header (JSON/dictionary) | Metadata for the resume action: `title` (display text, e.g. `"Continue call from…"`), `expiry` (lifetime in seconds, e.g. `"300"`), `type` — `"1"` new resume request, `"2"` update, `"3"` delete per the guide's code samples (the guide's prose instead states `2` = delete; see Notes). Passing any non-JSON/dictionary value throws a validation exception. |
| Channel URI | string | The app's WNS notification channel, requested and stored client-side beforehand (see [How to request, create, and save a notification channel](https://learn.microsoft.com/en-us/windows/apps/design/shell/tiles-and-notifications/request-create-save-notification-channel)). |

## Notes

- Resume is a **Limited Access Feature (LAF)**: access requires Microsoft approval. Request it by emailing `wincrossdeviceapi@microsoft.com` with the app's WNS registration status, Package SID, a description of the user experience, and a screenshot of the resumable action.
- Prerequisites before integration: register the app with WNS, obtain the Package SID and client secret from the Azure portal, and configure/store a channel URI; WNS notifications for Resume use the `wns/raw` payload type (not the XML tile/toast payload).
- The official page's prose states `type` values as `1` = new resume request and `2` = delete (no action if missing), while its accompanying "update" and "delete" code samples instead use `type: "2"` for an update notification and `type: "3"` for delete — this inconsistency exists in the source documentation itself; confirm current numeric values with Microsoft during LAF onboarding rather than relying on either value blindly.
- This overview page is thin by design; the implementation steps, headers, and code samples above come from the companion how-to guide "Resume for installed apps" (`integrate-app-continuity`), which the official docs present as the detailed counterpart to this overview within the same Windows-integration section.
- Distinct from [JumpList / JumpListItem](./jump-list.md) and [TaskbarManager](./taskbar-manager.md): those surface app-defined tasks/pins on the taskbar, whereas Resume surfaces a cross-device continuity badge driven by server-sent WNS notifications, not local WinRT calls.

## Related

- [TaskbarManager](./taskbar-manager.md)
- [People on Windows (cross-device People API)](./cross-device-people-api.md)
