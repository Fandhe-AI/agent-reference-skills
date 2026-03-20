# Swift でのインストール

Source: https://lefthook.dev/installation/swift

## 概要

Swift での Lefthook の統合はコミュニティのラッパープラグインを通じて提供されています。Swift ラッパープラグインは [こちら](https://github.com/csjones/lefthook-plugin) で公開されています。

## インストール方法

### Swift Package Manager

`Package.swift` ファイルに以下の依存関係を追加します。

```swift
.package(url: "https://github.com/csjones/lefthook-plugin.git", exact: "2.1.4"),
```

### Mint パッケージマネージャー

Mint を使用してプラグインを実行することもできます。

```bash
mint run csjones/lefthook-plugin
```

## 参考情報

Swift Package Manager または Mint パッケージマネージャーのいずれかを使って、Swift プロジェクトに Lefthook を導入できます。
