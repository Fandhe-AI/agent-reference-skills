<!-- source: https://code.claude.com/docs/en/self-hosted-environments-deploy.md / last verified: 2026-08-07 -->

# Run a self-hosted runner fleet on Kubernetes

Deployment that mounts the environment secret from a Kubernetes Secret and wires liveness/readiness probes to the runner's health endpoint.

```bash
kubectl create namespace claude-runners

(umask 077 && cat > ./environment-secret)
# paste the environment key, then Ctrl-D

kubectl create secret generic claude-runner-environment-secret -n claude-runners --from-file=environment-secret=./environment-secret
```

```yaml deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: claude-runner
  namespace: claude-runners
spec:
  replicas: 3
  selector:
    matchLabels:
      app: claude-runner
  template:
    metadata:
      labels:
        app: claude-runner
        app.kubernetes.io/part-of: claude-code-self-hosted-runner
    spec:
      terminationGracePeriodSeconds: 90
      containers:
        - name: runner
          image: <your-registry>/claude-runner:latest
          args:
            - self-hosted-runner
            - --environment-secret-file
            - /etc/claude/environment-secret
            - --capacity
            - "4"
          volumeMounts:
            - name: environment-secret
              mountPath: /etc/claude
              readOnly: true
          ports:
            - name: health
              containerPort: 8080
          readinessProbe:
            httpGet:
              path: /healthz
              port: 8080
            initialDelaySeconds: 5
            periodSeconds: 10
          livenessProbe:
            httpGet:
              path: /healthz
              port: 8080
            initialDelaySeconds: 30
            periodSeconds: 30
      volumes:
        - name: environment-secret
          secret:
            secretName: claude-runner-environment-secret
```

## Notes

- `terminationGracePeriodSeconds: 90` matters: the runner's drain path (stop taking work, finish in-flight turns, run the `post-session` hook) needs up to ~80s at defaults, and Kubernetes' own 30s default kills the pod mid-cleanup.
- `--capacity 4` lets one container serve up to four concurrent sessions from the same locked account; it does not provide per-session isolation. Before connecting to production systems, use `--capacity 1` with one container per session, or switch to on-demand runners.
- `replicas` is a floor on concurrent users, not throughput: each runner locks to one account for the session's duration, so the minimum replica count is the number of users expected active at once.
- `/healthz` on port 8080 only reports the process is alive, not that it's still polling; alert on the `last_poll_age_seconds` Prometheus metric to catch a stuck runner.
