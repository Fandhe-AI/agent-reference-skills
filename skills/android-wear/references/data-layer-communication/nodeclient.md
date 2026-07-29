# NodeClient

Identifies Android devices (nodes) connected on the Wear network, regardless of whether they have your app installed — use it to enumerate all reachable devices, then narrow to the ones that matter with `CapabilityClient` if you need app-specific feature support.

## Signature / Usage

```kotlin
import com.google.android.gms.wearable.Wearable

Wearable.getNodeClient(context).connectedNodes
    .addOnSuccessListener { nodes: List<Node> ->
        nodes.forEach { node -> /* node.id, node.displayName, node.isNearby */ }
    }

Wearable.getNodeClient(context).localNode
    .addOnSuccessListener { self: Node -> /* self.id */ }
```

Picking the best node to send a message or launch a remote activity on:

```kotlin
private fun findBestNode(nodes: Set<Node>): Node? =
    nodes.firstOrNull { it.isNearby } ?: nodes.firstOrNull()
```

## Options / Props

| Member | Type | Description |
| --- | --- | --- |
| `getConnectedNodes()` | `Task<List<Node>>` | All Android nodes currently connected on the network, app-agnostic. |
| `getLocalNode()` | `Task<Node>` | Information about the current device as a `Node`. |
| `Node.getId()` | `String` | Stable node identifier, used as the `nodeId` argument to `MessageClient`/`RemoteActivityHelper` calls. |
| `Node.isNearby()` | `Boolean` | True when directly reachable over Bluetooth rather than via a cloud relay. |

## Notes

- "Reachable" (online, possibly via cloud) and "nearby" (direct Bluetooth) are distinct — prefer nearby nodes for latency- and battery-sensitive calls.
- For discovering only nodes that support a particular app feature, use `CapabilityClient` instead — `NodeClient` has no notion of app capabilities.

## Related

- [CapabilityClient](./capabilityclient.md)
- [MessageClient](./messageclient.md)
