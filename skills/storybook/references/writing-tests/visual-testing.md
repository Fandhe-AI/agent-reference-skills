# Visual Testing

Compare rendered pixels of stories against known baselines to detect UI regressions automatically.

## Overview

Visual tests capture screenshots of stories and compare them against previously accepted baseline images. Powered by Chromatic (cloud service). Efficient for catching appearance-level bugs that interaction tests cannot detect.

## Setup

### 1. Install the addon

```bash
npx storybook@latest add @chromatic-com/storybook
```

### 2. Enable visual tests

Start Storybook — the Visual Tests addon panel appears in the sidebar.

### 3. Link your project

- Sign in to your Chromatic account (or create one)
- Select or create a project from the list
- Press "Catch a UI change" to establish baseline snapshots

## Usage

**Two ways to run tests:**

1. Click the run button in the Visual Tests section of the testing widget
2. Use the run button in the Visual Tests addon panel's top-right corner

Both methods send stories to Chromatic's cloud for snapshot capture and change detection.

**Workflow:**

1. Run tests — modified stories are highlighted in the sidebar
2. Review changes
3. Accept intentional changes as new baselines (locally)
4. Fix unintended regressions and rerun
5. Push to repository — baselines sync to the cloud for team access

## Options / Props

### `chromatic.config.json`

```json
{
  "projectId": "Project:64cbcde96f99841e8b007d75",
  "buildScriptName": "deploy-storybook",
  "debug": true,
  "zip": true
}
```

## Notes

- Changes accepted locally in the addon auto-accept in CI, avoiding duplicate reviews
- Requires a Chromatic account and project token for CI integration
- Add a Chromatic step with your project token in your CI pipeline to run on pull requests

## Related

- [Running in CI](./in-ci.md)
- [Snapshot Testing](./snapshot-testing.md)
