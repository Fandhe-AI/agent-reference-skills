# nn

| Name | Description | Path |
|------|-------------|------|
| nn::Sequential / ModuleList / ModuleDict | facade の `nn::Module` 実装を保持するコンテナ 3 種。`ModuleList`（forward を持たない保持器）、`Sequential`（層順に適用）、`ModuleDict`。 | [containers.md](./containers.md) |
| Forward hooks（ForwardHooked / ForwardHookCtx） | `nn::Module` を包み、forward 完了直後に観察専用 hook を 1 回呼ぶ `ForwardHooked<M>` と、hook に渡す ctx 型 `ForwardHookCtx`。 | [forward-hooks.md](./forward-hooks.md) |
| nn::init（重み初期化関数） | PyTorch `torch.nn.init.*` 相当の重み初期化関数群。初期化関数 9 個と補助 4 個の純再エクスポート。 | [init.md](./init.md) |
| nn::kv_cache（KvCache / StatefulAttention / MultiheadAttentionConfig） | KV キャッシュ付き self-attention。`KvCache` / `StatefulAttention` / `MultiheadAttentionConfig` を再エクスポートする。 | [kv-cache.md](./kv-cache.md) |
| nn::loss（損失構造体 14 種 + Reduction / オプション型） | PyTorch `nn.MSELoss` / `nn.CrossEntropyLoss` 等に相当する損失構造体 14 種と、`Reduction` などの引数型 10 種の再エクスポート。 | [loss.md](./loss.md) |
| nn::Module / TapeRef / nn::summary | 独自層を定義する trait `nn::Module`（required は `forward` の 1 件）、借用ハンドル `TapeRef`、層構造を文字列化する `nn::summary`。 | [module.md](./module.md) |
| nn::rnn（Rnn / Lstm / Gru / Stacked* / RnnConfig / PackedSequence） | RNN / LSTM / GRU の Sequence レベル API。単層の `Rnn` / `Lstm` / `Gru`、多層・双方向の `Stacked*`、`PackedSequence` を提供する。 | [rnn.md](./rnn.md) |
| nn::Transformer / TransformerConfig / TransformerDecoderLayer | PyTorch `nn.Transformer`（encoder-decoder 全体）と `nn.TransformerDecoderLayer` 相当の型。構築と学習は `compat::Sequential` 経由。 | [transformer.md](./transformer.md) |
