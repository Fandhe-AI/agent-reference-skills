---
source: https://r3f.docs.pmnd.rs/getting-started/installation
---

# Install

Installing `@react-three/fiber`, plus setup commands for Vite.js and Next.js.

## Install packages

```sh
npm install three @types/three @react-three/fiber
```

Include `@types/three` when using TypeScript (from introduction.mdx). For JavaScript only, use `npm install three @react-three/fiber` (from installation.mdx). React compatibility: `@react-three/fiber@9` pairs with `react@19`, `@react-three/fiber@8` with `react@18`.

## Create a Vite.js project

```sh
# Create app
npm create vite my-app

# Select react as framework

# Install dependencies
cd my-app
npm install three @react-three/fiber

# Start development server
npm run dev
```

Select react as the framework in the interactive prompt of `npm create vite`.

## Next.js 13.1 and later

```js
transpilePackages: ['three'],
```

Add to `next.config.js` (a config setting, not a command; handles untranspiled add-ons in the three.js ecosystem).

## Next.js 13.0 and earlier

```sh
npm install next-transpile-modules --save-dev
```

```js
const withTM = require('next-transpile-modules')(['three'])
module.exports = withTM()
```

Use `next-transpile-modules` only on Next.js 13.0 and earlier. On 13.1 and later, use `transpilePackages` above.
