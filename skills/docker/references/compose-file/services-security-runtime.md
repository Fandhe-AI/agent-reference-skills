---
source: https://docs.docker.com/reference/compose-file/services/#security_opt
---

# services: capabilities / security_opt / namespaces / runtime

Capabilities, privilege, security options, namespaces, cgroups, sysctls, and runtime selection for service containers.

## Signature / Usage

```yml
security_opt:
  - no-new-privileges
  - label=user:USER
  - label=role:ROLE
```

## Notes

### `cap_add`

Additional container capabilities, as strings.

```yaml
cap_add:
  - ALL
```

### `cap_drop`

Container capabilities to drop, as strings.

```yaml
cap_drop:
  - NET_ADMIN
  - SYS_ADMIN
```

### `privileged`

Runs the service container with elevated privileges. Support and actual impacts are platform specific.

### `security_opt`

Overrides the default labeling scheme for each container. Options accept `option=value` or `option:value`. For boolean options such as `no-new-privileges`, the value may be omitted, in which case the option is treated as enabled. These are all equivalent:

```yml
security_opt:
  - no-new-privileges
  - no-new-privileges=true
  - no-new-privileges:true
```

```yml
security_opt:
  - label=user:USER
  - label=role:ROLE
```

### `userns_mode`

Sets the user namespace for the service. Supported values are platform specific and may depend on platform configuration.

```yml
userns_mode: "host"
```

### `group_add`

Additional groups, by name or number, which the user inside the container must be a member of. Useful when multiple containers (running as different users) need to read or write the same file on a shared volume.

```yml
services:
  myservice:
    image: alpine
    group_add:
      - mail
```

Running `id` inside the created container must show that the user belongs to the `mail` group.

### `cgroup`

Specifies the cgroup namespace to join. When unset, the container runtime decides, if supported.

- `host`: runs the container in the container runtime cgroup namespace.
- `private`: runs the container in its own private cgroup namespace.

### `cgroup_parent`

An optional parent cgroup for the container.

```yaml
cgroup_parent: m-executor-abcd
```

### `credential_spec`

Configures the credential spec for a managed service account, for services using Windows containers. Use `file:` and `registry:` protocols (Compose also supports additional protocols for custom use-cases). Format must be `file://<filename>` or `registry://<value-name>`.

```yml
credential_spec:
  file: my-credential-spec.json
```

With `registry:`, the credential spec is read from the Windows registry on the daemon's host, from a value located under `HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Virtualization\Containers\CredentialSpecs`.

```yml
credential_spec:
  registry: my-credential-spec
```

gMSA configuration (only specify a credential spec with `config`):

```yml
services:
  myservice:
    image: myimage:latest
    credential_spec:
      config: my_credential_spec

configs:
  my_credentials_spec:
    file: ./my-credential-spec.json
```

### `isolation`

Specifies a container's isolation technology. Supported values are platform specific.

### `runtime`

Specifies which runtime to use for the service's containers, for example the name of an implementation of the OCI Runtime Spec such as `runc`. The default is `runc`.

```yml
web:
  image: busybox:latest
  command: true
  runtime: runc
```

### `ipc`

IPC isolation mode of the service container.

- `shareable`: gives the container its own private IPC namespace, with a possibility to share it with other containers.
- `service:{name}`: makes the container join another container's (`shareable`) IPC namespace.

```yml
    ipc: "shareable"
    ipc: "service:[service name]"
```

### `pid`

Sets the PID mode for the container created by Compose. Supported values are platform specific.

### `uts`

Configures the UTS namespace mode. When unspecified it is the runtime's decision, if supported. Available value `'host'` uses the same UTS namespace as the host.

```yml
    uts: "host"
```

### `sysctls`

Kernel parameters to set in the container, as an array or a map.

```yml
sysctls:
  net.core.somaxconn: 1024
  net.ipv4.tcp_syncookies: 0
```

```yml
sysctls:
  - net.core.somaxconn=1024
  - net.ipv4.tcp_syncookies=0
```

You can only use sysctls that are namespaced in the kernel. Docker does not support changing sysctls inside a container that also modify the host system.

### `use_api_socket`

When set, the container can interact with the underlying container engine through the API socket. Your credentials are mounted inside the container so it acts as a pure delegate for your commands relating to the container engine. Typically, commands run by the container can `pull` and `push` to your registry.

### Other notes

- Docker Compose (container orchestration), not Jetpack Compose: see android-compose-ui / android-compose-components / android-compose-graphics-animation.

## Related

- [services: cpu / memory / blkio / devices / gpus](./services-resources.md)
- [services: networks / ports / dns / hosts](./services-networking.md)
