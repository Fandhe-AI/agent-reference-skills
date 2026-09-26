// preview-sample --apply の書き込み処理。全件か無しかで書き込み、途中で失敗したらこの実行の
// 書き込みを巻き戻す。書き込む内容・前提（既存ファイルのハッシュ）は呼び出し元が承認済み計画と
// 照合済みのものを受け取り、ここでは各ファイルの書き込み直前にもう一度だけ前提を確かめる
// （照合から書き込みまでの間に対象が変わった場合に、承認時と異なる内容を上書き・削除しないため）。
import { createHash } from "node:crypto";
import { existsSync, readFileSync, mkdirSync, writeFileSync, statSync, lstatSync, chmodSync, rmSync, rmdirSync } from "node:fs";
import { dirname } from "node:path";
import { isWithinRoot, isSymlink } from "./paths.mjs";

// 書き込み直前の安全確認で止めた場合の例外（メッセージは固定文で値を含まないため結果へ載せる）
export class ApplyGuardError extends Error {}

function sha256Of(buf) {
  return `sha256:${createHash("sha256").update(buf).digest("hex")}`;
}

// symlink を辿らずにエントリの有無を判定する（壊れた symlink も「存在する」として扱う）
function lexists(p) {
  try {
    lstatSync(p);
    return true;
  } catch {
    return false;
  }
}

// dir から root までの間で存在しないディレクトリを、浅い順に返す（root 自体は含めない）
function missingAncestors(root, dir) {
  const missing = [];
  for (let d = dir; d !== root && d !== dirname(d) && !lexists(d); d = dirname(d)) {
    missing.unshift(d);
  }
  return missing;
}

/**
 * dest の親パスのうち既存のものがすべてディレクトリか（途中にファイル・壊れた symlink 等があると書き込めない）。
 * symlink は lstat で検出し、リンク先がディレクトリとして解決できない場合も書き込めないものとして扱う。
 */
export function parentsAreDirectories(root, dest) {
  for (let d = dirname(dest); d !== root && d !== dirname(d); d = dirname(d)) {
    if (!lexists(d)) continue;
    try {
      if (!statSync(d).isDirectory()) return false;
    } catch {
      return false;
    }
  }
  return true;
}

/**
 * toWrite を順に書き込む。途中で 1 件でも失敗したら以降は書き込まず、この実行で作成したファイル・
 * ディレクトリを削除し、上書きしたファイルを元の内容と mode に戻す（一部だけ導入された状態を残さない）。
 * - 上書き（expectedHash あり）: 書き込み直前に現在の内容の sha256 が expectedHash と一致することを確認する
 * - 新規作成（expectedHash なし）: 排他的に作成する（直前に同名ファイルが現れていれば上書きも削除もしない）
 * @param {string} root 対象 root（実体パス）
 * @param {Array<{dest:string, rel:string, data:Buffer, mode:number, expectedHash?:string}>} toWrite
 * @param {string[]} applied 成功時に書き込んだ相対パスを積む（失敗時は空にする）
 * @returns {null | {rel:string, detail:string}} 失敗時の対象と理由
 */
export function writeAll(root, toWrite, applied) {
  const created = [];
  const overwritten = [];
  const createdDirs = [];
  for (const w of toWrite) {
    try {
      // プレビュー時点から親ディレクトリが差し替えられた場合に備え、mkdir の前後で実体を確認する
      // （mkdir 前の確認がないと、root 外への symlink 越しにディレクトリを作成してしまう）
      if (!isWithinRoot(root, w.dest) || isSymlink(w.dest)) {
        throw new ApplyGuardError("書き込み直前の確認で root 外への逸脱を検出しました");
      }
      // recursive mkdir は途中で失敗すると作成済みの祖先を返さないため、存在しない祖先を浅い方から
      // 1 段ずつ作成し、作成した直後に記録する（失敗時にも巻き戻し対象から漏れない）
      for (const d of missingAncestors(root, dirname(w.dest))) {
        mkdirSync(d);
        createdDirs.push(d);
      }
      if (!isWithinRoot(root, w.dest) || isSymlink(w.dest)) {
        throw new ApplyGuardError("書き込み直前の確認で root 外への逸脱を検出しました");
      }
      // サンプルの実行権限（scripts/*.sh 等）を導入先へ引き継ぐ。新規作成は元ファイルの mode
      // （umask 適用後）で作り、上書き時は既存の mode に実行ビットだけを加える
      if (w.expectedHash !== undefined) {
        if (!existsSync(w.dest)) {
          throw new ApplyGuardError("書き込み直前の確認で上書き対象の既存ファイルが見つかりません（承認時から変わっています）");
        }
        const original = readFileSync(w.dest);
        if (sha256Of(original) !== w.expectedHash) {
          throw new ApplyGuardError("書き込み直前の確認で既存ファイルの内容が承認時の contentHash と異なります（上書きしません）");
        }
        const originalMode = statSync(w.dest).mode & 0o7777;
        overwritten.push({ dest: w.dest, original, mode: originalMode });
        writeFileSync(w.dest, w.data);
        chmodSync(w.dest, originalMode | (w.mode & 0o111));
      } else {
        try {
          writeFileSync(w.dest, w.data, { mode: w.mode, flag: "wx" });
        } catch (err) {
          if (err.code === "EEXIST") {
            throw new ApplyGuardError("書き込み直前の確認で新規作成するはずのファイルが既に存在します（上書きしません）");
          }
          // wx で作成済みの場合に途中で失敗したファイルは、この実行が作ったものなので巻き戻しで消す
          if (existsSync(w.dest)) created.push(w.dest);
          throw err;
        }
        created.push(w.dest);
      }
      applied.push(w.rel);
    } catch (err) {
      const why = err instanceof ApplyGuardError ? err.message : `書き込みに失敗しました（${err.code ?? "UNKNOWN"}）`;
      const rollbackErrors = rollback(created, overwritten, createdDirs);
      applied.length = 0;
      const tail = rollbackErrors.length === 0
        ? "この実行で書き込んだファイルは元に戻しました"
        : `元に戻せなかったファイルがあります（手動で確認してください）: ${rollbackErrors.join(", ")}`;
      return { rel: w.rel, detail: `${why}。${tail}` };
    }
  }
  return null;
}

function rollback(created, overwritten, createdDirs) {
  const errors = [];
  for (const p of created) {
    try {
      rmSync(p, { force: true });
    } catch (err) {
      errors.push(`${p} (${err.code ?? "UNKNOWN"})`);
    }
  }
  for (const o of overwritten) {
    try {
      writeFileSync(o.dest, o.original);
      chmodSync(o.dest, o.mode);
    } catch (err) {
      errors.push(`${o.dest} (${err.code ?? "UNKNOWN"})`);
    }
  }
  // mkdir で新規作成したディレクトリは、空であれば削除する（深い方から）
  for (const d of [...createdDirs].sort((a, b) => b.length - a.length)) {
    try {
      rmdirSync(d);
    } catch {
      // 他のファイルが残っている等で空でない場合は残す（中身は上で削除・復元済み）
    }
  }
  return errors;
}
