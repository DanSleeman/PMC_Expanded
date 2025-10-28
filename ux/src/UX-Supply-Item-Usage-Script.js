/*
Test Part   232293-20
Equipment   WELDER254B
Used By     21215 (my badge)
Account no  7400-90-9503
Location    17STK 2.24
*/

/*
Things to do with this script
    * Make Badge No field label a required class visibly
        * class='required' > orange asterisk
        * class='plex-require-group' > orange dagger 
            * This is likely the one to use for badge/used by since Used by is required, but badge can be filled in to auto populate
    * Make Used By field label a required class visibly
    * Make Equipment/Tooling ID Required - Should this be universal? I don't think all items being checked out are associated to equipment that exist in the system.
        * Just adding an attribute of aria-required=true to the input does not force requirement.
    * Store certain fields in local session to be repopulated after a checkout
        * Add as secondary click event to apply button?
        * Add a different button for Checkout & Retain Data type transaction?
        * Clear data after a certain amount of time has elapsed
    * 
*/

function deepCloneWithFunctions(obj) {
    //Clones rule object with get/set methods that do not normally get copied
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  const clone = Array.isArray(obj) ? [] : {};

  for (const key of Reflect.ownKeys(obj)) {
    const descriptor = Object.getOwnPropertyDescriptor(obj, key);

    if (descriptor.get || descriptor.set) {
      // Preserve getters/setters exactly
      Object.defineProperty(clone, key, descriptor);
    } else if (typeof descriptor.value === 'object' && descriptor.value !== null) {
      descriptor.value = deepCloneWithFunctions(descriptor.value);
      Object.defineProperty(clone, key, descriptor);
    } else {
      Object.defineProperty(clone, key, descriptor);
    }
  }

  return clone;
}

//=========10/28/2025 Working example of applying requirement to equipment field.
var targetEl = document.querySelector('input[name="EquipmentKey"]');
var referenceEl = document.querySelector('input[name="AccountNo"]');
var refRules = $(referenceEl).data("rules");
var ctx = ko.contextFor(targetEl);
var validator = ctx?.$parent?.validator?.validator;

if (validator) {
  var name = targetEl.getAttribute("name");
    var clonedRules = deepCloneWithFunctions(refRules);
    for (let rule of Object.values(clonedRules)) {
        if (rule.propertyName) rule.propertyName = "EquipmentKey";
  }

  $(targetEl).data("rules", clonedRules);
  $(targetEl).data("valPropertyName", name);

  validator.settings.rules[name] = { required: true };
  validator.settings.messages[name] = { required: "Specify Equipment / Tooling ID." };


  console.log("Attached 'required' validation to", name);
} else {
  console.warn("Could not find active jQuery validator for", targetEl);
}

//===============

