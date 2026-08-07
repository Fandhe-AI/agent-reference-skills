# Test Results (ciTestResults)

The outcome of a single test case executed during a test action, including its pass/fail status and duration.

## Signature / Usage

```bash
# Read a test result
GET https://api.appstoreconnect.apple.com/v1/ciTestResults/{id}
```

## Options / Props

| Attribute | Description |
|-----------|--------------|
| `className` | Test class name |
| `name` | Test method/case name |
| `status` | Pass/fail/skip status |
| `duration` | Execution time |
| `fileSource` | Source file location of the test |
| `destinationTestResults` | Simulated device name and OS version the test ran on |

## Notes

- This resource supports JSON web tokens with a lifetime of up to six months
- List test results for a build action via `GET /v1/ciBuildActions/{id}/testResults`

## Related

- [Build Actions](./build-actions.md)
