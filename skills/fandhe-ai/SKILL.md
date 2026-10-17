---
name: fandhe-ai
description: >
  Rust 製 AI/ML ライブラリ fandhe-ai のリファレンス。Burn / candle / tch 非依存の from-scratch 実装。
  tape(), tape_for, Tape, Gradients, Tensor, Var, LinearVars, autodiff, kernel fusion, FusionPlan, BackendOps,
  Device (Cpu / Cuda / Metal), DeviceParamStore, compat::array, compat::Sequential, nn::Module,
  optim (AdamW / GradScaler), data::DataLoader, ONNX import / export, safetensors,
  inference::generate / KvCache, guardrail / self-repair CLI。
user-invocable: false
---

# fandhe-ai

fandhe-ai は Rust 製 AI/ML ライブラリ。Burn / candle / tch などの既存フレームワークに依存せず、テンソル・autodiff・kernel fusion・計算カーネル・バックエンド抽象層を完全自作コアとして実装している。リポジトリ内の `crates/*/Cargo.toml` は 11 件（crates.io 公開 7 件 + 未公開 `guardrail` / `self-repair` / `bench-harness` / `docs-site` の 4 件）に分かれるが、利用者が直接触れるのは `fandhe-ai` クレート（リポジトリ内パスは `crates/facade`）のみで、公式ドキュメントは「`fandhe-ai` crate のみが supported public API surface、内部クレートの直接利用は非サポート」と明言している。

**対象バージョン** — fandhe-ai 0.11.0（crates.io 2026-10-09 公開、git タグ `v0.11.0` = commit `6b14fdb`）。公式の確定入口は 4 つ（`tape()` / `tape_for`、`compat::{array, Sequential}`、`optim`、`DeviceParamStore`）。facade の公開モジュールは `compat` / `optim` / `data` / `nn` / `interop` / `model` / `inference` / `text`。docs.rs のレンダリング済みページは 0.11.0 に pin。

**注意** — `guardrail` は AI 生成 changeset を判定する CI 用 CLI（check / eval）であり、`openai-agents` / `anthropic-prompt-eval` / `openai-evals-tuning` が扱う LLM 出力の guardrail / eval とは別物。

**他スキルとの使い分け** — `Device::Cuda` / `Device::Metal` を含むバックエンド抽象は fandhe-ai 独自の Rust API であり、CUDA C++ / PTX / CUTLASS を調べる場合は `nvidia-cuda`、MSL / MPSGraph / MLX を調べる場合は `apple-silicon`、HIP / ROCm を調べる場合は `amd-rocm` を参照すること。`Tensor` / autodiff / tape も同様に fandhe-ai 独自の Rust API であり、`apple-ml` の `MLMultiArray`、`apple-silicon`（MLX）の `mx.array` とは別物。`inference::generate` / `KvCache` / speculative decoding は自作モデル上のローカル自己回帰生成ループであり、LLM API（`openai-api-core` / `anthropic-api-core` / `hermes-agent`）ではない。`interop::onnx` は自作インタープリタで、Windows ML（`windows-ai`）とは別物。`optim` / `nn` / `data` は `apple-silicon` の MLX（optimizers・nn Module）とは別物。スキル内の同名別物として `compat::Sequential`（Keras 風ビルダー）と `nn::Sequential`（PyTorch 風コンテナ）がある。fandhe-ai は `fandhe-frontend`（Rust 製フロントエンドフレームワーク）・`fandhe-backend`（Rust 製バックエンド HTTP サーバーフレームワーク）とは同じ Fandhe-AI org の別ライブラリで、API・対象領域とも無関係。

公式ドキュメント: https://fandhe-ai.github.io/fandhe-ai/ / リポジトリ: https://github.com/Fandhe-AI/fandhe-ai

## ディレクトリ構成

```text
skills/fandhe-ai/
  SKILL.md
  references/
    getting-started/
      README.md
      overview.md
      installation.md
      quick-start.md
      crate-layout.md
    guides/
      README.md
      backends.md
      numerical-parity.md
      performance.md
      interop.md
    api/
      README.md
      tape.md
      var.md
      tensor.md
      gradients.md
      linear-vars.md
      device.md
      errors.md
      compat-sequential.md
      compat-array.md
      var-elementwise.md
      var-reduction.md
      var-shape-indexing.md
      var-linalg.md
      var-nn-ops.md
      var-losses.md
      var-signal.md
      autodiff-transforms.md
      random-creation.md
      dtype.md
      device-param-store.md
      backend-tuning.md
      compat-training.md
      compat-callbacks.md
      compat-metrics.md
      compat-model-io.md
      compat-functional.md
    optim/
      README.md
      optimizers.md
      param-groups-state.md
      lr-schedulers.md
      grad-scaling-clipping.md
      ema-swa.md
    nn/
      README.md
      module.md
      containers.md
      forward-hooks.md
      init.md
      loss.md
      rnn.md
      transformer.md
      kv-cache.md
    data/
      README.md
      dataset.md
      dataloader.md
      samplers.md
      iterable-prefetch.md
      text-vectorization.md
    interop/
      README.md
      onnx.md
      safetensors.md
      npy.md
      model-registry.md
    inference/
      README.md
      generate.md
      speculative.md
      batch-scheduler.md
      predict-batches-phase-metrics.md
    internals/
      README.md
      tensor-core.md
      tensor-core-fusion.md
      autodiff.md
      backend-cpu.md
      backend-cuda.md
      backend-metal.md
      onnx-interop.md
      bench-harness.md
    tooling/
      README.md
      guardrail.md
      self-repair.md
      config.md
  samples/
    README.md
    getting-started.md
    array-shapes.md
    backend-switching.md
    training-loop.md
    inference.md
    gemm-bench.md
    compat-fit-callbacks.md
    dataloader.md
    text-vectorization.md
    safetensors-save-load.md
    hf-safetensors-sequential.md
    reference-models-training.md
    optimizer-and-scheduler.md
    generate-autoregressive.md
    generate-scheduler.md
    npy-npz-roundtrip.md
    onnx-external-data-limits.md
    reference-models.md
  scripts/
    README.md
    install.md
    dev.md
    cli.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す（`internals/*` は公式が非サポートと明言する内部クレートのアーキテクチャ解説であり、通常の利用手順は `api/` を参照する）
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| fandhe-ai とは何か、11 クレート構成（公開 7 + 未公開 4）・設計思想、インストール手順、`compat::array` + `compat::Sequential` の最小例、公開/未公開クレート一覧と facade → fandhe-ai の対応を知りたい | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| cfg ベースのバックエンド切替と fail-fast 設計、バックエンド間の数値一致契約、kernel fusion を含む性能の考え方、ONNX / safetensors 相互運用の設計とサポート境界（利用は facade の `interop` から可能）を知りたい | guides | [references/guides/README.md](references/guides/README.md) |
| `tape()` / `tape_for(Device)` / `Tape`、`Var`、`Tensor`、`Gradients`、`LinearVars`、`Device`（Cpu / Cuda / Metal）、`AutodiffError` / `BackendError`、`compat::Sequential` / `compat::array` の型・API、`Var` のメソッド群（elementwise / reduction / shape・indexing / linalg / conv・pool・norm・attention / loss / FFT・STFT）、乱数・生成関数（`manual_seed` / `randn`）、高階微分・vmap・gradcheck（`jacobian` / `hessian`）、dtype・`TapeF64`、`DeviceParamStore`、CUDA / Metal 設定フラグ、compat の fit・callbacks・metrics・model io（save_model / load_model）・Functional API を知りたい | api | [references/api/README.md](references/api/README.md) |
| `fandhe_ai::optim` の optimizer（`Sgd` / `Adam` / `AdamW` ほか）、`ParamGroup`・state dict、`LrScheduler`、`GradScaler`・gradient clipping、EMA / SWA を知りたい | optim | [references/optim/README.md](references/optim/README.md) |
| `nn::Module` trait、`nn::Sequential` / `ModuleList` / `ModuleDict`、`nn::loss`、`nn::init`、RNN / LSTM / GRU、`Transformer`、`KvCache`、forward hooks を知りたい | nn | [references/nn/README.md](references/nn/README.md) |
| `Dataset` / `DataLoader` / `Sampler`、`IterableDataset`・prefetch、`text::TextVectorization` を知りたい | data | [references/data/README.md](references/data/README.md) |
| `interop::onnx`（`OnnxModel` の import / 推論 / export）、safetensors・`.npy` / `.npz` の読み書き、`model::ModelRegistry` を知りたい | interop | [references/interop/README.md](references/interop/README.md) |
| `inference::generate`（自己回帰生成）、speculative decoding、`BatchScheduler`、`predict_batches` と推論フェーズ計測を知りたい | inference | [references/inference/README.md](references/inference/README.md) |
| `tensor-core`（buffer/device/dispatch/memory_stats/pool/typed, `BackendOps`）や `FusionPlan` / `FusedOpKind` などの kernel fusion 表現、dynamic-tape autodiff の内部実装、CPU/CUDA/Metal 各バックエンドクレートの実装構造、公開済みの `onnx-interop` と未公開の `bench-harness` クレートの実装構造を知りたい（いずれも公式非サポートの内部 API） | internals | [references/internals/README.md](references/internals/README.md) |
| CI changeset 判定 CLI `guardrail`（check / eval）、`self-repair`（run / verify-log）、`guardrail.toml` / `policy-exclusion.toml` と判定/評価レポート JSON の形式を知りたい | tooling | [references/tooling/README.md](references/tooling/README.md) |
| `compat::array` + `compat::Sequential` の最小推論、shape 確認、`tape_for(Device)` でのバックエンド明示指定とフォールバック、手動 SGD 学習ループ、`fit` + callbacks、DataLoader、TextVectorization、optimizer + LR スケジューラ、safetensors / npy・npz の保存と復元、ONNX external data、自己回帰生成と BatchScheduler・speculative、参照モデル（MLP / LeNet / ResNet / Transformer）、`predict()` と `Tape` + `forward()` の推論経路比較、`Var::matmul`（GEMM）の簡易ベンチなど典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| crate 導入コマンド（crates.io / Git / Path 依存）、サンプル実行・ビルド・テスト・静的検査、`guardrail` / `self-repair` バイナリのコマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
