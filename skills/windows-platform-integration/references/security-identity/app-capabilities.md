# App capability declarations

To access protected APIs or resources (credential locker, camera, microphone, internet, enterprise authentication, and so on), a packaged Windows app must declare the corresponding capability in its package manifest (`Package.appxmanifest`).

## Signature / Usage

```xml
<Package ...>
  <Capabilities>
    <!-- General capability -->
    <Capability Name="internetClient" />
    <!-- Device capability -->
    <DeviceCapability Name="webcam" />
    <!-- Restricted capability (requires Store onboarding) -->
    <rescap:Capability Name="enterpriseAuthentication" />
  </Capabilities>
</Package>
```

## Options / Props

| Category | Example capabilities | Description |
|----------|----------------------|-------------|
| General | `internetClient`, `internetClientServer`, `privateNetworkClientServer` | Common-scenario capabilities most apps can declare without extra review. |
| Device | `webcam`, `microphone`, `location`, `bluetooth` | Access to peripheral/internal devices; declared with the `DeviceCapability` element. |
| Restricted | `enterpriseAuthentication`, `sharedUserCertificates`, `documentsLibrary`, `runFullTrust` | Highly-scoped capabilities subject to additional Microsoft Store onboarding policy and review. |

## Notes

- Security-relevant restricted capabilities: `enterpriseAuthentication` is required to use `DataProtectionProvider` with SID/SDDL (Active Directory security-principal) descriptors; `sharedUserCertificates` is required to access certificates enrolled by other apps or issued via the Windows Hello for Business / smart card path.
- When a user installs an app from the Microsoft Store, they are shown all declared capabilities; declaring restricted capabilities unnecessarily can delay Store certification.
- App capabilities apply mainly to packaged apps running in an AppContainer (all UWP apps, and some desktop apps); a small set (for example `runFullTrust`) also matters for Medium IL (non-AppContainer) packaged apps.

## Related

- [appcontainer](./appcontainer.md)
