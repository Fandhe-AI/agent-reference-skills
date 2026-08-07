# UI guidelines

Optional plugin UI extends what users can do without breaking the flow of conversation. Use cards, carousels, fullscreen views, and other display modes only when visual interaction improves the workflow.

## Options / Props

| Display mode | When to use |
|------|-------------|
| Inline card | Single action/decision, small structured data, a fully self-contained widget. Limit to two primary actions; no deep navigation, tabs, or nested scrolling. |
| Inline carousel | Small list of similar items (3-8 items) with more visual content/metadata than fits in rows; single CTA per item. |
| Fullscreen | Rich multi-step tasks or deep browsing (interactive map, editing canvas, detailed listings); ChatGPT composer stays overlaid for follow-ups. |
| Picture-in-picture (PiP) | Ongoing/live parallel sessions (games, live collaboration, quizzes) that can react to chat input; auto-closes when the session ends. |

## Notes

- Design system: the optional `@openai/apps-sdk-ui` component library provides Tailwind styling foundations, CSS variable design tokens, and accessible components matching the ChatGPT design system. A Figma component library is also available.
- Every app initially appears inline; inline surfaces always appear before the generated model response.
- Visual design: use system colors for text/icons/dividers (brand accents only on buttons/badges/icons, never backgrounds); inherit the system font stack (no custom fonts); use system grid spacing; use monochromatic outlined icons or fit-in brand icons (do not render your own logo — ChatGPT appends it automatically); maintain WCAG AA contrast and provide alt text for images.

## Related

- [Plugin Architecture](./plugin-architecture.md)
- [MCP server](./mcp-server.md)
