# Z-Index

Predefined z-index tokens for managing layering and stacking contexts.

## Tokens

| Token | Value | Use Case |
|-------|-------|----------|
| `hide` | -1 | Hidden behind other elements |
| `base` | 0 | Default stacking level |
| `docked` | 10 | Docked/floating elements |
| `dropdown` | 1000 | Dropdown menus |
| `sticky` | 1100 | Sticky headers/footers |
| `banner` | 1200 | Announcement banners |
| `overlay` | 1300 | Overlay backgrounds |
| `modal` | 1400 | Modal dialogs |
| `popover` | 1500 | Popovers and floating panels |
| `skipNav` | 1600 | Skip navigation links |
| `toast` | 1700 | Toast notifications |
| `tooltip` | 1800 | Tooltips |
| `max` | 2147483647 | Maximum possible z-index |

## Usage

```tsx
<Box zIndex="modal" />
<Box zIndex="tooltip" />
```

## Notes

- Accessible via `theme.tokens.zIndex`
- Gaps between values (e.g., 1000 to 1100) allow component-specific adjustments without restructuring the hierarchy

## Related

- [Overview](../concepts/overview.md)
