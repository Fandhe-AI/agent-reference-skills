# API

driverObj / Hints / Checklist インスタンスで使用できるメソッドの実行例。

## パッケージのインストール

```sh
npm install driver.js
```

以降の JS コードは、インストール済みの driver.js を import して実行する。

## ツアーのナビゲーション操作

```js
driverObj.drive();          // ツアーを最初のステップから開始
driverObj.moveNext();       // 次のステップへ移動
driverObj.movePrevious();   // 前のステップへ移動
driverObj.moveTo(2);        // 指定インデックスのステップへジャンプ
```

## ステップ状態の確認

```js
driverObj.hasNextStep();      // 次のステップが存在するか確認
driverObj.hasPreviousStep();  // 前のステップが存在するか確認
driverObj.isFirstStep();      // 現在が最初のステップか確認
driverObj.isLastStep();       // 現在が最後のステップか確認
driverObj.isActive();         // ツアーまたはハイライトが動作中か確認
```

## 現在の状態の取得

```js
driverObj.getActiveIndex();    // 現在のステップインデックスを取得
driverObj.getActiveStep();     // 現在のステップ設定を取得
driverObj.getActiveElement();  // 現在ハイライト中の HTML 要素を取得
driverObj.getPreviousStep();   // 前のステップ設定を取得
driverObj.getNextStep();       // 次のステップ設定を取得
driverObj.getPreviousElement(); // 前にハイライトしていた HTML 要素を取得
driverObj.getState();          // 現在の State オブジェクトを取得
```

## 設定の取得・変更

```js
driverObj.getConfig();          // 現在の設定を取得
driverObj.setConfig({ smoothScroll: true }); // 設定を動的に変更
driverObj.setSteps(steps);      // ツアーのステップを再定義
```

## ハイライトのリフレッシュと終了

```js
driverObj.refresh();   // ハイライトを再計算して再描画（レイアウト変更後に使用）
driverObj.destroy();   // ツアーインスタンスを終了して後片付けを実行
```

各 `driver()` 呼び出しは独立したインスタンスを返す。同時に画面に出せるのは 1 インスタンスのみで、別インスタンスのツアーやハイライトを開始すると、動作中のインスタンスは閉じられる。

## Hints インスタンスの操作

```js
import { hints } from "driver.js/hints";
import "driver.js/dist/hints.css";

const productHints = hints({
  /* ... */
});

// ビーコンを表示（再呼び出しで、後から現れた要素のヒントも反映）
productHints.show();
// ビーコンとリスナーを削除（show() で復帰）
productHints.hide();

// ヒントは `id`、id 未設定時は配列インデックスで指定する
productHints.open("export");       // ヒントのポップオーバーを開く
productHints.close();              // 開いているポップオーバーを閉じる（ビーコンは残す）
productHints.dismiss("export");    // ビーコンを削除して onDismiss を発火
productHints.restore("export");    // dismiss したヒントを復帰
productHints.restoreAll();         // dismiss した全ヒントを復帰

productHints.setHints([
  /* ... */
]);                                // ヒントを置換（dismiss 状態はリセット）
productHints.getHints();           // 設定済みのヒントを取得
productHints.getActive();          // ポップオーバーが開いているヒントを取得（なければ該当なし）

productHints.isVisible();          // ビーコンが表示中か確認

// レイアウト変更後にビーコン・ポップオーバー・オーバーレイを再配置
productHints.refresh();
```

各 `hints()` 呼び出しは独立しており、他のインスタンスや実行中のツアーに影響しない。

## Checklist インスタンスの操作

```js
import { checklist } from "driver.js/checklist";
import "driver.js/dist/driver.css";
import "driver.js/dist/checklist.css";

const onboarding = checklist({
  /* ... */
});

// ランチャーをページに追加。hide() でウィジェットを削除
onboarding.show();
onboarding.hide();

onboarding.open();     // パネルを開く
onboarding.close();    // パネルを閉じる（ランチャーは残す）
onboarding.toggle();   // パネルの開閉を切り替え

// 項目は `id` で指定する
onboarding.start("tour");         // 項目のツアー・リンク・アクションを実行
onboarding.complete("github");    // 項目を完了にする
onboarding.uncomplete("github");  // 項目の完了を解除
onboarding.reset();               // 全項目の完了を解除

// 各項目の completeWhen を再評価
onboarding.refresh();

onboarding.getProgress();  // { completed: ["tour"], done: 1, total: 4 }
onboarding.getItems();     // 設定済みの項目を取得

onboarding.isVisible();    // ウィジェットがページ上にあるか確認
onboarding.isOpen();       // パネルが開いているか確認
```

Checklist から開始したツアーは通常のツアーと同様に動作し、動作中のツアーは閉じられる。完了済みの項目も再クリックでツアーを再実行できる。
