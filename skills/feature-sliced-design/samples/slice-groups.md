# Slice Groups

関連スライスをフォルダでまとめて見通しを良くするパターン。スライス間の分離ルールは変わらない。

```text
entities/
  payment/                 ← スライスグループ（フォルダ）
    invoice/               ← スライス
      model/
      ui/
    receipt/               ← スライス
      model/
      ui/
    transaction/           ← スライス
      model/
      ui/
  user/                    ← グループ化しないスライス
    model/
    ui/
  product/
    model/
    ui/
```

```text
pages/
  order/                   ← スライスグループ
    create/
      ui/
    detail/
      ui/
    list/
      ui/
  customer/
    detail/
      ui/
    list/
      ui/
  settings/
    ui/
```

## Notes

- スライスグループは FSD の必須要素ではなく、スライス数が増えて平坦な構成では探しにくいときに選択的に導入する。スライス間の依存ルールには影響しない
- グループはスライスではない。`model` / `ui` / `api` などの独自セグメントも `index.ts` などの Public API も持たない。複数スライスで共有するコードをグループに置かない
- グループに属していても各スライスは独立したまま（スライス間の分離ルールは不変）
- 導入の目安: 同じビジネスコンテキストのスライスが散在している、名前から同じトピックと分かる、レイヤー内のスライス数が一覧しにくい。名前だけで探せる、自然なグループ基準がない、グループ内のスライスが少なすぎる場合は不要
- `pages` の例は一例であり、pages レイヤーの標準構成ではない。`user/` のように単体で意味が明確なスライスはグループ化しなくてよい
- `features` でも可能だが、feature は単一ドメインに縛られず複数 entity をまたぐことが多く、自然な基準を見つけにくい。`features/cart/` のようなグループに DTO や mapper が溜まると、ユースケース単位で分ける原則が弱まる。スライスが 2〜3 個なら平坦で十分で、entities に属すべきコードが混入していないかも確認する
