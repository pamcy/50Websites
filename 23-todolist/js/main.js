var data = {
	todo: [],
	completed: []
};

// Add the new task to the list
function addTaskToList (item) {

	var svgDone = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><g><path class="todolist-svgDone" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>',
		svgDelete = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><g><g><path class="todolist-svgDelete" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6L16.3,18.7L16.3,18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="todolist-svgDelete" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="todolist-svgDelete" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8C7.4,10.2,7.7,10,8,10c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="todolist-svgDelete" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>',
		taskList = document.getElementById('todolist-toDoTask'),
		taskItem = document.createElement('li'),
		statusBtn = document.createElement('div'),
		deleteBtn = document.createElement('button'),
		doneBtn = document.createElement('button');

	taskItem.textContent = item;

	statusBtn.classList.add('todolist-statusBtns');

	deleteBtn.classList.add('todolist-deleteBtn');
	deleteBtn.innerHTML = svgDelete;
	deleteBtn.addEventListener('click', deleteTask);

	doneBtn.classList.add('todolist-doneBtn');
	doneBtn.innerHTML = svgDone;
	doneBtn.addEventListener('click', checkTask);

	statusBtn.appendChild(deleteBtn);
	statusBtn.appendChild(doneBtn);
	taskItem.appendChild(statusBtn);

	// always shows the new task on the top of list
	taskList.insertBefore(taskItem, taskList.childNodes[0]);
}

// If there is any value in the input field, add the task to the list.
function inputTask() {
	var newTask = document.getElementById('todolist-addTask');
	var newTaskVal = newTask.value;

	if (newTaskVal) {
		data.todo.push(newTaskVal);
		addTaskToList(newTaskVal);
		newTask.value = '';
	}
}

// Delete the task from the list
function deleteTask() {
	var wantDelete = this.parentNode.parentNode,
		wantDeleteValue = wantDelete.textContent,
		wantDeleteID = wantDelete.parentNode.id;

	if (wantDeleteID === 'todolist-toDoTask') {
		data.todo.splice(data.todo.indexOf(wantDeleteValue), 1);
	} else {
		data.completed.splice(data.completed.indexOf(wantDeleteValue), 1);
	}

	wantDelete.parentNode.removeChild(wantDelete);
}

// Mark the task checked
// Check if the task should be added to the done list or to re-added to the todo list
function checkTask() {
	var wantCheck = this.parentNode.parentNode,
		wantCheckValue = wantCheck.textContent,
		wantCheckID = wantCheck.parentNode.id;

	if (wantCheckID === 'todolist-toDoTask') {
		data.todo.splice(data.todo.indexOf(wantCheckValue), 1);
		data.completed.push(wantCheckValue);
	} else {
		data.completed.splice(data.completed.indexOf(wantCheckValue), 1);
		data.todo.push(wantCheckValue);
	}

	var ul = (wantCheckID === 'todolist-toDoTask') ? document.getElementById('todolist-doneTask') : document.getElementById('todolist-toDoTask');

	wantCheck.parentNode.removeChild(wantCheck);
	ul.insertBefore(wantCheck, ul.childNodes[0]);
}

// Click on add button
document.getElementById('todolist-addTaskBtn').addEventListener('click', function() {
	inputTask();
});

// Add task on pressing ENTER key
document.getElementById('todolist-addTask').addEventListener('keyup', function (e) {
	var key = e.which || e.keyCode;
	if (key === 13) { // 13 is enter
		inputTask();
	}
});
