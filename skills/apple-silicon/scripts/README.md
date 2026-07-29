# scripts

| Name | Description | Path |
| --- | --- | --- |
| toolchain-setup | Downloading and verifying the Metal Toolchain component required by Xcode 26 command-line builds. | [toolchain-setup.md](./toolchain-setup.md) |
| metal-compile | Compiling `.metal` source files to intermediate representation, archiving, and linking into a `.metallib`. | [metal-compile.md](./metal-compile.md) |
| metal-symbols | Recording source information while compiling a Metal library and extracting it into a separate `.metallibsym` symbol file. | [metal-symbols.md](./metal-symbols.md) |
| metal-binary-archives | Extracting per-architecture executables from a multi-architecture Metal binary archive and repacking them by vendor. | [metal-binary-archives.md](./metal-binary-archives.md) |
| metal-dynamic-libraries | Compiling a Metal dynamic library and linking a shader library against it. | [metal-dynamic-libraries.md](./metal-dynamic-libraries.md) |
| metal-debug-env | Enabling Metal API Validation and Shader Validation via environment variables for development-time GPU error checking. | [metal-debug-env.md](./metal-debug-env.md) |
| metal-performance-hud | Enabling the in-app Metal Performance HUD overlay via environment variables to inspect frame rate, GPU time, and shader compilation activity. | [metal-performance-hud.md](./metal-performance-hud.md) |
| mlx-install | Installing MLX from PyPI or building it from source (Python and C++ APIs) on Apple Silicon. | [mlx-install.md](./mlx-install.md) |
| mlx-distributed | Launching an MLX Python script across multiple processes and hosts with `mlx.launch`. | [mlx-distributed.md](./mlx-distributed.md) |
