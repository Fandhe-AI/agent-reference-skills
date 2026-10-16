# Connected Experiences on Windows

Overview/hub page for the Windows platform contracts that let an app participate in three high-value moments: sharing content, being reached as a person, and continuing an activity on another device. By publishing structured intent — a share target, a contact, or an activity context — an app appears in the Share Sheet, the People Widget, Windows Search, and the taskbar Resume badge, without building any of that UI itself.

## Signature / Usage

```text
The three pillars of Connected Experiences:
1. Windows Share - send/receive content via the Share Sheet.
2. People on Windows - donate contacts so they appear in the Share Sheet suggestions row / People Widget.
3. Windows Resume - publish activity context so a task can be continued on another device via the taskbar Resume badge.
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Windows Share | contract | Send content via `DataTransferManager`/`IDataTransferManagerInterop`; receive content by registering as a Share Target. |
| People on Windows | contract | Donate app contacts via `UserDataAccount`/`ContactStore` so they surface as Share Sheet suggestions and in the People Widget. |
| Windows Resume | contract | Publish activity context via WNS raw notifications so a task can be resumed on the user's Windows PC through the taskbar Resume badge; a Limited Access Feature requiring Microsoft approval. |

## Notes

- This overview covers all three Connected Experiences pillars (Share, People, Resume), not Share alone.
- This page is intentionally thin — it is the TOC parent/hub for [share-sheet-send](./share-sheet-send.md), [share-sheet-receive](./share-sheet-receive.md), [cross-device-people-api](./cross-device-people-api.md), and [cross-device-resume-overview](./cross-device-resume-overview.md), which carry the actual implementation detail.

- The current Windows apps develop toc also lists Phone Link notifications as a Connected Experiences entry next to Windows Share, People and Resume; see [phone-link-notifications](./phone-link-notifications.md). The Android-only "Resume with promoted install" guide is covered in [cross-device-resume-promoted-install](./cross-device-resume-promoted-install.md).

## Related

- [Phone Link notifications](./phone-link-notifications.md)
- [Resume with promoted install](./cross-device-resume-promoted-install.md)
- [Share content from your app (Send)](./share-sheet-send.md)
- [Receive content in your app (Share Target)](./share-sheet-receive.md)
- [People on Windows (cross-device People API)](./cross-device-people-api.md)
- [Windows Resume (cross-device task continuity)](./cross-device-resume-overview.md)
