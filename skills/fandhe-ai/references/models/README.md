# models

| Name | Description | Path |
|------|-------------|------|
| Mlp / LeNet | `compat::Sequential::add_*` だけを組み合わせた薄いラッパーの参照モデル（全結合分類器と Conv2d 2 層 + Dense 2 層の CNN）。 | [mlp-lenet.md](./mlp-lenet.md) |
| ResNet / ResNetBlock | CIFAR 版 ResNet（`depth = 6n + 2`・BasicBlock・option B shortcut）と、観察専用の `ResNetBlock`。 | [resnet.md](./resnet.md) |
| TransformerClassifier / TransformerClassifierConfig | エンコーダだけの Transformer 分類器と、その構成値（`cifar10` プリセット付き）。 | [transformer-classifier.md](./transformer-classifier.md) |
