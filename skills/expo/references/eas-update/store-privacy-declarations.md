---
source: https://docs.expo.dev/eas-update/store-privacy-declarations/
---

# App store privacy declarations for Expo Update

Learn what the expo-updates library sends off the device, what Expo stores, and how to declare it in the Google Play Data safety form and the App Store privacy details.

## Signature / Usage

Google Play requires every app with a store listing to complete the Data safety form in Play Console, and the App Store requires app privacy details in App Store Connect. Both cover every library in your app, so your answers include what `expo-updates` sends to Expo Update. You are responsible for the accuracy of your declarations; combine this guide with the data practices of the rest of your app before you submit either form.

When your app checks for an update or downloads an asset, `expo-updates` sends an HTTPS request to Expo Update with these headers:

| Header | What it contains |
| --- | --- |
| `EAS-Client-ID` | The Expo Services client ID, a random identifier for one installation of your app. It is generated on the device and is not derived from a hardware or account identifier. |
| `Expo-Platform`, `Expo-Runtime-Version`, `Expo-Protocol-Version`, `Expo-API-Version`, `Expo-Updates-Environment` | Facts about the build and the updates protocol. |
| `Expo-Current-Update-ID`, `Expo-Embedded-Update-ID` | The IDs of the update that is running and the update embedded in the build. |
| `expo-channel-name` and other headers in `updates.requestHeaders` | The channel name from the **eas.json** build profile, and any other header you add to `updates.requestHeaders`. Your code can change them at runtime with `Updates.setUpdateRequestHeadersOverride()`. |
| `Expo-Extra-Params` | Values your app sets with `Updates.setExtraParamAsync()`. The library sends nothing here unless your code sets a value. |
| `expo-expect-signature` | Present when code signing is configured. |
| `Expo-Fatal-Error` | The text of the last error that stopped your app from launching, up to 1,024 characters. The library sends it once. |
| `Expo-Recent-Failed-Update-IDs` | The IDs of up to five updates that failed to launch on this device. Present after error recovery records a failed launch. No stack trace or error message is sent. |

Like every network request, the request also exposes the device's IP address to the server. The library does not add personal information such as a name, email address, or account ID, and does not read the device's location, contacts, or files; the requests carry such data only if your code puts it in an extra param, a request header, or an error message.

Expo Update stores the client ID and the IP address with each request record, including the failed update IDs when the request carries them. It uses them to count installations and failed installs per update for the deployments dashboard, to measure usage, and to decide which installations get an update during a rollout. The launch error text is kept only in raw request logs, which Expo deletes after three days. Expo does not derive a location, combine the data with data from other apps, use it for advertising, or share it with data brokers. Expo processes it on your behalf, as your service provider, under Expo's data processing agreement.

## Options / Props

### Google Play Data safety form

Data collection and security:

| Question | Answer |
| --- | --- |
| Does your app collect or share any of the required user data types? | Yes. The client ID is a device identifier, and the failed update IDs and the launch error text are crash information. |
| Is all of the user data collected by your app encrypted in transit? | Yes for Expo Update (the library sends every request over HTTPS). Answer for your whole app. |
| Do you provide a way for users to request that their data is deleted? | Google allows Yes when you give users a way to request deletion. The answer covers your whole app, so base it on your own deletion practices. |

Data types for Expo Update: **Device or other IDs** (the client ID) and **App info and performance > Crash logs** (the failed update IDs and the launch error text).

Data usage and handling:

| Question | Device or other IDs | Crash logs |
| --- | --- | --- |
| Is this data collected, shared, or both? | Collected | Collected |
| Is this data processed ephemerally? | No | No |
| Is this data required for your app, or can users choose whether it's collected? | Required | Required |
| Why is this user data collected? | App functionality, Analytics | Analytics |

The data is collected rather than shared because Expo acts as your service provider. It is required because `expo-updates` sends the client ID on every update request and error recovery runs in every release build; Google allows optional only when every user, in every region, can opt out.

### App Store privacy details

Answer **Yes, we collect data from this app**, then select these data types for Expo Update: **Identifiers > Device ID** (the client ID) and **Diagnostics > Crash Data** (the failed update IDs and the launch error text). All three count as collected under Apple's definition because Expo Update stores them beyond serving the request.

| Question | Device ID | Crash Data |
| --- | --- | --- |
| Purposes | App Functionality, Analytics | App Functionality |
| Is this data linked to the user's identity? | No | No |
| Do you or your third-party partners use this for tracking? | No | No |

The data is not linked to the user because the client ID is random and does not come from an account or hardware identifier, and Expo does not tie it to other datasets. If your app sends the client ID to your own backend alongside a user account, declare it as linked. The data is not used for tracking: Expo neither links it with other companies' data for advertising nor shares it with a data broker.

## Notes

- These answers assume you use Expo Update as your update server. If you host updates yourself (see standalone-service.md), the same headers go to your server, and you declare what your server stores instead.
- `expo-updates` does not ship a privacy manifest, so the Xcode privacy report for an archive does not list the data above. Add it to your answers from this page.
- If your app also includes `expo-observe`, add the declarations from the official App store privacy declarations for Expo Observe page (https://docs.expo.dev/eas/observe/reference/store-privacy-declarations/; not covered by this skill). Both libraries use the same client ID, so one Device or other IDs entry on Google Play and one Device ID entry on the App Store cover both; the same applies to the crash data entries.
- Source: https://docs.expo.dev/eas-update/store-privacy-declarations/ (docs/pages/eas-update/store-privacy-declarations.mdx at tag expo@58.0.25).

## Related

- [Code signing](./code-signing.md)
- [Error recovery](./error-recovery.md)
- [Using Expo Update without other Expo Services](./standalone-service.md)
- [Rollouts](./rollouts.md)
