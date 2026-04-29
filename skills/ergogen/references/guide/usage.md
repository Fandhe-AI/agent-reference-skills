# Usage

Ergogen can be run through the official web app or the CLI. Both accept a YAML config and produce output artifacts (outlines, PCBs, cases).

## Signature / Usage

### Web App

Open `https://ergogen.cache.works` in a browser, paste or upload your YAML config, and preview the generated output directly — no installation required.

### CLI (global install)

```sh
# Install (requires Node v14.4.0+ / npm v6.14.5+)
npm i -g ergogen

# Run
ergogen input.yaml -o output_folder
```

### CLI (development build)

```sh
git clone https://github.com/ergogen/ergogen.git
cd ergogen
npm install
node src/cli.js input.yaml -o output_folder
```

## Options / Props

| Flag / Argument | Description |
|-----------------|-------------|
| `input.yaml` | Path to the YAML configuration file |
| `-o <dir>` | Output directory for generated files |

For the full list of options run `ergogen --help`.

## Notes

- The development build gives access to unreleased features not yet on npm.
- Output artifacts include point previews, outlines, PCBs, and cases depending on what is defined in the config.

## Related

- [Getting Started](./getting-started.md)
- [Next Steps](./next-steps.md)
