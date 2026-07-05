# Route Groups

A folder convention that lets you organize routes by category or team without affecting the URL path.

## Signature / Usage

Wrap a folder's name in parentheses: `(folderName)`, e.g. `app/(marketing)/about/page.js` resolves to `/about`.

## Notes

- Use cases: organizing routes by team/concern/feature, defining multiple root layouts, or opting specific segments into a shared layout while excluding others.
- Navigating between routes under **different root layouts** triggers a full page reload (not a client-side transition).
- Routes in different groups must not resolve to the same URL path — e.g. `(marketing)/about/page.js` and `(shop)/about/page.js` both resolving to `/about` causes an error.
- If using multiple root layouts without a top-level `layout.js`, the home route (`/`) must live inside one of the route groups (e.g. `app/(marketing)/page.js`).

## Related

- [layout.js — Root Layout](./layout.md)
