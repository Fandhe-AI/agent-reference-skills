# Generate

`turbo gen` / `turbo generate` によるコード生成コマンド。

## 新規ワークスペースの追加

```sh
turbo gen workspace
turbo generate workspace
```

インタラクティブプロンプトで名前・種別・配置先を設定する。

## ワークスペース作成のオプション

```sh
turbo gen workspace [options]
```

| オプション | 説明 |
|---|---|
| `--name <name>` | ワークスペースの名前（package.json の name フィールド） |
| `--empty` | 空のワークスペースを作成（デフォルト: `true`） |
| `--copy <name/url>` | 既存ワークスペースまたは GitHub URL からコピー |
| `--destination <path>` | 作成先のパス |
| `--type <app\|package>` | ワークスペースの種別 |
| `--root <path>` | リポジトリルートのパス |
| `--show-all-dependencies` | ワークスペース種別によるフィルタリングを無効化 |
| `--example-path <path>`, `-p` | GitHub URL でブランチ名とパスを分離する |

## 既存ワークスペースからのコピー

```sh
turbo gen workspace --copy
```

## リモートリポジトリからのコピー

```sh
turbo gen workspace --copy https://github.com/<owner>/<repo>
```

## カスタムジェネレーターの実行

```sh
turbo gen run [generator-name]
turbo gen [generator-name]
```

`turbo/generators/config.js`（または `config.ts`）に定義したジェネレーターを実行する。

## カスタムジェネレーターのオプション

```sh
turbo gen run [generator-name] [options]
```

| オプション | 説明 |
|---|---|
| `--args <answers...>` | ジェネレーターのプロンプトに直接渡す回答 |
| `--config <path>` | ジェネレーター設定ファイルのパス（デフォルト: `turbo/generators/config.js`） |
| `--root <path>` | リポジトリルートのパス |

## プロンプトへの回答を直接渡す例

```sh
turbo gen run my-generator --args answer1 answer2
```
