# Package Types

## Usage

Turborepo distinguishes two types of packages.

**Application Packages** — packages deployed from the workspace (Next.js, Svelte, Vite, or CLI applications, commonly in the `./apps` directory).

- Best practice: they are the "end" of the Package Graph and are not installed into other packages. CI/CD pipelines most often finalize at these nodes of the Package and Task Graphs.
- Installing an Application Package into another package should be the exception (rethink the structure if it happens often). Example exception: a package handling end-to-end testing can depend on the Application Package so it is aware of re-deploys.

**Library Packages** — packages containing code shared around the workspace.

- Not independently deployable; they support Application Packages to create the final deployables.
- Also referred to as Internal Packages, which have their own sub-types.

An Application Package installs a Library Package as a workspace dependency (pnpm / bun syntax):

```json
{
  "dependencies": {
    "@repo/ui": "workspace:*"
  }
}
```

## Notes

- This page's source (package-types.mdx) has no code example; the snippet is from internal-packages.mdx (v2.11.8).
- The internal-package compilation strategies (Just-in-Time, Compiled, Publishable) are documented on the separate Internal Packages page (`/docs/core-concepts/internal-packages`), not here.

## Related

- [Internal packages](./internal-packages.md)
- [Package and Task Graph](./package-and-task-graph.md)
- [Structuring a repository](../crafting-your-repository/structuring.md)
