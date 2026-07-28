# Responsive design techniques

Techniques for tailoring an app's UI for specific breakpoints and device capabilities. *Responsive* design uses one fluid layout that adapts to changing window sizes; *adaptive* design replaces one layout with another entirely.

## Signature / Usage

Six responsive/adaptive techniques:

- **Reposition** — alter the location of UI elements to make the most of window size (e.g. stack vertically on small windows, spread horizontally on large ones).
- **Resize** — adjust margins and element size for the window size (e.g. grow the content frame on larger screens).
- **Reflow** — change the flow of UI elements (e.g. single column to two columns) based on device and orientation.
- **Show/hide** — show or hide UI elements or metadata based on available screen real estate or device capability.
- **Re-architect** — collapse or fork the app's architecture per device (e.g. list/details pattern on large windows).
- **Adaptive layout** — replace the UI entirely at specific breakpoints (multiple fixed layout sizes triggered by available space), e.g. switching a `NavigationView` pane position between top and left.

## Notes

- Reasons to customize UI per screen size: making effective use of space and reducing navigation, taking advantage of device capabilities (camera, location sensor), and optimizing for input type (touch, pen, keyboard, mouse).
- `NavigationView` supports the adaptive-layout technique by letting the pane position be set to either top or left.
- `NavigationView` referenced here is a `Microsoft.UI.Xaml.Controls` (WinUI 3) type, distinct from navigation APIs in `react-router-v7`, Jetpack Compose Navigation, and Apple SwiftUI.

## Related

- [Screen sizes and breakpoints for responsive design](./screen-sizes-breakpoints.md)
