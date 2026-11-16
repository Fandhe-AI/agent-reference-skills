---
source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/stateless-apps
---

# Deploy a stateless Linux application

Deploy a stateless Linux application on GKE with a Kubernetes Deployment, which manages uniform, non-unique Pods and their desired state (replica count, image version, labels). Stateless apps keep no data or state in the cluster or persistent storage; stateful apps use persistent storage and StatefulSets.

## Signature / Usage

### Example Deployment manifest

Three replicated Pods labelled `run=my-app` running the `hello-app` image from Artifact Registry.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      run: my-app
  template:
    metadata:
      labels:
        run: my-app
    spec:
      containers:
      - name: hello-app
        image: us-docker.pkg.dev/google-samples/containers/gke/hello-app:1.0
```

### Create

Replace `DEPLOYMENT_FILE` with the manifest file, such as `config.yaml`. `kubectl apply -f DIRECTORY/` creates the objects defined in the directory that do not exist yet and updates the ones that already exist to match the manifests (see Notes). `kubectl apply` fails without an active cluster.

```bash
kubectl apply -f DEPLOYMENT_FILE
```

### Inspect

```bash
kubectl describe deployment DEPLOYMENT_NAME
kubectl get pods -l KEY=VALUE
kubectl describe pod POD_NAME
kubectl get deployments DEPLOYMENT_NAME -o yaml
```

For example, if you labelled the Deployment `run: my-app`, run `kubectl get pods -l run=my-app`.

### Update

Apply an updated manifest (the resource must have been created with `kubectl apply` or `kubectl create --save-config`):

```bash
kubectl apply -f DEPLOYMENT_FILE
```

Change the image with `kubectl set`:

Adapted (not in the official docs): the source's `IMAGE IMAGE:TAG` is replaced with `CONTAINER_NAME=IMAGE:TAG`, the `CONTAINER=IMAGE` form that `kubectl set image` requires (as in the nginx example below).

```bash
kubectl set image deployment DEPLOYMENT_NAME CONTAINER_NAME=IMAGE:TAG
```

For example, update `nginx` from 1.7.9 to 1.9.1:

```bash
kubectl set image deployment nginx nginx=nginx:1.9.1
```

### Roll back

Roll back an in-progress or completed update to the previous revision, or to a specific one:

```bash
kubectl rollout undo deployment my-deployment
kubectl rollout undo deployment my-deployment --to-revision=3
```

### Scale

Replace `NUMBER_OF_REPLICAS` with the desired number of replicated Pods.

```bash
kubectl scale deployment DEPLOYMENT_NAME --replicas NUMBER_OF_REPLICAS
```

### Delete

```bash
kubectl delete deployment DEPLOYMENT_NAME
```

## Options / Props

| Field / option | Description |
| --- | --- |
| `.spec.replicas` | Number of replicated Pods the Deployment manages. |
| `.spec.template.metadata.labels` | Label given to each Pod, used by the Deployment to manage them. |
| `.spec.template.spec` | Pod specification; `spec.containers` names the container and image. |
| Console rolling-update: Minimum seconds ready | Minimum seconds new Pods must be ready to count as available. |
| Console rolling-update: Maximum surge | Maximum Pods created over the desired number (absolute or percentage). |
| Console rolling-update: Maximum unavailable | Maximum Pods unavailable during the update (absolute or percentage). |

## Notes

- Prerequisites: GKE API enabled, gcloud CLI installed and initialized, and the containerized app stored in an image registry such as Artifact Registry.
- Other ways to update: `kubectl set` can also change `resources`; `kubectl edit` edits the live Deployment. A Deployment's `spec.selector` is immutable after creation in `apps/v1`, so changing the selector requires creating a new Deployment.
- `kubectl delete deployment` is destructive; try it on a disposable Deployment first.
- The source also shows Console (Workloads page) steps for create, inspect, rolling update, scale and delete; they are omitted here.
- Windows applications are covered by a separate page (Deploy a Windows Server application).
- Corrected from the official docs: the source shows `kubectl set image deployment DEPLOYMENT_NAME IMAGE IMAGE:TAG`, which `kubectl` rejects because each argument after the resource name must be `CONTAINER_NAME=IMAGE`; the example uses `CONTAINER_NAME=IMAGE:TAG`, consistent with the source's own `nginx=nginx:1.9.1` example.
- Corrected from the official docs: the source says `kubectl set` can change a Deployment's "image, resources (requests or limits), or selector fields", but the Kubernetes docs state "A Deployment's label selector is **immutable** after creation; it cannot be updated via `kubectl patch`, `kubectl edit`, `kubectl apply`, or tools like `helm upgrade`".
- Clarified from the official docs: the source says `kubectl apply -f DIRECTORY/` creates "all objects (except existing ones)"; the Kubernetes declarative object management page adds that `kubectl apply` also updates "all objects defined in a directory, even if those objects already exist", setting fields from the files and clearing removed fields.
- Source (Kubernetes Deployment): https://kubernetes.io/docs/concepts/workloads/controllers/deployment/ (kubernetes/website commit 48a1f0659629, retrieved 2026-11-16)
- Source (kubectl apply): https://kubernetes.io/docs/tasks/manage-kubernetes-objects/declarative-config/ (kubernetes/website commit 48a1f0659629, retrieved 2026-11-16)
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/stateless-apps (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [workload-separation.md](./workload-separation.md)
- [autopilot-resource-requests.md](./autopilot-resource-requests.md)
