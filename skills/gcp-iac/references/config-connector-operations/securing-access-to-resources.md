---
source: https://docs.cloud.google.com/config-connector/docs/how-to/securing-access-to-resources
---

# Securing access to resources with IAM

Kubernetes users and service accounts need permissions to manage Config Connector resources. The control plane is secured with Kubernetes RBAC, and the data plane with `IAMPolicy` / `IAMPolicyMember` resources. Resources that can be referenced by IAMPolicy / IAMPolicyMember are marked "Can Be Referenced by IAMPolicy/IAMPolicyMember" in the resource reference. Prerequisite: Config Connector installed on your cluster.

## Signature / Usage

### Secure the control plane with RBAC

`pubsub-topic-service-account.yaml`:

Adapted (not in the official docs): the namespace is `CC_NAMESPACE`, the namespace every `kubectl apply` on this page uses.

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: pubsub-topic-service-account
  namespace: CC_NAMESPACE
```

```bash
kubectl apply -f pubsub-topic-service-account.yaml --namespace CC_NAMESPACE
```

Adapted (not in the official docs): the check uses the `create` verb, as the step text says, and impersonates the service account in `CC_NAMESPACE` with `--namespace CC_NAMESPACE`.

```bash
kubectl auth can-i create pubsubtopics --namespace CC_NAMESPACE --as=system:serviceaccount:CC_NAMESPACE:pubsub-topic-service-account
```

The output should contain `no`. Then `pubsub-topic-editor-role.yaml` (find `apiGroups` and `resources` values in the resource reference):

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  creationTimestamp: null
  name: pubsub-topic-editor
rules:
- apiGroups:
  - pubsub.cnrm.cloud.google.com
  resources:
  - pubsubtopics
  verbs:
  - get
  - list
  - watch
  - create
  - update
  - patch
  - delete
```

```bash
kubectl apply -f pubsub-topic-editor-role.yaml --namespace CC_NAMESPACE
```

`pubsub-topic-editor-rolebinding.yaml`:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: pubsub-topic-editor-rolebinding.
subjects:
- kind: ServiceAccount
  name: pubsub-topic-service-account
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: pubsub-topic-editor
```

```bash
kubectl apply -f pubsub-topic-editor-rolebinding.yaml --namespace CC_NAMESPACE
```

The same `can-i` check should now output `yes`.

Clean up:

```bash
kubectl delete -f pubsub-topic-editor-rolebinding.yaml --namespace CC_NAMESPACE
kubectl delete -f pubsub-topic-editor-role.yaml --namespace CC_NAMESPACE
kubectl delete -f pubsub-topic-service-account.yaml --namespace CC_NAMESPACE
```

### Secure the data plane with IAMPolicyMember

`pubsub-topic-sample.yaml`:

```yaml
apiVersion: pubsub.cnrm.cloud.google.com/v1beta1
kind: PubSubTopic
metadata:
  name: pubsubtopic-sample
```

```bash
kubectl apply -f pubsub-topic-sample.yaml --namespace CC_NAMESPACE
```

`iampolicymember.yaml` (replace `EMAIL_ADDRESS` with your account's email):

```yaml
apiVersion: iam.cnrm.cloud.google.com/v1beta1
kind: IAMPolicyMember
metadata:
  name: iampolicymember-sample
spec:
  resourceRef:
    apiVersion: pubsub.cnrm.cloud.google.com/v1beta1
    kind: PubSubTopic
    name: pubsubtopic-sample
  role: roles/pubsub.admin
  member: "user:EMAIL_ADDRESS"
```

```bash
kubectl apply -f iampolicymember.yaml  --namespace CC_NAMESPACE
```

Confirm the policy (replace `PROJECT_ID`):

```bash
gcloud beta pubsub topics get-iam-policy projects/PROJECT_ID/topics/pubsubtopic-sample
```

Clean up:

```bash
kubectl delete -f iampolicymember.yaml --namespace CC_NAMESPACE
kubectl delete -f pubsub-topic-sample.yaml --namespace CC_NAMESPACE
```

### Multi-tenant isolation: scope the Workload Identity binding

```bash
gcloud iam service-accounts add-iam-policy-binding \
    GSA_NAME@PROJECT_ID.iam.gserviceaccount.com \
    --member="serviceAccount:PROJECT_ID.svc.id.goog[cnrm-system/cnrm-controller-manager-CC_NAMESPACE]" \
    --role="roles/iam.workloadIdentityUser"
```

## Options / Props

| Placeholder | Meaning |
|-------------|---------|
| `CC_NAMESPACE` | Namespace Config Connector manages resources from |
| `GSA_NAME` | IAM service account Config Connector uses for the namespace |
| `PROJECT_ID` | Project that contains the cluster and the IAM service account |
| `EMAIL_ADDRESS` | Google Cloud account email for the `IAMPolicyMember` |

## Notes

- Best practices from the source: enforce namespaced mode and avoid cluster mode in multi-tenant environments (cluster mode shares one IAM service account, so anyone who can create Config Connector resources in any namespace acts with its full permissions); restrict RBAC create/modify rights on `IAMPolicy`, `IAMPartialPolicy` and `IAMPolicyMember`; bind `roles/iam.workloadIdentityUser` only to the namespace's Kubernetes service account.
- Do not grant `roles/iam.workloadIdentityUser` to a principal set such as all Pods in the `cnrm-system` namespace: in namespaced mode all controllers run in `cnrm-system`, so every namespace's controller could impersonate the service account.
- The example grants `roles/pubsub.admin` on one topic to a user; that role is broad for the topic. Delete the sample resources afterwards; try this on a disposable project first.
- Corrected from the official docs: both checks were `kubectl auth can-i get pubsubtopics --as=system:serviceaccount:default:pubsub-topic-service-account`, while the steps say "Confirm `pubsub-topic-service-account` cannot create `PubSubTopic` resources" and "Confirm the `pubsub-topic-service-account` is allowed to create `PubSubTopic` resources".
- Corrected from the official docs: the source's ServiceAccount manifest sets `namespace: default` and its checks impersonate `system:serviceaccount:default:pubsub-topic-service-account` without `--namespace`, while every `kubectl apply` passes `--namespace CC_NAMESPACE`. `kubectl apply --namespace` rejects a manifest whose `metadata.namespace` differs, and a RoleBinding without a subject namespace binds the service account in the RoleBinding's own namespace, so this page uses `CC_NAMESPACE` for the ServiceAccount, the impersonated principal and the `can-i` checks. The source's form works as written only when `CC_NAMESPACE` is `default`.
- The RoleBinding name ends with a period (`pubsub-topic-editor-rolebinding.`) in the source and is kept as written.
- Source: https://docs.cloud.google.com/config-connector/docs/how-to/securing-access-to-resources (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [configure-iam-permissions.md](./configure-iam-permissions.md)
- [secrets.md](./secrets.md)
