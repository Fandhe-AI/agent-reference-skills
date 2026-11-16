---
source: https://docs.cloud.google.com/kubernetes-engine/docs/deprecations/policy-controller
---

# Migrate from Policy Controller

Policy Controller is deprecated as of November 12, 2026 and reaches end of support on December 31, 2027. In GKE version 1.39 and later, clusters don't support Policy Controller. Admission policies can be migrated to Kubernetes ValidatingAdmissionPolicies, Pod Security Admission, or self-managed OPA Gatekeeper. Migrating doesn't affect running workloads, because Policy Controller only evaluates create/update requests.

## Signature / Usage

### Inventory and back up policies

Identify clusters in the fleet that run Policy Controller:

```bash
gcloud container fleet policycontroller describe \
    --project=PROJECT_ID
```

List constraints (a blank `ACTION` means the default `deny`):

```bash
kubectl get constraints \
    -o custom-columns='KIND:.kind,NAME:.metadata.name,'\
'ACTION:.spec.enforcementAction,VIOLATIONS:.status.totalViolations,'\
'BUNDLE:.metadata.labels.policycontroller\.gke\.io/bundleName'
```

Back up templates and constraints:

```bash
kubectl get constrainttemplates -o yaml \
    > policy-controller-templates-backup.yaml
kubectl get constraints -o yaml \
    > policy-controller-constraints-backup.yaml
```

### Migrate to ValidatingAdmissionPolicy

Policy Controller constraint:

```yaml
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sAllowedRepos
metadata:
  name: allowed-repos
spec:
  enforcementAction: deny
  match:
    kinds:
    - apiGroups: [""]
      kinds: ["Pod"]
    excludedNamespaces: ["kube-system"]
  parameters:
    repos:
    - "us-docker.pkg.dev/example-project/example-repo/"
```

Equivalent policy and binding (the binding uses `Warn` and `Audit` so results can be compared before enforcing):

```yaml
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicy
metadata:
  name: allowed-repos
spec:
  failurePolicy: Fail
  matchConstraints:
    resourceRules:
    - apiGroups: [""]
      apiVersions: ["v1"]
      operations: ["CREATE", "UPDATE"]
      resources: ["pods", "pods/ephemeralcontainers"]
  variables:
  - name: repos
    expression: "['us-docker.pkg.dev/example-project/example-repo/']"
  - name: images
    expression: >-
      object.spec.containers.map(c, c.image) +
      (has(object.spec.initContainers) ?
        object.spec.initContainers.map(c, c.image) : []) +
      (has(object.spec.ephemeralContainers) ?
        object.spec.ephemeralContainers.map(c, c.image) : [])
  validations:
  - expression: >-
      variables.images.all(image,
        variables.repos.exists(repo, image.startsWith(repo)))
    messageExpression: >-
      'container images must come from one of these repositories: ' +
      variables.repos.join(', ')
    reason: Forbidden
---
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicyBinding
metadata:
  name: allowed-repos
spec:
  policyName: allowed-repos
  validationActions: ["Warn", "Audit"]
  matchResources:
    namespaceSelector:
      matchExpressions:
      - key: kubernetes.io/metadata.name
        operator: NotIn
        values: ["kube-system", "gatekeeper-system"]
```

Run alongside Policy Controller first: apply with `["Warn", "Audit"]`, compare results with the audit log query below, then switch to `validationActions: ["Deny"]` and delete the Policy Controller constraint.

### Move to self-managed Gatekeeper

Test custom templates with `gator` (from the Gatekeeper version you will install):

```bash
gator test --filename=TEMPLATE_FILE
```

After removing Policy Controller and installing Gatekeeper with Helm, apply templates and confirm CRDs exist before applying constraints:

```bash
kubectl get constrainttemplates \
    -o custom-columns='NAME:.metadata.name,CREATED:.status.created'
```

List mutators and test manifests against ValidatingAdmissionPolicies:

```bash
kubectl get assign,assignmetadata,assignimage,modifyset
```

```bash
kubectl apply --dry-run=server -f MANIFEST_DIRECTORY
```

### Find failed validations (Logs Explorer)

```text
resource.type="k8s_cluster"
logName:"cloudaudit.googleapis.com%2Factivity"
labels."validation.policy.admission.k8s.io/validation_failure":*
```

### Remove Policy Controller

This is destructive: it deletes every ConstraintTemplate, constraint, sync configuration, and mutator on the cluster.

```bash
gcloud container fleet policycontroller disable \
    --memberships=MEMBERSHIP_NAME \
    --project=PROJECT_ID
```

Wait until `policycontroller.state` is `NOT_INSTALLED` (not `DECOMMISSIONING`):

```bash
gcloud container fleet policycontroller describe \
    --memberships=MEMBERSHIP_NAME \
    --project=PROJECT_ID \
    --format="yaml(membershipStates)"
```

If installing Gatekeeper, wait until this reports the namespace isn't found:

```bash
kubectl get namespace gatekeeper-system
```

## Options / Props

### Replacement options

| Option | When to use | Operation and support |
|--------|-------------|-----------------------|
| ValidatingAdmissionPolicy (recommended) | Single-resource checks on create/update; most template-library templates | Built into Kubernetes, available in GKE 1.30 and later at no additional cost; supported by Cloud Customer Care |
| Pod Security Admission (recommended for Pod security bundles) | `pss-baseline-v2022`, `pss-restricted-v2022`, `psp-v2022` bundles | Built in and enabled by default in GKE at no cost; supported by Customer Care |
| Self-managed OPA Gatekeeper | Referential policies, Rego policies, audits of existing resources; CEL rules in ConstraintTemplates can generate ValidatingAdmissionPolicies | You install, upgrade, and operate it; Customer Care doesn't support it (community support on GitHub) |

### Migration path by constraint type

| Constraint type | Path |
|-----------------|------|
| Single-resource (no `data.inventory`, not in a Pod security bundle) | ValidatingAdmissionPolicy |
| Unenforced `dryrun` constraint you won't enforce | Delete it |
| `pss-baseline-v2022` / `pss-restricted-v2022` / `psp-v2022` bundle | Pod Security Admission (ValidatingAdmissionPolicy for uncovered controls) |
| Referential (reads `data.inventory`) | Self-managed Gatekeeper |
| Cloud Service Mesh / Istio / Google Cloud constraints | Review individually; referential `AsmAuthzPolicyDefaultDeny` and `AsmPeerAuthnMeshStrictMtls` need Gatekeeper; use Binary Authorization instead of `K8sRequireBinAuthZ`, and node pool image config instead of `K8sRequireCosNodeImage` |

### Constraint to ValidatingAdmissionPolicy field mapping

| Constraint field | VAP / VAP Binding field |
|------------------|-------------------------|
| `spec.enforcementAction` | `validationActions` in the binding (`deny` / `warn` / `dryrun` map to `["Deny"]` / `["Warn"]` / `["Audit"]`) |
| `spec.parameters` | `variables` in the policy, or a parameter resource via `paramRef` |
| `spec.match.kinds` | `matchConstraints.resourceRules` (API groups and resource names such as `pods`) |
| `spec.match.namespaces` / `excludedNamespaces` | `matchResources.namespaceSelector` with `In` / `NotIn` on `kubernetes.io/metadata.name` |
| `spec.match.labelSelector` | `matchResources.objectSelector` |
| `spec.match.namespaceSelector` | `matchResources.namespaceSelector` |
| `spec.match.scope` | `scope` of each resource rule |

### Gatekeeper Helm defaults that differ from Policy Controller

| Setting | Policy Controller default | Gatekeeper Helm default | Recommendation |
|---------|---------------------------|-------------------------|----------------|
| Mutation | Off unless turned on | On | Set `disableMutation: true` if unused. Autopilot: set `disableMutation: true` or `mutatingWebhookCustomRules` without wildcards or restricted resources, otherwise GKE rejects the installation |
| Exempt namespaces | `gatekeeper-system` and `exemptableNamespaces` | Namespace where Gatekeeper is installed | Add to `controllerManager.exemptNamespaces` |
| Referential data | Synced automatically for referential bundles | Not synced | Create a Gatekeeper Config or SyncSet listing the kinds read; until synced, conflict checks allow violating requests and existence checks deny all matching requests |
| VAP generation | Not available | On for templates containing CEL | To keep webhook enforcement set `defaultCreateVAPForTemplates: false` and `defaultCreateVAPBindingForConstraints: false` |
| Replicas and resources | One replica each, 1,024 MiB memory limit | Three webhook replicas, different limits | Size to current usage |
| Images | Google-managed registry | Docker Hub (`openpolicyagent/gatekeeper`, `openpolicyagent/gatekeeper-crds`, `curlimages/curl`) | For private clusters or Binary Authorization, mirror all three to Artifact Registry and override chart values; if `curl` isn't mirrored, disable the webhook probe Job |

## Notes

- Dates and versions: deprecated November 12, 2026; end of support December 31, 2027; GKE blocks upgrades to 1.39 and later for clusters with Policy Controller installed. Don't remove Policy Controller just to unblock the upgrade before migrating policies.
- By default the template library installs every template, and policy bundles install their constraints with `dryrun`, so installed templates don't necessarily match what you enforce.
- Back up first: removing Policy Controller deletes its CRDs and therefore every ConstraintTemplate, constraint, sync config, and mutator, including your own. This is destructive; try it on a disposable cluster first.
- Behavior differences: Policy Controller's webhook fails open, while a VAP with `failurePolicy: Fail` denies on expression errors or CEL cost-limit overruns (and on a missing param resource when `paramRef.parameterNotFoundAction` is `Deny`); CEL errors on missing fields, so use `has()`; VAPs don't exempt namespaces by default (on Standard clusters they apply to every namespace including `kube-system` unless excluded; on Autopilot GKE excludes managed namespaces and rejects VAPs matching `nodes`, `persistentVolumes`, `certificatesigningrequests`, or `tokenreviews`); include `pods/ephemeralcontainers`; VAPs don't audit existing resources and report only the first failure per request. For Pod-matching VAPs don't rely on warnings, since controllers receive them.
- Pod Security Admission doesn't cover every `psp-v2022` control (host paths, users, capabilities, sysctls allowlists) and can't exempt images (`exemptImages`); GKE doesn't support configuring PSA exemptions.
- Gatekeeper migration: don't install Gatekeeper on a cluster still running Policy Controller (same `gatekeeper-system` namespace, CRDs, and webhook names). Strip `status`, `resourceVersion`, `uid`, `creationTimestamp`, `generation`, `managedFields`, `ownerReferences`, the `kubectl.kubernetes.io/last-applied-configuration` annotation, the `app.kubernetes.io/managed-by: anthospolicycontroller.googleapis.com` label, and `policycontroller.`-prefixed labels/annotations from backups before reapplying. For ConfigManagement Operator backups also remove `configmanagement.gke.io/*` and `k8s-app: kubernetes-config-management` labels.
- MutatingAdmissionPolicy is available in GKE 1.36 and later. Mutating policies run before ValidatingAdmissionPolicies.
- CI pipelines: with Gatekeeper keep `gator` / `kpt` and update paths; with VAPs use `kubectl apply --dry-run=server` against a test cluster that has `Deny` bindings.
- Don't delete the fleet feature or unregister a cluster until uninstall finishes, and don't use `gcloud container fleet policycontroller detach` (it stops management but leaves Policy Controller running). Clusters registered with `--enable-fleet` are unregistered with `gcloud container clusters update` and `--clear-fleet-project`.
- Omitted to keep the page short: the optional backups of referential rules (`kubectl get config.config.gatekeeper.sh -n gatekeeper-system -o yaml`) and mutators (`kubectl get assign,assignmetadata,assignimage,modifyset -o yaml`), the optional removal of the fleet-level default configuration (`gcloud container fleet policycontroller enable --no-fleet-default-member-config`), and the section for clusters outside a fleet (clusters installed through the ConfigManagement Operator, or unregistered/detached before uninstall finished, must first be brought under fleet management with `gcloud container fleet policycontroller enable` and uninstalled; leftover `*.constraints.gatekeeper.sh` CRDs are then deleted with `kubectl get crd -o name | grep ... | xargs -r kubectl delete`, which is destructive). Read the source for those steps.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/deprecations/policy-controller (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [policy-controller-overview.md](./policy-controller-overview.md)
- [config-sync-overview.md](./config-sync-overview.md)
