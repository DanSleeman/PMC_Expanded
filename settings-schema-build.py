import json
import os

settings_keys = [
    "key",
    "type",
    "default",
    "parent",
    "label",
    "tooltipText",
    "tooltipType",
    "category",
    "group",
    "dependsOn",
]

setting_template ={
    }

settings_schema = []
schema = open('settings-schema-test.js','r').read()
input_settings = json.loads(schema)

supplem_schema = json.loads(open('settings-schema-supplemental.json','r').read())


for s in input_settings:
    d = {}
    for k in settings_keys:
        d[k] = s.get(k,"")
        # print()
    sup = [b for b in supplem_schema if b['key'] == s['key']]
    if not sup:
        continue
    sup = sup[0]
    for k,v in sup.items():
        d[k] = s.get(k,v)
    settings_schema.append(d)
#===== code below here was for initially creating the schema test file=====
    # category = 'UX' if 'Ux' in s else 'CLASSIC'
    # label = ""
    # dependsOn = ""
    # group = ""
    # if 'Bool' in s:
    #     _type = 'checkbox'
    #     default = True
    # elif 'Str' in s:
    #     _type = 'text'
    #     default = ""
    # elif 'Opt' in s:
    #     _type = 'select'
    #     default = ""
    # elif 'List' in s:
    #     _type = 'largeText'
    #     default = ""
    # d = setting_template.copy()
    # d['key'] = s
    # d['type'] = _type
    # d['default'] = default
    # d['label'] = label
    # d['dependsOn'] = dependsOn
    # d['group'] = group
    # d['category'] = category
    # settings_schema.append(d)
with open('settings-schema-test.js', 'w+') as f:
    json.dump(settings_schema, f, indent=4)
