# Native Setup

Set up a native local development environment for ZMK by installing Zephyr dependencies, cloning the repository, and configuring a Python virtual environment.

## Signature / Usage

### 1. Install Zephyr dependencies

Follow the [Zephyr Getting Started Guide](https://docs.zephyrproject.org/4.1.0/develop/getting_started/index.html) for your OS (Ubuntu, Windows, or macOS).

### 2. Clone the ZMK repository

```bash
git clone https://github.com/zmkfirmware/zmk.git
cd zmk
```

### 3. Set up Python virtual environment and install dependencies

**Ubuntu / macOS:**
```bash
python3 -m venv .venv
source .venv/bin/activate
pip install west
west init -l app
west update
west zephyr-export
west packages pip --install
```

**Windows (Command Prompt):**
```bat
python -m venv .venv
.venv\Scripts\activate.bat
pip install west
west init -l app
west update
west zephyr-export
west packages pip --install
```

### 4. Install the Zephyr SDK

Complete the "Install Zephyr SDK" section from the Zephyr Getting Started Guide.

## Notes

- Activate the virtual environment (`source .venv/bin/activate`) before each work session
- Avoid CMake v4; install the latest CMake v3 release — some optional Zephyr modules (e.g., `libmetal`) are not compatible with CMake v4
- **Windows:** `dfu-util` has no maintained Chocolatey package; use the version bundled with QMK Toolbox to flash DFU devices
- **Raspberry Pi OS:** Install `gcc-arm-none-eabi` and set `ZEPHYR_TOOLCHAIN_VARIANT=cross-compile` in `~/.zephyrrc`

## Related

- [Setup Overview](./setup.md)
- [Container Setup](./setup-container.md)
- [Build and Flash](./build-flash.md)
