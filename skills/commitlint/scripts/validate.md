# validate

コミットメッセージの動作確認とテスト。

## commitlint の動作確認（npm）

```sh
npx commitlint --from HEAD~1 --to HEAD --verbose
```

## commitlint の動作確認（yarn）

```sh
yarn commitlint --from HEAD~1 --to HEAD --verbose
```

## commitlint の動作確認（pnpm）

```sh
pnpm commitlint --from HEAD~1 --to HEAD --verbose
```

## commitlint の動作確認（bun）

```sh
bun commitlint --from HEAD~1 --to HEAD --verbose
```

## バージョン情報の確認（CI でのデバッグ用）

```sh
git --version
node --version
npm --version
npx commitlint --version
```

## フックの動作確認: 失敗するコミットの例

```sh
git commit -m "foo: this will fail"
```

`type-enum` ルール違反でコミットが拒否される。

## フックの動作確認: 成功するコミットの例

```sh
git commit -m "chore: lint on commitmsg"
```

問題がない場合は出力なしで成功する。確認のための出力が必要な場合は `--verbose` フラグを使用する。

## CircleCI での最後のコミットを検証

```sh
echo "$COMMIT_MESSAGE" | npx commitlint
```

`COMMIT_MESSAGE` は `git log -1 --pretty=format:"%s"` で取得した値を使用する。

## Codemagic での検証

```sh
npx commitlint --from=HEAD~1
```
