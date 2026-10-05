from pathlib import Path

import fitz

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"


def patch_visual(path: Path) -> None:
    """Replace the full English-level line in the designed Spanish CV."""
    doc = fitz.open(path)
    page = doc[0]

    # Coordinates come from the committed one-page CV asset.
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

    tmp = path.with_suffix(".tmp.pdf")
    doc.save(tmp, garbage=4, deflate=True)
    doc.close()
    tmp.replace(path)


def patch_ats(path: Path) -> None:
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

    tmp = path.with_suffix(".tmp.pdf")
    doc.save(tmp, garbage=4, deflate=True)
    doc.close()
    tmp.replace(path)


for visual_name in ("cv-es.pdf", "cv.pdf"):
    patch_visual(PUBLIC / visual_name)

patch_ats(PUBLIC / "cv-es-ats.pdf")

print("Spanish CV assets patched to English B2.")
