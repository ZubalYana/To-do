//tasks adding
axios.get('http://localhost:3000/tasks')
.then((res)=>{
    console.log(res.data);
    const tasks = res.data;
    for(let task of tasks){
        let time = new Date(task.createdTime); 
        let day = time.getDate(); 
        let month = time.getMonth() + 1; 
        let year = time.getFullYear(); 
        let hours = time.getHours(); 
        let minutes = time.getMinutes();
        let seconds = time.getSeconds();
        let createdTime = `${day}.${month}.${year} at ${hours}:${minutes}:${seconds}`
        $('#taskContainer').append(
            `<div class="task">
            <div class="task_titleAndActionsCon">
            <div class="task_title">${task.title}</div>
            <div class="task_actions">
            <div class="task_actions_edit">
            <img class="task_editAction" src="./imgs/pen.png" alt="">
            <img class="task_actions_edit_decoration" id="task_actions_edit_decoration1" src="./imgs/edit decoration.png">
            <img class="task_actions_edit_decoration" id="task_actions_edit_decoration2" src="./imgs/edit decoration.png">
            </div>
            <div class="task_actions_delete">
            <img class="task_actions_delete_Top" src="./imgs/bin top part.png" alt="">
            <img class="task_actions_delete_Bottom" src="./imgs/bin bottom part.png" alt="">
            </div>
            </div>
            </div>
            <div class="task_description">${task.description}</div>
            <div class="task_neededTime">Created time: <div class="task_time">${createdTime}</div></div>
            <div class="task_neededTime">Deadline: <div class="task_time">${task.deadline}</div></div>
        </div>`
        )

    }
$('.task_editAction').hover(
    function () {
        $(this).css('transform', 'rotate(-20deg)');
        $(this).siblings('.task_actions_edit_decoration').css('display', 'flex');
    },
    function () {
        $(this).css('transform', 'rotate(0deg)');
        $(this).siblings('.task_actions_edit_decoration').css('display', 'none');
    }
);

$('.task_actions_delete').hover(
    function () {
        $(this).find('.task_actions_delete_Top').addClass('delete-hover');
    },
    function () {
        $(this).find('.task_actions_delete_Top').removeClass('delete-hover');
    }
);

    

})
$('#addTask').click(()=>{
    let data = {
        title: $('#task').val(),
        description: $('#task_description').val(),
        deadline: $('#task_deadline').val(),
        createdTime: Date.now()
    }
    axios.post('http://localhost:3000/add-task', data)
    .then(res=>{
        console.log(res.data);
        location.href = '/';
    })
})
$('.addNewTask').hover(
    () => {
        $('.addNewTask_Plus').css('transform', 'rotate(360deg)');
    },
    () => {
        $('.addNewTask_Plus').css('transform', 'rotate(0deg)');
    }
);
$('.addNewTask').click(()=>{
    $('.addNewTaskPopup_container').css('display', 'flex')
})
$('#addTaskPopupXmark').click(()=>{
    $('.addNewTaskPopup_container').css('display', 'none')
})


//theme changing
let theme = localStorage.getItem('theme') || 'light';
$('.header_themeChanger').click(function(){
    if(theme == 'light'){
        theme = 'dark';
        localStorage.setItem('theme', theme);
        changeTheme(theme);

    }else{
        theme = 'light';
        localStorage.setItem('theme', theme);
        changeTheme(theme);
    }
})
function changeTheme(theme){
    if(theme == 'light'){
        $('.header_themeChanger').attr('src', './imgs/light theme changer.png')
        $('.header').css('background-color', '#fff')
        $('#taskContainer').css('background-color', '#fff')
        $('select').css('background-color', '#fff')
        $('.task').css('color', '#fff')
        $('.addNewTask_Plus').css('color', '#fff')
    }else{
        $('.header_themeChanger').attr('src', './imgs/dark theme changer.png')
        $('.header').css('background-color', '#333')
        $('#taskContainer').css('background-color', '#333')
        $('select').css('background-color', '#333')
        $('.task').css('color', '#333')
        $('.addNewTask_Plus').css('color', '#333')


    }
}
changeTheme(theme);
