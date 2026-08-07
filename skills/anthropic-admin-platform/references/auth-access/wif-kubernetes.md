<!-- source: https://platform.claude.com/docs/en/manage-claude/wif-providers/kubernetes / last verified: 2026-08-07 -->

# Use WIF with Kubernetes

Authenticate to the Claude API from self-managed Kubernetes clusters (kubeadm, k3s, OpenShift, on-premises) using projected service account tokens, where the cluster's API server acts as the OIDC issuer.

## Signature / Usage

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: inference-worker
  namespace: inference
spec:
  serviceAccountName: inference-worker
  volumes:
    - name: anthropic-token
      projected:
        sources:
          - serviceAccountToken:
              audience: https://api.anthropic.com
              expirationSeconds: 3600
              path: token
  containers:
    - name: app
      image: your-registry/inference-worker:latest
      env:
        - name: ANTHROPIC_IDENTITY_TOKEN_FILE
          value: /var/run/secrets/anthropic.com/token
      volumeMounts:
        - name: anthropic-token
          mountPath: /var/run/secrets/anthropic.com
          readOnly: true
```

## Options / Props

| Item | Value |
|------|-------|
| Issuer discovery | `kubectl get --raw /.well-known/openid-configuration \| jq -r .issuer` |
| `sub` claim form | `system:serviceaccount:<namespace>:<service-account>` |
| Inline JWKS fetch | `kubectl get --raw /openid/v1/jwks` |

## Notes

- Claude API WIF for Kubernetes; distinct from OpenAI's own `wif-kubernetes.md` under `openai-platform-ops`.
- Many self-managed clusters use an internal-only issuer URL (e.g. `https://kubernetes.default.svc.cluster.local`); use `inline` JWKS mode with the `keys` array from `kubectl get --raw /openid/v1/jwks` (not the `{"keys": [...]}` wrapper). With `inline` keys you must manually update the issuer on cluster key rotation.
- For managed Kubernetes with a public/native issuer, see the provider-specific paths: AWS EKS, Google GKE, Azure AKS.
- Scoping warning: `subject_prefix` of `system:serviceaccount:*` matches every service account in the cluster; without an `audience` matcher the rule also matches default-audience tokens every pod already has. Pin `<namespace>:<name>` with no trailing `*` and always set `audience`.

## Related

- [workload-identity-federation.md](./workload-identity-federation.md)
- [wif-aws.md](./wif-aws.md)
- [wif-spiffe.md](./wif-spiffe.md)
