---
source: https://docs.cloud.google.com/shell/docs/cloud-shell-tutorials/tutorials
---

# Writing tutorials in Cloud Shell

A tutorial is a set of instructions written in Markdown. Cloud Shell parses the text into steps and substeps displayed in a panel in Google Cloud console.

## Signature / Usage

Tutorials are written in CommonMark Markdown. Additional Markdown extensions and directives (spotlighting features, inline icons) are supported.

### Steps

Headings determine structure:

- H1 (`#`) for the tutorial title. There should only be one H1 tag in a tutorial.
- H2 (`##`) for a step title.
- H3 (`###`) for a sub-step title.

Sample Markdown file:

```markdown
# First tutorial

## First step

Hello world

### Part 1

Part one instructions.

### Part 2

Part two instructions.

## Conclusion

Done!
```

### Directives

Directives enable advanced functionality like spotlighting features and adding inline icons. Format:

```text
<walkthrough-DIRECTIVE_NAME PARAMETER="PARAMETER_VALUE">
</walkthrough-DIRECTIVE_NAME>
```

Example with the directive `editor-open-file` and the parameter `filePath`:

```text
<walkthrough-editor-open-file filePath="test/hello.md">
</walkthrough-editor-open-file>
```

### Launch tutorials in Cloud Shell

Option 1: use the `cloudshell launch-tutorial` command in a Cloud Shell session to launch a tutorial from an existing Markdown file, `tutorial.md`:

```bash
cloudshell launch-tutorial tutorial.md
```

Alternatively, use the `teachme` alias to launch a tutorial from an existing file, `hello.md`:

```bash
teachme hello.md
```

Option 2: use Open in Cloud Shell. It allows a `cloudshell_tutorial` parameter added to the end of the URL to specify the location of the source Markdown file in the repository. The Markdown for a button linked to your tutorial:

```markdown
[![Open in Cloud Shell](https://gstatic.com/cloudssh/images/open-btn.png)](https://ssh.cloud.google.com/cloudshell/open?cloudshell_git_repo=GIT_REPO_URL\&cloudshell_tutorial=PATH_TO_MD_FILE)
```

## Notes

- The `\&` in the button URL is as rendered in the fetched source; in Markdown it stands for a literal `&` between the two query parameters.
- Source: https://docs.cloud.google.com/shell/docs/cloud-shell-tutorials/tutorials (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [markdown-extensions.md](./markdown-extensions.md)
- [style-guide.md](./style-guide.md)
- [private-tutorials.md](./private-tutorials.md)
- [directives-layout.md](./directives-layout.md)
- [directives-spotlights.md](./directives-spotlights.md)
- [overview.md](./overview.md)
