// skills-contribute.sh のコピー前 clean 検査（イシュー #546）の回帰テスト。
//
// 役割: 対象スキル配下の未コミット変更・未追跡・ignore 対象ファイルが、事前レビューに
// 現れないまま upstream PR へ混入しないことを固定する。強制点はスクリプト側であり、
// 検出時に `gh repo clone` へ到達しない（gh スタブが呼ばれない）ことで中止を判定する。
// 特に status.showUntrackedFiles=no 設定下でも未追跡を検出すること（フラグ省略への退行）と、
// git リポジトリ外で clean と誤判定しないこと（fail-closed）を固定する。
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import {
  mkdtempSync, mkdirSync, writeFileSync, rmSync, existsSync, readFileSync, chmodSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT = join(dirname(fileURLToPath(import.meta.url)), '..', 'scripts', 'skills-contribute.sh');
const SECRET = 'TOPSECRET_VALUE_12345';

function gitEnv(root, extra = {}) {
  const env = { ...process.env };
  delete env.GIT_DIR;
  delete env.GIT_WORK_TREE;
  delete env.GIT_INDEX_FILE;
  return {
    ...env,
    GIT_CONFIG_GLOBAL: '/dev/null',
    GIT_CONFIG_NOSYSTEM: '1',
    GIT_CEILING_DIRECTORIES: root,
    TMPDIR: join(root, 'tmp'),
    ...extra,
  };
}

function git(cwd, root, ...args) {
  const r = spawnSync(
    'git',
    ['-c', 'user.name=t', '-c', 'user.email=t@example.com', '-c', 'commit.gpgsign=false', ...args],
    { cwd, env: gitEnv(root), encoding: 'utf8' },
  );
  assert.equal(r.status, 0, `git ${args.join(' ')} failed: ${r.stderr}`);
  return r;
}

// mode: 'reject' = 呼び出しを記録して exit 1 / 'clone' = clone を模倣
function setup({ asRepo = true } = {}) {
  const root = mkdtempSync(join(tmpdir(), 'clean-gate-'));
  const work = join(root, 'work');
  const bin = join(root, 'bin');
  mkdirSync(join(root, 'tmp'), { mode: 0o700 });
  mkdirSync(join(work, 'skills', 'foo'), { recursive: true });
  mkdirSync(join(work, 'other'), { recursive: true });
  mkdirSync(bin);
  writeFileSync(join(work, 'skills', 'foo', 'SKILL.md'), '# foo\n');
  writeFileSync(join(work, 'other', 'x'), 'x\n');
  writeFileSync(join(work, '.gitignore'), 'skills/foo/.env\n');
  writeFileSync(
    join(work, 'skills-lock.json'),
    JSON.stringify({ skills: { foo: { source: 'Fandhe-AI/agent-cli-skills', sourceType: 'github' } } }),
  );
  if (asRepo) {
    git(work, root, 'init', '-q');
    git(work, root, 'add', '-A');
    git(work, root, 'commit', '-q', '-m', 'init');
  }
  const log = join(root, 'gh.log');
  const late = join(root, 'late-target');
  writeFileSync(
    join(bin, 'gh'),
    [
      '#!/usr/bin/env bash',
      `echo "$@" >> "${log}"`,
      'if [[ "$1 $2" == "repo clone" && "${GH_STUB_MODE:-reject}" == "clone" ]]; then',
      '  git init -q "$4"',
      '  if [[ -n "${GH_STUB_LATE_FILE:-}" ]]; then echo late > "${GH_STUB_LATE_FILE}"; fi',
      '  exit 0',
      'fi',
      'exit 1',
      '',
    ].join('\n'),
  );
  chmodSync(join(bin, 'gh'), 0o755);
  return { root, work, bin, log, late };
}

function run(ctx, extraEnv = {}) {
  const r = spawnSync('bash', [SCRIPT, 'foo', 'Fandhe-AI/agent-cli-skills'], {
    cwd: ctx.work,
    env: gitEnv(ctx.root, { PATH: `${ctx.bin}:${process.env.PATH}`, ...extraEnv }),
    encoding: 'utf8',
  });
  return {
    status: r.status,
    stdout: r.stdout,
    stderr: r.stderr,
    ghCalled: existsSync(ctx.log) && readFileSync(ctx.log, 'utf8').trim() !== '',
  };
}

function withCtx(opts, fn) {
  const ctx = setup(opts);
  try {
    return fn(ctx);
  } finally {
    rmSync(ctx.root, { recursive: true, force: true });
  }
}

// #547 のテストが禁止する文字列を、検査のエラーメッセージに含めない
function assertNoLockWording(stderr) {
  for (const w of ['skills-lock.json', 'source がありません', '一致しません', 'sourceType']) {
    assert.ok(!stderr.includes(w), `stderr に禁止文字列 ${w} が含まれる: ${stderr}`);
  }
}

function assertBlocked(res, pathPart) {
  assert.notEqual(res.status, 0);
  assert.equal(res.ghCalled, false, 'clone に到達してはならない');
  assert.ok(res.stderr.includes(pathPart), `stderr にパスが無い: ${res.stderr}`);
  assertNoLockWording(res.stderr);
}

test('1: clean なら反映まで進む', () => {
  withCtx({}, (ctx) => {
    const res = run(ctx, { GH_STUB_MODE: 'clone' });
    assert.equal(res.status, 0, res.stderr);
    assert.ok(res.stdout.includes('CONTRIBUTE_SKILL_UPSTREAM_PATH=skills/foo'));
    const dir = res.stdout.match(/CONTRIBUTE_SKILL_WORKDIR=(.+)/)[1];
    assert.ok(existsSync(join(dir, 'skills', 'foo', 'SKILL.md')));
  });
});

test('2: 対象外だけ dirty でも中止しない', () => {
  withCtx({}, (ctx) => {
    writeFileSync(join(ctx.work, 'other', 'y'), 'y\n');
    writeFileSync(join(ctx.work, 'other', 'x'), 'changed\n');
    const res = run(ctx);
    assert.equal(res.ghCalled, true);
  });
});

test('3: 追跡ファイルの unstaged 変更を検出する', () => {
  withCtx({}, (ctx) => {
    writeFileSync(join(ctx.work, 'skills', 'foo', 'SKILL.md'), '# changed\n');
    assertBlocked(run(ctx), 'skills/foo/SKILL.md');
  });
});

test('4: staged 済み未コミット変更を検出する', () => {
  withCtx({}, (ctx) => {
    writeFileSync(join(ctx.work, 'skills', 'foo', 'SKILL.md'), '# staged\n');
    git(ctx.work, ctx.root, 'add', 'skills/foo/SKILL.md');
    assertBlocked(run(ctx), 'skills/foo/SKILL.md');
  });
});

test('5: 未追跡ファイルを検出する', () => {
  withCtx({}, (ctx) => {
    writeFileSync(join(ctx.work, 'skills', 'foo', 'new.txt'), 'n\n');
    const res = run(ctx);
    assertBlocked(res, 'skills/foo/new.txt');
    assert.ok(res.stderr.includes('??'));
  });
});

test('6: 作業ツリーからの削除を検出する', () => {
  withCtx({}, (ctx) => {
    rmSync(join(ctx.work, 'skills', 'foo', 'SKILL.md'));
    assertBlocked(run(ctx), 'skills/foo/SKILL.md');
  });
});

test('7: ignore 対象ファイルを検出し、内容は出力しない', () => {
  withCtx({}, (ctx) => {
    writeFileSync(join(ctx.work, 'skills', 'foo', '.env'), `TOKEN=${SECRET}\n`);
    const res = run(ctx);
    assertBlocked(res, 'skills/foo/.env');
    assert.ok(res.stderr.includes('!!'));
    assert.ok(!res.stderr.includes(SECRET));
    assert.ok(!res.stdout.includes(SECRET));
  });
});

test('8: status.showUntrackedFiles=no 設定下でも未追跡を検出する', () => {
  withCtx({}, (ctx) => {
    git(ctx.work, ctx.root, 'config', '--local', 'status.showUntrackedFiles', 'no');
    writeFileSync(join(ctx.work, 'skills', 'foo', 'new.txt'), 'n\n');
    assertBlocked(run(ctx), 'skills/foo/new.txt');
  });
});

test('9: git リポジトリ外は clean と扱わず中止する（fail-closed）', () => {
  withCtx({ asRepo: false }, (ctx) => {
    const res = run(ctx);
    assert.notEqual(res.status, 0);
    assert.equal(res.ghCalled, false);
    assert.ok(res.stdout.includes('==> contribute-skill: foo'));
    assert.ok(res.stderr.includes('確認できません'));
  });
});

test('10: clone 中に出現した変更を再検査で検出し、コピーしない', () => {
  withCtx({}, (ctx) => {
    const lateFile = join(ctx.work, 'skills', 'foo', 'late.txt');
    const res = run(ctx, { GH_STUB_MODE: 'clone', GH_STUB_LATE_FILE: lateFile });
    assert.notEqual(res.status, 0);
    assert.ok(res.ghCalled, 'clone までは到達する');
    assert.ok(res.stderr.includes('skills/foo/late.txt'));
    assert.ok(!res.stdout.includes('CONTRIBUTE_SKILL_UPSTREAM_PATH='));
  });
});
