# Modules

ZMK leverages Zephyr modules to incorporate external source code or configuration into builds — similar to plugins or themes. Common uses include adding support for keyboards outside the main ZMK repo and adding custom drivers or behaviors.

## Signature / Usage

```yaml
# zmk-config/config/west.yml — adding an external module
manifest:
  remotes:
    - name: zmkfirmware
      url-base: https://github.com/zmkfirmware
    - name: my-module-owner
      url-base: https://github.com/my-module-owner
  projects:
    - name: zmk
      remote: zmkfirmware
      revision: main
      import: app/west.yml
    - name: my-zmk-module
      remote: my-module-owner
      revision: main
  self:
    path: config
```

## Notes

- A typical ZMK build involves three components: the user ZMK config, ZMK modules, and the core ZMK firmware.
- For GitHub Actions builds, edit `west.yml` to add remotes and project entries; use the `import` property for modules that have their own dependencies.
- For local builds, clone the module into your local file tree and pass it as an external module during `west build`.
- Unreleased features from open pull requests can be tested by pointing `west.yml` to the developer's fork and branch instead of the official repository.

## Related

- [development/module-creation](../development/module-creation.md)
- [Zephyr West Manifests](https://docs.zephyrproject.org/4.1.0/develop/west/manifest.html)
