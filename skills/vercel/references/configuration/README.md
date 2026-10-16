# configuration

| Name | Description | Path |
|------|-------------|------|
| Build Output API | A file-system specification for the `.vercel/output/` directory that produces a Vercel deployment without using Vercel's build system. Primarily targeting framework authors who want to utilize all Vercel platform features. | [build-output-api.md](./build-output-api.md) |
| git / github Configuration | Git-related configuration options available in `vercel.json` and `vercel.ts` to control automated deployments and GitHub integration behavior. | [git-configuration.md](./git-configuration.md) |
| vercel.json | Static JSON configuration file for overriding Vercel project defaults. Place in the project root. Supports all properties listed below. Use only one config file: `vercel.json`, `vercel.ts` or `vercel.toml`. | [vercel-json.md](./vercel-json.md) |
| vercel.toml | Configure a Vercel project with a TOML file. Supports the same configuration properties as `vercel.json`, plus comments and a flatter structure. | [vercel-toml.md](./vercel-toml.md) |
| vercel.ts | Programmatic TypeScript configuration for Vercel that executes at build time. Supports the same properties as `vercel.json` plus dynamic generation via code. Use only one config file: `vercel.ts`, `vercel.json` or `vercel.toml`. | [vercel-ts.md](./vercel-ts.md) |
