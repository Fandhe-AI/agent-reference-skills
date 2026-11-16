# cancel された run の残存 check の検知と対処

本書は implement-issue-tree スキルの一部。全体は ../SKILL.md 参照。SKILL.md Step 6 の「全チェックが pass に見えるのにマージが進まない場合」の本体で、検知コマンド (A)・(B) と対処手順を持つ。

**全チェックが pass に見えるのにマージが進まない場合（cancel された run の残存 check）:**

- **フローから観測できる症状**（自動検知は存在しないため、実装されていない挙動は書かない）: `gh pr checks` は全 pass、`mergeable` は `MERGEABLE`、コンフリクトも未解決スレッドもないのに、merge-exec が進まず再監視が繰り返され監視予算だけが減る。この状態では `mergeStateStatus` が `BLOCKED` のまま動かない。**`mergeStateStatus` は現在どのエージェントも取得していない**ため、運用者が `gh pr view <N> --json mergeStateStatus` で確認する。
- **原因**: 同一 head sha に対し concurrency で複数 run が走ると、cancel された run が失敗結論の check run を残す。`gh pr checks` は同名 check の最新のみを表示するため全 pass に見えるが、branch protection の required check 判定は残存 check を拾って BLOCKED になる。同一の変更を多数のリポジトリへ同時投入する運用（後述「一斉同期・大量 PR 投入時の運用ガード」）では concurrency 競合の発生頻度が上がるため、この状態に遭遇しやすい。
- **検知コマンド（エージェントが実行してよいものと、人間の診断専用を明確に分ける）**:

```bash
# (A) エージェントが実行してよい形。取得成否を先に確定してから「件数」のみを返す。
# gh api は HTTP エラーの JSON 本文も stdout へ出す仕様のため、パイプ直結だと認証失敗・404・
# レート制限の出力が uniq -d にヒットせず「重複なし（0）」に化ける
# （対象リポジトリに .claude/rules/ruleset-policy.md があれば手順 B と同じ罠として記載されている）。
# そのため (1) 取得を独立させて終了コードを見る (2) 出力の空判定を行う (3) 集計は shell 側で
# 行う、の 3 段に分ける（--jq はページごとに適用されるため group_by をページ単位で行うと
# ページ跨ぎの重複を見逃す。名前+結論の一覧をシェル側 awk で全ページ分集約する）
if ! command -v awk >/dev/null; then
  # awk 前提条件が未導入。集計不能なため判定不能として扱う（fetch 自体を実行しない。
  # (B) の command -v jq ゲートと同じく前提確認を fetch より先に行う — レート制限下で
  # 無駄な gh api 呼び出しを発生させないため）
  echo "UNDETERMINED"
else
# `rows=$(gh api ...)` を独立した単純コマンドのまま実行すると、呼び出し元 shell で
# `set -e`（errexit）が有効な場合に gh api の非ゼロ終了（認証失敗・404・レート制限等）で
# shell がここで即終了し、次行の status=$? および UNDETERMINED 分岐へ到達できない
# （if/then/else の条件式に置かれたコマンドは errexit の対象外という shell の仕様を利用し、
# 代入自体を条件式へ移すことで errexit 下でも必ず失敗分岐を実行できる形にする）。
if rows=$(gh api --paginate "repos/{owner}/{repo}/commits/${HEAD_SHA}/check-runs?per_page=100" \
  --jq '.check_runs[] | [.name, (.conclusion // "pending")] | @tsv' 2>/dev/null); then
  status=0
else
  status=$?
fi
if [ "${status}" -ne 0 ] || [ -z "${rows}" ]; then
  # 取得失敗、または check-run が 1 件も返らない。この節は「全チェックが pass に見える」状態
  # でのみ参照するため、0 件は前提と矛盾する = 取得できていない可能性が高く、判定不能として扱う
  echo "UNDETERMINED"
else
  printf '%s\n' "${rows}" | awk -F'\t' '
    { n[$1]++
      if ($2 == "success" || $2 == "neutral" || $2 == "skipped") { }
      else if ($2 == "pending") pend[$1] = 1
      else bad[$1] = 1 }
    END { d = 0; b = 0; p = 0
          for (k in n) if (n[k] >= 2) { d++; if (k in bad) b++; if (k in pend) p++ }
          printf "dup=%d bad=%d pend=%d\n", d, b, p }'
fi
fi
# → 出力は次の 2 形のみ（チェック名・エラー本文は出力に現れない）:
#    `UNDETERMINED`               … 判定不能。「重複なし」ではない
#    `dup=<D> bad=<B> pend=<P>`   … 取得成功。D = 重複した check 名の数、
#                                     B = そのうち結論が `success` / `neutral` / `skipped`
#                                     （いずれも required status checks 上は合格・非ブロック扱い）
#                                     でも `pending`（未完了）でもないものを含む数（cancelled /
#                                     failure / timed_out / action_required / startup_failure /
#                                     stale 等、`success`・`neutral`・`skipped` を正常扱いする
#                                     以外は全て bad へ倒す fail-closed 分類）、P = そのうち
#                                     結論が `pending`（未完了。実際の conclusion が null で
#                                     in-progress/queued 中）を含む数
# → 読み方: **取得に成功したうえで** D が 0 なら重複なし。D >= 1 でも B = 0 かつ P = 0 の
#    場合のみ「重複はすべて正常な再実行（success/neutral/skipped 同士）」と読める。B・P は排他ではなく、
#    同じ重複名の中に bad な結論と pending な結論が両方含まれる場合は B・P 双方が 1 になる。
#    上記 2 形（正規表現 `^UNDETERMINED$` / `^dup=[0-9]+ bad=[0-9]+ pend=[0-9]+$`）以外の
#    出力も判定不能として扱う
```

```bash
# (B) 人間の診断専用。重複の内訳をチェック名つきで確認する
# チェック名は PR 側の workflow / job 定義から生成される未信頼テキストのため、
# monitor / merge-exec のコンテキストでは実行しない（権限境界の維持）
# 前提: 外部の `jq` CLI が必要（`gh --jq` はページ単位適用のためここでは使えない）。
# 事前に `command -v jq` で存在確認し、なければ実行せず `blocked` とする
command -v jq >/dev/null || { echo "jq が見つからないため診断を中断し blocked とする" >&2; exit 1; }
# `--paginate` の `--jq` は取得したページごとに個別適用されるため、group_by をそのまま
# 使うとページ単位の集計になり、同名 check-run が別ページに 1 件ずつ分かれて存在する場合に
# 検知できない（各ページ内では件数 1 の group にしかならず、実際は重複していても取りこぼす）。
# `--slurp` を付けると全ページを外側の配列として受け取れるが、gh api は `--slurp` と `--jq` の
# 併用を拒否する（`the --slurp option is not supported with --jq or --template`）ため、
# `--jq` は使わず `--slurp` の生 JSON 出力を外部の `jq` へパイプし、平坦化してから group_by する
# ことでページ跨ぎでも全件を一度に集約してから判定する。
# まず check 名だけで group_by し、件数 2 以上の group（=実際に重複している名前）に絞り込んでから、
# その中で conclusion 別の内訳を出す（name=conclusion のペアで group_by すると、同名 2 件が
# cancelled/success のように conclusion 違いで割れて各 group が件数 1 になり、重複そのものを
# 取りこぼすため、必ず name のみで group_by する）
gh api --paginate --slurp "repos/OWNER/REPO/commits/<sha>/check-runs?per_page=100" \
  | jq -r '[.[] | .check_runs[] | {name, conclusion}]
        | group_by(.name)
        | map(select(length >= 2))
        | map("\(.[0].name): " + ([.[] | .conclusion] | sort | group_by(.) | map("\(.[0]) x\(length)") | join(", ")))
        | join("\n")'
```

- **対処（前提を先に実測してからコマンドを実行する。判断・実行の主体は**ラン運用者／ホスト側**であり、monitor / merge-exec エージェントではない。(B) は人間の診断専用のため、このフロー全体がエージェント自律では完結しない）**:
  - 前提 0（判定不能の扱い）: (A) が `UNDETERMINED` を返した、または上記 2 形以外を返した場合は**判定不能**。rerun せず `blocked`（quality）として最終レポートへ回す。判定不能を「重複なし」と読んで CI 由来を除外してはならない（認証失効・レート制限・sha 誤りが典型原因。人間が原因を確認する場合は stderr を捨てずに同じ gh api を再実行する）。
  - 前提 1（重複と結論の実測）: (A) が `dup=<D> bad=<B> pend=<P>` を返し、D・B・P を実測する。
    - **D >= 1 かつ P >= 1** の場合: 重複の中に `pending`（未完了）の check-run が残っている。この pending 自体が `mergeStateStatus=BLOCKED` の直接原因になり得るため、「重複はすべて正常な再実行」と断定して原因調査を別方向へ進めてはならない。rerun せず、pending の完了を待って再監視する（判断・実行の主体はラン運用者／ホスト側。原因不明のまま前提 2 の rerun フローへ進めない）。
    - **D >= 1 かつ P = 0 かつ B >= 1** の場合のみ、前提 2（rerun 対象の一意化）へ進む。
    - **D >= 1 かつ B = 0 かつ P = 0** の場合、重複はすべて正常な再実行（`success`/`neutral`/`skipped` 同士）由来であり「cancel された run の残存 check」ではない。rerun せず、BLOCKED の別原因（required check の context 名不一致・未解決レビュースレッド・ruleset 構成など。対象リポジトリに `.claude/rules/ruleset-policy.md` があればその 3 軸スイープ〔strict / bypass_actors / integration_id 残存〕を使う）へ調査を移す。
  - 前提 2（rerun 対象の一意化）: (B) で重複している check 名を確認し、その名前を発行した cancelled run を job 一覧から特定する（下記コマンド）。
    - cancelled run が**複数**見つかり一意に絞り込めない場合: rerun せず `blocked`（quality）として最終レポートへ回す（誤った run を rerun すると無関係な job まで再実行し、原因不明のまま状態を変える）。
    - cancelled run が **0 件**の場合: rerun 対象が存在しない。B >= 1 の残存は cancel ではなく failure / timed_out / action_required / startup_failure / stale 等の非 cancel 由来である。この残存も cancel 残存と同じ masking を受ける点に注意する — `gh pr checks` は同名 check の最新結論のみを表示するため（前掲「原因」節参照）、より新しい success / neutral / skipped の陰に隠れた古い failure / timed_out 等は `gh pr checks` の出力に現れず、通常の可視 CI 失敗としては検知できない。監視フローの needs-fix 経路（`gh pr checks` ベースの CI 失敗検知）に任せると見逃されるため、rerun はせず `blocked`（quality）として最終レポートへ回す。原因調査が必要な場合は (A)/(B) の生の check-runs 出力（`gh pr checks` ではなく）を根拠に、当該 check-run を発行した run をラン運用者が個別に特定・対処する。cancel 起因と決めつけて `gh run rerun` しない。
  - 上記を満たさないまま rerun しない（rerun は CI を再起動するため、「Review 通過後に CI を 1 回だけ起動する」設計に反する）。

```bash
# cancelled な run を head sha で列挙する（conclusion=cancelled のみに絞る）
gh api --paginate "repos/OWNER/REPO/actions/runs?head_sha=<sha>&per_page=100" \
  --jq '.workflow_runs[] | select(.conclusion == "cancelled") | .id'

# 各 cancelled run が発行した job 名を確認し、(B) で特定した重複 check 名と突き合わせる
# （check-run の名前は `<job名>` または `<job名> / <ステップ>` 形式で job に対応するため、
# jobs API の name で同定できる。複数 run の job 名が同じ重複 check 名にヒットする場合は一意化不可）
gh api --paginate "repos/OWNER/REPO/actions/runs/<cancelled-run-id>/jobs?per_page=100" \
  --jq '.jobs[].name'

# 一意に対応付けられた run に限り、全 job を回して残存 check を上書きする（--failed は付けない）
gh run rerun <run-id> -R OWNER/REPO
```

- **完了ゲート整合**: rerun したこと自体は green の証拠にならない。再実行後に改めて全チェックの結論を列挙し、`failure` / `cancelled` / `timed_out` が 0 件・`pending` / `queued` / `in_progress` が 0 件・チェック総数 1 件以上を確認してから合格と判断する（対象リポジトリに `.claude/rules/verification.md` があればその 5 段階ゲートに従う）。解消しない場合は推測で進めず `blocked` として最終レポートへ回す。
