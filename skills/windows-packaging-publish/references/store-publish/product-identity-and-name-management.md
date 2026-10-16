# Product Identity Details and App Name Reservations

Partner Center "Product management" and "Services" sections: the identity values to put in the package manifest, the Store listing link, reserved app names, and related services.

## Signature / Usage

Manifest identity values taken from Product identity (Visual Studio fills them automatically when signed in with the Microsoft account associated with the developer account):

```text
Package/Identity/Name
Package/Identity/Publisher
Package/Properties/PublisherDisplayName
```

Store listing link:

```text
https://apps.microsoft.com/detail/<your app's Store ID>
```

## Options / Props

| Item | Description |
|---|---|
| Package Family Name (PFN) | Used with certain Windows APIs; not in the manifest |
| Package SID | Needed to send WNS notifications |
| Store ID | Shown on Product identity; used to generate Store badges or identify the app |
| Product identity | Identity details and listing URL(s) |
| Manage app names | View, reserve and delete reserved names |
| Manage packages | Published packages: name, version, architecture; **Details** shows language, capabilities, file sizes; OEM-permission developers can generate preinstall packages |
| WNS/MPNS | Notification options; for UWP apps the Partner Center Notifications feature can target a customer group (Windows 10/11) |
| Services: Xbox Live | Enable the Xbox Live Creators Program for games |
| Services: Maps | Request a maps authentication key at the Bing Maps Dev Center |
| Services: Product collections and purchases | Enter Microsoft Entra ID client IDs for the Store collection / purchase APIs (may take up to 16 hours) |
| Services: Administrator consent | Enter Entra ID Client ID so tenant administrators can grant consent |

## Notes

- Name, Publisher and PublisherDisplayName together declare the package family; individual packages add architecture and version.
- Manage packages shows nothing until the app has been published.
- Reserving names: Manage app names -> text box in "Reserve more names" -> **Check availability** -> **Reserve product name**. Multiple names can be reserved (e.g. per-language names). The page described is the MSIX variant.
- Deleting a reserved name releases it immediately for anyone else to reserve; an app must keep at least one reserved name.
- Rename a published app: reserve the new name, create a new submission, select the name from the **Product name** dropdown on each language's Store listing page; update description mentions; update packages / listings for every language. Delete older names after publishing.
- Each app shows in Partner Center under the first name reserved; delete the original name to display the new one.
- On Windows devices the Store listing link also launches the Store app; the Store protocol link (`ms-windows-store://pdp/?ProductId=...`) opens the Store directly from within an app.

## Related

- [Reserve App Name](./reserve-app-name.md)
- [Store Web Installer and Store Badges / Links](./store-web-installer.md)
- [Store Listings](./store-listings.md)
