# Stage fixed files（修正ファイルの自動ステージング）

Source: https://lefthook.dev/examples/stage_fixed

リンターがファイルを自動修正した場合、修正されたファイルを自動的にステージングしてコミットに含める方法を説明します。

## 概要

リンターが変更を修正することがあり、通常はそれらを自動的にコミットに含めたいケースがあります。`stage_fixed` 設定オプションを使うことで、修正されたファイルの自動ステージングを有効にできます。

## 設定例

```yaml
# lefthook.yml

pre-commit:
  commands:
    lint:
      run: yarn lint {staged_files} --fix
      stage_fixed: true
```

## 主なポイント

- `stage_fixed: true` を指定すると、コマンド実行後に修正されたファイルが自動的に `git add` される
- この機能は `pre-commit` フックのコンテキストでのみ動作する
- リンターの `--fix` オプションと組み合わせて使用するのが一般的なパターン
