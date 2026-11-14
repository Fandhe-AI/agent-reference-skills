# Windows ML CLI (winml-cli) Privacy Statement

Windows ML CLI collects limited, unlinked pseudonymized, optional telemetry; this page lists the events and attributes collected, what is never collected, and how to control it.

## Signature / Usage

On the first run of any command the CLI prompts (default `Y`; pressing Enter accepts). The answer is persisted to `%USERPROFILE%\.winml\config.json` under `telemetry.consent`:

```text
Enable telemetry? [Y/n]
```

Change the decision by editing `%USERPROFILE%\.winml\config.json` directly:

```json
{
  "telemetry": {
    "consent": "disabled"
  }
}
```

## Options / Props

### Changing consent

| Goal | Edit |
|------|------|
| Opt out | Set `telemetry.consent` to `"disabled"` |
| Opt in | Set `telemetry.consent` to `"enabled"` |
| Re-show the prompt on next run | Delete the file, or remove the `telemetry.consent` field |

### Events (when telemetry is enabled)

| Event | When sent | Content |
|-------|-----------|---------|
| `WinMLCLIHeartbeat` | Once per CLI invocation, before the command runs | Only context attributes (no per-event payload) |
| `WinMLCLIAction` | Once per command completion | `invoked_from`, `action_name`, `model_id`, `device`, `ep`, `duration_ms`, `success` |
| `WinMLCLIError` | Only when a command raises an unhandled exception | `exception_type`, `exception_message`, `exception_stack`, `root_cause_type`, `root_cause_message` |

### WinMLCLIAction attributes

| Attribute | Description |
|-----------|-------------|
| `invoked_from` | `Script` or `Interactive`, based on whether stdin is a TTY |
| `action_name` | Click subcommand name (e.g. `build`, `analyze`) |
| `model_id` | From `--model-id` when supplied, otherwise `--model` (`-m`). Hugging Face Hub identifiers (e.g. `microsoft/resnet-50`) are sent as supplied; local references are replaced by markers such as `<local:.onnx>` or `<local:dir>` containing no file or directory names |
| `device` | Target device type if the subcommand accepts `--device` (e.g. `NPU`, `GPU`) |
| `ep` | Execution provider if the subcommand accepts `--ep` (e.g. `QNNExecutionProvider`) |
| `duration_ms` | Wall-clock execution time in milliseconds |
| `success` | Whether the command completed without raising |

### WinMLCLIError attributes

| Attribute | Description |
|-----------|-------------|
| `exception_type` | Exception class name (e.g. `ValueError`) |
| `exception_message` | Message with absolute paths trimmed to package-relative paths or file names, and emails, GUIDs, IPv4/IPv6 addresses, and long opaque tokens replaced by `<scrubbed>`; capped at 200 characters |
| `exception_stack` | List of frames `{file, line, function}`; file paths are package-relative; no source line text or local variable values |
| `root_cause_type` | Class name of the innermost chained exception when it differs from the outer exception; otherwise null |
| `root_cause_message` | Message of that innermost exception with the same trimming and scrubbing, capped at 500 characters; otherwise null |

### Common context attributes (every event)

| Attribute | Description |
|-----------|-------------|
| `device_id` | SHA256 hash of a randomly generated UUID persisted per machine; counts distinct users without identifying them |
| `id_status` | `EXISTING`, `NEW`, or `FAILED`: how the device ID was obtained on this run |
| `os.name`, `os.version`, `os.release`, `os.arch` | Operating system and architecture (e.g. `Windows`, `10.0.26200`, `11`, `AMD64`) |
| `app_version` | Windows ML CLI package version |
| `app_instance_id` | Random UUID generated for this process only; not persisted |
| `initTs` | Epoch timestamp when telemetry was initialized |

### Data never collected

- Model file paths or model contents
- User names, machine names, or IP addresses (IPs appearing in exception messages are scrubbed)
- The raw command line or complete list of option values
- Source code text in tracebacks
- Local variable values in tracebacks
- HuggingFace tokens, API keys, or session tokens (long opaque tokens in exception messages are scrubbed)
- File system contents
- Email addresses (scrubbed from exception messages if present)

## Notes

- All telemetry is classified as Optional under Microsoft's data categorization model; none is required to run any feature.
- There are no CLI subcommands, per-invocation flags, or environment variables for consent; the config file is the single source of truth.
- Telemetry is automatically disabled in non-interactive contexts (non-TTY stdin, CI/CD) regardless of stored consent, without a prompt. It is also disabled when any of these environment variables are set: `CI`, `TF_BUILD`, `GITHUB_ACTIONS`, `JENKINS_URL`, `CODEBUILD_BUILD_ID`, `BUILDKITE`, `SYSTEM_TEAMFOUNDATIONCOLLECTIONURI`.
- Events that fail to send are cached locally at `%USERPROFILE%\.winml\telemetry\winmlcli.cache` and retried on the next run (append-only on failure, drain-then-resend on recovery). When telemetry is disabled the cache is cleared.
- Dev installs (`pip install -e .` or run from a checkout) never send telemetry: the InstrumentationKey is blank in source and populated only by the official build pipeline.
- Selected command-related values (Hub model identifier, target device, EP) are collected as listed above; the raw local model path in `model_id` is not.
- Source: https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/command-line/privacy (retrieved 2026-11-14)

## Related

- [Windows ML CLI (winml-cli) Overview](./winml-cli.md)
- [Install Windows ML CLI (winml-cli)](./winml-cli-installation.md)
