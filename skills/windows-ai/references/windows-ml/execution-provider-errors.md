# Troubleshoot execution provider download errors

Common causes and fixes for errors downloading/registering Windows ML execution providers (EPs), plus how to file feedback when the issue persists.

## Signature / Usage

```text
Feedback Hub > Report a problem > Developer Platform > Windows Machine Learning
```

## Options / Props

| Cause | Solution |
|------|-------------|
| Upstream Windows Update requires a reboot to resume EP download | Restart the device to complete pending updates, then retry the EP download |
| Windows Update is paused on the device | Settings > Windows Update > Resume Updates, then retry |
| Enterprise/managed-device policy blocks component downloads | Contact IT administrator to check policies restricting Windows Update / component downloads |

## Notes

- EP downloads are delivered through the Windows Update infrastructure, so any condition that blocks Windows Update also blocks EP acquisition.
- If none of the above resolves it, file a report via Feedback Hub ("Report a problem" > category **Developer Platform > Windows Machine Learning**); Feedback Hub automatically captures the logs the Windows ML team needs.
- For deeper diagnosis before filing feedback, see [Capture Windows ML diagnostic logs](./logs.md) (EP auto-selection, registered providers, WinML ONNX error events).

## Related

- [Install execution providers](./install-execution-providers.md)
- [Register execution providers](./register-execution-providers.md)
- [Capture Windows ML diagnostic logs](./logs.md)
