// Codex の hook が呼ぶ共通ガード agent-guard.sh の探し方の正本。
//
// 役割: ランナーは agent-guard.sh を同梱しない（正本は init-codex の assets/hooks/。配布物の
// 写しは asset-sync テストが同一に縛る）。そのため、配布物の置き場と、対象リポジトリに導入済みの写しを決まった順で
// 探す。探索順と見つからないときの案内は Codex アダプタと pins で同じ（pins は同じ入力で探す）。
//
// 探索順（最初に存在したものを使う）:
//   1. toolConfig.guardScript（指定したらそれだけを見る。無ければ他へ倒さず見つからない扱い = prereq。
//      明示した場所の取り違えを黙って別の写しで走らせないため）
//   2. <skillDir>/../init-codex/assets/hooks/agent-guard.sh
//      （スキルと同じ置き場に init-codex が入っている場合）
//   3. <mainRoot>/.codex/hooks/agent-guard.sh（init-codex の導入先）
//   4. <mainRoot>/skills/init-codex/…（このスキル集のリポジトリ自身で動かす場合）
import { existsSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'

/** 見つからないときの prereq の文言（両アダプタで同じ）。 */
export const GUARD_SCRIPT_MISSING =
  'agent-guard.sh が見つからない。init-codex を導入する（対象リポジトリの .codex/hooks/ に置かれる）か、' +
  'ランナー設定の toolConfig.<tool>.guardScript に絶対パスを指定する'

const isFile = (p) => {
  try {
    return statSync(p).isFile()
  } catch {
    return false
  }
}

/**
 * @param {{ toolConfig?: { guardScript?: string }, skillDir?: string, mainRoot?: string }} p
 * @returns {string|null} agent-guard.sh の絶対パス。無ければ null（呼び出し側が AdapterError('prereq', GUARD_SCRIPT_MISSING)）
 */
export function findGuardScript({ toolConfig = {}, skillDir, mainRoot }) {
  if (toolConfig.guardScript !== undefined && toolConfig.guardScript !== null) {
    const p = String(toolConfig.guardScript)
    return p !== '' && isFile(p) ? resolve(p) : null
  }
  const cands = [
    skillDir && join(skillDir, '..', 'init-codex', 'assets', 'hooks', 'agent-guard.sh'),
    mainRoot && join(mainRoot, '.codex', 'hooks', 'agent-guard.sh'),
    mainRoot && join(mainRoot, 'skills', 'init-codex', 'assets', 'hooks', 'agent-guard.sh'),
  ].filter(Boolean)
  for (const c of cands) if (existsSync(c) && isFile(c)) return resolve(c)
  return null
}
