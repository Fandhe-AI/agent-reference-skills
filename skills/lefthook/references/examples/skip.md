# Skip or Run on Condition（条件付きスキップ・実行）

Source: https://lefthook.dev/examples/skip

フックやコマンドを特定の条件に基づいてスキップまたは実行する方法を説明します。

## 設定例

```yaml
pre-commit:
  only:
    - ref: dev/*
  commands:
    lint:
      run: yarn lint {staged_files} --fix
      glob: "*.{ts,js}"
    test:
      run: yarn test

pre-push:
  commands:
    test:
      run: yarn test
      skip:
        - run: test "$NO_TEST" -eq 1
    lint:
      run: yarn lint
      only:
        - ref: main
```

## 各設定の説明

### pre-commit フック

- **`only: ref: dev/*`** - `dev/` プレフィックスで始まるブランチでコミットする場合にのみ実行される
- `lint` と `test` の両コマンドは、このブランチ条件を満たす場合にのみ実行される

### pre-push フック

#### test コマンド

- **`skip: run: test "$NO_TEST" -eq 1`** - 環境変数 `NO_TEST` が `1` に設定されている場合にスキップされる
- `NO_TEST=1 git push` のように使用することで、テストをスキップしてプッシュできる

#### lint コマンド

- **`only: ref: main`** - `main` ブランチにプッシュする場合にのみ実行される

## 主なポイント

- **`only`** - 条件を満たす場合にのみ実行する（ホワイトリスト方式）
- **`skip`** - 条件を満たす場合にスキップする（ブラックリスト方式）
- **`ref`** - ブランチ名によるフィルタリング（glob パターン対応）
- **`run`** - シェルコマンドの終了コードによる条件判定（0 で true）
