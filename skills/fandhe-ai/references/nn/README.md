# nn

| Name | Description | Path |
|------|-------------|------|
| nn::Sequential / ModuleList / ModuleDict | facade の nn::Module 実装を保持するコンテナ 3 種。ModuleList（forward を持たない保持器）… | [containers.md](./containers.md) |
| Forward hooks（ForwardHooked / ForwardHookCtx） | facade の nn::Module 実装を包み、forward 完了直後に観察専用 hook を 1 回呼ぶラッパー ForwardHooked<M>… | [forward-hooks.md](./forward-hooks.md) |
| nn::init（重み初期化関数） | PyTorch torch.nn.init.* 相当の重み初期化関数群。初期化関数 9 個と補助 4 個… | [init.md](./init.md) |
| nn::kv_cache（KvCache / StatefulAttention / MultiheadAttentionConfig） | KV キャッシュ付き self-attention。KvCache・StatefulAttention・MultiheadAttentionConfig… | [kv-cache.md](./kv-cache.md) |
| nn::loss（損失構造体 14 種 + Reduction / オプション型） | PyTorch nn.MSELoss / nn.CrossEntropyLoss 等に相当する損失構造体 14 種と引数型 10 種… | [loss.md](./loss.md) |
| nn::Module / TapeRef / nn::summary | facade 利用者が独自層を定義するための trait nn::Module（required は forward の 1 件、… | [module.md](./module.md) |
| nn::rnn（Rnn / Lstm / Gru / Stacked* / RnnConfig / PackedSequence） | RNN / LSTM / GRU の Sequence レベル API（fandhe_ai_autodiff::nn からの純再エクスポート）… | [rnn.md](./rnn.md) |
| nn::Transformer / TransformerConfig / TransformerDecoderLayer | PyTorch nn.Transformer（encoder-decoder 全体）と nn.TransformerDecoderLayer 相当の型… | [transformer.md](./transformer.md) |
