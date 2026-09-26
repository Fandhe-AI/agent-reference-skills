# CI Pipeline Calling One Shared `make verify`

Inert templates for a target project's CI that call the same `make verify`/`make check` contract a developer shell and Git hook already use.

Two examples — GitHub Actions and Azure Pipelines — each run a single step (`make verify`) instead of re-listing individual `fmt`/`lint`/`test`/`build` steps inline in the pipeline file, so the hook, the pipeline, and a local invocation all resolve to the same definition.

```yaml
# GitHub Actions
permissions:
  contents: read

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      # actions/checkout v5.0.1
      - uses: actions/checkout@93cb6efe18208431cddfb8368fd83d5badbf9bfd
        with:
          persist-credentials: false
      - name: Run verify
        run: make verify
```

```yaml
# Azure Pipelines
steps:
  - checkout: self
    persistCredentials: false
  - script: make verify
    displayName: 'Run verify'
```

Source: [`./ci/github-actions.yml.example`](./ci/github-actions.yml.example), [`./ci/azure-pipelines.yml.example`](./ci/azure-pipelines.yml.example).

## Not this repository's CI

Both files are inert templates for a **target project that adopts** this skill's `make verify`/`make check` contract. They have nothing to do with, and are never read by, this repository's own `.github/workflows/ci.yml`. Neither file is discoverable as a real pipeline as-is: `github-actions.yml.example` does not live under any `.github/workflows/` path (and the `.example` extension is not a workflow filename GitHub Actions looks for), and `azure-pipelines.yml.example` is not registered as any pipeline's YAML file in any Azure DevOps project.

## Adoption condition

Copy one of these into a target project only after that project already has a working `make verify` (or `make check`) target — see [`rust-crate.md`](./rust-crate.md), [`node-pnpm.md`](./node-pnpm.md), or [`mixed.md`](./mixed.md) for how those targets are built. Do not add either file to a project that has no Makefile yet; this sample assumes the command contract already exists, it does not create it.

## Pipeline definition vs. server-side merge protection

Both files define **what runs**, not **whether a run is required to merge**:

- GitHub: adding this workflow file does not, by itself, make it a required status check — that is a separate ruleset/branch-protection setting configured by repository/organization admins.
- Azure DevOps: registering this pipeline does not, by itself, make it a required check — that is a separate branch-policy setting under Repos > Branches > Branch policies.

This skill's samples only produce the pipeline definition; enabling either as a merge requirement is an explicit, separate, host-side action for the target project's owners.

## Prerequisites

- The target project's CI runner image already has GNU Make. GitHub's `ubuntu-latest` and Microsoft-hosted `ubuntu-latest` Azure agents both ship it at the time of writing (per each file's own header comment); if a different runner/agent image lacks `make`, add an explicit install step before the `make verify` step.

## OS / shell / GNU Make version

- Not executed in this session — these are pipeline-file templates, not something run locally by this skill's samples. The `make verify`/`make check` step itself inherits whatever Makefile the target project adopted (e.g. `rust-crate.md`'s macOS/GNU Make 3.81 verification, or `node-pnpm.md`'s/`mixed.md`'s toolchain versions).

## Usage

```bash
# 1. Copy into the target project, dropping the .example suffix
cp skills/make/samples/ci/github-actions.yml.example <target-project>/.github/workflows/verify.yml
# or
cp skills/make/samples/ci/azure-pipelines.yml.example <target-project>/azure-pipelines.yml

# 2. Confirm the target project's Makefile actually defines `verify`
#    (or edit the `run:`/`script:` line to `make check` if it only defines that)
grep -E '^verify:' <target-project>/Makefile

# 3. Adjust runs-on/trigger branches, or pool.vmImage/trigger branches, to the
#    target project's own conventions before committing.
```

## Change target / side effects

- Copying either file into a target project and committing it under a real CI path (`.github/workflows/verify.yml`, or registering `azure-pipelines.yml`) is the only way either becomes active — this skill's samples directory itself never triggers a CI run.
- Least privilege is part of the template, not an afterthought: the GitHub Actions file grants
  only `permissions: contents: read` (so it does not inherit a repository's broader default
  `GITHUB_TOKEN` permissions), pins `actions/checkout` to a full commit SHA (the one this
  repository's own CI uses for v5.0.1) instead of a mutable tag, and sets
  `persist-credentials: false`; the Azure file sets `persistCredentials: false` on `checkout`.
  Azure's job access token scope is a project-level setting ("Limit job authorization scope"),
  not something a pipeline file can narrow, so review it host-side. When updating the pinned
  SHA, audit the new commit first.
- Adding or changing a project's real CI, or enabling either as a required check, is an `apply`-phase action requiring that project owner's explicit approval; see [`command-contracts.md`](../references/architecture/command-contracts.md).

## Expected results

- After being copied, adjusted, and merged: a push/PR to the target project triggers the workflow/pipeline, which runs exactly `make verify` (or `make check`) once. A non-zero exit from that command fails the CI run; nothing in either file interprets or downgrades that exit code.

## Files

- [`./ci/github-actions.yml.example`](./ci/github-actions.yml.example)
- [`./ci/azure-pipelines.yml.example`](./ci/azure-pipelines.yml.example)

## Related

- [ci-hooks-and-cache](../references/quality/ci-hooks-and-cache.md) — shared command contract between Git hooks and CI, pipeline definition vs. server-side merge protection
- [command-contracts](../references/architecture/command-contracts.md) — `verify`/`check` scope and side-effect contract

## Provenance and local edits

Each file's own header comment (`SAMPLE FOR A TARGET PROJECT — NOT ACTIVE, NOT THIS REPOSITORY'S CI`) records that it is a `skills/make` sample, not an endorsement to add CI to any specific project. When copying either into a target project, keep an equivalent note (or a short comment naming `skills/make` sample `ci`) so later updates to this skill do not get confused with the target project's own CI history, and so the target project's later local edits are clearly its own.
