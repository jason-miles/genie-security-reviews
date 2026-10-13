# Genie security on Google Cloud (GCP)

Reviewed 13 Oct 2026. Read with [03 Model providers](../03-model-providers-by-cloud.md) and [04 Sovereignty](../04-data-sovereignty-and-geos.md).

## Model paths (partner-powered features enabled)

The GCP partner-powered page (checked 13 Oct 2026) lists Azure OpenAI service, OpenAI on Databricks, and Anthropic on Databricks. **No Google-hosted model (Gemini or Vertex AI) is listed for Genie assistive features.** This surprises GCP customers; state it explicitly.

| Feature | Setting enabled | Setting disabled |
|---|---|---|
| Genie Code autocomplete | Databricks | Databricks |
| Genie Code agentic | Azure OpenAI, OpenAI on Databricks, Anthropic on Databricks | Not available |
| Genie Code non-agentic | Azure OpenAI, OpenAI on Databricks | Databricks (non-CSP); CSP depends on compliance standard (HIPAA supported) |
| AI/BI dashboard visualizations and companion Genie Agents (Preview) | Azure OpenAI | Not available |
| Genie Agents Chat | Azure OpenAI, OpenAI on Databricks | Not available |
| Genie Agents Agent mode | OpenAI on Databricks, Anthropic on Databricks | Not available |
| Genie One | OpenAI on Databricks, Anthropic on Databricks | Chat unavailable; asset interaction remains |
| Genie App Builder | Not available on GCP | Not available |
| AI-generated comments | Azure OpenAI | Databricks |

Implication: a workspace on GCP can send prompts to a **Microsoft-operated** model service (Azure OpenAI) and to Databricks-hosted endpoints. Whether the Databricks-hosted endpoints run on GCP or another cloud is not stated in the public pages reviewed; ask (Q3, Q13).

Gemini and other Google models appear only as customer-selected models in Databricks-hosted inference or through external-model endpoints on AI Gateway, governed by the customer's choice of endpoint and region.

## Data plane building blocks

| Concern | GCP construct |
|---|---|
| Data at rest | Google Cloud Storage buckets under Unity Catalog |
| Classic compute | GCE in the customer project and VPC |
| Serverless | Databricks-operated compute; network policies and egress controls |
| Private connectivity | Private Service Connect for front-end and back-end |
| Keys | Cloud KMS customer-managed keys: managed services and workspace storage; Enterprise tier |
| Identity | Google Cloud Identity or federated IdP; SCIM |
| Audit | `system.access.audit`, `system.query_history`; Cloud Audit Logs for the project |

## CMK coverage

The GCP CMK page (Enterprise tier) lists managed-services coverage for AI/BI dashboards (only those created after 1 Nov 2024), notebook source and metadata, PAT and Git credentials, secrets, SQL queries and query history, and Model Serving container images. **Genie Agents are not listed**; confirm coverage (Q8). As on AWS, `statement_text` in query history appears empty until a key is also configured in the system catalog. Serverless disks are ephemeral and excluded from persistent-disk CMK.

## Regions and Geos

GCP regions map to Geos like other clouds. The GCP page showed the same Geo pattern as AWS (table in [04](../04-data-sovereignty-and-geos.md#aws-and-gcp-by-geo)); the one difference found is the Asia cell for Genie Agents Chat. Genie App Builder has no row on the GCP page. Re-check the cell values for your Geo before committing.

## GCP-specific review points

1. Document non-Google model hosts (Azure OpenAI, Databricks-hosted OpenAI and Anthropic) in sub-processor and transfer assessments; the customer may expect Google-only processing.
2. Do not describe Genie on GCP as "Gemini-powered."
3. VPC Service Controls and Private Service Connect protect your data plane and user access. The public pages reviewed do not describe the network path of model calls; get it in writing (Q13) before assuming those controls cover it.
4. Confirm feature availability per GCP region; some assistive features are limited, and Genie App Builder is not available on GCP.
5. Re-check the table against the GCP source when features change; GCP details move faster than this page.

## Sources

Partner-powered (GCP), customer-managed keys (GCP), Geos, designated services, compliance security profile. See [11](../11-sources-and-change-log.md).
