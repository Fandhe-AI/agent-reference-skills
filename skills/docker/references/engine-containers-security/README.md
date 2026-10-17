# engine-containers-security

| Name | Description | Path |
|------|-------------|------|
| AppArmor security profiles for Docker | AppArmor is a Linux security module that associates a security profile with each program. | [apparmor.md](./apparmor.md) |
| Completion | Generate a shell completion script with `docker completion` for word completion of commands, flags, and Docker objects (such as container and volume names) on `<Tab>`. | [cli-completion.md](./cli-completion.md) |
| Filter commands | Use the `--filter` flag to scope commands so that they only include entries matching the pattern you specify. | [cli-filter.md](./cli-filter.md) |
| Format command and log output | Docker supports Go templates to manipulate the output format of certain commands and log drivers, via the `--format` flag. | [cli-formatting.md](./cli-formatting.md) |
| OpenTelemetry for the Docker CLI | The Docker CLI can emit OpenTelemetry metrics about command invocations. | [cli-otel.md](./cli-otel.md) |
| Use a proxy server with the Docker CLI | Configure containers and builds to use HTTP, HTTPS, or FTP proxies through the Docker client configuration file or command-line flags. | [cli-proxy.md](./cli-proxy.md) |
| Docker contexts | Use contexts to manage multiple Docker daemons from a single client. | [contexts.md](./contexts.md) |
| GPU access | Access an NVIDIA GPU from a container with the `--gpus` flag, after installing the NVIDIA driver and the NVIDIA Container Toolkit on the host. | [gpu.md](./gpu.md) |
| Docker object labels | Labels apply key-value metadata (strings) to Docker objects: images, containers, local daemons, volumes, networks, Swarm nodes and Swarm services. | [labels.md](./labels.md) |
| Protect the Docker daemon socket | By default Docker runs through a non-networked UNIX socket. | [protect-access.md](./protect-access.md) |
| Prune unused Docker objects | Docker doesn't remove unused images, containers, volumes, networks and build cache unless asked. | [pruning.md](./pruning.md) |
| Resource constraints | By default, a container has no resource constraints and can use as much of a given resource as the host's kernel scheduler allows. | [resource-constraints.md](./resource-constraints.md) |
| Start containers automatically | Restart policies control whether containers start automatically when they exit, or when Docker restarts. | [restart-policies.md](./restart-policies.md) |
| Rootless mode | Rootless mode runs the Docker daemon and containers as a non-root user inside a user namespace, to mitigate potential vulnerabilities in the daemon and the container runtime. | [rootless.md](./rootless.md) |
| Runtime metrics | Stream a container's metrics with `docker stats`, or read them from Linux control groups (cgroups), iptables counters and network namespaces. | [runmetrics.md](./runmetrics.md) |
| Running containers | Docker runs processes in isolated containers. | [running-containers.md](./running-containers.md) |
| Seccomp security profiles for Docker | Secure computing mode (`seccomp`) is a Linux kernel feature that restricts the system calls available within a container. | [seccomp.md](./seccomp.md) |
| Docker Engine security | Overview of the four areas to consider when reviewing Docker security: kernel namespaces and cgroups, the Docker daemon attack surface, container configuration profile loopholes, and kernel hardening features. | [security-overview.md](./security-overview.md) |
| Isolate containers with a user namespace | Re-map the `root` user inside containers to a less-privileged user on the Docker host using the daemon's `userns-remap` feature. | [userns-remap.md](./userns-remap.md) |
