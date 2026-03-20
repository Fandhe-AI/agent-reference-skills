---
name: dayjs
description: >
  Day.js 軽量日付ライブラリ API リファレンス。
  parse, format, manipulate, query, duration, timezone, plugin
user-invocable: false
---

# Day.js API リファレンス

Day.js 公式ドキュメントの全 API を網羅したスキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構造

```
.claude/skills/dayjs/
├── SKILL.md                              ← このファイル（エントリーポイント）
└── references/
    ├── installation/README.md            ← インストール（5ページ）
    ├── parse/README.md                   ← パース（12ページ）
    ├── get-set/README.md                 ← Get + Set（22ページ）
    ├── manipulate/README.md              ← 日時操作（8ページ）
    ├── display/README.md                 ← 表示・出力（17ページ）
    ├── query/README.md                   ← 比較・判定（9ページ）
    ├── i18n/README.md                    ← 国際化（8ページ）
    ├── plugin/README.md                  ← プラグイン（38ページ）
    ├── customization/README.md           ← カスタマイズ（8ページ）
    ├── durations/README.md               ← Duration API（22ページ）
    └── timezone/README.md                ← タイムゾーン（5ページ）
```

## 探索手順

1. ユーザーのタスクに最も関連するカテゴリを特定する
2. そのカテゴリの `README.md` を読む
3. README.md 内の一覧から必要な個別ファイルを選んで読む
4. 必要に応じて関連ページのリンクを辿る

## カテゴリ → README.md マッピング

| タスク例 | カテゴリ | README パス |
|---------|---------|------------|
| npm install, CDN, TypeScript 設定 | installation | [references/installation/README.md](./references/installation/README.md) |
| dayjs(), 文字列パース, Unix タイムスタンプ, clone, isValid | parse | [references/parse/README.md](./references/parse/README.md) |
| millisecond〜year, weekday, quarter, get, set, max, min | get-set | [references/get-set/README.md](./references/get-set/README.md) |
| add, subtract, startOf, endOf, utc, utcOffset | manipulate | [references/manipulate/README.md](./references/manipulate/README.md) |
| format, fromNow, diff, unix, toDate, toJSON, toISOString | display | [references/display/README.md](./references/display/README.md) |
| isBefore, isSame, isAfter, isBetween, isDayjs, isLeapYear | query | [references/query/README.md](./references/query/README.md) |
| ロケール読み込み、変更、月名・曜日名一覧 | i18n | [references/i18n/README.md](./references/i18n/README.md) |
| AdvancedFormat, RelativeTime, Duration, UTC, Timezone 等 | plugin | [references/plugin/README.md](./references/plugin/README.md) |
| 月名・曜日名カスタマイズ、相対時間テンプレート | customization | [references/customization/README.md](./references/customization/README.md) |
| dayjs.duration(), humanize, format, as, get | durations | [references/durations/README.md](./references/durations/README.md) |
| dayjs.tz(), タイムゾーン変換、デフォルトタイムゾーン設定 | timezone | [references/timezone/README.md](./references/timezone/README.md) |
