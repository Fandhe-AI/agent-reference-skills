---
source: https://docs.flutter.dev/ui/adaptive-responsive
---

# Adaptive and responsive design in Flutter

Apps should respond to size and orientation changes and maximize the use of each platform. One of Flutter's primary goals is a single codebase that looks and feels great on any platform.

## Signature / Usage

The page contains no code listing; these are the section pages it links to.

```text
General approach
SafeArea & MediaQuery
Large screens & foldables
User input & accessibility
Capabilities & policies
Best practices for adaptive apps
Additional resources
```

### Responsive vs adaptive

- Responsive design is about fitting the UI _into_ the space: a responsive app adjusts the placement of design elements to fit the available space.
- Adaptive design is about the UI being _usable_ in the space: an adaptive app selects the appropriate layout and input devices (for example, bottom navigation or side-panel navigation on a tablet).
- The two are often collapsed into one term; "adaptive design" most often refers to both.

## Notes

- Screens range from a watch, to a foldable phone with two screens, to a high definition monitor; input may be a physical or virtual keyboard, a mouse, or a touchscreen.
- The original page references the Google I/O 2024 talk "How to build adaptive UI with Flutter".
- Flutter adaptive layout (Dart) is distinct from Android window size classes in Jetpack Compose (android-compose-ui, android-navigation) and SwiftUI size classes (apple-swiftui).

## Related

- [General approach to adaptive apps](./adaptive-general.md)
- [SafeArea & MediaQuery](./safearea-mediaquery.md)
- [Large screen devices](./large-screens.md)
- [User input & accessibility](./adaptive-input.md)
- [Capabilities & policies](./adaptive-capabilities.md)
- [Best practices for adaptive design](./adaptive-best-practices.md)
- [Additional resources](./adaptive-more-info.md)
