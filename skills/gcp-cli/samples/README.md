# samples

| Name | Description | Path |
| --- | --- | --- |
| Switch Between Projects with Named Configurations | Create one named configuration per project, then switch with `activate`, `--configuration`, or `CLOUDSDK_ACTIVE_CONFIG_NAME`. | [named-configurations-multi-project.md](./named-configurations-multi-project.md) |
| Run gcloud Non-Interactively in CI and Scripts | Disable prompts, set the project through the environment, authorize with a credential file, and parse output with `--format=value(...)`. | [non-interactive-ci-scripting.md](./non-interactive-ci-scripting.md) |
| Format Output with --format and Projections | Choose `table`, `csv`, `value`, `json`, or `yaml` output and pick columns with projections and transforms. | [format-and-projections.md](./format-and-projections.md) |
| Filter and Flatten List Output | Select resources with `--filter` expressions and expand nested lists such as IAM bindings with `--flatten`. | [filter-and-flatten.md](./filter-and-flatten.md) |
| Elevate Temporarily with --impersonate-service-account | Run one gcloud command as a service account without a key file, then make impersonation the default or remove it. | [impersonate-service-account-flag.md](./impersonate-service-account-flag.md) |
| Start a Local Emulator and Export Its Environment | Start a local Spanner, Firestore, Pub/Sub, or Datastore emulator and print the commands that export its environment variables. | [local-emulators-env-init.md](./local-emulators-env-init.md) |
| Persist gcloud Preferences and Tools in Cloud Shell | Keep gcloud properties across tabs with `.bashrc` or `CLOUDSDK_CONFIG`, and install packages at boot with `.customize_environment`. | [cloud-shell-persistent-setup.md](./cloud-shell-persistent-setup.md) |
| Preview a Web App with Cloud Shell Web Preview | Run an HTTP server on the Cloud Shell VM on a port between 2000 and 65000 and open it through Web Preview. | [cloud-shell-web-preview.md](./cloud-shell-web-preview.md) |
| Publish an Open in Cloud Shell Link with a Tutorial | Write a Cloud Shell tutorial in Markdown and add an Open in Cloud Shell button that clones the repository and starts it. | [open-in-cloud-shell-tutorial.md](./open-in-cloud-shell-tutorial.md) |
| Use gcloud Behind a Corporate Proxy | Point gcloud at an HTTP proxy with `proxy/*` properties, keep proxy credentials in environment variables, and trust a custom CA. | [behind-corporate-proxy.md](./behind-corporate-proxy.md) |
| Build Your Own gcloud Docker Image | Extend the official gcloud CLI image with extra tools such as `make` or Java 21 in a Dockerfile. | [extend-gcloud-docker-image.md](./extend-gcloud-docker-image.md) |
