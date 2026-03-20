# Images and Assets

Three approaches for loading images, fonts, and other static assets in Storybook stories.

## Overview

Components often require images, videos, fonts, and other assets. Storybook supports direct imports, static directory serving, and CDN references.

## Configuration

### 1. Import Assets Directly

```typescript
import imageFile from './static/image.png';

export const WithAnImage: Story = {
  render: () => <img src={imageFile} alt="my image" />,
};
```

Works automatically with Storybook's default configuration. Custom webpack setups may require the file loader.

### 2. Serve Static Files via `staticDirs`

```typescript
// .storybook/main.ts
const config: StorybookConfig = {
  staticDirs: ['../public', '../static'],
};
```

Reference files with root-relative paths in stories:

```typescript
export const WithAnImage: Story = {
  render: () => <img src="/image.png" alt="my image" />,
};
```

Map directories to custom URL paths:

```typescript
staticDirs: [{ from: '../my-custom-assets/images', to: '/assets' }],
```

### 3. Reference Assets from CDN

```typescript
<img src="https://example.com/images/placeholder.png" alt="CDN asset" />
```

### Configuring Fonts

```html
<!-- .storybook/preview-head.html -->
<link rel="preload" href="/fonts/my-font.woff2" />

<!-- External font service -->
<script src="https://use.typekit.net/xxxyyy.js"></script>
<script>
  try { Typekit.load(); } catch (e) {}
</script>
```

## Notes

- When deploying Storybook to a subpath, use relative paths for static assets; imported assets handle this automatically
- Static directory assets require relative path syntax or the `<base>` element for subpath deployments
- Vite users: set `publicDir: false` in `vite.config.js` if additional directory copying causes issues

## Related

- [Story Rendering](./story-rendering.md)
- [Styling and CSS](./styling-and-css.md)
