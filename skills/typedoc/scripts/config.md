# config

TypeDoc の設定ファイル作成・管理のコマンドとサンプル集。

## typedoc.json の基本構成

```sh
cat > typedoc.json << 'EOF'
{
  "$schema": "https://typedoc.org/schema.json",
  "entryPoints": ["src/index.ts"],
  "out": "docs"
}
EOF
```

## typedoc.json の詳細設定例

```sh
cat > typedoc.json << 'EOF'
{
  "$schema": "https://typedoc.org/schema.json",
  "entryPoints": ["src/index.ts"],
  "out": "docs",
  "name": "My Project",
  "readme": "README.md",
  "theme": "default",
  "excludePrivate": true,
  "excludeExternals": true,
  "plugin": ["typedoc-plugin-markdown"],
  "sort": ["alphabetical"],
  "categorizeByGroup": true,
  "navigation": {
    "includeCategories": true,
    "includeGroups": true
  }
}
EOF
```

## tsconfig.json への typedocOptions 埋め込み

```sh
# tsconfig.json に以下のセクションを追加する
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext"
  },
  "typedocOptions": {
    "entryPoints": ["src/index.ts"],
    "out": "docs"
  }
}
EOF
```

## package.json への typedocOptions 埋め込み

```sh
# package.json に typedocOptions を追加する（jq を使用した例）
jq '. + {"typedocOptions": {"entryPoints": ["src/index.ts"], "out": "docs"}}' package.json > package.json.tmp && mv package.json.tmp package.json
```

## 解決済み設定の確認

```sh
npx typedoc --showConfig
```

どのオプションが有効になっているかをデバッグするために使用する。設定ファイルの読み込み結果を出力して終了する。
