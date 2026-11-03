# sandbox

| Name | Description | Path |
| --- | --- | --- |
| Sandboxes on Cloudflare | Overview of Containers and Dynamic Workers sandboxes for untrusted code | [overview.md](./overview.md) |
| Choose a sandbox environment | Compare Container vs Dynamic Worker | [choose-a-sandbox-environment.md](./choose-a-sandbox-environment.md) |
| Sandbox lifetime | What keeps an instance running, stops it, and what snapshots carry | [sandbox-lifetime.md](./sandbox-lifetime.md) |
| Sandbox security | Trust boundaries, credentials, names, egress, output risks | [sandbox-security.md](./sandbox-security.md) |
| Run a Linux command | Base project: Durable Object starts a container and runs a command | [run-a-linux-command.md](./run-a-linux-command.md) |
| Run JavaScript in a Dynamic Worker | POST JavaScript and read the sandboxed result | [run-javascript-dynamic-workers.md](./run-javascript-dynamic-workers.md) |
| Build an AI code interpreter | Workers AI model writes code that a Dynamic Worker runs | [build-an-ai-code-interpreter.md](./build-an-ai-code-interpreter.md) |
| Build a coding agent runner | Worker that runs an agent on a repository and returns a diff | [build-a-coding-agent-runner.md](./build-a-coding-agent-runner.md) |
| Run Python code | Run Python with image-installed packages, return output or a chart | [run-python-code.md](./run-python-code.md) |
| Run tests from a Git repository | Clone, install and test a repository in a fresh sandbox | [run-tests-from-git-repository.md](./run-tests-from-git-repository.md) |
| Stream command output | Server-sent events for stdout, stderr and exit code | [stream-command-output.md](./stream-command-output.md) |
| Run background processes | Start, check, read and stop long processes through files | [run-background-processes.md](./run-background-processes.md) |
| Follow a background process | Stream process output and wait for a log line | [follow-a-background-process.md](./follow-a-background-process.md) |
| Run a server in the background | Start a server once per container and wait until it answers | [run-a-server-in-the-background.md](./run-a-server-in-the-background.md) |
| Open a terminal in the browser | xterm.js over WebSocket to a tmux shell in the sandbox | [open-a-terminal-in-the-browser.md](./open-a-terminal-in-the-browser.md) |
| Move files in and out of a sandbox | Stream uploads and downloads with the Files class | [manage-files.md](./manage-files.md) |
| Save and restore a sandbox with snapshots | Container snapshots, copy and reset | [save-and-restore-a-workspace.md](./save-and-restore-a-workspace.md) |
| Save a sandbox automatically | Alarm-driven snapshot before idle stop and checkpoints | [save-a-sandbox-automatically.md](./save-a-sandbox-automatically.md) |
| Mount an R2 bucket | Mount a bucket prefix with S3Mount | [mount-an-r2-bucket.md](./mount-an-r2-bucket.md) |
| Back up a directory to R2 | Save and restore one directory with DirectoryBackup | [back-up-a-directory-to-r2.md](./back-up-a-directory-to-r2.md) |
| Preview a web application | Forward browser requests to a server in the sandbox | [preview-a-web-application.md](./preview-a-web-application.md) |
| Serve previews on their own hostnames | Wildcard hostnames, one origin per preview | [serve-previews-on-their-own-hostnames.md](./serve-previews-on-their-own-hostnames.md) |
| Call an authenticated API from a sandbox | Keep tokens in the Worker; container outbound handler or Dynamic Worker method | [call-an-authenticated-api.md](./call-an-authenticated-api.md) |
| Clone a private repository | Clone with a token that stays in the Worker | [clone-a-private-repository.md](./clone-a-private-repository.md) |
| List a user's sandboxes | Registry Durable Object and the Containers API | [list-sandboxes.md](./list-sandboxes.md) |
| Run code when a sandbox stops | Record when and why a container stops | [run-code-when-a-sandbox-stops.md](./run-code-when-a-sandbox-stops.md) |
| Coding agents in a sandbox | Agents in your sandbox vs vendor-hosted loops (Devin, Cursor, Managed Agents, OpenAI Agents API) | [coding-agents-overview.md](./coding-agents-overview.md) |
| Run Claude Code in a sandbox | Claude Code through AI Gateway in the runner | [claude-code.md](./claude-code.md) |
| Run Codex in a sandbox | Codex CLI through AI Gateway in the runner | [codex.md](./codex.md) |
| Run OpenCode in a sandbox | OpenCode through AI Gateway in the runner | [opencode.md](./opencode.md) |
| Run Pi in a sandbox | Pi through its built-in AI Gateway provider | [pi.md](./pi.md) |
| @cloudflare/sandbox package | Install, image and Worker requirements for the package | [sandbox-package.md](./sandbox-package.md) |
| Files API | Read, write, list, rename and remove files in a container | [files-api.md](./files-api.md) |
| S3Mount API | Mount S3-compatible buckets via S3Gateway | [s3-mount-api.md](./s3-mount-api.md) |
| DirectoryBackup API | Back up a directory to R2 and restore it | [directory-backup-api.md](./directory-backup-api.md) |
