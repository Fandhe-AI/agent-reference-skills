---
source: https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/, https://developers.cloudflare.com/pages/how-to/npm-private-registry/
---

# Direct Upload from CI

Copy-paste commands and workflow files for deploying prebuilt assets to Pages from CI. Store `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` as the CI platform's secrets, never in the repository. The token is a custom API token with Account > Cloudflare Pages > Edit.

## Deploy from any CI shell

```sh
CLOUDFLARE_ACCOUNT_ID=<ACCOUNT_ID> npx wrangler pages deploy <DIRECTORY> --project-name=<PROJECT_NAME>
```

Also export `CLOUDFLARE_API_TOKEN` (from the CI secret store) in the environment. The official page states Node.js 16.17.0 or later; that is a legacy minimum, so check the current Wrangler Node.js requirement before choosing a CI image.

## GitHub Actions workflow

Save as `.github/workflows/pages-deployment.yaml`.

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

The `uses:` references are pinned to full commit SHAs (the version tag is kept as a trailing comment); re-resolve them when you upgrade. The job sets `permissions` with `contents: read` (and `deployments: write` for the Deployment). The workflow deploys the current git branch unless a `branch` option is added under `with`.

## CircleCI config

Save as `.circleci/config.yml`.

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

Add `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` as CircleCI project environment variables. The image tag is the one in the official docs; use a currently supported Node.js image.

## Create a read-only npm token for private packages

```sh
# Verify the current npm user is correct
npm whoami

# Create a readonly token
npm token create --read-only
```

Add the result as an `NPM_TOKEN` environment variable in the Pages project settings for both Production and Preview.
