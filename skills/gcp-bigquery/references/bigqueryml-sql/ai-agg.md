---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-ai-agg
---

# The AI.AGG function

## Signature / Usage

The `AI.AGG` function uses a Vertex AI Gemini model to
aggregate data based on natural language instructions that you provide. The
function can process text or multimodal data and returns a single string.

### Use cases

The following are common use cases for the `AI.AGG` function:

- **Sentiment analysis of user reviews.** What is the overall sentiment of user feedback? What are the common positive and negative aspects across reviews? How do users feel about specific aspects of the product (size, price, value)?
- **Content summarization of multimodal data.** What kinds of animals are captured in these images? What are the most common shoe brands in the user-uploaded pictures?
- **Analysis of AI agent performance.** What kinds of tasks did the agent complete the fastest? What kinds of tasks required the most user interactions before completion?
- **Log analysis.** What parts of the application did users interact with the most? What were the most common final user actions before disconnecting?
- **Error clustering and deduplication:** Which internal errors or test failures share the same root cause?

We recommend the `AI.AGG` function for aggregation tasks instead of the
[`AI.GENERATE`](ai-generate.md)
and
[`AI.GENERATE_TEXT`](ai-generate-text.md)
general-purpose AI functions for the following reasons:

- The `AI.AGG` function automatically performs multi-level aggregation through batching data and aggregating the batch results. Because of this process, the `AI.AGG` function is capable of analyzing data that exceeds the size of the standard Gemini context window. The general-purpose AI functions require manually writing multi-level batching logic to achieve similar results. For queries that are small enough to not require multi-level aggregation for high-quality results, the `AI.AGG` function will automatically optimize to skip this process.
- The `AI.AGG` function returns one result per input group, while the `AI.GENERATE` function returns one result per input row and the `AI.GENERATE_TEXT` function returns a table with additional information.

### Syntax

```googlesql
AI.AGG(
  [ DISTINCT ]
  INPUT,
  INSTRUCTION
  [, connection_id => 'CONNECTION']
  [, endpoint => 'ENDPOINT']
  [, max_error_ratio => MAX_ERROR_RATIO]
  [, output_schema => 'OUTPUT_SCHEMA']
)
```

#### Arguments

The `AI.AGG` function takes the following arguments:

- `INPUT`: the data to be aggregated, as either a
  `STRING` value or a `STRUCT` object consisting of `STRING` values,
  [`ObjectRefRuntime` values](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/objectref_functions#objectrefruntime),
  and arrays of `STRING` and `ObjectRefRuntime` values. `ObjectRefRuntime`
  values reference text or multimodal data in Cloud Storage.
  Text and multimodal data must meet the
  [technical specifications](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-flash#technical-specifications)
  for the version of Gemini that you plan to use.
  The `AI.AGG` function supports image, video, audio, text, or PDF files
  represented by `ObjectRefRuntime` values. Rows can contain at most 10 images, or 1
  audio, video, or PDF file.

  For the best performance, we recommend no more than 1,000 distinct groups and the following row counts:
  - For queries on rows containing only text and single images, an input of no more than 20 million rows per query.
  - For queries on rows containing PDF documents, no more than 100,000 rows per query.
  - For queries on rows containing video files, no more than 1,000 rows per query.
  - For queries on rows containing audio files, no more than 10,000 rows per query.

  Queries that exceed these limits might fail and return no results, or only
  partial results. See the `max_error_ratio` argument for details on how the
  `AI.AGG` function handles partial results.

  Inside a [VPC Service Controls](https://docs.cloud.google.com/bigquery/docs/vpc-sc) perimeter, the `AI.AGG`
  function can't process `ObjectRef` values that use
  [delegated access](https://docs.cloud.google.com/bigquery/docs/work-with-objectref#delegated-access), such
  as the `ref` column of an
  [object table](https://docs.cloud.google.com/bigquery/docs/object-table-introduction). Delegated access
  generates a signed HTTPS URL for the object, and
  Agent Platform blocks HTTP and HTTPS fetches
  for projects inside a perimeter, so the function returns the error
  `INVALID_ARGUMENT: HTTP links are not supported for requests restricted by
  VPCSC.` in the `status` field of its output. To analyze the object, pass a
  single-argument `OBJ.MAKE_REF(uri)` value instead, which uses
  [direct access](https://docs.cloud.google.com/bigquery/docs/work-with-objectref#direct-access) and sends
  the Cloud Storage URI to the model without generating a signed URL.
- `INSTRUCTION`: the natural language aggregation prompt
  to apply to the input data, as either a string or
  [query parameter](https://docs.cloud.google.com/bigquery/docs/parameterized-queries).

- `CONNECTION`: a
  [Cloud resource connection](https://docs.cloud.google.com/bigquery/docs/create-cloud-resource-connection)
  in the
  `[PROJECT_ID.]LOCATION.CONNECTION_ID`
  format. This connection is used to communicate with Vertex AI
  and Cloud Storage. If you don't specify a connection, then your
  [Google Account user credentials](https://docs.cloud.google.com/bigquery/docs/permissions-for-ai-functions#run_generative_ai_queries_with_end-user_credentials)
  are used.

- `ENDPOINT`: the
  [Vertex AI endpoint](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/locations)
  to use, which can consist of any
  [Gemini model](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models) that
  doesn't require thinking budget. If you only include the model ID,
  BigQuery automatically identifies and uses the full endpoint in the
  region where the query is processed. If you don't specify any endpoint
  information, BigQuery chooses a model for you.

  BigQuery supports the following models:
  - `gemini-4-hydrogen`
  - `gemini-4-carbon`
  - `gemini-4-argon`
  - `gemini-3.8-flash`
  - `gemini-3.7-flash`
  - `gemini-3.6-flash`
  - `gemini-3.5-flash-lite`
  - `gemini-3.5-flash`
  - `gemini-3.1-flash-lite`

  Agent Platform only supports multi-regional endpoints for these models. Regional endpoints aren't supported. If you specify a short endpoint name that omits the region, such as `gemini-3.5-flash`, then BigQuery selects an endpoint according to the following rules:
  - If your query is run in the `us` region, or any single region in the US, then BigQuery uses the `us` endpoint.
  - If your query is run in the `eu` region, or any single region in the EU other than `europe-west2` or `europe-west6`, then BigQuery uses the `eu` endpoint.
  - For all other locations, including `europe-west2` and `europe-west6`, BigQuery uses the `global` endpoint.

  To specify a specific endpoint, use a fully qualified multi-regional endpoint name in one of the following formats:
  <!-- -->

  - `https://aiplatform.us.rep.googleapis.com/v1/projects/PROJECT_ID/locations/us/publishers/google/models/MODEL_ID`
  - `https://aiplatform.eu.rep.googleapis.com/v1/projects/PROJECT_ID/locations/eu/publishers/google/models/MODEL_ID`
  - `https://aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/global/publishers/google/models/MODEL_ID`

  If your query runs in the `asia-south1` region, then you must use the fully qualified global endpoint name.

  <br />

- `MAX_ERROR_RATIO`: a `FLOAT64` value between `0.0` and
  `1.0` that contains the maximum acceptable ratio of row-level inference
  failures to rows processed on this function. If this value is exceeded, then
  the query fails and BigQuery returns an error message that
  describes the most frequent types of errors. For example, if the value is
  `0.3`, then the query fails if more than 30% of rows processed fail to
  return results. If `max_error_ratio` is set for multiple functions, the query
  fails if the ratio is exceeded on any function. The default value is `1.0`.
  However, the query still fails if inference fails for every row.

- `OUTPUT_SCHEMA`: a `STRING` value that specifies the
  schema of the output as a comma-separated list of fields. Each field consists
  of a name, a data type, and an optional `OPTIONS` clause in which you can
  specify a description of the field. You can also specify `NOT NULL` for a
  field. We recommend using NOT NULL for most fields, otherwise the LLM might
  return NULL for some fields in the response.
  The following example shows how to specify an output schema that contains
  two string fields, `name` and `state`, with a description for the `state`
  field and the `name` field required to be `NOT NULL`:

  ```text
  OUTPUT_SCHEMA => '''
  name STRING NOT NULL,
  state STRING OPTIONS(description = 'The 2-letter abbreviation of the state name')
  '''
  ```

  Supported data types include `STRING`, `INT64`, `FLOAT64`, `BOOL`, `ARRAY`,
  and `STRUCT`. For a `STRUCT` data type, you can specify the `OPTIONS` clause
  on any of its subfields:

  ```text
  OUTPUT_SCHEMA => '''
  location STRUCT<city STRING,
                  state STRING OPTIONS(description = 'The 2-letter abbreviation of the state name')>
  '''
  ```

#### Output

If you do not specify the `OUTPUT_SCHEMA` argument, the `AI.AGG` function
returns a `STRING` value. If you do specify it, the `AI.AGG` function returns a
`STRUCT` value that conforms to the specified schema. If you use the `AI.AGG`
function with a `GROUP_BY` statement, then the function returns one value for
each input group.

If a call to Vertex AI is unsuccessful for any reason, such as
exceeding a quota or model unavailability, then the function returns partial
results. If all calls to Vertex AI fail, the number of invalid
rows or rows that are not successfully processed exceeds `max_error_ratio`, or
if all the input rows are invalid, then the function returns an error.

Function output is capped at 10,000 tokens per group.

### Examples

These examples use the `AI.AGG` function for various sentiment analysis,
content summarization, and data exploration use cases.

#### User sentiment analysis

The following example uses the `AI.AGG` function to analyze viewer sentiment
for a set of movies:

```googlesql
SELECT
  title,
  movie_id,
  AI.AGG(
    review,
    'You will be given user-provided reviews of a movie. Summarize the overall sentiment towards the movie.'
  ) AS sentiment
FROM `bigquery-public-data.imdb.reviews`
WHERE movie_id IN ('tt0339384', 'tt0084787', 'tt0029850')
GROUP BY movie_id, title;
```

The result is similar to the following:

```none
+---------------+-----------+--------------------------------------------------+
|     title     | movie_id  |           sentiment                              |
+---------------+-----------+--------------------------------------------------+
| Mickey's      | tt0339384 | The movie is overwhelmingly well-received, with  |
| PhilharMagic  |           | reviewers consistently praising its spectacular  |
|               |           | 3D effects as the best they've seen. Many        |
|               |           | found it incredibly joyful and exciting,         |
|               |           | bringing smiles to their faces and leaving them  |
|               |           | breathless. The musical numbers and beloved      |
|               |           | Disney characters also significantly contributed |
|               |           | to this positive experience, with some viewers   |
|               |           | even watching the show multiple times.           |
+---------------+-----------+--------------------------------------------------+
|   Alexander   | tt0029850 | Overall, the sentiment towards                   |
|   Nevsky      |           | "Alexander Nevsky" is overwhelmingly positive,   |
|               |           | with many reviewers calling it a cinematic       |
|               |           | masterpiece and a work of art. People especially |
|               |           | love the stunning visuals, particularly the      |
|               |           | iconic battle on the ice, and Prokofiev's        |
|               |           | magnificent musical score. The film is also      |
|               |           | highly regarded for its historical and artistic  |
|               |           | significance, with many noting how it transcends |
|               |           | its propagandistic elements to become great art. |
|               |           | While some acknowledge the film's age and        |
|               |           | its overt propaganda, these points are generally |
|               |           | outweighed by its artistic achievements and      |
|               |           | lasting impact.                                  |
+---------------+-----------+--------------------------------------------------+
|   The Thing   | tt0084787 | The overall sentiment towards "The Thing" is     |
|               |           | overwhelmingly positive, with many reviewers     |
|               |           | hailing it as a masterpiece and one of the best  |
|               |           | horror/sci-fi films ever made. People            |
|               |           | consistently praise its intense tension and      |
|               |           | paranoia, the groundbreaking and enduring        |
|               |           | quality of its practical special effects, and    |
|               |           | its intelligent, suspenseful story. John         |
|               |           | Carpenter's direction and the strong             |
|               |           | ensemble acting, particularly Kurt               |
|               |           | Russell's performance, are also frequently       |
|               |           | highlighted. Reviewers often note that the film  |
|               |           | has aged incredibly well, remaining fresh and    |
|               |           | impactful decades later. While there were some   |
|               |           | initial criticisms regarding its box office      |
|               |           | performance and a few minor points about the     |
|               |           | score or character depth, these are largely      |
|               |           | overshadowed by the widespread acclaim for its   |
|               |           | psychological depth, terrifying effects, and     |
|               |           | lasting suspense.                                |
+---------------+-----------+--------------------------------------------------+
```

#### Common categories

The following example uses the `AI.AGG` function to determine the most-used
languages in a set of comments:

```googlesql
WITH sample_data AS (
  SELECT title, comment
  FROM `bigquery-public-data.samples.wikipedia`
  WHERE comment IS NOT NULL
  LIMIT 5000
  )
SELECT
  AI.AGG(
    TO_JSON_STRING(t),
    'These are wikipedia comments. What are the most used languages?'
  ) AS most_used_language
FROM sample_data as t;
```

The result is similar to the following:

```none
+-----------------------------------------------------------------------------+
|                          most_used_language                                 |
+-----------------------------------------------------------------------------+
| The most used language in the Wikipedia comments is English, by a           |
| significant margin. Other languages that appear frequently include French,  |
| German, Italian, and Dutch.                                                 |
+-----------------------------------------------------------------------------+
```

#### Image content summarization

The following example uses the `AI.AGG` function to summarize the contents of a
set of images:

```googlesql
# Create a dataset
CREATE SCHEMA IF NOT EXISTS cymbal_pets;

# Create an object table
CREATE OR REPLACE EXTERNAL TABLE cymbal_pets.product_images
WITH CONNECTION us.example_connection
OPTIONS (
  object_metadata = 'SIMPLE',
  uris = ['gs://cloud-samples-data/bigquery/tutorials/cymbal-pets/images/*.png']
);

# Summarize content of images in the object table
SELECT
  AI.AGG(
    STRUCT(OBJ.GET_ACCESS_URL(ref, 'r')),
    'What are the major categories of these images?'
  ) AS category_description
FROM
  `cymbal_pets.product_images`;
```

The result is similar to the following:

```none
+-----------------------------------------------------------------------------+
|                         category_description                                |
+-----------------------------------------------------------------------------+
| The images primarily fall into the category of Pet Supplies. Within this    |
| main category, the most common types are Pet Food, Pet Accessories,         |
| Aquarium Supplies, Pet Care Products (non-food), Pet Toys, and Pet          |
| Habitats. There are also a few images in an "Other" category and one image  |
| of Craft Supplies.                                                          |
+-----------------------------------------------------------------------------+
```

#### Most frequent items

The following example uses the `AI.AGG` function to find the most referenced
companies in a set of news articles:

```googlesql
SELECT
  AI.AGG(
    TO_JSON_STRING(t),
    'In the following tech news articles, what are the top 3 most referenced companies, and what are they famous for?'
  ) AS tech_news_companies
FROM (SELECT * FROM `bigquery-public-data.bbc_news.fulltext` LIMIT 30000) AS t
WHERE t.category = 'tech';
```

The result is similar to the following:

```none
+-----------------------------------------------------------------------------+
|                          tech_news_companies                                |
+-----------------------------------------------------------------------------+
| Here are the top 3 most referenced companies across all the provided tech   |
| news, along with what they are famous for:                                  |
|                                                                             |
| 1.  **Microsoft** (referenced 64 times)                                     |
|     **Famous for:** Its dominant **Windows operating system**, the          |
|     **Xbox gaming console** , and a wide array of **software products**     |
|     (including Office, Internet Explorer, and security tools). Microsoft is |
|     consistently mentioned for its efforts in computer security, combating  |
|     piracy, and its significant presence in both consumer electronics       |
|     and enterprise solutions.                                               |
|                                                                             |
| 2.  **Apple** (referenced 42 times)                                         |
|     **Famous for:** Its innovative and design-led                           |
|     **consumer electronics**, particularly the highly successful            |
|     **iPod digital music player** and **Macintosh computers** (including    |
|     the Mac Mini and Powerbook). Apple is also known for its iTunes online  |
|     store, its secrecy regarding new products, and its legal battles to     |
|     protect intellectual property.                                          |
|                                                                             |
| 3.  **Sony** (referenced 30 times)                                          |
|     **Famous for:** Its prominent role in **consumer electronics**          |
|     and the **gaming industry**, especially with its                        |
|     **PlayStation series of consoles** (PS2, PS3, PSP). Sony is also        |
|     recognized for its involvement in DVD technology (Blu-ray Disc),        |
|     humanoid robots (Qrio), and its broader range of consumer electronics   |
|     products.                                                               |
+-----------------------------------------------------------------------------+
```

#### Text summarization

The following example uses the `AI.AGG` function to summarize blog topics that
are grouped by author:

```googlesql
WITH sample_data AS (
  SELECT *
  FROM `bigquery-public-data.hacker_news.full` AS t
  WHERE t.text IS NOT NULL
    AND t.type = 'story'
    AND t.by IN UNNEST(['amichail', 'kids_book', 'whoishiring', 'michaelmayer'])
  LIMIT 30000
  )
SELECT
  t.by,
  AI.AGG(
    t.text,
    'These are the hacker news blog posts of a single user. Tell me what topics the user talks about the most. Keep it concise.'
    ) AS common_topic
FROM sample_data AS t
GROUP BY t.by;
```

The result is similar to the following:

```none
+--------------+---------------------------------------------------------------+
|     by       |                          common_topic                         |
+--------------+---------------------------------------------------------------+
|   amichail   | The user talks most about Artificial Intelligence and         |
|              | Machine Learning, followed by general Technology and          |
|              | Software Development (especially the Apple ecosystem), and    |
|              | Gaming and Game Development. They also frequently discuss     |
|              | social dynamics, human behavior, and education.               |
+--------------+---------------------------------------------------------------+
| whoishiring  | This user primarily discusses job-related topics on Hacker    |
|              | News. They frequently provide guidelines for job postings     |
|              | (for companies), job seekers ("Who wants to be hired?"), and  |
|              | freelancers. Remote work is a significant sub-theme, and      |
|              | they show a specific interest in connecting refugees with     |
|              | employment opportunities. They also touch on general Hacker   |
|              | News community guidelines and job search resources.           |
+--------------+---------------------------------------------------------------+
| michaelmayer | The user primarily discusses mobile technology (especially    |
|              | Apple and Android), web design and development, social media  |
|              | (particularly Twitter and Facebook), giveaways, bundles, and  |
|              | inspiration and creativity.                                   |
+--------------+---------------------------------------------------------------+
|  kids_book   | The user most frequently discusses anti-bullying, often       |
|              | promoting the children's book "Butterfly Me" as a resource.   |
|              | They also frequently talk about children's books in general,  |
|              | particularly those by Evon Latrail, including "When Mommy     |
|              | Went to Heaven" which addresses death and grief for children. |
|              | Giveaways and promotions, especially for "Butterfly Me,"      |
|              | are also a recurring theme.                                   |
+--------------+---------------------------------------------------------------+
```

#### Handle inference errors

The following query summarizes a particular author's blog posts, but sets
`max_error_ratio` to `0.05`, meaning the query fails if more than 5% of rows
encounter an error during inference or input validation:

```googlesql
WITH sample_data AS (
  SELECT *
  FROM `bigquery-public-data.hacker_news.full` AS t
  WHERE t.text IS NOT NULL
    AND t.type = 'story'
    AND t.by = 'kids_book'
  LIMIT 30000
  )
SELECT
  t.by,
  AI.AGG(
    t.text,
    'These are the hacker news blog posts of a single user. Tell me what topics the user talks about the most. Keep it concise.',
    max_error_ratio => 0.05
    ) AS common_topic
FROM sample_data AS t
```

If the query exceeds the 0.05 error ratio, it fails and returns an error message
similar to the following:
`Query failed because AI functions exceeded their allowed error ratio`.

#### Using `output_schema` for structured output

The following example uses a similar query to the previous examples, but with
a structured output schema:

```googlesql
WITH sample_data AS (
  SELECT *
  FROM `bigquery-public-data.hacker_news.full` AS t
  WHERE t.text IS NOT NULL
    AND t.type = 'story'
    AND t.by IN UNNEST(['amichail', 'kids_book', 'whoishiring', 'michaelmayer'])
  LIMIT 30000
  )
SELECT
  t.by,
  AI.AGG(
    t.text,
    'These are the hacker news blog posts of a single user. Tell me what topics the user talks about the most. Keep it concise.',
    output_schema =>
      'topics ARRAY<STRUCT<name STRING NOT NULL, explanation STRING NOT NULL>>'
    ) AS common_topic
FROM sample_data AS t
GROUP BY t.by;
```

The result is similar to the following:

```none
+--------------+------------------------------------------------+------------------------------+
|      by      |        common_topic.topics.explanation         |   common_topic.topics.name   |
+--------------+------------------------------------------------+------------------------------+
| michaelmayer | The user frequently discusses the iPhone,      | Mobile Technology            |
|              | iPad, and Android ecosystems, focusing on app  |                              |
|              | reviews and market trends.                     |                              |
|              +------------------------------------------------+------------------------------+
|              | A strong emphasis on visual arts, including    | Design and Creative          |
|              | typography, photography, illustration, and web | Inspiration                  |
|              | design trends.                                 |                              |
|              +------------------------------------------------+------------------------------+
|              | Technical content centered on WordPress        | Web Development and          |
|              | themes, plugins, and foundational web          | WordPress                    |
|              | standards like HTML5 and CSS3.                 |                              |
|              +------------------------------------------------+------------------------------+
|              | Occasional advice regarding freelancing,       | Professional Development and |
|              | client management, and the role of social      | Digital Marketing            |
|              | media in branding.                             |                              |
+--------------+------------------------------------------------+------------------------------+
|   amichail   | The user focuses on the indie hacker           | Software and Indie           |
|              | lifestyle, app development, and the need for   | Development                  |
|              | simplified, creative coding tools.             |                              |
|              +------------------------------------------------+------------------------------+
|              | A strong interest in how AI can automate       | AI and Future Technology     |
|              | education, augment human creativity, and       |                              |
|              | manage complex social systems.                 |                              |
|              +------------------------------------------------+------------------------------+
|              | The user advocates for self-directed, project- | Educational Reform           |
|              | based learning while critiquing traditional    |                              |
|              | computer science and mathematics education.    |                              |
|              +------------------------------------------------+------------------------------+
|              | Exploration of designing systems and           | Social and Behavioral        |
|              | incentives to nudge human behavior and improve | Engineering                  |
|              | social efficiency.                             |                              |
|              +------------------------------------------------+------------------------------+
|              | Frequent discussion of algorithmic twists on   | Game Design                  |
|              | classic puzzles and mechanics for indie game   |                              |
|              | development.                                   |                              |
+--------------+------------------------------------------------+------------------------------+
| whoishiring  | The user primarily focuses on administering    | Job Market Thread Management |
|              | and standardizing recurring Hacker News        |                              |
|              | threads like 'Who is Hiring,' 'Who wants to be |                              |
|              | hired,' and 'Freelancer' by enforcing strict   |                              |
|              | posting guidelines.                            |                              |
|              +------------------------------------------------+------------------------------+
|              | The user frequently shares and promotes        | Search Tool Promotion        |
|              | community-built tools designed to help users   |                              |
|              | navigate and filter job listings within the    |                              |
|              | platform's threads.                            |                              |
|              +------------------------------------------------+------------------------------+
|              | The user engages in administrative moderation  | Advocacy and Moderation      |
|              | tasks and occasionally advocates for specific  |                              |
|              | initiatives, such as refugee employment        |                              |
|              | programs.                                      |                              |
+--------------+------------------------------------------------+------------------------------+
|  kids_book   | The user primarily uses their platform to      | Book Promotion               |
|              | market their books, specifically 'Butterfly    |                              |
|              | Me' and 'When Mommy Went to Heaven'.           |                              |
|              +------------------------------------------------+------------------------------+
|              | A significant portion of content is dedicated  | Personal Branding and Social |
|              | to aggressive outreach and brand building      | Media                        |
|              | across platforms like Facebook, Twitter, and   |                              |
|              | Instagram.                                     |                              |
|              +------------------------------------------------+------------------------------+
|              | The user frequently utilizes Visa gift card    | Incentive Marketing          |
|              | giveaways to drive engagement and book sales.  |                              |
+--------------+------------------------------------------------+------------------------------+
```

### Locations

You can run the `AI.AGG` function in any BigQuery region as long
as your endpoint location supports the Gemini model that you're
using. If your query processing region doesn't have a supported
Gemini endpoint, you must specify a full endpoint that is
supported, such as the model's global endpoint. For more information, see
[Google model endpoint locations](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/locations#google-models).

### Manage inference costs

Inference using the Vertex AI Gemini model can be a
relatively expensive operation. Due to the nature of query processing in
BigQuery, the actual number of rows processed by the model might differ
from what you expect, particularly when running complex queries, such as
`JOIN` or `ORDER BY ... LIMIT` clauses. To strictly control the number of rows
processed by your complex queries, we
recommended that you write the results of your query
to a separate table beforehand, and then
perform the Gemini inference directly on that materialized table.
For information about how to view inference charges that you incur in Agent Platform, see
[Track costs](https://docs.cloud.google.com/bigquery/docs/generative-ai-overview#track_costs). To estimate
the token count of text input, use the
[`AI.COUNT_TOKENS` function](ai-count-tokens.md).

Because the `AI.AGG` function uses batching and aggregation to analyze data that
exceeds the size of the standard Gemini context window, the total
number of tokens that are sent to Gemini is greater than the
number of tokens in the source data.

### Quotas and limits

<br />

For quota and limit information, see
[Generative AI functions](https://docs.cloud.google.com/bigquery/quotas#generative_ai_functions) in the
BigQuery quotas and limits reference.
For information about managing the cost of this function, see
[Control costs with token quotas](https://docs.cloud.google.com/bigquery/docs/control-genai-costs).

### Known issues

The `AI.AGG` function has the following known issues:

- If you provide a NULL `instruction` to the `AI.AGG` function, it might return an internal error instead of an invalid query error.

### What's next

- For more information about using generative AI functions in BigQuery, see [Generative AI overview](https://docs.cloud.google.com/bigquery/docs/generative-ai-overview).
- For more information about how to apply generative AI models to your workflow, see [End-to-end user journeys for generative AI models](https://docs.cloud.google.com/bigquery/docs/e2e-journey-genai).
- For information about building task-specific solutions with generative AI functions through the Cloud AI APIs, see [Task-specific solutions overview](https://docs.cloud.google.com/bigquery/docs/ai-application-overview).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-ai-agg (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.

## Related

- [Index of this directory](./README.md)
