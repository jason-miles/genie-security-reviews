#!/usr/bin/env python3
"""Check that counts quoted on the home page and README match their sources.

Compares the claims register (V/S/D rows) and the questionnaire table against
the numbers in README.md, index.html, and assets/site.js. Exits 1 on any drift.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def read(rel):
    return (ROOT / rel).read_text(encoding="utf-8")


register = read("notes/claims-register.md")
levels = re.findall(r"^\| \d+[ab]? \|.*\| ([VSD]) \|$", register, re.M)
counts = {k: levels.count(k) for k in "VSD"}
total = len(levels)

questions = len(re.findall(r"^\| [A-Z]\d+ \|", read("docs/10-security-review-questionnaire.md"), re.M))

readme, index, site_js = read("README.md"), read("index.html"), read("assets/site.js")
problems = []


def need(text, label, pattern):
    if not re.search(pattern, text):
        problems.append(f"{label}: expected {pattern!r}")


need(readme, "README claims total", rf"grades all {total} load-bearing")
need(index, "index claims total", rf"grades all {total} load-bearing")
need(site_js, "site.js tot", rf"var tot = {total}\b")
for key in "VSD":
    need(readme, f"README {key} count", rf"\| \*\*{key}\*\* \| {counts[key]} \|")
need(index, "index confidence label", rf'aria-label="{counts["V"]} claims verified')
need(readme, "README question count", rf"\({questions} questions\)")
need(index, "index question count", rf"{questions} questions")

print(f"claims: {total} ({counts}); questions: {questions}")
if problems:
    print("DRIFT:")
    print("\n".join(f"  {p}" for p in problems))
    sys.exit(1)
print("OK: counts consistent")
