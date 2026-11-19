---
source: https://docs.cloud.google.com/config-connector/docs/how-to/getting-started
---

# Getting started with Config Connector

Enable a Google Cloud API and create, inspect, update and delete a Pub/Sub topic with Config Connector.

## Signature / Usage

### Before you begin

Install Config Connector by completing all steps in the manual installation, and configure a default namespace (the same namespace you annotated when specifying where to create resources). Config Connector uses the Service Usage API to enable service APIs:

```bash
gcloud services enable serviceusage.googleapis.com
```

### Discover available resources

```bash
kubectl get crds --selector cnrm.cloud.google.com/managed-by-kcc=true
```

```bash
kubectl describe crd pubsubtopics.pubsub.cnrm.cloud.google.com
```

### Enable the Pub/Sub service

`enable-pubsub.yaml` (replace `PROJECT_ID`):

```yaml
apiVersion: serviceusage.cnrm.cloud.google.com/v1beta1
kind: Service
metadata:
  name: pubsub.googleapis.com
spec:
  projectRef:
    external: projects/PROJECT_ID
```

```bash
kubectl apply -f enable-pubsub.yaml
```

### Create a Pub/Sub topic

`pubsub-topic.yaml` (replace `PROJECT_ID`, `LABEL_KEY: LABEL_VALUE` such as `environment: production`, and `TOPIC_NAME`):

```yaml
apiVersion: pubsub.cnrm.cloud.google.com/v1beta1
kind: PubSubTopic
metadata:
  annotations:
    cnrm.cloud.google.com/project-id: PROJECT_ID
  labels:
    LABEL_KEY: LABEL_VALUE
  name: TOPIC_NAME
```

```bash
kubectl apply -f pubsub-topic.yaml
```

### Describe, verify readiness

```bash
kubectl describe pubsubtopics
```

```bash
kubectl wait --for=condition=READY pubsubtopics TOPIC_NAME
```

Expected output:

```text
pubsubtopic.pubsub.cnrm.cloud.google.com/TOPIC_NAME condition met
```

### Update a resource

Modify the `metadata` section of `pubsub-topic.yaml`. `NEW_LABEL_VALUE` stands for the whole updated label pair, for example `environment: staging`:

```text
apiVersion: pubsub.cnrm.cloud.google.com/v1beta1
kind: PubSubTopic
metadata:
  annotations:
    cnrm.cloud.google.com/project-id: PROJECT_ID
  labels:
    NEW_LABEL_VALUE
  name: TOPIC_NAME
```

```bash
kubectl apply -f pubsub-topic.yaml
```

### Delete a resource

```bash
kubectl delete -f pubsub-topic.yaml
```

```text
pubsubtopic.pubsub.cnrm.cloud.google.com "TOPIC_NAME" deleted
```

## Notes

- Enabling an API might take several minutes.
- Creating a resource creates it if it does not exist; if a Google Cloud resource with the same name already exists, Config Connector acquires and manages it.
- The source describes `NEW_LABEL_VALUE` as "an updated value for the label you added previously. For example, `environment: staging`".
- By default `kubectl delete` also deletes the Google Cloud `PubSubTopic`. To keep it, use the `cnrm.cloud.google.com/deletion-policy: abandon` annotation (see [managing-deleting-resources.md](./managing-deleting-resources.md)). Try deletion on a disposable project first.
- Source: https://docs.cloud.google.com/config-connector/docs/how-to/getting-started (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [install-manually.md](./install-manually.md)
- [managing-deleting-resources.md](./managing-deleting-resources.md)
- [organizing-resources-overview.md](./organizing-resources-overview.md)
