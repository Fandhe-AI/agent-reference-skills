---
name: docker
description: >
  Docker (Docker Engine / Dockerfile / Compose / Buildx) の Dockerfile 命令, docker CLI,
  compose.yaml (Compose Specification), BuildKit, Bake (HCL), マルチステージ, マルチプラットフォーム, ビルドキャッシュ,
  SBOM / provenance, dockerd, daemon.json, logging driver, rootless, seccomp。
user-invocable: false
---

# Docker

> 分割 PR の途中段階。現在収録済み: references/{build, build-cache-bake, cli-buildx, cli-container, cli-image-system, cli-network-volume-context, compose-cli, compose-file, dockerfile, engine-containers-security, engine-daemon-logging}。冒頭説明・description に挙げた残りの範囲は後続 PR で追加し、最終 PR でこの行を削除する。

Docker Engine / Dockerfile / Docker Compose / Buildx (BuildKit) の公式ドキュメントを蒸留したリファレンス。

## 対象バージョン

- 出典は docs.docker.com の Markdown twin（`<path>.md`）。取得日 2026-10-16 JST
- 原本 `docker/docs` の `main` は `31d174d090fd7111ca2199ed54a3978e0d4ac74d`（2026-10-16T14:31:22Z）。`docker/docs` には現行版のリリースタグが無いため SHA で pin
- 同 SHA の `go.mod` / `_vendor/modules.txt` に書かれた vendoring 版を正とする: CLI v29.8.2 / Engine API v1.56.1 / BuildKit v0.34.0 / Buildx v0.38.0 / Compose v5.6.0
- CLI v29.9.1 はリリース済みだが docs にはまだ反映されていない
- `hugo.yaml` の `buildkit_version` 0.32.0 は例示用の値であり、版の根拠にしない

## ディレクトリ構成

```text
skills/docker/
  SKILL.md
  references/
    dockerfile/
      README.md
      from.md / run.md / run-mount.md / copy.md / add.md / cmd.md / entrypoint.md / env.md ...
    build/
      README.md
      build-overview.md / build-context.md / multi-stage.md / multi-platform.md / secrets.md / drivers.md ...
    build-cache-bake/
      README.md
      cache.md / cache-backends.md / cache-backend-gha.md / bake.md / bake-targets.md / bake-variables.md ...
    cli-buildx/
      README.md
      buildx-build.md / buildx-bake.md / buildx-create.md / buildx-imagetools-create.md ...
    cli-container/
      README.md
      container-run.md / container-exec.md / container-logs.md / container-ls.md ...
    cli-image-system/
      README.md
      docker.md / image-pull.md / image-push.md / login.md / system-prune.md ...
    cli-network-volume-context/
      README.md
      network-create.md / volume-create.md / context-create.md ...
    compose-file/
      README.md
      overview.md / services-image-command.md / services-lifecycle.md / networks.md / volumes.md / profiles.md ...
    compose-cli/
      README.md
      compose-up.md / compose-down.md / compose-build.md / compose-watch.md / envvars.md ...
    engine-daemon-logging/
      README.md
      dockerd.md / daemon-overview.md / logging-configure.md / log-driver-json-file.md / live-restore.md ...
    engine-containers-security/
      README.md
      running-containers.md / resource-constraints.md / gpu.md / rootless.md / seccomp.md / security-overview.md ...
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/<category>/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| Dockerfile 命令 (FROM / RUN / COPY / ENTRYPOINT / HEALTHCHECK) の構文を知りたい | dockerfile | [references/dockerfile/README.md](references/dockerfile/README.md) |
| parser directive・here-document・build check rules を知りたい | dockerfile | [references/dockerfile/README.md](references/dockerfile/README.md) |
| ビルドコンテキスト・マルチステージ・マルチプラットフォームを設定したい | build | [references/build/README.md](references/build/README.md) |
| builder / driver / exporter / BuildKit 設定 (buildkitd.toml) を知りたい | build | [references/build/README.md](references/build/README.md) |
| SBOM・provenance などの attestations、ビルドシークレットを扱いたい | build | [references/build/README.md](references/build/README.md) |
| ビルドキャッシュの最適化・キャッシュバックエンド (registry / gha / s3 / local) を選びたい | build-cache-bake | [references/build-cache-bake/README.md](references/build-cache-bake/README.md) |
| Bake ファイル (HCL / targets / variables / matrix / inheritance) を書きたい | build-cache-bake | [references/build-cache-bake/README.md](references/build-cache-bake/README.md) |
| docker buildx サブコマンドのオプションを知りたい | cli-buildx | [references/cli-buildx/README.md](references/cli-buildx/README.md) |
| buildx imagetools・build history を使いたい | cli-buildx | [references/cli-buildx/README.md](references/cli-buildx/README.md) |
| docker container run / exec / logs / cp などのオプションを知りたい | cli-container | [references/cli-container/README.md](references/cli-container/README.md) |
| docker image / login / search / system prune / docker init を使いたい | cli-image-system | [references/cli-image-system/README.md](references/cli-image-system/README.md) |
| docker network / volume / context コマンドを使いたい | cli-network-volume-context | [references/cli-network-volume-context/README.md](references/cli-network-volume-context/README.md) |
| Compose ファイルの services / networks / volumes / secrets / profiles を書きたい | compose-file | [references/compose-file/README.md](references/compose-file/README.md) |
| Compose の include / merge / extends / interpolation / models を使いたい | compose-file | [references/compose-file/README.md](references/compose-file/README.md) |
| docker compose up / down / run / watch などのオプションを知りたい | compose-cli | [references/compose-cli/README.md](references/compose-cli/README.md) |
| COMPOSE_* 環境変数と優先順位を知りたい | compose-cli | [references/compose-cli/README.md](references/compose-cli/README.md) |
| dockerd と daemon.json、proxy、live restore、リモートアクセスを設定したい | engine-daemon-logging | [references/engine-daemon-logging/README.md](references/engine-daemon-logging/README.md) |
| logging driver (json-file / local / syslog / fluentd / awslogs) を設定したい | engine-daemon-logging | [references/engine-daemon-logging/README.md](references/engine-daemon-logging/README.md) |
| リソース制限・restart policy・GPU・ランタイムメトリクスを設定したい | engine-containers-security | [references/engine-containers-security/README.md](references/engine-containers-security/README.md) |
| rootless・seccomp・AppArmor・userns-remap・デーモンソケット保護を知りたい | engine-containers-security | [references/engine-containers-security/README.md](references/engine-containers-security/README.md) |
| CLI の --filter / --format / completion / OpenTelemetry を使いたい | engine-containers-security | [references/engine-containers-security/README.md](references/engine-containers-security/README.md) |
