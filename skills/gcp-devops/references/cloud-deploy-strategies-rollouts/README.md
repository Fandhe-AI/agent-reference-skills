# Cloud Deploy deployment strategies and rollouts

| Name | Description | Path |
|------|-------------|------|
| Deployment strategies | Standard vs canary strategies, phases skipped on first deployment | [deployment-strategies.md](./deployment-strategies.md) |
| Canary | Canary types, supported target types, parallel canary, deploy analysis | [canary.md](./canary.md) |
| Canary to Cloud Run | Automated and custom-automated canary for Cloud Run services and worker pools | [cloud-run.md](./cloud-run.md) |
| Canary to GKE (service networking) | Pod-based canary with Service networking, pod provisioning formulas | [service-networking.md](./service-networking.md) |
| Canary to GKE (Gateway API) | Traffic-based canary with HTTPRoute, routeDestinations | [gateway-api.md](./gateway-api.md) |
| Manage rollouts | Phases, jobs, states; advance, cancel, terminate, ignore, retry | [manage-rollout.md](./manage-rollout.md) |
| Roll back | Roll a target back to an earlier release | [roll-back.md](./roll-back.md) |
| Deploy parameters | Post-render placeholders, three ways to pass values, limits | [parameters.md](./parameters.md) |
