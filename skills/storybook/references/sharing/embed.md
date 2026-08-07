# Embed Stories

Embed individual published stories in other pages via iframe or oEmbed.

## Usage

### Embed with toolbar

```html
<iframe
  src="https://example.chromatic.com/?path=/story/shadowboxcta--default&full=1&shortcuts=false&singleStory=true"
  width="800"
  height="260"
></iframe>
```

### Embed without toolbar

```html
<iframe
  src="https://example.chromatic.com/iframe.html?id=shadowboxcta--default&viewMode=story"
  width="800"
  height="200"
></iframe>
```

### Embed documentation

Replace `viewMode=story` with `viewMode=docs` to display the auto-generated documentation page instead of a single story.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `viewMode` | `story` \| `docs` | Which mode to render in the iframe |
| `shortcuts` | boolean | Hide keyboard shortcuts (`false` recommended for embeds) |
| `singleStory` | boolean | Display a single story only, hiding the sidebar (`true` recommended) |
| `full` | `0` \| `1` | Use the full-screen (toolbar) layout |

## Notes

- Your Storybook must be publicly accessible for embedding to work.
- Published via Chromatic, embeds also support the oEmbed format.
- Medium: paste the URL directly; it becomes interactive after publishing.
- Notion: use the `/embed` command with the story URL.
- Ghost: use the `/html` command to paste the iframe code.

## Related

- [Publish Storybook](./publish-storybook.md)
- [Design Integrations](./design-integrations.md)
- [Storybook Composition](./storybook-composition.md)
