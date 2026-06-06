# Composition in Pages

同一レイヤー間の直接依存を避け、上位レイヤー（pages/widgets）で features と entities を合成するパターン。

```ts
// pages/post/ui/PostPage.tsx
// features と entities を pages レイヤーで合成する（同一レイヤー間インポートを避ける）
import { CommentList } from "features/comment-list";
import { UserAvatar } from "entities/user";
import { Button } from "shared/ui/button";

export const PostPage = () => (
  <div>
    <h1>投稿詳細</h1>
    {/* entities の UserAvatar を features/comment-list に props として渡す */}
    <CommentList renderAvatar={(userId) => <UserAvatar id={userId} />} />
    <Button>コメントする</Button>
  </div>
);
```

```ts
// features/comment-list/ui/CommentList.tsx
// UserAvatar を直接インポートせず、props 経由で受け取る
type CommentListProps = {
  renderAvatar: (userId: string) => React.ReactNode;
};

export const CommentList = ({ renderAvatar }: CommentListProps) => {
  const { data: comments } = useComments();
  return (
    <ul>
      {comments?.map((comment) => (
        <li key={comment.id}>
          {renderAvatar(comment.authorId)}
          <p>{comment.body}</p>
        </li>
      ))}
    </ul>
  );
};
```

## Notes

- `features/comment-list` が `entities/user` を直接インポートするのは同一レイヤー間インポートに当たるため禁止
- render props / slots パターンで上位レイヤーに合成を委ねることで分離を維持する
- どうしても同一レイヤー間依存が必要な場合は、共有ロジックを下位レイヤーに移動するか、スライスを統合する
- widgets レイヤーでも同様のパターンを使い、複数ページで再利用できる自己完結型ブロックを作る
