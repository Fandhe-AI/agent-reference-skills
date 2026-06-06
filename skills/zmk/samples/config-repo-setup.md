# Config Repo Setup

Bootstrap a ZMK config repository with GitHub Actions for cloud firmware builds.

```bash
# Install ZMK CLI (requires uv)
uvx zmk

# Initialise a new config repo (creates or clones a GitHub repository)
zmk init

# Add a keyboard to the build
zmk keyboard add

# Push changes — GitHub Actions builds firmware automatically
git add .
git commit -m "feat: initial keymap"
git push

# Download the compiled firmware archive (.uf2 / .hex)
zmk download
```

Repository layout created by `zmk init`:

```
zmk-config/
├── .github/
│   └── workflows/
│       └── build.yml        # GitHub Actions workflow
├── build.yaml               # List of boards/shields to build
└── config/
    ├── <keyboard>.keymap    # Keymap and behavior definitions
    └── <keyboard>.conf      # Kconfig overrides (enable/disable features)
```

Flashing a UF2 firmware file:
```
# 1. Double-click the keyboard's reset button to enter bootloader
# 2. A USB drive appears on the host
# 3. Copy the .uf2 file onto the drive — keyboard reboots automatically
cp <keyboard>-zmk.uf2 /Volumes/<BOOTLOADER_DRIVE>/
```

## Notes

- `build.yaml` declares which board and shield combinations to build; each entry produces a separate firmware artifact.
- Edit `config/<keyboard>.conf` to enable optional features (e.g., `CONFIG_ZMK_RGB_UNDERGLOW=y`) without modifying ZMK source.
- For split keyboards, both halves share a single `.keymap` file; flash the central half first, then the peripheral.
- To add a community module (e.g., `zmk-tri-state`), reference it in `config/west.yml` under `projects`.
