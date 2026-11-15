---
source: https://docs.cloud.google.com/appengine/docs/the-appengine-environments
---

# App Engine environments

App Engine runs apps in the standard environment (sandboxed runtimes, rapid scaling, scale to zero) or the flexible environment (Docker containers on Compute Engine VMs). Both can be used together in one app. For new Google Cloud users Cloud Run is recommended over App Engine.

## Signature / Usage

### Choosing an environment

- Standard: optimal for apps that run for free or at very low cost (scale to 0 instances without traffic) and that see sudden, extreme traffic spikes needing immediate scaling.
- Flexible: optimal for apps that run in a Docker container with a custom runtime or other languages, use frameworks with native code, or access resources in the Compute Engine network; suits consistent traffic or gradual scaling.

### Service snippet to select flexible

```yaml
env: flex
```

## Options / Props

| Feature | Standard environment | Flexible environment |
|---|---|---|
| Instance startup time | Seconds | Minutes |
| Maximum request timeout | Depends on runtime and scaling type | 60 minutes |
| Background threads | Yes, with restrictions | Yes |
| Background processes | No | Yes |
| SSH debugging | No | Yes |
| Scaling | Manual, Basic, Automatic | Manual, Automatic |
| Scale to zero | Yes | No, minimum 1 instance |
| Writing to local disk | Read and write `/tmp` | Yes, ephemeral (initialized on each VM startup) |
| Modifying the runtime | No | Yes (through Dockerfile) |
| Deployment time | Seconds | Minutes |
| Automatic in-place security patches | Yes | Yes (excludes container image runtime) |
| Google Cloud APIs and services (Cloud Storage, Cloud SQL, Memorystore, Google Tasks, others) | Yes | Yes |
| WebSockets | No | Yes |
| Third-party binaries | Yes | Yes |
| Pricing | Instance hours | vCPU, memory and persistent disks |

### Flexible environment versus Compute Engine

- Flexible VM instances restart weekly (OS and security updates applied).
- You always have root access to Compute Engine VMs; SSH to flexible instances is disabled by default and can be enabled.
- Deployments take longer because container images are built with Cloud Build.
- VM region is determined by the location of the project's App Engine application.

## Notes

- Snippet taken from https://docs.cloud.google.com/appengine/docs/flexible/reference/app-yaml (`env: flex`); the environments page itself has no code block.
- Guidance for moving services from standard to flexible (Python, Java, Go, PHP) is at `https://docs.cloud.google.com/appengine/docs/flexible/migrating`.
- Source: https://docs.cloud.google.com/appengine/docs/the-appengine-environments (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [an-overview-of-app-engine.md](./an-overview-of-app-engine.md)
- [standard-app-yaml.md](./standard-app-yaml.md)
- [flexible-app-yaml.md](./flexible-app-yaml.md)
