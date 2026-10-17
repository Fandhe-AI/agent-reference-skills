---
source: https://v2.tauri.app/distribute/snapcraft/
---

# Snapcraft

Distribute your app on Snapcraft.io by building a snap from the Tauri `.deb` bundle.

## Signature / Usage

Prerequisites:

```sh
sudo apt install snapd          # Debian
sudo snap install core22
sudo snap install snapcraft --classic
```

Arch: `sudo pacman -S --needed git base-devel`, then `git clone https://aur.archlinux.org/snapd.git`, `cd snapd`, `makepkg -si`, `sudo systemctl enable --now snapd.socket`, `sudo systemctl start snapd.socket`, `sudo systemctl enable --now snapd.apparmor.service`. Fedora: `sudo dnf install snapd`, then `sudo ln -s /var/lib/snapd/snap /snap` (enable classic snap support) and reboot.

Configuration: create an UbuntuOne account, register an App name on snapcraft.io, create a `snapcraft.yaml` in your project root and adjust the names:

```yaml
name: appname
base: core22
version: '0.1.0'
summary: Your summary # 79 char long summary
description: |
  Your description

grade: stable
confinement: strict

layout:
  /usr/lib/$SNAPCRAFT_ARCH_TRIPLET/webkit2gtk-4.1:
    bind: $SNAP/usr/lib/$SNAPCRAFT_ARCH_TRIPLET/webkit2gtk-4.1

apps:
  appname:
    command: usr/bin/appname
    desktop: usr/share/applications/appname.desktop
    extensions: [gnome]
    #plugs:
    #  - network
    # Add whatever plugs you need here, see https://snapcraft.io/docs/snapcraft-interfaces for more info.
    # The gnome extension already includes [ desktop, desktop-legacy, gsettings, opengl, wayland, x11, mount-observe, calendar-service ]
    #  - single-instance-plug # add this if you're using the single-instance plugin
    #slots:
    # Add the slots you need to expose to other snaps
    #  - single-instance-plug # add this if you're using the single-instance plugin

# Add these lines only if you're using the single-instance plugin
# Check https://v2.tauri.app/plugin/single-instance/ for details
#slots:
#  single-instance:
#    interface: dbus
#    bus: session
#    name: org.net_mydomain_MyApp.SingleInstance # Remember to change net_mydomain_MyApp to your app ID with "_" instead of "." and "-"
#
#plugs:
#  single-instance-plug:
#    interface: dbus
#    bus: session
#    name: org.net_mydomain_MyApp.SingleInstance # Remember to change net_mydomain_MyApp to your app ID with "_" instead of "." and "-"

package-repositories:
  - type: apt
    components: [main]
    suites: [jammy]
    key-id: 78E1918602959B9C59103100F1831DDAFC42E99D
    url: http://ppa.launchpad.net/snappy-dev/snapcraft-daily/ubuntu

parts:
  build-app:
    plugin: dump
    build-snaps:
      - node/20/stable
      - rustup/latest/stable
    build-packages:
      - libwebkit2gtk-4.1-dev
      - build-essential
      - curl
      - wget
      - file
      - libxdo-dev
      - libssl-dev
      - libayatana-appindicator3-dev
      - librsvg2-dev
      - dpkg
    stage-packages:
      - libwebkit2gtk-4.1-0
      - libayatana-appindicator3-1
    source: .
    override-build: |
      set -eu
      npm install
      npm run tauri build -- --bundles deb
      dpkg -x src-tauri/target/release/bundle/deb/*.deb "${SNAPCRAFT_PART_INSTALL}/"
      sed -i -e "s|Icon=appname|Icon=/usr/share/icons/hicolor/32x32/apps/appname.png|g" "${SNAPCRAFT_PART_INSTALL}/usr/share/applications/appname.desktop"
```

Build, test, release:

```sh
sudo snapcraft
sudo snap install --dangerous ./mysnap_latest_amd64.snap  # install the locally built snap before running it
snap run your-app
snapcraft login # Login with your UbuntuOne credentials
snapcraft upload --release=stable mysnap_latest_amd64.snap
```

## Options / Props

| Key | Description |
| --- | --- |
| `name` | Name of your app; must be set to the name you registered |
| `base` | Which core you are using |
| `version` | Version; update with each change to the source repository |
| `apps` | Exposes the desktop and binary files so the user can run your app |
| `package-repositories` | Adds a package repository to help satisfy dependencies |
| `build-packages` / `build-snaps` | Build dependencies |
| `stage-packages` / `stage-snaps` | Runtime dependencies |
| `override-build` | Commands run after the sources were pulled |

## Notes

- The source lists `suites: [noble]` under `package-repositories`; changed to `jammy` here to match `base: core22` (Ubuntu 22.04). Drop the extra repository if you do not need it.
- Shell variables in `override-build` are quoted (`"${VAR}"`) here; the official example leaves them unquoted.
- Building automatically: on your app's developer page open the `builds` tab, click `login with github`, then enter your repository's details.
- The source marks the `snap run` step with `TODO: This seems to be wrong`; a `snap install --dangerous` step is added because snapcraft only builds the `.snap` and does not install it.
- Replace `net_mydomain_MyApp` in the single-instance slot/plug names with your app ID using `_` instead of `.` and `-`.

## Related

- [debian](./debian.md)
- [bundle-linux config](../config/bundle-linux.md)
