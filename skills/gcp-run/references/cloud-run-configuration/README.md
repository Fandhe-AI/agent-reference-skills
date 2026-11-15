# cloud-run-configuration

| Name | Description | Path |
| --- | --- | --- |
| Containers | Container port, entrypoint and arguments, working directory, sidecar start order | [containers.md](./containers.md) |
| CPU | vCPU limits (default 1, max 8, min 0.08) and startup CPU boost | [cpu.md](./cpu.md) |
| Memory limits | Memory (default 512 MiB, max 32 Gi) and required memory per CPU | [memory-limits.md](./memory-limits.md) |
| Environment variables | Set, update, remove variables; limits and reserved names | [environment-variables.md](./environment-variables.md) |
| Execution environments | First generation (gVisor) vs second generation (microVM), SIGTERM | [execution-environments.md](./execution-environments.md) |
