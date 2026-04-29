# ZMK CLI

The ZMK CLI is a command-line utility that streamlines creation and management of ZMK configuration repositories. It automates common tasks such as initializing a repo, adding keyboards, and downloading firmware.

## Installation

The ZMK CLI is installed as part of the user setup process using `uv`. To update to the latest version:

```sh
uv tool upgrade zmk
```

## Commands

### Repository

| Command | Description |
|---|---|
| `zmk init` | Interactively create and clone a GitHub repository for ZMK config |
| `zmk cd` | Navigate to the config repository directory |

### Keyboard

| Command | Description |
|---|---|
| `zmk keyboard add` | Add a keyboard to the build system |
| `zmk keyboard remove` | Remove a keyboard from build configuration |
| `zmk keyboard list` | List supported hardware options |
| `zmk keyboard new` | Generate boilerplate for a new custom keyboard |

### Module

| Command | Description |
|---|---|
| `zmk module add` | Add a ZMK module to the configuration |
| `zmk module list` | List available modules |

### Editing & Download

| Command | Description |
|---|---|
| `zmk code` | Open keymap and config files in the configured text editor |
| `zmk download` / `zmk dl` | Open the GitHub Actions page to retrieve built firmware |

## Configuration Settings

| Setting | Description |
|---|---|
| `user.home` | Path to the ZMK config repository |
| `core.editor` | Preferred text editor |
| `core.explorer` | Preferred file browser |

## Notes

- `zmk init` handles GitHub authentication and repository creation interactively.
- Modules extend ZMK with additional features beyond the core firmware.

## Related

- [Installing ZMK](./user-setup.md)
- [Customizing ZMK](./customization.md)
