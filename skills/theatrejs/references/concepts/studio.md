# Studio

Theatre.js's visual editor for authoring animations at development time. The Studio is a separate package (`@theatre/studio`) that is removed for production builds — it has zero impact on the production bundle.

## Signature / Usage

```javascript
import studio from '@theatre/studio'

// Enable the Studio UI (call once, before creating any projects)
studio.initialize()
```

## Studio UI Panels

| Panel | Purpose |
|-------|---------|
| **Outline Panel** | Scene hierarchy: Projects → Sheets → Namespaces → Objects |
| **Details Panel** | View and edit all props of the selected Sheet Object |
| **Sequence Editor** | Dope Sheet / curve editor for keyframes |
| **Global Toolbar** | Extension buttons and global controls |
| **Extension Panes** | Custom windows registered by extensions (e.g. React Three Fiber gizmos) |

## Notes

- Toggle Studio visibility with `Alt/Option + \`
- The Studio only renders when `studio.initialize()` is called; omit it in production
- While the Studio is active, project state is automatically saved to `localStorage`
- Export the final state as JSON via the Studio UI; embed it in your production code via `getProject('Name', { state })`
- Extensions (e.g. `@theatre/r3f`) can register additional gizmos and toolbar buttons

## Related

- [Project](./project.md)
- [State](./state.md)
- [Overview](./overview.md)
