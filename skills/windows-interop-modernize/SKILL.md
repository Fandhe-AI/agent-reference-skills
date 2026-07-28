---
name: windows-interop-modernize
description: >
  Windows アプリ開発 (Win32 / WPF / WinForms 相互運用) の相互運用・近代化リファレンス。
  Win32 API, CreateWindowExW, WNDPROC, メッセージループ, COM (IUnknown, CoCreateInstance,
  ComPtr), CsWin32, windows-rs, C++/WinRT (winrt::com_ptr, IAsyncOperation, IDL, ABI 相互運用),
  C#/WinRT (cswinrt, ComWrappers, AOT/trimming, WindowNative), XAML Islands
  (DesktopWindowXamlSource, DesktopChildSiteBridge, WindowsXamlManager), WPF/WinForms 相互運用
  (HwndHost, HwndSource, WindowsFormsHost, ElementHost), UWP から Windows App SDK / WinUI 3 への
  移行 (namespace mapping, AppWindow, DispatcherQueue, .NET Upgrade Assistant)。
user-invocable: false
---

# Windows Interop / Modernize リファレンス

Win32・COM・C++/WinRT・C#/WinRT・XAML Islands・WPF/WinForms・UWP を横断する相互運用と近代化のリファレンス。
既存の Win32/WPF/WinForms/UWP 資産に WinRT API や WinUI 3 コンテンツを組み込む、または UWP から Windows App SDK へ移行する際の API・手順を蒸留する。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構成

```text
skills/windows-interop-modernize/
  SKILL.md
  references/
    win32-com/
      README.md
      create-window.md
      register-window-class.md
      window-procedure.md
      message-loop.md
      window-messages.md
      window-lifecycle.md
      window-styles.md
      extended-window-styles.md
      win32-data-types.md
      message-box.md
      dialog-box.md
      com-initialization.md
      com-create-instance.md
      iunknown.md
      com-smart-pointers.md
      dpi-awareness.md
      pinvoke-csharp.md
      cswin32.md
      windows-rs.md
    cppwinrt/
      README.md
      overview.md
      get-started.md
      init-apartment.md
      projection-headers.md
      strings.md
      com-ptr-iinspectable.md
      consume-apis.md
      author-apis.md
      async-coroutines.md
      events-delegates.md
      weak-references.md
      error-handling.md
      interop-abi.md
      native-interop.md
      xaml-binding.md
      move-to-winrt-from-cx.md
    csharp-winrt/
      README.md
      overview.md
      sdk-net-ref-targetframework.md
      async-operations.md
      net-mappings-of-winrt-types.md
      window-handle-interop.md
      com-interop.md
      authoring-winrt-components.md
      aot-trimming.md
      dotnet-winrt-removal.md
      api-availability-checks.md
      winrt-api-desktop-support.md
    xaml-islands/
      README.md
      overview.md
      desktop-window-xaml-source.md
      desktop-child-site-bridge.md
      windows-xaml-manager.md
      hosting-wpf-winforms-win32.md
      input-focus-navigation.md
      dpi-and-sizing.md
      uwp-vs-winui3-migration.md
      limitations.md
    wpf-winforms-interop/
      README.md
      wpf-window.md
      wpf-application.md
      wpf-basic-controls.md
      wpf-xaml-overview.md
      wpf-dependency-property.md
      wpf-routed-events.md
      wpf-data-binding.md
      wpf-styles-templates.md
      wpf-vs-winui3.md
      winforms-form-control.md
      winforms-application-run.md
      winforms-designer.md
      windows-app-sdk-existing-project.md
      winrt-apis-in-wpf-winforms.md
      wpf-winforms-hosting.md
      hwndhost-hwndsource.md
      dotnet-upgrade-assistant.md
    uwp-migration/
      README.md
      migration-overview.md
      overall-migration-strategy.md
      namespace-mapping.md
      feature-mapping.md
      what-is-supported.md
      upgrade-assistant.md
      applifecycle-migration.md
      windowing-migration.md
      threading-migration.md
      mrtcore-migration.md
      winui3-ui-migration.md
      push-notifications-migration.md
      toast-notifications-migration.md
      background-task-migration.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| CreateWindowExW / WNDPROC / メッセージループで生の Win32 ウィンドウを作成したい | win32-com | [references/win32-com/README.md](references/win32-com/README.md) |
| COM オブジェクトの初期化・生成・参照カウント管理 (CoInitializeEx, CoCreateInstance, IUnknown, ComPtr) を行いたい | win32-com | [references/win32-com/README.md](references/win32-com/README.md) |
| C# から CsWin32 / P/Invoke で Win32 API を呼びたい、Rust から windows-rs を使いたい | win32-com | [references/win32-com/README.md](references/win32-com/README.md) |
| C++ で WinRT ランタイムクラスを消費・作成し、非同期処理やイベントを扱いたい | cppwinrt | [references/cppwinrt/README.md](references/cppwinrt/README.md) |
| IDL で API を作成し ABI・ネイティブ相互運用やエラーハンドリングを実装したい | cppwinrt | [references/cppwinrt/README.md](references/cppwinrt/README.md) |
| C# から WinRT API を呼び出す、TFM 設定・非同期・型マッピングを把握したい | csharp-winrt | [references/csharp-winrt/README.md](references/csharp-winrt/README.md) |
| ComWrappers / AOT・trimming 対応や WinRT コンポーネントの作成を行いたい | csharp-winrt | [references/csharp-winrt/README.md](references/csharp-winrt/README.md) |
| WPF/WinForms/Win32 アプリに WinUI 3 の XAML コンテンツをホストしたい | xaml-islands | [references/xaml-islands/README.md](references/xaml-islands/README.md) |
| DesktopWindowXamlSource / DesktopChildSiteBridge でフォーカス・DPI・サイズ同期を扱いたい | xaml-islands | [references/xaml-islands/README.md](references/xaml-islands/README.md) |
| WPF / WinForms 既存アプリの基本 API (Window, Application, DependencyProperty, データバインディング) を確認したい | wpf-winforms-interop | [references/wpf-winforms-interop/README.md](references/wpf-winforms-interop/README.md) |
| HwndHost/HwndSource や WindowsFormsHost/ElementHost で WPF と WinForms・Win32 を相互ホストしたい | wpf-winforms-interop | [references/wpf-winforms-interop/README.md](references/wpf-winforms-interop/README.md) |
| WPF/WinForms に Windows App SDK を追加し WinRT API を呼びたい | wpf-winforms-interop | [references/wpf-winforms-interop/README.md](references/wpf-winforms-interop/README.md) |
| UWP アプリを Windows App SDK / WinUI 3 へ移行する全体戦略・名前空間対応を知りたい | uwp-migration | [references/uwp-migration/README.md](references/uwp-migration/README.md) |
| ウィンドウ管理・スレッディング・通知・バックグラウンドタスクの UWP 固有 API を移行したい | uwp-migration | [references/uwp-migration/README.md](references/uwp-migration/README.md) |
| .NET Upgrade Assistant で機械的な移行を進めたい | uwp-migration | [references/uwp-migration/README.md](references/uwp-migration/README.md) |

このスキルは Win32・COM・C++/WinRT・C#/WinRT・XAML Islands・WPF/WinForms・UWP 間の相互運用と移行手順のみを扱う。WinUI 3 のコントロール API 自体は windows-winui-controls、レイアウト・スタイル・XAML 記法は windows-winui-ui、Windows App SDK のランタイム機能は windows-app-sdk が担当する。
