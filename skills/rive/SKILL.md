---
name: rive
description: >
  Rive アニメーションランタイムリファレンス。
  Rive クラス、useRive、useStateMachineInput、RiveComponent、
  State Machine、Data Binding、ViewModel、ViewModelInstance、Events、
  Layout / Fit / Alignment、.riv ファイル読み込み。
  @rive-app/canvas、@rive-app/webgl2、@rive-app/react-canvas、@rive-app/react-webgl2。
user-invocable: false
---

## ディレクトリ構成

```text
skills/rive/
  SKILL.md
  references/
    runtimes-web/
      README.md
      packages.md
      rive-constructor.md
      rive-methods.md
      layout.md
      state-machine-playback.md
      data-binding.md
      loading-assets.md
      fonts.md
      audio.md
      events.md
      rive-file.md
      preloading-wasm.md
    runtimes-react/
      README.md
      overview.md
      use-rive.md
      use-state-machine-input.md
      layout.md
      data-binding.md
    concepts/
      README.md
      state-machine.md
      states.md
      transitions.md
      layers.md
      inputs.md
      listeners.md
      data-binding.md
      view-models.md
      instances.md
      properties.md
      converters.md
      enums.md
      events.md
      layout.md
  samples/
    README.md
    web-basic.md
    react-interactive.md
    state-machine-control.md
  scripts/
    README.md
    install.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの README.md を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| パッケージ選定（canvas / webgl2 / canvas-lite）を知りたい | runtimes-web | [references/runtimes-web/README.md](references/runtimes-web/README.md) |
| Rive コンストラクタのオプションを調べたい | runtimes-web | [references/runtimes-web/README.md](references/runtimes-web/README.md) |
| play / pause / stop など Rive インスタンスメソッドを使いたい | runtimes-web | [references/runtimes-web/README.md](references/runtimes-web/README.md) |
| .riv ファイルを複数インスタンスで共有したい（RiveFile） | runtimes-web | [references/runtimes-web/README.md](references/runtimes-web/README.md) |
| フォント・音声アセットを動的に読み込みたい | runtimes-web | [references/runtimes-web/README.md](references/runtimes-web/README.md) |
| WASM を自己ホストしてスタートアップを高速化したい | runtimes-web | [references/runtimes-web/README.md](references/runtimes-web/README.md) |
| React で useRive を使ってアニメーションを表示したい | runtimes-react | [references/runtimes-react/README.md](references/runtimes-react/README.md) |
| useStateMachineInput で State Machine 入力を操作したい | runtimes-react | [references/runtimes-react/README.md](references/runtimes-react/README.md) |
| React で Data Binding / ViewModel を使いたい | runtimes-react | [references/runtimes-react/README.md](references/runtimes-react/README.md) |
| State Machine の仕組み・状態・遷移を理解したい | concepts | [references/concepts/README.md](references/concepts/README.md) |
| Inputs / Listeners / Events の概念を把握したい | concepts | [references/concepts/README.md](references/concepts/README.md) |
| ViewModel / ViewModelInstance / Properties を理解したい | concepts | [references/concepts/README.md](references/concepts/README.md) |
| Converters / Enums / Data Binding の概念を調べたい | concepts | [references/concepts/README.md](references/concepts/README.md) |
| Layout / Fit / Alignment の概念を知りたい | concepts | [references/concepts/README.md](references/concepts/README.md) |
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・パッケージ追加コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
