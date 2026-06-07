# Addon Lifecycle

Blender 4.2+ の Extension システムおよびアドオンのビルド・インストール・管理コマンド集。

## Extension ビルド（Blender 4.2+）

```sh
# カレントディレクトリの blender_manifest.toml を元にパッケージをビルド
blender --command extension build

# ソースディレクトリを指定してビルド
blender --command extension build --source-dir /path/to/my_extension

# 出力ディレクトリを指定してビルド
blender --command extension build --output-dir /tmp/dist

# 出力ファイルパスを直接指定（.zip 拡張子が必要）
blender --command extension build --output-filepath /tmp/my_extension-1.0.0.zip

# プラットフォームごとに分割したパッケージをビルド
blender --command extension build --split-platforms

# 詳細出力でビルド
blender --command extension build --verbose
```

`blender_manifest.toml` が存在するディレクトリで実行する。出力ファイル名のデフォルトは `{id}-{version}.zip`。

## Extension 検証

```sh
# カレントディレクトリのパッケージメタデータを検証
blender --command extension validate

# ビルド済み .zip ファイルを直接検証（展開せずに検証可能）
blender --command extension validate my_extension-1.0.0.zip
```

## Extension インストール

```sh
# リモートリポジトリからパッケージをインストール
blender --command extension install <extension_id>

# 複数パッケージを同時インストール（カンマ区切り、スペースなし）
blender --command extension install ext_a,ext_b

# ローカルの .zip ファイルからインストール
blender --command extension install-file my_extension-1.0.0.zip

# インストール後に有効化
blender --command extension install-file my_extension-1.0.0.zip --enable

# ユーザー設定を読み取り専用として扱う（設定ファイルを変更しない）
blender --command extension install-file my_extension-1.0.0.zip --no-prefs
```

> **警告**: `--no-prefs` を指定しない場合、インストール操作はユーザー設定ファイルを変更する。CI 環境では `--no-prefs` の使用を検討すること。

## Extension 削除・更新・同期

```sh
# パッケージを削除
blender --command extension remove <extension_id>

# 複数パッケージを同時削除（カンマ区切り）
blender --command extension remove ext_a,ext_b

# リモートリポジトリと同期
blender --command extension sync

# インストール済みパッケージを更新
blender --command extension update
```

## Extension 一覧

```sh
# 有効なリポジトリ全体のパッケージ一覧を表示
blender --command extension list
```

## リポジトリ管理

```sh
# リポジトリ一覧を表示
blender --command extension repo-list

# ローカルリポジトリを追加
blender --command extension repo-add --name "local" --directory /path/to/repo

# リモートリポジトリを追加
blender --command extension repo-add --name "my-repo" --url https://example.com/repo

# リポジトリを削除
blender --command extension repo-remove <repo_name>
```

## 静的リポジトリ用 JSON の生成

```sh
# ディレクトリ内の .zip ファイルから index.json を生成
blender --command extension server-generate --repo-dir /path/to/packages
```

生成された `index.json` を HTTP サーバーで公開することで静的リポジトリとして機能する。

## アドオンの有効化（Python スクリプトから）

```sh
# ヘッドレスで起動しアドオンを有効化するスクリプトを実行
blender --background --python enable_addon.py
```

`enable_addon.py` の例:

```python
import bpy

# アドオン有効化
bpy.ops.preferences.addon_enable(module="addon_name")

# 設定を保存
bpy.ops.wm.save_userpref()
```

## 起動時に特定のアドオンを有効化（CLI フラグ）

```sh
# 起動時にカンマ区切りのアドオンを有効化
blender --addons addon_a,addon_b
```
