---
source: https://docs.expo.dev/eas/webhooks/
---

# Webhooks

EAS can alert you via a webhook as soon as your build or submission completes. Webhooks are configured per project.

## Signature / Usage

Run in the project directory:

```sh
eas webhook:create
```

You are prompted for the event type (unless `--event BUILD|SUBMIT` is given), the webhook URL (or `--url`), and a signing secret (or `--secret`). Manage webhooks:

```sh
eas webhook:update --id WEBHOOK_ID
eas webhook:list
eas webhook:delete
```

Example verification server:

```js
const crypto = require('crypto');
const express = require('express');
const bodyParser = require('body-parser');
const safeCompare = require('safe-compare');

const app = express();
app.use(bodyParser.text({ type: '*/*' }));
app.post('/webhook', (req, res) => {
  const expoSignature = req.headers['expo-signature'];
  // process.env.SECRET_WEBHOOK_KEY has to match SECRET value set with `eas webhook:create` command
  const hmac = crypto.createHmac('sha1', process.env.SECRET_WEBHOOK_KEY);
  hmac.update(req.body);
  const hash = `sha1=${hmac.digest('hex')}`;
  if (!safeCompare(expoSignature, hash)) {
    res.status(500).send("Signatures didn't match!");
  } else {
    // Do something here.  For example, send a notification to Slack!
    // console.log(req.body);
    res.send('OK!');
  }
});
app.listen(8080, () => console.log('Listening on port 8080'));
```

Adapted (not in the official docs): abridged from the official build webhook payload example; see the Options / Props table for the full field list.

```json
{
  "id": "147a3212-49fd-446f-b4e3-a6519acf264a",
  "accountName": "dsokal",
  "projectName": "example",
  "buildDetailsPageUrl": "https://expo.dev/accounts/dsokal/projects/example/builds/147a3212-49fd-446f-b4e3-a6519acf264a",
  "platform": "android", // or "ios"
  "status": "errored", // or: "finished", "canceled"
  "artifacts": {
    "buildUrl": "https://expo.dev/artifacts/eas/wyodu9tua2ZuKKiaJ1Nbkn.aab" // available for successful builds
  },
  "metadata": {
    "appVersion": "1.0.2",
    "buildProfile": "production",
    "distribution": "store",
    "channel": "default" // available for EAS Update
  },
  "error": { "message": "Unknown error. Please see logs.", "errorCode": "UNKNOWN_ERROR" }, // available for failed builds
  "priority": "high" // or: "normal", "low"
}
```

## Options / Props

### Payload fields

| Payload | Field | Description |
| --- | --- | --- |
| Build | `id`, `accountName`, `projectName`, `buildDetailsPageUrl`, `appId`, `initiatingUserId` | Identification of the build, project, and initiator |
| Build | `parentBuildId` | Available for build retries |
| Build | `cancelingUserId` | Available for canceled builds |
| Build | `platform` | `android` or `ios` |
| Build | `status` | `errored`, `finished`, or `canceled` |
| Build | `artifacts.buildUrl`, `artifacts.logsS3KeyPrefix` | `buildUrl` is available for successful builds |
| Build | `metadata` | `appName`, `username`, `workflow`, `appVersion`, `appBuildVersion`, `cliVersion`, `sdkVersion`, `buildProfile`, `distribution`, `appIdentifier`, `gitCommitHash`, `gitCommitMessage`, `runtimeVersion`, `channel`, `releaseChannel`, `reactNativeVersion`, `trackingContext`, `credentialsSource`, `isGitWorkingTreeDirty`, `message`, `runFromCI` |
| Build | `metrics` | `memory`, build timestamps, disk and network byte totals, `cpuActiveMilliseconds` |
| Build | `error` | `message` and `errorCode`; available for failed builds |
| Build | timestamps and misc | `createdAt`, `enqueuedAt`, `provisioningStartedAt`, `workerStartedAt`, `completedAt`, `updatedAt`, `expirationDate`, `priority`, `resourceClass`, `actualResourceClass`, `maxRetryTimeMinutes` |
| Submit | `id`, `accountName`, `projectName`, `submissionDetailsPageUrl`, `appId`, `archiveUrl`, `initiatingUserId` | Identification of the submission |
| Submit | `parentSubmissionId` | Available for submission retries |
| Submit | `cancelingUserId` | Available for canceled submissions |
| Submit | `turtleBuildId` | Available when submitting a build from EAS |
| Submit | `platform`, `status` | `android` / `ios`; `errored` / `finished` / `canceled` |
| Submit | `submissionInfo` | `error` (`message`, `errorCode`) and `logsUrl`; available for failed submissions |
| Submit | `createdAt`, `updatedAt`, `completedAt`, `maxRetryTimeMinutes` | Timestamps and max retry time |

## Notes

- EAS calls the webhook with an HTTP POST and a JSON body. If the webhook responds with a status code outside 200-399, delivery is retried a few more times with exponential back-off.
- The signing secret must be at least 16 characters long. EAS sends an `expo-signature` HTTP header: a hex-encoded HMAC-SHA1 digest of the request body using the secret as the HMAC key, prefixed `sha1=` in the verification example.
- To test locally, forward `localhost:8080` with a tunnel service such as ngrok.
- Source modificationDate: January 15, 2025 (fetched 2026-10-17). Examples in the official payloads contain 2021 dates and old SDK versions; treat them as shape illustrations only.

## Related

- [EAS CLI reference](./eas-cli.md)
- [Submit to the Apple App Store with EAS Submit](./submit-ios.md)
