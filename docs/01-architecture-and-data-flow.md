# 01. Architecture and data flow

## Planes

| Plane | Contents | Relevance to Genie |
|---|---|---|
| **Control plane** (Databricks-operated) | Web application, APIs, notebooks/commands metadata, job scheduler, Genie/assistant orchestration, control-plane database | Genie orchestration and conversation history live here |
| **Compute plane** (classic: customer cloud account; serverless: Databricks-operated) | SQL warehouses, clusters; executes the generated SQL | Query execution and data reads happen here, under the user's Unity Catalog identity |
| **Customer storage** | Delta tables, volumes in the customer's cloud object storage | Data at rest stays here; Genie does not copy table data into Databricks-owned storage |

Genie question handling needs a SQL warehouse (serverless or pro) for execution regardless of cloud.

## Life of a Genie Agents question (Chat mode)

1. User submits a natural-language question in the UI.
2. Orchestration in the control plane assembles context: question, table and column names and descriptions, relevant sample or matched data values, general instructions, example SQL, SQL functions.
3. Context is sent to the model endpoint selected by the workspace settings (see [03](03-model-providers-by-cloud.md)).
4. The model returns SQL (and text).
5. SQL runs on the warehouse **as the end user**; Unity Catalog enforces permissions, row filters, and column masks.
6. Results render to the user. The conversation and response are stored in the control-plane database.

**Agent mode** adds iteration: the model plans, runs several queries, and reads query results back as further context. More data values can therefore reach the model than in Chat mode. See [02](02-what-data-reaches-an-llm.md).

## Where each step can leave your boundary

| Step | Possible boundary crossing |
|---|---|
| 2 to 3 | Workspace Geo to another Geo if cross-Geo processing is enabled |
| 3 | Databricks control plane to a model host (Databricks-hosted, or the Azure OpenAI service for features that use it) |
| 4 to 6 | Stays within the compute plane and storage |
| 6 | Control-plane database stores history |

## Diagram (text)

```
User -> Workspace UI -> [Control plane: Genie orchestration]
                              |  context (prompt + metadata + values)
                              v
                     Model endpoint (provider/host per setting)
                              |  SQL / text
                              v
                [Control plane] --SQL--> [SQL warehouse] --reads--> [UC-governed data in customer storage]
                              ^                                  (as the end user's identity)
                              |  results
                           User
```

Sources: Databricks Genie Agents concepts; AI assistive features trust and safety. See [11](11-sources-and-change-log.md).
