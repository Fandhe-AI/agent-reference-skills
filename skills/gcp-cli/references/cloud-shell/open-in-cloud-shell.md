---
source: https://docs.cloud.google.com/shell/docs/open-in-cloud-shell
---

# Open in Cloud Shell

The Open in Cloud Shell feature lets you publish a link that opens the Google Cloud console with a Git repository cloned into Cloud Shell, or starts Cloud Shell with a custom image. You can also print instructions to the terminal to help users interact with the content.

## Signature / Usage

An Open in Cloud Shell link, optionally embedded in a button image, can be added to the README.md file of any directory in your Git repository; the recommended location is the root README.md. Use a base URL of `shell.cloud.google.com` (or any page in the Google Cloud console that begins with `console.cloud.google.com`) with the required URL parameter `cloudshell_git_repo`.

To embed a button to open a sample Git repository in Cloud Shell, include the following Markdown in your repository's README.md file:

```markdown
[![Open in Cloud Shell](https://gstatic.com/cloudssh/images/open-btn.svg)](https://shell.cloud.google.com/cloudshell/editor?cloudshell_git_repo=http://path-to-repo/sample.git)
```

To embed the same functionality into a website, use this equivalent HTML snippet:

```html
<a href="https://shell.cloud.google.com/cloudshell/editor?cloudshell_git_repo=http://path-to-repo/sample.git">
<img alt="Open in Cloud Shell" src ="https://gstatic.com/cloudssh/images/open-btn.svg">
</a>
```

## Options / Props

Required:

| URL Parameter | Description | Supported Values |
| --- | --- | --- |
| `cloudshell_git_repo` | URL of the Git repository to clone. After the repository is cloned, the root of the project folder is opened, displaying its contents in the left navigation pane. | Valid URL for a Git repository. This URL consists of a permitted domain (GitHub or Bitbucket) and a path. The following characters are permitted: uppercase and lowercase letters, digits, underscores (_), hyphens (-), periods (.), and forward-slashes (/). Only allow listed repos owned by Google will open in the default Cloud Shell environment and have access to the user's credentials. All other repos will use a temporary Cloud Shell environment without access to the user's credentials. |

Optional:

| URL Parameter | Description | Supported Values |
| --- | --- | --- |
| `cloudshell_git_branch` | Branch from the Git repository to clone. Only applicable when `cloudshell_git_repo` is specified. The default branch is *master*. | Any valid branch in the repository. Permitted characters: uppercase and lowercase letters, digits, tildes (~), underscores (_), hyphens (-), periods (.), forward-slashes (/), and colons (:). |
| `cloudshell_image` | Custom Docker image that runs a customized environment during the session. Opening a repository with this parameter creates a temporary environment with a scratch home directory that is deleted when the session ends. | URL of a Docker image hosted in Artifact Registry. The Docker image must be based on the base Cloud Shell image and be publicly accessible. Large images take some time to download to the Cloud Shell VM when the URL is opened. |
| `cloudshell_open_in_editor` | File(s) to open in Cloud Shell Editor. Can be repeated to specify multiple files, opened in the order provided, one right-hand editor tab per file. Paths are relative to the current directory; if `working_dir` is provided, relative to `working_dir`. | Any valid file path using uppercase and lowercase letters, digits, tildes (~), underscores (_), hyphens (-), periods (.), forward slashes (/), and colons (:). |
| `cloudshell_print` | File in the Git repository, usually instructions to be printed to the terminal to guide a user's next steps. Path is relative to the current directory; if `working_dir` is provided, relative to `working_dir`. | Same permitted characters as `cloudshell_open_in_editor`. |
| `cloudshell_tutorial` | Tutorial Markdown file in the Git repository consisting of instructions to be launched as a tutorial. Path is relative to the current directory. | Any well-formed Tutorial Markdown file with a valid filename. |
| `cloudshell_working_dir` (Deprecated) | Deprecated. Use `cloudshell_workspace` instead. | Same permitted characters as `cloudshell_open_in_editor`. |
| `cloudshell_workspace` | Working directory for Cloud Shell. The terminal opens in the specified directory. Cloud Shell Editor opens the directory as a workspace. | Any valid file path relative to the cloned repository. Leave empty or use `.` for the root of the cloned repository. If no repository is specified, the path is relative to the Cloud Shell home directory. Same permitted characters as `cloudshell_open_in_editor`. |
| `ephemeral` | Opening a repository with this parameter creates a temporary environment with a scratch home directory that is deleted when the session ends. | `true`, `false` |
| `show` | Open with just the terminal, just the Cloud Shell Editor, or both. | `ide`, `terminal`, `ide%2Cterminal` |

## Notes

- Only GitHub and Bitbucket repositories are permitted by default. To add a different repository type, send feedback with the repository type you'd like to use.
- The official page also embeds an interactive Open in Cloud Shell link generator form (iframe), which is not reproduced here.
- Source: https://docs.cloud.google.com/shell/docs/open-in-cloud-shell (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [launching-cloud-shell.md](./launching-cloud-shell.md)
- [workspaces.md](./workspaces.md)
- [using-cloud-shell.md](./using-cloud-shell.md)
- [configuring-cloud-shell.md](./configuring-cloud-shell.md)
