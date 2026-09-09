---
source: https://raw.githubusercontent.com/Fandhe-AI/vector-db/7022d112e79760dca916480599553fcac256b5fb/compose.yaml
---

# Docker development container

`compose.yaml` の開発コンテナを使い、環境非依存でビルド・検証する。

## Usage

```bash
make docker-build   # docker compose build
make docker-shell    # docker compose run --rm dev（シェルに入る）
make docker-ci       # docker compose run --rm dev make ci
```

```yaml
services:
  dev:
    build:
      context: .
      args:
        UID: ${HOST_UID:-1000}
    volumes:
      - .:/work
      - cargo-registry:/usr/local/cargo/registry
      - target-cache:/work/target
    working_dir: /work
    command: bash
    stdin_open: true
    tty: true

volumes:
  cargo-registry:
  target-cache:
```

## Notes

- Linux ホストでは `HOST_UID=$(id -u) docker compose build` で所有権を合わせる（`UID` は Bash の読み取り専用変数のため `HOST_UID` という別名を使う）
- `cargo-registry` / `target-cache` は named volume でキャッシュされ、再ビルドを高速化する

## Related

- `samples/start-wire-server.md`
