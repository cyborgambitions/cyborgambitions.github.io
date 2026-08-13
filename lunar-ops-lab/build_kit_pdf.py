"""Build Lunar Ops Lab teacher kit PDF (US Letter)."""
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.lib.utils import ImageReader
from reportlab.platypus import (
    Image,
    KeepTogether,
    ListFlowable,
    ListItem,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

OUT = r"C:\Users\MelG2\mel-space-site\lunar-ops-lab\Lunar-Ops-Lab-Teachers-Kit.pdf"
COVER = r"C:\Users\MelG2\mel-space-site\lunar-ops-lab\cover.jpg"

INK = colors.HexColor("#111318")
MUTED = colors.HexColor("#3d4550")
GOLD = colors.HexColor("#8a7340")
LINE = colors.HexColor("#c9cdd3")
RULE = colors.HexColor("#1a1e24")
PALE = colors.HexColor("#f4f2ec")


def styles():
    base = getSampleStyleSheet()
    s = {
        "stamp": ParagraphStyle(
            "stamp", parent=base["Normal"], fontName="Times-Bold",
            fontSize=8, textColor=GOLD, letterSpacing=1.4, spaceAfter=6,
        ),
        "h1": ParagraphStyle(
            "h1", parent=base["Title"], fontName="Times-Bold",
            fontSize=28, textColor=INK, alignment=TA_LEFT, spaceAfter=8, leading=32,
        ),
        "h2": ParagraphStyle(
            "h2", parent=base["Heading1"], fontName="Times-Bold",
            fontSize=16, textColor=INK, spaceAfter=10, spaceBefore=0, leading=20,
        ),
        "body": ParagraphStyle(
            "body", parent=base["Normal"], fontName="Times-Roman",
            fontSize=11, textColor=INK, leading=15, spaceAfter=6,
        ),
        "muted": ParagraphStyle(
            "muted", parent=base["Normal"], fontName="Times-Italic",
            fontSize=10, textColor=MUTED, leading=13, spaceAfter=8,
        ),
        "cell": ParagraphStyle(
            "cell", parent=base["Normal"], fontName="Times-Roman",
            fontSize=8.5, textColor=INK, leading=11,
        ),
        "th": ParagraphStyle(
            "th", parent=base["Normal"], fontName="Times-Bold",
            fontSize=8, textColor=GOLD, leading=10,
        ),
        "foot": ParagraphStyle(
            "foot", parent=base["Normal"], fontName="Times-Italic",
            fontSize=8, textColor=MUTED,
        ),
    }
    return s


def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(LINE)
    canvas.line(0.7 * inch, 0.55 * inch, 7.8 * inch, 0.55 * inch)
    canvas.setFont("Times-Italic", 8)
    canvas.setFillColor(MUTED)
    canvas.drawString(0.7 * inch, 0.38 * inch, "Lunar Ops Lab  ·  Educational only. Not advice.  ·  @link_mindset")
    canvas.drawRightString(7.8 * inch, 0.38 * inch, str(doc.page))
    canvas.restoreState()


def grid(rows, col_w, s):
    styled = []
    for i, row in enumerate(rows):
        styled.append([
            Paragraph(cell, s["th"] if i == 0 else s["cell"])
            for cell in row
        ])
    t = Table(styled, colWidths=col_w, repeatRows=1)
    t.setStyle(TableStyle([
        ("GRID", (0, 0), (-1, -1), 0.4, LINE),
        ("BACKGROUND", (0, 0), (-1, 0), PALE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("MIN", (0, 1), (-1, -1), 18),
    ]))
    return t


def blank_row(n, fill=""):
    return [fill] * n


def build():
    s = styles()
    story = []
    usable = 7.1 * inch

    # Cover
    img = ImageReader(COVER)
    iw, ih = img.getSize()
    w = usable
    h = w * (ih / iw)
    if h > 2.6 * inch:
        h = 2.6 * inch
        w = h * (iw / ih)
    story.append(Image(COVER, width=w, height=h, hAlign="LEFT"))
    story.append(Spacer(1, 14))
    story.append(Paragraph("TEACHERS KIT  ·  45–60 MIN  ·  v0.1", s["stamp"]))
    story.append(Paragraph("Lunar Ops Lab", s["h1"]))
    story.append(Paragraph("One period. One $2,500 paper book. One Monday lock.", s["body"]))
    story.append(Paragraph("The Moon is not a vibe. It is cadence, customers, and quarters.", s["body"]))
    story.append(Spacer(1, 8))
    story.append(Paragraph(
        "01 The stack &nbsp;&nbsp; 02 Entry gate &nbsp;&nbsp; 03 Operator card &nbsp;&nbsp; "
        "04 Monday lock &nbsp;&nbsp; 05 Friday strip &nbsp;&nbsp; 06 Exit ticket &nbsp;&nbsp; 07 Teacher key",
        s["muted"],
    ))
    story.append(Paragraph(
        "Clone the operator book: lunar-stock-sim.onrender.com/#alpha-base-book",
        s["muted"],
    ))
    story.append(PageBreak())

    # 01
    story.append(Paragraph("01  ·  THE STACK", s["stamp"]))
    story.append(Paragraph("Eight sentences. Then sit down.", s["h2"]))
    stack = [
        "Earth is a delay. The Moon is a job site.",
        "A rocket is infrastructure. A stock price is a vote on who owns the bottleneck.",
        "Cadence without contracts is a story.",
        "Contracts without cadence is a spreadsheet.",
        "A customer is someone with money allocated — NASA, DoD, a constellation, hyperscale. A hypothetical customer is a mood.",
        "If you cannot name the next funded event in quarters, you do not have a thesis. You have a poster.",
        "You get $2,500 of paper. Same size as a family experiment. Not a hedge fund costume.",
        "You do not “invest.” You sit a Monday lock. Educational only. Not advice.",
    ]
    items = [ListItem(Paragraph(t, s["body"]), leftIndent=12) for t in stack]
    story.append(ListFlowable(items, bulletType="1", start="1", leftIndent=18))
    story.append(PageBreak())

    # 02
    story.append(Paragraph("02  ·  ENTRY GATE", s["stamp"]))
    story.append(Paragraph("Name does not enter unless the gate is ≥ 3.", s["h2"]))
    story.append(Paragraph(
        "Green = 1 · Yellow = 0.5 · Red = 0. Four names max. Most books should fail. That is the lesson.",
        s["muted"],
    ))
    qs = [
        ["Q", "Ask", "Name 1", "Name 2", "Name 3", "Name 4"],
        ["1", "Does this reduce cost or raise reliability of mass to the lunar surface?", "", "", "", ""],
        ["2", "Recurring revenue once the base is ops — not a one-shot launch?", "", "", "", ""],
        ["3", "Clear customer with money allocated?", "", "", "", ""],
        ["4", "Bottleneck tech that is hard to substitute?", "", "", "", ""],
        ["5", "Timeline in quarters, not someday?", "", "", "", ""],
        ["", "Gate total (must be ≥ 3)", "", "", "", ""],
    ]
    story.append(grid(qs, [0.35*inch, 3.15*inch, 0.9*inch, 0.9*inch, 0.9*inch, 0.9*inch], s))
    story.append(Spacer(1, 14))
    story.append(Paragraph("One line: who owns the bottleneck?", s["body"]))
    story.append(Paragraph("_" * 78, s["muted"]))
    story.append(PageBreak())

    # 03
    story.append(Paragraph("03  ·  OPERATOR CARD", s["stamp"]))
    story.append(Paragraph("$2,500 paper book.", s["h2"]))
    story.append(Paragraph("Crew / period ________    Date ________    Status: SEED until lock.", s["muted"]))
    book = [
        ["Sleeve", "Name", "Why it cleared the gate", "$"],
        ["Lunar ops", "", "", ""],
        ["Lunar ops", "", "", ""],
        ["Lunar ops", "", "", ""],
        ["Ballast (optional)", "", "Does not need the gate. Say why it is ballast.", ""],
        ["", "Cash", "What you did not spend is a position.", ""],
        ["", "", "Must equal 2,500", "2,500"],
    ]
    story.append(grid(book, [1.4*inch, 1.5*inch, 3.2*inch, 1.0*inch], s))
    story.append(Spacer(1, 16))
    story.append(Paragraph("Thesis (one sentence you will not edit until Friday):", s["body"]))
    story.append(Spacer(1, 4))
    story.append(Table([[""]], colWidths=[usable], rowHeights=[1.1*inch], style=TableStyle([
        ("BOX", (0, 0), (-1, -1), 0.6, LINE),
    ])))
    story.append(PageBreak())

    # 04
    story.append(Paragraph("04  ·  MONDAY LOCK SCRIPT", s["stamp"]))
    story.append(Paragraph("Teacher reads this like a flight director.", s["h2"]))
    script = [
        "<b>0:00</b>  Pens down. Books are open. No phones as oracles.",
        "<b>0:01</b>  “You have twelve minutes. Gate every name. If it is under 3, it does not enter. Cash is allowed.”",
        "<b>0:08</b>  “Write the thesis in one sentence. If you need a paragraph, you do not have a thesis.”",
        "<b>0:11</b>  “Add. The line must be 2,500. If it is not, you are not locked.”",
        "<b>0:12</b>  “Lock. Fold the card. No edits until Friday. That is the whole religion.”",
    ]
    items = [ListItem(Paragraph(t, s["body"]), leftIndent=12) for t in script]
    story.append(ListFlowable(items, bulletType="1", start="1", leftIndent=18))
    story.append(Spacer(1, 12))
    story.append(Paragraph(
        "Optional 10 min: AETHER card — deconstruct “we’re going back to the Moon.” Fundamentals, hidden assumptions, rebuild. No speeches.",
        s["muted"],
    ))
    story.append(Paragraph(
        "Clone homework (not required to pass): lunar-stock-sim.onrender.com/#alpha-base-book — clone, break, rebuild.",
        s["muted"],
    ))
    story.append(PageBreak())

    # 05
    story.append(Paragraph("05  ·  FRIDAY STRIP", s["stamp"]))
    story.append(Paragraph("Zero fluff. Who blinked.", s["h2"]))
    fri = [
        ["", "Week open", "Now", "%"],
        ["BOOK", "", "", ""],
        ["SPY", "", "", ""],
        ["UFO (space ETF)", "", "", ""],
    ]
    story.append(grid(fri, [2.2*inch, 1.6*inch, 1.6*inch, 1.7*inch], s))
    story.append(Spacer(1, 14))
    story.append(Paragraph("Vs SPY: better / worse / same ________", s["body"]))
    story.append(Paragraph("What you would change if you were allowed (you are not, until next Monday):", s["body"]))
    story.append(Table([[""]], colWidths=[usable], rowHeights=[0.9*inch], style=TableStyle([
        ("BOX", (0, 0), (-1, -1), 0.6, LINE),
    ])))
    story.append(PageBreak())

    # 06
    story.append(Paragraph("06  ·  EXIT TICKET", s["stamp"]))
    story.append(Paragraph("Leave the room with a bruise on the narrative.", s["h2"]))
    story.append(Paragraph("Who owns the bottleneck this quarter?", s["body"]))
    story.append(Table([[""]], colWidths=[usable], rowHeights=[1.15*inch], style=TableStyle([
        ("BOX", (0, 0), (-1, -1), 0.6, LINE),
    ])))
    story.append(Spacer(1, 12))
    story.append(Paragraph("One name you wanted that failed the gate, and which question killed it:", s["body"]))
    story.append(Table([[""]], colWidths=[usable], rowHeights=[0.85*inch], style=TableStyle([
        ("BOX", (0, 0), (-1, -1), 0.6, LINE),
    ])))
    story.append(Spacer(1, 12))
    story.append(Paragraph("Cadence without contracts is a ________.  (story)", s["body"]))
    story.append(PageBreak())

    # 07
    story.append(Paragraph("07  ·  TEACHER KEY", s["stamp"]))
    story.append(Paragraph("Answers are process. Not tickers.", s["h2"]))
    keys = [
        "You are not grading whether they picked a famous ticker. You are grading whether the gate was honest.",
        "A book of four greens that cannot name a customer is a fail.",
        "A book of cash plus one name with a real contract is a pass.",
        "If everyone “wins,” the gate is too soft. Tighten Q3 and Q5.",
        "Do not let them trade Friday. The lock is the product.",
        "If a student asks “is this advice?” you say no, then you point at the stamp on every sheet.",
        "License: free to print for a classroom. Do not sell the packet. Keep the disclaimer on every copy.",
    ]
    items = [ListItem(Paragraph(t, s["body"]), leftIndent=12) for t in keys]
    story.append(ListFlowable(items, bulletType="bullet", leftIndent=16, bulletFontName="Times-Bold"))
    story.append(Spacer(1, 18))
    story.append(Paragraph("Melissa  ·  @link_mindset  ·  Build with me. Ad Astra.", s["muted"]))

    doc = SimpleDocTemplate(
        OUT,
        pagesize=letter,
        leftMargin=0.7 * inch,
        rightMargin=0.7 * inch,
        topMargin=0.65 * inch,
        bottomMargin=0.75 * inch,
        title="Lunar Ops Lab — Teachers Kit",
        author="Melissa / @link_mindset",
        subject="Classroom kit. Educational only. Not advice.",
    )
    doc.build(story, onFirstPage=footer, onLaterPages=footer)
    print("wrote", OUT)


if __name__ == "__main__":
    build()
