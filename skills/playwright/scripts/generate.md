# generate

`codegen` コマンドによるテストコードの自動生成。ブラウザ操作を記録して Playwright Test コードを出力する。

## 基本的な codegen の起動

```sh
# URL を指定して codegen を起動
npx playwright codegen https://example.com

# URL なしで起動（ブラウザ内で手動ナビゲート）
npx playwright codegen
```

## ブラウザの指定

```sh
npx playwright codegen --browser firefox https://example.com
npx playwright codegen -b webkit https://example.com
```

## 出力ファイルの指定

```sh
npx playwright codegen --output tests/example.spec.ts https://example.com
npx playwright codegen -o tests/example.spec.ts https://example.com
```

## 生成コードの言語指定

```sh
# JavaScript で生成
npx playwright codegen --target javascript https://example.com

# Python (pytest) で生成
npx playwright codegen --target python-pytest https://example.com

# Java で生成
npx playwright codegen --target java https://example.com

# C# (MSTest) で生成
npx playwright codegen --target csharp-mstest https://example.com
```

## テスト ID 属性のカスタマイズ

```sh
npx playwright codegen --test-id-attribute data-testid https://example.com
```

## エミュレーション（デバイス・環境の模倣）

```sh
# ビューポートサイズを指定
npx playwright codegen --viewport-size="800,600" https://example.com

# デバイスエミュレーション
npx playwright codegen --device="iPhone 13" https://example.com

# カラースキームの指定
npx playwright codegen --color-scheme=dark https://example.com

# ジオロケーションの指定
npx playwright codegen --geolocation="41.890221,12.492348" https://example.com

# タイムゾーンの指定
npx playwright codegen --timezone="Europe/Rome" https://example.com

# 言語・ロケールの指定
npx playwright codegen --lang="it-IT" https://example.com
```

## 複合エミュレーション

```sh
npx playwright codegen \
  --device="iPhone 13" \
  --color-scheme=dark \
  --timezone="Asia/Tokyo" \
  --lang="ja-JP" \
  https://example.com
```

## 認証状態の保存と読み込み

```sh
# 認証状態をファイルに保存（ログイン操作後に保存される）
npx playwright codegen --save-storage=auth.json https://example.com

# 保存済み認証状態を読み込んで起動
npx playwright codegen --load-storage=auth.json https://example.com
```

## 既存のブラウザプロファイルを使用

```sh
npx playwright codegen --user-data-dir=/path/to/browser/data/ https://example.com
```

既存のブラウザプロファイル（Cookie やセッション情報を含む）を使って codegen を起動する。
