// テストが mkdtempSync で作った一時ディレクトリを、プロセス終了時に必ず消すための登録簿。
//
// 各テストファイルは node:test により独立したプロセスで走る。モジュール先頭（await import の前）や
// ヘルパー内で作るディレクトリは、テストの失敗・トップレベルの例外・after フックが走らない経路でも
// 消えなければならないため、'exit' イベントで後始末する（同期処理だけが許される）。
//
// 消すのは trackTmp に渡されたパスだけである。パスを組み立てて消さない。
import { rmSync } from 'node:fs'

const tracked = new Set()
let registered = false

function cleanup() {
  for (const dir of tracked) {
    rmSync(dir, { recursive: true, force: true })
  }
  tracked.clear()
}

// mkdtempSync の戻り値をそのまま包んで使う: trackTmp(mkdtempSync(join(tmpdir(), 'iit-x-')))
// 戻り値は渡した dir と同一。
export function trackTmp(dir) {
  if (typeof dir !== 'string' || dir === '') {
    throw new TypeError(`trackTmp: 一時ディレクトリのパスが文字列でない（${String(dir)}）`)
  }
  tracked.add(dir)
  if (!registered) {
    registered = true
    process.on('exit', cleanup)
  }
  return dir
}
