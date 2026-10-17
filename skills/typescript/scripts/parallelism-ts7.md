---
source: https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/
---

# Parallelism (TypeScript 7)

TypeScript 7.0 の並列化制御フラグ。`--checkers` / `--builders` は実験的フラグ。

## 型チェックワーカー数の指定

```sh
tsc --checkers 8
```

既定は 4。CI など CPU・メモリが少ない環境では減らせ、`--checkers 1` で型チェックが単一スレッドになる。まれに順序依存の結果が変わるため、環境間で値を固定する運用が公式に示されている。

## プロジェクト参照ビルダー数の指定

```sh
tsc --build --builders 4
```

`--build` 時に並列実行するプロジェクト参照ビルダー数を制御する。`--checkers` と乗算的に効くため、`--checkers 4 --builders 4` は最大 16 の型チェッカーが同時に動き得る（ブログの例）。

## 単一スレッドモード

```sh
tsc --singleThreaded
```

型チェックワーカーを 1 に制限し、パース・emit も単一スレッドにする。デバッグ、6 と 7 の性能比較、外部での並列オーケストレーション、リソースの限られた環境向け。
