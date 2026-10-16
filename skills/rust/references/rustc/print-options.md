# Print Options

`rustc --print` prints various information about the compiler. Multiple options can be specified, and the information is printed in the order given.

## Signature / Usage

```bash
rustc --print KIND[=PATH] a.rs
```

```bash
$ rustc --print crate-name --crate-name my_crate a.rs
my_crate
```

## Options / Props

| KIND | Description |
|------|-------------|
| `crate-name` | The name of the crate. Generally from the `#![crate_name = "..."]` attribute, the `--crate-name` flag, or the filename. |
| `file-names` | The names of the files created by the `link` emit kind. |
| `sysroot` | Absolute path to the sysroot. |
| `target-libdir` | Path to the target libdir. |
| `host-tuple` | The target-tuple string of the host compiler (unaffected by `--target`). |
| `cfg` | List of cfg values (see conditional compilation in the Rust Reference). |
| `target-list` | List of known targets. May be selected with `--target`. |
| `target-cpus` | List of available CPU values for the current target. Selectable with `-C target-cpu=val`. |
| `target-features` | List of available target features for the current target. Enabled with the **unsafe** `-C target-feature=val` flag. |
| `relocation-models` | List of relocation models. Selectable with `-C relocation-model=val`. |
| `code-models` | List of code models. Selectable with `-C code-model=val`. |
| `tls-models` | List of Thread Local Storage models. Selectable with `-Z tls-model=val`. |
| `native-static-libs` | For `staticlib` crate type: prints a note with the linker flags to use when linking the static library. |
| `link-args` | Prints the full linker invocation in human-readable form while linking. |
| `deployment-target` | The currently selected deployment target (minimum OS version) for the selected Apple platform target. |

## Notes

- Source: https://doc.rust-lang.org/rustc/command-line-arguments/print-options.html (pinned: https://raw.githubusercontent.com/rust-lang/rust/1.99.1/src/doc/rustc/src/command-line-arguments/print-options.md)
- Specifying an option will usually disable the `--emit` step and only print the requested information.
- A filepath may optionally be given per kind as `--print KIND=PATH`, just like `--emit`; the information is then written there instead of stdout.
- `native-static-libs`: if it is the only flag, a full compilation is performed; the note starts with `native-static-libs:` to make it easy to extract.
- `link-args` does not disable the `--emit` step. The exact format of the output is not a stable guarantee, other than that it includes the linker executable and the text of each argument passed to it.
- `deployment-target` returns rustc's minimum supported deployment target if no `*_DEPLOYMENT_TARGET` variable is present in the environment, otherwise the variable's parsed value.
- `target-features`: see the known issues page for targets for more details.

## Related

- [command-line-arguments.md](./command-line-arguments.md)
- [codegen-options.md](./codegen-options.md)
- [targets.md](./targets.md)
