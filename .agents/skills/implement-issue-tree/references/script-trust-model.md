# スクリプト実行の信頼モデル

本書は implement-issue-tree スキルの一部。全体は ../SKILL.md 参照。

決定的な手順（`gh` / `git` / `du` 等のコマンド列と分類規則）をプロンプトの文章から切り出し、スキル同梱のスクリプトにして、サブエージェントには「コマンドを実行して出力を転記する」ことだけをさせる設計（Issue #603）の、**何を防ぎ、何を防がないか**を書く。スクリプトは弾（第 1〜9 弾）ごとに足され、各弾の節が個別の契約を持つ: 第 1 弾は読み取り専用の測定 2 本、第 2 弾は monitor の観測と待機（`observe-pr.sh`）、第 3 弾は base 取り込みと push の検証（**`base-merge.sh` は push を実行する最初のスクリプト**）、第 4 弾は pr-create と fix の push（`pr-push.sh`）と起動時のハッシュ予検査、第 5 弾は状態ファイル（`state.sh`）、第 6 弾は merge-exec の G0 と再検証（`merge-gate.sh`）、第 7 弾は worktree の破棄・掃除（`worktree-remove.sh`）、第 8 弾は monitor の CI 完了待ち（助言的判定）、第 9 弾は Recover の機械手順（`recover-prep.sh`）。安全判定を含むスクリプトを足す弾は、本書の前提を満たすか、満たさない部分を別の機構で補うことを、その弾の PR で示す。

## 構成

| 要素 | 役割 |
|------|------|
| `args.skillDir` | スキルディレクトリ（`scripts/` の 1 つ上）の絶対パス。人間（起動手順）が渡す。形式だけをホストが検証する |
| `scripts/run-verified.sh` | 実行前にスクリプトの SHA-256 を照合する launcher。`bash "<skillDir>/scripts/run-verified.sh" <sha256> <name>.sh …` で起動する（実行ビットに依存しない） |
| `scripts/measure-residual-bytes.sh` / `measure-free-disk.sh` | 測定本体。入力はパスの一覧（標準入力）または 1 件（引数）。出力は 1 行の封筒 |
| `scripts/observe-pr.sh` | monitor の観測本体（第 2 弾）。入力は PR 番号・base・branch・issue・App slug（引数）。モードは `pr` / `checks` / `required` / `reviews` / `threads` / `threads-detail` / `push`（第 3 弾）/ `added-files`（Issue #658。下の「新規追加ファイルの衝突ゲート」節）/ `policy-paths`（Issue #760。下の「方針パスのゲート」節）/ `optin-record`（Issue #603。下の「opt-in テスト記録ゲートの観測」節）。出力は 1 行の封筒（`threads-detail` だけは外部由来の自由文を含む非信頼データで、封筒ではない）。`--wait` は有界の待機 |
| `scripts/base-merge.sh` | 自動 base 取り込みの本体（第 3 弾）。入力は PR 番号・branch・base・期待 owner/repo（引数）。**封筒を使わない**。出力の最後の 1 行は `BASE_MERGE_RESULT {…}`（キーは `BASE_MERGE_SCHEMA` と同じ） |
| `scripts/pr-push.sh` | pr-create と fix の起点の確立・base 取り込み・push・PR 作成（第 4 弾）。リモートの branch の有無・sha は ref 名の完全一致で決め、入れ子の ref で誤判定しない（Issue #770）。モードは `prepare` / `push` / `pr`。**封筒を使わない**。出力の最後の 1 行は `PR_PUSH_RESULT {…}` |
| `scripts/reply-resolve.sh` | Merge ループの fix による定型の対応報告の返信と resolve（Issue #759）。**封筒を使わない**（進捗専用）。出力の最後の 1 行は `REPLY_RESOLVE_RESULT {…}`。書き込みは返信と resolve の 2 mutation だけ（静的ガードが決め打ちの 2 行だけを許可）。防ぐもの: 返信本文への未信頼入力の混入・返信失敗スレッドの resolve・`--allow` 外のスレッド・HEAD/origin/PR head 不一致での投稿。入れ子の ref による head の誤解決（完全一致で解決）・viewer の pending review（下書き）への返信の混入（Issue #769）。防がないもの: 許可リスト内の修正していないスレッドへの定型返信 |
| `scripts/lib/reply-resolve-lib.sh` | `reply-resolve.sh` の純関数（`rr_*`。入力検証・返信本文・処置の分類・結果 JSON） |
| `scripts/state.sh` | 状態ファイル（`_/issue-trees/<親>.json`）の書き込み（第 5 弾）と、唯一の読み取りモード `verify`（計画 C の P5）。書き込みのモードは `merge` / `init` / `hw-max` / `hw-set`。入力は標準入力の 1 行 JSON と引数。**封筒を使わない**。出力の最後の 1 行は `STATE_RESULT {"ok":…}`。`verify` は `--nonce`（必須）・`--page`（既定 0）を取り、**封筒を使う**（ホストが値を採用するため）。何も書かない |
| `scripts/merge-gate.sh` | merge-exec のマージ直前の読み取り専用検証（第 6 弾。G0 = サーバー側強制の実測と、チェック・未解決スレッド・mergeable・外部チェックの再検証）。入力は PR 番号・base・期待 sha・外部チェックの宣言（引数）。**封筒を使う**: payload は判定語（`verdict`。merge-exec の reason と同じ語彙）・段階・固定語の detail・整数の件数・40 桁 16 進の HEAD sha だけ。**マージの実行は含まない** |
| `scripts/worktree-remove.sh` | worktree の破棄・掃除（第 7 弾。モードと保持の規則は第 7 弾の節）。確認と削除を同じプロセスで行う。サブコマンドは `remove --mode superseded|discard`（`--path`・`--branch`・`--base`・`--head`〔discard 専用・40 桁 sha。worktree の HEAD が違えば `retained-head-mismatch`、一致していても detached なら `retained-detached`。値が空・形式不正は exit 2〕・`--expect-branch`〔discard 専用・`--path` が要り `--branch` とは併用しない。HEAD を照合するだけでブランチは消さない。違う・detached なら `retained-branch-mismatch`〕・`--require-missing`〔下記〕）、`sweep --file`（候補は標準入力の JSON 配列）、`check-absent --path`（Issue #637。削除・prune・unlock をしない読み取り専用の不在確認）。**封筒を使わない**。出力の最後の 1 行は `WORKTREE_REMOVE_RESULT {…}`。`check-absent` でホストが不在として信じる語は `absent`（登録も実体も無い）と `prunable`（登録だけ残り、lock なし・ブランチ上）の 2 語だけで、`prunable-detached`〔HEAD が `0000…` の登録を含む〕・`prunable-locked`・`present`・`unregistered-present`・`main`・`unknown`・結果なし・例外は保全する。`prunable` のとき、ホストは planning の前に `remove --mode discard --path <旧パス> --require-missing`（`--branch` なし = ブランチ ref は残す）の 1 回で旧パスの登録だけを片づける。`--require-missing`（discard 専用・`--path` が要り `--branch` / `--head` / `--expect-branch` とは併用しない）は「実体がまだ無いときだけ消す」結びつけで、`check-absent` と削除が別プロセスであることの TOCTOU を塞ぐ: 削除の前（と `git worktree remove` の直前）に同じプロセスでパスの実在を読み、登録も実体もあれば `retained-present`（確かめられないときは `retained-unobservable`）、登録が無いのに実体があれば `retained-unregistered`、lock ありは unlock せず `retained-locked`、実体の無い detached / HEAD `0000…` は `retained-detached` で、何も消さない。結果が `removed` でなくても planning へ進み、消えたと確認できない登録は残置の台帳に載せる。`--path` は照合の前に正規化し、大小だけが違う登録との一致は `unknown`（保全）にする。`--repo-root`（ホストが特定したメイン worktree。無ければパスの最寄りの実在する祖先）の共通 git ディレクトリがカレントと違う・求められないときも `unknown`。全体の `git worktree prune` は 1 か所（`safe_prune`）だけが呼び、`remove` は実際に何かを消したとき、`sweep` は候補を 1 件でも消したときだけ呼ぶ。何も消さなかったとき、および実体の無い detached / HEAD `0000…` の登録（lock なし）が 1 件でもあるときはスキップする（`pruneSkipped`）。`remove` は `--branch` を持つ実体の無い登録を既存の許可形の `git worktree remove` で消してからブランチを消す（lock あり・実体の無い detached / HEAD `0000…` の登録は消さずブランチも残す。この後始末の結果は `--path` の結果を上書きせず `holder`〔`removed` / `retained-…` / `failed`〕に出る。登録が既に無かったときは、登録の一覧を読み直し、ブランチを持つ登録が本当に無いと確かめたときだけブランチを消す）。登録は無いが実体のパスがある場合は、discard の `--head` / `--expect-branch` つきでは `retained-unregistered`（決定的な保持。ホストは merged にせず記録する）、それ以外は `not-registered`。`sweep` の保持照合は字面の正規化と実在する祖先を実体にした形の両方で、大小を畳んで比べる。冒頭で `GIT_DIR` / `GIT_WORK_TREE` / `GIT_COMMON_DIR` / `GIT_INDEX_FILE` を unset する。観測の失敗は、`git status` コマンドそのものの失敗・`--head` 指定時の HEAD の一過性の読み取り失敗が `retained-unobservable`（ホストは恒久の試行済み記録にしない）、`.git` の破損・git の対象が worktree 自身でない状態は `retained-broken`、unborn の HEAD への `--head`〔`show-ref --verify` が終了コード 1 で「無い」と言ったときだけ。それ以外の失敗は `retained-unobservable`〕は `retained-head-mismatch`（どちらも決定的なので記録する。区別できないものは記録側へ倒す）。この値は封筒なしの掃除エージェントの返却（ok / retained / worktree）で、エージェントが偽ると旧記録を捨てて新規に進み得るが、確認自体は削除をしない。露出は discard の `retained: false` 自己申告と同等で、記録を捨てた旧 worktree が実在した場合は、状態ファイルの保持対象から外れるので orphan scan・終了時 sweep の候補になり得る |
| `scripts/recover-prep.sh` | Recover の機械的な部分（第 9 弾）。対象ブランチの解決・未コミット変更の WIP コミット・base の取得・base との差分の有無。入力は `--base`（必須）・`--worktree`・`--branch`（引数）。**封筒を使わない**。出力の最後の 1 行は `RECOVER_PREP_RESULT {…}`。判断（continue / discard）と回復ブリーフはエージェントに残る |
| `scripts/fetch-tree.sh` | イシューツリーの取得（Issue #668。詳細は末尾の「ツリー取得」節）。入力は `--nonce`・`--root`（親イシュー番号）・`--repo`（任意）。`gh api` の GET だけで、`sub_issues` のページ送り・closed ノードの貫通・siblingIndex の付与・件数と番号重複の自己点検を行う。出力は 1 ノード 1 行の TSV（number / parent / siblingIndex / state / subIssuesTotal / title / optinTests）と、最後の 1 行の封筒（payload は `count`・`inputSha256`・`nodesSha256`・`optinSha256`・`pages`・`repo`・`structSha256`・`taskIdSha256`）。1 ページ（20000 バイト）に収まらないときは専用の一時ディレクトリへ全行を書き、封筒だけを出す（`dir`・`tsvSha256` が加わる。`--page` / `--release`。Issue #673・#690）。`repo` は `--repo` があればその値、無ければルートの `repository_url` の末尾 2 成分で、形が違えば exit 5（ホストは args.repo が無いとき、形式を検査してから `repo-scan.sh` の `--repo` に使う。Issue #808）。**封筒を使う**。取得失敗・件数不一致・出力過大は封筒を出さず非 0 で終わる |
| `scripts/lib/fetch-tree-lib.sh` | `fetch-tree.sh` の判定とダイジェストの関数（`ft_*`。title の表示形・行ダイジェスト・`nodesSha256`・`structSha256`・`taskIdSha256`・`optinSha256`・第 7 欄 optinTests の抽出・正規化の jq 定義 `FT_JQ_OPTIN`・入力の束縛。ホストの `treeNodesDigest` / `treeOptinDigest` と同じ定義を共有する） |
| `scripts/declared-deps.sh` | イシュー本文の依存宣言の機械抽出（`plan:declared-deps-N`）。入力は `--numbers N,N,…`・`--repo`（任意。空文字は使い方の誤り）・`--table`（兄弟のタスク ID の表。任意）・`--input-sha256`（必須。入力の束縛）。`gh api repos/<repo>/issues/<N> --jq <フィルタ>` の GET だけで、成功したイシューごとに 1 行 `{"number","deps","sig"}` を標準出力へ、失敗したイシューは `FAILED #N` を標準エラーへ出す。`--rate-limit` は core 枠の確認、`--print-filter` はフィルタ文字列の確認（gh を呼ばない）。**出力は封筒を使わない**: ホストはエージェントが転記した `entries` を `sig` と `collectDeclaredDeps` の検査で照合する。`sig` は `number` と `deps` だけから計算されるので、`--table`・`--repo`・番号の転記漏れは `sig` では見つからない。そこでホストが `sha256("declared-deps\n" + numbers + "\n" + repo + "\n" + table)`（`lib/declared-deps-lib.sh` の `dd_input_sha` と同じ定義。repo・table は付けないとき空文字）を `--input-sha256` に付け、スクリプトは引数から計算し直して、不一致・欠落は gh を呼ぶ前に `INPUT_MISMATCH` を標準エラーへ出して exit 2 にする（期待値は出さない）。プロンプトは exit 2 を転記ミスとして entries を空で返させ、ホストが欠落として再試行する。`--table` は 120000 文字（`DD_TABLE_MAX` = ホストの `DECLARED_DEPS_TABLE_MAX`）を超えるとホストが起動せず、欠落 → 再試行 → 停止の経路に流す。スクリプトにした目的は、3.9〜4.9 KB の jq コマンドの転記でバックスラッシュが半減する事故（`\\b` → `\b` は jq でエラーにならず単語境界が黙って効かなくなる）を、フィルタをハッシュで固定して防ぐこと |
| `scripts/lib/declared-deps-lib.sh` | `declared-deps.sh` の jq フィルタ本体（引用符つきヒアドキュメントで置くのでエスケープは jq の 1 段だけ。切り出し前の実行時の文字列との文字単位の一致を `dev/implement-issue-tree/tests/declared-deps-script.test.mjs` が固定する）・rate_limit の jq・番号 / リポジトリ / 表の検証の関数（`dd_*`。source 専用） |
| `scripts/repo-scan.sh` | Tree フェーズの読み取り専用の観測 2 つ（計画 C の P4。取得と検査の契約は「外部チェック観測と対象外ラベルの取得」節）。`--mode external-checks`（`detect:external-checks`）: 直近 3 件の merged PR の head の check-runs から GitHub Actions 以外の App の slug を集める。`--mode skip-labels`（`plan:skip-labels`）: ラベルごとにリポジトリ全体の open issue 番号を列挙し、`--numbers`（ツリーの open ノードの番号。昇順・重複なしのカンマ区切り・100,000 バイト以内。Issue #807）との交わりだけを返し、ラベル一覧との照合で存在しないラベルを出す。入力は `--nonce`・`--repo`（必須。省略・空文字は exit 2。Issue #808）・skip-labels のラベル（`--` の後ろ。1〜10 件）。gh は `gh pr list` と `gh api` の GET だけで、`-f` を使わずラベルはクエリ文字列へパーセントエンコードして渡す。**封筒を使う**: external-checks の payload は `apps`（`[a-z0-9-]` 64 文字以内・昇順・重複なし。重複を除いた apps が封筒の上限を超えれば exit 7。ホストが 100 件以内を検査する）・`prs`・`errs`（gh の失敗の件数。個々の失敗は無視して部分結果を返す）・`dropped`（形式不正で捨てた件数）・`inputSha256`。skip-labels の payload は `entries`（`{i, numbers}`）・`absent`・`failed`・`inputSha256`。`inputSha256` = `sha256("repo-scan\n" + mode + "\n" + repo + 残りの欄を "\n" で連結)`（skip-labels の残りの欄は `--numbers` を先頭の固定位置に、続けて各ラベル。ホストの `repoScanInputSha256` と `lib/repo-scan-lib.sh` の `rs_input_sha` が同じ定義）。ホストが自分の repo・ノード番号の集合・ラベルの並びから計算し直して照合するので、転記でラベルが欠けた・入れ替わった出力は別のラベルの結果として採られない。外部由来の文字列は、形式を検査した slug 以外は出力に出さない（標準エラーは `FAILED <添字>` だけ）。**照合に失敗したときの向き**: external-checks は apps: []（観測は参考値。マージ・push の可否に使わない）、skip-labels は取得できなかったラベルとして再試行 → なお取れなければ open ノードを全て待たせる（fail-closed）。スクリプトにした目的は、プロンプトに埋め込んだ gh + jq のコマンドの転記事故（バックスラッシュの半減・`\n` が `n` になる・引用符の欠落）で結果が黙って変わる経路をなくすこと |
| `scripts/lib/repo-scan-lib.sh` | `repo-scan.sh` の gh `--jq` の定義（バックスラッシュを含まない）・slug / sha / 番号 / ラベルの形式検査・番号の整列・slug の収集（昇順・重複なし）・入力の束縛・payload の正規形の組み立て（`rs_*`。source 専用） |
| `scripts/lib/signed-output.sh` | 封筒の組み立て（`so_emit`）。sha256 の入力の定義はここと `verifySignedOutput` が共有する |
| `scripts/lib/optin-record-lib.sh` | `observe-pr.sh --mode optin-record` の判定（`optin_cmd_valid` = 宣言コマンドの許可形・`optin_record_normalize` = 本文の CR と行頭行末の空白の除去・`optin_record_counts` = 現在の HEAD の sha に対する pass と pass 以外〔fail + not-run〕のマーカー行数を固定文字列で数える。pass は行全体の一致・pass 以外は行内の部分一致。純関数・source 専用。Issue #603） |
| `scripts/lib/policy-paths-lib.sh` | `observe-pr.sh --mode policy-paths` の判定（`policy_paths_count`。方針パス = `.github/workflows/`・`.github/actions/`・CODEOWNERS 3 箇所の件数と、`--allow` に無い件数。リネームは新旧を数える。純関数・source 専用。Issue #760） |
| `scripts/lib/added-files-lib.sh` | `observe-pr.sh --mode added-files` の判定（`added_files_numbered_dirs` / `added_files_classify`。新規追加ファイルの同じパス・同じディレクトリの同じ連番の衝突を数える純関数。Issue #658） |
| `scripts/lib/observe-checks-lib.sh` | `observe-pr.sh --mode checks --until settled` の分類（`checks_classify`。check-run と commit status を合格 / 未完了 / 不合格の件数にする純関数。第 8 弾） |
| `scripts/lib/push-verify.sh` | push の前後でリモート head を突き合わせる共通部（`pv_push_verified`。第 3 弾）。`base-merge.sh` が使い、以降 pr-create の push と fix の push 検証も同じ部品へ移す |
| `scripts/lib/base-merge-lib.sh` | `base-merge.sh` の入力検証と remote URL の照合の純関数（`is_uint` / `valid_repo` / `url_allowed` / `routing_check_remotes` と許可ホストの定数）。第 3 弾の `base-merge.sh` 本体からロジックを変えずに PR #616 で切り出したもの。`pr-push.sh`・`merge-gate.sh`・`observe-pr.sh` も source する |
| `scripts/lib/pr-push-lib.sh` | `pr-push.sh` の判定だけの純関数（`pp_*`。起点の決定・既存 PR の分類・PR 番号の取り出し・形式検証。第 4 弾） |
| `scripts/lib/state-verify-lib.sh` | `state.sh verify` の本体（`sv_run`。項目ごとの `jq -jcS` の sha256・キーのダイジェスト・件数・高水位を封筒で出す読み取り専用の関数。書き込み側の `state-lib.sh` の関数を使わない。計画 C の P5） |
| `scripts/lib/state-lib.sh` | `state.sh` の入力検証と状態ファイルの書き換え（`st_valid_*`・`st_rewrite` と固定の jq プログラム。書き込み直前の変更検知つきで一時ファイルから `mv` する。第 5 弾） |
| `scripts/lib/merge-gate-lib.sh` | `merge-gate.sh` の判定だけの純関数（`mg_*`。取得済みの JSON を判定語・件数へ畳む。想定外の形は非ゼロ return で返し、呼び出し側が fail-closed に倒す。第 6 弾） |
| `scripts/lib/worktree-remove-lib.sh` | `worktree-remove.sh` の判断と入力検証の純関数（`wr_*`。削除・強制削除・保持の判断、lock の扱い、status の読み取り。`recover-prep.sh` も source する。第 7 弾） |
| `scripts/lib/recover-prep-lib.sh` | `recover-prep.sh` の判断だけの純関数（`rp_*`。対象ブランチの解決・WIP コミットの要否と結果の分類・base との差分の三値判定。第 9 弾） |
| 生成物 `implement-issue-tree.js` の `SCRIPT_SHA256` | ビルダーが埋め込む期待ハッシュ。開発ファイルには置換前の目印を書き、`build-workflow.mjs` が置換する |
| `verifySignedOutput`（ホスト） | 転記された封筒を再計算して照合する |

実行の流れ: ホストが nonce を決めてコマンドを組み立てる → サブエージェントが 1 回の Bash 呼び出しで実行する → launcher が期待ハッシュと照合して起動する → スクリプトが `{nonce, payload, sha256}` を 1 行で出す → エージェントがそれを StructuredOutput へ転記する → ホストが nonce と sha256 を再計算して照合し、通ったときだけ payload を使う。

封筒の `sha256` は `SHA-256(nonce + "\n" + payload の正規形)`。正規形はキー昇順・空白なしの JSON で、payload は整数と ASCII の固定文字列だけにする（`jq` の数値表記やエスケープの差に依存しないため、スクリプトは `printf` で直接組み立てる）。

payload には**入力の束縛** `inputSha256` を入れる。残置バイトは標準入力のパス列（末尾の改行 1 つを除く）、空き容量は対象パスの SHA-256 で、ホストは自分が送った値（`sha256Hex(パス列)`）から再計算して `verifySignedOutput` の第 3 引数で照合する。nonce は「どの呼び出しの出力か」を、`inputSha256` は「ホストが送った入力を測った出力か」を結び付ける。nonce は `boundaryNonce` に**呼び出し連番**を含めて作り、同じ対象を何度測っても呼び出し・再試行ごとに異なる（連番を含めないと同じパスの測定は同じ nonce になり、前回の封筒を流用しても受理される。PR #611 codex P1）。

## 機械的な段の実行仕様（`<!-- iit-exec v1 ... -->`・Phase P6）

モデルの判断が要らず、スクリプトを 1 回実行して結果を返すだけの段は、プロンプトの **0 行目**に機械可読の 1 行を持つ。モデルを介さずに直接実行するランナー（Codex / OpenCode 版）はこの 0 行目だけを読む（本文の他の場所・文言からの抜き出しはしない）。Workflow 版のモデルにとっては何もさせない HTML コメントで、手順は従来どおり本文のコマンドを実行する（挙動は変わらない）。

```
<!-- iit-exec v1 {"v":1,"script":"state.sh","sha256":"<64 桁>","argv":["--file","_/issue-trees/1.json","verify","--page","0"],"ret":"envelope","fail":null} -->
```

| キー | 意味 |
|------|------|
| `script` | `scripts/` 直下の固定名。許可リストは `SCRIPT_SHA256` の表と、`--verify-only` だけの `run-verified.sh` |
| `sha256` | `SCRIPT_SHA256[script]`（`--verify-only` の行は無し）。ランナーは `bash <skillDir>/scripts/run-verified.sh <sha256> <script> ...argv` を shell を介さず `execFile` で起動する（ハッシュ照合は launcher が毎回行う。飛ばさない） |
| `argv` | `<script>` の後ろの引数の配列。`--nonce` も含む。本文のコマンドの引数を `shellWords` で分解したもの（単一引用符と `'\''` だけを読み、展開・連結・リダイレクトは例外） |
| `stdinHex` | 標準入力の UTF-8 を 16 進にした文字列（ヒアドキュメントの段だけ。本文のヒアドキュメントの内容 + 末尾の改行と同じ）。未信頼の自由文を 0 行目へ生で出さないため 16 進にする |
| `ret` | 結果の返し方。`envelope` = 標準出力の最終行の JSON をそのまま返す（ホストが封筒を照合する）/ `exit-ok` = 終了コード 0 なら `{ ok: true }`・他は `{ ok: false }` / `line:<語>` = `<語>` に続く最終行の JSON を返す（`STATE_RESULT`・`WORKTREE_REMOVE_RESULT`） |
| `fail` | 失敗時（スクリプトの非 0 終了・結果の行なし・封筒なし）にランナーが返す値。本文のプロンプトが指示している失敗値と同じで、`ret` ごとに決まる（下の表）。`envelope` は JSON の `null` |

- **対象の段（label）**: `state:*` の書き込み（`state:update`・`state:high-water`・`state:high-water-set`・`state:init-all`・一括更新）・`state:load-verify`・`script-hash-precheck`・`plan:issue-tree-release`・`free:#N`・`worktree:absent`・`worktree:sweep`・`worktree:residual-bytes`・`worktree:free-disk-bytes`・`detect:external-checks`・`plan:skip-labels`・`merge:added-files` / `merge:policy-paths` / `merge:optin-record`・closed の後始末と使い捨て worktree の掃除（`state:cleanup:#N` のうち状態の書き戻し〔手順 2〕が付かない形だけ）。
- **対象外**: 判断を含む段（ツリー取得 `plan:issue-tree`〔本文を読んで dependsOn を判断する〕・依存宣言の抽出〔レート制限の判断がある〕・Plan / Implement / Review / fix / PR 作成 / monitor / merge-exec / 回復 / base-merge〔隔離 worktree と pwd を使う〕・`git worktree list` などの生コマンドの段）と、2 つのスクリプトを続けて実行する形の掃除。これらの 0 行目には仕様が付かない。
- **偽の行が混ざらない理由**: 仕様は src が組んだ文字列の先頭にだけ置く（位置固定）。値はホストが検証済みの引数から作り（`worktreeQuote`・`isValidBranchName` 等を通ったもの）、JSON は `<` `>` `&` U+2028 U+2029 を `\u` エスケープして 1 行にする。issue 本文・タイトル・note などの未信頼データは本文側にしか入らず、対象外の段の 0 行目は src の固定文字列で始まる（`exec-spec.test.mjs` が敵対的な値で縛る）。組めない値（許可外の文字・lone surrogate）は例外にせず仕様なしにし、ランナーはその段をモデルへ回す。
- **直接実行しても信頼境界は変わらない**: 封筒の照合（nonce・sha256・入力の束縛）はホストが従来どおり行う。ランナーは標準出力の文字列を解釈せずそのまま返し、照合を省かない。

失敗時の返り値（`fail`）。src の `execSpecLine` が仕様へ入れ、本文の失敗値との一致を `exec-spec.test.mjs` が縛る。

| 段（label） | `ret` | `fail` |
|------|------|------|
| `state:*` の書き込み | `line:STATE_RESULT` | `{"ok":false}` |
| `state:load-verify` / `script-hash-precheck` / `worktree:residual-bytes` / `worktree:free-disk-bytes` / `detect:external-checks` / `plan:skip-labels` / `merge:*` | `envelope` | `null` |
| `plan:issue-tree-release` / `free:#N` | `exit-ok` | `{"ok":false}` |
| `worktree:absent` / 後始末の `remove` | `line:WORKTREE_REMOVE_RESULT` | `{"ok":false,"retained":true,"worktree":""}` |
| `worktree:sweep` | `line:WORKTREE_REMOVE_RESULT` | `{"removed":[]}` |

ランナー（Codex / OpenCode 版。実装は別 PR）の契約:

- **失敗は stdout を見ずに `fail` を返す。** スクリプトが非 0 で終了したら、標準出力に結果らしい行があっても読まず、仕様の `fail` をそのまま返す。結果の行（`ret` が `line:<語>`）や封筒（`envelope`）が標準出力に無いときも同じ。
- **cwd はメイン worktree のルート。** 本文のコマンドと同じ場所で起動する（隔離 worktree やスキルディレクトリで起動しない）。`execFile` の `cwd` に明示する。
- **label ごとの許可を持ち、合わなければ拒否する。** ランナーは label ごとに許可する `script`・`mode`（argv の `--mode` / 先頭語）・`ret` を持ち、仕様がそれと合わなければ実行せずその段をモデルへ回す。`script` は許可リストと完全一致（パス区切り・`..`・大文字小文字違いを許さない）で、`sha256` は launcher が照合する。
- **多層防御（src 側）**: `agent()` を呼ぶ共通の入口（`guardExecSpecPrompt`）が、`<!-- iit-exec` で始まるのに `execSpecLine` が作った行でないプロンプトの先頭へ改行を足し、偽の仕様行が 0 行目にならないようにする（例外では止めない）。上のランナー側の許可と合わせて、仕様の位置固定だけに頼らない。

## 何を防ぐか

| 事象 | 検出の仕組み |
|------|-------------|
| エージェントの**転記ミス**（数値の取り違え・桁落ち・項目の脱落） | ホストの sha256 再計算が一致しない → 破棄して有界に再測定（既存の「転記失敗は別エージェントで再測定」と同じ扱い） |
| **別の呼び出しの出力の流用**（前回の結果の使い回し） | nonce は呼び出しごとにホストが決める。流用した封筒は nonce が一致しない |
| **測定を実行せず値を推測で作った**（sha256 を合わせずに返した） | 値を作っても sha256 が一致しない（計算するには nonce と payload の正規形を使った SHA-256 が要る。うっかり省いた・推測で埋めた場合を検出する。意図して計算する者は下の「防がない」） |
| **送った入力と違うものを測った**（コマンド中のパスを 1 文字打ち間違えた・一部を省いた） | payload の `inputSha256` がホストの送った入力の SHA-256 と一致しない。件数が同じでも拒否される（`count` 照合だけでは過小な値が通った穴） |
| **Workflow とスクリプトの版ずれ**（同期が片方だけ届いた・古いコピーが残った） | launcher が期待ハッシュと不一致で起動しない（exit 3）。出力が無いので上と同じ測定失敗になる |
| スクリプトの**書き換え**（スキルディレクトリ内） | 同上。スクリプト本体と `scripts/lib/*.sh` のバイト列を対象にするので lib の書き換えも検出する |
| **入力のシェル再評価**（パスに `$(…)`・`;`・バッククォート） | スクリプトは `eval` を使わず、変数をすべてクォートし、許可文字集合（英数字・`/`・`-`・`_`・`.`・半角スペース）外のパスは `du` に渡さず `err` に数える |
| **実行場所の取り違え**（相対パスが worktree 内のコピーに解決される） | ホストが組み立てるコマンドの実行場所は `args.skillDir`（絶対パス）で決まり、相対パスの `skillDir` は受理しない。launcher は自分と同じディレクトリから名前だけでスクリプトを解決し、パス区切りと `..` を含む名前を拒否する。これは**ホストが正しいコマンドを渡す**ことと、**エージェントがそれをそのまま実行する**ことを前提にした設計上の取り決めであり、エージェントが別の場所の launcher を実行する行為そのものは止めない（下の「防がない」） |

## 観測スクリプトの既知の限界（第 2 弾）

- **壁時計の打ち切りは `pending`（または `exhausted`）で返る。** 残り時間で縮めた制限に掛かって gh を kill した場合は取得失敗（`err:1`）にせず、この起動では結論が出なかったものとして返す（件数は 0・`headSha` は空で、`met` ではない）。**ホストはこの封筒を「チェック 0 件」と採用しない**（`headSha` が 40 桁 16 進でない封筒は `applyChecksObservation` が `inconclusive` として不採用にする。実測した 0 件の `exhausted` は `headSha` を持つので従来どおり採用する）。ただし、その起動の中で取得失敗（HTTP エラー等）があり一度も取得に成功しないまま壁時計に達した場合は、「待ち切った」と読める封筒を出さず `err:1`・`error` にする。gh 自身の制限（25 秒）超過・非 0 終了・HTTP エラー・出力サイズ超過は `err:1`。したがって**成功の根拠は件数ではなく `outcome` が `met`（または待機なしの `observed` で `err:0`）であること**で、プロンプトもそう書く。
- **gh が遅すぎる環境:** 1 回の gh が約 23 秒を超えると、gh を 4 回呼ぶ `required` は壁時計 90 秒内に観測を終えられず、取得失敗か `pending` を返し続ける。時間制限を延ばして解決する種類の問題ではない（Bash ツールの既定 120 秒が上限）。
- **本体が SIGKILL された場合:** TERM・INT・HUP なら後始末するが、SIGKILL では走らせていた gh とウォッチャーが最大 25 秒残り、一時ファイルが 1 個残る（TMPDIR 配下）。
- **gh の出力サイズ:** 1 回 16 MiB（`OBSERVE_PR_MAX_OUT_BYTES`）を超えたら取得失敗にして、出力し続ける gh が一時ファイルを際限なく育てないようにした。
- **nonce の再現:** `boundaryNonce` は seed と keyMaterial から決定的に決まる。同じ seed のラン同士、および連番がリセットされる再開では、同じ nonce を再現し得る。別ランの封筒の流用を nonce だけでは完全には防げない。封筒の用途がチェック総数の採用（timeout → conflicting の再判定）に限られ、マージ経路に入らないことで許容している。
- **pid 単独の kill:** macOS の bash が setpgid に失敗してプロセスグループを作れなかったときは、ウォッチャーが gh の pid だけを kill する。その場合、gh の孫プロセスは残り得る。
- **標準エラーのノイズ:** macOS の bash が稀に `child setpgid … Operation not permitted` を出す（200 回に 1 回ほど）。判定は標準出力の 1 行だけで行い、スクリプトは起動ブロックの標準エラーを捨てる。

## 何を防がないか

- **エージェントが待機コマンドを繰り返す回数**は止められない。`--attempt` の上限（範囲外は exit 2）を強制できるのは、エージェントが正しく 1 から 7 へ進めたときだけで、`--attempt 1` を何度も実行されればホストは見ない（ホストが見るのは転記された封筒だけ）。1 回ごとは壁時計で有界なので、影響は監視の所要時間の延びに限られ、マージ・push・削除の判定には届かない。
- **悪意のあるエージェント**は防げない。nonce と `inputSha256` の元になる入力はホストがプロンプトに書くので、エージェントは両方を知っている。`sha256sum` を自分で回せば、捏造した payload にも正しい sha256 と `inputSha256` を付けられる。nonce・sha256・`inputSha256` の照合は、**事故（転記ミス・使い回し・入力の打ち間違い・うっかりの未実行）の検出**であって、敵対的な改竄への認証ではない。
- **コマンドを組み直して別の launcher・別のスクリプトを実行すること**は止められない。ホストが検証するのは封筒の中身だけで、どのファイルを実行したかは見えない。エージェントが `bash` で別の場所の `run-verified.sh` や自作のスクリプトを起動し、同じ形式の封筒を出力して転記すれば、ホストはそれを区別できない（launcher のハッシュ照合は、正しい launcher を経由したときの版ずれ・書き換えを止めるだけである）。「スクリプトを実行せず自己流で進めた」ことの検出は、値を推測で作って sha256 を合わせなかった場合に限る。
- **StructuredOutput 経由の値は、転記の時点で自己申告になる。** スクリプトの出力そのものはホストから見えず、ホストが見るのはエージェントが返した封筒だけである。ホストは「この封筒は、この nonce に対してこの payload から計算できる sha256 を持つ」ことまでしか確かめられない。`args.repo` の先例（PR #443）と同じく、エージェントの自己申告値を**マージ・push・削除の判定には使わない**。
- **スキルディレクトリへ書き込める者**は防げない。launcher 自身は照合の対象外で、期待ハッシュを持つ生成物も同じスキルディレクトリ（またはその同期元）にある。信頼の根はスキルディレクトリであり、そこを書き換えられる者は launcher とハッシュを一緒に書き換えられる。これは `merge-guard-hook.sh` が同じディレクトリにあることと同じ前提で、本書の対象外。
- **照合から起動までの間の差し替え（TOCTOU）** は防がない。launcher はハッシュを計算してから `exec` するまでにファイルを読み直す。メイン作業ディレクトリは他のエージェントが書き込む前提の場所ではなく（実装系のエージェントは隔離 worktree で作業する）、この競合を悪用するにはスキルディレクトリへの書き込みが要るため、上の項目に含まれる。
- **`du` / `df` 自体が返す値の正しさ**は測れない（ファイルシステム上の実値を信じる）。`du` の実失敗は `err` に数え、0 に畳み込まずに測定失敗として扱う。
- **sha256sum / shasum が無い環境**では検証できない。launcher は exit 4 で起動せず、スクリプトも exit 3 で封筒を出さない。検証できないまま通すことはしない。

## 観測スクリプト（第 2 弾）が何に使われ、何に使われないか

`observe-pr.sh` の封筒は monitor エージェントの**助言的判定の材料**であり、マージ・クローズ・push・削除・イシューへの書き込みの可否には使われない（monitor の出力はマージ経路の入力にならない、という既存の性質を変えない。マージ可否は merge-exec が checks・HEAD sha・未解決スレッド数を自分で再取得して判定し、G0 がサーバー側強制を実測する）。

| 観測 | 使い道 | ホストが封筒を照合して採用するか |
|------|--------|--------------------------------|
| `checks`（チェック総数 = check-run + commit status） | monitor が 3e・3 の観測状態表で使う。ホストは `state: timeout` かつ `checksTotal === 0` を conflicting（base 取り込み）へ再判定する | **する**。monitor が `checksObservation` に転記した封筒を `applyChecksObservation` が nonce・sha256・`inputSha256`・`mode`・`err` で照合し、通ったときだけ total を `checksTotal` に採用する。欠落・不正・取得失敗は `checksTotal` を省略する（従来の「取得失敗は省略」と同じ。timeout は 0 件再判定を受けず次ラウンドへ回る） |
| `pr`（state・mergeable・headSha・bound。取得失敗は err:1 かつ bound:-1 = 不明で、想定外の PR = 0 と区別する） | monitor の MERGED / CLOSED / CONFLICTING の分岐と PR 照合（bound = 想定ブランチ・base・fork でない・closing issue） | しない（monitor が読むだけ。ホストの PR 照合 `prBindingProblem` は別経路で独立に行う） |
| `required`（required context の不足件数） | autoMerge ラン専用の 3g。`ready` を返す前の助言的確認 | しない（発行元束縛は merge-exec (v-b) が独立に検証する。名前の存在確認は助言） |
| `reviews`（外部 App のレビュー・check-run 件数） | cursor のレビュー到着待ち・外部 App の起動確認 | しない（merge-exec が `external-review-missing` を独立に判定する） |
| `threads` / `threads-detail`（未解決スレッド） | unresolved-comments の判定と fix への指摘の受け渡し | しない（merge-exec が未解決スレッド数を自分で再取得する） |

**payload は整数と ASCII の固定語彙・40 桁 16 進だけ**で、PR のコメント本文・チェック名・context 名・ログイン名のような外部由来の文字列を含めない。そのため canonical JSON の定義の差（キー順・エスケープ・非 ASCII）が問題にならず、スクリプト（`jq -cS`）とホスト（`canonicalJson`）の出力が一致することを `dev/implement-issue-tree/tests/observe-pr-host.test.mjs` が実走で固定する。`threads-detail` の自由文は非信頼データとして監視エージェントが読むだけで、プロンプトに戻す値（封筒）には入らない。

**nonce は監視呼び出しごと・再試行ごとに別**にする（`monitorObserveSeq` の連番と試行番号を `boundaryNonce` の keyMaterial に含める）。1 回の呼び出しの中でエージェントが同じコマンドを再実行する待機（`pending` の繰り返し）は同じ nonce を使うが、それは同一呼び出しの再観測であって、別ラウンド・別試行の出力の流用ではない。流用した封筒は nonce の不一致で採用されない。

**待機の回数の上限はスクリプトが `--attempt` で強制する**（範囲外は exit 2）。1 回の起動は、gh が遅い・ハングする場合を含めて壁時計 90 秒（`OBSERVE_PR_WALL_SEC`）+ 後始末の数秒以内に必ず返る（gh 1 回ごとに 25 秒の時間制限を付けてグループごと kill し、残り時間が 1 観測分に満たなければ次の観測を始めない。Bash ツールの既定タイムアウト 120 秒に収まる）。エージェントは `pending` のたびに `--attempt` を 1 増やして同じコマンドを再実行する（最大 7 回 = およそ 10 分。現行の「最大 10 分」と同等）。ホストが 1 回ごとにエージェントを呼び直す設計にしなかった理由は `agent-call-budget.md` の「監視の待機」。エージェントが `--attempt` を進めずに（`--attempt 1` を打ち続けて）繰り返すことは止められない。スクリプトが保証するのは 1 回の起動の有界性と `--attempt` の範囲検査までで、foreground の長い sleep（ハーネスが拒否する）にはならないが、繰り返しの総数の上限はエージェントの遵守と監視枠に委ねる（次節「防がないこと」）。

## 測定値の使い方（なぜこの弾の自己申告で足りるか）

残置バイト・空き容量の測定値は、**新規着手を止めるか（ディスク枯渇の防止）**、および**次回ラン開始時の 1 worktree あたり予約見積りの下限（クランプ済みの高水位）**にだけ使う。マージ可否・push・worktree の削除・PR/issue への書き込みの判定には使わない。偽の小さい値は着手を許す側に働き得るが、それが損なうのはローカルのディスク容量の保護で、リポジトリの内容・マージ・認証には影響しない。逆に偽の大きい値は着手を止める側（安全側）に働く。したがって、この弾の信頼水準は「事故を検出できる」で足りる。**悪意のあるエージェントがディスク枯渇防止の弁を迂回できる**ことは受け入れた制約である（件数軸の元になる `git worktree list` の転記も同じ自己申告である）。

安全判定を含むスクリプト（G0・マージ実行・opt-in ゲート・worktree の破棄の確認・base 取り込み）を切り出す弾では、この水準では足りない。出力の用途がマージ可否に及ぶ場合は、(a) ホスト側の独立な再取得、(b) サーバー側強制（ruleset の実測）、(c) 自己申告値を判定に使わない設計、のいずれかで補うこと。nonce と sha256 の照合は補強にならない（封筒の sha256 に鍵は無く、nonce もプロンプトに載っているため、照合で検出できるのは転記の誤り・別の入力・別の呼び出しの流用までで、観測エージェント自身の捏造は検出できない）。

**例外: `optin-record`（次々節）**。この観測の封筒は opt-in テスト記録ゲートの合否の材料になる。封筒の水準に、(a) の代わりとして**独立な 2 回の観測の一致**を重ねて使う（Issue #804）。合格の観測は、別のエージェント（`optin-record-reverify:#N`。1 回目と違うモデルから始める）・別の nonce で取り直した 2 回目と、`headSha` と全コマンドの件数が完全に一致したときだけ採る。2 回目の観測失敗・不一致は全件不合格（`blocked`）で、merge-exec を起動しない。
- **得られる保証**: 単独のエージェントの捏造・誤り（転記を含む）を、独立な観測との不一致で検出する。鍵が無いので、どの観測も単独では捏造を止められない。2 回とも同じ値を捏造した場合は検出しない（相関した誤り・共謀）。観測エージェントのコンテキストには本文が載らない（本文はスクリプトの中だけで読み、封筒は整数と 40 桁 16 進だけ）ので、本文経由の注入で 2 回の観測をそろえて操作する経路は無い。
- **独立なのはエージェントのコンテキストと nonce だけ**。2 回とも同じスクリプト・同じ `gh` 認証・同じ GitHub の状態を読む。スクリプト自体の誤り、観測とマージの間の本文の編集、merge-exec 自身の判断は、この照合の対象外である。ホストが自分で取り直す再取得ではない（ホストは観測をエージェント経由でしか行えない）。
- **契約との関係**: merge-exec の「本文を読まない」契約が守っているのは、エージェントのコンテキストに本文を入れないこと（`MERGE_CONTEXT_COMMON` の「enum・件数・sha のみ読む独立コンテキスト」・`automerge-design.md` の「未信頼テキストを読まないため、注入経路は存在せず」）であり、スクリプトが本文に触れること自体ではない（`merge-gate.sh` はチェック名をスクリプトの中で読む）。merge-gate 側での数え直しも契約には反しないが採らなかった: 数え直しが不合格のときにマージを止めるのは merge-exec（エージェント）が verdict に従うことだけになり、ホストは封筒の照合（マージの後。第 6 弾の節）で事後に検出するだけになる。`automerge-design.md` は「`mergeExecutePrompt` / `MERGE_EXEC_SCHEMA` / `classifyMergeExecDispatch` はこのゲートのために変更しない」と定めている。採った方式は、ホストが merge-exec の起動前に止められる。
- 偽の pass が両方の観測を通った場合も、post-push fix の実測との AND・merge-exec の再検証・サーバー側の強制の内側に収まる（下記「防がないもの」）。

## 新規追加ファイルの衝突ゲート（`observe-pr.sh --mode added-files`。Issue #658）

同じランの兄弟 PR が連番付きのファイル・置き場ファイルを互いを見ずに新規追加する衝突を、monitor の `ready` の後・マージ実行（自動マージ・人手マージ待ちのどちらでも）の前に検出する。ホストが専用の転記エージェント（`merge:added-files:#N`。monitor とは別のコンテキスト）に固定のコマンドを実行させ、封筒の nonce・入力のハッシュ（`inputSha256` は他のモードの 9 行に `--peers` の並びの行を足したもの）・sha256 を照合し、件数と PR 番号から決定的に分類する（`classifyAddedFiles`）。

- **判定は止める方向にしか効かない**: 結果の行き先は fix（改番）か `blocked` で、マージ・push・クローズ・削除を許す方向には使わない。転記エージェントが偽の「衝突 0 件」を返しても、結果はゲートの無い従来の挙動に戻るだけである。逆に偽の衝突は改番の fix（予算 6 回の内で上限 2 回）か `blocked`（halt 非カウント）で有界に止まる。そのため照合・取得の失敗はゲートを飛ばして続行する（fail-closed にしない。誤検知や一過性の失敗でラン全体を止めないため）
- **payload にパスの文字列を入れない**: 件数（`added` / `numbered` / `samePath` / `seqPeer` / `seqBase` / `truncated`）・state の語彙・依頼した peers の部分集合の PR 番号だけ。fix へ渡す合成 finding もホストの整数と固定文だけで作り、改番の対象は fix が自分で `git diff` と `gh pr view <番号> --json files` から確かめる
- **パスはクエリに埋め込まない**: PR 番号（検証済みの正の整数）だけを GraphQL のエイリアスに使い、base の木を引く式（`<base>:<dir>`）は GraphQL 変数（`-f`）で渡す
- **範囲を限る**: 比べる PR は同じランのものだけ（30 本まで）・新規追加（`ADDED`）だけ・同じディレクトリの中だけ。ファイルが 100 件を超える PR は先頭 100 件だけで比べ（見逃す側に倒れる）、連番ファイルのディレクトリが 20 を超える PR は取得失敗として扱う

## opt-in テスト記録ゲートの観測（`observe-pr.sh --mode optin-record`。Issue #495 / #603）

新規マージ経路で、宣言（`args.optinTestCommands` と一致した `item.optinTests`）がある PR のマージ前に、PR 本文の記録節のマーカー行が現在の HEAD に対して揃っているかを数える。判定（宣言コマンドごとに pass が 1 件以上・pass 以外が 0 件）はホストの `classifyOptinRecordGate` で、`combineOptinRecordGate`（post-push fix の実測との AND）・merge-exec への期待 HEAD の受け渡しも従来のまま。このモードは件数を数えるだけ。

- **なぜスクリプトか**: かつては観測エージェントのプロンプトに `gh pr view`・本文の正規化（`tr` / `sed`）・コマンドごとの固定文字列 `grep -cxF` の 1 KB 超のコマンド列を埋め込み、エージェントに書き写して実行させていた。書き写しの誤り（バックスラッシュの半減・`\n` の `n` 化など）が結果を黙って変え得た。手順を `scripts/lib/optin-record-lib.sh` へ移し、プロンプトは `run-verified.sh`（SHA-256 照合つき）経由の固定コマンドの実行と封筒の転記だけにした
- **入力の束縛**: 宣言コマンドは `--optin-cmd '<コマンド>'`（宣言の順に繰り返す）で渡る。`inputSha256` の入力は他のモードと同じ 9 行（モード・PR・repo ほか）に、コマンドの個数と各コマンド（渡した順）を 1 行ずつ足したもの。書き写しでコマンドが欠けた・順序が変わった・別の PR を観測した封筒は、ホスト（`observeInputText`・`classifyOptinRecordObservation`）が引数から再計算した入力と合わず拒否される
- **payload**: `headSha`（40 桁 16 進）と `pass` / `nonPass`（宣言コマンドと同じ個数の整数の配列）。コマンド・本文の文字列を含めない。`nonPass` = `fail` + `not-run` のマーカー行数。HEAD の sha に一致しない行はどの件数にも入らない（古い HEAD・base 取り込み前・fix 前の記録は存在しないものとして扱う）
- **引数の検証**: `--optin-cmd` は 1〜10 個・重複不可・先頭が英数字で `[A-Za-z0-9 _./:=@+,-]` だけ・200 文字以内（ホストの `OPTIN_TEST_COMMAND_RE` と同じ）。改行や許可外の文字は `grep -F` のパターンを複数行に化かしシェル特殊文字を持ち込むため、gh を呼ぶ前に exit 2 で拒否する。コマンド行では単一引用符で囲む（許可文字に `'` が無いので引用の崩れは起きない）
- **取得失敗は 0 件にしない**: `gh pr view` の失敗・応答の形の違い・`headRefOid` が 40 桁 16 進でない・`body` が文字列でも null でもない・`grep` が 0 / 1 以外で終了、はすべて `err:1`（`headSha` は空・配列は空）。ホストは観測エージェントを sonnet で 1 回だけ取り直し、なお失敗なら全件不合格 = `blocked`（従来は 1 回の観測で、失敗は同じ全件不合格）。`body` が null は空の本文として 0 件（`err:0`）
- **現行の数え方**（判定そのもの = 宣言コマンドごとに pass が 1 件以上かつ pass 以外が 0 件、は変えていない）:
  1. コマンド列を書き写さないので、書き写しの誤りで結果が変わらない。`[[:space:]]` は `LC_ALL=C` で ASCII の空白だけを指し、シェルのロケールに依存しない。
  2. **pass 以外（fail + not-run）は正規化後の本文への部分一致（`grep -cF`。1 行につき 1 件）で数える**。マーカーの末尾 ` -->` と前の `<sha> fail ` が境界になるので、`make e2e` の検索は `make e2e-x -->` にも `xmake e2e` にも当たらない。`LC_ALL=C` で空白を削れない全角空白・NBSP・U+2028 が付いた fail / not-run 行も数える（行全体一致にすると fail-open になる）。行の途中に埋め込まれたマーカーも数える（止める側にだけ厳しくなる）。人が読む形の行（`- opt-in テスト結果: … => fail`）はマーカーの接頭辞を含まないので数えない。
  3. **pass は行全体の一致**。先頭に NBSP などの削られない空白が付いた pass 行は数えない（pass が減る = 厳しい側。人手の復旧編集でそうした空白が入ると pass 0 件で `blocked` になり、行頭の空白を ASCII にするか削れば解ける）。
  4. `outcome === 'observed'` を必須にする（`err` が 0 でも `outcome` が `error` / `pending` なら採らず skip）。本文はコマンド置換の変数で受けるので NUL と末尾の改行が落ちるが、マーカー行は 1 行の ASCII なので件数に影響しない。正規化のパイプ（`tr | sed`）と件数のパイプ（`printf | grep -c`）は各段の終了コードを見て、0 以外（`grep` は 0 と 1 だけが正常）があれば `err:1` にする（途中の失敗を 0 件へ畳まない）。
  5. 観測失敗の取り直しは 1 回（haiku → sonnet）。合格の観測には 2 回目の観測（`optin-record-reverify:#N`。sonnet → sonnet。Issue #804）が加わる。不合格・観測失敗のときは 2 回目を起動しない。予算の消費は `agent-call-budget.md`。
- **防がないもの**: 観測エージェント自身の捏造は、1 回の観測の照合では検出できない（封筒の sha256 に鍵は無く nonce もプロンプトにあるため）。Issue #804 から、合格は独立な 2 回目の観測との一致を要求するので、片方だけの捏造は不一致で `blocked` になる。2 回とも同じ値を捏造した場合だけが残る。それでも通った偽の「pass 1 件」を受け止めるのは、post-push fix の実測との AND（`combineOptinRecordGate`）・merge-exec の再検証・サーバー側の強制だが、`combineOptinRecordGate` が働くのは post-push fix の実測があるとき（fix を経た PR）だけである。fix をしていない PR では AND の相手がいないので、偽の pass はこのゲートでは受け止められず、merge-exec の再検証とサーバー側の強制（G0）に任せる。旧版の自己申告（照合なし）より下がらず、転記の誤りは検出できる、という水準である

## 方針パスのゲート（`observe-pr.sh --mode policy-paths`。Issue #760）

`fixCount > 0` の PR が `ready` になった後、added-files ゲートとマージ実行の前に、計画で宣言していない方針パス（CI 構成・CODEOWNERS）の変更を検出して `blocked` にする。専用の転記エージェント（`merge:policy-paths:#N`）が固定コマンドを実行し、ホストが封筒の nonce・入力のハッシュ（他のモードの 9 行に `--allow` の並びの行を足したもの）・sha256 を照合して `classifyPolicyPaths` で分類する。fix の summary や monitor の `changedFiles` は使わない（自己申告）。

- **防ぐもの**: 指示に従ったうえでの範囲外の変更（指摘に応える過程で入る CI 方針の変更）。自己申告に依らず、PR と base の差分のファイル一覧と計画の宣言から決定的に判定する。fix のコミット範囲は base 取り込みの差分が混ざるため比べない
- **フェイルクローズ**: 判定は止める方向にしか効かないが、added-files と違い、観測できない場合（封筒の不一致・取得失敗・一覧が REST の上限 3,000 件で切り詰められた）も飛ばさず `blocked` にする。飛ばすと計画外の CI 方針がそのまま自動マージされ得るため。止まる範囲は `fixCount > 0` の PR だけで、同じ args の再実行で解ける
- **入力の検証**: 許可（`planPolicyPaths`）は Issue 本文を読んだ Plan エージェント由来で、コマンド行と `inputSha256` に載る。ホスト（`sanitizePolicyPaths`・`observeCommand`）とスクリプト（`--allow`）の双方で、文字集合 `[A-Za-z0-9._/-]`・先頭 `-` `/` 不可・`..` `//` 不可・20 件・重複不可を強制する。jq には `--arg` で渡す
- **payload にパスの文字列を入れない**: 件数（`files` / `policy` / `unplanned` / `truncated`）と state の語彙だけ
- **防がないもの**: 封筒を偽造する悪意あるエージェント（偽の「計画外 0 件」は従来の挙動に戻るだけ）、宣言済みのパスの中での過剰な変更、ファイルでない設定変更（API による ruleset 変更は既存の `REPO_SETTINGS_POLICY` が扱う）。fix を経ていない PR の Implement による計画外変更は対象外

## 外部チェック観測と対象外ラベルの取得（`repo-scan.sh`・計画 C の P4）の旧版との差と運用上の注意

プロンプトに埋め込んでいたコマンドを `repo-scan.sh` へ切り出した（Issue #603。移行前後の差の詳細は PR の履歴に譲る）。判定の向きは変えていない: 観測できなければ external-checks は参考値の `apps: []`、skip-labels は取得できなかったラベルとして再試行のうえ open ノードを全て待たせる（fail-closed）。

- **取得と検査の契約**:
  1. check-runs は `?per_page=100` で読み、101 件目以降は `page=` を数えてページ送りで読む（Issue #809。`--paginate` は上限を置けないため使わない）。jq の 1 行目にそのページの件数を出し（slug の候補には混ぜない）、100 件未満なら終わる。ページの取得失敗・件数行の形の違い・上限の 10 ページまで埋まっていた場合は `errs` に数え、その PR の残りのページは読まない（取りこぼしを黙らない。読めたページの App は返す）。gh の呼び出しは最大で `gh pr list` 1 回 + 3 PR × 10 ページ = 31 回で、1 回の Bash 呼び出しに収める。観測は停止理由の文言にだけ使うので、上限で止めてもマージの判断は緩まない。
  2. `.app` が null の check-run は落とす。slug の形（小文字英数字とハイフン・64 文字以内）でない値は捨てて `dropped` に数える（ホストのプロンプトへ届かせない）。
  3. check-runs の取得に失敗した PR の HTTP エラー本文（gh は標準出力へ出す）を apps に混ぜず、失敗は `errs` に数える。slug の整列（`sort`）の失敗も `errs` に数え、apps を空の成功にしない。
  4. 番号は先頭 0 なしの 1〜9 桁の正の整数だけを受け入れる。形の違う行（先頭 0 の `007`・桁あふれ・エラー本文）が 1 行でもあればそのラベルは取得失敗（`failed`）にする。番号の整列・結合（`sort` / `paste`）の失敗、入力があるのに結果が空になる場合、ラベル名のエンコード（jq `@uri`）の失敗も `failed`（番号が空の成功として扱わない。エンコード失敗では gh を呼ばない）。
  5. ラベル一覧との照合は ASCII の大文字小文字を区別しない完全一致で、ロケールに依存しない。照合の jq が失敗したときは `absent` を判定しない（存在しないラベルの警告が出ない側へ倒れるだけで、待機の判定には影響しない）。
  6. 出力は封筒（`{nonce, payload, sha256}`）で、ホストが入力の束縛（`inputSha256`）を照合する。封筒が 24000 バイトを超えると exit 7 で、ホストはラベルを取得できなかったものとして扱う。
- **運用上の注意**:
  - 出力はツリーの open ノードとの交わりだけである（Issue #807）。ホストはツリーの open ノードの番号を昇順のカンマ区切りで `--numbers` に渡し、`inputSha256` にも入れる。ツリーと交わらない番号は出力に入らない。引数の長さは、`fetch-tree.sh` の上限（約 4,500 ノード）× 最大 10 バイト（9 桁 + カンマ）で 45,000 バイトであり、Linux の 1 引数の上限（MAX_ARG_STRLEN 131,072 バイト）に収まる。スクリプトは 100,000 バイトを超える `--numbers` を exit 2 にする。残る限界は 2 つ。(1) ツリー内で同じラベルが付いた open ノードが約 3,400 件を超えると exit 7 で全 open ノードが待機（fail-closed）になる。(2) 起動行をエージェントが転記するため、open ノードが数千件のツリーでは起動行も数万文字になる。転記の誤りは `inputSha256` で検出され、取得できなかったものとして全 open ノードが待機になる（危険側には倒れない）。取得失敗の fail-closed（1 回再試行のうえ全 open ノードを待たせる）は変えていない。
  - 走査するリポジトリは常にツリーのリポジトリに束縛する（Issue #808）。`repo-scan.sh` は `--repo` を必須にし、省略は exit 2（カレントのリポジトリへ倒れない）。ホストは `args.repo` があればそれを、無ければツリー取得の封筒の `repo`（`fetch-tree.sh` がルートの `repository_url` から解決した値）を渡し、`inputSha256` の repo 欄も同じ値で計算する。封筒の `repo` が形式不正なら `repo-scan.sh` を呼ばず、観測は未観測、対象外ラベルは全 open ノード待機（fail-closed）にする。`args.repo` 自体の束縛先（base 取り込み・merge-gate・通知コメントなど）は広げない（ツリーの `repo` は `repo-scan.sh` 専用）。

## 第 3 弾: base 取り込みと push 後確認（`base-merge.sh`・`observe-pr.sh --mode push`）

### 位置づけ: 封筒なしで足りる理由

`base-merge.sh` は **push を実行する最初のスクリプト**だが、出力に封筒（nonce・sha256）を付けない。「測定値の使い方」節が求める (a)(b)(c) のうち **(c) 自己申告値を判定に使わない設計**で足りるからである。ホストが `BASE_MERGE_RESULT` から読む値は、スクリプト化の前から返っていたものと同じで、新たに採用する値が無い。

| 値 | ホストの使い道 | 誤っていた場合に起きること |
|----|----------------|--------------------------|
| `pushed` | 進捗の記録だけ（`noPushRounds` のリセットと `lastRoundPushed`）。マージ・クローズ・push・削除の可否には使わない。resolve (b) の許可リスト `computePermittedNoPushResolveIds` は常に空（恒久無効）で、`lastRoundPushed` は安全判定に届かない | `true` の誤報は連続 no-push の数え損ないにとどまり、`baseMergeCount`（`maxBaseMerges`）が回数を有界にする。次ラウンドの monitor がサーバー側の実値を再観測する |
| `routingError` | halt 対象の失敗終端 | 偽陽性は止まる側（安全側）。偽陰性は、スクリプト自身が routing 不一致のときに fetch・merge・push を一切実行していない（実 git のテストが呼び出し履歴で固定する） |
| `commitFailed` | 失敗終端 | 止まる側 |
| `conflict` / `hookRejected` | 失敗終端せず fix 経路へ委譲 | 余分に fix 経路へ回るだけ（`fixCount` 上限 6 で有界、検証権限付き） |

`observe-pr.sh --mode push` の封筒も、ホストは**照合も採用もしない**（`checksStarted` / `mergeableAfterPush` は診断・分岐ヒント専用）。nonce はホストが常に生成して渡すが、材料は `push-confirm:<branch>:<PR 番号>` だけで呼び出しごとには変えない（プロンプトを決定的に保つため。pr-create は PR 番号を手順 1b まで知らないので、材料には字面のプレースホルダ `<PR 番号>` がそのまま入る）。**採用に切り替えるときは呼び出し連番を `boundaryNonce` の keyMaterial に足すこと**（同じ nonce のままだと前回の封筒の流用を検出できない）。

### スクリプト内のコマンドは merge-guard hook から見えない

`merge-guard-hook.sh` は subagent の Bash の**コマンド文字列**を見て、マージ系・設定変更系を拒否する。スクリプトの中で実行されるコマンドは hook から見えない。この hook は元から best-effort（承認境界ではない）だが、push を含むスクリプトが入った以降は、迂回面が『スクリプトの内容』に移る。補うのは次の 3 つである。

1. **内容の固定**: `run-verified.sh` の期待ハッシュ。スクリプトと `scripts/lib/*.sh` の内容は、ビルドしたときのものに固定される（書き換え・版ずれは exit 3 で起動しない）。ただし、固定されるのは『レビューした内容から変わっていない』ことで、『その内容が安全か』ではない。スキルディレクトリへ書き込める者は防げない（下の「何を防がないか」）。
2. **静的テスト**（`dev/implement-issue-tree/tests/script-static-guard.test.mjs`）: `scripts/*.sh` と `scripts/lib/*.sh`（hook 自身を除く）のコード行（バックスラッシュ行継続は連結してから検査する）に、マージ（`gh pr merge`・merge 系 API・mutation）、approve、ruleset・branch protection・リポジトリ設定の変更、書き込み系の HTTP メソッド（`-X` / `-XPUT` / `-iX PUT` のような他の短縮オプションとの連結 / `-X` の後ろがタブの形 / `--method` / `--request`）、`gh api` の `-f` / `-F` / `--field` / `--raw-field` / `--input` による暗黙 POST（graphql の query 送信は読み取りとして許す。`gh -R "${repo}" api …` のように `gh` と `api` の間にオプションが入る形も同じ扱い）、`gh alias` / `gh extension`（`merge-guard-hook.sh` が拒否している類）、`curl` の `-d` / `--data*` / `-F` / `--form` / `-T` / `--upload-file` / `--json` と `wget` の `--post-data` / `--post-file` / `--body-*`、`git push` の `--force` 系・`-f`・`+` refspec、`git push` の許可形（`git push --no-follow-tags origin "HEAD:refs/heads/${branch}"`）以外の形（`--no-follow-tags` の欠落・削除 refspec・`--all`・URL 直指定・remote 違い・引用符で囲んだ `"git" push` / `git "push"`）、`git remote`（`get-url` 以外）と `git config`（`--get` / `--list` 以外）、`core.hooksPath` と `GIT_CONFIG_*` による設定の注入、`--no-verify`（`--no-verif` のような長いオプションの一意な省略形を含む）と `git commit -n`、`HUSKY=` / `LEFTHOOK=` の綴りが無いことを検査する。各パターンが悪い例に発火し、正当な行に発火しないことも自己検査で固定する。**これは正規表現の lint であり、変数経由（`"${cmd}" push`）・`eval`・文字列連結で組み立てたコマンドは防げない**。防ぐのは『レビューした内容から無自覚に外れた綴り』であって、意図して迂回する書き手ではない。
3. **スクリプト側の自衛**（`base-merge.sh`）: `--branch` と `--base` が同じ値を拒否する。ref・repo・PR 番号をホストと同じ厳格さで再検証する（PR 番号の先頭ゼロ、`refs/` 始まりと `HEAD` のブランチ名、`git check-ref-format` に通らない名前を拒否する）。`base-merge.sh` の push は `git push --no-follow-tags origin HEAD:refs/heads/<branch>` の 1 形だけで、`--force` 系・`--no-verify` を使わない（hook を通す）。（`lib/push-verify.sh` には `pr-push.sh` の fix 経路だけが呼ぶ lease 形の例外があるが、`base-merge.sh` は呼ばない。下の「pr-push.sh」節の push の形を参照）`--no-follow-tags` は、利用者設定 `push.followTags=true` と注釈付きタグがあるとき、タグが同じ push で origin へ出ていくのを止める（実測: 付けないとタグが origin に作られ、結果は `pushed: true` のままである。`dev/implement-issue-tree/tests/base-merge.test.mjs` が固定する）。fetch 元は `refs/heads/<name>` で修飾し（修飾しないと同名のタグが優先され、タグにしか無いコミットがブランチへ入る）、取得先は worktree ごとの ref（`refs/worktree/base-merge/*`。linked worktree 間で共有されず、`pr-push.sh` と同じ。並列 worktree が共有する `refs/remotes/origin/*` は読み書きも削除もしない）で、fetch の前に自分の ref だけを消す（fetch が失敗しても stale な ref を merge しない）。マージの subject は埋め込み定数を一時ファイルに書いて `-F` で渡し（commitlint 設定やコミット履歴を読まない）、一時ファイルは trap で必ず消す。作業ツリーが clean でなければマージしない。ブランチが base に含まれている（独自コミットが無い）ときは fast-forward せず何も push しない。`gh pr view` には `-R <期待リポジトリ>` を付ける（`GH_REPO` や `gh repo set-default` で別リポジトリの PR を引かない）。

### 別リポジトリ・別ホストへ push しない保証の範囲

隔離 worktree は本体の `.git/config` を共有するため、先行するエージェントが `git remote set-url --push`・`url.<x>.pushInsteadOf`・`git remote set-url --add` で push 先だけを書き換えられる位置にある。`origin` の URL を先頭 1 件だけ見ると、fetch 元は正しいまま push だけが別の場所へ届く。そこで `base-merge.sh` は、fetch や push を始める前に次の 2 つの全行を照合する。

- `git remote get-url --all origin`（fetch URL）
- `git remote get-url --push --all origin`（push 先 URL。`pushurl` と `pushInsteadOf` の書き換えを反映する）

どちらも**全行**が、許可ホスト `github.com` と `--repo` の owner/repo に（大文字小文字を区別せず）一致しなければならない。1 行でも外れる・0 行・取得に失敗するときは `routingError` で返り、fetch・checkout・merge・push を一切実行しない。受理する URL の形は `https://[userinfo@]github.com[:443]/<owner>/<repo>[.git]`、`ssh://git@github.com[:22]/<owner>/<repo>[.git]`、`git@github.com:<owner>/<repo>[.git]` の 3 つだけである。userinfo は authority の最後の `@` までを捨てて host を取るので、`https://github.com@evil.example/…` の host は `evil.example` になり拒否する。authority に `@` が 2 つ以上ある URL（`https://a@evil.example@github.com/…`）も拒否する（git は接続に失敗するが、エラー文に 2 つ目の userinfo が残る。トークンに `@` を含む正当な URL は稀で、含めるなら `%40` に符号化する）。host は完全一致で比べる（`evilgithub.com`・`evil.github.com`・`notgithub.com` のような後方一致の別ホストも拒否する）。非標準ポート、`http://`・`git://`、`git@` 以外の ssh ユーザー、小文字でない `.GIT`、owner/repo の後方一致、許可文字（英数字と `._~:/@%+-`）以外を含む URL も拒否する。URL はトークンを含み得るので、標準出力・標準エラー・`summary` のどこにも出さない（標準エラーに出るのは『何行目が不一致』だけ）。照合は実 git の実 config に対して `dev/implement-issue-tree/tests/base-merge.test.mjs` が固定する（3 つの書き換えのそれぞれで evil 側の bare に ref が 1 つも作られないことまで検査する）。

**防がないこと:**

- **スクリプト自体の書き換え。** スキルディレクトリへ書き込める者は、ハッシュと一緒に照合も書き換えられる（下の「何を防がないか」）。
- **照合後・push 前の config 書き換えの競合。** 照合から push まで（fetch・checkout・merge をはさんで数秒）の窓がある。その間に同じ `.git/config` を別のプロセスが書き換えると、照合を通った後の push が別の場所へ届き得る。照合と push を 1 つの原子的な操作にはできない。
- **静的ガードは変数経由を防げない。** 上のとおり正規表現の lint であり、`"${cmd}" push` のような綴りは見えない。
- **URL に現れない送信先の変更。** `GIT_SSH_COMMAND`・`core.sshCommand`・credential helper のような、URL ではなく通信の仕方を変える設定は `get-url` の出力に現れない。同じ類として次も防がない。
  - `remote.origin.receivepack` / `remote.origin.uploadpack`（`get-url` に現れない。ローカル transport では別の場所の実行ファイルへ届くことを実走で確認した。GitHub の https では使われない）。
  - `http.proxy` / `https_proxy` などの proxy（通信が経由する先を変える）。
  - `~/.ssh/config`（`Host github.com` の `HostName` で ssh の接続先が変わる）。
  - リポジトリの改名・移管による GitHub 側のリダイレクト（`get-url` の文字列は `--repo` と一致したまま、実際の送信先は別リポジトリになり得る）。

**git の最低版:** `git remote get-url`（`--push`・`--all` を含む）は git 2.7 で追加された。`get-url --push --all` を使えない git では `get-url` が失敗し、取得できないとして `routingError` に倒れる（安全側）。

`git merge -F` は 2.17.1 と 2.18.4 には無く、2.20.4 にある（2.19 系は未検証）。`-F` を持たない git では、routing ガードは通過し、merge がオプション不正で失敗する。MERGE_HEAD も未マージのファイルも無いので `commitFailed`（ホストでは `failed` 終端）で返り、push はしない。安全側に倒れるが、base 取り込みはできない。

### 出力は固定語彙

`BASE_MERGE_RESULT` の `summary` は固定の語彙だけで、hook の出力・gh の出力・URL・ブランチ名のような外部由来の文字列を入れない（診断は標準エラーへ出す。標準エラーはエージェントが読むが、ホストへ返る値には載らない）。ホストは `summary` を `finding.summary`（fix プロンプト）へ流すため、ここに外部由来の自由文を入れると未信頼データが push 権限のある経路へ入る。

### push の検証（`lib/push-verify.sh`）

`pushed` になるのは、(i) push 前のリモート head がローカル HEAD と違い、(ii) push 後のリモート head がローカル HEAD と一致し、(iii) push コマンド自身が成功したときだけである。push コマンドの成功や、push の前後で sha が変わったことは根拠にならない（その間に別ランが同じブランチを更新すると、自分の push が拒否されても sha は変わる。PR #436）。比較できない（ls-remote の失敗・HEAD を読めない）ときも、作業は detached HEAD 上にしか無く push を省くと失われるため push は実行し、結果は `unverified`（`pushed: false`）にする。3 条件を 1 つずつ外すと赤になることは `dev/implement-issue-tree/tests/push-verify.test.mjs` が固定する。

### スクリプトを実行できなかったとき

`run-verified.sh` の exit 3（ハッシュ不一致）/ 4（欠落）、スクリプトの exit 2（使い方の誤り）では `BASE_MERGE_RESULT` の行が出ない。プロンプトはこのとき、取り込み直さずに `pushed: false`・`commitFailed: true`・`summary: base-merge.sh の失敗` で返させる。ホストは `conflict` / `hookRejected` を伴わない `commitFailed` として `failed` 終端する（`blocked` と違い halt の連続カウントに計上される。`dev/implement-issue-tree/tests/base-merge-host-flow.test.mjs` が固定する）。版ずれの間は、base とコンフリクトした PR のたびに `failed` が 1 件ずつ積まれる（fix 経路へは回らず、取り込み直しもしない）。ラン開始時のハッシュ予検査（第 4 弾）が、版ずれを実装の前に止める。

### 既知の挙動

- **`rerere.autoupdate` が効くとコンフリクトが `hookRejected` に分類される。** 記録済みの解決が自動適用されると、未マージのファイルは残らないまま `MERGE_HEAD` だけが残るため、スクリプトは『マージコミットの hook 拒否』として `hookRejected` + `commitFailed` で返す（abort して push しない）。ホストは `conflict` と同じく fix 経路へ委譲するので、結果は安全側にそろう。
- **PR ブランチが force-push で書き換わっても取り込める。** branch の fetch の前に追跡 ref を消すため、古い追跡 ref に引きずられず、書き換え後の head を起点にする（`dev/implement-issue-tree/tests/base-merge.test.mjs` が固定する）。リモートからブランチが消えている場合は fetch が失敗し `commitFailed`（`summary` は branch fetch 失敗）で返る。

### 隔離 worktree からの実行は実ランで未検証

第 3 弾は、`isolation: 'worktree'` のエージェント（base-merge・pr-create・fix）が、メイン作業ディレクトリ側の絶対パス `skillDir` のスクリプトを実行する**最初の弾**である（第 1・2 弾のエージェントは非隔離）。隔離 worktree のエージェントがそのパスを実行できるか、スクリプトの cwd が隔離 worktree になるか（`git` の操作が隔離 worktree に対して行われるか）は、実ランで確認していない。テストは cwd を作業用 clone にして実 git で確かめているが、Workflow ランタイムの隔離とサンドボックスの挙動は再現していない。

## 第 4 弾: pr-create と fix の push（`pr-push.sh`）と起動時のハッシュ予検査

### `pr-push.sh`: 検証権限のある経路の push

`pr-push.sh` は pr-create と fix（検証権限を持つエージェント。ビルド・lint・テストを実行できる）が使う。`base-merge.sh`（検証権限を持たず、コンフリクトを解消しない）とは役割が違い、**push と base の取り込みを決定的にし、判断だけをエージェントに残す**。

| モード | スクリプトが行う | エージェントに残る判断 |
|--------|------------------|----------------------|
| `prepare` | routing ガード（`--repo` があるとき）・未コミットの変更の拒否・base の fetch（worktree ごとの ref に固定）・起点の確立と sha の一致確認・base の取り込み | コンフリクトの解消・commitlint に合わせた subject の決定（`--subject-file`）・ビルド・lint・テスト |
| `push` | routing ガード（`--repo` があるとき）・途中のマージ（MERGE_HEAD）の拒否・固定した base が HEAD の祖先でなければ拒否（`base-not-merged`）・差分ゼロの拒否（pr-create）・`pv_push_verified` による push と前後の突き合わせ（結果に `headSha` を添える）。fix のみ、メッセージだけの書き直しは lease 形の `pv_push_rewrite_verified`（`pushed-rewritten`・`replacedSha` を添える。下の「push の形は 2 形」） | 修正のコミット・opt-in テストの実行 |
| `pr` | routing ガード（`--repo` があるとき）・サーバー上のブランチ head と `--expect-sha` の照合・Closes 対象 Issue の milestone 確認・open PR の検出（同一リポジトリの head だけ。base と head の sha の照合）・`gh pr create` | タイトルと本文の文面・既存 PR 本文の追記 |

- **封筒を使わない。** 結果の最後の 1 行 `PR_PUSH_RESULT {…}` は固定語彙・整数・40 桁 16 進だけで、ホストは採用しない。`base-merge.sh` と同じ理由（上の第 3 弾「封筒なしで足りる理由」）で、ホストが読む値は従来のエージェントの返却値（`prNumber`・`pushed`・`commitFailed`）と同じで、新しく採用する値は無い。`pushed: true` の誤報が resolve (a) を解禁し得る点は従来と同じ経路で、`pushed` は `pv_push_verified` の二条件でしか `pushed` にならない（スクリプトを経由しない自己申告に戻らない）。
- **routing ガードは `base-merge.sh` と同じ関数。** `lib/base-merge-lib.sh` の `routing_check_remotes`（fetch URL と push 先 URL の全行を `url_allowed` で照合）を共有する。`--repo` はホストが `args.repo` を持つときだけ渡す。**持たないランでは照合しない**（従来の pr-create / fix も照合していない）。この場合の別リポジトリへの push の防御は、fix の手順 0（`gh issue view` の title 照合）と、隔離 worktree の運用に依存したままである。`args.repo` を渡すと pr-create / fix も `base-merge.sh` と同じ強さになる（`prepare` だけでなく `push` の push の直前と `pr` の gh の前にも同じ照合を実行する。remote の URL は本体の `.git/config` を共有する worktree 間で書き換えられ得るため）。`pr` モードの `gh pr list` / `gh pr create` / `gh issue view` も `-R <repo>` で束縛し、milestone の件数を読む `gh api` は path に repo を埋める。プロンプトが実行する再利用 PR の本文取得・更新（`gh pr view` / `gh pr edit`）にも同じ `-R` を渡す。
- **コンフリクトの扱いは `base-merge.sh` と逆。** 検証権限のある経路なので、`prepare` はコンフリクトを解消せず**マージを途中のまま残して `conflict` を返す**（エージェントが解消し `git commit -F` で確定する）。途中のまま `push` を呼んでも、`MERGE_HEAD` が残っていれば `merge-in-progress` で止まり push しない。commit hook が既定 subject を拒否したときは abort して `hook-rejected` を返し、エージェントが subject を決めて `--subject-file` つきで再実行する。解消後のコミットが hook に拒否されたときは、エージェントが `git merge --abort` して失敗で返す（プロンプトが固定する）。
- **push の形は 2 形。** 通常は `git push --no-follow-tags origin HEAD:refs/heads/<branch>`（`lib/push-verify.sh` の `pv_git_push`）。`--no-verify` を使わない。例外は **fix の push だけ**（Issue #696）: fix が CI（commitlint など）に拒否された既存コミットのメッセージだけを書き直すと、リモート head が HEAD の祖先でなくなり通常の push は non-fast-forward で拒否される。そこで `try_rewrite_push` がスクリプト自身の `git fetch` で観測したリモート head R について、`R --not HEAD`（捨てるコミット）の**すべて**に、tree が同じ・親の数が同じ・親が位置ごとに対応する（捨てる側の親は対応先、それ以外は同じ sha）コミットが `HEAD --not R` の側にちょうど 1 つあること（`pp_rewrite_equivalent`。各 100 件まで。候補が複数なら拒否）を確かめたときだけ、`pv_git_push_lease`（`--force-with-lease=refs/heads/<branch>:<R>`。期待値は呼び出し側が `pv_is_sha` を通した観測値で、エージェントの申告値ではない。値なしの lease・`+` refspec・`--force` は使わない）で push する。結果は `pushed-rewritten`（ls-remote の値が HEAD と一致）・`race`（lease で拒否され、リモート head が観測値とも HEAD とも違う）・`push-failed`（hook・通信エラー・サーバー側の force push 禁止、または tree か親が変わる書き換えで判定が合わなかったとき）。判定できない（fetch 失敗・ブランチ無し）、R が HEAD の祖先のときは通常の push に任せる。HEAD に新しいコミット（base のマージや修正）が余分にあっても許す: fast-forward の push でも同じ内容が送られ、force によって新たに失われるものは無いため。`pr-create` では lease を使わない（コード上でこの分岐に入らない）。静的ガードは lease 形を `lib/push-verify.sh` の 1 行に固定する。ruleset が force push を禁じているリポジトリでは拒否されて `push-failed` になる（設定は変えない）。push の標準エラーは URL を含み得る行（`To <url>`・`failed to push some refs to '<url>'`・`://` を含む行）を除いて出す（どの出力にも URL を出さない）。
- **起点の取り違えを止める。** `prepare` は checkout 後の HEAD が決めた sha と一致することを確かめ（`sha-mismatch`）、`push` は pr-create で base との差分ゼロなら push しない（`no-diff`）。remote ahead（第三者の push と区別できない）は採用せず `remote-ahead`、双方向とも祖先でないなら `diverged`、リモートにあるのにローカルの `refs/heads/` が無ければ `local-missing` で止まる（判定は `lib/pr-push-lib.sh` の `pp_decide_origin` で、表の単体テストが固定する）。
- **既存 PR の再利用は base と head の sha が一致する 1 件だけ。** base が違う PR・head が動いている PR・複数の PR は再利用も新規作成もしない（`pp_classify_pr`）。fork の同名ブランチの PR（`isCrossRepository`）は一覧から除く。
- **PR の head はサーバーで確認してから使う。** `push` の結果（`race`・`unverified` を含む）に関わらず、`pr` モードは `git ls-remote` で得たサーバー上のブランチ head が `--expect-sha`（`push` の結果の `headSha`）と一致しなければ、作成も再利用もしない（`remote-head-mismatch`・`remote-head-unknown`・`remote-head-missing`）。ローカル HEAD が `--expect-sha` と違えば `head-moved`。push 後に第三者が積んだ未レビューのコミットを含む PR を自動マージ経路へ渡さない。プロンプトは `race` で PR 作成を止める（`unverified` はこの照合に委ねる）。
- **base は worktree ごとの ref に固定する。** `prepare` は base を `refs/worktree/pr-push/base`（linked worktree 間で共有されない）へ取得し、以降の取り込み・`push` の base 検査・差分ゼロ確認はこの ref を使う。並列 worktree が共有する `refs/remotes/origin/<base>` は削除しない（別の worktree が参照中に消すと、そちらの取り込みや検査が解決できず正常な作業を失敗終端させる）。`git fetch` による共有 ref の前進は git の通常動作で、固定した base には影響しない。
- **milestone の確認（create-pr スキル Step 2.5 の手順 3 と同じ判定）。** リポジトリに milestone が 1 件も無ければ非運用とみなして確認しない（`not-used`）。件数・Issue の milestone を取得できなければ PR を作らず止まる（`milestone-check-failed`。取得失敗を非運用や割当済みと読み替えない）。未割当は警告つきで続行し、新規作成なら PR 本文へ警告行を足す（再利用ならプロンプトが追記する）。自律運転ではユーザーの同意を取れないため、create-pr の『候補が 1 件なら同意を得て割り当てる』は行わない（milestone を書き換えない）。判定は `lib/pr-push-lib.sh` の `pp_milestone_status`（表の単体テストが固定する）。
- **milestone の取得失敗の原因分類と再試行（Issue #732）。** 失敗した gh の標準エラーは `pp_gh_cause` が固定語彙（`rate-limited` / `forbidden` / `not-found` / `server-error` / `network` / `other`）へ分類する。本文は照合にだけ使い、結果にも診断にも出さない（外部由来の文字列を通さない）。`rate-limited` / `server-error` / `network` は有界に再試行する（`PR_PUSH_MS_ATTEMPTS` 既定 3 回・上限 5、`PR_PUSH_MS_WAIT_S` 既定 5 秒 × 試行番号・上限 30。不正な値は既定へ戻す）。再試行しても **レート制限だけは `milestone: unknown` で続行**する: milestone の確認は PR 本文の警告にしか使わず（割り当てはしない）、一過性の API 制限で push 済みの PR 作成まで落とすと、次ランが高コストな Recover になるため。新規作成なら本文に「確認できなかった」警告を足す（再利用でもプロンプトの追記指示は `unassigned` / `unknown` の両方で警告を足す）。**それ以外の原因（権限・404・原因不明・再試行後も続く 5xx / ネットワーク）は従来どおり `milestone-check-failed` で止まる（fail-closed）。** 結果には固定語彙の `cause` と、再試行したときだけ整数の `milestoneAttempts` を添える。
- **静的ガード**（`dev/implement-issue-tree/tests/script-static-guard.test.mjs`）は `pr-push.sh` と `lib/pr-push-lib.sh` も走査する。`gh` は `pr list` / `pr create` / `issue view` と、milestone 件数を読む `gh api`（GET のみ）だけを呼ぶ（merge・review・close・edit・API の書き込みの綴りが無い）。

### 起動時のハッシュ予検査（`run-verified.sh --verify-only`）

**何をするか。** ラン開始時（シードの取得の直後・状態の読み込みの前）に 1 回、`SCRIPT_SHA256` の全エントリ（`<sha256> <スクリプト名>` を 1 行ずつ）を skillDir の実ファイルと照合する。`skillDir` を渡したランで行う（`dryRun` を含む。`dryRun` で `skillDir` を省略したラン〔スクリプトを使わない〕では行わない）。不一致・欠落があれば、状態の読み込みも Plan も実装も始めずに、件数と先頭のスクリプト名を示して停止する。

**ホストは bash を実行できないので、エージェント 1 回で確かめる。** 表を標準入力のヒアドキュメントで渡し、`bash <skillDir>/scripts/run-verified.sh --verify-only --nonce <nonce>` を一字一句そのまま実行させ、出力の封筒（`nonce`・`payload`・`sha256`）を転記させる。`--verify-only` は**スクリプトを実行せず**、各行を通常の起動と同じ定義のハッシュ（スクリプト本体 + `lib/*.sh`）で照合する。payload は整数と入力のハッシュだけ（`count`・`ok`・`mismatch`・`missing`・`firstBad`・`inputSha256`）。ホストは `verifySignedOutput` で再計算し、(1) nonce が呼び出しごとに一意（試行番号を材料に含める）、(2) `inputSha256` がホストの送った表と一致、(3) `count` が表の行数と一致し `ok + mismatch + missing == count`、のときだけ採用する。

| 結果 | ホストの動作 |
|------|------------|
| 全行一致（`mismatch == 0 && missing == 0`） | 続行 |
| 封筒の形が不完全・nonce 不一致・sha256 不一致・別の表を検査した・件数が合わない | 転記ミスまたはスクリプト未実行とみなし、別エージェント（sonnet）で 1 回だけ再試行する。使い切れば停止する |
| agent 例外・出力欠落 | 同上（再試行 1 回、使い切れば停止） |
| 不一致・欠落（封筒は正しい） | 再試行せず停止する（実ファイルが埋め込みと違うことは、再試行しても変わらない） |

**エージェントの自己申告だけで「一致」を信じない。** 「一致した」とだけ報告させても検証できないので、ホストが再計算できる封筒を要求する。ただし、これは**転記ミス・未実行・別の呼び出しの流用・別の表の検査を検出するもの**で、`sha256sum` を自分で回せる悪意あるエージェントの捏造（nonce と表はプロンプトに書かれているため、正しい封筒を作れる）は検出しない。launcher 自身も照合の対象外である。

**予検査は信頼境界ではない。** 各スクリプトの起動時のハッシュ照合（`run-verified.sh` の exit 3 / 4）は予検査とは別に毎回働き、マージ・push・削除の可否は予検査の結果に依らない。予検査が防ぐのは『版ずれのままラン途中まで進んでから止まる』ことで（すでに状態を書き、worktree を作った後に止まる）、『版ずれのスクリプトが実行される』ことは起動時の照合が防ぐ。予検査を通過した後にスクリプトが書き換わる競合（TOCTOU）も防がない（上の限界と同じ）。

**エージェント呼び出し数。** 予検査は 1 回（再試行で最大 2 回）で、開始処理の見積り（30）の余裕の内に収まる。`agentCallLimit` の下限（81）は変えない（`references/agent-call-budget.md`）。

### `observe-pr.sh --repo`

ホストが `args.repo` を持つときは、観測コマンドに `--repo OWNER/REPO` を渡し、スクリプト内の `gh` を対象リポジトリへ束縛する（`gh pr view -R`・`gh api repos/OWNER/REPO/…`・GraphQL の owner / name）。持たないランは従来どおり（`gh` が cwd のリポジトリに解決する）。`--repo` は封筒の `inputSha256` の材料に含まれるので、`--repo` を落として実行した出力は、repo 入りの入力を期待するホストの照合で `input` として拒否される。形式検証は `lib/base-merge-lib.sh` の `valid_repo` を共有する。

## 第 5 弾: 状態ファイルの書き込み（`state.sh`）

### 位置づけ: 封筒なしで足りる理由

`state.sh` は状態ファイルへの書き込み（`.items[n]` へのマージ・一括初期化・高水位の更新）を、固定のコマンド列（`mktemp` → `jq` → `mv`）にした（Issue #603 第 5 弾）。ホストが読む値はエージェントの返却値（`ok`）と同じで、新しく採用する値は無いため、`base-merge.sh` と同じく封筒を付けない（(c) 自己申告値を判定に使わない設計）。`ok` が偽って `true` で返ると、保存できていない回復情報（PR 番号・worktree）のまま次へ進み得るが、これは自己申告の水準のままである。スクリプト化で、手順の組み立て（クォート・一時ファイル・原子的な置換）がエージェントの文章解釈に依らなくなった。

| 項目 | `state.sh` の契約 |
|------|-----------|
| 書き込み先 | `_/issue-trees/<正の整数>.json` の 1 形だけ（それ以外は exit 2 で何も書かない） |
| patch の渡し方 | ヒアドキュメント（終端は呼び出しごとの nonce で作り、本文から nonce を除く）+ `--slurpfile`。patch は jq のプログラム文字列に入らない |
| 入力の形 | 入力はちょうど 1 個の JSON 値（複数の値が続く入力は拒否。`jq -e` は最後の値しか見ないため）。`merge`: 番号は 1 以上の整数・patch はオブジェクト。`init`: type は `implement` / `verify-close`。形が違えば書かず `invalid-input` |
| 壊れた状態ファイル | 書き換え前に `.items` がオブジェクトかを確かめ、違えば書かない（`rewrite-failed`）。出力も同じ検査を通ってから置換する |
| 並行書き込み | スナップショットから計算し、置換の直前に元ファイルが変わっていないか確かめる。変わっていれば最初からやり直し、3 回続けば `changed-concurrently`（別ランの書き込みを失わない） |
| 一時ファイル | 入力の一時ファイル・`st_rewrite` のスナップショット・出力用一時ファイルのパスを trap から見える変数（`pf` / `ST_SNAP` / `ST_TMP`）で持ち、正常終了・失敗経路・TERM / INT / HUP のいずれでも消す（テストが残存 0 と SIGTERM 中断を確かめる）。SIGKILL では残る |

- **`state.sh` が持たないもの。** 状態の読み込み（`loadState` の `state:load`。`state:load-verify` のハッシュ取得だけは下の「`verify`」で `state.sh` に移した）と worktree / branch の削除（`state:cleanup`・最終スイープ。`--force` を使う別の安全判定を含み、第 7 弾で扱う）。掃除の手順 5（削除後の `.worktree` のクリア）だけは `state.sh merge` を呼ぶ。
- **変更検知はアドバイザリで、排他ロックではない。** 検知から `mv` までの数ミリ秒の窓は残る。同一ランの書き込みはホストが直列化している（`enqueueStateWrite`）ので、検知が対象にするのは別ランが同じ状態ファイルを書いた場合である。
- **掃除の手順 5 にも同じ判定指示を入れる。** `state.sh` は書き込みに失敗しても exit 0 で `STATE_RESULT {"ok":false,…}` を出すので、掃除プロンプトの手順 5 にも「`ok` が false・結果の行なし・非 0 終了なら掃除全体の `ok` を false で返す」を入れる（書き込みプロンプトと同じ `STATE_NOTE`）。open な項目が 0 件のときの `init` はホストが呼ばずに成功として扱う（`state.sh` は空配列を `invalid-input` で拒否する）。
- **失敗の返し方。** 結果の行が出ない・非 0 終了・`ok: false` は、エージェントが `ok: false` を返し、ホストの既存の経路（`StructuredOutput` 未返却は sonnet へ 1 回フォールバック、応答した上での失敗はフォールバックしない）に乗る。`merge` が失敗したら掃除をしない（回復情報を保全する）。
- **静的ガード**（`dev/implement-issue-tree/tests/script-static-guard.test.mjs`）は `state.sh` と `lib/state-lib.sh` も走査する。`rm` は自分が作った一時ファイルへの `rm -f` だけで、`rm -rf`・`--force` の綴りは無い。

### `state.sh verify`（計画 C の P5）: 読み取りモードを足した判断

**足したもの。** ホストの `state:load-verify` は、項目ごとの `jq -jcS '.items[$k]' | sha256sum` を回す約 1 KB のコマンドをプロンプトに埋め込み、エージェントが書き写して実行していた。書き写しの誤りで結果（`hashes`）が黙って変わる経路があり、返却スキーマにも自由形式の object が残っていた。これを `state.sh verify` に移し、返却を封筒 `{nonce, payload, sha256}` にした。payload は固定欄（`entries:[{k,h}]`・`highWaterBytes`・`highWaterVersion`・`inputSha256`・`keysCount`・`keysSha256`・`mode`・`outcome`・`page`・`pages`）だけで、自由形式の object を持たない。

**判断: 新しいスクリプトにせず `state.sh` に足した。** (1) 状態ファイルの形（`_/issue-trees/<N>.json`・`.items`・高水位の欄）の知識とパスの許可形（`st_valid_file`）を 1 か所に保てる。(2) `SCRIPT_SHA256` の行・予検査の表・launcher の対象が増えない。(3) ホストの呼び出し形（`run-verified.sh <sha> state.sh --file … <モード>`）が同じ。書き込み専用だったスクリプトに読み取りを足す懸念は、次で経路を分けて抑えた。

- **書き込みの経路と共有しない。** `verify` は引数の検証のあと、`trap`・日時・一時ファイル・`st_create`・`st_rewrite` より前に `lib/state-verify-lib.sh` の `sv_run` へ分岐して `exit` する（`dev/implement-issue-tree/tests/state-verify-script.test.mjs` が分岐の位置を静的に固定する）。共有するのは引数の解析と `st_valid_file` だけ。書き込みのモードは `--nonce` / `--page` を使い方の誤り（exit 2）にし、`verify` は `--bytes` / `--version` を使い方の誤りにする。
- **何も書かないことをテストで固定する。** ファイルのバイト・更新時刻・inode・ディレクトリの内容・`TMPDIR` が変わらない、無いファイルのとき `_/issue-trees` を作らない、書き込み不可のディレクトリでも成功する、ライブラリのコード行に `rm` / `mv` / `cp` / `ln` / `mktemp` / `tee` / `touch` / ファイルへのリダイレクトが無い、`TMPDIR` が存在しなくても動く。here-document（`<<`）と here-string（`<<<`）も使わない（bash 3.2 はどちらも一時ファイルで実装する）。キーの一覧は `set -f` + 改行だけの `IFS` の単語分割で回し、サブシェルに閉じる。ファイルは 1 回だけ変数へ読み、以降の jq はその内容へ流す（1 回の呼び出しで同じ版を見る）。
- **封筒で返す。** ホストが値（項目のハッシュ）を採用して項目の採否を決めるため、`STATE_RESULT` ではなく封筒にした。`inputSha256` はファイルのパスとページを束縛する。nonce は呼び出し連番（ラン開始時と終了時の `loadState`）とページごとに一意で、開始時の封筒を終了時の再読込へ流用できない。
- **outcome は 3 つ。** `ok` / `nofile`（ファイルが存在しない）/ `error`（`--file` がシンボリックリンク〔リンク切れを含む〕・存在するが読めない・JSON として不正・`.items` が〔無い・null 以外で〕オブジェクトでない〔`false` を含む〕・高水位が〔無い・null 以外で〕非負整数の number でない〔`false`・文字列の `"4096"`・負・小数を含む〕・16 桁以上のキー〔全キーを 1 回で検査し、要求したページに無くても error〕・改行を含むキー〔jq の `$` は末尾の改行の前にも当たる〕・項目のハッシュを取れない）。`nofile` だけが「読込側が新規作成した」ときの状態なしの続行に進める。`error` を `nofile` に倒さない。`error` の封筒は正しい観測なので sonnet へフォールバックせず、ホストは停止する。
- **ページ送り。** `entries` は 1 回 100 件（約 9 KB。1 回の出力上限 24000 バイトの内側）。ホストは `pages` が 2 以上のとき `--page 1…` を順に取り、全ページの `outcome`・`pages`・`keysSha256`・`keysCount`・高水位の一致と、キーの形（`/^[1-9]\d*$/`）・重複なしを要求する。上限は 50 ページ（5000 件）。超える封筒は正しい観測なので sonnet へ回さず、1 ページ目の直後に専用の文（項目数が照合の上限を超える）で停止する。再実行や退避では解消しないので、照合不成立の汎用の文は出さない。
- **従来との差（緩くならない側だけ）。** 移行前のコマンドと同じ式（キー選別・`jq -jcS` のハッシュ。高水位は無い・null なら 0 で `// 0` と同じ）で、サンプルの状態・DEL と日本語を含む項目・入れ子・数字以外のキー・先頭ゼロのキー・`items` なし / null を差分テストで一致させた。`error` になる入力は 2 種類ある。
  - 移行前が使えない・誤った値を返した入力: JSON として壊れたファイル・`items` が配列、複数の JSON 値、改行を含むキー、高水位が非整数・負・文字列。停止する点は同じか、黙った誤りを止める側。
  - 移行前は値を返したが受理しない入力（停止側に厳しくした分）: 16 桁以上のキー（15 桁以内は `state-lib.sh` の `st_uint` と同じ「JS の安全な整数の範囲」）、`.items` が `false`、高水位が `false`。いずれも `state.sh` とホストの書き込みが作る形ではないので、出会ったら停止して状態ファイルを確かめる。
  判定がロケールに依存しないこと（C / UTF-8 / 未設定で同じ封筒）もテストで固定する。
- **ページの値はまとめて取る（PR #810）。** ページの 100 件は 1 回の `jq -jcS --argjson ks …` で 1 件 1 行に出し、1 件ずつ `so_sha256` に通す（1 件ごとの jq 起動は 1 ページで状態ファイル全体を 100 回パースする）。`-c` の出力は値の中に改行を含まない（文字列の中の改行は `\n` へエスケープされる）ので 1 件 1 行で区切れ、各行は 1 件ごとの出力と同じバイト列になる。例外は項目そのものが文字列の場合で、`-j` は文字列を生のまま出す（改行を含み得る）ため、その行は印の `"` 1 文字にして 1 件ずつ取り直す。行がキーより少ない・多い、またはまとめての `jq` が失敗したときは `error`（ハッシュを詰めて返さない）。差分テストに項目そのものが文字列のケース（改行・末尾の改行・`"` 1 文字・空文字）を足し、偽の `jq` で行の欠け・余り・失敗が `error` になることを固定する（変異 SV20〜SV23）。
- **停止しやすさ（liveness）。** ハッシュ 1 件の転記ミスは封筒の sha256 の不一致になり、そのページ全体が無効になる。sonnet へ 1 回フォールバックし、それでも有効な封筒が返らなければ照合不成立で、**ラン開始時はラン全体の停止**（新規着手 0 件）になる。安全側だが、1 ページの `entries` が多いほど転記ミスの機会が増える。終了時の再読込は例外を捕まえて孤立 worktree の記録・削除を見送るだけで、ランは止まらない。
- **残余リスク。** sha256 を自分で計算できる悪意あるエージェントは、nonce・payload・sha256 の組を作れる。ただし値は読込側が返した項目との照合にしか使われず、一致しない項目は採用されないので、偽装で増やせる権限は無い。

### `base-merge.sh` の共有 ref

第 4 弾の持ち越し: `base-merge.sh` は branch と base の取得先を `refs/worktree/base-merge/*` に変え、並列 worktree が共有する `refs/remotes/origin/*` を削除しない（実 git の 2 worktree テストと変異 U40 が固定する）。`refs/worktree/` が worktree ごとに分かれることは、git 2.54 でしか実測していない（最低版 2.20 では未確認）。

## 第 6 弾: merge-exec の G0 と再検証（`merge-gate.sh`）

### 位置づけ: マージの実行はプロンプトに残し、読み取り専用の検証だけを移す

merge-exec のプロンプトは、マージ直前に (a) ベースブランチのサーバー側強制の実測（G0: ruleset の source / `bypass_actors` / `enforcement` / required status checks の `integration_id` 束縛 / 外部チェック App の context + App ID の組 / レビュースレッド解消の必須化 / client-only チェックの不在）と、(b) チェック状態・未解決スレッド・mergeable・外部チェックの再検証を、`gh` / `jq` の手順として文章で持っていた。これを `scripts/merge-gate.sh`（判定は `lib/merge-gate-lib.sh` の純関数）へ移し、プロンプトは「コマンドを 1 回実行し、`payload.verdict` が `ok` ならマージ、それ以外は verdict をそのまま reason にして辞退する」だけにした。

**squash merge の実行（`--match-head-commit` 付きの 1 形）はスクリプトに入れない。** `script-static-guard` はスクリプトにマージ系の綴りを禁じ、`merge-guard-hook.sh` は Bash のコマンド文字列でマージを拒否する。マージ実行をスクリプトに入れるとガードの例外化と hook の素通りが生じる。除外リストと hook はこの弾で変えていない（変えたのは `/rulesets` の 1 パターンだけで、下の「静的ガード」参照）。merge-verify（マージ後の `gh pr view` 1 コマンドの独立確認）は、移しても削減が無いうえ「別コンテキストが独立に観測する」ことが本質なので移していない。

### 封筒を使う理由: ホストの受理条件に入る

`state.sh` と違い、出力はホストのゲート判定の入力になる。ホストは `merged: true / reason: merged` を受理する前に、merge-exec が転記した封筒（返却の `gate`）を `verifyMergeGate` で照合し、次がすべて揃ったときだけ受理する。

- 封筒の nonce が、そのラウンドの merge-exec 呼び出しに対してホストが決めた nonce と一致する（呼び出しごと・ラウンドごとに別。前の封筒の流用は通らない）
- sha256 が nonce + payload の正規形から再計算した値と一致する
- `payload.inputSha256` が、ホストが自分の引数（PR・repo・base・期待 sha・外部チェックの宣言の文字列）から再計算した値と一致する（別の PR・別の宣言を検証した出力は通らない）
- `verdict == ok`・`err == 0`・`stage == done`（最後の段階まで到達した）
- 封筒の `headSha` が merge-exec 申告の `headSha` と一致する（ホストが opt-in ゲートの期待 sha を持つときはそれとも一致）。続けて既存の merge-verify の独立観測 `headRefOid` との一致も要求する

**この照合はマージの後に行われ、マージを防ぐ仕組みではない**（マージを防ぐのはサーバー側の ruleset と hook で、照合は不正・転記漏れの検出と `blocked` 化を担う）。不合格は既存の「独立確認で裏付けられなかった」経路（`blocked` + `quality`、次回ランの monitoring 再開で `already-merged` 回復）へ流す。ホストの分岐の意味は変えていない。`already-merged` の回復は新規マージではないので封筒を要求しない。reason が `merged` でない辞退（`checks-not-green` など）の分岐は従来どおり merge-exec の reason を使う。

payload に入れるのは整数・固定語彙（verdict / stage / detail）・40 桁 16 進だけで、ruleset 名・context 名・App 名・PR のタイトルのような GitHub 由来の自由文字列は入れない（テストが外部由来の文字列を含む fixture で標準出力に出ないことを確かめる）。外部チェックの宣言（App の slug と context）は `--external` の引数文字列 1 つで渡し、封筒の `inputSha256` がそれを束縛する。

### 判定の対応（プロンプトの旧手順との同値性）

| 段階 | 判定語 | プロンプトの手順（移行元） |
|------|--------|--------|
| view | `head-moved`（取得失敗・HEAD sha の形式・OPEN でない・期待 sha の不一致）/ `pr-closed` / `wrong-target`（base 不一致・draft） | 手順 2 |
| g0 | `classic-unsupported`（required status checks が 0 件・取得失敗）/ `server-enforcement-missing`（Organization 継承・ruleset の取得失敗・`bypass_actors` が空でない・スレッド解消の強制なし・外部チェックの App ID + context の組が required に無い・client-only チェックあり・取得失敗）/ `issuer-unbound`（`integration_id` が数値でない・取得失敗）/ `checks-not-green`（束縛済み check-run が HEAD に未発行 = 一過性） | 手順 2b (i)〜(v-b) |
| checks | `checks-not-green`（総数 0・合格以外あり・終了コード 8 = pending あり〔一過性 = `err 0`。出力が解析できれば解析結果で、全件 green に読めても止める〕。8 以外の非 0 終了・時間切れ・解析失敗は取得失敗 = `err 1`） | 手順 3 |
| threads | `unresolved-threads` / `head-moved`（取得失敗） | 手順 4 |
| mergeable | `not-mergeable`（CONFLICTING のみ。UNKNOWN は止めない） | 手順 4 |
| external | `external-review-missing` / `checks-not-green`（cursor 以外の check-run が不合格） | 手順 4b |

移行時の手順との差は、各 ruleset の `enforcement` が `active` であることの検査を足した 1 点だけ（`evaluate` / `disabled` を通さない側にだけ厳しい。`ruleset-policy.md` の「strict 以外の必須構成」表の enforcement 行に対応）。

- **取得失敗・ページ不完全は合格に倒さない**: `gh` の非 0 終了（`--paginate` のページ途中の失敗を含む）・出力サイズ超過・時間切れ（1 回 25 秒・全体 100 秒、孫プロセスごと kill）・想定外の形（HTTP エラー本文が exit 0 で出た等）は、それぞれの段階の fail-closed の判定語と `err == 1` で返す。未解決スレッドは `hasNextPage` が真で `endCursor` が無ければ打ち切らず取得失敗にする。
- **`strict_required_status_checks_policy` は読まない**（`ruleset-policy.md`）。
- **HEAD sha の出所**: スクリプトが `gh pr view` で 1 回取得して固定し、封筒で返す。エージェントはその値だけを `--match-head-commit` に使う。ホストが opt-in ゲートの確認値を持つときは `--expect-sha` で束縛し、不一致は `head-moved`。`--repo` は任意引数（`args.repo` を持つラン）で、持たないランは `observe-pr.sh` と同じく cwd のリポジトリに解決する。

### 静的ガード

G0 は適用 ruleset の `bypass_actors` を読むため `gh_api "${repo_path}/rulesets/${id}" || …` の 1 行が `/rulesets` を含む。`script-static-guard` の「ruleset / リポジトリ設定」パターンは `/rulesets` を設定変更の経路として拒否するので、**この 1 行の形（`/${id}" ||` が続く GET）だけを許す**。許す行が `merge-gate.sh` 以外に無く形が 1 つであること、`gh_api()` ラッパーの本体が `run_timed "${gh_timeout}" gh api "$@"` の 1 形（メソッド指定を含まない。変数でメソッドを切り替えると `/rulesets/${id}` が DELETE になり得るため）であることは専用テストが固定する。書き込み（`-X`・`--method`・`-f` による暗黙 POST）は別のパターンが拒否する。`EXCLUDED`（除外リスト）と `merge-guard-hook.sh` は変更していない。

### この弾の検証範囲

テストが固定している事実: 判定の表・偽 `gh` を差し替えたスクリプト全体・ホストの封筒照合・プロンプトの配線、変異（危険側 38 件）。**`autoMerge: true` の実ランでは未検証**: 実 GitHub の ruleset / App に対する G0 の通過、`gh pr checks --json state --jq` の実出力と終了コード（pending で 8 を返すかは未確認。8 は一過性の `checks-not-green`、それ以外の非 0 終了は取得失敗で、どちらも合格に倒さない。exit 0 で PENDING が混じっても `checks-not-green`）、隔離 worktree からの `run-verified.sh` 経由の起動。`apps/<slug>`（外部チェック App の ID 取得）は GitHub 側がリポジトリに束縛できないグローバルな endpoint で、他の `gh` 呼び出しがすべて対象リポジトリを明示するのに対する唯一の例外である。

## 第 7 弾: worktree の破棄・掃除（`worktree-remove.sh`）

### 位置づけ: 確認と削除を同じプロセスで行う

掃除プロンプト（merged・置き換え・Recover の continue / discard）と最終スイープは、登録の確認・lock の扱い・汚れの確認・`git worktree remove`・ブランチ削除を `scripts/worktree-remove.sh`（判断は `lib/worktree-remove-lib.sh` の純関数）の 1 回の呼び出しに置き換え、**確認した状態のまま同じプロセスで削除する**（Issue #603 第 7 弾。別エージェントの `verifyDiscardSafety` と `DISCARD_SAFETY_SCHEMA` は廃止）。`wipCommitted` の自己申告ゲートはホストに残る。

封筒は使わない。ホストが読む値は掃除エージェントの返却値（`ok`）に `retained`（worktree が残ったか）と `branchSha` を足したもので、削除の可否はスクリプトの中で閉じる（結果の値をマージ・push・設定変更の判定に採用しない）。ホストは `retained` が真のパスを「削除成功」に数えず（残置バイトの実測から外さない）、スイープの `removed` は候補集合と突き合わせて候補にないパスを数えない。

### モード

| モード | 使う場面 | 汚れ | submodule | ブランチ |
|--------|----------|------|-----------|----------|
| `superseded` | マージ済み・置き換え済み（fix の旧 worktree）・最終スイープ | 汚れていても `--force` で消す（件数を結果に記録） | 未記録の変更（追跡の変更・未追跡・新コミット）があれば保持 | 触れない |
| `discard` | Recover の continue / discard | 汚れていれば保持。`--force` は使わない | 初期化済み（`submodule status` の先頭が `-` でない・または worktree 専用の `modules` に残りがある）なら保持 | `--branch` があれば、worktree が無くなったあとでだけ消す。消す前の先頭 sha を結果に出す。base と同名は消さない |
| `sweep` | ラン終了時 | `superseded` と同じ規則を候補ごとに適用 | 同左 | 触れない |

- **汚れの確認は `git -C <worktree> -c core.excludesFile= status --porcelain=v2 -uall --ignore-submodules=none`**。利用者の `status.showUntrackedFiles=no` や `diff.ignoreSubmodules=all` に左右されない形で、素の `git status --porcelain` が空でも未追跡が残り、`--force` なしの `git worktree remove` もその未追跡を黙って消す（実測 git 2.54）。`-c core.excludesFile=`（空値）で、利用者のグローバルの除外ファイル（`core.excludesFile` の設定先と、未設定のときの既定 `~/.config/git/ignore`）を外す: そこに載せた `.env` や `*.secret` などの未追跡ファイルは、素の status では見えないが、削除すれば失われるため汚れに数える（`--ignored` は見ない: `node_modules`・`dist` のような再生成できる物で常に保持になるのを避ける）。リポジトリの `.gitignore` と `.git/info/exclude` に載った ignore 対象（`node_modules`・`dist` 等）は従来どおり汚れに数えず、中身ごと消える。**この判断で残る限界**: リポジトリの `.gitignore` に載ったファイル（たとえばコミットしない `.env` をリポジトリ側で無視している場合）・`skip-worktree` / `assume-unchanged` を付けた追跡ファイルの変更・どのブランチからも辿れない detached HEAD のみのコミットは、汚れとして見えず（または保持の対象にならず）、消える。`git -C` の対象が worktree 自身であること（`rev-parse --show-toplevel` の実体の一致）を確かめ、`.git` が壊れて git が親の repo を見る場合は汚れを確認できなかった（-1）として保持する。
- **lock は Claude Code の形で、lock した側が死んでいるときだけ外す**。形は `claude agent|session <名前> (pid N)` と `claude agent|session <名前> (pid N start <LC_ALL=C TZ=UTC ps -o lstart= の出力>)`（書式の例: `claude agent agent-0123456789abcdef0 (pid 12345 start Mon Jan  1 00:00:00 2026)`。Claude Code 側の照合は `/^claude (?:agent|session) .{1,255} \(pid (\d{1,10})(?: start (.{1,255}))?\)$/` で、スクリプトの解析も同じ範囲に揃えた）。死んでいる = 死亡を**肯定的に**確定できた（観測のうち少なくとも 1 つが「存在しない」と言い、どれも「存在する」と言わない。観測は `kill -0`〔`LC_ALL=C` のエラーが `No such process` = 無い、成功・`Operation not permitted`〔EPERM〕= ある、それ以外 = 判定不能〕、`ps -p`〔自分の pid が見える自己確認が通ったうえで終了コード 1・出力空 = 無い。ps が無い・失敗・自己確認が通らないときは根拠にしない〕、`/proc/<pid>`〔`/proc/self` が見える環境でだけ、無ければ無い〕。判定は `lib/worktree-remove-lib.sh` の `wr_pid_state`〔alive / dead / unknown。unknown は保持〕）、または `start` があって現在のプロセスの `LC_ALL=C TZ=UTC ps -o lstart= -p N` と一致しない（pid の再利用。比較は空白の連なりを畳んで行う）。開始時刻の `ps` が無い・失敗した・出力が空のとき、および生死の観測がすべて判定不能（EPERM のみ・ps が使えず /proc も無い・未知の kill のエラー）のときは、観測できないので生存扱い（保持）に倒す。**この pid は agent ごとではなく、セッション（メインの `claude` プロセス）の pid** なので、同じセッションの中から実行すると lock は常に生存と判定されて保持になる（外れるのは、そのセッションが終わったあとの実行だけ）。それ以外の形の lock（利用者が手で付けたもの・理由なし・`start` が空など形が違うもの）は外さず、`retained-locked` として保持する。
- **メイン worktree（`git worktree list --porcelain` の先頭エントリ・実体のパスの一致）、登録されていないパス、カレントがその中にあるパスは消さない**。`rm -rf` は持たない（消せなかったものは次回のスイープか手動に任せる）。
- **ブランチ削除は `git branch -D -- "${branch}"` の 1 形**。worktree が残っている間は消さない（`keep`）。削除後の `git reflog --all` に WIP コミットは残らない（gc までの到達不能オブジェクトとして残るだけ）。復元の手がかりは結果の `branchSha` で、ホストはそれをログに残す（40 桁の 16 進だけを受け入れる）。
- **結果語の `main` と `cwd`**: `main` はメイン worktree を指していたとき、`cwd` はカレントディレクトリが対象の worktree の中にあったとき（消さない）。どちらも `ok: false`・`retained: true` だが、原因が違うので語を分けた（ホストが読むのは `retained` だけで、語の分類はしない）。`branchSha` は、ブランチの削除に失敗したとき（`branch: failed`）は空にする（「削除前の先頭 sha」ではなく「消えずに残った先頭」なので、復元の手がかりとして出さない）。
- ok の定義: `superseded` は worktree が残っても非致命（`retained: true` で区別する。メイン worktree を指していた場合・カレントがその中だった場合だけ異常で `ok: false`）。`discard` は worktree が無くなり、ブランチも（指定があれば）消えた（または元から無い・base と同名）ときだけ `ok: true`。保持は `ok: false`・`retained: true`・StructuredOutput は返っているので、ホストの終端は `blocked` ではなく `failed`（旧「安全確認が dirty → 保全して failed」と同じ）。

### 静的ガード

`script-static-guard` は `git worktree remove` / `unlock` を `git push` と同じ**行単位の許可形**で扱う: `git -c core.fsmonitor=false worktree remove -- "${path}"`・`git -c core.fsmonitor=false worktree remove --force -- "${path}"`・`git -c core.fsmonitor=false worktree unlock -- "${path}"`（後ろに `>/dev/null 2>&1 || rc=$?`。`-c core.fsmonitor=false` は下の「付属 worktree の中の git の照合」の補助策で、欠けた形・値の違う形・別の `-c` を足した形は拒否する）だけを許し、`git worktree move` は常に拒否する。`git branch` の削除・上書き・改名（`-d` / `-D` / `-f` / `-M` / `-m` / `-C` / `--delete` / `--force` / `--move`。短縮の連結・長いオプションの省略形・引用符つきを含む）は禁止し、`git branch -D -- "${branch}"` の 1 形だけ許す。`git update-ref` は `git branch` の検査をすり抜ける経路なので、`base-merge.sh` と `pr-push.sh` が作業用 ref を片付ける `git update-ref -d "${base_ref}"` / `"${branch_ref}"` の 2 形（変数は `refs/worktree/…` の固定値だけを持つことを専用テストが固定）以外を拒否する。テストが固定する事実: 許可形が `worktree-remove.sh` にしか無く決まった行（remove 2 形・unlock 1 形・branch -D 1 形）だけが存在すること、`rm` の再帰削除の禁止、`worktree-remove.sh` に `rm`・`git clean`・`git reset`・`git checkout`・`git stash` が無いこと。除外リストと `merge-guard-hook.sh` は変えていない。

### 既知の挙動（旧プロンプトとの差）

- **continue は discard と同じ `--mode discard`**: 初期化済み submodule や生きている agent の lock でも保持し、`failed` で保全する（保持 → `failed` の分岐は不変）。submodule を `update --init` する運用のリポジトリでは、continue が通らず手動の対処が要り得る。
- **sweep は状態ファイルの形（ちょうど 1 個の JSON 値で、`.items` がオブジェクト）を先に確かめる**。`jq` は空ファイル・空白だけの入力でも 0 終了するため、確かめないと保持対象が空のままスイープが進み `--force` で消し得る。形が違えば何も消さず `state-unreadable` で終わる。
- **discard で保持した（または結果が読めなかった）worktree は、ホストのメモリ上でも最終スイープの候補から外す**（`sweepHeldPaths`）。状態ファイルの保持対象（`failed` / `blocked` / `monitoring` が記録した worktree）は書き戻しの成否に依存し、continue / discard は先に `.worktree` を空にするため、failed の書き戻しが失敗すると保持対象から外れ、スイープが superseded の規則で `--force` 削除し得る。対策は二つ: (a) discard で `.worktree` を空にする更新を JSON マージに含めず、掃除エージェントの手順 2（worktree が無くなったときだけ空にする）に任せる、(b) 削除を確認できなかったパス（保持・結果なし・例外）を `sweepHeldPaths` に入れる（同じパスへの後の superseded の試みはその結果に従う）。
- **superseded の保持は非致命で、状態ファイルの `.worktree` は保持したパスを指したまま残る**（クリアは worktree が無くなったときだけ）。回収は最終スイープか手動で、保持の理由（lock・初期化済み submodule・照合の不一致・削除の失敗）はホストのログに出る。
- **`git worktree list --porcelain` の `locked` 行が出ない版の git では、lock された worktree を lock なしと読み**、`git worktree remove` が lock を理由に拒否して `failed`（保持）に倒れる（unlock は決して行わない）。どの版から `locked` が出るかは未確認で、実測は git 2.54 のみ。`/proc/<pid>` の確認は Linux 限定（macOS は `kill -0` と `ps -p`）。macOS で `ps` が使えず `kill -0` も判定不能な場合は死亡を確定できないので保持になる。
- **保持した worktree は残置の台帳（`ephemeralWorktrees`）へ事後に載せる**。台帳の不変条件は「台帳（+ ラン開始時の観測）は、物理的に存在しうる worktree を重複なく 1 件ずつ数える」。掃除の結果が「消えたと確認できない」（`retained` が真・結果なし・例外・状態マージ失敗による掃除スキップ）ときは、種別を問わず kind `retained` で載せ、バイトの再測定の対象に入れる。台帳・ラン開始時の観測・削除確認済みに既にあるパスは二重計上しない。載せた分（`retained`・`replacement`）は予約（`EPHEMERAL_KIND_MAX`）の差し引き（`recordedByIssue`・`LEDGER_ONLY_KINDS`）に数えない。予約は変えない: 正常に終わった fix の旧 worktree は通常 lock されておらず消えるので、保持は稀（実行中のエージェントの worktree・クラッシュで lock が残り pid が unknown・初期化済み submodule）で、全イシューの予約に積むと着手を無用に絞る。後から消えても台帳の件数は戻さない（過大側 = fail-closed）。
  - **置換（fix。旧を消して新しい worktree に置き換える経路。呼び出し側が `options.replacementWorktree` に新パスを渡す）の計上は純関数 `planReplacementAccounting`（適用は `applyReplacementAccounting`）の 1 か所に集める**（Issue #624）。置換 1 回で物理的に増える本数は、旧が消えたことを確認できれば 0、確認できなければ 1。旧が消えたときは、旧が「数えられている」（判定は `isWorktreeCounted` 1 つ。台帳・ラン開始時の観測・`slotInheritedPaths` のどれか）なら件数を動かさず、新をバイトの測定対象（`slotInheritedPaths`）にだけ入れる（新パス不明なら `slotUnknownLiveCount` を増やし、バイトの再測定は物理一覧へ回す）。
  - 対応表: 旧が消えた・計上済み → 件数 0・新は測定対象へ / 旧が消えた・未計上 → 新を kind `replacement` で 1 件 / 旧が保持され計上済み → 新の 1 件 / 旧が保持され未計上 → 旧（`retained`）と新の 2 件 / 旧のパスが空（掃除を試みず、旧は消せていないものとして扱う）→ 新の 1 件。連続した fix でも台帳の件数は物理の本数を下回らない。
  - 引き継ぎ済みの新が後で `replacementWorktree` 無しの掃除に保持された場合は、台帳の 1 件が数えているので載せず、ラン終了時の「保持した worktree」の案内にだけ出す（`slotRetainedPaths`）。`replacement` は状態ファイルが追跡中の現行の実装 worktree なので、使い捨ての案内にも孤立スキャンの除外集合にも入れない（出すと未マージの成果の誤削除を誘う）。置換の呼び出しは fix の 2 経路（Review ループ・Merge ループ）と fallback の旧 worktree の掃除。置換で台帳の件数が増えないときは `remeasureResidualBytesIfDue` の契機にならないが、新規着手の直前は `remeasureResidualBytesNow` を直接呼ぶので、引き継いだ新のパスはそこで測る。
  - 最終スイープで消せなかった候補・スイープが例外で終わったときの候補は `retained` で載せる（消せた候補は削除確認済みにして測定の対象から外す）。ラン終了時の案内は、`retained`（汚れ `retained-dirty`・lock `retained-locked`・submodule の変更 `retained-submodule` のいずれかで消さなかったもの。中身を確認してから手動で対処）を使い捨て（`git worktree remove` で手動削除してよい）と別の見出しにする。返却値は `ephemeralWorktrees`（使い捨て）と `retainedWorktrees`（保持）に分ける。
- 新しい lib を足すと **全スクリプトのハッシュが変わる**（`run-verified.sh` は lib 全体をハッシュに含める）。別のスクリプトを並行して変更している作業は `SCRIPT_SHA256` の表・生成物・`script-static-guard.test.mjs` で競合するので、後からマージする側は再ビルドが要る。

### この弾の検証範囲

テストが固定している事実: 判断の表、実 git のサンドボックス（clean・追跡変更・staged・未追跡・入れ子の独立 repo・ignore のみ・`showUntrackedFiles=no`・グローバルの除外ファイル・`ignoreSubmodules` 設定・submodule の各状態・lock〔生存 pid / 死んだ pid / `start` の一致・不一致〔pid の再利用〕・`ps` の失敗・EPERM・`kill -0` の判定不能・`session` 形 / 他形式〕・実体なし・メイン worktree・未登録パス・`.git` 破損・空白を含むパス・ブランチの 5 状態・引数の誤り・sweep の保持照合と状態ファイルを読めない場合）を bash 3.2 と 5 で、ホスト配線（モード・引数の組み立て・`retained` の扱い・Recover の分岐・discard で保持したパスがスイープの候補に入らないこと）、変異（危険側 50 件）。**実ランの隔離 worktree からの `run-verified.sh` 経由の起動は未検証**で、`ps -p` / `kill -0` による pid の生死判定は同一ホストの agent を前提にする（別ホストの worktree を共有するランは想定しない）。

## 第 8 弾: monitor の CI 完了待ち（`observe-pr.sh --mode checks --until settled`）

### 位置づけ: 第 2 弾の観測の延長で、安全判定には使わない

monitor の CI 完了待ち（旧 `gh pr checks --watch`）を、第 2 弾の `observe-pr.sh` の `checks` モードに `--until settled` を足して置き換えた（Issue #603 第 8 弾）。**判定は助言的**で、位置づけは第 2 弾の節と同じである: monitor の出力（`ready` / `timeout` / `needs-fix` と件数）はマージ・クローズ・push・削除の可否に使われない（マージ可否は merge-exec が `merge-gate.sh` で再取得して判定する）。ホストが封筒を照合して採用するのは引き続きチェック総数だけ（手順 2 と 3e の `--until` を持たない checks の封筒）で、**`--until settled` の封筒は採用しない**。その封筒は `inputSha256` に `until` を含むため、転記されても `applyChecksObservation` が入力束縛の不一致（`input`）で採用せず、`checksTotal` を省略した fail-closed 経路に落ちる（テストが固定する）。

### 何をスクリプトにしたか

- check-run を `gh api --paginate`（全ページ）で、commit status を `/status`（`--paginate`）で読み、`lib/observe-checks-lib.sh` の純関数 `checks_classify` で「合格 / 未完了 / 不合格」に分類する。payload は既存の `checkRuns` / `statuses` / `total` に `passed` / `pending` / `failed` の 3 つの整数を足したもの（`--until` を付けた checks だけ。通常の checks の payload の形は変えない）。
- 分類は `merge-gate.sh` と同じ側に倒す。check-run は `(.conclusion // .status)` が `success` / `neutral` / `skipped` なら合格、`queued` / `in_progress` / `waiting` / `pending` / `requested` なら未完了、**それ以外はすべて不合格**（`failure` / `cancelled` / `timed_out` / `action_required` / `stale` / `startup_failure` と未知の語彙）。commit status は `success` が合格、`pending` が未完了、それ以外は不合格。combined status の最上位の `state` は使わない（status が 0 件でも `pending` を返すため）。形の違う入力は件数を出さず取得失敗にする（0 件に畳まない）。
- **重複排除と射影。** REST の `/commits/<sha>/check-runs` は古い check suite の `cancelled` を新しい `success` と並べて返す（実測: ある PR の head で REST 12 件・一意 7 件）。`gh pr checks`（`merge-gate.sh` が使う）は最新だけを見るので、揃えないと failed が誤って増え fix 予算を空費する。分類の前に、同じ `(app.id, name)` の check-run は `id` 最大の 1 件、同じ `context` の commit status も `id` 最大の 1 件に畳む（`checks_latest`。`id`〔数値〕か名前を持たない要素は畳まずそのまま数える）。件数・総数・payload の `checkRuns` / `statuses` も畳んだ後の数。`status` が未完了語彙の check-run は `conclusion` を持っていても未完了に数える。取得時に分類へ必要な `id` / `name` / `status` / `conclusion` / `app.id`（status は `id` / `context` / `state`）だけに射影し、JSON は `jq --argjson`（1 引数）ではなく標準入力で渡す（Linux の 1 引数 128 KiB 上限で、巨大な `output.text` を含む応答が E2BIG になるのを防ぐ）。
- **met は「未完了が 0 件」**。不合格があっても未完了が 0 なら met で、全チェックの完了を待つ（失敗を見つけても早く返さない）。総数 0 件も未完了 0 なので met（`total: 0`）で、0 件で待ち続けない。0 件の扱い（コンフリクト再判定 #479・3e の有界待機）は monitor の手順 3e が決める。

### 待ち時間の総上限（現行と同じ 40 分）

待ち時間の総上限は、旧 `gh pr checks --watch`（Bash の timeout 10 分 × 再実行 4 回）と同じおよそ 40 分である。1 回の起動は**壁時計 90 秒 + 数秒以内**（第 2 弾の仕組み: gh 1 回ごとに 25 秒の制限・グループごと kill・残りが 1 観測分に満たなければ始めない）にし、`--attempt` を 1 から増やして再実行させる。既定は**25 秒間隔・1 起動 4 観測・最大 30 回**:

- 1 起動の名目の所要 = 3 回の sleep（25 秒 × 3 = 75 秒）+ 4 観測の gh（1 観測あたり gh 3 回で数秒）= およそ 83 秒。壁時計上限 90 秒に収まる。
- 合計 = 83 秒 × 30 回 = およそ 41.5 分（壁時計いっぱいまで使った場合の上限は 90 秒 × 30 = 45 分）。gh が遅く 1 起動が早く切られるときは待ち時間が短くなる側にずれ、`exhausted` が早く出て `timeout`（次ラウンドの再監視）になる。
- **回数の上限はスクリプトが強制する**: `--attempt` は 1 以上 30 以下で、範囲外は exit 2（封筒なし）。既定値は `observe-pr.sh` の `env_int "${OBSERVE_PR_MAX_ATTEMPTS:-}" 30 40 1`（環境変数での引き上げは 40 まで）で、ホストの定数 `OBSERVE_CHECKS_SETTLE_MAX_ATTEMPTS`（プロンプトの「最大 30 回」）と一致することをテストが固定する。プロンプトは回数を書くだけで、書き換えても通らない。
- **既知の限界（第 2 弾と同じ）**: `--attempt` を進めずに同じコマンドを繰り返すこと、`--attempt 1` から何度でも始め直すことはスクリプトからは止められない（プロンプトの指示だけで強制される）。flaky の rerun（手順 3c の 1 回だけ）の後は `--attempt 1` から再監視する。
- 通常の `checks --wait`（手順 3e の「総数が 1 件以上になるまで」）の上限は従来どおり 7 回（およそ 10 分）で変えていない。

### 手順 3 で変えた点（`--watch` 時代との差）

- **観測状態の 3 状態（整合 / 確定 0 件 / 不整合）の判定入力は REST の 1 本**。不整合は「手順 2 の確定値が 1 件以上なのに手順 3 が met で total 0」と「手順 3 が取得不能（error・非 0 終了・JSON なし・`headSha` が空のまま exhausted）」。再取得（30 秒間隔・最大 3 回）と終端（`blocked` / `quality`。`ready` にも `timeout` にも 3e にも倒さない）がある。手順 2 が取得失敗で手順 3 も取得不能なら、状態 3 の再取得 → `blocked` / `quality`（fail-closed）。
- `exhausted`（`headSha` あり = 未完了が残ったまま待機上限）の扱いは状態 1 の「exhausted の規則」が唯一の定義で、`failed` が 1 件以上なら手順 3c の `needs-fix` を優先し、0 件のときだけ `timeout` にする（手順 b と 3e はこの規則を参照するだけで、3e → 手順 3 の往復後の `exhausted` も同じ）。
- 手順 3c の失敗原因の調査（`gh run view --log-failed`）は monitor の判断として残す。スクリプトは件数だけを返し、チェック名・ログは封筒に入れない（外部由来の文字列を入れない方針は第 2 弾と同じ）。

### この弾の検証範囲

テストが固定している事実: `checks_classify` の表・偽 `gh` を差し替えたスクリプト全体・ホストの封筒照合・プロンプトの配線、変異（危険側 19 件）。**実 GitHub の PR に対する実ランでは未検証**（`gh api --paginate` の `/commits/<sha>/status` が 100 件超の status を複数ページで返すときの合算、実際の check-run の `conclusion` 語彙、40 分規模の実待機を含む）。

## 第 9 弾: Recover の機械手順（`recover-prep.sh`）

### 位置づけ: 機械的な部分だけを移し、判断はエージェントに残す

`recoverPrompt` の機械的な部分 — worktree の HEAD からのブランチ解決・未コミット変更の WIP コミット・`origin/<base>` の取得・base との差分の有無 — を `scripts/recover-prep.sh`（判断は `lib/recover-prep-lib.sh` の純関数。汚れの行数と入力検証は `lib/worktree-remove-lib.sh` を再利用）の 1 回の呼び出しに置き換えた（Issue #603 第 9 弾）。**継続か破棄かの判断と、回復ブリーフ（done / remaining / broken）の作成はエージェントに残る**。スクリプトはブランチの削除・worktree の削除・push・マージをしない（削除は `worktree-remove.sh`）。エージェントは結果の行の `branch`・`worktreeMissing`・`wipCommitted` を返却へ写す（`RECOVER_SCHEMA` は不変）。

### 封筒を使わない理由（判断）

ホストが `wipCommitted` を**削除の第 1 層のゲート**に使う（`wipCommitted !== true` なら掃除エージェントを起動せず `failed` で保全する）ため、封筒が要るかを検討した。結論は**不要**:

- 削除の実効のゲートは第 2 層、つまり第 7 弾の `worktree-remove.sh --mode discard` が**削除と同じプロセスで**行う独立観測（`git -c core.excludesFile= status --porcelain=v2 -uall --ignore-submodules=none` が空、初期化済み submodule なし、`--force` なしで削除、lock が生きていれば保持）。`wipCommitted: true` を偽ってもこの層は破れず、未退避の変更があれば `retained-dirty` で保持される。第 1 層は「退避に失敗したと分かっているなら掃除エージェントを起動すらしない」という早期の安全側の打ち切りで、偽の `true` を通しても失うものは無い（第 2 層が止める）。
- 偽の `false`（本当は退避できているのに `false`）は保全側（`failed`）に倒れるだけで、データは失われない。
- `branch` と `worktreeMissing` は従来もエージェントの自己申告で、ホストは `isValidBranchName` と `worktreeAlive` の規則で受け取る。ブランチの削除は第 7 弾が「worktree が無くなったあとでだけ・base と同名は消さない」で閉じ、さらに `--path` と `--branch` を両方渡す discard は、**削除の前に同じプロセスで worktree 自身の HEAD（`git symbolic-ref -q --short HEAD`。toplevel がその worktree だと確かめた後）を読み、`--branch` と違えば（detached を含む）`retained-branch-mismatch` で worktree もブランチも消さない**。エージェントが無関係なブランチ名を返しても、その名前のブランチも別の worktree も消えない（結びつけの根拠は申告ではなく削除と同じプロセスの観測）。dead worktree〔実体が無い〕と `--path` なしの残骸は読む HEAD が無いので従来どおり。この弾で新しく採用する値は無い。
- 封筒を付けても、悪意あるエージェントが `sha256sum` を回して作れる範囲（第 1 弾の「何を防がないか」）に収まり、得られるのは転記ミスの検出だけである。ホストの検証を増やす代わりに、第 2 層を実効のゲートとして据え置くほうが堅い。

なお、ホストが `wipCommitted` を**唯一の**削除条件に使う設計に将来変えるなら、そのときは封筒を付ける（この弾では変えない）。`diff`・`commitsAhead`・`baseSha` などはエージェントの判断材料で、ホストは読まない。

### 結果の行（固定語彙・真偽・件数・40 桁 16 進の sha と検証済みのブランチ名）

`{"resolved","reason","branch","source","worktreeMissing","wip","wipCommitted","dirty","branchExists","branchSha","baseFetched","baseSha","diff","commitsAhead","filesChanged"}`。

- **ブランチ解決（`rp_resolve`）**: live（`git worktree list` に登録済みで、`rev-parse --show-toplevel` の実体が対象のパスと一致）なら worktree の HEAD（`git symbolic-ref -q --short HEAD`）を使う。state のブランチと食い違えば HEAD を優先する（WIP が積まれるのは HEAD 側）。dead（パスが存在しない）と branch だけの残骸は記録されたブランチを使う（無ければ `branch: ""` で確定し、継続不能 = discard。記録されたブランチが base と同名なら live と同じく `base-branch` で確定しない）。**確定しない**（`resolved: false`・何も書かない）: メイン worktree（`main-worktree`）、登録されていないパス（`not-registered`）、パスはあるが git がそのパス自身を指さない（`toplevel-mismatch`。`.git` が壊れて git が親の repo を見る場合に、メインの変更を WIP コミットしてしまうのを防ぐ。実体があるので dead 扱いにもしない）、detached HEAD（`detached`）、HEAD が base と同名（`base-branch`。base に WIP を積むと discard で消せず continue は壊れる）、worktree の一覧を取れない（`list-failed`）。
- **WIP コミット**: 汚れの観測は第 7 弾と同じ対象の `git -C <worktree> -c core.excludesFile= status --porcelain=v2 -z -uall --ignore-submodules=none`（利用者の `status.showUntrackedFiles`・submodule の ignore 設定・グローバルの除外ファイルに左右されない）。**`-z`（NUL 区切り）で読む**: 区切りなしだとパスが C 引用で出て、入れ子の git リポジトリの検出（`? パス/`）が取りこぼされ、gitlink だけを WIP コミットして `wipCommitted: true` になり得る。シェル変数は NUL を持てないので、`tr` で改行→`?`・NUL→改行（パス中の改行が行区切りと紛れない）に変えて 1 レコード 1 行にし、rename / copy レコードの直後の元のパスは落とし、git の終了コードは末尾の `GITRC=` の行で受ける。`worktree-remove.sh` は行数と第 3 フィールドだけを読み、引用は件数・submodule 判定に影響しないので `-z` なし。フックを通す（`--no-verify` なし。stdin は `</dev/null`、フックの出力は標準エラーへ送って標準出力の最後の 1 行を結果に保つ）。**退避完了（`wipCommitted: true`）の根拠はコミットの終了コードではなく、コミット後の同じ観測が空であること**（`rp_wip_after`）。さらに**成功の終了コードでも、HEAD が進んでいない・進んだが前の HEAD との差分が空（フックが commit のあとで `reset --hard` などで変更を捨てた。汚れは無く見える）なら `empty-commit`・`false`**。マージ・cherry-pick・revert・rebase の途中（`MERGE_HEAD` / `CHERRY_PICK_HEAD` / `REVERT_HEAD` / `REBASE_HEAD` と `rebase-merge` などのディレクトリ）は未マージと同じく触らず `in-progress`・`false`。フックが拒否した（`commit-failed`）・フックがファイルを書き換えた／グローバルの除外に載った未追跡ファイルが拾われずに残った（`residual-dirty`。ほかにコミットできる変更があって commit は成功したとき。汚れがその未追跡ファイルだけだと `add -A` が何も拾わず commit が「nothing to commit」で失敗するので、フックが走っていなくても `commit-failed` になる）・submodule 内の未コミットの変更が残った（`submodule`。汚れが submodule だけで commit が失敗した場合も同じ語）・観測できなかった（`unverified`）は `false`。拒否されたときの `git add` は戻さない（staged も worktree-remove.sh が汚れとして保持する）。コンフリクト中（`unmerged`。`add -A` はマーカー入りの内容を確定させてしまう）と入れ子の独立 git リポジトリ（`nested-repo`。`add -A` は中身ではなくポインタだけを記録し、worktree を消すと中身が失われる）は触らず `false`。退避の対象が無い（dead worktree・branch だけの残骸）は `skipped`・`true`。
- **初期化済み submodule の扱い**: submodule の中は観測せず、初期化済み submodule があれば WIP コミットを作らずに `wip: submodule`・`wipCommitted: false`（変更の有無によらない。下の「付属 worktree の中の git の照合」）。discard の可否は第 7 弾の `--mode discard` が「初期化済み submodule があれば保持」で判定する。
- **base の取得と差分**: `git fetch origin refs/heads/<base>:refs/remotes/origin/<base>`（旧プロンプトと同じ共有の追跡 ref。保存先を明示する。Issue #361）の成否を `baseFetched` に出し、成功したときだけ `git diff --quiet --no-ext-diff --ignore-submodules=none <baseSha>...<branchSha>`（利用者の `diff.ignoreSubmodules` で submodule ポインタだけの変更が `empty` にならないよう固定する）の終了コード（0 = `empty`、1 = `nonempty`、他 = `unknown`）で差分を判定する。**取得に失敗したら `unknown`（`empty` にしない）**: 古い追跡 ref が残っていてもそれで判定しない。`empty` は discard の根拠になるため、プロンプトは `unknown` を「差分が空とは見なさず、branch の内容を直接読んで判断する」と指示する。ブランチが実在しない（`branchExists: false`）ときも `unknown`。`nonempty` のときは先行コミット数（`commitsAhead`）と変更ファイル数（`filesChanged`）も出す。
- 出力にパス・フックの出力・外部由来の文字列を入れない（ブランチ名は `wr_valid_branch` を通ったものだけ。診断は標準エラーへ）。結果を出せたときは、失敗や未確定を含めて exit 0。使い方の誤りは exit 2（結果の行なし）、git が無ければ exit 3。

### 静的ガード

`git add` / `git commit` が `scripts/` に現れるのはこのスクリプトだけで、既存のパターン（`--no-verify`・`git commit -n`・フック無効化）はそのまま効く。**行単位の許可形**は `git -C "${path}" add -A >&2 && git -C "${path}" commit -q -m "chore(recover): 中断時の未コミット変更を退避" </dev/null >&2 || crc=$?` の 1 行だけで、`git -C "${path}"` で対象を明示しない形・別のパス・メッセージの変更・フラグの追加・引用符つきの `git` / サブコマンドはすべて拒否する。テストが固定する事実: 許可形が `recover-prep.sh` にしか無く 1 行だけであること、`recover-prep.sh` にブランチ削除・`reset`・`checkout`・`clean`・`stash`・`push`・`merge`・`rm` が無いこと、`git worktree` が `list --porcelain` だけであること、`git fetch` が `refs/remotes/origin/` へ保存する 1 形だけであること、`update-ref` の許可形が下の 2 形だけであること。除外リストと `merge-guard-hook.sh` は変えていない。

### 既知の挙動（旧プロンプトとの差）

- **WIP のコミット件名は固定の `chore(recover): …`**。type を `feat|fix|perf|refactor|test|docs|build|ci|chore` に限る commit-msg フックを通る。`scope-enum` で scope を限定するリポジトリでは拒否され得て、その場合は `commit-failed`（`wipCommitted: false`）→ `failed` で保全される（Issue #718）。
- **汚れの観測は第 7 弾と同じ厳しさ**（グローバルの除外に載った未追跡ファイルも汚れに数える）。そのため最初から `residual-dirty`・`false` で保全し、第 7 弾の `--mode discard` の保持と結末が同じになる。
- **メイン worktree・未登録・不一致のパスを渡されたとき**は何も書かずに `resolved: false`（メインや無関係な repo に WIP コミットを積まない）。
- **lock は見ない**: 生きた agent の lock が付いた worktree にも WIP コミットを積む（`locked` 行は読まない）。lock の扱いは削除側が担い、`worktree-remove.sh --mode discard` が生きたセッションの lock を `retained-locked` で保持する（WIP コミットは lock の有無によらずブランチに残るのでデータは失われない）。この pid はセッション（メインの `claude` プロセス）の pid なので、同じセッション内の再実行では lock が常に生存と判定される。ここで lock を理由に WIP を拒むと同一セッション内の Recover が成り立たなくなるため入れない。
- **ホスト側の引数の検査**: `--base`・`--worktree`・`--branch` はホストの `sanitizeBranch` / `sanitizeWorktreePath`（どちらも `worktreeQuote` の許可文字の部分集合）を通った値で、`worktreeQuote` が例外を投げる経路は無い（`baseBranch` が不正なら起動時の `sanitizeBranch` で既に停止している）。
- **base の取得は共有の追跡 ref**（`refs/remotes/origin/<base>`）へ書く。並列に走る Recover が同じ ref を更新し得るが、git の ref ロックで直列化され、どちらも最新の base に進むだけで害は無い（`base-merge.sh` / `pr-push.sh` が worktree ごとの ref を使うのは、取り込む側が取得した sha に固定する必要があるため。この弾は読み取りの判定だけで、sha を結果の `baseSha` に固定して使う）。
- **detached の取り込み（Issue #731）**: live で detached の worktree は、`rp_detached_plan` が `adopt` を返したときだけ（状態のブランチが実在・base と同名でない・どの worktree も未使用・途中状態でない・`git rev-list --count HEAD..branch` が 0 = ブランチ先端が HEAD の祖先または同一）付け直す。`git update-ref "refs/heads/${adopt_branch}" "${adopt_head}" "${adopt_tip}"` の旧値指定は、検証から更新までの間の競合を検出するだけである（非 fast-forward の拒否は祖先関係の事前検証が担う）。worktree の付け直しは、旧値を検証しない `git symbolic-ref` ではなく、HEAD の旧値（oid）を指定した `printf 'start\nverify refs/heads/%s %s\nsymref-update HEAD refs/heads/%s oid %s\nprepare\ncommit\n' ... | git -C "${path}" update-ref --no-deref --stdin` の 1 トランザクションで行う（HEAD やブランチが観測した oid から動いていれば `verify` が失敗して全体を git が拒否し、HEAD は detached のまま保全される。symref-update を持たない git 2.51 未満では失敗して保全する）。ref 更新の前後には HEAD が観測した oid のままかも確認する。結果の行の `detached` は `none` / `attached` / `failed` / 取り込まなかった理由の語。静的ガードはこの 2 形（旧値つきの `update-ref` と `symref-update` の `update-ref --stdin`）を `recover-prep.sh` 専用の許可形として固定し、`git symbolic-ref` の書き込みは一切拒否する（`update-ref -d` の許可形は `base-merge.sh` と `pr-push.sh` だけ）。
- **使用中ブランチの解放（Issue #755）**: 握り手の解放は `update-ref` を使わない（git は同じ HEAD の `symref-verify` と更新を 1 トランザクションに入れられない）。握り手の git ディレクトリの `HEAD.lock` を排他作成した下で HEAD が `ref: refs/heads/<branch>` のままか・先端と一致するかを確かめて `mv -f` で確定する（git 自身の更新も同じロックを取るので、確認と書き込みの間の切り替えは起きない。files ref バックエンド以外は保全）。この書き込み行が `recover-prep.sh` の 1 か所だけであることを静的ガードで固定する。解放できるのは lock の pid が終了済み、またはスクリプトの祖先（このランのセッション）の握り手だけで、稼働中の別セッションは保全する。`--mode free` の結果（`detached` の `freed` / `none` / `in-use` / `failed` / `no-ref` / `base-branch`）は助言的で、ホストは読まない。握り手を解放するかどうかは、スクリプト自身が同じプロセスで clean・lock の形・HEAD = 先端・途中状態なしを観測して決める。
- 新しい lib を足すと全スクリプトのハッシュが変わる（第 7 弾と同じ。後からマージする側は再ビルドが要る）。

### この弾の検証範囲

テストが固定している事実: 判断の表（`rp_resolve` 19 行・`rp_scan_status`・`rp_wip_plan`・`rp_wip_after`・`rp_wip_ok`・`rp_diff_state`・`rp_is_sha`）、実 git のサンドボックス（clean・追跡変更・staged・未追跡・混在・ignore のみ・`showUntrackedFiles=no`・グローバルの除外・フックの拒否 / 書き換え・コンフリクト中・入れ子の独立 repo・submodule〔clean・内部の変更・`diff.ignoreSubmodules=all` 下〕・観測不能・state との食い違い・dead worktree・branch だけの残骸・ブランチ不在・detached・メイン worktree・未登録パス・`.git` 破損・HEAD が base と同名・差分の件数・打ち消しコミット・base の取得失敗〔古い追跡 ref あり〕・base 不在・引数の誤り・cwd がリポジトリの外・run-verified.sh 経由）を bash 3.2 と 5 で、ホスト配線（コマンドの組み立て 3 形・手作業の文章が残っていないこと・第 1 層 / 第 2 層のゲート）、変異 25 件。**実ランの隔離なし（メイン checkout）の Recover エージェントからの `run-verified.sh` 経由の起動は未検証**で、`git fetch` は実 GitHub に対して実行していない（ローカルの bare リポジトリのみ）。フックは `pre-commit` のみ実測し、`commit-msg`（commitlint）・`prepare-commit-msg` は未実測。

## 付属 worktree の中の git の照合（`worktree-remove.sh`・`recover-prep.sh`）

### 何を塞ぐか

`worktree-remove.sh`（`worktree:absent`・`worktree:sweep`・掃除の `remove`）と `recover-prep.sh --mode free`（`free:#N`）はサンドボックスの外で直接実行される。実装エージェントは自分の worktree と `<共通ディレクトリ>/worktrees/<名前>/` を書けるので、`commondir`・worktree の `.git`（gitdir 行・ディレクトリへの置き換え・シンボリックリンク）・`config.worktree`・初期化済み submodule の `.git` を偽の git ディレクトリへ向け、そこの config（`core.fsmonitor` など）に置いたコマンドを、スクリプトが呼ぶ素の `git -C <worktree> status` 等に実行させられた。`-c core.fsmonitor=false` のようなフラグだけでは、git が読む設定の全体（submodule の filter など）を列挙して打ち消せないので、主対策はフラグではなく git を呼ぶ前の照合とする。

### 照合（`lib/worktree-remove-lib.sh` の `wr_gitlink_check`）

worktree の中で git を呼ぶ前に、git を使わずファイルの読み取りだけで次を確かめる。1 つでも外れたら git を呼ばない。

- 信頼する共通ディレクトリは、カレントのリポジトリに対する最初の git より前に、ファイルだけで求める（`wr_trust_cwd`）。カレントから上へたどって最初に `.git` を持つディレクトリ（`wr_find_top`）から `wr_main_common` が求め、求められたときだけ git の見る root（`rev-parse --show-toplevel`）がそれと同じかを確かめる（git の探索とずれていれば信頼しない）。カレントの `.git` が偽なら、git は一覧や ref の読み取りでもその偽の共通ディレクトリの config とフックを使うので、求められなければ git を 1 回も呼ばない（`--mode free` を含むどのモードも）。メイン worktree なら `.git` が実ディレクトリで `commondir` を持たないときのその `pwd -P`。ランを付属 worktree で起動したセッション（カレントが付属 worktree）なら、`.git` ファイル → git ディレクトリ → `commondir` で求めた共通ディレクトリが `commondir` を持たず、カレント自身が下の照合に通るときのその共通ディレクトリ（カレントの `.git` と git ディレクトリは、メインの場合の `.git/config` と同じくランの非隔離側の場所で、隔離 worktree のエージェントが書ける `<共通>/worktrees/<自分の名前>/` とは別）。求められない（リポジトリの外・照合の不一致・`--separate-git-dir` のメイン）なら空で、カレントのリポジトリの一覧・ref の読み取りを含めて git を呼ばず、付属 worktree の中の git・remove・prune・ブランチの削除・`recover-prep.sh` の処理全体（`--mode free` を含む）を行わない。
- worktree の `.git` がシンボリックリンクでない通常ファイルで、ちょうど 1 行（末尾の改行は任意・CR / NUL なし・4096 バイト以下）の `gitdir: <パス>`。1 行の読み取り（`wr_read_one_line`。`commondir`・逆向きの `gitdir`・握り手の `HEAD` も同じ）は、NUL の有無を元のバイト列で数え（`tr -d '\000'` 後のバイト数と `wc -c` の一致）、末尾の余分な 1 バイトは実際に `\n` であることを確かめる。bash 5 の `read` は NUL を黙って読み飛ばし、git は NUL の手前までを使うので、『偽<NUL>/../本物』（末尾改行なし）の行はバイト数の照合だけでは本物に見えて通ってしまう（bash 3.2 の `read` は NUL で行を切るので長さの照合で落ちる）。
- そのパスの実体（相対パスは worktree からの解決）が `<共通>/worktrees/<名前>` の直下。
- `<gitdir>/commondir` が 1 行で、その実体が共通ディレクトリと一致。
- `<gitdir>/gitdir`（逆向き）が 1 行の `<…>/.git` で、その親の実体が worktree と一致。
- `<gitdir>/config.worktree` が無い（`extensions.worktreeConfig` の有無によらず拒否する）。

`--mode check-absent` が `--repo-root` をカレントのリポジトリと突き合わせる `wr_repo_matches` も同じ照合（`.git` が実ディレクトリなら `wr_main_common`）に置き換え、`--repo-root` の中では git を呼ばない（修正前もここは `rev-parse` だけで、コマンドの実行には至らなかった）。

### 外れたときの結果（既存の語）

| スクリプト | 対象 | 結果 |
|-----------|------|------|
| `worktree-remove.sh` | remove（superseded・discard）・sweep | `retained-broken`（削除しない・ブランチも消さない） |
| `worktree-remove.sh` | check-absent の `--repo-root` | `unknown` |
| `recover-prep.sh` | 回復対象の worktree | `resolved: false`・`toplevel-mismatch`・`wip: skipped` |
| `recover-prep.sh` | `--mode free` の握り手 | `in-use`（解放しない） |
| `recover-prep.sh` | 信頼する共通ディレクトリを求められない | `list-failed`（`--mode free` は `detached: failed`） |
| `worktree-remove.sh` | 信頼する共通ディレクトリを求められない | remove・sweep は `retained-broken`、ブランチは `keep`、check-absent は `unknown`、prune はしない |

### 補助策

- worktree の中の git には `--no-optional-locks -c core.fsmonitor=false` を付ける（照合の後の多重防御）。削除の `git worktree remove` / `unlock` には `-c core.fsmonitor=false` を付ける（静的ガードが形を固定）。
- submodule の中へ降りない: 汚れの観測は `--ignore-submodules=all`、`git submodule status` は使わない。初期化済み submodule（`ls-files -s` の gitlink のうち `<パス>/.git` があるもの、または `<gitdir>/modules` が空でない）は中を観測できないので、`worktree-remove.sh` は superseded でも `retained-submodule` で保持し、`recover-prep.sh` は WIP コミットを作らず（親の `add`・`commit` も submodule の中を観測する）`wip: submodule`・`wipCommitted: false` にする（従来は superseded で消し、clean なら `wip: none`、親の変更は WIP に積んでいた）。worktree は削除側が保持するので、親の変更も消えない。
- HEAD の付け直しの `update-ref --stdin` を含め、worktree の中で呼ぶ git にはすべてこのフラグを付ける。付けないのは形を静的ガードが固定している WIP の `add`・`commit` の 1 行だけ（下の残る限界）。
- 削除の直前にもう一度照合し、`<共通>/worktrees/` の下にシンボリックリンクがあれば `git worktree remove` も `git worktree prune` もしない（両者はリンク先の中身を消す）。prune を飛ばした件数は `pruneSkipped` に足す。
- `recover-prep.sh` は `GIT_DIR`・`GIT_WORK_TREE`・`GIT_COMMON_DIR`・`GIT_INDEX_FILE` を外す。
- `core.hooksPath=/dev/null` は付けない（静的ガードが `core.hooksPath` の綴りを一律に禁じており、照合後に呼ぶコマンドでフックを走らせるのは WIP コミットだけで、そこは `--no-verify` 禁止の方針どおりフックを通す）。`GIT_CONFIG_NOSYSTEM` も付けない（システムの設定はエージェントが書けない）。

### 残る限界

- メインの config にある相対パスの `core.hooksPath`（husky 等）は、WIP コミットのときに付属 worktree の中から解決されるので、エージェントが書けるフックが走り得る（フックを通す方針との両立は未解決）。
- WIP の `add`・`commit` の行は形が静的ガードで固定されていて `--no-optional-locks -c core.fsmonitor=false` を付けていない。照合からこの行までの間に設定をすり替えられる余地（TOCTOU）が残る。
- メインの `.git` が gitfile（`--separate-git-dir`）のリポジトリ、カレントが照合に通らないランは、保持・確定しない側へ倒れる。
- 管理ディレクトリをシンボリックリンクへ置き換える操作を実際のサンドボックスがエージェントに許すかは未確認（許す前提で塞いだ）。
- `pr-push.sh`・`base-merge.sh`・`reply-resolve.sh`・`observe-pr.sh` は直接実行されず、カレントが隔離 worktree のエージェントが起動するので、この照合の対象外。

### この節の検証範囲

`dev/implement-issue-tree/tests/worktree-git-harden.test.mjs` が、仕込み 7 種（commondir・gitdir 行〔余分な空行・相対パス〕・`.git` のディレクトリ・シンボリックリンク・`config.worktree`・偽の submodule）のそれぞれについて、`worktree-remove.sh`（superseded・discard・sweep）と `recover-prep.sh` の実行後にマーカーが無く worktree が残ること、素の `git status` ではマーカーが作られること（陽性対照）を bash 3.2 と 5 で固定する。あわせて `--mode free` の握り手、管理ディレクトリのシンボリックリンクがあると remove・sweep が何も消さずリンク先も残ること（prune の直前の同じ検査は削除と prune の間に置かれたリンクへの多重防御で、`wr_admin_links` の単体だけを固定）、正規の worktree（絶対パス・Git 2.48 以降なら相対パスの形）の削除・回復・check-absent、`wr_gitlink_check` を 1 か所ずつ崩した 16 形の拒否、`check-absent` が仕込みのある worktree を不在と言わず、仕込んだ worktree を `--repo-root` に渡すと `unknown` になること、カレントが付属 worktree のラン（照合に通れば動き、カレント自身の `.git` が崩れていれば何もしない）を固定する。NUL を混ぜた `commondir`・`.git`（末尾改行なし。bash 5 で修正前はマーカーが作られ worktree の中身まで消えた）を仕込みに加え、`wr_gitlink_check` の単体で NUL（末尾改行の有無の両方・`.git`・`commondir`・逆向きの `gitdir`）・CR の形の拒否と、末尾改行の無い正規の形が通ることを固定する。カレントの `.git` が照合に通らないとき、recover・free・remove・sweep・check-absent のどれも git を 1 回も呼ばない（PATH の先頭に置いた git の代役の記録が空）ことも固定する。変異は H01（commondir の照合を外す）・H02（`config.worktree` を許す）・H03（submodule があっても WIP コミットを作る）・H04（NUL を数えず、末尾の余分な 1 バイトが改行かも確かめない。2 つの確認は NUL について互いに重なるので両方を外す）・H05〜H09（信頼の起点を確かめる前に git を呼ぶ・未確立のまま一覧・ブランチ・check-absent の git を呼ぶ）・H10（`update-ref --stdin` のフラグを外す。静的ガードが殺す）を足し、W02・C05（`--ignore-submodules=none` へ戻す）をこのテストで殺す形に改めた。e148ca4 のスクリプトに対して同じテストを流すと、仕込み 7 種 × 2 スクリプト × 2 bash の 28 件はすべてマーカーが作られて落ちる（`check-absent` は修正前も `rev-parse` しか呼ばずマーカーは作られない）。

## ハッシュ埋め込みと鮮度

- 開発ファイル（`implement-issue-tree.src.js`）には、スクリプトごとの期待ハッシュの代わりに置換前の目印（`SCRIPT_SHA256` の値）を書く。`build-workflow.mjs` は**コメント除去とトークン照合より前に**、同じディレクトリのスクリプトの `bundleSha256`（スクリプト本体 + `scripts/lib/*.sh` のバイト列連結の SHA-256）へ置換する。置換後の文字列を「開発ファイル」としてトークン照合に使うので、照合の定義（種類・値・開始行）は変わらない。生成物に目印が残らない。
- スクリプトまたは lib を書き換えると生成物の内容が変わる。`--check`（鮮度ゲート）と `dev/implement-issue-tree/tests/build-workflow.test.mjs` は、スクリプトだけが変わって生成物が再生成されていない状態を検出する。
- スクリプトが無い・目印の書式が不正（置換されずに残る）ならビルドは生成物を書かずに中止する。
- `launcher` と `bundleSha256` の定義の一致（sha256sum 経路・shasum 経路の両方）は `dev/implement-issue-tree/tests/script-launcher.test.mjs` が検証する。

## 運用

- `args.skillDir` は呼び出し側（起動手順）が渡す。配布後、既存の呼び出し手順は更新が必要になる。`dryRun` でないランで未指定なら起動時エラーで停止する（第 2 弾から、monitor が毎回 `observe-pr.sh` を使うため、`maxResidualWorktreeBytes: 0` のランも対象）。named workflow（`{name: "implement-issue-tree"}`）で起動する場合も同じ。
- 同期で届くのはスキルディレクトリ全体（Workflow とスクリプトを同じコミットで）なので、通常は版ずれは起きない。`run-verified.sh` が exit 3 を出したときは、スキルの同期が途中か、スクリプトがローカルで変更されている。同期し直す。
- 新しいスクリプトを足すとき: `scripts/` 直下に `*.sh`（小文字・数字・`-`・`.`）で置き、`SCRIPT_SHA256` に目印を足し、`bash <skillDir>/scripts/run-verified.sh` 経由で起動し、封筒で返す（ホストが値を採用しないスクリプトは、上の第 3 弾の節の理由づけを示したうえで封筒なしにできる）。`scripts/lib/*.sh` を足すと、**すべてのスクリプトのハッシュが変わる**（`run-verified.sh` は lib 全体をハッシュに含める）。再ビルドで追従する。`dev/implement-issue-tree/tests/script-static-guard.test.mjs` の走査対象は `scripts/*.sh` と `scripts/lib/*.sh` の全体なので、新しいスクリプトも自動で対象になる。冒頭コメントに入力・出力・終了コードを書く。`bash 3.2`（macOS）と GNU の両方で動く書き方に限る（`paste`・`bc`・GNU 専用フラグ・`date -d`・`sed -i`・`mapfile`・連想配列を使わない）。

## 関連

- `./automerge-design.md` — G0 とサーバー側強制（安全判定の信頼境界）
- `./verification.md` — 起動可否契約とサイズ予算
- `../../../.claude/rules/security.md` — OWASP A03（インジェクション）・A08（整合性）の観点

## ツリー取得（`fetch-tree.sh`、Issue #668）

ツリー取得（`plan:issue-tree`）は `scripts/fetch-tree.sh` が決定的に行い（Issue #668）、エージェントの書き写しを検査値で確かめる。防ぐのは、取得手順そのものの誤り（ページの取り落とし）と、内容の違う書き写しの誤り（`siblingIndex`・`parent`・`state`・`subIssuesTotal`・番号・title）である。全欄一致の重複の畳み込みと失敗時の 1 回の取り直しは Issue #667 から。

- **失敗は封筒を出さず、理由をホストのログへ届ける（Issue #676）**。非 0 終了または封筒が無いとき、エージェントは `failure: { exitCode, stderr（先頭 300 文字の転記） }` を返し、nonce・payload・sha256 は書かない（捏造しない）。ホストは `failure` を nodes・封筒の検査より先に見て、終了コードを固定語彙の表（2 使い方 / 3 封筒を作れない / 5 gh 失敗 / 6 不完全 / 7 出力過大）で意味に引き、stderr の `#N` を数値として抽出する。stderr の自由記述は未信頼値として sanitize・切り詰めた抜粋だけを出す。1 回目の失敗ログは「取り直す」旨、「取り直しても解消しなかった」は取り直し後の最終例外だけに出す。
- **検査値は封筒（nonce + sha256）**。`payload.nodesSha256` は、各ノードの `number TAB parent TAB siblingIndex TAB state TAB subIssuesTotal TAB sha256hex(title)` の行を number 昇順に改行で連結した文字列の SHA-256（title は 16 進ダイジェストにして payload の規約〔整数・固定語彙・16 進〕を守る）。ホストは `nodes` の 6 欄から同じ値を計算し直して照合し（第 7 欄 optinTests は含めない）、`payload.count` と `payload.inputSha256`（`sha256("fetch-tree\n" + root + "\n" + repo)`）も照合する。`payload.structSha256` は同じ定義から title の欄を除いた 5 欄の行のダイジェスト（Issue #687）。ホストは `structSha256` を先に照合し、不一致は fail-closed（1 回取り直し、2 回目も不一致なら停止）。`structSha256` が一致して `nodesSha256` だけ不一致なら title だけの書き写し誤りとみなし、完全性検査を通ったノードを保持して 1 回取り直し、再度でも残れば警告ログと `treeFetch.titleMismatch: true` を残して続行する。title は表示ログ・untrusted 表示・兄弟タスク ID 表にだけ使い、実行順・マージ・push・削除の判断には使わないので、緩めるのは title の 1 欄だけである。`payload.optinSha256` は第 7 欄（`nodes[].optinTests`）の検査値で、各ノードの `number TAB optinTests の compact JSON` の行を number 昇順に改行で連結した文字列の SHA-256（シェルは `ft_optin_digest`、ホストは `treeOptinDigest`。JS 側は `` `${number}\t${JSON.stringify(optinTests)}` ``）。値は ASCII の印字可能文字だけに正規化されるのでエスケープが出ず、jq の `tojson` と `JSON.stringify` が同じバイト列になる。optinTests は実行コマンドの宣言に使うため title と違って許容せず、不一致は `structSha256` と同じく 1 回取り直し、2 回目も不一致なら停止する。ページ経路ではページの封筒がそのページの行だけの `optinSha256` を持ち、連結後に取得時の封筒の値と照合する。行ごとの多項式 `sig`（`plan:declared-deps`）は採らなかった: title の検査が弱く、行の脱落・並べ替え・別呼び出しの流用を封筒ほど捉えられないため。
- **照合の順序**: agent 例外 → `failure` 申告（`treeFetchFailureReason()` が「fetch-tree.sh が失敗（exit N: …）」を作り、以降の検査へ進まず取り直しへ）→ `nodes` の形 → 全欄一致の重複の畳み込み → 7 欄の型・値域（`optinTests` は文字列の配列）→ 封筒（欠落・nonce・sha256・入力）→ 件数と `structSha256` と `taskIdSha256` と `optinSha256`（タスク ID は依存解決に、optinTests は実行コマンドの宣言に使うため不一致は停止）→ `nodesSha256`（title のみの不一致は上記の扱い）→ 既存の完全性検査（子の件数・`subIssuesTotal`・番号重複）。畳み込みを封筒より前に置くのは、全欄一致の重複を畳まないと書き写しの重複が `payload.count`（スクリプトが数えた件数）と食い違い、件数の不一致という意味の違う失敗になるため。型の検査も封筒より前にあるので、型が壊れた返却には封筒の欠落ではなく型の理由（`形式（#N）`）が出る。`failure` 申告はこれらすべてより前に処理される。どれかが落ちたら固定語彙の理由をログに出して、`plan:issue-tree-retry` で 1 回だけ取り直す（上限は #667 と同じ 2 試行）。nonce は試行ごとに変わる。
- **検出するもの**: 書き写しの誤り（7 欄のどれか 1 欄でも。`optinTests` は 1 要素の書き換え・脱落・追加・並べ替えまで）、行の脱落・追加、別呼び出し・別入力（ルート・リポジトリ違い）の出力の流用、スクリプトを実行せず値を作ったこと（sha256 が合わない）。
- **検出しないもの**: sha256 を自分で計算できる悪意あるエージェントによる捏造、`dependsOn`（本文を読む判断はエージェントに残る。`plan:declared-deps` の和集合が別にある）。`optinTests` は本文からの抽出をスクリプトが行うので、書き写し誤りは `optinSha256` で検出する。ただし本文の宣言そのものは非信頼データで、承認一覧との完全一致（`parseOptinTestDeclarations`）が唯一の実行許可の根拠である。したがってツリーの内容は、`optinTests` を除いて、マージ・push・削除の可否の根拠にならず、実行順と依存の入力にだけ使う。`optinTests` は承認一覧との完全一致を経て opt-in テストの実行とマージ前ゲート（PR 本文の記録の件数照合）の入力になるため、不一致は取り直し・停止にする。抽出は線形時間にしてある（値の前後の空白は正規表現ではなく explode の走査で落とす。`[ \t]*` を値の前後に置く形は jq 1.7 の Oniguruma で空白の長い行に対し retry-limit で異常終了した）。値の前後で落とす空白は ASCII の空白とタブだけで、末尾の NBSP・全角空白は `?` になり invalid（blocked）になる。
- **失敗は fail-closed**: `gh api` の失敗は終了コードで判定し（gh は HTTP エラー本文も標準出力へ出す）、封筒を出さない。標準エラーには番号と固定語彙だけを出し、title など外部由来の文字列は出さない。title は jq → 変数 → `printf '%s'` でだけ扱い、シェルに展開・評価しない。
- **大きなツリー（Issue #673）**: 1 回の Bash 出力は 24000 バイトまでなので、TSV が 1 ページ（20000 バイト）に収まらないときは、スクリプト自身が `mktemp -d "${TMPDIR:-/tmp}/iit-tree.XXXXXX"`（umask 077）の専用ディレクトリへ全行を `tree.tsv` として書き、封筒（`dir`・`tsvSha256` を含む）だけを標準出力へ出す（Issue #690。1 体のエージェントが全件を写しきれず停止したため）。ホストがページごとに別のエージェントで `--nonce <N> --page <P> --dir <dir>`（読み出し専用・gh を呼ばない）を実行させ、ページの封筒（`inputSha256 = sha256("fetch-tree-page\n" + tsvSha256 + "\n" + P)`・そのページの行だけのダイジェスト）を `verifyTreeFetchResult` で照合して連結し、取得時の封筒で全体を照合し、最後に `--release --dir <dir>` で片づける。エージェントが返した `dir` は信頼せず、ホストが名前検査（絶対パス・許可文字集合・`.` / `..` なし・`iit-tree.` 接頭辞）を通し単一引用符で囲んで埋め込む。ページごとの照合に通った後の全体照合の失敗は、取り直しても直らないため取得を取り直さず停止する。`payload.pages` は封筒の sha256 が束縛するので、ページの読み飛ばしは従来の `count` / `nodesSha256` の不一致として検出され、1 回の取り直しに入る。読み出しの途中でファイルが変わった場合も同じ検出クラス（`digest` 不一致）で、追加の防御は置かない。`--dir` は絶対パス・許可文字集合・`iit-tree.` 接頭辞・自分の所有・シンボリックリンクでない・中身が `tree.tsv` のみ、を検証してから使う。`--release` が持つ削除は `rm -f <dir>/tree.tsv` と `rmdir` だけで、再帰削除を持たない（静的ガードで担保）。ページ数が 30（約 4,500 ノード相当）を超えると exit 7。異常終了で残ったディレクトリは中身が issue の番号・状態・title だけで権限は 700 / 600 のため OS の一時領域の掃除に任せる。
- **既知の限界**: 約 4,500 ノード相当（30 ページ）を超えるツリーは exit 7 になる。1 回の StructuredOutput へ写せる規模の上限は実環境で未検証。クロスリポジトリの sub-issue の扱いは従来どおり変えていない。
- **`dryRun` でも `args.skillDir` が必須**（旧プロンプト経路を dryRun のためだけに残すと、書き写しの弱点を温存する二重経路になるため）。
