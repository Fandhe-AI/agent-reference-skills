---
source: https://docs.expo.dev/eas/metadata/schema/
---

# Schema for EAS Metadata

Structure of the store config object in `store.config.json` (EAS Metadata currently supports the Apple App Store only).

## Signature / Usage

```json
{
  "configVersion": 0,
  "apple": {
    "info": {
      "en-US": {
        "title": "Awesome app",
        "privacyPolicyUrl": "https://example.com/en/privacy"
      }
    }
  }
}
```

## Options / Props

### Config schema

| Property | Type | Description |
| --- | --- | --- |
| `configVersion` | `number`, enum: 0 | The EAS Metadata store configuration schema version. Versions changes that are not backward compatible |
| `apple` | `object` | All configurable properties for the App Store |
| `apple.version` | `string` | App version to use when syncing metadata. Defaults to the latest available version in the app stores |
| `apple.copyright` | `string` | Owner of the exclusive rights, preceded by the year (for example "2008 Acme Inc.") |
| `apple.advisory` | AppleAdvisory | App Store questionnaire that determines the age rating |
| `apple.categories` | AppleCategories | Primary, secondary, and possible subcategories |
| `apple.info` | Map<AppleLanguage, AppleInfo> | Localized App Store presence |
| `apple.release` | AppleRelease | Release strategy for the selected version |
| `apple.review` | AppleReview | Information for the App Store review team (contact info and credentials) |

### Apple advisory

EAS Metadata uses the least restrictive answer for each question by default.

| Property | Type | Description |
| --- | --- | --- |
| `alcoholTobaccoOrDrugUseOrReferences` | AppleAgeRating | Alcohol, tobacco, or drug use or references |
| `contests` | AppleAgeRating | Contests |
| `gambling` | `boolean` | Gambling |
| `gamblingSimulated` | AppleAgeRating | Simulated gambling |
| `horrorOrFearThemes` | AppleAgeRating | Horror or fear themes |
| `kidsAgeBand` | AppleKidsAge | Kids category age band (or `null`) |
| `matureOrSuggestiveThemes` | AppleAgeRating | Mature or suggestive themes |
| `medicalOrTreatmentInformation` | AppleAgeRating | Medical or treatment information |
| `profanityOrCrudeHumor` | AppleAgeRating | Profanity or crude humor |
| `ageRatingOverride` | AppleAgeRatingOverride | Manual override if the app rates 12+ or lower |
| `koreaAgeRatingOverride` | AppleKoreaAgeRatingOverride | Same as `ageRatingOverride`, for South Korea |
| `sexualContentGraphicAndNudity` | AppleAgeRating | Graphic sexual content and nudity |
| `sexualContentOrNudity` | AppleAgeRating | Sexual content or nudity |
| `unrestrictedWebAccess` | `boolean` | Unrestricted web access, such as an embedded browser |
| `violenceCartoonOrFantasy` | AppleAgeRating | Cartoon or fantasy violence |
| `violenceRealistic` | AppleAgeRating | Realistic violence |
| `violenceRealisticProlongedGraphicOrSadistic` | AppleAgeRating | Prolonged graphic or sadistic realistic violence |

| Enum | Values |
| --- | --- |
| AppleAgeRating | `NONE`, `INFREQUENT_OR_MILD`, `FREQUENT_OR_INTENSE` |
| AppleKidsAge | `FIVE_AND_UNDER`, `SIX_TO_EIGHT`, `NINE_TO_ELEVEN` |
| AppleAgeRatingOverride | `NONE`, `SEVENTEEN_PLUS`, `UNRATED` (Adults Only; cannot be published on the App Store) |
| AppleKoreaAgeRatingOverride | `NONE`, `FIFTEEN_PLUS`, `NINETEEN_PLUS` |

### Apple categories

`categories` is an array: primary then secondary, where a category with subcategories is itself an array.

```json
{
  "configVersion": 0,
  "apple": {
    "categories": [["GAMES", "GAMES_CARD", "GAMES_BOARD"], "ENTERTAINMENT"]
  }
}
```

Categories: `BOOKS`, `BUSINESS`, `DEVELOPER_TOOLS`, `EDUCATION`, `ENTERTAINMENT`, `FINANCE`, `FOOD_AND_DRINK`, `GAMES`, `GRAPHICS_AND_DESIGN`, `HEALTH_AND_FITNESS`, `LIFESTYLE`, `MAGAZINES_AND_NEWSPAPERS`, `MEDICAL`, `MUSIC`, `NAVIGATION`, `NEWS`, `PHOTO_AND_VIDEO`, `PRODUCTIVITY`, `REFERENCE`, `SHOPPING`, `SOCIAL_NETWORKING`, `SPORTS`, `STICKERS`, `TRAVEL`, `UTILITIES`, `WEATHER`.

- `GAMES` can have up to 2 subcategories: `GAMES_ACTION`, `GAMES_ADVENTURE`, `GAMES_BOARD`, `GAMES_CARD`, `GAMES_CASINO`, `GAMES_CASUAL`, `GAMES_FAMILY`, `GAMES_MUSIC`, `GAMES_PUZZLE`, `GAMES_RACING`, `GAMES_ROLE_PLAYING`, `GAMES_SIMULATION`, `GAMES_SPORTS`, `GAMES_STRATEGY`, `GAMES_TRIVIA`, `GAMES_WORD`.
- `STICKERS` can have up to 2 subcategories: `STICKERS_ANIMALS`, `STICKERS_ART`, `STICKERS_CELEBRATIONS`, `STICKERS_CELEBRITIES`, `STICKERS_CHARACTERS`, `STICKERS_EATING_AND_DRINKING`, `STICKERS_EMOJI_AND_EXPRESSIONS`, `STICKERS_FASHION`, `STICKERS_GAMING`, `STICKERS_KIDS_AND_FAMILY`, `STICKERS_MOVIES_AND_TV`, `STICKERS_MUSIC`, `STICKERS_PEOPLE`, `STICKERS_PLACES_AND_OBJECTS`, `STICKERS_SPORTS_AND_ACTIVITIES`.

### Apple info (per language)

| Property | Type | Description |
| --- | --- | --- |
| `title` | `string`, length 2..30 | Name of the app in the store (reviewed before release) |
| `subtitle` | `string`, length 30 | Subtext for the app (reviewed before release) |
| `description` | `string`, length 10..4000 | Main description |
| `keywords` | `string[]`, unique items, max length per item 100 | Keywords to help users find the app |
| `releaseNotes` | `string`, max length 4000 | Changes since the last public version |
| `promoText` | `string`, max length 170 | Short tagline |
| `marketingUrl` | `string`, max length 255 | Marketing page URL |
| `supportUrl` | `string`, max length 255 | Support page URL |
| `privacyPolicyText` | `string` | Privacy policy for Apple TV |
| `privacyPolicyUrl` | `string`, max length 255 | Privacy policy URL (required for all apps) |
| `privacyChoicesUrl` | `string`, max length 255 | URL where users can modify and delete collected data |

Language codes: `ar-SA`, `ca`, `zh-Hans`, `zh-Hant`, `hr`, `cs`, `da`, `nl-NL`, `en-AU`, `en-CA`, `en-GB`, `en-US`, `fi`, `fr-CA`, `fr-FR`, `de-DE`, `el`, `he`, `hi`, `hu`, `id`, `it`, `ja`, `ko`, `ms`, `no`, `pl`, `pt-BR`, `pt-PT`, `ro`, `ru`, `sk`, `es-MX`, `es-ES`, `sv`, `th`, `tr`, `uk`, `vi`.

### Apple release

```json
{
  "configVersion": 0,
  "apple": {
    "release": {
      "automaticRelease": "2022-12-25T00:00:00+00:00"
    }
  }
}
```

| Property | Type | Description |
| --- | --- | --- |
| `automaticRelease` | `boolean \| Date` | `false`: manual release after approval (default). `true`: automatic release after approval. Date (RFC 3339): scheduled release after approval; Apple does not guarantee availability on that date |
| `phasedRelease` | `boolean` | Gradual release over a 7-day period to users with automatic updates on; still available as a manual update. Can be paused for up to 30 days |

### Apple review

```json
{
  "configVersion": 0,
  "apple": {
    "review": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "+1 123 456 7890"
    }
  }
}
```

| Property | Type | Description |
| --- | --- | --- |
| `firstName` | `string`, min length 1 | Contact first name |
| `lastName` | `string`, min length 1 | Contact last name |
| `email` | `string`, email | Contact email |
| `phone` | `string` | Contact phone, prefixed with "+" and the country code |
| `demoUsername` | `string` | User name to sign in for review |
| `demoPassword` | `string` | Password to sign in for review |
| `demoRequired` | `boolean` | Whether sign-in information is required to review features |
| `notes` | `string`, length 2..4000 | Extra review information; do not put demo account details here |

## Notes

- Only the Apple App Store is supported; there is no Google Play section in the schema.
- The VS Code Expo Tools extension provides auto-complete, suggestions, and warnings for this schema.
- Source modificationDate not recorded in the saved original; fetched 2026-10-17.

## Related

- [EAS Metadata](./eas-metadata.md)
- [EAS CLI reference](./eas-cli.md)
