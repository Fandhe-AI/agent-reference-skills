---
source: https://docs.flutter.dev/reference/supported-platforms
---

# Supported deployment platforms

The combinations of hardware architectures and operating system versions on which Flutter supports deploying apps, as of the Flutter version documented on the site (the page templates it as `site.documentedFlutterVersion`). These combinations are called platforms.

## Signature / Usage

Categories used by the tables below:

```text
Supported    : The platforms and versions that the Flutter team supports.
CI-tested    : The Flutter team tests these platforms on every commit.
Unsupported  : The Flutter team doesn't test or support these platforms.
```

### Mobile platforms

| Platform | Architectures | Supported | CI-tested | Unsupported | Deploy to |
| --- | --- | --- | --- | --- | --- |
| Android | x64, Arm32, Arm64 | 24 to 37 | 24 to 36 | 23 and earlier | /deployment/android |
| iOS | Arm64 | 15 to 27 | 18 and 26 | 14 and earlier | /deployment/ios |

### Desktop platforms

| Platform | Architectures | Supported | CI-tested | Unsupported | Deploy to |
| --- | --- | --- | --- | --- | --- |
| Windows | x64, Arm64 | 10, 11 | 10 | 8 and earlier | /deployment/windows |
| macOS | x64, Arm64 | Monterey (12) to Golden Gate (27) | Sequoia (15) | Big Sur (11) and earlier | /deployment/macos |
| Debian (Linux) | x64, Arm64 | 10 to 13 | 12 | 9 and earlier | /deployment/linux |
| Ubuntu (Linux) | x64, Arm64 | 20.04 LTS to 24.04 LTS | 22.04 LTS | 25.10 and earlier non-LTS | /deployment/linux |

### Web platforms

| Browser | Architectures | Supported | CI-tested | Unsupported | Deploy to |
| --- | --- | --- | --- | --- | --- |
| Chrome | JavaScript, WebAssembly | Latest 2 | 145 | 95 and earlier | /deployment/web |
| Firefox | JavaScript | Latest 2 | 148 | 98 and earlier | /deployment/web |
| Safari | JavaScript | 15.6 and newer | 18.6 | 15.5 and earlier | /deployment/web |
| Edge | JavaScript, WebAssembly | Latest 2 | 145 | 95 and earlier | /deployment/web |

## Notes

- macOS Intel (x64) deprecation: as Apple phases out Intel-based Macs, Flutter is phasing out support for Intel (x64) hardware. See the macOS Intel deprecation strategy (https://flutter.dev/go/macos-intel-deprecation) for the timeline and impact.
- For support in previous Flutter versions, see the Flutter SDK release notes (breaking changes and support updates by release) and the page history of `sites/docs/src/content/reference/supported-platforms.md` in flutter/website.

## Related

- [Build modes](./build-modes.md)
