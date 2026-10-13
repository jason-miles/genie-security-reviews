"""Build templates/security-review-questionnaire.{xlsx,csv} from docs/10-security-review-questionnaire.md.

Question rows are markdown table rows whose first cell is an ID such as A1 or J12. Any such row that
fails to parse aborts the build, so a question can never be dropped silently.
"""
import csv
import re
import sys
from pathlib import Path

from openpyxl import Workbook
from openpyxl.styles import Alignment, Font, PatternFill
from openpyxl.worksheet.datavalidation import DataValidation

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "docs" / "10-security-review-questionnaire.md"
OUT = ROOT / "templates"

HEAD = ["ID", "Section", "Question", "Evidence to request", "Response", "Status", "Cloud / region", "Owner", "Source and date", "Notes"]
WIDTHS = [6, 22, 60, 34, 50, 16, 18, 16, 24, 40]
STATUSES = "Not started,In progress,Answered,Needs confirmation,Accepted risk,Blocked"

SECTION = re.compile(r"^## ([A-Z])\. (.+?)\s*$")
ID_ROW = re.compile(r"^\|\s*([A-Z]\d+)\s*\|")
MD_LINK = re.compile(r"\[([^\]]*)\]\([^)]*\)")


def plain(text):
    """Drop markdown links (keep the label) and inline code ticks, so cells read cleanly in a spreadsheet."""
    text = MD_LINK.sub(r"\1", text)
    return text.replace("`", "").strip()


def parse(lines):
    rows, section = [], ""
    for n, line in enumerate(lines, 1):
        line = line.rstrip()
        m = SECTION.match(line)
        if m:
            section = f"{m.group(1)}. {m.group(2)}"
            continue
        if not ID_ROW.match(line):
            continue
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if len(cells) != 3 or not all(cells):
            sys.exit(f"{SRC.name}:{n}: expected 3 non-empty cells (ID | Question | Evidence), got {len(cells)}: {line}")
        rows.append([cells[0], section, plain(cells[1]), plain(cells[2])])
    return rows


def blank_padded(row):
    return row + [""] * (len(HEAD) - len(row))


def write_csv(rows):
    # utf-8-sig adds a BOM so Excel opens non-ASCII text correctly.
    with open(OUT / "security-review-questionnaire.csv", "w", newline="", encoding="utf-8-sig") as f:
        w = csv.writer(f)
        w.writerow(HEAD)
        w.writerows(blank_padded(r) for r in rows)


def write_xlsx(rows):
    wb = Workbook()
    ws = wb.active
    ws.title = "Questionnaire"
    ws.append(HEAD)
    for r in rows:
        ws.append(blank_padded(r))

    fill = PatternFill("solid", fgColor="1B3139")
    for c in ws[1]:
        c.font = Font(bold=True, color="FFFFFF")
        c.fill = fill
        c.alignment = Alignment(vertical="center", wrap_text=True)
    for letter, width in zip("ABCDEFGHIJ", WIDTHS):
        ws.column_dimensions[letter].width = width
    for row in ws.iter_rows(min_row=2):
        for c in row:
            c.alignment = Alignment(vertical="top", wrap_text=True)

    # Freeze only the ID column so the fill-in columns stay visible on a narrow screen.
    ws.freeze_panes = "B2"
    ws.auto_filter.ref = ws.dimensions
    dv = DataValidation(type="list", formula1=f'"{STATUSES}"', allow_blank=True)
    ws.add_data_validation(dv)
    dv.add(f"F2:F{len(rows) + 1}")

    guide = wb.create_sheet("How to use")
    for line in [
        "Fill Response, Status, Cloud / region, Owner, and Source and date for each question.",
        "Cite a public document or a written statement from the vendor; record the date.",
        "Use 'Needs confirmation' for items that only a vendor can settle.",
        "Questions come from docs/10-security-review-questionnaire.md in the genie-security-reviews repository.",
    ]:
        guide.append([line])
    guide.column_dimensions["A"].width = 110
    wb.save(OUT / "security-review-questionnaire.xlsx")


def main():
    rows = parse(SRC.read_text(encoding="utf-8").splitlines())
    if not rows:
        sys.exit("no questions parsed")
    ids = [r[0] for r in rows]
    if len(ids) != len(set(ids)):
        sys.exit("duplicate question IDs")
    OUT.mkdir(exist_ok=True)
    write_csv(rows)
    write_xlsx(rows)
    print(len(rows), "questions")


if __name__ == "__main__":
    main()
