---
source: https://docs.cloud.google.com/config-connector/docs/how-to/secrets
---

# Using Secrets to store sensitive data

Config Connector can read values from a Kubernetes `Secret` when configuring Google Cloud resources, for example a Cloud SQL user's password referenced through `secretKeyRef`.

## Signature / Usage

### Prerequisites for the example

Config Connector installed on a Kubernetes cluster and the Cloud SQL Admin API enabled:

```bash
gcloud services list --filter=sqladmin.googleapis.com
```

If it prints `Listed 0 items.`, enable the API with Config Connector (needs the Service Usage API; enabling may take several minutes):

```bash
gcloud services enable serviceusage.googleapis.com
```

`enable-sql.yaml`:

```yaml
apiVersion: serviceusage.cnrm.cloud.google.com/v1beta1
kind: Service
metadata:
  name: sqladmin.googleapis.com
```

```bash
kubectl apply -f enable-sql.yaml --namespace CC_NAMESPACE
```

Or with gcloud:

```bash
gcloud services enable sqladmin.googleapis.com
```

### Create a Cloud SQL server whose user password comes from a Secret

`sql-server-example.yaml`:

```yaml
apiVersion: sql.cnrm.cloud.google.com/v1beta1
kind: SQLInstance
metadata:
  labels:
    label-one: "sql-server-example"
  name: sqlserver-1
spec:
  region: us-central1
  databaseVersion: MYSQL_5_7
  settings:
    tier: db-g1-small
---
apiVersion: sql.cnrm.cloud.google.com/v1beta1
kind: SQLUser
metadata:
  name: sqluser-sample
spec:
  instanceRef:
    name: sqlserver-1
  host: "%"
  password:
    valueFrom:
      secretKeyRef:
        name: secret-1  # Name of the Secret object to extract a value from
        key: password   # Key that identifies the value to be extracted
```

`example-secret.yaml` (edit `PASSWORD` before saving):

```yaml
apiVersion: v1
kind: Secret
metadata:
  name:  secret-1
stringData:
  password: PASSWORD
```

```bash
kubectl apply -n CC_NAMESPACE -f example-secret.yaml
kubectl apply -n CC_NAMESPACE -f sql-server-example.yaml
```

Wait several minutes, then confirm the instance (STATUS `RUNNABLE`) and connect (you are prompted for the password):

```bash
gcloud sql instances list --filter="name=sqlserver-1"
```

```bash
gcloud sql connect sqlserver-1 --user=sqluser-sample
```

Clean up (deletes the Cloud SQL instance and user):

```bash
kubectl delete -n CC_NAMESPACE -f sql-server-example.yaml
kubectl delete -n CC_NAMESPACE -f example-secret.yaml
```

## Notes

- Enable application-layer secrets encryption on the cluster (Cloud KMS envelope encryption); GKE already encrypts Secrets at rest by default. Use RBAC to restrict Secret read access to authorized cluster administrators, and apply the same restriction to Config Connector resources that store sensitive values in `status`, such as `IAMServiceAccountKey`.
- Updating a Secret updates the Google Cloud resource at the next reconcile (for an `SQLUser`, the password changes).
- Deleting a Secret that is in use does not remove the resource's reference; the `SQLUser` keeps its password.
- A reference to a missing Secret produces a `DependencyNotFound` or `DependencyInvalid` Event.
- Kubernetes does not allow cross-namespace Secret access; apply the Secret in every namespace that uses it.
- Do not commit a real password in `example-secret.yaml`; replace `PASSWORD` locally. Try the example on a disposable project first.
- Secret Manager and Cloud KMS are in `gcp-security`.
- Source: https://docs.cloud.google.com/config-connector/docs/how-to/secrets (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [securing-access-to-resources.md](./securing-access-to-resources.md)
- [best-practices.md](./best-practices.md)
