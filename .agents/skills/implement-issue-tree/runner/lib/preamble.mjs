// 生成物のプロンプトに出る Claude Code の語彙を、ランナーのエージェントが読める形に読み替える前置き。
//
// 役割: 生成物（src も含め）を変えずに動かす方針のため、プロンプト本文の「StructuredOutput」
// 「Bash 呼び出し」はそのまま残る。agent-host がエージェントへ渡す前に、この前置きと schema 指示を足す。
// 純関数だけ（I/O なし）。ツール別の差（Codex は --output-schema で形式を強制できる、OpenCode はできない）は
// 前置きに持ち込まず、アダプタ側の指示で補う。
//
// 未確定（agent-host 実装時に決める）: 機械的なラベル（state:load-verify 等）で、64 桁 hex の封筒の転記を
// モデルにさせるか、ランナーがスクリプトを直接実行するかはオーナー判断待ち。後者になると、該当ラベルには
// この前置きの転記指示を付けない可能性がある。

import { sanitizeErrorLine } from './schema-validate.mjs'

const SCHEMA_PRETTY_LIMIT = 60_000

/** Claude Code の語彙の読み替え文。 */
export function buildPreamble() {
  return [
    '【実行環境の読み替え】このプロンプトは Claude Code 向けに書かれている。次のとおり読み替えて従うこと。',
    '- 「StructuredOutput」「StructuredOutput ツール」は、最終応答として JSON Schema に従う JSON オブジェクトを 1 つだけ返すことを指す。ツール呼び出しではない。前後に説明文・コードフェンスを付けない。',
    '- 「Bash」「Bash 呼び出し」は、シェルコマンドの実行を指す。',
    '- 指示に無い操作（追加の調査・別の方法での測り直し・値の補完）はしない。コマンドが失敗したときは、指示された失敗の返し方に従う。',
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

/** 前置き + 元のプロンプト + 形式の指示の順に組み立てる（計画 C「agent() の契約」の prompt の行）。 */
export function composePrompt({ prompt, schema, worktreePath }) {
  if (typeof prompt !== 'string') throw new TypeError('prompt は文字列')
  const parts = [buildPreamble()]
  if (worktreePath !== undefined) parts.push(buildWorktreeNotice(worktreePath))
  parts.push(prompt, buildSchemaInstruction(schema))
  return parts.join('\n\n')
}

/**
 * 修復ターンの指示（同じ会話で 1 回だけ使う）。errors は schema-validate の errors か、
 * 「JSON を取り出せなかった」旨の短い文。値の中身は載せない。
 */
export function buildRepairPrompt(errors) {
  const list = (errors.length > 0 ? errors : ['応答から JSON オブジェクトを取り出せなかった']).slice(0, 20)
  return [
    '直前の応答は指定の JSON Schema に適合しなかった。次の点を直して、JSON オブジェクト 1 つだけを返し直すこと。',
    ...list.map((e) => `- ${sanitizeErrorLine(e)}`),
    'コマンドを実行し直さない。すでに得た観測値を使い、値を作らない。分からない項目は schema の指示に従う。',
  ].join('\n')
}
