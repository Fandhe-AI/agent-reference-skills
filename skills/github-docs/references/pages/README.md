# GitHub Pages

GitHub Pages は、GitHub リポジトリから直接静的ウェブサイトをホスティングするサービスです。HTML、CSS、JavaScript ファイルをリポジトリに配置するだけで、ウェブサイトを公開できます。

## 目次

| ファイル | 説明 | 主な内容 |
|---------|------|---------|
| [getting-started.md](./getting-started.md) | GitHub Pages の始め方 | サイトの種類、公開ソース、制限事項 |
| [configuration.md](./configuration.md) | 設定 | 公開ソースの設定、Jekyll、カスタム 404 ページ |
| [custom-domains.md](./custom-domains.md) | カスタムドメイン | DNS 設定、HTTPS、ドメイン検証 |

## クイックスタート

```bash
# 1. リポジトリを作成（ユーザーサイトの場合）
gh repo create username.github.io --public

# 2. index.html を作成してコミット
echo "<h1>Hello, GitHub Pages!</h1>" > index.html
git add index.html
git commit -m "Initial GitHub Pages site"
git push

# 3. Settings > Pages で公開ソースを設定
# → https://username.github.io でアクセス可能に
```

## 参考リンク

- [GitHub Pages ドキュメント](https://docs.github.com/en/pages)
