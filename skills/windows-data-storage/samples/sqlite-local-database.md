---
source: https://learn.microsoft.com/en-us/windows/apps/develop/data-access/sqlite-data-access
fetched: 2026-10-16
---

# SQLite Local Database

Store and read text entries in a local SQLite file under `ApplicationData.Current.LocalFolder` with Microsoft.Data.Sqlite (NuGet package `Microsoft.Data.Sqlite`).

```csharp
using Microsoft.Data.Sqlite;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Windows.Storage;

public static class DataAccess
{
    public static async Task InitializeDatabaseAsync()
    {
        await ApplicationData.Current.LocalFolder
                .CreateFileAsync("sqliteSample.db", CreationCollisionOption.OpenIfExists);
        string dbpath = Path.Combine(ApplicationData.Current.LocalFolder.Path,
                                     "sqliteSample.db");
        using (var db = new SqliteConnection($"Filename={dbpath}"))
        {
            db.Open();

            string tableCommand = "CREATE TABLE IF NOT " +
                "EXISTS MyTable (Primary_Key INTEGER PRIMARY KEY, " +
                "Text_Entry NVARCHAR(2048) NULL)";

            var createTable = new SqliteCommand(tableCommand, db);

            createTable.ExecuteReader();
        }
    }

    public static void AddData(string inputText)
    {
        string dbpath = Path.Combine(ApplicationData.Current.LocalFolder.Path,
                                     "sqliteSample.db");
        using (var db = new SqliteConnection($"Filename={dbpath}"))
        {
            db.Open();

            var insertCommand = new SqliteCommand();
            insertCommand.Connection = db;

            // Use parameterized query to prevent SQL injection attacks
            insertCommand.CommandText = "INSERT INTO MyTable VALUES (NULL, @Entry);";
            insertCommand.Parameters.AddWithValue("@Entry", inputText);

            insertCommand.ExecuteReader();
        }
    }

    public static List<string> GetData()
    {
        var entries = new List<string>();
        string dbpath = Path.Combine(ApplicationData.Current.LocalFolder.Path,
                                     "sqliteSample.db");
        using (var db = new SqliteConnection($"Filename={dbpath}"))
        {
            db.Open();
            var selectCommand = new SqliteCommand
                ("SELECT Text_Entry from MyTable", db);

            SqliteDataReader query = selectCommand.ExecuteReader();

            while (query.Read())
            {
                entries.Add(query.GetString(0));
            }
        }

        return entries;
    }
}
```

Await `InitializeDatabaseAsync` in `OnLaunched` before creating the window, so the table exists before `GetData` runs.

```csharp
private Window? m_window; // field from the WinUI project template's App class

protected override async void OnLaunched(LaunchActivatedEventArgs args)
{
    await DataAccess.InitializeDatabaseAsync();

    m_window = new MainWindow();
    m_window.Activate();
}
```

MainWindow.xaml:

```xml
<Grid Background="{ThemeResource ApplicationPageBackgroundThemeBrush}">
    <StackPanel>
        <TextBox x:Name="Input_Box"/>
        <Button Click="AddData">Add</Button>
        <ListView x:Name="Output">
            <ListView.ItemTemplate>
                <DataTemplate>
                    <TextBlock Text="{Binding}"/>
                </DataTemplate>
            </ListView.ItemTemplate>
        </ListView>
    </StackPanel>
</Grid>
```

MainWindow.xaml.cs:

```csharp
private void AddData(object sender, RoutedEventArgs e)
{
    DataAccess.AddData(Input_Box.Text);

    Output.ItemsSource = DataAccess.GetData();
}

public MainWindow()
{
    this.InitializeComponent();

    Output.ItemsSource = DataAccess.GetData();
}
```

## Notes

- Difference from the official tutorial: it calls `async void InitializeDatabase()` from the `App` constructor without awaiting, so `GetData` can run before the table is created. This sample returns `Task` and awaits it in `OnLaunched` instead.
- The `ApplicationData` members used here only work for packaged apps running in an app container. All other Windows apps should access `ApplicationData` members via the `ApplicationDataManager` class.
- Always use parameterized queries. The tutorial: "Never concatenate user input into a SQL query string. Always use parameters."
- In a production app, keep connection information such as the database filename in app configuration instead of hard-coding it.
- SQLite is for on-device storage. For shared enterprise data, use an authenticated service layer (see `sql-server-direct-access.md`). For an ORM over the same file, see `ef-core-local-database.md`.
