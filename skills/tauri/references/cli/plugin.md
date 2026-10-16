---
source: https://v2.tauri.app/reference/cli/#plugin
---

# tauri plugin

Manage or create Tauri plugins: `new`, `init`, `android`, `ios`.

## Signature / Usage

```sh
npm run tauri plugin <subcommand>
cargo tauri plugin <subcommand>
```

```text
Manage or create Tauri plugins

Usage: tauri plugin [OPTIONS] <COMMAND>

Commands:
  new      Initializes a new Tauri plugin project
  init     Initialize a Tauri plugin project on an existing directory
  android  Manage the Android project for a Tauri plugin
  ios      Manage the iOS project for a Tauri plugin
  help     Print this message or the help of the given subcommand(s)

Options:
  -v, --verbose...  Enables verbose logging
  -h, --help        Print help
  -V, --version     Print version
```

## plugin new

Initializes a new Tauri plugin project

```text
Usage: tauri plugin new [OPTIONS] <PLUGIN_NAME>

Arguments:
  <PLUGIN_NAME>
          Name of your Tauri plugin

Options:
      --no-api
          Initializes a Tauri plugin without the TypeScript API
  -v, --verbose...
          Enables verbose logging
      --no-example
          Initialize without an example project
  -d, --directory <DIRECTORY>
          Set target directory for init
  -a, --author <AUTHOR>
          Author name
      --android
          Whether to initialize an Android project for the plugin
      --ios
          Whether to initialize an iOS project for the plugin
      --mobile
          Whether to initialize Android and iOS projects for the plugin
      --ios-framework <IOS_FRAMEWORK>
          Type of framework to use for the iOS project

          [default: spm]

          Possible values:
          - spm:   Swift Package Manager project
          - xcode: Xcode project
      --github-workflows
          Generate github workflows
  -t, --tauri-path <TAURI_PATH>
          Path of the Tauri project to use (relative to the cwd)
  -h, --help
          Print help (see a summary with '-h')
  -V, --version
          Print version
```

| Option | Value | Description |
| --- | --- | --- |
| `<PLUGIN_NAME>` | — | Name of your Tauri plugin |
| `--no-api` | — | Initializes a Tauri plugin without the TypeScript API |
| `--no-example` | — | Initialize without an example project |
| `-d, --directory` | `<DIRECTORY>` | Set target directory for init |
| `-a, --author` | `<AUTHOR>` | Author name |
| `--android` | — | Whether to initialize an Android project for the plugin |
| `--ios` | — | Whether to initialize an iOS project for the plugin |
| `--mobile` | — | Whether to initialize Android and iOS projects for the plugin |
| `--ios-framework` | `<IOS_FRAMEWORK>`, default spm | `spm` (Swift Package Manager project) or `xcode` (Xcode project) |
| `--github-workflows` | — | Generate github workflows |
| `-t, --tauri-path` | `<TAURI_PATH>` | Path of the Tauri project to use (relative to the cwd) |

## plugin init

Initialize a Tauri plugin project on an existing directory

```text
Usage: tauri plugin init [OPTIONS] [PLUGIN_NAME]

Arguments:
  [PLUGIN_NAME]
          Name of your Tauri plugin. If not specified, it will be inferred from the current directory

Options:
      --no-api
          Initializes a Tauri plugin without the TypeScript API
  -v, --verbose...
          Enables verbose logging
      --no-example
          Initialize without an example project
  -d, --directory <DIRECTORY>
          Set target directory for init

          [default: /opt/build/repo/packages/cli-generator]
  -a, --author <AUTHOR>
          Author name
      --android
          Whether to initialize an Android project for the plugin
      --ios
          Whether to initialize an iOS project for the plugin
      --mobile
          Whether to initialize Android and iOS projects for the plugin
      --ios-framework <IOS_FRAMEWORK>
          Type of framework to use for the iOS project

          [default: spm]

          Possible values:
          - spm:   Swift Package Manager project
          - xcode: Xcode project
      --github-workflows
          Generate github workflows
  -t, --tauri-path <TAURI_PATH>
          Path of the Tauri project to use (relative to the cwd)
  -h, --help
          Print help (see a summary with '-h')
  -V, --version
          Print version
```

Options are the same as `plugin new`, except `[PLUGIN_NAME]` is optional (inferred from the current directory) and `-d, --directory` has a default (the current working directory at run time).

## plugin android

Manage the Android project for a Tauri plugin

```text
Usage: tauri plugin android [OPTIONS] <COMMAND>

Commands:
  init  Initializes the Android project for an existing Tauri plugin
  help  Print this message or the help of the given subcommand(s)

Options:
  -v, --verbose...  Enables verbose logging
  -h, --help        Print help
  -V, --version     Print version
```

### plugin android init

Initializes the Android project for an existing Tauri plugin

```text
Usage: tauri plugin android init [OPTIONS] [PLUGIN_NAME]

Arguments:
  [PLUGIN_NAME]  Name of your Tauri plugin. Must match the current plugin's name. If not specified, it will be inferred from the current directory

Options:
  -o, --out-dir <OUT_DIR>  The output directory [default: /opt/build/repo/packages/cli-generator]
  -v, --verbose...         Enables verbose logging
  -h, --help               Print help
  -V, --version            Print version
```

| Option | Value | Description |
| --- | --- | --- |
| `[PLUGIN_NAME]` | — | Name of your Tauri plugin. Must match the current plugin's name; inferred from the current directory if omitted |
| `-o, --out-dir` | `<OUT_DIR>` | The output directory (default: current working directory) |

## plugin ios

Manage the iOS project for a Tauri plugin

```text
Usage: tauri plugin ios [OPTIONS] <COMMAND>

Commands:
  init  Initializes the iOS project for an existing Tauri plugin
  help  Print this message or the help of the given subcommand(s)

Options:
  -v, --verbose...  Enables verbose logging
  -h, --help        Print help
  -V, --version     Print version
```

### plugin ios init

Initializes the iOS project for an existing Tauri plugin

```text
Usage: tauri plugin ios init [OPTIONS] [PLUGIN_NAME]

Arguments:
  [PLUGIN_NAME]
          Name of your Tauri plugin. Must match the current plugin's name. If not specified, it will be inferred from the current directory

Options:
  -o, --out-dir <OUT_DIR>
          The output directory

          [default: /opt/build/repo/packages/cli-generator]
  -v, --verbose...
          Enables verbose logging
      --ios-framework <IOS_FRAMEWORK>
          Type of framework to use for the iOS project

          [default: spm]

          Possible values:
          - spm:   Swift Package Manager project
          - xcode: Xcode project
  -h, --help
          Print help (see a summary with '-h')
  -V, --version
          Print version
```

| Option | Value | Description |
| --- | --- | --- |
| `[PLUGIN_NAME]` | — | Name of your Tauri plugin. Must match the current plugin's name; inferred from the current directory if omitted |
| `-o, --out-dir` | `<OUT_DIR>` | The output directory (default: current working directory) |
| `--ios-framework` | `<IOS_FRAMEWORK>`, default spm | `spm` (Swift Package Manager project) or `xcode` (Xcode project) |

## Notes

- Usage lines normalized from `pnpm-native run build plugin ...`; the `[default: /opt/build/repo/packages/cli-generator]` values are the docs build's working directory, i.e. the current working directory at run time.
- For the plugin development workflow see the Develop a Tauri Plugin guide (`../develop/plugin-development.md`).
- Creates Tauri plugins (Rust crate + optional guest JS). Not Electron preload/native modules; see the electron skill for Electron.

## Related

- [add-remove](./add-remove.md)
- [overview](./overview.md)
