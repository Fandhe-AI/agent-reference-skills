---
name: sync-skills-lock
description: ルート直下の `skills-lock.json` の `computedHash` を upstream リポジトリの最新状態と照合して更新する。`source` が `Fandhe-AI/<repo>` に完全一致しないエントリは clone せず skip (安全弁)。submodule 配下の `skills-lock.json` は触らない。contribute-skill のマージ後や upstream 同期後、「ハッシュ更新」「skills-lock 同期」などで使用。
argument-hint: "[skill-name] (省略時は全スキル)"
user-invocable: true
model: sonnet
---

# sync-skills-lock

ルート直下の `skills-lock.json` の `computedHash` を、upstream リポジトリの現状と照合して更新する。

## 対象ファイル

- **ルート**: 呼び出し元リポジトリ直下の `skills-lock.json` — このスキルが唯一編集するファイル
- **除外**: submodule 配下の `skills-lock.json` — submodule 境界を跨がないため **絶対に触らない**

## 前提条件

- `gh` CLI がインストールされ、認証済みであること
- `node` / `npx` が利用可能であること（`npx skills add` を使用するため）。`skills` CLI は固定版（`SKILLS_CLI_VERSION`）で実行する。値と更新手順は「skills CLI のバージョン固定と更新手順」節を参照
- `python3` が利用可能であること（状態署名〔`path_state` / `index_state_signature`〕と復元処理〔既存 ignored ファイルの比較・復元等〕で使用。主要 Linux / macOS には標準搭載されている。無い環境では Step 4 フェンスが npx 実行前に fail-closed で停止するため、導入してから再実行すること）
- `file` CLI が利用可能であること（未追跡バイナリファイルの種別表示に使用。未導入の環境では
  種別が `file コマンド未検出` として表示され、承認前にサイズ・git blob ハッシュのみで
  判断することになる。macOS / 主要 Linux ディストリビューションには標準搭載されている）
- ルート直下の `skills-lock.json` が存在すること
- **実行前に `skills-lock.json` に未コミットの変更がないこと**（ステージ済み・未ステージ問わず）。本スキルの実行中に発生する変更は sync 由来のみとなり、`git add skills-lock.json` で全体をステージしても無関係な変更が混入しない
- **対象スキルの `.agents/skills/<name>/` に未コミット変更がないこと**。`npx skills add` は `.agents/skills/<name>/` を upstream の最新版で上書きするため、そのディレクトリに WIP が存在すると即座に失われる。`git checkout` で戻せるのは「最後にコミットされた状態」のみであり、npx 実行前の未コミット編集は復元できない。**未追跡ファイルとして存在する WIP も対象**であり、`git status --porcelain` で検出する
- **消費側リポジトリが commit 済み local patch を持つ場合**: vendored skill（`.agents/skills/` 配下）へ commit 済みの local patch を適用しているリポジトリは、その検証・再適用の入口として repository-owned checker `scripts/check-skill-local-patches.sh`（無引数 = check / `apply` の 2 モード）と台帳 `.agents/skills/LOCAL-PATCHES.md` を持つ。commit 済み patch は上記 clean ガードでは保護できないため、checker が存在する場合は同期の前後（Step 4 の pre-check・Step 5.5 の apply + 最終検証）での成功が必須（非 0 は fail-closed で同期・stage しない）。台帳があるのに checker が無い状態も検証不能として fail-closed で停止する。checker（apply）の書き込み先は当該スキルディレクトリ・`skills-lock.json`・durable patch 置き場 `scripts/local-patches/` に限る契約とし、範囲外の変更は各実行直後の digest 比較で fail-closed に検出する（検出範囲は Git が追跡・列挙する対象に限る best-effort であり、書き込み制限の保証ではない。保証はユーザーによる checker 内容レビュー + blob hash 承認が担う。詳細は Step 4 の「検出範囲の限界」コメント）。checker は消費側が配置する実行可能コードのため「存在するだけ」では実行せず、symlink ではない regular file（HEAD 側 mode も 100644/100755）であり、HEAD に commit 済みで worktree と一致し、かつユーザーへ由来・内容を提示して blob hash 単位の明示承認を得た場合のみ実行する（Step 4 で機械検証）。実行対象は worktree のファイルではなく承認済み HEAD blob を取り出した一時ファイル（`CHECKER_EXEC`）とし、hash 確認後に worktree の checker を差し替える TOCTOU 経路を断つ
- **通常構成のメイン worktree で実行すること**。linked worktree（`git worktree add` で作られた作業ツリー）では `.git` が gitdir を指す通常ファイルになり、実 Git ディレクトリ（`.git/worktrees/<name>/` と共有側の `refs`・`logs`・`config`・objects）が状態署名の対象外になるため、Step 4 フェンスが npx 実行前に `git rev-parse --absolute-git-dir` / `--git-common-dir` の不一致で検出して fail-closed で拒否する。同様に、実 Git ディレクトリが作業ツリー外にある構成（`git clone --separate-git-dir`・submodule checkout・`.git` が symlink）も、「実 Git ディレクトリ = 作業ツリー直下の `.git` 実体ディレクトリ」の検証（`--show-toplevel` との厳密一致 + lstat）で npx 実行前に fail-closed で拒否する

## フロー

### Step 1: 引数を確認し、事前条件を検証する

```bash
TARGET="$ARGUMENTS"  # 空なら全スキル対象

# 引数指定時は kebab-case のみ許可（パストラバーサル防止）
if [[ -n "${TARGET}" && ! "${TARGET}" =~ ^[a-z][a-z0-9-]+$ ]]; then
  echo "エラー: スキル名は小文字 kebab-case のみ許可されています: ${TARGET}"
  exit 1
fi
```

引数ありの場合は該当スキルのみ処理、なしの場合は `skills-lock.json` の全エントリを対象にする。

次に `skills-lock.json` の clean 状態を確認する。未コミット変更（ステージ済み・未ステージ問わず）があれば中止する。

```bash
# skills-lock.json に未コミット変更があれば中止（sync 由来以外の変更の混入を防ぐ）
# git diff 系は untracked を検出しないため porcelain を使う
if [[ -n "$(git status --porcelain -- skills-lock.json)" ]]; then
  echo "エラー: skills-lock.json に未コミットの変更があります。コミットまたは退避してから再実行してください。"
  exit 1
fi
```

### Step 2: upstream 一覧を集計する

`skills-lock.json` を読み、`source` フィールドごとにスキルをグルーピングする（同一リポへの処理を 1 回にまとめるため）。

```
Fandhe-AI/agent-cli-skills:
  - create-commit
  - create-issue
  - ...
```

### Step 3: source を検証する

**安全弁**: 処理前に必ず `source` フィールドが `Fandhe-AI/<repo>` に完全一致することを確認する。前方一致では `../` を含む値が通過し、clone 時の URL パス正規化で組織外リポジトリを対象にできてしまうため、`OWNER/REPO` へ正規化後に厳密な正規表現で検証する。想定外の source は skip してユーザーに警告する。`skills-lock.json` の改ざん・誤設定によって untrusted リポジトリから clone することを防ぐためである。

```bash
REPO_SLUG="${SOURCE#https://github.com/}"
REPO_SLUG="${REPO_SLUG%.git}"
if [[ ! "$REPO_SLUG" =~ ^Fandhe-AI/[A-Za-z0-9._-]+$ ]] \
   || [[ "$REPO_SLUG" == "Fandhe-AI/." || "$REPO_SLUG" == "Fandhe-AI/.." ]]; then
  echo "警告: 想定外の source: $SOURCE — このスキルは skip します"
  continue
fi
```

### Step 4–7: 対象スキルを1つずつ処理する（ループ）

対象スキルそれぞれについて、次の 4→5→6→7 を順に実行し、**1スキル完了後に次スキルへ進む**。全スキル sync であっても同時に複数スキルを処理せず、1スキルずつ完結させること。

#### Step 4: npx skills add で computedHash を更新する

`sha256sum` などで手動計算するのではなく、`npx skills add` に計算を任せる。これにより CLI の内部アルゴリズムと完全に一致する。

```bash
# 当該スキルの install ツリーに未コミット変更があれば npx が上書きするため skip
# git diff 系は untracked を検出しないため porcelain を使う（未追跡 WIP も保護対象）
if [[ -n "$(git status --porcelain -- ".agents/skills/${SKILL_NAME}/")" ]]; then
  echo "警告: .agents/skills/${SKILL_NAME}/ に未コミット変更（未追跡含む）があります。npx の上書きで失われるため skip します。"
  continue
fi

# python3 の存在確認（PR #412 codex P1 指摘）: 状態署名（path_state /
# index_state_signature）と復元処理（restore_preexisting_ignored 等）が python3 を
# 必須実行する。無いまま進むと npx 実行後の検査・復元の途中で command-not-found に
# なり、スコープ外検査が中途半端なまま停止する（fail-open 経路）。python3 の不在は
# スキル単位の事情ではなく環境全体の条件のため、skip（continue）ではなくループ全体を
# npx 実行前に exit 1 で停止する（fail-closed。この時点では npx 未実行のため残置なし）。
if ! command -v python3 >/dev/null 2>&1; then
  echo "エラー: python3 が見つかりません。状態署名・復元処理で python3 が必要です。導入してから再実行してください（fail-closed）。" >&2
  exit 1
fi

# linked worktree の実行拒否（PR #412 codex P0 指摘）: linked worktree
# （git worktree add で作られた作業ツリー）では .git が gitdir を指す通常ファイルで、
# 実 Git ディレクトリ（.git/worktrees/<name>/ と common dir 側の refs・logs・config・
# objects）は作業ツリーの外にある。repo_state_signature の走査（path_state .）は
# 作業ツリー内しか対象にせず、index_state_signature も index の論理状態しか補わない
# ため、npx が git update-ref 等で共有リポジトリの参照・設定を改変しても porcelain・
# ツリー署名・index 署名のすべてが前後一致し成功扱いになる。メイン worktree でのみ
# 成立する「--absolute-git-dir と --git-common-dir の一致」を一次根拠に判定し、
# 不一致（linked worktree のほか、実 Git ディレクトリが署名対象に収まらない
# submodule 等の変則構成すべて）は npx 未実行のまま fail-closed で拒否する。
# --git-common-dir は相対パスを返し得る（--path-format=absolute は git 2.31+ のため
# 使わない）ので、cd + pwd -P で双方を物理パスへ正規化してから比較する。
# rev-parse・正規化の失敗も「メイン worktree と確認できない」であって
# 「メインである」ではないため中止する。実行場所の異常はスキル単位の事情ではなく
# リポジトリ全体の条件のため、skip（continue）ではなくループ全体を exit 1 で
# 停止する（この時点では npx 未実行のため残置なし）。
if ! GIT_DIR_ABS="$(git rev-parse --absolute-git-dir)" \
  || ! GIT_COMMON_DIR_RAW="$(git rev-parse --git-common-dir)" \
  || ! GIT_DIR_PHYS="$(cd "${GIT_DIR_ABS}" && pwd -P)" \
  || ! GIT_COMMON_DIR_PHYS="$(cd "${GIT_COMMON_DIR_RAW}" && pwd -P)"; then
  echo "エラー: Git ディレクトリの解決（git rev-parse --absolute-git-dir / --git-common-dir）に失敗しました。メイン worktree での実行と確認できないため中止します（fail-closed）。" >&2
  exit 1
fi
if [[ "${GIT_DIR_PHYS}" != "${GIT_COMMON_DIR_PHYS}" ]]; then
  echo "エラー: linked worktree（git worktree add で作られた作業ツリー）では実 Git ディレクトリ（.git/worktrees/<name>/ と共有側の refs・logs・config・objects）が状態署名の対象外になり、npx による共有リポジトリの改変を検出できないため実行を拒否します（fail-closed）。メイン worktree で実行し直してください。" >&2
  exit 1
fi

# git-dir と common-dir の一致は linked worktree を除外するだけで、「実 Git
# ディレクトリが署名対象の作業ツリー内にある」ことまでは保証しない
# （PR #412 Bugbot High 指摘）。git clone --separate-git-dir（.git が gitdir を
# 指す gitfile）・submodule checkout（.git/modules/<name>/ を指す gitfile）・
# .git が symlink の構成では両者が一致したまま実体が作業ツリー外にあり、
# path_state の走査（起点 .）が refs・hooks・objects を含まないため、npx の
# 改変が porcelain・ツリー署名・index 署名のすべてをすり抜ける。そこで実 Git
# ディレクトリが「作業ツリー直下の .git 実体ディレクトリ」であることまで検証
# する: toplevel を上と同じ手法（cd + pwd -P）で物理パスへ正規化し、
# (1) GIT_DIR_PHYS が <toplevel>/.git と厳密一致、(2) <toplevel>/.git を lstat
# して symlink ではなく directory であること（gitfile = 通常ファイル・symlink
# はいずれも拒否）、の両方を要求する。不成立は npx 未実行のまま中止する。
if ! TOPLEVEL_RAW="$(git rev-parse --show-toplevel)" \
  || ! TOPLEVEL_PHYS="$(cd "${TOPLEVEL_RAW}" && pwd -P)"; then
  echo "エラー: 作業ツリールートの解決（git rev-parse --show-toplevel）に失敗しました。実 Git ディレクトリが作業ツリー内の .git ディレクトリであることを確認できないため中止します（fail-closed）。" >&2
  exit 1
fi
if [[ "${GIT_DIR_PHYS}" != "${TOPLEVEL_PHYS}/.git" ]] \
  || [[ -L "${TOPLEVEL_PHYS}/.git" ]] \
  || [[ ! -d "${TOPLEVEL_PHYS}/.git" ]]; then
  echo "エラー: 実 Git ディレクトリが作業ツリー直下の .git 実体ディレクトリであることを確認できません（git clone --separate-git-dir・submodule・.git の symlink 等）。実 Git ディレクトリが状態署名の対象外になり、npx による改変を検出できないため実行を拒否します（fail-closed）。通常構成のメイン worktree で実行し直してください。" >&2
  exit 1
fi

# 許可先経路の実体検証（PR #412 P0 指摘）: スコープ外検査（porcelain 比較・状態
# シグネチャ比較）は .agents/skills/${SKILL_NAME} を「パス文字列」で走査除外する。
# この経路上のいずれかの要素が実行前から symlink だと、npx がリンク先（リポジトリ外を
# 含む）へ書いた内容は除外側に吸われてどの検査にも現れない。そのため npx 実行前に
# 各要素を lstat し、存在するものはすべて実体のディレクトリであることを要求する
# （symlink・非ディレクトリは fail-closed で中止。npx は実行しない）。存在しない
# 要素のみ、初回インストールで npx が正当に新規作成するケースとして許容する
# （後段の REPO_SIG_OMITS の条件付き omit と同じ判定基準）。symlink 化された経路は
# レイアウト自体の異常であり人間の確認を要するため、skip（continue）ではなく
# ループ全体を exit 1 で停止する（この時点では npx 未実行のため残置なし）。
# この検査は開始時点のレイアウトのみを保証する（TOCTOU）。npx が実行中に許可先を
# 置換するケースは、許可先要素自身の署名（SKILL_DIR_SIG_SPEC の prune-under）と
# 実行後の再検証（verify_scope_path_after_run）が受け持つ。
for SCOPE_PATH_COMPONENT in ".agents" ".agents/skills" ".agents/skills/${SKILL_NAME}"; do
  if [[ -L "${SCOPE_PATH_COMPONENT}" ]]; then
    echo "エラー: ${SCOPE_PATH_COMPONENT} がシンボリックリンクです。npx の書き込みがリンク先（リポジトリ外を含む）へ向かい、スコープ外書き込み検査で検出できないため中止します（fail-closed）。実体ディレクトリへ置き換えてから再実行してください。" >&2
    exit 1
  fi
  if [[ -e "${SCOPE_PATH_COMPONENT}" && ! -d "${SCOPE_PATH_COMPONENT}" ]]; then
    echo "エラー: ${SCOPE_PATH_COMPONENT} がディレクトリではありません。npx の書き込み先として想定外の実体のため中止します（fail-closed）。" >&2
    exit 1
  fi
done

# skills-lock.json の実体検証（PR #412 codex P0 指摘）: skills-lock.json は状態
# シグネチャの prune と porcelain フィルタの双方で「パス文字列」により除外されるため、
# 実行前から外向き symlink だと npx がリンク先（リポジトリ外を含む）へ書き込んでも
# どの検査にも現れない。存在する場合は lstat で regular file であることを要求する
# （symlink・ディレクトリ等は npx 未実行のまま fail-closed で中止）。不存在は初回
# 生成として許容する。-f は symlink を辿るため、-L 判定で symlink を先に排除する。
# レイアウト自体の異常で人間の確認を要するため、skip（continue）ではなくループ全体を
# exit 1 で停止する。この検査も開始時点のみを保証する（TOCTOU）。npx が実行中に
# 置換するケースは実行後の再検証（verify_lock_file_after_run）が受け持つ。
if [[ -L "skills-lock.json" ]]; then
  echo "エラー: skills-lock.json がシンボリックリンクです。npx の書き込みがリンク先（リポジトリ外を含む）へ向かい、スコープ外書き込み検査で検出できないため中止します（fail-closed）。実体ファイルへ置き換えてから再実行してください。" >&2
  exit 1
fi
if [[ -e "skills-lock.json" && ! -f "skills-lock.json" ]]; then
  echo "エラー: skills-lock.json が regular file ではありません。npx の書き込み先として想定外の実体のため中止します（fail-closed）。" >&2
  exit 1
fi

# 消費側リポジトリが vendored skill へ commit 済み local patch を適用している場合
# (台帳: .agents/skills/LOCAL-PATCHES.md)、commit 済み patch は上の clean ガードを
# 通過してしまうため、npx より前に repository-owned checker(check mode)を必須にする。
# checker 非 0、および台帳があるのに checker が無い状態は、fail-closed で npx を
# 実行しない(同期を開始しない)
if [[ -f scripts/check-skill-local-patches.sh ]]; then
  # checker は導入先リポジトリが配置する実行可能コードであり、「存在するだけ」で実行しては
  # ならない(未信頼な checkout・未レビュー PR の任意コードが、差分提示・承認より前に
  # ユーザー権限で走る経路になる)。実行前に次のすべてを満たすことを確認する(fail-closed):
  #   (1) worktree の checker が symlink ではない regular file である(git hash-object は
  #       symlink のリンク先内容を読むため、-L を先に拒否しないと「HEAD と同内容の外部
  #       ファイルへの symlink」が (2) の一致検証をすり抜ける)
  #   (2) HEAD に commit 済みで、worktree の内容が HEAD の blob と一致する
  #       (未追跡・未コミット変更の checker は拒否 = レビューを経ていないコードを実行しない)
  #   (3) HEAD 側のエントリ mode が 100644 / 100755 の regular file である
  #       (120000 = symlink エントリの blob はリンク先文字列であり、実行対象にできない)
  #   (4) ユーザーへ由来と内容を提示し、この blob hash に対する実行の明示承認を得ている
  #       (承認は hash 単位で本フロー全体に有効。内容が変われば再承認。
  #        提示: git log -1 -- scripts/check-skill-local-patches.sh /
  #              git show HEAD:scripts/check-skill-local-patches.sh)
  # 実行は worktree のファイルではなく、承認済み HEAD blob を取り出した一時ファイル
  # (CHECKER_EXEC)に対して行う。hash 確認後〜bash 実行の間に worktree の checker を
  # 差し替える TOCTOU 経路を、実行対象を承認済み blob へ固定することで断つ
  if [[ -L scripts/check-skill-local-patches.sh ]]; then
    echo "エラー: checker がシンボリックリンクです。リンク先差し替えで HEAD 一致検証をすり抜けられるため同期しません(fail-closed)。実体ファイルへ置き換えてから再実行する。"
    exit 1
  fi
  if [[ ! -f scripts/check-skill-local-patches.sh ]]; then
    echo "エラー: checker が regular file ではありません。実行対象にできないため同期しません(fail-closed)。"
    exit 1
  fi
  CHECKER_HEAD_MODE="$(git ls-tree HEAD -- scripts/check-skill-local-patches.sh 2>/dev/null | awk '{print $1}')"
  if [[ "${CHECKER_HEAD_MODE}" != "100644" && "${CHECKER_HEAD_MODE}" != "100755" ]]; then
    echo "エラー: HEAD の checker が regular file ではありません(mode: ${CHECKER_HEAD_MODE:-エントリなし})。symlink 等は実行対象にできないため同期しません(fail-closed)。"
    exit 1
  fi
  CHECKER_HASH="$(git hash-object -- scripts/check-skill-local-patches.sh)"
  if [[ "${CHECKER_HASH}" != "$(git rev-parse HEAD:scripts/check-skill-local-patches.sh 2>/dev/null || true)" ]]; then
    echo "エラー: checker が HEAD に commit 済みの内容と一致しません(未 commit・未追跡・未コミット変更)。任意コード実行を防ぐため同期しません(fail-closed)。"
    exit 1
  fi
  echo "CHECKER_HASH=${CHECKER_HASH}  # 実行承認の対象となる blob hash。由来・内容と合わせてユーザーへ提示する"
  # ユーザー承認(上記 (4))を得たら、承認された hash を CHECKER_APPROVED_HASH に設定する。
  # 承認は変数の設定によってのみ成立し、未設定・不一致のまま checker を実行する経路は無い
  if [[ "${CHECKER_APPROVED_HASH:-}" != "${CHECKER_HASH}" ]]; then
    echo "エラー: checker はユーザー承認済みの blob hash(CHECKER_APPROVED_HASH)と一致する場合のみ実行できます。承認を得てから再実行してください(fail-closed)。"
    exit 1
  fi
  # 承認済み HEAD blob を一時ファイルへ取り出す。以後の checker 実行(同期前 check /
  # Step 5.5 の apply・最終 check)はすべてこのファイルを使い、worktree の checker は
  # 実行しない。取り出し失敗のまま進むと空ファイルの bash 実行(exit 0 の no-op)が
  # 「検証成功」に化けるため fail-closed で停止する
  CHECKER_EXEC="$(mktemp)"
  if ! git cat-file blob "${CHECKER_APPROVED_HASH}" > "${CHECKER_EXEC}"; then
    echo "エラー: 承認済み checker blob(${CHECKER_APPROVED_HASH})の取り出しに失敗しました。同期しません(fail-closed)。"
    exit 1
  fi
  echo "CHECKER_EXEC=${CHECKER_EXEC}  # 実行対象(承認済み blob の取り出し先)。Step 5.5 まで同一 shell で保持する(失われたら承認済み hash から再作成する)"

  # durable patch 置き場は承認時に directory ごと stage し、却下時に index からの復元 +
  # git clean の対象になるため、未 stage の WIP・未追跡ファイルが残っていると巻き込まれて
  # 失われる。staged のみの変更(= 本ループ内で承認済みに積み上がった分)は許容する。
  # producer(git status)を grep -q へ直接 pipe すると、-q の早期終了による SIGPIPE で
  # pipefail 下のパイプラインが偽になり WIP を見逃し得るため、一旦変数へ取得してから判定する
  LOCAL_PATCHES_STATUS="$(git status --porcelain -- scripts/local-patches/)"
  if grep -q '^.[^ ]' <<<"${LOCAL_PATCHES_STATUS}"; then
    echo "エラー: scripts/local-patches/ に未 stage の変更・未追跡ファイルがあります。承認・却下経路が巻き込むため同期しません(fail-closed)。"
    exit 1
  fi
  # 契約範囲(skills-lock.json / 当該スキル / durable patch)外の状態 digest。worktree 側は
  # 「HEAD を基底にした一時 index へ範囲外のみ git add -A」した tree hash で捉える
  # (未追跡・削除を含む全ファイルが実 blob hash で比較され、diff の表示文字列に依存しない
  # = dirty なバイナリの上書きも検出する。範囲内は HEAD のまま固定されるため同期による
  # 正当な変更では digest が動かない)。index 側は ls-files -s の blob hash で捉える。
  # 基準(PRE_OUTSIDE)は checker の初回実行(同期前 check)より前に取得する。check の後に
  # 取得すると、check mode が行った範囲外変更が基準へ取り込まれ検出できなくなる。
  #
  # 【検出範囲の限界(重要)】この digest は Git が追跡・列挙できる対象(非 ignore の
  # worktree / index)に限られる。.gitignore 対象・.git/ 配下(config・hooks 等)・
  # リポジトリ外への書き込みは検出できない。同一権限で任意コードを実行した後の
  # tree 比較は書き込み制限の「保証」にはならず、信頼アンカーはあくまで実行前の
  # ユーザーによる checker 内容レビュー + blob hash 承認である。本検証はその上に
  # 重ねる best-effort の追加防御(defense-in-depth)として扱うこと
  OUTSIDE_PATHSPEC=(. ":(exclude)skills-lock.json" ":(exclude).agents/skills/${SKILL_NAME}" ":(exclude)scripts/local-patches")
  outside_state() {
    local tmp_index_dir wt_tree idx_digest
    tmp_index_dir="$(mktemp -d)"
    GIT_INDEX_FILE="${tmp_index_dir}/index" git read-tree HEAD
    GIT_INDEX_FILE="${tmp_index_dir}/index" git add -A -- "${OUTSIDE_PATHSPEC[@]}"
    wt_tree="$(GIT_INDEX_FILE="${tmp_index_dir}/index" git write-tree)"
    rm -rf "${tmp_index_dir}"
    idx_digest="$(git ls-files -s -z -- "${OUTSIDE_PATHSPEC[@]}" | git hash-object --stdin)"
    echo "${wt_tree}:${idx_digest}"
  }
  PRE_OUTSIDE="$(outside_state)"
  echo "PRE_OUTSIDE=${PRE_OUTSIDE}  # 範囲外検証の基準 digest。Step 5.5 まで同一 shell で保持する(失われたら再設定に使う)"

  # checker の「初回実行より前」に index snapshot を取得する。同期前 check(check mode)も
  # 契約上、契約範囲(当該スキル / skills-lock.json / durable patch)を変更・stage し得るため、
  # すべての失敗経路(pre-check 失敗・検証失敗・npx 失敗・Step 5.5 の apply / 最終 check 失敗)と
  # Step 6 の却下で、この snapshot で契約範囲全体を同期開始前へ戻す
  PRE_SYNC_TREE="$(git write-tree)"
  echo "PRE_SYNC_TREE=${PRE_SYNC_TREE}  # 失敗・却下時の契約範囲復元に使う snapshot hash。控えておくこと"

  # 契約範囲を同期開始前へ戻す共通処理。部分変更(checker の stage 含む)を残して終了しない。
  # 復元は git restore の pathspec で契約パスに限定し、範囲外 path の index・worktree には
  # 一切触れない(index 全体を git read-tree で書き換えると、verify_outside_and_checker が
  # 「範囲外は git restore --staged -- <path> で手動復旧」と案内した直後にその案内自体を
  # 誤りにしてしまう)。git restore は no-overlay が既定のため、同期開始前 tree に無い
  # tracked ファイルは契約パス内に限り index・worktree から取り除かれる。契約範囲内の
  # 未追跡ファイルは git clean で即削除せず一時ディレクトリへ退避する(checker が契約
  # ディレクトリ内へ移動・新規作成したファイルの唯一のコピーであり得るため、削除は
  # データ喪失になる。退避先を案内し、削除の判断は人間へ委ねる)
  restore_contract_scope() {
    : "${PRE_SYNC_TREE:?同期開始前 snapshot が未設定のため復元できません}"
    local restore_targets=(--staged --worktree) untracked_list moved=0 p
    # npx 実行後検証が許可先経路・skills-lock.json の妥協(symlink 化等)を検出している場合、
    # worktree への書き込み・未追跡退避のパス走査がリンク先(リポジトリ外を含む)へ向かい得る
    # ため index のみ復元する(worktree 側は revert_in_scope が手動復旧を案内済み)。
    # 妥協フラグは npx 実行後にのみ設定されるため、それ以前の失敗経路では既定 0 で参照する
    if [[ "${SCOPE_PATH_COMPROMISED:-0}" -ne 0 || "${LOCK_FILE_COMPROMISED:-0}" -ne 0 ]]; then
      restore_targets=(--staged)
      echo "許可先経路または skills-lock.json の妥協を検出しているため、契約範囲の復元は index のみ行います。worktree 側は案内済みの手順で手動復旧してください。"
    else
      untracked_list="$(mktemp)"
      # skills-lock.json も退避対象に含める。通常は tracked のため列挙されないが、checker が
      # git rm --cached 等で未追跡化して内容変更した後に失敗すると、退避なしの git restore が
      # その唯一の内容を上書きしてしまう
      if ! git ls-files -z --others --exclude-standard -- skills-lock.json ".agents/skills/${SKILL_NAME}/" scripts/local-patches/ > "${untracked_list}"; then
        echo "警告: 契約範囲内の未追跡ファイル列挙に失敗しました。未追跡分は退避できていない可能性があるため、復元後に git status で確認してください。"
      fi
      CONTRACT_UNTRACKED_BACKUP_DIR="$(mktemp -d)"
      while IFS= read -r -d '' p; do
        mkdir -p "${CONTRACT_UNTRACKED_BACKUP_DIR}/$(dirname "${p}")"
        mv -- "${p}" "${CONTRACT_UNTRACKED_BACKUP_DIR}/${p}"
        moved=1
      done < "${untracked_list}"
      rm -f "${untracked_list}"
      if [[ "${moved}" -eq 1 ]]; then
        echo "契約範囲内の未追跡ファイルは削除せず ${CONTRACT_UNTRACKED_BACKUP_DIR} に相対パス構造で退避しました。内容を確認し、不要なら手動で削除してください。"
      else
        rmdir "${CONTRACT_UNTRACKED_BACKUP_DIR}" 2>/dev/null || true
      fi
    fi
    # 複数パスを 1 コマンドへ渡すと pathspec 不一致 1 件で全体が失敗するため 1 コマンド
    # 1 パスで分離する。pathspec は index に対しても照合されるため、PRE_SYNC_TREE 取得後に
    # 新規作成・stage されたファイルは tree に無くても no-overlay で index(・worktree)から
    # 取り除かれる(実測済み)。pathspec 不一致(tree にも index にも無い)は復元対象なしを
    # 意味するため許容するが、真の失敗(権限エラー等)と区別が付かないため、成功可否は
    # コマンドの終了コードではなく下の復元後検証で fail-closed に判定する
    git restore "${restore_targets[@]}" --source="${PRE_SYNC_TREE}" -- skills-lock.json 2>/dev/null || true
    git restore "${restore_targets[@]}" --source="${PRE_SYNC_TREE}" -- ".agents/skills/${SKILL_NAME}/" 2>/dev/null || true
    git restore "${restore_targets[@]}" --source="${PRE_SYNC_TREE}" -- scripts/local-patches/ 2>/dev/null || true
    # 復元後検証(fail-closed): 契約パスの index が PRE_SYNC_TREE と一致し、worktree 復元
    # モードでは worktree 側も PRE_SYNC_TREE と一致し未追跡も残っていない(未追跡は上で
    # 退避済み)ことを実測してから成功を表示する。pathspec miss や restore の失敗を
    # 「復元対象なし」として成功扱いすると、新規 staged ファイルの残留(Step 7 の git add
    # への混入経路)を見逃すため。worktree 側の判定基準は HEAD ではなく PRE_SYNC_TREE:
    # HEAD 基準の git status --porcelain を使うと、同期前から存在した正当な staged 変更
    # (scripts/local-patches/ で許容している「staged のみの変更」)が復元完了後も常に
    # 非空として現れ、PRE_SYNC_TREE と完全一致した正しい復元を誤報してしまう
    local verify_ok=1
    if ! git diff --cached --quiet "${PRE_SYNC_TREE}" -- skills-lock.json ".agents/skills/${SKILL_NAME}/" scripts/local-patches/; then
      verify_ok=0
    elif [[ "${restore_targets[*]}" == *--worktree* ]]; then
      if ! git diff --quiet "${PRE_SYNC_TREE}" -- skills-lock.json ".agents/skills/${SKILL_NAME}/" scripts/local-patches/ \
        || [[ -n "$(git ls-files --others --exclude-standard -- skills-lock.json ".agents/skills/${SKILL_NAME}/" scripts/local-patches/)" ]]; then
        verify_ok=0
      fi
    fi
    if [[ "${verify_ok}" -eq 1 ]]; then
      echo "契約範囲を同期開始前(PRE_SYNC_TREE=${PRE_SYNC_TREE})へ復元しました(範囲外 path の index・worktree には触れていません)。"
    else
      echo "エラー: 契約範囲の復元後検証で差分が残っています。git diff --cached ${PRE_SYNC_TREE} -- <契約パス> / git diff ${PRE_SYNC_TREE} -- <契約パス> / git ls-files --others -- <契約パス> で残留を確認し、git restore --staged --worktree --source=${PRE_SYNC_TREE} -- <path> で手動復旧してください(fail-closed。復元完了とは扱いません)。"
    fi
  }

  # checker の「すべての」実行(同期前 check / Step 5.5 の apply・最終 check)の直後に、
  # 実行結果に関わらず範囲外 digest と checker 自身の blob hash を再検証する。範囲外を
  # 書き換えて非 0 終了するケース・checker 自身を未承認コードへ置換するケースを、次の
  # 実行より前に fail-closed で検出するため
  verify_outside_and_checker() {
    if [[ -L scripts/check-skill-local-patches.sh ]] \
      || [[ "$(git hash-object -- scripts/check-skill-local-patches.sh 2>/dev/null || echo missing)" != "${CHECKER_APPROVED_HASH}" ]]; then
      echo "エラー: checker 自身が書き換えられました(symlink 化を含む)。未承認の状態のため以後実行しません(fail-closed)。"
      return 1
    fi
    if [[ "$(outside_state)" != "${PRE_OUTSIDE}" ]]; then
      echo "エラー: checker が契約範囲外の path を変更しました(fail-closed)。"
      echo "git status --porcelain で範囲外の変更を特定し、tracked は git restore -- <path> / index は git restore --staged -- <path> で手動復旧してください(契約範囲用の却下手順では範囲外は戻りません)。checker 側の修正も必要です。"
      return 1
    fi
    return 0
  }

  echo "==> 同期前の local patch 検証(check)"
  pre_check_rc=0
  # 実行対象は worktree のファイルではなく、承認済み blob を取り出した CHECKER_EXEC
  bash "${CHECKER_EXEC}" || pre_check_rc=$?
  if ! verify_outside_and_checker; then
    restore_contract_scope
    echo "(npx は実行していません)"
    exit 1
  fi
  if [[ "${pre_check_rc}" -ne 0 ]]; then
    restore_contract_scope
    echo "エラー: 同期前の local patch 検証に失敗しました。修復してから再実行してください(fail-closed。npx は実行していません)。"
    exit 1
  fi
elif [[ -f .agents/skills/LOCAL-PATCHES.md ]]; then
  echo "エラー: .agents/skills/LOCAL-PATCHES.md があるのに scripts/check-skill-local-patches.sh がありません。local patch を検証できないため同期しません(fail-closed)。"
  exit 1
fi

# skills CLI (vercel-labs/skills) は固定版でのみ実行する（未固定 npx はレジストリ
# 最新版の無検証即時実行になり、差分確認・承認より前に走る supply chain 経路になる）。
# 1つ目の --yes は npx 自体のインストール確認プロンプトのスキップ、末尾の --yes は
# skills CLI へ渡す確認プロンプトのスキップで、別物（位置で区別される）。
SKILLS_CLI_VERSION="1.5.22"   # scripts/skills-lock-update.sh と同一値。更新手順は下記節を参照

# 作業ツリーの状態シグネチャ（種別 + パーミッション + 内容）を1行で返す。
# 第1引数のパスを起点に、通常ファイルは内容の sha256、シンボリックリンクは
# リンク先文字列の sha256（リンク先の解決はしない）、ディレクトリ・gitlink は
# 自身の mode に加えて配下全エントリ（サブディレクトリの mode・ディレクトリ向け
# symlink のリンク先と mode・ファイルの mode と内容ハッシュ）をバイト列ソートで
# 決定的に再帰集約した sha256 を返す。存在しないパスは "MISSING"（それ自体が
# 1つの状態であり、エラーではない）。第2引数以降で走査の除外を指定できる:
#   prune:<rel> — 起点からの相対パス <rel> をエントリごと走査から除外する。
#                 パス区切りをまたがない per-segment glob（fnmatch）を使える
#                 （例: .git/MERGE_* は .git 直下にのみ一致し .git/hooks/ 配下の
#                 同名ファイルには一致しない）。npx が書き換えてよいスコープ内と、
#                 .git のうち通常の git 操作で変動し得る領域の限定除外に使う
#   prune-under:<rel> — <rel> 自身のメタデータ（種別・mode・symlink のリンク先）は
#                 記録するが、配下へは降下せず記録もしない（完全一致のみで glob
#                 不可）。既存の許可先ディレクトリに使う: 配下（npx の正当な書き込み
#                 先）は除外しつつ、要素自身のディレクトリ→symlink 置換・chmod は
#                 前後シグネチャの不一致として検出する（PR #412 P0 指摘: エントリ
#                 ごと prune すると npx 実行中の symlink 置換が署名に現れない）
#   omit:<rel>  — <rel> 自身のメタデータ（存在・mode）は記録しないが配下は走査する
#                 （実行前に存在しなかった親ディレクトリを npx が正当に新規作成する
#                 ケースの許容に使う。完全一致のみで glob 不可）
#
# PR #412 の P1 指摘群（porcelain に現れない状態変化の見逃し: 配下ファイルの
# 内容上書き・ディレクトリと dirlink の変更・ディレクトリの chmod）は、いずれも
# 「git status に現れたパスだけを個別にシグネチャ化する」構造に起因する同一クラス。
# git はディレクトリの mode を追跡しないため、スコープ外ディレクトリの chmod は
# status の前後どちらにも現れず、status 由来のパス集合をどれだけ精緻にハッシュ
# しても原理的に検出できない。そのためこのシグネチャは status 由来のパスではなく
# リポジトリルート全体（スコープ内と、.git のうち git 操作で変動し得る領域のみ
# 除外。.git/config・.git/hooks/ 等の永続メタデータは署名対象）へ適用する。
# .gitignore 対象の
# ファイルも同じ理由（porcelain に現れない）で走査対象に含める。対象は skills
# 配布リポジトリで作業ツリーが小さく、全走査 + 全ハッシュを前後 2 回行っても
# 実用上問題ない。python3 は主要 Linux / macOS に標準搭載されている。stat
# コマンドの出力書式は環境（BSD/GNU）で異なるため、シェルの `stat` は使わず
# python3 の os.lstat に統一する。取得エラー（lstat・open・走査失敗）は
# 「読めなかっただけ」を「変化なし」と誤認する fail-open 経路になるため、
# 握り潰さず即座に非ゼロ終了して呼び出し側で fail-closed に扱う。
path_state() {
  local path="$1"
  shift
  python3 - "${path}" "$@" <<'PYEOF'
import fnmatch, hashlib, os, stat, sys

path = sys.argv[1]

# 除外指定（prune: 走査ごと除外 / prune-under: 自身は記録し配下のみ除外 /
# omit: 自身のメタデータのみ不記録）を解釈する。
prunes = []
prune_unders = set()
omits = set()
for spec in sys.argv[2:]:
    label, _, rel = spec.partition(":")
    if label == "prune" and rel:
        prunes.append(rel)
    elif label == "prune-under" and rel:
        prune_unders.add(rel)
    elif label == "omit" and rel:
        omits.add(rel)
    else:
        print(f"path_state: 不正な除外指定: {spec}", file=sys.stderr)
        sys.exit(1)


def pruned(rel):
    # prune はパス区切りをまたがない per-segment glob で照合する。素の fnmatch は
    # `*` が `/` もまたいで一致するため、`.git/MERGE_*` のような浅い階層向けの
    # パターンが `.git/hooks/` 配下の同名ファイル（署名対象へ残したい深い階層）
    # まで巻き込んでしまう。セグメント数の一致を要求してから各セグメントを個別に
    # 照合し、除外が意図した深さの外へ広がらないようにする。
    segs = rel.split(os.sep)
    for pat in prunes:
        pat_segs = pat.split("/")
        if len(pat_segs) == len(segs) and all(
            fnmatch.fnmatchcase(s, p) for s, p in zip(segs, pat_segs)
        ):
            return True
    return False


def fail(err):
    # 部分的なシグネチャを出力したまま正常終了すると、呼び出し側が欠損に気付けない。
    # ファイル内容は出力せず（秘密情報混入防止）、エラー要因のみ stderr へ出して
    # 非ゼロ終了する。
    print(f"path_state: 状態取得に失敗: {err}", file=sys.stderr)
    sys.exit(1)


def file_hash(p):
    fh = hashlib.sha256()
    with open(p, "rb") as f:
        while True:
            chunk = f.read(1 << 20)
            if not chunk:
                break
            fh.update(chunk)
    return fh.hexdigest()


try:
    st = os.lstat(path)
except FileNotFoundError:
    print("MISSING")
    sys.exit(0)
except OSError as e:
    fail(e)

mode = oct(stat.S_IMODE(st.st_mode))
kind = stat.S_IFMT(st.st_mode)
h = hashlib.sha256()

try:
    if stat.S_ISLNK(st.st_mode):
        h.update(os.readlink(path).encode("utf-8", "surrogateescape"))
    elif stat.S_ISREG(st.st_mode):
        h.update(file_hash(path).encode("ascii"))
    else:
        # ディレクトリ・gitlink 等。配下の各エントリを相対パス・パーミッション・
        # 内容（種別に応じたハッシュ）でソートして正規化し、走査順に依存せず
        # 決定的な signature にする。os.walk は既定（followlinks=False）で
        # symlink の指す先へは降りないため、ディレクトリ向け symlink は dirnames
        # として自身（リンク先文字列・mode）だけを記録し、リンク先ディレクトリの
        # 中身が二重に取り込まれることはない。
        entries = []
        for dirpath, dirnames, filenames in os.walk(path, onerror=fail):
            kept = []
            for dname in sorted(dirnames):
                # dirnames 自体（配下ディレクトリ・ディレクトリ向け symlink）を
                # lstat して entries へ含める。os.walk は filenames 経由で列挙
                # しないため、ここで記録しないと配下ディレクトリの mode 変更や
                # ディレクトリ向け symlink のリンク先・mode 変更がシグネチャに
                # 反映されない（PR #412 P1 指摘）。
                dp = os.path.join(dirpath, dname)
                rel = os.path.relpath(dp, path)
                if pruned(rel):
                    continue
                # prune-under は自身のエントリ（下の記録処理）は残しつつ降下だけを
                # 止める（kept へ入れない = os.walk がこの配下へ降りない）。
                if rel not in prune_unders:
                    kept.append(dname)
                if rel in omits:
                    continue
                dst = os.lstat(dp)
                dmode = oct(stat.S_IMODE(dst.st_mode))
                if stat.S_ISLNK(dst.st_mode):
                    target_hash = hashlib.sha256(
                        os.readlink(dp).encode("utf-8", "surrogateescape")
                    ).hexdigest()
                    entries.append(f"{rel}:{dmode}:dirlink:{target_hash}")
                else:
                    entries.append(f"{rel}:{dmode}:dir")
            # prune した名前を降下対象からも外す（os.walk は dirnames の
            # in-place 更新で走査対象を制御する仕様）。
            dirnames[:] = kept
            for name in sorted(filenames):
                p = os.path.join(dirpath, name)
                rel = os.path.relpath(p, path)
                if pruned(rel) or rel in omits:
                    continue
                fst = os.lstat(p)
                fmode = oct(stat.S_IMODE(fst.st_mode))
                if stat.S_ISLNK(fst.st_mode):
                    target_hash = hashlib.sha256(
                        os.readlink(p).encode("utf-8", "surrogateescape")
                    ).hexdigest()
                    entries.append(f"{rel}:{fmode}:link:{target_hash}")
                elif stat.S_ISREG(fst.st_mode):
                    entries.append(f"{rel}:{fmode}:reg:{file_hash(p)}")
                else:
                    # デバイスファイル等の特殊な種別は内容ハッシュが定義できない
                    # ため種別・mode のみ記録する。
                    entries.append(f"{rel}:{fmode}:other")
        entries.sort()
        for entry in entries:
            h.update(entry.encode("utf-8", "surrogateescape"))
            h.update(b"\n")
except OSError as e:
    fail(e)

print(f"{kind}:{mode}:{h.hexdigest()}")
PYEOF
}

# リポジトリルート全体の状態シグネチャ（スコープ外書き込み検出の実体）。
# 除外は次の 3 種のみ:
#   - スコープ内 — skills-lock.json / .agents/skills/${SKILL_NAME}（npx の正当な書き込み先）。
#     ただし許可先ディレクトリ自身の除外方法は SKILL_DIR_SIG_SPEC（npx 実行前に一度
#     だけ確定）で切り替える: 既存なら prune-under（配下のみ除外・要素自身の種別・
#     mode・symlink 先は署名）にして、npx が実行中に許可先を外向き symlink へ置換して
#     リンク先へ書く TOCTOU を前後シグネチャ不一致として検出する（PR #412 P0 指摘。
#     事前の lstat 検査は開始時点しか見ない）。実行前に不存在（初回インストール）の
#     場合のみ prune（エントリごと除外）にして正当な新規作成を誤検知にしない — この
#     場合の symlink 置換・symlink としての新規作成は、npx 実行後の許可先経路
#     再検証（verify_scope_path_after_run）が fail-closed で拒否する
#   - .git のうち、このフロー自身が前後スナップショット間に実行する git コマンドで
#     変動し得る領域のみ — 前後シグネチャの間に走る git 操作は
#     `git status --porcelain -z -uall`（実行後スナップショット取得）だけであり、
#     status が触るのは index の stat cache 更新（.git/index）とその一時 lock
#     （.git/index.lock）のみ。リバート用の git checkout / git clean は
#     実行後シグネチャ取得より後の失敗経路でしか呼ばれないため、署名比較に影響しない。
#     以前は objects・refs・packed-refs・HEAD・logs・worktrees 等も prune していたが、
#     npx がこれらへ書き込む（履歴・参照の改変）とスコープ外検査を丸ごと迂回できて
#     しまうため（PR #412 P0 指摘）、実測で避けられない index・index.lock 以外は
#     すべて署名対象に含める。lock の prune を `.git/*.lock` のワイルドカードに
#     すると、npx が残した永続 lock（.git/config.lock・.git/HEAD.lock 等）まで
#     検査から漏れるため（PR #412 codex P1 指摘）、自プロセスの git status が
#     作り得る .git/index.lock だけを完全一致で prune する。
#     prune した .git/index の背後で npx が index の論理状態を改変するケースは、
#     index_state_signature（下記）の前後比較が受け持つ。
#     代償として、同期実行中にこのリポジトリで並行 git 操作
#     （他 worktree 含む）を行うとシグネチャ不一致（誤検知）として停止し得る
#     （注意事項に明記。fail-closed 側に倒す設計判断）
#   - REPO_SIG_OMITS — 実行前に存在しなかった場合の .agents / .agents/skills
#     （npx 実行前スナップショットの直前に一度だけ確定する）。既存なら omit せず
#     種別・mode・symlink 先を通常どおり署名するため、既存親ディレクトリの chmod や
#     ディレクトリ→symlink 置換は検出される（PR #412 P1 指摘）。不存在だった場合
#     のみ omit し、初回インストールで npx が親ディレクトリを正当に新規作成する
#     ケースを誤検知にしない。omit でも配下の走査は継続するため、同居する他スキルの
#     ツリー（スコープ外）は引き続き保護される
#
# REPO_SIG_OMITS は前後 2 回の呼び出しで同一でなければならない（実行後の存在有無で
# 再判定すると、初回インストールの正当な新規作成が前後不一致＝誤検知になる）。
# 空配列の "${arr[@]}" 展開は bash 3.2 の set -u で unbound になるため
# ${arr[@]+...} 形式で参照する。
REPO_SIG_OMITS=()
# 既定は prune-under（既存許可先向け）。初回インストール（実行前に不存在）の場合のみ
# npx 実行前の判定ブロックで prune へ切り替える。前後 2 回の呼び出しで同一で
# なければならない（REPO_SIG_OMITS と同じ理由）。
SKILL_DIR_SIG_SPEC="prune-under:.agents/skills/${SKILL_NAME}"

# index の論理状態のシグネチャ。.git/index はファイルとしては prune せざるを得ない
# （このフロー自身の git status が stat cache を正当に更新するため）が、その背後で
# npx がエントリの追加・削除・blob 差し替えや skip-worktree / assume-unchanged
# ビットの付与を行っても検出できなくなる（PR #412 codex P1 指摘。特に skip-worktree
# を立てられると、以後その tracked ファイルの変更が git status から恒久的に隠れる）。
# stat cache と独立な論理状態 — `git ls-files --stage`（mode・object・stage・パス）と
# `git ls-files -v`（状態タグ。skip-worktree は S、assume-unchanged は小文字）— を
# sha256 へまとめ、repo_state_signature の出力へ連結して前後比較する。git status の
# stat cache 更新はどちらの出力も変えないため、このフロー自身に起因する誤検知はない。
# 取得失敗は「変化なしと確認できない」ため非ゼロで返し、呼び出し側の fail-closed
# （sentinel 比較）へ倒す。
index_state_signature() {
  local staged tags digest
  staged="$(git ls-files --stage)" || return 1
  tags="$(git ls-files -v)" || return 1
  digest="$(printf '%s\n--\n%s\n' "${staged}" "${tags}" \
    | python3 -c 'import hashlib, sys; print(hashlib.sha256(sys.stdin.buffer.read()).hexdigest())')" || return 1
  printf '%s\n' "${digest}"
}

repo_state_signature() {
  local tree_sig index_sig
  tree_sig="$(path_state . \
    "prune:skills-lock.json" \
    "${SKILL_DIR_SIG_SPEC}" \
    "prune:.git/index" \
    "prune:.git/index.lock" \
    ${REPO_SIG_OMITS[@]+"${REPO_SIG_OMITS[@]}"})" || return 1
  index_sig="$(index_state_signature)" || return 1
  printf '%s:index:%s\n' "${tree_sig}" "${index_sig}"
}

# git status --porcelain -z の1レコード（"XY PATH\0"）からスコープ内
# （skills-lock.json / .agents/skills/${SKILL_NAME}/ 配下）を除いたレコードだけを
# outfile へ NUL 区切りで書き出す。検出の主体はリポジトリ全体の状態シグネチャ
# （repo_state_signature）であり、このレコード列は status レベルの前後比較と、
# 検出時の報告（どのパスが git status 上で変化したか）に使う。ディレクトリの
# chmod 等 status に現れない変化はこの一覧に載らず、シグネチャ不一致としてのみ
# 検出される。固定長プレフィックス（ステータス2文字+空白1文字=3文字）を
# 切り落としてパスを取り出すため、C-quote（改行等を含むパスのダブルクォート化）の
# 影響を受けない（-z 出力は raw byte のパスであり、path をそのままファイルアクセス
# に使ってよい）。
filter_out_of_scope() {
  local infile="$1" outfile="$2" record path
  : > "${outfile}"
  while IFS= read -r -d '' record; do
    path="${record:3}"
    if [[ "${path}" == "skills-lock.json" || "${path}" == ".agents/skills/${SKILL_NAME}/"* ]]; then
      continue
    fi
    printf '%s\0' "${record}" >> "${outfile}"
  done < "${infile}"
}

# npx が新規作成した .gitignore 対象ファイルのみを許可先配下から削除する
# （revert_in_scope の補助）。`git clean -fdx` は npx 実行前から許可先配下に存在した
# ignored ファイル（.DS_Store 等）まで削除してしまうため使わない（PR #412 Bugbot
# Medium 指摘）。実行前インベントリ（SCOPE_INVENTORY_FILE。find -print0 の NUL 区切り
# 全ファイル一覧）に存在しないパスに限り、許可先配下であることを再検証したうえで
# 個別削除する。実行前から存在した ignored ファイルは内容が書き換えられていても
# 削除しない（保全。変更・削除の検出と復元は restore_preexisting_ignored が
# 実行前バックアップとの比較で行う）。パス名に
# スペース・改行を含み得る前提で、一覧の受け渡しは全経路 NUL 区切りで行う。
# npx が新規作成した「ignored ファイルのみを含む空ディレクトリ」は best-effort で
# 残り得るが、ファイル残置と異なり後続処理の誤認を生まないため許容する。
# ls-files の出力は pipe ではなく一時ファイルで python3 へ渡す（ヒアドキュメントで
# プログラムを与える python3 は stdin をヒアドキュメントに占有されるため、pipe との
# 併用ができない — 併用すると読み手のいない pipe への書き込みで SIGPIPE になる）。
remove_new_ignored_in_scope() {
  local ignored_list rc=0
  ignored_list="$(mktemp)" || return 1
  if git ls-files -z --others --ignored --exclude-standard -- ".agents/skills/${SKILL_NAME}/" > "${ignored_list}" 2>/dev/null; then
    SKILL_DIR=".agents/skills/${SKILL_NAME}" INVENTORY_FILE="${SCOPE_INVENTORY_FILE}" IGNORED_LIST_FILE="${ignored_list}" python3 - <<'PYEOF' || rc=1
import os

skill_dir = os.environ["SKILL_DIR"]
prefix = skill_dir + "/"
with open(os.environ["INVENTORY_FILE"], "rb") as f:
    inventory = {p for p in f.read().split(b"\0") if p}
with open(os.environ["IGNORED_LIST_FILE"], "rb") as f:
    ignored_paths = [p for p in f.read().split(b"\0") if p]

for raw in ignored_paths:
    text = raw.decode("utf-8", "surrogateescape")
    # 削除は kebab-case 検証済みの許可先配下に厳密に限定する（ls-files の出力を
    # 信用しきらず、prefix 一致と `..` セグメント不在を自衛的に再検証する）。
    if not text.startswith(prefix) or ".." in text.split("/"):
        continue
    if raw in inventory:
        continue  # 実行前から存在した ignored ファイルは保全する
    try:
        if os.path.isdir(text) and not os.path.islink(text):
            continue  # ディレクトリ自体は削除対象にしない（ファイル・symlink のみ）
        os.unlink(text)
    except FileNotFoundError:
        pass
PYEOF
  else
    rc=1
  fi
  rm -f "${ignored_list}"
  return "${rc}"
}

# 実行前から許可先配下に存在した ignored ファイル（.DS_Store 等）を、npx 実行前の
# バックアップ（IGNORED_BACKUP_DIR。相対パス構造・mode を保持）と比較し、変化
# （内容・mode・種別の変更、削除）があればバックアップから復元する。許可先配下は
# npx の正当な書き込み先だが、ignored ファイルは同期対象外であり npx が変更して
# よい理由がないため、変更を検出したら復元して警告する（処理自体は継続してよい
# 契約。復元の失敗のみ呼び出し側で非ゼロ終了へ倒す）。許可先配下は
# repo_state_signature の prune-under で署名から除外されるため、この変化は
# シグネチャ比較では検出できず、バックアップとの直接比較だけが検出手段になる。
# 事前の symlink 走査（npx 実行前）により対象は regular file のみである前提。
# 復元先が npx により symlink 化されている可能性に備え、書き込み前に unlink し、
# 親ディレクトリの realpath が許可先内に収まることを検証する（リンク先への
# 書き込み防止）。親ディレクトリの再作成は make_parent_dirs（存在する最深の
# 祖先の containment 検証 + 1 階層ずつの lstat 付き os.mkdir）で行い、
# os.makedirs が中間 symlink を辿ってリポジトリ外へディレクトリを作る経路を
# 残さない。バックアップとの比較・復元は mode 比較を含むため、stat の
# 出力書式差（BSD/GNU）を避けて python3 の os.lstat に統一する。
restore_preexisting_ignored() {
  # バックアップ対象が無ければ（初回インストール・既存 ignored なし）何もしない。
  [[ -s "${IGNORED_BASELINE_FILE}" ]] || return 0
  SKILL_DIR=".agents/skills/${SKILL_NAME}" IGNORED_BACKUP_DIR="${IGNORED_BACKUP_DIR}" IGNORED_BASELINE_FILE="${IGNORED_BASELINE_FILE}" python3 - <<'PYEOF'
import os, shutil, stat, sys

skill_dir = os.environ["SKILL_DIR"]
prefix = skill_dir + "/"
backup_dir = os.environ["IGNORED_BACKUP_DIR"]
root = os.path.realpath(skill_dir)


def fail(msg):
    # 復元に失敗したまま正常終了すると、破壊された既存 ignored ファイルが
    # 「復元済み」として扱われてしまうため、必ず非ゼロ終了して呼び出し側で
    # fail-closed（バックアップ dir の保全 + 手動復旧の案内）に扱わせる。
    print(f"restore_preexisting_ignored: {msg}", file=sys.stderr)
    sys.exit(1)


def make_parent_dirs(parent):
    # os.makedirs を先に呼ぶと、中間ディレクトリが外向き symlink へ置換されて
    # いた場合にリンク先（リポジトリ外）へディレクトリを作ってしまう — 作成
    # 自体がスコープ逸脱であり、後段の containment チェックで停止しても外側の
    # dir は残る（PR #412 Bugbot Medium 指摘）。そこで先に「存在する最深の祖先」
    # の realpath が許可先の内側か、許可先へ至る素の経路上（root の祖先）にある
    # ことを検証し、さらに作成は 1 階層ずつ lstat で symlink・非ディレクトリで
    # ないことを確認しながら os.mkdir で行う（symlink を辿る経路を残さない。
    # 実行後の配下 symlink 走査が先に停止させるため通常は到達しない防御多層）。
    anc = parent
    while anc and not os.path.lexists(anc):
        anc = os.path.dirname(anc)
    if anc:
        real_anc = os.path.realpath(anc)
        if not (
            real_anc == root
            or real_anc.startswith(root + os.sep)
            or root.startswith(real_anc + os.sep)
        ):
            fail(f"復元先の祖先が許可先の外を指しています: {parent}")
    cur = ""
    for part in parent.split(os.sep):
        cur = os.path.join(cur, part) if cur else part
        try:
            cst = os.lstat(cur)
        except FileNotFoundError:
            os.mkdir(cur)
            continue
        if not stat.S_ISDIR(cst.st_mode):
            fail(f"復元先の中間経路がディレクトリではありません（symlink 等）: {cur}")


with open(os.environ["IGNORED_BASELINE_FILE"], "rb") as f:
    paths = [p for p in f.read().split(b"\0") if p]

for raw in paths:
    text = raw.decode("utf-8", "surrogateescape")
    # 復元は kebab-case 検証済みの許可先配下に厳密に限定する（自前で列挙した
    # 一覧でも、prefix 一致と `..` セグメント不在を自衛的に再検証する）。
    if not text.startswith(prefix) or ".." in text.split("/"):
        continue
    backup = os.path.join(backup_dir, text)
    try:
        bst = os.lstat(backup)
        changed = False
        reason = ""
        try:
            cst = os.lstat(text)
            if not stat.S_ISREG(cst.st_mode):
                changed, reason = True, "種別が変化"
            elif stat.S_IMODE(cst.st_mode) != stat.S_IMODE(bst.st_mode):
                changed, reason = True, "mode が変化"
            else:
                with open(backup, "rb") as f1, open(text, "rb") as f2:
                    while True:
                        c1 = f1.read(1 << 20)
                        c2 = f2.read(1 << 20)
                        if c1 != c2:
                            changed, reason = True, "内容が変化"
                            break
                        if not c1:
                            break
        except FileNotFoundError:
            changed, reason = True, "削除されていた"
        if not changed:
            continue
        parent = os.path.dirname(text)
        if parent:
            make_parent_dirs(parent)
            real_parent = os.path.realpath(parent)
            # 親ディレクトリが symlink 化されているとリンク先（リポジトリ外を
            # 含む）へ書き込んでしまうため、realpath の包含を検証してから書く。
            if real_parent != root and not real_parent.startswith(root + os.sep):
                fail(f"復元先の親ディレクトリが許可先の外を指しています: {text}")
        try:
            # 復元先自体が symlink 化されていた場合にリンク先へ書かないよう、
            # 既存エントリを外してから regular file として書き戻す。
            os.unlink(text)
        except FileNotFoundError:
            pass
        shutil.copyfile(backup, text)
        os.chmod(text, stat.S_IMODE(bst.st_mode))
        print(
            f"警告: npx が実行前から存在した ignored ファイルを変更したため"
            f"（{reason}）、バックアップから復元しました: {text}",
            file=sys.stderr,
        )
    except OSError as e:
        fail(f"{text} の復元に失敗: {e}")
PYEOF
}

# スコープ内（skills-lock.json / .agents/skills/${SKILL_NAME}/）の変更をリバートする。
# npx 失敗・スコープ外検出・実行後 git status 取得失敗のすべての異常終端経路が
# 共有する（PR #412 P1: どの異常経路でも生成済みのスコープ内変更を残置しない契約）。
# 2つのパスを1つの `git checkout --` に渡すとアトミックに扱われ、どちらか一方が
# 「追跡対象なし」（初回具現化・untracked のみの書き込み時）で pathspec エラーになると
# コマンド全体が失敗し、もう一方（skills-lock.json）も復元されないまま抜けてしまう
# ため、必ず1コマンド1パスで分離する。git clean はディレクトリが存在しない場合に
# 非ゼロ終了するため、存在確認してから呼ぶ（set -e 下で無条件に呼ぶと呼び出し元の
# 案内メッセージより先に停止し得る）。.gitignore 対象の残置
# （Issue #413）は -fdx ではなく remove_new_ignored_in_scope（実行前インベントリ
# との突き合わせ）で解消する（既存 ignored ファイルの巻き添え削除防止）。
# 実行後再検証（verify_scope_path_after_run）が許可先経路の symlink 化・非
# ディレクトリ化を検出した場合、または実行後の配下 symlink 走査が npx 実行中に
# 作られた symlink を検出した場合（いずれも SCOPE_PATH_COMPROMISED=1）は、
# checkout・clean・ignored 削除のパス走査がリンク先（リポジトリ外を含む）へ
# 向かい得るため、skills-lock.json の復元のみ行い、許可先配下への削除系操作は
# 一切行わず案内に留める（symlink を通じた外部削除の防止。fail-closed）。
# skills-lock.json 自体が npx 実行中に symlink へ置換されたケース
# （LOCK_FILE_COMPROMISED=1）では、素の git checkout がリンク先（リポジトリ外を
# 含む）へ書き込み得るため、先に rm で symlink 自体を除去（リンク先は辿らない）
# してから checkout で index の内容を regular file として書き戻す。symlink 以外の
# 想定外実体（ディレクトリ等）は rm -f で除去できず checkout も安全に働かないため、
# 一切触らず手動復旧を案内する。
# SKILL_NAME はループの現在値を呼び出し時に参照する。
revert_in_scope() {
  if [[ "${LOCK_FILE_COMPROMISED}" -ne 0 ]]; then
    if [[ -L "skills-lock.json" ]]; then
      rm -f skills-lock.json
      git checkout -- skills-lock.json 2>/dev/null || true
    elif [[ -e "skills-lock.json" && ! -f "skills-lock.json" ]]; then
      echo "警告: skills-lock.json が想定外の実体（ディレクトリ等）に置換されているため自動復元しません。実体を確認・除去してから git checkout -- skills-lock.json で復元してください。" >&2
    else
      git checkout -- skills-lock.json 2>/dev/null || true
    fi
  else
    git checkout -- skills-lock.json 2>/dev/null || true
  fi
  if [[ "${SCOPE_PATH_COMPROMISED}" -ne 0 ]]; then
    # symlink 越しの走査を避けるため既存 ignored の復元も行わない。復元素材を
    # 失わないよう、バックアップ dir は削除せず保全して手動復旧に委ねる。
    IGNORED_BACKUP_KEEP=1
    echo "警告: 許可先経路またはその配下が symlink 等へ置換・作成されているため、.agents/skills/${SKILL_NAME}/ への checkout・git clean・ignored 削除・既存 ignored の復元は行いません（リンク先への削除・書き込みを避けるため）。symlink の指す先と許可先の内容を手動確認し、symlink を除去してから復旧してください。既存 ignored ファイルのバックアップは ${IGNORED_BACKUP_DIR} に相対パス構造で残っています。" >&2
    return 0
  fi
  git checkout -- ".agents/skills/${SKILL_NAME}/" 2>/dev/null || true
  if [[ -d ".agents/skills/${SKILL_NAME}/" ]]; then
    git clean -fd -- ".agents/skills/${SKILL_NAME}/" || true
    remove_new_ignored_in_scope || true
  fi
  # 既存 ignored の変更・削除はここでバックアップから戻す（checkout / clean /
  # remove_new_ignored_in_scope はいずれも既存 ignored に触れないため、この復元が
  # 唯一の回復経路）。復元自体が失敗した場合はバックアップ dir を保全して案内し、
  # IGNORED_RESTORE_FAILED で呼び出し元へ伝える（手動復旧を要するため、npx 失敗
  # 経路でも skip（continue）せずループ全体を exit 1 で停止させる）。
  if ! restore_preexisting_ignored; then
    IGNORED_RESTORE_FAILED=1
    IGNORED_BACKUP_KEEP=1
    echo "エラー: 実行前から存在した ignored ファイルの復元に失敗しました。バックアップは ${IGNORED_BACKUP_DIR} に相対パス構造で残っています。手動で復旧してください。" >&2
  fi
}

# npx 実行後の許可先経路の再検証（PR #412 P0 指摘: TOCTOU）。事前の lstat 検査は
# 開始時点しか見ないため、npx が実行中に許可先（またはその親）を外向き symlink へ
# 置換した・初回インストールで .agents 自体を symlink として作成したケースは、
# 事後に全パス要素を再度 lstat しなければ検出できない（存在する要素はすべて実体の
# ディレクトリであることを要求し、symlink・非ディレクトリは fail-closed で拒否）。
# 併せて既存許可先は prune-under により要素自身が前後シグネチャへ署名されるため、
# 置換自体もシグネチャ不一致として検出される（この関数はその場合の原因特定と、
# 初回インストール（prune でシグネチャに現れない）の防御を担う）。
verify_scope_path_after_run() {
  local component
  for component in ".agents" ".agents/skills" ".agents/skills/${SKILL_NAME}"; do
    if [[ -L "${component}" ]]; then
      echo "エラー: npx 実行後の再検証で ${component} がシンボリックリンクになっています。npx が実行中に許可先を symlink へ置換し、リンク先（リポジトリ外を含む）へ書き込んだ可能性があります。リンク先の内容とリポジトリ外への書き込み有無を手動確認してください（fail-closed）。" >&2
      return 1
    fi
    if [[ -e "${component}" && ! -d "${component}" ]]; then
      echo "エラー: npx 実行後の再検証で ${component} がディレクトリではありません。npx の書き込み先として想定外の実体のため、手動確認が必要です（fail-closed）。" >&2
      return 1
    fi
  done
  return 0
}

# npx 実行後の skills-lock.json の実体再検証（PR #412 codex P0 指摘: TOCTOU）。
# skills-lock.json は署名の prune と porcelain フィルタの双方からパスで除外される
# ため、npx が実行中に外向き symlink へ置換してリンク先へ書き込んでもどの検査にも
# 現れない。実行後に lstat し、存在するのに regular file でなければ fail-closed で
# 拒否する（事前検証時の不存在→生成のケースも regular file であることを要求する。
# 実行後の不存在は改変ではなく npx の書き込み不発のため、ここでは不問とする）。
verify_lock_file_after_run() {
  if [[ -L "skills-lock.json" ]]; then
    echo "エラー: npx 実行後の再検証で skills-lock.json がシンボリックリンクになっています。npx が実行中に置換し、リンク先（リポジトリ外を含む）へ書き込んだ可能性があります。リンク先の内容とリポジトリ外への書き込み有無を手動確認してください（fail-closed）。" >&2
    return 1
  fi
  if [[ -e "skills-lock.json" && ! -f "skills-lock.json" ]]; then
    echo "エラー: npx 実行後の再検証で skills-lock.json が regular file ではありません。npx の書き込み先として想定外の実体のため、手動確認が必要です（fail-closed）。" >&2
    return 1
  fi
  return 0
}

# npx 実行前後のスナップショット比較（スコープ外書き込みの多層防御）用の一時ファイル。
# -uall は新規ディレクトリの collapse（`?? .agents/` への丸め）を防ぐため必須。
# status.renames=false でユーザー環境の git config に依存せず rename 検出を無効化する。
SNAP_BEFORE="$(mktemp)"
SNAP_AFTER="$(mktemp)"
SNAP_FILTERED_BEFORE="$(mktemp)"
SNAP_FILTERED_AFTER="$(mktemp)"
NPX_OUTPUT_FILE="$(mktemp)"
SCOPE_INVENTORY_FILE="$(mktemp)"
IGNORED_BASELINE_FILE="$(mktemp)"
# 既存 ignored ファイルの実行前バックアップ先（相対パス構造・mode を保持）。
# 復元失敗時は IGNORED_BACKUP_KEEP=1 で削除を抑止し、手動復旧の素材として残す。
IGNORED_BACKUP_DIR="$(mktemp -d)"
IGNORED_BACKUP_KEEP=0
IGNORED_RESTORE_FAILED=0

# npx 実行後の許可先経路 再検証（verify_scope_path_after_run）と許可先配下の
# 実行後 symlink 走査の結果フラグ。1 のとき revert_in_scope は許可先配下への
# 削除系操作を行わない（symlink 越しのリポジトリ外削除の防止）。npx 実行直後に
# 一度だけ更新する。
SCOPE_PATH_COMPROMISED=0
# skills-lock.json の実行後 再検証（verify_lock_file_after_run）の結果フラグ。
# 1 のとき revert_in_scope は素の git checkout でリンク先へ書き込まないよう、
# symlink を rm で除去してから復元する。npx 実行直後に一度だけ更新する。
LOCK_FILE_COMPROMISED=0

# npx 実行前の許可先配下の全ファイルインベントリ（.gitignore 対象を含む。
# find -print0 の NUL 区切り）。revert_in_scope（remove_new_ignored_in_scope）が
# 「npx が新規作成した ignored ファイル」だけを選別削除するための基準になる
# （実行前から存在した ignored ファイルの巻き添え削除防止。PR #412 Bugbot Medium
# 指摘）。取得に失敗すると選別基準を失い、リバートが既存 ignored ファイルを誤削除
# し得るため fail-closed で中止する（この時点では npx 未実行のため残置なし）。
# 許可先が不存在（初回インストール）の場合は空インベントリ（npx が作るものはすべて
# 新規）とする。
if [[ -e ".agents/skills/${SKILL_NAME}" ]]; then
  # 許可先配下の既存 symlink の事前拒否。repo_state_signature は prune-under で
  # 許可先配下を署名から除外するため、配下に実行前から symlink があると、npx が
  # リンクを辿ってリポジトリ外へ書き込んでも前後比較のどの検査にも現れない
  # （ルート 3 要素の lstat 検証は経路自身しか見ず、配下は守れない）。1 件でも
  # あれば npx 未実行のまま fail-closed で中止する。この拒否により、後段の既存
  # ignored バックアップ・復元は対象を regular file のみと仮定できる。走査自体の
  # 失敗も「symlink なしと確認できない」であって「なし」ではないため中止する。
  # レイアウト自体の異常で人間の確認を要するため、skip（continue）ではなく
  # ループ全体を exit 1 で停止する（事前 lstat 検査と同じ扱い。npx 未実行のため残置なし）。
  if ! SCOPE_PREEXISTING_SYMLINKS="$(find ".agents/skills/${SKILL_NAME}" -type l)"; then
    echo "エラー: 許可先配下の symlink 走査（find）に失敗しました。リポジトリ外への書き込み経路が無いことを確認できないため中止します（fail-closed）。" >&2
    exit 1
  fi
  if [[ -n "${SCOPE_PREEXISTING_SYMLINKS}" ]]; then
    echo "エラー: 許可先（.agents/skills/${SKILL_NAME}）配下に既存のシンボリックリンクがあります。npx がリンクを辿ってリポジトリ外へ書き込んでも、配下を署名から除外している前後比較では検出できないため中止します（fail-closed）。以下を実体ファイルへ置き換えるか削除してから再実行してください:" >&2
    printf '%s\n' "${SCOPE_PREEXISTING_SYMLINKS}" >&2
    exit 1
  fi
  if ! find ".agents/skills/${SKILL_NAME}" -print0 > "${SCOPE_INVENTORY_FILE}"; then
    echo "エラー: npx 実行前の許可先インベントリ取得（find）に失敗しました。リバート時に既存 ignored ファイルを誤削除しないための基準を確保できないため中止します。" >&2
    exit 1
  fi
  # 既存 ignored ファイル（実行前時点）の列挙とバックアップ。実行前インベントリは
  # パス一覧のみで内容を持たないため、npx が既存 ignored を上書き・削除しても
  # そのままでは復元も検出もできない（許可先配下は署名から除外され、シグネチャ
  # 比較にも現れない）。内容・mode を相対パス構造ごと退避し（cp -p）、実行後に
  # restore_preexisting_ignored が比較・復元する。列挙・バックアップの失敗は
  # 復元素材を確保できないため npx 未実行のまま中止する（fail-closed）。
  if ! git ls-files -z --others --ignored --exclude-standard -- ".agents/skills/${SKILL_NAME}/" > "${IGNORED_BASELINE_FILE}"; then
    echo "エラー: npx 実行前の既存 ignored ファイル列挙（git ls-files）に失敗しました。上書き・削除からの復元素材を確保できないため中止します（fail-closed）。" >&2
    exit 1
  fi
  while IFS= read -r -d '' IGNORED_PATH; do
    if ! mkdir -p "${IGNORED_BACKUP_DIR}/${IGNORED_PATH%/*}" \
      || ! cp -p -- "${IGNORED_PATH}" "${IGNORED_BACKUP_DIR}/${IGNORED_PATH}"; then
      echo "エラー: 既存 ignored ファイルのバックアップに失敗しました: ${IGNORED_PATH} — 上書き・削除からの復元素材を確保できないため中止します（fail-closed）。" >&2
      exit 1
    fi
  done < "${IGNORED_BASELINE_FILE}"
fi

if ! git -c status.renames=false status --porcelain -z -uall > "${SNAP_BEFORE}"; then
  echo "エラー: npx 実行前の git status 取得に失敗しました。スコープ外書き込みの検出ができないため中止します。" >&2
  exit 1
fi

filter_out_of_scope "${SNAP_BEFORE}" "${SNAP_FILTERED_BEFORE}"

# .agents / .agents/skills の omit（自身のメタデータ不記録）は「npx 実行前に存在
# したか」で決める。既存なら通常どおり署名対象にして chmod・ディレクトリ→symlink
# 置換を検出し（PR #412 P1 指摘）、不存在だった場合のみ omit して初回インストール
# での正当な親ディレクトリ新規作成を誤検知にしない。判定は npx 実行前のここで
# 一度だけ行い、前後の両シグネチャで同じ除外集合を使う（実行後に再判定すると
# 初回作成が前後不一致になる）。-e は壊れた symlink で偽になるため -L も併せて
# 見る（symlink 自体は「存在」として署名対象に含める）。
if [[ ! -e ".agents" && ! -L ".agents" ]]; then
  REPO_SIG_OMITS+=("omit:.agents")
fi
if [[ ! -e ".agents/skills" && ! -L ".agents/skills" ]]; then
  REPO_SIG_OMITS+=("omit:.agents/skills")
fi
# 許可先ディレクトリ自身も同じ基準で確定する: 既存なら prune-under（既定値）のまま
# 要素自身を署名し、npx 実行中のディレクトリ→symlink 置換（TOCTOU）を前後不一致で
# 検出する。実行前に不存在（初回インストール）の場合のみ prune へ切り替え、npx に
# よる正当な新規作成を誤検知にしない（このケースの symlink 化は実行後の
# verify_scope_path_after_run が拒否する）。
if [[ ! -e ".agents/skills/${SKILL_NAME}" && ! -L ".agents/skills/${SKILL_NAME}" ]]; then
  SKILL_DIR_SIG_SPEC="prune:.agents/skills/${SKILL_NAME}"
fi

# リポジトリ全体の状態シグネチャは「その時点のディスク内容・モード」を読むため、
# 必ず npx を呼ぶ前にここで確定させる。npx 実行後に取得すると「変更前」のつもりが
# 実質「変更後」と一致してしまい、実行前から M・?? だったスコープ外ファイルの
# 内容・モードだけの上書きを見逃す。取得失敗時はスコープ外書き込みを検出できない
# ため fail-closed で中止する（この時点では npx 未実行のため残置なし）。
if ! REPO_STATE_BEFORE="$(repo_state_signature)"; then
  echo "エラー: npx 実行前の状態シグネチャ取得に失敗しました。スコープ外書き込みの検出ができないため中止します。" >&2
  exit 1
fi

# CLI に computedHash を更新させる。固定版が解決できない場合（該当版の不存在・
# レジストリ障害）は npx が非ゼロ終了する。その場合は当該スキルを中止（skip）し、
# 固定版を外した再実行はしない（fail-closed。暗黙の最新版フォールバックはしない）。
# ここでの fail-closed は「他スキルへの処理を止めない」という Step 1/3 の他の skip
# 分岐と同じ意味であり、「script 全体を停止する」という意味ではない
# （`scripts/skills-lock-update.sh` 単体実行時の set -euo pipefail による停止とは別軸。
# 詳細は下記「skills CLI のバージョン固定と更新手順」節の fail-closed 記述を参照）。
# --agent universal は書き込み先を union ストア（.agents/skills/<name>/）+
# skills-lock.json のみに限定する一次防御。個別 agent 指定（claude-code 等）は
# .agents/skills を経由せず .claude/skills/ 等へ直接コピーしレイアウトを変えるため
# 使わない（実測: スクラッチリポジトリで --agent universal のみ .agents/skills/
# 以外へ書き込みが無いことを確認済み）。npx の出力を tee で NPX_OUTPUT_FILE へも
# 保存し、後段の「Invalid agents」no-op 検出に使う。PIPESTATUS は pipeline 直後の
# 「次のコマンド実行前」にしか正しい値を保持しない。変数代入も1個のコマンドと
# 数えられるため、`NPX_STATUS=...; TEE_STATUS=...` のように2つの代入に分けると、
# 1つ目の代入自体がその時点の PIPESTATUS を（要素数1・値0の配列へ）上書きして
# しまい、2つ目の代入が参照する PIPESTATUS[1] は `set -u` 下で unbound variable
# エラーになる（実測: bash 5.3 で再現）。配列全体を単一の代入
# `arr=("${PIPESTATUS[@]}")` でスナップショットし、添字アクセスはそのコピーに対して
# 行う。npx（[0]）・tee（[1]）両方を読む理由: tee がディスク容量不足等で非ゼロ終了
# すると NPX_OUTPUT_FILE が空・不完全なまま残り得るが、npx 自体は成功（exit 0）
# し得るため、tee 側の失敗は npx の終了コードだけを見る分岐からは検出できない
# （Issue #410 CI 失敗指摘）。TEE_STATUS が非ゼロなら、その不完全な NPX_OUTPUT_FILE
# を前提にした「Invalid agents」no-op 判定を信頼せず、NPX_STATUS を強制的に失敗へ
# 倒して以降の失敗経路（事後スコープ外検査・スコープ内リバート・skip）へ合流させる。
npx --yes "skills@${SKILLS_CLI_VERSION}" add "${SOURCE}" --skill "${SKILL_NAME}" --agent universal --yes 2>&1 | tee "${NPX_OUTPUT_FILE}"
PIPE_EXIT_SNAPSHOT=("${PIPESTATUS[@]}")
NPX_STATUS="${PIPE_EXIT_SNAPSHOT[0]}"
TEE_STATUS="${PIPE_EXIT_SNAPSHOT[1]}"

if [[ "${TEE_STATUS}" -ne 0 ]]; then
  echo "警告: npx の出力を ${NPX_OUTPUT_FILE} へ保存する tee が失敗しました（終了コード ${TEE_STATUS}。ディスク容量不足等）。出力ファイルが不完全なため、npx 自体の終了コード（${NPX_STATUS}）に関わらず失敗として扱います。"
  NPX_STATUS=1
fi

# 許可先経路の実行後再検証（PR #412 P0 指摘: 実行中の symlink 置換 / 初回
# インストールでの symlink 作成）。事後シグネチャ取得より前にここで一度だけ判定し、
# 検出時は共通失敗経路へ合流させる（revert_in_scope は SCOPE_PATH_COMPROMISED を
# 見て許可先配下への削除系操作を行わず、リポジトリ外書き込みの可能性の手動確認を
# 案内する）。
if ! verify_scope_path_after_run; then
  SCOPE_PATH_COMPROMISED=1
  NPX_STATUS=1
fi

# skills-lock.json の実行後 再検証（PR #412 codex P0 指摘: 実行中の symlink 置換）。
# 検出時は共通失敗経路へ合流させる（revert_in_scope は LOCK_FILE_COMPROMISED を見て
# symlink を rm で除去してから checkout し、リンク先への書き込みを避ける）。
if ! verify_lock_file_after_run; then
  LOCK_FILE_COMPROMISED=1
  NPX_STATUS=1
fi

# 許可先配下の実行後 symlink 走査（PR #412 Bugbot High 指摘: TOCTOU）。事前走査は
# npx 実行前の 0 件しか保証せず、npx が実行中に配下へ作った外向き symlink とそれ
# 経由の書き込みは、配下を署名から除外している前後比較にも、経路 3 要素しか見ない
# verify_scope_path_after_run にも現れない。事後に見つかる symlink はすべて npx
# 実行中の作成物であり、これを残したまま checkout・clean・ignored 削除・復元を
# 走らせるとリンク先（リポジトリ外を含む）への削除・書き込みになり得るため、
# 1 件でも検出したら経路妥協（SCOPE_PATH_COMPROMISED）と同じ保全経路へ倒す。
# 走査自体の失敗も「symlink なしと確認できない」であって「なし」ではないため
# 同様に倒す（fail-closed）。
if [[ "${SCOPE_PATH_COMPROMISED}" -eq 0 && -d ".agents/skills/${SKILL_NAME}" ]]; then
  if ! SCOPE_POST_SYMLINKS="$(find ".agents/skills/${SKILL_NAME}" -type l)"; then
    echo "エラー: npx 実行後の許可先配下 symlink 走査（find）に失敗しました。リンク先（リポジトリ外を含む）への書き込み経路が無いことを確認できないため、許可先配下への自動復旧を行わず停止します（fail-closed）。" >&2
    SCOPE_PATH_COMPROMISED=1
    NPX_STATUS=1
  elif [[ -n "${SCOPE_POST_SYMLINKS}" ]]; then
    echo "エラー: npx が実行中に許可先（.agents/skills/${SKILL_NAME}）配下へシンボリックリンクを作成しました。リンク先（リポジトリ外を含む）へ書き込んだ可能性があり、symlink 越しの走査を避けるため許可先配下への自動復旧は行いません。リンク先の内容とリポジトリ外への書き込み有無を手動確認してください（fail-closed）:" >&2
    printf '%s\n' "${SCOPE_POST_SYMLINKS}" >&2
    SCOPE_PATH_COMPROMISED=1
    NPX_STATUS=1
  fi
fi

# CLI がバージョン更新等で --agent universal を認識できなくなった場合、
# エラー表示のうえ exit 0 の no-op になる（実測: skills@1.5.22 で確認済み）。
# 検知しないまま先へ進むと「同期したつもりで何も更新されていない」まま完了扱いに
# なるため、npx 自体の終了コードとは別に明示的な失敗として扱う（上の TEE_STATUS
# チェックで NPX_STATUS が強制失敗化されていればここは通らない）。
# この分岐で直接 exit すると実行後スナップショット・シグネチャ比較・スコープ内
# リバートをすべて迂回する（PR #412 P1 指摘）。「Invalid agents」は CLI の出力文言に
# 過ぎず、将来版が部分書き込みの後に同じ文言を出しても no-op とは限らないため、
# NPX_STATUS=1 を設定して下の共通失敗経路へ合流させ、「成功・失敗いずれの経路でも
# 事後検査へ必ず到達」の契約を守る。universal 無効は以降の全スキルでも再現し
# 続行に意味がないため、共通失敗経路の末尾で continue ではなく exit 1 で終端する
# （NPX_NOOP_DETECTED がその分岐と汎用メッセージの抑止を担う）。
NPX_NOOP_DETECTED=0
if [[ "${NPX_STATUS}" -eq 0 && "${SCOPE_PATH_COMPROMISED}" -eq 0 ]] && grep -q "Invalid agents" "${NPX_OUTPUT_FILE}"; then
  echo "エラー: skills CLI が --agent universal を認識せず、何も実行していません（exit 0 の no-op）。SKILLS_CLI_VERSION 更新時は「skills CLI のバージョン固定と更新手順」節に従い universal の有効性を再確認してください。" >&2
  NPX_NOOP_DETECTED=1
  NPX_STATUS=1
fi

if [[ "${NPX_STATUS}" -ne 0 ]]; then
  if [[ "${NPX_NOOP_DETECTED}" -eq 0 && "${SCOPE_PATH_COMPROMISED}" -eq 0 && "${LOCK_FILE_COMPROMISED}" -eq 0 ]]; then
    echo "警告: skills@${SKILLS_CLI_VERSION} の実行が失敗しました（該当版の不存在・レジストリ障害・ダウンロード中断等、原因は問わない）。"
  fi
  # 失敗が部分書き込み後に発生した場合、skills-lock.json / .agents/skills/${SKILL_NAME}/ に
  # 加えてスコープ外（他エージェントツリー等）にも残置され得るため、失敗経路でも
  # 実行後スナップショットを取ってスコープ外残留を検査する（下の成功経路と同一ロジック）。
  git -c status.renames=false status --porcelain -z -uall > "${SNAP_AFTER}" || true
  filter_out_of_scope "${SNAP_AFTER}" "${SNAP_FILTERED_AFTER}"
  # 実行後シグネチャの取得失敗は「変化なしと確認できない」であって「変化なし」では
  # ないため、比較不能な sentinel を入れて必ず不一致（= 残置疑いの報告）へ倒す。
  if ! REPO_STATE_AFTER="$(repo_state_signature)"; then
    echo "エラー: npx 実行後の状態シグネチャ取得に失敗しました。変化なしと確認できないため、スコープ外残置ありとして扱います（fail-closed）。" >&2
    REPO_STATE_AFTER="(signature-error)"
  fi
  if ! cmp -s "${SNAP_FILTERED_BEFORE}" "${SNAP_FILTERED_AFTER}" \
    || [[ "${REPO_STATE_BEFORE}" != "${REPO_STATE_AFTER}" ]]; then
    echo "エラー: 失敗した npx 実行がスコープ外へも書き込んだ可能性があります。以下を確認してください（削除はしていません）:" >&2
    while IFS= read -r -d '' rec; do printf '  %s\n' "${rec}" >&2; done < "${SNAP_FILTERED_AFTER}"
    echo "  （ディレクトリの chmod 等、git status に現れない変化は上記一覧に載りません。状態シグネチャの不一致として検出されています）" >&2
  fi
  # 次スキルの `git add skills-lock.json`（Step 7）が
  # この残置変更を承認済みの変更と一緒に stage してしまわないよう、Step 6 の却下時と
  # 同じ手順で当該スキル分のみを即座にリバートしてから skip する。
  if [[ -f scripts/check-skill-local-patches.sh ]]; then
    # checker を持つリポジトリでは、同期前 check(check mode)が契約範囲(durable patch 含む)を
    # 変更・stage している可能性があり、index からの worktree 復元しか行わない
    # revert_in_scope だけでは同期開始前へ戻らない。契約パス限定の restore_contract_scope で
    # index も同期開始前へ戻す(前スキルの承認済み積上げは PRE_SYNC_TREE に含まれるため保持。
    # 許可先経路・skills-lock.json の妥協検出時は関数内で index のみの復元へ切り替わる)。
    # 呼び出しは revert_in_scope より「前」でなければならない: revert_in_scope の
    # git clean -fd を先に走らせると、restore_contract_scope が退避するはずの契約範囲内の
    # 未追跡ファイル(checker が移動・新規作成した唯一のコピーであり得る)が削除される。
    # 復元後の revert_in_scope は契約パスの checkout / clean が実質 no-op になり、ignored
    # ファイルの選別削除・既存 ignored の復元・妥協検出時の保全案内だけが働く
    restore_contract_scope
  fi
  revert_in_scope
  rm -f "${SNAP_BEFORE}" "${SNAP_AFTER}" "${SNAP_FILTERED_BEFORE}" "${SNAP_FILTERED_AFTER}" "${NPX_OUTPUT_FILE}" "${SCOPE_INVENTORY_FILE}" "${IGNORED_BASELINE_FILE}"
  if [[ "${IGNORED_BACKUP_KEEP}" -eq 0 ]]; then rm -rf "${IGNORED_BACKUP_DIR}"; fi
  # universal 無効の no-op は以降の全スキルでも再現するため、skip（continue）ではなく
  # ループ全体を停止する（事後検査・リバートは上で完了済み）。許可先経路の
  # symlink 化（SCOPE_PATH_COMPROMISED）もレイアウト自体の異常で人間の確認を要する
  # ため、同様にループ全体を停止する（事前 lstat 検査の exit 1 と同じ扱い）。
  # 既存 ignored の復元失敗（IGNORED_RESTORE_FAILED）も手動復旧を要するため停止する
  # （バックアップ dir は revert_in_scope が保全済み）。skills-lock.json の置換
  # （LOCK_FILE_COMPROMISED）もリンク先への書き込み有無の手動確認を要するため停止する。
  if [[ "${NPX_NOOP_DETECTED}" -eq 1 || "${SCOPE_PATH_COMPROMISED}" -eq 1 || "${LOCK_FILE_COMPROMISED}" -eq 1 || "${IGNORED_RESTORE_FAILED}" -eq 1 ]]; then
    exit 1
  fi
  echo "警告: 固定版を外した再実行はせず、当該スキルの変更をリバートして skip します。"
  continue
fi

# npx 実行後のスナップショット。前後のスコープ外差分を見るため、取得条件は
# SNAP_BEFORE と完全に揃える。取得失敗時にその場で exit すると、npx が生成済みの
# スコープ内変更を残置したままスコープ外シグネチャ検査も行われない（PR #412 P1
# 指摘）。状態シグネチャは git 非依存（python3 の走査）で取得できるため、可能な
# 範囲で事後検査（スコープ外残置疑いの報告）を行い、スコープ内をリバートしてから
# fail-closed で exit 1 する（ループ停止。以降のスキルも同じ git 障害に当たるため
# skip 継続に意味がない）。
if ! git -c status.renames=false status --porcelain -z -uall > "${SNAP_AFTER}"; then
  echo "エラー: npx 実行後の git status 取得に失敗しました。porcelain レコードでの前後比較ができません。" >&2
  if REPO_STATE_AFTER="$(repo_state_signature)"; then
    if [[ "${REPO_STATE_BEFORE}" != "${REPO_STATE_AFTER}" ]]; then
      echo "エラー: スコープ外（skills-lock.json / .agents/skills/${SKILL_NAME}/ 以外）へも書き込まれた可能性があります（状態シグネチャ不一致）。git status / git diff で手動確認してください（削除はしていません）。" >&2
    fi
  else
    # シグネチャも取れない場合は「変化なし」と確認できないため、残置の可能性ありと
    # して案内する（fail-closed。green 側へ倒さない）。
    echo "エラー: 実行後の状態シグネチャ取得にも失敗しました。スコープ外残置の可能性を排除できません。git status / git diff で手動確認してください（fail-closed）。" >&2
  fi
  if [[ -f scripts/check-skill-local-patches.sh ]]; then
    # 同期前 check の staged 契約変更を残さない(fail-closed 契約)。git clean -fd による
    # 未追跡削除より先に退避を効かせるため revert_in_scope より前に呼ぶ(NPX_STATUS 分岐と同じ)
    restore_contract_scope
  fi
  revert_in_scope
  echo "スコープ内（skills-lock.json / .agents/skills/${SKILL_NAME}/）の変更はリバートしました。" >&2
  rm -f "${SNAP_BEFORE}" "${SNAP_AFTER}" "${SNAP_FILTERED_BEFORE}" "${SNAP_FILTERED_AFTER}" "${NPX_OUTPUT_FILE}" "${SCOPE_INVENTORY_FILE}" "${IGNORED_BASELINE_FILE}"
  if [[ "${IGNORED_BACKUP_KEEP}" -eq 0 ]]; then rm -rf "${IGNORED_BACKUP_DIR}"; fi
  exit 1
fi

filter_out_of_scope "${SNAP_AFTER}" "${SNAP_FILTERED_AFTER}"

# 実行後シグネチャの取得失敗は「変化なしと確認できない」であって「変化なし」では
# ないため、比較不能な sentinel を入れて必ず不一致（= 検出・リバート・停止）へ倒す。
if ! REPO_STATE_AFTER="$(repo_state_signature)"; then
  echo "エラー: npx 実行後の状態シグネチャ取得に失敗しました。変化なしと確認できないため、スコープ外書き込みありとして扱います（fail-closed）。" >&2
  REPO_STATE_AFTER="(signature-error)"
fi

# スコープ外の状態が前後で一致しなければ、--agent universal が抑止しているはずの
# スコープ外書き込みが発生したことになる（一次防御を突破した場合の多層防御）。
# 判定は 2 軸: (1) porcelain レコード（SNAP_FILTERED_*）と (2) リポジトリ全体の
# 状態シグネチャ（REPO_STATE_*、repo_state_signature の出力）。実行前から M・??
# だったスコープ外ファイルの内容・モードだけの上書きや、ディレクトリの chmod・
# ディレクトリ向け symlink の変更・.gitignore 対象ファイルの上書きは porcelain
# レコードに現れないため、シグネチャ側の不一致だけがそれを検出できる。
# 他の skip 分岐と異なり、ここは
# continue ではなく exit 1 でループ全体を停止する。スコープ外の汚染は自動リバート
# されないため、続行すると最終報告が「clean」でも実際は dirty 残留となり、この
# issue が問題視している状態そのものになる。この時点までに承認・stage 済みの他
# スキル分は index に残ったままになるため、停止後は `git status` で確認し、必要な
# 分だけ `git commit` するか `git reset` で戻すかを判断すること。
if ! cmp -s "${SNAP_FILTERED_BEFORE}" "${SNAP_FILTERED_AFTER}" \
  || [[ "${REPO_STATE_BEFORE}" != "${REPO_STATE_AFTER}" ]]; then
  echo "エラー: npx skills add がスコープ外（skills-lock.json / .agents/skills/${SKILL_NAME}/ 以外）へ書き込みました。" >&2
  echo "==> 実行前のスコープ外状態:" >&2
  while IFS= read -r -d '' rec; do printf '  %s\n' "${rec}" >&2; done < "${SNAP_FILTERED_BEFORE}"
  echo "==> 実行後のスコープ外状態:" >&2
  while IFS= read -r -d '' rec; do printf '  %s\n' "${rec}" >&2; done < "${SNAP_FILTERED_AFTER}"
  echo "（ディレクトリの chmod 等、git status に現れない変化は上記一覧に載りません。その場合は状態シグネチャの不一致として検出されています）" >&2
  echo "スコープ内（skills-lock.json / .agents/skills/${SKILL_NAME}/）の変更はこれからリバートします。" >&2
  echo "スコープ外は既存の WIP を巻き込む恐れがあるため自動リバートしません。" >&2
  echo "上記パスの内容を git status / git diff で確認し、必要なら手動で" >&2
  echo "  git checkout -- <path>   （変更前が clean だった追跡ファイルの場合）" >&2
  echo "  git clean -fd <path>     （変更前に存在しなかった未追跡ファイルの場合）" >&2
  echo "を実行してください。" >&2
  if [[ -f scripts/check-skill-local-patches.sh ]]; then
    # 同期前 check の staged 契約変更を残さない(fail-closed 契約)。git clean -fd による
    # 未追跡削除より先に退避を効かせるため revert_in_scope より前に呼ぶ(NPX_STATUS 分岐と同じ)
    restore_contract_scope
  fi
  revert_in_scope
  rm -f "${SNAP_BEFORE}" "${SNAP_AFTER}" "${SNAP_FILTERED_BEFORE}" "${SNAP_FILTERED_AFTER}" "${NPX_OUTPUT_FILE}" "${SCOPE_INVENTORY_FILE}" "${IGNORED_BASELINE_FILE}"
  if [[ "${IGNORED_BACKUP_KEEP}" -eq 0 ]]; then rm -rf "${IGNORED_BACKUP_DIR}"; fi
  exit 1
fi

# 成功経路でも既存 ignored ファイル（.DS_Store 等）の変更・削除を実行前バックアップ
# との比較で検査する。許可先配下は署名から除外されるためシグネチャ比較には現れず、
# この比較だけが検出手段になる。変化があればバックアップから復元して警告し、同期
# 自体は継続する（ignored ファイルは同期対象外で、復元すれば成果物に影響しないため）。
# 復元に失敗した場合のみバックアップ dir を保全し、手動復旧を要するためループ全体を
# exit 1 で停止する（fail-closed）。
if ! restore_preexisting_ignored; then
  IGNORED_BACKUP_KEEP=1
  echo "エラー: 実行前から存在した ignored ファイルの復元に失敗しました。バックアップは ${IGNORED_BACKUP_DIR} に相対パス構造で残っています。手動で復旧してください。" >&2
  if [[ -f scripts/check-skill-local-patches.sh ]]; then
    # 失敗終端では同期前 check の staged 契約変更も残さない(fail-closed 契約。
    # npx の同期結果ごと同期開始前へ戻し、部分状態のまま Step 7 の git add へ進む経路を断つ)
    restore_contract_scope
  fi
  rm -f "${SNAP_BEFORE}" "${SNAP_AFTER}" "${SNAP_FILTERED_BEFORE}" "${SNAP_FILTERED_AFTER}" "${NPX_OUTPUT_FILE}" "${SCOPE_INVENTORY_FILE}" "${IGNORED_BASELINE_FILE}"
  exit 1
fi

rm -f "${SNAP_BEFORE}" "${SNAP_AFTER}" "${SNAP_FILTERED_BEFORE}" "${SNAP_FILTERED_AFTER}" "${NPX_OUTPUT_FILE}" "${SCOPE_INVENTORY_FILE}" "${IGNORED_BASELINE_FILE}"
if [[ "${IGNORED_BACKUP_KEEP}" -eq 0 ]]; then rm -rf "${IGNORED_BACKUP_DIR}"; fi
```

`npx skills add` は以下を行う:

- upstream の最新スキルをダウンロード
- インストール先（`.agents/skills/<name>/`）を最新化
- `skills-lock.json` の `computedHash` を CLI 算出値で更新

**重要な副作用**: `npx skills add` はインストール済みファイルを最新の upstream 版で上書きする。upstream との同期が目的のため、これは意図した動作である。上記の per-skill clean ガードは `git status --porcelain` を使い、ステージ済み・未ステージ・**未追跡ファイルも含めて**検出する。WIP がある場合は npx 実行前に skip するため、未コミット編集の消失は防止される。

**注意**: clean ガードを通過したスキルについては、npx が即座に `skills-lock.json` と `.agents/skills/<name>/` を書き換える。ユーザー承認（Step 6）の前に変更が確定するため、承認しない場合は Step 6 の案内に従いリバートが必要。

**書き込みスコープの制限（`--agent universal`）**: `npx skills add` はエージェント/パス制限なしで実行すると、検出した各エージェント向けツリー（`.claude/skills/` 等）へも書き込み得る（Issue #410）。しかし clean ガード・Step 5 のプレビュー・Step 6 のリバート・Step 7 の `git add` はいずれも `skills-lock.json` と `.agents/skills/<name>/` のみを対象としており、スコープ外への書き込みが発生すると WIP 上書き・レビュー迂回・「clean 報告後の dirty 残留」が起き得る。`--agent universal` により書き込みは `.agents/skills/<name>/` と `skills-lock.json` に限定され、他エージェントツリー（`.claude/skills/` 等）へは書かない（実測: スクラッチリポジトリで確認済み）。万一 CLI のバージョン更新等でこの前提が崩れて書き込まれた場合も、npx 実行前後のスナップショット比較で fail-closed に停止する（多層防御）。

#### Step 5: 当該スキルの差分を表示する

`git diff` は未追跡ファイルを表示しない。Step 4 の clean ガード（`git status --porcelain`）により
`npx skills add` 実行前の当該ディレクトリは必ず clean であるため、**upstream 側でファイルが増えた
ケースでは、その新規ファイルは例外なく未追跡になる**。tracked diff だけを見せて Step 6 の承認判断へ
進むと、その内容を一切確認しないまま承認できてしまうため、tracked 差分と未追跡ファイルの内容を分けて
両方提示する。

```bash
# 当該スキルにスコープした tracked 差分を表示する
git diff -- skills-lock.json ".agents/skills/${SKILL_NAME}/"

# 未追跡ファイルを列挙し、内容を diff 形式で表示する。
# この集合は Step 7（承認・git add）が新規に取り込む集合、Step 6（拒否・git clean -fd）が
# 削除する集合と同一（.gitignore 対象を除く非追跡ファイル）であり、
# 「プレビュー = 承認 = 拒否」の 3 経路が同じ対象を扱うことを保証する。
# git ls-files の既定出力は改行区切りのため、ファイル名自体に改行を含む未追跡ファイルが
# あると 1 パスが複数の存在しないパスへ分割される。分割後の各 git diff は失敗し || true で
# 握り潰される一方、Step 7 の git add は実ファイルをそのまま取り込むため、内容を表示しない
# まま承認できてしまう（-z / NUL 区切りで防ぐ）。
UNTRACKED_COUNT=0
# git ls-files をプロセス置換へ直接つなぐと、set -euo pipefail はその終了コードを
# 検査しない。失敗（破損 index・権限エラー等）しても while は0回実行され「なし」と
# 誤表示するため、一時ファイルへ書き出し if ! ... で明示的に終了コードを検査する
# （scripts/skills-lock-update.sh と同一のガード）。
UNTRACKED_LIST_FILE="$(mktemp)"
trap 'rm -f "${UNTRACKED_LIST_FILE}"' EXIT
if ! git ls-files -z --others --exclude-standard -- ".agents/skills/${SKILL_NAME}/" > "${UNTRACKED_LIST_FILE}"; then
  echo "エラー: git ls-files が失敗し、未追跡ファイルの一覧化を確認できません。中止します。" >&2
  exit 1
fi
while IFS= read -r -d '' f; do
  if [[ "${UNTRACKED_COUNT}" -eq 0 ]]; then
    echo "==> 新規（未追跡）ファイル — 承認時に git add で取り込まれる集合:"
  fi
  UNTRACKED_COUNT=$((UNTRACKED_COUNT + 1))
  # 空ファイルは git diff --no-index が差分を出力しないため、diff の見出しだけでは
  # どのファイルが追加されるか分からない。先に printf でファイル名自体を明示してから
  # 内容の diff を表示する（0 byte のファイルでも名前は必ず見える）。
  printf '%s\n' "--- ${f} ---"
  # バイナリファイルは git diff --no-index が "Binary files ... differ" としか出力せず、
  # 追加される中身を一切提示しない。numstat の追加/削除行数が両方 "-" になる出力で
  # バイナリ判定し、内容の代わりに種別・サイズ・ハッシュを明示することで、中身を
  # 確認できないまま承認（Step 7 の git add）だけが通ってしまう非対称を防ぐ。
  NUMSTAT="$(git diff --no-index --numstat -- /dev/null "${f}" 2>/dev/null || true)"
  if [[ "${NUMSTAT}" == -$'\t'-$'\t'* ]]; then
    FILE_SIZE="$(wc -c < "${f}" | tr -d '[:space:]')"
    if command -v file >/dev/null 2>&1; then
      FILE_TYPE="$(file -b -- "${f}" 2>/dev/null || echo "unknown")"
    else
      FILE_TYPE="file コマンド未検出"
    fi
    FILE_HASH="$(git hash-object -- "${f}")"
    # object format は repository 設定依存（既定 sha1 / 拡張 sha256）で出力桁数が変わる
    # （sha1: 40 桁 / sha256: 64 桁）。固定表記 "git-blob-sha1" だと sha256 リポジトリで
    # 実際のアルゴリズムと表示が食い違うため、表記自体をアルゴリズム非依存にする。
    OBJECT_FORMAT="$(git rev-parse --show-object-format 2>/dev/null || echo unknown)"
    printf '%s\n' "==> バイナリファイル（内容は表示されません）: type=${FILE_TYPE} size=${FILE_SIZE}bytes git-blob-hash(${OBJECT_FORMAT})=${FILE_HASH}"
  else
    # --no-index は index を変更しない（git add -N は使わない。Step 6 の拒否経路が
    # index からの git checkout -- で承認済み他スキルの hash を復元する設計に依存しており、
    # intent-to-add エントリの混入はその復元設計と干渉するため）。
    # 差分ありのとき exit 1 を返す仕様のため、表示専用のこの呼び出しに限り || true で
    # set -e の中断を避ける。
    git diff --no-index -- /dev/null "${f}" || true
  fi
done < "${UNTRACKED_LIST_FILE}"
if [[ "${UNTRACKED_COUNT}" -eq 0 ]]; then
  echo "==> 新規（未追跡）ファイル: なし"
fi
```

変更点を確認し、更新された `computedHash` の内容と未追跡ファイルの中身を合わせてユーザーに提示する。

**checker（`scripts/check-skill-local-patches.sh`）を持つリポジトリの場合**、この時点の diff は **raw な upstream 差分**であり、local patch はまだ再適用されていない(Step 5.5 の再適用後の最終 diff と混同しないこと)。

#### Step 5.5: local patch を再適用して最終検証する（checker を持つリポジトリのみ）

`npx skills add` の上書きで消費側リポジトリの local patch が worktree から消えているため、**stage より前に**再適用と最終検証を行う。checker（apply）は当該スキルディレクトリのほか durable patch（`scripts/local-patches/`）も変更・stage し得るため、(1) 却下・失敗時の厳密復元用に apply 前の index を snapshot し、(2) apply 後は変更集合が契約範囲（`skills-lock.json`・当該スキル・`scripts/local-patches/`）に収まることを機械検証する。すべて成功した場合のみ Step 6 以降へ進める。

```bash
if [[ -f scripts/check-skill-local-patches.sh ]]; then
  # Step 4 と同一 shell セッションの前提を機械検証する。セッションが切れて失われた場合は、
  # outside_state / verify_outside_and_checker / restore_contract_scope(いずれも Step 4 で
  # 定義した関数)を Step 4 のとおり再定義し、
  # PRE_OUTSIDE / CHECKER_APPROVED_HASH には Step 4 が表示・承認した値を設定してから進む。
  # 値が不明なまま進んではならない(fail-closed で中止し、Step 6 の却下手順で戻す)
  : "${PRE_OUTSIDE:?Step 4 で表示された基準 digest を設定してから実行する}"
  : "${CHECKER_APPROVED_HASH:?ユーザー承認済みの checker blob hash を設定してから実行する}"

  # 却下・失敗時の復元は Step 4 で「checker 初回実行より前」に取得・表示済みの
  # PRE_SYNC_TREE(同期開始前の index snapshot)を使う。ここで snapshot を取り直しては
  # ならない — npx 後の index を基準にすると、復元先が「raw upstream + 同期前 check の
  # stage」になり、「同期前へ戻す」という契約に反する(local patch が外れた状態が残る)
  : "${PRE_SYNC_TREE:?Step 4 で表示された同期開始前 snapshot を設定してから実行する}"

  # 範囲外 digest の基準(PRE_OUTSIDE)・outside_state・verify_outside_and_checker は
  # Step 4 で checker の初回実行より前に定義・取得済みのものを同一 shell セッションで
  # そのまま使う(ここで取り直すと、同期前 check 以降の範囲外変更が基準へ取り込まれてしまう)

  # 実行対象は worktree の checker ではなく、承認済み blob(CHECKER_APPROVED_HASH)を
  # 取り出した一時ファイル。shell セッションを跨いで CHECKER_EXEC が失われていても、
  # 承認済み hash から決定的に再作成できる(worktree の checker 差し替えの影響を受けない)。
  # 取り出しは Step 4 と同じ fail-closed: cat-file の失敗を成功扱いすると空の一時ファイル
  # が残り、bash の exit 0 no-op が「検証成功」に化ける。終了コードに加えて、取り出した
  # 内容の hash が承認済み hash と一致することまで確認し、失敗時は npx 上書き後の状態を
  # 残さないよう契約範囲を復元してから停止する
  if [[ -z "${CHECKER_EXEC:-}" || ! -f "${CHECKER_EXEC}" ]]; then
    CHECKER_EXEC="$(mktemp)"
    if ! git cat-file blob "${CHECKER_APPROVED_HASH}" > "${CHECKER_EXEC}" \
      || [[ ! -s "${CHECKER_EXEC}" ]] \
      || [[ "$(git hash-object -- "${CHECKER_EXEC}")" != "${CHECKER_APPROVED_HASH}" ]]; then
      echo "エラー: 承認済み checker blob(${CHECKER_APPROVED_HASH})の取り出しに失敗しました。契約範囲を復元して停止します(fail-closed)。"
      restore_contract_scope
      exit 1
    fi
  fi

  # local patch の再適用(--3way fallback や index 復元により、patch 対象 file や durable patch が
  # stage されることがある)
  apply_rc=0
  bash "${CHECKER_EXEC}" apply || apply_rc=$?
  if ! verify_outside_and_checker; then
    # 範囲外の破壊は verify_outside_and_checker の案内どおり手動復旧として残しつつ、
    # 契約範囲(部分適用された patch・checker 由来の index 変更)は Step 4 で定義済みの
    # restore_contract_scope で自動復元してから終了する(「すべての失敗経路で同期開始前へ
    # 戻す」契約。以下の 3 失敗分岐も同じ。shell セッションが切れて関数が失われている
    # 場合は Step 4 のとおり再定義してから実行する)
    restore_contract_scope
    exit 1
  fi
  if [[ "${apply_rc}" -ne 0 ]]; then
    echo "エラー: local patch の再適用に失敗しました。stage・commit へ進まないでください(fail-closed)。"
    restore_contract_scope
    exit 1
  fi

  # 再適用後の最終検証(worktree / index / durable patch)
  check_rc=0
  bash "${CHECKER_EXEC}" || check_rc=$?
  if ! verify_outside_and_checker; then
    restore_contract_scope
    exit 1
  fi
  if [[ "${check_rc}" -ne 0 ]]; then
    echo "エラー: 再適用後の最終検証に失敗しました。stage・commit へ進まないでください(fail-closed)。"
    restore_contract_scope
    exit 1
  fi
fi
```

いずれかが非 0 の場合は **fail-closed で停止**し、Step 6・7(承認・stage)へ進まない。**local patch が欠けた状態を承認済みとして stage してはならない**。すべての失敗分岐は `restore_contract_scope` が契約範囲(当該スキル・`skills-lock.json`・`scripts/local-patches/`)の index + worktree を同期開始前へ自動復元してから終了する(契約範囲内の未追跡ファイルは削除せず一時ディレクトリへ退避して案内する)。範囲外 path の破壊が報告された場合のみ、`verify_outside_and_checker` の案内に従って範囲外を手動復旧してから原因を調査する。

#### Step 6: ユーザーに当該スキルの承認を求める

差分がある場合のみ、ユーザーに「この更新を適用してよいか」を確認する。Step 5 のプレビュー
（`git ls-files --others --exclude-standard`）・本 Step の拒否（`git clean -fd`）・Step 7 の承認
（`git add`）は同じ集合（追跡ファイルの変更 + 非 ignore の未追跡ファイル）を対象とする。
`.gitignore` 対象はいずれの経路でも扱わない。

**checker を持つリポジトリの場合、承認の対象は Step 5.5 完了後の最終 diff**（upstream 更新 + local patch 再適用を含む commit 候補。durable patch `scripts/local-patches/` を含む）であり、次で確認する。`git diff HEAD` は未追跡ファイルを表示しないため、未追跡分は Step 5 と同じ手順（`git ls-files -z --others --exclude-standard` で列挙し、`git diff --no-index` / バイナリ判定で内容表示）を契約範囲の path に対して再実行し、tracked 差分と合わせて提示する:

```bash
git diff HEAD -- skills-lock.json ".agents/skills/${SKILL_NAME}/" scripts/local-patches/
# 未追跡分は Step 5 のプレビュー処理(一時ファイル + NUL 区切り + 空/バイナリ判定。
# git ls-files の失敗は fail-closed で中止)を、pathspec を
# ".agents/skills/${SKILL_NAME}/" scripts/local-patches/ の 2 つへ広げて再実行し、
# 名前の列挙だけでなく内容(git diff --no-index / バイナリは種別・サイズ・hash)まで提示する
```

**却下された場合**は当該スキルのみ即座にリバートして**次スキルへ continue**する（全体を中止しない）:

```bash
# 当該スキルの変更のみをリバート（追跡ファイル）。
# git checkout -- <file> は HEAD ではなく「index（ステージ）」の内容を作業ツリーへ復元する。
# 前スキルの承認変更は git add で既に index に載っているため、checkout 後の作業ツリーにも
# 引き継がれ、承認済み computedHash が消えることはない。
# 2つのパスを1つの `git checkout --` に渡すとアトミックに扱われ、どちらか一方が
# 「追跡対象なし」（初回具現化・untracked のみの書き込み時）で pathspec エラーになると
# コマンド全体が失敗し、もう一方（skills-lock.json）も復元されない。必ず1コマンド1パスで
# 分離し、一方の失敗が他方の復元を阻害しないようにする。
git checkout -- skills-lock.json
git checkout -- ".agents/skills/${SKILL_NAME}/" 2>/dev/null || true
# npx が新規作成した未追跡ファイルも削除（Step 4 の clean ガードで実行前は clean を保証済み）
# ${SKILL_NAME} は kebab-case 検証済みのため、対象は当該スキルディレクトリ配下に限定される
git clean -fd ".agents/skills/${SKILL_NAME}/"
```

Step 4 の clean ガードにより `npx` 実行前の当該ディレクトリは clean（未追跡含む）であることが保証されているため、`git clean` で削除される未追跡ファイルは `npx` が作成したものに限られる。`git clean` の対象は kebab-case 検証済みの `${SKILL_NAME}` 配下のみに限定されており、リポジトリ全体には影響しない。

このリバートは「次スキルの `npx skills add` 実行前」に行うため、`skills-lock.json` から戻るのは当該スキル分のみである。`git checkout --` は HEAD ではなく index から復元するため、承認済みの他スキルの hash は index にも作業ツリーにも保持されており、影響を受けない。

**checker を持つリポジトリの却下は次を使う**（同期前 check・Step 5.5 の apply が当該スキルや durable patch の file を index へ stage している可能性があるため、`git checkout --`（index → worktree）だけでは戻らない。Step 4 で checker 初回実行より前に保存した `PRE_SYNC_TREE`（同期開始前の index snapshot）を source に、**契約パス限定**で index + worktree を復元する。npx 後に取得した snapshot を使ってはならない — 復元先が raw upstream 状態になり「同期前へ戻す」契約に反する。index 全体の `git read-tree` も使わない — 範囲外 path の index まで書き換わり、範囲外の手動復旧案内と矛盾する）:

```bash
# PRE_SYNC_TREE は Step 4 が表示した同期開始前の snapshot hash。shell を跨いで変数が消えている
# 場合は表示済みの値を代入してから実行する。未設定のまま復元してはならない
: "${PRE_SYNC_TREE:?Step 4 の同期開始前 snapshot hash を設定してから実行する(未設定のまま復元しない)}"

# npx・apply が新規作成した未追跡ファイルは git clean で即削除せず一時ディレクトリへ退避する
# (checker が契約ディレクトリ内へ移動・新規作成したファイルの唯一のコピーであり得るため。
# 退避先を確認し、不要と判断してから手動で削除する)
CONTRACT_UNTRACKED_BACKUP_DIR="$(mktemp -d)"
# skills-lock.json も対象に含める(checker が git rm --cached 等で未追跡化して内容変更した
# 場合、その唯一の内容を退避せずに restore で上書きしないため。通常は tracked で列挙されない)
git ls-files -z --others --exclude-standard -- skills-lock.json ".agents/skills/${SKILL_NAME}/" scripts/local-patches/ \
  | while IFS= read -r -d '' p; do
      mkdir -p "${CONTRACT_UNTRACKED_BACKUP_DIR}/$(dirname "${p}")"
      mv -- "${p}" "${CONTRACT_UNTRACKED_BACKUP_DIR}/${p}"
    done
echo "未追跡ファイルの退避先: ${CONTRACT_UNTRACKED_BACKUP_DIR}"

# 契約パス限定で index + worktree を同期開始前へ復元する。この同期(pre-check・npx・apply)で
# 生じた契約範囲の stage だけが取り除かれ、承認済みの他スキル分・範囲外 path の index は
# 一切変更されない。git restore は no-overlay が既定のため、同期開始前 tree に無い tracked
# ファイルは契約パス内に限り index・worktree から取り除かれる(pathspec は index にも照合
# されるため、snapshot 後に新規作成・stage されたファイルも取り除かれる)。tree にも index
# にも無い pathspec の不一致エラーのみ復元対象なしとして無視できるが、真の失敗と区別が
# 付かないため path ごとに分離したうえで、成功可否は下の復元後検証で判定する
git restore --staged --worktree --source="${PRE_SYNC_TREE}" -- skills-lock.json 2>/dev/null || true
git restore --staged --worktree --source="${PRE_SYNC_TREE}" -- ".agents/skills/${SKILL_NAME}/" 2>/dev/null || true
git restore --staged --worktree --source="${PRE_SYNC_TREE}" -- scripts/local-patches/ 2>/dev/null || true

# 復元後検証(fail-closed): 契約パスの index・worktree が同期開始前(PRE_SYNC_TREE)と一致し、
# 未追跡も残っていない(未追跡は上で退避済み)ことを実測してから完了と扱う。判定基準は
# HEAD ではなく PRE_SYNC_TREE(HEAD 基準の git status --porcelain だと、同期前から存在した
# 正当な staged 変更が復元完了後も非空として現れ、正しい復元を誤報する)
git diff --cached --quiet "${PRE_SYNC_TREE}" -- skills-lock.json ".agents/skills/${SKILL_NAME}/" scripts/local-patches/ \
  && git diff --quiet "${PRE_SYNC_TREE}" -- skills-lock.json ".agents/skills/${SKILL_NAME}/" scripts/local-patches/ \
  && [[ -z "$(git ls-files --others --exclude-standard -- skills-lock.json ".agents/skills/${SKILL_NAME}/" scripts/local-patches/)" ]] \
  && echo "復元完了(検証済み)" \
  || echo "エラー: 復元後検証で契約範囲に差分が残っています。git diff --cached ${PRE_SYNC_TREE} -- <契約パス> / git diff ${PRE_SYNC_TREE} -- <契約パス> / git ls-files --others -- <契約パス> で残留を確認し、git restore --staged --worktree --source=${PRE_SYNC_TREE} -- <path> で手動復旧してください(fail-closed)。"
```

対象は kebab-case 検証済みの当該スキルディレクトリ配下・`skills-lock.json`・durable patch（`scripts/local-patches/`）のみで、承認済みの他スキルの stage にも範囲外 path の index にも影響しない。Step 4・5.5 の**失敗経路**では同じ復元を `restore_contract_scope` が自動実行するため、この手動フェンスはユーザー却下時にのみ使う。

#### Step 7: 承認されたスキルを stage する（ループ内で積み上げる）

```bash
# 当該スキルのファイルのみをステージング（tracked 変更 + Step 5 で提示した未追跡ファイル）
git add skills-lock.json ".agents/skills/${SKILL_NAME}/"

# checker を持つリポジトリは、承認対象(Step 6 の最終 diff)に含めた durable patch の
# 変更も同じ承認単位で stage する
if [[ -f scripts/check-skill-local-patches.sh && -d scripts/local-patches/ ]]; then
  git add scripts/local-patches/
fi
```

`skills-lock.json` は単一 JSON ファイルのため行単位での部分ステージは現実的でない。しかし Step 1 の事前ガードで実行開始時の clean 状態を保証しているため、ファイル全体をステージしても sync 由来の変更のみが含まれ、無関係な編集が混入することはない。このコマンドをループ内で実行することで、複数スキルの全スキル sync でも処理した全スキルが過不足なく stage に積み上がる。**checker を持つリポジトリでは Step 5.5(apply + final check)の成功が stage の前提**であり、`computedHash` は npx が書いた upstream 版の値のまま変更しない(local patch で hash を更新しない)。

### Step 8: コミット提案（ループ後に1回だけ実行）

ループ完了後、stage 済みの全承認スキルをまとめて1コミットにする。

```bash
git commit -m "$(cat <<'EOF'
chore(skills-lock): upstream の最新ハッシュと同期

<変更内容の要約>
EOF
)"
```

ユーザーにコミットしてよいか確認する。承認済みスキルが1つもなかった場合（全却下・差分なし）はコミットせずその旨を伝える。

## skills CLI のバージョン固定と更新手順

**Why**: `npx skills add` をバージョン未固定で実行すると、npx はローカルキャッシュに無い場合レジストリのその時点の最新版を確認なしで即時取得・実行する。`skills`（vercel-labs/skills）パッケージが乗っ取られた場合、これは任意コード実行の経路になる。しかもこの実行は Step 5 の差分確認・Step 6 のユーザー承認より**前**に走るため、source の `Fandhe-AI/<repo>` 完全一致検証では防げない。exact 版（`X.Y.Z`。dist-tag・`^`/`~` レンジは禁止）への固定が信頼アンカーになる。

**固定版の決め方**:
1. `npm view skills version` で現在の latest を確認する
2. `npm view skills repository.url` が `vercel-labs/skills` であることを確認する
3. `npm view skills time --json` 等で公開日時が不自然でないことを確認する
4. upstream リポジトリの該当タグ間の差分・リリースノートを確認し、問題なければ採用する

**更新手順**:
1. `scripts/skills-lock-update.sh` の `SKILLS_CLI_VERSION` と、本ファイルの Step 4 フェンス内の `SKILLS_CLI_VERSION` を**同一コミット**で更新する（値は完全一致させる）
2. `node --test skills/sync-skills-lock/tests/` で両ファイルの一致を検証する
3. **`universal` が新版でも有効な agent id であることを確認する**。無効値へ変わっていた場合、CLI はエラー表示のうえ `exit 0` の no-op になる（実測: `skills@1.5.22` で確認済み）ため、気付かずに運用すると「同期したつもりで何も更新されていない」状態になる。確認方法: スクラッチリポジトリで 1 スキルを実際に `--agent universal` で実行し、出力に `Invalid agents` が出ないこと、および `.agents/skills/<name>/` が実際に更新されることを確認する
4. 1 スキルで実際に実行し、差分が正常であること・書き込みが `.agents/skills/<name>/` と `skills-lock.json` のみに限定されていること（`git status --porcelain` に `.claude/` 等の他ツリーが現れないこと）を確認する
5. `chore(sync-skills-lock): skills CLI を X.Y.Z へ更新` でコミットする

**fail-closed**: 固定版が解決できない場合（該当版の不存在・レジストリ障害）は `npx` が非ゼロ終了する。黙って最新版へフォールバックする経路は存在せず、dist-tag・レンジ指定への書き換えも禁止する。`npx` の失敗経路でも成功経路と同じスコープ外書き込み検査（後述の「多層防御」）を必ず実行する。停止範囲は実行経路によって異なる: `scripts/skills-lock-update.sh` を単体実行した場合、`npx` 行だけ errexit を無効化して終了コードを保存し、成功・失敗いずれの経路でも事後のスコープ外検査を実行したうえでスクリプト全体を `exit 1` で停止する（この行の前後だけ `set +e`/`set -e` を挟む理由は同スクリプト内のコメント参照）。一方、本ファイルの Step 4 フェンス（複数スキルをループで処理する経路）では、`npx` の失敗を検出したら事後検査のうえ Step 6 の却下時と同じ手順（`git checkout --` / `git clean -fd`）で当該スキル分の部分書き込みをリバートしてから skip（`continue`）して次スキルへ進む — Step 1/3 の他の skip 分岐と同じ制御フローであり、ループ全体を停止させるものではない。事後検査・リバートを挟まずに skip すると、失敗が部分書き込み後に発生した場合の残置変更（スコープ内は次スキルの `git add`（Step 7）が承認済み変更と一緒に stage してしまう、スコープ外は後続処理から「元から存在した dirty 状態」と誤認され得る）を防げないため、両方とも必須の手順である。**スコープ外書き込みの検出（`exit 1`）はこれとは別の停止経路であり、`continue` ではなくループ全体を止める**（詳細は次項「書き込みスコープの制限」を参照）。

## 書き込みスコープの制限（`--agent universal` とスコープ外検出）

`npx skills add` にエージェント/パス制限を付けずに実行すると、CLI が検出した各エージェント向けツリー（`.claude/skills/` 等）へも書き込み得る（Issue #410）。しかし clean ガード（前提条件節・Step 4）・プレビュー（Step 5）・リバート（Step 6）・承認 `git add`（Step 7）はいずれも `skills-lock.json` と `.agents/skills/<name>/` のみを対象としているため、スコープ外への書き込みが発生すると (1) WIP 上書き、(2) レビュー（プレビュー）迂回、(3) 「clean と報告した後の dirty 残留」が起き得る。

2 層で防ぐ:

1. **一次防御（`--agent universal`）**: Step 4 の npx 呼び出しに `--agent universal` を付け、書き込み先を union ストア（`.agents/skills/<name>/`）と `skills-lock.json` のみへ限定する。個別 agent 指定（`claude-code` 等）は `.agents/skills/` を経由せず対象ツリーへ直接コピーしレイアウトを変えてしまうため使わない
2. **多層防御（実行前後スナップショット比較 + 状態シグネチャ比較）**: Step 4 の npx 実行直前・直後に `git status --porcelain -z -uall` でリポジトリ全体のスナップショットを取り、スコープ内（`skills-lock.json` / `.agents/skills/<name>/`）を除いた差分を比較する。加えて、リポジトリルート全体（除外はスコープ内と、`.git` のうちこのフロー自身が前後スナップショット間に実行する `git status` で変動し得る `.git/index`・その一時 lock〔`.git/index.lock` の完全一致のみ。`.git/config.lock`・`.git/HEAD.lock` 等の永続 lock の残置は署名対象で、シグネチャ不一致として検出される〕のみ。`.git/objects`・`.git/refs`・`packed-refs`・`HEAD`・`logs`・`worktrees`・`modules` を含む残り全域と `.git/config`・`.git/hooks/` 等の永続 Git メタデータは署名対象に含め、履歴・参照の改変やフック仕込み・設定改変も検出する。`.agents` / `.agents/skills` 自身は実行前に存在した場合のみ署名対象で、実行前に不存在だった場合に限り自身のメタデータを omit して初回インストールの正当な親作成を許容する）の状態シグネチャを `repo_state_signature`（`path_state` を起点 `.` へ適用。python3。通常ファイルは mode + 内容の sha256、シンボリックリンクは mode + リンク先の sha256、ディレクトリ・gitlink は自身の mode + 配下全エントリを再帰的に相対パス・パーミッション・内容ハッシュで集約した sha256）で1本にまとめ、前後で比較する。`repo_state_signature` はさらに index の論理状態（`git ls-files --stage` + `git ls-files -v`。エントリ・skip-worktree / assume-unchanged ビット）の sha256 を連結し、prune している `.git/index` の背後での index 改変も前後不一致として検出する（PR #412 codex P1 指摘）。git status に現れたパスだけをシグネチャ化する方式では、git がディレクトリの mode を追跡しない以上、スコープ外ディレクトリの chmod や `.gitignore` 対象ファイルの上書きを原理的に検出できないため、走査は status 由来のパス集合ではなく作業ツリー全体に対して行う（PR #412 P1 指摘群の同一クラス解消）。ステータス+パスの記録だけでなく全体シグネチャも一致して初めて「変化なし」と判定し、どちらかに差分があれば `--agent universal` が抑止しているはずの書き込みが発生したことを意味し、スコープ内をリバートしたうえで `exit 1` によりループ全体を停止する。**他の skip 分岐（`continue`）とは異なり、この検出はループを継続しない**: スコープ外の汚染は自動リバートされないため、続行すると最終報告が「clean」でも実際は dirty 残留となり、この issue が問題視する状態そのものになるため。停止時点までに承認・stage 済みの他スキル分は index に残ったままになるので、操作者は `git status` で確認したうえで、必要な分だけ `git commit` するか `git reset` で戻すかを判断する

両層の前提として、まず実行場所がメイン worktree であることを npx 実行前に検証する（`git rev-parse --absolute-git-dir` と `--git-common-dir` を物理パスへ正規化して比較し、不一致なら fail-closed で停止する。linked worktree では実 Git ディレクトリ〔`.git/worktrees/<name>/` と共有側の `refs`・`logs`・`config`・objects〕が作業ツリー外にあり `repo_state_signature` の走査対象に入らないため、npx が `git update-ref` 等で共有リポジトリを改変しても前後の全検査が一致してしまう。PR #412 codex P0 指摘）。この一致比較は linked worktree を除外するだけで実 Git ディレクトリの所在までは保証しないため、続けて「実 Git ディレクトリが作業ツリー直下の `.git` 実体ディレクトリである」ことも検証する（`--show-toplevel` を物理パスへ正規化して `--absolute-git-dir` の物理パスと `<toplevel>/.git` の厳密一致を要求し、さらに `<toplevel>/.git` を lstat して symlink ではなく directory であることを要求する。`git clone --separate-git-dir`・submodule checkout・`.git` が symlink の構成では git-dir と common-dir が一致したまま実体が作業ツリー外にあり、同じ検出不能に陥る。PR #412 Bugbot High 指摘）。次に許可先経路（`.agents` / `.agents/skills` / `.agents/skills/<name>`）の各要素を lstat 検証し、存在する要素が symlink または非ディレクトリなら npx を実行せず fail-closed で停止する（Step 4 フェンス冒頭）。スコープ外検査は許可先を「パス文字列」で走査除外するため、経路が実行前からリポジトリ外を指す symlink だと npx のリンク先への書き込みがどの検査にも現れない（PR #412 P0 指摘）。存在しない要素のみ、初回インストールの正当な新規作成として許容する。`skills-lock.json` も同じ段階で lstat 検証する: 状態シグネチャの `prune` と porcelain フィルタの双方でパス文字列により除外されるため、実行前から外向き symlink だと npx のリンク先への書き込みがどの検査にも現れない（PR #412 codex P0 指摘）。存在する場合は regular file であることを要求し、symlink・非 regular file なら npx を実行せず fail-closed で停止する（不存在は初回生成として許容する）。加えて許可先**配下**も npx 実行前に `find -type l` で走査し、既存の symlink が 1 件でもあれば npx を実行せず fail-closed で停止する（許可先配下は `prune-under` により署名から除外されるため、配下の既存 symlink を npx が辿ってリポジトリ外へ書き込んでも前後シグネチャ比較には現れない。事前拒否だけが防御になる）。さらに許可先配下の**既存 ignored ファイル**（`.DS_Store` 等）は npx 実行前に一時バックアップディレクトリへ内容・mode ごと退避し（`cp -p`・相対パス構造を保持）、実行後にバックアップと比較して変更・削除を検出したらバックアップから復元する（成功経路では警告のうえ処理継続、失敗経路では `revert_in_scope` に組み込んで復元。復元自体が失敗した場合のみバックアップディレクトリを保全して非ゼロ終了する）。

この事前検査は開始時点しか見ない（TOCTOU）ため、さらに 4 つの防御を重ねる（PR #412 P0 指摘・第7巡、Bugbot High 指摘、および codex P0 指摘）:

1. **許可先要素自身の署名（`prune-under`）**: 状態シグネチャは既存の許可先ディレクトリを「エントリごと除外」するのではなく、配下のみ除外して要素自身（種別・mode・symlink のリンク先）は前後で署名する（`SKILL_DIR_SIG_SPEC` の `prune-under`。実行前に不存在だった初回インストールのみ `prune` で全除外する）。npx が**実行中に**許可先を外向き symlink へ置換すると、前後シグネチャの不一致として検出される
2. **実行後の再検証（`verify_scope_path_after_run`）**: npx 実行後（事後シグネチャ取得前）に許可先経路の全要素を再度 lstat し、存在する要素が symlink・非ディレクトリなら fail-closed で停止する。初回インストールで npx が `.agents` 自体を外向き symlink として作成したケース（親要素の omit / 許可先の prune によりシグネチャに現れない経路）もこれが拒否する。検出時（`SCOPE_PATH_COMPROMISED=1`）の `revert_in_scope` は `skills-lock.json` の復元のみ行い、許可先配下への `git checkout` / `git clean` / ignored 削除は一切行わない — symlink を通じてリンク先（リポジトリ外）のファイルを削除・書き換える事故を避けるため、リンク先の内容とリポジトリ外への書き込み有無の手動確認を案内して非ゼロ終了する（ループ全体を停止する）
3. **実行後の配下 symlink 走査**: npx 実行後（`verify_scope_path_after_run` に続けて）に許可先**配下**を再度 `find -type l` で走査する。事前走査は実行前の 0 件しか保証せず、npx が**実行中に**配下へ作った外向き symlink とそれ経由の書き込みは、配下を署名から除外している前後比較にも経路 3 要素しか見ない再検証にも現れない（PR #412 Bugbot High 指摘）。事後に見つかる symlink はすべて npx 実行中の作成物であるため、1 件でも検出したら（走査自体の失敗も同様に）`SCOPE_PATH_COMPROMISED=1` の保全経路へ倒す: 許可先配下への `git checkout` / `git clean` / ignored 削除 / 既存 ignored の復元をすべてスキップし、`skills-lock.json` の復元のみ行い、検出パスとバックアップディレクトリを明示して非ゼロ終了する（手動復旧を案内。ループ全体を停止する）
4. **実行後の `skills-lock.json` 再検証（`verify_lock_file_after_run`）**: npx 実行後（`verify_scope_path_after_run` に続けて）に `skills-lock.json` を再度 lstat し、存在するのに regular file でなければ fail-closed で停止する（実行前の不存在→生成のケースも regular file を要求する）。npx が**実行中に** `skills-lock.json` を外向き symlink へ置換してリンク先へ書き込んでも、同パスは署名の `prune` と porcelain フィルタの双方から除外されているためどの検査にも現れない（PR #412 codex P0 指摘）。検出時（`LOCK_FILE_COMPROMISED=1`）の `revert_in_scope` は素の `git checkout -- skills-lock.json`（リンク先へ書き込み得る）を行わず、`rm` で symlink 自体を除去（リンク先は辿らない）してから checkout で index の内容を regular file として書き戻す。symlink 以外の想定外実体（ディレクトリ等）は一切触らず手動復旧を案内して非ゼロ終了する（ループ全体を停止する）

**検出の限界**: `git status --porcelain` は `.gitignore` 対象を報告しないため、porcelain スナップショット比較（判定軸 1）**単独**では ignore されたパスへの書き込みを検出できない。しかし状態シグネチャ比較（判定軸 2）は `.gitignore` 対象を含む作業ツリー全体を走査して内容ハッシュへ取り込むため、ignore されたパスへの書き込みもシグネチャ不一致として検出できる（porcelain 由来の報告一覧に該当パスが載らないだけで、検出・停止自体は機能する）。シグネチャ比較はほかに、npx 実行前から M（追跡・変更済み）や ??（未追跡）だったスコープ外ファイルをステータス文字列・パスとも変えずに内容・パーミッションだけ上書きするケース、およびディレクトリ・gitlink（未初期化 submodule 含む）が異なる状態へ書き換わるケースも検出できる。`.git` 配下も `.git/index` と `.git/index.lock` を除く全域（`objects`・`refs`・`packed-refs`・`HEAD`・`logs`・`worktrees`・`modules`・`config`・`hooks`、`.git/config.lock` 等の永続 lock を含む）が署名対象であり、履歴・参照の改変も検出できる（旧実装ではこれらを prune しており検出不能だった。Issue #413 で追跡し PR #412 で解消）。スコープ内リバート（`revert_in_scope`）は、npx 実行前に取得した許可先配下の全ファイルインベントリ（`find -print0`。ignored 含む・NUL 区切り）との突き合わせで「npx が新規作成した `.gitignore` 対象ファイル」のみを個別削除するため、`.agents/skills/<name>/` 配下へ書き込まれた ignored ファイルも異常終了時に残置されない（Issue #413 の残項目として解消）一方、**実行前から存在した ignored ファイル（`.DS_Store` 等）は削除されず保全される**（`git clean -fdx` は既存 ignored ファイルまで巻き添え削除するため使わない。PR #412 Bugbot Medium 指摘）。既存 ignored ファイルを npx が上書き・削除したケースは、許可先配下が署名から除外されている以上シグネチャ比較には現れないため、npx 実行前に取得する内容・mode 込みのバックアップ（`IGNORED_BACKUP_DIR`）との比較で検出し、`restore_preexisting_ignored` がバックアップから復元する（成功経路では警告して継続、失敗経路では `revert_in_scope` の一部として復元。復元失敗時はバックアップディレクトリを保全して非ゼロ終了する）。この復元が regular file のみを前提にできるのは、npx 実行前の許可先配下 symlink 走査（`find -type l`）が既存 symlink を fail-closed で拒否しているためである。実際に残る制約は次の 2 点である: (1) prune している `.git/index`・`.git/index.lock` の**ファイルとしての**書き込みは検出できない（このフロー自身の `git status` が npx 実行後に必ず index を更新するため、署名対象へ含めると常に誤検知になる）。ただし index の**論理状態**（エントリの追加・削除・blob 差し替え、skip-worktree / assume-unchanged ビット）は `git ls-files --stage` + `git ls-files -v` の前後比較（`index_state_signature`）が検出するため、残る盲点は stat cache 相当の情報と `.git/index.lock` 自体に限られる（PR #412 codex P1 指摘の解消）。(2) `.git` の大半を署名対象にした代償として、同期実行中の並行 git 操作（他 worktree 含む）がシグネチャ不一致（誤検知）として同期を停止させ得る（注意事項参照。fail-closed 側に倒す設計判断）。この残余リスクは、一次防御（`--agent universal`）が書き込み自体を抑止していることと合わせて小さいと判断する。

## 注意事項

- **全スキル sync での途中却下**: 1スキルずつ承認・stage を行うため、途中で却下しても承認済みスキルの stage は保持される。全スキル処理後に一括コミットする
- **同期実行中はこのリポジトリでの並行 git 操作（他 worktree 含む）を行わないこと**: 状態シグネチャは `.git` 配下を `.git/index`・一時 lock を除き署名対象に含めるため、fetch・commit・checkout 等の並行操作は `refs`・`objects`・`logs`・`worktrees` を変動させ、シグネチャ不一致（誤検知）として同期を停止させ得る。検出漏れ（fail-open）ではなく停止（fail-closed）側に倒す設計であり、誤検知した場合は並行操作を止めて再実行する
- **linked worktree では実行できない**: `git worktree add` で作られた作業ツリーでは `.git` が gitdir を指す通常ファイルで、実 Git ディレクトリ（`.git/worktrees/<name>/` と共有側の `refs`・`logs`・`config`・objects）が状態署名の走査対象外になるため、Step 4 冒頭の worktree 検証（`--absolute-git-dir` と `--git-common-dir` の物理パス比較）が npx 実行前に fail-closed で停止する。メイン worktree で実行し直す
- **実 Git ディレクトリが作業ツリー外にある構成でも実行できない**: `git clone --separate-git-dir`（`.git` が gitdir を指す gitfile）・submodule checkout・`.git` が symlink の構成では、git-dir と common-dir が一致したまま実体が作業ツリー外にあり linked worktree と同じ検出不能に陥るため、Step 4 冒頭の追加検証（`--show-toplevel` の物理パスとの厳密一致 + `<toplevel>/.git` の lstat）が npx 実行前に fail-closed で停止する。`.git` が実体ディレクトリの通常構成で実行し直す
- **許可先経路が symlink の場合は実行できない**: `.agents` / `.agents/skills` / `.agents/skills/<name>` のいずれかが symlink または非ディレクトリだと、Step 4 冒頭の実体検証が npx 実行前に fail-closed で停止する（symlink 越しのリポジトリ外書き込みはスコープ外検査に現れないため）。実体ディレクトリへ置き換えてから再実行する。npx が**実行中に**許可先を symlink へ置換した場合（初回インストールで symlink として作成した場合を含む）も、許可先要素自身の署名（`prune-under`）と実行後再検証（`verify_scope_path_after_run`）が fail-closed で停止し、このとき許可先配下への `git clean` 等の削除系操作は行わない（symlink 越しのリンク先削除を避けるため。「書き込みスコープの制限」節を参照）。許可先**配下**に既存の symlink がある場合も、npx 実行前の `find -type l` 走査が fail-closed で停止する（配下は署名から除外されており、リンク先への書き込みがどの検査にも現れないため）。npx が**実行中に**配下へ symlink を作成した場合も、npx 実行後の再走査（`find -type l`）が検出して同じ保全経路（許可先配下への削除系操作・復元をスキップし、バックアップを保全して停止）へ倒す。該当 symlink を実体ファイルへ置き換えるか削除してから再実行する
- **既存 ignored ファイルの変更は自動復元される**: 許可先配下に実行前から存在した ignored ファイル（`.DS_Store` 等）を npx が上書き・削除した場合、実行前バックアップとの比較で検出し、内容・mode をバックアップから復元する（成功経路では警告のうえ同期は継続）。復元に失敗した場合はバックアップディレクトリ（パスはエラーメッセージに表示）を残して停止するため、そこから手動で復旧する
- **スコープ外書き込みを検出した場合はループ全体が停止する**: 「書き込みスコープの制限」節を参照。`continue` ではなく `exit 1` のため、承認・stage 済みの他スキル分が index に残ったまま処理が止まる。手動で `git status` を確認し、コミットするか `git reset` するかを判断する
- **`skills-lock.json` が symlink・非 regular file の場合は実行できない**: `skills-lock.json` は署名の `prune` と porcelain フィルタの双方から除外されるため、symlink だとリンク先（リポジトリ外を含む）への書き込みがどの検査にも現れない。Step 4 冒頭の実体検証が npx 実行前に fail-closed で停止する（実体ファイルへ置き換えてから再実行する）。npx が**実行中に**置換した場合も実行後の再検証（`verify_lock_file_after_run`）が停止し、復元は symlink を `rm` で除去してから `git checkout` で書き戻す（リンク先への書き込みを避けるため。「書き込みスコープの制限」節を参照）
- **`skills-lock.json` は実行前 clean 前提で全体をステージする**: 単一 JSON ファイルのため部分ステージは現実的でない。Step 1 の事前ガードで clean を保証し、sync 由来以外の変更の混入を防ぐ
- **ルートの `skills-lock.json` のみを編集**: submodule 配下は手を付けない
- **source 完全一致検証（必須）**: `source` を `OWNER/REPO` へ正規化した上で `Fandhe-AI/<repo>` に完全一致しないエントリは skip する（`contribute-skill` と同じ安全弁）。前方一致では `../` を含む値が通過してしまうため、完全一致の正規表現で検証する。`skills-lock.json` の改ざんや誤設定から防御するため
- **`npx skills add --yes` は上書き確認をスキップする**: upstream に破壊的変更がある場合は `git diff` で内容を必ず確認すること
- **新スキルの取扱い**: ローカルに存在するが upstream に未登録のスキル（`contribute-skill`, `sync-skills-lock` 自身など）は、upstream マージ後に登録する。マージ前に `computedHash` を勝手に書き込まない
- **Step 5 のプレビューは index を変更しない**: 未追跡ファイルの表示に `git add -N`（intent-to-add）ではなく `git diff --no-index` を使う。Step 6 の拒否経路が index からの `git checkout --` で承認済み他スキルの hash を復元する設計に依存しており、i-t-a エントリの混入はその復元設計と干渉するため
- **skills CLI は固定版で実行する**: `npx skills add` はバージョン未固定で実行しない。固定版の決め方・更新手順は「skills CLI のバージョン固定と更新手順」節を参照
- **local patch の保護（checker を持つリポジトリでは必須）**: npx 前の checker（Step 4）→ 承認前の再適用 + 最終検証 + 契約範囲検証（Step 5.5）→ 成功時のみ stage（Step 7）の順を省略しない。checker 非 0・台帳（`.agents/skills/LOCAL-PATCHES.md`）のみ存在は fail-closed で停止し、local patch が欠けた状態を stage・commit しない。apply が変更し得る durable patch（`scripts/local-patches/`）は承認（Step 6 の最終 diff + 未追跡プレビュー再実行）・stage（Step 7）・却下（`PRE_SYNC_TREE` からの index 復元）のすべてで同じ集合として扱い、未 stage の WIP が同 directory に残る状態では同期を開始しない（Step 4 で fail-closed）。`computedHash` は upstream 版の値を維持する

## sandbox 環境での実行

このスキルはネットワーク越しの GitHub 操作（`npx skills add` による上流リポジトリの取得等）を必須とする。該当コマンドはコマンド単位で sandbox 無効にして実行する。ネットワーク遮断を解除できない環境では実行できない。

## 検証

コミット後、以下で完了を確認する。

```bash
# skills-lock.json が更新済みであることを確認
git show HEAD -- skills-lock.json | grep computedHash

# 差分なし（sync 完了）を確認
git status --porcelain skills-lock.json
```

- コミットに sync 対象スキルの `computedHash` 更新が含まれること
- ステージ・未ステージに残留変更がないこと

### 未追跡ファイル可視化の手動回帰確認

upstream にファイルが増えたケース（Step 5 のプレビュー拡張が効いているか）は、npx を実行せずに
未追跡ファイルを模擬して確認できる。フラットファイルの追加と、upstream が新規サブディレクトリ
ごと追加する典型ケース（`references/` 等）の両方を確認する。**両ケースで手順3の照合方法が異なる**
点に注意する（後述）。

```bash
# 1a. clean な状態で検証用ファイル（フラット）を作成し、npx が新規ファイルを増やした直後の状態を再現する
touch ".agents/skills/${SKILL_NAME}/__preview_regression_check__.md"

# 1b. 新規サブディレクトリごと追加されるケースも作成する
mkdir -p ".agents/skills/${SKILL_NAME}/__preview_regression_dir__"
touch ".agents/skills/${SKILL_NAME}/__preview_regression_dir__/new.md"

# 2. Step 5 のプレビュー部（上記コマンド）を実行し、両方の検証用ファイルの内容（0 byte でも
#    「新規（未追跡）ファイル — 承認時に git add で取り込まれる集合:」の一覧に、サブディレクトリ
#    配下のファイルも含めてフルパスで名前が出ること）が表示されることを確認する
#    （プレビューは git ls-files ベースのため、ディレクトリではなく個々のファイルパスを列挙する）

# 3. git clean -fdn（dry-run）の一覧と照合する。
#    フラットファイルはプレビューの行と `git clean -fdn` の行が完全一致する。
#    新規サブディレクトリは `git clean -fdn` が個々のファイルではなく親ディレクトリを
#    まとめて1行（`Would remove <dir>/`）で報告するため、行単位の完全一致では照合できない。
#    この場合はプレビューの各ファイルパスが `git clean -fdn` のいずれかの出力行（ファイル
#    自身、またはその祖先ディレクトリ）で始まることを確認する（前方一致で照合する）。
#    完全一致を要求すると、正常に動作しているプレビューを「壊れている」と誤診断する。
git clean -fdn -- ".agents/skills/${SKILL_NAME}/"

# 4. 検証用ファイル・ディレクトリを削除して原状復帰する
rm ".agents/skills/${SKILL_NAME}/__preview_regression_check__.md"
rm -rf ".agents/skills/${SKILL_NAME}/__preview_regression_dir__"
```

## 既存スキルとの関係

- `contribute-skill` でスキル改修が upstream にマージされた後に本スキルを実行する運用を推奨
- `create-commit` の Conventional Commits を踏襲（Step 8）
- 実行可能コマンド集として `scripts/skills-lock-update.sh` を参照
