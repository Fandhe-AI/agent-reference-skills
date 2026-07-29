# MIDI (Windows.Devices.Midi)

APIs for enumerating MIDI input/output devices and sending/receiving MIDI messages. Windows supports MIDI over USB (class-compliant and proprietary drivers), MIDI over Bluetooth LE, and third-party MIDI over Ethernet/routed MIDI, plus a built-in General MIDI synth ("Microsoft GS Wavetable Synth").

## Signature / Usage

```csharp
// Enumerate devices via DeviceInformation + the MIDI port device selector strings
DeviceInformationCollection inputDevices = await DeviceInformation.FindAllAsync(MidiInPort.GetDeviceSelector());
DeviceInformationCollection outputDevices = await DeviceInformation.FindAllAsync(MidiOutPort.GetDeviceSelector());

// Open an input port and listen for messages
MidiInPort midiInPort = await MidiInPort.FromIdAsync(inputDevices[0].Id);
midiInPort.MessageReceived += (MidiInPort sender, MidiMessageReceivedEventArgs args) =>
{
    IMidiMessage msg = args.Message;
    if (msg.Type == MidiMessageType.NoteOn)
    {
        var noteOn = (MidiNoteOnMessage)msg;
        System.Diagnostics.Debug.WriteLine($"{noteOn.Channel} {noteOn.Note} {noteOn.Velocity}");
    }
};

// Open an output port and send a message
IMidiOutPort midiOutPort = await MidiOutPort.FromIdAsync(outputDevices[0].Id);
IMidiMessage noteOn = new MidiNoteOnMessage(channel: 0, note: 60, velocity: 127);
midiOutPort.SendMessage(noteOn);
```

## Options / Props

| Member | Type | Description |
|------|------|-------------|
| `MidiInPort.GetDeviceSelector()` / `MidiOutPort.GetDeviceSelector()` | static `string` | AQS selector string for `DeviceInformation.FindAllAsync`/`DeviceWatcher` to enumerate MIDI in/out ports. |
| `MidiInPort.FromIdAsync(string)` | `Task<MidiInPort>` | Opens the input port for the given `DeviceInformation.Id`. |
| `MidiOutPort.FromIdAsync(string)` | `Task<IMidiOutPort>` | Opens the output port for the given `DeviceInformation.Id`. |
| `MidiInPort.MessageReceived` | event `(MidiInPort, MidiMessageReceivedEventArgs)` | Raised when a MIDI message arrives; `args.Message` is an `IMidiMessage`. |
| `IMidiMessage.Type` | `MidiMessageType` | Enum identifying the message kind (`NoteOn`, `NoteOff`, `ControlChange`, `PitchBendChange`, etc.), used to cast to the concrete message type. |
| `IMidiOutPort.SendMessage(IMidiMessage)` | method | Sends a MIDI message (e.g. `MidiNoteOnMessage`, `MidiNoteOffMessage`, `MidiControlChangeMessage`) to the output device. |
| `DeviceWatcher` (from `Windows.Devices.Enumeration`) | class | Used with the selector strings above to watch for MIDI device add/remove/update, since ports are frequently hot-plugged. |

## Notes

- Namespace: `Windows.Devices.Midi`. Device discovery uses the general `Windows.Devices.Enumeration.DeviceInformation`/`DeviceWatcher` pattern rather than a MIDI-specific enumeration API.
- Enumerating output devices always surfaces a built-in "Microsoft GS Wavetable Synth" device that can be played directly without any additional extension SDK in desktop/WinUI 3 apps.
- Dispose `MidiInPort`/`IMidiOutPort` and unregister `MessageReceived` when done, and stop any `DeviceWatcher` instances used for enumeration.

## Related

- [AudioGraph](./audio-graph.md)
