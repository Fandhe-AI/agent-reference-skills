# Customizing ZMK

ZMK configuration lives in a personal `zmk-config` repository, keeping user settings separate from the ZMK firmware source. Changes are committed and pushed to GitHub, where Actions automatically build updated firmware.

## Configuration Files

Each keyboard in a `zmk-config` has two primary files under the `config/` subfolder:

| File | Purpose |
|---|---|
| `<keyboard>.conf` | Feature toggles and firmware options (Kconfig format) |
| `<keyboard>.keymap` | Key assignments and layer definitions |

The `build.yaml` file at the repository root specifies which board/shield combinations to build.

## Workflow

1. Edit `config/<keyboard>.conf` to enable or disable firmware features.
2. Edit `config/<keyboard>.keymap` to define your key layout and layers.
3. Update `build.yaml` if adding or removing a keyboard.
4. Commit and push — GitHub Actions builds and publishes firmware artifacts.
5. Download and flash the firmware to your keyboard.

## Multi-Keyboard Support

To manage multiple keyboards in one repository, add entries to `build.yaml` and place each keyboard's `.conf` and `.keymap` files in the `config/` subfolder.

Example `build.yaml` adding a Lily58 shield with nice!nano v2 next to an existing Corne:

```yaml
include:
  - board: nice_nano@1//zmk
    shield: corne_left
  - board: nice_nano@1//zmk
    shield: corne_right
  - board: nice_nano//zmk
    shield: lily58_left
  - board: nice_nano//zmk
    shield: lily58_right
```

The Lily58 shield files go into the `config` sub-folder inside `zmk-config` together with the Corne files, e.g.:

```
corne.conf
corne.keymap
lily58.conf
lily58.keymap
```

## Notes

- For split keyboards, only the central (left) half needs to be reflashed when updating keymaps.
- Local builds are supported for users who prefer not to rely on GitHub Actions — follow the toolchain setup documentation.
- The `zmk code` command (ZMK CLI) opens keymap and config files in your preferred editor.

## Related

- [Installing ZMK](./user-setup.md)
- [ZMK CLI](./zmk-cli.md)
