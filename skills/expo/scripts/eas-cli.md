---
source: https://docs.expo.dev/eas/cli/
---

# EAS CLI

EAS CLI commands. Targets eas-cli 25.0.0, which is versioned separately from the Expo SDK (not tied to SDK 58).

> **Warning**: The `eas` commands in this file modify resources on EAS (builds, updates, environment variables, store submissions). Run them against a throwaway test project and account, and verify the impact before running them on a production project. Authenticate with an interactive login, or in CI set the `EXPO_TOKEN` environment variable (never write its value into the repository).

## Install and run

```sh
npm install --global eas-cli
```

Requires Node.js 20.18.3 or later in the 20 line, or 22 or later (Node.js 20 is deprecated and shows a warning). To run without a global install, use `npx eas-cli@latest`. yarn: `yarn global add eas-cli`, pnpm: `pnpm add --global eas-cli`, bun: `bun add --global eas-cli`.

## Log in, log out, and check the account

```sh
eas login
eas whoami
eas logout
```

In environments without a browser, use `eas login --device`.

## Create a new EAS project

```sh
eas new [PATH] --package-manager npm
```

`-p, --package-manager` accepts `bun|npm|pnpm|yarn` (default npm). Use `--sdk-version` to specify the SDK version.

## Inspect the resolved configuration

```sh
eas config --platform ios --profile production
```

Shows app.json and eas.json merged.

## Initialize build configuration

```sh
eas build:configure --platform all
```

## Start a build

```sh
eas build --platform all --profile production
```

The default for `-e, --profile` is "production" in eas.json (when defined). `--platform` accepts `android|ios|all`.

## Build non-interactively with JSON output

```sh
eas build --platform android --profile production --non-interactive --no-wait --json
```

`--json` implies `--non-interactive`.

## Build and submit to the store in sequence

```sh
eas build --platform ios --profile production --auto-submit
```

`-s, --auto-submit` submits using the submit profile of the same name.

## Local build (experimental)

```sh
eas build --platform android --local --output ./out
```

## List and view builds

```sh
eas build:list --platform ios --status finished --limit 10
eas build:view [BUILD_ID]
```

## Cancel a build

```sh
eas build:cancel [BUILD_ID]
```

## Delete a build

> **Warning**: Deleting a build cannot be undone. Verify in a throwaway environment before running it.

```sh
eas build:delete [BUILD_ID]
```

## Run a build on a simulator or emulator

```sh
eas build:run --latest --platform ios
```

Can also be specified with `--id` / `--path` / `--url`.

## Get and launch a development build

```sh
eas build:dev --platform ios
```

Uses a simulator/emulator dev client build whose fingerprint matches, or creates a new one.

## Manage the build number (version)

```sh
eas build:version:get --platform all
eas build:version:set --platform ios
eas build:version:sync --platform all
```

## Manage credentials

```sh
eas credentials
eas credentials:configure-build --platform ios --profile production
```

Interactively manage iOS / Android credentials.

## Submit to the store

```sh
eas submit --platform ios --profile production --latest
```

The target can also be specified with `--id` / `--path` (.apk / .aab / .ipa) / `--url`. `eas build:submit` is an alias.

## List, check, retry, and cancel submissions

```sh
eas submit:list
eas submit:status
eas submit:view [SUBMISSION_ID]
eas submit:retry [SUBMISSION_ID]
eas submit:cancel [SUBMISSION_ID]
```

## Validate and pull store metadata

```sh
eas metadata:lint
eas metadata:pull
```

## Push store metadata

> **Warning**: `metadata:push` syncs your local store configuration to the store (such as the App Store). Verify with a test app and account before running it.

```sh
eas metadata:push --profile production
```

## Configure updates (EAS Update)

```sh
eas update:configure --platform all
```

## Publish an update

> **Warning**: A published update can be delivered to users on the target channel. Verify with a test branch / channel before running it.

```sh
eas update --channel preview --message "Fix typo" --environment preview
```

Options: `--branch` / `--channel` / `-m, --message` / `-p, --platform` (default all). `--environment` is required for projects on Expo SDK 55 or later. `--auto` uses the current git branch and commit message. `--rollout-percentage` is an integer from 1 to 100 (default 100).

## List and view updates

```sh
eas update:list
eas update:view GROUPID
```

## Roll back an update

> **Warning**: A rollback replaces the update that is currently being delivered. Verify with a throwaway channel before running it.

```sh
eas update:rollback [GROUPID]
eas update:roll-back-to-embedded --channel preview --runtime-version <value>
eas update:republish --group <value>
```

## Delete an update

> **Warning**: This deletes all updates in the update group. It cannot be undone.

```sh
eas update:delete GROUPID
```

## Set an environment variable

```sh
eas env:set production --name MY_VAR --value my-value --visibility plaintext
```

`--visibility` accepts `plaintext|sensitive|secret`, `--type` accepts `string|file`, and `--scope` accepts `project|account` (default project). Take care not to leave sensitive values in your shell history.

## View environment variables

```sh
eas env:list production
eas env:get production --variable-name MY_VAR
```

`--include-sensitive` on `env:list` shows sensitive values.

## Pull environment variables into a .env file

```sh
eas env:pull production --path .env.local
```

The default output path is **.env.local**.

## Run a command with environment variables

```sh
eas env:exec production "npx expo export"
```

Runs a bash command with the environment variables of the selected environment.

## Push environment variables in bulk

> **Warning**: `--force` overwrites existing variables without confirmation. Verify in a throwaway project before running it.

```sh
eas env:push production --path .env.local --force
```

## Delete an environment variable

> **Warning**: Deleting an environment variable can cause builds and updates that depend on it to fail.

```sh
eas env:delete production --variable-name MY_VAR
```

## Validate and create workflows

```sh
eas workflow:validate .eas/workflows/build.yml
eas workflow:create [NAME] --template build
```

`--template` accepts `build|update|deploy|custom`.

## Run a workflow

> **Warning**: Without `--ref`, the entire local project directory is uploaded to EAS servers. Make sure it contains no sensitive files.

```sh
eas workflow:run .eas/workflows/build.yml --wait
```

Use `-F, --input` for workflow inputs and `--ref` for a Git reference. `--ssh` is EXPERIMENTAL.

## Check and cancel workflow runs

```sh
eas workflow:runs --status IN_PROGRESS
eas workflow:status [WORKFLOW_RUN_ID] --wait
eas workflow:view [ID]
eas workflow:logs [ID] --all-steps
eas workflow:cancel
```
