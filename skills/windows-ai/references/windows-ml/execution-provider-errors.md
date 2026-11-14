# Troubleshoot execution provider download issues with Windows ML

How Windows ML acquires execution providers (EPs) changed in Windows ML 2.5.96; this page covers download/registration errors on earlier versions and how to file feedback.

## Signature / Usage

Adapted (not in the official docs): the page contains no code; the block below condenses the feedback path from the "How to file feedback" steps.

```text
Feedback Hub > Report a problem > Developer Platform > Windows Machine Learning
```

## Options / Props

Windows ML 2.4.89 or earlier (EPs acquired through Windows Update):

| Cause | Solution |
|------|-------------|
| Upstream Windows Updates require a device reboot to resume EP download | Restart the device to complete pending Windows Updates, then try downloading the EPs again |
| Windows Updates paused | Settings > Windows Update > Resume Updates |
| Managed devices (enterprise policies restrict component downloads or Windows Update access) | Contact your IT administrator to verify whether enterprise policies are blocking EP downloads |

## Notes

- The mechanism changed in [Windows ML 2.5.96 and greater](https://www.nuget.org/packages/Microsoft.Windows.AI.MachineLearning/2.5.96). The docs highly recommend updating to the latest Windows ML, or at least using 2.5.96 or greater, for the most reliable EP acquisition.
- With Windows ML 2.5.96 or greater, EPs are acquired through the Microsoft Store. There are currently no known issues acquiring EPs in 2.5.96 and greater; report issues via Feedback Hub.
- With 2.4.89 and earlier, EPs were acquired through Windows Update, so any condition that blocks Windows Update also blocks EP acquisition.
- How to file feedback: launch Feedback Hub (Start, search "Feedback Hub"), select "Report a problem", describe the issue, select **Developer Platform** > **Windows Machine Learning** as the category, then follow the steps to reproduce and submit. Feedback Hub automatically captures the logs the team needs.
- For deeper diagnosis, see [Capture Windows ML diagnostic logs](./logs.md).
- Source: https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/execution-provider-errors (retrieved 2026-11-14)

## Related

- [Install execution providers](./install-execution-providers.md)
- [Register execution providers](./register-execution-providers.md)
- [Capture Windows ML diagnostic logs](./logs.md)
