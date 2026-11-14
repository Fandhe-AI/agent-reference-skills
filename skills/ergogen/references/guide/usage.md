# Usage

Ergogen can be run through the official web app or the CLI. Both accept a YAML config and produce output artifacts (outlines, PCBs, cases).

## Signature / Usage

### Web App

Use a web-based deployment: the official one at `https://ergogen.xyz` (Stable, latest official release) or the unofficial one at `https://ergogen.ceoloide.com/` (Nightly, early access to in-progress features). Paste or upload your YAML config and preview the output directly — no installation required.

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
| `--debug` / `-d` | Debug mode |
| `--clean` | Empty the output directory before processing (since v4.2.0 the directory itself is kept) |
| `--svg` / `--generate-svg` | Also generate SVG outputs for outlines (since v4.2.0) |

For the full list of options run `ergogen --help`.

## Notes

- The docs usage page only says "Web: TODO"; the web deployments above are described in the Ergogen README at tag `v4.2.1`.
- Source: https://github.com/ergogen/ergogen/blob/v4.2.1/README.md and https://github.com/ergogen/ergogen/blob/v4.2.1/src/cli.js (tag `v4.2.1`, fetched 2026-11-14)
- The development build gives access to unreleased features not yet on npm.
- Output artifacts include point previews, outlines, PCBs, and cases depending on what is defined in the config.

## Related

- [Getting Started](./getting-started.md)
- [Next Steps](./next-steps.md)
