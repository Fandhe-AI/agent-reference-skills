# Edge Functions WASM サポート

Edge Functions での WebAssembly モジュールの利用方法。

## 概要

Edge Functions は WebAssembly（WASM）をネイティブサポートしており、Rust、Go、C/C++ などからコンパイルした WASM モジュールを読み込んで実行できる。CPU 負荷の高い処理（画像処理、暗号計算、データ変換等）を WASM で実行することで、JavaScript/TypeScript よりも高いパフォーマンスを得られる場合がある。

### WASM の利点

- **パフォーマンス**: CPU バウンドな処理で JavaScript よりも高速
- **言語の選択肢**: Rust、Go、C/C++ 等で実装可能
- **ポータビリティ**: 異なるプラットフォーム間でバイナリ互換
- **セキュリティ**: サンドボックス化された実行環境

## コード例

### WASM モジュールの読み込みと実行（基本）

```typescript
// supabase/functions/wasm-example/index.ts

// WASM ファイルを読み込み
const wasmCode = await Deno.readFile(
  new URL('./module.wasm', import.meta.url),
)

// WASM モジュールをインスタンス化
const wasmModule = new WebAssembly.Module(wasmCode)
const wasmInstance = new WebAssembly.Instance(wasmModule, {
  env: {
    // 必要に応じてインポート関数を定義
  },
})

// エクスポートされた関数を取得
const { add, multiply } = wasmInstance.exports as {
  add: (a: number, b: number) => number
  multiply: (a: number, b: number) => number
}

Deno.serve(async (req: Request) => {
  const { a, b, operation } = await req.json()

  let result: number
  switch (operation) {
    case 'add':
      result = add(a, b)
      break
    case 'multiply':
      result = multiply(a, b)
      break
    default:
      return new Response(
        JSON.stringify({ error: 'Unknown operation' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      )
  }

  return new Response(
    JSON.stringify({ result }),
    { headers: { 'Content-Type': 'application/json' } },
  )
})
```

### Rust から WASM をコンパイル

```rust
// src/lib.rs
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn fibonacci(n: u32) -> u64 {
    if n <= 1 {
        return n as u64;
    }
    let mut a: u64 = 0;
    let mut b: u64 = 1;
    for _ in 2..=n {
        let temp = b;
        b = a + b;
        a = temp;
    }
    b
}

#[wasm_bindgen]
pub fn sha256_hash(input: &str) -> String {
    use sha2::{Sha256, Digest};
    let mut hasher = Sha256::new();
    hasher.update(input.as_bytes());
    format!("{:x}", hasher.finalize())
}
```

```bash
# Rust WASM のビルド
cargo install wasm-pack
wasm-pack build --target web
# 出力: pkg/module_bg.wasm
```

### Rust WASM の Edge Function での利用

```typescript
// supabase/functions/rust-wasm/index.ts
import init, { fibonacci, sha256_hash } from './pkg/module.js'

// WASM を初期化（トップレベルで 1 回のみ）
await init()

Deno.serve(async (req: Request) => {
  const { action, value } = await req.json()

  switch (action) {
    case 'fibonacci': {
      const result = fibonacci(value)
      return new Response(
        JSON.stringify({ result: result.toString() }),
        { headers: { 'Content-Type': 'application/json' } },
      )
    }
    case 'hash': {
      const hash = sha256_hash(value)
      return new Response(
        JSON.stringify({ hash }),
        { headers: { 'Content-Type': 'application/json' } },
      )
    }
    default:
      return new Response(
        JSON.stringify({ error: 'Unknown action' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      )
  }
})
```

### ストリーミング WASM インスタンス化（大きなモジュール向け）

```typescript
// 大きな WASM モジュールの場合、ストリーミングインスタンス化を使用
const wasmResponse = await fetch(new URL('./large-module.wasm', import.meta.url))

const { instance } = await WebAssembly.instantiateStreaming(
  wasmResponse,
  {
    env: {
      log: (ptr: number, len: number) => {
        // WASM からのログ出力
        const memory = instance.exports.memory as WebAssembly.Memory
        const bytes = new Uint8Array(memory.buffer, ptr, len)
        console.log(new TextDecoder().decode(bytes))
      },
    },
  },
)

Deno.serve(async (req: Request) => {
  const processData = instance.exports.process_data as (input: number) => number
  const result = processData(42)

  return new Response(
    JSON.stringify({ result }),
    { headers: { 'Content-Type': 'application/json' } },
  )
})
```

### Go から WASM をコンパイル

```go
// main.go
package main

import (
	"syscall/js"
)

func add(this js.Value, args []js.Value) interface{} {
	a := args[0].Int()
	b := args[1].Int()
	return a + b
}

func main() {
	js.Global().Set("goAdd", js.FuncOf(add))
	select {} // Go ランタイムを維持
}
```

```bash
# Go WASM のビルド
GOOS=js GOARCH=wasm go build -o module.wasm main.go
```

## 注意点

- WASM ファイルはデプロイバンドルサイズに含まれる（圧縮後 20MB 制限）
- WASM モジュールの初期化はコールドスタート時間に影響するため、トップレベルで行うこと（リクエストハンドラの外）
- WASM 内からの I/O アクセスは制限される（ファイルシステム、ネットワークは直接不可）
- メモリ共有は `WebAssembly.Memory` を通じて行う
- `wasm-bindgen`（Rust）を使うと JavaScript/TypeScript との連携が容易
- Go WASM は `wasm_exec.js` ランタイムが必要だが、TinyGo を使うとより小さなバイナリになる
- WASM のデバッグは TypeScript より困難なため、充分なテストを行うこと
- Edge Functions のメモリ制限（256MB/512MB/1GB）は WASM のメモリ使用量にも適用される

## 関連

- [概要](./overview.md)
- [依存関係管理](./dependencies.md)
- [制限事項](./limits.md)
- [デプロイ](./deploy.md)
