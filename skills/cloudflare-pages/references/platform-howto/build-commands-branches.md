---
source: https://developers.cloudflare.com/pages/how-to/build-commands-branches/
---

# Set build commands per branch

Run different build scripts per branch with a shell script that reads `CF_PAGES_BRANCH`.

## Signature / Usage

Adapted (not in the official docs): the official script ends with `npm run dev` for other branches, which starts a dev server and would never finish a build, and its first line `# !/bin/bash` is a comment, not a shebang; the script names below are placeholders for build scripts you define. See Notes.

```bash
#!/bin/bash

if [ "$CF_PAGES_BRANCH" == "production" ]; then
  # Run the "build:production" script in `package.json` on the "production" branch
  # "production" should be replaced with the name of your Production branch

  npm run build:production

elif [ "$CF_PAGES_BRANCH" == "staging" ]; then
  # Run the "build:staging" script in `package.json` on the "staging" branch
  # "staging" should be replaced with the name of your specific branch

  npm run build:staging

else
  # Else run the preview build script
  npm run build:preview
fi
```

Then set **Settings** > **Build & deployments** > **Build configurations** > **Edit configurations** > **Build command** to `bash build.sh`, save, and deploy.

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `CF_PAGES_BRANCH` | environment variable | injected | Branch name of the current deployment. |
| Build command | project setting | — | Set to `bash build.sh`. |

## Notes

- Cloudflare's Pages landing page says "Start new projects with Workers" (Workers + static assets supports most Pages use cases); see the cloudflare-workers skill (static-assets/migrate-from-pages).
- Corrected from the official docs: the page's script runs `npm run production`, `npm run staging` and `npm run dev` and says "run the dev script" otherwise. A dev server does not exit, so a Pages build would not complete; use build scripts that write to the build output directory. Replace the branch names and script names with your own.
- Name the file `build.sh` (recommended) in the project directory.

## Related

- [Build configuration](../configuration/build-configuration.md)
- [Branch deployment controls](../configuration/branch-build-controls.md)
