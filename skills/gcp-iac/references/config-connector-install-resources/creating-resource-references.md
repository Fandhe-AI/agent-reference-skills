---
source: https://docs.cloud.google.com/config-connector/docs/how-to/creating-resource-references
---

# Creating resource references

Config Connector resources can reference other resources through `spec` fields named after the resource's short name followed by `Ref`. References are either dependencies or links.

## Signature / Usage

### Reference by name

A `PubSubSubscription` that references a `PubSubTopic` named `my-topic` (create the topic first). Save the topic as `pubsub-topic.yaml`:

Adapted (not in the official docs): the topic name is lowercase (`my-topic`) because `metadata.name` must be a lowercase RFC 1123 subdomain.

```yaml
apiVersion: pubsub.cnrm.cloud.google.com/v1beta1
kind: PubSubTopic
metadata:
  name: my-topic
```

```bash
kubectl --namespace CC_NAMESPACE apply -f pubsub-topic.yaml
```

Save the subscription as `pubsub-subscription.yaml`:

Adapted (not in the official docs): `topicRef.name` uses the lowercase topic name `my-topic` from the previous step.

```yaml
apiVersion: pubsub.cnrm.cloud.google.com/v1beta1
kind: PubSubSubscription
metadata:
  name: pubsubsubscription-referencing-topic
spec:
  topicRef:
    name: my-topic
```

```bash
kubectl --namespace CC_NAMESPACE apply -f pubsub-subscription.yaml
```

### External references (Beta)

References to resources Config Connector does not manage:

```yaml
apiVersion: compute.cnrm.cloud.google.com/v1beta1
kind: ComputeURLMap
metadata:
  name: test-urlmap
spec:
  location: global
  defaultService:
    backendServiceRef:
      external: https://www.googleapis.com/compute/v1/projects/PROJECT_ID/global/backendServices/test-backendservice
```

`IAMPolicy`, `IAMPartialPolicy` and `IAMPolicyMember` also support external references and require `kind`:

```yaml
apiVersion: iam.cnrm.cloud.google.com/v1beta1
kind: IAMPolicyMember
metadata:
  name: test-iampolicymember
spec:
  member: serviceAccount:test-serviceaccount@test-project.iam.gserviceaccount.com
  role: roles/storage.admin
  resourceRef:
    kind: Project
    external: projects/test-project
```

### Cross-namespace references

In namespaced mode, grant additional permissions so resources in `NAMESPACE_A` can reference resources in `NAMESPACE_B`:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  namespace: NAMESPACE_B
  name: allow-references-from-NAMESPACE_A
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cnrm-viewer
subjects:
- kind: ServiceAccount
  name: cnrm-controller-manager-NAMESPACE_A
  namespace: cnrm-system
```

## Options / Props

| Reference type | Meaning |
|---|---|
| Dependency | Refers to an existing Google Cloud resource the Config Connector resource needs (for example a firewall rule cannot exist without a network) |
| Link | Ties independent resources together (for example a Project can be associated with a Billing Account) |

## Notes

- The reference is an object with a single field (`name`); for `PubSubTopic` named `topic` the field is `topicRef`, for `StorageBucket` named `bucket` it is `bucketRef`.
- External references are Beta: subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the Service Specific Terms; Pre-GA features are available "as is" and might have limited support.
- The format of values accepted by `external` depends on the resource; read the `external` field descriptions in the resource reference. For IAM resources, see the "External Reference Formats" column of the Supported Resources table on the `IAMPolicy`, `IAMPartialPolicy` and `IAMPolicyMember` pages, or the "IAM External Reference Format" row of a resource's summary table. `kind` must be set when using external references with these IAM resources.
- Replace `CC_NAMESPACE` with the namespace Config Connector manages resources from. Dropped block: the source's `pubsub-topic.yaml` placeholder template (`TOPIC_NAME`) places `name:` at the wrong indentation under `metadata:`; the concrete example from the same source page is shown instead.
- Corrected from the official docs: `name: myTopic` (topic) and `topicRef: name: myTopic` (subscription); an uppercase `metadata.name` is rejected with "a lowercase RFC 1123 subdomain must consist of lower case alphanumeric characters, '-' or '.'" (https://docs.cloud.google.com/config-connector/docs/troubleshooting, "Error due to special characters in resource name"), so both use `my-topic`.
- The `roles/storage.admin` role in the IAM example is as written in the source; it is a broad Cloud Storage role.
- Source: https://docs.cloud.google.com/config-connector/docs/how-to/creating-resource-references (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [organizing-resources-overview.md](./organizing-resources-overview.md)
- [resources-reference-overview.md](./resources-reference-overview.md)
- [managing-deleting-resources.md](./managing-deleting-resources.md)
