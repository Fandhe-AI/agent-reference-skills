# config

| Name | Description | Path |
|------|-------------|------|
| Config Overview | The heart of Ergogen is a single config file (YAML, JSON, or JavaScript). It is divided into six top-level sections that each handle a distinct phase of keyboard generation. Only `points` is required; all other sections are optional. | [overview.md](./overview.md) |
| Preprocessing | Ergogen runs four sequential preprocessing steps on config files before interpreting them: unnesting, inheritance, parameterization, and skipping. String values that look like math expressions are also automatically evaluated. | [preprocessing.md](./preprocessing.md) |
