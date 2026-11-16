---
source: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/generic/how-to/enable-binary-authorization
---

# Enable Binary Authorization for attached clusters

Enable Binary Authorization so only trusted, verified images create containers in GKE attached clusters. Enabling alone does not protect the cluster: with no policy configured, all images are allowed.

## Signature / Usage

### 1. Enable the API

```bash
gcloud services enable binaryauthorization.googleapis.com \
  --project=PROJECT_ID
```

### 2. Grant the policy evaluator role (Kubernetes versions before 1.28)

Adapted (not in the official docs): the `--member` value is quoted, because the unquoted `[gke-system/binauthz-agent]` is a glob pattern in zsh.

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="serviceAccount:PROJECT_ID.svc.id.goog[gke-system/binauthz-agent]" \
  --role="roles/binaryauthorization.policyEvaluator"
```

### 3. Enable on register or update

Adapted (not in the official docs): the `...` elision line (which the shell would run as a command) is replaced with the other register flags from the attach page (private-issuer form) and, for update, with `--location`.

```bash
gcloud container attached clusters register CLUSTER_NAME \
  --location=GOOGLE_CLOUD_REGION \
  --fleet-project=PROJECT_NUMBER \
  --platform-version=PLATFORM_VERSION \
  --distribution=generic \
  --context=KUBECONFIG_CONTEXT \
  --has-private-issuer \
  --kubeconfig=KUBECONFIG_PATH \
  --binauthz-evaluation-mode=PROJECT_SINGLETON_POLICY_ENFORCE
```

```bash
gcloud container attached clusters update CLUSTER_NAME \
  --location=GOOGLE_CLOUD_REGION \
  --binauthz-evaluation-mode=PROJECT_SINGLETON_POLICY_ENFORCE
```

## Options / Props

| Item | Value |
| --- | --- |
| `--binauthz-evaluation-mode` | `PROJECT_SINGLETON_POLICY_ENFORCE` |
| Role | `roles/binaryauthorization.policyEvaluator` for the `gke-system/binauthz-agent` Kubernetes service account |

## Notes

- Starting with Kubernetes version 1.28, manual policy binding for the Binary Authorization service account is no longer necessary; skip step 2.
- Corrected from the official docs: the source shows `--member=serviceAccount:PROJECT_ID.svc.id.goog[gke-system/binauthz-agent]` unquoted.
- Corrected from the official docs: the source shows a `...` line between the command name and `--binauthz-evaluation-mode` in both commands.
- Configure a policy afterwards: https://docs.cloud.google.com/binary-authorization/docs/configuring-policy-cli
- Source: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/generic/how-to/enable-binary-authorization (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [attach-cluster-generic.md](./attach-cluster-generic.md)
- [update-cluster.md](./update-cluster.md)
