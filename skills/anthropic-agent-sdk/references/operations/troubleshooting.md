<!-- source: https://code.claude.com/docs/en/agent-sdk/troubleshooting / last verified: 2026-10-16 -->

# Troubleshooting

Fix Agent SDK errors by the exact message you see, with the cause and fix for each error in the TypeScript and Python SDKs.

Entries on this page are keyed to the error you see. Each names the cause and what to do.

## Signature / Usage

Python options referenced on this page: `cli_path` pins the `claude` executable and `stderr` receives the CLI's stderr output (TypeScript uses `pathToClaudeCodeExecutable` and the `stderr` callback in query options).

```python
from claude_agent_sdk import ClaudeAgentOptions

options = ClaudeAgentOptions(
    cli_path="/path/to/claude",
    stderr=lambda line: print(line),
)
```

## CLI startup

### CLINotFoundError: Claude Code not found

The Python SDK launches the Claude Code CLI as a subprocess. When it can't find a `claude` executable, connecting fails with:

```
Claude Code not found at: /your/configured/path
```

The message includes the configured path when `ClaudeAgentOptions(cli_path=...)` points at a missing file. Without `cli_path`, the SDK searches `PATH` and common install locations, and the message includes install instructions for your platform.

Fix:

- Install Claude Code if it isn't installed.
- If `cli_path` is set, confirm the file exists and is the `claude` executable.
- If relying on `PATH` resolution, confirm `claude --version` works in the same environment your application runs in — processes launched from an IDE or a service manager often run with a different `PATH`.

### CLIConnectionError: Refusing to execute batch script

On Windows, connecting fails with a `CLIConnectionError` when the CLI path the Python SDK uses is a `.bat`/`.cmd` batch script, including the `claude.cmd` shim an npm install creates:

```
Refusing to execute batch script 'C:\Users\you\AppData\Roaming\npm\claude.cmd': Windows runs .bat/.cmd files via cmd.exe, which can execute commands injected through CLI arguments, and no reliable escaping for cmd.exe exists. Use a native claude executable instead: install Claude Code natively (irm https://claude.ai/install.ps1 | iex), point ClaudeAgentOptions(cli_path=...) at a claude.exe, or install the claude-agent-sdk wheel for a platform that bundles claude.exe (e.g. Windows x64).
```

This is deliberate security hardening, not a broken install. Windows runs batch scripts by rewriting the spawn into a `cmd.exe /c` invocation, and `cmd.exe` re-parses the whole command line at execution time, so an argument value can execute injected commands.

Most Windows installs never hit this: the Windows x64 wheel of `claude-agent-sdk` bundles a `claude.exe`, and the SDK prefers the bundled CLI, then any native `claude.exe` it can discover, before falling back to a batch shim. You see the refusal when:

- `ClaudeAgentOptions(cli_path=...)` points at a `.bat`/`.cmd` file, such as npm's `claude.cmd` shim.
- Your install has no bundled or native `claude.exe`, e.g. a source install on ARM64 Windows where the only `claude` on `PATH` is the npm shim.

Fix — give the SDK a native executable instead of a batch script:

- If `cli_path` is set, point it at a `claude.exe` or remove the option (the SDK skips discovery while `cli_path` is set, so a native install alone can't take effect).
- Install Claude Code natively in PowerShell: `irm https://claude.ai/install.ps1 | iex`
- On x64 Windows, install the `claude-agent-sdk` wheel, which bundles `claude.exe`.

Before `claude-agent-sdk` 0.2.124, the Python SDK spawned batch scripts through `cmd.exe` without this check.

## CLI process exit

The entries in this section mean the Claude Code process ended while your application was using it. Which error you see depends on the SDK language and on whether the CLI reported an error result before it exited.

### ProcessError: Command failed with exit code

The Python SDK raises a `ProcessError` when the Claude Code process exits with a nonzero code:

```
Command failed with exit code 1 (exit code: 1)
Error output: Check stderr output for details
```

The message states the exit code twice, and the `Error output` line is fixed text rather than your process's error output. The same fixed text fills the exception's `stderr` attribute. The exception's `exit_code` attribute carries the code. To capture what the CLI actually wrote to stderr, pass a `stderr` callback in `ClaudeAgentOptions` and log what it receives.

A bare `ProcessError` means the CLI exited without reporting an error result. When the CLI did report one, the SDK raises `ResultError` instead (see below). `ResultError` subclasses `ProcessError`, so `except ProcessError` catches both. To handle them differently, put the `except ResultError` clause first.

Before `claude-agent-sdk` 0.2.140, the Python SDK raised error-result exits as a plain `Exception` rather than a `ResultError`.

### Claude Code process exited with code N

The TypeScript SDK surfaces a nonzero CLI exit as a plain `Error` that rejects the `for await` loop over `query()`'s messages. There's no SDK error class to catch, so wrap the loop in `try`/`catch` and match on the message:

```
Claude Code process exited with code 1. stderr: <tail of the CLI's stderr>
```

When the CLI wrote to stderr, the message ends with the tail of it. To capture the full stream, pass a `stderr` callback in the query options. A process killed by a signal reports `Claude Code process terminated by signal <name>` in the same form.

### Claude Code returned an error result

Both SDKs replace the process-exit error with this message when the CLI reported an error result before exiting:

```
Claude Code returned an error result: <the CLI's own error report>
```

Python raises this as a `ResultError`, whose `data` attribute carries the full error result. TypeScript rejects the message loop with a plain `Error` carrying the same message shape.

## Structured outputs

### structured_output is None but the result says success

A result message can end with `subtype: "success"` while `structured_output` is `None` (Python) or `undefined` (TypeScript). The run completes but no validated output exists — one cause is a schema no output can satisfy (e.g. conflicting length constraints). The run ends without a validation error; the only signal is the missing `structured_output`.

Treat this as a failure in application code: check both that `subtype` is `success` and that `structured_output` is present before using it. If it happens repeatedly with a schema you believe is correct, verify the schema is satisfiable, simplify it until outputs validate, then reintroduce constraints one at a time.

## Report a new issue

If your error isn't covered here, check open issues or file a new one in the SDK repositories: `anthropics/claude-agent-sdk-typescript` or `anthropics/claude-agent-sdk-python`. Include the full error text and your SDK version.

## Notes

- The Signature / Usage snippet is composed from the `ClaudeAgentOptions` fields the official page references in prose (`cli_path`, `stderr`); the official troubleshooting page itself contains no code example. TypeScript equivalents: `pathToClaudeCodeExecutable` and `stderr: (data: string) => void` in `Options`.
- `irm https://claude.ai/install.ps1 | iex` downloads and executes a remote script in one step (quoted verbatim from the official docs); in shared or production environments, download `install.ps1` and review it before running.

## Related

- [Cost Tracking](./cost-tracking.md)
