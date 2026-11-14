# winml-cli UI Quickstart (Foundry Toolkit for VS Code)

Use the Foundry Toolkit extension for Visual Studio Code to select a model and run Windows ML CLI model conversion through a graphical interface instead of typing commands.

## Signature / Usage

Adapted (not in the official docs): the official numbered steps are reformatted as a text block because the page contains no code.

```text
1. Install Visual Studio Code
2. Install the Foundry Toolkit extension (search "Foundry Toolkit" in the VS Code Extensions view)
3. Open the Model Conversion tool (Foundry Toolkit panel > Model Conversion)
4. Choose your model: pick one from Hugging Face, provide a local path,
   or select from the built-in model catalog filtered by Windows ML CLI
5. Run the build: the extension invokes Windows ML CLI and streams the output to the VS Code terminal
```

## Notes

- Corresponding line to the Adapted note above: the steps are a reformatting of the official numbered list; the page has no code.
- The VS Code documentation section "Build with Windows ML CLI (Preview)" holds the full walkthrough (`https://code.visualstudio.com/docs/intelligentapps/modelconversion#_build-with-windows-ml-cli-preview`); the integration is labeled Preview there.
- The extension invokes the same Windows ML CLI described in the other winml-cli pages.
- Source: https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/command-line/getting-started/ui-quickstart (retrieved 2026-11-14)

## Related

- [winml-cli quickstart](./winml-cli-quickstart.md)
- [Windows ML CLI (winml-cli) Overview](./winml-cli.md)
