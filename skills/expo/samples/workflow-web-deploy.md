---
source: https://docs.expo.dev/tutorial/cicd/web-deployments/
---

# Web Deployment Job (EAS Hosting)

Export a static web build and deploy it from a workflow, as a preview or to the production URL.

```json app.json
{
  "expo": {
    ... 
    "web": {
      "output": "static"
    }
  }
}
```

```yaml .eas/workflows/preview.yml
name: Preview builds

jobs:
  # ... existing fingerprint, get-build, build_android, build_ios, notify jobs

  deploy_web:
    name: Deploy web (preview)
    type: deploy
```

```yaml .eas/workflows/production.yml
name: Deploy to production

on:
  push:
    tags: ['v*.*.*']

jobs:
  # ... existing fingerprint, get-build, build, update jobs ...

  deploy_web:
    name: Deploy web (production)
    type: deploy
    params:
      prod: true
```

```sh
eas workflow:run .eas/workflows/preview.yml
git tag v0.2.0
git push origin v0.2.0
```

## Notes

- The `deploy` job takes two optional params: `prod` (boolean; deploys to the production URL, otherwise a preview) and `alias` (string; stable alias URL such as `awesome-project--staging.expo.app`).
- `web.output: "static"` produces static HTML, JS and asset files; `single` and `server` outputs also exist.
- Without `needs`, `deploy_web` runs in parallel with the build jobs. Each preview deployment gets a unique URL; production serves at the project URL.
- Workflow files are read from the default branch, so commit and push to `main`.
- Source: https://docs.expo.dev/tutorial/cicd/web-deployments/ (fetched 2026-10-17).
