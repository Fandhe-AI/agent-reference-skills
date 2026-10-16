# install

データベース接続用 NuGet パッケージの導入コマンド集。出典は learn.microsoft.com の各 data-access ページ（en-us）。Package Manager Console のコマンドと dotnet CLI のコマンドは別物のため区別して記載。

## EF Core SQLite プロバイダーの追加（dotnet CLI）

```sh
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
```

出典: Connect a WinUI app to a database。プロジェクトのディレクトリで実行する。EF Core の他プロバイダーも同じ形式で追加するが、パッケージ名は公式ページに SQLite 以外の記載がないため省略。

## Microsoft.Data.Sqlite の追加（NuGet UI）

公式は CLI コマンドを示しておらず、Visual Studio の UI 手順のみ。

1. ソリューションを右クリックし、**Manage NuGet Packages for Solution** を選択
2. **Browse** タブで **Microsoft.Data.Sqlite** を検索し、最新の安定版をインストール

Windows 同梱の SQLite を使う前提（出典: SQLite data access）。特定バージョンの SQLite を使う場合はライブラリをパッケージに含める。

## SQL Server クライアントの追加（Package Manager Console）

```powershell
Install-Package Microsoft.Data.SqlClient
```

Visual Studio の Package Manager Console で実行する。Windows 認証を使う場合は `Package.appxmanifest` の Capabilities タブで **Enterprise Authentication** を有効にする。

## Azure Cosmos DB クライアントの追加（Package Manager Console）

```powershell
Install-Package Microsoft.Azure.Cosmos
```

Azure Cosmos DB for NoSQL client library for .NET。Package Manager Console は View -> Other Windows -> Package Manager Console から開く。

## MySQL クライアントの追加（Package Manager Console）

```powershell
Install-Package MySql.Data
```

> **注意**: Windows 認証で `MySql.Data` を使うには MySQL Connector/NET 6.4.4 以降が必要（公式 Note）。

## MongoDB ドライバーの追加（Package Manager Console）

```powershell
Install-Package MongoDB.Driver
```

公式 MongoDB ドライバーの NuGet パッケージ。
