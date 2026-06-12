# PMC Truck Shipping Banner Fix Standalone

This addon is a standalone extension that only packages the truck shipping banner fix for cases where deployment to shop floor accounts is desired.

- [PMC Truck Shipping Banner Fix Standalone](#pmc-truck-shipping-banner-fix-standalone)
- [Installation](#installation)
  - [Loading as an unpacked extension](#loading-as-an-unpacked-extension)
  - [Building From Source](#building-from-source)
- [UX Features](#ux-features)
    - [Truck Shipping Unexpected Banner Fix](#truck-shipping-unexpected-banner-fix)

# Installation

[Chrome Addon Store](https://chromewebstore.google.com/detail/pmc-truck-shipping-banner-fix/')

Edge Addon Store: [Link to be determined]('')

## Loading as an unpacked extension

* Download the latest release zip file
* Unzip to a folder
* Enable developer mode on your chromium browser of choice.
* Load this directory as an unpacked extension.

Alternatively:
* Clone the repo.
* Load this directory as an unpacked extension.

## Building From Source

Requirements
* terser
* python
  * htmlmin
  * rcssmin

To build, clone the repo and run:

```bash
python build.py
```
This will package the required files into a zip file.


# UX Features

### Truck Shipping Unexpected Banner Fix
<details>
<summary>Reference Files</summary>

`ux\UX-Truck-Ship-Banner-Fix.js`  
`ux\src\UX-Truck-Ship-Banner-Fix-Script.js`
</details>

Fixes the "unexpected error" banner that appears whenever there is a warning on the truck shipping confirmation popup.

With this enabled, it should properly show the warning banner instead.

