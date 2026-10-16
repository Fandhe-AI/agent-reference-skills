# Data Layer Communication

| Name | Description | Path |
|------|-------------|------|
| Asset | Attaches large binary payloads (images, media files) to a `DataItem` beyond the 100 KB inline limit; content-addressed and deduplicated. | [assets.md](./assets.md) |
| CapabilityClient | Discovers which nodes on the Wear network support a given app capability (declared in `res/values/wear.xml` or added at runtime). | [capabilityclient.md](./capabilityclient.md) |
| ChannelClient | Client for the Wearable Channel API (`ChannelClient`, extends `GoogleApi<Wearable.WearableOptions>`) to send and receive data streams between wearable nodes. | [channelclient.md](./channelclient.md) |
| Cloud backup and restore on Wear OS | On Wear OS 4 and higher, users back up a watch to the cloud and restore it onto a new Wear OS device, with Wear-specific conditions and size limits. | [cloud-backup-restore.md](./cloud-backup-restore.md) |
| Data Layer API overview (Wearable / WearableOptions / client comparison) | Wearable Data Layer API (part of Google Play services) for synchronizing and transferring data between a watch and a handheld; clients are obtained from `Wearable`. | [data-layer-overview.md](./data-layer-overview.md) |
| DataClient | Reads or writes persistent `DataItem` objects synchronized across phone and watch; buffered while disconnected, payload up to 100 KB. | [dataclient.md](./dataclient.md) |
| MessageClient | Sends one-way or request/response messages between connected nodes for RPC-style actions; best-effort with no persistence or retry. | [messageclient.md](./messageclient.md) |
| Direct network access on standalone devices (ConnectivityManager / FCM / WorkManager) | Standalone Wear OS apps access the network directly via standard Android networking, FCM, and WorkManager, not the Data Layer API. | [network-access.md](./network-access.md) |
| NodeClient | Identifies Android devices (nodes) connected on the Wear network regardless of app installation; narrow with `CapabilityClient` for feature support. | [nodeclient.md](./nodeclient.md) |
| OngoingActivity | Pairs a long-running foreground notification (workout, timer, navigation) with a one-tap surface on the watch face and in Recents. | [ongoingactivity.md](./ongoingactivity.md) |
| RemoteActivityHelper | Launches an `Intent` on a paired phone from a standalone Wear OS app, e.g. opening the Play Store to install a phone-side app. | [remoteactivityhelper.md](./remoteactivityhelper.md) |
| RemoteAuthClient | Hands off a PKCE (RFC 7636) OAuth flow to the paired phone, which completes sign-in in a browser and relays the response back to the watch. | [remoteauthclient.md](./remoteauthclient.md) |
| Transfer Wear OS data to a new mobile device (onNodeMigrated) | From Wear OS 4, Wear OS data transfers to a new mobile device; `WearableListenerService.onNodeMigrated()` is invoked on the mobile app. | [transfer-to-new-mobile.md](./transfer-to-new-mobile.md) |
| WearableListenerService | Base `Service` receiving Data Layer events (`onDataChanged`, `onMessageReceived`, `onCapabilityChanged`) in the background, bound on demand. | [wearablelistenerservice.md](./wearablelistenerservice.md) |
