---
source: https://docs.expo.dev/eas/cli/
---

# EAS CLI reference

EAS CLI is a command-line tool that allows you to interact with Expo Application Services (EAS) from your terminal.

## Signature / Usage

EAS CLI requires Node.js 20.18.3 or a later Node.js 20 release, or Node.js 22 or later. Install it globally or run it through your package manager:

```sh
npm install --global eas-cli

# or, without a global install
npx eas-cli@latest
```

Core commands (flags copied from the official reference):

```sh
eas build [-p android|ios|all] [-e PROFILE_NAME] [--local] [--output <value>] [--wait] [--clear-cache]
[-s | --auto-submit-with-profile PROFILE_NAME] [--what-to-test <value>] [-m <value>] [--build-logger-level
trace|debug|info|warn|error|fatal] [--freeze-credentials] [--refresh-ad-hoc-provisioning-profile] [--verbose-logs]
[--json] [--non-interactive]

eas submit [-p android|ios|all] [-e <value>] [--latest | --id <value> | --path <value> | --url <value>]
[--what-to-test <value>] [--verbose] [--wait] [--verbose-fastlane] [-g <value>...] [--non-interactive]
[--auto-testflight-setup]

eas update [--branch <value>] [--channel <value>] [-m <value>] [--input-dir <value>] [--skip-bundler]
[--clear-cache] [--upload-source-maps] [--emit-metadata] [--rollout-percentage <value>] [--force-end-active-rollout]
[-p android|ios|all] [--auto] [--private-key-path <value>] [--environment <value>] [--json] [--non-interactive]

eas workflow:run FILE [--non-interactive] [--wait] [-F <value>...] [--ref <value>] [--ssh] [--ssh-idle-timeout
<value>] [--json]

eas env:set [ENVIRONMENT] [--name <value>] [--value <value>] [--type string|file] [--visibility
plaintext|sensitive|secret] [--scope project|account] [--environment <value>...] [--json] [--non-interactive]

eas webhook:create [--event BUILD|SUBMIT] [--url <value>] [--secret <value>] [--non-interactive]

eas metadata:push [-e <value>] [--non-interactive]
```

## Options / Props

### Key flags

| Command | Flag | Description |
| --- | --- | --- |
| `eas build` | `-e, --profile=PROFILE_NAME` | Build profile from eas.json. Defaults to "production" if defined |
| `eas build` | `-p, --platform` | `android\|ios\|all` |
| `eas build` | `-s, --auto-submit` | Submit on build complete using the submit profile with the same name as the build profile |
| `eas build` | `--auto-submit-with-profile=PROFILE_NAME` | Submit on build complete using the named submit profile |
| `eas build` | `--local` | Run build locally [experimental] |
| `eas build` | `--freeze-credentials` | Prevent the build from updating credentials in non-interactive mode |
| `eas build` | `--[no-]wait` | Wait for build(s) to complete |
| `eas build` | `--what-to-test=<value>` | "What to Test" information in TestFlight (iOS-only); use with `auto-submit` |
| `eas submit` | `-e, --profile=<value>` | Submit profile from eas.json. Defaults to "production" if defined |
| `eas submit` | `--latest` / `--id` / `--path` / `--url` | Choose the build: latest, EAS build ID, local `.apk`/`.aab`/`.ipa` path, or archive URL |
| `eas submit` | `-g, --groups=<value>...` | Internal TestFlight testing groups to add the build to (iOS only) |
| `eas submit` | `--[no-]auto-testflight-setup` | Set up an internal TestFlight group for the app (iOS only) |
| `eas submit` | `--what-to-test=<value>` | "What to test" information in TestFlight (iOS only) |
| `eas update` | `--branch` / `--channel` | Branch to publish on / channel that the update should affect |
| `eas update` | `--auto` | Use the current git branch and commit message for the EAS branch and update message |
| `eas update` | `--environment=<value>` | Environment for server-side EAS environment variables. Required for projects using Expo SDK 55 or greater |
| `eas update` | `--rollout-percentage=<value>` | Integer between 1 and 100; defaults to 100 |
| `eas update` | `--input-dir=<value>` | Location of the bundle (default `dist`) |
| `eas workflow:run` | `-F, --input=<value>...` | Set workflow inputs |
| `eas workflow:run` | `--ref=<value>` | Git reference to run the workflow on (otherwise the whole local project directory is packaged and uploaded) |
| `eas workflow:run` | `--[no-]wait` | Wait for workflow run to complete. Defaults to false |
| `eas env:set` | `--visibility` | `plaintext\|sensitive\|secret` |
| `eas env:set` | `--type` | `string\|file` |
| `eas env:set` | `--scope` | `project\|account` (default `project`) |
| `eas env:pull` / `eas env:push` | `--path=<value>` | Default `.env.local` |
| `eas webhook:create` | `--secret=<value>` | Secret used to create a hash signature of the request payload, provided in the `Expo-Signature` header |
| `eas metadata:*` | `-e, --profile=<value>` | Submit profile from eas.json |

### Command index

| Group | Commands |
| --- | --- |
| Account | `account:audit`, `account:login` (alias `login`), `account:logout` (alias `logout`), `account:usage`, `account:view` (alias `whoami`), `analytics`, `autocomplete`, `billing:manage`, `billing:subscribe` |
| Branch / channel (EAS Update) | `branch:create\|delete\|list\|rename\|view`, `channel:create\|delete\|edit\|insights\|list\|pause\|protect\|resume\|rollout\|unprotect\|view` |
| Build | `build`, `build:cancel`, `build:configure`, `build:delete`, `build:dev`, `build:download`, `build:inspect`, `build:list`, `build:resign`, `build:run`, `build:submit`, `build:version:get\|set\|sync`, `build:view` |
| Credentials / devices | `credentials`, `credentials:configure-build`, `device:create\|delete\|list\|rename\|view` |
| Config / diagnostics | `browse`, `config`, `diagnostics`, `help`, `fingerprint:compare`, `fingerprint:generate` |
| Deploy (Expo Router web / API Routes) | `deploy`, `deploy:alias`, `deploy:alias:delete`, `deploy:delete`, `deploy:promote`, `worker:alias`, `worker:alias:delete`, `worker:delete` |
| Environment variables | `env:delete`, `env:exec`, `env:get`, `env:list`, `env:pull`, `env:push`, `env:set` |
| Project | `init`, `new`, `project:delete`, `project:icon:set`, `project:info`, `project:init`, `project:new`, `project:status`, `status`, `upload` |
| Integrations | `integrations:asc:connect\|disconnect\|status`, `integrations:convex:*`, `integrations:posthog:connect\|dashboard\|disconnect`, `integrations:supabase:advisors\|connect\|dashboard\|disconnect` |
| Metadata | `metadata:lint`, `metadata:pull`, `metadata:push` |
| Observe | `observe:errors`, `observe:event`, `observe:events`, `observe:metrics`, `observe:metrics-summary`, `observe:routes`, `observe:session`, `observe:versions` |
| Simulator (EXPERIMENTAL) | `simulator`, `simulator:availability\|egress\|events\|exec\|get\|list\|start\|stop` and the `sim:*` equivalents |
| Submit / TestFlight | `submit` (alias `build:submit`), `submit:cancel`, `submit:list`, `submit:retry`, `submit:status`, `submit:view`, `testflight:crashes`, `testflight:feedback` |
| Update | `update`, `update:configure`, `update:delete`, `update:edit`, `update:embedded:delete\|list\|upload\|view`, `update:insights`, `update:list`, `update:republish`, `update:revert-update-rollout`, `update:roll-back-to-embedded`, `update:rollback`, `update:view` |
| Webhooks | `webhook:create`, `webhook:delete`, `webhook:list`, `webhook:update`, `webhook:view` |
| Workflows | `workflow:cancel`, `workflow:create`, `workflow:insights`, `workflow:insights:maestro`, `workflow:logs`, `workflow:run`, `workflow:runs`, `workflow:status`, `workflow:validate`, `workflow:view` |

## Notes

- EAS CLI version 25.0.0 (separate versioning from the Expo SDK). Source modificationDate: October 16, 2026 (fetched 2026-10-17).
- Node.js 20 support is deprecated: EAS CLI prints a warning on Node.js 20, and a future release will require Node.js 22 or later.
- Most listing commands accept `--json` (non-JSON messages go to `stderr`; implies `--non-interactive`) and `--non-interactive`.
- `eas submit` is an alias target of `eas build:submit`.
- This page condenses the official reference: full flags are given for the core commands above, and the remaining commands are listed by name. Run `eas <command> --help` or see the official page for the complete flag list of the others.
- The `eas simulator` / `eas sim` commands are marked `[EXPERIMENTAL]` in the official reference.

## Related

- [Configure EAS Submit with eas.json](./submit-eas-json.md)
- [Environment variables in EAS](./eas-environment-variables.md)
- [Webhooks](./webhooks.md)
- [EAS Metadata](./eas-metadata.md)
- [Automating EAS CLI commands](./workflows-automating-eas-cli.md)
