---
source: https://www.typescriptlang.org/docs/handbook/integrating-with-build-tools.html
---

# Integrating with Build Tools

How to use TypeScript with other build tools: Babel, Browserify, Grunt, Gulp, Jspm, MSBuild, NuGet, Rollup, Svelte Compiler, Vite and Webpack.

## Signature / Usage

Babel:

```sh
npm install @babel/cli @babel/core @babel/preset-typescript --save-dev
```

```js
// .babelrc
{
  "presets": ["@babel/preset-typescript"]
}
```

```sh
./node_modules/.bin/babel --out-file bundle.js src/index.ts
```

Webpack (`ts-loader`):

```js
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

Rollup (`@rollup/plugin-typescript`; `typescript` and `tslib` are peer dependencies installed separately):

```js
// rollup.config.js
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'output',
    format: 'cjs'
  },
  plugins: [typescript()]
};
```

Svelte (`svelte-preprocess`; `typescript` is an optional peer dependency installed separately, `tslib` is not provided):

```js
// svelte.config.js
import preprocess from 'svelte-preprocess';

const config = {
  preprocess: preprocess()
};

export default config;
```

Browserify (`tsify`):

```sh
browserify main.ts -p [ tsify --noImplicitAny ] > bundle.js
```

Gulp (`gulp-typescript`):

```js
var gulp = require("gulp");
var ts = require("gulp-typescript");

gulp.task("default", function () {
  var tsResult = gulp.src("src/*.ts").pipe(
    ts({
      noImplicitAny: true,
      out: "output.js",
    })
  );
  return tsResult.js.pipe(gulp.dest("built/local"));
});
```

MSBuild: include `Microsoft.TypeScript.Default.props` at the top and `Microsoft.TypeScript.targets` at the bottom of the project file (see the MSBuild page for the full file):

```xml
<Import
    Project="$(MSBuildExtensionsPath32)\Microsoft\VisualStudio\v$(VisualStudioVersion)\TypeScript\Microsoft.TypeScript.targets"
    Condition="Exists('$(MSBuildExtensionsPath32)\Microsoft\VisualStudio\v$(VisualStudioVersion)\TypeScript\Microsoft.TypeScript.targets')" />
```

## Notes

- Vite supports importing `.ts` files out-of-the-box. It only performs transpilation and not type checking, and requires that some `compilerOptions` have certain values (see the Vite docs).
- Grunt: `grunt-ts` is marked "no longer maintained" in the source; the alternative is `grunt-browserify` combined with `tsify`.
- Jspm: `npm install -g jspm@beta`; the source notes TypeScript support in jspm was in 0.16beta.
- NuGet: Manage NuGet Packages, search for `Microsoft.TypeScript.MSBuild`, Install, then rebuild.
- Svelte: consider `svelte-check` for CLI type checking. Webpack alternative listed: `awesome-typescript-loader`.
- The Gulp example uses the `out` option, which maps to `outFile`. Deprecated (6.0) / Removed (7.0 not stated): the 6.0 release notes state `outFile` has been removed from TypeScript 6.0 in favor of external bundlers (Webpack, Rollup, esbuild, Vite, Parcel).
- Changed (7.0): TypeScript 7.0 ships no stable programmatic API (7.1 is expected to ship a new, different API); `@typescript/typescript6` provides the 6.0 API side-by-side for tools that still need it, so loaders/plugins that call the compiler API (ts-loader, rollup plugin, gulp-typescript, etc.) may need it. Whether each specific integration works with 7.0 is not stated in the sources. Source: https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/.
- Biome formats and lints TypeScript but does not type-check; see the separate biome skill.

## Related

- [compiler-options-in-msbuild.md](./compiler-options-in-msbuild.md)
- [tsconfig-json.md](./tsconfig-json.md)
- [compiler-options-cli.md](./compiler-options-cli.md)
