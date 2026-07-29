# Windows MIDI Services (Windows.Devices.Midi2, MIDI 2.0)

Windows MIDI Services is Microsoft's current-generation, open-source MIDI stack for Windows — an in-box service/driver plus the `Windows.Devices.Midi2` WinRT API — adding MIDI 2.0 (Universal MIDI Packet / UMP, MIDI-CI) support alongside continued MIDI 1.0 byte-stream support. It is a separate SDK/namespace from the legacy `Windows.Devices.Midi` API and is not a drop-in replacement for it.

## Signature / Usage

```csharp
using Windows.Devices.Midi2;
using Windows.Devices.Midi2.Enumeration;
using Windows.Devices.Midi2.Utilities.Messages;

// Enumerate MIDI 2.0-capable endpoints
IReadOnlyList<MidiEndpointDeviceInformation> endpoints = MidiEndpointDeviceInformation.FindAll();

// A session groups one or more endpoint connections
MidiSession session = MidiSession.Create("My App Session");

MidiEndpointConnection connection = session.CreateEndpointConnection(endpoints[0].EndpointDeviceId);
connection.Open();

// Build and send a MIDI 2.0 Channel Voice message (Note On, group 0, channel 0)
MidiMessage64 noteOn = MidiMessageBuilder.BuildMidi2ChannelVoiceMessage(
    MidiClock.Now,
    new MidiGroup(0),
    Midi2ChannelVoiceMessageStatus.NoteOn,
    new MidiChannel(0),
    index: 60,          // note number
    data: 0xF800_0000); // velocity in the top 16 bits

connection.SendSingleMessagePacket(noteOn); // MidiMessage64 implements IMidiUniversalPacket

connection.MessageReceived += (sender, args) =>
{
    // args.GetMessagePacket() / args.FillWords(...) to read the received UMP
};

session.DisconnectEndpointConnection(connection.ConnectionId);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `MidiSession.Create(String)` | static method returning `MidiSession` | Creates a session (a named grouping of endpoint connections); there is no public constructor. |
| `MidiSession.CreateEndpointConnection(String)` | method returning `MidiEndpointConnection` | Opens a connection to the endpoint with the given `EndpointDeviceId`; an overload accepts `MidiEndpointConnectionSettings`. |
| `MidiSession.Connections` | `IMapView<Guid, MidiEndpointConnection>` | All connections currently owned by this session. |
| `MidiEndpointDeviceInformation.FindAll()` | static method returning `IVectorView<MidiEndpointDeviceInformation>` | Enumerates MIDI endpoints; overloads accept a sort order and a `MidiEndpointDeviceInformationFilters` value to restrict the endpoint types returned. |
| `MidiEndpointConnection.Open()` | method | Opens the connection for sending/receiving after creation via `MidiSession.CreateEndpointConnection`. |
| `MidiEndpointConnection.SendSingleMessageWords/-Struct/-Packet/-Buffer` | methods | Send one UMP (32/64/96/128-bit) built from raw words, a `MidiMessageStruct`, an `IMidiUniversalPacket`, or a memory buffer. `-Words`/`-Struct`/`-Buffer` take an explicit `timestamp` parameter; `-Packet` takes only the `IMidiUniversalPacket message` — its timestamp is carried on the packet itself. |
| `MidiEndpointConnection.SendMultipleMessages...` | methods | Batch-send variants of the single-message senders (word list/array, packet list, struct list/array, buffer). |
| `MidiEndpointConnection.MessageReceived` | event | Raised when a UMP arrives on the connection (from `IMidiMessageReceivedEventSource`). |
| `MidiMessageBuilder` | static class | Factory methods to construct well-formed UMPs — `BuildMidi1ChannelVoiceMessage`, `BuildMidi2ChannelVoiceMessage`, `BuildSystemMessage`, `BuildSystemExclusive7Message`/`BuildSystemExclusive8Message`, `BuildFlexDataMessage`, `BuildStreamMessage`, etc. — each returning a `MidiMessage32`/`MidiMessage64`/`MidiMessage128` sized to the message. |
| `MidiGroup` / `MidiChannel` | classes | Strongly-typed wrappers (constructed from a `UInt8 index`) for a UMP's group (0-15) and channel (0-15) fields, replacing raw byte math. |
| `MidiClock.Now` | static property | Current timestamp value in the units expected by the `timestamp` parameters throughout the API. |

## Notes

- Actual WinRT namespace, verified from the SDK's own IDL sources: `Windows.Devices.Midi2` (core classes: `MidiSession`, `MidiEndpointConnection`, `MidiMessage32`/`64`/`128`, `MidiGroup`, `MidiChannel`), with `Windows.Devices.Midi2.Enumeration` for `MidiEndpointDeviceInformation` and `Windows.Devices.Midi2.Utilities.Messages` for `MidiMessageBuilder`. Some project/package file names in the SDK source tree use a `Microsoft.Windows.Devices.Midi2` naming, but the `namespace` declarations the WinRT types are actually projected under are `Windows.Devices.Midi2.*`.
- This is a distinct API surface from the legacy `Windows.Devices.Midi` API documented on this page's sibling `midi.md` (`MidiInPort`/`MidiOutPort`, byte-stream MIDI 1.0 only). `Windows.Devices.Midi2` supports both MIDI 1.0 byte-stream endpoints and native MIDI 2.0 endpoints carried as Universal MIDI Packets (UMP), plus MIDI-CI capability negotiation; it does not replace `Windows.Devices.Midi`, and an app can use either depending on which endpoints/protocol it targets.
- Distributed as a separate installable SDK/runtime (an open-source project, `microsoft/MIDI` on GitHub) rather than shipping as a normal in-box WinRT projection alongside the OS SDK — the in-box MIDI service and driver still need the Windows MIDI Services runtime component installed, and apps consume the API via the `Windows.Devices.Midi2` NuGet package with C++/WinRT or C#/WinRT projections.
- `MidiEndpointDeviceInformation.FindAll()` (and its overloads) is the MIDI-2.0-aware replacement for the `DeviceInformation.FindAllAsync(MidiInPort.GetDeviceSelector())` enumeration pattern used by the legacy API; it surfaces both native UMP endpoints and legacy MIDI 1.0 ports translated through the service.

## Related

- [MIDI (Windows.Devices.Midi)](./midi.md)
- [AudioGraph](./audio-graph.md)
