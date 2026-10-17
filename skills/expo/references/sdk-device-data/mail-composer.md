---
source: https://docs.expo.dev/versions/v58.0.0/sdk/mail-composer/
---

# MailComposer

`expo-mail-composer` composes and sends emails using the OS UI.

## Signature / Usage

```sh
npx expo install expo-mail-composer
```

```js
import * as MailComposer from 'expo-mail-composer';
```

## Options / Props

Methods (Android, iOS, Web):

| Name | Returns | Description |
| --- | --- | --- |
| `MailComposer.composeAsync(options: MailComposerOptions)` | `Promise<MailComposerResult>` | Opens a mail modal on iOS and a mail app intent on Android, and fills the fields. Resolves with `status` (sent, saved or cancelled). Android does not provide this info, so status is always set as if the email were sent. |
| `MailComposer.getClients()` | `MailClient[]` | Lists available email clients installed on the device. |
| `MailComposer.isAvailableAsync()` | `Promise<boolean>` | `true` when the device has a default email setup. Can be `false` on iOS if an MDM profile blocks outgoing mail (use the Linking API instead). Always `true` in the browser. |

`MailComposerOptions`:

| Property | Type | Description |
| --- | --- | --- |
| attachments (optional) | `string[]` | App's internal file URIs to attach. |
| bccRecipients (optional) | `string[]` | BCC e-mail addresses. |
| body (optional) | `string` | Body of the e-mail. |
| ccRecipients (optional) | `string[]` | CC e-mail addresses. |
| isHtml (optional) | `boolean` | Whether the body contains HTML tags. Not working perfectly on Android. |
| recipients (optional) | `string[]` | Recipient e-mail addresses. |
| subject (optional) | `string` | Subject of the e-mail. |

`MailClient`:

| Property | Type | Description |
| --- | --- | --- |
| label | `string` | Display name of the mail client. |
| packageName (optional) | `string` | Android only. Package name; usable with `getApplicationIconAsync` / `openApplication` of `expo-intent-launcher`. |
| url (optional) | `string` | iOS only. URL scheme of the mail client; usable with `openURL` of `expo-linking`. |

`MailComposerResult`: `{ status: MailComposerStatus }`.

`MailComposerStatus` enum: `CANCELLED = "cancelled"`, `SAVED = "saved"`, `SENT = "sent"`, `UNDETERMINED = "undetermined"`.

## Notes

- Platforms (frontmatter `platforms`): Android, iOS (device only), Web, Included in Expo Go.
- This module can't be used on iOS Simulators since you can't sign into a mail account on them. On iOS you need to be signed into the Mail app.
- Source code: https://github.com/expo/expo/tree/sdk-58/packages/expo-mail-composer

## Related

- [Linking](../sdk-app/linking.md)
- [Sharing](./sharing.md)
