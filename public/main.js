axios.get('http://localhost:3000/tasks')
.then((res)=>{
    console.log(res.data);
    const tasks = res.data;
    for(let task of tasks){
        $('#taskContainer').append(
            `<div class="task">
            <div class="task_title">${task.title}</div>
        </div>`
        )
    }
})


$('#addTask').click(()=>{
    let data = {
        title: $('#task').val()
    }
    axios.post('http://localhost:3000/add-task', data)
    .then(res=>{
        console.log(res.data);
        location.href = '/';
    })
})