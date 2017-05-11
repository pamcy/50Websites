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
        budget: 0,
        percentage: -1,
    };

    const calculateTotal = function (type) {
        let sum = 0;

        data.allItems[type].forEach(function (current) {
            sum += current.value;
        })

        data.totals[type] = sum;
        // console.log(sum);
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

        deleteItem: function (type, id) {
            // ID Example
            // id = 6
            // ids = [1, 2, 4, 6, 8]
            // index = 3

            const ids = data.allItems[type].map((current) => {
                return current.id; // use map to return sth in a new array
            });

            const index = ids.indexOf(id);

            // Remove item only if index exists
            // -1: did not find the element
            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        },

        calculateBudget: function () {
            // 1. Calculate total income and expenses
            calculateTotal('inc');
            calculateTotal('exp');

            // 2. Calaulate Total budget = Income - Expense
            data.budget = data.totals.inc - data.totals.exp;
            console.log(`Total budget: ${data.budget}`);

            // 3. Calculate percentage
            // divide anything by zero, not allowed in math
            // Calculate only when it has income
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1; // none existence
            }
            console.log(`percentage: ${data.percentage}`);
        },

        getBudget: function () {
            return {
                totalBudget: data.budget,
                totalIncome: data.totals.inc,
                totalExpense: data.totals.exp,
                percentage: data.percentage,
            }
        },

        forTesting: function () {
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
        titleBudget: '.budget__value',
        titleIncome: '.budget__income--value',
        titleExpense: '.budget__expenses--value',
        titlePercentage: '.budget__expenses--percentage',
        container: '.container',
    }

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.addType).value,
                description: document.querySelector(DOMstrings.addDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.addValue).value),
                // turn a string into floating point number
            }
        },

        addListItem: function (type, obj) {
            let html;
            let container;

            if (type === 'inc') {
                container = DOMstrings.incomeContainer;

                html = `<div class="item clearfix" id="inc-${obj.id}">
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

                html = `<div class="item clearfix" id="exp-${obj.id}">
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

        deleteListItem: function (selectorID) {
            const el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },

        clearInputFields: function () {
            // Convert a nodelist to an array
            // See solution
            // https://hackernoon.com/htmlcollection-nodelist-and-array-of-objects-da42737181f9

            const fields = [...document.querySelectorAll(`${DOMstrings.addDescription}, ${DOMstrings.addValue}`)];
            // console.log(fields);

            fields.forEach(function (field) {
                field.value = '';
            });

            // Give focus to the first element
            fields[0].focus();
        },

        displayBudget: function (obj) {
            document.querySelector(DOMstrings.titleBudget).textContent = obj.totalBudget;
            document.querySelector(DOMstrings.titleIncome).textContent = obj.totalIncome;
            document.querySelector(DOMstrings.titleExpense).textContent = `- ${obj.totalExpense}`;

            if (obj.percentage === -1) {
                document.querySelector(DOMstrings.titlePercentage).textContent = '---';
            } else {
                document.querySelector(DOMstrings.titlePercentage).textContent = `${obj.percentage}%`;
            }
        },

        getDOMstrings: function () {
            return DOMstrings;
        },
    }
})();


// GLOBAL APP CONTROLLER
const appController = (function (budgetCtrl, uiCtrl) {
    const updateBudget = function () {
        // 1. Calculate the total budget
        budgetCtrl.calculateBudget();

        // 2. Return the budget
        const BudgetData = budgetCtrl.getBudget();
        console.log(BudgetData);

        // 3. Display the total budget on the UI
        uiCtrl.displayBudget(BudgetData);
    }

    const ctrlAddItem = function () {
        let inputData;
        let newItem;

        // 1. Get the input data
        inputData = uiCtrl.getInput();

        if (inputData.description && inputData.value && inputData.value > 0) {
            // 2. Add the item to the budget controller
            newItem = budgetCtrl.addItem(inputData.type, inputData.description, inputData.value);

            // 3. Add the item to the UI
            uiCtrl.addListItem(inputData.type, newItem);

            // 4. Clear the input field
            uiCtrl.clearInputFields();

            // 5. Calculate and update budget
            updateBudget();
        }
    };

    const ctrlDeleteItem = function (e) {
        let splitID;
        let type;
        let ID;
        const itemID = e.target.parentNode.parentNode.parentNode.parentNode.id;
        // target: delete icon; parentNode.id = inc-1

        console.log(e.target);

        if (itemID) {
            splitID = itemID.split('-');  // array ['inc', '1']
            type = splitID[0];
            ID = parseInt(splitID[1]);  // string to num
        }

        // 1. Delete item from the data constructor
        budgetCtrl.deleteItem(type, ID);

        // 2. Delete item from the UI
        uiCtrl.deleteListItem(itemID);

        // 3. Re-calculate and update the budget
        updateBudget();
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

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
    }

    return {
        init: function () {
            uiCtrl.displayBudget({
                totalBudget: 0,
                totalIncome: 0,
                totalExpense: 0,
                percentage: -1,
            });
            setupEventListners();
        },
    }
})(budgetController, uiController);

appController.init();
