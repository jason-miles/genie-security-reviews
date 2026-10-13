# Genie security on Azure Databricks

Reviewed 13 Oct 2026. Read with [03 Model providers](../03-model-providers-by-cloud.md) and [04 Sovereignty](../04-data-sovereignty-and-geos.md). Documentation home: Microsoft Learn.

## Model paths (partner-powered features enabled)

| Feature | Providers |
|---|---|
| Genie Agents Chat | Azure OpenAI service |
| Genie Agents Agent mode | Anthropic on Databricks |
| Genie One | Anthropic on Databricks |
| Genie Code non-agentic | Azure OpenAI service |
| Genie Code agentic | Azure OpenAI service and Anthropic on Databricks |
| Genie App Builder | Azure OpenAI service and Anthropic on Databricks |
| AI/BI assistive, AI-generated comments | Azure OpenAI service |
| Autocomplete | Databricks-hosted |

Azure OpenAI is the OpenAI path on Azure; Azure workspaces do not list "OpenAI on Databricks." Content filtering from Azure OpenAI applies. Databricks states it has zero-retention arrangements with the partner, including no retention for abuse monitoring.

Anthropic on Databricks: the public Azure page says endpoints are hosted by Databricks within its security perimeter. Field material has described Claude serving on another cloud for Azure workspaces. Treat as a possible **cross-cloud path** until confirmed (Q3), and ask which region and cloud processes it.

## Data plane building blocks

| Concern | Azure construct |
|---|---|
| Data at rest | ADLS Gen2 under Unity Catalog external locations and managed storage |
| Classic compute | VMs in the customer subscription, VNet injection |
| Serverless | Databricks-operated compute; network connectivity configurations (NCC), private endpoints, and network security perimeter options |
| Private connectivity | Azure Private Link for front-end and back-end |
| Keys | Azure Key Vault and Managed HSM: managed services, managed disks, DBFS root; Premium plan |
| Identity | Microsoft Entra ID; SCIM and automatic identity management |
| Audit | `system.access.audit`, `system.query_history`; Azure Activity and Monitor logs for the subscription |

## CMK coverage (documented)

Managed services keys cover AI/BI dashboards, **Genie Agents**, notebooks, secrets, SQL queries and query history. Only Genie Agents created after **10 April 2025** are encrypted and CMK-compatible; AI/BI dashboards after 1 Nov 2024. Older agents are not retroactively covered, so recreate them if CMK coverage is required. Managed disks CMK does not apply to serverless.

## Regions and Geos

Azure regions map to Geos. EU regions fall in the EU data boundary where Designated Services are available natively. Regions such as South Africa North, Qatar Central, and UAE North can depend on cross-Geo processing for Genie; confirm in the availability matrix. For a policy that forbids processing outside a country, enforcing the Geo setting turns the features off where no native endpoint exists.

## Azure-specific review points

1. Distinguish a Databricks-managed Azure OpenAI deployment from a customer's own Azure OpenAI resource; the zero-retention statement applies to the former.
2. Confirm the hosting cloud and region of Anthropic on Databricks for the workspace (Q3).
3. Entra Conditional Access and Private Link protect user access; they do not govern model calls from the Databricks control plane.
4. If the customer has an Azure policy prohibiting data processing outside a region, check Geo enforcement and Azure OpenAI region together.
5. Where a compliance security profile is on, partner-powered features are off by default; Genie Code non-agentic falls back to Databricks-hosted models only under certain standards (HIPAA supported).

## Sources

AI trust and safety (Azure), partner-powered (Azure), Geos, designated services, customer-managed keys (Azure). See [11](../11-sources-and-change-log.md).
