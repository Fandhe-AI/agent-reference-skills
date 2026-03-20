# Jest

## 基本設定

```json
{ "scripts": { "test": "jest" } }
```

```json
{ "tasks": { "test": {} } }
```

## ウォッチモードの分離（重要）

```json
{
  "scripts": { "test": "jest", "test:watch": "jest --watch" }
}
```

```json
{
  "tasks": {
    "test:watch": { "cache": false, "persistent": true }
  }
}
```

## VS Code Jest 拡張機能

```json
{
  "jest.jestCommandLine": "turbo run test --log-prefix=none --"
}
```
