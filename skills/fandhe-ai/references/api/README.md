# api

`Tensor` / autodiff / tape は fandhe-ai 独自の Rust API。apple-ml の MLMultiArray、apple-silicon の MLX `mx.array`、nvidia-cuda / amd-rocm の GPU API とは別物。

| Name | Description | Path |
| --- | --- | --- |
| 高階微分・関数変換・gradcheck・hooks・custom function | `Tape` に生えた高階微分（`backward_create_graph` / `jacobian` / `hessian` / `vjp` / `hvp` / `jvp` / `jacfwd`）、関数変換 `vmap`、gradcheck・異常検出、拡張点（`custom` / `register_backward_hook`）。 | [autodiff-transforms.md](./autodiff-transforms.md) |
| CUDA / Metal 実行設定フラグとメモリプール | crate ルートの自由関数によるバックエンド実行設定。デバイスメモリプールの統計・解放、CUDA の GEMM 精度（TF32 / 3×TF32）・CUDA Graph・managed memory、Metal の split-K GEMM など。プロセスワイドの設定。 | [backend-tuning.md](./backend-tuning.md) |
| compat::array | NumPy の `np.array` 慣習でテンソルを構築する関数。ネストされた `Vec` / 配列から形状を自動推論し、`Tensor::new` に委譲する。 | [compat-array.md](./compat-array.md) |
| compat: Callback / EarlyStopping / ModelCheckpoint / ロガー | `Sequential::fit_with_callbacks` へ渡す epoch 境界のホスト側制御 callback（`Callback` enum、`EarlyStopping` / `ModelCheckpoint` / `LrSchedule` / `CsvLogger` / `JsonLogger` / `EmaCallback` など）。 | [compat-callbacks.md](./compat-callbacks.md) |
| compat: Functional API（FunctionalBuilder / FunctionalModel） | Keras Functional API 相当の多入力・多出力 DAG。`FunctionalBuilder` で層ノードを組み立て、`build` で `FunctionalModel` に確定する。挿入順がそのまま forward 順になる。 | [compat-functional.md](./compat-functional.md) |
| compat: Metrics / MetricsResult | `Sequential::fit_with_metrics` の分類 metrics（accuracy / precision / recall / F1 / 混同行列）。validation バッチごとに集計し、epoch 末に `MetricsResult` へ確定する。 | [compat-metrics.md](./compat-metrics.md) |
| compat: save_model / load_model | `compat::Sequential` を層構成ごとディレクトリへ保存・復元する入口 4 本と `ModelIoError`。`manifest.json` と `model.<gen>.safetensors`（F32 重み）の 2 ファイル構成。 | [compat-model-io.md](./compat-model-io.md) |
| compat::Sequential / SequentialVars | Keras 風のレイヤー積み上げビルダー。`add_*` はメソッドチェーンで `Self` を返し、`predict` / `forward` で推論する。レイヤーは `nn::Module` 実装のヘテロジニアスなコレクション。 | [compat-sequential.md](./compat-sequential.md) |
| compat: compile / fit / evaluate / AMP / train step | Keras 風の学習 API。`compat::Sequential` に `compile`（optimizer / loss の設定）・`fit` 系・`evaluate` が生え、設定型 `FitConfig` / `AmpConfig` などを使う。 | [compat-training.md](./compat-training.md) |
| DeviceParamStore（デバイス常駐パラメータ更新） | `Tape` の寿命とは独立に、全パラメータと optimizer 状態を単一の連結デバイスバッファへ常駐させる状態機械。学習ステップごとの再アップロードを開始時 1 回に縮退する。 | [device-param-store.md](./device-param-store.md) |
| Device | テンソル演算の実行先デバイスを指定する enum。`Copy` を実装し値渡しが安価。 | [device.md](./device.md) |
| dtype 抽象（Scalar / CastDType / TypedOps / TapeF64） | f32 以外の dtype を扱う 3 系統。dtype タグと封印 trait（`Scalar` / `CastDType`）、`Var` を経由しない `TypedOps<T>`、f64 専用の自動微分グラフ（`TapeF64` / `VarF64` / `GradientsF64`）。 | [dtype.md](./dtype.md) |
| AutodiffError / BackendError / ShapeError / CreationError / RngError | autodiff 公開 API・バックエンド抽象層・テンソル生成が返すエラー型。いずれも `#[non_exhaustive]` で、将来のバリアント追加に破壊的変更を伴わない。 | [errors.md](./errors.md) |
| Gradients | `Tape::backward()` が返す、`Var` ごとの勾配を格納するコンテナ。到達不能ノードとゼロ勾配ノードを区別するため `Option` を用いる。 | [gradients.md](./gradients.md) |
| LinearVars | `Linear::bind()` から返される、1 回の訓練ステップ分の線形層パラメータ（weight / bias）を表す構造体。 | [linear-vars.md](./linear-vars.md) |
| 乱数・決定性・テンソル生成関数 | crate ルートの乱数生成（`manual_seed` / `randn` / `rand` / `randint` / `bernoulli` など）、決定論モード、テンソル生成（`arange` / `linspace` / `eye` など）、bool テンソルの論理演算。 | [random-creation.md](./random-creation.md) |
| Tape / tape() / tape_for() / TapeRef | `Tape` は `fandhe_ai_autodiff::Tape` の newtype ラッパー。composition root 関数 `tape()` / `tape_for()` が構築する唯一の入口。 | [tape.md](./tape.md) |
| Tensor | `fandhe-ai` の中核データ構造。多次元配列を表し、`Arc` による共有ストレージでゼロコピーの view 系操作（transpose / narrow / reshape の contiguous ケース）を実現する。 | [tensor.md](./tensor.md) |
| Var: elementwise / activation / comparison | `Var` の要素ごと演算（算術・数学関数・活性化・比較・非有限値処理・低精度 forward）のメソッド一覧。 | [var-elementwise.md](./var-elementwise.md) |
| Var: matmul / linear algebra | `Var` の行列積・einsum・テンソル積と線形代数（逆行列 / solve / det / Cholesky / QR / SVD など）のメソッド一覧。多出力は出力ごとに別ノードとして記録される。 | [var-linalg.md](./var-linalg.md) |
| Var: loss methods | `Var` に生えた損失関数メソッド 25 種。`self` が予測値（logits / input）。構造体ラッパーは `nn/loss.md` を参照。 | [var-losses.md](./var-losses.md) |
| Var: conv / pool / norm / dropout / attention | `Var` のニューラルネット向け関数形メソッド（畳み込み・プーリング・正規化・dropout・embedding・attention・RNN セルなど）。層（`nn::Module`）ではなく `Var` に直接生えた API。 | [var-nn-ops.md](./var-nn-ops.md) |
| Var: reduction / statistics / sort | `Var` の縮約（sum / mean / max / min / prod / logsumexp / norm）、統計（std / var / median / quantile）、累積演算、ソート・top-k・unique のメソッド一覧。 | [var-reduction.md](./var-reduction.md) |
| Var: shape / view / indexing | `Var` の形状変換・view・連結分割・パディング・インデックス読み出し／更新（gather / scatter / `index_*` / `masked_*`）のメソッド一覧。 | [var-shape-indexing.md](./var-shape-indexing.md) |
| Var: FFT / STFT | `Var` の FFT（rfft / irfft / fft / ifft）と短時間 FFT（stft / istft）のメソッド。複素数は末尾次元 2 の f32 実テンソル `(re, im)` で表す。 | [var-signal.md](./var-signal.md) |
| Var | テープ上の 1 ノードを表す型。`NodeId` と共有された `Tape` への参照を保持し、値の取り出し・テープ間の移動・基本四則を扱う。系統別の演算は `var-*` ページに分割している。 | [var.md](./var.md) |
