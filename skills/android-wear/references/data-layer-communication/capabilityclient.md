# CapabilityClient

Discovers which nodes on the Wear network support a given app capability — a feature declared at build time in `res/values/wear.xml` or added dynamically at runtime — so you can find the right node to talk to (e.g. "the phone that has the companion app installed") instead of talking to any connected device.

## Signature / Usage

Declare a capability at build time:

```xml
<!-- res/values/wear.xml -->
<resources>
    <string-array name="android_wear_capabilities">
        <item>com.example.myapp.video_playback</item>
        <item>com.example.myapp.remote_control</item>
    </string-array>
</resources>
```

Query nodes that support it at runtime:

```kotlin
val capabilityClient = Wearable.getCapabilityClient(context)

capabilityClient.getCapability(
    "com.example.myapp.remote_control",
    CapabilityClient.FILTER_REACHABLE
).addOnSuccessListener { capabilityInfo ->
    val capableNodes: Set<Node> = capabilityInfo.nodes
    if (capableNodes.isEmpty()) {
        showFeatureUnavailable()
    } else {
        enableRemoteControls(capableNodes)
    }
}
```

Listening for capability changes:

```kotlin
private val capabilityListener = CapabilityClient.OnCapabilityChangedListener { capabilityInfo ->
    val nodes: Set<Node> = capabilityInfo.nodes
}

capabilityClient.addListener(capabilityListener, "com.example.myapp.remote_control")
capabilityClient.removeListener(capabilityListener)
```

## Options / Props

| Member | Type | Description |
| --- | --- | --- |
| `getCapability(capability: String, filter: Int)` | `Task<CapabilityInfo>` | Nodes advertising the given capability. |
| `getAllCapabilities(filter: Int)` | `Task<Map<String, CapabilityInfo>>` | All capabilities known for the network, keyed by capability name. |
| `addLocalCapability(capability: String)` | `Task<Void>` | Advertises a capability for the local node at runtime, without a manifest declaration. |
| `addListener(listener, capability)` / `removeListener(listener)` | `Task<Void>` | Registers/unregisters an `OnCapabilityChangedListener`. |
| `CapabilityClient.FILTER_REACHABLE` | `Int` | Include nodes reachable via cloud relay as well as direct connection. |
| `CapabilityClient.FILTER_ALL` | `Int` | Include every known node regardless of reachability. |

## Notes

- Use `getAllCapabilities(FILTER_ALL)` returning an empty map as a signal that the watch is running standalone (no companion phone app connected).
- Reconnection after inactivity or the handheld entering Doze can take up to ~4 minutes; design capability checks to tolerate that latency.
- To find any Android device regardless of installed app, use `NodeClient` instead.

## Related

- [NodeClient](./nodeclient.md)
- [RemoteActivityHelper](./remoteactivityhelper.md)
