# CI Build Caching

Configure CI to persist the `.next/cache` directory between builds to speed up `next build`.

## Signature / Usage

```yaml
# GitHub Actions (actions/cache)
uses: actions/cache@v4
with:
  path: |
    ~/.npm
    ${{ github.workspace }}/.next/cache
  key: ${{ runner.os }}-nextjs-${{ hashFiles('**/package-lock.json') }}-${{ hashFiles('**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx') }}
  restore-keys: |
    ${{ runner.os }}-nextjs-${{ hashFiles('**/package-lock.json') }}-
```

## CI providers

| Provider | Cache path/config |
| --- | --- |
| Vercel | Automatic, no action required |
| CircleCI | Add `./.next/cache` to `save_cache` paths in `.circleci/config.yml` |
| Travis CI | Add `.next/cache` to `cache.directories` in `.travis.yml` |
| GitLab CI | Add `.next/cache/` to `cache.paths` in `.gitlab-ci.yml` |
| Netlify CI | Use `@netlify/plugin-nextjs` |
| AWS CodeBuild | Add `.next/cache/**/*` to `cache.paths` in `buildspec.yml` |
| GitHub Actions | `actions/cache` on `.next/cache` (see above) |
| Bitbucket Pipelines | Define a `nextcache` cache for `.next/cache` in `bitbucket-pipelines.yml` |
| Heroku | Add `.next/cache` to `cacheDirectories` in `package.json` |
| Azure Pipelines | `Cache@2` task on `.next/cache` |
| Jenkins (Pipeline) | Job Cacher plugin, cache `.next/cache` keyed on a lock file |

## Notes

- If CI isn't configured to persist `.next/cache`, a [No Cache Detected](https://nextjs.org/docs/messages/no-cache) error/warning may appear.

## Related

- [Self-Hosting](./self-hosting.md)
