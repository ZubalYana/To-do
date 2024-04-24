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
        changeTheme(theme);

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
        $('.task_title').css('color', '#fff')
        $('.task_editAction').attr('src', './imgs/pen.png')
        $('.task_actions_edit_decoration').attr('src', './imgs/edit decoration.png')
        $('.task_actions_delete_Top').attr('src', './imgs/bin top part.png')
        $('.task_actions_delete_Bottom').attr('src', './imgs/bin bottom part.png')
        $('.addNewTaskPopup').css('background-color', '#fff')
        $('i').css('color', '#333')
        $('input').css('background-color', '#fff')
        $('input').css('border', '1px #333 solid')
        $('#addTask').css('background-color', '#fff')
        $('#addTask').css('border', '1px #6D87E2 solid')
        $('#addTask').css('color', '#6D87E2')
        $('#addTask').hover(
            () => {
                $('#addTask').css({
                    'background-color': '#6D87E2',
                    'color': '#fff',
                    'border': '#fff 1px solid',
                });
            },
            () => {
                $('#addTask').css({
                    'background-color': '#fff',
                    'color': '#6D87E2',
                    'border': '#6D87E2 1px solid',

                });
            }
        );

    }else{
        $('.header_themeChanger').attr('src', './imgs/dark theme changer.png')
        $('.header').css('background-color', '#333')
        $('#taskContainer').css('background-color', '#333')
        $('select').css('background-color', '#333')
        $('.task').css('color', '#333')
        $('.addNewTask_Plus').css('color', '#333')
        $('.task_title').css('color', '#333')
        $('.task_editAction').attr('src', './imgs/dark pen.png')
        $('.task_actions_edit_decoration').attr('src', './imgs/dark edit decoration.png')
        $('.task_actions_delete_Top').attr('src', './imgs/dark bin top part.png')
        $('.task_actions_delete_Bottom').attr('src', './imgs/dark bin bottom part.png')
        $('.addNewTaskPopup').css('background-color', '#333')
        $('i').css('color', '#fff')
        $('input').css('background-color', '#333')
        $('input').css('border', '1px #fff solid')
        $('#addTask').css('background-color', '#333')
        $('#addTask').css('border', '1px #6D87E2 solid')
        $('#addTask').css('color', '#6D87E2')


        $('#addTask').hover(
            () => {
                $('#addTask').css({
                    'background-color': '#6D87E2',
                    'color': '#333',
                    'border': '#333 1px solid',
                });
            },
            () => {
                $('#addTask').css({
                    'background-color': '#333',
                    'color': '#6D87E2',
                    'border': '#6D87E2 1px solid',

                });
            }
        );
    }
}
changeTheme(theme);


//language changing
let semanticCore ={
    header_title: {
        "en": "Personal Task Tracker",
        "ukraine": "Персональний трекер завдань",
        "poland": "",
        "japan": "",
        "france": "",
    }
}

let allLang = ['en', 'ukraine', 'poland', 'japan', 'france'];
let lang = 'en'


$('#header_language').change(function() {
    // This function will execute whenever an option is clicked or selected

    // Get the selected option value
    let selectedValue = $(this).val();

    // Get the selected option text
    let selectedText = $(this).find('option:selected').text();

    // Display the selected option value and text (you can modify this as needed)
    console.log("Selected Option Value: " + selectedValue);
    console.log("Selected Option Text: " + selectedText);

    // You can perform further actions based on the selected option here
    // For example, update other parts of your UI or trigger additional functions
});


// ukraine.onclick = function(){
//     lang = 'ukraine'
//     console.log(lang)
//     changeUrl()
// }
// en.onclick = function(){
//     lang = 'en'
//     console.log(lang)
//     changeUrl()
// }
// poland.onclick = function(){
//     lang = 'poland'
//     console.log(lang)
//     changeUrl()
// }
// japan.onclick = function(){
//     lang = 'japan'
//     console.log(lang)
//     changeUrl()
// }
// france.onclick = function(){
//     lang = 'france'
//     console.log(lang)
//     changeUrl()
// }

function changeUrl(){
    location.href = window.location.pathname + '#' + lang;
    location.reload();
}

function changeLanguage(){
    let hash = (window.location.hash).substring(1)
    console.log(hash)
    if(!allLang.includes(hash)){
        location.href = window.location.pathname + '#en'
        location.reload();
    }

    for(let key in semanticCore){
        document.querySelector('.language-' + key).innerText = semanticCore[key][hash]
    }
}

changeLanguage()
