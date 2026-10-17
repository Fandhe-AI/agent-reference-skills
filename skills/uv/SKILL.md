---
name: uv
description: >
  uv (Astral 製 高速 Python パッケージ / プロジェクトマネージャー) のリファレンス。
  pyproject.toml, uv.lock, uv init / add / sync / run / lock, uv pip, uv venv, uvx / uv tool,
  uv python install / pin, PEP 723, tool.uv.sources, uv build / publish, uv_build, uv.toml, uv auth。
user-invocable: false
---

# uv

> 分割 PR の途中段階。現在収録済み: references/{build-publish, configuration, getting-started, indexes-auth, integrations, pip-interface, project-commands, projects, python, resolution}。冒頭説明・description に挙げた残りの範囲は後続 PR で追加し、最終 PR でこの行を削除する。

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
    projects/
      README.md
      build-editable-virtual-dependencies.md
      build-isolation.md
      build.md
      config.md
      conflicts-environments.md
      dependencies.md
      dependency-groups.md
      dependency-sources.md
      export.md
      init.md
      layout.md
      lock-sync.md
      optional-dependencies.md
      run.md
      scripts.md
      workspace-metadata.md
      workspaces.md
    project-commands/
      README.md
      uv.md
      uv-add.md
      uv-audit.md
      uv-check.md
      uv-export.md
      uv-format.md
      uv-init.md
      uv-lock.md
      uv-remove.md
      uv-run.md
      uv-sync.md
      uv-tree.md
      uv-version.md
      uv-workspace.md
    python/
      README.md
      installing-python.md
      managed-distributions.md
      python-discovery.md
      python-preferences.md
      python-support-policy.md
      python-variants.md
      python-versions.md
      uv-python-dir.md
      uv-python-find.md
      uv-python-install.md
      uv-python-list.md
      uv-python-pin.md
      uv-python-uninstall.md
      uv-python-update-shell.md
      uv-python-upgrade.md
    pip-interface/
      README.md
      compatibility-options.md
      compatibility-resolution.md
      declaring-dependencies.md
      environments.md
      inspection.md
      locking-environments.md
      packages.md
      pip-interface.md
      uv-pip-check.md
      uv-pip-compile.md
      uv-pip-freeze.md
      uv-pip-install.md
      uv-pip-list.md
      uv-pip-show.md
      uv-pip-sync.md
      uv-pip-tree.md
      uv-pip-uninstall.md
      uv-venv.md
    build-publish/
      README.md
      build-backend-file-inclusion.md
      build-backend-modules.md
      build-backend-settings.md
      build-backend.md
      build-failures.md
      uv-build.md
      uv-publish.md
    resolution/
      README.md
      conflicting-dependencies.md
      constraints-overrides-exclusions.md
      dependency-metadata.md
      multi-version-resolution.md
      platform-markers.md
      prereleases.md
      reproducible-resolutions.md
      resolution-environments.md
      resolution-overview.md
      resolution-strategy.md
      resolver-internals.md
      sdist-lockfile-versioning.md
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
    integrations/
      README.md
      alternative-registries.md
      aws-lambda.md
      bazel.md
      dependency-bots.md
      docker.md
      github-actions.md
      gitlab-ci.md
      jupyter.md
      pre-commit.md
      pytorch.md
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
| プロジェクト作成、依存関係、dependency groups、workspace、lock / sync、PEP 723 スクリプトを扱いたい | projects | [references/projects/README.md](references/projects/README.md) |
| `uv add` / `uv run` / `uv sync` / `uv lock` / `uv export` 等のコマンドオプションを調べたい | project-commands | [references/project-commands/README.md](references/project-commands/README.md) |
| Python のインストール・探索・pin・アップグレード、free-threaded 版を扱いたい | python | [references/python/README.md](references/python/README.md) |
| `uv pip` / `uv venv` で pip・pip-tools 互換のワークフローを使いたい | pip-interface | [references/pip-interface/README.md](references/pip-interface/README.md) |
| `uv build` / `uv publish` / `uv_build` バックエンドでパッケージを配布したい | build-publish | [references/build-publish/README.md](references/build-publish/README.md) |
| resolution 戦略、constraints / overrides、platform markers、exclude-newer を調整したい | resolution | [references/resolution/README.md](references/resolution/README.md) |
| 外部 index・レジストリ認証・証明書・`uv auth` を設定したい | indexes-auth | [references/indexes-auth/README.md](references/indexes-auth/README.md) |
| `uv.toml` / `[tool.uv]` 設定、`UV_*` 環境変数、キャッシュ、preview features、`uv self` を調べたい | configuration | [references/configuration/README.md](references/configuration/README.md) |
| Docker / GitHub Actions / GitLab CI / pre-commit / PyTorch / Jupyter / AWS Lambda と組み合わせたい | integrations | [references/integrations/README.md](references/integrations/README.md) |
