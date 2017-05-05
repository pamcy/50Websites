// BUDGET CONTROLLER
const budgetController = (function() {
    const Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    const Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    const data = {
        allItems: {
            inc: [],
            exp: [],
        },
        totals: {
            inc: 0,
            exp: 0,
        },
    };
})();



// UI INTERFACE CONTROLLER
const uiController = (function () {
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
const appController = (function (budgetCtrl, uiCtrl) {
    let ctrlAddItem = function () {
        // 1. Get the input data
        let inputData = uiCtrl.getInput();
        console.log(inputData);
        console.log(inputData.value);

        // 2. Add the item to the budget controller
        // 3. Add the item to the UI
        // 4. Calculate the total budget
        // 5. Display the total budget on the UI
    };

    // All EventListners
    let setupEventListners = function () {
        const DOM = uiCtrl.getDOMstrings();

        document.querySelector(DOM.addBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (e) {
            // console.log(e);
            // display the keypress properties
            if (e.keyCode === 13 || e.which === 13) {
                // e.which for older browsers if they have no keyCode property
                ctrlAddItem();
            }
        });
    }

    return {
        init: function () {
            console.log('hoooooray');
            setupEventListners();
        },
    }
})(budgetController, uiController);

appController.init();
