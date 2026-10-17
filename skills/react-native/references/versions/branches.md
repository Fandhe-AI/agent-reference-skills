---
source: https://reactnative.dev/releases/branches
---

# Branches

Platform component versions (React, Hermes, Yoga, DevTools frontend) pinned by each React Native release, read from the tip of the corresponding `X-stable` branch in `react/react-native`.

## Signature / Usage

Branch naming:

```text
0.88-stable
0.87-stable
...
https://github.com/react/react-native/tree/0.88-stable
```

## Options / Props

| Branch | React | Hermes (Legacy) | Hermes V1 | Yoga | RN DevTools frontend |
| --- | --- | --- | --- | --- | --- |
| 0.88-stable | `19.2.3` | — | `v260318099.0.2` | `98300847` | `chromium/7103` (Chrome 136) |
| 0.87-stable | `19.2.3` | — | `v250829098.0.16` | `ee004e6b` | `chromium/7103` (Chrome 136) |
| 0.86-stable | `19.2.3` | `v0.17.0` | `v250829098.0.16` | `c76b52b2` | `chromium/7103` (Chrome 136) |
| 0.85-stable | `19.2.3` | `v0.16.0` | `v250829098.0.10` | `cfdacac0` | `chromium/7103` (Chrome 136) |
| 0.84-stable | `19.2.3` | `v0.15.1` | `v250829098.0.9` | `8ba025e8` | `chromium/7103` (Chrome 136) |
| 0.83-stable | `19.2.0` | `v0.14.1` | `v250829098.0.4` | `69e87a4e` | `chromium/7103` (Chrome 136) |
| 0.82-stable | `19.1.1` | `2025-09-01-RNv0.82.0` | `76dc3793` | `9f2a9476` | `chromium/7103` (Chrome 136) |
| 0.81-stable | `19.1.4` | `2025-07-07-RNv0.81.0` | — | `c7c85621` | `chromium/7103` (Chrome 136) |
| 0.80-stable | `19.1.0` | `2025-07-24-RNv0.80.2` | — | `51e60950` | `chromium/6613` (Chrome 128) |
| 0.79-stable | `19.0.0` | `2025-06-04-RNv0.79.3` | — | `91997d6c` | `chromium/6613` (Chrome 128) |
| 0.78-stable | `19.0.0` | `2025-01-13-RNv0.78.0` | — | `91997d6c` | `chromium/6613` (Chrome 128) |

## Notes

- Yoga values are commit hashes in `facebook/yoga`. A dash means the component is not shipped in that release.
- The table is as published on the 0.87 docs snapshot and includes 0.88-stable. The 0.88 release blog separately states React 19.3.0 is synced into React Native and Hermes moves to 260318099.0.4; these differ from the table row above, so treat the table as the source for branch pins and the blog as release-note text.
- Hermes here is the Hermes JS engine for React Native; unrelated to the hermes-agent skill.

## Related

- [releases-overview.md](./releases-overview.md)
- [react-native-0.84.md](./react-native-0.84.md)
- ../workflow/hermes.md
