// gh-observe-stub.mjs — observe-pr.sh を実 API なしで走らせるための偽 `gh`（Issue #603 第 2 弾）。
// ファイル名が `*.test.mjs` に一致しないため node --test の glob には拾われない。
//
// 偽 `gh` は POSIX sh と jq だけで書く（docker の alpine でも node 無しで動かせるよう、スタブ側は node に依存しない）。
// 呼び出しを「経路キー」に分類し、キーごとに用意した応答を呼び出し回数順に返す:
//   prview        gh pr view <n> [-R repo] --json …（--jq が付けば応答 JSON を jq -r で絞る。実 gh と同じ）
//   check-runs-total  gh api …/commits/<sha>/check-runs?per_page=1（件数だけを見る呼び出し）
//   check-runs    gh api … …/commits/<sha>/check-runs（--paginate --slurp 付き。名前・app.slug を見る呼び出し）
//   status        gh api …/commits/<sha>/status
//   statuses      gh api … …/commits/<sha>/statuses
//   rules         gh api … …/rules/branches/<base>
//   reviews       gh api … …/pulls/<n>/reviews
//   graphql       gh api graphql …
//   prchecks      gh pr checks <n> [-R repo] --json state [--jq …]（--jq は prview と同じ扱い。第 6 弾 merge-gate.sh）
//   rulesets-<id> gh api …/rulesets/<id>（merge-gate.sh の G0 が bypass_actors と enforcement を読む）
//   apps-<slug>   gh api apps/<slug>（外部チェック App の ID）
// 応答: routes[key] は { out, exit } か、その配列（n 回目の呼び出しに配列の n 番目、足りなければ最後の要素）。
//   out は文字列（そのまま標準出力）、exit は終了コード（既定 0）。gh api は HTTP エラー時に本文を標準出力へ出して
//   非 0 で終わるので、{ out: '{"message":"Not Found"}', exit: 1 } でその挙動を再現できる。
// 遅延・ハング: 環境変数 GH_STUB_DELAY（秒）で応答前に眠る。GH_STUB_HANG（秒。テストごとに一意の値にする）は孫プロセスの sleep と
//   自身の sleep を残して返らない（タイムアウトと子プロセスの後始末の検証用）。
// 呼び出しの記録: callsPath の各行が 1 回分の argv（空白区切り）。countOf(key) で経路ごとの呼び出し回数を読む。
import { chmodSync, existsSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { trackTmp } from './tmp-track.mjs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const STUB_SH = `#!/bin/sh
# 生成スタブ（テスト専用）
dir=\${GH_STUB_DIR:?}
echo "$*" >> "$dir/calls.log"
# 遅い・ハングする gh を模す（GH_STUB_DELAY 秒眠る / GH_STUB_HANG 秒の sleep を子と孫に残す）
[ -n "\${GH_STUB_DELAY:-}" ] && sleep "$GH_STUB_DELAY"
# GH_STUB_DELAYS="0 0 0 60": 全経路を通した n 番目の呼び出しだけ n 番目の秒数だけ眠る（リスト外は 0）
if [ -n "\${GH_STUB_DELAYS:-}" ]; then
  c=0; [ -f "$dir/all.count" ] && c=$(cat "$dir/all.count")
  c=$((c + 1)); echo "$c" > "$dir/all.count"
  d=0; i=0
  for x in $GH_STUB_DELAYS; do i=$((i + 1)); [ "$i" -eq "$c" ] && d=$x; done
  [ "$d" = 0 ] || sleep "$d"
fi
if [ -n "\${GH_STUB_FLOOD:-}" ]; then while :; do echo '{"total_count":1}'; done; fi
if [ -n "\${GH_STUB_HANG:-}" ]; then sleep "$GH_STUB_HANG" & sleep "$GH_STUB_HANG"; fi
key=""
if [ "$1" = "pr" ] && [ "$2" = "view" ]; then
  key=prview
elif [ "$1" = "pr" ] && [ "$2" = "checks" ]; then
  key=prchecks
elif [ "$1" = "api" ]; then
  for a in "$@"; do
    case "$a" in
      graphql) key=graphql ;;
      repos/*/check-runs?per_page=1) key=check-runs-total ;;
      repos/*/check-runs) key=check-runs ;;
      repos/*/status) key=status ;;
      repos/*/statuses) key=statuses ;;
      repos/*/rules/branches/*) key=rules ;;
      repos/*/rulesets/*) key=rulesets-\${a##*/} ;;
      apps/*) key=apps-\${a##*/} ;;
      repos/*/pulls/*/reviews) key=reviews ;;
    esac
  done
fi
if [ -z "$key" ]; then
  echo "gh stub: 未定義の呼び出し: $*" >&2
  exit 99
fi
n=0
[ -f "$dir/$key.count" ] && n=$(cat "$dir/$key.count")
n=$((n + 1))
echo "$n" > "$dir/$key.count"
pick() {
  # $1 = 拡張子。n 回目のファイルがあればそれ、無ければ最後に存在する番号のもの
  i=$n
  while [ "$i" -ge 1 ]; do
    if [ -f "$dir/$key.$i.$1" ]; then printf '%s' "$dir/$key.$i.$1"; return; fi
    i=$((i - 1))
  done
}
outf=$(pick out)
exitf=$(pick exit)
code=0
[ -n "$exitf" ] && code=$(cat "$exitf")
if [ -n "$outf" ]; then
  if [ "$key" = prview ] || [ "$key" = prchecks ]; then
    jq_expr=""
    prev=""
    for a in "$@"; do
      [ "$prev" = "--jq" ] && jq_expr=$a
      prev=$a
    done
    if [ -n "$jq_expr" ]; then jq -r "$jq_expr" < "$outf"; else cat "$outf"; fi
  elif [ "$key" = status ]; then
    # --paginate なしの gh api はページの 1 つ目だけを返す（2 ページ目以降を取りこぼす変異を検出できるようにする）
    pg=0
    for a in "$@"; do [ "$a" = "--paginate" ] && pg=1; done
    if [ "$pg" = 1 ]; then cat "$outf"; else head -n 1 "$outf"; fi
  else
    cat "$outf"
  fi
fi
exit "$code"
`

export function createObserveStub(routes = {}) {
  const dir = trackTmp(mkdtempSync(join(tmpdir(), 'iit-observe-stub-')))
  const ghPath = join(dir, 'gh')
  writeFileSync(ghPath, STUB_SH)
  chmodSync(ghPath, 0o755)
  writeFileSync(join(dir, 'calls.log'), '')
  const stub = {
    dir,
    binDir: dir,
    callsPath: join(dir, 'calls.log'),
    // 経路キーの応答を（再）設定する
    set(key, spec) {
      const list = Array.isArray(spec) ? spec : [spec]
      list.forEach((r, i) => {
        writeFileSync(join(dir, `${key}.${i + 1}.out`), r.out ?? '')
        writeFileSync(join(dir, `${key}.${i + 1}.exit`), String(r.exit ?? 0))
      })
    },
    countOf(key) {
      const f = join(dir, `${key}.count`)
      return existsSync(f) ? Number(readFileSync(f, 'utf8')) : 0
    },
    calls() {
      return readFileSync(join(dir, 'calls.log'), 'utf8').split('\n').filter(Boolean)
    },
    env(extra = {}) {
      return { ...process.env, PATH: `${dir}:${process.env.PATH}`, GH_STUB_DIR: dir, ...extra }
    },
  }
  for (const [k, v] of Object.entries(routes)) stub.set(k, v)
  return stub
}

// 複数ページを返す経路（rules・check-runs・status・statuses・reviews）の応答を『ページの配列』の JSON で書くフィクスチャ用。
// 実際の gh api --paginate は、ページごとの JSON を 1 行ずつ連ねて出す（--slurp なし）。この変換が各ページを 1 行にする。
// 配列でない応答（HTTP エラー本文・壊れた JSON）はそのまま返す。
const PAGED_KEYS = new Set(['rules', 'check-runs', 'status', 'statuses', 'reviews'])
export function createObserveStubPages(routes = {}) {
  const convert = (key, spec) => {
    if (!PAGED_KEYS.has(key)) return spec
    const one = (r) => {
      try {
        const v = JSON.parse(r.out ?? '')
        return Array.isArray(v) ? { ...r, out: v.map((p) => JSON.stringify(p)).join('\n') + '\n' } : r
      } catch {
        return r
      }
    }
    return Array.isArray(spec) ? spec.map(one) : one(spec)
  }
  return createObserveStub(Object.fromEntries(Object.entries(routes).map(([k, v]) => [k, convert(k, v)])))
}
