---
source: https://docs.astral.sh/uv/pip/inspection/
---

# Inspecting environments

List, show, and verify packages in an environment.

## Signature / Usage

```console
$ uv pip list
$ uv pip list --format json
$ uv pip freeze
$ uv pip show numpy
$ uv pip check
```

## Listing installed packages

- `uv pip list` lists all the packages in the environment.
- `uv pip list --format json` lists the packages in a JSON format.
- `uv pip freeze` lists all the packages in the environment in a `requirements.txt` format.

## Inspecting a package

`uv pip show numpy` shows information about an installed package. Multiple packages can be inspected at once.

## Verifying an environment

It is possible to install packages with conflicting requirements into an environment if installed in multiple steps. `uv pip check` checks for conflicts or missing dependencies in the environment.

## Related

- [uv pip list](./uv-pip-list.md)
- [uv pip freeze](./uv-pip-freeze.md)
- [uv pip show](./uv-pip-show.md)
- [uv pip tree](./uv-pip-tree.md)
- [uv pip check](./uv-pip-check.md)
