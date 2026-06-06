# Setup

driver.js インスタンスの初期化と基本的なセットアップ。

## 単一要素のハイライト

```js
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const driverObj = driver();
driverObj.highlight({
  element: '#some-element',
  popover: {
    title: 'Title for the Popover',
    description: 'Description for it',
  },
});
```

## プロダクトツアーの作成と開始

```js
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const driverObj = driver({
  showProgress: true,
  steps: [
    { element: '.page-header', popover: { title: 'Title', description: 'Description' } },
    { element: '.top-nav', popover: { title: 'Title', description: 'Description' } },
    { element: '.sidebar', popover: { title: 'Title', description: 'Description' } },
    { element: '.footer', popover: { title: 'Title', description: 'Description' } },
  ]
});

driverObj.drive();
```

## 特定ステップからツアーを開始

```js
driverObj.drive(2); // ステップインデックス 2 から開始
```

## ステップを動的に設定してからツアー開始

```js
driverObj.setSteps([
  { element: '.step-one', popover: { title: 'Step 1', description: 'First step' } },
  { element: '.step-two', popover: { title: 'Step 2', description: 'Second step' } },
]);
driverObj.drive();
```
