# Genie security on AWS

Reviewed 13 Oct 2026. Read with [03 Model providers](../03-model-providers-by-cloud.md) and [04 Sovereignty](../04-data-sovereignty-and-geos.md).

## Model paths (partner-powered features enabled)

| Feature | Providers |
|---|---|
| Genie Agents Chat | Azure OpenAI service, OpenAI on Databricks |
| Genie Agents Agent mode | OpenAI on Databricks, Anthropic on Databricks |
| Genie One | OpenAI on Databricks, Anthropic on Databricks |
| Genie Code non-agentic | Azure OpenAI service, OpenAI on Databricks |
| Genie Code agentic | Azure OpenAI, OpenAI on Databricks, Anthropic on Databricks |
| Autocomplete | Databricks-hosted |

Implication: an AWS workspace can have a prompt processed by the **Azure OpenAI service** (Microsoft-operated, a different cloud) in addition to Databricks-hosted OpenAI and Anthropic endpoints. List Microsoft as a model-hosting sub-processor in the review. Anthropic on Databricks is described as hosted by Databricks within its security perimeter.

## Data plane building blocks

| Concern | AWS construct |
|---|---|
| Data at rest | S3 buckets under Unity Catalog external locations and managed storage |
| Classic compute | EC2 in the customer VPC (Nitro instance types required under the compliance security profile) |
| Serverless | Databricks-operated compute in the workspace region; control with network policies and serverless egress controls |
| Private connectivity | AWS PrivateLink for front-end (users) and back-end (compute to control plane) |
| Keys | AWS KMS customer-managed keys: managed services, workspace storage, serverless; Enterprise tier |
| Identity | SSO via SAML/OIDC IdP, SCIM; IAM Identity Center or Okta commonly |
| Audit | `system.access.audit`, `system.query_history`; CloudTrail for the account's own AWS activity |

## CMK coverage

The managed-services key covers control-plane data including notebooks, secrets, SQL queries, AI/BI dashboards, and Genie Agents. Only AI/BI dashboards created after 1 Nov 2024 are CMK-compatible. Public AWS documentation does not state coverage of Genie conversation data beyond the agents; confirm (Q8).

## Regions and Geos

Workspace region determines the Geo and whether cross-Geo is the default. Regions in the US and EU are processed in-Geo by native endpoints for Designated Services; regions elsewhere (for example some Asia, Middle East and Africa regions) can depend on cross-Geo. Check the AWS designated-services availability matrix for your exact region.

## AWS-specific review points

1. Document the Azure OpenAI hop for Genie Chat on an AWS workspace.
2. Decide whether OpenAI on Databricks and Anthropic on Databricks endpoints meet the data-handling policy; both are Databricks-hosted.
3. Back-end PrivateLink does not remove the model call: model traffic leaves the workspace via Databricks control-plane services, not via your VPC. Verify with network teams.
4. Align KMS key policies and rotation with the managed-services key.
5. Consider compliance security profile (HIPAA, PCI-DSS, FedRAMP, and others): partner-powered features are off by default on such workspaces.

## Sources

AI trust and safety (AWS), partner-powered (AWS), Geos, designated services, customer-managed keys (AWS), compliance security profile. See [11](../11-sources-and-change-log.md).
