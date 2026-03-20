# Misc Examples

## Download Image

`html-to-image` ライブラリを使って React Flow ダイアグラムを PNG 画像としてエクスポートする。

### コード例

```tsx
import { toPng } from 'html-to-image';
import { getNodesBounds, getViewportForBounds, useReactFlow } from '@xyflow/react';

function DownloadButton() {
  const { getNodes } = useReactFlow();

  function onClick() {
    const nodesBounds = getNodesBounds(getNodes());
    const viewport = getViewportForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      0.5,  // minZoom
      2     // maxZoom
    );

    toPng(document.querySelector('.react-flow__viewport'), {
      backgroundColor: '#1a365d',
      width: imageWidth,
      height: imageHeight,
      style: {
        transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
      },
    }).then(downloadImage);
  }

  return (
    <Panel position="top-right">
      <button onClick={onClick}>Download Image</button>
    </Panel>
  );
}
```

### ポイント

- `html-to-image` は **バージョン 1.11.11 に固定**する。新しいバージョンには既知の画像エクスポートの問題がある
- `getNodesBounds()` で全ノードのバウンディングボックスを計算する
- `getViewportForBounds()` でノード全体が収まる最適なビューポート変換を計算
- `.react-flow__viewport` 要素に計算したトランスフォームを適用して画像化する
- ダウンロードボタンは `<Panel>` コンポーネントに配置する

---

## Server Side Image Creation

サーバーサイドで React Flow グラフの静的画像を生成する。Puppeteer で React Flow を SSR してスクリーンショットを撮る。

### ポイント

- React Flow v12 以降で利用可能なサーバーサイドレンダリング機能を使用
- **技術スタック**:
  - バックエンド: Express.js サーバー
  - 画像キャプチャ: Puppeteer
  - 状態管理: Zustand
  - CORS 有効化
- フロントエンドのインタラクティブエディターとバックエンドの画像生成サーバーを組み合わせたアーキテクチャ
- HTTP リクエストでフロー設定データをバックエンドに送信して Puppeteer でスクリーンショットを生成
- ユーザーがフローを編集するたびにリアルタイムで画像を更新
- コンテナデプロイ用の Dockerfile 設定付き
- **Pro example**: フルソースコードは React Flow Pro サブスクリプションが必要
