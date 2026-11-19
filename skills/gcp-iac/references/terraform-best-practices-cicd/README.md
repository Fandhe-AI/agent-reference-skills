# terraform-best-practices-cicd

| Name | Description | Path |
|------|-------------|------|
| General style and structure | Module structure, naming, variables, outputs, formatting | [general-style-structure.md](./general-style-structure.md) |
| Root modules | Environment directories, remote state outputs, provider pins, lock file | [root-modules.md](./root-modules.md) |
| Reusable modules | API activation, versioning, providers, labels, submodules | [reusable-modules.md](./reusable-modules.md) |
| Dependency management | Implicit vs explicit dependencies, output attributes | [dependency-management.md](./dependency-management.md) |
| Cross-configuration communication | Sharing data through remote state and data sources | [cross-config-communication.md](./cross-config-communication.md) |
| Working with resources | Baked VM images, IAM resource choices | [working-with-resources.md](./working-with-resources.md) |
| Security | Remote state, secrets in state, pre-apply checks, audits | [security.md](./security.md) |
| Testing | Test methods, naming, isolation, cleanup | [testing.md](./testing.md) |
| Version control | Branching, environment branches, repository layout, secrets | [version-control.md](./version-control.md) |
| Operations | Plan first, pipelines, credentials, import, state | [operations.md](./operations.md) |
| GitOps CI/CD with Secure Source Manager | Terraform + Cloud Build + Secure Source Manager tutorial | [configure-cicd-terraform-config-as-code.md](./configure-cicd-terraform-config-as-code.md) |
