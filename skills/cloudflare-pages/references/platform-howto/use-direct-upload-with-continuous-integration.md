---
source: https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/
---

# Use Direct Upload with continuous integration

Deploy prebuilt assets to Pages from GitHub Actions, CircleCI or Travis CI with `wrangler pages deploy`.

## Signature / Usage

Adapted (not in the official docs): the `$ ` prompt prefix and the "Publish created project" comment of the official line are removed so it can be copied; see Notes.

Deploy command (set `CLOUDFLARE_API_TOKEN` in the environment as well):

```sh
CLOUDFLARE_ACCOUNT_ID=<ACCOUNT_ID> npx wrangler pages deploy <DIRECTORY> --project-name=<PROJECT_NAME>
```

GitHub Actions, `.github/workflows/pages-deployment.yaml`:

Adapted (not in the official docs): actions pinned to commit SHAs of their tags as of 2026-11-03.

```yaml
on: [push]
jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      deployments: write
    name: Deploy to Cloudflare Pages
    steps:
      - name: Checkout
        uses: actions/checkout@d23441a48e516b6c34aea4fa41551a30e30af803 # v6
      # Run your project's build step
      # - name: Build
      #   run: npm install && npm run build
      - name: Deploy
        uses: cloudflare/wrangler-action@953926a2e2182532811c01a25e53647d93bf07c0 # v4
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy YOUR_DIRECTORY_OF_STATIC_ASSETS --project-name=YOUR_PROJECT_NAME
          gitHubToken: ${{ secrets.GITHUB_TOKEN }}
```

Adapted (not in the official docs): the official command uses the placeholder `<PROJECT NAME>` (contains a space); replaced by `<PROJECT_NAME>`. See Notes.

CircleCI, `.circleci/config.yml`:

```yaml
version: 2.1
jobs:
  Publish-to-Pages:
    docker:
      - image: cimg/node:18.7.0

    steps:
      - checkout
      # Run your project's build step
      - run: npm install && npm run build
      # Publish with wrangler
      - run: npx wrangler pages deploy dist --project-name=<PROJECT_NAME> # Replace dist with the name of your build folder and input your project name

workflows:
  Publish-to-Pages-workflow:
    jobs:
      - Publish-to-Pages
```

Adapted (not in the official docs): the official Travis file ends with an `env:` list `- CLOUDFLARE_ACCOUNT_ID: { $CLOUDFLARE_ACCOUNT_ID }`, which is not a valid way to pass variables; the credentials are defined in Travis settings and removed from the file. See Notes.

Travis CI, `.travis.yml`:

```yaml
language: node_js
node_js:
  - "18.0.0" # You can specify more versions of Node you want your CI process to support
branches:
  only:
    - travis-ci-test # Specify what branch you want your CI process to run on
install:
  - npm install

script:
  - npm run build # Switch this out with your build command or remove it if you don't have a build step
  - npx wrangler pages deploy dist --project-name=<PROJECT_NAME>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `CLOUDFLARE_API_TOKEN` | secret | — | API token with Account > Cloudflare Pages > Edit. |
| `CLOUDFLARE_ACCOUNT_ID` | secret | — | Account ID, shown in the **API** section of the zone overview. |
| `gitHubToken` | action input | — | `${{ secrets.GITHUB_TOKEN }}` with `contents: read` and `deployments: write` lets the action create a Deployment. |
| `command` | action input | — | Wrangler command to run. `wrangler-action` has no `branch` input; to override the deployed branch, append `--branch=<BRANCH_NAME>` to `pages deploy` (without it, Wrangler uses the current git branch, so a build on your production branch deploys to production). |

## Notes

- Cloudflare's Pages landing page says "Start new projects with Workers" (Workers + static assets supports most Pages use cases); see the cloudflare-workers skill (static-assets/migrate-from-pages).
- Adapted (not in the official docs): the source references `actions/checkout@v6` and `cloudflare/wrangler-action@v4` by tag; they are pinned here to the commit SHAs of those tags as of 2026-11-03 (tag kept as a trailing comment). Re-resolve the SHAs when upgrading. The workflow's job-level `permissions` is `contents: read` plus `deployments: write`.
- Corrected from the official docs: the CircleCI and Travis files used `<PROJECT NAME>` (with a space); the placeholder is `<PROJECT_NAME>`. The Travis `env:` block was removed because Travis reads the variables set in its project settings (**More options** > **Settings** > **Environment Variables**).
- The source's first command is printed with a `$` prompt prefix; it was removed so the line can be copied.
- Store the token and account ID as CI secrets (GitHub **Settings** > **Secrets** > **Actions**, CircleCI **Environment Variables**), never in the workflow file.
- The Node versions in the CircleCI and Travis examples (18.x) are from the source; Node.js 18 reached end of LTS on April 30, 2025 according to the Pages changelog, so choose a supported version. The CircleCI note says Wrangler needs at least Node `16.17.0`; check the current Wrangler requirement.
- Wrangler `pages deploy` options can be added to the command.

## Related

- [Get started with Direct Upload](./get-started-direct-upload.md)
- [Git integration](../configuration/git-integration.md)
