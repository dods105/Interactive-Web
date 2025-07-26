const btn = document.querySelector('button');
const inputTask = document.querySelector('.text');
const date = document.querySelector('#date');
const taskContainer = document.querySelector('.list');

function addTask(button){
    let value = button.textContent
    const task  = document.createElement('div')
    const li = document.createElement('li')
    const completed = document.createElement('INPUT')
    completed.setAttribute('type', 'checkbox')
    const activity = document.createElement('p');
    const deadline = document.createElement('p');
    
    task.classList.add('task')

    let deadlineValue = date.value? date.value : 'None'

    if(value==='submit'){
        completed.classList.add('checkTask')
        task.appendChild(completed)

        activity.textContent = inputTask.value
        activity.style.fontSize = '15px'
        activity.style.fontWeight = '800'
        deadline.textContent = `Deadline: ${deadlineValue}`
        deadline.style.fontSize = '12px'
        li.append(activity);
        li.append(deadline)
        li.style.listStyle = 'none'
        task.appendChild(li)


        if(inputTask.value == ''){
            alert('Input a task')
        }else{
            taskContainer.append(task)
        }

        inputTask.value = ''
        date.value = ''

        completed.addEventListener('change', function(){
            if(completed.checked){
                task.remove()
            }
        })
        
    }
}

btn.addEventListener('click', () => addTask(btn));



