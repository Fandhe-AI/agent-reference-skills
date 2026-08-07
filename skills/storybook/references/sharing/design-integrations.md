# Design Integrations

Connect Storybook with design tools (Figma and others) to tighten the loop between design and implementation.

## Usage

### Storybook Connect (Figma plugin)

Links Figma components to published Storybook stories. Requires a Storybook published to Chromatic (for indexing, versioning, and access control).

1. Open Figma's command palette (`Cmd+/` / `Ctrl+/`)
2. Type "Storybook Connect" to enable it
3. Authenticate with Chromatic
4. Select a Figma component and paste the story URL from your published Storybook
5. Access linked stories via the sidebar

### Designs addon (embed Figma in Storybook)

```bash
npx storybook@latest add @storybook/addon-designs
```

```typescript
export const Example: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Sample-File',
    },
  },
};
```

## Options / Props

| Tool | Integration method |
|------|---------------------|
| Figma | Storybook Connect plugin / `@storybook/addon-designs` |
| Zeplin | Native addon displays designs alongside stories |
| Zeroheight | Embeds Storybook stories in styleguide documentation |
| UXPin | Uses interactive stories for prototyping |
| InVision DSM | Embeds published Storybooks in design system docs |
| Adobe XD | Design addon enables spec embedding |

## Notes

- Custom integrations can be built using the addon API and the addon creation tutorial.

## Related

- [Embed stories](./embed.md)
- [Publish Storybook](./publish-storybook.md)
