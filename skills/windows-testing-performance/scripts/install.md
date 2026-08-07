# install

UI テスト自動化ツール（Appium / WinAppDriver / Playwright）のセットアップコマンド集。

## Appium + Windows ドライバーのセットアップ

```sh
# Node.js LTS が前提
npm install -g appium
appium driver install windows
appium driver list   # "windows" がインストールされていることを確認
appium                # Appium サーバーを起動（既定: http://127.0.0.1:4723）
```

WinAppDriver 自体は開発が停止しており、同じ WebDriver プロトコル・capabilities モデルを使う Appium + `appium-windows-driver` プラグインが推奨経路。テスト対象デバイスは Developer Mode を有効にしておく必要がある。

## レガシー WinAppDriver.exe の起動

```bat
:: 既定: 127.0.0.1:4723 で待ち受け
WinAppDriver.exe

:: カスタムポート
WinAppDriver.exe 4727

:: カスタム IP + ポート（管理者権限が必要）
WinAppDriver.exe 10.0.0.10 4725
```

## WebView2 テスト用 Playwright のインストール

```sh
npm install -D @playwright/test
```

Windows アプリが WebView2 でホストする Web コンテンツ（HTML/CSS/JS）のテストに使用する。ネイティブ UI（ボタン・メニュー）側は WinAppDriver/Appium が担当する。
