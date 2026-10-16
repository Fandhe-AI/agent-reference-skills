# Local Toolchain

| Name | Description | Path |
|------|-------------|------|
| Build and Flash | Compile ZMK firmware and flash it to a keyboard. Run `west build` from the `app/` subdirectory of the ZMK repository. | [build-flash.md](./build-flash.md) |
| Container Setup | Set up a containerized ZMK development environment using Docker, Dev Container CLI, or Podman. No native toolchain installation required. | [setup-container.md](./setup-container.md) |
| IDE Integration | Configure VS Code for code completion, go-to-definition, and syntax highlighting by generating a CMake compilation database. | [ide-integration.md](./ide-integration.md) |
| Local Toolchain Setup Overview | Overview page for setting up the ZMK local development environment. Two approaches: container-based (Docker/Podman) and native (OS-direct). | [setup.md](./setup.md) |
| Native POSIX Board Target | Use the `native_sim` board target to build and run ZMK firmware directly on your workstation with simulated key events. | [posix-board.md](./posix-board.md) |
| Native Setup | Set up a native local development environment for ZMK by installing Zephyr dependencies, cloning the repository, and configuring a Python virtual environment. | [setup-native.md](./setup-native.md) |
| Pre-commit | ZMK uses pre-commit to enforce consistent formatting and catch common errors. Hooks run automatically on pull requests. | [pre-commit.md](./pre-commit.md) |
| Tests | Run the ZMK automated test suite using the native POSIX board target. Tests must be executed from the `/zmk/app` directory. | [tests.md](./tests.md) |
