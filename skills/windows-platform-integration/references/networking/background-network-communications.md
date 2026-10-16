# Network communications in the background (SocketActivityTrigger / ControlChannelTrigger)

Continue network communication while the app is not in the foreground, using background tasks with either the socket broker (`SocketActivityTrigger`) or control channel triggers.

## Signature / Usage

The snippets below are excerpts from the official guide and are not one continuous flow: the registration and transfer examples use a `StreamSocketListener`, while the background task example handles an already-connected `StreamSocket` (as in the SocketActivityStreamSocket sample). See Notes.

Register a `SocketActivityTrigger` task, then enable ownership transfer before binding the socket:

```csharp
var socketTaskBuilder = new BackgroundTaskBuilder();
socketTaskBuilder.Name = _backgroundTaskName;
socketTaskBuilder.TaskEntryPoint = _backgroundTaskEntryPoint;
var trigger = new SocketActivityTrigger();
socketTaskBuilder.SetTrigger(trigger);
_task = socketTaskBuilder.Register();

_tcpListener = new StreamSocketListener();
// EnableTransferOwnership() must be called before bind so tcpip keeps required
// state for the socket to enable connected standby action.
_tcpListener.EnableTransferOwnership(_task.TaskId, SocketActivityConnectedStandbyAction.Wake);
_tcpListener.ConnectionReceived += OnConnectionReceived;
await _tcpListener.BindServiceNameAsync("my-service-name");
```

Transfer the socket to the broker when the app suspends:

```csharp
private async void TransferOwnership(StreamSocketListener tcpListener)
{
    await tcpListener.CancelIOAsync();

    var dataWriter = new DataWriter();
    ++_transferOwnershipCount;
    dataWriter.WriteInt32(_transferOwnershipCount);
    var context = new SocketActivityContext(dataWriter.DetachBuffer());
    tcpListener.TransferOwnership(_socketId, context);
}
```

Handle activation in the background task, returning ownership to the broker afterwards (this excerpt assumes a connected `StreamSocket` was transferred, not a listener):

```csharp
var deferral = taskInstance.GetDeferral();
var details = taskInstance.TriggerDetails as SocketActivityTriggerDetails;
var socketInformation = details.SocketInformation;
switch (details.Reason)
{
    case SocketActivityTriggerReason.SocketActivity:
        var socket = socketInformation.StreamSocket;
        DataReader reader = new DataReader(socket.InputStream);
        reader.InputStreamOptions = InputStreamOptions.Partial;
        await reader.LoadAsync(250);
        var dataString = reader.ReadString(reader.UnconsumedBufferLength);
        ShowToast(dataString);
        socket.TransferOwnership(socketInformation.Id); /* Important! */
        break;
}
deferral.Complete();
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `SocketActivityTrigger` | trigger | Activates the background task when a packet arrives; for short-lived tasks. The task should terminate after work to save power. |
| `ControlChannelTrigger` | trigger | Activates the background task when a packet arrives; for long-lived tasks. |
| `InternetAvailable` | condition | Added via `BackgroundTaskBuilder.AddCondition`; delays the task until the network stack is running. Saves power; not real-time activation. |
| `BackgroundTaskBuilder.IsNetworkRequested` | property | Set regardless of trigger to keep the network up while the task runs, even in Connected Standby. Without it the task cannot access the network in Connected Standby. |
| `SocketActivityTriggerReason.SocketActivity` | reason | Traffic arrived; read data, then transfer ownership back. |
| `SocketActivityTriggerReason.KeepAliveTimerExpired` | reason | Send data to keep the socket alive and restart the timer, then transfer ownership back. |
| `SocketActivityTriggerReason.SocketClosed` | reason | Re-establish the socket (call `EnableTransferOwnership`, connect), then transfer ownership of the new socket to the broker. |
| `TransferOwnership` | method | One overload family each on `DatagramSocket`, `StreamSocket`, `StreamSocketListener`; call the one matching the socket type. |

## Notes

- Use `SocketActivityTrigger` for `DatagramSocket`, `StreamSocket`, `StreamSocketListener`. CCT can be used for `StreamSocket` but uses more resources and might not work in Connected Standby.
- WebSockets, `IXMLHTTPRequest2`, `System.Net.Http.HttpClient` and `Windows.Web.Http.HttpClient` require `ControlChannelTrigger`.
- Setup is one-time at startup: create a trigger, register the task (`TaskEntryPoint`), enable the socket for the broker. Transfer ownership when the app moves to an inactive state (for example in `OnSuspending`). Always return ownership to the broker after processing, or no further activations occur.
- ControlChannelTrigger with WebSockets (Windows SDK 10.0.15063.0 and later): keep an outstanding receive posted at all times; register `WebSocketKeepAlive` (`Windows.Networking.Sockets.WebSocketKeepAlive`) as the `TaskEntryPoint` for the `KeepAliveTrigger`, both in source and in the package manifest (`<Task Type="controlChannel" />`).
- With `StreamWebSocket` and CCT, use the raw async pattern for reads (not `await` / Tasks); post another read before returning from the completion callback. `DataReader.LoadAsync` must not be used directly on the transport; pass the `IBuffer` from `InputStream.ReadAsync` to `DataReader.FromBuffer`. `MessageWebSocket` receive requests are unaffected.
- With CCT, `ControlChannelTrigger` creation fails if the app is not on the lock screen. Request a slot with `ControlChannelTriggerResourceType.RequestHardwareSlot` and call `WaitForPushEnabled()`; expect `HardwareSlotAllocated` or `SoftwareSlotAllocated`.
- ControlChannelTrigger with HttpClient: SSL is not currently supported with the network trigger feature. The `HttpClient` cannot be passed to `UsingTransport`; create an `HttpRequestMessage` via `RtcRequestFactory.Create` and pass that. Use a Task for sends (not `await`), and only the blocking read of the whole response in `Run` is supported.
- ControlChannelTrigger with `IXMLHTTPRequest2`: the object lives for one request/response; create the CCT once and call `UsingTransport` repeatedly with a new `IXMLHTTPRequest2`, deleting the previous one. Make an initial test request first to settle certificates, proxy/server authentication and redirects.
- If the transferred socket was a `StreamSocketListener`, the task should check `SocketActivityInformation.SocketKind` (`SocketActivityKind`: `None`, `StreamSocketListener`, `DatagramSocket`, `StreamSocket`) and use `SocketActivityInformation.StreamSocketListener` to handle incoming connections. `SocketActivityInformation.StreamSocket` applies only when a connected `StreamSocket` was transferred.
- Official sample for the socket broker: SocketActivityStreamSocket in the Windows-universal-samples repository.

## Related

- [Networking basics](./networking-basics.md)
- [StreamSocketListener](./stream-socket-listener.md)
- [StreamSocket](./stream-socket.md)
- [DatagramSocket](./datagram-socket.md)
- [StreamWebSocket](./stream-web-socket.md)
- [MessageWebSocket](./message-web-socket.md)
- [Official docs: Network communications in the background](https://learn.microsoft.com/en-us/windows/apps/develop/networking/network-communications-in-the-background)
