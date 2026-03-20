# Source Dir

Source: https://lefthook.dev/configuration

スクリプトファイルのディレクトリ設定。

## source_dir

Source: https://lefthook.dev/configuration/source_dir

- **型:** String (ディレクトリパス)
- **デフォルト:** `.lefthook/`

スクリプトファイルのディレクトリを変更する。スクリプトファイルディレクトリは git フック名のフォルダを含み、その中にスクリプトファイルが配置される。

### ディレクトリ構造例

```
.lefthook/
├── pre-commit/
│   ├── lint.sh
│   └── test.py
└── pre-push/
    └── check-files.rb
```

```yaml
# lefthook.yml

source_dir: .my-hooks/
```

---

## source_dir_local

Source: https://lefthook.dev/configuration/source_dir_local

- **型:** String (ディレクトリパス)
- **デフォルト:** `.lefthook-local/`

バージョン管理されないローカルスクリプトファイルのディレクトリを指定する。`lefthook-local.yml` 設定ファイルがあり、そこで別のスクリプトを参照したい場合に有用。

```yaml
# lefthook-local.yml

source_dir_local: .my-local-hooks/
```
