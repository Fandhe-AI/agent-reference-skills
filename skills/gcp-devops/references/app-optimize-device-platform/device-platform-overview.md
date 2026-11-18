---
source: https://docs.cloud.google.com/developer-device-platform/overview
---

# Developer Device Platform overview

The Developer Device Platform (DDP) is a managed device farm for remote device orchestration: developers build and test applications on remote infrastructure integrated with Google Cloud. It is accessed through the `device-run` command group of the Google Cloud CLI or by calling the Device Run and Device Streaming APIs directly. Status: Preview.

## Signature / Usage

List the devices in the catalog (snippet taken from the quickstart page):

```bash
gcloud beta device-run devices list
```

## Options / Props

### Offerings

| Offering | Description |
|---|---|
| Device Catalog | Find, sort and inspect devices in the platform. |
| Device Run | Run tests and executables on devices in the lab and see results in Google Cloud. |
| Device Streaming API | Connect to remote physical Android devices and interact with the app as if it were connected locally. |
| Agent Skill | Give coding agents the ability to find, reserve and manipulate devices. |

### Key platform offerings at Preview

| Service | Description |
|---|---|
| Device Run API (AutomationJob Service) | Automated batch testing (such as instrumentation and JUnit tests). Uses a three-tiered hierarchy of Sessions, Jobs, and Executions to orchestrate device allocation, test runs, and result reporting. |
| Device Streaming API | Interactive connections to control physical and virtual device screens in real time and communicate over Android Debug Bridge (ADB). |
| Agentic Workflows (Device Action Service) | An open source Developer Device Platform Agent Skill on GitHub lets AI coding agents (such as Antigravity, ChatGPT, and Claude Code) manage remote device sessions, run tests, capture screenshots, and execute shell commands. |

### Orchestration benefits

| Benefit | Description |
|---|---|
| Hardware flakiness mitigation | If an allocated device has connection drops or hardware failures, the backend acquires a different device, restarts the test, and returns the successful retry results. |
| Large-scale parallel execution | Built-in Smart Sharding (uses historical execution data to partition test suites by target run duration) and Uniform Sharding. |

## Notes

- Status: Preview. At Preview the platform is restricted to a subset of core services and available to Android application developers; iOS support is described as "coming soon" on this page, while the Device Run pages document iOS XCTest (with `gcloud alpha`).
- Billing: DDP is tied to Google Cloud billing and requires a paid Google Cloud account; costs are paid by the users. Pricing is not copied.
- Migration: the overview links a Firebase Test Lab migration guide, a command and flag translation page, and a migration skill for AI agents (pages outside this category).
- Snippet taken from https://docs.cloud.google.com/developer-device-platform/quickstart (the overview page itself has no code).
- Source: https://docs.cloud.google.com/developer-device-platform/overview (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [quickstart.md](./quickstart.md)
- [device-run.md](./device-run.md)
- [share-storage.md](./share-storage.md)
