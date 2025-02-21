(async () => {
    const module = await import(chrome.runtime.getURL("config.js"));
    module.loadSettings((settings) =>{
        if (settings.vBoolClassicCalendarMassUpdate){

            //--- Finds the two date option lists and adds dates from 2006 to current year.
            function doIt(){
                var i = 2006;
                var y = (new Date()).getFullYear();
            for(; i < y; i++){
                var year = document.getElementById("lstMass_Update_Year");
                var yearOpt = document.createElement("option");
                yearOpt.text = i;
                year.add(yearOpt, i-2006);
                var year2 = document.getElementById("lstMass_Update_Year_By_Day");
                var yearOpt2 = document.createElement("option");
                yearOpt2.text = i;
                year2.add(yearOpt2, i-2006);
                    }
            }

            //--- Triggers the function above to run on page load.
            var go = new doIt ();

}
});
})();
