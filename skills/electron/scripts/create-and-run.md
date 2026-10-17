---
source: https://www.electronjs.org/docs/latest/tutorial/tutorial-first-app
---

# Create and Run

Create a minimal app and run it in development mode. Sources: tutorial-first-app and tutorial/installation.

## Initialize an npm project

```sh
mkdir my-electron-app && cd my-electron-app
npm init
```

Set the entry point to `main.js`. Author / license / description are required for packaging. Yarn Berry needs `nodeLinker: node-modules` and pnpm needs `nodeLinker: hoisted` (so that `node_modules` is materialized on disk).

## Install Electron

```sh
npm install electron --save-dev
```

## Add a start script

```json
{
  "scripts": {
    "start": "electron ."
  }
}
```

Add it to `scripts` in `package.json`.

## Run in development mode

```sh
npm run start
```

Runs the script specified in `main` in development mode.

## Run directly with npx

```sh
npx electron .
```

Runs the current directory without `npm install` into the project (dependencies are not installed). Source: tutorial/installation.
