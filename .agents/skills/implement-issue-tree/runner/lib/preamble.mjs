// 生成物のプロンプトに出る Claude Code の語彙を、ランナーのエージェントが読める形に読み替える前置き。
//
// 役割: 生成物（src も含め）を変えずに動かす方針のため、プロンプト本文の「StructuredOutput」
// 「Bash 呼び出し」はそのまま残る。agent-host がエージェントへ渡す前に、この前置きと schema 指示を足す。
// 純関数だけ（I/O なし）。ツール別の差（Codex は --output-schema で形式を強制できる）は
// 前置きに持ち込まず、アダプタ側の指示で補う。例外はシェルの注意（buildPreamble の最後の行。マージを許す段だけ MERGE_SHELL_NOTE）: 実測は Codex（モデルの
// コマンドが利用者のログインシェル zsh で動き、bash へ固定できない。adapters/codex.mjs 冒頭の「シェル」）だが、
// 契約上アダプタはプロンプトを加工しないため共通の前置きに置く。bash で動くツールにも害は無い。
//
// 未確定（agent-host 実装時に決める）: 機械的なラベル（state:load-verify 等）で、64 桁 hex の封筒の転記を
// モデルにさせるか、ランナーがスクリプトを直接実行するかはオーナー判断待ち。後者になると、該当ラベルには
// この前置きの転記指示を付けない可能性がある。

import { sanitizeErrorLine } from './schema-validate.mjs'

const SCHEMA_PRETTY_LIMIT = 60_000

/** シェルの注意（ファイル冒頭の例外）。シェルは zsh の可能性があるため、here-doc 経由で bash に渡させ、特殊変数への代入を避けさせる。 */
export const SHELL_NOTE =
  "- シェルは zsh の可能性がある。複数行のスクリプトは `bash <<'EOF'` … `EOF` の形で bash に渡して実行し、`status` 等のシェルの特殊変数名に代入しない。"

/**
 * マージを許す段（merge-exec。agent-host が req.merge を決めた段）のシェルの注意。ガードが通すのは手順 3 の 1 行の完全一致
 * だけなので、SHELL_NOTE の here-doc の指示を外し、その 1 行を包まずに実行させる（Phase 4 の通しで、モデルが SHELL_NOTE に従って
 * 手順 3 の 1 行を `bash <<'EOF'` で包み、ガードに止められてマージできなかった）。この段の他のコマンドも 1 行で足りる。
 */
export const MERGE_SHELL_NOTE = [
  '- シェルは zsh の可能性がある。`status` 等のシェルの特殊変数名に代入しない。',
  '- 手順 3 のマージコマンドは、bash・here-doc・`-c` で包まず、変数の代入を別の呼び出しに分けず、示された 1 行のまま 1 回のコマンドとして実行する（この段でマージが通るのは、その 1 行の完全一致だけである）。',
].join('\n')

/**
 * Claude Code の語彙の読み替え文。
 * @param {{ merge?: boolean }} [o]  merge: マージを許す段（シェルの注意を MERGE_SHELL_NOTE にする）
 */
export function buildPreamble({ merge = false } = {}) {
  return [
    '【実行環境の読み替え】このプロンプトは Claude Code 向けに書かれている。次のとおり読み替えて従うこと。',
    '- 「StructuredOutput」「StructuredOutput ツール」は、最終応答として JSON Schema に従う JSON オブジェクトを 1 つだけ返すことを指す。ツール呼び出しではない。前後に説明文・コードフェンスを付けない。',
    '- 「Bash」「Bash 呼び出し」は、シェルコマンドの実行を指す。',
    '- 指示に無い操作（追加の調査・別の方法での測り直し・値の補完）はしない。コマンドが失敗したときは、指示された失敗の返し方に従う。',
    merge ? MERGE_SHELL_NOTE : SHELL_NOTE,
  ].join('\n')
}

/** 隔離 worktree の通知文。path は共通層が作った絶対パス。 */
export function buildWorktreeNotice(path) {
  if (typeof path !== 'string' || !path.startsWith('/')) throw new Error('worktree のパスは絶対パスで渡す')
  return [
    `【作業ディレクトリ】このエージェント専用の隔離 worktree は ${path} である。`,
    'ファイルの編集・git 操作はこの中で行う。結果の worktreePath を求められたら、この絶対パスをそのまま入れる。',
  ].join('\n')
}

/** 最終応答の形式の指示。schema は JSON Schema（オブジェクト）。 */
export function buildSchemaInstruction(schema) {
  let text = JSON.stringify(schema, null, 2)
  if (text.length > SCHEMA_PRETTY_LIMIT) text = JSON.stringify(schema)
  return [
    '【最終応答の形式】最終応答は、次の JSON Schema に従う JSON オブジェクト 1 つだけにする。',
    '前後に文章・コードフェンス・注釈を付けない。キー名は schema のとおりにする。追加のキーの可否は各 object の additionalProperties に従う（true または未指定の object は、イシュー番号をキーにした動的マップのようにキーを自由に持てる。false の object には properties に無いキーを足さない）。',
    '```json',
    text,
    '```',
  ].join('\n')
}

/**
 * 前置き + 元のプロンプト + 形式の指示の順に組み立てる（計画 C「agent() の契約」の prompt の行）。
 * merge は agent-host がマージを許した段（req.merge が決まった merge-exec）だけ true にする。
 */
export function composePrompt({ prompt, schema, worktreePath, merge = false }) {
  if (typeof prompt !== 'string') throw new TypeError('prompt は文字列')
  const parts = [buildPreamble({ merge: merge === true })]
  if (worktreePath !== undefined) parts.push(buildWorktreeNotice(worktreePath))
  parts.push(prompt, buildSchemaInstruction(schema))
  return parts.join('\n\n')
}

/**
 * 修復ターンの指示（同じ会話で 1 回だけ使う）。値の中身は載せない。
 * 呼び出し元は lib/agent-host.mjs の 1 か所で、check() の errors（文字列の配列）をそのまま渡す。
 * @param {string[] | string} errors  schema-validate の errors（不適合の理由。先頭 20 件だけ使う）。
 *   空の配列は応答から JSON を取り出せなかったことを表し、その旨の固定文 1 行に置き換える。
 *   文字列 1 つは 1 件の配列として扱い、配列でも文字列でもない値は空の配列として扱う（Issue #856。落とさない）
 * @returns {string}
 */
export function buildRepairPrompt(errors) {
  const items = typeof errors === 'string' ? [errors] : Array.isArray(errors) ? errors : []
  const list = (items.length > 0 ? items : ['応答から JSON オブジェクトを取り出せなかった']).slice(0, 20)
  return [
    '直前の応答は指定の JSON Schema に適合しなかった。次の点を直して、JSON オブジェクト 1 つだけを返し直すこと。',
    ...list.map((e) => `- ${sanitizeErrorLine(e)}`),
    'コマンドを実行し直さない。すでに得た観測値を使い、値を作らない。分からない項目は schema の指示に従う。',
  ].join('\n')
}
