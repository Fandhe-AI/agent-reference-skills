---
source: https://docs.astral.sh/uv/reference/internals/metadata/
---

# Workspace metadata

`uv workspace metadata` exports the information uv has about a workspace or PEP 723 script as JSON for other tools.

## Signature / Usage

```console
$ uv workspace metadata
$ uv workspace metadata --script path/to/script.py
$ uv workspace metadata --sync
```

```python
member = find_by_name(metadata.members, "mypackage")
member_node = metadata.resolution[member.id]
group = find_by_name(member_node.dependency_groups, "dev")
group_node = metadata.resolution[group.id]
visit(metadata, [group_node])
```

## Options / Props

| Name | Description |
|------|-------------|
| `--script <path>` | Request metadata for a script |
| `--sync` | Install the selected packages before collecting module ownership information |
| `--exact` | With `--sync`, remove unrelated installed packages (they are preserved by default) |

## Notes

- To access information in a `uv.lock` or script lockfile, prefer this command's output: lockfiles are not a stable format uv guarantees anything about. The schema `version` is currently `"preview"`; a full JSON schema will be provided when the format is finalized. Treat as preview (see the preview features page).
- The primary structure is the `resolution` field: the dependency graph with exact versions that a `uv.lock` encodes. Edges are each node's `dependencies`; each entry has an `id` and an optional `marker` (no marker means always required). Cycles are normal.
- Package-derived nodes are identified by `name`, `version`, `source`, and `kind`; script and workspace nodes by path; workspace-root dependency group nodes by group name and workspace path. All node ids should be treated as opaque.
- Node kinds: `"script"` (a PEP 723 script and its direct dependencies), `"workspace"` (a workspace root and its workspace-exclusive dependency groups), `"package"`, `{ "extra": "extraname" }`, `{ "group": "groupname" }`. "build" nodes are planned for the future.
- To install `mypackage`, find its `"kind": "package"` node (includes sdist, wheels, `optional_dependencies`, `dependency_groups`). An extra node always depends on the package; a group node does not.
- Multiple versions of a package can appear because of different platforms or workspace `conflicts` (top-level `conflicts` field). Guarantee: for any concrete choice of markers, a conflict-free set of selected packages will not have multiple versions of a package. Avoid iterating `resolution` to find a node; start from `workspace.id`, the `members` array, or `script.id` and follow dependency edges.
- Generic traversal:

```python
def visit(metadata: UvMetadata, to_analyze: list[Node]):
    visited = set()
    while len(to_analyze) > 0:
        node = to_analyze.pop()

        # Handle cycles by avoiding revisiting nodes
        if node.id in visited:
            continue
        visited.add(node.id)

        # We also need to analyze its dependencies
        for dependency in node.dependencies:
            # Only follow edges if they satisfy the desired platform's markers
            if dependency.marker and not satisfies(platform, dependency.marker):
                continue
            to_analyze.append(metadata.resolution[dependency.id])

        # Analyze any package node we encounter
        if node.kind == "package":
            print(node.name, node.version, node.source)
```

- Top-level schema fields (annotated example in the source): `schema.version`, `workspace_root`, `environment` (`root`, `python.path/version/implementation`), `script` (`path`, `id`; only with `--script`), `workspace` (`path`, `id`; omitted with `--script`), `requires_python`, `members[]` (`name`, `path`, `id`), `conflicts.sets[].items[]` (`package`, `kind`, `id`), `resolution` map. Package nodes carry `name`, `version`, `source` (`editable` / `registry.url`), `kind`, `dependencies`, `optional_dependencies`, `dependency_groups`, `sdist` and `wheels` (`url` or `path`, `hashes`, `size`, `upload_time`, `filename`). Read the official page for the full annotated JSON.

## Related

- [Using workspaces](./workspaces.md)
- [Scripts (PEP 723 inline metadata)](./scripts.md)
- [Conflicting dependencies and environments](./conflicts-environments.md)
