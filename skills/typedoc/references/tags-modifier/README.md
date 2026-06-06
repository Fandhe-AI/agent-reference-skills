# Tags - Modifier

| Name | Description | Path |
|------|-------------|------|
| @abstract | メソッドやプロパティを、TypeScript の実装状態に関係なく、ドキュメント上で抽象としてマークするモディファイアタグ。 | [abstract.md](./abstract.md) |
| @alpha | 将来的にサードパーティ開発者が使用することを想定しているが、セマンティックバージョニングに準拠するほど安定していないメンバーをマークするモディファイアタグ。 | [alpha.md](./alpha.md) |
| @beta | 将来的にサードパーティ開発者が使用することを想定しているが、セマンティックバージョニングに準拠するほど安定していないメンバーをマークするモディファイアタグ。 | [beta.md](./beta.md) |
| @class | 変数宣言をクラスとしてドキュメント化するモディファイアタグ。「動的」プロパティを実際のプロパティに展開する。 | [class.md](./class.md) |
| @enum | 文字列または数値リテラル値を持つ変数を、通常の変数ではなく列挙型としてドキュメント化するモディファイアタグ。 | [enum.md](./enum.md) |
| @event | リフレクションを「Events」グループに分類するモディファイアタグ。`@group Events` を指定するのと同等。 | [event.md](./event.md) |
| @eventProperty | リフレクションを「Events」グループに分類するモディファイアタグ。`@group Events` を指定するのと同等。TSDoc 仕様に準拠。 | [eventProperty.md](./eventProperty.md) |
| @experimental | 将来的にサードパーティ開発者が使用することを想定しているが、セマンティックバージョニングに準拠するほど安定していないメンバーをマークするモディファイアタグ。 | [experimental.md](./experimental.md) |
| @function | 呼び出し可能な変数宣言を関数としてドキュメント化するモディファイアタグ。 | [function.md](./function.md) |
| @hidden | リフレクションを生成されるドキュメントから完全に除去するモディファイアタグ。 | [hidden.md](./hidden.md) |
| @hideconstructor | クラスのコンストラクタを生成されるドキュメントから隠すモディファイアタグ。TypeScript の issue #58653 の回避策として提供されている。 | [hideconstructor.md](./hideconstructor.md) |
| @ignore | リフレクションを生成されるドキュメントから完全に除去するモディファイアタグ。`@hidden` と同等。 | [ignore.md](./ignore.md) |
| @interface | 型エイリアスをインターフェースとしてドキュメント化するモディファイアタグ。「動的」プロパティを実際のプロパティに展開する。 | [interface.md](./interface.md) |
| @internal | リフレクションが API コンシューマー向けではないことを示すモディファイアタグ。`--excludeInternal` オプションで除外可能。 | [internal.md](./internal.md) |
| @namespace | 変数を名前空間として表示し、プロパティをエクスポートされた変数や関数として解決するモディファイアタグ。 | [namespace.md](./namespace.md) |
| @overload | JavaScript プロジェクトで関数のオーバーロードを宣言するためのモディファイアタグ。TypeScript 5.0 以降で認識される。 | [overload.md](./overload.md) |
| @override | メンバーが親クラスの実装をオーバーライドしていることを示すモディファイアタグ。TSDoc 互換のために解析される。 | [override.md](./override.md) |
| @packageDocumentation | コメントブロックをファイル全体のドキュメントとしてマークするモディファイアタグ。直後の宣言ではなくファイル自体を説明する。 | [packageDocumentation.md](./packageDocumentation.md) |
| @primaryExport | 再エクスポートの処理方法を制御し、TypeDoc にシンボルを即座に変換させるモディファイアタグ。 | [primaryExport.md](./primaryExport.md) |
| @private | リフレクションの可視性を private にオーバーライドするモディファイアタグ。一般的に使用は推奨されない。 | [private.md](./private.md) |
| @protected | リフレクションの可視性を protected にオーバーライドするモディファイアタグ。一般的に使用は推奨されない。 | [protected.md](./protected.md) |
| @public | リフレクションの可視性を public にオーバーライドするモディファイアタグ。一般的に使用は推奨されない。 | [public.md](./public.md) |
| @readonly | TypeScript の書き込み可能性に関わらず、リフレクションを読み取り専用としてドキュメント化するモディファイアタグ。 | [readonly.md](./readonly.md) |
| @sealed | TSDoc 互換のために解析されるが、TypeDoc では特定の意味を持たないモディファイアタグ。 | [sealed.md](./sealed.md) |
| @useDeclaredType | 型エイリアスを型ノード表現ではなく宣言された型を使用して変換するモディファイアタグ。派生型のドキュメント改善に有用。 | [useDeclaredType.md](./useDeclaredType.md) |
| @virtual | TSDoc 互換のために解析されるが、TypeDoc では特定の意味を持たないモディファイアタグ。 | [virtual.md](./virtual.md) |
