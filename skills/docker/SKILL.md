---
name: docker
description: >
  Docker (Docker Engine / Dockerfile / Compose / Buildx) の Dockerfile 命令, docker CLI,
  compose.yaml (Compose Specification), BuildKit, Bake (HCL), マルチステージ, マルチプラットフォーム,
  ビルドキャッシュ, SBOM / provenance, dockerd, daemon.json, logging driver, rootless, seccomp。
user-invocable: false
---

# Docker

> 分割 PR の途中段階。現在収録済み: references/{build, build-cache-bake}。description に挙げた残りのカテゴリは後続 PR で追加し、最終 PR でこの行を削除する。

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
    build/
      README.md
      build-overview.md / build-context.md / multi-stage.md / multi-platform.md / secrets.md / drivers.md ...
    build-cache-bake/
      README.md
      cache.md / cache-backends.md / cache-backend-gha.md / bake.md / bake-targets.md / bake-variables.md ...
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/<category>/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| ビルドコンテキスト・マルチステージ・マルチプラットフォームを設定したい | build | [references/build/README.md](references/build/README.md) |
| builder / driver / exporter / BuildKit 設定 (buildkitd.toml) を知りたい | build | [references/build/README.md](references/build/README.md) |
| SBOM・provenance などの attestations、ビルドシークレットを扱いたい | build | [references/build/README.md](references/build/README.md) |
| ビルドキャッシュの最適化・キャッシュバックエンド (registry / gha / s3 / local) を選びたい | build-cache-bake | [references/build-cache-bake/README.md](references/build-cache-bake/README.md) |
| Bake ファイル (HCL / targets / variables / matrix / inheritance) を書きたい | build-cache-bake | [references/build-cache-bake/README.md](references/build-cache-bake/README.md) |
