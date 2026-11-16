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

// 方針パスのゲート（observe-pr.sh --mode policy-paths。Issue #760）への正直な応答。コマンドの --pr / --allow から入力のハッシュを作る
// （repo は空の args を前提）。over で件数を差し替えて計画外の変更・切り詰めを模せる
export function policyPathsReply(prompt, over = {}) {
  const pr = /--pr (\d+)/.exec(prompt)[1]
  const allow = /--allow (\S+)/.exec(prompt)?.[1] ?? ''
  const input = ['observe-pr', 'policy-paths', pr, '', '', '', '', '', '', allow].join('\n')
  return makeEnvelope(nonceOf(prompt), {
    mode: 'policy-paths', inputSha256: inputSha256(input), outcome: 'observed', err: 0, state: 'OPEN', files: 3, policy: 0, unplanned: 0, truncated: 0, ...over,
  })
}

// ---- repo-scan.sh（外部チェック App の観測・対象外ラベルの取得）----
// 入力の束縛 inputSha256 は sha256("repo-scan\n" + mode + "\n" + repo + 残りの欄を "\n" で連結)。ホスト・スクリプトの実装とは独立に計算する。
// skip-labels の残りの欄は [ノード番号のカンマ区切り（--numbers。Issue #807）, ...ラベル]。skipLabelsInputSha256 が組み立てる
export function repoScanInputSha256(mode, repo = '', rest = []) {
  return inputSha256(['repo-scan', mode, repo, ...rest].join('\n'))
}
export function skipLabelsInputSha256(repo, numbers, labels) {
  return repoScanInputSha256('skip-labels', repo, [numbers, ...labels])
}

// プロンプトの起動行 `... repo-scan.sh --mode M --nonce N [--repo R] [--numbers 1,2] [-- 'ラベル' ...]` を解釈する（単一引用符内の '\'' は ' に戻す）
export function parseRepoScanCommand(prompt) {
  const m = /repo-scan\.sh --mode (external-checks|skip-labels) --nonce (\S+?)(?: --repo (\S+?))?(?: --numbers ([0-9,]+))?(?: -- (.*))?$/m.exec(String(prompt))
  if (m === null) throw new Error('プロンプトに repo-scan.sh の起動行が無い')
  const labels = []
  if (m[5] !== undefined) {
    const re = /'((?:[^']|'\\'')*)'(?: |$)/g
    let t
    while ((t = re.exec(m[5])) !== null) labels.push(t[1].replace(/'\\''/g, "'"))
  }
  return { mode: m[1], nonce: m[2], repo: m[3] ?? '', numbers: m[4] ?? '', labels }
}

// 外部チェック観測（mode external-checks）の正直な応答。payload の既定は apps なし・失敗なし
export function externalChecksReply(prompt, over = {}) {
  const c = parseRepoScanCommand(prompt)
  return makeEnvelope(c.nonce, { apps: [], dropped: 0, errs: 0, inputSha256: repoScanInputSha256('external-checks', c.repo), prs: 3, ...over })
}

// 対象外ラベル取得（mode skip-labels）の正直な応答。entries = [{ i, numbers }]、failed の既定は entries に無い添字すべて
export function skipLabelsReply(prompt, { entries = [], absent = [], failed, ...over } = {}) {
  const c = parseRepoScanCommand(prompt)
  const have = new Set(entries.map((e) => e.i))
  const miss = c.labels.map((_, k) => k + 1).filter((i) => !have.has(i))
  return makeEnvelope(c.nonce, { absent, entries, failed: failed ?? miss, inputSha256: skipLabelsInputSha256(c.repo, c.numbers, c.labels), ...over })
}

// 既存テストの平らな応答 { entries: [{ i, x, numbers }] }（x = 1 は存在しないラベル）を封筒つきにする薄いアダプタ。
// 平らな形でない・null / Error・既に封筒の形のものはそのまま返す
export function wrapSkipLabelsReply(prompt, value) {
  if (value === null || value === undefined || value instanceof Error) return value
  if (typeof value !== 'object' || !Array.isArray(value.entries) || ['nonce', 'payload', 'sha256'].some((k) => k in value)) return value
  const entries = value.entries.map((e) => ({ i: e.i, numbers: e.numbers }))
  return skipLabelsReply(prompt, { entries, absent: value.entries.filter((e) => e.x === 1).map((e) => e.i) })
}

// 状態ファイルのハッシュ取得（label: state:load-verify[:pN]。scripts/state.sh verify。Issue #603 計画 C の P5）への正直な応答。
// 従来のスタブが返していた平らな照合入力 { fileExists, hashes, keysSha256, keysCount, highWaterBytes, highWaterVersion } を、
// プロンプトのコマンド（--nonce・--file・--page）に合わせた封筒へ変換する（1 ページ 100 件）。hashes を持たない不正な応答・
// null・Error・既に封筒のものはそのまま返す（フォールバックや停止の経路を試すテストのため）。
// 検証側の実装とは独立に node:crypto で組む。outcome は over で差し替えられる（error・nofile の観測）
export const STATE_VERIFY_PAGE = 100
export function stateVerifyReply(prompt, check, over = {}) {
  if (check === null || check === undefined || check instanceof Error || typeof check !== 'object') return check
  if ('payload' in check && 'sha256' in check) return check
  if (!('hashes' in check) || !('keysSha256' in check)) return check
  const nonce = nonceOf(prompt)
  const file = /--file (\S+)/.exec(String(prompt))?.[1]
  const page = Number(/--page (\d+)/.exec(String(prompt))?.[1] ?? 0)
  if (nonce === null || !file) throw new Error('プロンプトに state.sh verify のコマンドが無い')
  const keys = check.hashes && typeof check.hashes === 'object' ? Object.keys(check.hashes).sort() : []
  const entries = keys.slice(page * STATE_VERIFY_PAGE, (page + 1) * STATE_VERIFY_PAGE).map((k) => ({ h: check.hashes[k], k }))
  const base = { entries, highWaterBytes: check.highWaterBytes, highWaterVersion: check.highWaterVersion, inputSha256: inputSha256(`${file}\n${page}`), keysCount: check.keysCount, keysSha256: check.keysSha256, mode: 'verify', outcome: check.fileExists ? 'ok' : 'nofile', page, pages: Math.max(1, Math.ceil(keys.length / STATE_VERIFY_PAGE)) }
  return makeEnvelope(nonce, { ...base, ...over })
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

// ---- ツリー取得（scripts/fetch-tree.sh。Issue #668）----
// ホストの実装（treeNodesDigest 等）とは独立に node:crypto で計算する。ダイジェストの定義は
// scripts/lib/fetch-tree-lib.sh と同じ: 行 = number TAB parent TAB siblingIndex TAB state TAB subIssuesTotal TAB sha256hex(title)、
// number 昇順に改行で連結して SHA-256。
export function treeNodesSha256(nodes) {
  const h = (s) => createHash('sha256').update(String(s), 'utf8').digest('hex')
  const lines = [...nodes]
    .sort((a, b) => a.number - b.number)
    .map((n) => [n.number, n.parent, n.siblingIndex, n.state, n.subIssuesTotal, h(n.title)].join('\t'))
  return h(lines.join('\n'))
}

// 構造 5 欄だけ（title を除く）の structSha256（Issue #687）。ホストの treeStructDigest とは独立に計算する。
export function treeStructSha256(nodes) {
  const h = (s) => createHash('sha256').update(String(s), 'utf8').digest('hex')
  return h([...nodes].sort((a, b) => a.number - b.number).map((n) => [n.number, n.parent, n.siblingIndex, n.state, n.subIssuesTotal].join('\t')).join('\n'))
}

// タスク ID だけの taskIdSha256（Issue #687）。ホストの titleTaskId とは別に、正規表現も独立に書く。
const TASK_ID_RE = /^\s*(?:[a-z]+(?:\([^()\n]{0,64}\))?!?:\s*)?[[【]?([A-Z][A-Z0-9]{0,19}(?:-[0-9]{1,6}){1,4})(?=$|[\s\]】:：])/
export function treeTaskIdSha256(nodes) {
  const h = (s) => createHash('sha256').update(String(s), 'utf8').digest('hex')
  return h([...nodes].sort((a, b) => a.number - b.number).map((n) => `${n.number}\t${TASK_ID_RE.exec(n.title)?.[1] ?? ''}`).join('\n'))
}

// opt-in テスト宣言（第 7 欄 optinTests）の optinSha256。ホストの treeOptinDigest とは独立に計算する。
// 行 = number TAB optinTests の compact JSON（無ければ []）、number 昇順・改行連結で SHA-256。
export function treeOptinSha256(nodes) {
  const h = (s) => createHash('sha256').update(String(s), 'utf8').digest('hex')
  return h([...nodes].sort((a, b) => a.number - b.number).map((n) => `${n.number}\t${JSON.stringify(n.optinTests ?? [])}`).join('\n'))
}

export function treeInputSha256(root, repo = '') {
  return inputSha256(`fetch-tree\n${root}\n${repo}`)
}

// args.repo を渡さないランで、ツリー取得の封筒が返すツリーのリポジトリ（ホストはこれで repo-scan.sh を束縛する。Issue #808）
export const TREE_DEFAULT_REPO = 'o/r'

// プロンプトのコマンド `... --nonce N --root R [--repo O/R]` から封筒を作る（正直なエージェントが fetch-tree.sh を実行して転記した結果）。
// nodes = エージェントが書き写した nodes。opts.digestNodes = スクリプトが見た『真の内容』（既定は nodes）で、書き写しの誤りを模すには
// nodes だけを書き換える。opts.nonce / opts.payload / opts.sha256 / opts.omit / opts.failure で封筒の欠落・不整合・失敗申告を模す。
export function treeFetchReply(prompt, nodes, opts = {}) {
  const nonce = nonceOf(prompt)
  const root = /--root (\d+)/.exec(String(prompt))?.[1]
  const repo = /--repo ([A-Za-z0-9._/-]+)/.exec(String(prompt))?.[1] ?? ''
  if (nonce === null || root === undefined) throw new Error('プロンプトに fetch-tree.sh のコマンドが無い')
  const truth = opts.digestNodes ?? nodes
  // repo: fetch-tree.sh は --repo があればその値、無ければルートの repository_url（偽 gh の既定は o/r）を出す（Issue #808）
  const payload = { count: truth.length, inputSha256: treeInputSha256(root, repo), nodesSha256: treeNodesSha256(truth), optinSha256: treeOptinSha256(truth), pages: 1, repo: repo || TREE_DEFAULT_REPO, structSha256: treeStructSha256(truth), taskIdSha256: treeTaskIdSha256(truth), ...(opts.payload ?? {}) }
  const env = makeEnvelope(opts.nonce ?? nonce, payload)
  const out = { nodes, nonce: env.nonce, payload: env.payload, sha256: opts.sha256 ?? env.sha256 }
  // failure 申告（{ exitCode, stderr } か旧形式の文字列）。正直なエージェントは封筒を作らないので既定では封筒の欄を出さない
  // （opts.withEnvelope = true で封筒つきの failure を模す）
  if (opts.failure !== undefined) {
    out.failure = opts.failure
    if (!opts.withEnvelope) for (const k of ['nonce', 'payload', 'sha256']) delete out[k]
  }
  for (const k of opts.omit ?? []) delete out[k]
  return out
}

// ページ経路（Issue #690）。取得の封筒（pages >= 2）: nodes は空、payload は全体の真の内容に対する値と pages / dir / tsvSha256。
export function treePagesFetchReply(prompt, truth, { pages, dir, tsvSha, payload = {}, nonce } = {}) {
  return treeFetchReply(prompt, [], { digestNodes: truth, nonce, payload: { pages, dir, tsvSha256: tsvSha, ...payload } })
}

// ページ読みの返却。nodes = エージェントが写した内容、opts.digestNodes = そのページの真の内容（既定は nodes）。
// 入力の束縛は sha256("fetch-tree-page\n" + tsvSha + "\n" + P)。P はプロンプトのコマンド `--page P` から取る。
export function treePageReply(prompt, nodes, tsvSha, opts = {}) {
  const nonce = nonceOf(prompt)
  const page = Number(/--page (\d+)/.exec(String(prompt))?.[1])
  if (nonce === null || !Number.isInteger(page)) throw new Error('プロンプトに fetch-tree.sh --page のコマンドが無い')
  const truth = opts.digestNodes ?? nodes
  const payload = {
    count: truth.length,
    inputSha256: inputSha256(`fetch-tree-page\n${tsvSha}\n${page}`),
    nodesSha256: treeNodesSha256(truth),
    optinSha256: treeOptinSha256(truth),
    page,
    structSha256: treeStructSha256(truth),
    taskIdSha256: treeTaskIdSha256(truth),
    ...(opts.payload ?? {}),
  }
  const env = makeEnvelope(opts.nonce ?? nonce, payload)
  return { nodes, nonce: env.nonce, payload: env.payload, sha256: env.sha256 }
}

// 全欄（7 欄）が一致する重複を 1 件にした配列（スクリプトは重複を出さないので、真の内容にはこちらを使う）
function uniqueBySevenFields(nodes) {
  const seen = new Set()
  return nodes.filter((n) => {
    const k = JSON.stringify([n.number, n.parent, n.siblingIndex, n.state, n.subIssuesTotal, n.title, n.optinTests ?? []])
    if (seen.has(k)) return false
    seen.add(k)
    return true
  })
}

// 既存テストの agent スタブが返していた `{ nodes }` を封筒つきに変える薄いアダプタ。nodes が配列でない・オブジェクト以外を含む・
// 既に封筒の形のもの・null / Error はそのまま返す（ホストが封筒より前に検査する異常系を温存するため）。
// optinTests の無いノードには、正直な取得エージェントが必ず写す第 7 欄（宣言なし = 空配列）を補う
export function wrapTreeReply(prompt, value) {
  if (value === null || value === undefined || value instanceof Error) return value
  if (typeof value !== 'object' || !Array.isArray(value.nodes)) return value
  if (['nonce', 'payload', 'sha256', 'failure'].some((k) => k in value)) return value
  if (value.nodes.some((n) => n === null || typeof n !== 'object' || Array.isArray(n))) return value
  const nodes = value.nodes.map((n) => ('optinTests' in n ? n : { ...n, optinTests: [] }))
  return treeFetchReply(prompt, nodes, { digestNodes: uniqueBySevenFields(nodes) })
}
