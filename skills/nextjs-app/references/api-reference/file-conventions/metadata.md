# Metadata Files (overview)

File-based metadata conventions: add special metadata files to route segments. Each can be a static file (e.g. `opengraph-image.jpg`) or a dynamic variant using code to generate the file (e.g. `opengraph-image.js`).

## Signature / Usage

See individual conventions in [metadata/README.md](./metadata/README.md): [favicon/icon/apple-icon](./metadata/app-icons.md), [manifest.json](./metadata/manifest.md), [opengraph-image/twitter-image](./metadata/opengraph-image.md), [robots.txt](./metadata/robots.md), [sitemap.xml](./metadata/sitemap.md).

## Notes

- Once defined, Next.js automatically serves the file (with hashes in production for caching) and updates the relevant `<head>` elements with the correct URL, file type, and size.
- Special Route Handlers like `sitemap.ts`, `opengraph-image.tsx`, `icon.tsx`, and other metadata files are cached by default.
- If also using `proxy.ts`, configure its `matcher` to exclude these metadata files.

## Related

- [Metadata Files index](./metadata/README.md)
- [proxy.js](./proxy.md)
