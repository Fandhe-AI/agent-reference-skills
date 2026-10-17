# Cloud environments

A cloud environment is the reusable setup (repositories, dependencies, tools, access settings) that Codex Cloud tasks start from. Each new task gets its own isolated workspace from the published environment; Codex inspects the repositories, prepares the setup, and tests it with you.

## Signature / Usage

Create and publish (web or desktop app, signed in with ChatGPT):

1. In a new task, choose **Work in** > **Cloud**, open **Select environment**, and select **Create environment** (or **Settings** > **Codex Cloud** > **Environments** > **Create environment**).
2. Select the GitHub repositories to check out. Connect GitHub if prompted.
3. Select **Get started**. Codex inspects the repositories, installs dependencies and tools, and tests the workflow.
4. Supply missing access or information when asked. You can also request specific versions, commands, or services.
5. Review the setup report, configuration, and files. Resolve unfinished work, save changes, and select **Publish**.
6. After **Environment published** appears, select **Start a new task**.

Example request during setup:

```text
Install pnpm and run the project's tests.
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Install script | commands | Commands to install dependencies and prepare development assets. |
| Start skill | instructions | Instructions to start services and check that they're ready. |
| Environment variable | key/value | A value a program must read directly. Passed directly to programs in the environment. |
| Network secret | Key / Value / Allowed domains | A credential sent to a specific HTTPS service. Programs receive a placeholder; the proxy substitutes the real value for allowed destinations (HTTPS, port 443, during setup and tasks). Use a different key from any direct variable. |
| Personal vault | tab in Settings > Codex Cloud | Your own environment variables and network secrets. **Applies to**: **All environments** or **Selected environments**. A value for a specific environment takes precedence over a general default. |
| Allow Codex to access internet | toggle | Enables internet access. **Allow domains**: **Package managers**, **Custom domains only**, or **All (unrestricted)**; add hosts under **Additional allowed domains**. |
| Advanced > VPN | setting | Private networking. Tailscale is the supported provider (auth key must be **Reusable** and **Ephemeral**). Private IPv4 subnet routes, split DNS and MagicDNS supported. |
| Advanced > OIDC | setting | Short-lived credentials for cloud resources via a supported connection (configure trust with the displayed **Issuer**, **Audience**, and **Subject** or claim conditions). Available by request for Enterprise workspaces. |
| Privacy > Who can use | setting | **Only me** or your workspace. Controls who can start tasks from the environment. |

VM defaults per ChatGPT plan:

| ChatGPT plan | vCPUs | Memory | Disk space |
|--------------|------:|-------:|-----------:|
| Plus, Edu Plus | 2 | 8 GiB | 8 GiB |
| Pro, Business, Enterprise | 4 | 16 GiB | 32 GiB |
| Edu, Edu Pro | 4 | 16 GiB | 32 GiB |

## Reuse and update saved state

- **New task:** starts from the published environment's prepared filesystem.
- **Existing task:** continues with its own saved files, including uncommitted changes and installed tools.
- **Repository refresh:** runs automatically in the background, preserving dependency caches without rerunning installation or startup commands.

To update: **Settings** > **Codex Cloud** > **Environments**, the environment's **...** menu > **Edit**, let Codex prepare and test the change, save, then **Republish**. Start a new task to use the update.

## Package managers preset domains

- npm and Yarn: `registry.npmjs.org`, `registry.yarnpkg.com`
- PyPI and PyTorch: `pypi.org`, `files.pythonhosted.org`, `download.pytorch.org`, `download-r2.pytorch.org`
- Rust: `crates.io`, `index.crates.io`, `static.crates.io`, `static.rust-lang.org`
- Go: `proxy.golang.org`, `sum.golang.org`
- Maven and Gradle: `repo.maven.apache.org`, `repo1.maven.org`, `plugins.gradle.org`, `plugins-artifacts.gradle.org`, `services.gradle.org`, `downloads.gradle.org`
- Bazel: `bcr.bazel.build`, `mirror.bazel.build`
- Buf: `buf.build`
- CPAN: `cpan.metacpan.org`
- Ubuntu and Debian: `archive.ubuntu.com`, `security.ubuntu.com`, `ports.ubuntu.com`, `ppa.launchpadcontent.net`, `deb.debian.org`, `security.debian.org`
- Vendor repositories: `packages.microsoft.com`, `apt.buildkite.com`, `developer.download.nvidia.com`, `deb.nodesource.com`
- GitHub source, archives, releases, and LFS: `github.com`, `codeload.github.com`, `github-cloud.githubusercontent.com`, `github-cloud.s3.amazonaws.com`, `release-assets.githubusercontent.com`
- Other downloads: `dl.google.com`, `pkgconfig.freedesktop.org`

## Notes

- Source: https://learn.chatgpt.com/docs/environments/cloud-environments (Markdown twin, fetched 2026-10; the page has no version number).
- Codex Cloud (Legacy) still supports Code Review and the Linear and GitHub integrations and is planned for deprecation; see `cloud-environment.md` for the legacy setup-script / maintenance-script / container-caching model. This page documents the current published-environment model (install script, start skill).
- Saving stores configuration (some settings apply to the active setup immediately); publishing captures the prepared filesystem for new tasks; sharing controls who can use the environment.
- Saved state doesn't replace source control; commit important work.
- Saving environment-owned network secrets adds their destinations to restricted internet access. Direct variables and personal values don't add destinations. Allowing a destination doesn't supply credentials or grant permissions.
- For registered root domains in the Package managers preset, the corresponding `www` hostname is also allowed; other subdomains need their own entries.
- Services that filter by source IP can use the agent egress IP feed (https://openai.com/chatgpt-agents.json): allow every published range, check the feed daily; ranges are shared across customers.
- VPN: allow destinations in both the VPN access rules and the environment's internet-access settings; use a fully qualified hostname (e.g. `api.corp.example.com`) that resolves to an IPv4 address. Tasks in a shared environment use its configured VPN identity. When testing with `curl`, omit `--noproxy`.
- OIDC: editing a shared identity connection can affect other environments that use it; allow provider endpoints separately in the network policy.
- Sharing: access to the setup doesn't grant access to someone else's task or permission to edit the environment. **Use Codex in the cloud** controls task access; **Manage workspace environments** controls creating/editing shared environments. Enterprise admins configure workspace requirements via Agent Security, which apply alongside per-environment domain settings.
- Slack / Microsoft Teams: in an Enterprise workspace with Cloud delegation enabled, ask `@ChatGPT` to work on a repository; Codex chooses an environment shared with the workspace.
- A task's saved VM state is recoverable for up to seven days after you last start a turn or resume the task. Larger VMs are available for Enterprise.
- Not currently supported (on roadmap): computer and browser use; GitLab and self-hosted GitHub Enterprise Server. Skills stored in the repository are available in cloud tasks; personal local skills aren't synced.
- Troubleshooting: an environment with an **Unpublished** badge must be published before tasks can use it; after config changes, save, test during setup, publish or republish, and verify in a new task. If initial setup fails, select **Try again**.

## Related

- [cloud-environment.md](./cloud-environment.md)
- [modes.md](./modes.md)
- [local-environment.md](./local-environment.md)
