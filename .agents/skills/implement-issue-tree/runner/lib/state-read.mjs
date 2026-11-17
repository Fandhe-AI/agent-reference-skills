// 状態ファイルの読み込みの段（state:load・state:load-fill）を、モデルに書き写させずにホストが状態ファイルから直接読むための部品。
//
// 役割: 生成物の loadState は、状態ファイル（_/issue-trees/<parent>.json）の items をモデルに書き写させ（state:load。欠けた・
// 一致しない項目は state:load-fill で 5 件ずつ取り直す）、別の段の state:load-verify（state.sh verify。項目ごとの `jq -jcS` の
// sha256）と照合して一致した項目だけを採用する。実機のランで、モデルが note の中の 40 桁の sha を 39 桁に写し、取り直しの
// 2 巡も同じ形で写し損ねて照合が成立しなかった（照合は fail-closed なので安全側には倒れたが、ラン終了時の後片づけが止まる）。
// ランナーはホストの決定的なコードなので、値を書き写す段をモデルへ回さず、ここで状態ファイルを読んでそのまま返す。
//
// 読む対象の決め方（プロンプトの自由文からは取らない）:
//   - 番号は生成物と同じ式で args から決める（src の `Number(args.parent ?? args.issue)`。生成物の STATE_FILE と
//     state:load-verify の実行仕様の `--file` はこの番号から作られる）。正の整数でなければ読まない
//   - パスは <mainRoot>/_/issue-trees/<番号>.json（実行仕様の段の cwd が mainRoot で、`--file` はその相対パス）
//   - キーは決めない。items を丸ごと返す（state:load-fill の結果から、生成物は自分が頼んだキーだけを拾う）
//   プロンプトは、その段が同じ状態ファイルを指していること（パスの文字列を含むこと）の照合にだけ使う。
//
// 読む範囲（state.sh verify の sv_run と同じ判定にそろえる。どれかに当たれば照合不成立に倒れる値を返す）:
//   - 置き場は <realpath(mainRoot)>/_/issue-trees（state:load の段に渡す書き込み可の置き場と同じ。stateDirOf）。
//     置き場の realpath がこの形でない（`_` か `issue-trees` が symlink で外を指す）ときは読まない。状態ファイルが無いときも
//     同じで、absent（初期化をモデルの段へ回し、置き場を書き込み可で渡す）にせず bad にする
//   - 状態ファイルが symlink・通常のファイルでない・読めない・JSON として不正（空・値が 2 つ以上を含む）・最上位がオブジェクトで
//     ない・.items が（無い・null 以外で）オブジェクトでない・高水位が（無い・null 以外で）15 桁以内の非負整数でない
//   - パスに .. は入らない（番号は正の整数の 10 進表記だけ）
//
// 呼び出し元: lib/agent-host.mjs（label が STATE_READ_LABEL に当たり、0 行目が実行仕様でなく、隔離なしの呼び出し）。
import { lstatSync, readFileSync, realpathSync } from 'node:fs'
import { join } from 'node:path'

// runStateAgent がモデルを切り替えるときに付ける `:fallback-<model>` だけを許す。state:load-verify（実行仕様）には当たらない
export const STATE_READ_LABEL = /^state:load(-fill)?(?::fallback-[a-z0-9]+)?$/
const MAX_STATE_BYTES = 64 * 1024 * 1024
const MAX_UINT = 999_999_999_999_999 // state.sh verify の sv_uint（15 桁以内）

/** 状態ファイルの置き場（state:load の段の追加の書き込み可パスと同じ）。 */
export const stateDirOf = (mainRoot) => join(mainRoot, '_', 'issue-trees')

/** args から状態ファイルの番号を決める（src の parent と同じ式）。正の整数でなければ null。 */
export function stateParentOf(args) {
  if (args === null || typeof args !== 'object') return null
  const n = Number(args.parent ?? args.issue)
  return Number.isSafeInteger(n) && n > 0 ? n : null
}

/** 生成物の STATE_FILE と同じ相対パス（mainRoot 基準）。 */
export const stateFileOf = (parent) => `_/issue-trees/${parent}.json`

const isPlainObject = (x) => x !== null && typeof x === 'object' && !Array.isArray(x)
// 高水位の欄: 無い・null は 0、15 桁以内の非負整数はそのまま、それ以外は読まない（undefined）
const uintField = (v) => (v === undefined || v === null ? 0 : Number.isSafeInteger(v) && v >= 0 && v <= MAX_UINT ? v : undefined)

/**
 * 状態ファイルが無いときに、置き場の途中の `_`・`_/issue-trees` のうち実在するものが symlink でなく、realpath が字面と
 * 同じことを確かめる。無い（absent）は初回の初期化として state:load の段へ書き込み可の置き場を渡す経路なので、ファイルが
 * あるときの置き場の検査（realpath(dir) !== dir）と同じ閉じ込めをここでも掛ける（symlink 越しに外へ初期化させない）。
 * 成分は手前から lstat し、symlink なら realpath を引く前に bad にする（リンク先が無い symlink を ENOENT で absent に落とさない）。
 */
function absentOrBad(root, bad) {
  let p = root
  for (const name of ['_', 'issue-trees']) {
    p = join(p, name)
    let st
    try {
      st = lstatSync(p)
    } catch (e) {
      if (e?.code === 'ENOENT' || e?.code === 'ENOTDIR') return { kind: 'absent' }
      return bad(`状態ファイルの置き場を確かめられない（${String(e?.code ?? 'error')}）`)
    }
    if (st.isSymbolicLink()) return bad('状態ファイルが無く、置き場（_ か _/issue-trees）が symlink')
    try {
      if (realpathSync(p) !== p) return bad('状態ファイルが無く、置き場がメイン worktree の _/issue-trees の外を指す')
    } catch (e) {
      return bad(`状態ファイルの置き場を確かめられない（${String(e?.code ?? 'error')}）`)
    }
    // `_` が通常のファイル等なら、その下に置き場は無い（state.sh verify の nofile と同じく absent。初期化の段が失敗する）
    if (!st.isDirectory()) return { kind: 'absent' }
  }
  return { kind: 'absent' }
}

/**
 * 状態ファイルを読む（何も書かない）。
 * @param {{ mainRoot: string, parent: number }} p
 * @returns {{ kind: 'absent' } | { kind: 'bad', reason: string }
 *   | { kind: 'ok', items: object, highWaterBytes: number, highWaterVersion: number }}
 *   absent = 状態ファイルが無い（state.sh verify の nofile と同じ）/ bad = あるが読めない・置き場の外・形が違う
 */
export function readStateFile({ mainRoot, parent }) {
  const bad = (reason) => ({ kind: 'bad', reason })
  let root
  try {
    root = realpathSync(mainRoot)
  } catch (e) {
    return bad(`メイン worktree を確かめられない（${String(e?.code ?? 'error')}）`)
  }
  const dir = stateDirOf(root)
  const file = join(dir, `${parent}.json`)
  let st
  try {
    st = lstatSync(file)
  } catch (e) {
    if (e?.code === 'ENOENT' || e?.code === 'ENOTDIR') return absentOrBad(root, bad)
    return bad(`状態ファイルを確かめられない（${String(e?.code ?? 'error')}）`)
  }
  try {
    if (realpathSync(dir) !== dir) return bad('状態ファイルの置き場が symlink でメイン worktree の _/issue-trees の外を指す')
  } catch (e) {
    return bad(`状態ファイルの置き場を確かめられない（${String(e?.code ?? 'error')}）`)
  }
  if (st.isSymbolicLink()) return bad('状態ファイルが symlink')
  if (!st.isFile()) return bad('状態ファイルが通常のファイルでない')
  if (st.size > MAX_STATE_BYTES) return bad('状態ファイルが大きすぎる')
  let text
  try {
    text = readFileSync(file, 'utf8')
  } catch (e) {
    return bad(`状態ファイルを読めない（${String(e?.code ?? 'error')}）`)
  }
  let doc
  try {
    doc = JSON.parse(text)
  } catch {
    return bad('状態ファイルが JSON として不正')
  }
  if (!isPlainObject(doc)) return bad('状態ファイルの最上位がオブジェクトでない')
  const items = doc.items === undefined || doc.items === null ? {} : doc.items
  if (!isPlainObject(items)) return bad('.items がオブジェクトでない')
  const highWaterBytes = uintField(doc.perWorktreeByteReserveHighWater)
  const highWaterVersion = uintField(doc.perWorktreeByteReserveHighWaterVersion)
  if (highWaterBytes === undefined || highWaterVersion === undefined) return bad('高水位が非負整数でない')
  return { kind: 'ok', items, highWaterBytes, highWaterVersion }
}
