// iit の model・effort の指定を、ツール別のモデルと推論の強さへ変換する境界。
//
// 役割: runner/config/default.json の対応表（正本）を読み、生成物の agent() が渡す
// model（haiku / sonnet / opus / fable）・effort（low / medium / high）を、Codex の `-m`・
// `model_reasoning_effort` に解決する。表に無い名前は例外（fail-closed。
// 黙って別のモデルへ倒すと、判断を伴う段が弱いモデルで動いてしまう）。
//
// 呼び出し元: agent-host（agent() ごと）と run.mjs（起動時の validateConfig）。
// 未確定（default.json の notes を参照）: タイムアウトの値。
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { isNormalizedAbsPathList } from './path-list.mjs'

export const IIT_MODELS = Object.freeze(['haiku', 'sonnet', 'opus', 'fable'])
export const IIT_EFFORTS = Object.freeze(['low', 'medium', 'high'])
export const TOOLS = Object.freeze(['codex'])
export const DEFAULT_CONFIG_PATH = join(dirname(fileURLToPath(import.meta.url)), '..', 'config', 'default.json')

/** toolConfig.<tool> のうち、パスの配列を受けるキー。 */
const PATH_LIST_KEYS = Object.freeze(['extraWritePaths'])
const isPlainObject = (x) => x !== null && typeof x === 'object' && !Array.isArray(x)
const isPosInt = (x) => Number.isInteger(x) && x > 0

/** 設定の形を検査する。違反は例外（起動時に 1 度呼ぶ）。 */
export function validateConfig(config) {
  const fail = (msg) => { throw new Error(`ランナー設定が不正: ${msg}`) }
  if (!isPlainObject(config)) fail('オブジェクトではない')
  if (config.version !== 1) fail('version は 1')
  if (!IIT_MODELS.includes(config.sessionModel)) fail(`sessionModel が未知: ${String(config.sessionModel)}`)
  const lim = config.limits
  if (!isPlainObject(lim) || !isPosInt(lim.maxParallel) || !Number.isInteger(lim.repairAttempts) || lim.repairAttempts < 0 || !isPosInt(lim.maxAgents)) {
    fail('limits（maxParallel・repairAttempts・maxAgents）')
  }
  const t = config.timeoutsSec
  if (!isPlainObject(t) || !isPosInt(t.default) || !isPlainObject(t.byPhase)) fail('timeoutsSec')
  for (const [phase, sec] of Object.entries(t.byPhase)) if (!isPosInt(sec)) fail(`timeoutsSec.byPhase.${phase}`)
  // 隔離 worktree の git の上限（秒。fetch とそれ以外。lib/worktree.mjs の createWorktree）。省けば作成関数の既定
  if (t.worktree !== undefined) {
    if (!isPlainObject(t.worktree)) fail('timeoutsSec.worktree')
    for (const [k, sec] of Object.entries(t.worktree)) if (!['fetch', 'git'].includes(k) || !isPosInt(sec)) fail(`timeoutsSec.worktree.${k}`)
  }
  if (!isPlainObject(config.cleanup) || typeof config.cleanup.deleteSessions !== 'boolean') fail('cleanup.deleteSessions')
  if (!isPlainObject(config.models)) fail('models')
  for (const tool of TOOLS) {
    const table = config.models[tool]
    if (!isPlainObject(table)) fail(`models.${tool} が無い`)
    for (const name of IIT_MODELS) {
      const e = table[name]
      if (!isPlainObject(e)) fail(`models.${tool}.${name} が無い`)
      if (e.model !== null && (typeof e.model !== 'string' || e.model === '')) fail(`models.${tool}.${name}.model`)
      if ('effort' in e && !IIT_EFFORTS.includes(e.effort)) fail(`models.${tool}.${name}.effort`)
    }
    for (const name of Object.keys(table)) if (!IIT_MODELS.includes(name)) fail(`models.${tool} に未知のモデル名 ${name}`)
  }
  // toolConfig.<tool> はアダプタ固有の設定（キーの意味は adapters/<tool>.mjs 冒頭）。run.mjs がそのままアダプタの
  // cfg.toolConfig へ渡すため、ここでは形だけを見る（キーの検査はアダプタの責務）
  if (config.toolConfig !== undefined) {
    if (!isPlainObject(config.toolConfig)) fail('toolConfig')
    for (const [tool, tc] of Object.entries(config.toolConfig)) {
      if (!TOOLS.includes(tool)) fail(`toolConfig に未知のツール ${tool}`)
      if (!isPlainObject(tc)) fail(`toolConfig.${tool}`)
      for (const k of ['deleteSessions', 'models', 'timeoutsSec']) if (k in tc) fail(`toolConfig.${tool}.${k} は置けない（cleanup・models・timeoutsSec を使う）`)
      // パスの配列を受けるキー（書き込み許可にそのまま入る。文字列は 1 文字ずつ展開されるので型まで見る）
      for (const k of PATH_LIST_KEYS) if (k in tc && !isNormalizedAbsPathList(tc[k])) fail(`toolConfig.${tool}.${k} は正規化済みの絶対パス（"/" 以外）の配列`)
    }
  }
  return config
}

/** 設定ファイルを読んで検査する。path を省くと配布の既定値。 */
export function loadConfig(path = DEFAULT_CONFIG_PATH) {
  return validateConfig(JSON.parse(readFileSync(path, 'utf8')))
}

/**
 * agent() の opts から、ツールで使うモデルと強さを決める。
 * model 省略は config.sessionModel の段（Workflow 版のセッション継承に当たる）。
 * effort は opts を優先し、無ければ表の値。
 * @returns {{ name: string, model: string | null, effort: string | null }}
 */
export function resolveModel(config, tool, { model, effort } = {}) {
  if (!TOOLS.includes(tool)) throw new Error(`未知のツール: ${String(tool)}`)
  const name = model === undefined ? config.sessionModel : model
  if (!IIT_MODELS.includes(name)) throw new Error(`未知のモデル名: ${String(name)}`)
  if (effort !== undefined && !IIT_EFFORTS.includes(effort)) throw new Error(`未知の effort: ${String(effort)}`)
  const e = config.models[tool][name]
  return {
    name,
    model: e.model,
    effort: effort ?? e.effort ?? null,
  }
}

/** opts.phase に応じた時間切れ（ミリ秒）。phase の表に無ければ default。 */
export function resolveTimeoutMs(config, { phase } = {}) {
  const sec = Object.hasOwn(config.timeoutsSec.byPhase, phase) ? config.timeoutsSec.byPhase[phase] : config.timeoutsSec.default
  return sec * 1000
}
