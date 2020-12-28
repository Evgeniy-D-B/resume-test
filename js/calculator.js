
const technologiesSelect = document.querySelector('#calculator-form-technologes');

const technologiesMultiSelect = new Choices(technologiesSelect, {
    allowSearch: false,
    silent: false,
    renderChoiceLimit: -1,
    maxItemCount: -1,
    removeItems: true,
    removeItemButton: true,
    editItems: false,
    duplicateItemsAllowed: false,
    delimiter: ",",
    paste: true,
    searchEnabled: false,
    searchChoices: true,
    searchResultLimit: -1,
    position: "auto",
    resetScrollPosition: true,
    shouldSort: true,
    shouldSortItems: false,
    placeholder: true,
    noChoicesText: "No available options",
    itemSelectText: "Click to select",
    classNames: {
      containerInner: "choices__inner tech-input-container",
      input: "choices__input",
    },
  });

  calculateSum();

const calculatorForm = document.querySelector('.calculator-form')

calculatorForm.addEventListener('submit', function(event) {
    event.preventDefault();
    calculateSum();

});

function renderSum(sum) {

    const costElement = document.querySelector('.calculator-form-total-cost');

    costElement.textContent = 'Calculating...';

    setTimeout(function(){
        costElement.textContent = sum + '$';
    }, 2000);

}

function calculateSum() {

     // selectors
     const webSiteTypeSelect = document.querySelector('#calculator-form-website-type');
    
     const webSiteCart = document.querySelector ('#calculator-form-input-cart input:checked');
     
     const webSiteReception = document.querySelector('#calculator-form-input-reception input:checked');
 
     // value
     const webSiteTypeValue = extractPriceFromValue(webSiteTypeSelect.value);
 
     const technologiesValue = getTechnologiesSum(technologiesMultiSelect.getValue());
 
     const webSiteCartValue = convertCartOptionTopPrice(webSiteCart.value);
 
     const webSiteReceptionValue = convertReceptionOptionTopPrice(webSiteReception.value);
 
     const totalSum = webSiteTypeValue + technologiesValue + webSiteCartValue + webSiteReceptionValue;
 
     
 
     renderSum(totalSum)

}

function convertCartOptionTopPrice(option) {
    if (option === 'yes') {
        return 300;
    }

    return 0;
}

function convertReceptionOptionTopPrice(option) {
    if (option === 'yes') {
        return 500;
    }

    return 0;
}

function getTechnologiesSum(technologiesArr) {
    let totalSum = 0;

    technologiesArr.forEach( function(tech) {
        totalSum = totalSum +  extractPriceFromValue(tech.value)

    })

    return totalSum;
}

function extractPriceFromValue(str) {
    const price = str.match(/:\d+/);
  
    if (price) {
      return Number(price[0].slice(1)) || 0;
    }
  
    return 0;
  }

