# Build Documentation

CLI commands to preview and build Storybook in documentation mode for production deployment.

## Overview

Storybook provides a dedicated documentation mode (`--docs` flag) that changes the dev/build output to focus on written content rather than interactive component exploration. The resulting static files can be deployed to any standard hosting provider.

## Usage

### Preview docs locally (dev mode)

```json
{
  "scripts": {
    "storybook-docs": "storybook dev --docs"
  }
}
```

```bash
npm run storybook-docs
```

### Build docs for production

```json
{
  "scripts": {
    "build-storybook-docs": "storybook build --docs"
  }
}
```

```bash
npm run build-storybook-docs
```

Output is written to `storybook-static/` by default.

## Notes

- In documentation mode the toolbar is not displayed.
- The primary story becomes the top-level sidebar item; individual stories appear in a flattened layout with different icons.
- The static output can be deployed to Vercel, Netlify, AWS S3, or any static hosting provider.
- Ensure Autodocs, MDX, and Doc Blocks are configured before building to maximize documentation coverage.

## Related

- [Autodocs](./autodocs.md)
- [MDX](./mdx.md)
- [Doc Blocks](./doc-blocks.md)
