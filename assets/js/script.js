let inputTask = document.getElementById("floatingInput");
let form = document.getElementById("form");

let taskBtn = document.getElementById("add-btn");
let listTask = document.querySelector(".list-group");



const listItem = document.createElement('li');
listItem.className = 'list-group-item';
listItem.id = 'item';
listItem.classList.add('li-style');

// Create the <input> element
const inputsDiv = document.createElement('div');
inputsDiv.classList.add('div-input');
const checkboxInput = document.createElement('input');
checkboxInput.classList.add('form-check-input', 'me-1');
checkboxInput.type = 'checkbox';
checkboxInput.value = '';
checkboxInput.setAttribute('aria-label', '...');
const spanInput = document.createElement('input');
spanInput.classList.add('input-span');
spanInput.readOnly = true;
spanInput.classList.add('input-prop');
inputsDiv.appendChild(checkboxInput);
inputsDiv.appendChild(spanInput);
// Create the <div> element with class "icons"
const iconsDiv = document.createElement('div');
iconsDiv.className = 'icons';

// Create the "Edit" link
const editLink = document.createElement('a');
editLink.href = '#';
editLink.classList.add('edit');
editLink.setAttribute('data-mdb-toggle', 'tooltip');
editLink.title = 'Edit item';

// Create the <img> element for the "Edit" icon
const editImg = document.createElement('img');
editImg.src = './assets/images/edit.png';
editImg.classList.add('edit-img');
editImg.classList.add('img-style')

// Append the "Edit" icon to the "Edit" link
editLink.appendChild(editImg);

// Create the "Delete" link
const deleteLink = document.createElement('a');
deleteLink.href = '#!';
deleteLink.classList.add('delete');
deleteLink.setAttribute('data-mdb-toggle', 'tooltip');
deleteLink.title = 'Remove item';

// Create the <img> element for the "Delete" icon
const deleteImg = document.createElement('img');
deleteImg.src = './assets/images/delete.png';
deleteImg.classList.add('delete-img');
deleteImg.classList.add('img-style')

// Append the "Delete" icon to the "Delete" link
deleteLink.appendChild(deleteImg);

// Append the "Edit" and "Delete" links to the "icons" div
iconsDiv.appendChild(editLink);
iconsDiv.appendChild(deleteLink);
iconsDiv.classList.add('iconsDiv')

// Append the checkbox input and the "icons" div to the <li> element

listItem.appendChild(inputsDiv);
listItem.appendChild(iconsDiv);

form.addEventListener("submit", function (e) {
    e.preventDefault()
});

function attachDeleteEventListener(item) {
    item.addEventListener('click', function (event) {
        const id = event.target.dataset.id//how to the id value of li

        fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: 'DELETE',
        }).then((response) => {
            return response.json()
        }).then(() => {
            const item = listTask.querySelector(`#item-${id}`)
            listTask.removeChild(item);
          
        });
    })
}
function attachCheckEventListener(item) {
    item.addEventListener('change', function (event) {

        const id = event.target.dataset.id
        //how to the id value of li

        const checked = event.target.checked
        fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                completed: checked,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })

            .then((response) => {
                return response.json()
            })
    })
}
function attachEditEventListener(item, input) {
    item.addEventListener("click", function () {
        input.readOnly = false;
        input.classList.add("input-prop");

    });
    input.addEventListener('keypress', function (event) {
        const id = event.target.dataset.id
        const val = input.value;
        fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                title: val,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => {
                return response.json()
            }).then(() => {
                if (event.key === "Enter") {
                    input.readOnly = true;
                    input.classList.add("input-prop");

                    
                }

              
            })


    })
}


document.addEventListener('DOMContentLoaded', (event) => {
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then((response) => response.json())
        .then((todos) => {
            for (let i = 0; i < 10; i++) {
                let clonedItem = listItem.cloneNode(true);
                const editInClonedLi = clonedItem.querySelector('.edit');
                const deleteInClonedLi = clonedItem.querySelector('.delete');
                const spanInClonedLi = clonedItem.querySelector('.input-span');
                const checkInClonedLi = clonedItem.querySelector('.form-check-input');
                clonedItem.setAttribute("id", `item-${todos[i].id}`);

                deleteInClonedLi.setAttribute('data-id', todos[i].id)
                const img = deleteInClonedLi.querySelector('.delete-img')
                img.setAttribute('data-id', todos[i].id)

                editInClonedLi.setAttribute('data-id', todos[i].id)
                const img2 = editInClonedLi.querySelector('.edit-img')
                img2.setAttribute('data-id', todos[i].id)
                // checkbox
                checkInClonedLi.setAttribute('data-id', todos[i].id)
                // edit
                spanInClonedLi.setAttribute('data-id', todos[i].id)

                spanInClonedLi.value = `${todos[i].title}`;
                listTask.appendChild(clonedItem);
                attachDeleteEventListener(deleteInClonedLi)
                attachCheckEventListener(checkInClonedLi)
                attachEditEventListener(editInClonedLi, spanInClonedLi)
            }

        })
        .catch(error => {
            console.error('Error post:', error);
        });




});



taskBtn.onclick = function () {
    if(inputTask.value ===""){
        alert("please enter your task");
        return;
    }
    taskBtn.disabled=true;
    taskBtn.innerHTML="<img src=\'./assets/images/load.svg\' >";
    taskBtn.classList.add("animate");
    const clonedItem = listItem.cloneNode(true);
    const editInClonedLi = clonedItem.querySelector('.edit');
    const deleteInClonedLi = clonedItem.querySelector('.delete');
    const spanInClonedLi = clonedItem.querySelector('.input-span');
    const checkInClonedLi = clonedItem.querySelector('.form-check-input');
    
    attachDeleteEventListener(deleteInClonedLi)
    attachCheckEventListener(checkInClonedLi)
    attachEditEventListener(editInClonedLi, spanInClonedLi)


    spanInClonedLi.value = `${inputTask.value}`;

    let task = {
        title: inputTask.value,
        userId: 1,
        id: Math.floor(Math.random() * 1000),
        completed: false
    }

    clonedItem.setAttribute("id", `item-${task.id}`);

    deleteInClonedLi.setAttribute('data-id', task.id)
    const img = deleteInClonedLi.querySelector('.delete-img')
    img.setAttribute('data-id', task.id)

    editInClonedLi.setAttribute('data-id', task.id)
    const img2 = editInClonedLi.querySelector('.edit-img')
    img2.setAttribute('data-id', task.id)
    // checkbox
    checkInClonedLi.setAttribute('data-id', `${task.id}`)
    // edit
    spanInClonedLi.setAttribute('data-id', task.id)
    fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(() => {
            if (listTask.childNodes.length === 0) {
                listTask.appendChild(clonedItem);
            } else {
                listTask.insertBefore(clonedItem,listTask.childNodes[0]);
            }

            taskBtn.disabled=false;
            taskBtn.classList.remove("animate");
            taskBtn.innerHTML="ADD";
            inputTask.value="";
            
        })
        .catch(error => {
            console.error('Error creating post:', error);
        });
}

