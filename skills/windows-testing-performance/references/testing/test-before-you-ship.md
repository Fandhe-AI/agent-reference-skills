# Test Your Windows App Before You Ship

A five-step pre-release testing path for Windows apps: clean-device install, accessibility check, Windows App Certification Kit, UI test automation, and AI-assisted testing. Each step ends with a "Verify" check that you, or an AI agent, can confirm.

## Signature / Usage

Adapted (not in the official docs): the five steps and their Verify checks condensed into one checklist; the official page has no code block.

```text
1. Run the app on a clean device
   Verify: The package installs, the app launches, and your core scenarios work.
2. Check accessibility
   Verify: You can complete every core scenario without a mouse, and Narrator announces each control.
3. Run the Windows App Certification Kit
   Verify: The kit reports no failures, or you understand and accept each one.
4. Automate UI tests
   Verify: Your UI tests pass in your build pipeline.
5. Test with an AI assistant
   Verify: You've reviewed each test the agent wrote, and its results match what you see when you test the app yourself.
```

## Options / Props

| Step | What to do | Details in this skill |
|------|------------|-----------------------|
| 1. Clean device | Install the release package on a clean test device or virtual machine without development tools or builds. Install only the prerequisites documented for users, plus the public development certificate if needed for sideload testing. | [MSIX Sideloading and Developer Mode](./msix-sideloading.md) |
| 2. Accessibility | Test core scenarios with only the keyboard and with a screen reader such as Narrator. Use Accessibility Insights for Windows to find missing names and other common issues. | accessibility category (`accessibility-testing.md`) |
| 3. WACK | The Windows App Certification Kit runs many of the same tests used in Store certification. | [Windows App Certification Kit (WACK)](./wack-certification.md) |
| 4. UI tests | Automate the scenarios you test every release so you can rerun them for each update. | [UI Testing with WinAppDriver / Appium](./ui-testing-winappdriver.md), [Running Windows App Tests in CI](./ci-testing.md) |
| 5. AI assistant | An AI assistant can help you write tests, run them, and review the results. | [AI-Assisted Testing](./ai-assisted-testing.md) |

## Notes

- A new user account on your development machine doesn't remove machine-wide dependencies or certificate trust, so it is not a substitute for a clean device or virtual machine.
- Review the tests an agent writes, and don't treat agent results as a replacement for testing with real users and assistive technology.
- Source: https://learn.microsoft.com/en-us/windows/apps/develop/test-before-you-ship (page ms.date 2026-11-10; fetched 2026-11-14).

## Related

- [Windows App Certification Kit (WACK)](./wack-certification.md)
- [UI Testing with WinAppDriver / Appium](./ui-testing-winappdriver.md)
- [Running Windows App Tests in CI](./ci-testing.md)
- [AI-Assisted Testing](./ai-assisted-testing.md)
