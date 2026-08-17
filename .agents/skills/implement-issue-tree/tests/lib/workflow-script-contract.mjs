// implement-issue-tree.js が Workflow ランタイムに受理される（起動可能である）ことを判定する
// 唯一の実装。CI テスト（workflow-loadability.test.mjs）と、履歴コミットへの一回限りの手動
// 実測（references/verification.md 記載の CLI 呼び出し）の双方が本モジュールを共有することで、
// 「テストと手動確認で判定ロジックが分岐し、片方だけ stale 化する」事故を防ぐ。
//
// ファイル名が `*.test.mjs` に一致しないため、Node の `node --test` glob には拾われない
// （このファイル自体はテストではなく、テストが import するライブラリ + 手動実行用 CLI）。
//
// このモジュールは実装スクリプトを「解析するだけ」で「実行しない」。`new AsyncFunction(source)`
// は構文木を構築するのみで、生成した関数を呼び出せば任意コード実行になる（OWASP A03）。
// 呼び出しは決して行わないこと。
import { readFileSync, statSync } from 'node:fs'
import { pathToFileURL } from 'node:url'

// PR #241（efae3ab → 29b5278 の縮小）の実測に基づく値。Workflow ランタイムの公式ドキュメント
// （.claude/skills/anthropic-claude-code-extend/references/subagents/workflows.md）には
// バイトサイズ上限の明記がないため、「文書化された契約」ではなく実測由来の値である旨を
// ここに残す。この値を超えると起動時に受理されなくなることが #241 で経験的に確認された。
export const WORKFLOW_SCRIPT_HARD_LIMIT_BYTES = 524288 // 512 KiB

// 運用予算。ハード上限まで約 24KB の余裕を残し、予算超過の時点で CI を fail させることで
// ハード上限への接近を早期に検知する。
export const WORKFLOW_SCRIPT_BUDGET_BYTES = 500000

// Workflow ランタイムが特別扱いする唯一の宣言。行頭（文字列先頭）にのみマッチさせることで、
// スクリプト本体の途中に紛れ込んだ 2 つ目の `export const meta` 宣言（変異ケース想定）を
// 誤って除去しないようにする。
export const META_EXPORT_PATTERN = /^export const meta\b/

/**
 * 先頭の `export const meta` 宣言からのみ `export ` を取り除く。
 * ランタイムはこの宣言だけを import 対象として特別扱いし、残りをモジュールではなく
 * 関数ボディ相当として評価するため、テスト側でも同じ変換を再現する必要がある。
 * 先頭に宣言が見つからない場合は null を返す（例外は投げない — 呼び出し側が
 * `meta-export-missing` として扱えるようにするため）。
 */
export function stripMetaExport(source) {
  if (!META_EXPORT_PATTERN.test(source)) return null
  return source.replace(META_EXPORT_PATTERN, 'const meta')
}

// Workflow ランタイムの実測された評価形態（トップレベル `return`・トップレベル `await` を
// 許容し、`export` は拒否する）を再現する唯一の評価器。ここで生成した関数は解析のためだけに
// 存在し、呼び出しは行わない（下記コメント参照）。
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor

/**
 * meta 宣言を除去した本体をランタイムと同じ評価形態でパースする。
 * 生成した AsyncFunction は決して呼び出さない（構文解析のみが目的）。
 * meta 宣言が見つからない場合、または meta 以外に top-level export が残っている場合は
 * SyntaxError を送出する（呼び出し側で捕捉すること。この関数自体は握りつぶさない）。
 */
export function parseAsWorkflowBody(source) {
  const body = stripMetaExport(source)
  if (body === null) {
    throw new SyntaxError('meta-export-missing: 先頭に `export const meta` 宣言が見つからない')
  }
  // 呼び出さない。SyntaxError はここで構文木構築時に送出される。
  return new AsyncFunction(body)
}

// 近似検出。パースが SyntaxError を投げたときに疑わしい行を示す診断用であり、
// 契約そのもの（parseAsWorkflowBody の成否）の代わりにはしない。
const SUSPECT_EXPORT_PATTERN = /(^|[;{}()]\s*)export\b/

/**
 * meta 宣言を除いた本体から、行頭以外に置かれた形も含めて `export` を含む行を近似検出する。
 * SyntaxError の原因箇所を人間が素早く特定するための診断情報であり、判定には使わない
 * （判定は parseAsWorkflowBody の構文解析結果のみで行う）。
 */
export function findSuspectExportLines(source) {
  const body = stripMetaExport(source) ?? source
  return body
    .split('\n')
    .map((line, index) => ({ line, lineNumber: index + 1 }))
    .filter(({ line }) => SUSPECT_EXPORT_PATTERN.test(line))
    .map(({ line, lineNumber }) => `${lineNumber}: ${line.trim().slice(0, 80)}`)
}

/**
 * implement-issue-tree.js が Workflow として起動可能かを判定する。
 * サイズ（ハード上限・運用予算）とパース可否（meta 以外の top-level export 禁止）の
 * 両方を検査し、違反を列挙する。呼び出し側（CI テスト・履歴実測 CLI）はこの結果のみを
 * 根拠に判定する（判定ロジックの分岐を防ぐため）。
 *
 * @param {{ source: string, byteLength: number }} params
 * @returns {{ ok: boolean, violations: Array<{ code: string, detail: string }> }}
 */
export function checkWorkflowScript({ source, byteLength }) {
  const violations = []

  if (byteLength > WORKFLOW_SCRIPT_HARD_LIMIT_BYTES) {
    violations.push({
      code: 'oversize-hard',
      detail: `${byteLength} B はハード上限 ${WORKFLOW_SCRIPT_HARD_LIMIT_BYTES} B（PR #241 実測由来）を超過`,
    })
  } else if (byteLength >= WORKFLOW_SCRIPT_BUDGET_BYTES) {
    violations.push({
      code: 'oversize-budget',
      detail: `${byteLength} B は運用予算 ${WORKFLOW_SCRIPT_BUDGET_BYTES} B 以上（残余裕 ${WORKFLOW_SCRIPT_HARD_LIMIT_BYTES - byteLength} B）`,
    })
  }

  const body = stripMetaExport(source)
  if (body === null) {
    violations.push({
      code: 'meta-export-missing',
      detail: '先頭に `export const meta` 宣言が見つからない',
    })
  } else {
    try {
      // 呼び出さない。構文解析の成否のみを見る。
      new AsyncFunction(body)
    } catch (error) {
      if (!(error instanceof SyntaxError)) throw error
      const suspects = findSuspectExportLines(source)
      violations.push({
        code: 'parse-error',
        detail: `${error.message}${suspects.length > 0 ? ` / 疑わしい行: ${suspects.join(' / ')}` : ''}`,
      })
    }
  }

  return { ok: violations.length === 0, violations }
}

// ---------------------------------------------------------------------------
// CLI エントリ（履歴コミットに対する一回限りの手動実測用。references/verification.md 参照）
//
//   node tests/lib/workflow-script-contract.mjs <path>
//   git show <sha>:<path> | node tests/lib/workflow-script-contract.mjs -
//
// 違反ありで exit 1、違反なしで exit 0。CI はこの CLI を呼ばず workflow-loadability.test.mjs
// を通して同じ実装を検証する（このファイルは node --test の glob に一致しないため単体では
// 収集されない）。
// ---------------------------------------------------------------------------
async function readStdin() {
  const chunks = []
  for await (const chunk of process.stdin) chunks.push(chunk)
  return Buffer.concat(chunks)
}

async function runCli(argv) {
  const target = argv[2]
  if (!target) {
    process.stderr.write('usage: workflow-script-contract.mjs <path>|-\n')
    process.exitCode = 1
    return
  }

  let source
  let byteLength
  if (target === '-') {
    const buf = await readStdin()
    byteLength = buf.length
    source = buf.toString('utf8')
  } else {
    // ディスク上のファイル実体をそのまま測る（読み込んだ文字列の Buffer.byteLength ではない）。
    byteLength = statSync(target).size
    source = readFileSync(target, 'utf8')
  }

  const result = checkWorkflowScript({ source, byteLength })
  if (result.ok) {
    process.stdout.write(`OK: 違反なし（${byteLength} B）\n`)
    process.exitCode = 0
  } else {
    for (const v of result.violations) {
      process.stdout.write(`NG [${v.code}] ${v.detail}\n`)
    }
    process.exitCode = 1
  }
}

// import.meta.url と argv[1] の一致で「直接実行されたか（CLI として）」を判定する
// （import されただけのときは実行しない）。
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  runCli(process.argv).catch((error) => {
    process.stderr.write(`${error.stack || error}\n`)
    process.exitCode = 1
  })
}
