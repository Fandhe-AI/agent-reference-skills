# Renovate

## 概要

Renovate で biome.json の `$schema` バージョンを自動更新。

## 設定

`renovate.json`:
```json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": ["customManagers:biomeVersions"]
}
```

`customManagers:biomeVersions` プリセットにより、Renovate が自動的に Biome のバージョンを検出し更新 PR を作成。
