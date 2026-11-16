---
source: https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/concepts/configs
---

# Add configs to a source of truth

Explains how to organize configs (YAML or JSON files) in a source of truth so Config Sync applies them to the right clusters and teams don't interfere with one another.

## Signature / Usage

### Validate configs

Check syntax and validity before syncing:

```bash
nomos vet --source-format=unstructured
```

### Ignore object mutations

Add this annotation to an object so Config Sync stops maintaining its state after it exists:

```yaml
metadata:
  annotations:
    client.lifecycle.config.k8s.io/mutation: ignore
```

### Convert a hierarchical repository to unstructured

```bash
nomos hydrate PATH
```

Replace `PATH` with the path to your directory. This creates a `compiled/` directory in the current working directory with a subdirectory per enrolled cluster holding fully resolved configs.

Manual conversion: remove `Repo` configs in `system/`; declare the namespace of all resources originally under `namespaces/` (abstract namespace directories are not supported); declare all resources previously inherited by descendant namespaces (namespace inheritance is not supported).

## Options / Props

| Layout | Structure | RootSync/RepoSync usage |
|--------|-----------|-------------------------|
| Environment-based | `cluster-essentials/` (CRDs, namespaces), `environments/{dev,staging,prod}/...`, `system/monitoring/` | Multiple `RootSync` objects per cluster; for example a dev cluster syncs `cluster-essentials/`, `system/`, and `environments/dev/` |
| Cluster-based | `clusters/<cluster>/{apps,networking}`, `shared/{roles,policies}` | The source suggests a `RepoSync` per cluster syncing `shared` and the cluster-specific directory; for cluster-scoped configurations use `RootSync` objects instead (see Notes) |
| Team-based | `teams/<team>/...`, `platform/{cluster-roles,storage-classes}` | Each team uses a `RootSync` (for example `team-alpha` syncs `teams/team-alpha/`) |

## Notes

- Config Sync supports Git repositories, OCI images, and Helm charts as sources. Be careful with Secrets: they may be inappropriate to store in a source of truth.
- Immutable fields (for example a Deployment's Pod selector) cannot be changed by editing the source; this causes a `KNV2009` error. Delete the object from the source, wait for Config Sync to delete it from the cluster, then re-create it.
- With Git submodules, grant Config Sync access to all repositories including submodules.
- Built-in user-facing ClusterRoles (`cluster-admin`, `admin`, `edit`, `view`) can't be managed directly (conflicts with GKE). Use role aggregation with a uniquely named ClusterRole and the appropriate annotations.
- Recommended `sourceFormat` is `unstructured`; the hierarchical format requires a specific folder structure.
- The mutation annotation can't be modified manually on managed objects in the cluster.
- Source inconsistency: for the cluster-based layout the source says "you can use a `RepoSync` to configure each cluster to sync both from `shared` and the cluster-specific directory". The architecture page says a `RepoSync` creates a namespace reconciler that applies objects "to a specific namespace in the cluster" and syncs namespace-scoped resources in that namespace, while a `RootSync` (default `cluster-admin`) syncs cluster-scoped and namespace-scoped resources. Each sync object watches one directory (`spec.git.dir`). So shared cluster-wide objects in `shared/roles` or `shared/policies` need a `RootSync`, and syncing `shared/` and `clusters/<cluster>/` takes one `RootSync` per directory, as in the environment-based layout.
- Source (RootSync and RepoSync scope): https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/concepts/architecture (retrieved 2026-11-16)
- Source: https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/concepts/configs (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [config-sync-sources-of-truth.md](./config-sync-sources-of-truth.md)
- [installing-config-sync.md](./installing-config-sync.md)
- [config-sync-overview.md](./config-sync-overview.md)
