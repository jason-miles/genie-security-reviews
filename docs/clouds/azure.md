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

Azure's designated-services page lists availability per country or region (see the table in [04](../04-data-sovereignty-and-geos.md#azure-by-country-or-region)). Key results for Genie Agents, Genie One, and Genie Code, re-checked 17 Oct 2026 (the source page was updated 14 Oct):

- **Native:** United States and the EU Data Boundary for every Genie feature; Japan and Australia for most.
- **Cross-Geo required:** South Africa, UAE, Mexico, and Qatar for Genie Agents Chat, Agent mode, Genie One, and Genie Code (App Builder is not available in South Africa, UAE, Mexico, or Qatar); Canada, Brazil, India, and South Korea for Agent mode, Genie One, and agentic Genie Code; the UK for Agent mode and Genie One only (agentic Genie Code is native there).
- **Not available:** in Qatar, AI/BI dashboards, AI-generated comments, autocomplete, and Genie App Builder. Genie App Builder is also unavailable in Mexico, South Korea, UAE, and South Africa.
- For AI assistive features in US and EU regions, Americas workspaces use a US-based model and European workspaces (EU Data Boundary and UK) use a Europe-based model, whatever the cross-Geo setting.

For a policy that forbids processing outside a country, enforcing the Geo setting turns the cross-Geo features off.

## Azure-specific review points

1. Distinguish a Databricks-managed Azure OpenAI deployment from a customer's own Azure OpenAI resource; the zero-retention statement applies to the former.
2. Confirm the hosting cloud and region of Anthropic on Databricks for the workspace (Q3).
3. Entra Conditional Access and Private Link protect user access. The public pages reviewed do not describe the network path of model calls; get it in writing (Q13) before assuming those controls cover it.
4. If the customer has an Azure policy prohibiting data processing outside a region, check Geo enforcement and Azure OpenAI region together.
5. With a compliance security profile on, partner-powered features are off by default. For Genie Code non-agentic with the setting off, the Azure page states Databricks-hosted models are available on non-CSP workspaces, and on CSP workspaces only with the **HIPAA** standard; other standards are not supported. Genie Agents, Genie One chat, and agentic Genie Code are unavailable with the setting off.

## Sources

AI trust and safety (Azure), partner-powered (Azure), Geos, designated services, customer-managed keys (Azure). See [11](../11-sources-and-change-log.md).
