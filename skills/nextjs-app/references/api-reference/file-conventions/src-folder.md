# src Folder

Save the `app` (or `pages`) directory under `src/` as an alternative to placing it at the project root, separating application code from root-level config files.

## Signature / Usage

Move `app/` to `src/app/` (or `pages/` to `src/pages/`).

## Notes

- `/public` must remain at the project root.
- Config files (`package.json`, `next.config.js`, `tsconfig.json`) and `.env.*` files must remain at the project root.
- `src/app`/`src/pages` are ignored if `app`/`pages` exist at the root.
- If using `proxy.js`, it must be placed inside `src/`.
- If using Tailwind CSS, add a `/src` prefix to the `content` section of `tailwind.config.js`.
- If using TypeScript path aliases like `@/*`, update `paths` in `tsconfig.json` to include `src/`.

## Related

- [Project Structure](../../getting-started/project-structure.md)
- [proxy.js](./proxy.md)
