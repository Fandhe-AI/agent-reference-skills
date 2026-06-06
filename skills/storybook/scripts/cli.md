# CLI

Storybook CLI の主要コマンド一覧。

## 開発サーバーの起動

```sh
storybook dev
```

## ポートを指定して起動

```sh
storybook dev --port 6006
```

## ホストを指定して起動

```sh
storybook dev --host 0.0.0.0
```

## CI モードで起動（プロンプトなし・ブラウザ非起動）

```sh
storybook dev --ci
```

## ドキュメントモードで起動

```sh
storybook dev --docs
```

## HTTPS で起動

```sh
storybook dev --https --ssl-cert ./cert.pem --ssl-key ./key.pem
```

## スモークテスト（起動確認後に終了）

```sh
storybook dev --smoke-test
```

## テレメトリを無効化して起動

```sh
storybook dev --disable-telemetry
```

## 環境情報の表示

```sh
storybook info
```

OS、Node.js、npm、インストール済み Storybook パッケージのバージョンを出力する。

## ヘルスチェックの実行

```sh
storybook doctor
```

プロジェクト内の一般的な問題を検出して修正提案を出力する。

## AI プロンプトの生成

```sh
storybook ai setup
```

React + Vite 構成のみ対応。AI エージェント向けのプロジェクト設定プロンプトを生成する。

## ストーリーインデックスのビルド

```sh
storybook index
```

## ストーリーインデックスをファイルに出力

```sh
storybook index --output-file ./storybook-index.json
```

## ヘルプの表示

```sh
storybook --help
```
