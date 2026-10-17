---
name: uv
description: >
  uv (Astral 製 高速 Python パッケージ / プロジェクトマネージャー) のリファレンス。
  pyproject.toml, uv.lock, uv init / add / sync / run / lock, uv pip, uv venv, uvx / uv tool,
  uv python install / pin, PEP 723, tool.uv.sources, uv build / publish, uv_build,
  uv.toml, UV_* 環境変数, uv auth, Docker / GitHub Actions / PyTorch 連携。
user-invocable: false
---

# uv

uv (Astral 製 高速 Python パッケージ / プロジェクトマネージャー) のリファレンススキル。

## 対象バージョン

uv 0.13.1 (GitHub tag `0.13.1` = commit `62faed3351cfee2121b3c28b937b1f4b93233a93`, released 2026-10-14; main は使用禁止)。
生成ページ（reference/cli・reference/settings・reference/environment・concepts の preview 一覧）はリポジトリに未コミットのため、docs.astral.sh の Markdown twin（`<path>/index.md`）から 2026-10-16 に取得。live の installation ページが install.sh 0.13.1 を配布しており、live サイトと tag の一致を確認済み。

## ディレクトリ構成

```text
skills/uv/
  SKILL.md
  references/
    getting-started/
      README.md
      breaking-changes-0-13.md
      features.md
      first-steps.md
      getting-help.md
      installation.md
      installer-options.md
      platform-support.md
      reproducible-examples.md
      versioning-policy.md
    build-publish/
      README.md
      build-backend-file-inclusion.md
      build-backend-modules.md
      build-backend-settings.md
      build-backend.md
      build-failures.md
      uv-build.md
      uv-publish.md
    indexes-auth/
      README.md
      auth-cli.md
      authentication.md
      certificates.md
      flat-indexes.md
      git-credentials.md
      http-credentials.md
      index-authentication.md
      indexes.md
      third-party-services.md
      uv-auth-dir.md
      uv-auth-login.md
      uv-auth-logout.md
      uv-auth-token.md
    configuration/
      README.md
      cache.md
      configuration-files.md
      environment-variables-external.md
      environment-variables-uv-a-m.md
      environment-variables-uv-n-z.md
      preview-features.md
      settings-build-install.md
      settings-index-network.md
      settings-pip-a-l.md
      settings-pip-m-z.md
      settings-project-metadata.md
      settings-python-misc.md
      settings-resolver.md
      storage.md
      uv-cache.md
      uv-self.md
      uv-shell-completion-help.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する。

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| uv のインストール・初回起動・バージョニング・0.13 の破壊的変更を知りたい | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| `uv build` / `uv publish` / `uv_build` バックエンドでパッケージを配布したい | build-publish | [references/build-publish/README.md](references/build-publish/README.md) |
| 外部 index・レジストリ認証・証明書・`uv auth` を設定したい | indexes-auth | [references/indexes-auth/README.md](references/indexes-auth/README.md) |
| `uv.toml` / `[tool.uv]` 設定、`UV_*` 環境変数、キャッシュ、preview features、`uv self` を調べたい | configuration | [references/configuration/README.md](references/configuration/README.md) |
