// 測定スクリプトの出力封筒 {nonce, payload, sha256}（scripts/lib/signed-output.sh）をテストから扱う共通ハーネス
// （Issue #603 第 1 弾）。ファイル名が `*.test.mjs` に一致しないため node --test の glob には拾われない。
//
// 検証側の実装（ホストの verifySignedOutput / canonicalJson / sha256Hex）とは独立に node:crypto で計算する。
// ホストと同じ関数でスタブの応答を作ると、ホストの定義が壊れたときに期待値も一緒に壊れて検出できないため。
//
// - signedReply(prompt, payload): プロンプトのコマンドから nonce を取り出して正しい封筒を作る
//   （エージェントがスクリプトを実行して転記した結果を模す）
// - wrapAgentReply(prompt, value): 値が通常のオブジェクトなら封筒にし、null / Error / 既に封筒の形のものはそのまま返す
//   （既存テストの agent スタブが返していた平らな測定値を、封筒に変換して再利用するための薄いアダプタ）
import { createHash } from 'node:crypto'
import { spawnSync } from 'node:child_process'
import { existsSync, realpathSync } from 'node:fs'

// payload の正規形: キー昇順・空白なしの JSON（値は整数と ASCII 文字列だけを想定する）
export function canonicalPayload(payload) {
  const enc = (x) =>
    Array.isArray(x)
      ? `[${x.map(enc).join(',')}]`
      : x && typeof x === 'object'
        ? `{${Object.keys(x).sort().map((k) => `${JSON.stringify(k)}:${enc(x[k])}`).join(',')}}`
        : JSON.stringify(x)
  return enc(payload)
}

// 封筒の sha256 の入力: nonce + 改行 + payload の正規形
export function expectedSha256(nonce, payload) {
  return createHash('sha256').update(`${nonce}\n${canonicalPayload(payload)}`, 'utf8').digest('hex')
}

export function makeEnvelope(nonce, payload) {
  return { nonce, payload, sha256: expectedSha256(nonce, payload) }
}

// プロンプト中のコマンド行 `... --nonce <nonce> ...` から nonce を取り出す。無ければ null
export function nonceOf(prompt) {
  const m = /--nonce ([0-9a-z]{1,64})/.exec(String(prompt))
  return m ? m[1] : null
}

// プロンプトのコマンドが測定対象として束縛する入力。残置バイトは標準入力のヒアドキュメント本文（パスを
// 改行で連結したもの）、空き容量は `-- '<path>'` の 1 件。無ければ null
export function commandInputOf(prompt) {
  const here = /<<'(PATHSEOF_[0-9a-z]+)'\n([\s\S]*?)\n\1\n/.exec(String(prompt))
  if (here) return here[2]
  const arg = /--nonce [0-9a-z]+ -- '([^']*)'\n/.exec(String(prompt))
  return arg ? arg[1] : null
}

export function inputSha256(text) {
  return createHash('sha256').update(text, 'utf8').digest('hex')
}

// 正直なエージェント（コマンドをそのまま実行して転記した）の応答。スクリプトは入力の sha256 を payload の
// inputSha256 に入れる（Issue #603 S2）ので、プロンプトのコマンドから同じ値を作って補う
export function signedReply(prompt, payload) {
  const nonce = nonceOf(prompt)
  if (nonce === null) throw new Error('プロンプトに --nonce <nonce> のコマンドが無い')
  const input = commandInputOf(prompt)
  let full = input !== null && !('inputSha256' in payload) ? { ...payload, inputSha256: inputSha256(input) } : payload
  // 残置バイト測定の正直なスクリプトは dup（同じ実体の別の綴りとして測らなかった行数）を必ず出す。重複を伴わない
  // 既存のスタブは 0 を補う。dup が欠けた・不整合な封筒を試すテストは、これを通さず makeEnvelope で直接作る
  if ('kib' in full && 'missing' in full && 'count' in full && !('dup' in full)) full = { ...full, dup: 0 }
  return makeEnvelope(nonce, full)
}

// 起動時のハッシュ予検査（label: script-hash-precheck）への正直な応答。プロンプトのヒアドキュメントから表を取り出し、
// 全行が実ファイルと一致したとき（既定）の封筒を返す。overrides でカウントを差し替えて版ずれ・欠落を模せる
export function hashPrecheckReply(prompt, overrides = {}) {
  const nonce = nonceOf(prompt)
  const m = /<<'(HASHESEOF_[0-9a-z]+)'\n([\s\S]*?)\n\1\n/.exec(String(prompt))
  if (nonce === null || !m) throw new Error('プロンプトに --verify-only のコマンドが無い')
  const count = m[2].split('\n').length
  return makeEnvelope(nonce, { count, firstBad: 0, inputSha256: inputSha256(m[2]), mismatch: 0, missing: 0, ok: count, ...overrides })
}

export function wrapAgentReply(prompt, value) {
  if (value === null || value === undefined || value instanceof Error) return value
  if (typeof value !== 'object' || Array.isArray(value)) return value
  if ('payload' in value && 'sha256' in value && 'nonce' in value) return value
  return signedReply(prompt, value)
}

// 実行できる bash の一覧（実体パスで重複除去）。macOS では /bin/bash（3.2）と Homebrew の bash が両方あり得る。
// どれも使えなければ PATH の bash を 1 つだけ返す
export function availableBashes() {
  const seen = new Set()
  const out = []
  for (const p of ['/bin/bash', '/usr/bin/bash', '/opt/homebrew/bin/bash', '/usr/local/bin/bash']) {
    if (!existsSync(p)) continue
    const real = realpathSync(p)
    if (seen.has(real)) continue
    seen.add(real)
    out.push(p)
  }
  if (out.length === 0) out.push('bash')
  return out
}

export function toolExists(name) {
  return spawnSync('sh', ['-c', `command -v ${name}`], { encoding: 'utf8' }).status === 0
}
