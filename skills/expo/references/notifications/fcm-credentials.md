---
source: https://docs.expo.dev/push-notifications/fcm-credentials/
---

# Obtain Google Service Account Keys using FCM V1

How to create or reuse a Google Service Account Key and upload it to EAS so Expo Push Notifications can send Android notifications through FCM V1.

## Signature / Usage

```json
{
  "expo": {
    "android": {
      "googleServicesFile": "./path/to/google-services.json"
    }
  }
}
```

### Create a new Google Service Account Key

1. Create a Firebase project for your app in the Firebase Console (skip if you already have one).
2. In the Firebase Console, open **Settings** > **Service accounts** for your project.
3. Click **Generate new private key**, then confirm with **Generate key**. Securely store the JSON file.
4. Upload the JSON file to EAS using EAS CLI or the EAS dashboard.

EAS CLI:

- Run `eas credentials`
- Select `Android` > `production` > `Google Service Account`
- Select `Manage your Google Service Account Key for Push Notifications (FCM V1)`
- Select `Set up a Google Service Account Key for Push Notifications (FCM V1)` > `Upload a new service account key`
- If the JSON file is in your project directory, EAS CLI detects it and prompts you to select it. Press Y to continue.

expo.dev:

- Under **Project settings**, click **Credentials** in the navigation menu
- For **Android**, click **Add application identifier** or select an existing **Application identifier**
- Under **Service credentials** > **FCM V1 service account key**, click **Add a service account key**
- Under **Upload new key**, upload your JSON credential and click **Save**

5. Download `google-services.json` from the Firebase Console, place it at the root of the project, and set `expo.android.googleServicesFile` in app.json (see snippet above).

### Use an existing Google Service Account Key

1. Open the IAM Admin page in Google Cloud Console. On the **Allow** tab, locate the **Principal** to modify and click **Edit principal**.
2. Click **Add another role**, select **Firebase Cloud Messaging API Admin**, and click **Save**.
3. Tell EAS which JSON credential to use (EAS CLI or dashboard, same steps as above); upload a new JSON file or select a previously uploaded file.
4. Configure `google-services.json` and `expo.android.googleServicesFile` as above (skip if already set up).

## Notes

- Add the service account JSON file to your version control ignore file (for example `.gitignore`); it contains sensitive data. `google-services.json` contains public-facing identifiers from your Firebase project and may be committed.
- If the API key in `google-services.json` (the `client.api_key.current_key` field) is restricted, check it in the Google Cloud Console. Under **API restrictions**, allow the **FCM Registration API** and the **Firebase Installations API**, or leave the key unrestricted. Under **Application restrictions**, use the SHA-1 from **Release** > **Setup** > **App Integrity** > **App signing key certificate** in the Google Play Console, not your upload key. A mismatch makes the Firebase Installations API return `403 PERMISSION_DENIED: Requests from this Android client application are blocked`, and the app never receives a push token.
- Page modificationDate: October 13, 2026 (unversioned guide, fetched 2026-10-17).
- Distance line: FCM / Android platform behavior itself is covered by `android-platform-core`.

## Related

- [Expo push notifications setup](./push-notifications-setup.md)
- [Send notifications with FCM and APNs](./sending-notifications-custom.md)
