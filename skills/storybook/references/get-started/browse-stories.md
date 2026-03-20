# Browse Stories

Navigate and interact with component stories using Storybook's sidebar, toolbar, and addons panel.

## Overview

Storybook's UI is a component workshop with three main regions: the **Sidebar** for navigation, the **Toolbar** for viewport and display controls, and the **Addons Panel** for interacting with args, actions, and tests.

## Usage

**Sidebar navigation:**
- Use the story explorer to navigate the hierarchical component tree
- Click any story to render it in an isolated preview iframe
- Press `F6` / `Shift+F6` to cycle keyboard focus between regions

**Reusing a component in your app:**
1. Browse the sidebar to find a suitable component
2. Review its stories to pick the right variant
3. Copy the story's `args` definition into your application code

## Notes

**Toolbar controls:**

| Control | Purpose |
|---------|---------|
| Zoom | Visually scale the component |
| Background | Change the canvas background color |
| Grid | Overlay a grid for alignment checks |
| Measure | Toggle dimension measurement overlay |
| Outline | Show component bounding boxes |
| Viewport | Render at various screen dimensions |

**Addons panel tabs:**

| Addon | Purpose |
|-------|---------|
| Controls | Edit component args dynamically |
| Actions | Verify callback invocations |
| Interactions | Debug `play` function step-by-step |
| Accessibility | Detect a11y violations |
| Visual Tests | Catch UI regressions during local dev |

- The toolbar is customizable via [globals](https://storybook.js.org/docs/essentials/toolbars-and-globals) (theme/language toggles) or community addons
- The **Docs** page auto-generates component documentation from source code

## Related

- [What's a Story?](./whats-a-story.md)
- [Setup](./setup.md)
