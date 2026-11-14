# Multi-Language Support

## Signature / Usage

Turborepo can run other language toolchains through scripts in `package.json`. Add a package for each independently cacheable project and declare its dependencies so Turborepo can order tasks and invalidate cached results. The official example combines a JavaScript package with a .NET console application and a C# library. Install the .NET 10 SDK so `dotnet` is available on `PATH`.

```text
.
├── apps/api/
│   ├── Api.csproj
│   ├── Program.cs
│   └── package.json
├── packages/
│   ├── lib/
│   │   ├── Lib.csproj
│   │   ├── Message.cs
│   │   └── package.json
│   └── web/
│       └── package.json
├── .gitignore
├── global.json
├── package.json
└── turbo.json
```

Include both the application and library directories in the package-manager workspace (pnpm shown; npm / yarn / bun use `"workspaces": ["apps/*", "packages/*"]` plus `"private": true` in the root `package.json`):

```yaml
# pnpm-workspace.yaml
packages:
  - "apps/*"
  - "packages/*"
```

Pin the .NET SDK at the repository root:

```json
{
  "sdk": {
    "version": "10.0.401",
    "rollForward": "disable"
  }
}
```

Create the library and the application that references it (`ProjectReference`):

```xml
<!-- packages/lib/Lib.csproj -->
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <DefaultItemExcludes>$(DefaultItemExcludes);node_modules/**</DefaultItemExcludes>
  </PropertyGroup>
</Project>
```

```xml
<!-- apps/api/Api.csproj -->
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>
    <DefaultItemExcludes>$(DefaultItemExcludes);node_modules/**</DefaultItemExcludes>
  </PropertyGroup>
  <ItemGroup>
    <ProjectReference Include="../../packages/lib/Lib.csproj" />
  </ItemGroup>
</Project>
```

Add a `package.json` beside each `.csproj` that invokes the .NET CLI, and mirror the project reference as a package dependency:

```json
{
  "name": "api",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build": "dotnet build Api.csproj --configuration Release"
  },
  "dependencies": {
    "lib": "workspace:*"
  }
}
```

Ignore `bin/` and `obj/`, then configure the build task and cache the binaries:

```text
node_modules/
.turbo/
bin/
obj/
```

```json
{
  "$schema": "https://turborepo.dev/schema.json",
  "globalDependencies": ["global.json"],
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["bin/**"]
    },
    "web#build": {
      "outputs": []
    }
  }
}
```

```bash
turbo run build
turbo run build --filter=api
dotnet apps/api/bin/Release/net10.0/Api.dll
```

## Notes

- The `packages/lib/package.json` is the same shape as `api`'s (name `lib`, `build` script `dotnet build Lib.csproj --configuration Release`, no `dependencies`). For npm, use `"lib": "*"` instead of `"workspace:*"`; run your package manager's install from the repository root to link the workspaces and update its lockfile.
- Keep the `package.json` dependency in sync with the `ProjectReference`. .NET uses the project reference to compile the application; Turborepo uses the package dependency to build `lib` before `api` and to invalidate `api`'s cache when the library changes. Turborepo does not read `.csproj` references or manage NuGet dependencies.
- `rollForward: "disable"` requires the exact SDK version, so a compiler upgrade cannot reuse cached outputs without a change to `global.json`. Adding `global.json` to `globalDependencies` makes SDK version changes invalidate cached tasks; Turborepo does not detect the installed .NET SDK version automatically. Include shared files such as `Directory.Build.props`, `Directory.Build.targets`, or `NuGet.Config` in task inputs or global dependencies too.
- `DefaultItemExcludes` keeps .NET from compiling source files reached through workspace links in `node_modules`. Output paths are relative to each package; `obj/` (intermediate and restore state) is not cached and is recreated through `dotnet build`'s implicit restore.
- The official page also lists `Message.cs` and `Program.cs` (the application prints `API ready`); they are omitted here because they carry no Turborepo-specific configuration.
- For experimental native workspace support, see the Rust, Python, and Go guides in `guides-tools/`: those integrations discover projects and dependencies from their native workspace files (Go via `go.work` behind `futureFlags.experimentalGoWorkspaces`; see the Go page for package-name and caching rules).
- Non-JS toolchains must be installed separately; Turborepo does not manage them.
- Changed in v2.11.9-v2.11.11 docs: the page previously used a JavaScript + Go modules example (`go.work`, `go.mod`, `experimentalGoWorkspaces`); that content now lives only in the Go guide.
- Source: https://turborepo.dev/docs/guides/multi-language (vercel/turborepo tag v2.11.11, `apps/docs/content/docs/guides/multi-language.mdx`, fetched 2026-11-14).

## Related

- [Rust (experimental)](../guides-tools/rust-experimental.md)
- [Python (experimental)](../guides-tools/python-experimental.md)
- [Go (experimental support)](../guides-tools/go-experimental.md)
- [Migrating from Nx](./migrating-from-nx.md)
