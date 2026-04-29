# Preprocessing

Ergogen runs four sequential preprocessing steps on config files before interpreting them: unnesting, inheritance, parameterization, and skipping. String values that look like math expressions are also automatically evaluated.

## Signature / Usage

```yaml
# 1. Unnesting — dot-notation keys are expanded
nested.key.definition: value
# → { nested: { key: { definition: value } } }

# 2. Inheritance — $extends copies fields from another declaration
parent:
  a: 1
  b: 2
child:
  $extends: parent
  c: 3
# child → { a: 1, b: 2, c: 3 }

# 3. Parameterization — regex-based placeholder replacement
template:
  value: placeholder
  double_value: placeholder * 2
  $params: [placeholder]
  $args: [3]
# placeholder → 3, double_value → 6

# 4. Skipping — exclude intermediate declarations from output
abstract_base:
  a: p1
  b: p2
  $params: [p1, p2]
concrete:
  $extends: abstract_base
  $args: [10, 20]
  $skip: true   # not emitted as a real section
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `$extends` | string | Dot-notation path to the parent declaration to inherit from |
| `$unset` | sentinel | When used as a value, explicitly removes the inherited field |
| `$params` | array | List of placeholder names for parameterized declarations |
| `$args` | array | Argument values substituted for the corresponding `$params` placeholders |
| `$skip` | boolean | When `true`, excludes the declaration from further processing/output |

## Notes

- Unnesting happens first; any object key containing a `.` is expanded into nested objects.
- Inheritance rules: undefined fields take the parent value; defined fields override; type mismatches favor the new value; arrays and objects merge recursively.
- `$extends` value must be the full absolute dot-notation path of the target declaration.
- Parameterization uses regex replacement, so placeholder names should be unique strings to avoid unintended substitutions.
- `$skip: true` is most useful for abstract intermediate declarations that are only meant to be inherited, not used directly.
- String values that are valid mathematical expressions (e.g., `3 * 2`) are automatically evaluated to their numeric result.
- Unit variables defined in the `units` section are available as named variables inside math expressions throughout the config.

## Related

- [Config Overview](./overview.md)
