# health-auth

HealthKit and Authentication Services reference. Covers health data authorization, querying, and Sign in with Apple flows.

| Name | Description | Path |
|------|-------------|------|
| HKHealthStore | Central access point for HealthKit: authorization, queries, saving data, background delivery | [hkhealthstore.md](./hkhealthstore.md) |
| HKObjectType | Abstract superclass identifying a HealthKit data type; factory methods for all concrete types | [hkobjecttype.md](./hkobjecttype.md) |
| HKQuantityType | Concrete sample type for numerical values (steps, heart rate, etc.) | [hkquantitytype.md](./hkquantitytype.md) |
| HKSampleType | Abstract superclass for sample-based data types with start/end dates | [hksampletype.md](./hksampletype.md) |
| HKQuery | Abstract base class for all HealthKit query objects; predicate factory methods | [hkquery.md](./hkquery.md) |
| HKSampleQuery | One-shot snapshot query returning all matching samples | [hksamplequery.md](./hksamplequery.md) |
| HKStatisticsQuery | Calculates sum, average, min, or max over matching quantity samples | [hkstatisticsquery.md](./hkstatisticsquery.md) |
| HKStatisticsCollectionQuery | Long-running query for time-interval statistics; drives charts and graphs | [hkstatisticscollectionquery.md](./hkstatisticscollectionquery.md) |
| HKObserverQuery | Long-running query that fires when matching samples are added or deleted | [hkobserverquery.md](./hkobserverquery.md) |
| HKQuantitySample | Immutable sample storing a numerical quantity with a time interval | [hkquantitysample.md](./hkquantitysample.md) |
| HKUnit | Unit of measure; supports SI, non-SI, SI prefixes, and compound units | [hkunit.md](./hkunit.md) |
| HKAuthorizationStatus | Enum indicating write authorization status for a HealthKit data type | [hkauthorizationstatus.md](./hkauthorizationstatus.md) |
| ASAuthorizationController | Manages and presents authorization requests (Sign in with Apple, passkeys, passwords) | [asauthorizationcontroller.md](./asauthorizationcontroller.md) |
| ASAuthorizationAppleIDProvider | Generates Sign in with Apple requests and verifies credential state | [asauthorizationappleidprovider.md](./asauthorizationappleidprovider.md) |
| ASAuthorizationAppleIDRequest | Configures scope, nonce, and state for a Sign in with Apple request | [asauthorizationappleidrequest.md](./asauthorizationappleidrequest.md) |
| ASAuthorizationAppleIDCredential | Credential returned after successful Sign in with Apple authorization | [asauthorizationappleidcredential.md](./asauthorizationappleidcredential.md) |
| SignInWithAppleButton | SwiftUI view for the standard Sign in with Apple button | [signinwithapplebutton.md](./signinwithapplebutton.md) |
| ASWebAuthenticationSession | Browser-based OAuth/OpenID Connect authentication session | [aswebauthenticationsession.md](./aswebauthenticationsession.md) |
| ASAuthorizationControllerDelegate | Protocol receiving success or failure from ASAuthorizationController | [asauthorizationcontrollerdelegate.md](./asauthorizationcontrollerdelegate.md) |
