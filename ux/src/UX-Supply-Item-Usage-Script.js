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

// adding a new rule to the validator? This didn't seem to do anything. We still need to figure out how to control the computed observable for the field.
ctx.$root.elements['autoID29'].parent.validator.rules.push({
    message: "Specify {0}.",
    name: "required",
    propertyName: "EquipmentKey",
    type: "Boolean"
});

///===========10/28/2025 this script is working visibly
var targetEl = document.querySelector('input[name="EquipmentKey"]');
var referenceEl = document.querySelector('input[name="AccountNo"]');
var ctx = ko.contextFor(targetEl);

if (ctx && ctx.$parent && ctx.$parent.validator) {
  var controller = ctx.$parent.validator;
  var existing = controller.rules.some(r => r.propertyName === "EquipmentKey" && r.name === "required");

  if (!existing) {
    let refRules = controller.rules[0]
    refRules.propertyName = 'EquipmentKey'
    controller.rules.push(refRules);
    console.log("Added required rule to ValidationController for EquipmentKey");
  } else {
    console.log("Rule already exists for EquipmentKey");
  }

  // also set up data("rules") for the UI
  var refRules = $(referenceEl).data("rules");
  if (refRules) {
    let rulesCopy = refRules;
    rulesCopy.required.propertyName = "EquipmentKey";
    $(targetEl).data("rules", rulesCopy);
    $(targetEl).data("valPropertyName", "EquipmentKey");
  }

  // revalidate the form
  controller.validator.element(targetEl);
} else {
  console.warn("Validator controller not found for", targetEl);
}
//=============

//=========10/28/2025 running this after the above code now actually triggers the required validation alert.
var targetEl = document.querySelector('input[name="EquipmentKey"]');
var ctx = ko.contextFor(targetEl);
var validator = ctx?.$parent?.validator?.validator;

if (validator) {
    /*
  var name = targetEl.getAttribute("name");

  // Add the rule to the validator's rule set
  $(targetEl).rules("add", { required: true });

  // Rebuild Plex's rule cache for that element
  $(targetEl).data("rules", {
    required: {
      name: "required",
      message: "Specify {0}.",
      type: "Boolean",
      propertyName: name
    }
  });
  $(targetEl).data("valPropertyName", name);
*/
  // Tell jQuery Validate it has a new field
  validator.settings.rules[name] = { required: true };
  validator.settings.messages[name] = { required: "Specify Equipment / Tooling ID." };


  // Force Plex’s validator to recheck this specific element
  //   validator.element(targetEl);

  console.log("Attached 'required' validation to", name);
} else {
  console.warn("Could not find active jQuery validator for", targetEl);
}

//===============