#!/usr/bin/env bash
# skills-lock-update.sh — skills-lock.json の computedHash を npx skills add で更新する
#
# 使い方（リポジトリルートから実行）:
#   skills/sync-skills-lock/scripts/skills-lock-update.sh <skill-name> <source-repo>
#   （インストール先からは .agents/skills/sync-skills-lock/scripts/skills-lock-update.sh）
# 例:
#   skills/sync-skills-lock/scripts/skills-lock-update.sh github-docs Fandhe-AI/agent-reference-skills
#
# このスクリプトは sync-skills-lock スキルが使用する実例コマンド集。
# リポジトリルートから実行すること。

set -euo pipefail

# skills CLI (vercel-labs/skills) の固定実行バージョン。
# exact 版のみ許可（dist-tag・レンジ禁止）。npx はバージョン未固定だと
# ローカルキャッシュに無い場合レジストリの最新版を確認なしで即実行するため、
# レジストリ乗っ取り時に任意コード実行を許す経路になる。この実行は
# skills-lock.json の差分確認・ユーザー承認より前に走るため、source の
# Fandhe-AI 完全一致検証（下記）では防げない。exact 版固定が信頼アンカー。
# 更新手順は SKILL.md の「skills CLI のバージョン固定と更新手順」節を参照。
# SKILL.md 側のフェンスと同時更新し、tests/version-pin.test.mjs が両者の
# 一致を検証する。
readonly SKILLS_CLI_VERSION="1.5.22"   # 実装時に latest を再確認して確定（npm view skills version）

# dist-tag（latest 等）・レンジ指定（^, ~ 等）の混入をコード上でも防ぐ形式ガード。
# 不一致時は最新版へ暗黙フォールバックせず fail-closed で停止する。
if [[ ! "${SKILLS_CLI_VERSION}" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "エラー: SKILLS_CLI_VERSION は exact semver（X.Y.Z）のみ許可: ${SKILLS_CLI_VERSION}" >&2
  exit 1
fi

SKILL_NAME="${1:-}"
SOURCE_REPO="${2:-}"

if [[ -z "$SKILL_NAME" || -z "$SOURCE_REPO" ]]; then
  echo "使い方: $0 <skill-name> <source-repo>"
  echo "例: $0 github-docs Fandhe-AI/agent-reference-skills"
  exit 1
fi

# SKILL_NAME バリデーション: 小文字 kebab-case のみ許可（パストラバーサル防止）
if [[ ! "$SKILL_NAME" =~ ^[a-z][a-z0-9-]+$ ]]; then
  echo "エラー: SKILL_NAME は小文字 kebab-case のみ許可されています: ${SKILL_NAME}" >&2
  exit 1
fi

# source の安全弁: Fandhe-AI org の単一リポジトリのみ許可（完全一致検証）
# 前方一致では `../` を含む値が通過し、clone 時の URL パス正規化で
# 組織外リポジトリを対象にできるため、OWNER/REPO へ正規化後に厳密検証する
REPO_SLUG="${SOURCE_REPO#https://github.com/}"
REPO_SLUG="${REPO_SLUG%.git}"
if [[ ! "$REPO_SLUG" =~ ^Fandhe-AI/[A-Za-z0-9._-]+$ ]] \
  || [[ "$REPO_SLUG" == "Fandhe-AI/." || "$REPO_SLUG" == "Fandhe-AI/.." ]]; then
  echo "エラー: 想定外の source: $SOURCE_REPO — Fandhe-AI/<repo> の完全一致のみ許可されています" >&2
  exit 1
fi

# skills-lock.json に source があれば SOURCE_REPO と照合する（誤 upstream 同期防止）。
# jq 不在時にこの照合ブロックごと skip すると、lockfile の source 安全弁を経由せず
# 任意のリポジトリを SOURCE_REPO として通過させられてしまうため、skills-lock.json が
# 存在するのに jq が無い場合は照合を省略せず fail-closed で中止する。
if [[ -f skills-lock.json ]]; then
  if ! command -v jq >/dev/null 2>&1; then
    echo "エラー: jq が見つかりません。skills-lock.json の source 照合に jq の導入が必要です。中止します。" >&2
    exit 1
  fi
  LOCK_SOURCE=$(jq -r ".skills[\"${SKILL_NAME}\"].source // empty" skills-lock.json 2>/dev/null)
  if [[ -n "${LOCK_SOURCE}" ]]; then
    norm_lock="${LOCK_SOURCE#https://github.com/}"; norm_lock="${norm_lock%.git}"
    norm_arg="${SOURCE_REPO#https://github.com/}"; norm_arg="${norm_arg%.git}"
    if [[ "${norm_lock}" != "${norm_arg}" ]]; then
      echo "エラー: 指定された source (${SOURCE_REPO}) が skills-lock.json の source (${LOCK_SOURCE}) と一致しません。中止します。" >&2
      exit 1
    fi
  fi
fi

# gh CLI の認証確認
if ! gh auth status &>/dev/null; then
  echo "エラー: gh CLI が認証されていません。gh auth login を実行してください。" >&2
  exit 1
fi

# python3 の存在確認（PR #412 codex P1 指摘）: 状態署名（path_state /
# index_state_signature）と復元処理（restore_preexisting_ignored 等）が python3 を
# 必須実行する。無いまま進むと npx 実行後の検査・復元の途中で command-not-found に
# なり、スコープ外検査が中途半端なまま停止する（fail-open 経路）。npx 実行より
# 前のこの段階で fail-closed に停止する。
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
# 「メインである」ではないため中止する。
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
# （後段の REPO_SIG_OMITS の条件付き omit と同じ判定基準）。-d は symlink を辿るが、
# 直前の -L 判定で symlink を先に排除しているため実体の種別だけを見る。
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
# この検査も開始時点のみを保証する（TOCTOU）。npx が実行中に置換するケースは
# 実行後の再検証（verify_lock_file_after_run）が受け持つ。
if [[ -L "skills-lock.json" ]]; then
  echo "エラー: skills-lock.json がシンボリックリンクです。npx の書き込みがリンク先（リポジトリ外を含む）へ向かい、スコープ外書き込み検査で検出できないため中止します（fail-closed）。実体ファイルへ置き換えてから再実行してください。" >&2
  exit 1
fi
if [[ -e "skills-lock.json" && ! -f "skills-lock.json" ]]; then
  echo "エラー: skills-lock.json が regular file ではありません。npx の書き込み先として想定外の実体のため中止します（fail-closed）。" >&2
  exit 1
fi

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
# 実用上問題ない。
# gitlink（未初期化 submodule 等、os.walk が降りられない空ディレクトリ相当）は
# entries が空集合のままになり「空ディレクトリ」と区別が付かないが、この用途は
# 「npx 実行前後で変化したか」の検出のみで足りるため区別不要。stat コマンドの
# 出力書式は環境（BSD/GNU）で異なるため、シェルの `stat` は使わず python3 の
# os.lstat に統一する。取得エラー（lstat・open・走査失敗）は「読めなかっただけ」を
# 「変化なし」と誤認する fail-open 経路になるため、握り潰さず即座に非ゼロ終了して
# 呼び出し側で fail-closed に扱う。
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
#   - .git のうち、このスクリプト自身が前後スナップショット間に実行する git コマンドで
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
#     （SKILL.md の注意事項に明記。fail-closed 側に倒す設計判断）
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
# （自プロセスの git status が stat cache を正当に更新するため）が、その背後で npx が
# エントリの追加・削除・blob 差し替えや skip-worktree / assume-unchanged ビットの
# 付与を行っても検出できなくなる（PR #412 codex P1 指摘。特に skip-worktree を
# 立てられると、以後その tracked ファイルの変更が git status から恒久的に隠れる）。
# stat cache と独立な論理状態 — `git ls-files --stage`（mode・object・stage・パス）と
# `git ls-files -v`（状態タグ。skip-worktree は S、assume-unchanged は小文字）— を
# sha256 へまとめ、repo_state_signature の出力へ連結して前後比較する。git status の
# stat cache 更新はどちらの出力も変えないため、自プロセス起因の誤検知はない。
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

# git status --porcelain -z の1レコード（"XY PATH\0"）からスコープ内（skills-lock.json /
# .agents/skills/${SKILL_NAME}/ 配下）を除いたレコードだけを NUL 区切りで outfile へ
# 書き出す。これは Step 4 実行前後のスナップショット差分（scope-guard）用のフィルタで、
# 未追跡ファイルのプレビュー表示（既存の git ls-files -z 経路。下部で継続使用）とは別物。
# 検出の主体はリポジトリ全体の状態シグネチャ（repo_state_signature）であり、この
# レコード列は status レベルの前後比較と、検出時の報告（どのパスが git status 上で
# 変化したか）に使う。ディレクトリの chmod 等 status に現れない変化はこの一覧に
# 載らず、シグネチャ不一致としてのみ検出される。
# ステータス文字の後の空白1文字を含む固定長プレフィックス（3文字）を切り落とすことで
# パスを取り出す。C-quote（改行等を含むパスのダブルクォート化）の影響を受けない
# （-z 出力は raw byte のパスであり、path をそのままファイルアクセスに使ってよい）。
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
# 案内メッセージより先にスクリプトが停止し得る）。.gitignore 対象の残置
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
  # 唯一の回復経路）。復元自体が失敗した場合はバックアップ dir を保全して案内する
  # （この関数の呼び出し元はすべて exit 1 で終端するため、非ゼロ終了の契約は保たれる）。
  if ! restore_preexisting_ignored; then
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

echo "==> skills-lock.json を更新中: ${SKILL_NAME} (source: ${SOURCE_REPO})"
echo ""

# 更新前の computedHash を表示
echo "変更前の computedHash:"
SKILL_NAME_VAR="${SKILL_NAME}" python3 - <<'PYEOF'
import json, os, sys
skill = os.environ['SKILL_NAME_VAR']
try:
    with open('skills-lock.json') as f:
        lock = json.load(f)
    skills = lock.get('skills', {})
    if skill in skills:
        print(skills[skill].get('computedHash', '(computedHash なし)'))
    else:
        print('(未登録)')
except FileNotFoundError:
    print('(skills-lock.json が見つかりません)', file=sys.stderr)
    sys.exit(1)
PYEOF

echo ""

# skills-lock.json の clean チェック（sync 由来以外の変更の混入を防ぐ）
# git diff 系は untracked を検出しないため porcelain を使う
if [[ -n "$(git status --porcelain -- skills-lock.json)" ]]; then
  echo "エラー: skills-lock.json に未コミットの変更があります。コミットまたは退避してから再実行してください。" >&2
  exit 1
fi

# 当該スキルの install ツリーの clean チェック（npx による WIP 上書きを防ぐ）
# git diff 系は untracked を検出しないため porcelain を使う（未追跡 WIP も保護対象）
if [[ -n "$(git status --porcelain -- ".agents/skills/${SKILL_NAME}/")" ]]; then
  echo "エラー: .agents/skills/${SKILL_NAME}/ に未コミット変更（未追跡含む）があります。npx の上書きで失われるため中止します。コミットまたは退避してから再実行してください。" >&2
  exit 1
fi

# 消費側リポジトリが vendored skill へ commit 済み local patch を適用している場合
# (台帳: .agents/skills/LOCAL-PATCHES.md)、commit 済み patch は上の clean チェックを
# 通過してしまうため、npx より前に repository-owned checker(無引数 = check mode)を
# 必須にし、npx 後は stage より前に再適用(apply) + 最終検証を行う。
# checker 非 0、および台帳があるのに checker が無い状態は fail-closed で停止する
LOCAL_PATCH_GUARD=false
if [[ -f scripts/check-skill-local-patches.sh ]]; then
  LOCAL_PATCH_GUARD=true
  # checker は導入先リポジトリが配置する実行可能コードであり、「存在するだけ」で実行しては
  # ならない(未信頼な checkout・未レビュー PR の任意コードが、差分提示・承認より前に
  # ユーザー権限で走る経路になる)。実行は次のすべてを満たす場合に限る(fail-closed):
  #   (1) worktree の checker が symlink ではない regular file である(git hash-object は
  #       symlink のリンク先内容を読むため、-L を先に拒否しないと「HEAD と同内容の外部
  #       ファイルへの symlink」が (2) の一致検証をすり抜ける)
  #   (2) HEAD に commit 済みで、worktree の内容が HEAD の blob と一致する
  #       (未追跡・未コミット変更の checker は拒否 = レビューを経ていないコードを実行しない)
  #   (3) HEAD 側のエントリ mode が 100644 / 100755 の regular file である
  #       (120000 = symlink エントリの blob はリンク先文字列であり、実行対象にできない)
  #   (4) ユーザーが由来(git log -1)と内容(git show)をレビューし、その blob hash を
  #       CHECKER_APPROVED_HASH で明示承認している(承認は hash 単位。内容が変われば再承認)
  # 実行は worktree のファイルではなく、承認済み HEAD blob を取り出した一時ファイル
  # (CHECKER_EXEC)に対して行う。hash 確認後〜bash 実行の間に worktree の checker を
  # 差し替える TOCTOU 経路を、実行対象を承認済み blob へ固定することで断つ。
  # なお checker 自体は契約範囲外 path のため、apply がこれを書き換えた場合は
  # outside_state の前後 digest 比較でも fail-closed に検出される
  if [[ -L scripts/check-skill-local-patches.sh ]]; then
    echo "エラー: scripts/check-skill-local-patches.sh がシンボリックリンクです。リンク先差し替えで HEAD 一致検証をすり抜けられるため同期を開始しません(fail-closed)。実体ファイルへ置き換えてから再実行してください。" >&2
    exit 1
  fi
  if [[ ! -f scripts/check-skill-local-patches.sh ]]; then
    echo "エラー: scripts/check-skill-local-patches.sh が regular file ではありません。実行対象にできないため同期を開始しません(fail-closed)。" >&2
    exit 1
  fi
  CHECKER_HEAD_MODE="$(git ls-tree HEAD -- scripts/check-skill-local-patches.sh 2>/dev/null | awk '{print $1}')"
  if [[ "${CHECKER_HEAD_MODE}" != "100644" && "${CHECKER_HEAD_MODE}" != "100755" ]]; then
    echo "エラー: HEAD の scripts/check-skill-local-patches.sh が regular file ではありません(mode: ${CHECKER_HEAD_MODE:-エントリなし})。symlink 等は実行対象にできないため同期を開始しません(fail-closed)。" >&2
    exit 1
  fi
  CHECKER_WORKTREE_HASH="$(git hash-object -- scripts/check-skill-local-patches.sh)"
  CHECKER_HEAD_HASH="$(git rev-parse HEAD:scripts/check-skill-local-patches.sh 2>/dev/null || true)"
  if [[ -z "${CHECKER_HEAD_HASH}" || "${CHECKER_WORKTREE_HASH}" != "${CHECKER_HEAD_HASH}" ]]; then
    echo "エラー: scripts/check-skill-local-patches.sh が HEAD に commit 済みの内容と一致しません(未 commit・未追跡・未コミット変更)。任意コード実行を防ぐため同期を開始しません(fail-closed)。" >&2
    exit 1
  fi
  if [[ "${CHECKER_APPROVED_HASH:-}" != "${CHECKER_WORKTREE_HASH}" ]]; then
    echo "エラー: checker はユーザーがレビュー・承認した内容のみ実行できます。由来と内容を確認のうえ、blob hash を明示して再実行してください(fail-closed):" >&2
    echo "  git log -1 -- scripts/check-skill-local-patches.sh   # 由来(最終 commit)の確認" >&2
    echo "  git show HEAD:scripts/check-skill-local-patches.sh   # 実行される内容の確認" >&2
    echo "  CHECKER_APPROVED_HASH=${CHECKER_WORKTREE_HASH} $0 ${SKILL_NAME} ${SOURCE_REPO}" >&2
    exit 1
  fi
  # 承認済み HEAD blob を一時ファイルへ取り出す。以後の checker 実行(同期前 check /
  # apply / 最終 check)はすべてこのファイルを使い、worktree の checker は実行しない。
  # 取り出し失敗のまま進むと空ファイルの bash 実行(exit 0 の no-op)が「検証成功」に
  # 化けるため fail-closed で停止する。この trap は後段の単一 trap(mktemp 群の掃除)に
  # 置き換わるが、そちらにも CHECKER_EXEC の削除を含めてあるため掃除は途切れない
  CHECKER_EXEC="$(mktemp)"
  trap '[[ -z "${CHECKER_EXEC:-}" ]] || rm -f "${CHECKER_EXEC}"' EXIT
  if ! git cat-file blob "${CHECKER_HEAD_HASH}" > "${CHECKER_EXEC}"; then
    echo "エラー: 承認済み checker blob(${CHECKER_HEAD_HASH})の取り出しに失敗しました。同期を開始しません(fail-closed)。" >&2
    exit 1
  fi
elif [[ -f .agents/skills/LOCAL-PATCHES.md ]]; then
  echo "エラー: .agents/skills/LOCAL-PATCHES.md があるのに scripts/check-skill-local-patches.sh がありません。local patch を検証できないため同期を開始しません(fail-closed)。" >&2
  exit 1
fi

if [[ "${LOCAL_PATCH_GUARD}" == true ]]; then
  # durable patch 置き場は承認時に directory ごと stage し、却下時に index からの復元 +
  # git clean の対象になるため、未 stage の WIP・未追跡ファイルが残っていると巻き込まれて
  # 失われる。staged のみの変更(= 呼び出し元ループで承認済みに積み上がった分)は許容する。
  # producer(git status)を grep -q へ直接 pipe すると、-q の早期終了による SIGPIPE で
  # pipefail 下のパイプラインが偽になり WIP を見逃し得るため、一旦変数へ取得してから判定する
  LOCAL_PATCHES_STATUS="$(git status --porcelain -- scripts/local-patches/)"
  if grep -q '^.[^ ]' <<<"${LOCAL_PATCHES_STATUS}"; then
    echo "エラー: scripts/local-patches/ に未 stage の変更・未追跡ファイルがあります。承認・却下経路が巻き込むため同期を開始しません(fail-closed)。" >&2
    exit 1
  fi
  # 契約範囲(skills-lock.json / 当該スキル / durable patch)外の状態 digest。
  # worktree 側は「HEAD を基底にした一時 index へ範囲外のみ git add -A」した tree hash で
  # 捉える(未追跡・削除を含む全ファイルが実 blob hash で比較され、diff の表示文字列に
  # 依存しない = dirty なバイナリの上書きも検出する。範囲内は HEAD のまま固定されるため
  # 同期による正当な変更では digest が動かない)。index 側は ls-files -s の blob hash で捉える。
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

  # checker の「すべての」実行(同期前 check / apply / 最終 check)の直後に、実行結果に
  # 関わらず範囲外 digest と checker 自身の blob hash を再検証する。範囲外を書き換えて
  # 非 0 終了するケース・checker 自身を未承認コードへ置換するケースを、次の実行より前に
  # fail-closed で検出するため。範囲外の破壊は契約範囲用の復元手順では戻らないため、
  # 手動復旧の案内を出す
  verify_outside_and_checker() {
    if [[ -L scripts/check-skill-local-patches.sh ]] \
      || [[ "$(git hash-object -- scripts/check-skill-local-patches.sh 2>/dev/null || echo missing)" != "${CHECKER_APPROVED_HASH}" ]]; then
      echo "エラー: checker 自身が書き換えられました(symlink 化を含む)。未承認の状態のため以後実行しません(fail-closed)。" >&2
      return 1
    fi
    if [[ "$(outside_state)" != "${PRE_OUTSIDE}" ]]; then
      echo "エラー: checker が契約範囲外の path を変更しました(fail-closed)。" >&2
      echo "git status --porcelain で範囲外の変更を特定し、tracked は git restore -- <path> / index は git restore --staged -- <path> で手動復旧してください(契約範囲用の復元手順では範囲外は戻りません)。checker 側の修正も必要です。" >&2
      return 1
    fi
    return 0
  }

  # checker の「初回実行より前」に index snapshot を取得する。同期前 check(check mode)も
  # 契約上、契約範囲(当該スキル / skills-lock.json / durable patch)を変更・stage し得るため、
  # すべての失敗経路(pre-check 失敗・検証失敗・npx 失敗・apply / 最終 check 失敗)で
  # この snapshot で契約範囲全体を同期開始前へ戻す
  PRE_SYNC_TREE="$(git write-tree)"

  # 契約範囲(当該スキル / skills-lock.json / durable patch)を同期開始前へ戻す共通処理。
  # checker(check mode 含む)は契約範囲を変更・stage し得るため、pre-check 失敗・検証失敗・
  # npx 失敗・apply / 最終 check 失敗のすべての失敗経路で、部分変更を残さず同期開始前へ
  # 復元してから終了する。復元は git restore の pathspec で契約パスに限定し、範囲外 path の
  # index・worktree には一切触れない(index 全体を git read-tree で書き換えると、
  # verify_outside_and_checker が「範囲外は git restore --staged -- <path> で手動復旧」と
  # 案内した直後にその案内自体を誤りにしてしまう)。git restore は no-overlay が既定のため、
  # 同期開始前 tree に無い tracked ファイルは契約パス内に限り index・worktree から取り除かれる。
  # 契約範囲内の未追跡ファイルは git clean で即削除せず一時ディレクトリへ退避する
  # (checker が契約ディレクトリ内へ移動・新規作成したファイルの唯一のコピーであり得るため、
  # 削除はデータ喪失になる。退避先を案内し、削除の判断は人間へ委ねる)
  restore_contract_scope() {
    : "${PRE_SYNC_TREE:?同期開始前 snapshot が未設定のため復元できません}"
    local restore_targets=(--staged --worktree) untracked_list moved=0 p
    # npx 実行後検証が許可先経路・skills-lock.json の妥協(symlink 化等)を検出している場合、
    # worktree への書き込み・未追跡退避のパス走査がリンク先(リポジトリ外を含む)へ向かい得る
    # ため index のみ復元する(worktree 側は revert_in_scope が手動復旧を案内済み)。
    # 妥協フラグは npx 実行後にのみ設定されるため、それ以前の失敗経路では既定 0 で参照する
    if [[ "${SCOPE_PATH_COMPROMISED:-0}" -ne 0 || "${LOCK_FILE_COMPROMISED:-0}" -ne 0 ]]; then
      restore_targets=(--staged)
      echo "許可先経路または skills-lock.json の妥協を検出しているため、契約範囲の復元は index のみ行います。worktree 側は案内済みの手順で手動復旧してください。" >&2
    else
      untracked_list="$(mktemp)"
      # skills-lock.json も退避対象に含める。通常は tracked のため列挙されないが、checker が
      # git rm --cached 等で未追跡化して内容変更した後に失敗すると、退避なしの git restore が
      # その唯一の内容を上書きしてしまう
      if ! git ls-files -z --others --exclude-standard -- skills-lock.json ".agents/skills/${SKILL_NAME}/" scripts/local-patches/ > "${untracked_list}"; then
        echo "警告: 契約範囲内の未追跡ファイル列挙に失敗しました。未追跡分は退避できていない可能性があるため、復元後に git status で確認してください。" >&2
      fi
      CONTRACT_UNTRACKED_BACKUP_DIR="$(mktemp -d)"
      while IFS= read -r -d '' p; do
        mkdir -p "${CONTRACT_UNTRACKED_BACKUP_DIR}/$(dirname "${p}")"
        mv -- "${p}" "${CONTRACT_UNTRACKED_BACKUP_DIR}/${p}"
        moved=1
      done < "${untracked_list}"
      rm -f "${untracked_list}"
      if [[ "${moved}" -eq 1 ]]; then
        echo "契約範囲内の未追跡ファイルは削除せず ${CONTRACT_UNTRACKED_BACKUP_DIR} に相対パス構造で退避しました。内容を確認し、不要なら手動で削除してください。" >&2
      else
        rmdir "${CONTRACT_UNTRACKED_BACKUP_DIR}" 2>/dev/null || true
      fi
    fi
    # 複数パスを 1 コマンドへ渡すと pathspec 不一致 1 件で全体が失敗するため 1 コマンド
    # 1 パスで分離する(revert_in_scope と同じ理由)。pathspec は index に対しても照合される
    # ため、PRE_SYNC_TREE 取得後に新規作成・stage されたファイルは tree に無くても
    # no-overlay で index(・worktree)から取り除かれる(実測済み)。pathspec 不一致
    # (tree にも index にも無い)は復元対象なしを意味するため許容するが、真の失敗
    # (権限エラー等)と区別が付かないため、成功可否はコマンドの終了コードではなく
    # 下の復元後検証で fail-closed に判定する
    git restore "${restore_targets[@]}" --source="${PRE_SYNC_TREE}" -- skills-lock.json 2>/dev/null || true
    git restore "${restore_targets[@]}" --source="${PRE_SYNC_TREE}" -- ".agents/skills/${SKILL_NAME}/" 2>/dev/null || true
    git restore "${restore_targets[@]}" --source="${PRE_SYNC_TREE}" -- scripts/local-patches/ 2>/dev/null || true
    # 復元後検証(fail-closed): 契約パスの index が PRE_SYNC_TREE と一致し、worktree 復元
    # モードでは worktree 側も PRE_SYNC_TREE と一致し未追跡も残っていない(未追跡は上で
    # 退避済み)ことを実測してから成功を表示する。pathspec miss や restore の失敗を
    # 「復元対象なし」として成功扱いすると、新規 staged ファイルの残留(git add への
    # 混入経路)を見逃すため。worktree 側の判定基準は HEAD ではなく PRE_SYNC_TREE:
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
      echo "契約範囲を同期開始前(PRE_SYNC_TREE=${PRE_SYNC_TREE})へ復元しました(範囲外 path の index・worktree には触れていません)。" >&2
    else
      echo "エラー: 契約範囲の復元後検証で差分が残っています。git diff --cached ${PRE_SYNC_TREE} -- <契約パス> / git diff ${PRE_SYNC_TREE} -- <契約パス> / git ls-files --others -- <契約パス> で残留を確認し、git restore --staged --worktree --source=${PRE_SYNC_TREE} -- <path> で手動復旧してください(fail-closed。復元完了とは扱いません)。" >&2
    fi
  }

  echo "==> 同期前の local patch 検証(check)"
  pre_check_rc=0
  # 実行対象は worktree のファイルではなく、承認済み blob を取り出した CHECKER_EXEC
  bash "${CHECKER_EXEC}" || pre_check_rc=$?
  if ! verify_outside_and_checker; then
    restore_contract_scope
    echo "(npx は実行していません)" >&2
    exit 1
  fi
  if [[ "${pre_check_rc}" -ne 0 ]]; then
    restore_contract_scope
    echo "エラー: 同期前の local patch 検証に失敗しました。状態を修復してから再実行してください(fail-closed。npx は実行していません)。" >&2
    exit 1
  fi
fi

# 一時ファイルは npx 実行前後のスナップショット比較に使うため、npx を呼ぶより前に
# すべて用意し、単一の trap へまとめて登録する（trap は後勝ちのため、複数箇所に
# 分散させると先に登録した分の掃除が消える）。UNTRACKED_LIST_FILE はこの後の
# 未追跡ファイル一覧化（プレビュー表示）でも使うため、ここでまとめて確保する。
SNAP_BEFORE="$(mktemp)"
SNAP_AFTER="$(mktemp)"
SNAP_FILTERED_BEFORE="$(mktemp)"
SNAP_FILTERED_AFTER="$(mktemp)"
NPX_OUTPUT_FILE="$(mktemp)"
UNTRACKED_LIST_FILE="$(mktemp)"
SCOPE_INVENTORY_FILE="$(mktemp)"
IGNORED_BASELINE_FILE="$(mktemp)"
# 既存 ignored ファイルの実行前バックアップ先（相対パス構造・mode を保持）。
# 復元失敗時は IGNORED_BACKUP_KEEP=1 で削除を抑止し、手動復旧の素材として残す。
IGNORED_BACKUP_DIR="$(mktemp -d)"
IGNORED_BACKUP_KEEP=0
trap 'rm -f "${SNAP_BEFORE}" "${SNAP_AFTER}" "${SNAP_FILTERED_BEFORE}" "${SNAP_FILTERED_AFTER}" "${NPX_OUTPUT_FILE}" "${UNTRACKED_LIST_FILE}" "${SCOPE_INVENTORY_FILE}" "${IGNORED_BASELINE_FILE}"; if [[ "${IGNORED_BACKUP_KEEP}" -eq 0 ]]; then rm -rf "${IGNORED_BACKUP_DIR}"; fi; [[ -z "${CHECKER_EXEC:-}" ]] || rm -f "${CHECKER_EXEC}"' EXIT

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

# npx 実行前のリポジトリ全体スナップショット（スコープ外書き込み検出の起点）。
# -z は改行等を含むパスでも1レコード1件を保つため、後段の filter_out_of_scope が
# C-quote に影響されず判定できる。-uall は新規ディレクトリの collapse
# （`?? .agents/` のような1行への丸め）を防ぐために必須（丸められると
# ディレクトリ配下の個々のパスがスコープ判定の対象に現れない）。
# status.renames=false で rename 検出を明示的に無効化し、2フィールド
# （新パス + 旧パス）のレコードが混入しない形にそろえる（既定でも通常は無効だが、
# ユーザー環境の git config 依存にしない）。
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
# 必ず npx を呼ぶ前にここで確定させる。npx 実行後（事後検査の直前）に取得すると、
# 「変更前」のつもりが実質「変更後」と一致してしまい、実行前から M・?? だった
# スコープ外ファイルの内容・モードだけの上書きを見逃す（事前シグネチャ化を npx の
# 後にまとめて行った最初の実装で実測した回帰）。取得失敗時はスコープ外書き込みを
# 検出できないため fail-closed で中止する（この時点では npx 未実行のため残置なし）。
if ! REPO_STATE_BEFORE="$(repo_state_signature)"; then
  echo "エラー: npx 実行前の状態シグネチャ取得に失敗しました。スコープ外書き込みの検出ができないため中止します。" >&2
  exit 1
fi

# npx skills add で CLI に computedHash を更新させる
# --yes（1つ目）は npx 自体のインストール確認プロンプトを非対話でスキップする
# ものであり、skills CLI へ渡す --yes（末尾）とは別物（位置で区別される）。
# skills@${SKILLS_CLI_VERSION} で exact 版のみ解決させ、該当版が存在しない・
# レジストリ到達不能の場合は npx が非ゼロ終了する（fail-closed。最新版への暗黙
# フォールバック経路は存在しない）。
# --agent universal は書き込み先を union ストア（.agents/skills/<name>/）+
# skills-lock.json のみに限定する一次防御。個別 agent 指定（claude-code 等）は
# .agents/skills を経由せず .claude/skills/ 等へ直接コピーしレイアウトを変えるため
# 使わない（実測: スクラッチリポジトリで --agent universal のみ .agents/skills/
# 以外へ書き込みが無いことを確認済み）。npx の出力は tee で NPX_OUTPUT_FILE へも
# 保存し、後段の「Invalid agents」no-op 検出に使う。
#
# 終了コードの扱い: この行を素の `set -euo pipefail` 下に置くと、npx が非ゼロ終了
# した瞬間に pipefail でスクリプトが即停止し、下の事後スナップショット取得・
# スコープ外検査（この行より後の NPX_STATUS 分岐）に到達できない。npx が部分的に
# スコープ外へ書き込んだ後に失敗した場合、その残置がまったく検出されないまま停止して
# しまうため、この行の前後だけ errexit を無効化し、pipeline の終了コードを PIPESTATUS
# 経由で変数へ保存して明示的に分岐する（成功・失敗いずれの経路でも下の事後検査へ
# 必ず到達させる）。
# npx 呼び出し自体は bare のまま1行を維持する（tests/version-pin.test.mjs の静的抽出
# が行頭 npx の1物理行を前提にしているため、バックスラッシュ継続で複数行に分けない）。
# PIPESTATUS は pipeline 直後の「次のコマンド実行前」にしか正しい値を保持しない。
# 変数代入も1個のコマンドと数えられるため、`NPX_STATUS=...; TEE_STATUS=...` のように
# 2つの代入に分けると、1つ目の代入自体がその時点の PIPESTATUS を（要素数1・
# 値0の配列へ）上書きしてしまい、2つ目の代入が参照する PIPESTATUS[1] は
# `set -u` 下で unbound variable エラーになる（実測: bash 5.3 で再現）。
# 配列全体を単一の代入 `arr=("${PIPESTATUS[@]}")` でスナップショットし、
# 添字アクセスはそのコピーに対して行う。npx（[0]）・tee（[1]）両方を読む理由:
# tee がディスク容量不足等で非ゼロ終了すると NPX_OUTPUT_FILE が空・不完全なまま
# 残り得るが、npx 自体は成功（exit 0）し得るため、tee 側の失敗は npx の終了コード
# だけを見る分岐からは検出できない（Issue #410 CI 失敗指摘）。TEE_STATUS が非ゼロ
# なら、その不完全な NPX_OUTPUT_FILE を前提にした「Invalid agents」no-op 判定を
# 信頼せず、NPX_STATUS を強制的に失敗へ倒して以降の失敗経路（事後スコープ外検査・
# スコープ内リバート）へ必ず合流させる。
set +e
npx --yes "skills@${SKILLS_CLI_VERSION}" add "${SOURCE_REPO}" --skill "${SKILL_NAME}" --agent universal --yes 2>&1 | tee "${NPX_OUTPUT_FILE}"
PIPE_EXIT_SNAPSHOT=("${PIPESTATUS[@]}")
set -e
NPX_STATUS="${PIPE_EXIT_SNAPSHOT[0]}"
TEE_STATUS="${PIPE_EXIT_SNAPSHOT[1]}"

if [[ "${TEE_STATUS}" -ne 0 ]]; then
  echo "エラー: npx の出力を ${NPX_OUTPUT_FILE} へ保存する tee が失敗しました（終了コード ${TEE_STATUS}。ディスク容量不足等）。出力ファイルが不完全なため、npx 自体の終了コード（${NPX_STATUS}）に関わらず失敗として扱います。" >&2
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
# 検知せず先へ進むと「同期したつもりで何も更新されていない」まま完了扱いに
# なるため、明示的にエラー化する（NPX_STATUS -eq 0 のときのみ意味を持つ判定。
# 上の TEE_STATUS チェックで NPX_STATUS が強制失敗化されていればここは通らない）。
# この分岐で直接 exit すると実行後スナップショット・シグネチャ比較・スコープ内
# リバートをすべて迂回する（PR #412 P1 指摘）。「Invalid agents」は CLI の出力文言に
# 過ぎず、将来版が部分書き込みの後に同じ文言を出しても no-op とは限らないため、
# NPX_STATUS=1 を設定して下の共通失敗経路へ合流させ、「成功・失敗いずれの経路でも
# 事後検査へ必ず到達」の契約を守る（NPX_NOOP_DETECTED は重複する汎用メッセージの
# 抑止にのみ使い、検査・リバートの経路は変えない）。
NPX_NOOP_DETECTED=0
if [[ "${NPX_STATUS}" -eq 0 && "${SCOPE_PATH_COMPROMISED}" -eq 0 ]] && grep -q "Invalid agents" "${NPX_OUTPUT_FILE}"; then
  echo "エラー: skills CLI が --agent universal を認識せず、何も実行していません（exit 0 の no-op）。SKILLS_CLI_VERSION 更新時は SKILL.md の「skills CLI のバージョン固定と更新手順」節に従い universal の有効性を再確認してください。" >&2
  NPX_NOOP_DETECTED=1
  NPX_STATUS=1
fi

if [[ "${NPX_STATUS}" -ne 0 ]]; then
  if [[ "${NPX_NOOP_DETECTED}" -eq 0 && "${SCOPE_PATH_COMPROMISED}" -eq 0 && "${LOCK_FILE_COMPROMISED}" -eq 0 ]]; then
    echo "エラー: skills@${SKILLS_CLI_VERSION} の実行が失敗しました（該当版の不存在・レジストリ障害・ダウンロード中断等、原因は問いません）。" >&2
  fi
  # 失敗が部分書き込み後に発生した場合、skills-lock.json / .agents/skills/${SKILL_NAME}/
  # に加えてスコープ外（他エージェントツリー等）にも残置され得るため、失敗経路でも
  # 実行後スナップショットを取ってスコープ外残留を検査する（下の成功経路と同一ロジック。
  # ここで検査しないと、次にこのディレクトリを扱う処理がスコープ外の残置差分を
  # 「元から存在した dirty 状態」として誤認しかねない）。
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
  # 次にこのディレクトリを扱う呼び出し元（SKILL.md の全スキル sync ループ等）が、
  # この失敗による残置差分を承認済みの変更や「既存の dirty 状態」と混同しないよう、
  # スコープ内（skills-lock.json / .agents/skills/${SKILL_NAME}/）分のみ即座にリバート
  # してから exit 1 で終端する。
  if [[ "${LOCAL_PATCH_GUARD}" == true ]]; then
    # 同期前 check(check mode)が契約範囲を変更・stage していた可能性があり、index からの
    # worktree 復元しか行わない revert_in_scope だけでは同期開始前へ戻らない。契約パス限定の
    # restore_contract_scope で index も同期開始前へ戻す(許可先経路・skills-lock.json の
    # 妥協検出時は関数内で index のみの復元へ切り替わる)。呼び出しは revert_in_scope より
    # 「前」でなければならない: revert_in_scope の git clean -fd を先に走らせると、
    # restore_contract_scope が退避するはずの契約範囲内の未追跡ファイル(checker が
    # 移動・新規作成した唯一のコピーであり得る)が削除される。復元後の revert_in_scope は
    # 契約パスの checkout / clean が実質 no-op になり、ignored ファイルの選別削除・
    # 既存 ignored の復元・妥協検出時の保全案内だけが働く
    restore_contract_scope
  fi
  revert_in_scope
  echo "スコープ内（skills-lock.json / .agents/skills/${SKILL_NAME}/）の変更はリバートしました。固定版を外した再実行はしません。" >&2
  exit 1
fi

# npx 実行後のスナップショット。前後のスコープ外差分を見るため、取得条件は
# SNAP_BEFORE と完全に揃える。取得失敗時にその場で exit すると、npx が生成済みの
# スコープ内変更を残置したままスコープ外シグネチャ検査も行われない（PR #412 P1
# 指摘）。状態シグネチャは git 非依存（python3 の走査）で取得できるため、可能な
# 範囲で事後検査（スコープ外残置疑いの報告）を行い、スコープ内をリバートしてから
# fail-closed で非ゼロ終了する。
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
  if [[ "${LOCAL_PATCH_GUARD}" == true ]]; then
    # 同期前 check の staged 契約変更を残さない(fail-closed 契約)。git clean -fd による
    # 未追跡削除より先に退避を効かせるため revert_in_scope より前に呼ぶ(NPX_STATUS 分岐と同じ)
    restore_contract_scope
  fi
  revert_in_scope
  echo "スコープ内（skills-lock.json / .agents/skills/${SKILL_NAME}/）の変更はリバートしました。" >&2
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
# 判定は 2 軸: (1) porcelain レコード（SNAP_FILTERED_*。git の porcelain -z 出力順は
# 決定的なためソート不要で cmp -s のバイト列比較のみで判定できる）と、
# (2) リポジトリ全体の状態シグネチャ（REPO_STATE_*、repo_state_signature の出力）。
# 実行前から M・?? だったスコープ外ファイルの内容・モードだけの上書きや、
# ディレクトリの chmod・ディレクトリ向け symlink の変更・.gitignore 対象ファイルの
# 上書きは porcelain レコードに現れないため、シグネチャ側の不一致だけがそれを
# 検出できる（レコード側は検出時の報告用としても使う）。
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
  if [[ "${LOCAL_PATCH_GUARD}" == true ]]; then
    # 同期前 check の staged 契約変更を残さない(fail-closed 契約)。git clean -fd による
    # 未追跡削除より先に退避を効かせるため revert_in_scope より前に呼ぶ(NPX_STATUS 分岐と同じ)
    restore_contract_scope
  fi
  revert_in_scope
  exit 1
fi

# 成功経路でも既存 ignored ファイル（.DS_Store 等）の変更・削除を実行前バックアップ
# との比較で検査する。許可先配下は署名から除外されるためシグネチャ比較には現れず、
# この比較だけが検出手段になる。変化があればバックアップから復元して警告し、同期
# 自体は継続する（ignored ファイルは同期対象外で、復元すれば成果物に影響しないため）。
# 復元に失敗した場合のみバックアップ dir を保全して非ゼロ終了する（fail-closed）。
if ! restore_preexisting_ignored; then
  IGNORED_BACKUP_KEEP=1
  echo "エラー: 実行前から存在した ignored ファイルの復元に失敗しました。バックアップは ${IGNORED_BACKUP_DIR} に相対パス構造で残っています。手動で復旧してください。" >&2
  if [[ "${LOCAL_PATCH_GUARD}" == true ]]; then
    # 失敗終端では同期前 check の staged 契約変更も残さない(fail-closed 契約。
    # npx の同期結果ごと同期開始前へ戻し、部分状態のまま git add へ進む経路を断つ)
    restore_contract_scope
  fi
  exit 1
fi

echo ""
echo "==> 更新完了。変更内容:"
# install ツリーの上書きも確認するため、skills-lock.json と当該スキルの install ツリー両方を diff する。
# git diff は未追跡ファイルを表示しない。スクリプト冒頭の clean ガード（porcelain）により
# npx 実行前の install ツリーは必ず clean のため、npx が新規作成したファイルは
# 例外なく未追跡になる。tracked diff だけでは upstream 側のファイル増加を一切見せずに
# 承認判断（呼び出し元の git add）へ進んでしまうため、未追跡分を別途列挙・表示する。
git diff -- skills-lock.json ".agents/skills/${SKILL_NAME}/"

# 承認（呼び出し元の git add、-f なし）が新規に取り込む集合、拒否（git clean -fd、-x なし）が
# 削除する集合と同一のもの（.gitignore 対象を除く非追跡ファイル）を列挙し、
# 中身が見えないまま承認 / 拒否のどちらか一方だけが通過する非対称を無くす。
# git ls-files の既定出力は改行区切りのため、ファイル名自体に改行を含む
# 未追跡ファイルがあると 1 パスが複数の存在しないパスへ分割される。分割後の
# 各 git diff は失敗し || true で握り潰される一方、後続の git add は実ファイルを
# そのまま取り込むため、内容を表示しないまま承認できてしまう（-z / NUL 区切りで防ぐ）。
# 未追跡ファイルのプレビュー(列挙 + 内容表示)。引数の pathspec 群を対象に実行する。
# 通常プレビュー(当該スキルのみ)と、local patch guard 時の最終確認(当該スキル +
# scripts/local-patches/)の両方から呼ばれ、同一の表示・fail-closed 挙動を共有する。
# ここで trap を追加登録してはならない(trap は後勝ちのため、冒頭で登録した単一 trap の
# 一時ファイル掃除が丸ごと消える)。UNTRACKED_LIST_FILE は冒頭の mktemp 群で確保済み。
preview_untracked() {
UNTRACKED_COUNT=0
echo ""
# git ls-files をプロセス置換（`< <(...)`）へ直接つなぐと、`set -euo pipefail` は
# その終了コードを検査しない。`git ls-files` が失敗（破損 index・権限エラー等）しても
# while は単に0回実行され UNTRACKED_COUNT=0 のまま「新規（未追跡）ファイル: なし」と
# 誤表示し、実際には存在する未追跡ファイルの内容を確認しないまま呼び出し元が
# git add で承認してしまう（このスクリプトが防ごうとしている非対称そのもの）。
# 通常のコマンド置換で一時ファイルへ書き出し、`if ! ...` で明示的に終了コードを検査する
# ことで fail-closed にする。UNTRACKED_LIST_FILE 自体は npx 実行前のスナップショット
# 取得と同時に mktemp 済み（単一 trap にまとめるため）。2 回目の呼び出しはリダイレクトの
# 上書きで前回分を破棄するため、呼び出しごとの mktemp・rm は不要。
if ! git ls-files -z --others --exclude-standard -- "$@" > "${UNTRACKED_LIST_FILE}"; then
  echo "エラー: git ls-files が失敗し、未追跡ファイルの一覧化を確認できません。内容未確認のまま承認できてしまうため中止します。" >&2
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
  # 確認できないまま承認（git add）だけが通ってしまう非対称を防ぐ。
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
    # --no-index は index を変更しない（git add -N は使わない。呼び出し元の拒否経路が
    # index からの git checkout -- で承認済み他スキルの hash を復元する設計に依存しており、
    # intent-to-add エントリを混入させるとその復元設計と干渉するため）。
    # 差分ありのとき exit 1 を返す仕様のため、表示専用のこの呼び出しに限り || true で
    # set -e の中断を避ける（clean ガード等の fail-closed 判定には影響しない）。
    git diff --no-index -- /dev/null "${f}" || true
  fi
done < "${UNTRACKED_LIST_FILE}"
if [[ "${UNTRACKED_COUNT}" -eq 0 ]]; then
  echo "==> 新規（未追跡）ファイル: なし"
fi
}

preview_untracked ".agents/skills/${SKILL_NAME}/"

if [[ "${LOCAL_PATCH_GUARD}" == true ]]; then
  # 却下・失敗時の復元は「checker 初回実行より前」に取得済みの PRE_SYNC_TREE(同期開始前の
  # index snapshot)を使う。npx 後にここで snapshot を取り直すと、復元先が「raw upstream +
  # 同期前 check の stage」になり、「同期前へ戻す」という契約に反する(local patch が外れた
  # 状態が残る)。restore_contract_scope は契約パス限定の git restore で、この同期
  # (pre-check・npx・apply)で生じた契約範囲の index 変更だけを取り除き、承認済みの
  # 他スキル分にも範囲外 path の index にも触れない

  # ユーザー却下時の復元手順(stdout へ出す。失敗経路は restore_contract_scope が自動復元
  # するため使わない)。PRE_SYNC_TREE は本 process 終了後に環境から消えるため、値そのものを
  # 展開して案内する
  restore_help() {
    echo "同期前へ戻すには(契約パス限定で index + worktree を同期開始前 snapshot へ復元する。範囲外 path の index・worktree には触れない):"
    echo "  git restore --staged --worktree --source=${PRE_SYNC_TREE} -- skills-lock.json"
    echo "  git restore --staged --worktree --source=${PRE_SYNC_TREE} -- \".agents/skills/${SKILL_NAME}/\" 2>/dev/null || true"
    echo "  git restore --staged --worktree --source=${PRE_SYNC_TREE} -- scripts/local-patches/ 2>/dev/null || true"
    echo "  # 契約範囲内に未追跡ファイルが残る場合は、削除前に内容を確認して退避を判断する"
    echo "  # (skills-lock.json は checker による未追跡化があり得るため含める):"
    echo "  git ls-files --others --exclude-standard -- skills-lock.json \".agents/skills/${SKILL_NAME}/\" scripts/local-patches/"
    echo "  # 復元後は契約範囲が同期開始前 snapshot と一致し未追跡も無いことを確認する"
    echo "  # (基準は HEAD ではなく snapshot。git status だと同期前からの正当な staged 変更が誤検出される):"
    echo "  git diff --cached ${PRE_SYNC_TREE} -- skills-lock.json \".agents/skills/${SKILL_NAME}/\" scripts/local-patches/  # 空出力が成功"
    echo "  git diff ${PRE_SYNC_TREE} -- skills-lock.json \".agents/skills/${SKILL_NAME}/\" scripts/local-patches/  # 空出力が成功"
    echo "  git ls-files --others --exclude-standard -- skills-lock.json \".agents/skills/${SKILL_NAME}/\" scripts/local-patches/  # 空出力が成功"
  }

  echo ""
  echo "==> local patch を再適用(--3way fallback や index 復元により対象 file・durable patch が stage されることがある)"
  apply_rc=0
  bash "${CHECKER_EXEC}" apply || apply_rc=$?
  if ! verify_outside_and_checker; then
    # 範囲外の破壊は上の案内どおり手動復旧として残しつつ、契約範囲(部分適用された patch・
    # checker 由来の index 変更)は自動復元してから終了する(「すべての失敗経路で同期開始前へ
    # 戻す」契約。以下の 3 失敗分岐も同じ)
    restore_contract_scope
    exit 1
  fi
  if [[ "${apply_rc}" -ne 0 ]]; then
    echo "エラー: local patch の再適用に失敗しました。stage・commit へ進まないでください(fail-closed)。" >&2
    restore_contract_scope
    exit 1
  fi
  echo ""
  echo "==> 再適用後の最終検証"
  check_rc=0
  bash "${CHECKER_EXEC}" || check_rc=$?
  if ! verify_outside_and_checker; then
    restore_contract_scope
    exit 1
  fi
  if [[ "${check_rc}" -ne 0 ]]; then
    echo "エラー: 再適用後の最終検証に失敗しました。stage・commit へ進まないでください(fail-closed)。" >&2
    restore_contract_scope
    exit 1
  fi

  echo ""
  echo "==> 更新完了。commit 候補の最終差分(upstream 更新 + local patch 再適用。durable patch を含む):"
  git diff HEAD -- skills-lock.json ".agents/skills/${SKILL_NAME}/" scripts/local-patches/
  echo ""
  echo "==> 契約範囲内の未追跡ファイル(git diff HEAD には表示されない。apply が新規作成した durable patch 等を含めて内容まで提示する):"
  preview_untracked ".agents/skills/${SKILL_NAME}/" scripts/local-patches/
  echo ""
  echo "却下する場合(当該スキルと durable patch を同期前へ戻す。他スキルの stage 済み変更には影響しない):"
  restore_help
fi

echo ""
echo "コミットするには:"
echo "  git add skills-lock.json"
echo "  git add .agents/skills/${SKILL_NAME}/  # 上記の未追跡ファイルもここで取り込まれる"
if [[ "${LOCAL_PATCH_GUARD}" == true && -d scripts/local-patches/ ]]; then
  echo "  git add scripts/local-patches/  # 承認対象に含めた durable patch の変更も同じ承認単位で stage する"
fi
echo "  git commit -m 'chore(skills-lock): ${SKILL_NAME} の computedHash を upstream と同期'"
