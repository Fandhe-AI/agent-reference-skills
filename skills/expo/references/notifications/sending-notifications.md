---
source: https://docs.expo.dev/push-notifications/sending-notifications/
---

# Send notifications with the Expo Push Service

Send a push notification by POSTing to the Expo Push API with the `ExpoPushToken` obtained via `getExpoPushTokenAsync`. Expo forwards the notification to FCM and APNs.

## Signature / Usage

Send (HTTP/2 API, currently no authentication required by default):

```sh
curl -H "Content-Type: application/json" -X POST "https://exp.host/--/api/v2/push/send" -d '{
  "to": "ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]",
  "title":"hello",
  "body": "world"
}'
```

Request headers: `host: exp.host`, `accept: application/json`, `accept-encoding: gzip, deflate`, `content-type: application/json`. The body is a single message object or an array of up to 100 message objects, all for the same project:

```json
[
  { "to": "ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]", "sound": "default", "body": "Hello world!" },
  { "to": "ExponentPushToken[yyyyyyyyyyyyyyyyyyyyyy]", "badge": 1, "body": "You've got mail" },
  {
    "to": ["ExponentPushToken[zzzzzzzzzzzzzzzzzzzzzz]", "ExponentPushToken[aaaaaaaaaaaaaaaaaaaaaa]"],
    "body": "Breaking news!"
  }
]
```

Fetch push receipts (POST `https://exp.host/--/api/v2/push/getReceipts`, body `{ "ids": string[] }`):

```sh
curl -H "Content-Type: application/json" -X POST "https://exp.host/--/api/v2/push/getReceipts" -d '{
  "ids": [
    "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
    "YYYYYYYY-YYYY-YYYY-YYYY-YYYYYYYYYYYY"
  ]
}'
```

## Options / Props

Message request format (only `to` is required):

| Field | Platform | Type | Description |
| --- | --- | --- | --- |
| `to` | Android and iOS | `string \| string[]` | An Expo push token or an array of Expo push tokens specifying the recipient(s). |
| `contentAvailable` | iOS only | `boolean` | When true, the notification starts the iOS app in the background to run a background task. The app must be configured to support this. Maps to `aps.content-available`. |
| `data` | Android and iOS | `Object` | JSON object delivered to the app. May be up to about 4KiB; the total notification payload sent to Apple and Google must be at most 4KiB or a "Message Too Big" error occurs. |
| `title` | Android and iOS | `string` | Title shown above the body. Maps to `AndroidNotification.title` and `aps.alert.title`. |
| `body` | Android and iOS | `string` | Message to display. Maps to `AndroidNotification.body` and `aps.alert.body`. |
| `ttl` | Android and iOS | `number` | Time to Live: seconds the message may be kept for redelivery. Omit to use each provider's own default (4 weeks). |
| `expiration` | Android and iOS | `number` | Unix epoch timestamp when the message expires. Same effect as `ttl` (`ttl` takes precedence). |
| `priority` | Android and iOS | `'default' \| 'normal' \| 'high'` | Delivery priority. `default` or omitted uses each platform's default ("normal" on Android and "high" on iOS). |
| `subtitle` | iOS only | `string` | Subtitle below the title. Maps to `aps.alert.subtitle`. |
| `sound` | iOS only | `string \| null` | `default` plays the default notification sound; omit for no sound. Custom sounds must be configured via the config plugin and specified with file extension (e.g. `bells_sound.wav`). |
| `badge` | iOS only | `number` | App icon badge number. Zero clears the badge. |
| `interruptionLevel` | iOS only | `'active' \| 'critical' \| 'passive' \| 'time-sensitive'` | Importance and delivery timing; corresponds to `UNNotificationInterruptionLevel`. |
| `targetContentId` | iOS only | `string` | Identifier of the window brought forward. Maps to `aps.target-content-id`; exposed by `expo-notifications` as `targetContentIdentifier`. |
| `relevanceScore` | iOS only | `number` | Score between 0 and 1 used to pick which notification to feature in a summary. Maps to `aps.relevance-score`. |
| `filterCriteria` | iOS only | `string` | Criteria evaluated to decide whether to display the notification in the current Focus. Maps to `aps.filter-criteria`. |
| `channelId` | Android only | `string` | ID of the Notification Channel. If the channel does not exist on the device, the notification is not displayed. If null, a "Default" channel is used (created by Expo if missing; user-facing and possibly not fully deletable). |
| `icon` | Android only | `string` | Name of an Android drawable resource (example: `myicon`). Defaults to the icon in the config plugin. |
| `richContent` | Android and iOS | `Object` | Currently supports `{ image: string }` (image URL). Android shows the image out of the box; iOS needs a Notification Service Extension target. |
| `categoryId` | Android and iOS | `string` | ID of the notification category (interactive notifications). |
| `collapseId` | Android and iOS | `string` | Identifier for collapsing notifications. On Android it only coalesces messages in transit (FCM `collapse_key`); use `tag` to replace displayed notifications. On iOS it coalesces in transit and replaces displayed notifications (`apns-collapse-id`). |
| `tag` | Android only | `string` | Replaces an already-displayed notification with the same `tag`. Maps to FCM `notification.tag`. |
| `threadId` | iOS only | `string` | Groups notifications visually; nothing is replaced or removed. Maps to `aps.thread-id`. |
| `mutableContent` | iOS only | `boolean` | Whether the notification can be intercepted by the client app. Defaults to `false`. |

Push ticket format:

```js
{
  "data": [
    {
      "status": "error" | "ok",
      "id": string, // this is the Receipt ID
      // if status === "error"
      "message": string,
      "details": JSON
    },
    ...
  ],
  // only populated if there was an error with the entire request
  "errors": [{
    "code": string,
    "message": string
  }]
}
```

Push receipt response format:

```js
{
  "data": {
    Receipt ID: {
      "status": "error" | "ok",
      // if status === "error"
      "message": string,
      "details": JSON
    },
    ...
  },
  // only populated if there was an error with the entire request
  "errors": [{
    "code": string,
    "message": string
  }]
}
```

Error values:

| Where | Code | Meaning |
| --- | --- | --- |
| ticket, receipt `details.error` | `DeviceNotRegistered` | The device cannot receive push notifications anymore; stop sending to the token. |
| receipt | `MessageTooBig` | Total payload too large; at most 4096 bytes on Android and iOS. |
| receipt | `MessageRateExceeded` | Messages sent too frequently to the device; use exponential backoff. |
| receipt | `MismatchSenderId` | FCM credential issue: the FCM V1 service account key and `google-services.json` `project_number` (sender ID) must be associated with the same project. |
| receipt | `InvalidCredentials` | Push credentials invalid. Android: re-upload the FCM V1 credentials. iOS: run `eas credentials` to regenerate; `InvalidProviderToken` is tied to both the APN key and the provisioning profile (rebuild and regenerate both). |
| request `errors` | `TOO_MANY_REQUESTS` | Exceeding 600 notifications per second per project. |
| request `errors` | `PUSH_TOO_MANY_EXPERIENCE_IDS` | Tokens from different projects in one request. |
| request `errors` | `PUSH_TOO_MANY_NOTIFICATIONS` | More than 100 notifications in one request. |
| request `errors` | `PUSH_TOO_MANY_RECEIPTS` | More than 1000 receipt IDs in one request. |
| request `errors` | `UNAUTHORIZED` | Request without a valid access token after push security is enabled. |

## Notes

- Server SDKs (each wraps the Expo Push Service API): expo-server-sdk-node (Node.js, Expo team); community or third-party: expo-server-sdk-python, expo-server-sdk-ruby, expo-push-notification-client-rust, expo-notifier (Symfony), exponent-server-sdk-php, expo-server-sdk-php, exponent-server-sdk-golang, exponent (Golang), exponent-server-sdk-elixir, expo-server-sdk-dotnet, expo-server-sdk-java, laravel-expo-notifier.
- Reliability: the Node SDK opens a maximum of six concurrent connections, gzips requests, and throttles. Retry with exponential backoff on network errors, HTTP 429, or 5xx. HTTP 400 indicates a malformed payload and will not resolve by retrying; sending different projects in one request or having no credentials also errors.
- Push ticket `ok` means Expo received the message, not that the user received it. A push receipt is created after Expo hands the notification to FCM or APNs; receipt `ok` means FCM / APNs received it, not that the device did. Check receipts about 15 minutes after sending; receipts are cleared after 24 hours; no receipt after 15 minutes likely indicates an Expo-side error. `DeviceNotRegistered` in receipts appears only when Google or Apple deems the device unregistered, which takes an undefined time and is often impossible to test by uninstalling and sending shortly after.
- The Expo push notification service has no SLA; FCM and APNs may also have outages.
- Enhanced push security: require a valid access token for push requests (enable in the EAS Dashboard access-token settings). With `expo-server-sdk-node` use at least `v3.6.0` and pass `accessToken` in the constructor; otherwise send the header `'Authorization': 'Bearer ${accessToken}'`. Without the token after enabling, requests fail with `UNAUTHORIZED`. Without it, leaked push tokens would let a malicious user impersonate your server.
- `contentAvailable` replaces the deprecated `_contentAvailable` field, which is still accepted; `contentAvailable` takes precedence if both are given.
- `ttl` on Android: best effort to deliver zero-TTL messages immediately without throttling, but a low TTL can prevent normal-priority notifications from reaching devices in doze mode. `ttl` takes precedence over `expiration`.
- `priority`: Android normal-priority messages won't open network connections on sleeping devices and may be delayed; high priority may wake devices. iOS normal priority corresponds to APNs priority 5 and high to 10; normal-priority messages are throttled and may not be delivered by Apple.
- `sound` and `badge` on iOS apply only if the user allows them; `getPermissionsAsync()` reports `ios.allowsSound` and `ios.allowsBadge`, and top-level `status` stays `granted` when either is off.
- Delivery guarantees: best effort with at least one delivery attempt to Google / Apple; duplicate delivery to Google or Apple is more likely than none, though both are uncommon.
- Troubleshooting: the server needs connectivity to Google Cloud Platform services in the United States region (where the service is hosted). Diagnostics from the guide: `dig exp.host`, `traceroute exp.host`, `ping exp.host`, `curl --verbose https://exp.host/` (expect HTTP 200 headers), `openssl s_client -connect exp.host:443 -servername exp.host`. Check firewall rules on outbound 443, corporate proxies, network ACLs / security groups, and MTU fragmentation.
- Page modificationDate: October 13, 2026 (unversioned guide, fetched 2026-10-17).
- Distance line: APNs and FCM protocols themselves are covered by `apple-app-services` and `android-platform-core`. Server-side retry/queue patterns for your own backend are not Expo-specific.

## Related

- [Send notifications with FCM and APNs](./sending-notifications-custom.md)
- [Expo push notifications setup](./push-notifications-setup.md)
- [Obtain Google Service Account Keys using FCM V1](./fcm-credentials.md)
- [Handle incoming notifications](./receiving-notifications.md)
