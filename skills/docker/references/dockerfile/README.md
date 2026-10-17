# dockerfile

| Name | Description | Path |
|------|-------------|------|
| ADD | Copies new files or directories from `<src>` (build context, remote URL, or Git… | [add.md](./add.md) |
| ARG (predefined / automatic platform / BuildKit built-in args) | Defines a build-time variable that users can pass to the builder with `docker bu… | [arg.md](./arg.md) |
| Build check rules | BuildKit has built-in support for analyzing your build configuration against pre… | [build-check-rules.md](./build-check-rules.md) |
| Checking your build configuration | Build checks (introduced in Dockerfile 1.8) validate your build configuration and… | [build-checks.md](./build-checks.md) |
| CMD | Sets the command to be executed when running a container from an image. | [cmd.md](./cmd.md) |
| COPY | Copies new files or directories from `<src>` (build context, build stage, named c… | [copy.md](./copy.md) |
| ENTRYPOINT | Configures a container that runs as an executable. | [entrypoint.md](./entrypoint.md) |
| ENV | Sets environment variables for all subsequent instructions in the build stage and… | [env.md](./env.md) |
| Environment replacement | Environment variables (declared with `ENV`) can be used in certain instructions a… | [environment-replacement.md](./environment-replacement.md) |
| EXPOSE | Informs Docker that the container listens on the specified network ports at runti… | [expose.md](./expose.md) |
| FROM | Initializes a new build stage and sets the base image for subsequent instructions. | [from.md](./from.md) |
| HEALTHCHECK | Tells Docker how to test a container to check that it's still working (e.g. dete… | [healthcheck.md](./healthcheck.md) |
| Here-Documents | Here-documents redirect subsequent Dockerfile lines to the input of `RUN` or `COP… | [here-documents.md](./here-documents.md) |
| LABEL (incl. MAINTAINER deprecated) | Adds metadata to an image as key-value pairs. | [label.md](./label.md) |
| ONBUILD | Adds to the image a trigger instruction to be executed when the image is used as … | [onbuild.md](./onbuild.md) |
| Dockerfile overview and format | A Dockerfile is a text document that contains all the commands a user could call … | [overview-format.md](./overview-format.md) |
| Parser directives (syntax / escape / check) | Parser directives are optional special comments of the form `# directive=value` th… | [parser-directives.md](./parser-directives.md) |
| RUN --mount | Creates filesystem mounts that the build can access: bind mounts to the host file… | [run-mount.md](./run-mount.md) |
| RUN --network / RUN --security | Per-instruction control of the networking environment (`--network`) and the secur… | [run-network-security.md](./run-network-security.md) |
| RUN (incl. RUN --device) | Executes commands to create a new layer on top of the current image. The added la… | [run.md](./run.md) |
| Shell and exec form | `RUN`, `CMD`, and `ENTRYPOINT` each accept two forms: exec form (JSON array, no s… | [shell-and-exec-form.md](./shell-and-exec-form.md) |
| SHELL | Overrides the default shell used for the shell form of commands. | [shell.md](./shell.md) |
| STOPSIGNAL | Sets the system call signal that will be sent to the container to exit. | [stopsignal.md](./stopsignal.md) |
| USER | Sets the user name (or UID) and optionally the user group (or GID) used as the def… | [user.md](./user.md) |
| VOLUME | Creates a mount point with the specified name and marks it as holding externally … | [volume.md](./volume.md) |
| WORKDIR | Sets the working directory for any `RUN`, `CMD`, `ENTRYPOINT`, `COPY` and `ADD` in… | [workdir.md](./workdir.md) |
