# dockerfile

| Name | Description | Path |
|------|-------------|------|
| ADD | Copies new files or directories from `<src>` (build context, remote URL, or Git repository) and adds them to the image filesystem at `<dest>`. | [add.md](./add.md) |
| ARG (predefined / automatic platform / BuildKit built-in args) | Defines a build-time variable that users can pass to the builder with `docker build --build-arg <varname>=<value>`. | [arg.md](./arg.md) |
| Build check rules | BuildKit has built-in support for analyzing your build configuration against pre-defined rules that enforce Dockerfile and build best practices. | [build-check-rules.md](./build-check-rules.md) |
| Checking your build configuration | Build checks (introduced in Dockerfile 1.8) validate your build configuration and run a series of checks before executing the build; an advanced form of linting for your Dockerfile and build options, or a dry-run mode for builds. | [build-checks.md](./build-checks.md) |
| CMD | Sets the command to be executed when running a container from an image. | [cmd.md](./cmd.md) |
| COPY | Copies new files or directories from `<src>` (build context, build stage, named context, or an image) and adds them to the image filesystem at `<dest>`. | [copy.md](./copy.md) |
| ENTRYPOINT | Configures a container that runs as an executable. | [entrypoint.md](./entrypoint.md) |
| ENV | Sets environment variables for all subsequent instructions in the build stage and for containers run from the image. | [env.md](./env.md) |
| Environment replacement | Environment variables (declared with `ENV`) can be used in certain instructions as variables interpreted by the Dockerfile. | [environment-replacement.md](./environment-replacement.md) |
| EXPOSE | Informs Docker that the container listens on the specified network ports at runtime. | [expose.md](./expose.md) |
| FROM | Initializes a new build stage and sets the base image for subsequent instructions. | [from.md](./from.md) |
| HEALTHCHECK | Tells Docker how to test a container to check that it's still working (e.g. detects a web server stuck in an infinite loop). | [healthcheck.md](./healthcheck.md) |
| Here-Documents | Here-documents redirect subsequent Dockerfile lines to the input of `RUN` or `COPY` commands. | [here-documents.md](./here-documents.md) |
| LABEL (incl. MAINTAINER deprecated) | Adds metadata to an image as key-value pairs. | [label.md](./label.md) |
| ONBUILD | Adds to the image a trigger instruction to be executed when the image is used as the base for another build. | [onbuild.md](./onbuild.md) |
| Dockerfile overview and format | A Dockerfile is a text document that contains all the commands a user could call on the command line to assemble an image. | [overview-format.md](./overview-format.md) |
| Parser directives (syntax / escape / check) | Parser directives are optional special comments of the form `# directive=value` that affect how subsequent Dockerfile lines are handled. | [parser-directives.md](./parser-directives.md) |
| RUN --mount | Creates filesystem mounts that the build can access: bind mounts to the host filesystem or other build stages, build secrets or ssh-agent sockets, and persistent package-manager caches. | [run-mount.md](./run-mount.md) |
| RUN --network / RUN --security | Per-instruction control of the networking environment (`--network`) and the security mode (`--security`) of a `RUN` command. | [run-network-security.md](./run-network-security.md) |
| RUN (incl. RUN --device) | Executes commands to create a new layer on top of the current image. | [run.md](./run.md) |
| Shell and exec form | `RUN`, `CMD`, and `ENTRYPOINT` each accept two forms: exec form (JSON array, no shell) and shell form (plain string, uses a command shell). | [shell-and-exec-form.md](./shell-and-exec-form.md) |
| SHELL | Overrides the default shell used for the shell form of commands. | [shell.md](./shell.md) |
| STOPSIGNAL | Sets the system call signal that will be sent to the container to exit. | [stopsignal.md](./stopsignal.md) |
| USER | Sets the user name (or UID) and optionally the user group (or GID) used as the default user and group for the remainder of the current stage. | [user.md](./user.md) |
| VOLUME | Creates a mount point with the specified name and marks it as holding externally mounted volumes from the native host or other containers. | [volume.md](./volume.md) |
| WORKDIR | Sets the working directory for any `RUN`, `CMD`, `ENTRYPOINT`, `COPY` and `ADD` instructions that follow it. | [workdir.md](./workdir.md) |
