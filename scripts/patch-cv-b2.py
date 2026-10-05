from pathlib import Path

import fitz

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"


def patch_visual(path: Path) -> None:
    """Patch only the B1 digit in the designed Spanish CV, preserving its layout."""
    doc = fitz.open(path)
    page = doc[0]

    # Coordinates come from the committed one-page CV asset.
    digit = fitz.Rect(506.49, 811.29, 509.11, 818.43)
    page.add_redact_annot(digit, fill=(247 / 255, 248 / 255, 251 / 255))
    page.apply_redactions(
        images=fitz.PDF_REDACT_IMAGE_NONE,
        graphics=fitz.PDF_REDACT_LINE_ART_NONE,
        text=fitz.PDF_REDACT_TEXT_REMOVE,
    )
    page.insert_text(
        (506.49, 817.12),
        "2",
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
    """Replace the whole English line so ATS text extraction contains B2."""
    doc = fitz.open(path)
    page = doc[1]

    line = fitz.Rect(55.50, 457.40, 300.00, 470.30)
    page.add_redact_annot(line, fill=(1, 1, 1))
    page.apply_redactions(
        images=fitz.PDF_REDACT_IMAGE_NONE,
        graphics=fitz.PDF_REDACT_LINE_ART_NONE,
        text=fitz.PDF_REDACT_TEXT_REMOVE,
    )
    page.insert_text(
        (55.75, 467.25),
        "Inglés — profesional básico (B2), lectura técnica fluida",
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
