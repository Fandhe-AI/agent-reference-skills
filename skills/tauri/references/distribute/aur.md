---
source: https://v2.tauri.app/distribute/aur/
---

# AUR

Publishing to the Arch User Repository (AUR).

## Signature / Usage

Create an account at `https://aur.archlinux.org`, add the proper ssh keys, clone an empty repository and add a `PKGBUILD`:

```sh
git clone https://aur.archlinux.org/your-repo-name
```

```ini
pkgname=<pkgname>
pkgver=1.0.0
pkgrel=1
pkgdesc="Description of your app"
arch=('x86_64' 'aarch64')
url="https://github.com/<user>/<project>"
license=('MIT')
depends=('cairo' 'desktop-file-utils' 'gdk-pixbuf2' 'glib2' 'gtk3' 'hicolor-icon-theme' 'libsoup' 'pango' 'webkit2gtk-4.1')
options=('!strip' '!emptydirs')
install=${pkgname}.install
source_x86_64=("${url}/releases/download/v${pkgver}/appname_${pkgver}_amd64.deb")
source_aarch64=("${url}/releases/download/v${pkgver}/appname_${pkgver}_arm64.deb")
```

Generate `.SRCINFO`, test, publish:

```sh
makepkg --printsrcinfo > .SRCINFO
makepkg
git add .
git commit -m "Initial Commit"
git push
```

### Examples

Extracting from a Debian package (add `sha256sums_*` and a `package()`):

```ini
options=('!strip' '!debug')
sha256sums_x86_64=('ca85f11732765bed78f93f55397b4b4cbb76685088553dad612c5062e3ec651f')
sha256sums_aarch64=('ed2dc3169d34d91188fb55d39867713856dd02a2360ffe0661cb2e19bd701c3c')
package() {
	# Extract package data
	tar -xvf data.tar.gz -C "${pkgdir}"

}
```

`my-tauri-app.install`:

```ini
post_install() {
	gtk-update-icon-cache -q -t -f usr/share/icons/hicolor
	update-desktop-database -q
}

post_upgrade() {
	post_install
}

post_remove() {
	gtk-update-icon-cache -q -t -f usr/share/icons/hicolor
	update-desktop-database -q
}
```

Building from source (`<pkgname>-git`):

```ini
pkgname=<pkgname>-git
makedepends=('git' 'openssl' 'appmenu-gtk-module' 'libappindicator-gtk3' 'librsvg' 'cargo' 'pnpm' 'nodejs')
provides=('<pkgname>')
conflicts=('<binname>' '<pkgname>')
source=("git+${url}.git")
sha256sums=('SKIP')

pkgver() {
	cd <project>
	( set -o pipefail
	  git describe --long --abbrev=7 2>/dev/null | sed 's/\([^-]*-g\)/r\1/;s/-/./g' ||
	  printf "r%s.%s" "$(git rev-list --count HEAD)" "$(git rev-parse --short=7 HEAD)"
	)
}

prepare() {
	cd <project>
	pnpm install
}

build() {
	cd <project>
	pnpm tauri build -b deb
}

package() {
	cp -a <project>/src-tauri/target/release/bundle/deb/<project>_${pkgver}_*/data/* "${pkgdir}"
}
```

## Options / Props

| Variable | Description |
| --- | --- |
| `pkgname` | Package name |
| `pkgver` | Version; best used in the source variable |
| `pkgdesc` | Shown on the AUR page |
| `arch` | Architectures that can install the package |
| `url` | Not required, helps the package look professional |
| `install` | `.install` script run on install, removal or upgrade |
| `depends` | Required to run the app; for any Tauri app include all dependencies shown above |
| `source` | Required; may be made architecture specific (`source_x86_64`) |

## Notes

- Only the changed fields of the two examples are shown; the remaining `PKGBUILD` fields are the same as in the first snippet.
- The source page ends with stray link definitions for `async_runtime::spawn`, `serde` and `thiserror` unrelated to AUR; they are not carried over.

## Related

- [debian](./debian.md)
- [bundle-linux config](../config/bundle-linux.md)
