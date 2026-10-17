---
source: https://docs.docker.com/reference/dockerfile/#run
---

# RUN (incl. RUN --device)

Executes commands to create a new layer on top of the current image. The added layer is used in the next step of the Dockerfile.

## Signature / Usage

```dockerfile
# Shell form:
RUN [OPTIONS] <command> ...
# Exec form:
RUN [OPTIONS] [ "<command>", ... ]
```

```dockerfile
RUN <<EOF
apt-get update
apt-get install -y curl
EOF
```

## Options / Props

| Option | Minimum Dockerfile version |
| --- | --- |
| `--device` | 1.27 |
| `--mount` | 1.2 |
| `--network` | 1.3 |
| `--security` | 1.20 |

## Notes

- The shell form is most commonly used and lets you break up longer instructions with newline escapes or heredocs.
- Cache: the cache for `RUN` isn't invalidated automatically during the next build (e.g. `RUN apt-get dist-upgrade -y` is reused). Invalidate it with `docker build --no-cache`. The cache can also be invalidated by `ADD` and `COPY` instructions.

### RUN --device

```dockerfile
RUN --device=name,[required]
```

Requests CDI devices to be available to the build step. Needs BuildKit 0.20.0 or later.

- The use of `--device` is protected by the `device` entitlement: enable it when starting buildkitd with `--allow-insecure-entitlement device` (or in buildkitd config), and for the build request with the `--allow device` flag.
- The device `name` is provided by the CDI specification registered in BuildKit. Annotations are supported by the CDI specification since 0.6.0. Setting the `org.mobyproject.buildkit.device.autoallow` annotation (on the spec or on a specific device) automatically allows registered devices.

Example CDI specification with multiple devices for the `vendor1.com/device` vendor:

```yaml
cdiVersion: "0.6.0"
kind: "vendor1.com/device"
devices:
  - name: foo
    containerEdits:
      env:
        - FOO=injected
  - name: bar
    annotations:
      org.mobyproject.buildkit.device.class: class1
    containerEdits:
      env:
        - BAR=injected
annotations:
  org.mobyproject.buildkit.device.autoallow: true
```

Accepted device name patterns:

| Pattern | Requests |
| --- | --- |
| `vendor1.com/device` | The first device found for this vendor. |
| `vendor1.com/device=foo` | A specific device. |
| `vendor1.com/device=*` | All devices for this vendor. |
| `class1` | Devices by `org.mobyproject.buildkit.device.class` annotation. |

Example (`llama.cpp` inference using an NVIDIA GPU through CDI):

```dockerfile
# syntax=docker/dockerfile:1

FROM scratch AS model
ADD https://huggingface.co/bartowski/Llama-3.2-1B-Instruct-GGUF/resolve/main/Llama-3.2-1B-Instruct-Q4_K_M.gguf /model.gguf

FROM scratch AS prompt
COPY <<EOF prompt.txt
Q: Generate  a list of 10 unique biggest countries by population in JSON with their estimated poulation in 1900 and 2024. Answer only newline formatted JSON with keys "country", "population_1900", "population_2024" with 10 items.
A:
[
    {

EOF

FROM ghcr.io/ggml-org/llama.cpp:full-cuda-b5124
RUN --device=nvidia.com/gpu=all \
    --mount=from=model,target=/models \
    --mount=from=prompt,target=/tmp \
    ./llama-cli -m /models/model.gguf -no-cnv -ngl 99 -f /tmp/prompt.txt
```

## Related

- [run-mount.md](./run-mount.md)
- [run-network-security.md](./run-network-security.md)
- [shell-and-exec-form.md](./shell-and-exec-form.md)
- [here-documents.md](./here-documents.md)
