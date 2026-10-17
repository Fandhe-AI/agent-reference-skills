# compose-file

| Name | Description | Path |
|------|-------------|------|
| Compose Build Specification | Build is an optional part of the Compose Specification. | [build.md](./build.md) |
| Configs top-level element | Configs let services adapt their behaviour without rebuilding a Docker image. | [configs.md](./configs.md) |
| Compose Deploy Specification | Deploy is an optional part of the Compose Specification. | [deploy.md](./deploy.md) |
| Compose Develop Specification | Develop lets Compose focus on the local-machine development use-case, with development hooks to improve the "inner loop". | [develop.md](./develop.md) |
| Extensions | Use the prefix `x-` as a top-level element to modularize configurations you want to reuse. | [extension.md](./extension.md) |
| Fragments | Built-in YAML anchors and aliases let you create reusable blocks in a Compose file. | [fragments.md](./fragments.md) |
| Use include to modularize Compose files | The `include` top-level section defines a dependency on another Compose application, or sub-domain, so Compose configurations can be reused and modularized. | [include.md](./include.md) |
| Interpolation | Values in a Compose file can be set by variables and interpolated at runtime, using Bash-like syntax. | [interpolation.md](./interpolation.md) |
| Legacy versions | The legacy versions of the Compose file reference have moved to the V1 branch of the Compose repository and are no longer actively maintained. | [legacy-versions.md](./legacy-versions.md) |
| Merge Compose files | Compose lets you define a Compose application model through multiple Compose files, following specific merge rules. | [merge.md](./merge.md) |
| Models | The top-level `models` section declares AI models used by your Compose application. | [models.md](./models.md) |
| Define and manage networks in Docker Compose | The top-level `networks` element configures named networks that can be reused across multiple services. | [networks.md](./networks.md) |
| Compose file reference | The Compose Specification is the latest and recommended version of the Compose file format, used to configure an application's services, networks, volumes, and more. | [overview.md](./overview.md) |
| Learn how to use profiles in Docker Compose | Profiles let you define a set of active profiles so your Compose application model is adjusted for various usages and environments. | [profiles.md](./profiles.md) |
| Secrets | Secrets are a flavor of configs focusing on sensitive data, with specific constraints for this usage. | [secrets.md](./secrets.md) |
| services: env_file / environment / logging | Environment variables passed to service containers, and the logging configuration. | [services-environment-logging.md](./services-environment-logging.md) |
| services: image / build / command / identity attributes | A service is an abstract definition of a computing resource within an application which can be scaled or replaced independently from other components. | [services-image-command.md](./services-image-command.md) |
| services: depends_on / healthcheck / restart / lifecycle hooks | Service startup order, health checks, restart policy, stop behavior, and lifecycle hooks. | [services-lifecycle.md](./services-lifecycle.md) |
| services: networks / ports / dns / hosts | Network attachment, port publishing, DNS, and host-name mapping for service containers. | [services-networking.md](./services-networking.md) |
| services: cpu / memory / blkio / devices / gpus | CPU, memory, block I/O, PID, ulimit, device, and GPU resource attributes at service level. | [services-resources.md](./services-resources.md) |
| services: capabilities / security_opt / namespaces / runtime | Capabilities, privilege, security options, namespaces, cgroups, sysctls, and runtime selection for service containers. | [services-security-runtime.md](./services-security-runtime.md) |
| services: volumes / tmpfs / configs / secrets | Mounts, configs, secrets, and storage options for service containers. | [services-storage.md](./services-storage.md) |
| Version and name top-level elements | The top-level `version` property is obsolete; the top-level `name` property sets the project name. | [version-and-name.md](./version-and-name.md) |
| Define and manage volumes in Docker Compose | Volumes are persistent data stores implemented by the container engine. | [volumes.md](./volumes.md) |
