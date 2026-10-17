---
source: https://www.electronjs.org/docs/latest/tutorial/forge-overview
---

# Distributing Apps With Electron Forge

Electron Forge is a tool for packaging and publishing Electron applications. It unifies Electron's build tooling ecosystem into a single extensible interface.

## Signature / Usage

The Electron Forge docs (https://www.electronforge.io/) cover taking your application from source code to your end users' machines:

- Packaging your application: `package` (https://www.electronforge.io/cli#package)
- Generating executables and installers for each OS: `make` (https://www.electronforge.io/cli#make)
- Publishing these files to online platforms to download: `publish` (https://www.electronforge.io/cli#publish)

```text
Forge CLI commands (see https://www.electronforge.io/cli):
  package   source code -> packaged application
  make      packaged application -> executables / installers per OS
  publish   made artifacts -> online platforms
```

For beginners, follow Electron's tutorial (starting at tutorial-prerequisites) to develop, build, package and publish a first app. If you have already developed an app and want to start on packaging and distribution, start from step 5 of the tutorial.

## Alternative tooling

Third-party tools maintained by members of the Electron community, without official support from the Electron project:

- **Electron Builder** (`electron-builder`): a "complete solution to package and build a ready-for-distribution Electron app" that focuses on an integrated experience. It adds a single dependency and manages all further requirements internally. It replaces features and modules used by the Electron maintainers (such as the auto-updater) with custom ones.
- **Hydraulic Conveyor** (https://hydraulic.dev): a desktop app deployment tool that supports cross-building/signing of all packages from any OS without multi-platform CI, can do synchronous web-style updates on each start of the app, requires no code changes, and can use plain HTTP servers for updates. Conveyor replaces the Electron auto-updaters with Sparkle on macOS, MSIX on Windows, and Linux package repositories. It is a commercial tool that is free for open source projects.

## Notes

- Forge's own configuration is documented at electronforge.io, outside this reference; this page covers only what the Electron docs state about it.
- Bugs in Forge: check the GitHub issue tracker (https://github.com/electron/forge/issues) for existing issues before filing a new one.

## Related

- [Application Packaging](./application-distribution.md)
- [Code Signing](./code-signing.md)
- [Distribution Overview](./distribution-overview.md)
