// BUDGET CONTROLLER
let budgetController = (function() {

})();


// UI INTERFACE CONTROLLER
let uiController = (function () {
    const DOMstrings = {
        addType: '.add__type',
        addDescription: '.add__description',
        addValue: '.add__value',
        addBtn: '.add__btn',
    }

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.addType).value,
                description: document.querySelector(DOMstrings.addDescription).value,
                value: document.querySelector(DOMstrings.addValue).value,
            }
        },
        getDOMstrings: function () {
            return DOMstrings;
        },
    }
})();


// GLOBAL APP CONTROLLER
let appController = (function (budgetCtrl, uiCtrl) {

    const DOM = uiCtrl.getDOMstrings();

    let ctrlAddItem = function () {

        // 1. Get the input data
        let inputVal = uiCtrl.getInput();
        console.log(inputVal);
        console.log(inputVal.description);

        // 2. Add the item to the budget controller
        // 3. Add the item to the UI
        // 4. Calculate the total budget
        // 5. Display the total budget on the UI
    };

    document.querySelector(DOM.addBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function (e) {
        // console.log(e);
        // display the keypress properties
        if (e.keyCode === 13 || e.which === 13) {
            // e.which for older browsers if they have no keyCode property

            ctrlAddItem();
        }
    });
})(budgetController, uiController);
