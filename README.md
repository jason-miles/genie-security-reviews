# Genie Security Reviews

A reference library for Databricks customers (and the teams supporting them) answering security, data-sovereignty, resiliency, and LLM-handling questions about the **Genie family**:

| Product | What it is |
|---|---|
| **Genie Agents** (formerly Genie Spaces) | Curated, per-dataset natural-language agents; Chat mode and Agent mode |
| **Genie One** | Workspace-wide conversational entry point to data assets |
| **Genie Code** (formerly Databricks Assistant) | Coding assistant in notebooks, SQL editor, and files; autocomplete, chat, agentic |
| Related | AI-generated comments, AI/BI dashboard assistive features, Genie App Builder |

All content is **vendor-neutral and customer-neutral**. It covers **AWS, Azure, and GCP** and the model families that can sit behind Databricks AI features: **OpenAI / Azure OpenAI, Anthropic, Google (Gemini), and Databricks-hosted models**.

> **Status:** living reference, last reviewed **13 Oct 2026** against public Databricks documentation. Product behaviour, model providers, and settings change often (see [the partner-powered setting change on 1 Nov 2026](docs/03-model-providers-by-cloud.md#upcoming-setting-change)). Always confirm against the linked sources and with the Databricks account team before relying on a statement in a regulated decision. Nothing here is a contractual commitment.

## Start here

- **Interactive home page:** open [`index.html`](index.html) (a self-contained site with a question tracer; see [Hosting the site](#hosting-the-site)).

- **Short answers:** [FAQ](docs/09-faq.md)
- **Running a review:** [Security review questionnaire](docs/10-security-review-questionnaire.md) and [Hardening checklist](docs/08-admin-controls-and-hardening-checklist.md)

## Index

| # | Document | Answers |
|---|---|---|
| 00 | [How to use this library](docs/00-how-to-use.md) | Audience, reading order, conventions |
| 01 | [Architecture and data flow](docs/01-architecture-and-data-flow.md) | Control plane vs compute plane, where a Genie question travels |
| 02 | [What data reaches an LLM](docs/02-what-data-reaches-an-llm.md) | Per-product inventory: prompts, metadata, values, samples, outputs |
| 03 | [Model providers by cloud](docs/03-model-providers-by-cloud.md) | OpenAI, Azure OpenAI, Anthropic, Google, Databricks-hosted; AWS vs Azure vs GCP |
| 04 | [Data sovereignty and Geos](docs/04-data-sovereignty-and-geos.md) | Geos, cross-Geo processing, residency vs processing |
| 05 | [Metadata, retention, and training](docs/05-metadata-retention-and-training.md) | What is stored, where, for how long; training commitments |
| 06 | [Access control and governance](docs/06-access-control-and-governance.md) | Unity Catalog, identity, row filters, masks, audit |
| 07 | [Resiliency and availability](docs/07-resiliency-and-availability.md) | Failure modes, provider dependency, what to ask for |
| 08 | [Admin controls and hardening checklist](docs/08-admin-controls-and-hardening-checklist.md) | Settings to review and recommended posture |
| 09 | [FAQ](docs/09-faq.md) | Common customer concerns, short sourced answers |
| 10 | [Security review questionnaire](docs/10-security-review-questionnaire.md) | Question bank with evidence to request |
| 11 | [Sources and change log](docs/11-sources-and-change-log.md) | Source URLs, review dates, changes |

## Per-cloud deep dives

| Cloud | Document |
|---|---|
| AWS | [docs/clouds/aws.md](docs/clouds/aws.md) |
| Azure | [docs/clouds/azure.md](docs/clouds/azure.md) |
| GCP | [docs/clouds/gcp.md](docs/clouds/gcp.md) |

## Share with customers

- [One-page leave-behind](docs/leave-behind-one-pager.md)
- Fillable questionnaire: [`templates/security-review-questionnaire.xlsx`](templates/security-review-questionnaire.xlsx) (status dropdown, filters) or [`.csv`](templates/security-review-questionnaire.csv). Regenerate with `python3 scripts/build_questionnaire_sheet.py` (needs `openpyxl`).

## Working notes

- [notes/open-questions.md](notes/open-questions.md): items not yet confirmed from public sources
- [notes/provider-matrix.md](notes/provider-matrix.md): compact feature x cloud x provider table

## Contributing

Keep content customer-neutral: no customer names, workspace IDs, internal-only documents, or unreleased roadmap. Cite a public source for every factual claim and mark anything unverified as such in `notes/open-questions.md`.

## Hosting the site

`index.html` plus `assets/` is a static site with no third-party requests and a strict Content Security Policy.

- **GitHub Pages:** repository Settings, Pages, deploy from branch `main`, folder `/ (root)`. `.nojekyll` is included.
- **Apache:** copy `index.html`, `assets/`, and `.htaccess` to the web root. `.htaccess` sets the CSP, `nosniff`, `no-referrer`, frame denial, and HSTS (needs `mod_headers`).
- **Locally:** `python3 -m http.server --bind 127.0.0.1` in the repo root.
