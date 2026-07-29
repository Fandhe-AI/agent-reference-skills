# Testing content providers

Instrumented testing of a `ContentProvider` in isolation, so tests exercise real query/insert/update/delete/getType logic without touching actual user data. `ProviderTestCase2` is the long-standing JUnit3-era base class; the experimental `ProviderTestRule` is its JUnit 4 replacement.

## Signature / Usage

```kotlin
class MyProviderTest : ProviderTestCase2<MyContentProvider>(MyContentProvider::class.java, "com.example.provider") {

    @Throws(Exception::class)
    override fun setUp() {
        super.setUp()
        context = ApplicationProvider.getApplicationContext()
    }

    @Test
    fun testInsertAndQuery() {
        val resolver = mockContentResolver
        val uri = resolver.insert(MyContentProvider.CONTENT_URI, testValues)
        val cursor = resolver.query(uri!!, null, null, null, null)
        assertThat(cursor?.count).isEqualTo(1)
    }
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `ProviderTestCase2<T>` | class | JUnit3-era `AndroidTestCase` subclass that instantiates the provider under test inside an isolated context. Constructor takes the provider class and its authority string. |
| `ProviderTestRule` | class (experimental) | JUnit 4 rule replacement for `ProviderTestCase2`; built with a `Builder` targeting the provider class and authority. |
| `MockContentResolver` | class | Content resolver used to interact with the provider under test in place of the real system `ContentResolver`. |
| `IsolatedContext` | class | Context that stubs out other Android system interactions and confines file/database I/O to a special prefixed local directory, so tests never touch real user data. |

## Notes

- `ProviderTestCase2` automatically creates an `IsolatedContext` and a `MockContentResolver`, then instantiates the provider so it runs entirely inside that isolated environment.
- Always exercise the provider through resolver methods (`query()`, `insert()`, `update()`, `delete()`, `getType()`) and public URIs/column constants, mirroring how real app code calls it — don't call provider methods directly.
- Deliberately test invalid/unsupported URIs; the provider should throw `IllegalArgumentException`.
- Cover the provider's own business logic explicitly: invalid value handling, calculations, duplicate elimination/merging, and any other custom logic beyond plain CRUD.
- `ProviderTestCase2` is a legacy JUnit3-era API; `ProviderTestRule` is the (still experimental) JUnit 4 migration path, and `ContentProvider` usage itself is increasingly rare in modern apps built on Room/DataStore, so this is a low-priority API to reach for on new code.
- Content provider tests run the same way as other instrumented tests, under `AndroidJUnitRunner`.

## Related

- [ApplicationProvider](./applicationprovider.md)
- [ServiceTestRule](./servicetestrule.md)
