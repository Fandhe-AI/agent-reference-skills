export const meta = {
  name: 'implement-issue-tree',
  description: '親イシュー配下のサブイシューを依存順を保ちつつ worktree で並列に実装・レビュー・PR 作成・squash merge まで自動化する',
  whenToUse: '親イシュー番号を指定してサブイシュー群（孫含む）を依存順を保ちつつ並列に自動開発するとき',
  phases: [
    { title: 'Restore', detail: '状態ファイルの読み込み・再開情報の復元', model: 'haiku' },
    { title: 'Tree', detail: 'イシューツリー取得・機能的依存の抽出・並列実行順の決定・外部チェック自動判定', model: 'sonnet' },
    { title: 'State', detail: '状態ファイル更新（進捗・worktree パスの記録）', model: 'haiku' },
    // Recover は Plan の直前に配置する。中断 worktree が残る場合のみ起動し、
    // 残骸がなければスキップして通常の Plan に進む（per-issue 分岐）。
    // 判断軸は Review（正しさ・マージ可否）ではなく「この途中作業から継続するのが妥当か」。
    { title: 'Recover', detail: '中断作業の回復判断（継続/破棄）', model: 'opus' },
    { title: 'Plan', detail: 'イシューごとの実装計画立案（opus・worktree なし）', model: 'opus' },
    { title: 'Implement', detail: '計画に沿った実装・ローカルコミット（push・PR 作成なし）（worktree 並列）', model: 'sonnet' },
    { title: 'Review', detail: 'ローカル diff の品質・セキュリティレビュー（OK→Merge / 指摘→修正ループ / 最終ラウンドは Low のみ許容しコメント化）', model: 'sonnet' },
    { title: 'Merge', detail: 'CI / 外部チェック（検出時のみ）監視・レビュー全解決確認・squash merge・クローズ', model: 'sonnet' },
  ],
}

// ============================================================================
// FILE MAP（このスクリプトの構成。詳細は各セクション見出しを参照）
//   1. Bootstrap            — 引数パース・検証（parsedArgs / parent / baseBranch / concurrency / STATE_FILE）
//   2. 共通ユーティリティ    — sanitize / sanitizeBranch / assertInt / sanitizeWorktreePath
//   3. 定数・JSON スキーマ   — COMMON / *_SCHEMA（Tree/Impl/Merge/Fix/Close/External/Plan/Review/Recover/State）
//   4. 状態ファイル操作      — stateQueue / enqueueStateWrite / loadState / updateState / initAllPending
//   5. プロンプト構築        — planPrompt / reviewPrompt / implementPrompt / recoverPrompt / recoverImplementPrompt / prCreatePrompt / monitorPrompt / fixPrompt / closePrompt
//   6. 実行: Restore→Tree→State — 状態読込・ツリー取得・外部チェック判定・依存グラフ/キュー構築・pending 初期化
//   7. per-issue ドライバ    — recordFailure / runVerifyClose / runImplement / runMergeLoop / runOne（関数宣言。8 のスケジューラから呼ばれる）
//   8. 実行: スケジューラ     — 依存グラフ補助（isAncestor/findDependencyCycle/depsOf/isValidBranchName/isActiveMonitoring/markBlockedByDeps）・並列実行ループ・後処理レポート
// ============================================================================

// ============================================================================
// セクション 1: Bootstrap
// 引数パース・検証・定数設定。このスクリプトのエントリポイント。
// ============================================================================

// args は string で渡される場合がある（Workflow args は string 防御）
const parsedArgs = typeof args === 'string'
  ? (() => { try { return JSON.parse(args) } catch { return args } })()
  : args
const parent = Number(
  parsedArgs && typeof parsedArgs === 'object' ? (parsedArgs.parent ?? parsedArgs.issue) : parsedArgs,
)
const baseBranch = sanitizeBranch((parsedArgs && typeof parsedArgs === 'object' && parsedArgs.branch) || 'main')
// 並列実行数（1〜8、既定 3）。1 を指定すると従来どおりの直列実行になる
const concurrency = (() => {
  const p = Number(parsedArgs && typeof parsedArgs === 'object' ? parsedArgs.parallel : undefined)
  return Number.isInteger(p) && p >= 1 && p <= 8 ? p : 3
})()

if (!Number.isInteger(parent) || parent <= 0) {
  throw new Error('親イシュー番号を args で指定すること（例: {"parent": 1008, "branch": "main", "parallel": 3}）')
}

// 状態ファイルのパス（メインリポルート相対）
// parent は整数検証済みなのでファイル名として安全に使用できる
const STATE_FILE = `_/issue-trees/${parent}.json`

// ============================================================================
// セクション 2: 共通ユーティリティ
// プロンプト注入防止・入力バリデーション用のピュア関数群。
// 全セクションから参照されるため Bootstrap 直後に配置する。
// ============================================================================

// GitHub API から取得した文字列をエージェントプロンプトに埋め込む前にサニタイズする
// バッククォート・バックスラッシュ・改行・ドル記号によるプロンプトインジェクションを軽減する
function sanitize(str) {
  return String(str)
    .replace(/\r?\n/g, ' ')
    .replace(/`/g, "'")
    .replace(/\\/g, '/')
    .replace(/\$/g, '\\$')
}

// ブランチ名として不正な文字（スペース・セミコロン等）を拒否する。
// '..' によるパストラバーサル（sanitizeWorktreePath と同様の防御）も拒否する。
function sanitizeBranch(str) {
  const s = sanitize(str)
  if (/\.\./.test(s)) {
    throw new Error(`不正なブランチ名（'..' を含む）: ${s}`)
  }
  if (!/^[a-zA-Z0-9][a-zA-Z0-9\-_./]*$/.test(s)) {
    throw new Error(`不正なブランチ名: ${s}`)
  }
  return s
}

// エージェント返却値の整数検証
function assertInt(val, label) {
  if (!Number.isInteger(val) || val <= 0) throw new Error(`${label} が正の整数ではない: ${val}`)
  return val
}

// worktree パスのホワイトリスト検証
// 英数字・スラッシュ・ハイフン・アンダースコア・ドット・スペースのみ許可。
// 先頭は英数字か '/'、'..' 連続（ディレクトリトラバーサル）は不許可。
// 不正な場合は '' を返す（throw しない。呼び出し側でスキップ判定する）。
function sanitizeWorktreePath(p) {
  if (typeof p !== 'string' || p === '') return ''
  if (/\.\./.test(p)) return ''
  if (!/^[a-zA-Z0-9/][a-zA-Z0-9\-_./ ]*$/.test(p)) return ''
  return p
}

// ============================================================================
// セクション 3: 定数・JSON スキーマ
// COMMON は全エージェントプロンプトに挿入する共通指示。
// *_SCHEMA は各エージェントの返却値を型検証するための JSON Schema 定義。
// ============================================================================

const COMMON = [
  `リポジトリ: カレントディレクトリが実装対象リポ（base branch: ${baseBranch}）であること。起動直後に \`git remote get-url origin\` を確認し、想定と異なる submodule（例: docs/spec 等）の worktree に誤配置されていないか検証すること。`,
  '自動運転モード: ユーザーへの質問・承認待ちは不可。判断が必要なら安全側に倒して進める。',
  '対象リポジトリの CLAUDE.md・.claude/rules・テスト実行規約・コーディング規約があれば必ず読んで従う。',
  '対象リポジトリに delegation ルールや専門サブエージェントがあれば、それに従い役割単位で委譲する。',
  'ドキュメント・コミット件名・PR 本文は対象リポジトリの言語規約に従う（規約がなければ日本語で書く）。',
  'gh / git fetch / git push などネットワークを使うコマンドは sandbox 無効で実行する。',
  'コミットは pre-commit フックを必ず通す（--no-verify 禁止）。非対話実行で stdin 待ちのフックがハングする場合は git commit に </dev/null を付ける。',
  'git push は pre-push フックが長時間かかる場合があるため、Bash の timeout に 600000 を指定する。',
  '複数イシューが並列実行されている。グローバル状態（メイン working copy のブランチ・共有設定）を変更しない。',
].join('\n')

const TREE_SCHEMA = {
  type: 'object',
  required: ['nodes'],
  properties: {
    nodes: {
      type: 'array',
      items: {
        type: 'object',
        required: ['number', 'title', 'state', 'parent', 'siblingIndex', 'dependsOn'],
        properties: {
          number: { type: 'number' },
          title: { type: 'string' },
          state: { type: 'string', description: 'open または closed' },
          parent: { type: 'number', description: '直上の親イシュー番号。ルート自身は 0' },
          siblingIndex: { type: 'number', description: '親の sub_issues API 返却における 0-indexed 位置。ルート自身は 0' },
          dependsOn: {
            type: 'array',
            items: { type: 'number' },
            description: '機能的に先行完了が必須のイシュー番号のみ（本文の明示的な依存記述・前提実装）。単なる関連やコンフリクトの可能性だけなら含めず空配列',
          },
        },
      },
    },
  },
}

// worktreePath を追加: 中断後にユーザーが残骸 worktree を特定・掃除できるようにする
// prNumber は push 前 review フローではこの時点で未作成（0）のため必須から外す。
// PR 作成は Review 通過後の push + pr-create ステップで行う。
const IMPL_SCHEMA = {
  type: 'object',
  required: ['branch', 'summary'],
  properties: {
    prNumber: { type: 'number', description: 'push 前 review フローでは常に 0（PR はまだ作成しない）' },
    branch: { type: 'string' },
    summary: { type: 'string' },
    worktreePath: { type: 'string', description: 'pwd の結果（worktree の絶対パス）。空文字でも可' },
  },
}

const MERGE_SCHEMA = {
  type: 'object',
  required: ['state', 'summary'],
  properties: {
    state: {
      type: 'string',
      enum: ['merged', 'needs-fix', 'unresolved-comments', 'timeout', 'blocked'],
      description: 'merged: マージ成功 / needs-fix: CI 失敗・Bugbot 指摘・コンフリクト / unresolved-comments: レビューコメント未解決 / timeout: 監視上限超過 / blocked: 自力解決不可',
    },
    summary: { type: 'string', description: 'needs-fix / unresolved-comments の場合は対応に必要な情報の全文' },
  },
}

const FIX_SCHEMA = {
  type: 'object',
  required: ['pushed', 'summary'],
  properties: {
    pushed: { type: 'boolean' },
    summary: { type: 'string' },
    worktreePath: { type: 'string', description: 'pwd の結果（worktree の絶対パス）。空文字でも可' },
    routingError: {
      type: 'boolean',
      description:
        'worktree が別リポ（submodule 等）に誤配置されていて修正不能な場合 true。'
        + 'true のとき pushed は false。push 不要（修正済み）と区別するための専用シグナル。',
    },
  },
}

const CLOSE_SCHEMA = {
  type: 'object',
  required: ['closed', 'summary'],
  properties: {
    closed: { type: 'boolean' },
    summary: { type: 'string' },
  },
}

// Tree フェーズ末尾で外部チェック App（GitHub Actions 以外）を検出するスキーマ。
// 直前 3 件の merged PR の check-runs から app.slug を収集する。
// merged PR がない・取得失敗時は apps: [] でフォールバックし新規リポで停止しない。
const EXTERNAL_CHECKS_SCHEMA = {
  type: 'object',
  required: ['apps'],
  properties: {
    apps: {
      type: 'array',
      items: { type: 'string' },
      description: '外部チェック App slug の一意配列（例: ["cursor"]）。検出なしなら空配列',
    },
  },
}

// per-issue Plan エージェントの返却スキーマ。
// plan 本文は Implement エージェントへ引数で渡す（worktree 跨ぎのファイル参照を避けるため）。
const PLAN_SCHEMA = {
  type: 'object',
  required: ['plan', 'summary'],
  properties: {
    plan: { type: 'string', description: '実装計画の本文（markdown）' },
    summary: { type: 'string' },
  },
}

// Review 通過後の push + PR 作成エージェントのスキーマ。
// CI を一切起動しない Review を全て通過してから、ここで初めて push・PR 作成を行う。
// prNumber: 0 は PR 作成失敗（branch push は成功している可能性あり）。
const PR_CREATE_SCHEMA = {
  type: 'object',
  required: ['prNumber', 'summary'],
  properties: {
    prNumber: { type: 'number', description: '作成した PR 番号。作成できなければ 0' },
    summary: { type: 'string' },
  },
}

// 独立 Review フェーズのスキーマ。
// Low（要改善）含む指摘が 1 件でもあれば needs-fix。指摘なしなら ok。
// Review エージェントは修正を行わず判定のみ担う（修正は fix エージェントの責務）。
const REVIEW_SCHEMA = {
  type: 'object',
  required: ['state', 'summary', 'highestSeverity'],
  properties: {
    state: { type: 'string', enum: ['ok', 'needs-fix'] },
    highestSeverity: {
      type: 'string',
      enum: ['none', 'low', 'medium', 'high', 'critical'],
      description: '全指摘のうち最も高い重要度。指摘なし（state=ok）は none。最終 Review ラウンドで low/none なら通過扱いにするため必須。',
    },
    summary: { type: 'string', description: 'ok の場合は確認内容の要約。needs-fix の場合は全指摘を重要度付きで列挙' },
  },
}

// Recover フェーズ: 中断 worktree に残った作業の継続可否を判断するエージェントのスキーマ。
// Review（正しさ・マージ可否）とは別軸の判断 = 「この途中作業から継続するのが妥当か」。
// 動かない・未完成でも方向が妥当なら continue（残りは Implement が完成させる）。
// discard は「空 / 方向違い / 継続より作り直しが妥当」な場合のみ選ぶ。
// wipCommitted: WIP 退避を行ったか（branch に commit が積まれているか）。
// brief は continue 時のみ必須。reason は discard 時のみ必須。
// branch: 継続・退避・削除の対象として確定した実ブランチ名。
//   state に branch が記録されていなく worktree から解決した場合を含む。
//   解決できない場合は空文字。driver 側で isValidBranchName + sanitizeBranch を通して使用する。
const RECOVER_SCHEMA = {
  type: 'object',
  required: ['decision'],
  properties: {
    decision: {
      type: 'string',
      enum: ['continue', 'discard'],
      description: 'continue: 既存作業を継続する / discard: 作り直す',
    },
    branch: {
      type: 'string',
      description:
        '継続・退避・削除の対象として確定した実ブランチ名。state に branch が無く worktree HEAD から解決した場合を含む。解決できない場合は空文字。',
    },
    brief: {
      type: 'object',
      description: 'continue 時のみ。Implement エージェントへ渡す回復ブリーフ',
      properties: {
        done: { type: 'string', description: '実装済み内容の要約' },
        remaining: { type: 'string', description: '残タスクの要約' },
        broken: { type: 'string', description: '壊れ・未完で要修正の箇所の要約（なければ空文字）' },
      },
    },
    reason: {
      type: 'string',
      description: 'discard 時のみ。破棄の理由',
    },
    wipCommitted: {
      type: 'boolean',
      description: '未 commit 変更を WIP commit として branch に退避したか',
    },
    worktreeMissing: {
      type: 'boolean',
      description:
        'state に worktree パスが記録されていたが実体が存在しなかった（dead worktree）場合 true。' +
        'true のときは WIP リスクが無いため driver が state 由来 branch へのフォールバックを許可する。',
    },
  },
}

// 状態ファイルの読み込みスキーマ（additionalProperties 許可で柔軟に受け取る）
const STATE_LOAD_SCHEMA = {
  type: 'object',
  required: ['ok', 'fileExisted', 'items'],
  properties: {
    ok: { type: 'boolean', description: '読み込み・パース成功なら true。ファイルなしの初期化成功も true。jq パース失敗等は false' },
    fileExisted: { type: 'boolean', description: 'ファイルが存在した場合 true（新規作成した場合は false）' },
    items: {
      type: 'object',
      description: 'issue 番号（文字列キー）→ 状態オブジェクトのマップ。空オブジェクトも可',
      additionalProperties: true,
    },
  },
  additionalProperties: true,
}

// 状態書き込み確認スキーマ
const STATE_WRITE_SCHEMA = {
  type: 'object',
  required: ['ok'],
  properties: {
    ok: { type: 'boolean' },
  },
}

// ============================================================================
// セクション 4: 状態ファイル操作
// _/issue-trees/<parent>.json への読み書きを担う。並列実行時の競合を防ぐため
// enqueueStateWrite で書き込みを直列化する。
// ============================================================================

// --- 状態ファイル書き込みミューテックス ---
// parallel > 1 で複数の runOne が同時に updateState / initAllPending を呼ぶと
// jq の read-modify-write が競合して last-writer-wins で進捗が消える。
// 書き込み操作を Promise チェーンで直列化することで常に 1 つの jq だけが動く状態にする。
let stateQueue = Promise.resolve()
function enqueueStateWrite(fn) {
  const next = stateQueue.then(fn, fn) // 前段が失敗してもチェーンを止めない
  stateQueue = next.catch(() => {})
  return next
}

// --- 状態ファイル操作ヘルパー ---

// 状態ファイルを読み込む（存在しなければ初期 JSON を作成して返す）
// monitor / close エージェント（isolation なし）はメインリポの cwd で動くため _/ に直接アクセスできる
async function loadState() {
  const result = await agent(
    [
      `状態ファイル読み込みタスク。`,
      `【手順】`,
      `1. ${STATE_FILE} が存在するか test -f で確認する。`,
      `2. ファイルが存在する場合:`,
      `   a. jq . ${STATE_FILE} でパースを試みる（jq の終了コードで成否を判断する）。`,
      `   b. パース成功: items フィールドを返す。ok: true, fileExisted: true。`,
      `   c. パース失敗（jq が 0 以外の終了コード）: ok: false, fileExisted: true, items: {} を返す。`,
      `3. ファイルが存在しない場合:`,
      `   a. mkdir -p _/issue-trees を実行し、`,
      `   b. {"parent":${parent},"baseBranch":"${baseBranch}","parallel":${concurrency},"updatedAt":"","items":{}} を`,
      `   c. ${STATE_FILE} に書き込む。`,
      `   d. 書き込み成功: ok: true, fileExisted: false, items: {} を返す。`,
      `   e. 書き込み失敗: ok: false, fileExisted: false, items: {} を返す。`,
      `返却: ok（boolean）, fileExisted（boolean）, items（JSON オブジェクト）。`,
    ].join('\n'),
    { label: 'state:load', phase: 'Restore', model: 'haiku', effort: 'low', schema: STATE_LOAD_SCHEMA },
  )
  // 読み込み・初期化のいずれが失敗しても停止する
  // （壊れた・未永続化の状態で続行すると重複 PR・重複実装が発生する危険がある）
  if (!result?.ok) {
    if (result?.fileExisted) {
      throw new Error(
        `状態ファイル（${STATE_FILE}）の読み込みまたは JSON パースに失敗した。` +
        `ファイルを手動で確認・修復してから再実行すること。` +
        `削除してフレッシュスタートする場合は \`rm ${STATE_FILE}\` を実行する。`,
      )
    } else {
      throw new Error(
        `状態ファイル（${STATE_FILE}）の初期化に失敗した。` +
        `ディレクトリ作成・書き込み権限を確認してから再実行すること。`,
      )
    }
  }
  return result?.items ?? {}
}

// 指定イシューの状態を patch でマージ更新する（jq で安全に書き戻す）
// patch の値はすべて JSON.stringify 経由で埋め込む（インジェクション対策）
// issue 番号は整数検証済みのものだけ渡す
// options.cleanupWorktree: string のとき、そのパスを削除対象として worktree 削除と worktree フィールドのクリアを同エージェント内で実施する
//                          true のとき、patch.worktree を削除対象として同様に実施する
//                          falsy のとき、削除処理を行わない
// options.deleteBranch: true のとき、worktree 削除後に git branch -D -- <branch> を実行する。
//                       Recover の discard 経路でのみ使用する（continue では branch に WIP commit を
//                       残すため削除しない）。branch 名は isValidBranchName で検証し -- 終端で渡す。
// worktreePath は JSON.stringify 経由でプロンプトに埋め込むため、エージェント返却値由来でも安全に扱える
async function updateState(issueNumber, patch, options = {}) {
  assertInt(issueNumber, 'updateState issueNumber')
  // patch を JSON シリアライズしてプロンプトに安全に埋め込む
  const patchJson = JSON.stringify(patch)

  // worktreePath はホワイトリスト検証を通過したものだけを削除対象にする
  const rawCleanupPath =
    typeof options.cleanupWorktree === 'string'
      ? options.cleanupWorktree
      : options.cleanupWorktree
        ? (patch.worktree ?? '')
        : ''
  const sanitizedCleanupPath = sanitizeWorktreePath(rawCleanupPath)
  // メインリポ誤削除の防止は agent 側の削除タスクが担う（cwd 非依存で確実）:
  //   - git worktree list --porcelain で対象パスの実在を確認してから削除
  //   - 「メインリポ自身（先頭エントリの worktree 行）は絶対に削除しない」指示
  // 加えて sanitizeWorktreePath が `..` やシェル特殊文字を除外済み。
  // 以前は process.cwd() で JS 側にも二重ガードを設けていたが、Workflow サンドボックスに
  // process が無く、agent で cwd を解決する代替は脆弱だった（解決失敗時の fail-closed が
  // 削除をスキップしつつ patch の worktree フィールドはクリアして state と disk が乖離し、
  // Recover が防ぐはずの「branch already checked out」を再発させる / pwd 出力解析を誤る）。
  // cwd 非依存の agent ガードで十分なため JS 側ガードは撤去する。
  const cleanupWorktreePath = sanitizedCleanupPath
  // worktreePath は JSON.stringify 経由でエスケープしてプロンプトに埋め込む（インジェクション対策）
  const cleanupPathJson = JSON.stringify(cleanupWorktreePath)

  // 削除対象が patch の記録する worktree と異なる場合（旧 worktree を削除しつつ新パスを
  // 記録するケース）、削除後に .worktree を "" に上書きすると記録したばかりの新パスの
  // 追跡が失われる。クリアは「patch が worktree を持たない」「patch の worktree が空」
  // 「削除対象と同一パス」の場合に限る
  const patchWorktree = typeof patch.worktree === 'string' ? patch.worktree : null
  const clearWorktreeAfterCleanup =
    patchWorktree === null || patchWorktree === '' || patchWorktree === cleanupWorktreePath

  // deleteBranch: Recover の discard 時にのみ使用。branch 名を isValidBranchName で検証し、
  // git branch -D -- <branch> で安全に削除する（-- 終端でオプション誤認を防ぐ）。
  // continue 経路では渡さない（branch に WIP commit が残るため削除しない）。
  // WIP 退避済みのため削除後も reflog から復元できる（誤判定時の最後の保険）。
  const deleteBranchRaw = options.deleteBranch === true ? (patch.branch ?? '') : ''
  const deleteBranchValidated = isValidBranchName(deleteBranchRaw) ? deleteBranchRaw : ''
  // baseBranch と一致する場合は削除をスキップし警告する。
  // 状態ファイル破損・手動編集時に patch.branch がデフォルトブランチと同名になっても
  // baseBranch を削除しないようコード側でガードする（プロンプト指示の二重防御）。
  if (deleteBranchValidated && deleteBranchValidated === baseBranch) {
    log(`⚠️ updateState: deleteBranch "${deleteBranchValidated}" が baseBranch と同名のため削除をスキップする`)
  }
  const deleteBranchName = deleteBranchValidated && deleteBranchValidated !== baseBranch ? deleteBranchValidated : ''
  const deleteBranchJson = JSON.stringify(deleteBranchName)
  const deleteBranchInstructions = deleteBranchName
    ? [
        ``,
        `branch 削除タスク（worktree 削除後に同一エージェントで実施）:`,
        `対象 branch: ${deleteBranchJson}`,
        `1. ブランチが存在するか確認する: git branch --list -- ${deleteBranchJson}`,
        `2. 存在する場合（出力が空でない場合）: 以下のように削除する（インジェクション防止のため変数経由）:`,
        `     b=${deleteBranchJson}`,
        `     git branch -D -- "$b"`,
        `3. 存在しない場合（出力が空の場合）: 何もしない。`,
      ].join('\n')
    : ''

  const cleanupInstructions = (cleanupWorktreePath || deleteBranchInstructions)
    ? [
        ...(cleanupWorktreePath
          ? [
              ``,
              `worktree 削除タスク（同一エージェントで実施）:`,
              `対象パス: ${cleanupPathJson}`,
              `1. 対象パスが空文字なら何もしない。`,
              `2. git worktree list --porcelain を実行し、出力に対象パス（${cleanupPathJson}）が含まれるか確認する。`,
              `   メインリポ自身（先頭エントリの worktree 行）は絶対に削除しない。`,
              `3. 含まれる場合: パスをシェル変数に格納してから削除する（インジェクション防止のため必ずこの手順を守る）:`,
              `     p=${cleanupPathJson}`,
              `     git worktree remove --force -- "$p"`,
              `   （merge 済みのため --force でよい。クリーン確認は不要）`,
              `   含まれない場合・すでに存在しない場合: 何もせず正常終了する。`,
              `4. 削除後（または削除不要の場合も）: git worktree prune を実行する。`,
              ...(clearWorktreeAfterCleanup
                ? [
                    `5. 削除完了後、${STATE_FILE} の .items["${issueNumber}"].worktree を "" に更新する。`,
                    `   更新方法（mktemp で衝突回避・--argjson でインジェクション対策）:`,
                    `     tmp=$(mktemp "${STATE_FILE}.XXXXXX")`,
                    `     jq --argjson patch '{"worktree":""}' '.items["${issueNumber}"] = ((.items["${issueNumber}"] // {}) + $patch) | .updatedAt = $ts' --arg ts "$(date -u +%FT%TZ)" ${STATE_FILE} > "$tmp" && mv "$tmp" ${STATE_FILE}`,
                  ]
                : [
                    `5. ${STATE_FILE} の .items["${issueNumber}"].worktree は更新しない`,
                    `   （状態ファイル更新タスクで新しい worktree パスを記録済みのため、上書きしないこと）。`,
                  ]),
            ]
          : []),
        // deleteBranch は worktree 削除の有無にかかわらず実行する（discard 時に worktree が
        // 既に存在しない場合でも branch だけ残ることがあるため独立して削除する）
        ...(deleteBranchInstructions ? [deleteBranchInstructions] : []),
      ].join('\n')
    : ''

  const result = await enqueueStateWrite(() =>
    agent(
      [
        `状態ファイル更新タスク。`,
        `${STATE_FILE} の .items["${issueNumber}"] に以下の JSON をマージし、`,
        `.updatedAt を \`date -u +%FT%TZ\` の値に更新して書き戻す。`,
        `マージする JSON（以下コードブロック内がそのまま JSON データ）:`,
        `\`\`\`json`,
        `${patchJson}`,
        `\`\`\``,
        `書き戻し方法: jq コマンドで行い、mktemp で一時ファイルを2つ作成して安全に上書きする（衝突回避）。`,
        `patch JSON は HEREDOC でファイルに書き出し --slurpfile で読み込むこと（アポストロフィ等の特殊文字が含まれても安全）。`,
        `例:`,
        `  patch_file=$(mktemp)`,
        `  cat <<'PATCH_EOF' > "$patch_file"`,
        `${patchJson}`,
        `  PATCH_EOF`,
        `  tmp=$(mktemp "${STATE_FILE}.XXXXXX")`,
        `  jq --slurpfile patch "$patch_file" '.items["${issueNumber}"] = ((.items["${issueNumber}"] // {}) + $patch[0]) | .updatedAt = $ts' --arg ts "$(date -u +%FT%TZ)" ${STATE_FILE} > "$tmp" && mv "$tmp" ${STATE_FILE}`,
        `  rm -f "$patch_file"`,
        cleanupInstructions,
        `返却: ok: true（成功時）/ ok: false（失敗時）。`,
      ].join('\n'),
      { label: `state:update:#${issueNumber}`, phase: 'State', model: 'haiku', effort: 'low', schema: STATE_WRITE_SCHEMA },
    ),
  )
  if (result?.ok !== true) {
    log(`⚠️ 状態ファイル更新失敗（issue #${issueNumber}）: エージェントが ok:false を返した`)
    return false
  }
  return true
}

// 全イシューを pending で一括初期化する（既存状態があるものは上書きしない）
// 1 回の haiku エージェントでまとめて処理する
async function initAllPending(queueItems) {
  // キューの各アイテムを { type, status: "pending", ... } で初期化する JSON を構築する
  const initEntries = queueItems.map((item) => ({
    number: item.number,
    type: item.kind === 'verify-close' ? 'verify-close' : 'implement',
  }))
  const initJson = JSON.stringify(initEntries)
  const result = await enqueueStateWrite(() =>
    agent(
      [
        `状態ファイル一括初期化タスク。`,
        `以下のイシューリストについて、${STATE_FILE} の .items に存在しないエントリのみ追加する（既存エントリは上書きしない）。`,
        `追加するエントリの初期値: {"status":"pending","pr":0,"branch":"","worktree":"","fixCount":0,"note":""}`,
        `イシューリスト（JSON 配列）: ${initJson}`,
        `jq を使い mktemp で一時ファイルを作成して安全に上書きする（衝突回避）。`,
        `ヒント: reduce を使って各エントリを条件付きで追加できる。`,
        `例:`,
        `  tmp=$(mktemp "${STATE_FILE}.XXXXXX")`,
        `  jq --argjson entries '${initJson}' 'reduce $entries[] as $e (.; if .items[($e.number|tostring)] == null then .items[($e.number|tostring)] = {"type":$e.type,"status":"pending","pr":0,"branch":"","worktree":"","fixCount":0,"note":""} else . end) | .updatedAt = $ts' --arg ts "$(date -u +%FT%TZ)" ${STATE_FILE} > "$tmp" && mv "$tmp" ${STATE_FILE}`,
        `返却: ok: true（成功時）/ ok: false（失敗時）。`,
      ].join('\n'),
      { label: 'state:init-all', phase: 'State', model: 'haiku', effort: 'low', schema: STATE_WRITE_SCHEMA },
    ),
  )
  if (result?.ok !== true) {
    log(`⚠️ 状態ファイル一括初期化失敗: エージェントが ok:false を返した`)
  }
}

// ============================================================================
// セクション 5: プロンプト構築
// 各エージェント（Plan/Review/Implement/Monitor/Fix/Close）に渡すプロンプト文字列を
// 組み立てる純粋関数群。COMMON・サニタイズ済み値・スキーマ参照に依存する。
// ============================================================================

// per-issue Plan エージェントのプロンプト。
// isolation なし（メインリポ cwd で読み取りのみ）。計画立案はコード変更を伴わないため
// worktree 不要 = セットアップコストを削減できる。
// 計画本文は返り値（PLAN_SCHEMA.plan）で Implement エージェントへ渡す。
// worktree 跨ぎのファイル参照を避けるため、ファイルへの書き出しは任意とする。
function planPrompt(item) {
  const title = sanitize(item.title)
  return [
    `イシュー #${item.number}「${title}」の実装計画を立案する担当エージェント。`,
    COMMON,
    '本エージェントは読み取りのみを行い、コードの変更・コミット・PR 作成は行わない。',
    '手順:',
    `1. gh issue view ${item.number} でイシュー本文・受入基準を読む。`,
    '2. 対象リポジトリの CLAUDE.md・.claude/rules・関連コード・テスト実行規約を調査する。',
    '3. create-plan / implement-issue の計画粒度で実装計画を立てる。計画には以下を含める:',
    '   - 背景・目的（イシューが解決する課題）',
    '   - 対象ファイル・変更箇所（パスと変更内容の概要）',
    '   - 実装ステップ（順番に実行可能な具体的手順）',
    '   - 検証方法（ビルド・lint・テスト・動作確認の手順）',
    '   - OWASP Top 10 観点のセキュリティ考慮事項',
    '4. 計画本文を plan フィールドに markdown 形式で返す。',
    '返却: plan（実装計画の本文 markdown）/ summary（計画の 1 行要約）。',
  ].join('\n')
}

// 独立 Review フェーズのプロンプト（push 前ローカル diff レビュー版）。
// push 前のローカルブランチを対象にするため git fetch / origin 参照は不要。
// worktree は .git を共有するため、impl が作ったローカルブランチは別 worktree からでも
// 参照できる。ブランチが他の worktree で checkout 済みの可能性があるため detach で取得する。
// 修正は行わず判定のみを担う（修正は fix エージェントへ委譲される）。
// Low（要改善）含む指摘が 1 件でもあれば needs-fix を返す（安全側に倒す）。
// impl.branch は sanitizeBranch 検証済みの値を渡すこと。
function reviewPrompt(item, impl) {
  const branch = sanitizeBranch(impl.branch)
  return [
    `イシュー #${item.number}（ブランチ ${branch}）のコードレビュー担当エージェント（push 前ローカル diff レビュー）。`,
    COMMON,
    '本エージェントは判定のみを行い、コードの変更・コミット・push は行わない。',
    // push 前レビューのため origin には当該ブランチがまだ存在しない。
    // worktree は .git を共有するため impl のローカルコミットをそのまま参照できる。
    'push 前の段階であり origin に対象ブランチはまだ存在しない。git fetch は不要。',
    '手順:',
    `1. git checkout --detach ${branch} でローカルブランチを detached HEAD として取得する。`,
    `   （ブランチが別 worktree で checkout 済みでも detach なら衝突しない）`,
    `   （ブランチ名は ${JSON.stringify(branch)} — 変数展開不要、そのまま使用する）`,
    `2. implement-review スキルに従い、git diff ${baseBranch}...HEAD のローカル diff を対象に品質・セキュリティレビューを実施する。`,
    `   （origin/${baseBranch} ではなくローカルの ${baseBranch} ブランチと比較する。fetch 不要）`,
    '   レビュー観点:',
    '   - 実装品質（設計・可読性・エッジケース・テストカバレッジ）',
    '   - OWASP Top 10 セキュリティ（インジェクション・認証・秘密情報露出等）',
    '   - 対象リポジトリの CLAUDE.md・rules への準拠',
    '3. Low（要改善）含む指摘が 1 件でもあれば state: needs-fix とし、summary に全指摘を重要度付き（Critical / High / Medium / Low）で列挙する。',
    '   指摘がなければ state: ok とし、summary に確認した観点と問題なしの旨を記す。',
    '4. highestSeverity に全指摘のうち最も高い重要度を入れる（Critical→critical / High→high / Medium→medium / Low→low）。指摘なし（state=ok）は none。',
    '   重要: 重要度は厳密に判定すること。Low は「動作に影響しない様式・命名・重複・行数・コメント等の改善提案」に限る。',
    '   実バグ・誤った挙動・セキュリティ・認可・データ不整合・エッジケースの欠落は最低でも medium とする（最終ラウンドで Low のみは通過扱いになるため）。',
    '返却: state（"ok" または "needs-fix"）/ highestSeverity / summary。',
  ].join('\n')
}

// 最終 Review ラウンドで Low のみだった場合に、その Low 指摘を PR コメントとして記録するエージェント。
// マージはブロックせず（3 回目は Low 許容方針）、マージ後の follow-up 候補として PR に残す。
// 呼び出し元は PR 作成成功後（prNumber 確定後）にのみ起動する。
function lowFindingsCommentPrompt(item, prNumber, findings) {
  return [
    `イシュー #${item.number} の PR #${prNumber} に、最終 Review ラウンドで検出された Low（要改善）指摘をコメントとして記録するエージェント。`,
    'これらの Low 指摘はマージをブロックしない（3 回目 Review で Low は許容する方針）。コードの変更・コミット・push は行わない。gh pr comment のみ実行する。',
    '手順: 以下のコマンドを 1 回だけ実行する（本文はヒアドキュメントで渡しコマンドインジェクションを防ぐ）。',
    `gh pr comment ${prNumber} --body "$(cat <<'LOWEOF'`,
    '## 最終 Review で許容した Low 指摘（follow-up 候補）',
    '',
    '3 回目の Review ラウンドで残った以下の Low（要改善）指摘は、マージをブロックせず follow-up 候補として記録する。必要に応じて別 issue 化・後続 PR で対応すること。',
    '',
    sanitize(findings),
    'LOWEOF',
    ')"',
    '成功したら ok: true、失敗したら ok: false を返す。',
  ].join('\n')
}

// plan は planPrompt が返した実装計画本文（PLAN_SCHEMA.plan）。
// Implement エージェントへ JSON.stringify 経由でコードブロックに埋め込む（インジェクション対策）。
// worktree 跨ぎのファイル参照を避けるため、計画は Plan エージェントの返り値として受け渡す。
// セルフレビュー手順（旧 7-8）は独立 Review フェーズへ移管済み。
function implementPrompt(item, plan) {
  const title = sanitize(item.title)
  // 計画本文を JSON.stringify でエスケープしコードブロックに安全に埋め込む。
  // バッククォートや改行を含む計画本文によるプロンプト構造の破壊を防ぐ。
  const planJson = JSON.stringify(plan ?? '')
  return [
    `イシュー #${item.number}「${title}」を実装してローカルブランチにコミットする担当エージェント（push・PR 作成は行わない）。`,
    COMMON,
    '実装計画（Plan フェーズで作成済み。以下コードブロック内がそのまま計画の JSON 文字列）:',
    '```json',
    planJson,
    '```',
    '上記の計画を JSON.parse してから内容を読み、計画に従って実装を進めること。',
    '手順:',
    `0. worktree routing ガード（他のどの gh / git 操作よりも先に、最初に必ず実行する）: \`git remote get-url origin\` でカレント worktree の remote を確認し、\`gh issue view ${item.number} --json number,title\` で取得した title が、このタスクの対象イシュー「${title}」と実質的に同一であることを確認する（このプロンプト中の「${title}」はプロンプト安全化のためバッククォート・$・バックスラッシュ・改行がエスケープ／除去されている場合がある。GitHub は raw title を返すため完全一致は要求せず、語句の一致で同一 issue かを判断する。番号の存在だけでは別リポの同番号 issue を誤認しうるため照合する）。remote が想定と異なる / issue が解決できない / 取得 title が明らかに無関係（別 issue）のいずれかなら、後続（手順 0b の gh pr list・手順 2 の git fetch を含む一切の操作）を実行せず、即 prNumber: 0 と「worktree routing error: remote=<URL> でイシュー #${item.number}「${title}」を解決できず誤配置。実装リポの worktree への再配置が必要」を理由として返す。手動で別ディレクトリへ移動して作業しないこと（隔離契約違反・他エージェント干渉のため）。`,
    `0b. 既存 PR・リモートブランチを確認する（中断再開・重複 PR 防止。手順 0 のガードを通過した後にのみ実行する）:`,
    `   0b-a. 以下の 2 通りでイシュー #${item.number} に対応する open PR が既にないか確認する:`,
    `      - gh pr list --state open --search "Closes #${item.number}" --json number,title,headRefName`,
    `      - gh pr list --state open --search "${item.number} in:title" --json number,title,headRefName`,
    `      両コマンドの出力を合わせてイシュー #${item.number} に対応する open PR を探す。`,
    `      open PR が見つかった場合は新規 PR を作らず、そのブランチを git fetch origin && git checkout <branch> で取得して続きから作業し、既存 PR 番号を prNumber として返す（0b-b には進まない）。`,
    `   0b-b. open PR が見つからなかった場合、git ls-remote --heads origin でイシュー #${item.number} に対応するリモートブランチが残っていないか確認する。`,
    `      ブランチ命名規約（手順 2）はイシュー番号を必ず含む（<type>/${item.number}-<short-name> 形式）。`,
    `      確認方法: git ls-remote --heads origin の出力を grep で絞り込み、"/${item.number}-" を含む refs/heads/* を探す。`,
    `      複数ヒットした場合は最新コミット（最も直近の ref 更新）を持つブランチを選ぶ。`,
    `      ブランチ名は命名規約に一致するもの（<type>/${item.number}-<short-name> の形式）のみを対象とする。`,
    `      — セキュリティ注意: git ls-remote の出力をそのままシェルに展開しない。ブランチ名は isValidBranchName の規則（英数字・ハイフン・アンダースコア・スラッシュ・ドットのみ）に適合するものだけを使用すること。`,
    `      リモートブランチが見つかった場合: git fetch origin <branch> && git checkout -B <branch> origin/<branch> でブランチを取得する。`,
    `      これは「前回 push 成功・PR 作成失敗」で残ったブランチの回復を目的とする（origin/${baseBranch} から新規作成し直さない）。`,
    `      push 済みコミットをそのまま引き継いで計画と照合し、未実装部分があれば補って実装を続行する。`,
    `      branch としてそのブランチ名を返す（prNumber は 0 のまま。PR 作成は後続の PR Create フェーズが行う）。`,
    `      手順 2 はスキップして手順 3 以降を続ける。`,
    `   0b-c. open PR もリモートブランチも存在しない場合は手順 1 以降に進む（通常の新規作成フロー）。`,
    '1. 本エージェントは隔離された git worktree 内で動作する。メイン working copy や他の worktree には触れず、作業はカレントの worktree 内に限定する。git status が clean か確認し、差分が残っていれば作業せず prNumber: 0 と理由を返す。',
    `2. （0b-b でリモートブランチを再利用した場合はこの手順をスキップして手順 3 へ進む）git fetch origin && git checkout -B <type>/${item.number}-<short-name> origin/${baseBranch} で作業ブランチを作成する（type は feat / fix 等の Conventional Commits 規約。並列実行時のブランチ名衝突を防ぐためイシュー番号を必ず含める）。`,
    '3. 渡された計画に従って実装する（計画立案は Plan フェーズで完了済み。ここでは計画に記載の実装ステップを実行するのみ）。実装は対象リポジトリの delegation ルール・専門サブエージェントがあればそれに従い役割単位で委譲する。対象リポジトリの CLAUDE.md・rules（migration・スキーマ等の不変条件を含む）を必ず守る。',
    '   コメント方針: コードコメントは「何をするか」より「なぜ存在するか／パッケージ・サービスから見た対象の役割」を書く。呼び出し元/呼び出し先・他サービスからの観点（このシンボルがどこから呼ばれ、どの境界を担うか）を明示し、対象リポジトリの .claude/rules/code-comment-style.md があればそれに従う。',
    '4. 完了条件: 対象リポジトリのテスト実行規約に従い、ビルド・lint・テストを実行して pass すること。フォーマッタ・静的解析があればコミット前に通す。',
    '5. 実装後に OWASP Top 10 観点でセキュリティチェックを実施する（API キーのハードコード・インジェクション等）。問題が見つかった場合は修正してから次へ進む。',
    '6. 実装が完了したら create-commit スキルに従い Conventional Commits で実装コミットを 1 つ作成する（type/scope は英語、件名は対象リポジトリの言語規約に従う）。',
    // push・PR 作成は Review 通過後に行う（CI リソース節約のため）。
    // Review が収束失敗した場合は push も PR 作成も行わず CI を一切起動しない。
    '7. push・PR 作成はここでは行わない。ローカルブランチにコミットを積んだ状態で終了する。',
    '   （push と PR 作成は後続の Review が全通過した後に別エージェントが行う）',
    '   実装の過程で現スコープ外と判断した事項（未対応の改善・別機能・技術的負債・後続作業）は変数等に記録しておき、',
    '   summary に「対象外（out-of-scope）」として列挙する（push 後の PR 本文への記録は後続エージェントが行う）。',
    '8. pwd の結果を worktreePath として返す（worktree の絶対パスを記録するため）。',
    '返却: branch / summary（実装内容の要約。対象外項目を含む。失敗時は理由と現状）/ worktreePath（pwd の結果）。',
    '（prNumber は PR 未作成のため返却しない。返しても 0 として扱われる）',
  ].join('\n')
}

// externalApps: Tree フェーズで detect:external-checks が返した外部チェック App slug 配列。
// 空配列 = 外部チェックなし（GitHub Actions のみ）→ Bugbot 待機手順を出力しない。
// "cursor" を含む → 現行 cursor[bot] フローをそのまま出力する。
// cursor 以外のみ（例: sonarcloud）→ CI チェックとして gh pr checks --watch が既に監視済み
//   のため追加待機節は出さず、一文のみ添える。
function monitorPrompt(item, impl, externalApps) {
  const apps = Array.isArray(externalApps) ? externalApps : []
  const hasCursor = apps.includes('cursor')

  // 手順 4: 外部チェック待機節を externalApps に基づいて組み立てる
  let step4Lines
  if (apps.length === 0) {
    // 外部チェックなし: Bugbot 待機手順を出力しない
    step4Lines = [
      `4. 直前 PR 分析の結果 GitHub Actions 以外の外部チェックを使用していないため外部レビュー待機はスキップする。CI 全 green（pending/failure 0 件）と未解決スレッドなしのみで判定する（手順 5 へ進む）。`,
    ]
  } else if (hasCursor) {
    // cursor あり: 現行の cursor[bot] フローをそのまま出力する
    step4Lines = [
      `4. CI が全 green になったら HEAD sha に対する Bugbot（cursor[bot]）レビューを確認する:`,
      `   a. gh api "repos/{owner}/{repo}/pulls/${impl.prNumber}/reviews" で cursor[bot] のレビュー一覧を取得し、commit_id が手順 1 で取得した HEAD sha と一致するレビューがあるかを確認する。`,
      `   b. HEAD sha に対する cursor[bot] レビューがまだない場合: HEAD push から 1 分以上経過しても Bugbot チェックが開始していなければ、HEAD push 以降に "@cursor review" コメントが未投稿であることを確認したうえで gh pr comment ${impl.prNumber} --body "@cursor review" を 1 回だけ投稿し、開始・完了を最大 5 分待つ。投稿しても到着しない場合は再投稿せず Bugbot レビューなしとして扱い先へ進む（マージをブロックしない）。`,
      `   c. HEAD sha に対する cursor[bot] レビューが到着したら内容を確認する。新規バグ指摘があれば CI が pass でも state: needs-fix とし指摘全文を summary に含める。過去コミットへの指摘で対応するレビュースレッドが resolved 済みのものは needs-fix の根拠にしない（修正済み指摘の再検出による偽 needs-fix を防ぐ）。`,
    ]
  } else {
    // cursor 以外の外部チェックのみ（sonarcloud 等のステータス型）:
    // gh pr checks --watch（手順 2）が既にステータスチェックを監視しているため追加待機節は不要。
    const appList = apps.map(sanitize).join(', ')
    step4Lines = [
      `4. 外部チェック（${appList}）は CI チェックとして gh pr checks --watch（手順 2）で既に監視済みのため、追加の外部レビュー待機手順は実施しない（手順 5 へ進む）。`,
    ]
  }

  return [
    `PR #${impl.prNumber}（イシュー #${item.number}）の CI / 外部チェック監視・レビューコメント確認・マージ判定の担当。修正作業は行わない。`,
    COMMON,
    '手順:',
    `1. まず gh pr view ${impl.prNumber} --json state,headRefOid で PR の状態と HEAD sha を取得して固定する。state が MERGED の場合（前回実行で状態記録に失敗したマージ済み PR の再監視）は CI 監視を行わず、手順 6 のイシュークローズ確認のみ実施して即 state: merged を返す。state が CLOSED（未マージクローズ）の場合は state: blocked とし summary に理由を書く。fix 後に再監視するたびに sha を取り直す（古い sha を参照しないため）。`,
    `2. gh pr checks ${impl.prNumber} --watch --interval 60 で全チェック完了まで監視する（Bash の timeout に 600000 を指定し、コマンドがタイムアウトしたら同コマンドを再実行。再実行は 4 回まで = 最長およそ 40 分）。`,
    `3. watch 完了後、gh pr checks ${impl.prNumber} の出力で全チェックの結論を列挙して確認する。「watch が終わった」だけでは合格にしない。以下を厳密に確認する:`,
    '   a. 全チェックが success / neutral / skipped で完了していること（failure / cancelled / timed_out が 0 件）。',
    '   b. pending / queued / in_progress が 0 件であること。残っていれば再 watch する。',
    '   c. いずれかが failure / cancelled / timed_out の場合: gh run view --log-failed 等で原因を特定し state: needs-fix。summary に修正に必要な情報をすべて書く。変更と無関係な flaky と明確に判断できる場合に限り 1 回だけ gh run rerun <run-id> --failed で再実行して再監視する。再発した場合や変更起因の場合は state: needs-fix。',
    '   d. マージコンフリクトがあれば state: needs-fix とし、summary にコンフリクト解消が必要と書く。',
    ...step4Lines,
    `5. CI 全 green（pending/failure 0 件）かつ外部チェック指摘なし（または外部チェックなし確定）の場合、GraphQL API でレビュースレッドの全件を確認する（100 件超はページネーション必須）:`,
    '   cursor=""; hasNextPage=true; unresolved=()',
    `   while $hasNextPage: gh api graphql -f query='query($owner:String!,$name:String!,$number:Int!,$cursor:String){repository(owner:$owner,name:$name){pullRequest(number:$number){reviewThreads(first:100,after:$cursor){nodes{isResolved comments(last:1){nodes{body author{login}}}}pageInfo{hasNextPage endCursor}}}}}' -F owner="{owner}" -F name="{repo}" -F number=${impl.prNumber} -F cursor="$cursor"`,
    '   → 各ページの isResolved:false スレッドを unresolved に追加し、pageInfo.hasNextPage/endCursor で次ページへ進む。',
    '   - unresolved が 1 件でもあれば state: unresolved-comments。summary に各未解決スレッドの最終コメント内容（author + body）をすべて列挙する。',
    '   - 全スレッド解決済み（または未解決スレッドなし）の場合のみ次のステップに進む。',
    `6. CI 全 green（pending/failure 0 件）・外部チェック指摘なし（または外部チェックなし確定）・未解決レビューコメントなしの全条件が揃ったら gh pr merge ${impl.prNumber} --squash --delete-branch でマージする。`,
    `7. マージ後、gh issue view ${item.number} --json state でクローズを確認し、open のままなら gh issue close ${item.number} する。他のイシューが並列実行中のため、working copy のブランチ切り替えや git pull は行わない。`,
    '8. 監視上限まで待っても完了しない場合は state: timeout。自力で解決できない事象は state: blocked。',
    '返却: state / summary。',
  ].join('\n')
}

// Review が全通過した後に呼ばれる push + PR 作成エージェントのプロンプト。
// impl フェーズで積んだローカルコミットをここで初めて push し、PR を作成する。
// この push が CI トリガーになる（push は 1 回のみ）。
// PR 作成後に prNumber を返し、以降の Merge ループへ渡す。
// impl.branch は sanitizeBranch 検証済みの値を渡すこと。
// outOfScope: impl の summary から抽出した対象外項目のテキスト（PR body に記録する）。
function prCreatePrompt(item, impl, outOfScope) {
  const branch = sanitizeBranch(impl.branch)
  const title = sanitize(item.title)
  const outOfScopeSection = outOfScope
    ? `\n\n## 対象外（out-of-scope）\n${sanitize(outOfScope)}`
    : ''
  return [
    `イシュー #${item.number}「${title}」の実装コミット（ブランチ ${branch}）を push して PR を作成する担当エージェント。`,
    COMMON,
    'Review フェーズが全通過した後にのみ呼ばれる。この push が CI トリガーになる（push はこの 1 回のみ）。',
    '手順:',
    `1. git push origin ${branch} でローカルブランチを push する（Bash の timeout に 600000 を指定）。`,
    `   push が失敗した場合は prNumber: 0 と失敗理由を返す。`,
    `2. create-pr スキルに従い base ${baseBranch} で PR を作成する。`,
    `   body のテンプレート:`,
    '   ```',
    '   ## Summary',
    '   - 実装内容の要約',
    '',
    `   Closes #${item.number}`,
    outOfScopeSection,
    '   ```',
    `   body に必ず「Closes #${item.number}」を含めること。`,
    `   （ブランチ名は ${JSON.stringify(branch)} — 変数展開不要、そのまま使用する）`,
    '3. PR 作成成功後、prNumber を返す。',
    '返却: prNumber（失敗時 0）/ summary（push・PR 作成の結果要約）。',
  ].join('\n')
}

// Review ループ内の fix（push しない版）または Merge ループの fix（push する版）のプロンプト。
// pushAfterFix: true のとき Merge ループ由来（CI 失敗等）→ 修正後に push する。
// pushAfterFix: false のとき Review ループ由来（Review 指摘）→ ローカルに再コミットするだけ。
// Review fix が push しないのは、収束失敗時に CI を起動させないため（CI リソース節約）。
function fixPrompt(item, impl, finding, pushAfterFix = true) {
  const branch = sanitizeBranch(impl.branch)
  const title = sanitize(item.title)
  // push しない Review fix では branch は別 worktree に checkout 済みのためローカル
  // ブランチを detach で取得し、修正コミット後に `git branch -f <branch> HEAD` で先端更新する。
  const checkoutInstructions = pushAfterFix
    ? [
        `1. 本エージェントは隔離された git worktree 内で動作する。ブランチ ${branch} は他の worktree で checkout 済みの可能性があるため、git fetch origin && git checkout --detach origin/${branch} で detached HEAD として取得して作業する。マージコンフリクトの解消が必要な場合は git merge origin/${baseBranch} を実行して解消する。`,
      ]
    : [
        `1. 本エージェントは隔離された git worktree 内で動作する。push 前のローカル修正のため fetch は不要。`,
        `   git checkout --detach ${branch} でローカルブランチを detached HEAD として取得する。`,
        `   （ブランチが別 worktree で checkout 済みでも detach なら衝突しない）`,
        `   マージコンフリクトの解消が必要な場合は git merge ${baseBranch}（ローカル）を実行して解消する。`,
      ]
  const commitAndPushInstructions = pushAfterFix
    ? [
        `4. create-commit スキルに従いコミットし、git push origin HEAD:refs/heads/${branch} で反映する。`,
      ]
    : [
        `4. create-commit スキルに従いコミットする。push はしない（Review 通過後にまとめて push する）。`,
        `   コミット後に git branch -f ${branch} HEAD でローカルブランチの先端を更新する`,
        `   （detached HEAD 作業後のブランチ先端を確実に更新するため）。`,
      ]
  return [
    pushAfterFix
      ? `PR #${impl.prNumber}（イシュー #${item.number}、ブランチ ${branch}）への指摘を修正する担当。`
      : `イシュー #${item.number}（ブランチ ${branch}）への Review 指摘をローカルで修正する担当（push はしない）。`,
    COMMON,
    '指摘内容:',
    sanitize(finding.summary),
    '手順:',
    `0. worktree routing ガード（他のどの gh / git 操作よりも先に、最初に必ず実行する）: \`git remote get-url origin\` でカレント worktree の remote を確認し、\`gh issue view ${item.number} --json number,title\` で取得した title が、このタスクの対象イシュー「${title}」と実質的に同一であることを確認する（プロンプト中の「${title}」は安全化のため記号がエスケープ／除去されている場合があるため完全一致は要求せず語句の一致で判断する。番号の存在だけでは別リポの同番号 issue を誤認しうる）。remote が想定と異なる / issue が解決できない / 取得 title が明らかに無関係（別 issue）のいずれか（= submodule 等の別リポ worktree に誤配置）なら、git fetch / git push を含む後続を一切実行せず、即 \`routingError: true\`・\`pushed: false\`・summary に「worktree routing error: remote=<URL> で誤配置」を入れて返す（routingError は「push 不要（修正済み）」と区別され、オーケストレーターが即 blocked にする）。`,
    ...checkoutInstructions,
    '2. 指摘を重要度を問わずすべて修正する（実装は対象リポジトリの delegation ルール・専門サブエージェントがあればそれに従い委譲する）。対象リポジトリの CLAUDE.md・rules の不変条件（migration・スキーマ等）を守る。',
    '3. 対象リポジトリのテスト実行規約に従い、ビルド・lint・テストを実行して通す。',
    ...commitAndPushInstructions,
    ...(pushAfterFix
      ? ['5. unresolved-comments の指摘を修正した場合は、対応したスレッドを gh api graphql の resolveReviewThread ミューテーションで解決済みにマークする（可能な場合）。']
      : []),
    `${pushAfterFix ? '6' : '5'}. pwd の結果を worktreePath として返す（worktree の絶対パスを記録するため）。`,
    '返却: pushed / summary / worktreePath（pwd の結果）/ routingError（手順 0 で worktree 誤配置を検出した場合のみ true。その際 pushed は false。誤配置でなければ省略可）。',
  ].join('\n')
}

function closePrompt(item) {
  const title = sanitize(item.title)
  return [
    `親イシュー #${item.number}「${title}」の完了検証とクローズの担当。配下の子イシューは本ワークフローで処理済み。`,
    COMMON,
    '手順:',
    `1. gh api --paginate "repos/{owner}/{repo}/issues/${item.number}/sub_issues?per_page=100" で全子イシューを全件取得し（--paginate が 100 件超も自動で全ページ取得する）、全子イシューが closed であることを確認する。open が残っていれば closed: false で理由を返す。`,
    `2. gh issue view ${item.number} で本文の受入基準・チェックリストを読み、子イシューのマージ済み PR で満たされているか確認する。満たされたチェックボックスは更新してよい。`,
    `3. 満たされていれば完了サマリーをコメントしてから gh issue close ${item.number} する。実装漏れ・残課題がある場合はクローズせず closed: false で残課題を summary に書く。`,
    '返却: closed / summary。',
  ].join('\n')
}

// Recover フェーズのプロンプト。中断した worktree・branch に残った作業が継続可能かを判断する。
//
// 判断軸の設計について:
//   Review（reviewPrompt）は「実装が正しいか・マージできるか」を判定する。
//   Recover は「この途中作業から継続するのが妥当か」を判定する。判断軸が根本的に異なる。
//   中断 diff は「変更途中で動かない」可能性があるため、diff の有無だけを Review 行きの
//   根拠にしてはならない。動かない・未完成でも、方向が妥当なら continue を選ぶ。
//   残りの完成は Implement が担うため、Recover は完成度ではなく方向の妥当性を判定する。
//
// 回復を Implement へ戻す理由:
//   回復した作業は「未完成かもしれない」状態なので、Review に直行させてはならない。
//   Review は完成した実装を審査する場。未完成のまま送ると Review が指摘を出し続け、
//   実質的に「Recover → Review → Fix → Review ...」という二重ループになる。
//   Recover → Implement（完成させる）→ Review（完成品を審査）の順を守ることで
//   Review の責務を明確に保ち、収束失敗のリスクを下げる。
//
// WIP commit による退避の必要性:
//   物理 worktree は engine 隔離モデルにより作業後に削除される。未 commit 変更は
//   worktree と運命を共にするため、削除前に branch へ退避しないとデータが失われる。
//   WIP commit として branch に退避しておけば、物理 worktree を削除しても branch を
//   checkout すれば作業を継続できる。discard 時でも WIP commit を先に積んでから
//   branch を削除するため、誤判定時は reflog から復元できる（最後の保険）。
//
// isolation なし（メインリポ cwd）: worktree/branch はグローバル状態のため、Plan と
// 同様に非隔離で操作する（worktree 隔離では git -C <oldwt> が別 worktree を指し、
// グローバル branch ref 操作や git diff origin/<base>...<branch> ができない）。
// item / branch / oldWorktree は sanitize / sanitizeBranch / sanitizeWorktreePath 検証済みを渡すこと。
//
// branch が空かつ oldWorktree が非空の場合（state に branch 記録なし・worktree あり）:
//   エージェントが worktree HEAD からブランチ名を解決する「ブランチ解決ステップ」を先頭に追加する。
//   解決できなければ decision を返さず（または "unresolved"）保全のため driver が failed にする。
//   これにより、後続 Plan→Implement の git checkout -B が同一ブランチを origin/base から
//   サイレントリセットし WIP commit が消えるデータ損失（Missing branch forces discard data loss）を防ぐ。
function recoverPrompt(item, branch, oldWorktree) {
  const title = sanitize(item.title)
  const branchJson = JSON.stringify(branch)
  const oldWorktreeJson = JSON.stringify(oldWorktree)

  // ブランチ解決ステップ: oldWorktree が非空のとき常に先頭に挿入する。
  // WIP commit は git -C <worktree> commit で worktree が実際にチェックアウト中の
  // ブランチ（= worktree HEAD）に積まれる。退避先・継続先はこの worktree HEAD で
  // なければならない。state に branch が記録されていても、それが worktree HEAD と
  // 食い違うと continue が別ブランチを checkout して WIP を取り残す
  // （Stale branch wins over worktree, PR #76 修正）。そのため state branch は参考値に
  // 留め、worktree HEAD を権威ある「対象ブランチ」として確定する。
  // このステップで確定したブランチ名を以降の手順（step1 WIP 退避・step2b diff 読み取り・判断）で使う。
  // 解決失敗時（detached HEAD など）は WIP commit・diff 取得・削除を一切実行せず保全して返す。
  //
  // dead worktree（state に worktree パス記録ありだが実体なし）: rev-parse はパス不在で
  // エラーになる。この場合 WIP は積みようがない（取り残しリスクが無い）ため、state branch が
  // あれば branch-only 回復へ切り替える。worktreeMissing: true を返して driver に state branch
  // フォールバックを許可させる（Dead worktree path blocks branch, PR #42 修正）。
  const resolveStepLines = oldWorktree
    ? [
        `【ブランチ解決ステップ】（WIP 退避先・継続先を確定するため worktree の実ブランチを特定する）`,
        `   git -C ${oldWorktreeJson} rev-parse --abbrev-ref HEAD を実行してチェックアウト中のブランチ名を取得する。`,
        `   - コマンドがパス不在 / git worktree でないことを理由に失敗した場合（dead worktree）:`,
        `     worktree の実体が無いため WIP commit は不要（取り残すデータが無い）。worktreeMissing: true を返す。`,
        ...(branch
          ? [
              `     state branch "${branch}" を「対象ブランチ」として branch-only 回復に切り替える`,
              `     （WIP 退避はスキップ。手順 2b の diff 読み取り・手順 3 の判断はこの branch に対して行う）。`,
              `     返却の branch には "${branch}" を入れる。`,
            ]
          : [
              `     state branch も無いため既存コミットを読めない。手順 3 では discard を選び、branch は空文字で返す。`,
            ]),
        `   - 出力が "HEAD"（detached HEAD）または空の場合: ブランチ解決失敗（worktree は実在するが HEAD 不定）。`,
        `     WIP commit・diff 取得・worktree/branch の削除を一切実行しない。worktreeMissing は false（または未設定）。`,
        `     decision は返さない（または "unresolved" を返す）。reason に「worktree のブランチを解決できず保全が必要」を入れて返す。`,
        `     branch は空文字で返す。`,
        `   - ブランチ名が取得できた場合: 解決したブランチ名を「対象ブランチ」として以降の手順で使用する。`,
        `     返却の branch にこの解決したブランチ名を入れる。worktreeMissing は false。`,
        ...(branch
          ? [
              `     注意: state には branch "${branch}" が記録されているが、これは参考値に過ぎない。`,
              `     worktree HEAD が食い違う場合は worktree HEAD（実際に WIP が積まれる側）を`,
              `     必ず優先し、返却の branch には worktree HEAD のブランチ名を入れること。`,
            ]
          : []),
        ``,
      ]
    : []

  // oldWorktree が無い「branch のみの残骸」の場合のみ、state branch を「対象ブランチ」として
  // 直接使用する（worktree HEAD が存在せず WIP 退避も発生しないため食い違いが起きない）。
  // oldWorktree が非空の場合はブランチ解決ステップが対象ブランチを確定する。
  const resolvedBranchNote =
    branch && !oldWorktree
      ? [`（対象ブランチ: ${branch}。返却の branch にこの名前を入れる）`, ``]
      : []

  // 手順 1（WIP 退避）・手順 2b（diff 読み取り）は、残骸の種類（worktree あり / branch のみ）で
  // 条件分岐する。oldWorktree が空のとき git -C "" がメインリポ cwd を対象にしてしまい、
  // メインリポの未 commit 変更を誤ったブランチへ commit するリスクがある（PR #41 修正 #3）。
  //
  // branch が空かつ oldWorktree が非空の場合は「ブランチ解決ステップ」で対象ブランチが確定した
  // 場合のみ WIP 退避を実行する。解決失敗時は step1 を実行しないこと（未確定ブランチへ commit させない）。

  // 手順 1: WIP 退避（oldWorktree が非空のときのみ。空のときはスキップ指示）
  const step1Lines = oldWorktree
    ? [
        `1. 未 commit 変更の退避（WIP commit）:`,
        `   前提: 上記ブランチ解決ステップで worktree HEAD を対象ブランチとして確定できた場合のみ実行する。`,
        `   解決失敗（decision を返さない / "unresolved" の場合）はこの手順を飛ばすこと。`,
        `   dead worktree（worktreeMissing: true）の場合も worktree 実体が無いためこの手順を飛ばすこと。`,
        `   退避は worktree が現在チェックアウト中のブランチ（解決した対象ブランチ）に対して行う。`,
        `   a. git -C ${oldWorktreeJson} status --porcelain で未 commit 変更の有無を確認する。`,
        `   b. 変更がある場合: 以下のコマンドで WIP commit として対象ブランチに退避する（--no-verify は絶対に使わない）。`,
        `      git -C ${oldWorktreeJson} add -A`,
        `      git -C ${oldWorktreeJson} commit -m "$(cat <<'WIPEOF'`,
        `wip(recover): 中断時の未コミット変更を退避`,
        `WIPEOF`,
        `)"`,
        `      退避成功後: wipCommitted: true を返却に含める。`,
        `      pre-commit フックが失敗して commit できない場合: --no-verify で強行せずに WIP 退避をスキップする。`,
        `      wipCommitted: false を返し、summary（または reason）に「フック失敗により未コミット変更を退避できなかった。ユーザーは旧 worktree の未コミット変更を手動で確認すること」と記録して続行する。`,
        `   c. 変更がない場合: 何もしない。wipCommitted: false。`,
      ]
    : [
        // oldWorktree が空 = branch のみの残骸。git -C "" はメインリポ cwd を対象にするため、
        // WIP 退避手順を一切出力しない。wipCommitted: false で続行する。
        `1. 旧 worktree が記録されていない（branch のみの残骸）。`,
        `   退避対象の作業ディレクトリが無いため WIP 退避はスキップする。wipCommitted: false。`,
        `   git -C を使ったコマンドは一切実行しないこと。`,
      ]

  // 手順 2b: diff 読み取り（対象ブランチが確定しているときのみ）
  // oldWorktree が非空の場合は「ブランチ解決ステップ」で対象ブランチ（worktree HEAD）が
  // 確定した場合のみ実行する。oldWorktree が空でも branch のみの残骸なら state branch を読む。
  // branch も oldWorktree も空の場合は既存コミットを参照できないため discard を促す。
  const step2bLines =
    branch || oldWorktree
      ? [
          `2. 既存作業の読み取り:`,
          ...(oldWorktree
            ? [
                `   前提: 上記ブランチ解決ステップで対象ブランチが確定している場合のみ実行する。`,
                `   - worktree HEAD を解決できた場合: その worktree HEAD を対象ブランチとして読む。`,
                `   - dead worktree（worktreeMissing: true）で state branch があった場合: その state branch を対象ブランチとして読む。`,
                `   - 解決失敗（worktree 実在・HEAD 不定）の場合はこの手順を飛ばすこと。`,
              ]
            : []),
          `   a. git fetch origin ${baseBranch} で origin/${baseBranch} を最新化する。`,
          `   b. 対象ブランチと origin/${baseBranch} の差分を読む:`,
          `      git diff origin/${baseBranch}...${oldWorktree ? '<解決した対象ブランチ名>' : branchJson} を実行する。`,
          `      （--quiet で差分が空か確認してから diff を取得する。差分がない場合は空 branch と判断）`,
          `   c. gh issue view ${item.number} でイシュー本文・受入基準を読む。`,
        ]
      : [
          // branch 名が無く oldWorktree も無い場合は既存コミットを参照できないため継続不可。
          // discard を返すよう明示的に指示し、continue の誤判定を防ぐ。
          `2. branch ref も旧 worktree も記録されていないため既存コミットを読めない。`,
          `   継続不可のため次の手順 3 では discard を選ぶこと。`,
        ]

  return [
    `イシュー #${item.number}「${title}」の中断作業（branch: ${branch || '(不明)'}）の回復担当エージェント。`,
    COMMON,
    `本エージェントは中断 worktree に残った作業を継続するか破棄するかを判断する。`,
    ``,
    `【判断軸の明記】`,
    `Review（「実装が正しいか・マージできるか」の判定）とは全く別軸で判断すること。`,
    `ここでの判断は「この途中作業から継続するのが妥当か」である。`,
    `動かない・未完成でも、方向が妥当なら continue を選ぶ（残りの完成は Implement が担う）。`,
    `discard は「空 / 方向違い / 継続より作り直しが妥当」な場合のみ選ぶ。`,
    `continue は対象ブランチが確定していることを前提とする（ブランチ未確定時は continue を返してはならない）。`,
    ``,
    `手順:`,
    ...resolveStepLines,
    ...resolvedBranchNote,
    ...step1Lines,
    ...step2bLines,
    `3. 継続可否の判断:`,
    `   - continue（継続）: 対象ブランチが確定しており、既存作業がイシュー要件と方向的に合っている場合。`,
    `     未完成・一部壊れていても構わない（Implement が完成させる）。`,
    `   - discard（破棄）: 差分が完全に空 / 方向が全く違う / 継続より作り直しが明らかに速い場合。`,
    `     branch ref が無く worktree から解決できた場合でも discard を選ぶことができる。`,
    `4. 回復ブリーフの作成（continue の場合のみ）:`,
    `   done: 実装済み内容の要約（何が完成しているか）`,
    `   remaining: 残タスクの要約（何を完成させる必要があるか）`,
    `   broken: 壊れ・未完で優先修正が必要な箇所（なければ空文字）`,
    `返却: decision（"continue" または "discard"）/ branch（確定した対象ブランチ名。解決できなければ空文字）/ brief（continue 時のみ: done/remaining/broken）/ reason（discard 時のみ: 破棄理由）/ wipCommitted。`,
  ].join('\n')
}

// 回復用の Implement プロンプト。recoverPrompt が返した brief を受け取り、
// 既存 branch を checkout して実装を継続する。
//
// 既存 implementPrompt との差分:
//   - ブランチ作成手順（git checkout -B <type>/<N>-... origin/<base>）を
//     既存 branch の checkout（git checkout <branch>）に置換する。
//     origin/base へリセットしないことで、WIP commit を含む既存コミットを保持する。
//   - Plan 本文の代わりに回復ブリーフ（done/remaining/broken）を受け取り、
//     「未完成・壊れている箇所を優先して完成させる」よう指示する。
//   - 返却は既存 IMPL_SCHEMA と互換（branch / summary / worktreePath）。
//
// item: イシュー情報（sanitize 済み）
// brief: RECOVER_SCHEMA.brief（done / remaining / broken）
// branch: isValidBranchName 検証済みのブランチ名。Recover が特定した既存 branch を渡す。
//         明示することでエージェントの自律解決による誤 checkout を防ぐ。
function recoverImplementPrompt(item, brief, branch) {
  const title = sanitize(item.title)
  const briefJson = JSON.stringify(brief ?? {})
  const branchJson = JSON.stringify(branch ?? '')
  return [
    `イシュー #${item.number}「${title}」の中断作業を継続してローカルブランチにコミットする担当エージェント（push・PR 作成は行わない）。`,
    COMMON,
    `Recover フェーズが「継続可能」と判断した既存 branch の作業を引き継いで完成させる。`,
    `回復ブリーフ（Recover フェーズで作成済み。以下コードブロック内が JSON）:`,
    '```json',
    briefJson,
    '```',
    `上記の JSON.parse 後: done（実装済み内容）を確認し、remaining（残タスク）を優先して完成させ、`,
    `broken（壊れ・未完で要修正の箇所）があれば先に修正すること。`,
    '手順:',
    `0. worktree routing ガード（他のどの gh / git 操作よりも先に、最初に必ず実行する）: \`git remote get-url origin\` でカレント worktree の remote を確認し、\`gh issue view ${item.number} --json number,title\` で取得した title が、このタスクの対象イシュー「${title}」と実質的に同一であることを確認する（このプロンプト中の「${title}」はプロンプト安全化のためバッククォート・$・バックスラッシュ・改行がエスケープ／除去されている場合がある。GitHub は raw title を返すため完全一致は要求せず、語句の一致で同一 issue かを判断する。番号の存在だけでは別リポの同番号 issue を誤認しうるため照合する）。remote が想定と異なる / issue が解決できない / 取得 title が明らかに無関係（別 issue）のいずれかなら、後続一切の操作を実行せず、即 prNumber: 0 と「worktree routing error: remote=<URL> でイシュー #${item.number}「${title}」を解決できず誤配置。実装リポの worktree への再配置が必要」を理由として返す。`,
    `1. 本エージェントは隔離された git worktree 内で動作する。git status が clean か確認し、差分が残っていれば作業せず prNumber: 0 と理由を返す。`,
    // 既存 branch を checkout する。origin/base へリセットしないことで、WIP commit を含む
    // 既存コミット・diff を保持し、Recover が退避した作業を引き継いで継続できる。
    // これが通常の implementPrompt と最も異なる点: 手順 2 の checkout -B は使わない。
    // branch は呼び出し側（runImplement の continue 経路）で isValidBranchName 検証済みの値を
    // 渡している。エージェントの自律解決による誤 checkout を防ぐため名前を明示する。
    `2. Recover フェーズで特定された既存 branch ${branchJson} を checkout する（git fetch origin && git checkout ${branchJson}）。`,
    `   （origin/${baseBranch} からの新規作成（checkout -B）は行わない。既存コミット・WIP commit を保持するため）`,
    `   指定の branch ${branchJson} が見つからない場合は git ls-remote --heads origin で確認し、"/${item.number}-" を含む refs/heads/* を探す。`,
    `3. 回復ブリーフに従って実装を完成させる:`,
    `   - broken（壊れ・未完で要修正）の箇所から優先して修正する。`,
    `   - remaining（残タスク）を完成させる。`,
    `   - done（実装済み）の内容は重複実装しない。`,
    `   実装は対象リポジトリの delegation ルール・専門サブエージェントがあればそれに従い委譲する。CLAUDE.md・rules（migration・スキーマ等の不変条件）を必ず守る。`,
    '   コメント方針: コードコメントは「何をするか」より「なぜ存在するか／パッケージ・サービスから見た対象の役割」を書く。呼び出し元/呼び出し先・他サービスからの観点を明示し、対象リポジトリの .claude/rules/code-comment-style.md があればそれに従う。',
    '4. 完了条件: 対象リポジトリのテスト実行規約に従い、ビルド・lint・テストを実行して pass すること。フォーマッタ・静的解析があればコミット前に通す。',
    '5. 実装後に OWASP Top 10 観点でセキュリティチェックを実施する（API キーのハードコード・インジェクション等）。問題が見つかった場合は修正してから次へ進む。',
    '6. 実装が完了したら create-commit スキルに従い Conventional Commits で実装コミットを 1 つ作成する（type/scope は英語、件名は対象リポジトリの言語規約に従う）。',
    '7. push・PR 作成はここでは行わない。ローカルブランチにコミットを積んだ状態で終了する。',
    '   （push と PR 作成は後続の Review が全通過した後に別エージェントが行う）',
    '   実装の過程で現スコープ外と判断した事項は summary に「対象外（out-of-scope）」として列挙する。',
    '8. pwd の結果を worktreePath として返す（worktree の絶対パスを記録するため）。',
    '返却: branch / summary（実装内容の要約。対象外項目を含む。失敗時は理由と現状）/ worktreePath（pwd の結果）。',
    '（prNumber は PR 未作成のため返却しない。返しても 0 として扱われる）',
  ].join('\n')
}

// ============================================================================
// セクション 6: 実行: Restore → Tree → State
// ここから実行フロー。上記の関数・定数を順に使い、状態読込・ツリー取得・
// 外部チェック判定・依存グラフ/キュー構築・pending 初期化を行う。
// ============================================================================

// --- Restore フェーズ: 状態ファイルを読み込む ---
phase('Restore')
const savedItems = await loadState()
log(`状態ファイルを読み込んだ（既存エントリ: ${Object.keys(savedItems).length} 件）`)

// Tree フェーズ: ツリー取得 → 外部チェック自動判定の順で実行する。
// 既存 Plan フェーズを Tree に改名し、per-issue Plan（Plan フェーズ）と明確に区別する。
phase('Tree')
const tree = await agent([
  `GitHub イシューツリー取得タスク。ルートはイシュー #${parent}。`,
  COMMON,
  '手順:',
  `1. gh api repos/{owner}/{repo}/issues/${parent} でルートを取得する。`,
  '2. gh api --paginate "repos/{owner}/{repo}/issues/<n>/sub_issues?per_page=100" を再帰的に呼び、全子孫を列挙する（--paginate が 100 件超も自動で全ページ取得する。返却順は API の並び順のまま連結される）。',
  '3. nodes にはルート自身（parent: 0、siblingIndex: 0）と全子孫を含める。各ノードの siblingIndex は、その親の sub_issues API が返した配列内での 0-indexed 位置とする（ルートは 0）。この値が実行順の正本になるため正確に記録すること。',
  '4. 各 open ノードについて gh issue view <n> で本文を読み、dependsOn に「機能的に先行完了が必須」のイシュー番号のみを入れる。対象は本文に明示された依存記述（「依存:」「Depends on」「Blocked by」等）と、そのイシューの成果物（型・API・スキーマ等）を前提にしないと実装が成立しないものだけ。判断に迷う場合・単なる関連・同じファイルを触りそうというだけの場合は含めない（コンフリクトは後段の修正ループで解消されるため空配列でよい）。',
].join('\n'), { label: 'plan:issue-tree', phase: 'Tree', model: 'sonnet', effort: 'medium', schema: TREE_SCHEMA })

// 外部チェック自動判定: 直前 3 件の merged PR の check-runs から GitHub Actions 以外の
// App slug を抽出する。merged PR がない・取得失敗時は apps: [] でフォールバックする。
// 検出結果は monitorPrompt の 3 分岐（なし/cursor/cursor 以外）の制御に使用する。
const detectResult = await agent(
  [
    `外部チェック自動判定タスク。`,
    COMMON,
    '直前 3 件の merged PR から GitHub Actions 以外の CI チェック App を検出する。',
    '手順:',
    `1. REPO=$(gh repo view --json owner,name --jq '"\\(.owner.login)/\\(.name)"') を実行してリポジトリを取得する。`,
    `2. 以下のコマンドで外部チェック App slug を収集する:`,
    `   gh pr list --state merged --limit 3 --json headRefOid --jq '.[].headRefOid' \\`,
    `     | xargs -I{} sh -c 'gh api "repos/\${REPO}/commits/$1/check-runs" \\`,
    `         --jq \\'[.check_runs[] | select(.app.slug != "github-actions") | .app.slug] | .[]\\'  2>/dev/null' _ {} \\`,
    `     | sort -u`,
    `   （SHA は xargs の '{}' を直接 URL に展開せず、sh -c の位置引数 $1 経由で渡してインジェクションを防ぐ。変数 REPO も "\${REPO}" でクォート済み）`,
    '3. merged PR が 0 件・コマンド失敗・出力が空の場合は apps: [] を返す（新規リポで停止しない）。',
    '4. 収集した slug を重複排除して apps 配列として返す（例: ["cursor"]）。',
    '返却: apps（外部 App slug の一意配列。検出なしなら空配列）。',
  ].join('\n'),
  { label: 'detect:external-checks', phase: 'Tree', model: 'haiku', effort: 'low', schema: EXTERNAL_CHECKS_SCHEMA },
)
// 取得失敗（null）時は空配列フォールバック。新規リポでも安全に続行できる。
const externalCheckApps = detectResult?.apps ?? []
if (externalCheckApps.length > 0) {
  log(`外部チェック検出: ${externalCheckApps.map(sanitize).join(', ')}`)
} else {
  log(`外部チェックなし: GitHub Actions の green のみで判定する`)
}

// エージェント返却値の整数検証（スキーマ宣言のみに依存しない）
for (const n of tree.nodes) {
  assertInt(n.number, `tree.nodes[].number`)
  if (!Number.isInteger(n.parent) || n.parent < 0) throw new Error(`tree.nodes[].parent が非負整数ではない: ${n.parent}`)
  // siblingIndex は実行順ソートの正本のため欠落・非整数を拒否する
  if (!Number.isInteger(n.siblingIndex) || n.siblingIndex < 0) {
    throw new Error(`tree.nodes[].siblingIndex が非負整数ではない: ${n.siblingIndex}（issue #${n.number}）`)
  }
}

const byParent = new Map()
for (const n of tree.nodes) {
  const list = byParent.get(n.parent) ?? []
  list.push(n)
  byParent.set(n.parent, list)
}
// API 返却順（siblingIndex）で兄弟を確定的にソートする
for (const [, children] of byParent) {
  children.sort((a, b) => a.siblingIndex - b.siblingIndex)
}
const queue = []
const visited = new Set()
function visit(node) {
  if (visited.has(node.number)) return
  visited.add(node.number)
  const children = byParent.get(node.number) ?? []
  for (const child of children) visit(child)
  queue.push({ ...node, kind: children.length > 0 ? 'verify-close' : 'implement' })
}
const root = tree.nodes.find((n) => n.number === parent)
if (!root) throw new Error(`ルートイシュー #${parent} がツリー取得結果に含まれていない`)
visit(root)
const unreachable = tree.nodes.filter((n) => !visited.has(n.number))
if (unreachable.length > 0) {
  throw new Error(
    `Plan が返したノードのうち ${unreachable.length} 件がルート #${parent} から到達不能: ` +
    unreachable.map((n) => `#${n.number}（parent: ${n.parent}）`).join(', '),
  )
}
const openImpl = queue.filter((q) => q.kind === 'implement' && q.state === 'open').length
log(`実行キュー ${queue.length} 件（うち実装対象 ${openImpl} 件）を post-order で構築した（並列度 ${concurrency}）`)

// --- キュー確定後: 全ノードを pending で一括初期化（既存エントリは保持）---
// closed の issue は pending で初期化しない。実行スキップ対象のため状態ファイルに残しても再開・目視確認を誤らせる。
// open の issue のみを初期化対象とする
await initAllPending(queue.filter((q) => q.state === 'open'))

const results = []
const failures = []
let consecutiveFailures = 0
let halted = null

// ============================================================================
// セクション 7: per-issue ドライバ
// 1 イシューの実行フローを担う関数宣言。セクション 8 の並列スケジューラから呼ばれる。
// recordFailure / runVerifyClose / runImplement / runMergeLoop / runOne の順で定義する。
// ============================================================================

// 失敗を記録する。完了できないイシューがあっても即停止せず次へ進み、
// 3 イシュー連続で停滞した場合のみ新規着手を止めてユーザーの判断を待つ
function recordFailure(failure) {
  failures.push(failure)
  // results の status は既定で 'failed'。状態ファイルへ 'blocked' を書く呼び出し
  // （Review 非収束など）は failure.status を渡し、results と状態ファイルの status を一致させる。
  results.push({ issue: failure.issue, status: failure.status ?? 'failed', pr: failure.pr, note: failure.reason })
  // halt は systemic な失敗（エージェントのクラッシュ・API エラー等の 'failed' が連続）でのみ発火させる。
  // 'blocked'（Review 非収束など特定イシュー固有の局所的な品質ブロック）は独立した他イシューの
  // 着手を止める理由にならないため halt の連続カウントに数えない（数えると、実バグ持ちの 1 件で
  // 無関係な pending leaf 群が未着手のまま取り残される）。blocked は results/failures には記録する。
  if (failure.status === 'blocked') {
    log(`#${failure.issue} を blocked として記録し次へ進む（halt 非カウント）: ${failure.reason}`)
    return
  }
  consecutiveFailures++
  log(`#${failure.issue} を完了できず次へ進む（${consecutiveFailures} 連続）: ${failure.reason}`)
  if (consecutiveFailures >= 3 && !halted) {
    halted = {
      reason: '3 イシュー連続で完了できなかったため新規着手を停止する。ユーザーの判断を待つこと',
      // halt は非 blocked（'failed'）の連続でのみ発火する。blocked は連続カウントに数えないため、
      // 停滞イシューの報告も blocked を除外した直近 3 件の 'failed' から取る（さもないと halt の
      // 真因でない blocked を「直近の停滞イシュー」として誤表示する。Bugbot PR #40 指摘）。
      issues: failures.filter((f) => f.status !== 'blocked').slice(-3).map((f) => f.issue),
    }
  }
}

// 親イシュー（verify-close）の完了検証とクローズ
async function runVerifyClose(item) {
  // impl 開始前に状態を implementing（verify-close の場合も同フィールドを流用）に更新
  await updateState(item.number, { status: 'implementing' })
  const v = await agent(closePrompt(item), { label: `close:#${item.number}`, phase: 'Merge', model: 'sonnet', effort: 'medium', schema: CLOSE_SCHEMA })
  if (v?.closed) {
    results.push({ issue: item.number, status: 'closed', note: v.summary })
    consecutiveFailures = 0
    // verify-close 成功 → closed に更新
    await updateState(item.number, { status: 'closed', note: String(v.summary ?? '') })
    return true
  }
  const reason = `親イシューのクローズ検証に失敗した: ${sanitize(v?.summary ?? 'agent error')}`
  await updateState(item.number, { status: 'failed', note: reason })
  recordFailure({ issue: item.number, reason })
  return false
}

// 末端イシューの実装 → 監視 → 修正 → マージ。implement / fix は worktree 隔離で並列実行する
async function runImplement(item) {
  // 状態ファイルから保存済みの情報を取得（再開判定に使用）
  const saved = savedItems[String(item.number)] ?? {}

  // monitoring から再開する場合: impl フェーズをスキップして monitor ループから開始する。
  // branch が不正な場合は再開を諦めて通常の impl から実行する（最初からやり直せば回復できる）。
  // 判定は報告系（halt / 依存失敗）と共有の isActiveMonitoring に一元化する（条件不一致防止）
  const isResumeFromMonitoring = isActiveMonitoring(item.number)
  if (saved.status === 'monitoring' && !isResumeFromMonitoring) {
    log(`#${item.number}: 状態ファイルの branch が不正または空のため monitoring 再開を諦め、通常の impl から実行する`)
  }
  // 保存済みの fixCount。monitoring からの正常再開（impl スキップ → monitor 続行）のときのみ
  // 引き継ぐ。再開情報が不正で impl からやり直す場合は新しい PR を作るため 0 にリセットする
  // （旧 PR の fixCount を引き継ぐと、新 PR への fix が一度も走る前に 6 回上限へ到達しうる）。
  // failed / blocked / pending / implementing などからの再実行時も 0 にリセットして
  // fix 上限を新規カウントする
  const savedFixCount =
    isResumeFromMonitoring && Number.isInteger(saved.fixCount)
      ? Math.min(Math.max(saved.fixCount, 0), 6)
      : 0

  let impl
  if (isResumeFromMonitoring) {
    // 保存済みの pr / branch / fixCount を引き継いで再開する
    impl = {
      prNumber: saved.pr,
      branch: saved.branch,
      summary: '（状態ファイルから再開）',
      worktreePath: sanitizeWorktreePath(saved.worktree ?? ''),
    }
    log(`#${item.number}: 状態ファイルから monitoring 再開（PR #${impl.prNumber}、fixCount: ${savedFixCount}）`)
  } else {
    // 通常の impl フェーズを実行する（Recover フェーズ含む）
    // フォールバック時に状態ファイルに保存済みの worktree パスがあれば孤児化防止のため記録しておく
    // impl 成功後に新パスで上書きされるため、旧 worktree が追跡されないまま残るのを防ぐ
    const fallbackOldWorktree = sanitizeWorktreePath(saved.worktree ?? '')

    // ===================================================================
    // Recover フェーズ: 残骸 worktree・branch の検出と回復判断
    //
    // 衝突の真因: Implement が worktree 内で実行する
    //   git checkout -B <type>/<N>-<short-name> origin/<base>
    // は、ブランチ名がイシュー番号で決定論的に決まるため、前回の中断で
    // 残った worktree が同名 branch を掴んでいると
    //   fatal: '<branch>' is already checked out at '<旧worktree>'
    // というエラーになる（checkout -B は強制上書きだが他の worktree で
    // checkout 済みの branch は上書きできない）。
    //
    // 既存の fallbackOldWorktree（impl 成功後の旧 worktree 削除）は
    // impl 成功後にしか走らず、checkout -B の衝突はその前に起きるため
    // 手遅れ。Recover フェーズを Plan の前に置くことで衝突を事前に解消する。
    //
    // 回復作業を Recover ではなく Implement へ戻す理由:
    //   Recover が「継続可能」と判断した作業は未完成の可能性がある。
    //   Review は完成した実装を審査する場であり、未完成のまま Review に
    //   送ると指摘が出続けて二重ループになる。Implement で完成させてから
    //   Review に送ることで Review の責務を明確に保つ。
    // ===================================================================

    // --- 残骸検出: 前回中断の worktree / branch が残っていないか確認する ---
    // saved.worktree が有効 → 旧 worktree パスを直接残骸として使用する。
    // saved.branch が有効 → branch が存在する可能性あり（残骸候補）。
    // いずれかが有効な場合のみ Recover を起動する（残骸なし → 直接 Plan へ）。
    const candidateBranch = isValidBranchName(saved.branch ?? '') ? saved.branch : ''
    const hasRemnant = Boolean(fallbackOldWorktree || candidateBranch)

    if (hasRemnant) {
      // --- Recover フェーズ: 旧 worktree・branch の継続可否を opus で判断する ---
      // isolation なし（メインリポ cwd）: worktree/branch はグローバル状態のため
      // Plan と同様に非隔離で操作する（worktree 隔離では git -C <oldwt> や
      // git diff origin/<base>...<branch> がグローバル branch ref に届かない）。
      phase('Recover')
      log(`#${item.number}: 中断残骸を検出（branch: ${sanitize(candidateBranch || '(不明)')}, worktree: ${sanitize(fallbackOldWorktree || '(不明)')}）、Recover フェーズを開始する`)

      // recoverPrompt には sanitizeBranch 済みの branch・sanitizeWorktreePath 済みの
      // worktree を渡す（インジェクション対策）。
      const sanitizedRecoverBranch = candidateBranch ? sanitizeBranch(candidateBranch) : ''
      const sanitizedRecoverWorktree = sanitizeWorktreePath(fallbackOldWorktree)

      const recoverResult = await agent(
        recoverPrompt(item, sanitizedRecoverBranch, sanitizedRecoverWorktree),
        {
          label: `recover:#${item.number}`,
          phase: 'Recover',
          model: 'opus',
          effort: 'medium',
          schema: RECOVER_SCHEMA,
        },
      )

      // Recover 結果を3分岐で処理する。
      // - continue かつ effectiveBranch が有効: 継続経路（旧 worktree のみ掃除して Implement へ）
      // - discard かつ effectiveBranch が有効: 破棄経路（旧 worktree + branch を掃除して通常 Plan へ）
      //   ※ effectiveBranch が必ず削除されることで、後続 Plan→Implement の git checkout -B が
      //     同一ブランチを origin/base からサイレントリセットして WIP commit を消す問題を防ぐ。
      // - それ以外（null / 異常 / 不正 decision / ブランチ未確定の continue|discard / "unresolved"）:
      //   一過性のエージェントエラーや曖昧な結果で作業を破棄しないよう、
      //   残骸（worktree/branch）を保全したまま failed にする。
      //   状態に hasRemnant フラグが残るため次回再実行で Recover が再試行される。
      //   明示的 discard 以外では worktree/branch を絶対に削除しない（PR #41 修正 #1・#2）。
      //
      // 【effectiveBranch の決定】
      //   Recover エージェントは worktree が残っている場合、worktree HEAD から実ブランチ名を
      //   解決して recoverResult.branch に入れて返す。WIP commit は git -C <worktree> commit で
      //   worktree HEAD（= resolvedBranch）に積まれるため、continue / discard の対象は
      //   worktree HEAD でなければならない。
      //   driver 側でエージェント返却の branch を isValidBranchName 検証 + sanitizeBranch して使用する。
      //
      //   precedence（Stale branch wins over worktree 対策, PR #76）:
      //   - worktree が「実在」した場合: WIP は worktree HEAD に積まれるため resolvedBranch のみ信頼する。
      //     state 由来の sanitizedRecoverBranch が worktree HEAD と食い違っても採用しない
      //     （state branch を checkout すると worktree HEAD 側の WIP を取り残すため）。
      //     エージェントがブランチを解決できなかった場合（detached HEAD 等）は resolvedBranch が空となり、
      //     continue / discard ガードが成立せず残骸を保全（failed）する。
      //   - worktree が無い branch のみの残骸、または dead worktree（worktreeMissing: true、
      //     state にパス記録ありだが実体なし）の場合: worktree 実体が無く WIP 退避も発生しないため、
      //     state 由来の sanitizedRecoverBranch を権威として優先する（食い違う agent branch より state を信頼。
      //     branch-only は元々 state が源泉、dead worktree も live な worktree HEAD が無いため state が正）。
      //     これにより有効な state branch があれば回復に到達でき（Dead worktree path blocks branch, PR #42 一次対応）、
      //     かつ agent が誤った branch を返しても state を上書きしない（Branch-only state branch precedence, PR #42）。
      //     driver は worktree 実体の有無を直接判定できない（fs アクセスなし）ため、エージェントが
      //     返す worktreeMissing を実在判定の signal として用いる。
      const recoverDecision = recoverResult?.decision
      const resolvedBranch = isValidBranchName(recoverResult?.branch ?? '')
        ? sanitizeBranch(recoverResult.branch)
        : ''
      // worktree がパス記録あり かつ 実在する（= worktreeMissing でない）ときのみ resolvedBranch を排他採用。
      // それ以外（branch-only / dead worktree）は state 優先で fallback する。
      const worktreeAlive = Boolean(sanitizedRecoverWorktree) && recoverResult?.worktreeMissing !== true
      const effectiveBranch = worktreeAlive
        ? resolvedBranch
        : sanitizedRecoverBranch || resolvedBranch

      if (recoverDecision === 'continue' && effectiveBranch) {
        // --- continue 経路: 旧 worktree のみ掃除し、effectiveBranch を保持して Implement を継続 ---
        // WIP commit は Recover エージェントが effectiveBranch に退避済みのため、物理 worktree を
        // 削除しても作業データは失われない。Plan をスキップして recoverImplementPrompt で
        // Implement を直接起動する。その後は通常どおり reviewing → Review → Merge に合流する。
        //
        // deleteBranch を渡さない理由: branch に退避済みの WIP commit が乗っているため。
        // branch を削除すると退避した作業も失われる。
        log(`#${item.number}: Recover → continue（branch: ${sanitize(effectiveBranch)}）、旧 worktree を掃除して Implement 継続`)

        await updateState(
          item.number,
          { status: 'implementing', branch: effectiveBranch, worktree: '' },
          sanitizedRecoverWorktree ? { cleanupWorktree: sanitizedRecoverWorktree } : {},
        )

        // --- recoverImplement: 回復ブリーフで Implement を起動（Plan をスキップ）---
        // effectiveBranch は isValidBranchName 検証 + sanitizeBranch 済み。
        // branch を明示渡しすることで、エージェントが自律的に誤った branch を checkout するのを防ぐ。
        impl = await agent(recoverImplementPrompt(item, recoverResult.brief, effectiveBranch), {
          label: `impl:#${item.number}`,
          phase: 'Implement',
          model: 'sonnet',
          effort: 'medium',
          schema: IMPL_SCHEMA,
          isolation: 'worktree',
        })

        // impl の成否判定（通常 Implement と同じ検証）
        if (!impl || !impl.branch) {
          const reason = sanitize(impl?.summary ?? '回復 Implement エージェントが異常終了した')
          await updateState(item.number, { status: 'failed', note: reason })
          recordFailure({ issue: item.number, reason })
          return false
        }
        if (!isValidBranchName(impl.branch ?? '')) {
          const reason = `回復 Implement の branch 名が不正: ${sanitize(impl.branch ?? '(空)')}`
          await updateState(item.number, { status: 'failed', note: reason })
          recordFailure({ issue: item.number, reason })
          return false
        }
        impl = { ...impl, worktreePath: sanitizeWorktreePath(impl.worktreePath ?? ''), prNumber: 0 }
        // impl 完了直後: reviewing に遷移し branch / worktree を記録する
        // continue 経路では旧 worktree は既に掃除済みのため cleanupWorktree は渡さない
        await updateState(item.number, {
          status: 'reviewing',
          pr: 0,
          branch: impl.branch,
          worktree: impl.worktreePath,
          fixCount: 0,
        })
      } else if (recoverDecision === 'discard' && effectiveBranch) {
        // --- discard 経路（effectiveBranch あり）: 旧 worktree と branch を掃除し、通常 Plan へフォールスルー ---
        // WIP commit を Recover エージェントが先に積んでから branch を削除するため、
        // 誤判定時は reflog から復元できる（最後の保険）。
        //
        // effectiveBranch を必ず削除する。これにより後続 Plan→Implement の
        // git checkout -B <effectiveBranch> origin/<base> が同一ブランチを origin/base から
        // サイレントリセットして WIP commit を消すデータ損失を防ぐ。
        log(`#${item.number}: Recover → discard（reason: ${sanitize(recoverResult?.reason ?? '不明')}, wipCommitted: ${recoverResult?.wipCommitted ?? 'unknown'}）、旧 worktree + branch（${sanitize(effectiveBranch)}）を掃除して通常 Plan へ`)

        // discard: worktree 削除後に branch も削除する。
        // options.deleteBranch は patch.branch を branch 名として使用するため、
        // patch に branch 名を持たせてから deleteBranch: true を渡す。
        // patch.branch を '' にすると deleteBranch の対象が空になるため 2 段階に分ける:
        //   1. branch 名（effectiveBranch）を patch に持たせて deleteBranch: true でブランチ削除
        //   2. status: 'planning', branch: '', worktree: '' でクリーン状態に更新
        await updateState(
          item.number,
          { branch: effectiveBranch },
          {
            ...(sanitizedRecoverWorktree ? { cleanupWorktree: sanitizedRecoverWorktree } : {}),
            deleteBranch: true,
          },
        )
        // planning 状態に戻してクリアする（branch: '' で状態を初期化）
        await updateState(item.number, { status: 'planning', branch: '', worktree: '' })
        // discard 後は通常 Plan へフォールスルーするため impl は未設定のまま続行
      } else {
        // --- 保全経路: エージェント異常 / 不正 decision / "unresolved" / ブランチ未確定の continue|discard ---
        //
        // ブランチが確定できない（effectiveBranch が空）まま continue|discard の場合も保全経路に入る。
        // これにより「worktree はあるが state に branch なく、エージェントも解決できなかった」状態で
        // worktree だけ削除 → 後続 checkout -B でサイレント WIP 消失、という問題を防ぐ。
        //
        // 一過性のエージェントエラーや曖昧な結果で作業を破棄しないよう、
        // 残骸（worktree/branch）は削除せず保全したまま failed にする。
        // 状態に残骸情報が残るため、次回再実行時に Recover が再試行されて回復できる。
        // 明示的な 'discard' かつ effectiveBranch 確定時のみ worktree/branch を削除する（PR #41）。
        const reason = sanitize(
          recoverDecision === 'continue' && !effectiveBranch
            ? '回復継続には有効な branch が必要だが state にも worktree HEAD からも解決できなかった。worktree/branch を保全して failed にする'
            : recoverDecision === 'discard' && !effectiveBranch
              ? 'discard 指示だが対象ブランチを確定できないため安全に削除できない。worktree/branch を保全して failed にする'
              : (recoverResult?.reason ?? 'Recover エージェントが異常終了または不正な decision を返した。worktree/branch を保全して failed にする'),
        )
        log(`#${item.number}: Recover → 保全（decision: ${sanitize(recoverDecision ?? '(null)')}, effectiveBranch: ${sanitize(effectiveBranch || '(空)')}, reason: ${reason}）`)
        await updateState(item.number, { status: 'failed', note: reason })
        recordFailure({ issue: item.number, reason })
        return false
      }
    }

    // ----------------------------------------------------------------
    // Plan → Implement（新規作成または discard 後の再作成）
    //
    // Recover の continue 経路では impl は設定済みのためこのブロックをスキップする。
    // Recover なし（残骸なし）/ discard 経路 / Recover 未実行では通常どおり Plan を実行する。
    // ----------------------------------------------------------------
    if (!impl) {
      // planning/reviewing 状態からの再開時も、残骸なし・discard の場合は
      // 新規 Plan から開始する。計画は Implement エージェントへ返り値で渡す（worktree 跨ぎなし）。
      await updateState(item.number, { status: 'planning' })
      const planResult = await agent(planPrompt(item), {
        label: `plan:#${item.number}`,
        phase: 'Plan',
        model: 'opus',
        effort: 'high',
        schema: PLAN_SCHEMA,
      })
      // plan が無効（null / plan 空）なら failed として記録し終了する
      if (!planResult || !planResult.plan || planResult.plan.trim() === '') {
        const reason = sanitize(planResult?.summary ?? '計画エージェントが異常終了した、または計画本文が空だった')
        await updateState(item.number, { status: 'failed', note: reason })
        recordFailure({ issue: item.number, reason })
        return false
      }
      log(`#${item.number}: 計画立案完了 — ${sanitize(planResult.summary ?? '')}`)

      // --- Implement フェーズ: 計画に沿って sonnet で実装する ---
      // impl エージェントは opus から sonnet に変更（計画は Plan フェーズで完了済みのため）。
      await updateState(item.number, { status: 'implementing' })
      impl = await agent(implementPrompt(item, planResult.plan), {
        label: `impl:#${item.number}`,
        phase: 'Implement',
        model: 'sonnet',
        effort: 'medium',
        schema: IMPL_SCHEMA,
        isolation: 'worktree',
      })
      // impl の成否判定: push 前 review フローでは prNumber は存在しない（PR 未作成）。
      // branch が有効かどうかで実装の成否を判定する。
      if (!impl || !impl.branch) {
        const reason = sanitize(impl?.summary ?? '実装エージェントが異常終了した')
        await updateState(item.number, { status: 'failed', note: reason })
        recordFailure({ issue: item.number, reason })
        return false
      }
      // エージェント返却の branch 名もブランチ名として有効な文字種のみ許可する
      if (!isValidBranchName(impl.branch ?? '')) {
        const reason = `branch 名が不正: ${sanitize(impl.branch ?? '(空)')}`
        await updateState(item.number, { status: 'failed', note: reason })
        recordFailure({ issue: item.number, reason })
        return false
      }
      // impl が返した worktreePath もホワイトリスト検証を通す
      impl = { ...impl, worktreePath: sanitizeWorktreePath(impl.worktreePath ?? ''), prNumber: 0 }
      // impl 完了直後: reviewing に遷移し branch / worktree を記録する。
      // PR はまだ作成していないため pr: 0 を記録する（PR 作成は Review 通過後）。
      // フォールバック前に保存済みの旧 worktree があれば削除して孤児化を防ぐ
      await updateState(
        item.number,
        {
          status: 'reviewing',
          pr: 0,
          branch: impl.branch,
          worktree: impl.worktreePath,
          fixCount: savedFixCount,
        },
        fallbackOldWorktree ? { cleanupWorktree: fallbackOldWorktree } : {},
      )
    }

    // --- Review フェーズ: push 前のローカル diff を implement-review で独立レビューする ---
    // push 前に Review を完結させることで、Review 失敗時に CI を一切起動しない（CI リソース節約）。
    // push・PR 作成は Review が全通過した後に初めて行う。
    // fixCount は Review ループと後続 Merge ループで共有する（修正総数上限 6 を一元管理）。
    // Review worktree はレビューのみで変更しないため Workflow の unchanged worktree 自動削除で
    // 残骸にならない（impl/fix の worktree のみ追跡している）。
    let fixCount = savedFixCount
    // Review ループ内の fix が使った最新の worktree パスを追跡する。
    // fix ごとに旧 worktree を削除し新パスに更新する。runMergeLoop へは渡さない
    // （Review fix の worktree は Merge ループ開始前に削除済みのため）。
    let currentWorktreePath = impl.worktreePath ?? ''
    let reviewPassed = false
    let reviewsLeft = 3
    // ループ外からも参照できるよう最後の Review 指摘をここで保持する
    let lastReviewSummary = '不明'
    // 最終 Review ラウンドで Low のみだった場合に通過させ、その Low 指摘を PR 作成後に
    // コメントとして追加するため保持する（Medium 以上が残った場合は空のまま blocked になる）。
    let deferredLowFindings = ''
    while (!reviewPassed && reviewsLeft > 0) {
      reviewsLeft--
      const r = await agent(reviewPrompt(item, impl), {
        label: `review:#${item.number}`,
        phase: 'Review',
        model: 'sonnet',
        effort: 'medium',
        schema: REVIEW_SCHEMA,
        isolation: 'worktree',
      })
      if (r?.state === 'ok') {
        reviewPassed = true
        log(`#${item.number}: Review 通過 — ${sanitize(r.summary ?? '')}`)
        break
      }
      // needs-fix または r が無効（安全側に倒して fix 相当とみなす）
      lastReviewSummary = r?.summary ?? 'review エージェントが異常終了した'
      log(`#${item.number}: Review 指摘あり（残り ${reviewsLeft} 回）: ${sanitize(lastReviewSummary)}`)
      // 残レビュー回数が 0（最終反復）なら fix しても再レビューできない。
      // ここで Low のみの指摘（highestSeverity === 'low'）は通過扱いにし、
      // その Low 指摘は PR 作成後にコメントとして追加する（マージ後 follow-up 候補）。
      // Medium 以上が残る場合は従来どおり fix を行わず収束失敗（blocked）として抜ける。
      if (reviewsLeft === 0) {
        // この分岐は state === 'needs-fix'（指摘あり）でのみ到達する。指摘がある以上
        // highestSeverity は最低でも low のはず。'none' は state === 'ok'（指摘なし）専用の値であり、
        // needs-fix + none は矛盾した出力なので未解決指摘として安全側でブロックする（low のみ通過。
        // Bugbot PR #40 指摘）。highestSeverity 不明（r が無効等）も安全側で medium 相当とみなす。
        const finalSeverity = r?.highestSeverity ?? 'medium'
        if (finalSeverity === 'low') {
          reviewPassed = true
          deferredLowFindings = lastReviewSummary
          log(`#${item.number}: 最終 Review は Low のみ — 通過させ、Low 指摘は PR コメントへ追加する`)
        }
        break
      }
      if (fixCount >= 6) {
        const reason = `Review ループで修正上限（6 回）に到達した: ${sanitize(lastReviewSummary)}`
        // push 前のため pr: 0 のまま記録する（PR 未作成）
        await updateState(item.number, { status: 'failed', pr: 0, fixCount, note: reason })
        recordFailure({ issue: item.number, reason })
        return false
      }
      // Review ループの fix は push しない（Review 収束失敗時に CI を起動させないため）。
      // finding には Review エージェントの結果を渡す（summary が指摘全文を含む）
      const oldWorktreePathReview = currentWorktreePath
      // pushAfterFix: false → ローカルに修正コミットを積むだけ（push なし）
      const fReview = await agent(fixPrompt(item, impl, { summary: lastReviewSummary }, false), {
        label: `fix:#${item.number}`,
        phase: 'Implement',
        model: 'sonnet',
        effort: 'medium',
        schema: FIX_SCHEMA,
        isolation: 'worktree',
      })
      const newWorktreePathReview = sanitizeWorktreePath(fReview?.worktreePath ?? '')
      const fixReviewSucceeded = fReview !== null && fReview !== undefined && typeof fReview.pushed === 'boolean'
      if (!fixReviewSucceeded) {
        const fixFailReason = `Review fix エージェントが無効な結果を返した（${fixCount + 1} 回目）`
        log(`⚠️ issue #${item.number}: ${fixFailReason}`)
        // push 前のため pr: 0 のまま記録する（PR 未作成）
        await updateState(item.number, { status: 'failed', pr: 0, fixCount, note: fixFailReason })
        recordFailure({ issue: item.number, reason: fixFailReason })
        return false
      }
      if (fReview.routingError) {
        // worktree 誤配置（別リポ）は修正不能。Merge ループの routingError 処理と同様に
        // 即停止する。誤配置で新規作成された worktree（newWorktreePathReview）のみ掃除し、
        // 直前の正常 worktree（oldWorktreePathReview）は保持してデバッグ・手動再開に残す。
        // fixCount は進展なしのため増やさない。push 前のため pr: 0 で記録する。
        const reason = 'worktree routing error: Review fix worktree が別リポに誤配置（修正不能）。実装リポの worktree への再配置が必要'
        log(`イシュー #${item.number} の Review 修正エージェントが worktree routing error を報告、即停止する`)
        await updateState(
          item.number,
          { status: 'failed', pr: 0, fixCount, note: reason, worktree: oldWorktreePathReview },
          { cleanupWorktree: newWorktreePathReview },
        )
        recordFailure({ issue: item.number, reason })
        return false
      }
      fixCount++
      currentWorktreePath = newWorktreePathReview
      if (!currentWorktreePath) {
        log(`⚠️ issue #${item.number}: Review fix worktree パスを取得できず追跡不能`)
      }
      await updateState(item.number, { fixCount, worktree: currentWorktreePath }, { cleanupWorktree: oldWorktreePathReview })
    }
    if (!reviewPassed) {
      // 3 回 Review しても収束しなかった。push も PR 作成も行わない（CI を一切起動しない）。
      // SKILL.md Step 4 の仕様に従い blocked として記録する（blocked / failed はいずれも
      // 次回最初から再実行されるが、blocked をキーに運用・自動化する側が意図した状態を
      // 観測できるようにする）。push 前のため pr: 0 で記録する。
      const reason = `Review フェーズが 3 回で収束しなかった（最終指摘: ${sanitize(lastReviewSummary)}）。push・PR 作成は行わない`
      await updateState(item.number, { status: 'blocked', pr: 0, fixCount, note: reason })
      recordFailure({ issue: item.number, reason, status: 'blocked' })
      return false
    }

    // --- push + PR 作成フェーズ: Review 全通過後にここで初めて push・PR を作る ---
    // Review が収束した場合のみここに到達する（CI を 1 回のみ起動する）。
    // PR 作成後に prNumber を取得し、以降の Merge ループへ渡す。
    const outOfScope = impl.summary?.includes('対象外') ? impl.summary : ''
    const prCreateResult = await agent(prCreatePrompt(item, impl, outOfScope), {
      label: `pr-create:#${item.number}`,
      phase: 'Implement',
      model: 'sonnet',
      effort: 'low',
      schema: PR_CREATE_SCHEMA,
      isolation: 'worktree',
    })
    if (!prCreateResult || !Number.isInteger(prCreateResult.prNumber) || prCreateResult.prNumber <= 0) {
      const reason = sanitize(prCreateResult?.summary ?? 'push・PR 作成エージェントが異常終了した、または prNumber が不正')
      // push は成功している可能性があるが PR 作成に失敗したため monitoring には移行できない。
      // branch を保存しておくことで、次回再実行時に impl 手順 0b-b（リモートブランチ再利用）が
      // push 済みコミットを検出して回復し、origin/<baseBranch> からの再実装によるリセットを避ける。
      // （0b-a の open PR 検索ではこのケースを拾えないため 0b-b が担う）
      const prCreateNote = `${reason}。push が成功した可能性あり。再実行時は impl 手順 0b-b のリモートブランチ再利用で回復する`
      await updateState(item.number, { status: 'failed', pr: 0, branch: impl.branch, fixCount, note: prCreateNote })
      recordFailure({ issue: item.number, reason })
      return false
    }
    // impl オブジェクトを PR 作成後の prNumber で更新する（以降の Merge ループが参照する）
    impl = { ...impl, prNumber: prCreateResult.prNumber }
    log(`#${item.number}: push + PR 作成完了 — PR #${impl.prNumber}`)
    // 最終 Review ラウンドで Low のみで通過した場合、その Low 指摘を PR コメントとして残す
    // （マージ後 follow-up 候補。マージ自体はブロックしない）。失敗してもマージは継続する。
    if (deferredLowFindings) {
      await agent(lowFindingsCommentPrompt(item, impl.prNumber, deferredLowFindings), {
        label: `low-comment:#${item.number}`,
        phase: 'Review',
        model: 'sonnet',
        effort: 'low',
        schema: STATE_WRITE_SCHEMA,
      })
      log(`#${item.number}: 最終 Review の Low 指摘を PR #${impl.prNumber} にコメント追加した`)
    }
    // PR 作成完了: pr / status を monitoring に更新して Merge ループへ引き継ぐ。
    // fixCount を runImplement スコープ全体で共有するため、以降の Merge ループもこの変数を使う。
    // Review fix で worktree が差し替わっている場合があるため、impl.worktreePath（最初の
    // Implement worktree。Review fix 後は削除済みのことが多い）ではなく Review ループで
    // 追跡した最新の currentWorktreePath を Merge ループへ引き継ぐ（孤児 worktree 防止）。
    await updateState(item.number, { status: 'monitoring', pr: impl.prNumber })
    return await runMergeLoop(item, impl, fixCount, currentWorktreePath)
  }

  // monitoring 再開パス: Review はスキップして monitor ループから再開する。
  // impl.worktreePath は状態ファイルの saved.worktree から復元済みのため最新を指す。
  return await runMergeLoop(item, impl, savedFixCount, impl.worktreePath)
}

// Merge ループを独立関数に分離する。
// runImplement の「新規 impl パス」と「monitoring 再開パス」の両方から呼ばれる。
// fixCount: Review ループで既に消費した修正回数（上限 6 を一元管理するため引き継ぐ）。
// initialWorktreePath: Merge ループ開始時点で追跡すべき worktree パス。新規 impl パスでは
// Review ループ後の最新 worktree、monitoring 再開パスでは状態ファイル由来の worktree を渡す。
// impl.worktreePath をそのまま使うと Review fix で差し替わった後に stale になるため引数で受ける。
async function runMergeLoop(item, impl, initialFixCount, initialWorktreePath) {
  let merged = false
  let lastState = 'timeout'
  let fixCount = initialFixCount
  let noPushRounds = 0
  // fix 中に worktree 誤配置（別リポ）を検出したか。ループ後の最終 updateState で
  // 汎用マージ失敗 note ではなく routing 専用 note を記録するために使う。
  let routingErrorDetected = false
  // 現在追跡中の worktree パス。Merge ループ開始時点の最新値を呼び出し元から受け取り、
  // 以降は最後の fix の worktreePath を常に最新に保つ。merged 時・fix 時の削除対象として使用する
  let currentWorktreePath = initialWorktreePath ?? impl.worktreePath ?? ''
  // 監視は timeout 再試行を含め 7 回まで。fix は最大 6 回で、push 後は必ず 1 回以上の
  // 再監視を確保する（push した fix が再監視されないままループ終了しないように）
  let monitorsLeft = 7
  while (!merged && monitorsLeft > 0) {
    monitorsLeft--
    // externalCheckApps は Workflow スコープのトップレベル変数（Tree フェーズで確定済み）。
    // monitoring 再開パスも同じ externalCheckApps を参照する（再起動しないため一貫している）。
    const m = await agent(monitorPrompt(item, impl, externalCheckApps), { label: `merge:#${item.number}`, phase: 'Merge', model: 'sonnet', effort: 'medium', schema: MERGE_SCHEMA })
    lastState = m?.state ?? 'blocked'
    if (lastState === 'merged') {
      merged = true
      const mergedResult = { issue: item.number, status: 'merged', pr: impl.prNumber, note: m.summary }
      results.push(mergedResult)
      consecutiveFailures = 0
      // merged 確定: fixCount も同時に書く（更新まとめ）。現在追跡中の worktree を自動削除して残骸を防ぐ
      // 終端状態なので書き込み失敗時は 1 回リトライする。リトライも失敗した場合、merged の事実
      // （PR は GitHub 上で MERGED）は変わらないため成功扱いを維持するが、レポートの note に
      // 永続化失敗を明記する。次回実行時は monitor が手順 1 で PR の MERGED 状態を検出して
      // 即 merged を返すため、再監視ループには入らない（冪等）
      {
        const mergedPatch = { status: 'merged', pr: impl.prNumber, fixCount, worktree: currentWorktreePath }
        const mergedOpts = { cleanupWorktree: currentWorktreePath }
        const mergedOk = await updateState(item.number, mergedPatch, mergedOpts)
        if (!mergedOk) {
          log(`⚠️ issue #${item.number}: merged 状態のリトライ書き込みを試みる`)
          const retryOk = await updateState(item.number, mergedPatch, mergedOpts)
          if (!retryOk) {
            log(`⚠️ issue #${item.number}: 状態ファイルへの merged 記録に失敗（${STATE_FILE} を手動確認すること）。PR はマージ済みのため成功として扱う。次回実行時は monitor が MERGED を検出して即終端する`)
            mergedResult.note = `${mergedResult.note}（注意: 状態ファイルへの merged 記録に失敗。次回実行時は monitor が PR の MERGED 状態を検出して即終端する）`
          }
        }
      }
    } else if (lastState === 'needs-fix' || lastState === 'unresolved-comments') {
      if (fixCount >= 6) {
        lastState = 'blocked'
        break
      }
      log(`PR #${impl.prNumber} に修正が必要（${lastState}）、修正エージェントを起動する（${fixCount + 1}/6 回目）`)
      const oldWorktreePath = currentWorktreePath
      // Merge ループの fix は CI 失敗・レビューコメント等の修正。push が必要（pushAfterFix: true）。
      // push 後に CI が再実行されるため、push なし fix（Review ループ用）とは明確に区別する。
      const f = await agent(fixPrompt(item, impl, m, true), { label: `fix:#${item.number}`, phase: 'Implement', model: 'sonnet', effort: 'medium', schema: FIX_SCHEMA, isolation: 'worktree' })
      // fix 結果が有効かどうかを判定する:
      // - f が null/undefined でない
      // - worktreePath が sanitize を通る（空文字でも可）かつ pushed が boolean
      const newWorktreePath = sanitizeWorktreePath(f?.worktreePath ?? '')
      const fixSucceeded = f !== null && f !== undefined && typeof f.pushed === 'boolean'
      if (!fixSucceeded) {
        // fix エージェントが null/不正な値を返した場合: fixCount を消費せず即座に blocked とする
        // （無限ループ防止のため再試行はしない）
        const fixFailReason = `fix エージェントが無効な結果を返した（${fixCount + 1} 回目）`
        log(`⚠️ issue #${item.number}: ${fixFailReason}`)
        await updateState(item.number, { status: 'failed', pr: impl.prNumber, fixCount, note: fixFailReason })
        recordFailure({ issue: item.number, pr: impl.prNumber, reason: fixFailReason })
        return false
      }
      if (f.routingError) {
        // worktree 誤配置（別リポ）は修正不能。fix 成功パス（fixCount++ / 旧 worktree 削除）より
        // 前に即 break する。誤配置で新たに作られた worktree（newWorktreePath）のみ掃除し、
        // 直前の正常 worktree（oldWorktreePath）は patch.worktree で明示保持してデバッグ・
        // 手動再開用に残す（patch から worktree を省くと cleanup 後に .worktree が "" へ
        // クリアされ正常 worktree の追跡を失うため、必ず oldWorktreePath を渡す）。fixCount は
        // 進展なしのため増やさない。最終 status / note はループ後の共通処理で記録する。
        routingErrorDetected = true
        log(`PR #${impl.prNumber} の修正エージェントが worktree routing error を報告、即 blocked とする`)
        await updateState(
          item.number,
          { worktree: oldWorktreePath },
          { cleanupWorktree: newWorktreePath },
        )
        lastState = 'blocked'
        break
      }
      // fix 成功: fixCount をインクリメントして永続化し、旧 worktree を削除する
      fixCount++
      // 旧パスを保持し続けると stale になるため、有効・無効を問わず必ず新値で上書きする
      currentWorktreePath = newWorktreePath
      if (!newWorktreePath) {
        log(`⚠️ issue #${item.number}: fix worktree パスを取得できず追跡不能。git worktree prune での手動掃除が必要な場合あり`)
      }
      // fix 実行後: fixCount・新 worktree パスを更新し、旧 worktree を削除する
      await updateState(item.number, { fixCount, worktree: currentWorktreePath }, { cleanupWorktree: oldWorktreePath })
      if (!f.pushed) {
        // 「指摘は修正済みで push 不要」の場合があるため即 blocked にせず 1 回だけ再監視する。
        // 2 回連続で push なしなら進展がないため blocked とする
        noPushRounds++
        if (noPushRounds >= 2) {
          lastState = 'blocked'
          break
        }
        log(`PR #${impl.prNumber} の修正エージェントは push 不要と判断、マージ条件を再判定する`)
      } else {
        noPushRounds = 0
      }
      if (monitorsLeft < 1) monitorsLeft = 1
    } else if (lastState === 'blocked') {
      break
    }
    // timeout は次ラウンドで再監視する
  }
  if (!merged) {
    // routing error は専用 note を残す（汎用マージ失敗 note で上書きしない）。worktree は
    // 直前の正常パスを残すため、ここでは cleanupWorktree を指定せず .worktree を触らない。
    const reason = routingErrorDetected
      ? 'worktree routing error: fix worktree が別リポに誤配置（修正不能）。実装リポの worktree への再配置が必要'
      : `マージに到達できなかった（最終状態: ${lastState}）`
    await updateState(item.number, { status: 'failed', pr: impl.prNumber, fixCount, note: reason })
    recordFailure({ issue: item.number, pr: impl.prNumber, reason })
    return false
  }
  return true
}

async function runOne(item) {
  try {
    const ok = item.kind === 'verify-close' ? await runVerifyClose(item) : await runImplement(item)
    return { number: item.number, ok }
  } catch (e) {
    const reason = sanitize(e?.message ?? 'agent error')
    await updateState(item.number, { status: 'failed', note: reason })
    recordFailure({ issue: item.number, reason })
    return { number: item.number, ok: false }
  }
}

// ============================================================================
// セクション 8: 実行: スケジューラ
// ここから実行フロー（続き）。依存グラフ補助関数を定義してから並列実行ループに入る。
// isAncestor / findDependencyCycle / depsOf / isValidBranchName / isActiveMonitoring /
// markBlockedByDeps を含み、全イシューを post-order 順に並列投入して後処理レポートを返す。
// ============================================================================

// --- 並列スケジューラ ---
// 待機が必要なのは「機能的依存」のみ:
//   - verify-close ノードは全子イシューの完了を待つ
//   - Plan が抽出した dependsOn（本文に明示された依存・前提実装）を待つ
// それ以外は post-order 順を優先度として空きスロットへ並列投入する。
// ファイル競合によるマージコンフリクトは待機せず、後段の修正ループで解消する。
const done = new Set()
const failedSet = new Set()
for (const item of queue) {
  if (item.state !== 'open') {
    results.push({ issue: item.number, status: 'skipped', note: 'すでに closed' })
    done.add(item.number)
  } else {
    // 状態ファイルで merged / closed のものは done 扱いにしてスキップする（再開時の防御）。
    // ただしここに来た時点で GitHub 上の issue は open であり、記録と実態が矛盾している
    // （merged 後の issue close 失敗・手動 reopen 等）。GitHub を正として無条件 skip しない:
    //   - verify-close ノード: 冪等（全子 closed 確認 → close）のため再実行する
    //   - merged かつ再開情報（pr / branch）が有効: monitoring に格下げして再投入する。
    //     monitor が手順 1 で PR の MERGED を検出し、issue close を再試行して即終端する
    //   - それ以外（再開情報なし）: skip するが done 扱いにはしない。記録と実態が矛盾し
    //     完了を検証できないため、failedSet に入れて後続イシューをブロックする
    //     （done に入れると後続が「前提充足」とみなして進んでしまうため）。要手動確認を明記する
    const saved = savedItems[String(item.number)] ?? {}
    if (saved.status === 'merged' || saved.status === 'closed') {
      const resumable =
        saved.status === 'merged' && Number.isInteger(saved.pr) && saved.pr > 0 && isValidBranchName(saved.branch)
      if (item.kind === 'verify-close') {
        log(`#${item.number}: 状態ファイルは ${saved.status} だが GitHub では open のため verify-close を再実行する`)
      } else if (resumable) {
        savedItems[String(item.number)] = { ...saved, status: 'monitoring' }
        log(`#${item.number}: 状態ファイルは merged だが GitHub では open のため monitor を再実行する（PR #${saved.pr} の MERGED 確認と issue close を再試行）`)
      } else {
        results.push({
          issue: item.number,
          status: 'blocked',
          note: `状態ファイルは ${saved.status} だが GitHub では open（再開情報なし）。完了を検証できないため後続をブロックする。手動確認が必要`,
        })
        // done ではなく failedSet に入れる: 完了が検証できない以上「前提充足」として
        // 後続を進めてはならない。failedSet 入りにより依存する後続は markBlockedByDeps で
        // blocked になる。dispatch ループは failedSet も skip するため本人は再実行されない
        failedSet.add(item.number)
        log(`⚠️ #${item.number}: 状態ファイルは ${saved.status} だが GitHub では open。再開情報がないため skip し、後続イシューをブロックする（手動確認が必要）`)
      }
    }
  }
}
const work = queue.filter((q) => q.state === 'open' && !done.has(q.number))
const inTree = new Set(queue.map((q) => q.number))

// 依存グラフを事前構築し、解決不能な依存を除去してデッドロックを防ぐ:
//   1. 祖先イシューへの dependsOn は無視（親は子の完了を待つため本質的に循環）
//   2. 残る循環は DFS で検出し、循環を構成する dependsOn 辺を除去
//      （木の親子辺は除去対象にしない。木のみなら循環は構造上発生しない）
const depsMap = new Map()
for (const item of queue) {
  const ds = new Set()
  for (const c of byParent.get(item.number) ?? []) ds.add(c.number)
  depsMap.set(item.number, ds)
}
const parentNumOf = new Map(queue.map((q) => [q.number, q.parent]))
function isAncestor(anc, n) {
  let cur = parentNumOf.get(n)
  while (Number.isInteger(cur) && cur !== 0) {
    if (cur === anc) return true
    cur = parentNumOf.get(cur)
  }
  return false
}
for (const item of queue) {
  for (const d of item.dependsOn ?? []) {
    if (!Number.isInteger(d) || !inTree.has(d) || d === item.number) continue
    if (isAncestor(d, item.number)) {
      log(`#${item.number} の dependsOn #${d} は祖先イシューのため無視する（親は子の完了を待つ側）`)
      continue
    }
    depsMap.get(item.number).add(d)
  }
}
function findDependencyCycle() {
  const color = new Map() // undefined=未訪問 / 1=訪問中 / 2=完了
  const stack = []
  function dfs(n) {
    color.set(n, 1)
    stack.push(n)
    for (const d of depsMap.get(n) ?? []) {
      if (color.get(d) === 1) return stack.slice(stack.indexOf(d))
      if (!color.has(d)) {
        const found = dfs(d)
        if (found) return found
      }
    }
    stack.pop()
    color.set(n, 2)
    return null
  }
  for (const item of queue) {
    if (!color.has(item.number)) {
      const found = dfs(item.number)
      if (found) return found
    }
  }
  return null
}
let cycle = findDependencyCycle()
while (cycle) {
  let removed = false
  for (let i = 0; i < cycle.length; i++) {
    const from = cycle[i]
    const to = cycle[(i + 1) % cycle.length]
    const isTreeEdge = (byParent.get(from) ?? []).some((c) => c.number === to)
    if (!isTreeEdge && depsMap.get(from)?.has(to)) {
      depsMap.get(from).delete(to)
      log(`循環依存を検出: ${cycle.map((n) => `#${n}`).join(' → ')}。#${from} の dependsOn #${to} を無視する`)
      removed = true
      break
    }
  }
  // 木の親子辺のみで構成される循環は構造上発生しないため、ここに到達するのは異常データ
  if (!removed) throw new Error(`解決不能な循環依存: ${cycle.map((n) => `#${n}`).join(' → ')}`)
  cycle = findDependencyCycle()
}

function depsOf(item) {
  return depsMap.get(item.number) ?? new Set()
}

// branch 名としてブランチ名に有効な文字種のみかを検証する（runImplement の再開ガードと共有）
// reviewPrompt / fixPrompt は impl.branch を sanitizeBranch に通す。sanitizeBranch は
// '..' を拒否するため、ゲート側の本関数でも '..' を弾いて検証条件を一致させる
// （食い違うと a..b 等が初期ゲートを通過し、reviewing 遷移後に sanitizeBranch で例外になる）。
function isValidBranchName(b) {
  return typeof b === 'string' && !/\.\./.test(b) && /^[a-zA-Z0-9][a-zA-Z0-9\-_./]*$/.test(b)
}

// 状態ファイル上で monitoring かつ再開情報（pr / branch）が有効な issue は
// blocked で上書きせず「monitor から再開する」と報告してよい。
// runImplement の monitor 再開ガード（pr > 0 かつ branch 有効）と必ず同一条件にする。
// 条件が食い違うと「monitor から再開する」と報告したのに次回実行で impl が再走する
function isActiveMonitoring(n) {
  const s = savedItems[String(n)] ?? {}
  return s.status === 'monitoring' && Number.isInteger(s.pr) && s.pr > 0 && isValidBranchName(s.branch)
}

async function markBlockedByDeps(item, failedDeps) {
  failedSet.add(item.number)
  // 失敗依存を「子イシュー（tree edge）」と「dependsOn 前提」に分けて文言を変える。
  // 親は子の失敗そのものを実行できないのではなく、子孫が未解決のためクローズ検証を保留する。
  // leaf の前提失敗（本当に着手不能）と混同しないよう区別する。
  const childSet = new Set((byParent.get(item.number) ?? []).map((c) => c.number))
  const failedChildren = failedDeps.filter((d) => childSet.has(d))
  const failedPrereqs = failedDeps.filter((d) => !childSet.has(d))
  let note
  if (failedChildren.length > 0 && failedPrereqs.length === 0) {
    note = `子イシューの失敗・ブロックによりクローズ検証を保留: ${failedChildren.map((d) => `#${d}`).join(', ')}`
  } else if (failedChildren.length > 0) {
    note =
      `子イシュー ${failedChildren.map((d) => `#${d}`).join(', ')} と前提イシュー ` +
      `${failedPrereqs.map((d) => `#${d}`).join(', ')} の失敗によりクローズ検証を保留`
  } else {
    note = `前提イシューの失敗・ブロックにより未着手: ${failedPrereqs.map((d) => `#${d}`).join(', ')}`
  }
  // monitoring かつ pr > 0 の場合は blocked で上書きしない（halt 処理と同じガード）。
  // 状態ファイルが monitoring の再開情報を保持するため、レポート側にも PR 番号と
  // 再開手順を併記する（blocked のみの報告だと実態＝再開可能と矛盾するため）
  if (isActiveMonitoring(item.number)) {
    const pr = savedItems[String(item.number)].pr
    results.push({
      issue: item.number,
      status: 'blocked',
      pr,
      note: `${note}（中断時に monitoring・PR #${pr} 作成済み。同じ引数で再実行すると monitor から再開する）`,
    })
    log(`#${item.number}: monitoring 状態を維持する（PR #${pr} の再開情報を保持）。依存失敗により新規着手はしない`)
    return
  }
  results.push({
    issue: item.number,
    status: 'blocked',
    note,
  })
  // blocked 確定: note に理由を記録する（await して return 前に永続化を保証する）
  await updateState(item.number, { status: 'blocked', note })
  log(`#${item.number}: ${note}`)
}

const running = new Map()
while (true) {
  // 空きスロットへ post-order 順に投入する（halted 後は新規着手しない）
  if (!halted) {
    for (const item of work) {
      if (running.size >= concurrency) break
      const n = item.number
      if (done.has(n) || failedSet.has(n) || running.has(n)) continue
      // active monitoring（PR 作成済み）は依存の成否に関わらず monitor 再開に載せる。
      // 前回実行で PR を作った後に依存失敗で markBlockedByDeps された場合、その時点では
      // failedSet に入る（同一実行内の伝播・無限ループ防止のため）が、状態ファイルは
      // monitoring のまま残る。failedSet はメモリのみで次回実行時にリセットされるため、
      // ここで依存ガードより前に拾わないと「依存が done でない」L927 で continue され、
      // PR がマージ監視に戻れず宙に浮く。マージ可否は runImplement の monitor ループ内の
      // CI/レビュー条件で判定されるため、依存未充足の PR をここで誤マージすることはない。
      if (isActiveMonitoring(n)) {
        log(`#${n}: monitoring 再開（PR #${savedItems[String(n)].pr}）: ${sanitize(item.title)}`)
        running.set(n, runOne(item))
        continue
      }
      const ds = [...depsOf(item)]
      const failedDeps = ds.filter((d) => failedSet.has(d))
      if (failedDeps.length > 0) {
        // 失敗依存があっても、未確定（実行中/未投入）の依存が残る間は blocked を確定しない。
        // 全依存が確定（done/failed）してから確定することで、兄弟イシューの完了・マージを待ち、
        // 親が最初の子失敗で早すぎる blocked にならないようにする（失敗依存リストも完全になる）。
        if (ds.every((d) => done.has(d) || failedSet.has(d))) await markBlockedByDeps(item, failedDeps)
        continue
      }
      if (!ds.every((d) => done.has(d))) continue
      log(`#${n} を開始（実行中 ${running.size + 1}/${concurrency}）: ${sanitize(item.title)}`)
      running.set(n, runOne(item))
    }
  }
  if (running.size === 0) break
  const finished = await Promise.race(running.values())
  running.delete(finished.number)
  if (finished.ok) done.add(finished.number)
  else failedSet.add(finished.number)
}

// 依存失敗の連鎖を最終確定する（dispatch 順の都合で未マークのものを掃く）
let cascaded = true
while (cascaded) {
  cascaded = false
  for (const item of work) {
    const n = item.number
    if (done.has(n) || failedSet.has(n)) continue
    const ds = [...depsOf(item)]
    const failedDeps = ds.filter((d) => failedSet.has(d))
    // dispatch ループと同じ確定条件を適用する: 未確定（halt で未着手のまま終了した）依存が
    // 残る item は blocked にせず notStarted へ落とす。失敗依存リストが不完全なまま
    // blocked 確定すると note が新ルール（全依存確定後に確定）と矛盾するため。
    if (failedDeps.length > 0 && ds.every((d) => done.has(d) || failedSet.has(d))) {
      await markBlockedByDeps(item, failedDeps)
      cascaded = true
    }
  }
}
// halted により完了しなかったものも results に必ず記録する（報告漏れ防止）。
// 「未着手」と「monitoring 中断（PR 作成済み・再開可能）」は実態が異なるため status を分ける
const pending = work
  .filter((q) => !done.has(q.number) && !failedSet.has(q.number))
  .map((q) => q.number)
const notStarted = pending.filter((n) => !isActiveMonitoring(n))
const interrupted = pending.filter((n) => isActiveMonitoring(n))
const notStartedNote = halted
  ? `halted により未着手（理由: ${halted.reason}）`
  : 'スケジューラ終了時に未着手（キュー未到達）'
for (const n of notStarted) {
  results.push({ issue: n, status: 'not-started', note: notStartedNote })
  // 未着手の notStarted は blocked として状態ファイルに記録する
  await updateState(n, { status: 'blocked', note: notStartedNote })
}
for (const n of interrupted) {
  // 状態ファイル上で monitoring かつ pr > 0: 再開情報が有効なため状態を上書きせず、
  // results にも not-started ではなく monitoring として記録する（レポートと実態の矛盾防止）
  const pr = savedItems[String(n)].pr
  results.push({
    issue: n,
    status: 'monitoring',
    pr,
    note: `中断時に monitoring（PR #${pr} 作成済み）。同じ引数で再実行すると monitor から再開する`,
  })
  log(`#${n}: halt 時も monitoring 状態を維持する（PR #${pr} の再開情報を保持）`)
}
if (notStarted.length > 0) {
  log(`未着手のまま終了: ${notStarted.map((n) => `#${n}`).join(', ')}`)
}
if (interrupted.length > 0) {
  log(`monitoring 中断（再開可能）: ${interrupted.map((n) => `#${n}`).join(', ')}`)
}

if (halted) log(`中断: ${halted.reason}（直近の停滞イシュー: ${halted.issues.map((n) => `#${n}`).join(', ')}）`)
return { parent, baseBranch, parallel: concurrency, total: queue.length, done: results, failures, notStarted, interrupted, halted }
