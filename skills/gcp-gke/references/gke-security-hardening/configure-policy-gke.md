---
source: https://docs.cloud.google.com/binary-authorization/docs/configure-policy-gke
---

# Configure a Binary Authorization policy with GKE

Quickstart that creates a GKE cluster with Binary Authorization enforcement, views the default policy (allow all images), tests a deployment, switches the default rule to deny all images, and confirms the deployment is blocked. It is not a real-world policy: a typical policy requires an attestation before an image is admitted. Binary Authorization works with Autopilot and Standard clusters.

## Signature / Usage

### Create a cluster with enforcement enabled

```bash
gcloud container clusters create \
    --binauthz-evaluation-mode=PROJECT_SINGLETON_POLICY_ENFORCE \
    --zone us-central1-a \
    test-cluster
```

### View the default policy

```bash
gcloud container binauthz policy export
```

```yaml
globalPolicyEvaluationMode: ENABLE
defaultAdmissionRule:
  evaluationMode: ALWAYS_ALLOW
  enforcementMode: ENFORCED_BLOCK_AND_AUDIT_LOG
name: projects/PROJECT_ID/policy
```

REST equivalent:

```bash
curl \
    -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
    -H "x-goog-user-project: ${PROJECT_ID}" \
    "https://binaryauthorization.googleapis.com/v1/projects/${PROJECT_ID}/policy"
```

### Test an allowed deployment

```bash
gcloud container clusters get-credentials \
    --zone us-central1-a \
    test-cluster
```

```bash
kubectl run hello-server --image us-docker.pkg.dev/google-samples/containers/gke/hello-app:1.0 --port 8080
```

```bash
kubectl get pods
```

Expected: `hello-server-...  1/1  Running`. Then remove it so the next step can be tested.

Adapted (not in the official docs): `kubectl delete deployment hello-server` replaced with `kubectl delete pod hello-server`, because `kubectl run` creates a Pod, not a Deployment.

```bash
kubectl delete pod hello-server
```

### Change the default rule to deny all images

```bash
gcloud container binauthz policy export  > /tmp/policy.yaml
```

Edit `evaluationMode` from `ALWAYS_ALLOW` to `ALWAYS_DENY`:

```yaml
globalPolicyEvaluationMode: ENABLE
defaultAdmissionRule:
  evaluationMode: ALWAYS_DENY
  enforcementMode: ENFORCED_BLOCK_AND_AUDIT_LOG
name: projects/PROJECT_ID/policy
```

```bash
gcloud container binauthz policy import /tmp/policy.yaml
```

REST equivalent:

```bash
cat > /tmp/policy.json << EOM
{
  "name": "projects/${PROJECT_ID}/policy",
  "globalPolicyEvaluationMode": "ENABLE",
  "defaultAdmissionRule": {
    "evaluationMode": "ALWAYS_DENY",
    "enforcementMode": "ENFORCED_BLOCK_AND_AUDIT_LOG"
  }
}
EOM
```

```bash
curl -X PUT \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
    -H "x-goog-user-project: ${PROJECT_ID}" \
    --data-binary @/tmp/policy.json  \
    "https://binaryauthorization.googleapis.com/v1/projects/${PROJECT_ID}/policy"
```

### Retest (the deployment must now be blocked)

```bash
kubectl run hello-server --image us-docker.pkg.dev/google-samples/containers/gke/hello-app:1.0 --port 8080
```

```bash
kubectl get pods
```

Expected output: `No resources found.` Because `kubectl run` creates the Pod directly, the admission denial is returned as the error of the `kubectl run` command itself. The `FailedCreate` event below is what a controller (for example the ReplicaSet of a Deployment) records when it cannot create the Pod (see Notes). To list events:

```bash
kubectl get event --template \
'{{range.items}}{{"\033[0;36m"}}{{.reason}}:{{"\033[0m"}}{{.message}}{{"\n"}}{{end}}'
```

```text
FailedCreate: Error creating: pods POD_NAME is forbidden: admission webhook "imagepolicywebhook.image-policy.k8s.io" denied the request: Image IMAGE_NAME denied by Binary Authorization default admission rule. Denied by always_deny admission rule
```

### Clean up

```bash
gcloud container clusters delete \
    --zone=us-central1-a \
    test-cluster
```

## Options / Props

| Item | Value |
|------|-------|
| Required roles (on the project) | `roles/binaryauthorization.policyEditor`, `roles/compute.viewer`, `roles/container.admin`, `roles/iam.serviceAccountUser` |
| `--binauthz-evaluation-mode` | `PROJECT_SINGLETON_POLICY_ENFORCE` (enforce the project singleton policy) |
| `evaluationMode` | `ALWAYS_ALLOW`, `ALWAYS_DENY` (a real policy normally requires attestations) |
| `enforcementMode` | `ENFORCED_BLOCK_AND_AUDIT_LOG` |
| `globalPolicyEvaluationMode` | `ENABLE` exempts Google-managed system images |
| Placeholders in the error | `POD_NAME`, `IMAGE_NAME`, `ATTESTOR_NAME` (name of the attestor) |

## Notes

- Prerequisite: `kubectl` installed. The sample image `us-docker.pkg.dev/google-samples/containers/gke/hello-app` is a public Google image in Artifact Registry.
- `gcloud container binauthz policy import` replaces the project's single Binary Authorization policy. Setting `ALWAYS_DENY` blocks all new images (except globally exempt system images) in every cluster of the project that enforces it. Run this only in a disposable project, and restore the `ALWAYS_ALLOW` policy when done; the source does not show the restore step.
- `kubectl delete pod` and `gcloud container clusters delete` are destructive; try them on disposable resources only.
- Corrected from the official docs: the source deletes the test workload with `kubectl delete deployment hello-server`, but `kubectl run` creates a Pod (not a Deployment), so that command fails with NotFound; the example uses `kubectl delete pod hello-server`.
- The source also shows Google Cloud console steps for every task (omitted here). The `gcloud` example uses `--zone`; the `--location` flag is the current general form.
- The `built-by-cloud-build` attestor ([Preview](https://cloud.google.com/products#product-launch-stages)) can deploy only images built by Cloud Build. Binary Authorization policy concepts in general are planned in `gcp-security`.
- Source inconsistency: the source creates the Pod with `kubectl run` and then shows a `FailedCreate: Error creating: pods ...` event, which is the event a controller records; for a Pod created directly, check the error printed by `kubectl run` instead, or deploy the image through a Deployment to see the event.
- Source: https://docs.cloud.google.com/binary-authorization/docs/configure-policy-gke (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [security-overview.md](./security-overview.md)
- [hardening-your-cluster.md](./hardening-your-cluster.md)
