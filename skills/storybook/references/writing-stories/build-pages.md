# Build Pages with Storybook

Patterns for writing stories for full page-level components that may include connected containers, routing, and external data dependencies.

## Overview / Signature

Two primary strategies:

| Strategy | Trade-off |
|----------|-----------|
| **Pure presentational pages** | Easiest to story; may require app restructuring |
| **Context provider pattern** | Injects mock containers via React context; no restructuring needed |

## Usage

### Args composition from sub-component stories

```typescript
import * as PageLayout from './PageLayout.stories';
import * as DocumentHeader from './DocumentHeader.stories';
import * as DocumentList from './DocumentList.stories';

export const Simple: Story = {
  args: {
    user: PageLayout.Simple.args.user,
    document: DocumentHeader.Simple.args.document,
    subdocuments: DocumentList.Simple.args.documents,
  },
};
```

### Context provider pattern — inject mock containers

```typescript
// ProfilePageContext.js
import { createContext } from 'react';
const ProfilePageContext = createContext();
export default ProfilePageContext;
```

```typescript
// ProfilePage.js
export const ProfilePage = ({ name, userId }) => {
  const { UserPostsContainer, UserFriendsContainer } = useContext(ProfilePageContext);
  return (
    <div>
      <h1>{name}</h1>
      <UserPostsContainer userId={userId} />
      <UserFriendsContainer userId={userId} />
    </div>
  );
};
```

```typescript
// ProfilePage.stories.js
const context = {
  UserPostsContainer({ userId }) {
    return <UserPosts {...UserPostsProps} />;
  },
  UserFriendsContainer: UserFriendsNormal,
};

export const Normal = {
  render: () => (
    <ProfilePageContext.Provider value={context}>
      <ProfilePage {...ProfilePageProps} />
    </ProfilePageContext.Provider>
  ),
};
```

```typescript
// Real app usage — provide real containers
const context = { UserPostsContainer, UserFriendsContainer };

export const AppProfilePage = () => (
  <ProfilePageContext.Provider value={context}>
    <ProfilePageContainer />
  </ProfilePageContext.Provider>
);
```

### Global containers via decorator

```typescript
// .storybook/preview.ts
const context = { NavigationContainer: NavigationNormal };

const AppDecorator = (storyFn) => (
  <GlobalContainerContext.Provider value={context}>
    {storyFn()}
  </GlobalContainerContext.Provider>
);

const preview: Preview = {
  decorators: [AppDecorator],
};
```

## Notes

- Prefer pure presentational pages when possible — stories become straightforward and args align well with Controls.
- The context provider pattern lets you swap real containers for presentational mocks without changing the component.
- For network requests and module mocking, see [Mocking Network Requests](./mocking-network-requests.md) and [Mocking Modules](./mocking-modules.md).

## Related

- [Args](./args.md)
- [Decorators](./decorators.md)
- [Mocking Providers](./mocking-providers.md)
- [Mocking Modules](./mocking-modules.md)
- [Mocking Network Requests](./mocking-network-requests.md)
