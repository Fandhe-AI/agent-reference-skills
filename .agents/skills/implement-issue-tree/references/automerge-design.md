# 自動マージのサーバー側委譲とクライアント側自動マージの設計 / branch protection

本書は implement-issue-tree スキルの一部。全体は ../SKILL.md 参照。

### 自動マージのサーバー側委譲と merge-guard hook（deny 専用・best-effort）

**クライアント側の自動マージは `autoMerge: true` + `externalChecks` 確定の opt-in ランでのみ実行する**（次節「クライアント側自動マージの設計」参照。opt-out 既定では従来どおりマージしない。auto-merge の予約（arm）は引き続き提供しない）。以下は PR #182 codex P0 / PR #206 撤回に至った経緯である（PR #222 で monitor 出力のマージ経路からの分離と G0 サーバー側強制の実測により再設計した。次節参照）。当初は「host が発行する grant（正規マージコマンド全文 = `expectedCommand`）を hook が完全一致で照合する allow 経路」で「未承認マージを許可しない証明可能な境界」を作ろうとした。しかしこの基盤は `agent()` 単位のツール allowlist・credential 分離を提供せず、**未信頼のレビュー本文を読む monitor エージェントも merge-exec と同じ Bash・`gh` 認証・FS を共有する**。monitor は Bash を持ち通常のファイル作成も hook を通るため、`gh pr view` で HEAD を取得 → 任意 nonce で `grant-<pr>.json` を自作 → その `expectedCommand` を実行できる（**grant 偽造 P0**）。この基盤には hook 専用の秘密注入経路がなく（`settings.json` の env はセッション全体 = subagent の Bash 含めて共有）、**hook が検証でき subagent が読めない鍵を持てない**ため、署名 / MAC による偽造防止も実装不能。よって偽造不能なマージ認可を hook で検証することは原理的に不可能である。

その後 PR #206 で「agent ベースの precheck（autoMergeArmable）+ hook の `gh pr merge <n> --auto --squash` carve-out + 専用 arm エージェント」によるクライアント側 arm を一度導入したが、次の 3 点が確認され**全面撤回した（supersede）**:

1. **carve-out の認可欠陥（codex P0）**: hook の carve-out はランの `autoMerge` 設定・precheck 結果・agent の役割と一切結び付かず、共有 `gh` 認証を持つ**任意の subagent に任意 PR の arm を許可**していた。プロンプトインジェクションを受けた monitor 等が `autoMerge: false` の opt-out ランでも arm できる。
2. **precheck の自己申告（codex P0）**: `autoMergeArmable` は agent の構造化出力を認可根拠にしており、誤認・捏造で全フィールドが安全側の値になり得る。この基盤は host が `gh` を直接実行できないため、ホスト決定的コードによる実測はそもそも実装不可能。
3. **「予約のみ」前提の虚偽（Bugbot High）**: `gh pr merge --auto` は対象 PR が既に全要件を満たしていれば**即時マージ**する。「予約のみで即時マージしない」という hook コメント・arm プロンプトの前提は成立しない。

いずれも「権限分離できない基盤では、境界を実装できるまで自動マージを無効化する」という Codex 元指摘（rust-ai-library PR #441）の許容解へ立ち返る根拠である。したがって:

- **クライアント側の自動マージは opt-in（`autoMerge: true` + `externalChecks` 確定）でのみ実行**: opt-out（既定）では新規マージ経路を開かない（recoveryOnly 機構により `ready` 到達時は回復専用経路へ固定。merge-exec は `gh pr merge` を出力しない）。opt-in 判定はホストの決定的コード（args パース）のみ。opt-in の実マージは「monitor 出力のマージ経路からの分離 + G0 サーバー側強制の実測」を前提とする（次節「クライアント側自動マージの設計」参照）。
- **grant / canary / branch-protection ランタイムゲート・PR #206 の precheck / arm / hook carve-out は撤去**した（grant と precheck 出力は偽造可能で allow の根拠にならず、carve-out は認可と結び付かない全 subagent への開放だった）。opt-in 再有効化後もこれらは復活させない。
- **merge-guard hook は deny 専用**（下記）。**承認境界ではなく、迂回可能な best-effort の攻撃面削減**にすぎない。hook を導入したリポでは subagent の `gh pr merge` が deny されるため、opt-in のクライアント側マージと hook は併用できない。
- opt-out ランの PR はマージ可能状態の `blocked` で停止し、マージは **GitHub 上で人間が行う**か、下記の**サーバー側 auto-merge workflow** が行う。

### クライアント側自動マージの設計（重要）

opt-in ランのクライアント側マージは、PR #182 / PR #222 codex P0（未信頼のレビュー本文を読む monitor の虚偽出力による未承認マージ誘導）に対して次の 3 層で対処する:

1. **monitor 出力のマージ経路からの完全分離**（PR #222 codex P0 対応）: monitor が返す `ready` / `headSha` はマージ経路の入力に一切使われない。`ready` は merge-exec をいつ起動するかというタイミングにのみ影響し（虚偽 `ready` の効果は merge-exec の空振り 1 回に限られる）、`headSha` は診断用の記録にすぎない。merge-exec のプロンプトに渡るのはホスト導出の boolean（allowMerge）と args 由来の検証済み値のみである。
2. **merge-exec の自己取得再検証**: マージ判定に使う HEAD sha・チェック状態別件数・未解決スレッド件数・外部チェック起動は、未信頼テキスト（レビュー本文・Issue 本文・チェック名）を一切読まない merge-exec が `gh` の enum / 件数出力から自ら取得する。マージは自己取得 sha による `--match-head-commit` 付き squash merge のみ（照合とマージの間の push 競合や誤った sha の代入はサーバー側で拒否される）。
3. **G0 ゲート = サーバー側強制の実測**: merge-exec はマージ実行前に、ベースブランチのサーバー側強制を件数・真偽値のみの API 出力で実測確認し、確認できなければ `server-enforcement-missing` で辞退して `blocked` 終端する（fail-closed）。確認対象は (a) required status checks が 1 件以上、(b) その bypass 不能性 —「全適用 ruleset の `bypass_actors` が空（org 継承 ruleset はこの認証で bypass 検証を保証できないため辞退し、サーバー側 workflow へ委譲）/ classic は `enforce_admins` 有効」（存在確認だけでは admin 権限の `gh` 認証自身が保護を迂回できる）、(c) **レビュースレッド解消の必須化**（ruleset は `required_review_thread_resolution` / classic は `required_conversation_resolution`）、(d) **外部チェック App を確定した構成では、当該 App に束縛（`integration_id` / `app_id` 一致。context 名の文字列は同名偽装が可能なため判定に使わない）された required status check の存在**。(c)(d) により、クライアント側でゲートする条件（未解決スレッド 0 件・外部チェック合格）はサーバー側でも強制される。**マージ可否の実強制は GitHub の branch protection であり**、この実行基盤はエージェント単位の認証分離を提供しない（プロンプト指示は権限制御にならない）ため、未信頼テキストを読む monitor を含む**どのエージェントが共有 `gh` 認証で直接 `gh pr merge` を試みても、G0 が確認した同条件をサーバーが強制して拒否する** — 共有認証は追加のマージ能力を生まない（PR #222 codex P0 第 4 ラウンド対応）。サーバー側で強制されない残余操作（レビュースレッドの resolve 等）は GitHub の権限モデルに由来し、本スキルはこれを自動化・誘発する記述を持たない。

さらに merge-verify（merge-exec と別コンテキストの読み取り専用エージェント）が `state=MERGED` と HEAD sha（merge-exec の申告値との完全一致）を独立確認し、裏付けられない merged 申告はホストが受理しない。

**残存リスクと opt-in の意味**（2026-08-12 のリポジトリオーナー明示指示による opt-in 再有効化）: merge-exec / merge-verify はモデル出力であり**強制境界ではない**。ただし両者は未信頼テキストを読まないため、注入経路は存在せず、残存する失敗モードはモデル自身の判定誤りに限られる。また branch protection が required approving review を要求しない構成では「CI green + スレッド解消 + 外部チェック到着」だけで人間の追加承認なしにマージが成立する — これは `autoMerge: true` という opt-in の明示選択そのものであり、非 author 承認必須の保護があるリポジトリではサーバーが拒否する（クライアント側マージは成立せず `merge-failed` → 再監視 → 終端）。既定（`autoMerge` 未指定 / `false`）は従来どおり fail-closed でマージしないため、本スキルを導入しただけの消費リポジトリには影響しない。opt-in するかどうかは各リポジトリの管理者が本節を理解のうえ判断すること。

より強い保証が必要な運用では、opt-in を使わず対象ブランチへのサーバー側 branch protection（第三者=非 author 承認必須・dismiss stale・required checks 等）+ 人間マージ、または下記のサーバー側 auto-merge workflow への委譲を選択すること。本 SKILL.md の他所に「クライアント側では自動マージを行わない」旨の記述が残っている場合、本節と `autoMerge` 引数の説明を正とする。

**auto-merge のサーバー側委譲（upstream の `docs/implement-issue-tree/auto-merge-sample.yml`）**: auto-merge のサンプル workflow は**意図的に vendored 配布しない**（skills/ 配下ではなく upstream（Fandhe-AI/agent-cli-skills）の `docs/implement-issue-tree/auto-merge-sample.yml` に置かれ、`npx skills add` で消費リポジトリへ自動コピーされない）。各リポジトリの runner 方針・信頼 author・opt-in variable は相反し得るため（public は GitHub ホステッド必須 / private は self-hosted 必須 等）、導入する場合は upstream（Fandhe-AI/agent-cli-skills）の `https://github.com/Fandhe-AI/agent-cli-skills/blob/main/docs/implement-issue-tree/auto-merge-sample.yml` を参照し、自リポジトリの方針に合わせて runner（`AUTOMERGE_RUNNER`）・信頼 author（`TRUSTED_AUTHOR`）・opt-in variable（`AUTOMERGE_OPTIN`）を設定した上で `.github/workflows/auto-merge.yml` へ**手動配置**する。この workflow は **`schedule`（cron。既定 15 分間隔）+ `workflow_dispatch` のみ**をトリガーとする **cron スイープ方式**で動作し、リポジトリ設定変数 **`TRUSTED_AUTHOR`**（PR 作成専用 automation identity の login。未設定なら何もせず終了）の open PR をサーバー側 REST API（`--paginate` 全ページ列挙 + `user.login` 完全一致選別。`--limit` 固定だと上限超過分が恒久的に漏れるため — PR #208 codex P2 対応）から列挙し、各 PR に対して arm（`GITHUB_TOKEN` での `gh pr merge --auto --squash` 実行）の前に**認可ゲートと絞り込みの 2 段判定**を行う。**PR イベント系トリガー（`pull_request` / `pull_request_target`）を一切使わない理由（消費リポ codex ラウンド P0/P1 対応）**: `pull_request` は same-repo PR で **PR head 側の workflow ファイルを secrets 付きで実行する**ため `AUTOMERGE_RULESET_TOKEN` 窃取経路になり、`pull_request_target`（PR #207 Bugbot High 対応で一度採用）も checkout 禁止を守る限り窃取は防げるものの「PR という PR 作成主体が起こせる事象を契機に secrets（`AUTOMERGE_RULESET_TOKEN`・write 権限 `GITHUB_TOKEN`）を持つジョブが起動する」構造自体が残り、組織 CI 規約（secrets 露出トリガーの追加は P0/P1）に抵触し将来の保守変更で未信頼 PR データが混入する余地も残る。cron スイープでは**実行契機・実行コンテキストのいずれにも PR 由来の値が一切含まれず**（イベント payload に PR が存在しない）、この問題クラス自体が構造的に排除される。arm の遅延は最大でポーリング間隔に収まる。workflow 内では**リポジトリのコードを一切 checkout・実行しない**（`actions/checkout` の追加禁止。サンプルは `gh api` / `gh pr list` / `gh pr view` の読み取り呼び出しと jq の判定のみで構成し、`runs-on: ${{ vars.AUTOMERGE_RUNNER }}`（runner は repo variable で指定し**フォールバックなし** — 消費リポ codex P1 対応。runner 方針は public / private で正反対のため既定値の直書きはどちらかの規約に必ず違反する。public リポはリポジトリ設定変数 `AUTOMERGE_RUNNER=ubuntu-latest`、Fandhe-AI の private リポ（GitHub ホステッド指定が CI 規約違反の組織方針）は `AUTOMERGE_RUNNER=self-hosted` を設定し、未設定では job が起動しない = fail-closed）+ `timeout-minutes: 10` を明示し、さらに job レベルの明示 opt-in ゲート `if: ${{ vars.AUTOMERGE_OPTIN == 'true' }}` を置く（消費リポ codex P0 対応。repo variable は admin のみ設定可能で PR 作成主体には偽造不能なサーバー側 opt-in シグナルとなり、設定しない限り workflow は何もしない）。**認可ゲート（PR #207 codex ラウンド2 P0 対応）**: author 一致・命名規則ブランチ・`Closes #N` マーカーは、いずれも共有 `gh` 認証を持つ PR 作成主体（プロンプトインジェクションを受けたエージェント含む）が自ら満たせる**偽造可能な provenance であり、認可根拠にならない**。そこで workflow 自身が arm 前にベースブランチの branch protection / ruleset を GitHub API で**実測検証**し、(G1) **required status checks が 1 件以上**構成済み、(G2) **required approving review count >= 1** 構成済み（GitHub は PR author の自己承認をサーバー側で拒否するため、これが「PR 作成主体が生成できない非 author 承認」という偽造不能シグナルになる）、(G3) **dismiss stale reviews（承認後 HEAD 更新で承認失効）が有効**、(G4) **ベースブランチに適用される全 ruleset の bypass actor がゼロ**（PR #207 codex ラウンド3 P0 対応。`bypass_actors` が 1 件でもあればその actor による merge が G1〜G3 の保護を迂回できるため、まず ruleset の列挙が完全であること — 実効ルール全要素に数値 `ruleset_id` と既知の `ruleset_source_type`（Repository / Organization）があり、ルールがあるのに ID が 0 件という不整合がないこと — を検証した上で、ソース種別ごとに詳細取得先をルーティング（Repository → `repos/{owner}/{repo}/rulesets/{id}`、Organization → `orgs/{org}/rulesets/{id}` — 消費リポ Bugbot High 対応。org 継承 ruleset の ID を repo 側エンドポイントで引くと 404 になり、repo 側のみの実装では org ruleset 適用ブランチが恒久的に検証不能 = 一切 arm されなかった）し、各 ruleset 詳細の `bypass_actors` が**配列型かつ空**であることを確認する。ID 欠落・非配列・null・未知ソース種別・取得失敗はすべて arm しない（org ruleset の詳細取得には token に組織レベルの Administration: read が別途必要で、無い場合も fail-closed だが原因をログで明示する）。ruleset 詳細の `bypass_actors` は Administration: read 権限がないと応答に含まれず、workflow の `GITHUB_TOKEN`（contents / pull-requests write のみ）では取得できないため — PR #207 Bugbot High 対応。`GITHUB_TOKEN` のままでは推奨構成の ruleset 保護下で G4 が常に検証不能となり一切 arm されない — G4 の詳細取得**のみ**リポジトリ secret **`AUTOMERGE_RULESET_TOKEN`**（fine-grained PAT / GitHub App token。必要権限は **Administration: read のみで write 不要**。arm 実行は従来どおり `GITHUB_TOKEN` が行う権限分離構成）で行う。token を要求するのは **ruleset 由来の実効ルールが 1 件以上あるときのみ**で、適用 ruleset が 0 件（classic branch protection のみで G1〜G3 充足）なら G4 は検証対象なしの空充足として token 不要で通過する（PR #207 Bugbot Medium 対応。ただし実効ルール API の取得自体に失敗した場合は「0 件」と区別して arm しない）。ruleset が 1 件以上あるのに secret 未構成（空）の場合は G4 を検証不能とみなし arm しない）、(G5) **required conversation resolution（レビュースレッド全解消の必須化）が有効**（PR #207 codex ラウンド4 P1 対応。無効だと任意 check 1 件 + 承認 1 件でレビュースレッド未解消のまま即時マージが成立し得る。classic は `required_conversation_resolution`、ruleset は pull_request ルールの `required_review_thread_resolution` で判定）、(G6) **workflow 冒頭の設定変数 `REQUIRED_EXTERNAL_CHECKS`（`<check context 名>:<App ID>` のカンマ区切り。既定例は `Cursor Bugbot:1210556` = Cursor Bugbot の App ID）に列挙した各組が、required status checks に「context 名 + App ID」の完全一致で App 束縛付きにすべて存在する**（PR #207 codex ラウンド4 P1 / ラウンド5 P1 + Bugbot Medium 対応。args の `externalChecks` 契約が要求する Cursor 等の外部レビュー到着を、サーバー側マージ条件（required checks）として担保するための検証。context 名の存在だけでは同名 check を別 App や same-repo の Actions workflow が作成して偽装できるため、classic は `.checks[].app_id`、ruleset は `integration_id` との組で検証し、`app_id` / `integration_id` が null・欠落のエントリ — App 束縛のない legacy `contexts` を含む — は充足根拠として受理しない。設定値の書式不正も arm しない。空文字は外部チェック不使用の明示選択として通過するが、その場合外部レビュー到着はサーバー側で一切担保されない）、(G7) **classic branch protection を認可入力に採用する場合、`enforce_admins` 有効に加えて明示 bypass 経路が存在しない**こと（消費リポ codex ラウンド P0 対応。`required_pull_request_reviews.bypass_pull_request_allowances` に登録された users / teams / apps は `enforce_admins` が有効でも PR レビュー要件（G2/G3）を明示的に迂回でき、automation App / user が登録された構成では非 author 承認なしの即時マージが成立し得る。実 API 仕様では未設定の表現が「キー欠落」と「キーありで値 null」の 2 形態を取り（`restrictions` は未設定時に `null` を返すのが正常応答 — 消費リポ Bugbot High 対応。null を unsafe 扱いすると classic-only リポで G1〜G6 が恒久 fail する）、「キー欠落または null = 未設定として通過」「object 型 = users / teams / apps がすべて配列型かつ空の場合のみ通過」とし、非 object・非配列・要素ありは classic を認可入力から除外して ruleset 側のみで判定する）、の**すべて**を満たす場合のみ arm し、1 つでも欠ければその PR は arm せずスキップして次の PR へ進む（**fail-closed**。classic branch protection API と ruleset 実効ルール API `GET /rules/branches/{branch}` の両方に対応し、取得・解析失敗も「保護なし」側へ倒す。判定は jq で真偽値のみ取り出し、base ブランチ名は jq の `@uri` で URL エンコードしてから API パスへ展開する — Bugbot Medium 対応。`release/1.0` 等の `/` 入りブランチ名を生のまま展開すると 404 → fail-closed で本来 arm 可能な PR が永遠に arm されない）。この構造では、偽造 PR が仮に arm されてもサーバー側で非 author の人間承認と required checks が揃わない限りマージされず、人間の承認境界を迂回できない。**これらの branch protection がマージの実強制であり、arm は「承認とチェックが揃った時点で自動的にマージが完了する」利便性だけを担う**。**絞り込み条件（認可根拠ではない。誤爆防止の対象限定のみ。3 条件の AND）**: (1) **PR author がこのスキルの PR 作成専用 automation identity（bot / machine user。リポジトリ設定変数 `TRUSTED_AUTHOR` に `your-automation-bot[bot]` 等の login を設定）に完全一致**すること（REST API の `--paginate` 全ページ列挙 + `user.login` 完全一致選別。draft は除外）。**人間の個人アカウント（リポジトリ owner 含む）の指定は禁止**（その人物が手作業で作る通常 PR まで arm 対象になるため。専用 identity が未整備なら workflow を配置せず人間マージ運用に留める）。(2) head ブランチがこのスキルの命名規約 `<type>/<N>-<short-name>` にアンカー付き正規表現で**厳密一致**すること。(3) PR 本文にこのスキルの PR Create フェーズが必ず書き込む生成物マーカー **`Closes #<N>`（N はブランチ名のイシュー番号と同一）が行として存在**すること。permissions は `contents: write` + `pull-requests: write` の最小構成（pull-requests: write は auto-merge の有効化、contents: write はマージ実行権限として `enablePullRequestAutoMerge` / マージコミット作成に必要 — PR #208 Bugbot High 対応: contents を read に落とすと arm が常に権限エラーで失敗し、スイープが per-PR skip の green 終了になるため auto-merge が黙って一切成立しなくなる。checkout・push は行わないためこれ以上は要求しない）で、PR タイトル・本文等の未信頼テキストは run スクリプトへ一切展開しない（シェルが参照するのは整数検証済みの PR 番号・リポジトリ名・正規表現一致確認済みの head ブランチ名・URL エンコード済みの base ブランチ名のみ。本文マーカーは `gh pr view --json body --jq` の test() で真偽値だけを取り出して判定する）。この方式では arm の実行主体がエージェントと権限・実行環境を共有しない GitHub Actions であり、クライアント側の subagent には arm 経路が存在せず、arm しても保護未構成ならマージに至らないため、PR #206 の認可欠陥は構造的に発生しない。ランは従来どおり PR をマージ可能状態（`blocked`）まで進めて停止し、監視中にサーバー側 auto-merge によって PR が MERGED になった場合は monitor の手順 1 が検出して already-merged 経路で正常完了する。

**merge-guard hook（`scripts/merge-guard-hook.sh`）— 導入は任意**: 入れると subagent（monitor 等）からのマージ系コマンドを deny する多層防御の一層になる。PreToolUse hook の deny は `bypassPermissions` でも迂回できない。ただし前述のとおりこれは承認境界ではなく、間接実行や未知のスペリングは防げない。

**hook の判定ポリシー（allow 経路なし。deny 専用）:**

| 対象コマンド（subagent = `agent_id` あり 発行時） | 判定 |
|------|------|
| `gh pr merge`（あらゆる形） | **無条件 deny**（grant による例外なし） |
| `gh api .../pulls/<n>/merge`（REST merge） | deny |
| `gh api repos/<o>/<r>/merges`（REST ブランチマージ） | deny |
| `gh api graphql`（`mergePullRequest` / `enablePullRequestAutoMerge` / `mergeBranch`） | deny（`mergeBranch` は PR を経由せず head ref を base へ直接マージする迂回経路のため含める） |
| `gh pr review --approve` | deny |
| `gh alias`（set / import 等すべて）・`gh extension` | deny（別名・拡張経由の迂回封じ） |
| 上記以外（`gh pr comment` の催促・読み取り系等） | 許可 |
| main スレッド（`agent_id` なし）の全コマンド | 制限対象外（人間の監督下の対話コンテキスト。`jq` 不在時もロックアウトされない） |
| subagent の入力で `jq` 不在・hook 入力のパース失敗 | 拒否（fail-closed） |

deny 判定は 2 段構えである。**最前段（raw コマンドに対する存在検知）**で、意味的デコードが必要な難読化構文 — ANSI-C クォート `$'...'`（`$'\x67\x68'` 等の 16/8/Unicode エスケープ）と IFS 由来展開（`$IFS` / `${IFS}` / `${IFS%?}` 等）— を含むコマンドを即 deny する（正当な `gh` コマンドはこれらを使わない前提。過検知は fail-closed 方向）。続く**正規化段**で、行継続（`\`+改行）除去 → 改行の空白化 → `${IFS}` / `$IFS` の空白置換 → クォート文字除去 → 単独バックスラッシュの全除去 → 連続空白圧縮を行い、`g''h pr merge`（クォート分割）・`g\h pr merge`（バックスラッシュ）・`gh${IFS}pr${IFS}merge`（IFS 分割）といった直接実行形を塞ぐ。なお deny 対象は **`gh` サブコマンドの文字列照合のみ**であり、`gh` を経由しない直接実行 — `git merge` + `git push` によるローカルマージ・`curl -X PUT .../pulls/N/merge` 等の REST 直接呼び出し — や、**間接実行**（`eval`・base64 復元・コマンド置換 `$(...)`・変数間接呼び出し等）は文字列照合では原理的に防げない残存リスクである。これらは hook が best-effort（承認境界ではない）であることの帰結であり、実強制は「自動マージを行わない」方針とサーバ側 branch protection（`gh` 迂回にもサーバ側で効く）が担う。

**導入手順**: 対象リポジトリの `.claude/settings.json` の `hooks.PreToolUse` に本 hook を登録する（`jq` の導入が前提。`jq` 不在時は subagent のコマンドが fail-closed で deny される。main スレッドは `agent_id` を含まない入力の入口判定により `jq` 不在でも許可される）:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/skills/implement-issue-tree/scripts/merge-guard-hook.sh"
          }
        ]
      }
    ]
  }
}
```

`command` のパスは導入形態に合わせる（「使い方」節の `scriptPath` の 3 レイアウトと同一区分。**同じ導入形態なら js と hook は同じルート配下**にある）:

- **upstream `skills/` レイアウト**: `"$CLAUDE_PROJECT_DIR"/skills/implement-issue-tree/scripts/merge-guard-hook.sh`
- **`.agents/skills/` に vendored**（`npx skills add` で導入した downstream リポジトリ）: `"$CLAUDE_PROJECT_DIR"/.agents/skills/implement-issue-tree/scripts/merge-guard-hook.sh`
- **`.claude/skills/` symlink 経由**（本リポジトリ内部参照）: `"$CLAUDE_PROJECT_DIR"/.claude/skills/implement-issue-tree/scripts/merge-guard-hook.sh`

登録後、スクリプトに実行権限があることを確認する（`chmod +x`）。hook を導入しなくてもクライアント側から自動マージが起きることはない（クライアント側は自動マージ・arm 自体を行わないため）。hook は監査ログ・多層防御の一層として任意で導入する。

### branch protection（マージ判定の本体。人間マージ・サーバー側 auto-merge の両運用で必要）

対象ベースブランチには**サーバー側 branch protection / ruleset を設定することを強く推奨**する（ランタイムゲートではなく運用推奨）。compromised なローカルエージェントもサーバー側ルールは迂回できない。人間がマージする運用でも、upstream の `docs/implement-issue-tree/auto-merge-sample.yml` によるサーバー側 auto-merge 運用でも、マージ可否の判定はここが本体になる。特に、注入された monitor 等が仮に何らかの経路でマージを試みても止まるよう、次を設定する:

- **第三者（非 author）承認必須**（`required_approving_review_count >= 1` かつ `require_last_push_approval` 相当）。automation identity 自身は承認を作れない（`gh pr review --approve` は hook で deny、サーバ側も PR author = automation 時の自己承認を拒否）
- **承認後 HEAD 更新で承認失効**（`dismiss_stale_reviews`。古い承認の再利用を防ぐ）
- **PR を経由しない通常直接 push の禁止、かつ force push 禁止**（`allow_force_pushes=false`）。force push 禁止だけでは通常 push を塞げないため両方
- **管理者を含む enforcement**（classic: `enforce_admins=true` / ruleset: `enforcement=active` かつ automation を含む `bypass_actors` なし）
- **required status checks 1 件以上**（サーバー側 auto-merge 運用では特に必須。`gh pr merge --auto` は要件が既に満たされた PR を即時マージするため、required checks 未設定のまま workflow を配置すると arm 時点でそのままマージされ得る）。外部レビュー App（Cursor 等）を使う場合はその check context を **App 束縛付き（App 指定付き required check。classic は `app_id`、ruleset は `integration_id`）** で required checks に含める（`externalChecks` 契約のサーバー側対応。G6 が context 名 + App ID の組で包含を検証し、App 指定なしのエントリでは充足できない）
- **required conversation resolution（レビュースレッド全解消の必須化）**（未解消スレッドを残したままの auto-merge 完了を防ぐ。G5 が有効性を検証する）

サーバー側 auto-merge 運用ではさらに **repo 設定で auto-merge を許可**する（Settings → General → Allow auto-merge）。なお upstream（Fandhe-AI/agent-cli-skills）の `https://github.com/Fandhe-AI/agent-cli-skills/blob/main/docs/implement-issue-tree/auto-merge-sample.yml`（`docs/implement-issue-tree/auto-merge-sample.yml`）は上記のうち **required checks >= 1・非 author 必須承認 >= 1・dismiss stale reviews・適用全 ruleset の bypass actor ゼロ、・required conversation resolution 有効・`REQUIRED_EXTERNAL_CHECKS`（外部レビュー App の check context 名 + App ID の組）の required checks への App 束縛付き包含、の 6 点を arm 前に API で実測検証し、未構成・検証不能なら arm しない（fail-closed）**。classic branch protection は `enforce_admins` が有効かつ明示 bypass 経路（`bypass_pull_request_allowances` / `restrictions` の users / teams / apps）が存在しない場合のみ認可入力として採用し（G7。キー欠落または null = 未設定の正常応答のため通過（`restrictions` は未設定時 null が正常応答）、object は全リストが空配列の場合のみ通過）、また読み取り API が管理者権限を要求し workflow の `GITHUB_TOKEN` では読めないことがあるため、**ruleset での構成（bypass actor なし）を推奨**する（実効ルール API は読み取り権限で取得できる）。ruleset 運用ではさらにリポジトリ secret **`AUTOMERGE_RULESET_TOKEN`**（Administration: read のみの fine-grained PAT / GitHub App token。write 不要。org 継承 ruleset を使う場合は組織レベルの Administration: read も併せて付与）の設定が必要で、ruleset が 1 件以上適用されるのに未構成だと G4（ruleset 詳細の bypass actor 検証）が検証不能となり一切 arm されない（fail-closed）。適用 ruleset が 0 件（classic のみで G1〜G3 充足。enforce_admins 必須）の運用ではこの secret は不要（G4 は空充足で通過）。なお workflow のトリガーは `schedule`（cron）+ `workflow_dispatch` のみの cron スイープ方式とし、`pull_request` / `pull_request_target` は使わない（PR イベントを契機に secrets 付きジョブを起動する構造自体を排除する。「自動マージのサーバー側委譲と merge-guard hook」節参照）。加えてリポジトリ設定変数 **`TRUSTED_AUTHOR`**（automation identity の login。未設定ならスイープは何もしない）・**`AUTOMERGE_OPTIN`**（文字列 `true` を設定しない限り job ごとスキップされる明示 opt-in ゲート）・**`AUTOMERGE_RUNNER`**（runner ラベル。フォールバックなしのため未設定では job が起動しない）の 3 つの設定が必要で、いずれか未設定なら動かない（fail-closed）。workflow 内でリポジトリのコードを checkout・実行してはならない。

