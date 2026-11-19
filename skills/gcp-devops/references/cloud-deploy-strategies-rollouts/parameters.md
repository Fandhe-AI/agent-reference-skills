---
source: https://docs.cloud.google.com/deploy/docs/parameters
---

# Cloud Deploy deploy parameters

Deploy parameters pass values for a release to the manifest or manifests after they are rendered, as the final step of the Cloud Deploy render operation. You add placeholders (with defaults) to your manifest and set the values in the delivery pipeline stage, in the target, or at release creation. Typical use: different values per target in a parallel deployment.

## Signature / Usage

### Placeholder syntax

For releases not using the Helm renderer with Skaffold:

```text
[PROPERTY]: [DEFAULT_VALUE] # from-param: ${VAR_NAME}
```

The default value is required but can be an empty string (`""`). You can use several parameters in one line and as part of a longer string. `${artifactRegion}` would probably come from the target or pipeline stage and `${imageSha}` from the command line:

```yaml
image: my-image # from-param: ${artifactRegion}-docker.pkg.dev/my-project/my-repo/my-image@sha256:${imageSha}
```

### Add a parameter to the pipeline stage

Manifest with a placeholder:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
 name: nginx-deployment
 labels:
   app: nginx
spec:
 replicas: 1 # from-param: ${deploy_replicas}
 selector:
   matchLabels:
     app: nginx
 template:
   metadata:
     labels:
       app: nginx
   spec:
     containers:
     - name: nginx
       image: nginx:1.14.2
       ports:
       - containerPort: 80
```

Pipeline stage whose target is a multi-target with two child targets (a fragment of a `DeliveryPipeline` resource):

```yaml
serialPipeline:
 stages:
   - targetId: dev
     profiles: []
   - targetId: prod  # multi-target
     profiles: []
     deployParameters:
       - values:
           deploy_replicas: 1
           log_level: "NOTICE"
         matchTargetLabels: # optional, applies to all resources if unspecified; AND'd
           my-app: "post-render-config-1"
       - values:
           deploy_replicas: 2
           log_level: "WARNING"
         matchTargetLabels: # optional, applies to all resources if unspecified; AND'd
           my-app: "post-render-config-2"
```

### Add a parameter to the target configuration

Manifest with placeholders (defaults `example1` and `example2`):

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
 name: nginx-deployment
 labels:
   app: nginx
spec:
 selector:
   matchLabels:
     app: nginx
 template:
   metadata:
     labels:
       app: nginx
   spec:
     containers:
     - name: nginx
       image: nginx:1.14.2
       env:
       - name: envvar1
         value: example1 # from-param: ${application_env1}
       - name: envvar2
         value: example2 # from-param: ${application_env2}
```

Two targets, each with a `deployParameters` stanza and a label to match the pipeline stage's `matchTargetLabels`.

Adapted (not in the official docs): the second document's `kind: target` is written `kind: Target`, as in the first document and in the config files schema page, and each target gets a `gke.cluster` runtime (placeholders `PROJECT_ID`, `LOCATION`, `CLUSTER_1`, `CLUSTER_2`); the source shows only the parameter-related fields, and a target needs one runtime (`gke`, `run`, `anthosCluster`, `customTarget` or `multiTarget`).

```yaml
apiVersion: deploy.cloud.google.com/v1beta1
kind: Target
metadata:
  name: prod1
  labels:
    my-app: "post-render-config-1"
description: development cluster
gke:
  cluster: projects/PROJECT_ID/locations/LOCATION/clusters/CLUSTER_1
deployParameters:
  application_env1: "newValue1"
---

apiVersion: deploy.cloud.google.com/v1beta1
kind: Target
metadata:
  name: prod2
  labels:
    my-app: "post-render-config-2"
description: development cluster
gke:
  cluster: projects/PROJECT_ID/locations/LOCATION/clusters/CLUSTER_2
deployParameters:
  application_env1: "newValue2"
```

### Pass a parameter at release creation

The manifest uses `commit: defaultShaValue # from-param: ${git-sha}` as an annotation; pass the value with `--deploy-parameters`, a comma-separated list of key-value pairs where the key is the placeholder name:

```bash
gcloud deploy releases create test-release-001 \
--project=my-example-project \
--region=us-central1 \
--delivery-pipeline=my-params-demo-app-1 \
--images=my-app-image=gcr.io/google-containers/nginx@sha256:f49a843c290594dcf4d193535d1f4ba8af7d56cea2cf79d1e9554f077f1e7aaa \
--deploy-parameters="git-sha=f787cac"
```

### Parameters for Helm chart values

If you render a Helm chart, the deploy parameter names must match the Helm configuration values you want to set (for example `webserver.port`). All deploy parameters are passed to Helm as `--set` arguments at render time, with no change to `skaffold.yaml`. If you also author the templates, use the standard Helm syntax in the template (this is a Helm template, not plain YAML).

Adapted (not in the official docs): the environment variable value is rendered with `| quote`, because a Kubernetes `EnvVar.value` must be a string; `containerPort` stays a number.

```text
apiVersion: apps/v1
kind: Deployment
metadata:
  name: webserver
spec:
  replicas: 3
  selector:
    matchLabels:
      app: webserver
  template:
    metadata:
      labels:
        app: webserver
    spec:
      containers:
      - name: webserver
        image: gcr.io/example/webserver:latest
        ports:
        - containerPort: {{ .Values.webserver.port }} # replaced by deploy parameter `webserver.port`.
          name: web
        env:
        - name: WEBSERVER_PORT
          value: {{ .Values.webserver.port | quote }} # replaced by deploy parameter `webserver.port`.
```

### Use in custom targets

A deploy parameter whose name starts with `customTarget/` (for example `customTarget/vertexAIModel`) is referenced as an environment variable with this syntax:

```text
CLOUD_DEPLOY_customTarget_[VAR_NAME]
```

`customTarget/vertexAIModel` is referenced as `CLOUD_DEPLOY_customTarget_vertexAIModel`.

## Options / Props

### Ways to pass values

| Method | Where | Applies to |
|---|---|---|
| Manifest template (not a deploy parameter) | Rendering phase | Specific release; specific target |
| On command line | `--deploy-parameters` on `gcloud deploy releases create`, post-rendering | Specific release; all targets |
| On delivery pipeline | `deployParameters` on a stage, post-rendering | All releases; specific targets (by label; a multi-target stage value applies to all child targets) |
| On target | `deployParameters` on the target, post-rendering | All releases; that target |

### Limitations

| Limit | Value |
|---|---|
| Parameters per type (pipeline stage / target / command line) | Maximum 50 |
| Parameters a child target can inherit from its parent multi-target | Up to 50, to a maximum of 200 parameters on the targets, including those set on the pipeline stage |
| Key name | Maximum 63 characters, regular expression `^[a-zA-Z0-9]([-A-Za-z0-9_.]{0,61}[a-zA-Z0-9])?$` |
| Key name exception | As an environment variable in a custom target, use a slash between `customTarget` and the variable name (`customTarget/VAR_NAME`) |
| Reserved prefix | `CLOUD_DEPLOY_` cannot be used for a key name |
| Duplicates | Two keys of the same name cannot be applied to the same target |
| Value | Can be empty; maximum 512 characters |
| Helm | Placeholders cannot be used for Helm configuration values; they must be passed by the Helm convention above |

## Notes

- Adapted from the official docs: the source's target example has no runtime; `gke.cluster` (format from the config files schema page) is added so each document is a valid target. The source's Helm template renders `value: {{ .Values.webserver.port }}`, which becomes a number such as `8080`; Kubernetes rejects a non-string `env[].value`, so the template uses `{{ .Values.webserver.port | quote }}`.
- If a deploy parameter key is assigned more than one value, the release fails (the `gcloud deploy releases create` command fails with an error). Using several methods together is fine as long as a given key has the same value everywhere.
- If you include `matchTargetLabels`, the target must carry all of those labels. Omitting it applies the values to all child targets in the stage, and setting two values for the same parameter fails the release.
- If you use deploy parameters to distinguish among child targets, configure them on those child targets, not on the multi-target. If you provide no value on the target, the manifest default is used.
- Deploy parameters can also be used as environment variables in deploy hooks and in deployment verification.
- Release parameters are shown in the **Artifacts** tab of the **Release details** page and by `gcloud deploy releases describe`.
- The source release example passes a `gcr.io/google-containers/nginx@sha256:...` image; it is illustrative only. For your own images use an Artifact Registry path such as `LOCATION-docker.pkg.dev/PROJECT/REPO/IMAGE`.
- Parameter values are stored with the release and shown in the console and in `describe` output; do not put secrets in them.
- Corrected from the official docs: the target example's second document has `kind: target` (lower case); it is `kind: Target` here, as in the first document. The source's target example uses `apiVersion: deploy.cloud.google.com/v1beta1` (kept as written), while the config files schema page uses `deploy.cloud.google.com/v1`.
- The Helm template block uses the `text` tag because `{{ ... }}` is a Helm template, not plain YAML. The source also shows Console steps for viewing parameters.
- Source: https://docs.cloud.google.com/deploy/docs/parameters (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [canary.md](./canary.md)
- [manage-rollout.md](./manage-rollout.md)
