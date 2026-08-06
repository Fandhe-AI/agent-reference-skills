# WIF: Kubernetes

Use a self-managed Kubernetes cluster as a Workload Identity Provider via projected service account tokens, trusting the cluster's own OIDC issuer.

## Signature / Usage

```bash
kubectl create serviceaccount openai-wif --namespace default
kubectl get --raw /.well-known/openid-configuration | jq -r .issuer
kubectl get --raw /openid/v1/jwks
```

```yaml
volumes:
  - name: ksa-token
    projected:
      sources:
        - serviceAccountToken:
            path: token
            audience: "https://api.openai.com/v1"
            expirationSeconds: 3600
```

## Options / Props

| Claim | Value |
|-------|-------|
| Issuer (`iss`) | Cluster's own `/.well-known/openid-configuration` issuer URL |
| Audience (`aud`) | Matches the projected token volume's `audience` |
| Subject (`sub`) | `system:serviceaccount:<namespace>:<service-account-name>` |

## Notes

- Self-managed clusters typically can't be reached by OpenAI for OIDC discovery, so enable **Use uploaded JWKS for token verification** and paste the output of `kubectl get --raw /openid/v1/jwks`.
- Keep the uploaded JWKS synchronized whenever cluster signing keys rotate.
- Read the mounted token from its file path at request time so token rotation is picked up automatically.
- For managed Kubernetes (EKS, GKE, AKS), use the cloud-specific WIF guide instead — those issuers support live OIDC discovery.

## Related

- [Workload Identity Federation](./workload-identity-federation.md)
- [WIF: AWS](./wif-aws.md)
- [WIF: Google Cloud](./wif-google-cloud.md)
- [WIF: Microsoft Azure](./wif-microsoft-azure.md)
