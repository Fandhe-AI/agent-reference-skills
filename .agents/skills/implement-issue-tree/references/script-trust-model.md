# スクリプト実行の信頼モデル

本書は implement-issue-tree スキルの一部。全体は ../SKILL.md 参照。

決定的な手順（`gh` / `git` / `du` 等のコマンド列と分類規則）をプロンプトの文章から切り出し、スキル同梱のスクリプトにして、サブエージェントには「コマンドを実行して出力を転記する」ことだけをさせる設計（Issue #603）の、**何を防ぎ、何を防がないか**を書く。第 1 弾の対象は読み取り専用の測定 2 本（残置 worktree のバイト測定・実ディスク空き容量）、第 2 弾の対象は monitor の観測と待機（`observe-pr.sh`）で、いずれも安全判定（マージ・push・削除）を含まない。第 3 弾の対象は base 取り込みと push の検証（`base-merge.sh`、`lib/push-verify.sh`）と、push 直後の確認（`observe-pr.sh --mode push`）で、**base-merge.sh は push を実行する最初のスクリプト**である（下の「第 3 弾」節）。第 4 弾の対象は pr-create と fix の base 取り込み・push・PR 作成（`pr-push.sh`）と、ラン開始時のハッシュ予検査（`run-verified.sh --verify-only`）、観測スクリプトの `--repo` である（下の「第 4 弾」節）。第 8 弾の対象は monitor の CI 完了待ち（`observe-pr.sh --mode checks --until settled`。`gh pr checks --watch` の置き換え）で、第 2 弾と同じく助言的判定に限る（下の「第 8 弾」節）。安全判定を含むスクリプトを足す弾は、本書の前提を満たすか、満たさない部分を別の機構で補うことを、その弾の PR で示す。

## 構成

| 要素 | 役割 |
|------|------|
| `args.skillDir` | スキルディレクトリ（`scripts/` の 1 つ上）の絶対パス。人間（起動手順）が渡す。形式だけをホストが検証する |
| `scripts/run-verified.sh` | 実行前にスクリプトの SHA-256 を照合する launcher。`bash "<skillDir>/scripts/run-verified.sh" <sha256> <name>.sh …` で起動する（実行ビットに依存しない） |
| `scripts/measure-residual-bytes.sh` / `measure-free-disk.sh` | 測定本体。入力はパスの一覧（標準入力）または 1 件（引数）。出力は 1 行の封筒 |
| `scripts/observe-pr.sh` | monitor の観測本体（第 2 弾）。入力は PR 番号・base・branch・issue・App slug（引数）。モードは `pr` / `checks` / `required` / `reviews` / `threads` / `threads-detail` / `push`（第 3 弾）。出力は 1 行の封筒（`threads-detail` だけは外部由来の自由文を含む非信頼データで、封筒ではない）。`--wait` は有界の待機 |
| `scripts/base-merge.sh` | 自動 base 取り込みの本体（第 3 弾）。入力は PR 番号・branch・base・期待 owner/repo（引数）。**封筒を使わない**。出力の最後の 1 行は `BASE_MERGE_RESULT {…}`（キーは `BASE_MERGE_SCHEMA` と同じ） |
| `scripts/pr-push.sh` | pr-create と fix の起点の確立・base 取り込み・push・PR 作成（第 4 弾）。モードは `prepare` / `push` / `pr`。**封筒を使わない**。出力の最後の 1 行は `PR_PUSH_RESULT {…}` |
| `scripts/state.sh` | 状態ファイル（`_/issue-trees/<親>.json`）の書き込み（第 5 弾）。モードは `merge` / `init` / `hw-max` / `hw-set`。入力は標準入力の 1 行 JSON と引数。**封筒を使わない**。出力の最後の 1 行は `STATE_RESULT {"ok":…}` |
| `scripts/merge-gate.sh` | merge-exec のマージ直前の読み取り専用検証（第 6 弾。G0 = サーバー側強制の実測と、チェック・未解決スレッド・mergeable・外部チェックの再検証）。入力は PR 番号・base・期待 sha・外部チェックの宣言（引数）。**封筒を使う**: payload は判定語（`verdict`。merge-exec の reason と同じ語彙）・段階・固定語の detail・整数の件数・40 桁 16 進の HEAD sha だけ。**マージの実行は含まない** |
| `scripts/worktree-remove.sh` | worktree の破棄・掃除（第 7 弾）。確認と削除を同じプロセスで行う。サブコマンドは `remove --mode superseded|discard`（`--path`・`--branch`・`--base`・`--head`〔discard 専用・40 桁 sha。worktree の HEAD が違えば `retained-head-mismatch`、一致していても detached なら `retained-detached` で保持。値が空・形式不正は usage エラー（exit 2）。closed 後始末が PR の head を渡す〕・`--expect-branch`〔discard 専用・`--path` が要り `--branch` とは併用しない。`--branch` と同じ位置・同じ判定で HEAD を照合するだけで、ブランチは消さない。違う・detached なら `retained-branch-mismatch`。Recover が規約外のブランチ名を解決した discard が渡す〕）と `sweep --file`（候補は標準入力の JSON 配列）。**封筒を使わない**。出力の最後の 1 行は `WORKTREE_REMOVE_RESULT {…}`。`check-absent --path` は読み取り専用の不在確認（Issue #637。削除・prune・unlock をせず、`git worktree list --porcelain` とパスの実在だけを見る）。ホストが不在として信じる結果の語は `absent`（登録も実体も無い）と `prunable`（登録だけ残り、lock なし・ブランチ上）の 2 語だけで、`prunable-detached`〔登録の HEAD がコミットの唯一の参照かもしれない〕・`prunable-locked`・`present`・`unregistered-present`・`main`・`unknown`・結果なし・例外は保全する。`prunable-detached` は HEAD が `0000…`（ブランチ ref を消した形）の登録を含む。`prunable` と確認できたとき、ホストは planning へ進む前に旧パスの登録だけを `remove --mode discard --path <旧パス> --require-missing`（`--branch` なし = ブランチ ref は残す。superseded は使わない）の 1 回で片づける。`--require-missing`（discard 専用・`--path` が要り `--branch` / `--head` / `--expect-branch` とは併用しない）は『実体がまだ無いときだけ消す』結びつけで、確認（`check-absent`）と削除が別プロセスであることの TOCTOU を塞ぐ。削除の前（と `git worktree remove` の直前）に同じプロセスでパスの実在を読み、登録も実体もあれば `retained-present`（有無を確かめられないときは `retained-unobservable`）、登録が無いのに実体があれば `retained-unregistered`、lock ありは unlock せず `retained-locked`、実体の無い detached / HEAD `0000…` は `retained-detached` で、何も消さない（確認のあとにパスへ clean な worktree や固有のコミットを持つ detached な worktree が作り直されても消えない）。`check-absent` 自体は読み取り専用のまま。結果が `removed` でなくても（保持・失敗・結果なし・例外）planning へ進み、消えたと確認できない登録は残置の台帳に載せる。照合の前に `--path` を正規化し、大小だけが違う登録との一致は `unknown`（保全）にする。`--repo-root`（ホストが特定したメイン worktree。無ければパスの最寄りの実在する祖先）の共通 git ディレクトリがカレントと違う・求められないときも `unknown`（別リポジトリのカレントで `absent` に倒れない）。`remove` / `sweep` の全体 `git worktree prune` は 1 か所（`safe_prune`）だけが呼び、`remove` は実際に何かを消したとき（`--path` を消した、または `--branch` の後始末で登録を消した）、`sweep` は候補を 1 件でも消したときだけ呼び、何も消さなかったとき（ブランチだけの discard・未登録・保持・失敗。`sweep` で候補の削除が失敗しただけのときも呼ばない）、および実体の無い detached / HEAD `0000…` の登録（lock なし）が 1 件でもあるときはスキップする（結果の `pruneSkipped`。登録が残るだけで結果の語は変わらない）。`remove` は実体の無いパスを実体のパスで照合し（大小違いは一致させない）、`--branch` を持つ実体の無い登録を既存の許可形の `git worktree remove` で 1 件消してからブランチを消す（lock あり・実体の無い detached / HEAD `0000…` の登録は消さずブランチも残す。この後始末の結果は `--path` の結果を上書きせず、結果の行の `holder`〔`removed` / `retained-…` / `failed`〕に出る。後始末の時点で登録が既に無かった〔`not-registered`・並行して消えた〕ときは、同じプロセスで登録の一覧を読み直し、ブランチを持つ登録が本当に無いと確かめたときだけブランチを消す。まだ残る・読み直せないときは消さない）。登録は無いが実体のパスがある場合は、discard の `--head` / `--expect-branch` つきでは `retained-unregistered`（決定的な保持。ホストは merged にせず記録する）で返し、それ以外は従来どおり `not-registered`。`sweep` の保持照合は字面の正規化と実在する祖先を実体にした形の両方で、大小を畳んで比べる。冒頭で `GIT_DIR` / `GIT_WORK_TREE` / `GIT_COMMON_DIR` / `GIT_INDEX_FILE` を unset する。観測に失敗した保持は、`git status` コマンドそのものの失敗・`--head` 指定時の HEAD の一過性の読み取り失敗が `retained-unobservable`（ホストは恒久の試行済み記録にしない）、`.git` の破損・git の対象が worktree 自身でない状態は `retained-broken`、unborn の HEAD への `--head`〔HEAD が指す ref を `show-ref --verify` が終了コード 1 で「無い」と言ったときだけ。それ以外の失敗は `retained-unobservable`〕は `retained-head-mismatch`（どちらも決定的なので記録する。区別できないものは記録側へ倒す）。この値は封筒なしの掃除エージェントの返却（ok / retained / worktree）で、エージェントが偽ると旧記録を捨てて新規に進み得るが、確認自体は削除をしない。露出は既存の discard の `retained: false` 自己申告と同等で、記録を捨てた旧 worktree が実在した場合は、状態ファイルの保持対象から外れるので orphan scan・終了時 sweep の候補になり得る |
| `scripts/recover-prep.sh` | Recover の機械的な部分（第 9 弾）。対象ブランチの解決・未コミット変更の WIP コミット・base の取得・base との差分の有無。入力は `--base`（必須）・`--worktree`・`--branch`（引数）。**封筒を使わない**。出力の最後の 1 行は `RECOVER_PREP_RESULT {…}`。判断（continue / discard）と回復ブリーフはエージェントに残る |
| `scripts/lib/signed-output.sh` | 封筒の組み立て（`so_emit`）。sha256 の入力の定義はここと `verifySignedOutput` が共有する |
| `scripts/lib/observe-checks-lib.sh` | `observe-pr.sh --mode checks --until settled` の分類（`checks_classify`。check-run と commit status を合格 / 未完了 / 不合格の件数にする純関数。第 8 弾） |
| `scripts/lib/push-verify.sh` | push の前後でリモート head を突き合わせる共通部（`pv_push_verified`。第 3 弾）。`base-merge.sh` が使い、以降 pr-create の push と fix の push 検証も同じ部品へ移す |
| `scripts/lib/base-merge-lib.sh` | `base-merge.sh` の入力検証と remote URL の照合の純関数（`is_uint` / `valid_repo` / `url_allowed` / `routing_check_remotes` と許可ホストの定数）。第 3 弾の `base-merge.sh` 本体からロジックを変えずに PR #616 で切り出したもの。`pr-push.sh`・`merge-gate.sh`・`observe-pr.sh` も source する |
| `scripts/lib/pr-push-lib.sh` | `pr-push.sh` の判定だけの純関数（`pp_*`。起点の決定・既存 PR の分類・PR 番号の取り出し・形式検証。第 4 弾） |
| `scripts/lib/state-lib.sh` | `state.sh` の入力検証と状態ファイルの書き換え（`st_valid_*`・`st_rewrite` と固定の jq プログラム。書き込み直前の変更検知つきで一時ファイルから `mv` する。第 5 弾） |
| `scripts/lib/merge-gate-lib.sh` | `merge-gate.sh` の判定だけの純関数（`mg_*`。取得済みの JSON を判定語・件数へ畳む。想定外の形は非ゼロ return で返し、呼び出し側が fail-closed に倒す。第 6 弾） |
| `scripts/lib/worktree-remove-lib.sh` | `worktree-remove.sh` の判断と入力検証の純関数（`wr_*`。削除・強制削除・保持の判断、lock の扱い、status の読み取り。`recover-prep.sh` も source する。第 7 弾） |
| `scripts/lib/recover-prep-lib.sh` | `recover-prep.sh` の判断だけの純関数（`rp_*`。対象ブランチの解決・WIP コミットの要否と結果の分類・base との差分の三値判定。第 9 弾） |
| 生成物 `implement-issue-tree.js` の `SCRIPT_SHA256` | ビルダーが埋め込む期待ハッシュ。開発ファイルには置換前の目印を書き、`build-workflow.mjs` が置換する |
| `verifySignedOutput`（ホスト） | 転記された封筒を再計算して照合する |

実行の流れ: ホストが nonce を決めてコマンドを組み立てる → サブエージェントが 1 回の Bash 呼び出しで実行する → launcher が期待ハッシュと照合して起動する → スクリプトが `{nonce, payload, sha256}` を 1 行で出す → エージェントがそれを StructuredOutput へ転記する → ホストが nonce と sha256 を再計算して照合し、通ったときだけ payload を使う。

封筒の `sha256` は `SHA-256(nonce + "\n" + payload の正規形)`。正規形はキー昇順・空白なしの JSON で、payload は整数と ASCII の固定文字列だけにする（`jq` の数値表記やエスケープの差に依存しないため、スクリプトは `printf` で直接組み立てる）。

payload には**入力の束縛** `inputSha256` を入れる。残置バイトは標準入力のパス列（末尾の改行 1 つを除く）、空き容量は対象パスの SHA-256 で、ホストは自分が送った値（`sha256Hex(パス列)`）から再計算して `verifySignedOutput` の第 3 引数で照合する。nonce は「どの呼び出しの出力か」を、`inputSha256` は「ホストが送った入力を測った出力か」を結び付ける。nonce は `boundaryNonce` に**呼び出し連番**を含めて作り、同じ対象を何度測っても呼び出し・再試行ごとに異なる（連番を含めないと同じパスの測定は同じ nonce になり、前回の封筒を流用しても受理される。PR #611 codex P1）。

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

**payload は整数と ASCII の固定語彙・40 桁 16 進だけ**で、PR のコメント本文・チェック名・context 名・ログイン名のような外部由来の文字列を含めない。そのため canonical JSON の定義の差（キー順・エスケープ・非 ASCII）が問題にならず、スクリプト（`jq -cS`）とホスト（`canonicalJson`）の出力が一致することを `tests/observe-pr-host.test.mjs` が実走で固定する。`threads-detail` の自由文は非信頼データとして監視エージェントが読むだけで、プロンプトに戻す値（封筒）には入らない。

**nonce は監視呼び出しごと・再試行ごとに別**にする（`monitorObserveSeq` の連番と試行番号を `boundaryNonce` の keyMaterial に含める）。1 回の呼び出しの中でエージェントが同じコマンドを再実行する待機（`pending` の繰り返し）は同じ nonce を使うが、それは同一呼び出しの再観測であって、別ラウンド・別試行の出力の流用ではない。流用した封筒は nonce の不一致で採用されない。

**待機の回数の上限はスクリプトが `--attempt` で強制する**（範囲外は exit 2）。1 回の起動は、gh が遅い・ハングする場合を含めて壁時計 90 秒（`OBSERVE_PR_WALL_SEC`）+ 後始末の数秒以内に必ず返る（gh 1 回ごとに 25 秒の時間制限を付けてグループごと kill し、残り時間が 1 観測分に満たなければ次の観測を始めない。Bash ツールの既定タイムアウト 120 秒に収まる）。エージェントは `pending` のたびに `--attempt` を 1 増やして同じコマンドを再実行する（最大 7 回 = およそ 10 分。現行の「最大 10 分」と同等）。ホストが 1 回ごとにエージェントを呼び直す設計にしなかった理由は `agent-call-budget.md` の「監視の待機」。エージェントが `--attempt` を進めずに（`--attempt 1` を打ち続けて）繰り返すことは止められない。スクリプトが保証するのは 1 回の起動の有界性と `--attempt` の範囲検査までで、foreground の長い sleep（ハーネスが拒否する）にはならないが、繰り返しの総数の上限はエージェントの遵守と監視枠に委ねる（次節「防がないこと」）。

## 測定値の使い方（なぜこの弾の自己申告で足りるか）

残置バイト・空き容量の測定値は、**新規着手を止めるか（ディスク枯渇の防止）**、および**次回ラン開始時の 1 worktree あたり予約見積りの下限（クランプ済みの高水位）**にだけ使う。マージ可否・push・worktree の削除・PR/issue への書き込みの判定には使わない。偽の小さい値は着手を許す側に働き得るが、それが損なうのはローカルのディスク容量の保護で、リポジトリの内容・マージ・認証には影響しない。逆に偽の大きい値は着手を止める側（安全側）に働く。したがって、この弾の信頼水準は「事故を検出できる」で足りる。**悪意のあるエージェントがディスク枯渇防止の弁を迂回できる**ことは受け入れた制約である（件数軸の元になる `git worktree list` の転記も同じ自己申告である）。

安全判定を含むスクリプト（G0・マージ実行・opt-in ゲート・worktree の破棄の確認・base 取り込み）を切り出す弾では、この水準では足りない。出力の用途がマージ可否に及ぶ場合は、(a) ホスト側の独立な再取得、(b) サーバー側強制（ruleset の実測）、(c) 自己申告値を判定に使わない設計、のいずれかで補うこと。nonce と sha256 の照合は補強にならない。

## 第 3 弾: base 取り込みと push 後確認（`base-merge.sh`・`observe-pr.sh --mode push`）

### 位置づけ: 封筒なしで足りる理由

`base-merge.sh` は **push を実行する最初のスクリプト**だが、出力に封筒（nonce・sha256）を付けない。上の「測定値の使い方」節が求める (a)(b)(c) のうち **(c) 自己申告値を判定に使わない設計**で足りるからである。ホストが `BASE_MERGE_RESULT` から読む値は、スクリプト化の前から返っていたものと同じで、新たに採用する値が無い。

| 値 | ホストの使い道 | 誤っていた場合に起きること |
|----|----------------|--------------------------|
| `pushed` | 進捗の記録だけ（`noPushRounds` のリセットと `lastRoundPushed`）。マージ・クローズ・push・削除の可否には使わない。resolve (b) の許可リスト `computePermittedNoPushResolveIds` は常に空（恒久無効）で、`lastRoundPushed` は安全判定に届かない | `true` の誤報は連続 no-push の数え損ないにとどまり、`baseMergeCount`（`maxBaseMerges`）が回数を有界にする。次ラウンドの monitor がサーバー側の実値を再観測する |
| `routingError` | halt 対象の失敗終端 | 偽陽性は止まる側（安全側）。偽陰性は、スクリプト自身が routing 不一致のときに fetch・merge・push を一切実行していない（実 git のテストが呼び出し履歴で固定する） |
| `commitFailed` | 失敗終端 | 止まる側 |
| `conflict` / `hookRejected` | 失敗終端せず fix 経路へ委譲 | 余分に fix 経路へ回るだけ（`fixCount` 上限 6 で有界、検証権限付き） |

`pushed` の自己申告を封筒で裏付けることは、次弾以降の選択肢である（費用は monitor の checks 系統並み: schema・observe 部品・ガイド文で数 KB）。

`observe-pr.sh --mode push` の封筒も、ホストは**照合も採用もしない**（`checksStarted` / `mergeableAfterPush` は従来どおり診断・分岐ヒント専用）。nonce はホストが常に生成して渡すが、材料は `push-confirm:<branch>:<PR 番号>` だけで呼び出しごとには変えない（プロンプトを決定的に保つため）。fix では `<PR 番号>` は実際の PR 番号だが、pr-create は PR 番号を手順 1b まで知らないため、材料には字面のプレースホルダ `<PR 番号>` がそのまま入る（エージェントが実行時に置き換えるのはコマンドの引数だけで、nonce は変わらない）。**採用に切り替えるときは呼び出し連番を `boundaryNonce` の keyMaterial に足すこと**（同じ nonce のままだと前回の封筒の流用を検出できない）。

### スクリプト内のコマンドは merge-guard hook から見えない

`merge-guard-hook.sh` は subagent の Bash の**コマンド文字列**を見て、マージ系・設定変更系を拒否する。スクリプトの中で実行されるコマンドは hook から見えない。この hook は元から best-effort（承認境界ではない）だが、push を含むスクリプトが入った以降は、迂回面が『スクリプトの内容』に移る。補うのは次の 3 つである。

1. **内容の固定**: `run-verified.sh` の期待ハッシュ。スクリプトと `scripts/lib/*.sh` の内容は、ビルドしたときのものに固定される（書き換え・版ずれは exit 3 で起動しない）。ただし、固定されるのは『レビューした内容から変わっていない』ことで、『その内容が安全か』ではない。スキルディレクトリへ書き込める者は防げない（下の「何を防がないか」）。
2. **静的テスト**（`tests/script-static-guard.test.mjs`）: `scripts/*.sh` と `scripts/lib/*.sh`（hook 自身を除く）のコード行（バックスラッシュ行継続は連結してから検査する）に、マージ（`gh pr merge`・merge 系 API・mutation）、approve、ruleset・branch protection・リポジトリ設定の変更、書き込み系の HTTP メソッド（`-X` / `-XPUT` / `-iX PUT` のような他の短縮オプションとの連結 / `-X` の後ろがタブの形 / `--method` / `--request`）、`gh api` の `-f` / `-F` / `--field` / `--raw-field` / `--input` による暗黙 POST（graphql の query 送信は読み取りとして許す。`gh -R "${repo}" api …` のように `gh` と `api` の間にオプションが入る形も同じ扱い）、`gh alias` / `gh extension`（`merge-guard-hook.sh` が拒否している類）、`curl` の `-d` / `--data*` / `-F` / `--form` / `-T` / `--upload-file` / `--json` と `wget` の `--post-data` / `--post-file` / `--body-*`、`git push` の `--force` 系・`-f`・`+` refspec、`git push` の許可形（`git push --no-follow-tags origin "HEAD:refs/heads/${branch}"`）以外の形（`--no-follow-tags` の欠落・削除 refspec・`--all`・URL 直指定・remote 違い・引用符で囲んだ `"git" push` / `git "push"`）、`git remote`（`get-url` 以外）と `git config`（`--get` / `--list` 以外）、`core.hooksPath` と `GIT_CONFIG_*` による設定の注入、`--no-verify`（`--no-verif` のような長いオプションの一意な省略形を含む）と `git commit -n`、`HUSKY=` / `LEFTHOOK=` の綴りが無いことを検査する。各パターンが悪い例に発火し、正当な行に発火しないことも自己検査で固定する。**これは正規表現の lint であり、変数経由（`"${cmd}" push`）・`eval`・文字列連結で組み立てたコマンドは防げない**。防ぐのは『レビューした内容から無自覚に外れた綴り』であって、意図して迂回する書き手ではない。
3. **スクリプト側の自衛**（`base-merge.sh`）: `--branch` と `--base` が同じ値を拒否する。ref・repo・PR 番号をホストと同じ厳格さで再検証する（PR 番号の先頭ゼロ、`refs/` 始まりと `HEAD` のブランチ名、`git check-ref-format` に通らない名前を拒否する）。push は `git push --no-follow-tags origin HEAD:refs/heads/<branch>` の 1 形だけで、`--force` 系・`--no-verify` を使わない（hook を通す）。`--no-follow-tags` は、利用者設定 `push.followTags=true` と注釈付きタグがあるとき、タグが同じ push で origin へ出ていくのを止める（実測: 付けないとタグが origin に作られ、結果は `pushed: true` のままである。`tests/base-merge.test.mjs` が固定する）。fetch 元は `refs/heads/<name>` で修飾し（修飾しないと同名のタグが優先され、タグにしか無いコミットがブランチへ入る）、取得先は worktree ごとの ref（`refs/worktree/base-merge/*`。linked worktree 間で共有されず、`pr-push.sh` と同じ。並列 worktree が共有する `refs/remotes/origin/*` は読み書きも削除もしない）で、fetch の前に自分の ref だけを消す（fetch が失敗しても stale な ref を merge しない）。マージの subject は埋め込み定数を一時ファイルに書いて `-F` で渡し（commitlint 設定やコミット履歴を読まない）、一時ファイルは trap で必ず消す。作業ツリーが clean でなければマージしない。ブランチが base に含まれている（独自コミットが無い）ときは fast-forward せず何も push しない。`gh pr view` には `-R <期待リポジトリ>` を付ける（`GH_REPO` や `gh repo set-default` で別リポジトリの PR を引かない）。

### 別リポジトリ・別ホストへ push しない保証の範囲

隔離 worktree は本体の `.git/config` を共有するため、先行するエージェントが `git remote set-url --push`・`url.<x>.pushInsteadOf`・`git remote set-url --add` で push 先だけを書き換えられる位置にある。`origin` の URL を先頭 1 件だけ見ると、fetch 元は正しいまま push だけが別の場所へ届く。そこで `base-merge.sh` は、fetch や push を始める前に次の 2 つの全行を照合する。

- `git remote get-url --all origin`（fetch URL）
- `git remote get-url --push --all origin`（push 先 URL。`pushurl` と `pushInsteadOf` の書き換えを反映する）

どちらも**全行**が、許可ホスト `github.com` と `--repo` の owner/repo に（大文字小文字を区別せず）一致しなければならない。1 行でも外れる・0 行・取得に失敗するときは `routingError` で返り、fetch・checkout・merge・push を一切実行しない。受理する URL の形は `https://[userinfo@]github.com[:443]/<owner>/<repo>[.git]`、`ssh://git@github.com[:22]/<owner>/<repo>[.git]`、`git@github.com:<owner>/<repo>[.git]` の 3 つだけである。userinfo は authority の最後の `@` までを捨てて host を取るので、`https://github.com@evil.example/…` の host は `evil.example` になり拒否する。authority に `@` が 2 つ以上ある URL（`https://a@evil.example@github.com/…`）も拒否する（git は接続に失敗するが、エラー文に 2 つ目の userinfo が残る。トークンに `@` を含む正当な URL は稀で、含めるなら `%40` に符号化する）。host は完全一致で比べる（`evilgithub.com`・`evil.github.com`・`notgithub.com` のような後方一致の別ホストも拒否する）。非標準ポート、`http://`・`git://`、`git@` 以外の ssh ユーザー、小文字でない `.GIT`、owner/repo の後方一致、許可文字（英数字と `._~:/@%+-`）以外を含む URL も拒否する。URL はトークンを含み得るので、標準出力・標準エラー・`summary` のどこにも出さない（標準エラーに出るのは『何行目が不一致』だけ）。照合は実 git の実 config に対して `tests/base-merge.test.mjs` が固定する（3 つの書き換えのそれぞれで evil 側の bare に ref が 1 つも作られないことまで検査する）。

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

`git merge -F` は別で、実機で確かめた限り git 2.17.1 と 2.18.4 には無く、2.20.4 にある。`-F` を持たない git では、routing ガードは通過し、fetch・checkout まで進んだうえで merge がオプション不正で失敗する。このとき MERGE_HEAD も未マージのファイルも無いので、スクリプトは『コンフリクト・hook 拒否以外の merge 失敗』として `commitFailed`（ホストでは `failed` 終端）で返し、push はしない（merge が成功しないので push の段に進まない）。したがって `-F` の無い git は安全側に倒れるが、base 取り込みはできない。`-F` を持つことを確かめたのは 2.20.4 以降の版で、2.17.1・2.18.4 の間にある版（2.19 系）は検証していない。

### 出力は固定語彙

`BASE_MERGE_RESULT` の `summary` は固定の語彙だけで、hook の出力・gh の出力・URL・ブランチ名のような外部由来の文字列を入れない（診断は標準エラーへ出す。標準エラーはエージェントが読むが、ホストへ返る値には載らない）。ホストは `summary` を `finding.summary`（fix プロンプト）へ流すため、ここに外部由来の自由文を入れると未信頼データが push 権限のある経路へ入る。

### push の検証（`lib/push-verify.sh`）

`pushed` になるのは、(i) push 前のリモート head がローカル HEAD と違い、(ii) push 後のリモート head がローカル HEAD と一致し、(iii) push コマンド自身が成功したときだけである。push コマンドの成功や、push の前後で sha が変わったことは根拠にならない（その間に別ランが同じブランチを更新すると、自分の push が拒否されても sha は変わる。PR #436）。比較できない（ls-remote の失敗・HEAD を読めない）ときも、作業は detached HEAD 上にしか無く push を省くと失われるため push は実行し、結果は `unverified`（`pushed: false`）にする。3 条件を 1 つずつ外すと赤になることは `tests/push-verify.test.mjs` が固定する。

### スクリプトを実行できなかったとき

`run-verified.sh` の exit 3（ハッシュ不一致）/ 4（欠落）、スクリプトの exit 2（使い方の誤り）では `BASE_MERGE_RESULT` の行が出ない。プロンプトはこのとき、取り込み直さずに `pushed: false`・`commitFailed: true`・`summary: base-merge.sh の失敗` で返させる。ホストは `conflict` / `hookRejected` を伴わない `commitFailed` として `failed` 終端する（`blocked` と違い halt の連続カウントに計上される。`tests/base-merge-host-flow.test.mjs` が固定する）。版ずれの間は、base とコンフリクトした PR のたびに `failed` が 1 件ずつ積まれる（fix 経路へは回らず、取り込み直しもしない）。**配布の版ずれの影響範囲は、第 1・2 弾（測定・監視が止まる）より広い**: 版ずれがあると、実装が終わった後の PR 作成・base 取り込みの時点で初めて失敗し得る（起動時に全スクリプトのハッシュを検証する予検査は未実装）。

### 既知の挙動

- **`rerere.autoupdate` が効くとコンフリクトが `hookRejected` に分類される。** 記録済みの解決が自動適用されると、未マージのファイルは残らないまま `MERGE_HEAD` だけが残るため、スクリプトは『マージコミットの hook 拒否』として `hookRejected` + `commitFailed` で返す（abort して push しない）。ホストは `conflict` と同じく fix 経路へ委譲するので、結果は安全側にそろう。
- **PR ブランチが force-push で書き換わっても取り込める。** branch の fetch の前に追跡 ref を消すため、古い追跡 ref に引きずられず、書き換え後の head を起点にする（`tests/base-merge.test.mjs` が固定する）。リモートからブランチが消えている場合は fetch が失敗し `commitFailed`（`summary` は branch fetch 失敗）で返る。

### 隔離 worktree からの実行は実ランで未検証

第 3 弾は、`isolation: 'worktree'` のエージェント（base-merge・pr-create・fix）が、メイン作業ディレクトリ側の絶対パス `skillDir` のスクリプトを実行する**最初の弾**である（第 1・2 弾のエージェントは非隔離）。隔離 worktree のエージェントがそのパスを実行できるか、スクリプトの cwd が隔離 worktree になるか（`git` の操作が隔離 worktree に対して行われるか）は、実ランで確認していない。テストは cwd を作業用 clone にして実 git で確かめているが、Workflow ランタイムの隔離とサンドボックスの挙動は再現していない。

## 第 4 弾: pr-create と fix の push（`pr-push.sh`）と起動時のハッシュ予検査

### `pr-push.sh`: 検証権限のある経路の push

`pr-push.sh` は pr-create と fix（検証権限を持つエージェント。ビルド・lint・テストを実行できる）が使う。`base-merge.sh`（検証権限を持たず、コンフリクトを解消しない）とは役割が違い、**push と base の取り込みを決定的にし、判断だけをエージェントに残す**。

| モード | スクリプトが行う | エージェントに残る判断 |
|--------|------------------|----------------------|
| `prepare` | routing ガード（`--repo` があるとき）・未コミットの変更の拒否・base の fetch（worktree ごとの ref に固定）・起点の確立と sha の一致確認・base の取り込み | コンフリクトの解消・commitlint に合わせた subject の決定（`--subject-file`）・ビルド・lint・テスト |
| `push` | routing ガード（`--repo` があるとき）・途中のマージ（MERGE_HEAD）の拒否・固定した base が HEAD の祖先でなければ拒否（`base-not-merged`）・差分ゼロの拒否（pr-create）・`pv_push_verified` による push と前後の突き合わせ（結果に `headSha` を添える） | 修正のコミット・opt-in テストの実行 |
| `pr` | routing ガード（`--repo` があるとき）・サーバー上のブランチ head と `--expect-sha` の照合・Closes 対象 Issue の milestone 確認・open PR の検出（同一リポジトリの head だけ。base と head の sha の照合）・`gh pr create` | タイトルと本文の文面・既存 PR 本文の追記 |

- **封筒を使わない。** 結果の最後の 1 行 `PR_PUSH_RESULT {…}` は固定語彙・整数・40 桁 16 進だけで、ホストは採用しない。`base-merge.sh` と同じ理由（上の第 3 弾「封筒なしで足りる理由」）で、ホストが読む値は従来のエージェントの返却値（`prNumber`・`pushed`・`commitFailed`）と同じで、新しく採用する値は無い。`pushed: true` の誤報が resolve (a) を解禁し得る点は従来と同じ経路で、`pushed` は `pv_push_verified` の二条件でしか `pushed` にならない（スクリプトを経由しない自己申告に戻らない）。
- **routing ガードは `base-merge.sh` と同じ関数。** `lib/base-merge-lib.sh` の `routing_check_remotes`（fetch URL と push 先 URL の全行を `url_allowed` で照合）を共有する。`--repo` はホストが `args.repo` を持つときだけ渡す。**持たないランでは照合しない**（従来の pr-create / fix も照合していない）。この場合の別リポジトリへの push の防御は、fix の手順 0（`gh issue view` の title 照合）と、隔離 worktree の運用に依存したままである。`args.repo` を渡すと pr-create / fix も `base-merge.sh` と同じ強さになる（`prepare` だけでなく `push` の push の直前と `pr` の gh の前にも同じ照合を実行する。remote の URL は本体の `.git/config` を共有する worktree 間で書き換えられ得るため）。`pr` モードの `gh pr list` / `gh pr create` / `gh issue view` も `-R <repo>` で束縛し、milestone の件数を読む `gh api` は path に repo を埋める。プロンプトが実行する再利用 PR の本文取得・更新（`gh pr view` / `gh pr edit`）にも同じ `-R` を渡す。
- **コンフリクトの扱いは `base-merge.sh` と逆。** 検証権限のある経路なので、`prepare` はコンフリクトを解消せず**マージを途中のまま残して `conflict` を返す**（エージェントが解消し `git commit -F` で確定する）。途中のまま `push` を呼んでも、`MERGE_HEAD` が残っていれば `merge-in-progress` で止まり push しない。commit hook が既定 subject を拒否したときは abort して `hook-rejected` を返し、エージェントが subject を決めて `--subject-file` つきで再実行する。解消後のコミットが hook に拒否されたときは、エージェントが `git merge --abort` して失敗で返す（プロンプトが固定する）。
- **push の形は 1 形。** `git push --no-follow-tags origin HEAD:refs/heads/<branch>`（`lib/push-verify.sh` の `pv_git_push` が唯一の `git push`）。`--force` 系・`--no-verify` を使わない。push の標準エラーは URL を含み得る行（`To <url>`・`failed to push some refs to '<url>'`・`://` を含む行）を除いて出す（どの出力にも URL を出さない）。
- **起点の取り違えを止める。** `prepare` は checkout 後の HEAD が決めた sha と一致することを確かめ（`sha-mismatch`）、`push` は pr-create で base との差分ゼロなら push しない（`no-diff`）。remote ahead（第三者の push と区別できない）は採用せず `remote-ahead`、双方向とも祖先でないなら `diverged`、リモートにあるのにローカルの `refs/heads/` が無ければ `local-missing` で止まる（判定は `lib/pr-push-lib.sh` の `pp_decide_origin` で、表の単体テストが固定する）。
- **既存 PR の再利用は base と head の sha が一致する 1 件だけ。** base が違う PR・head が動いている PR・複数の PR は再利用も新規作成もしない（`pp_classify_pr`）。fork の同名ブランチの PR（`isCrossRepository`）は一覧から除く。
- **PR の head はサーバーで確認してから使う。** `push` の結果（`race`・`unverified` を含む）に関わらず、`pr` モードは `git ls-remote` で得たサーバー上のブランチ head が `--expect-sha`（`push` の結果の `headSha`）と一致しなければ、作成も再利用もしない（`remote-head-mismatch`・`remote-head-unknown`・`remote-head-missing`）。ローカル HEAD が `--expect-sha` と違えば `head-moved`。push 後に第三者が積んだ未レビューのコミットを含む PR を自動マージ経路へ渡さない。プロンプトは `race` で PR 作成を止める（`unverified` はこの照合に委ねる）。
- **base は worktree ごとの ref に固定する。** `prepare` は base を `refs/worktree/pr-push/base`（linked worktree 間で共有されない）へ取得し、以降の取り込み・`push` の base 検査・差分ゼロ確認はこの ref を使う。並列 worktree が共有する `refs/remotes/origin/<base>` は削除しない（別の worktree が参照中に消すと、そちらの取り込みや検査が解決できず正常な作業を失敗終端させる）。`git fetch` による共有 ref の前進は git の通常動作で、固定した base には影響しない。
- **milestone の確認（create-pr スキル Step 2.5 の手順 3 と同じ判定）。** リポジトリに milestone が 1 件も無ければ非運用とみなして確認しない（`not-used`）。件数・Issue の milestone を取得できなければ PR を作らず止まる（`milestone-check-failed`。取得失敗を非運用や割当済みと読み替えない）。未割当は警告つきで続行し、新規作成なら PR 本文へ警告行を足す（再利用ならプロンプトが追記する）。自律運転ではユーザーの同意を取れないため、create-pr の『候補が 1 件なら同意を得て割り当てる』は行わない（milestone を書き換えない）。判定は `lib/pr-push-lib.sh` の `pp_milestone_status`（表の単体テストが固定する）。
- **静的ガード**（`tests/script-static-guard.test.mjs`）は `pr-push.sh` と `lib/pr-push-lib.sh` も走査する。`gh` は `pr list` / `pr create` / `issue view` と、milestone 件数を読む `gh api`（GET のみ）だけを呼ぶ（merge・review・close・edit・API の書き込みの綴りが無い）。

### 起動時のハッシュ予検査（`run-verified.sh --verify-only`）

**何をするか。** ラン開始時（シードの取得の直後・状態の読み込みの前）に 1 回、`SCRIPT_SHA256` の全エントリ（`<sha256> <スクリプト名>` を 1 行ずつ）を skillDir の実ファイルと照合する。`skillDir` を渡したランで行う（`dryRun` を含む。`dryRun` で `skillDir` を省略したラン〔スクリプトを使わない〕では行わない）。不一致・欠落があれば、状態の読み込みも Plan も実装も始めずに、件数と先頭のスクリプト名を示して停止する。従来は版ずれを最初のスクリプトの起動（exit 3 / 4）で、ラン途中に初めて知った。

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

`state.sh` は状態ファイルへの書き込み（`.items[n]` へのマージ・一括初期化・高水位の更新）を、従来プロンプトに文章で書いていた `mktemp` → `jq` → `mv` の手順から、固定のコマンド列へ移した。ホストが読む値は従来のエージェントの返却値（`ok`）と同じで、新しく採用する値は無いため、`base-merge.sh` と同じく封筒を付けない（上の「測定値の使い方」の (c) 自己申告値を判定に使わない設計）。`ok` が偽って `true` で返ると、保存できていない回復情報（PR 番号・worktree）のまま次へ進み得る。これは従来のエージェントの自己申告と同じ水準で、悪化していない。改善した点は、手順の組み立て（クォート・一時ファイル・原子的な置換）がエージェントの文章解釈に依らなくなったことである。

| 項目 | 従来（プロンプト） | `state.sh` |
|------|------------------|-----------|
| 書き込み先 | プロンプトの `STATE_FILE` | `_/issue-trees/<正の整数>.json` の 1 形だけ（それ以外は exit 2 で何も書かない） |
| patch の渡し方 | 未信頼範囲の囲み + ヒアドキュメント + `--slurpfile` | ヒアドキュメント（終端は呼び出しごとの nonce で作り、本文から nonce を除く）+ `--slurpfile`。patch は jq のプログラム文字列に入らない |
| 入力の形 | なし | 入力はちょうど 1 個の JSON 値（複数の値が続く入力は拒否。`jq -e` は最後の値しか見ないため）。`merge`: 番号は 1 以上の整数・patch はオブジェクト。`init`: type は `implement` / `verify-close`。形が違えば書かず `invalid-input` |
| 壊れた状態ファイル | jq の失敗に任せる | 書き換え前に `.items` がオブジェクトかを確かめ、違えば書かない（`rewrite-failed`）。出力も同じ検査を通ってから置換する |
| 並行書き込み | なし（ホストの直列化だけ） | スナップショットから計算し、置換の直前に元ファイルが変わっていないか確かめる。変わっていれば最初からやり直し、3 回続けば `changed-concurrently`（別ランの書き込みを失わない） |
| 一時ファイル | 後始末はエージェント任せ | 入力の一時ファイル・`st_rewrite` のスナップショット・出力用一時ファイルのパスを trap から見える変数（`pf` / `ST_SNAP` / `ST_TMP`）で持ち、正常終了・失敗経路・TERM / INT / HUP のいずれでも消す（テストが残存 0 を確かめ、SIGTERM 中断も実測する）。SIGKILL では残る |

- **`state.sh` が持たないもの。** 読み込み（`loadState` の読込・照合）と worktree / branch の削除（`state:cleanup`・最終スイープ）は移していない。削除は `--force` を使う別の安全判定を含み、確認と削除を同じスクリプトで行う独立の弾で扱う。掃除の手順 5（削除後の `.worktree` のクリア）だけは `state.sh merge` を呼ぶ。
- **変更検知はアドバイザリで、排他ロックではない。** 検知から `mv` までの数ミリ秒の窓は残る。同一ランの書き込みはホストが直列化している（`enqueueStateWrite`）ので、検知が対象にするのは別ランが同じ状態ファイルを書いた場合である。
- **掃除の手順 5 にも同じ判定指示を入れる。** `state.sh` は書き込みに失敗しても exit 0 で `STATE_RESULT {"ok":false,…}` を出すので、掃除プロンプトの手順 5 にも「`ok` が false・結果の行なし・非 0 終了なら掃除全体の `ok` を false で返す」を入れる（書き込みプロンプトと同じ `STATE_NOTE`）。open な項目が 0 件のときの `init` はホストが呼ばずに成功として扱う（`state.sh` は空配列を `invalid-input` で拒否する）。
- **失敗の返し方は従来と同じ。** 結果の行が出ない・非 0 終了・`ok: false` は、エージェントが `ok: false` を返し、ホストの既存の経路（`StructuredOutput` 未返却は sonnet へ 1 回フォールバック、応答した上での失敗はフォールバックしない）に乗る。`merge` が失敗したら掃除をしない（回復情報を保全する）契約も変えていない。
- **静的ガード**（`tests/script-static-guard.test.mjs`）は `state.sh` と `lib/state-lib.sh` も走査する。`rm` は自分が作った一時ファイルへの `rm -f` だけで、`rm -rf`・`--force` の綴りは無い（ガードが固定する）。

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

| 段階 | 判定語 | 旧手順 |
|------|--------|--------|
| view | `head-moved`（取得失敗・HEAD sha の形式・OPEN でない・期待 sha の不一致）/ `pr-closed` / `wrong-target`（base 不一致・draft） | 手順 2 |
| g0 | `classic-unsupported`（required status checks が 0 件・取得失敗）/ `server-enforcement-missing`（Organization 継承・ruleset の取得失敗・`bypass_actors` が空でない・スレッド解消の強制なし・外部チェックの App ID + context の組が required に無い・client-only チェックあり・取得失敗）/ `issuer-unbound`（`integration_id` が数値でない・取得失敗）/ `checks-not-green`（束縛済み check-run が HEAD に未発行 = 一過性） | 手順 2b (i)〜(v-b) |
| checks | `checks-not-green`（総数 0・合格以外あり・終了コード 8 = pending あり〔一過性 = `err 0`。出力が解析できれば解析結果で、全件 green に読めても止める〕。8 以外の非 0 終了・時間切れ・解析失敗は取得失敗 = `err 1`） | 手順 3 |
| threads | `unresolved-threads` / `head-moved`（取得失敗） | 手順 4 |
| mergeable | `not-mergeable`（CONFLICTING のみ。UNKNOWN は止めない） | 手順 4 |
| external | `external-review-missing` / `checks-not-green`（cursor 以外の check-run が不合格） | 手順 4b |

- **追加した検査は 1 つ**: 各 ruleset の `enforcement` が `active` であること（旧手順は `bypass_actors` のみ。effective rules は active の ruleset だけを返すはずなので通常は同値で、`evaluate` / `disabled` を通さない側にだけ厳しくなる）。`ruleset-policy.md` の「strict 以外の必須構成」表の enforcement 行に対応する。
- **取得失敗・ページ不完全は合格に倒さない**: `gh` の非 0 終了（`--paginate` のページ途中の失敗を含む）・出力サイズ超過・時間切れ（1 回 25 秒・全体 100 秒、孫プロセスごと kill）・想定外の形（HTTP エラー本文が exit 0 で出た等）は、それぞれの段階の fail-closed の判定語と `err == 1` で返す。未解決スレッドは `hasNextPage` が真で `endCursor` が無ければ打ち切らず取得失敗にする。
- **`strict_required_status_checks_policy` は読まない**（`ruleset-policy.md`）。
- **HEAD sha の出所**: スクリプトが `gh pr view` で 1 回取得して固定し、封筒で返す。エージェントはその値だけを `--match-head-commit` に使う。ホストが opt-in ゲートの確認値を持つときは `--expect-sha` で束縛し、不一致は `head-moved`。`--repo` は任意引数（`args.repo` を持つラン）で、持たないランは `observe-pr.sh` と同じく cwd のリポジトリに解決する。

### 静的ガード

G0 は適用 ruleset の `bypass_actors` を読むため `gh_api "${repo_path}/rulesets/${id}" || …` の 1 行が `/rulesets` を含む。`script-static-guard` の「ruleset / リポジトリ設定」パターンは `/rulesets` を設定変更の経路として拒否していたので、**この 1 行の形（`/${id}" ||` が続く GET）だけを許す**ようパターンを狭く直した。許す行が `merge-gate.sh` 以外に無く、形が 1 つであることは専用テストで固定する。書き込み（`-X`・`--method`・`-f` による暗黙 POST）は別のパターンが引き続き拒否する。メソッド指定のパターンは GET のリテラル以外（`-X "$m"` のような変数値を含む）にすべて反応し、`gh_api()` ラッパーの本体が `run_timed "${gh_timeout}" gh api "$@"` の 1 形（メソッド指定を含まない）であることも専用テストで固定する（変数でメソッドを切り替えると `/rulesets/${id}` が DELETE になり得るため）。`EXCLUDED`（除外リスト）と `merge-guard-hook.sh` は変更していない。

### この弾の検証範囲

単体テスト（判定の表・偽 `gh` を差し替えたスクリプト全体・ホストの封筒照合・プロンプトの配線）と変異（危険側 38 件）でのみ検証している。**`autoMerge: true` の実ランでは未検証**（実 GitHub の ruleset / App に対する G0 の通過、`gh pr checks --json state --jq` の実出力と終了コード（pending で 8 を返すかは未確認。8 は一過性の `checks-not-green`、それ以外の非 0 終了は取得失敗で、どちらも合格に倒さない。exit 0 で PENDING が混じっても `checks-not-green`）、隔離 worktree からの `run-verified.sh` 経由の起動を含む）。なお `apps/<slug>`（外部チェック App の ID 取得）は GitHub 側がリポジトリに束縛できないグローバルな endpoint で、他の `gh` 呼び出しがすべて対象リポジトリを明示するのに対する唯一の例外である。

## 第 7 弾: worktree の破棄・掃除（`worktree-remove.sh`）

### 位置づけ: 確認と削除を同じプロセスで行う

掃除プロンプト（merged・置き換え・Recover の continue / discard）と最終スイープのプロンプトは、(a) 登録の確認、(b) lock の扱い、(c) 汚れの確認、(d) `git worktree remove`、(e) ブランチ削除を、文章の手順として持っていた。Recover の汚れの確認だけは別の haiku エージェント（`verifyDiscardSafety`）が先に行い、その結果を見たホストが後から削除用エージェントを起動していた。これを `scripts/worktree-remove.sh`（判断は `lib/worktree-remove-lib.sh` の純関数）の 1 回の呼び出しに置き換え、**確認した状態のまま同じプロセスで削除する**ようにした。`verifyDiscardSafety` と `DISCARD_SAFETY_SCHEMA` は廃止した。`wipCommitted` の自己申告ゲートはホストに残る。

封筒は使わない。ホストが読む値は従来の掃除エージェントの返却値（`ok`）に `retained`（worktree が残ったか）と `branchSha` を足したもので、削除の可否はスクリプトの中で閉じる（ホストが結果の値を判定に採用してマージ・push・設定変更へ進むことはない）。ホストは結果を採用する側でも、`retained` が真のパスを「削除成功」に数えない（残置バイトの実測から外さない）。スイープの `removed` は候補集合と突き合わせ、候補にないパスは数えない。

### モード

| モード | 使う場面 | 汚れ | submodule | ブランチ |
|--------|----------|------|-----------|----------|
| `superseded` | マージ済み・置き換え済み（fix の旧 worktree）・最終スイープ | 汚れていても `--force` で消す（件数を結果に記録） | 未記録の変更（追跡の変更・未追跡・新コミット）があれば保持 | 触れない |
| `discard` | Recover の continue / discard | 汚れていれば保持。`--force` は使わない | 初期化済み（`submodule status` の先頭が `-` でない・または worktree 専用の `modules` に残りがある）なら保持 | `--branch` があれば、worktree が無くなったあとでだけ消す。消す前の先頭 sha を結果に出す。base と同名は消さない |
| `sweep` | ラン終了時 | `superseded` と同じ規則を候補ごとに適用 | 同左 | 触れない |

- **汚れの確認は `git -C <worktree> -c core.excludesFile= status --porcelain=v2 -uall --ignore-submodules=none`**。利用者の `status.showUntrackedFiles=no` や `diff.ignoreSubmodules=all` に左右されない形で、実測では素の `git status --porcelain` が空でも未追跡が残り、`--force` なしの `git worktree remove` もその未追跡を黙って消す（git 2.54）。現行の `verifyDiscardSafety` の素の `git status --porcelain` にもこの穴があった。`-c core.excludesFile=`（空値）で、利用者のグローバルの除外ファイル（`core.excludesFile` の設定先と、未設定のときの既定 `~/.config/git/ignore`）を外す: そこに載せた `.env` や `*.secret` などの未追跡ファイルは、素の status では見えないが、削除すれば失われるため汚れに数える（`--ignored` は見ない: `node_modules`・`dist` のような再生成できる物で常に保持になるのを避ける）。リポジトリの `.gitignore` と `.git/info/exclude` に載った ignore 対象（`node_modules`・`dist` 等）は従来どおり汚れに数えず、中身ごと消える。**この判断で残る限界**: リポジトリの `.gitignore` に載ったファイル（たとえばコミットしない `.env` をリポジトリ側で無視している場合）・`skip-worktree` / `assume-unchanged` を付けた追跡ファイルの変更・どのブランチからも辿れない detached HEAD のみのコミットは、汚れとして見えず（または保持の対象にならず）、消える。いずれも旧実装と同じで、この弾で新たに生じた穴ではない。`git -C` の対象が worktree 自身であること（`rev-parse --show-toplevel` の実体の一致）を確かめ、`.git` が壊れて git が親の repo を見る場合は汚れを確認できなかった（-1）として保持する。
- **lock は Claude Code の形で、lock した側が死んでいるときだけ外す**。形は `claude agent|session <名前> (pid N)` と `claude agent|session <名前> (pid N start <LC_ALL=C TZ=UTC ps -o lstart= の出力>)`（書式の例: `claude agent agent-0123456789abcdef0 (pid 12345 start Mon Jan  1 00:00:00 2026)`。Claude Code 側の照合は `/^claude (?:agent|session) .{1,255} \(pid (\d{1,10})(?: start (.{1,255}))?\)$/` で、スクリプトの解析も同じ範囲に揃えた）。死んでいる = 死亡を**肯定的に**確定できた（観測のうち少なくとも 1 つが「存在しない」と言い、どれも「存在する」と言わない。観測は `kill -0`〔`LC_ALL=C` のエラーが `No such process` = 無い、成功・`Operation not permitted`〔EPERM〕= ある、それ以外 = 判定不能〕、`ps -p`〔自分の pid が見える自己確認が通ったうえで終了コード 1・出力空 = 無い。ps が無い・失敗・自己確認が通らないときは根拠にしない〕、`/proc/<pid>`〔`/proc/self` が見える環境でだけ、無ければ無い〕。判定は `lib/worktree-remove-lib.sh` の `wr_pid_state`〔alive / dead / unknown。unknown は保持〕）、または `start` があって現在のプロセスの `LC_ALL=C TZ=UTC ps -o lstart= -p N` と一致しない（pid の再利用。比較は空白の連なりを畳んで行う）。開始時刻の `ps` が無い・失敗した・出力が空のとき、および生死の観測がすべて判定不能（EPERM のみ・ps が使えず /proc も無い・未知の kill のエラー）のときは、観測できないので生存扱い（保持）に倒す。**この pid は agent ごとではなく、セッション（メインの `claude` プロセス）の pid** なので、同じセッションの中から実行すると lock は常に生存と判定されて保持になる（外れるのは、そのセッションが終わったあとの実行だけ）。旧プロンプトは無条件に `unlock` して `--force` で消していたので、生きているセッションの worktree を消し得た。それ以外の形の lock（利用者が手で付けたもの・理由なし・`start` が空など形が違うもの）は外さず、`retained-locked` として保持する。
- **メイン worktree（`git worktree list --porcelain` の先頭エントリ・実体のパスの一致）、登録されていないパス、カレントがその中にあるパスは消さない**。`rm -rf` は持たない: 旧プロンプトの `rm -rf` フォールバックは、隔離 worktree（`<main>/.claude/worktrees/`）では「メインの下は消さない」の除外に当たって動いておらず、残りは次回のスイープか手動に任せる。
- **ブランチ削除は `git branch -D -- "${branch}"` の 1 形**。worktree が残っている間は消さない（`keep`）。削除後の `git reflog --all` に WIP コミットは残らず（gc までの到達不能オブジェクトとして残るだけ）、旧コードの「削除後も reflog から復元できる」は誤りだった。復元の手がかりは結果の `branchSha` で、ホストはそれをログに残す（40 桁の 16 進だけを受け入れる）。
- **結果語の `main` と `cwd`**: `main` はメイン worktree を指していたとき、`cwd` はカレントディレクトリが対象の worktree の中にあったとき（消さない）。どちらも `ok: false`・`retained: true` だが、原因が違うので語を分けた（ホストが読むのは `retained` だけで、語の分類はしない）。`branchSha` は、ブランチの削除に失敗したとき（`branch: failed`）は空にする（「削除前の先頭 sha」ではなく「消えずに残った先頭」なので、復元の手がかりとして出さない）。
- ok の定義: `superseded` は worktree が残っても非致命（`retained: true` で区別する。メイン worktree を指していた場合・カレントがその中だった場合だけ異常で `ok: false`）。`discard` は worktree が無くなり、ブランチも（指定があれば）消えた（または元から無い・base と同名）ときだけ `ok: true`。保持は `ok: false`・`retained: true`・StructuredOutput は返っているので、ホストの終端は `blocked` ではなく `failed`（旧「安全確認が dirty → 保全して failed」と同じ）。

### 静的ガード

`script-static-guard` の `git worktree remove` 全面禁止を、`git push` と同じ**行単位の許可形**に改めた: `git worktree remove -- "${path}"`・`git worktree remove --force -- "${path}"`・`git worktree unlock -- "${path}"`（後ろに `>/dev/null 2>&1 || rc=$?`）だけを許す。`git worktree move` は許可形が無く常に拒否する。`git branch` の削除・上書き・改名（`-d` / `-D` / `-f` / `-M` / `-m` / `-C` / `--delete` / `--force` / `--move`。短縮の連結・長いオプションの一意な省略形〔`--del`・`--dele`・`--forc`・`--mo`〕・引用符つき〔`"-D"`・`'--delete'`〕を含む）を禁止するパターンを新設し、`git branch -D -- "${branch}"` の 1 形だけ許す。`git update-ref` は `git branch` の検査をすり抜ける経路（`update-ref -d "refs/heads/…"`）なので、`base-merge.sh` と `pr-push.sh` が作業用 ref を片付ける `git update-ref -d "${base_ref}"` / `"${branch_ref}"` の 2 形（変数は `refs/worktree/…` の固定値だけを持つことを専用テストで固定）以外を拒否する。許可形が `worktree-remove.sh` にしか無く、決まった行（remove 2 形・unlock 1 形・branch -D 1 形）だけが存在することは専用テストで固定する。除外リストと `merge-guard-hook.sh` は変えていない（hook は worktree の削除を拒否する対象ではなく、スクリプトへ移しても実行時の防御層は弱まらない）。`rm` の再帰削除の禁止は変えず、`worktree-remove.sh` に `rm`・`git clean`・`git reset`・`git checkout`・`git stash` が無いことも専用テストで固定する。

### 既知の挙動（旧プロンプトとの差）

- **continue の保持条件が広がった（安全側への意図的な厳格化）**: 旧 continue は汚れ（素の `git status --porcelain`）だけを観測して `--force` で消した。新しい continue は discard と同じ `--mode discard` なので、初期化済み submodule や生きている agent の lock でも保持し、`failed` で保全する（分岐の意味 = 保持 → `failed` は不変）。submodule を `update --init` する運用のリポジトリでは、continue が通らず手動の対処が要り得る。
- **sweep は状態ファイルの形（ちょうど 1 個の JSON 値で、`.items` がオブジェクト）を先に確かめる**。`jq` は空ファイル・空白だけの入力でも 0 終了するため、確かめないと保持対象が空のままスイープが進み `--force` で消し得る。形が違えば何も消さず `state-unreadable` で終わる。
- **discard で保持した（または結果が読めなかった）worktree は、ホストのメモリ上でも最終スイープの候補から外す**（`sweepHeldPaths`）。状態ファイルの保持対象（`failed` / `blocked` / `monitoring` が記録した worktree）は書き戻しの成否に依存し、continue / discard は先に `.worktree` を空にするため、保持しても failed の書き戻しが失敗すると保持対象から外れ、スイープが superseded の規則で `--force` 削除し得た。対策は二つ: (a) discard で `.worktree` を空にする更新を JSON マージに含めず、掃除エージェントの手順 2（worktree が無くなったときだけ空にする）に任せる、(b) 削除を確認できなかったパス（保持・結果なし・例外）を `sweepHeldPaths` に入れてスイープの候補から外す（同じパスへの後の superseded の試みはその結果に従う）。
- **superseded の保持は非致命で、状態ファイルの `.worktree` は保持したパスを指したまま残る**（`.worktree` のクリアは worktree が無くなったときだけ行うため）。回収は最終スイープか手動で、保持の理由（lock・submodule の未記録の変更・削除の失敗）はホストのログに出る。
- **`git worktree list --porcelain` の `locked` 行が出ない版の git では、lock された worktree を lock なしと読み**、`git worktree remove` が lock を理由に拒否して `failed`（保持）に倒れる（unlock は決して行わない）。どの版から `locked` が出るかは未確認で、実測は git 2.54 のみ。`/proc/<pid>` の確認は Linux 限定（macOS は `kill -0` と `ps -p`）。macOS で `ps` が使えず `kill -0` も判定不能な場合は死亡を確定できないので保持になる。
- **保持した worktree は残置の台帳（`ephemeralWorktrees`）へ事後に載せる**。台帳の不変条件は「台帳（+ ラン開始時の観測）は、物理的に存在しうる worktree を重複なく 1 件ずつ数える」。fix の旧 worktree は「置換され純増しない」前提で台帳に記録せず、予約（`EPHEMERAL_KIND_MAX`）にも含めない。この前提は旧実装（必ず `--force` で消す）では成り立っていたが、スクリプトが保持すると、そのパスが件数・バイトの両軸から漏れる。そこで掃除の結果が「消えたと確認できない」（`retained` が真・結果なし・例外・状態マージ失敗による掃除スキップ）ときは、種別（fix・merged・superseded・discard）を問わず kind `retained` で台帳へ載せ、バイトの再測定の対象に入れる。台帳・ラン開始時の観測・削除確認済みに既にあるパスは二重計上しない。**置換（fix。旧を消して新しい worktree に置き換える経路。呼び出し側が `options.replacementWorktree` に新パスを渡す）の計上は、規則を 1 か所（純関数 `planReplacementAccounting`。適用は `applyReplacementAccounting`）にまとめている**（Issue #624。個々の経路で台帳を継ぎ足す方式は同じ箇所への連鎖指摘が 3 巡続いた）。イシューごとの現行の worktree 1 本は、実装の記録（`implement`）またはラン開始時の観測が 1 件として数えている（パスが古くなっても台帳の 1 件は残る）。置換 1 回で物理的に増える本数は、旧が消えたことを確認できれば 0、確認できなければ（保持・結果なし・例外・旧のパスが空）1。旧が消えたときは、旧が「数えられている」なら件数を動かさず、新しい worktree をバイトの測定対象（`slotInheritedPaths`）にだけ入れる（新パスが不明なら `slotUnknownLiveCount` を増やし、バイトの再測定は物理一覧へフォールバックして測る）。旧が消えたが未計上のとき（例: 前ランの後に手動で消された worktree を状態ファイルが指していた monitoring 再開）は引き継ぎ先の 1 件が無いので、新を kind `replacement` で 1 件載せる（旧が別名で数えられていた場合は 1 件の過大になるが安全側）。旧が消えなかったときは、旧のパスが「数えられている」（台帳・ラン開始時の観測・`slotInheritedPaths` のどれかにある。判定は `isWorktreeCounted` の 1 つで、`recordRetainedWorktree` も同じ関数を使う）ならそのまま、そうでなければ kind `retained` で 1 件載せ、新は kind `replacement` で 1 件載せる（新パスが空なら `path: ''` の件数だけのエントリ）。旧のパスが空（直前の fix がパスを返さなかった）のときは掃除を試みないが、旧は消せていないものとして新を載せる。対応表: 旧が消えた・計上済み→件数 0・新は測定対象へ / 旧が消えた・未計上→新の 1 件 / 旧が保持され計上済み→新の 1 件 / 旧が保持され未計上→旧と新の 2 件（物理も 2 本増える）/ 旧のパスが空→新の 1 件。ここから、連続した fix でも台帳の件数は物理の本数を下回らない（消えた→保持で +1、パスなしの fix の次の fix で +1。旧が消えて未計上のときだけ過大側に 1 件振れうる）。引き継ぎ済みの新が後で `replacementWorktree` 無しの掃除（merged 後・最終スイープなど）に保持された場合は、件数は台帳の 1 件が数えているので台帳には載せず（二重計上しない）、ラン終了時の「保持した worktree」の案内にだけ出す（`slotRetainedPaths`）。新パスが不明のときのバイトの再測定は他の未検証エントリと同じ扱いで、物理一覧へフォールバックし、取れなければ新規着手を止める（件数を増やしつつ測定を保守側に倒す）。既知の制約: 置換で台帳の件数が増えない場合は `remeasureResidualBytesIfDue` の間引きの契機にならない。新規着手の直前は `remeasureResidualBytesNow` を直接呼ぶので、引き継いだ新のパスはそこで測る。`replacement` は状態ファイルが追跡中の現行の実装 worktree なので、使い捨ての案内には出さない（`implement` と同じ。出すと未マージの成果の誤削除を誘う）。孤立スキャンの除外集合にも入れない（`implement` と同じ扱いで、従来は台帳外だったので所有権照合付きの回収の対象のまま）。置換の呼び出しは fix の 2 経路（Review ループ・Merge ループ）と fallback の旧 worktree の掃除の 2 経路。他の経路（merged 後の掃除・superseded・discard → 再 Plan）は新しい worktree を同じ呼び出しで作らないので、旧が保持されれば `retained` で載る（discard → 再 Plan の新しい実装 worktree は、その後の実装で `implement` として別に載る）。最終スイープで消せなかった候補・スイープが例外で終わったときの候補は、消えたと確認できないので `retained` で載せる（消せた候補は削除確認済みにして測定の対象から外す）。**予約（`EPHEMERAL_KIND_MAX`）は変えない**: Claude Code は実行中のエージェントの worktree を `claude agent … (pid <セッション pid> start …)` で lock し、エージェントが終了すると lock を外す（終了後の worktree には `locked` 行も `.git/worktrees/<id>/locked` も無いことを実測）ので、正常に終わった fix の旧 worktree は通常 lock されておらず消える。保持が起きるのは、実行中のエージェントの worktree を消そうとした場合・クラッシュで lock が残り pid の判定が unknown になる場合・submodule の未記録の変更がある場合などに限られ、稀なものを全イシューの予約に積むと着手を無用に絞るため、事後に載せて次の着手判定から効かせる。載せた分（`retained`・`replacement`）は予約の差し引き（`recordedByIssue`。`LEDGER_ONLY_KINDS`）に数えない（予約済みの枠を食わせない。数えると載せた分だけ予約が減り、件数ゲートが上がらない）。ラン終了時の案内は、`retained` を使い捨て（`git worktree remove` で手動削除してよい）と別の見出しにする: 汚れ（`retained-dirty`）・lock（`retained-locked`）・submodule の変更（`retained-submodule`）のいずれかで消さなかったものなので、中身を確認してから手動で対処する。理由はエントリごとには持たない（ホストが読むのは `retained` だけ）ため、見出しに結果行の語を並べる。返却値は `ephemeralWorktrees`（使い捨て）と `retainedWorktrees`（保持）に分ける。後から消えても台帳の件数は戻さない（件数は過大側 = fail-closed で、台帳の長さが単調に増える前提を保つ。バイトは削除確認済みになれば測定の対象から外れる）。
- 新しい lib（`lib/worktree-remove-lib.sh`）を足したので、**全スクリプトのハッシュが変わる**（`run-verified.sh` は lib 全体をハッシュに含める）。同じ時期に別のスクリプトを変更している作業は、`SCRIPT_SHA256` の表・生成物・`script-static-guard.test.mjs` で競合する。後からマージする側は再ビルドが要る。

### この弾の検証範囲

単体テスト（判断の表・実 git のサンドボックス〔clean・追跡変更・staged・未追跡・入れ子の独立 repo・ignore のみ・`showUntrackedFiles=no`・グローバルの除外ファイル（`core.excludesFile`・既定の XDG）・`ignoreSubmodules` 設定・submodule 未初期化 / 初期化済み / 内部の変更 / deinit 後・lock〔生存 pid / 死んだ pid / `start` つきの一致・不一致〔pid の再利用〕・`ps` の失敗・EPERM〔pid 1〕・`kill -0` の判定不能〔pid 9999999999〕・壊れた ps での ESRCH・`session` 形 / 他形式〕・実体なし・メイン worktree・未登録パス・`.git` 破損・空白を含むパス・ブランチの 5 状態・引数の誤り・sweep の保持照合と状態ファイルを読めない場合〕を bash 3.2 と 5 で・ホスト配線〔モード・引数の組み立て・`retained` の扱い・Recover の分岐・discard で保持したパスがスイープの候補に入らないこと〕）と変異（危険側 50 件）でのみ検証している。**実ランの隔離 worktree からの `run-verified.sh` 経由の起動は未検証**で、`ps -p` / `kill -0` による pid の生死判定は同一ホストの agent を前提にする（別ホストの worktree を共有しているランは想定しない）。

## 第 8 弾: monitor の CI 完了待ち（`observe-pr.sh --mode checks --until settled`）

### 位置づけ: 第 2 弾の観測の延長で、安全判定には使わない

monitor の手順 2〜3 は、HEAD sha のチェックの完了を `gh pr checks --watch --interval 60`（Bash の timeout 600000 で最大 4 回再実行 = およそ 40 分）で待ち、続けて `gh pr checks` の出力を列挙して「合格 / pending / 失敗」を数えていた。これを第 2 弾の `observe-pr.sh` の `checks` モードに `--until settled` を足して置き換えた。**判定は助言的なまま**で、位置づけは第 2 弾の節と同じである: monitor の出力（`ready` / `timeout` / `needs-fix` と件数）はマージ・クローズ・push・削除の可否に使われない（マージ可否は merge-exec が `merge-gate.sh` で再取得して判定する）。ホストが封筒を照合して採用するのは引き続きチェック総数だけ（手順 2 と 3e の `--until` を持たない checks の封筒）で、**`--until settled` の封筒はホストが採用しない**。その封筒は `inputSha256` に `until` を含むため、転記されても `applyChecksObservation` が入力束縛の不一致（`input`）で採用せず、`checksTotal` を省略した従来の fail-closed 経路に落ちる（テストが固定する）。

### 何をスクリプトにしたか

- check-run を `gh api --paginate`（全ページ）で、commit status を `/status`（`--paginate`）で読み、`lib/observe-checks-lib.sh` の純関数 `checks_classify` で「合格 / 未完了 / 不合格」に分類する。payload は既存の `checkRuns` / `statuses` / `total` に `passed` / `pending` / `failed` の 3 つの整数を足したもの（`--until` を付けた checks だけ。通常の checks の payload の形は変えない）。
- 分類は `merge-gate.sh` と同じ側に倒す。check-run は `(.conclusion // .status)` が `success` / `neutral` / `skipped` なら合格、`queued` / `in_progress` / `waiting` / `pending` / `requested` なら未完了、**それ以外はすべて不合格**（`failure` / `cancelled` / `timed_out` / `action_required` / `stale` / `startup_failure` と未知の語彙）。commit status は `success` が合格、`pending` が未完了、それ以外は不合格。combined status の最上位の `state` は使わない（status が 0 件でも `pending` を返すため）。形の違う入力は件数を出さず取得失敗にする（0 件に畳まない）。
- **重複排除と射影（レビュー指摘の修正）。** REST の `/commits/<sha>/check-runs` は古い check suite の `cancelled` を新しい `success` と並べて返す（実測: ある PR の head で REST 12 件・一意 7 件）。`gh pr checks`（旧版と `merge-gate.sh` が使う）は最新だけを見るので、揃えないと新版だけが failed になり fix 予算を空費する。分類の前に、同じ `(app.id, name)` の check-run は `id` 最大の 1 件、同じ `context` の commit status も `id` 最大の 1 件に畳む（`checks_latest`。`id`〔数値〕か名前を持たない要素は畳まずそのまま数える）。件数・総数・payload の `checkRuns` / `statuses` も畳んだ後の数。`status` が未完了語彙の check-run は `conclusion` を持っていても未完了に数える。取得時に分類へ必要な `id` / `name` / `status` / `conclusion` / `app.id`（status は `id` / `context` / `state`）だけに射影し、JSON は `jq --argjson`（1 引数）ではなく標準入力で渡す（Linux の 1 引数 128 KiB 上限で、巨大な `output.text` を含む応答が E2BIG になり CI green でも monitor が止まるのを防ぐ）。
- **met は「未完了が 0 件」**。不合格があっても未完了が 0 なら met で、全チェックの完了を待つ点は旧 `--watch` と同じ（失敗を見つけたら早く返す変更はしていない）。総数 0 件も未完了 0 なので met（`total: 0`）。旧 `--watch` は「チェックが無い」と即時に非ゼロ終了していたので、同じく 0 件で待ち続けない。0 件の扱い（コンフリクト再判定 #479・3e の有界待機）は monitor の手順 3e が従来どおり決める。

### 待ち時間の総上限（現行と同じ 40 分）

旧 `--watch` の最長は「Bash の timeout 600000（10 分）× 再実行 4 回」でおよそ 40 分。新しい完了待ちは、1 回の起動を**壁時計 90 秒 + 数秒以内**（第 2 弾の仕組みをそのまま使う: gh 1 回ごとに 25 秒の制限・グループごと kill・残りが 1 観測分に満たなければ始めない）にし、`--attempt` を 1 から増やして再実行させる。既定は**25 秒間隔・1 起動 4 観測・最大 30 回**:

- 1 起動の名目の所要 = 3 回の sleep（25 秒 × 3 = 75 秒）+ 4 観測の gh（1 観測あたり gh 3 回で数秒）= およそ 83 秒。壁時計上限 90 秒に収まる。
- 合計 = 83 秒 × 30 回 = およそ 41.5 分（`--watch` の 40 分と同等。壁時計いっぱいまで使った場合の上限は 90 秒 × 30 = 45 分）。gh が遅く 1 起動が早く切られるときは待ち時間が短くなる側にずれ、この場合は `exhausted` が早く出て `timeout`（次ラウンドの再監視）になる。
- **回数の上限はスクリプトが強制する**: `--attempt` は 1 以上 30 以下で、範囲外は exit 2（封筒なし）。既定値は `observe-pr.sh` の `env_int "${OBSERVE_PR_MAX_ATTEMPTS:-}" 30 40 1`（環境変数での引き上げは 40 まで）で、ホストの定数 `OBSERVE_CHECKS_SETTLE_MAX_ATTEMPTS`（プロンプトの「最大 30 回」）と一致することをテストが固定する。プロンプトは回数を書くだけで、書き換えても通らない。
- **既知の限界（第 2 弾と同じ）**: `--attempt` を進めずに同じコマンドを繰り返すこと、`--attempt 1` から何度でも始め直すことはスクリプトからは止められない。旧 `--watch` の「再実行は 4 回まで」もプロンプトの指示だけで強制されていたので、退行ではない。flaky の rerun（手順 3c の 1 回だけ）の後は `--attempt 1` から再監視する。
- 通常の `checks --wait`（手順 3e の「総数が 1 件以上になるまで」）の上限は従来どおり 7 回（およそ 10 分）で変えていない。

### 手順 3 で変えた点（`--watch` 時代との差）

- **観測状態の 3 状態（整合 / 確定 0 件 / 不整合）は維持し、判定の入力を REST の 1 本にした。** 旧「不整合」は手順 2 の REST 総数と `gh pr checks` の出力の列挙の食い違いだった。件数の出所が 1 本になったので、不整合は「手順 2 の確定値が 1 件以上なのに手順 3 が met で total 0」と「手順 3 が取得不能（error・非 0 終了・JSON なし・`headSha` が空のまま exhausted）」になった。再取得（30 秒間隔・最大 3 回）と終端（`blocked` / `quality`。`ready` にも `timeout` にも 3e にも倒さない）は同じ。
- 手順 2 が取得失敗で手順 3 も取得不能なら、旧は `gh pr checks` の列挙で先へ進めたが、新は状態 3 の再取得 → `blocked` / `quality` になる（REST の取得失敗を列挙で補えなくなった。fail-closed 側の変化）。
- `gh pr checks` の終了コード（1 = 失敗あり・8 = pending あり）と `no checks reported` の読み分けは廃止した。`exhausted`（`headSha` あり = 未完了が残ったまま待機上限）の扱いは状態 1 の「exhausted の規則」が唯一の定義で、`failed` が 1 件以上なら手順 3c の `needs-fix` を優先し、0 件のときだけ `timeout` にする（手順 b と 3e はこの規則を参照するだけで、3e → 手順 3 の往復後の `exhausted` も同じ）。
- 手順 3c の失敗原因の調査（`gh run view --log-failed`）は monitor の判断として残す。スクリプトは件数だけを返し、チェック名・ログは封筒に入れない（外部由来の文字列を入れない方針は第 2 弾と同じ）。

### この弾の検証範囲

単体テスト（`checks_classify` の表・偽 `gh` を差し替えたスクリプト全体・ホストの封筒照合・プロンプトの配線）と変異（危険側 19 件）でのみ検証している。**実 GitHub の PR に対する実ランでは未検証**（`gh api --paginate` の `/commits/<sha>/status` が 100 件超の status を複数ページで返すときの合算、実際の check-run の `conclusion` 語彙、40 分規模の実待機を含む）。

## 第 9 弾: Recover の機械手順（`recover-prep.sh`）

### 位置づけ: 機械的な部分だけを移し、判断はエージェントに残す

`recoverPrompt` は、(a) worktree の HEAD からのブランチ解決（`git -C … rev-parse --abbrev-ref HEAD` の結果で dead worktree / detached / 通常を場合分け）、(b) 未コミット変更の WIP コミット（`git add -A` → `git commit`。フック失敗なら `wipCommitted: false`）、(c) `origin/<base>` の取得、(d) base との差分の有無、を文章の手順として持っていた。これを `scripts/recover-prep.sh`（判断は `lib/recover-prep-lib.sh` の純関数。汚れの行数と入力検証は第 7 弾の `lib/worktree-remove-lib.sh` を再利用する）の 1 回の呼び出しに置き換えた。**継続か破棄かの判断と、回復ブリーフ（done / remaining / broken）の作成はエージェントに残る**。スクリプトはブランチの削除・worktree の削除・push・マージをしない（削除は `worktree-remove.sh`）。エージェントは結果の行の `branch`・`worktreeMissing`・`wipCommitted` を返却へ写す。`RECOVER_SCHEMA` は変えていない。

### 封筒を使わない理由（判断）

ホストが `wipCommitted` を**削除の第 1 層のゲート**に使う（`wipCommitted !== true` なら掃除エージェントを起動せず `failed` で保全する）ため、自己申告ではなくスクリプトの出力が根拠になる以上、封筒が要るかを検討した。結論は**不要**:

- 削除の実効のゲートは第 2 層、つまり第 7 弾の `worktree-remove.sh --mode discard` が**削除と同じプロセスで**行う独立観測（`git -c core.excludesFile= status --porcelain=v2 -uall --ignore-submodules=none` が空、初期化済み submodule なし、`--force` なしで削除、lock が生きていれば保持）。`wipCommitted: true` を偽ってもこの層は破れず、未退避の変更があれば `retained-dirty` で保持される。第 1 層は「退避に失敗したと分かっているなら掃除エージェントを起動すらしない」という早期の安全側の打ち切りで、偽の `true` を通しても失うものは無い（第 2 層が止める）。
- 偽の `false`（本当は退避できているのに `false`）は保全側（`failed`）に倒れるだけで、データは失われない。
- `branch` と `worktreeMissing` は従来もエージェントの自己申告で、ホストは `isValidBranchName` と `worktreeAlive` の規則で受け取る。ブランチの削除は第 7 弾が「worktree が無くなったあとでだけ・base と同名は消さない」で閉じ、さらに `--path` と `--branch` を両方渡す discard は、**削除の前に同じプロセスで worktree 自身の HEAD（`git symbolic-ref -q --short HEAD`。toplevel がその worktree だと確かめた後）を読み、`--branch` と違えば（detached を含む）`retained-branch-mismatch` で worktree もブランチも消さない**。エージェントが無関係なブランチ名を返しても、その名前のブランチも別の worktree も消えない（結びつけの根拠は申告ではなく削除と同じプロセスの観測）。dead worktree〔実体が無い〕と `--path` なしの残骸は読む HEAD が無いので従来どおり。この弾で新しく採用する値は無い。
- 封筒を付けても、悪意あるエージェントが `sha256sum` を回して作れる範囲（第 1 弾の「何を防がないか」）に収まり、得られるのは転記ミスの検出だけである。ホストの検証を増やす代わりに、第 2 層を実効のゲートとして据え置くほうが堅い。

なお、ホストが `wipCommitted` を**唯一の**削除条件に使う設計に将来変えるなら、そのときは封筒を付ける（この弾では変えない）。`diff`・`commitsAhead`・`baseSha` などはエージェントの判断材料で、ホストは読まない。

### 結果の行（固定語彙・真偽・件数・40 桁 16 進の sha と検証済みのブランチ名）

`{"resolved","reason","branch","source","worktreeMissing","wip","wipCommitted","dirty","branchExists","branchSha","baseFetched","baseSha","diff","commitsAhead","filesChanged"}`。

- **ブランチ解決（`rp_resolve`）**: live（`git worktree list` に登録済みで、`rev-parse --show-toplevel` の実体が対象のパスと一致）なら worktree の HEAD（`git symbolic-ref -q --short HEAD`）を使う。state のブランチと食い違えば HEAD を優先する（WIP が積まれるのは HEAD 側）。dead（パスが存在しない）と branch だけの残骸は記録されたブランチを使う（無ければ `branch: ""` で確定し、継続不能 = discard。記録されたブランチが base と同名なら live と同じく `base-branch` で確定しない）。**確定しない**（`resolved: false`・何も書かない）: メイン worktree（`main-worktree`）、登録されていないパス（`not-registered`）、パスはあるが git がそのパス自身を指さない（`toplevel-mismatch`。`.git` が壊れて git が親の repo を見る場合に、メインの変更を WIP コミットしてしまうのを防ぐ。実体があるので dead 扱いにもしない）、detached HEAD（`detached`）、HEAD が base と同名（`base-branch`。base に WIP を積むと discard で消せず continue は壊れる）、worktree の一覧を取れない（`list-failed`）。
- **WIP コミット**: 汚れの観測は第 7 弾と同じ対象の `git -C <worktree> -c core.excludesFile= status --porcelain=v2 -z -uall --ignore-submodules=none`（利用者の `status.showUntrackedFiles`・submodule の ignore 設定・グローバルの除外ファイルに左右されない）。**`-z`（NUL 区切り）で読む**: 区切りなしだとパスが C 引用（非 ASCII・`"`・`\`・タブ・改行）で出て、入れ子の git リポジトリの検出（`? パス/`）が取りこぼし、gitlink だけを WIP コミットして `wipCommitted: true` になっていた。シェル変数は NUL を持てないので、`tr` で改行→`?`・NUL→改行（パス中の改行が行区切りと紛れない）に変えて 1 レコード 1 行にし、rename / copy レコードの直後の元のパスは落とし、git の終了コードは末尾の `GITRC=` の行で受ける。第 7 弾の `worktree-remove.sh` は行数と第 3 フィールドだけを読み、引用はパスの部分にしか影響せず件数・submodule 判定は変わらないので `-z` なしのまま（検出器の取りこぼしは無い）。フックを通す（`--no-verify` なし。stdin は `</dev/null`、フックの出力は標準エラーへ送って標準出力の最後の 1 行を結果に保つ）。**退避完了（`wipCommitted: true`）の根拠はコミットの終了コードではなく、コミット後の同じ観測が空であること**（`rp_wip_after`）。さらに**成功の終了コードでも、HEAD が進んでいない・進んだが前の HEAD との差分が空（フックが commit のあとで `reset --hard` などで変更を捨てた。汚れは無く見える）なら `empty-commit`・`false`**。マージ・cherry-pick・revert・rebase の途中（`MERGE_HEAD` / `CHERRY_PICK_HEAD` / `REVERT_HEAD` / `REBASE_HEAD` と `rebase-merge` などのディレクトリ）は未マージと同じく触らず `in-progress`・`false`。フックが拒否した（`commit-failed`）・フックがファイルを書き換えた／グローバルの除外に載った未追跡ファイルが拾われずに残った（`residual-dirty`。ほかにコミットできる変更があって commit は成功したとき。汚れがその未追跡ファイルだけだと `add -A` が何も拾わず commit が「nothing to commit」で失敗するので、フックが走っていなくても `commit-failed` になる）・submodule 内の未コミットの変更が残った（`submodule`。汚れが submodule だけで commit が失敗した場合も同じ語）・観測できなかった（`unverified`）は `false`。拒否されたときの `git add` は戻さない（staged も worktree-remove.sh が汚れとして保持する）。コンフリクト中（`unmerged`。`add -A` はマーカー入りの内容を確定させてしまう）と入れ子の独立 git リポジトリ（`nested-repo`。`add -A` は中身ではなくポインタだけを記録し、worktree を消すと中身が失われる）は触らず `false`。退避の対象が無い（dead worktree・branch だけの残骸）は `skipped`・`true`。
- **初期化済み submodule の扱い**: 親の `git add -A` は submodule 内の未コミットの変更を記録しない。そうした変更はコミット後も汚れ（`S` で始まる行）として残るので `wip: submodule`・`wipCommitted: false`。変更が無ければ初期化済みであること自体は WIP の判定に影響しない（`wip: none`・`true`）。discard の可否は第 7 弾の `--mode discard` が「初期化済み submodule があれば保持」で判定する。
- **base の取得と差分**: `git fetch origin refs/heads/<base>:refs/remotes/origin/<base>`（旧プロンプトと同じ共有の追跡 ref。保存先を明示する。Issue #361）の成否を `baseFetched` に出し、成功したときだけ `git diff --quiet --no-ext-diff --ignore-submodules=none <baseSha>...<branchSha>`（利用者の `diff.ignoreSubmodules` で submodule ポインタだけの変更が `empty` にならないよう固定する）の終了コード（0 = `empty`、1 = `nonempty`、他 = `unknown`）で差分を判定する。**取得に失敗したら `unknown`（`empty` にしない）**: 古い追跡 ref が残っていてもそれで判定しない。`empty` は discard の根拠になるため、プロンプトは `unknown` を「差分が空とは見なさず、branch の内容を直接読んで判断する」と指示する。ブランチが実在しない（`branchExists: false`）ときも `unknown`。`nonempty` のときは先行コミット数（`commitsAhead`）と変更ファイル数（`filesChanged`）も出す。
- 出力にパス・フックの出力・外部由来の文字列を入れない（ブランチ名は `wr_valid_branch` を通ったものだけ。診断は標準エラーへ）。結果を出せたときは、失敗や未確定を含めて exit 0。使い方の誤りは exit 2（結果の行なし）、git が無ければ exit 3。

### 静的ガード

`git add` / `git commit` が `scripts/` に現れるのはこのスクリプトが初めてで、既存のパターン（`--no-verify`・`git commit -n`・フック無効化）はそのまま効く。さらに第 7 弾の方式で**行単位の許可形**を新設した: `git -C "${path}" add -A >&2 && git -C "${path}" commit -q -m "wip(recover): 中断時の未コミット変更を退避" </dev/null >&2 || crc=$?` の 1 行だけを許し、`git -C "${path}"` で対象の worktree を明示しない形（メイン worktree が暗黙の対象になる）・別のパス・メッセージの変更・フラグの追加・引用符つきの `git` / サブコマンドはすべて拒否する。許可形が `recover-prep.sh` にしか無く 1 行だけであることは専用テストで固定する。同じテストで、`recover-prep.sh` にブランチ削除・`reset`・`checkout`・`clean`・`stash`・`push`・`merge`・`update-ref`・`rm` が無く、`git worktree` が `list --porcelain` だけで、`git fetch` が `refs/remotes/origin/` へ保存する 1 形だけであることも固定する。`git fetch` は既存パターンに当たらない（変更なし）。除外リストと `merge-guard-hook.sh` は変えていない。

### 既知の挙動（旧プロンプトとの差）

- **WIP のコミット件名は固定の `wip(recover): …`** のまま。commitlint の `type-enum` がこの type を許さないリポジトリでは `commit-msg` フックが拒否して `commit-failed`（`wipCommitted: false`）になり、`failed` で保全される（旧プロンプトでも同じ結果だった。保全側に倒れる）。
- **汚れの観測が旧プロンプトより厳しい**: 旧は素の `git status --porcelain`（利用者の設定やグローバルの除外に従う）で、グローバルの除外に載った未追跡ファイルは見えず `wipCommitted: true` になり得たが、第 7 弾の `--mode discard` がそのファイルを汚れとして保持して `failed` になっていた。今は最初から `residual-dirty`・`false` で保全する（結末は同じで、早く止まる）。
- **メイン worktree・未登録・不一致のパスを渡されたとき**は何も書かずに `resolved: false`。旧プロンプトは `git -C` でそのパスの HEAD を読み、メインや無関係な repo に WIP コミットを積み得た。
- **lock は見ない（旧プロンプトと同じ）**: 生きた agent の lock が付いた worktree にも WIP コミットを積む。`git worktree list` の `locked` 行は読まない。lock の扱いは削除側が担い、第 7 弾の `worktree-remove.sh --mode discard` が生きたセッションの lock を `retained-locked` で保持する（WIP コミットは lock の有無によらずブランチに残るのでデータは失われない）。この pid はセッション（メインの `claude` プロセス）の pid なので、同じセッション内の再実行では lock が常に生存と判定される。ここで lock を理由に WIP を拒むと同一セッション内の Recover が成り立たなくなるため、この弾では入れない。
- **ホスト側の引数の検査**: `--base`・`--worktree`・`--branch` はホストの `sanitizeBranch` / `sanitizeWorktreePath`（どちらも `worktreeQuote` の許可文字の部分集合）を通った値で、`worktreeQuote` が例外を投げる経路は無い（`baseBranch` が不正なら起動時の `sanitizeBranch` で既に停止している）。
- **base の取得は共有の追跡 ref**（`refs/remotes/origin/<base>`）へ書く。並列に走る Recover が同じ ref を更新し得るが、git の ref ロックで直列化され、どちらも最新の base に進むだけで害は無い（`base-merge.sh` / `pr-push.sh` が worktree ごとの ref を使うのは、取り込む側が取得した sha に固定する必要があるため。この弾は読み取りの判定だけで、sha を結果の `baseSha` に固定して使う）。
- 新しい lib（`lib/recover-prep-lib.sh`）を足したので、**全スクリプトのハッシュが変わる**。同じ時期に別のスクリプトを変更している作業（例: `observe-pr.sh` の修正）は、`SCRIPT_SHA256` の表・生成物・`script-static-guard.test.mjs` で競合する。後からマージする側は再ビルドが要る。

### この弾の検証範囲

単体テスト（判断の表〔`rp_resolve` 19 行・`rp_scan_status`・`rp_wip_plan`・`rp_wip_after`・`rp_wip_ok`・`rp_diff_state`・`rp_is_sha`〕・実 git のサンドボックス〔clean・追跡変更・staged・未追跡・深い階層・混在・ignore のみ・`showUntrackedFiles=no`・グローバルの除外・フックの拒否 / 書き換え・コンフリクト中・入れ子の独立 repo・submodule〔clean・内部の変更・`diff.ignoreSubmodules=all` 下〕・観測不能〔index 破損〕・state との食い違い・dead worktree・branch だけの残骸・ブランチ不在・detached・メイン worktree・未登録パス・`.git` 破損・HEAD が base と同名・差分の件数・打ち消しコミット・base の取得失敗〔古い追跡 ref あり〕・base 不在・引数の誤り・cwd がリポジトリの外・run-verified.sh 経由〕を bash 3.2 と 5 で・ホスト配線〔コマンドの組み立て 3 形・手作業の文章が残っていないこと・第 1 層 / 第 2 層のゲート〕）と変異 25 件でのみ検証している。**実ランの隔離なし（メイン checkout）の Recover エージェントからの `run-verified.sh` 経由の起動は未検証**で、`git fetch` は実 GitHub に対して実行していない（ローカルの bare リポジトリのみ）。フックは `pre-commit` のみ実測し、`commit-msg`（commitlint）・`prepare-commit-msg` は未実測。

## ハッシュ埋め込みと鮮度

- 開発ファイル（`implement-issue-tree.src.js`）には、スクリプトごとの期待ハッシュの代わりに置換前の目印（`SCRIPT_SHA256` の値）を書く。`build-workflow.mjs` は**コメント除去とトークン照合より前に**、同じディレクトリのスクリプトの `bundleSha256`（スクリプト本体 + `scripts/lib/*.sh` のバイト列連結の SHA-256）へ置換する。置換後の文字列を「開発ファイル」としてトークン照合に使うので、照合の定義（種類・値・開始行）は変わらない。生成物に目印が残らない。
- スクリプトまたは lib を書き換えると生成物の内容が変わる。`--check`（鮮度ゲート）と `tests/build-workflow.test.mjs` は、スクリプトだけが変わって生成物が再生成されていない状態を検出する。
- スクリプトが無い・目印の書式が不正（置換されずに残る）ならビルドは生成物を書かずに中止する。
- `launcher` と `bundleSha256` の定義の一致（sha256sum 経路・shasum 経路の両方）は `tests/script-launcher.test.mjs` が検証する。

## 運用

- `args.skillDir` は呼び出し側（起動手順）が渡す。配布後、既存の呼び出し手順は更新が必要になる。`dryRun` でないランで未指定なら起動時エラーで停止する（第 2 弾から、monitor が毎回 `observe-pr.sh` を使うため、`maxResidualWorktreeBytes: 0` のランも対象）。named workflow（`{name: "implement-issue-tree"}`）で起動する場合も同じ。
- 同期で届くのはスキルディレクトリ全体（Workflow とスクリプトを同じコミットで）なので、通常は版ずれは起きない。`run-verified.sh` が exit 3 を出したときは、スキルの同期が途中か、スクリプトがローカルで変更されている。同期し直す。
- 新しいスクリプトを足すとき: `scripts/` 直下に `*.sh`（小文字・数字・`-`・`.`）で置き、`SCRIPT_SHA256` に目印を足し、`bash <skillDir>/scripts/run-verified.sh` 経由で起動し、封筒で返す（ホストが値を採用しないスクリプトは、上の第 3 弾の節の理由づけを示したうえで封筒なしにできる）。`scripts/lib/*.sh` を足すと、**すべてのスクリプトのハッシュが変わる**（`run-verified.sh` は lib 全体をハッシュに含める）。再ビルドで追従する。`tests/script-static-guard.test.mjs` の走査対象は `scripts/*.sh` と `scripts/lib/*.sh` の全体なので、新しいスクリプトも自動で対象になる。冒頭コメントに入力・出力・終了コードを書く。`bash 3.2`（macOS）と GNU の両方で動く書き方に限る（`paste`・`bc`・GNU 専用フラグ・`date -d`・`sed -i`・`mapfile`・連想配列を使わない）。

## 関連

- `./automerge-design.md` — G0 とサーバー側強制（安全判定の信頼境界）
- `./verification.md` — 起動可否契約とサイズ予算
- `../../../.claude/rules/security.md` — OWASP A03（インジェクション）・A08（整合性）の観点
