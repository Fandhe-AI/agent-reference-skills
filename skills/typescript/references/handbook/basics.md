---
source: https://www.typescriptlang.org/docs/handbook/2/basic-types.html
---

# The Basics

Step one in learning TypeScript: static type-checking, tooling, the `tsc` compiler, emit behavior, explicit types, erased types, downleveling and strictness.

## Signature / Usage

```ts
function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}

greet("Maddison", new Date());
```

```sh
npm install -g typescript
tsc hello.ts
tsc --noEmitOnError hello.ts
tsc --target es2015 hello.ts
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `noEmitOnError` | compiler option | Do not write output files when type errors exist |
| `target` | compiler option | ECMAScript version to emit (`--target es2015`) |
| `strict` | compiler option | Enables all strictness checks at once |
| `noImplicitAny` | compiler option | Error on variables whose type is implicitly `any` |
| `strictNullChecks` | compiler option | Make `null` / `undefined` handling explicit |

## Notes

- JavaScript only provides dynamic typing (run the code to see what happens); a static type system predicts behavior before the code runs.
- TypeScript flags valid-JavaScript-but-suspicious code, e.g. reading a property that does not exist (`user.location` is an error although JavaScript returns `undefined`), typos (`toLocaleLowercase`), uncalled functions (`Math.random < 0.5`) and unreachable logic.
- The same type information drives editor tooling: completions, quick fixes, refactorings, go-to-definition, find-all-references.
- `tsc` emits `.js` even when type errors are reported; use `noEmitOnError` to suppress emit on errors.
- Type annotations (`person: string`) are erased in output and never change runtime behavior. Annotations are optional where inference gives the same type (`let msg = "hello there!"` infers `string`).
- Downleveling rewrites newer ECMAScript syntax for older targets, e.g. template strings to `"Hello ".concat(person, ", today is ").concat(date.toDateString(), "!")` for an ES5 target.
- `strict` (CLI flag or `"strict": true` in `tsconfig.json`) toggles all strictness flags; the two most important are `noImplicitAny` (error on implicit `any`) and `strictNullChecks` (explicit handling of `null` / `undefined`).

- The source text (written against the 5.x defaults) says "By default TypeScript targets ES5" and that the default experience is lenient (no `strictNullChecks`). Default changed (6.0): `strict` is now `true` by default and `target` defaults to the current-year ES version (`es2025` at the time of 6.0). Source: TypeScript 6.0 announcement, "Simple Default Changes" (https://devblogs.microsoft.com/typescript/announcing-typescript-6-0/).
- Deprecated (6.0) / Removed (7.0): `target: es5` is no longer supported; TypeScript's lowest target is ES2015. Source: https://devblogs.microsoft.com/typescript/announcing-typescript-6-0/ and https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/.
- The source states `tsc` is installed via `npm install -g typescript`; `npx` or a local `node_modules` install also works.

## Related

- [Everyday Types](./everyday-types.md)
- [Narrowing](./narrowing.md)
- [Understanding Errors](./understanding-errors.md)
