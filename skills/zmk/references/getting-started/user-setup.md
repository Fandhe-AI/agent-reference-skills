# Installing ZMK

ZMK uses GitHub Actions to build firmware in the cloud, eliminating the need to set up a local toolchain. Users create a personal `zmk-config` repository that holds their keyboard configuration, then push changes to trigger automated builds.

## Prerequisites

| Tool | Purpose |
|---|---|
| Git | Version control for managing the config repository |
| GitHub account | Cloud builds via GitHub Actions and repository hosting |
| uv | Python package manager used to install ZMK CLI |

## Setup Steps

1. Install the ZMK CLI via `uv` (see [ZMK CLI](./zmk-cli.md)).
2. Run `zmk init` to create and clone a GitHub repository for your configuration.
3. Edit `build.yaml` to specify your keyboard board and shield.
4. Customize your `<keyboard>.keymap` and `<keyboard>.conf` files.
5. Commit and push changes — GitHub Actions will build the firmware automatically.
6. Download the compiled firmware artifact from the GitHub Actions run.

## Flashing Firmware

| File type | Method |
|---|---|
| `.uf2` | Enter bootloader mode, then copy the file to the mounted drive |
| `.hex` | Flash via DFU using QMK Toolbox |

## Notes

- When Git prompts for credentials, do **not** enter your password. Paste your GitHub personal access token (with `workflow` scope) in the password field instead. GitHub CLI can be used as an alternative for authentication.
- For split keyboards, test the central half (typically the left side) over USB before attempting wireless pairing.
- Only the central half needs to be reflashed when updating keymaps on a split keyboard.
- Local builds are possible by following the toolchain setup documentation.

## Related

- [ZMK CLI](./zmk-cli.md)
- [Customizing ZMK](./customization.md)
- [Supported Hardware](./hardware.md)
