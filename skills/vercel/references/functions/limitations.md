# Vercel Functions Limits

All limits for Vercel Functions using the Node.js runtime.

## Core Limits

| Feature | Hobby | Pro | Enterprise |
|---------|-------|-----|------------|
| Max memory | 2 GB / 1 vCPU | 4 GB / 2 vCPUs | 4 GB / 2 vCPUs |
| Default duration | 300s | 300s | 300s |
| Max duration | 300s | 800s | 800s |
| Bundle size (uncompressed) | 250 MB | 250 MB | 250 MB |
| Bundle size — Python | 500 MB | 500 MB | 500 MB |
| Bundle size — Large functions (Beta; Node.js, Bun, Python) | Up to 5 GB | Up to 5 GB | Up to 5 GB |
| Concurrency | Up to 30,000 | Up to 30,000 | 100,000+ |
| Function regions | 1 | Up to 5 | All |
| Functions per deployment | 12 | No limit | No limit |

## Edge Runtime Limits

| Feature | Hobby | Pro | Enterprise |
|---------|-------|-----|------------|
| Bundle size (after gzip) | 1 MB | 2 MB | 4 MB |
| Response must begin within | 25s | 25s | 25s |
| Max streaming duration | 300s | 300s | 300s |

## Request / Payload Limits

| Limit | Value |
|-------|-------|
| Max request body size | 4.5 MB |
| Max response body size | 4.5 MB |
| Error on excess | 413 `FUNCTION_PAYLOAD_TOO_LARGE` |

## File System

| Limit | Value |
|-------|-------|
| File descriptors | 1,024 shared across concurrent executions (including runtime) |
| `/tmp` scratch space | 500 MB (writable) |
| Rest of filesystem | Read-only |

## Function Name

- Maximum 128 characters (including file extension)
- No spaces allowed (use `-` or `_`)

## Environment Variables

| Limit | Value |
|-------|-------|
| Total env vars per deployment | 64 KB |
| Max single variable size | 64 KB |

### Inaccessible Env Vars (when fluid compute is enabled)

`AWS_EXECUTION_ENV`, `AWS_LAMBDA_*`, `LAMBDA_*`, `_AWS_XRAY_*`, `_HANDLER`, `_LAMBDA_TELEMETRY_LOG_FD`

Full list per docs: `AWS_EXECUTION_ENV`, `AWS_LAMBDA_EXEC_WRAPPER`, `AWS_LAMBDA_FUNCTION_MEMORY_SIZE`, `AWS_LAMBDA_FUNCTION_NAME`, `AWS_LAMBDA_FUNCTION_VERSION`, `AWS_LAMBDA_INITIALIZATION_TYPE`, `AWS_LAMBDA_LOG_GROUP_NAME`, `AWS_LAMBDA_LOG_STREAM_NAME`, `AWS_LAMBDA_RUNTIME_API`, `AWS_XRAY_CONTEXT_MISSING`, `AWS_XRAY_DAEMON_ADDRESS`, `LAMBDA_RUNTIME_DIR`, `LAMBDA_TASK_ROOT`, `_AWS_XRAY_DAEMON_ADDRESS`, `_AWS_XRAY_DAEMON_PORT`, `_HANDLER`, `_LAMBDA_TELEMETRY_LOG_FD`

## Large Functions (Beta)

Deploy uncompressed bundles up to **5 GB** for workloads shipping large dependencies, model files, or binaries.

| Item | Detail |
|------|--------|
| Supported runtimes | `nodejs`, `bun`, `python` |
| Requirement | Fluid compute with Active CPU enabled (Fluid compute is on by default for new projects) |
| Enable | New projects are eligible by default. Existing projects opt in with the `VERCEL_SUPPORT_LARGE_FUNCTIONS` environment variable: `1` enables, `0` disables (always takes precedence over the project default) |
| Scope | Only Functions exceeding the standard bundle size limit use the large functions beta; others use the standard path |
| Not supported | Projects using Secure Compute or Static IPs |

## Archiving

| Deployment type | Archived after |
|----------------|---------------|
| Production | 2 weeks of no invocations |
| Preview | 48 hours of no invocations |

## Notes

- 504 `FUNCTION_INVOCATION_TIMEOUT` returned when max duration is exceeded
- File descriptor exhaustion causes "too many open files" errors — use connection pooling and close resources promptly
- Bundle size includes code, imported libraries, fonts, and all bundled files (enforced by AWS Lambda limits)
- Use `includeFiles` / `excludeFiles` in `vercel.json` to control bundle contents (not supported in Next.js — use `outputFileTracingIncludes` instead)

## Related

- [max-duration.md](./max-duration.md)
- [memory.md](./memory.md)
- [runtimes.md](./runtimes.md)
- [usage-and-pricing.md](./usage-and-pricing.md)
