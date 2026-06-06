# configuration

| Name | Description | Path |
|------|-------------|------|
| vercel.json | Static JSON project configuration: buildCommand, cleanUrls, crons, functions, headers, redirects, rewrites, routes, images, regions, and more | [vercel-json.md](./vercel-json.md) |
| vercel.ts | Programmatic TypeScript project configuration with dynamic build-time generation; same properties as vercel.json plus type-safe helper functions | [vercel-ts.md](./vercel-ts.md) |
| git / github Configuration | Git branch deployment control and GitHub integration options (git.deploymentEnabled, github.autoAlias, github.autoJobCancelation) | [git-configuration.md](./git-configuration.md) |
| Build Output API | File-system specification for .vercel/output/ directory: config.json schema (version, routes, images, wildcard, overrides, cache, crons) | [build-output-api.md](./build-output-api.md) |
