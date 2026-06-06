# Generate

GitHub CLI 拡張機能のスキャフォールドと Git タグ生成コマンド。

## CLI 拡張機能のスキャフォールド（インタプリタ型・Bash）

```sh
gh extension create EXTENSION-NAME
```

`gh-EXTENSION-NAME/` ディレクトリと実行可能な Bash スクリプトが生成される。リポジトリ名は `gh-` で始める必要がある。

## CLI 拡張機能のスキャフォールド（プリコンパイル型・Go）

```sh
gh extension create --precompiled=go EXTENSION-NAME
```

`main.go`, `go.mod`, `go.sum`, および自動リリースワークフロー (`.github/workflows/release.yml`) が生成される。

## CLI 拡張機能のスキャフォールド（プリコンパイル型・その他言語）

```sh
gh extension create --precompiled=other EXTENSION-NAME
```

`script/build.sh` を実装して自動コンパイルを設定する必要がある。

## Git 軽量タグの作成

```sh
git tag v1.0.0
```

## Git 注釈付きタグの作成（推奨）

```sh
git tag -a v1.0.0 -m "Version 1.0.0"
```

## 特定コミットへのタグ付け

```sh
git tag -a v1.0.0 COMMIT_SHA -m "Version 1.0.0"
```

## タグのリモートへの push

```sh
git push origin v1.0.0
```

## すべてのタグを push

```sh
git push origin --tags
```
