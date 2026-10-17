---
source: https://docs.expo.dev/build-reference/ios-capabilities/
---

# iOS capabilities

Learn about built-in iOS capabilities supported in EAS Build and how to enable or disable them.

## Signature / Usage

EAS Build automatically synchronizes capabilities on the Apple Developer Console with your local entitlements configuration when you run `eas build`. Capabilities are web services provided by Apple. In an Expo app, entitlements are read from the introspected app config (`ios.entitlements`). Inspect it with:

```sh
npx expo config --type introspect
```

Disable the feature with:

```sh
EXPO_NO_CAPABILITY_SYNC=1 eas build
```

Debug the sync with `EXPO_DEBUG=1 eas build`.

Broadcast push notifications (an option inside Push Notifications, no entitlement of its own):

```json
{
  "expo": {
    "ios": {
      "usesBroadcastPushNotifications": true
    }
  }
}
```

## Options / Props

Supported capabilities (EAS Build only enables capabilities it has built-in support for; unsupported entitlements must be enabled manually in Apple Developer Console):

| Support | Capability | Entitlement string |
| --- | --- | --- |
| ✓ | Access Wi-Fi Information | `com.apple.developer.networking.wifi-info` |
| ✓ | App Attest | `com.apple.developer.devicecheck.appattest-environment` |
| ✓ | App Groups | `com.apple.security.application-groups` |
| ✓ | Apple Pay Later Merchandising | `com.apple.developer.pay-later-merchandising` |
| ✓ | Apple Pay Payment Processing | `com.apple.developer.in-app-payments` |
| ✓ | Associated Domains | `com.apple.developer.associated-domains` |
| ✓ | AutoFill Credential Provider | `com.apple.developer.authentication-services.autofill-credential-provider` |
| ✓ | ClassKit | `com.apple.developer.ClassKit-environment` |
| ✓ | Communicates with Drivers | `com.apple.developer.driverkit.communicates-with-drivers` |
| ✓ | Communication Notifications | `com.apple.developer.usernotifications.communication` |
| ✓ | Custom Network Protocol | `com.apple.developer.networking.custom-protocol` |
| ✓ | Data Protection | `com.apple.developer.default-data-protection` |
| ✓ | DriverKit Allow Third Party UserClients | `com.apple.developer.driverkit.allow-third-party-userclients` |
| ✓ | DriverKit Family Audio (development) | `com.apple.developer.driverkit.family.audio` |
| ✓ | DriverKit Family HID Device (development) | `com.apple.developer.driverkit.family.hid.device` |
| ✓ | DriverKit Family HID EventService (development) | `com.apple.developer.driverkit.family.hid.eventservice` |
| ✓ | DriverKit Family Networking (development) | `com.apple.developer.driverkit.family.networking` |
| ✓ | DriverKit Family SCSIController (development) | `com.apple.developer.driverkit.family.scsicontroller` |
| ✓ | DriverKit Family Serial (development) | `com.apple.developer.driverkit.family.serial` |
| ✓ | DriverKit Transport HID (development) | `com.apple.developer.driverkit.transport.hid` |
| ✓ | DriverKit USB Transport (development) | `com.apple.developer.driverkit.transport.usb` |
| ✓ | DriverKit for Development | `com.apple.developer.driverkit` |
| ✓ | Extended Virtual Address Space | `com.apple.developer.kernel.extended-virtual-addressing` |
| ✓ | Family Controls | `com.apple.developer.family-controls` |
| ✓ | FileProvider TestingMode | `com.apple.developer.fileprovider.testing-mode` |
| ✓ | Fonts | `com.apple.developer.user-fonts` |
| ✓ | Group Activities | `com.apple.developer.group-session` |
| ✓ | HealthKit | `com.apple.developer.healthkit` |
| ✓ | HomeKit | `com.apple.developer.homekit` |
| ✓ | Hotspot | `com.apple.developer.networking.HotspotConfiguration` |
| ✓ | Increased Memory Limit | `com.apple.developer.kernel.increased-memory-limit` |
| ✓ | Inter-App Audio | `inter-app-audio` |
| ✓ | Journaling Suggestions | `com.apple.developer.journal.allow` |
| ✓ | Low Latency HLS | `com.apple.developer.low-latency-streaming` |
| ✓ | MDM Managed Associated Domains | `com.apple.developer.associated-domains.mdm-managed` |
| ✓ | Managed App Installation UI | `com.apple.developer.managed-app-distribution.install-ui` |
| ✓ | Maps | `com.apple.developer.maps` |
| ✓ | Matter Allow Setup Payload | `com.apple.developer.matter.allow-setup-payload` |
| ✓ | Media Device Discovery | `com.apple.developer.media-device-discovery-extension` |
| ✓ | Messages Collaboration | `com.apple.developer.shared-with-you.collaboration` |
| ✓ | Multipath | `com.apple.developer.networking.multipath` |
| ✓ | NFC Tag Reading | `com.apple.developer.nfc.readersession.formats` |
| ✓ | Network Extensions | `com.apple.developer.networking.networkextension` |
| ✓ | 5G Network Slicing | `com.apple.developer.networking.slicing.appcategory` or `com.apple.developer.networking.slicing.trafficcategory` |
| ✓ | On Demand Install Capable for App Clip Extensions | `com.apple.developer.on-demand-install-capable` |
| ✓ | Personal VPN | `com.apple.developer.networking.vpn.api` |
| ✓ | Push Notifications | `aps-environment` |
| ✓ | Push to Talk | `com.apple.developer.push-to-talk` |
| ✓ | Recalibrate Estimates | `com.apple.developer.healthkit.recalibrate-estimates` |
| ✓ | Sensitive Content Analysis | `com.apple.developer.sensitivecontentanalysis.client` |
| ✓ | Shallow Depth and Pressure | `com.apple.developer.submerged-shallow-depth-and-pressure` |
| ✓ | Shared with You | `com.apple.developer.shared-with-you` |
| ✓ | Sign In with Apple | `com.apple.developer.applesignin` |
| ✓ | SiriKit | `com.apple.developer.siri` |
| ✓ | System Extension | `com.apple.developer.system-extension.install` |
| ✓ | Tap to Pay on iPhone | `com.apple.developer.proximity-reader.payment.acceptance` |
| ✓ | Tap to Present ID on iPhone (Display Only) | `com.apple.developer.proximity-reader.identity.display` |
| ✓ | TV Services | `com.apple.developer.user-management` |
| ✓ | Time Sensitive Notifications | `com.apple.developer.usernotifications.time-sensitive` |
| ✓ | Wallet | `com.apple.developer.pass-type-identifiers` |
| ✓ | WeatherKit | `com.apple.developer.weatherkit` |
| ✓ | Wireless Accessory Configuration | `com.apple.external-accessory.wireless-configuration` |
| ✓ | iCloud | `com.apple.developer.icloud-container-identifiers` |
| ✗ | HLS Interstitial Previews | Unknown |

## Notes

- In an existing React Native project, entitlements are read from **ios/\*\*/\*.entitlements**.
- Enabling: if a supported entitlement is present, `eas build` enables it on Apple Developer Console (skipped if already enabled). Disabling: if a capability is enabled remotely but missing from the native entitlements file, `eas build` disables it automatically.
- Broadcast: EAS Build sets the Broadcast option only when it enables the Push Notifications capability, so entitlements also need `aps-environment`. Apple limits broadcast push notifications to Live Activities on iOS 18 and later. If Broadcast is enabled only in Apple Developer Console, the next `eas build` resets Push Notifications to defaults and turns Broadcast off; APNs then rejects channel management requests with a `FeatureNotEnabled` error.
- Merchant IDs, App Groups, and CloudKit Containers can be automatically registered and assigned; these require Apple cookies authentication (running locally) because the official App Store Connect API does not support these operations.
- Manual setup (Xcode or Apple Developer Console) requires regenerating existing provisioning profiles. A missing capability produces errors such as `Provisioning profile "..." doesn't support the Associated Domains capability.`
- Source modificationDate: July 28, 2026 (fetched 2026-10-17).

## Related

- [iOS App Extensions](./app-extensions.md)
- [App credentials](./app-credentials.md)
