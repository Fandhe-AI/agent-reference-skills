---
source: https://www.typescriptlang.org/docs/handbook/nightly-builds.html
---

# Nightly Builds

Fetching nightly builds and configuring editors. Nightly builds are published to npm from the `main` branch by midnight PST.

## Install a nightly

```sh
npm install -D typescript@next
```

Per the TypeScript 7.0 announcement, nightlies resume under the `next` tag of the `typescript` package. See install.md for the former `@typescript/native-preview` package.

## TypeScript 7 editor support

Source: https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/

- TypeScript 7 uses the Language Server Protocol (LSP); other editors work through their LSP support (check your editor's documentation).
- VS Code: a dedicated TypeScript 7 extension is available. Toggle it with the "Disable TypeScript 7 Language Server" and "Enable TypeScript 7 Language Server" commands from the command palette. The announcement says VS Code itself will ship TypeScript 7 support in the coming weeks.
- Visual Studio: the latest version automatically enables TypeScript 7 based on your workspace.
- TypeScript 7 does not yet expose a stable programmatic API. Tools that embed TypeScript (such as Volar) can only rely on TypeScript 6.0 for now.

## TypeScript 6.0 and earlier (JS implementation): editor setup

> The settings below are from the legacy Nightly Builds handbook page and describe the JavaScript implementation (`node_modules/typescript/lib`). They are not documented for the TypeScript 7 native build.

### VS Code: switch the workspace TypeScript

```json
"typescript.tsdk": "<path to your folder>/node_modules/typescript/lib"
```

Add to `.vscode/settings.json`. Requires `typescript@next` to be installed.

### Sublime Text

```json
"typescript_tsdk": "<path to your folder>/node_modules/typescript/lib"
```

Add to the `Settings - User` file.

### IntelliJ IDEA

```text
# Mac (Preferences > Languages & Frameworks > TypeScript)
/usr/local/lib/node_modules/typescript/lib

# Windows (File > Settings > Languages & Frameworks > TypeScript)
C:\Users\USERNAME\AppData\Roaming\npm\node_modules\typescript\lib
```

Path to set as the TypeScript Version when installed via npm.
