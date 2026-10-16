# api

| Name | Description | Path |
| --- | --- | --- |
| 高階微分・関数変換・gradcheck・hooks・custom function | `Tape` に生えた高階微分（`backward_create_graph` / `jacobian` / `hessian` / `vjp` / `hvp`…） | [autodiff-transforms.md](./autodiff-transforms.md) |
| CUDA / Metal 実行設定フラグとメモリプール | crate ルートの自由関数として公開されるバックエンド実行設定: デバイスメモリプールの解放・統計、CUDA の GEMM 精度… | [backend-tuning.md](./backend-tuning.md) |
| compat::array | NumPy の `np.array` 慣習に従ってテンソルを構築する関数。ネストされた `Vec`/配列から形状を自動推論… | [compat-array.md](./compat-array.md) |
| compat: Callback / EarlyStopping / ModelCheckpoint / ロガー | `Sequential::fit_with_callbacks` 系へ `&mut [Callback]` として渡す epoch 境界のホスト側制御 callback… | [compat-callbacks.md](./compat-callbacks.md) |
| compat: Functional API（FunctionalBuilder / FunctionalModel） | Keras Functional API 相当の多入力・多出力グラフ。層ノードからなる DAG を `FunctionalBuilder` で組み立て… | [compat-functional.md](./compat-functional.md) |
| compat: Metrics / MetricsResult | `Sequential::fit_with_metrics` の分類 metrics（accuracy / precision / recall / F1 / 混同行列）… | [compat-metrics.md](./compat-metrics.md) |
| compat: save_model / load_model | `compat::Sequential`（および Functional モデル）を層構成ごとディレクトリへ保存・復元する入口 4 本と `ModelIoError`… | [compat-model-io.md](./compat-model-io.md) |
| compat::Sequential / SequentialVars | Keras 風のレイヤー積み上げビルダー。`add_*` はメソッドチェーンで `Self` を返し… | [compat-sequential.md](./compat-sequential.md) |
| compat: compile / fit / evaluate / AMP / train step | Keras 風の学習 API。`compat::Sequential` に `compile`（optimizer / loss の設定）、`fit` 系（学習）… | [compat-training.md](./compat-training.md) |
| DeviceParamStore（デバイス常駐パラメータ更新） | `Tape` の寿命とは独立に、全パラメータと optimizer 状態を単一の連結デバイスバッファへ常駐させる状態機械… | [device-param-store.md](./device-param-store.md) |
| Device | テンソル演算の実行先デバイスを指定する enum。`Copy` を実装し値渡しが安価。 | [device.md](./device.md) |
| dtype 抽象（Scalar / CastDType / TypedOps / TapeF64） | f32 以外の dtype を扱うための 3 系統: ① dtype タグと封印 trait… | [dtype.md](./dtype.md) |
| AutodiffError / BackendError / ShapeError / CreationError / RngError | autodiff 公開 API・バックエンド抽象層・テンソル生成が返すエラー型。いずれも `#[non_exhaustive]` で… | [errors.md](./errors.md) |
| Gradients | `Tape::backward()` が返す、`Var` ごとの勾配を格納するコンテナ。到達不能ノードとゼロ勾配ノードを区別するため `Option` を用いる。 | [gradients.md](./gradients.md) |
| LinearVars | `Linear::bind()` から返される、1 回の訓練ステップ分の線形層パラメータ（weight / bias）を表す構造体。 | [linear-vars.md](./linear-vars.md) |
| 乱数・決定性・テンソル生成関数 | crate ルートの乱数生成（`manual_seed` / `randn` / `rand` / `randint` / `bernoulli`…）… | [random-creation.md](./random-creation.md) |
| Tape / tape() / tape_for() / TapeRef | `Tape` は `fandhe_ai_autodiff::Tape` の newtype ラッパー。composition root 関数 `tape()` / `tape_for()` が構築する唯一の入口… | [tape.md](./tape.md) |
| Tensor | `fandhe-ai` の中核データ構造。多次元配列を表し、`Arc` による共有ストレージでゼロコピーの view 系操作… | [tensor.md](./tensor.md) |
| Var: elementwise / activation / comparison | `Var` の要素ごと演算（算術・数学関数・活性化・比較・非有限値処理・低精度 forward）のメソッド一覧… | [var-elementwise.md](./var-elementwise.md) |
| Var: matmul / linear algebra | `Var` の行列積・einsum・テンソル積・行列操作・線形代数（逆行列 / solve / det / Cholesky / QR / SVD…）… | [var-linalg.md](./var-linalg.md) |
| Var: loss methods | `Var` に生えた損失関数メソッド 25 種。`self` が予測値（logits / input）。 | [var-losses.md](./var-losses.md) |
| Var: conv / pool / norm / dropout / attention | `Var` のニューラルネット向け関数形メソッド（畳み込み・プーリング・正規化・dropout・embedding・attention…）… | [var-nn-ops.md](./var-nn-ops.md) |
| Var: reduction / statistics / sort | `Var` の縮約（sum / mean / max / min / prod / logsumexp / norm）、統計（std / var / median / quantile）… | [var-reduction.md](./var-reduction.md) |
| Var: shape / view / indexing | `Var` の形状変換・view・連結分割・パディング・インデックス読み出し／更新（gather / scatter / `index_*` / `masked_*`）… | [var-shape-indexing.md](./var-shape-indexing.md) |
| Var: FFT / STFT | `Var` の FFT（rfft / irfft / fft / ifft）と短時間 FFT（stft / istft）メソッド… | [var-signal.md](./var-signal.md) |
| Var | テープ上の 1 ノードを表す型。値そのものではなく `NodeId` と共有された `Tape` への参照を保持し… | [var.md](./var.md) |
