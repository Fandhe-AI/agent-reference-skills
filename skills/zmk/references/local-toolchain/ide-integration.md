# IDE Integration

Configure VS Code for code completion, go-to-definition, and syntax highlighting by generating a CMake compilation database.

## Signature / Usage

### Step 1: Enable compilation database generation

```bash
west config build.cmake-args -- -DCMAKE_EXPORT_COMPILE_COMMANDS=ON
```

If you also need additional CMake arguments (e.g., a custom zmk-config path), combine them in one quoted string:

```bash
west config build.cmake-args -- "-DCMAKE_EXPORT_COMPILE_COMMANDS=ON -DZMK_CONFIG=/path/to/zmk-config/config"
```

Then run a build once to generate `app/build/compile_commands.json`.

### Step 2: Find the compiler path

```bash
cmake -P zephyr/cmake/verify-toolchain.cmake
```

Combine the printed `ZEPHYR_SDK_INSTALL_DIR` with `/arm-zephyr-eabi/bin/arm-zephyr-eabi-gcc`.

### Step 3: Configure VS Code C/C++ extension

1. Install the **C/C++** extension
2. Open **F1 > C/C++: Edit Configurations (UI)**
3. Set:
   - **Compiler path:** path found in Step 2
   - **IntelliSense mode:** `linux-gcc-arm`, `windows-gcc-arm`, or `macos-gcc-arm`
   - **Compile commands:** `${workspaceFolder}/app/build/compile_commands.json`

## Notes

- A full `west build` must complete at least once after enabling `CMAKE_EXPORT_COMPILE_COMMANDS` before IntelliSense works
- Multiple CMake arguments must be passed as a single quoted string to `west config`

## Related

- [Build and Flash](./build-flash.md)
- [Pre-commit](./pre-commit.md)
- [Tests](./tests.md)
