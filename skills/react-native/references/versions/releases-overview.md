---
source: https://reactnative.dev/releases/overview
---

# Releases Overview

Schedule, support levels, and npm release channels of React Native. The schedule table on the official page is rendered dynamically (`ReleasesTable`) and is not reproduced here.

## Signature / Usage

Release channels (npm dist-tags of `react-native`):

```text
| Channel   | Install                | Stability            | Use it for                         |
| latest    | react-native@latest    | Stable               | Production apps                    |
| next      | react-native@next      | Release candidate    | Testing an upcoming release        |
| nightly   | react-native@nightly   | Unstable             | Tracking `main` for early feedback |
```

## Options / Props

Support definitions:

| Level | Meaning |
| --- | --- |
| Future | After a new version branch gets cut, creating new Release Candidates to allow the community to test the upcoming version is very important. New RC releases are done at a high pace, as soon as viable. |
| Active | Stable releases in active support receive frequent updates. Latest stable has the highest priority, and at the start of its stable cycle (right after .0 is released) multiple patches will be done as soon as possible to stabilize the version and ensure a good upgrade experience to the community. |
| End of Cycle | A version in this support bracket will receive less patches, unless some important regressions need to be addressed. Once a next version becomes the new latest stable, before the version in EoC moves over into Unsupported one last patch released will be produced with the latest receive pick requests. |
| Unsupported | When a version is in the unsupported stage, no new released are to be expected. Only very important regressions might create exceptions to this rule; it is recommended that codebases using an unsupported version upgrade as soon as possible. |

## Notes

- Commitment to Stability: the **latest 3 minor series** are maintained (e.g. 0.78.x, 0.77.x and 0.76.x when 0.78 is the latest release), with regular updates and bug fixes. See the react-native-releases working group support policy for details.
- Release candidates and nightlies are not intended for production use. The channel section is most relevant to developers who work on frameworks, libraries, or developer tooling; app developers should not need to worry about channels other than `latest`.
- Release Candidates: published under the `next` tag ahead of every stable release, starting at `rc.0` (versioned like `0.79.0-rc.0`).
- Nightlies: published daily from the `main` branch of `react/react-native`, versioned like `0.80.0-nightly-<DATE>-<SHA>` (`<DATE>` is the build date, `<SHA>` the source commit).
- Feature-flag release levels (`STABLE` / `CANARY` / `EXPERIMENTAL`) are a separate mechanism, see the release-levels page in the workflow category.
- Distinct from Expo SDK release cadence (expo skill, if installed) and from the Android / Apple platform skills; this page covers `react-native` npm releases only.

## Related

- [versioning-policy.md](./versioning-policy.md)
- [branches.md](./branches.md)
- [../workflow/release-levels.md](../workflow/release-levels.md)
- [../workflow/upgrading.md](../workflow/upgrading.md)
