# Install your desktop app from Phone Link notifications

Lets a notification from your Android or iOS app, shown in Phone Link on the PC, open your Microsoft Store desktop app (or offer to install it). Limited Access Feature: no client-side API; Microsoft enables approved apps via the Phone Link app catalog.

## Signature / Usage

```text
1. Your mobile app posts a notification on the connected phone.
2. The notification appears in Phone Link on the PC.
3. The user selects the notification body.
4. Phone Link opens your Windows desktop app. If not installed, Phone Link offers to install it from the Microsoft Store.
```

## Options / Props

Information to email to crossdeviceexperiences@microsoft.com when requesting access:

| Name | Type | Description |
|------|------|-------------|
| Mobile app identifiers | required | Android package name (e.g. `com.contoso.messaging`) and iOS bundle identifier (e.g. `com.contoso.Messaging`) for each app whose notifications should open the desktop app. |
| Windows app identifiers | required | Package family name (PFN) and Microsoft Store product ID. PFN is used to detect and open the installed app; the product ID creates the install link. |
| Store campaign ID | optional | Appended by Phone Link to the Store link as the `cid` parameter; Partner Center uses it to attribute acquisitions. |
| User experience description | required | What the user is doing when the notification arrives and what they can do in the desktop app after handoff. |
| Screenshot or short recording | required | The mobile notification in Phone Link and the destination that opens in the desktop app. |

## Notes

- Limited Access Feature (LAF): Microsoft must approve and enable the app. If approved, you receive unlock instructions and the app is added to the Phone Link app catalog.
- Prerequisites: publicly available Windows desktop app in the Microsoft Store; MSIX-packaged with a stable PFN (unpackaged apps are not supported; if the PFN changes, contact Microsoft to update the catalog entry); an Android or iOS app using standard platform notification APIs; shared account state between mobile and desktop apps; Microsoft Store policy and Windows quality requirements met.
- Only a selection of the notification body routes to the desktop app. Inline notification actions (e.g. replying to a message) are handled by Phone Link without opening the app.
- Privacy: the integration changes the destination of an approved notification-body selection; it does not give the desktop app client-side access to the forwarded notification. Avoid sensitive content in notifications.
- Limitations: requires a supported Phone Link version and a connected Android or iOS device; on Android devices supporting app remoting, Phone Link keeps using the app-remoting experience when it is the primary path; availability is staged by market; Microsoft can enable, stage, or disable the experience per app server-side; an app cannot register itself through a client-side API.
- Distinct from Windows Resume (Android Continuity SDK / WNS raw notifications), which resumes a task rather than routing a notification.

## Related

- [Windows Resume (cross-device task continuity)](./cross-device-resume-overview.md)
- [Windows Resume with promoted install (Android only)](./cross-device-resume-promoted-install.md)
- [Connected experiences overview](./connected-experiences-overview.md)
