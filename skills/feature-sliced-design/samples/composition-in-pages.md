# Composition in Pages

同一レイヤーのスライス同士（features 間）は直接インポートできないため、上位レイヤーの pages で合成するパターン。

```tsx
// pages/post/ui/PostPage.tsx
// features/comment-list と features/like-comment を pages で合成する
// （features → features の直接インポートは禁止。features → entities は下位レイヤーなので可）
import { CommentList } from "features/comment-list";
import { LikeButton } from "features/like-comment";
import { Button } from "shared/ui/button";

export const PostPage = () => (
  <div>
    <h1>投稿詳細</h1>
    {/* 別 feature の UI を slot として CommentList に渡す */}
    <CommentList renderActions={(commentId) => <LikeButton commentId={commentId} />} />
    <Button>コメントする</Button>
  </div>
);
```

```tsx
// features/comment-list/ui/CommentList.tsx
// 別 feature の LikeButton は直接インポートせず、props 経由で受け取る
import { UserAvatar } from "entities/user"; // features → entities は OK
import { useComments } from "../api/useComments";

type CommentListProps = {
  renderActions: (commentId: string) => React.ReactNode;
};

export const CommentList = ({ renderActions }: CommentListProps) => {
  const { data: comments } = useComments();
  return (
    <ul>
      {comments?.map((comment) => (
        <li key={comment.id}>
          <UserAvatar id={comment.authorId} />
          <p>{comment.body}</p>
          {renderActions(comment.id)}
        </li>
      ))}
    </ul>
  );
};
```

## Notes

- 禁止されるのは同一レイヤー内の別スライスへのインポート（features → features など）。features が下位レイヤーの entities をインポートするのは通常のレイヤーインポートルールで許可される
- 公式: entity の UI は props や slots で業務ロジックを後から差し込める設計にし、スライス間のやり取りに関するビジネスロジックは features や pages などの上位レイヤーに置くのが望ましい
- widgets レイヤーは公式ガイドで非推奨。画面固有の合成は `pages` に残し、複数ページで再利用されるユーザー操作は操作と UI 合成の両方を `features` に切り出す。ビジネス文脈のない共有 UI は `shared`、アプリ全体のレイアウトは `app` で扱う
- どうしても同一レイヤー間の依存が必要な場合は、共有ロジックを下位レイヤーに移動するか、スライスの統合を検討する
- Source: https://fsd.how/docs/guides/examples/page-layout and https://fsd.how/docs/reference/layers (documentation repository commit 3a5a3a3)
