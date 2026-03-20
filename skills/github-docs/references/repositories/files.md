# ファイル操作 (Working with Files)

GitHub リポジトリ内のファイルの作成、編集、削除、およびサイズ制限に関するリファレンスです。

## Web UI でのファイル操作

### ファイルの作成

1. リポジトリのメインページで **Add file** > **Create new file** をクリック
2. ファイル名を入力（`/` を含めるとディレクトリも同時に作成可能）
3. ファイルの内容を入力
4. コミットメッセージを入力
5. ブランチを選択（新しいブランチを作成して PR にすることも可能）
6. **Commit changes** をクリック

### ファイルの編集

1. リポジトリ内でファイルに移動
2. 鉛筆アイコン（Edit this file）をクリック
3. 編集を行い、プレビューで確認
4. コミットメッセージを入力して **Commit changes** をクリック

### ファイルの削除

1. リポジトリ内でファイルに移動
2. ファイル右上のゴミ箱アイコンをクリック
3. コミットメッセージを入力して **Commit changes** をクリック

### ファイルのアップロード

1. リポジトリのメインページで **Add file** > **Upload files** をクリック
2. ファイルをドラッグ＆ドロップまたは選択
3. コミットメッセージを入力して **Commit changes** をクリック

## ファイルのナビゲーション

### ファイル検索

- リポジトリページで **`t`** キーを押すとファイルファインダーが起動
- パスやファイル名の一部を入力してフィルタリング

### コード検索

- リポジトリページで **`/`** キーを押すと検索バーにフォーカス
- `repo:OWNER/REPO` を含むクエリでリポジトリ内を検索

### ファイル内検索

- ファイル表示中に **`l`** キーを押すと行番号ジャンプが可能

### パーマリンク

- ファイル表示中に **`y`** キーを押すと、現在のコミット SHA に基づくパーマリンク URL に変換される

## ファイルサイズ制限

| 制限 | サイズ | 説明 |
|------|--------|------|
| 警告 | 50 MB | プッシュ時に警告が表示される |
| ブロック | 100 MB | プッシュがブロックされる |
| Web UI アップロード | 25 MB | ブラウザからのアップロード上限 |
| リポジトリ推奨サイズ | 1 GB 未満 | パフォーマンスの観点から推奨 |
| リポジトリ最大サイズ | 5 GB | ハード制限 |

## Git LFS (Large File Storage)

100 MB を超えるファイルを管理する必要がある場合は、Git LFS を使用します。

### Git LFS のセットアップ

```bash
# Git LFS のインストール
# macOS
brew install git-lfs

# Ubuntu/Debian
sudo apt install git-lfs

# Git LFS の初期化（アカウントごとに1回）
git lfs install
```

### ファイルの追跡

```bash
# 特定の拡張子を LFS で追跡
git lfs track "*.psd"
git lfs track "*.zip"
git lfs track "*.mp4"

# 追跡設定の確認
git lfs track

# .gitattributes をコミット
git add .gitattributes
git commit -m "Track large files with Git LFS"
```

### Git LFS の制限

| プラン | ストレージ | 帯域幅（月間） |
|--------|-----------|---------------|
| Free | 1 GB | 1 GB |
| Pro | 1 GB | 1 GB |
| Team | 1 GB | 1 GB |
| Enterprise | 1 GB | 1 GB |

> 追加のストレージと帯域幅はデータパック（50 GB ストレージ + 50 GB 帯域幅）として購入可能です。

### Git LFS の操作

```bash
# LFS で管理されているファイルの一覧
git lfs ls-files

# LFS オブジェクトのプル
git lfs pull

# LFS の使用状況を確認
git lfs env
```

## 特殊なファイル

GitHub が自動的に認識・処理する特殊なファイル:

| ファイル | 場所 | 説明 |
|---------|------|------|
| `README.md` | ルート、任意のディレクトリ | ディレクトリの説明を表示 |
| `LICENSE` / `LICENSE.md` | ルート | リポジトリのライセンスを表示 |
| `.gitignore` | ルート、任意のディレクトリ | Git の追跡から除外するファイルパターン |
| `.gitattributes` | ルート | Git の属性設定（LFS、改行コード等） |
| `CODEOWNERS` | `.github/`、ルート、`docs/` | コードオーナーの定義 |
| `FUNDING.yml` | `.github/` | スポンサーボタンの設定 |
| `SECURITY.md` | `.github/`、ルート、`docs/` | セキュリティポリシー |
| `CONTRIBUTING.md` | `.github/`、ルート、`docs/` | コントリビューションガイドライン |
| `CODE_OF_CONDUCT.md` | `.github/`、ルート、`docs/` | 行動規範 |

## 参考リンク

- [Managing files in a repository - GitHub Docs](https://docs.github.com/en/repositories/working-with-files/managing-files)
- [About Git Large File Storage - GitHub Docs](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-git-large-file-storage)
