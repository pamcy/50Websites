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

    return {
        addItem: function (type, des, val) {
            let newItem;
            let ID;

            /*
            ID Logic
            [1, 2, 3, 4, 5] nextID = 6
            [1, 3, 5, 6, 9] nextID = 10
            ID = lastID + 1
            */

            // Create a new id
            if (data.allItems[type].length > 0) {
                // When the array has some data
                // Select the last index + 1
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                // When the array is empty
                ID = 0;
            }

            // Create a new item
            if (type === 'inc') {
                newItem = new Income(ID, des, val);
                // data.allItems.inc.push(newItem);
            } else if (type === 'exp') {
                newItem = new Expense(ID, des, val);
                // data.allItems.exp.push(newItem);
            }

            // Push all new items to array
            data.allItems[type].push(newItem); // better way

            // Other module or functions can get the new item
            return newItem;
        },

        getData: function () {
            return data;
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
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
    }

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.addType).value,
                description: document.querySelector(DOMstrings.addDescription).value,
                value: document.querySelector(DOMstrings.addValue).value,
            }
        },

        addListItem: function (type, obj) {
            let html;
            let container;

            if (type === 'inc') {
                container = DOMstrings.incomeContainer;

                html = `<div class="item clearfix" id="income-${obj.id}">
                            <div class="item__description">${obj.description}</div>
                            <div class="right clearfix">
                                <div class="item__value">${obj.value}</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>`;
            } else if (type === 'exp') {
                container = DOMstrings.expenseContainer;

                html = `<div class="item clearfix" id="expense-${obj.id}">
                            <div class="item__description">${obj.description}</div>
                            <div class="right clearfix">
                                <div class="item__value">${obj.value}</div>
                                <div class="item__percentage"></div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>`;
            }

            document.querySelector(container).insertAdjacentHTML('beforeend', html);
        },

        clearInputFields: function () {
            // Convert a nodelist to an array
            // See solution
            // https://hackernoon.com/htmlcollection-nodelist-and-array-of-objects-da42737181f9

            const fields = [...document.querySelectorAll(`${DOMstrings.addDescription}, ${DOMstrings.addValue}`)];
            // console.log(fields);

            fields.forEach(function(field) {
                field.value = '';
            });

            // Give focus to the first element
            fields[0].focus();
        },

        getDOMstrings: function () {
            return DOMstrings;
        },
    }
})();


// GLOBAL APP CONTROLLER
const appController = (function (budgetCtrl, uiCtrl) {
    let ctrlAddItem = function () {
        let inputData;
        let newItem;

        // 1. Get the input data
        inputData = uiCtrl.getInput();

        // 2. Add the item to the budget controller
        newItem = budgetCtrl.addItem(inputData.type, inputData.description, inputData.value);

        // 3. Add the item to the UI
        uiCtrl.addListItem(inputData.type, newItem);

        // 4. Clear the input field
        uiCtrl.clearInputFields();

        // 5. Calculate the total budget
        // 6. Display the total budget on the UI
    };

    // All EventListners
    const setupEventListners = function () {
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
