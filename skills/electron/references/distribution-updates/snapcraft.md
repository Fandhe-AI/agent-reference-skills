---
source: https://www.electronjs.org/docs/latest/tutorial/snapcraft
---

# Snapcraft Guide (Linux)

How to package your Electron application for any Snapcraft environment, including the Ubuntu Software Center. Snaps are containerized software packages that include required dependencies, auto-update, and work on all major Linux distributions without system modification.

## Signature / Usage

Three ways to create a `.snap` file:

1. Use Electron Forge or `electron-builder` (both support `snap` out of the box; the easiest option).
2. Use `electron-installer-snap`, which takes `@electron/packager`'s output.
3. Use an already created `.deb` package.

Some cases need the `snapcraft` tool installed.

```sh
npm install --save-dev electron-installer-snap
npx electron-installer-snap --src=out/myappname-linux-x64
```

Programmatic use:

```js
const snap = require('electron-installer-snap')

snap(options).then((snapPath) => console.log(`Created snap at ${snapPath}!`))
```

## Using snapcraft with @electron/packager

Create a `snap` directory in the project root with `snap/snapcraft.yaml`:

```yaml
name: electron-packager-hello-world
version: '0.1'
summary: Hello World Electron app
description: |
  Simple Hello World Electron app as an example
base: core22
confinement: strict
grade: stable

apps:
  electron-packager-hello-world:
    command: my-app/my-app
    extensions: [gnome]
    plugs:
    - browser-support
    - network
    - network-bind
    environment:
      # Correct the TMPDIR path for Chromium Framework/Electron to ensure
      # libappindicator has readable resources.
      TMPDIR: $XDG_RUNTIME_DIR

parts:
  my-app:
    plugin: nil
    source: .
    override-build: |
        npm install electron @electron/packager
        npx electron-packager . --overwrite --platform=linux --output=release-build --prune=true
        cp -rv ./my-app-linux-* "${SNAPCRAFT_PART_INSTALL}/my-app"
    build-snaps:
    - node/22/stable
    build-packages:
    - unzip
    stage-packages:
    - libnss3
    - libnspr4
```

Replace all `my-app` with your project's name for an existing project. Build, install, and run:

```sh
snapcraft
sudo snap install electron-packager-hello-world_0.1_amd64.snap --dangerous
electron-packager-hello-world
```

## Using an existing Debian package

`snapcraft` can turn an existing `.deb` into a `.snap`, configured by a `snapcraft.yaml` with `source-type: deb`, `confinement: classic`, and an `electron-launch` helper:

```sh
#!/bin/sh

exec "$@" --executed-from="$(pwd)" --pid=$$ > /dev/null 2>&1 &
```

For `strict` confinement you can use the `desktop-launch` command:

```yaml
apps:
  myApp:
    # Correct the TMPDIR path for Chromium Framework/Electron to ensure
    # libappindicator has readable resources.
    command: env TMPDIR=$XDG_RUNTIME_DIR PATH=/usr/local/bin:${PATH} ${SNAP}/bin/desktop-launch $SNAP/myApp/desktop
    desktop: usr/share/applications/desktop.desktop
```

## Optional: enabling desktop capture

Capturing the desktop requires the PipeWire library in some Linux configurations that use Wayland. Ensure the base snap is `core22` or newer, create a part called `pipewire`, and add it to the `after` section of your application:

```yaml
  pipewire:
    plugin: nil
    build-packages: [libpipewire-0.3-dev]
    stage-packages: [pipewire]
    prime:
      - usr/lib/*/pipewire-*
      - usr/lib/*/spa-*
      - usr/lib/*/libpipewire*.so*
      - usr/share/pipewire
```

Then configure the environment:

```yaml
    environment:
      SPA_PLUGIN_DIR: $SNAP/usr/lib/$CRAFT_ARCH_TRIPLET/spa-0.2
      PIPEWIRE_CONFIG_NAME: $SNAP/usr/share/pipewire/pipewire.conf
      PIPEWIRE_MODULE_DIR: $SNAP/usr/lib/$CRAFT_ARCH_TRIPLET/pipewire-0.3
```

## Notes

- Adapted (not in the official docs): the official snapcraft.yaml uses `node/14/stable`, which current `@electron/packager` does not support; this version uses `node/22/stable`. Check the `engines.node` of the installed @electron/packager version.
- The official example adds `--no-sandbox` to the `command`; this disables the Chromium sandbox, so it is omitted here and should not be built into distributed builds (testing only; see the command-line switches page in getting-started).
- In `override-build`, `${SNAPCRAFT_PART_INSTALL}` is quoted (the original is unquoted); the glob part is intentionally left unquoted.
- Multiple solutions exist for creating Debian packages: Electron Forge, `electron-builder`, or `electron-installer-debian`.

## Related

- [Application Packaging](./application-distribution.md)
- [Distribution Overview](./distribution-overview.md)
