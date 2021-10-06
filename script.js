var table = document.getElementById("table");
table.setAttribute("class", "table");
var a;
var cell = [],
    row = [];
var task = [];
var add_li = document.getElementById('task_list');
var tc = 0;

let k = 1;
var head = document.getElementById("heading_text");
for (let i = 0; i < 7; i++) {
    row[i] = document.createElement('tr');
    table.appendChild(row[i]);
    for (let j = 0; j < 7; j++) {
        cell[j] = document.createElement('td');
        if (i == 0)
            cell[j].setAttribute("class", "column_day");
        else {
            cell[j].setAttribute("class", "column");
            cell[j].addEventListener('click', () => { store_id(e) });
        }
        cell[j].setAttribute("id", String.fromCharCode(64 + k));

        k++;
        row[i].appendChild(cell[j]);
    }
}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const date = new Date();
setInterval(myTimer, 1000);

function myTimer() {
    const d_date = new Date();
    let hours = d_date.getHours();
    let min = d_date.getMinutes();
    let sec = d_date.getSeconds();
    hours = hours < 10 ? "0" + hours : hours;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    document.getElementById("hi").innerHTML = hours;
    document.getElementById("mi").innerHTML = min;
    document.getElementById("si").innerHTML = sec;
}
let m = date.getMonth();
calendar(date);
var rem = 0;
let year = date.getFullYear();
var ids = [];

function store_id(e) {
    console.log(e);
}

function calendar(date_today) {
    var first_day = "1" + " " + months[date_today.getMonth()] + " " + date_today.getFullYear();
    console.log(first_day);
    const date_first = new Date(first_day);
    console.log(date.getMonth());
    console.log(date_first.getMonth());


    var start = date_first.getDay();
    console.log(days[start]);
    head.innerHTML = months[date_today.getMonth()] + "," + date_today.getFullYear();
    let num = 1;
    end = endoftheday(months[date_first.getMonth()]);
    console.log(end);
    let m_prev;
    if (date_first.getMonth() == 0)
        m_prev = 11;
    else
        m_prev = date_first.getMonth() - 1;
    let prev = endoftheday(months[m_prev]) + 1 - date_first.getDay();
    console.log(prev);
    let aft = 1;
    let check = false;
    console.log(check);
    let k_check = 1;
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
            if (i == 0)
                document.getElementById(String.fromCharCode(64 + k_check)).innerHTML = days[j];
            else {
                if (j >= start)
                    check = true;
                if (check) {

                    document.getElementById(String.fromCharCode(64 + k_check)).innerHTML = (num <= end ? num : aft);
                    document.getElementById(String.fromCharCode(64 + k_check)).addEventListener('click', function (e) {
                        a = document.getElementById(this.id).innerText + "/" + (date_first.getMonth() + 1).toString() + "/" + date_first.getFullYear().toString();
                        document.getElementById('task_date').innerHTML = a;
                        document.getElementById('task_date').style.color = "black";
                        if (localStorage.getItem(a) == null || JSON.parse(localStorage.getItem(a)).length == 0)
                            alert("No task yet Create your manager");
                        else {
                             var parsed_data = JSON.parse(localStorage.getItem(a));
                            console.log(parsed_data)
                            create_task(parsed_data, a)
                        }
                        console.log(a);
                    })

                    if (num > end) {
                        document.getElementById(String.fromCharCode(64 + k_check)).style.opacity = 0.8;

                        aft++;
                    } else {
                        document.getElementById(String.fromCharCode(64 + k_check)).style.opacity = 1;

                    }
                    num++;
                } else {
                    document.getElementById(String.fromCharCode(64 + k_check)).innerHTML = prev;
                    document.getElementById(String.fromCharCode(64 + k_check)).style.opacity = 0.8;
                    prev++;

                }
            }
            k_check++;
        }
    }


}

function endoftheday(month) {
    if (month === "January" || month === "March" || month === "May" || month === "July" || month === "August" || month === "October" || month === "December")
        return 31;
    if (month === "April" || month === "June" || month === "September" || month === "November")
        return 30
    if (month === "February")
        if (year % 4 == 0)
            return 29;
        else
            return 28;
}

function goback() {
    console.log("back");
    if (m - 1 < 0) {
        year--;
        m = 12;
    }
    let date_prev = new Date("1" + months[m - 1] + year);
    calendar(date_prev);
    rem++;
    m--;
}

function gonext() {
    console.log("next");
    if (m + 1 > 11) {
        year++;
        m = -1;
    }
    let date_prev = new Date("1" + months[m + 1] + year);
    calendar(date_prev);
    rem++;
    m++;
}


function add() {
    var task_text = document.getElementById('task');
    const tasks = document.getElementById('task_add');
    var lists = document.getElementById('list');
    var task = [];

    if (document.getElementById('task_date').innerText != "Select From The Calendar" && task_text.value.toString().trim().length != 0) {
        console.log(task_text.toString().trim().length);
        if (localStorage.getItem(a) == null) {
            localStorage.setItem(a, '[]');
        }
        var prev_array = JSON.parse(localStorage.getItem(a));
        console.log(prev_array);
        var nr = non_repeat(task_text.value, prev_array);
        console.log(nr);
        if (nr == 0) {
            prev_array.push(task_text.value);
            localStorage.setItem(a, JSON.stringify(prev_array));
            var after_push = JSON.parse(localStorage.getItem(a));
            console.log(after_push);
            create_task(after_push, a);
            nr = 2;
        }
    }





    function non_repeat(get_task, prev_data) {
        console.log(get_task);
        console.log(tc);
        let chk_repeat = 0;
        tc++;
        if (prev_data.length == 0)
            return 0;
        else {
            for (let i = 0; i < prev_data.length; i++) {
                if (get_task === prev_data[i]) {
                    chk_repeat++;
                    break;
                }
            }
        }
        return chk_repeat;
    }


}
function create_task(data, a) {
    // var date_title=document.createElement('li')
    // date_title.innerHTML=a;
    // add_li.appendChild(date_title);
    for (let i = 0; i < data.length; i++) {
        if (!(document.getElementById(data[i] + "/" + a))) {
            var elem = document.createElement('li');
            elem.setAttribute('id', data[i] + "/" + a);
            elem.innerHTML = data[i];
            add_li.appendChild(elem);
        }
        if (!(document.getElementById("btn" + data[i] + "/" + a))) {
            var btn_elem = document.createElement('button');
            btn_elem.setAttribute('class', 'delete');
            btn_elem.setAttribute('id', "btn" + data[i] + "/" + a);
            btn_elem.innerHTML = "Delete";
            btn_elem.addEventListener('click', function () {
                console.log(this.id);
                let t_id = this.id.substring(3);
                console.log(t_id);
                let r_elem = document.getElementById(t_id).innerText.substring(0, document.getElementById(t_id).innerText.indexOf("Delete")).trim();
                let key = this.id.substring(this.id.indexOf("/") - 1);
                remove_element(data, key, t_id);
                console.log(t_id);
            })
            elem.appendChild(btn_elem);
        }
    }
}
function remove_element(r_data, key, n_id) {

    var delete_element = document.getElementById(n_id);
    delete_element.remove();
    var get_data = [];
    console.log(delete_element.innerText.substring(0, delete_element.innerText.indexOf('D')));
    get_data = JSON.parse(localStorage.getItem(key.substring(2)));
    console.log(get_data);
    var new_data = [];
    for (let i = 0; i < get_data.length; i++) {
        if (delete_element.innerText.substring(0, delete_element.innerText.indexOf('D')) != get_data[i])
            new_data.push(get_data[i]);
    }
    console.log(new_data);
    localStorage.setItem(key.substring(2), JSON.stringify(new_data));

}