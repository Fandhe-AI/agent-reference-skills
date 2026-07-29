# Permissions Used Only in Default Handlers

Some sensitive permission groups (call-related, SMS/messaging) are granted by Google Play only to the app the user has set as the default handler for that function (default Phone/Dialer, default SMS app, or default Assistant); an app must become the default handler before it can request the associated permissions.

## Signature / Usage

```kotlin
// Ask the user to set this app as the default SMS app before
// requesting SMS-related runtime permissions
val setSmsAppIntent = Intent(Telephony.Sms.Intents.ACTION_CHANGE_DEFAULT).apply {
    putExtra(Telephony.Sms.Intents.EXTRA_PACKAGE_NAME, packageName)
}
startActivityForResult(setSmsAppIntent, REQUEST_CODE_SET_DEFAULT_SMS_APP)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `Telephony.Sms.Intents.ACTION_CHANGE_DEFAULT` | intent action | — | Prompts the user to set this app as the default SMS app; required before requesting SMS permissions such as `READ_SMS`/`SEND_SMS`. |
| Default Phone/Dialer role | system role | — | Required for call-log and call-related permissions; the default Assistant role is an accepted alternative for some call-related permissions. |
| Default Assistant role | system role | — | Alternative default-handler role accepted for a subset of call-related permissions. |

## Notes

- Request order matters: request default-handler status first, then request the associated runtime permissions — requesting the permissions first is rejected under Play policy.
- Google Play requires apps relying on these permissions to declare only permissions relevant to their core use case, provide a privacy policy, and clearly describe the core functionality that requires default-handler status in the Play Store listing.
- The app must genuinely perform the corresponding functionality (e.g., a default SMS app must actually support sending text messages), not just request the role to obtain the permission.
- Some apps qualify for Play Console-documented exception cases that waive the default-handler requirement for specific use cases.

## Related

- [special-permissions-overview](./special-permissions-overview.md)
- [permission-types-and-protection-levels](./permission-types-and-protection-levels.md)
