---
source: https://docs.cloud.google.com/shell/docs/cloud-shell-tutorials/tutorials
---

# Publish an Open in Cloud Shell Link with a Tutorial

Write a Cloud Shell tutorial in Markdown and add an Open in Cloud Shell button that clones the repository and starts it.

## Signature / Usage

### Write the tutorial

Use H1 for the title, H2 for a step, and H3 for a sub-step (one H1 per tutorial):

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

Directives add features such as opening a file in the editor:

```text
<walkthrough-editor-open-file filePath="test/hello.md">
</walkthrough-editor-open-file>
```

### Launch it from a Cloud Shell session

```bash
cloudshell launch-tutorial tutorial.md
```

```bash
teachme hello.md
```

### Add a button to the repository README

Open in Cloud Shell page (clones a repository; add `cloudshell_git_branch` and other parameters as needed):

Adapted (not in the official docs): the official snippet uses the placeholder `http://path-to-repo/sample.git`; it is written as `https://path-to-repo/sample.git` so the clone is not fetched over plain HTTP.

```markdown
[![Open in Cloud Shell](https://gstatic.com/cloudssh/images/open-btn.svg)](https://shell.cloud.google.com/cloudshell/editor?cloudshell_git_repo=https://path-to-repo/sample.git)
```

Tutorials page (adds `cloudshell_tutorial`; the `\&` is as rendered in the source, a literal `&` between the two parameters):

```markdown
[![Open in Cloud Shell](https://gstatic.com/cloudssh/images/open-btn.png)](https://ssh.cloud.google.com/cloudshell/open?cloudshell_git_repo=GIT_REPO_URL\&cloudshell_tutorial=PATH_TO_MD_FILE)
```

## Options / Props

| URL parameter | Required | Description |
| --- | --- | --- |
| `cloudshell_git_repo` | yes | Git repository to clone (GitHub or Bitbucket) |
| `cloudshell_git_branch` | no | Branch to clone; default is master |
| `cloudshell_tutorial` | no | Tutorial Markdown file in the repository |
| `cloudshell_workspace` | no | Working directory and editor workspace |
| `cloudshell_open_in_editor` | no | File(s) to open in the editor |
| `cloudshell_print` | no | File printed to the terminal |
| `ephemeral` | no | `true` / `false`: temporary environment with a scratch home directory |
| `show` | no | `ide`, `terminal`, `ide%2Cterminal` |

## Notes

- Adapted from the official docs: the `cloudshell_git_repo` placeholder `http://path-to-repo/sample.git` is written with `https://`.
- Only allow-listed repositories owned by Google open in the default Cloud Shell environment with access to the user's credentials; all other repositories use a temporary environment without access to them.
- `cloudshell_working_dir` is deprecated; use `cloudshell_workspace`.
- The two official buttons differ in host and path (`shell.cloud.google.com/cloudshell/editor` vs `ssh.cloud.google.com/cloudshell/open`) and image format; keep each URL exactly as shown for its example.
- A tutorial that runs commands in a user's Cloud Shell can change their project; keep steps non-destructive or point readers to a throwaway project.
- Source: https://docs.cloud.google.com/shell/docs/open-in-cloud-shell (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/shell/docs/cloud-shell-tutorials/tutorials (retrieved 2026-11-14)

## Related

- [open-in-cloud-shell.md](../references/cloud-shell/open-in-cloud-shell.md)
- [writing-tutorials.md](../references/shell-tutorials/writing-tutorials.md)
- [overview.md](../references/shell-tutorials/overview.md)
