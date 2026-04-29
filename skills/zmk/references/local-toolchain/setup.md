# Local Toolchain Setup Overview

Overview page for setting up the ZMK local development environment. Two approaches are available: container-based (Docker/Podman) and native (OS-direct).

## Setup Options

| Approach | Description |
|----------|-------------|
| Container | Uses the same Docker image as GitHub Actions; no local dependencies needed |
| Native | Runs directly on the OS; typically faster than container |

## Notes

- Read through the setup process before following it step by step to ensure you are comfortable with required dependencies
- The container approach provides development/production parity with the GitHub Actions CI environment
- The native approach is better if you already have Zephyr dependencies installed

## Related

- [Container Setup](./setup-container.md)
- [Native Setup](./setup-native.md)
- [Build and Flash](./build-flash.md)
