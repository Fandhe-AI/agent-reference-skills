#!/usr/bin/env bash
# policy-paths-lib.sh — observe-pr.sh の policy-paths モードの判定だけを持つ純関数（source 専用）
#
# 呼び出し元: observe-pr.sh（Issue #760）。fix を経た PR が、計画で宣言していない「方針パス」を変更していないかを数える。
#             方針パスの定義をシェル側に置くのは、生成物（implement-issue-tree.js）のバイト予算を使わないためと、
#             テストが 1 回の bash 起動で表の全ケースを検査できるようにするため（lib/added-files-lib.sh と同じ）。
# 契約: exit せず、git・gh・ネットワークを呼ばない。結果は標準出力と return 値だけ。set -e / set -u / trap / exit は置かない。二重 source は無害。
# 方針パス: 接頭辞 .github/workflows/ ・ .github/actions/、完全一致の CODEOWNERS ・ .github/CODEOWNERS ・ docs/CODEOWNERS。
#           リネームは新旧両方のパスを数える（workflow の外へ出すリネームも拾う）。大文字小文字は区別する（git のパスと同じ）。
# 許可（allow）: カンマ区切りの宣言。完全一致、または / で終わる宣言は接頭辞として一致させる。許可の無い方針パスの件数が unplanned。
# 入力: 標準入力に [{filename, previous_filename}…] の JSON 配列。許可は引数 $1（カンマ区切り。空は許可なし）。外部入力は --arg で渡し
#       jq のプログラム文字列へ埋め込まない。出力: {"policy":N,"unplanned":N}
policy_paths_count() {
  jq -c --arg allow "${1:-}" '
    ($allow | if . == "" then [] else split(",") end) as $al
    | def pol: . as $p | ($p | startswith(".github/workflows/")) or ($p | startswith(".github/actions/"))
        or ($p == "CODEOWNERS" or $p == ".github/CODEOWNERS" or $p == "docs/CODEOWNERS");
      def ok: . as $p | any($al[]; . as $a | $a == $p or ($a | endswith("/")) and ($p | startswith($a)));
      [.[] | (.filename, (.previous_filename // empty)) | select(pol)] as $ps
    | {policy: ($ps | length), unplanned: ([$ps[] | select(ok | not)] | length)}'
}
