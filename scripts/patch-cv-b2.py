from pathlib import Path

import fitz

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"


def save_in_place(doc: fitz.Document, path: Path) -> None:
    tmp = path.with_suffix(".tmp.pdf")
    doc.save(tmp, garbage=4, deflate=True)
    doc.close()
    tmp.replace(path)


def patch_spanish_visual(path: Path) -> None:
    """Replace the full English-level line in the designed Spanish CV."""
    doc = fitz.open(path)
    page = doc[0]
    line = fitz.Rect(418.60, 810.90, 552.50, 828.20)
    page.add_redact_annot(line, fill=(247 / 255, 248 / 255, 251 / 255))
    page.apply_redactions(
        images=fitz.PDF_REDACT_IMAGE_NONE,
        graphics=fitz.PDF_REDACT_LINE_ART_NONE,
        text=fitz.PDF_REDACT_TEXT_REMOVE,
    )
    page.insert_text(
        (418.87, 817.12),
        "Inglés · B2 · lectura técnica fluida",
        fontsize=6.42,
        fontname="helv",
        color=(70 / 255, 85 / 255, 113 / 255),
        overlay=True,
    )
    save_in_place(doc, path)


def patch_spanish_ats(path: Path) -> None:
    """Replace the full English-level line so ATS extraction contains B2 cleanly."""
    doc = fitz.open(path)
    page = doc[1]
    line = fitz.Rect(55.40, 457.20, 320.00, 470.50)
    page.add_redact_annot(line, fill=(1, 1, 1))
    page.apply_redactions(
        images=fitz.PDF_REDACT_IMAGE_NONE,
        graphics=fitz.PDF_REDACT_LINE_ART_NONE,
        text=fitz.PDF_REDACT_TEXT_REMOVE,
    )
    page.insert_text(
        (55.75, 467.25),
        "Inglés — B2, lectura técnica fluida",
        fontsize=10.0,
        fontname="helv",
        color=(17 / 255, 17 / 255, 17 / 255),
        overlay=True,
    )
    save_in_place(doc, path)


def patch_english_b1_token(path: Path, page_no: int, fontsize: float, fill, color, baseline_offset: float) -> None:
    """Change the existing (B1) token to (B2) without altering surrounding English wording."""
    doc = fitz.open(path)
    page = doc[page_no]
    match = next((w for w in page.get_text("words") if "B1" in w[4]), None)
    if match is None:
        doc.close()
        raise RuntimeError(f"B1 token not found in {path.name}")

    rect = fitz.Rect(match[0], match[1], match[2], match[3])
    replacement = match[4].replace("B1", "B2")
    page.add_redact_annot(rect, fill=fill)
    page.apply_redactions(
        images=fitz.PDF_REDACT_IMAGE_NONE,
        graphics=fitz.PDF_REDACT_LINE_ART_NONE,
        text=fitz.PDF_REDACT_TEXT_REMOVE,
    )
    page.insert_text(
        (rect.x0, rect.y1 - baseline_offset),
        replacement,
        fontsize=fontsize,
        fontname="helv",
        color=color,
        overlay=True,
    )
    save_in_place(doc, path)


for visual_name in ("cv-es.pdf", "cv.pdf"):
    patch_spanish_visual(PUBLIC / visual_name)
patch_spanish_ats(PUBLIC / "cv-es-ats.pdf")

patch_english_b1_token(
    PUBLIC / "cv-en.pdf",
    page_no=0,
    fontsize=6.42,
    fill=(247 / 255, 248 / 255, 251 / 255),
    color=(70 / 255, 85 / 255, 113 / 255),
    baseline_offset=1.38,
)
patch_english_b1_token(
    PUBLIC / "cv-en-ats.pdf",
    page_no=1,
    fontsize=10.0,
    fill=(1, 1, 1),
    color=(17 / 255, 17 / 255, 17 / 255),
    baseline_offset=2.68,
)

print("Spanish and English CV assets patched to English B2.")
