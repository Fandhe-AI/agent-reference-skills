# CircleCI

**重要: CircleCI は TTY を使用するため、`TURBO_UI: "false"` が全 run ステップで必須。**

## .circleci/config.yml 設定例（pnpm）

```yaml
version: 2.1
orbs:
  node: circleci/node@5.0.2
workflows:
  test:
    jobs:
      - test
jobs:
  test:
    docker:
      - image: cimg/node:lts
    steps:
      - checkout
      - node/install-packages
      - run:
          command: npm i -g pnpm
          environment:
            TURBO_UI: "false"
      - run:
          command: pnpm build
          environment:
            TURBO_UI: "false"
      - run:
          command: pnpm test
          environment:
            TURBO_UI: "false"
```

## Remote Cache 設定

CircleCI プロジェクト設定の「環境変数」タブで `TURBO_TOKEN` と `TURBO_TEAM` を登録。環境変数は自動でロードされるため CI ファイルの変更は不要。
