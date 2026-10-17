---
source: https://www.electronjs.org/docs/latest/tutorial/asar-archives
---

# ASAR and Fuses

Working with ASAR archives and inspecting Fuses. Sources: asar-archives and fuses (`https://www.electronjs.org/docs/latest/tutorial/fuses`).

## List the contents of an ASAR archive

```sh
asar list /path/to/example.asar
```

The `asar` CLI is the official `electron/asar` tool (the asar-archives page does not document how to install it).

## Create an ASAR archive (unpack native modules)

```sh
asar pack app app.asar --unpack '*.node'
```

An `app.asar.unpacked` folder is created alongside `app.asar`; ship it together. Differs from the official text: `'*.node'` is quoted here so the shell does not expand the glob against the current directory.

## Check Fuse state

```sh
npx @electron/fuses read --app /Applications/Foo.app
```

Reads the Fuse state of any Electron app; it does not modify anything. To flip Fuses, call `flipFuses` from `@electron/fuses` at packaging time (per the fuses page), before code signing.
