# Testing Adapters

Next.js provides an end-to-end test harness for validating deployment adapters, driven by environment-variable-provided deploy/logs/cleanup scripts.

## Signature / Usage

```bash
NEXT_TEST_MODE=deploy \
NEXT_TEST_DEPLOY_SCRIPT_PATH=./scripts/e2e-deploy.sh \
NEXT_TEST_DEPLOY_LOGS_SCRIPT_PATH=./scripts/e2e-logs.sh \
NEXT_TEST_CLEANUP_SCRIPT_PATH=./scripts/e2e-cleanup.sh \
node run-tests.js --type e2e
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| NEXT_TEST_DEPLOY_SCRIPT_PATH | env var | Executable that builds and deploys the isolated test app; must print the deployment URL to stdout and exit non-zero on failure. |
| NEXT_TEST_DEPLOY_LOGS_SCRIPT_PATH | env var | Executable returning build/runtime logs; output must include `BUILD_ID:`, `DEPLOYMENT_ID:`, `IMMUTABLE_ASSET_TOKEN:` marker lines. |
| NEXT_TEST_CLEANUP_SCRIPT_PATH | env var | Optional executable that tears down the deployment after tests complete. |

## Notes

- Deploy/logs/cleanup scripts each run as a separate process with `cwd` set to the isolated temp app; persist shared data (build IDs, logs) to files in the working directory to pass it between them.
- The logs and cleanup scripts additionally receive `NEXT_TEST_DIR` and `NEXT_TEST_DEPLOY_URL` as environment variables.
- Use `IMMUTABLE_ASSET_TOKEN: undefined` if the adapter does not produce an immutable asset token.
- A reference GitHub Actions workflow (`test-e2e-deploy.yml`) builds Next.js plus the adapter, then shards e2e tests across a matrix job.

## Related

- [Adapters](./adapters.md)
- [Output Types](./adapters-output-types.md)
