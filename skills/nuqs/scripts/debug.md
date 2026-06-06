# Debug

nuqs のデバッグ・トラブルシューティング用コマンド。

## ブラウザコンソールでのデバッグログ有効化

ブラウザの開発者ツールコンソールで実行する。URL 更新のログが出力される。

```javascript
localStorage.setItem('debug', 'nuqs')
```

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
