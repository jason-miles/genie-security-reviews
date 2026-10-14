"use strict";

/* Data below mirrors notes/claims-register.md and notes/provider-matrix.md (checked 13 Oct 2026).
   Grade V = checked against source text, S = from a summary, D = Databricks-provided, confirm in writing. */

var REPO = "https://github.com/jason-miles/genie-security-reviews/blob/main/";
var AZ = "Azure OpenAI service";
var OAI = "OpenAI on Databricks";
var ANT = "Anthropic on Databricks";

var HOSTS = {};
HOSTS[AZ] = { note: "Microsoft-operated model service. Databricks states a zero-data-retention endpoint, including no retention for abuse monitoring. Content filtering applies.", grade: "V", cloud: "other" };
HOSTS[OAI] = { note: "Run through Databricks. The partner-powered page does not state the hosting location; ask for it in writing.", grade: "V", cloud: "dbx" };
HOSTS[ANT] = { note: "Documented as hosted by Databricks inside the Databricks security perimeter.", grade: "V", cloud: "dbx" };
HOSTS.Databricks = { note: "Databricks-hosted model, selected and managed by Databricks.", grade: "V", cloud: "dbx" };

/* provider lists per cloud when the partner-powered setting is on */
var FEATURES = {
  chat: {
    label: "Genie Agents, Chat mode",
    on: { aws: [AZ, OAI], azure: [AZ], gcp: [AZ, OAI] },
    off: "none",
    sent: [
      ["V", "Your question, table names and descriptions, relevant data values, general instructions, example SQL queries, SQL functions."],
      ["D", "A sample of result rows may be sent back to phrase the answer. Public lists omit this; field material includes it. Treat as sent."]
    ]
  },
  agent: {
    label: "Genie Agents, Agent mode",
    on: { aws: [OAI, ANT], azure: [ANT], gcp: [OAI, ANT] },
    off: "none",
    sent: [
      ["V", "Everything in Chat mode: question, names, descriptions, relevant values, instructions, example SQL."],
      ["S", "Agent mode runs several queries, so intermediate results likely reach the model. The docs do not state it; treat as sent."]
    ]
  },
  one: {
    label: "Genie One chat",
    on: { aws: [OAI, ANT], azure: [ANT], gcp: [OAI, ANT] },
    off: "oneoff",
    sent: [
      ["V", "Your question and metadata: table and column names, descriptions, sample values."],
      ["V", "Content from connected external sources (Google Drive, Microsoft 365, Slack) if you connect them."]
    ]
  },
  codeagent: {
    label: "Genie Code, agentic",
    on: { aws: [AZ, OAI, ANT], azure: [AZ, ANT], gcp: [AZ, OAI, ANT] },
    off: "none",
    sent: [
      ["V", "Code and queries in the current cell or editor tab, table and column names and descriptions, previous questions, favorite tables."],
      ["V", "As an agent it can also analyze cell outputs and read data samples from tables."]
    ]
  },
  codechat: {
    label: "Genie Code, chat and cell actions",
    on: { aws: [AZ, OAI], azure: [AZ], gcp: [AZ, OAI] },
    off: "dbx",
    sent: [
      ["V", "Code and queries in the current cell or editor tab, table and column names and descriptions, previous questions."]
    ]
  },
  auto: {
    label: "Genie Code, autocomplete",
    on: { aws: ["Databricks"], azure: ["Databricks"], gcp: ["Databricks"] },
    off: "same",
    sent: [
      ["V", "Code context from the editor, handled by a Databricks-hosted model whatever the setting."]
    ]
  },
  builder: {
    label: "Genie App Builder",
    on: { aws: [OAI, ANT], azure: [AZ, ANT], gcp: [] },
    off: "none",
    sent: [
      ["S", "The trust page does not itemize App Builder inputs. Ask the account team before using it with restricted data."]
    ]
  }
};


/* Availability by region, from the designated-services pages (checked 13 Oct 2026).
   N = native in the Geo, X = only with cross-Geo processing, - = not available, ? = not itemized here.
   A trailing symbol is a footnote key into NOTES. Feature keys match FEATURES; "agent" also covers Genie One chat. */
var NOTES = {
  "‡": "With cross-Geo off, traffic is processed in the same country or territory for Brazil, Canada, Japan, Korea, Singapore, and the United Kingdom. Elsewhere in the Geo, models in the Geo serve it.",
  "†": "Asia Geo traffic can be processed in Japan, South Korea, or Singapore.",
  "§": "With cross-Geo off, Japan and Korea process in-country and Indonesia in the Asia Geo. Other Asia countries, including Singapore and Hong Kong, need cross-Geo."
};
var GEO_NAMES = ["Americas", "Asia", "Australia and New Zealand", "Europe", "India", "Mainland China", "Middle East and Africa"];
var GEO_DATA = {
  chat:      ["N‡", "N§", "N", "N‡", "N", "-", "X"],
  agent:     ["N", "N†", "N", "N", "X", "X", "X"],
  codeagent: ["N", "N", "N", "N", "X", "X", "X"],
  codechat:  ["N‡", "N‡", "N", "N‡", "N", "X", "X"],
  auto:      ["?", "?", "?", "?", "?", "?", "?"],
  builder:   ["N", "X", "X", "N", "X", "-", "-"]
};
var GEO_DATA_GCP = JSON.parse(JSON.stringify(GEO_DATA));
GEO_DATA_GCP.builder = ["-", "-", "-", "-", "-", "-", "-"];

var AZ_NAMES = ["United States", "Canada", "Brazil", "Mexico", "Asia Pacific", "Japan", "South Korea", "Australia", "EU Data Boundary", "United Kingdom", "UAE", "Qatar", "India", "South Africa"];
var AZ_DATA = {
  chat:      ["N", "N", "N", "X", "X", "N", "N", "N", "N", "N", "X", "-", "N", "X"],
  agent:     ["N", "X", "X", "X", "X", "N", "X", "N", "N", "X", "X", "-", "X", "X"],
  codeagent: ["N", "X", "X", "X", "X", "N", "X", "N", "N", "X", "X", "-", "X", "X"],
  codechat:  ["N", "N", "N", "X", "N", "N", "N", "N", "N", "N", "X", "-", "N", "X"],
  auto:      ["N", "X", "X", "X", "X", "X", "X", "X", "N", "X", "X", "-", "X", "X"],
  builder:   ["N", "X", "X", "-", "X", "X", "-", "X", "N", "X", "-", "-", "X", "-"]
};

function regionTable(cloud) {
  if (cloud === "azure") return { names: AZ_NAMES, data: AZ_DATA };
  return { names: GEO_NAMES, data: cloud === "gcp" ? GEO_DATA_GCP : GEO_DATA };
}

var KEPT = [
  ["V", "Model partners do not retain prompts or responses, even for abuse monitoring."],
  ["V", "Databricks does not use these inputs or outputs to train generative foundation models it makes available to third parties."],
  ["V", "Databricks stores the conversation: Genie Agent and Genie One conversations in the control-plane database (AES-256); Genie Code chats alongside notebook content."],
  ["D", "Databricks may hold inputs and outputs for a limited operational period (about 30 days quoted). Not published; get it in writing."]
];

var CONFIRM_BASE = [
  ["D", "Which Geo processes the content when cross-Geo processing is on (Q2)."],
  ["D", "The network path of model calls, and whether Private Link controls apply to it (Q13)."]
];

function el(tag, cls, text) {
  var n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text) n.textContent = text;
  return n;
}

function chipItem(grade, text, titleLine) {
  var li = el("li");
  var c = el("span", "chip " + grade, grade);
  c.title = { V: "Checked against source text", S: "Inferred or from a summary; re-check", D: "Databricks-provided; confirm in writing" }[grade];
  li.appendChild(c);
  var d = el("div");
  if (titleLine) {
    d.appendChild(el("span", "hostname", titleLine));
    d.appendChild(el("span", "hostnote", text));
  } else {
    d.textContent = text;
  }
  li.appendChild(d);
  return li;
}

function fillRegions() {
  var sel = document.getElementById("region");
  var rt = regionTable(selected("cloud"));
  var prev = sel.selectedIndex;
  sel.textContent = "";
  rt.names.forEach(function (n, i) {
    var o = document.createElement("option");
    o.value = String(i);
    o.textContent = n;
    sel.appendChild(o);
  });
  sel.selectedIndex = prev >= 0 && prev < rt.names.length ? prev : 0;
}

function selected(name) {
  return document.querySelector('input[name="' + name + '"]:checked').value;
}

function render() {
  var cloud = selected("cloud");
  var fkey = selected("feature");
  var partner = selected("partner") === "on";
  var f = FEATURES[fkey];

  var status = document.getElementById("status");
  var hosts = document.getElementById("hosts");
  var sent = document.getElementById("sent");
  var kept = document.getElementById("kept");
  var confirm = document.getElementById("confirm");
  [hosts, sent, kept, confirm].forEach(function (n) { n.textContent = ""; });
  status.className = "status";

  var providerList = [];
  var line = "";

  if (partner) {
    providerList = f.on[cloud];
    if (!providerList.length) {
      line = "Not available on this cloud.";
      status.classList.add("bad");
    } else {
      line = "Available. " + providerList.length + (providerList.length === 1 ? " model host" : " model hosts") + " can receive the request.";
    }
  } else if (f.off === "none") {
    line = "Not available while partner-powered AI features are off.";
    status.classList.add("bad");
  } else if (f.off === "oneoff") {
    line = "Chat is not available. You can still open Genie One and work with data assets.";
    status.classList.add("bad");
  } else if (f.off === "dbx") {
    providerList = ["Databricks"];
    line = "Falls back to a Databricks-hosted model on workspaces without a compliance security profile. With one, it depends on the compliance standard.";
  } else {
    providerList = ["Databricks"];
    line = "Unchanged. Always a Databricks-hosted model.";
  }
  status.textContent = line;

  var where = document.getElementById("where");
  where.className = "where";
  where.textContent = "";
  if (providerList.length) {
    var rt = regionTable(cloud);
    var idx = Number(document.getElementById("region").value) || 0;
    var cell = rt.data[fkey] ? rt.data[fkey][idx] : "?";
    var code = cell.charAt(0);
    var note = cell.length > 1 ? NOTES[cell.slice(1)] : "";
    var head = el("b");
    var msg = "";
    if (cell === "N\u00a7") { where.classList.add("cross"); head.textContent = "Depends on your country"; msg = "In " + rt.names[idx] + " this feature is native for some countries and needs cross-Geo processing for others."; }
    else if (code === "N") { where.classList.add("native"); head.textContent = "Processed in your Geo"; msg = "Native in " + rt.names[idx] + ". Enforcing the Geo setting keeps it working."; }
    else if (code === "X") { where.classList.add("cross"); head.textContent = "Needs cross-Geo processing"; msg = "In " + rt.names[idx] + " this works only with cross-Geo processing on, so content can be processed in another Geo. Enforcing the Geo turns it off."; }
    else if (code === "-") { where.classList.add("none"); head.textContent = "Not available here"; msg = "Not offered in " + rt.names[idx] + " on this cloud."; }
    else { where.classList.add("unknown"); head.textContent = "Not checked"; msg = "Availability for this feature in " + rt.names[idx] + " is not itemized here; check the designated-services page."; }
    where.appendChild(head);
    where.appendChild(document.createTextNode(msg + (note ? " " + note : "")));
  }

  providerList.forEach(function (p) {
    var h = HOSTS[p];
    hosts.appendChild(chipItem(h.grade, h.note, p));
  });
  if (!providerList.length) hosts.appendChild(chipItem("V", "No model receives a request from this feature in this configuration.", "None"));

  if (providerList.length) f.sent.forEach(function (s) { sent.appendChild(chipItem(s[0], s[1])); });
  else sent.appendChild(chipItem("V", "Nothing is sent to a model for this feature in this configuration."));

  KEPT.forEach(function (k) { kept.appendChild(chipItem(k[0], k[1])); });

  if (providerList.length) {
    var items = CONFIRM_BASE.slice();
    if (providerList.indexOf(ANT) > -1 && cloud === "azure") {
      items.push(["D", "Where Anthropic on Databricks runs for Azure workspaces. The public page says inside the Databricks perimeter; field material describes cross-cloud serving (Q3)."]);
    }
    if (providerList.indexOf(AZ) > -1 && cloud !== "azure") {
      items.push(["V", "On this cloud the Azure OpenAI service is a Microsoft-operated host. List it as a sub-processor."]);
    }
    items.forEach(function (c) { confirm.appendChild(chipItem(c[0], c[1])); });
  } else {
    confirm.appendChild(chipItem("V", "Nothing to confirm for this configuration."));
  }

  var hostBox = document.getElementById("host-node");
  var hostName = document.getElementById("host-name");
  var hostSub = document.getElementById("host-sub");
  var packet = document.getElementById("packet");
  if (providerList.length) {
    hostBox.classList.remove("off");
    hostName.textContent = providerList.length > 1 ? providerList.length + " model hosts" : providerList[0];
    hostSub.textContent = providerList.length > 1 ? "Listed below" : (HOSTS[providerList[0]].cloud === "dbx" ? "Databricks-run endpoint" : "Microsoft-operated");
    packet.style.display = "";
  } else {
    hostBox.classList.add("off");
    hostName.textContent = "No model call";
    hostSub.textContent = "Feature unavailable";
    packet.style.display = "none";
  }
}

function daysLeft() {
  var end = new Date(Date.UTC(2026, 10, 1));
  var now = new Date();
  var ms = end - Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  var d = Math.round(ms / 86400000);
  if (d > 1) return d + " days left";
  if (d === 1) return "1 day left";
  if (d === 0) return "today";
  return "now in effect";
}

function init() {
  fillRegions();
  Array.prototype.forEach.call(document.querySelectorAll('.tracer input[type="radio"]'), function (r) {
    r.addEventListener("change", function () {
      if (r.name === "cloud") fillRegions();
      render();
    });
  });
  document.getElementById("region").addEventListener("change", render);
  document.getElementById("days").textContent = daysLeft();
  Array.prototype.forEach.call(document.querySelectorAll("[data-doc]"), function (a) {
    a.href = REPO + a.getAttribute("data-doc");
  });
  Array.prototype.forEach.call(document.querySelectorAll("[data-raw]"), function (a) {
    a.href = REPO.replace("/blob/", "/raw/") + a.getAttribute("data-raw");
  });
  var tot = 31;
  Array.prototype.forEach.call(document.querySelectorAll("[data-count]"), function (n) {
    var v = Number(n.getAttribute("data-count"));
    n.style.width = (v / tot * 100) + "%";
  });
  render();
}

document.addEventListener("DOMContentLoaded", init);
