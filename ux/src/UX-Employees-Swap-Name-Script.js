
function ancestorBySearch(inputs){
    let result = inputs.forEach(input => {
        // Traverse up the DOM to find the ancestor div with the class 'plex-control-group'
        let ancestorDiv = input.closest("div.plex-control-group");
        if (ancestorDiv) {
            console.log('ancesor found')
            console.log(ancestorDiv)
            return ancestorDiv;
        }
    })
    console.log('Results:')
    console.log(result)
    return result;
}

let inputs = document.querySelectorAll("input[name='FirstName']");
let div1 = inputs[0].closest("div.plex-control-group");

inputs = document.querySelectorAll("input[name='LastName']");
let div2 = inputs[0].closest("div.plex-control-group");
let parent = div1.parentNode;
parent.insertBefore(div2, div1);
