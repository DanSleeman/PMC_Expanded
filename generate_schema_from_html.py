from bs4 import BeautifulSoup
import json
import re

INPUT_FILE = "options.html"
OUTPUT_FILE = "settings-schema-v2.js"


def clean_text(text):
    if not text:
        return ""

    return re.sub(r"\s+", " ", text).strip()


def get_control_type(control):
    tag = control.name.lower()

    if tag == "textarea":
        return "textarea"

    if tag == "select":
        return "select"

    input_type = control.get("type", "text")

    if input_type == "checkbox":
        return "checkbox"

    return "text"


def get_default(control_id, control_type):

    if control_id.startswith("vBool"):
        return True

    if control_id.startswith("vOpt"):
        return 0

    if control_id.startswith("vList"):
        return ""

    if control_id.startswith("vStr"):
        return ""

    return None


def get_tooltip(control):

    parent = control.find_parent(["label", "div", "span"])

    if not parent:
        return None, None

    tooltip = parent.select_one(".tooltiptext")

    if not tooltip:
        return None, None

    tooltip_text = clean_text(tooltip.get_text(" "))

    tooltip_type = "info"

    classes = tooltip.get("class", [])

    if "tooltipwarning" in classes:
        tooltip_type = "warning"

    elif "tooltipimportant" in classes:
        tooltip_type = "important"

    elif "tooltipalert" in classes:
        tooltip_type = "alert"

    return tooltip_text, tooltip_type


def get_label(control):

    parent = control.find_parent("label")

    if not parent:
        return control["id"]

    clone = BeautifulSoup(
        str(parent),
        "html.parser"
    )

    for item in clone.select(".tooltip"):
        item.decompose()

    text = clean_text(clone.get_text(" "))

    return text or control["id"]


def get_select_options(control):

    if control.name != "select":
        return None

    options = []

    for option in control.find_all("option"):

        options.append({
            "value": option.get("value"),
            "text": clean_text(option.get_text())
        })

    return options


with open(INPUT_FILE, "r", encoding="utf-8") as file:
    html = file.read()

soup = BeautifulSoup(html, "html.parser")

settings = []

sort_order = 100

for control in soup.select(
    "input[id], textarea[id], select[id]"
):

    control_id = control["id"]

    control_type = get_control_type(control)

    tooltip_text, tooltip_type = get_tooltip(control)

    schema_entry = {
        "key": control_id,
        "type": control_type,

        "default":
            get_default(
                control_id,
                control_type
            ),

        "category": None,
        "group": None,
        "parent": None,

        "label": get_label(control),
        "description": None,

        "tooltipText": tooltip_text,
        "tooltipType": tooltip_type,

        "visibleIf": None,
        "dependsOn": None,

        "sortOrder": sort_order,

        "options":
            get_select_options(control),

        "indentLevel": 0,

        "tags": [],

        "featureFlag": None,

        "version": 1
    }

    settings.append(schema_entry)

    sort_order += 10

schema_text = (
    "export const SETTINGS = "
    + json.dumps(
        settings,
        indent=4
    )
    + ";"
)

with open(
    OUTPUT_FILE,
    "w",
    encoding="utf-8"
) as file:

    file.write(schema_text)

print(
    f"Generated {len(settings)} settings"
)