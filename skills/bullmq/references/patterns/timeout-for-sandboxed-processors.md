# Timeout for Sandboxed Processors

サンドボックスプロセッサ（各ジョブが別プロセスで実行される）での TTL（Time-To-Live）メカニズムの実装パターン。ソフトキルとハードキルの2段階タイムアウトを提供する。

## 基本的な使い方

```typescript
// 30秒でタイムアウト
const MAX_TTL = 30_000;

// クリーンアップのタイムアウトは5秒
const CLEANUP_TTL = 5_000;

// TTL 用のカスタム終了コード（Unix 制限により256未満）
const TTL_EXIT_CODE = 10;

module.exports = async function (job) {
  let hasCompleted = false;
  const hardKillTimeout = setTimeout(() => {
    if (!hasCompleted) {
      process.exit(TTL_EXIT_CODE);
    }
  }, MAX_TTL);

  const softKillTimeout = setTimeout(async () => {
    if (!hasCompleted) {
      await doCleanup(job);
    }
  }, CLEANUP_TTL);

  try {
    // CPU 集約的な処理が NodeJS ループを完全にブロックすると
    // タイムアウトはトリガーされない
    await doAsyncWork(job);
    hasCompleted = true;
  } finally {
    // プロセスは再利用されるため、返す前にタイムアウトをクリアする
    clearTimeout(hardKillTimeout);
    clearTimeout(softKillTimeout);
  }
};

const doAsyncWork = async job => {
  // 長時間実行される操作のシミュレーション
  await new Promise(resolve => setTimeout(resolve, 10000));
};

const doCleanup = async job => {
  // クリーンアップ操作のシミュレーション
  await job.updateProgress(50);
};
```

## 注意点

- プロセスの強制終了は意図しない結果を招く可能性がある（ファイル書き込み中の破損など）。これは NodeJS の非同期イベントループベースのランタイムで実現できる最善の方法
- 2段階タイムアウト: ソフトキル（クリーンアップ実行）→ ハードキル（`process.exit`）の順で実行
- 無限ループで NodeJS イベントループがブロックされている場合、TTL タイムアウトは呼び出されない
- `hasCompleted` フラグにより、非同期処理完了とタイムアウト発火が同時に起きるエッジケースをカバー
- デバッグ時は戦略的な箇所にログを配置して、TTL 超過時にジョブがどこでスタックしているかを確認する

## 関連

- [./timeout-jobs.md](./timeout-jobs.md)
- [./stop-retrying-jobs.md](./stop-retrying-jobs.md)
