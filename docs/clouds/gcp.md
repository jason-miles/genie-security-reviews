# Genie security on Google Cloud (GCP)

Reviewed 13 Oct 2026. Read with [03 Model providers](../03-model-providers-by-cloud.md) and [04 Sovereignty](../04-data-sovereignty-and-geos.md).

## Model paths (partner-powered features enabled)

Public GCP documentation shows the same feature matrix as AWS: Azure OpenAI service, OpenAI on Databricks, and Anthropic on Databricks. **No Google-hosted model (Gemini or Vertex AI) is listed for Genie assistive features.** This surprises GCP customers; state it explicitly.

| Feature | Providers (as summarized; re-verify in source) |
|---|---|
| Genie Agents Chat | Azure OpenAI service, OpenAI on Databricks |
| Genie Agents Agent mode | OpenAI on Databricks, Anthropic on Databricks |
| Genie One | OpenAI on Databricks, Anthropic on Databricks |
| Genie Code | Azure OpenAI, OpenAI, Anthropic by mode; autocomplete Databricks-hosted |

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

Managed services covers control-plane data such as notebooks, secrets, SQL queries, and AI/BI dashboards (only dashboards created after 1 Nov 2024). The public GCP page reviewed does not specify coverage for Genie conversation data; confirm (Q8). Serverless disks are ephemeral and excluded from persistent-disk CMK.

## Regions and Geos

GCP regions map to Geos like other clouds. Check the GCP designated-services matrix for availability and cross-Geo dependence in your region.

## GCP-specific review points

1. Document non-Google model hosts (Azure OpenAI, Databricks-hosted OpenAI and Anthropic) in sub-processor and transfer assessments; the customer may expect Google-only processing.
2. Do not describe Genie on GCP as "Gemini-powered."
3. VPC Service Controls and Private Service Connect protect your data plane and user access; they do not govern control-plane model calls.
4. Confirm feature availability per GCP region; some assistive features are limited.
5. Re-verify this page against the GCP source; the provider table was compiled from a summarized read.

## Sources

Partner-powered (GCP), customer-managed keys (GCP), Geos, designated services, compliance security profile. See [11](../11-sources-and-change-log.md).
