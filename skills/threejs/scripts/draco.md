# Draco

Draco コンプレッサー用デコーダーのセットアップと DRACOLoader の設定

## デコーダーファイルを public ディレクトリにコピー

```sh
cp -r node_modules/three/examples/jsm/libs/draco/ public/draco/
```

`public/draco/` に配置することで、Vite 開発サーバーおよびビルド後の本番環境から `/draco/` としてアクセスできる。

## DRACOLoader のセットアップ（ローカルデコーダー使用）

```js
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');
```

## DRACOLoader のセットアップ（CDN デコーダー使用）

```js
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.4.3/');
```

## GLTFLoader と組み合わせた使用例

```js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/examples/jsm/libs/draco/');
loader.setDRACOLoader(dracoLoader);

const gltf = await loader.loadAsync('models/gltf/duck/duck.gltf');
scene.add(gltf.scene);
```

`KHR_draco_mesh_compression` 拡張で圧縮された glTF アセットをデコードするには `setDRACOLoader()` が必要。

## DRACOLoader 単体での .drc ファイル読み込み

```js
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

const loader = new DRACOLoader();
loader.setDecoderPath('/examples/jsm/libs/draco/');
const geometry = await loader.loadAsync('models/draco/bunny.drc');
geometry.computeVertexNormals(); // 法線が含まれない場合に計算
loader.dispose();
```

## リソースの解放

```js
dracoLoader.dispose();
```

デコーダーの使用終了後に呼び出す。
