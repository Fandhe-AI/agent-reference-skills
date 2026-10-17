---
source: https://reactnative.dev/docs/0.87/reactnativeversion
---

# ReactNativeVersion

Exposes the version of the resolved `react-native` package on the JS side. Apps and libraries can use it to check compatibility or enable version-specific behavior.

## Signature / Usage

```tsx
import {ReactNativeVersion} from 'react-native';

const version = ReactNativeVersion.getVersionString(); // 0.87.1
const {major, minor, patch, prerelease} = ReactNativeVersion;
major; // 0
minor; // 87
patch; // 1
prerelease; // null
```

### Properties and Methods

| Name | Signature | Description |
| --- | --- | --- |
| `major` | `static major: number;` | Major version number of the resolved `react-native` package. |
| `minor` | `static minor: number;` | Minor version number. |
| `patch` | `static patch: number;` | Patch version number. |
| `prerelease` | `static prerelease: string \| null;` | Prerelease tag, or `null` for stable releases. |
| `getVersionString()` | `static getVersionString(): string;` | Full version string, `major.minor.patch` or `major.minor.patch-prerelease`. |

## Notes

- `Platform.constants.reactNativeVersion` also exists, but is the per-platform native-reported React Native version.

## Related

- [Platform](./platform.md)
