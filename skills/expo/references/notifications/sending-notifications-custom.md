---
source: https://docs.expo.dev/push-notifications/sending-notifications-custom/
---

# Send notifications with FCM and APNs

Communicate directly with FCM and APNs for finer-grained control. The `expo-notifications` API is push-service agnostic and does not lock you into Expo Application Services.

## Signature / Usage

Obtain the native device token instead of the `ExpoPushToken`:

```diff
import * as Notifications from 'expo-notifications';
  // ...
- const token = (await Notifications.getExpoPushTokenAsync()).data;
+ const token = (await Notifications.getDevicePushTokenAsync()).data;
  // send token to your server
```

### FCMv1 server

Access token (Node, adapted from Firebase documentation):

```ts
import { JWT } from 'google-auth-library';

function getAccessTokenAsync(
  key: string // Contents of your FCM private key file
) {
  return new Promise(function (resolve, reject) {
    const jwtClient = new JWT(
      key.client_email,
      null,
      key.private_key,
      ['https://www.googleapis.com/auth/cloud-platform'],
      null
    );
    jwtClient.authorize(function (err, tokens) {
      if (err) {
        reject(err);
        return;
      }
      resolve(tokens.access_token);
    });
  });
}
```

Send:

```ts
// FCM_SERVER_KEY: Environment variable with the path to your FCM private key file
// FCM_PROJECT_NAME: Your Firebase project name
// FCM_DEVICE_TOKEN: The client's device token (see above in this document)

async function sendFCMv1Notification() {
  const key = require(process.env.FCM_SERVER_KEY);
  const firebaseAccessToken = await getAccessTokenAsync(key);
  const fcmToken = process.env.FCM_DEVICE_TOKEN;

  const messageBody = {
    message: {
      token: fcmToken,
      data: {
        channelId: 'default',
        message: 'Testing',
        title: `This is an FCM notification message`,
        body: JSON.stringify({ title: 'bodyTitle', body: 'bodyBody' }),
        scopeKey: '@yourExpoUsername/yourProjectSlug',
        experienceId: '@yourExpoUsername/yourProjectSlug',
      },
    },
  };

  const response = await fetch(
    `https://fcm.googleapis.com/v1/projects/${process.env.FCM_PROJECT_NAME}/messages:send`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${firebaseAccessToken}`,
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageBody),
    }
  );

  const readResponse = (response: Response) => response.json();
  const json = await readResponse(response);

  console.log(`Response JSON: ${JSON.stringify(json, null, 2)}`);
}
```

### APNs server

Client entitlement with CNG (recommended: add the `expo-notifications` plugin; otherwise add `aps-environment` manually):

```json
{
  "expo": {
    "ios": {
      "entitlements": {
        "aps-environment": "development"
      }
    }
  }
}
```

Authorization token (JWT from the `.p8` APN key, its Key ID, and your Apple Team ID):

```js
const jwt = require("jsonwebtoken");
const authorizationToken = jwt.sign(
  {
    iss: "YOUR-APPLE-TEAM-ID"
    iat: Math.round(new Date().getTime() / 1000),
  },
  fs.readFileSync("./path/to/appName_apns_key.p8", "utf8"),
  {
    header: {
      alg: "ES256",
      kid: "YOUR-P8-KEY-ID",
    },
  }
);
```

HTTP/2 request:

```js
const http2 = require('http2');

const client = http2.connect(
  IS_PRODUCTION ? 'https://api.push.apple.com' : 'https://api.sandbox.push.apple.com'
);

const request = client.request({
  ':method': 'POST',
  ':scheme': 'https',
  'apns-topic': 'YOUR-BUNDLE-IDENTIFIER',
  ':path': '/3/device/' + nativeDeviceToken, // This is the native device token you grabbed client-side
  authorization: `bearer ${authorizationToken}`, // This is the JSON web token generated in the "Authorization" step
});
request.setEncoding('utf8');

request.write(
  JSON.stringify({
    aps: {
      alert: {
        title: "📧 You've got mail!",
        body: 'Hello world! 🌐',
      },
    },
    experienceId: '@yourExpoUsername/yourProjectSlug', // Required only when testing in legacy Expo Go (in SDK 52 and earlier)
    scopeKey: '@yourExpoUsername/yourProjectSlug', // Required only when testing in legacy Expo Go (in SDK 52 and earlier)
  })
);
request.end();
```

## Notes

- The guide is not a comprehensive FCM / APNs resource; follow the official Firebase and Apple documentation for the latest instructions.
- FCM: before sending, configure FCM (see the FCM V1 credentials page) and obtain the `FCM-SERVER-KEY`; with this path, use the key directly on your server instead of uploading it to Expo. FCM requires an OAuth 2.0 access token; the Google Auth Library example is for testing a single notification. Unlike the legacy protocol, the endpoint includes the Firebase project name. FCM also provides server-side libraries in several languages as an alternative to raw `fetch`.
- `experienceId` and `scopeKey` apply only when using Expo Go; from SDK 53, push notification support is removed from Expo Go. See `FirebaseRemoteMessage` in the Notifications API for the Android-supported fields.
- APNs: receiving push notifications only works if the iOS app has the APNs entitlement. Without CNG, add the push notification entitlement in Xcode. For apps upgrading from SDK 51 and earlier, the docs refer to an expo.fyi document (`apns-entitlement-sdk-51`).
- APNs endpoints: `api.sandbox.push.apple.com` in development, `api.push.apple.com` in production. The example is minimal with no error handling or connection pooling; a `sendNotificationToAPNS` example exists in the expo/expo repository under `docs/public/static/examples/`. `node-apn` is mentioned as a library that wraps this functionality.
- The JWT snippet is verbatim from the source and is missing a comma after the `iss` value; add one when using it.
- Page modificationDate: July 28, 2026 (unversioned guide, fetched 2026-10-17).
- Distance line: FCM HTTP v1 and APNs provider API semantics are covered by `android-platform-core` and `apple-app-services`.

## Related

- [Send notifications with the Expo Push Service](./sending-notifications.md)
- [Obtain Google Service Account Keys using FCM V1](./fcm-credentials.md)
- [Notifications](./notifications.md)
