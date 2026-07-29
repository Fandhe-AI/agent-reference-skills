# Smart cards

`Windows.Devices.SmartCards` gets info about smart card readers/cards, transmits APDU commands over a card connection, provisions Trusted Platform Module (TPM) virtual smart cards, and — on supported devices — emulates a smart card toward an external NFC reader (host card emulation, HCE).

## Signature / Usage

```csharp
// Enumerate readers and the cards currently inserted in them
string selector = SmartCardReader.GetDeviceSelector();
DeviceInformationCollection devices = await DeviceInformation.FindAllAsync(selector);

foreach (DeviceInformation device in devices)
{
    SmartCardReader reader = await SmartCardReader.FromIdAsync(device.Id);
    reader.CardAdded += (sender, args) => { /* a card was inserted */ };

    IReadOnlyList<SmartCard> cards = await reader.FindAllCardsAsync();
    foreach (SmartCard card in cards)
    {
        // Open a connection and transmit an APDU command
        SmartCardConnection connection = await card.ConnectAsync();
        IBuffer response = await connection.TransmitAsync(apduCommandBuffer);
    }
}

// Host card emulation: expose this device as a smart card to an external reader
if (SmartCardEmulator.IsSupported())
{
    SmartCardEmulator emulator = await SmartCardEmulator.GetDefaultAsync();
    bool hceSupported = emulator.IsHostCardEmulationSupported();
    emulator.ApduReceived += (sender, args) => { /* respond to the incoming APDU */ };
}
```

## Options / Props

| Concept | API | Description |
|---------|-----|-------------|
| Reader/card enumeration | `SmartCardReader.GetDeviceSelector()`, `SmartCardReader.FromIdAsync`, `SmartCardReader.FindAllCardsAsync` | Finds attached readers and the `SmartCard` objects currently inserted in them. |
| Card insertion/removal | `SmartCardReader.CardAdded`, `SmartCardReader.CardRemoved` events | Notifies the app when a physical card is inserted into or removed from a reader. |
| APDU transmission | `SmartCardConnection.TransmitAsync(IBuffer)` | Sends an Application Protocol Data Unit (APDU) command to the connected card and returns its response. |
| Virtual smart card provisioning | `SmartCardProvisioning.RequestVirtualSmartCardCreationAsync`, `RequestVirtualSmartCardDeletionAsync` | Creates/deletes a TPM-backed virtual smart card (friendly name, admin key, `SmartCardPinPolicy`). Requires the calling user to be a local administrator. |
| Authentication challenge | `SmartCardProvisioning.GetChallengeContextAsync`, `SmartCardChallengeContext.VerifyResponseAsync` | Round-trips an admin-key challenge/response between the card and the issuing service/management tool. |
| PIN management | `SmartCardProvisioning.RequestPinChangeAsync`, `RequestPinResetAsync` | Prompts the built-in UI to change a PIN, or authenticates a challenge to reset a forgotten PIN via `SmartCardPinResetHandler`/`SmartCardPinResetDeferral`. |
| Host card emulation (HCE) | `SmartCardEmulator.IsSupported`, `GetDefaultAsync`, `IsHostCardEmulationSupported`, `RegisterAppletIdGroupAsync`, `Start`, `ApduReceived` event | Lets the device itself act as the smart card presented to an external NFC reader; `Start()` must run from a background task, and applet ID groups (`SmartCardAppletIdGroup`) are registered so the OS routes matching APDUs to the app. |

## Notes

- Namespace: `Windows.Devices.SmartCards`. Usable from WinUI as well as other desktop apps (WPF, WinForms) via WinRT interop, but package identity (MSIX) is required at runtime.
- Requires the **Shared User Certificates** (`sharedUserCertificates`) app capability declared in the package manifest before the app can authenticate users with physical or virtual smart cards — see app capability declarations.
- Store the admin key used for challenge/response and virtual-card provisioning behind `DataProtectionProvider` or `PasswordVault`, not in plaintext `ApplicationData.LocalSettings`.
- `SmartCardEmulator` (host card emulation) targets devices with an NFC controller capable of card-emulation mode; call `SmartCardEmulator.IsSupported()` / `IsHostCardEmulationSupported()` before relying on it, as most desktop PCs do not expose this capability.

## Related

- [Certificate](./certificate.md)
- [DataProtectionProvider](./data-protection-provider.md)
- [PasswordVault](./password-vault.md)
- [App capability declarations](./app-capabilities.md)
