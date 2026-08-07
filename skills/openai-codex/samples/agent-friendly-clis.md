# Create a CLI Codex can use

Give Codex a composable command for an API, log source, export, or team script.

```text
Use $cli-creator to create a CLI you can use, and use $skill-creator to create the companion skill in this same chat.

Source to learn from: [docs URL, OpenAPI spec, redacted curl command, existing script path, log folder, CSV or JSON export, SQLite database path, or pasted --help output].

First job the CLI should support: [download failed CI logs from a build URL, search support tickets and read one by ID, query an admin API, read a local database, or run one step from an existing script].

Optional write job: [create a draft comment, upload media, retry a failed job, or read-only for now].

Command name: [cli-name, or recommend one].

Before coding, show me the proposed command surface and ask only for missing details that would block the build.
```

## Notes

- Source: OpenAI Codex use-case (learn.chatgpt.com). `$cli-creator` designs the command surface, installs the command on PATH, and verifies it from another folder
- The companion skill built with `$skill-creator` teaches future Codex tasks which CLI commands to run first and which write actions require approval
- Best for: repeated work against the same service, export, or repo script; agent tools needing paged search, exact reads by ID, or draft-before-write commands
