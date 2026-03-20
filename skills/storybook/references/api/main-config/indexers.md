# indexers

Customizes how Storybook discovers and parses story files, enabling custom story formats.

## Type

```typescript
// Config key is `experimental_indexers`
type experimental_indexers = (existingIndexers: Indexer[]) => Promise<Indexer[]>

type Indexer = {
  test: RegExp;
  createIndex: (fileName: string, options: IndexerOptions) => Promise<IndexInput[]>;
}

type IndexerOptions = {
  makeTitle: (userTitle?: string) => string;
}

type IndexInput = {
  exportName: string;          // required
  type: 'story';               // required
  importPath?: string;         // default: fileName
  subtype?: 'story' | 'test'; // default: 'story'
  rawComponentPath?: string;
  metaId?: string;
  name?: string;
  tags?: string[];
  title?: string;
  __id?: string;
}
```

## Usage

```typescript
// .storybook/main.ts
import type { StorybookConfig, Indexer } from '@storybook/your-framework';

const customIndexer: Indexer = {
  test: /\.custom-stories\.[tj]sx?$/,
  createIndex: async (fileName, { makeTitle }) => {
    return [{
      type: 'story',
      title: makeTitle('MyComponent'),
      importPath: fileName,
      exportName: 'Default',
    }];
  },
};

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.stories.*', '../src/**/*.custom-stories.*'],
  experimental_indexers: async (existingIndexers) => [
    ...existingIndexers,
    customIndexer,
  ],
};

export default config;
```

## Notes

- **Experimental**: use the `experimental_indexers` key (not `indexers`) in config
- Files matching your indexer's pattern must also be included in the `stories` array
- Always use `makeTitle()` for consistent sidebar title formatting
- Custom `importPath` values are only supported in Vite; Webpack requires direct CSF transpilation
- Custom source formats typically need builder-level transpilation (Vite/Webpack plugin) to convert to CSF

## Related

- [stories.md](./stories.md)
