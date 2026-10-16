# GitHub Actions -- 制限 (limits)

GitHub Actions のシステム制限・ストレージ・ジョブ同時実行数・レート制限のリファレンス。

公式ドキュメント: https://docs.github.com/en/actions/reference/limits

---

## 概要

スケールに応じて到達する制限がある。一部は GitHub Support への問い合わせで引き上げ可能。特に記載がない限り、制限到達時はワークフロー / ジョブが取り消される。制限は変更されうる。

```yaml
# 制限回避の例: 500 KB を超える workflow ファイルは共有ロジックを reusable workflow / composite action へ移す
jobs:
  call:
    uses: ./.github/workflows/shared.yml
```

---

## システム制限

| カテゴリ | 制限 | しきい値 | 説明 | Support による引き上げ |
|---|---|---|---|---|
| Workflow execution | Workflow run time | 35 days / run | 超過で取り消し。実行時間・待機・承認時間を含む | 不可 |
| Workflow execution | Gate approval time | 30 days | environment 承認の待機上限 | 不可 |
| Workflow execution | Job Matrix | 256 jobs / run | GitHub-hosted / self-hosted 両方に適用 | 不可 |
| Workflow execution | Re-run | 50 re-runs | 全体 / 一部ジョブの再実行を合算 | 可（Support ticket） |
| Workflow file | Workflow file size | 500 KB / file | 超過するとランが開始されない | 不可 |
| Checks | Check runs per check suite | 50,000 / suite | Checks API と Actions の両方に適用。到達後は追加不可 | 可（Support ticket） |
| Workflows queuing | Workflow trigger event rate | 1500 events / 10 秒 / repository | イベントによるランのトリガー | 可（Support ticket） |
| Workflows queuing | Workflow run queued | 500 runs / 10 秒 | 到達時は webhook によるランがブロックされキューされない。reusable workflow は 1 件として数える | 不可 |
| Workflows queuing | Concurrency group queue | 100 runs / group | `queue: max` 使用時。超過分は拒否 | 不可 |
| Self-hosted | Runner registrations | 1500 runners / 5 分 / repo・org・enterprise | | 可（Support ticket） |
| Self-hosted | Runners per runner group | 10,000 | | 不可 |
| Self-hosted | Job execution time | 5 days | 超過でジョブ終了・失敗 | 不可 |
| Self-hosted | Job queue time | 24 hours | 超過で自動取り消し | 不可 |
| All GitHub-hosted | Job Concurrency | プランにより異なる | 下表参照 | 可（Support ticket） |
| All GitHub-hosted | Job execution time | 6 hours | 超過でジョブ終了・失敗 | 不可 |
| All GitHub-hosted | Storage limits | プランにより異なる | 下表参照 | 不可 |
| Larger runners | Per runner concurrency | runner 種別により異なる | 通常 Linux CPU runner で最大 1,000 | 可（Support ticket） |
| Larger runners | Static IP limits | 10 IPs | enterprise / organization あたり | 可（Support ticket） |
| Larger runners | Private IP scaling (vnet injection) | 30% buffer | 想定最大同時実行数にバッファが必要 | Azure virtual network で設定 |
| Dependency caching | Uploads | 200 / 分 / repository | 超過時は次のリセットまでアップロード失敗 | 不可 |
| Dependency caching | Downloads | 1500 / 分 / repository | 超過時は次のリセットまでダウンロード失敗 | 不可 |
| Dependency caching | Deletes | 400 / 分 / repository | キー指定 / ID 指定の各削除リクエストが対象 | 不可 |

---

## GitHub-hosted runner のジョブ同時実行数

Support が引き上げ可能（support ticket）。

| Runner type | Plan | Total concurrent jobs | Max concurrent macOS jobs | Max concurrent GPU jobs |
|---|---|---|---|---|
| Standard | Free | 20 | 5 | N/A |
| Standard | Pro | 40 | 5 | N/A |
| Standard | Team | 60 | 5 | N/A |
| Standard | Enterprise | 500 | 50 | N/A |
| Larger runner | Team | 1000 | 5 | 100 |
| Larger runner | Enterprise | 1000 | 50 | 100 |

macOS の最大同時実行数は standard と larger runner で共有される。

## ストレージ制限（GitHub-hosted runner）

Support による引き上げ不可。

| Plan | Artifact storage | Minutes (per month) | Cache storage (per repository) | Custom image storage |
|---|---|---|---|---|
| GitHub Free | 500 MB | 2,000 | 10 GB | N/A |
| GitHub Pro | 1 GB | 3,000 | 10 GB | N/A |
| GitHub Free for organizations | 500 MB | 2,000 | 10 GB | N/A |
| GitHub Team | 2 GB | 3,000 | 10 GB | 75 GB |
| GitHub Enterprise Cloud | 50 GB | 50,000 | 10 GB | 150 GB |

## vnet injection のプライベート IP

想定する最大ジョブ同時実行数にバッファを加える。例: 最大 300 なら 390 runner 以上を収容できるサブネット。Azure は各サブネットで 5 IP（先頭 4 と末尾 1）を予約するため、/29 以下のごく小さなサブネットでは不足しうる。

---

## 依存サービスのレート制限

GitHub の REST API レート制限が Actions にも適用される。

- 未認証: 60 requests / 時間（IP 単位）
- 認証ユーザー（PAT / GitHub App / OAuth app 経由含む）: 5,000 requests / 時間。GitHub Enterprise Cloud 組織所有の GitHub App / OAuth app 経由は 15,000 requests / 時間
- GitHub App installation: 最低 5,000 requests / 時間（GHEC 上は 15,000）。非 GHEC では 20 リポジトリ超で 1 リポジトリごとに +50、20 ユーザー超で 1 ユーザーごとに +50、上限 12,500 requests / 時間
- OAuth app: 5,000 requests / 時間 / app（GHEC 所有は 15,000）
- `GITHUB_TOKEN`: 1,000 requests / 時間 / repository（GHEC アカウントのリソースは 15,000 requests / 時間 / repository）
- セカンダリレート制限が別途あり、GHEC では設定変更不可

### Docker Hub

- GitHub-hosted runner の public image pull: レート制限は適用されない
- GitHub-hosted runner の private image pull: 適用される
- self-hosted runner の public / private image pull: 常に適用される

---

## Notes

- 制限値は公式により変更されうる。

## Related

- [caching.md](./caching.md)
- [artifacts.md](./artifacts.md)
- [runners.md](./runners.md)
- [concurrency.md](./concurrency.md)
