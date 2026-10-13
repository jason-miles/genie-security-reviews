# 02. What data reaches an LLM

Databricks states it "sends only the data needed to provide the service," that the data respects Unity Catalog permissions, and that data a user cannot access is not sent. The inventory below lists what each feature can send. **Metadata and data values are both in scope**; do not assume only schemas are shared.

| Feature | Sent to the model |
|---|---|
| **Genie Agents** (Chat and Agent mode) | Natural-language prompt; table names and descriptions; relevant data values; general instructions; example SQL queries; SQL functions. Agent mode also iterates on query results. |
| **Genie One** | Natural-language question; metadata (table and column names, descriptions, sample values). Can reach external sources (for example Google Drive, Microsoft 365, Slack) where connected. |
| **Genie Code** | Code and queries from notebook cells; table and column names and descriptions; prior questions; favorite tables. With partner-powered features enabled it can also analyze cell outputs and read data samples from tables. |
| **AI-generated comments** | Metadata for documented objects (catalog, schema, table, function, model, volume names), current comments, column details. |
| **Genie Ontology** | Extracts from metric views, dashboards, SQL queries, Genie Agents; respects source-asset permissions. |
| **File uploads in Genie** | A subset of uploaded data is sent to the model (per vendor documentation). |

## Two model calls in Chat mode (field guidance)

| Call | Content | Result |
|---|---|---|
| 1. Generate SQL | Question, names, descriptions, instructions, example SQL, and (with Prompt Matching on) sampled column values | SQL text |
| 2. Summarize | A **sample of result rows** after the SQL ran as the user | Natural-language answer |

Public data lists do not mention result rows; Databricks field material does. Treat result samples as sent until confirmed otherwise ([open question Q1](../notes/open-questions.md)). Because the SQL ran as the user, filtered and masked rows are already redacted before sampling.

**Prompt Matching** (format assistance and entity matching) offers representative and distinct column values to the model. Public documentation states these values are generated with the **author's** data permissions, so they are not limited to what the asking user can see. Entity matching cannot be enabled on tables with row filters or column masks. Field material describes up to 24 sampled values per column in the prompt; that figure is unconfirmed. See [06](06-access-control-and-governance.md#prompt-matching-value-sampling).

## Mode matters

| Mode | Data exposure profile |
|---|---|
| Genie Agents Chat | Metadata plus relevant matched values; single-query SQL generation |
| Genie Agents Agent | Chat inputs plus intermediate query results across many steps; may include unstructured files in volumes and MCP-connected external sources |
| Genie Code autocomplete | Databricks-hosted model; local code context |
| Genie Code agentic | Cell outputs and table samples; executes code (see [06](06-access-control-and-governance.md)) |

## Controls that reduce what is sent

- Unity Catalog permissions, row filters, and column masks limit what any user, and therefore any prompt, can contain.
- Tag-based or attribute-based masking of sensitive columns before enabling Genie on a table.
- Curate Genie Agents to the minimum tables and columns required; avoid wide schemas.
- Turn off Prompt Matching (format assistance and entity matching) **per column** in the Genie Agent, or use the table-level option where your UI offers it. See [06](06-access-control-and-governance.md#prompt-matching-value-sampling).
- Turn off partner-powered AI features where the business case does not require Genie Chat/Agent modes (note: this disables those features; see [03](03-model-providers-by-cloud.md)).

## What is not sent

Databricks does not use these inputs or outputs to train generative foundation models it makes available to third parties (see [05](05-metadata-retention-and-training.md)).
