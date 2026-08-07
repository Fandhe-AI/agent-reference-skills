# health-auth

| Name | Description | Path |
|------|-------------|------|
| ASAuthorizationAppleIDCredential | The credential returned after a successful Sign in with Apple authorization. Received via `ASAuthorizationControllerDelegate`. | [asauthorizationappleidcredential.md](./asauthorizationappleidcredential.md) |
| ASAuthorizationAppleIDProvider | A provider that generates Sign in with Apple authorization requests and can verify a user's credential state. | [asauthorizationappleidprovider.md](./asauthorizationappleidprovider.md) |
| ASAuthorizationAppleIDRequest | An OpenID authorization request for Sign in with Apple. Obtained from `ASAuthorizationAppleIDProvider.createRequest()`. | [asauthorizationappleidrequest.md](./asauthorizationappleidrequest.md) |
| ASAuthorizationController | A controller that manages and presents one or more authorization requests (Sign in with Apple, passkeys, passwords, etc.) to the user. | [asauthorizationcontroller.md](./asauthorizationcontroller.md) |
| ASAuthorizationControllerDelegate | A protocol that receives the outcome of an authorization request managed by `ASAuthorizationController`. | [asauthorizationcontrollerdelegate.md](./asauthorizationcontrollerdelegate.md) |
| ASWebAuthenticationSession | A session for authenticating users through a web service using OAuth, OpenID Connect, or other web-based flows. Displays a secure in-app browser with a clear domain indicator. | [aswebauthenticationsession.md](./aswebauthenticationsession.md) |
| HKAuthorizationStatus | An enum indicating the app's authorization status for sharing (writing) a specific HealthKit data type. Returned by `HKHealthStore.authorizationStatus(for:)`. | [hkauthorizationstatus.md](./hkauthorizationstatus.md) |
| HKHealthStore | The access point for all data managed by HealthKit. Manages authorization, queries, saves, and background delivery. | [hkhealthstore.md](./hkhealthstore.md) |
| HKObjectType | Abstract superclass identifying a specific type of data in the HealthKit store. Never instantiated directly — use one of its concrete subclasses or the provided factory class methods. | [hkobjecttype.md](./hkobjecttype.md) |
| HKObserverQuery | A long-running query that monitors the HealthKit store and notifies the app when matching samples are added or deleted. | [hkobserverquery.md](./hkobserverquery.md) |
| HKQuantitySample | An immutable `HKSample` representing a numerical health measurement with a value, unit, and time interval. | [hkquantitysample.md](./hkquantitysample.md) |
| HKQuantityType | A concrete `HKSampleType` subclass identifying samples that store numerical values (e.g., steps, heart rate, body mass). | [hkquantitytype.md](./hkquantitytype.md) |
| HKQuery | Abstract base class for all HealthKit query objects. Never instantiated directly — use a concrete subclass and execute it via `HKHealthStore.execute(_:)`. | [hkquery.md](./hkquery.md) |
| HKSampleQuery | A one-shot query returning a snapshot of all matching samples currently in the HealthKit store. | [hksamplequery.md](./hksamplequery.md) |
| HKSampleType | Abstract subclass of `HKObjectType` that identifies sample-based health data types — measurements with a start date and end date. Never instantiated directly. | [hksampletype.md](./hksampletype.md) |
| HKStateOfMind | A concrete `HKSample` subclass representing a state-of-mind sample, storing an emotional valence measurement plus contextual mood labels and associations. | [hkstateofmind.md](./hkstateofmind.md) |
| HKStatisticsCollectionQuery | A long-running query that performs multiple statistics calculations over a series of fixed-length time intervals, commonly used to produce chart data. Receives live updates when the store changes. | [hkstatisticscollectionquery.md](./hkstatisticscollectionquery.md) |
| HKStatisticsQuery | A one-shot query that performs statistical calculations (sum, average, min, max) over a set of matching quantity samples. | [hkstatisticsquery.md](./hkstatisticsquery.md) |
| HKUnit | Represents a unit of measure used with `HKQuantity`. Supports SI units, SI prefixes, non-SI equivalents, and compound units built by arithmetic combination. | [hkunit.md](./hkunit.md) |
| SignInWithAppleButton | A SwiftUI view that displays the standard Sign in with Apple button, handling request configuration and authorization result in a single declaration. | [signinwithapplebutton.md](./signinwithapplebutton.md) |
