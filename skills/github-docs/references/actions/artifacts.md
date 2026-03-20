# GitHub Actions -- アーティファクト

ワークフロー内でのデータ保存・共有のリファレンス。

公式ドキュメント: https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/storing-and-sharing-data-from-a-workflow

---

## 概要

アーティファクトを使用して、ビルド出力やテスト結果をワークフロー実行内のジョブ間で共有したり、ワークフロー完了後にダウンロード可能にしたりする。

---

## アーティファクトのアップロード

`actions/upload-artifact` アクションを使用する。

### 基本的な使用方法

```yaml
steps:
  - run: npm run build

  - uses: actions/upload-artifact@v4
    with:
      name: build-output
      path: dist/
```

### 全パラメータ

| パラメータ | 必須 | 説明 |
|---|---|---|
| `name` | いいえ | アーティファクト名。デフォルト: `artifact` |
| `path` | はい | アップロードするファイル/ディレクトリのパス |
| `retention-days` | いいえ | 保持日数。リポジトリ/Organization の設定上限を超えられない |
| `if-no-files-found` | いいえ | ファイルが見つからない場合の動作: `warn`（デフォルト）, `error`, `ignore` |
| `compression-level` | いいえ | 圧縮レベル: `0`（無圧縮）~ `9`（最大圧縮）。デフォルト: `6` |
| `overwrite` | いいえ | 同名のアーティファクトを上書きするか。デフォルト: `false` |
| `include-hidden-files` | いいえ | 隠しファイルを含めるか。デフォルト: `false` |

### 複数ファイル/ディレクトリ

```yaml
- uses: actions/upload-artifact@v4
  with:
    name: test-results
    path: |
      coverage/
      test-reports/
      !test-reports/**/*.tmp
```

除外パターンは `!` プレフィックスで指定する。

### 保持期間の指定

```yaml
- uses: actions/upload-artifact@v4
  with:
    name: logs
    path: logs/
    retention-days: 5
```

---

## アーティファクトのダウンロード

`actions/download-artifact` アクションを使用する。

### 特定のアーティファクト

```yaml
steps:
  - uses: actions/download-artifact@v4
    with:
      name: build-output

  - run: ls build-output/
```

### 全アーティファクトの一括ダウンロード

`name` を省略すると全アーティファクトがダウンロードされる。各アーティファクトは個別のディレクトリに展開される。

```yaml
steps:
  - uses: actions/download-artifact@v4
    # name を省略 -> 全アーティファクトをダウンロード

  - run: ls -R
```

### ダウンロード先の指定

```yaml
- uses: actions/download-artifact@v4
  with:
    name: build-output
    path: ./downloaded-artifacts
```

---

## ジョブ間のデータ共有

アーティファクトを使って複数ジョブ間でデータを受け渡す。

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm run build

      - uses: actions/upload-artifact@v4
        with:
          name: build-output
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v4
        with:
          name: build-output
          path: dist/

      - run: ./deploy.sh dist/
```

- `needs` でジョブの依存関係を定義し、実行順序を保証する
- 依存ジョブはアーティファクトのアップロード完了を自動的に待機する

---

## アーティファクトの整合性検証

`upload-artifact` アクションは `digest` という SHA256 ハッシュ値の出力を返す。ダウンロード時に自動的にチェックサムが検証され、不一致の場合は警告が表示される。

```yaml
- uses: actions/upload-artifact@v4
  id: upload
  with:
    name: my-artifact
    path: output/

- run: echo "Digest is ${{ steps.upload.outputs.digest }}"
```

---

## ワークフロー間でのアーティファクト共有

別のワークフロー実行のアーティファクトをダウンロードするには、`run-id` パラメータとトークン認証が必要。

```yaml
- uses: actions/download-artifact@v4
  with:
    name: build-output
    github-token: ${{ secrets.GITHUB_TOKEN }}
    run-id: ${{ github.event.workflow_run.id }}
```

---

## 保持期間

- デフォルトの保持期間はリポジトリ/Organization の設定に依存（通常 90 日間）
- `retention-days` パラメータでアーティファクト単位に設定可能
- リポジトリ/Organization の設定上限を超える保持期間は設定できない
- 期間経過後、アーティファクトは自動的にスケジュール削除される

---

## サイズ制限

| 項目 | 制限 |
|---|---|
| 個別アーティファクトの最大サイズ | プランにより異なる |
| ジョブあたりの出力の最大サイズ | 1 MB |
| ワークフローあたりの出力の合計最大サイズ | 50 MB |

---

## v4 での重要な変更点

`actions/upload-artifact@v4` および `actions/download-artifact@v4` での主な変更:

- アーティファクトはイミュータブル（不変）: 同名のアーティファクトを再アップロードするとエラーになる（`overwrite: true` を明示的に設定しない限り）
- 各アーティファクトには一意の名前が必要
- パフォーマンスの大幅な改善

---

## ベストプラクティス

1. **アーティファクト名を明確にする**: デフォルトの `artifact` ではなく、わかりやすい名前を付ける
2. **保持期間を適切に設定**: 不要に長い保持期間はストレージを消費する
3. **不要なファイルを除外**: 除外パターンでテンポラリファイル等を除く
4. **ジョブ間共有の代わりにキャッシュを検討**: 依存関係のような再利用可能なデータにはキャッシュの方が効率的
5. **機密情報を含めない**: アーティファクトはワークフロー参加者がダウンロード可能
