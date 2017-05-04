// BUDGET CONTROLLER

let budgetController = (function() {

})();


// UI INTERFACE CONTROLLER
let uiController = (function () {

    // some code here

})();


// GLOBAL APP CONTROLLER
let appController = (function (budgetCtrl, uiCtrl) {

    let ctrlAddItem = function () {

        // 1. Get the input data
        // 2. Add the item to the budget controller
        // 3. Add the item to the UI
        // 4. Calculate the total budget
        // 5. Display the total budget on the UI

        console.log('oh yeah!');
    };

    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function (e) {
        // console.log(e);   // display the keypress properties

        if (e.keyCode === 13 || e.which === 13) {   // e.which for older browsers
            ctrlAddItem();
        }
    });
})(budgetController, uiController);


/*
let appController = (function (budgetCtrl, uiCtrl) {
    const addBtn = document.querySelector('.add__btn');
    const inputBox = document.getElementsByTagName('input');

    return {
        checkEmpty: function () {
            for (var i = 0; i < inputBox.length; i++) {
                if (!inputBox[i].value) {
                    inputBox[i].style.borderColor = 'red';
                }
            }
        },
        clickToSend: addBtn.addEventListener('click', function() {
            // 1. Get the input data
            // 2. Add the item to the budget controller
            // 3. Add the item to the UI
            // 4. Calculate the total budget
            // 5. Display the budget on the UI




            // this.checkEmpty();
            console.log('click success!');
        }),
        pressToSend: inputBox.addEventListener('keypress', function (e) {
            if (e.keycode === 13) {
                this.clickToSend();
            }
        }),
    }
})(budgetController, uiController);
*/