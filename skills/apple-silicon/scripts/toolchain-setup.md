# toolchain-setup

Downloading and verifying the Metal Toolchain component required by Xcode 26 command-line builds. Source: Downloading and installing additional Xcode components

## Metal Toolchain の導入

Xcode 26 以降、`xcrun -sdk macosx metal` 等の Metal コマンドラインツールは既定で同梱されない。
`metalToolchain` コンポーネントを別途ダウンロードする必要がある。

```sh
xcodebuild -downloadComponent metalToolchain
```

`-exportPath` を付けるとディスクイメージとして書き出せる（他マシンへの配布・オフライン導入向け）。

```sh
xcodebuild -downloadComponent metalToolchain -exportPath ~/Downloads
```

書き出したディスクイメージを別マシンで取り込む場合は次のコマンドを使う。

```sh
xcodebuild -importComponent metalToolchain -importPath ~/Downloads/metalToolchain.dmg
```

## 導入確認

```sh
xcrun -sdk macosx metal --version
```

未導入の場合、次のエラーで案内される。

```text
error: cannot execute tool 'metal' due to missing Metal Toolchain;
       use: xcodebuild -downloadComponent MetalToolchain
```

エラーメッセージ中の表記は `MetalToolchain`（先頭大文字）だが、コマンドの引数には
`metalToolchain`（先頭小文字）を使う。
