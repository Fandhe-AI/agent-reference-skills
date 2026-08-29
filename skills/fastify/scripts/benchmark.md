---
source: https://raw.githubusercontent.com/fastify/fastify/v5.12.1/docs/Guides/Benchmarking.md
---

# benchmark

Fastify 本体のベンチマーク実行コマンド集（v5.12.1 時点の Guides/Benchmarking.md 由来）。Autocannon（HTTP ベンチマーク）・Branch-comparer（複数ブランチ比較）・Concurrently・Npx を使用する。

## 現在のブランチでベンチマークを実行

```sh
npm run benchmark
```

## 異なる Node.js バージョンでベンチマークを実行

```sh
npx -p node@10 -- npm run benchmark
```

## 複数ブランチでベンチマークを比較

```sh
branchcmp --rounds 2 --script "npm run benchmark"
```

## 現在のブランチと main を比較（gitflow）

```sh
branchcmp --rounds 2 --gitflow --script "npm run benchmark"
```

`npm run bench` は上記 gitflow 比較のショートハンドとして提供されている。

```sh
npm run bench
```

## サーバー起動と autocannon での負荷テストを同時実行

```sh
branchcmp --rounds 2 -s "node ./node_modules/concurrently -k -s first \"node ./examples/asyncawait.js\" \"node ./node_modules/autocannon -c 100 -d 5 -p 10 localhost:3000/\""
```
