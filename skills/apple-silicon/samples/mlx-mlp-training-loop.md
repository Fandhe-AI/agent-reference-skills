# MLX MLP Training Loop

Define a multi-layer perceptron as an `nn.Module`, get a combined loss-and-gradient function with `nn.value_and_grad`, and run an SGD training loop with `optim.SGD.update`.

```python
import mlx.core as mx
import mlx.nn as nn
import mlx.optimizers as optim
import numpy as np


class MLP(nn.Module):
    def __init__(self, num_layers: int, input_dim: int, hidden_dim: int, output_dim: int):
        super().__init__()
        layer_sizes = [input_dim] + [hidden_dim] * num_layers + [output_dim]
        self.layers = [
            nn.Linear(idim, odim)
            for idim, odim in zip(layer_sizes[:-1], layer_sizes[1:])
        ]

    def __call__(self, x):
        for l in self.layers[:-1]:
            x = mx.maximum(l(x), 0.0)
        return self.layers[-1](x)


def loss_fn(model, X, y):
    return mx.mean(nn.losses.cross_entropy(model(X), y))


def eval_fn(model, X, y):
    return mx.mean(mx.argmax(model(X), axis=1) == y)


def batch_iterate(batch_size, X, y):
    perm = mx.array(np.random.permutation(y.size))
    for s in range(0, y.size, batch_size):
        ids = perm[s : s + batch_size]
        yield X[ids], y[ids]


num_layers = 2
hidden_dim = 32
num_classes = 10
batch_size = 256
num_epochs = 10
learning_rate = 1e-1

model = MLP(num_layers, train_images.shape[-1], hidden_dim, num_classes)
mx.eval(model.parameters())

# nn.value_and_grad wraps loss_fn so a single call returns both the loss
# value and the gradient with respect to every trainable parameter in
# the model — not to be confused with mx.core.value_and_grad, which
# differentiates a plain function rather than a Module.
loss_and_grad_fn = nn.value_and_grad(model, loss_fn)
optimizer = optim.SGD(learning_rate=learning_rate)

for e in range(num_epochs):
    for X, y in batch_iterate(batch_size, train_images, train_labels):
        loss, grads = loss_and_grad_fn(model, X, y)

        # Updates the optimizer's internal state (e.g. momentum) and the
        # model's parameters together in one call.
        optimizer.update(model, grads)

        # Nothing above has actually run yet (MLX is lazy); this eval
        # forces one full forward+backward+update per batch.
        mx.eval(model.parameters(), optimizer.state)

    accuracy = eval_fn(model, test_images, test_labels)
    print(f"Epoch {e}: Test accuracy {accuracy.item():.3f}")
```

## Notes

- MLX is Apple's open-source array framework (ml-explore), not Core ML; Core ML / Create ML / Vision are covered by the separate apple-ml skill.
- `mx.eval(model.parameters(), optimizer.state)` is what actually runs the batch; everything before it (the forward pass, the loss, the gradients, the optimizer update) only extends the recorded compute graph.
- The model reaches roughly 95% test accuracy after a few epochs over MNIST, per the source doc.
- Derived from the official MLX documentation source `docs/src/examples/mlp.rst` at tag v0.32.0 (MIT License), and the official ml-explore/mlx-examples sample "mnist" (MIT License), commit 796f5b53cab69a3d48a44233ce21aae889e94a08 (the repository has no tags).
