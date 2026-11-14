---
source: https://docs.expo.dev/build-reference/project-upload/
---

# How EAS CLI uploads your project

Learn which files EAS CLI uploads to Expo Build and how the version control workflow changes them.

## Signature / Usage

When you run `eas build`, EAS CLI creates a project archive on your computer and uploads it to a private cloud storage bucket. Expo Build then downloads the project archive and unpacks it on the build server. The files in the archive depend on your version control workflow and on your ignore files.

EAS CLI supports three version control system (VCS) workflows:

| Workflow | How to use it | Requires a commit | What EAS CLI uploads |
| --- | --- | --- | --- |
| Default | No setting | No | A shallow Git clone with your working directory copied into it |
| Full Git | Set `cli.requireCommit` to `true` in **eas.json** | Yes | A shallow Git clone of your last commit |
| No VCS | Set the `EAS_NO_VCS` environment variable to `1` | No | A copy of your project directory, without Git |

### Default workflow

EAS CLI uses Git to find the root of your repository and to read metadata, such as the current branch and the commit hash. You do not need to commit your changes before a build. EAS CLI creates a shallow Git clone of your repository, then copies your working directory into the clone. The project archive includes uncommitted and untracked files, except the files that your ignore files exclude.

This workflow requires a Git repository. If your project does not have one, EAS CLI offers to run `git init` and create an initial commit.

### Full Git workflow

To require a commit before each build, set `cli.requireCommit` to `true` in **eas.json**:

```json eas.json
{
  "cli": {
    "requireCommit": true
  }
}
```

Before a build, EAS CLI checks for uncommitted changes. If it finds any, EAS CLI asks whether to commit them. In non-interactive mode, the build stops instead. The project archive is a shallow Git clone of your last commit. EAS CLI still applies **.easignore** in this workflow, so the project archive can differ from the commit.

### No VCS workflow

Use this workflow if you use a different version control system or no version control system. Set the `EAS_NO_VCS` environment variable to `1`:

```sh
EAS_NO_VCS=1 eas build --platform android
```

EAS CLI copies your project directory into the project archive without Git. It shows a warning that this workflow is not recommended. The project archive does not include a **.git** directory. EAS CLI uses the absolute path in the `EAS_PROJECT_ROOT` environment variable as your project directory. If it is not set, EAS CLI uses the root of your Git repository, or the current directory if there is no repository.

## Options / Props

What the project archive includes:

| Rule | Workflows |
| --- | --- |
| EAS CLI excludes the files that your **.gitignore** files list, including files that Git tracks. If a **.easignore** file exists, EAS CLI uses it instead of all **.gitignore** files. | Default, No VCS |
| EAS CLI does not copy **node_modules**, even if no ignore file lists it. Expo Build installs your dependencies on the build server. | Default, No VCS |
| The project archive includes a shallow **.git** directory. | Default, Full Git |
| EAS CLI reads each **.gitignore** file separately. A negation rule in a subdirectory, such as `!keep.log`, does not override a rule in a parent directory, such as `*.log`. Git keeps such a file, but EAS CLI excludes it. To include it, use **.easignore**. | Default, No VCS |
| The project archive includes your Git submodules as they are in your working directory. | Default |
| EAS CLI copies files as they are on disk. If you use git-crypt and your files are unlocked, EAS CLI uploads them unencrypted. | Default, No VCS |

## Notes

- EAS CLI shows a warning when the project archive is larger than 150 MiB. It stops with an error when the project archive is larger than 2 GiB ("Project archive is too big. Maximum allowed size is 2.0 GB."). To make the archive smaller, exclude files with **.easignore**.
- To see the files that EAS CLI uploads, run `eas build:inspect` with the `archive` stage (see easignore.md).
- For submodules in the full Git workflow and on CI, see the official Using Git submodules page (https://docs.expo.dev/build-reference/git-submodules/); it is not covered by this skill.
- Source: https://docs.expo.dev/build-reference/project-upload/ (docs/pages/build-reference/project-upload.mdx at tag expo@58.0.25).

## Related

- [Ignore files via .easignore](./easignore.md)
- [Configuration with eas.json](./eas-json.md)
- [Configure Expo Build with eas.json](./build-eas-json.md)
