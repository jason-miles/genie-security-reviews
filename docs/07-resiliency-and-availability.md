# 07. Resiliency and availability

> **Scope note:** this page is a framework. Public documentation reviewed for this library does not publish Genie-specific SLAs, RTO/RPO, or model-provider failover behaviour. Those items are listed as questions for the account team (see [open questions](../notes/open-questions.md)). Nothing here is a service commitment.

## Dependency map

| Layer | Failure effect on Genie | Customer lever |
|---|---|---|
| Customer storage and Unity Catalog metastore | Tables unreadable; Genie returns errors or empty results | Cloud-native replication, metastore backup and DR design |
| SQL warehouse (serverless or pro) | No query execution | Warehouse sizing, auto-scaling, serverless failover characteristics, a second warehouse |
| Control plane (orchestration, conversation store) | Genie UI or API unavailable | Regional choice; platform SLA |
| Model endpoint (provider or Databricks-hosted) | Genie cannot generate SQL or text | Provider diversity is managed by Databricks; customers cannot select or fail over models for assistive features |
| Cross-Geo routing | Added dependency on another Geo's capacity | Documented regional capacity constraints can affect availability; ask the account team |

## Characteristics to understand

- **No user model picker** for assistive features: Databricks selects the provider per mode, and versions change. Behaviour can change without customer action.
- **Provider outage**: a feature backed by a single provider route for your region is unavailable when that route is. Features that fall back to Databricks-hosted models (for example Genie Code non-agentic when the partner-powered setting is off) have a different dependency profile.
- **Regional capacity**: model capacity in some regions can be constrained; confirm availability for your region before committing a production workload.
- **Setting changes**: the partner-powered setting is being locked on 1 Nov 2026 ([03](03-model-providers-by-cloud.md#upcoming-setting-change)). A security decision to disable features cannot be reversed or applied later without the account team.
- **Preview features**: assume reduced guarantees until GA.

## Resilience designs

| Need | Pattern |
|---|---|
| Business-critical natural-language analytics | Do not rely solely on assistive Genie; publish certified dashboards and metric views alongside |
| Programmatic use | Build with the Conversation API plus retry/backoff; degrade to saved queries |
| Strict model control | Build your own agent on model serving with a selected, contractually fixed model and failover list |
| Cross-region DR | Replicate data and metastore; recreate Genie Agents from exported definitions (Genie Agents can be exported/imported) |
| Auditability during incidents | Export audit and query-history tables to a SIEM outside the workspace |

## Backup of Genie configuration

Genie Agent definitions (instructions, example SQL, tables) can be exported and imported via the API/CLI. Keep them in source control and promote through environments (dev, test, prod) with the same release process as code.

## Questions for the account team

See [questionnaire](10-security-review-questionnaire.md) section F.
