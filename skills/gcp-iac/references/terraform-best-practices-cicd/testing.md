---
source: https://docs.cloud.google.com/docs/terraform/best-practices/testing
---

# Terraform on Google Cloud: Testing Best Practices

Guidelines for testing Terraform modules and configurations. Full testing deploys real cloud resources, so tests can be time-consuming and expensive; test modules individually and cheaper methods first.

## Signature / Usage

### Static analysis

```bash
terraform validate
```

## Options / Props

### Test methods (ascending cost, run time and depth)

| Method | Description |
|--------|-------------|
| Static analysis | Syntax and structure checks without deploying; use `terraform validate` |
| Module integration testing | Deploy a module into a test environment in isolation and verify the expected resources; frameworks: Google's blueprint testing framework, Terratest, Kitchen-Terraform, InSpec, tftest |
| End-to-end testing | Deploy all modules of the architecture in a fresh test environment, ideally close to production; costly but gives the greatest confidence |

### Practices

| Practice | Detail |
|----------|--------|
| Start small | Build tests iteratively; run smaller tests first with a fail-fast approach |
| Randomize names | Globally unique project IDs and non-overlapping resource names per project; use namespaces and the Terraform `random` provider |
| Separate environment | Isolate from development and production projects; ideally each test creates a fresh project or folder; consider per-test service accounts |
| Clean up | `terraform destroy`, then delete test projects or use the `project_cleanup` module for resources Terraform failed to destroy |
| Run in parallel | For example Terratest `t.Parallel()` after the test function definition |
| Test in stages | Independent configurations; Kitchen-Terraform suites; Terratest `stage(t, STAGE_NAME, CORRESPONDING_TESTFUNCTION)` with `SKIP` plus `STAGE_NAME="true"` environment variables; the blueprint testing framework supports staged execution |

## Notes

- Tests deploy real cloud resources and clean up with `terraform destroy`; run them in a disposable project.
- Warning from the source: do not use cleanup tools such as `project_cleanup` in a production environment.
- Avoid reusing state across tests where possible; each test should be independent. You cannot purely unit test an end-to-end architecture.
- Terratest cleanup: add `defer terraform.Destroy(t, terraformOptions)`. Kitchen-Terraform cleanup: `terraform kitchen delete WORKSPACE_NAME`.
- Source: https://docs.cloud.google.com/docs/terraform/best-practices/testing (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [operations.md](./operations.md)
- [security.md](./security.md)
- [configure-cicd-terraform-config-as-code.md](./configure-cicd-terraform-config-as-code.md)
