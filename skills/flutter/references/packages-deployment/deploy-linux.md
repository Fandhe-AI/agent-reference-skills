---
source: https://docs.flutter.dev/deployment/linux
---

# Build and release a Linux app to the Snap Store

How to prepare for and release a Flutter Linux app to the Snap Store (or an alternative channel).

## Signature / Usage

```console
$ snapcraft
$ snapcraft --use-lxd
$ sudo snap install ./super-cool-app_0.1.0_amd64.snap --dangerous
$ snapcraft upload --release=<channel> <file>.snap
```

### Prerequisites and build environment

Ubuntu OS 18.04 LTS (or higher), the Snapcraft command line tool, and the LXD container manager.

```console
$ sudo snap install snapcraft --classic
$ sudo snap install lxd
$ sudo lxd init
```

Accept the default answers of `lxd init` for most use cases. If LXD cannot connect to its socket on first run, add your user to the `lxd` group and log out and back in:

```console
$ sudo usermod -a -G lxd <your username>
```

### snapcraft.yaml

Place at `<project root>/snap/snapcraft.yaml` (YAML is sensitive to white space):

```yaml
name: super-cool-app
version: 0.1.0
summary: Super Cool App
description: Super Cool App that does everything!

confinement: strict
base: core22
grade: stable

slots:
  dbus-super-cool-app: # adjust accordingly to your app name
    interface: dbus
    bus: session
    name: org.bar.super_cool_app # adjust accordingly to your app name and

apps:
  super-cool-app:
    command: super_cool_app
    extensions: [gnome] # gnome includes the libraries required by flutter
    plugs:
    - network
    slots:
      - dbus-super-cool-app
parts:
  super-cool-app:
    source: .
    plugin: flutter
    flutter-target: lib/main.dart # The main entry-point file of the application
```

| Key | Description |
|-----|-------------|
| `grade` | Quality of the snap; relevant for publication. |
| `confinement` | Level of system resource access once installed; `strict` limits access to resources defined by plugs. |
| `base` | Private core root filesystem version providing the minimal set of common libraries. |
| `command` | Binary, relative to the snap's root, run when the snap is invoked. |
| `extensions` | Reusable components exposing libraries and tools; `gnome` exposes the GTK 3 libraries to the Flutter snap. |
| `plugs` | System interfaces required under strict confinement (this snap needs `network`). |
| DBus interface | The providing snap declares a slot with the well-known DBus name and bus; a snap declaration is needed to claim the name via the Snap Store (upload and request manual review). |
| `plugin: flutter` | Provides the Flutter SDK tools without manual download; the `nil` plugin performs no action (manual override). |

### Desktop file and icon

Place at `<project root>/snap/gui/super-cool-app.desktop`; the icon and the `.desktop` file name must be the same as the app name in the YAML file. Place the `.png` icon at `<project root>/snap/gui/super-cool-app.png`.

```ini
[Desktop Entry]
Name=Super Cool App
Comment=Super Cool App that does everything
Exec=super-cool-app
Icon=${SNAP}/meta/gui/super-cool-app.png # Replace name with your app name.
Terminal=false
Type=Application
Categories=Education; # Adjust accordingly your snap category.
```

### Publish

1. Create a developer account at snapcraft.io.
2. Register the app's name (Snap Store Web UI, or `snapcraft login` then `snapcraft register`).
3. Upload with `snapcraft upload --release=<channel> <file>.snap`.

Snap Store channels have three components: **Track** (default `latest`), **Risk** (`stable`, `candidate`, `beta`, `edge`) and **Branch** (short-lived sequences to test bug-fixes). The Snap Store runs several automated checks and might also do a manual review.

## Notes

- Additional deployment tools named in the source: fastforge (all-in-one Flutter packaging and distribution tool supporting appimage, deb, pacman, rpm and more) and flatpak-flutter (Flatpak manifest tooling for the offline build of Flutter apps, for publishing on Flathub).
- The snap is tested with `--dangerous` because it is a locally built, unsigned snap; use a disposable test machine.

## Related

- [Set up Flutter flavors for Linux](./flavors-linux.md)
- [Continuous delivery with Flutter](./continuous-delivery.md)
