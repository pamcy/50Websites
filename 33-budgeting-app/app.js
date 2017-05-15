// BUDGET CONTROLLER
const budgetController = (function () {
    const Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    const Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function (totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
        return this.percentage;
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

        data.allItems[type].forEach((current) => {
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
                return current.id; // use map to return sth and store in a new array
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

            // 3. Calculate percentage
            // divide anything by zero, not allowed in math
            // Calculate only when it has income
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1; // none existence
            }
        },

        getBudget: function () {
            return {
                totalBudget: data.budget,
                totalIncome: data.totals.inc,
                totalExpense: data.totals.exp,
                percentage: data.percentage,
            }
        },

        calculatePercentages: function () {
            const allPercentage = data.allItems.exp.map((current) => {
                return current.calcPercentage(data.totals.inc);
            });
            return allPercentage;
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
        titleMonth: '.budget__title--month',
        titleBudget: '.budget__value',
        titleIncome: '.budget__income--value',
        titleExpense: '.budget__expenses--value',
        titlePercentage: '.budget__expenses--percentage',
        titleExpensePercentage: '.item__percentage',
        container: '.container',
    };

    const formatNumber = function (num, type) {
        // Return the absolute number   -2000 => 2000
        num = Math.abs(num);
        // Convert a number into string, keep two decimals   2000 => 2000.00
        num = num.toFixed(2);

        const splitNum = num.split('.');
        const decimal = splitNum[1];
        const integer = splitNum[0];
        const rest = integer.length % 3;
        const thousands = integer.substr(rest).match(/\d{3}/gi);
        let result = integer.substr(0, rest);
        let seperator;

        // Split every 3 digits
        // Reference: http://webdevzoom.com/javascript-format-number/
        if (thousands) {
            seperator = rest ? ',' : '';
            result += seperator + thousands.join(',');
        }

        return (type === 'exp' ? '-' : '+') + ' ' + result + '.' + decimal;

        /* Original Version
        // Comma seperate the thousands   176835 => 176,835
        // Substring: extract characters from a string and return new string
        if (integer.length > 3) {
            integer = `${integer.substr(0, integer.length - 3)},${integer.substr(integer.length - 3, 3)}`;
        }
        */
    };

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
                                <div class="item__value">${formatNumber(obj.value, 'inc')}</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="fa fa-minus-circle"></i></button>
                                </div>
                            </div>
                        </div>`;
            } else if (type === 'exp') {
                container = DOMstrings.expenseContainer;

                html = `<div class="item clearfix" id="exp-${obj.id}">
                            <div class="item__description">${obj.description}</div>
                            <div class="right clearfix">
                                <div class="item__value">${formatNumber(obj.value, 'exp')}</div>
                                <div class="item__percentage"></div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="fa fa-minus-circle"></i></button>
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
            let type;

            obj.totalBudget > 0 ? type = 'inc' : type = 'exp';

            document.querySelector(DOMstrings.titleBudget).textContent = formatNumber(obj.totalBudget, type);
            document.querySelector(DOMstrings.titleIncome).textContent = formatNumber(obj.totalIncome, 'inc');
            document.querySelector(DOMstrings.titleExpense).textContent = formatNumber(obj.totalExpense, 'exp');

            if (obj.percentage === -1) {
                document.querySelector(DOMstrings.titlePercentage).textContent = '---';
            } else {
                document.querySelector(DOMstrings.titlePercentage).textContent = `${obj.percentage}%`;
            }
        },

        displayPercentage: function (per) {
            const expPercentage = [...document.querySelectorAll(DOMstrings.titleExpensePercentage)];

            expPercentage.forEach((current, index) => {
                if (per[index] !== -1) {
                    current.textContent = `${per[index]}%`;
                } else {
                    current.textContent = '---';
                }
            });
        },

        displayMonth: function () {
            const now = new Date();
            const year = now.getFullYear();
            const month = now.getMonth();
            const monthText = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            document.querySelector(DOMstrings.titleMonth).textContent = `${monthText[month]} ${year}`;
        },

        changeType: function () {
            const inputFields = [...document.querySelectorAll(`${DOMstrings.addType}, ${DOMstrings.addDescription}, ${DOMstrings.addValue}`)];

            inputFields.forEach((current) => {
                current.classList.toggle('red-focus');
            });

            document.querySelector(DOMstrings.addBtn).classList.toggle('red');
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

        // 3. Display the total budget on the UI
        uiCtrl.displayBudget(BudgetData);
    }

    const updatePercentage = function () {
        // 1. Calculate and return percentage
        const percentage = budgetCtrl.calculatePercentages();

        // 2. Display percentage on the UI
        uiCtrl.displayPercentage(percentage);
    }

    const ctrlAddItem = function () {
        let newItem;

        // 1. Get the input data
        const inputData = uiCtrl.getInput();

        if (inputData.description && inputData.value && inputData.value > 0) {
            // 2. Add the item to the budget controller
            newItem = budgetCtrl.addItem(inputData.type, inputData.description, inputData.value);

            // 3. Add the item to the UI
            uiCtrl.addListItem(inputData.type, newItem);

            // 4. Clear the input field
            uiCtrl.clearInputFields();

            // 5. Calculate and update budget
            updateBudget();

            // 6. Calculate and update percentage
            updatePercentage();
        }
    };

    const ctrlDeleteItem = function (e) {
        const itemID = e.target.parentNode.parentNode.parentNode.parentNode.id;
        let splitID;
        let type;
        let ID;
        // target: delete icon; parentNode.id = inc-1
        // console.log(e.target);

        if (itemID) {
            splitID = itemID.split('-');  // array ['inc', '1']
            type = splitID[0];
            ID = parseInt(splitID[1]);  // string to num

            // 1. Delete item from the data constructor
            budgetCtrl.deleteItem(type, ID);

            // 2. Delete item from the UI
            uiCtrl.deleteListItem(itemID);

            // 3. Re-calculate and update the budget
            updateBudget();

            // 4. Calculate and update percentage
            updatePercentage();
        }
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

        document.querySelector(DOM.addType).addEventListener('change', uiCtrl.changeType);
    }

    return {
        init: function () {
            uiCtrl.displayMonth();
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
