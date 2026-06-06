---
name: dayjs
description: >
  Day.js (軽量日付・時刻ライブラリ、Moment.js 互換 API) リファレンス。
  parse, format, manipulate (add / subtract / startOf / endOf)、
  query (isBefore / isAfter / isSame)、duration, relativeTime、
  timezone, utc, plugin システム、locale、i18n。
user-invocable: false
model: sonnet
---

# Day.js API リファレンス

Day.js 公式ドキュメントの全 API を網羅したスキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構成

```text
skills/dayjs/
  SKILL.md
  references/
    installation/
      README.md
      installation.md
    parse/
      README.md
      parse.md
    get-set/
      README.md
      get-set.md
    manipulate/
      README.md
      manipulate.md
    display/
      README.md
      display.md
    query/
      README.md
      query.md
    i18n/
      README.md
      i18n.md
    plugin/
      README.md
      plugin-overview.md
      format-plugins.md
      display-plugins.md
      getset-plugins.md
      parse-plugins.md
      query-plugins.md
      timezone-utc-plugins.md
      other-plugins.md
    customization/
      README.md
      customization.md
    durations/
      README.md
      durations.md
    timezone/
      README.md
      timezone.md
  samples/
    README.md
    basic-parsing.md
    custom-format-parsing.md
    formatting.md
    add-subtract.md
    start-end-of.md
    comparison.md
    relative-time.md
    locale.md
    timezone.md
    duration.md
  scripts/
    README.md
    install.md
    plugin.md
    i18n.md
    customization.md
    test.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| npm install、CDN 読み込み、TypeScript 設定 | installation | [references/installation/README.md](references/installation/README.md) |
| dayjs() でオブジェクト生成、文字列パース、Unix タイムスタンプ、clone、isValid | parse | [references/parse/README.md](references/parse/README.md) |
| millisecond〜year の取得・設定、weekday、quarter、max、min | get-set | [references/get-set/README.md](references/get-set/README.md) |
| add、subtract、startOf、endOf、utcOffset による日時操作 | manipulate | [references/manipulate/README.md](references/manipulate/README.md) |
| format、fromNow、diff、unix、toDate、toJSON、toISOString | display | [references/display/README.md](references/display/README.md) |
| isBefore、isSame、isAfter、isBetween、isDayjs、isLeapYear | query | [references/query/README.md](references/query/README.md) |
| ロケール読み込み、言語切り替え、月名・曜日名一覧 | i18n | [references/i18n/README.md](references/i18n/README.md) |
| AdvancedFormat、RelativeTime、Duration、UTC、Timezone 等プラグイン | plugin | [references/plugin/README.md](references/plugin/README.md) |
| 月名・曜日名カスタマイズ、相対時間テンプレート、カスタムロケール | customization | [references/customization/README.md](references/customization/README.md) |
| dayjs.duration()、humanize、format、as、get | durations | [references/durations/README.md](references/durations/README.md) |
| dayjs.tz()、タイムゾーン変換、デフォルトタイムゾーン設定 | timezone | [references/timezone/README.md](references/timezone/README.md) |
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンド・プラグイン設定を知りたい | scripts | [scripts/README.md](scripts/README.md) |
