# Debug

nuqs のデバッグ・トラブルシューティング用コマンド。

## デバッグログの opt-in インポート

デバッグログはバンドルに含まれない opt-in 方式。アプリ内で `nuqs/debug` エントリポイントを 1 回インポートする。クライアントとサーバーでバンドルが分かれるフレームワークでは、ログを出したい各ランタイムでインポートする（導入版は公式ドキュメントに記載なし）。

```ts
// Once in your app:
import 'nuqs/debug'
```

## ブラウザコンソールでのデバッグログ有効化

上記インポート後、ブラウザの開発者ツールコンソールで実行し、ページをリロードする。URL 更新のログが出力される。

```javascript
localStorage.setItem('debug', 'nuqs')
```

ログ行のプレフィックスは、フックレベルが `[nuq+ …]`、throttle / debounce キューやアダプターなど内部サブシステムが `[nuqs <subsystem>]`。

`debug` パッケージと異なりワイルドカードは使えないが、組み合わせは可能。

```javascript
localStorage.setItem('debug', '*,nuqs')
```

## サーバー（Node.js）でのデバッグログ有効化

SSR・React Server Components・`nuqs/server` 使用時など、あらゆる Node 環境で有効。Next.js のルートレイアウトなどサーバーのエントリポイントから `nuqs/debug` をインポートすると、サーバーバンドルにデバッグログが含まれる。`process.env.DEBUG` に文字列 `nuqs` が含まれると有効になる（ブラウザ版と異なり `localStorage` は使わない）。

```bash
DEBUG=nuqs node server.js
```

```bash
DEBUG=nuqs pnpm dev
```

`.env` ファイルへの `DEBUG=nuqs` 記述やホスティング環境の設定でも可。User timings マーカーも記録され、ブラウザの devtools でのパフォーマンス分析に使える。

## デバッグログの無効化

```javascript
localStorage.removeItem('debug')
```

## v1 から v2 へのデバッグキー移行

nuqs v1（next-usequerystate）から v2 へ移行する際に、デバッグキーを更新する。

```javascript
if (localStorage.debug) {
  localStorage.debug = localStorage.debug.replace('next-usequerystate', 'nuqs')
}
```
