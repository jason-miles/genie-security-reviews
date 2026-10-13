# 00. How to use this library

## Audience

- Customer security, risk, privacy, and architecture teams reviewing Genie.
- Databricks field teams answering those reviews.

## Suggested reading order

1. [01 Architecture and data flow](01-architecture-and-data-flow.md)
2. [02 What data reaches an LLM](02-what-data-reaches-an-llm.md)
3. [03 Model providers by cloud](03-model-providers-by-cloud.md)
4. [04 Data sovereignty and Geos](04-data-sovereignty-and-geos.md)
5. [05 Metadata, retention, and training](05-metadata-retention-and-training.md)
6. Then the checklist and questionnaire.

## Conventions

- **Sourced** statements link to public documentation in [11 Sources](11-sources-and-change-log.md).
- **To confirm** marks items that public documentation does not settle. They are tracked in [open questions](../notes/open-questions.md).
- Four questions are kept separate throughout because they are routinely conflated:

| Question | Concept |
|---|---|
| *Which company's model answers?* | Model provider (OpenAI, Anthropic, Google, Databricks) |
| *Who operates the endpoint?* | Hosting (Databricks-hosted, Azure OpenAI service, other) |
| *In which geography is it processed?* | Processing location (Geo, cross-Geo setting) |
| *What is stored afterwards, and by whom?* | Retention (partner vs Databricks) |

A "yes" on one does not imply a "yes" on another.

## Naming

| Current | Earlier name |
|---|---|
| Genie Agents | Genie Spaces |
| Genie Code | Databricks Assistant |
| Partner-powered AI features | Databricks Assistant / AI features "powered by Azure OpenAI" |
