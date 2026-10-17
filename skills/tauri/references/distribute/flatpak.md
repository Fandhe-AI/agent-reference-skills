---
source: https://v2.tauri.app/distribute/flatpak/
---

# Flatpak

Distribute a Tauri app as a Flatpak via Flathub. The source page (titled "Flathub") has two tabs: Open Source and Closed Source.

## Signature / Usage

Build and test locally (closed source flow):

```sh
flatpak install flathub org.gnome.Platform//47 org.gnome.Sdk//47
flatpak-builder --force-clean --user --install --disable-cache --repo flatpak-repo flatpak flatpak-builder.yaml
flatpak run <your flatpak id>
flatpak -y --user update <your flatpak id>
```

Install the tools (example for Debian; Arch: `sudo pacman -S --needed flatpak flatpak-builder`, Fedora: `sudo dnf install flatpak flatpak-builder`, Gentoo: `sudo emerge --ask sys-apps/flatpak dev-util/flatpak-builder`):

```sh
sudo apt install flatpak flatpak-builder
```

### Closed Source tab

Steps: install `flatpak` and `flatpak-builder`; install the runtime; build the `.deb` of your tauri app; create an AppStream MetaInfo file; create the manifest; install and test; submit to Flathub.

Manifest `flatpak-builder.yaml`:

```yaml
id: <identifier>

runtime: org.gnome.Platform
runtime-version: '47'
sdk: org.gnome.Sdk

command: <main_binary_name>
finish-args:
  - --socket=wayland # Permission needed to show the window
  - --socket=fallback-x11 # Permission needed to show the window
  - --device=dri # OpenGL, not necessary for all projects
  - --share=ipc
  - --talk-name=org.kde.StatusNotifierWatcher # Optional: needed only if your app uses the tray icon
  - --filesystem=xdg-run/tray-icon:create # Optional: needed only if your app uses the tray icon - see an alternative way below
  # - --env=WEBKIT_DISABLE_COMPOSITING_MODE=1 # Optional: may solve some issues with black webviews on Wayland

modules:
  - name: binary
    buildsystem: simple

    sources:
      # A reference to the previously generated flatpak metainfo file
      - type: file
        path: flatpak.metainfo.xml
      # If you use GitHub releases, you can target an existing remote file
      - type: file
        url: https://github.com/your_username/your_repository/releases/download/v1.0.1/yourapp_1.0.1_amd64.deb
        sha256: 08305b5521e2cf0622e084f2b8f7f31f8a989fc7f407a7050fa3649facd61469 # This is required if you are using a remote source
        only-arches: [x86_64] # This source is only used on x86_64 Computers
      # You can also use a local file for testing
      # - type: file
      #   path: yourapp_1.0.1_amd64.deb
    build-commands:
      - set -e

      # Extract the deb package
      - mkdir deb-extract
      - ar -x *.deb --output deb-extract
      - tar -C deb-extract -xf deb-extract/data.tar.gz

      # Copy binary
      - 'install -Dm755 deb-extract/usr/bin/<main_binary_name> /app/bin/<main_binary_name>'

      # Copy additional resources only if the deb contains them:
      - 'if [ -d deb-extract/usr/lib/<product_name> ]; then mkdir -p /app/lib/<product_name> && cp -r deb-extract/usr/lib/<product_name>/. /app/lib/<product_name> && chmod -R u+rwX,go+rX,go-w /app/lib/<product_name>; fi'

      # Copy desktop file + ensure the right icon is set
      - sed -i 's/^Icon=.*/Icon=<identifier>/' deb-extract/usr/share/applications/<product_name>.desktop
      - install -Dm644 deb-extract/usr/share/applications/<product_name>.desktop /app/share/applications/<identifier>.desktop

      # Copy icons
      - install -Dm644 deb-extract/usr/share/icons/hicolor/128x128/apps/<main_binary_name>.png /app/share/icons/hicolor/128x128/apps/<identifier>.png
      - install -Dm644 deb-extract/usr/share/icons/hicolor/32x32/apps/<main_binary_name>.png /app/share/icons/hicolor/32x32/apps/<identifier>.png
      - install -Dm644 deb-extract/usr/share/icons/hicolor/256x256@2/apps/<main_binary_name>.png /app/share/icons/hicolor/256x256@2/apps/<identifier>.png
      - install -Dm644 flatpak.metainfo.xml /app/share/metainfo/<identifier>.metainfo.xml
```

Tray icon without changing the manifest (saves the tray image into the cache folder where the app already has permission):

```rust
use tauri::{tray::TrayIconBuilder, Manager};

TrayIconBuilder::new()
  .icon(app.default_window_icon().unwrap().clone())
  .temp_dir_path(app.path().app_cache_dir().unwrap()) // will save to the cache folder ($XDG_CACHE_HOME) where the app already has permission
  .build(app)
  .unwrap();
```

Submitting to Flathub: fork `https://github.com/flathub/flathub/fork`, clone with `git clone --branch=new-pr git@github.com:your_github_username/flathub.git`, `cd flathub`, `git checkout -b your_app_name`, add your manifest to the branch, commit and push, open a pull request against the `new-pr` branch. After review and approval you receive an invitation to edit your app's repository.

### Open Source tab

1. Get tools:

```sh
git submodule add https://github.com/flatpak/flatpak-builder-tools.git
(cd flatpak-builder-tools/node/flatpak_node_generator && pipx install .) # Change this to your prefered installation method
```

2. Generate sources (Yarn shown; NPM uses `npm /path/to/your/lock/file/package-lock.json`):

```sh
flatpak-node-generator --no-requests-cache -o node-sources.json yarn /path/to/your/lock/file/yarn.lock
python3 flatpak-builder-tools/cargo/flatpak-cargo-generator.py -o cargo-sources.json src-tauri/Cargo.lock
```

3. Create the metainfo (`org.your.id`, `launchable`, `name`, `developer`, `content_rating`, `keywords`, `branding`, `summary`, `metadata_license`, `project_license`, `url`, `supports`, `description`, `screenshots`, `releases`, `update_contact`); including it in the deb bundle is recommended but not required:

```json
"linux": {
  "deb": {
    "files": {
      "/usr/share/metainfo/org.your.id.metainfo.xml": "relative/path/from/your/tauri.conf.json/to/your/org.your.id.metainfo.xml"
    }
  }
}
```

4. Create the manifest (`org.gnome.Platform` runtime 47, `finish-args` for wayland / fallback-x11 / dri / ipc, sdk-extensions `node20` and `rust-stable`, a module whose sources are the git tag plus `cargo-sources.json` and `node-sources.json`, offline `yarn install` and `yarn run tauri build -- -b deb`, then `install -Dm755` / `install -Dm644` of binary, desktop file, icons and metainfo from the extracted deb). The source YAML is malformed by the docs renderer; build it from the closed source manifest above.
5. Submit to Flathub: same fork / `new-pr` branch pull-request flow as above.

## Notes

- The additional-resources copy is wrapped in an `if [ -d ... ]` guard (upstream copies unconditionally, which fails for apps without bundled resources).
- The tray snippet is adjusted from the source to compile on v2: added `use tauri::{tray::TrayIconBuilder, Manager};` and `.build(app)` (the source calls `.build()` without the manager argument).
- The source installs runtime 46 but its manifest uses runtime-version `'47'`; the install command is aligned to 47 here. The Gnome runtime includes all dependencies of the standard Tauri app with their correct versions.
- If your binary needs more libraries than the default tauri app, add them to the manifest. Including a locally built `.so` is only suitable for fast local development; build the library from source inside the flatpak for the final build.
- The Open Source tab YAML manifest in the original page is garbled (lost indentation, unterminated code fence); only its described structure is summarized above.
- Added `--install` to the flatpak-builder command: the source only exports to `flatpak-repo` (despite its `# Install the flatpak` comment), so the following `flatpak run` would fail on first use.
- Step 1 runs the generator install in a subshell so step 2's paths (`flatpak-builder-tools/...`, `src-tauri/Cargo.lock`) resolve from the project root; the source leaves the shell inside `flatpak_node_generator`.
- The source uses `find ... -exec chmod 644`, which strips execute bits from bundled helper executables; `chmod -R u+rwX,go+rX,go-w` keeps them.
- Runtime 47 (and the `node20` SDK extension) is what the source uses; GNOME runtimes are supported for about a year, so check the currently supported version with `flatpak remote-info flathub org.gnome.Platform//<version>` and bump `runtime-version` / the install command before submitting to Flathub.
- The source names the binary `<executable_name>` in the install line but `<main_binary_name>` elsewhere; unified to `<main_binary_name>` so `command` resolves.
- The Flatpak card is commented out of the official distribute overview page, but this page exists.

## Related

- [debian](./debian.md)
- [bundle-linux config](../config/bundle-linux.md)
- [tray icon (Rust API)](../rust-api/tray.md)
