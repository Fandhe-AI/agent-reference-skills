# Responsive design techniques

*Responsive* design uses one fluid layout that adapts to changing window sizes, built once and expected to work across all screen sizes. *Adaptive* design is similar but swaps in an entirely different fixed layout at a breakpoint, rather than adapting a single layout.

## Options / Props

| Technique | Description |
|------|-------------|
| Reposition | Alter location/position of UI elements to make the most of window size (e.g. stack vertically on small windows, arrange horizontally on large). |
| Resize | Adjust margins and size of UI elements for the available window size. |
| Reflow | Change the flow of UI elements based on device/orientation (e.g. add columns, larger containers on bigger screens). |
| Show/hide | Show or hide UI elements and metadata based on available screen real estate or device capability. |
| Re-architect | Collapse or fork the app's architecture for specific devices (e.g. list/details pattern expands into two panes on a large window). |
| Adaptive layout | Replace one fixed layout with another entirely at a given breakpoint, rather than reflowing a single layout. |

## Notes

- Customize UI per device/screen to: make effective use of space and reduce navigation, take advantage of device capabilities (sensors, camera), and optimize for specific input types (touch, pen, keyboard, mouse).
- `NavigationView` supports the adaptive-layout technique via its pane position (top or left), switching UI for a specific breakpoint.

## Related

- [Screen sizes and breakpoints](./layout-screen-sizes-and-breakpoints.md)
- [Alignment, margin, and padding](./alignment-margin-padding.md)
