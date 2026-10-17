---
source: https://docs.docker.com/compose/how-tos/project-name/
---

# Specify a project name

Override the Compose project name to isolate copies of the same stack (feature branches, CI builds, shared hosts).

Precedence order, highest to lowest:

```text
1. The `-p` command line flag.
2. The COMPOSE_PROJECT_NAME environment variable.
3. The top-level `name:` attribute in your Compose file. Or the last `name:` if you specify multiple Compose files in the command line with the `-f` flag.
4. The base name of the project directory containing your Compose file. Or the base name of the first Compose file if you specify multiple Compose files in the command line with the `-f` flag.
5. The base name of the current directory if no Compose file is specified.
```

## Notes

- The source page has no code listing; the block above restates its precedence list.
- Names may contain only lowercase letters, digits, dashes, and underscores, and must start with a lowercase letter or digit; if the directory name violates this, use another method.
- Use cases: multiple copies of one environment per feature branch, a unique build number as the name on a CI server, avoiding clashes between projects with the same service names.
- `--project-directory` changes the project directory (default: the Compose file's base directory).
