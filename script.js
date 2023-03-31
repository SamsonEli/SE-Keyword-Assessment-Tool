const btnSubmit = document.getElementById('submit');
const textBox = document.getElementById('textInput');
let strDocument




// declare the arrays here
let EN_Keywords_Services = ["Keyword", "Services", "Keyword Services"]
let EN_Keywords_Power_Systems = ["Power", "Systems"]
let EN_Keywords_Utilities = ["Utilities", "Keyword"]
let EN_Keywords_E_mobility = ["E-mobility", "mobile", "E"]


let CN_Keywords_Services = ["是"]
let CN_Keywords_Power_Systems = ["我"]
let CN_Keywords_Utilities = ["帅"]
let CN_Keywords_E_mobility = ["的", "爸爸"]





let languageIndex, languageText, categoryIndex, categoryText 
let combinedKeywords = [[EN_Keywords_Services, EN_Keywords_Power_Systems, EN_Keywords_Utilities, EN_Keywords_E_mobility],[CN_Keywords_Services, CN_Keywords_Power_Systems,CN_Keywords_Utilities, CN_Keywords_E_mobility]]

//Chinese, Korean, German, Spanish, French, English
//Power Systems, E-mobility, Services, Utilities



function setParameters() {
    var getLanguage = document.getElementById('language');
    languageIndex = getLanguage.options[getLanguage.selectedIndex].index;
    languageText = getLanguage.options[getLanguage.selectedIndex].text;

    var getCategory = document.getElementById('category');
    categoryIndex = getCategory.options[getCategory.selectedIndex].index;
    categoryText = getCategory.options[getCategory.selectedIndex].text; 
}


btnSubmit.addEventListener("click", function(event){
    let resultDict = {}
    event.preventDefault()
    


    let resultsDiv = document.getElementById('results')

    while (resultsDiv.hasChildNodes()) {
        resultsDiv.removeChild(resultsDiv.firstChild);
      }


    //check the options then set it acording
    setParameters()
    let arr = combinedKeywords[languageIndex][categoryIndex]
    // console.log(arr);


    //add a case statement for the category and language 


    if (textBox.value != "") {
        strDocument = textBox.value.trim(); 
    }
    else {
        let p = document.createElement("p")
        p.innerHTML = "Please input something in the textbox."
        document.getElementById("results").append(p)


    }



    arr.forEach(function(i) {
        let re

        switch(languageText){
            case "Chinese":
            case "Korean":
                console.log('test')
                re = new RegExp(i, 'gi')
                break; 
            default:
                re = new RegExp('\\b' + i + '\\b','gi')        
        }


        if(re.test(strDocument) == true) {
            let count = strDocument.match(re).length;

            if(count != null && count > 0) {
                resultDict[i] = strDocument.match(re).length
                console.log(i +": " + strDocument.match(re).length)
            }
        }



    })

    let p = document.createElement("p")
    p.innerText = "--RESULTS--"
    p.style.fontWeight = "bold"
    document.getElementById('results').append(p)
    //store results in a dict then loop through dict to get the results

    let counter = 0
    for(let key in resultDict) {
        let p = document.createElement("p")
        p.innerText = key + ": " + resultDict[key]
        document.getElementById('results').append(p)
        counter += resultDict[key]

    }

    let p1 = document.createElement("p")
    let p2 = document.createElement("p")

    p1.innerText = "Total Number of Unique Keys: " + Object.keys(resultDict).length 
    p2.innerText = "Total Number of Keys: " + counter

    p1.style.fontWeight = "bold"
    p2.style.fontWeight = "bold"
    
    document.getElementById('results').append("----")
    document.getElementById('results').append(p1)
    document.getElementById('results').append(p2)



})




