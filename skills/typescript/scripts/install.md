---
source: https://github.com/microsoft/typescript-go/blob/typescript/v7.0.2/README.md
---

# Install

Commands to install TypeScript. In 7.0 the native `tsc` is the default.

> Sources: typescript-go README at tag `typescript/v7.0.2` and the official blog https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/

## Install the latest stable release

```sh
npm install -D typescript
```

TypeScript 7.0 installs the new `tsc` executable (run with `npx tsc`).

## Install a nightly build

```sh
npm install -D typescript@next
```

Per the 7.0 blog, nightlies resume under the `next` tag of the `typescript` package.

## Use alongside the TypeScript 6.0 API (npm alias)

```sh
npm install -D typescript@npm:@typescript/typescript6
```

> Note: with this alias only the `tsc6` executable remains. It is for tools such as typescript-eslint that require the 6.0 API as a peer dependency. To also use the 7.0 `tsc`, add a separately named alias in `package.json` (see the side-by-side sample in `samples/`).

## Former nightly package (@typescript/native-preview)

```sh
npm install @typescript/native-preview
npx tsgo # Use this as you would tsc.
```

> Note: the typescript-go README states that from TypeScript 7.0 RC the command name is `tsc`. `tsgo` is the former nightly name; in 7.0 use `tsc` from the `typescript` package.
