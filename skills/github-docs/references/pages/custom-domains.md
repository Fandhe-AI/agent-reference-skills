# カスタムドメイン (Custom Domains)

GitHub Pages サイトにカスタムドメインを設定する方法、DNS の構成、HTTPS の強制、およびドメインの検証に関するリファレンスです。

## ドメインの種類

### Apex ドメイン（ルートドメイン）

サブドメインを含まないドメインです。

| 項目 | 内容 |
|------|------|
| 例 | `example.com` |
| DNS レコード | A レコード、ALIAS レコード、または ANAME レコード |
| 推奨 | `www` サブドメインとの併用を推奨 |

### サブドメイン

| 項目 | 内容 |
|------|------|
| www サブドメイン | `www.example.com` |
| カスタムサブドメイン | `blog.example.com`, `docs.example.com` |
| DNS レコード | CNAME レコード |

## DNS の設定

### Apex ドメインの場合（A レコード）

DNS プロバイダーで以下の A レコードを設定します:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

IPv6 を使用する場合は、AAAA レコードも追加します:

```
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

### サブドメインの場合（CNAME レコード）

DNS プロバイダーで CNAME レコードを設定します:

```
www    CNAME    <username>.github.io.
blog   CNAME    <username>.github.io.
docs   CNAME    <username>.github.io.
```

> CNAME の値の末尾にピリオド（`.`）を付けるかどうかは DNS プロバイダーによって異なります。

### ALIAS / ANAME レコード（Apex ドメイン用の代替）

一部の DNS プロバイダーは ALIAS または ANAME レコードをサポートしており、Apex ドメインに対して CNAME のような動作を提供します:

```
@    ALIAS    <username>.github.io.
```

## GitHub での設定

### カスタムドメインの設定手順

1. **Settings** > **Pages** に移動
2. **Custom domain** にドメイン名を入力（例: `www.example.com`）
3. **Save** をクリック
4. DNS の設定が反映されるのを待つ（最大 24〜48 時間）

> これにより、リポジトリのルート（または公開ソースフォルダ）に `CNAME` ファイルが自動的に作成されます。

### CNAME ファイル

GitHub は設定したカスタムドメインを `CNAME` ファイルに保存します。手動で作成することも可能です:

```
www.example.com
```

> `CNAME` ファイルにはドメイン名を 1 行のみ記述します。`https://` やパスは含めないでください。

## 自動リダイレクト

`www` サブドメインと Apex ドメインの両方を適切に設定すると、GitHub Pages は自動的にリダイレクトを設定します:

| カスタムドメインの設定 | リダイレクト |
|---------------------|------------|
| `www.example.com` | `example.com` → `www.example.com` |
| `example.com` | `www.example.com` → `example.com` |

> `www.www.` で始まるドメインは設定できません。

## HTTPS の強制

### 有効化手順

1. DNS の設定が完了し、反映されていることを確認
2. **Settings** > **Pages** に移動
3. **Enforce HTTPS** にチェックを入れる

### 仕組み

- GitHub は **Let's Encrypt** を使用して SSL/TLS 証明書を自動発行する
- 証明書の発行には最大 **24 時間** かかる場合がある
- 証明書は自動的に更新される
- HTTP から HTTPS への自動リダイレクトが有効になる

### Enforce HTTPS が有効にできない場合

- DNS の設定がまだ反映されていない（最大 48 時間かかる場合がある）
- 証明書がまだ発行されていない
- DNS の設定が正しくない

### 確認方法

```bash
# DNS の設定を確認（A レコード）
dig example.com +short

# DNS の設定を確認（CNAME レコード）
dig www.example.com +short

# HTTPS 証明書を確認
curl -vI https://www.example.com 2>&1 | grep -i "issuer"
```

## ドメインの検証

カスタムドメインを検証することで、ドメインの乗っ取り攻撃を防止できます。

### ドメイン乗っ取りのリスク

GitHub Pages サイトが無効化されているにもかかわらずカスタムドメインが設定されたままの場合、他のユーザーがそのドメインを自分のリポジトリで使用できてしまう可能性があります。

### 検証手順

1. **Settings**（アカウント設定）> **Pages** に移動
2. **Add a domain** をクリック
3. ドメイン名を入力
4. 表示された TXT レコードを DNS プロバイダーに追加:
   ```
   _github-pages-challenge-<username>    TXT    <verification-code>
   ```
5. DNS が反映された後、**Verify** をクリック

### 検証のメリット

- 検証済みドメインは他のユーザーの GitHub Pages サイトで使用できなくなる
- ドメインの乗っ取りリスクが軽減される
- 組織レベルでの検証も可能

## Apex ドメイン + www サブドメインの推奨設定

最も一般的な設定パターン:

### 1. www サブドメインをプライマリにする場合

```
# DNS 設定
example.com      A       185.199.108.153
example.com      A       185.199.109.153
example.com      A       185.199.110.153
example.com      A       185.199.111.153
www.example.com  CNAME   <username>.github.io.

# GitHub Pages 設定
Custom domain: www.example.com
```

結果: `example.com` → `www.example.com` に自動リダイレクト

### 2. Apex ドメインをプライマリにする場合

```
# DNS 設定
example.com      A       185.199.108.153
example.com      A       185.199.109.153
example.com      A       185.199.110.153
example.com      A       185.199.111.153
www.example.com  CNAME   <username>.github.io.

# GitHub Pages 設定
Custom domain: example.com
```

結果: `www.example.com` → `example.com` に自動リダイレクト

## トラブルシューティング

| 問題 | 考えられる原因 | 解決策 |
|------|--------------|--------|
| サイトにアクセスできない | DNS がまだ反映されていない | 24〜48 時間待つ |
| HTTPS が有効にならない | DNS 設定が正しくない | A レコード/CNAME を確認 |
| 証明書エラー | 証明書がまだ発行されていない | 24 時間待つ |
| 404 エラー | CNAME ファイルがない | リポジトリに CNAME ファイルを確認 |
| 別のサイトが表示される | DNS キャッシュ | `dig` で DNS を確認、キャッシュクリア |

## 参考リンク

- [About custom domains and GitHub Pages - GitHub Docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages)
- [Managing a custom domain for your GitHub Pages site - GitHub Docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Verifying your custom domain for GitHub Pages - GitHub Docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
