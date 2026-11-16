// gh-repo-scan-stub.mjs — scripts/repo-scan.sh を実 API なしで走らせるための偽 `gh`。
// ファイル名が `*.test.mjs` に一致しないため node --test の glob には拾われない。
//
// 偽 `gh` は POSIX sh だけで書く。実 gh と同じく `--jq <フィルタ>` は応答の JSON に適用する（偽 gh の中で単体の jq `-r` を使う）ので、
// スクリプトが渡す jq フィルタそのもの（RS_APPS_JQ など）が実行される。`--paginate` の応答は『配列の連結』（ページごとに 1 つの JSON を改行区切りで並べる）。
//   受け付ける呼び出し:
//     gh repo view --json owner,name --jq F                                      → repoview.json（旧コマンドの実行用。既定は o/r）
//     gh pr list [-R repo] --state merged --limit 3 --json headRefOid --jq F   → prs.json（応答は [{headRefOid}, ...]）
//     gh api [--paginate] repos/…/commits/<sha>/check-runs[?per_page=100&page=N] [--jq F]  → check_<sha>.json の N ページ目（既定 1）
//     gh api [--paginate] repos/…/labels?per_page=100 [--jq F]                  → labels.json
//     gh api [--paginate] repos/…/issues?state=open&labels=<ENC>&per_page=100    → issues_<ENC の % を = にした文字列>.json
//     （旧コマンドの形 `gh api -X GET repos/…/issues -f labels=<L> …` と `repos/…/labels -f per_page=100` も同じ応答に解決する）
//   応答の登録: JSON（オブジェクト / 配列）か { pages: [[…], …] } か { raw, exit }（そのままの標準出力と終了コード）か { exit }（失敗）。
//   登録の無い呼び出しは HTTP 404 相当（本文を標準出力へ出して exit 1。実 gh はエラー本文も標準出力へ出す）。
// 呼び出しの記録: calls.log の各行が 1 回分の argv（空白区切り）。callsTo(部分文字列) で数える。
import { chmodSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { trackTmp } from './tmp-track.mjs'

const STUB_SH = `#!/bin/sh
# 生成スタブ（テスト専用）
dir=\${GH_SCAN_STUB_DIR:?}
echo "$*" >> "$dir/calls.log"
jqf=""
route=""
flab=""
cap=""
prev=""
for a in "$@"; do
  case "$prev" in
    --jq) jqf=$a; prev=""; continue ;;
    -f) case "$a" in labels=*) flab=\${a#labels=} ;; esac; prev=""; continue ;;
    -X) prev=""; continue ;;
  esac
  case "$a" in
    --jq|-f|-X) prev=$a ;;
    repos/*) route=$a ;;
  esac
done
case "$1" in
  pr)
    [ "$2" = "list" ] || { echo "stub: pr list 以外は未対応" >&2; exit 64; }
    key="prs"
    ;;
  repo)
    [ "$2" = "view" ] || { echo "stub: repo view 以外は未対応" >&2; exit 64; }
    key="repoview"
    ;;
  api)
    case "$route" in
      */check-runs|*/check-runs\\?*)
        r=\${route%%\\?*}; sha=\${r%/check-runs}; key="check_\${sha##*/}"
        # 実 GitHub は per_page を省くと 30 件で切る。per_page=100 を付けた呼び出しだけ 100 件まで返す（偽 gh もその挙動に揃える）
        case "$route" in *per_page=100*) cap=100 ;; *) cap=30 ;; esac
        # page=N（既定 1）は N ページ目を切り出す（Issue #809）。<sha>@N で登録したページ単位の応答があればそれを返す（失敗の注入）
        pg=$(printf '%s' "$route" | sed -n 's/.*[?&]page=\\([0-9][0-9]*\\).*/\\1/p')
        [ -n "$pg" ] || pg=1
        if [ -f "$dir/r/\${key}_p$pg.out" ]; then key="\${key}_p$pg"; cap=""; fi
        ;;
      */labels|*/labels\\?*) key="labels" ;;
      */issues\\?*) enc=\${route#*labels=}; enc=\${enc%%&*}; key="issues_$(printf '%s' "$enc" | tr '%' '=')" ;;
      */issues) enc=$(printf '%s' "$flab" | jq -sRr @uri); key="issues_$(printf '%s' "$enc" | tr '%' '=')" ;;
      *) echo "stub: 未対応の経路 $route" >&2; exit 64 ;;
    esac
    ;;
  *) echo "stub: 未対応" >&2; exit 64 ;;
esac
if [ -f "$dir/r/$key.out" ]; then
  rc=0
  [ -f "$dir/r/$key.rc" ] && rc=$(cat "$dir/r/$key.rc")
  src="$dir/r/$key.out"
  if [ -n "$cap" ] && [ ! -f "$dir/r/$key.raw" ]; then
    jq -c ".check_runs |= .[$(( (pg - 1) * cap )):$(( pg * cap ))]" < "$src" > "$dir/r/$key.cap" || exit 5
    src="$dir/r/$key.cap"
  fi
  if [ -n "$jqf" ] && [ ! -f "$dir/r/$key.raw" ]; then
    jq -r "$jqf" < "$src" || exit 5
  else
    cat "$dir/r/$key.out"
  fi
  exit "$rc"
fi
printf '%s' '{"message":"Not Found","status":"404"}'
exit 1
`

// jq の @uri と同じパーセントエンコード（非予約文字 A-Za-z0-9-_.~ 以外をすべて UTF-8 のバイトごとに %XX）
export function uriEncode(s) {
  return [...Buffer.from(s, 'utf8')]
    .map((b) => {
      const c = String.fromCharCode(b)
      return /[A-Za-z0-9\-_.~]/.test(c) ? c : `%${b.toString(16).toUpperCase().padStart(2, '0')}`
    })
    .join('')
}

const keyForLabel = (label) => `issues_${uriEncode(label).replace(/%/g, '=')}`

/**
 * @param {{ prs?: any, checkRuns?: Record<string, any>, labels?: any, issues?: Record<string, any> }} routes
 *   prs = pr list の応答（[{headRefOid}] など）、checkRuns = sha → 応答、labels = ラベル一覧の応答、issues = ラベル名 → 応答
 */
export function makeGhRepoScanStub({ prs, checkRuns = {}, labels, issues = {}, repoView = { owner: { login: 'o' }, name: 'r' } } = {}) {
  const dir = trackTmp(mkdtempSync(join(tmpdir(), 'iit-gh-scan-')))
  const bin = join(dir, 'bin')
  mkdirSync(bin)
  mkdirSync(join(dir, 'r'))
  writeFileSync(join(bin, 'gh'), STUB_SH)
  chmodSync(join(bin, 'gh'), 0o755)
  writeFileSync(join(dir, 'calls.log'), '')
  const put = (key, resp) => {
    if (resp === undefined) return
    let out
    let exit = 0
    let raw = false
    if (resp && typeof resp === 'object' && 'raw' in resp) {
      out = resp.raw
      exit = resp.exit ?? 0
      raw = true
    } else if (resp && typeof resp === 'object' && !Array.isArray(resp) && 'exit' in resp && Object.keys(resp).length === 1) {
      out = '{"message":"Server Error","status":"500"}'
      exit = resp.exit
      raw = true
    } else if (resp && typeof resp === 'object' && Array.isArray(resp.pages)) {
      out = resp.pages.map((p) => JSON.stringify(p)).join('\n')
    } else {
      out = JSON.stringify(resp)
    }
    writeFileSync(join(dir, 'r', `${key}.out`), out)
    if (raw) writeFileSync(join(dir, 'r', `${key}.raw`), '')
    if (exit !== 0) writeFileSync(join(dir, 'r', `${key}.rc`), String(exit))
  }
  put('prs', prs)
  put('repoview', repoView)
  // キー <sha>@N は N ページ目だけの応答（失敗の注入など。Issue #809）
  for (const [sha, resp] of Object.entries(checkRuns)) put(`check_${sha.replace('@', '_p')}`, resp)
  put('labels', labels)
  for (const [label, resp] of Object.entries(issues)) put(keyForLabel(label), resp)
  return {
    dir,
    bin,
    env: (base = process.env) => ({ ...base, PATH: `${bin}:${base.PATH}`, GH_SCAN_STUB_DIR: dir }),
    calls: () => readFileSync(join(dir, 'calls.log'), 'utf8').split('\n').filter((l) => l !== ''),
    callsTo: (needle) => readFileSync(join(dir, 'calls.log'), 'utf8').split('\n').filter((l) => l.includes(needle)).length,
  }
}

/** check-runs の応答（slugs の App ごとに 1 件）。null の slug は app が null の check-run を表す */
export function checkRuns(slugs) {
  return { total_count: slugs.length, check_runs: slugs.map((s, k) => ({ id: k + 1, name: `c${k}`, app: s === null ? null : { slug: s } })) }
}
/** issues の応答。pr = true は PR（pull_request キーを持つ） */
export function issueList(items) {
  return items.map((x) => (typeof x === 'number' ? { number: x } : { number: x.number, pull_request: x.pr ? { url: 'u' } : undefined }))
}
