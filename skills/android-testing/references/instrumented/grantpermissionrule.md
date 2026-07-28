# GrantPermissionRule

JUnit 4 rule that grants one or more runtime permissions before test execution on API 23+, so the OS permission dialog never appears and blocks the app under test.

## Signature / Usage

```java
public static GrantPermissionRule grant(String... permissions)
```

```java
@Rule
public GrantPermissionRule mRuntimePermissionRule =
        GrantPermissionRule.grant(android.Manifest.permission.ACCESS_FINE_LOCATION);
```

## Notes

- Permissions are granted before any `@Before` methods run and before the test method executes.
- Requesting `WRITE_EXTERNAL_STORAGE` automatically also grants `READ_EXTERNAL_STORAGE`.
- Ignored on API levels below 23 (M).
- Once granted, a permission applies for all tests in the current `Instrumentation` session; it cannot be revoked afterward.
- For granting all runtime permissions at install time instead of via a rule, use `adb shell install -g PATH_TO_APK_FILE`.
- Gradle dependency: `androidx.test:rules`.
- Runtime permission request flow itself (`ActivityCompat.requestPermissions`, rationale UI) is owned by the `android-platform-core` skill; this page covers only the test-time grant rule.

## Related

- [ActivityScenarioRule](./activityscenariorule.md)
