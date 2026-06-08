---
name: theatrejs
description: >
  Theatre.js アニメーションツールキットリファレンス。
  @theatre/core / @theatre/studio / @theatre/r3f / @theatre/dataverse。
  getProject, Sheet, Sequence, Object, val, onChange, prop-types（number / rgba / compound / image）。
  studio initialize / extend / transaction / scrub / createPane。
  SheetProvider, editable, useCurrentSheet, useVal, usePrism, useAtom。
  keyframe アニメーション、audio sync、state JSON、React Three Fiber 統合。
user-invocable: false
---

## ディレクトリ構成

```text
skills/theatrejs/
  SKILL.md
  references/
    concepts/
      README.md
      overview.md
      getting-started.md
      project.md
      sheet.md
      sheet-object.md
      sequence.md
      prop-types.md
      studio.md
      state.md
    core/
      README.md
      get-project.md
      project.md
      sheet.md
      sequence.md
      object.md
      types.md
      val.md
      on-change.md
      dataverse.md
    studio/
      README.md
      studio-initialize.md
      studio-extend.md
      studio-transaction.md
      studio-scrub.md
      studio-selection.md
      studio-create-pane.md
      studio-get-studio-project.md
      studio-create-content-of-save-file.md
      studio-ui.md
      keyboard-mouse-controls.md
      authoring-extensions.md
    r3f/
      README.md
      SheetProvider.md
      editable.md
      PerspectiveCamera.md
      OrthographicCamera.md
      useCurrentSheet.md
      refreshSnapshot.md
      extension.md
      useVal.md
      usePrism.md
      useAtom.md
    manual/
      README.md
      projects.md
      sheets.md
      objects.md
      prop-types.md
      sequences.md
      assets.md
      audio.md
      advanced.md
  samples/
    README.md
    basic-animation-setup.md
    react-three-fiber-integration.md
    audio-sync.md
    studio-editing-workflow.md
    html-dom-animation.md
  scripts/
    README.md
    install.md
    setup.md
    animation.md
    studio.md
    r3f.md
    theatric.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| Theatre.js の概念・全体像を把握したい | concepts | [references/concepts/README.md](references/concepts/README.md) |
| セットアップ手順・はじめての実装を知りたい | concepts | [references/concepts/README.md](references/concepts/README.md) |
| Project / Sheet / Sequence / Object の概念を理解したい | concepts | [references/concepts/README.md](references/concepts/README.md) |
| state JSON の構造・シリアライズを知りたい | concepts | [references/concepts/README.md](references/concepts/README.md) |
| getProject でプロジェクトを作成・取得したい | core | [references/core/README.md](references/core/README.md) |
| Sheet / Sequence / Object の API シグネチャを調べたい | core | [references/core/README.md](references/core/README.md) |
| prop-types（number / rgba / compound / image）を定義したい | core | [references/core/README.md](references/core/README.md) |
| val / onChange でポインター値を読み取り・購読したい | core | [references/core/README.md](references/core/README.md) |
| @theatre/dataverse の Atom / prism / Ticker を使いたい | core | [references/core/README.md](references/core/README.md) |
| Studio を初期化・拡張したい | studio | [references/studio/README.md](references/studio/README.md) |
| Studio でトランザクション・スクラブ操作をしたい | studio | [references/studio/README.md](references/studio/README.md) |
| Studio の選択状態・カスタムペインを操作したい | studio | [references/studio/README.md](references/studio/README.md) |
| Studio の保存ファイルをエクスポート・カスタム永続化したい | studio | [references/studio/README.md](references/studio/README.md) |
| Studio のキーボード・マウス操作を調べたい | studio | [references/studio/README.md](references/studio/README.md) |
| Studio 拡張機能（ツールバー・ペイン）を作成したい | studio | [references/studio/README.md](references/studio/README.md) |
| React Three Fiber シーンをアニメートしたい | r3f | [references/r3f/README.md](references/r3f/README.md) |
| SheetProvider / editable でオブジェクトを編集可能にしたい | r3f | [references/r3f/README.md](references/r3f/README.md) |
| useCurrentSheet / useVal / usePrism / useAtom を使いたい | r3f | [references/r3f/README.md](references/r3f/README.md) |
| R3F カメラ（PerspectiveCamera / OrthographicCamera）をアニメートしたい | r3f | [references/r3f/README.md](references/r3f/README.md) |
| プロジェクト・シート・オブジェクトの手動設定手順を知りたい | manual | [references/manual/README.md](references/manual/README.md) |
| シーケンス再生・ループ・ポジション制御を知りたい | manual | [references/manual/README.md](references/manual/README.md) |
| アセット（画像・テクスチャ）を props に使いたい | manual | [references/manual/README.md](references/manual/README.md) |
| 音声をアニメーションと同期したい | manual | [references/manual/README.md](references/manual/README.md) |
| カスタム rafDriver で外部レンダーループと連携したい | manual | [references/manual/README.md](references/manual/README.md) |
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
