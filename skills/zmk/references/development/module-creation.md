# Module Creation

ZMK modules are the recommended way to extend ZMK firmware with new keyboards, behaviors, drivers, or features without modifying the ZMK core repository.

## Signature / Usage

**`zephyr/module.yml` — minimum required file:**

```yaml
name: <your-module-name>
```

**`west.yml` — dependency manifest:**

```yaml
manifest:
  remotes:
    - name: remote-name
      url-base: https://github.com/remote-name
  projects:
    - name: repository-name
      remote: remote-name
      import: west.yml
```

## Options / Props

**Module naming convention:** `zmk-<type>-<description>`

| Type | Description |
|------|-------------|
| `keyboard` | Board or shield definitions |
| `component` | Component definitions |
| `behavior` | A single custom behavior |
| `driver` | A single custom driver |
| `feature` | Other firmware features |
| `vfx` | Visual effects |

**`zephyr/module.yml` build properties:**

| Property | Description |
|----------|-------------|
| `depends` | Other modules this module depends on |
| `cmake` | CMake configuration options |
| `kconfig` | Kconfig file paths |
| `settings.board_root` | Path to board definitions |
| `settings.dts_root` | Path to devicetree source files |
| `settings.snippet_root` | Path to build snippets |

## Notes

- Start from the official [ZMK Module Template](https://github.com/zmkfirmware/zmk-module-template) repository.
- The module `name` in `zephyr/module.yml` may differ from the GitHub repository name.
- Place public header files under `include/zmk_<type>_<description>/` so paths are unambiguous.
- Every module must include a `README.md` and a `LICENSE` file.

## Related

- [new-behavior](./new-behavior.md)
- [events](./events.md)
- [ZMK Module Template](https://github.com/zmkfirmware/zmk-module-template)
- [Zephyr Module Documentation](https://docs.zephyrproject.org/4.1.0/develop/modules.html)
