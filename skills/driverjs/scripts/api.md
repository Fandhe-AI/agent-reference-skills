# API

driverObj インスタンスで使用できるメソッドの実行例。

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
