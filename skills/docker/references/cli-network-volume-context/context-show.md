---
source: https://docs.docker.com/reference/cli/docker/context/show/
---

# docker context show

Print the name of the current context, possibly set by the `DOCKER_CONTEXT` environment variable or the `--context` global option.

## Signature / Usage

```console
$ docker context show
default
```

## Notes

- The output can drive a shell prompt. Bash example from the official page: declare a function in `~/.bashrc` and set it as `PROMPT_COMMAND`.

```console
function docker_context_prompt() {
        PS1="context: $(docker context show)> "
}

PROMPT_COMMAND=docker_context_prompt
```

## Related

- [docker context use](./context-use.md)
- [docker context ls](./context-ls.md)
