---
source: https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/
---

# Running Side-by-Side with TypeScript 6.0

Keep TypeScript 7.0's `tsc` while tools such as typescript-eslint still import the TypeScript 6.0 API.

```shell
npm install -D typescript@npm:@typescript/typescript6
```

```json
{
  "devDependencies": {
    "@typescript/native": "npm:typescript@^7.0.2",
    "typescript": "npm:@typescript/typescript6@^6.0.2"
  }
}
```

## Nightly builds (standalone, not part of the side-by-side setup)

Running this replaces the `typescript` -> `@typescript/typescript6` alias; do not combine it with the side-by-side setup above.

```shell
npm install -D typescript@next
```

## Notes

- TypeScript 7.0 ships no API; the blog expects 7.1 to ship a new (and different) API.
- `@typescript/typescript6` provides an executable named `tsc6` and re-exports the TypeScript 6.0 API; aliasing it as `typescript` alone leaves only `tsc6`.
- Adding the `@typescript/native` alias for `typescript@^7.0.2` makes `npx tsc` run 7.0.
- Nightly builds move from `@typescript/native-preview` to the `typescript` package under the `next` tag.
