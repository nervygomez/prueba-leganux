const fomrstu = document.querySelector('#fomr-stu');
const fomrclass = document.querySelector('#fomr-class');
const checkboxes = document.querySelector('#checkboxes');

const checkbox1 = document.querySelector("#checkbox1");
const checkbox2 = document.querySelector("#checkbox2");
const checkbox3 = document.querySelector("#checkbox3");
let arrayStudents = [];

window.addEventListener('load', () => {

    fomrstu.addEventListener('submit', addStudent)
    fomrclass.addEventListener('submit', addClass);
})

function addStudent(e) {
    e.preventDefault();

    let name = document.querySelector('#name').value;
    let age = document.querySelector('#age').value;

    if(name === '' || age === '') {
        return;
    }

    fetch('http://localhost:8080/api/student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, age })
    })
        .then(resp => {
            const msg1 = document.querySelector('#msg1');
            msg1.style.display = '';
            setTimeout(() => {
                msg1.style.display = 'none';
                document.querySelector('#name').value = '';
                document.querySelector('#age').value = '';
            }, 1500);

        })
        .catch(console.log)
}

function addClass(e) {
    e.preventDefault();

    let classname = document.querySelector('#classname').value;
    let order = document.querySelector('#order').value;

    if(classname === '' || order === '' || arrayStudents.length === 0) {
        return;
    }

    fetch('http://localhost:8080/api/classroom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ classname, order, students: arrayStudents})
    })
    .then((res) => {
        console.log(res);
        const msg2 = document.querySelector('#msg2');
        msg2.style.display = '';
        setTimeout(() => {
            msg2.style.display = 'none';
            document.querySelector('#classname').value = '';
            document.querySelector('#order').value = '';
        }, 1500);
    })
    .catch(console.log)


}

async function listStudents() {
    let students = await getStudents();
    let showStudent = document.querySelector('#showStudent');
    showStudent.innerHTML = ''

    for (const student of students) {
        const { name, age } = student;
        let newDiv = document.createElement('div');
        newDiv.innerText = `Nombre: ${name} - Edad: ${age}`;
        showStudent.appendChild(newDiv);
    }
}

async function listClass() {
    let classrooms = await getClass();
    let showClass = document.querySelector('#showClass');
    showClass.innerHTML = ''

    for (const rooms of classrooms) {
        const { class: classr , order, numberStudents, students } = rooms;
        let newDiv = document.createElement('div');
        let studentsClass = '';
        for (const student of students) {
            studentsClass += `${student.name}, `
        }
        newDiv.innerText = `Clase: ${classr} - Orden: ${order} - Nº estudiantes: ${numberStudents} 
        Estudiantes: ${studentsClass}`;
        showClass.appendChild(newDiv);
    }
}

async function getStudents() {
    let students = [];
    await fetch('http://localhost:8080/api/student/all', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => res.json())
        .then(({ student }) => {
            students = student;
        })
    return students;
}

async function getClass() {
    let classrooms = [];
    await fetch('http://localhost:8080/api/classroom/all', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => res.json())
        .then(({ classroom }) => {
            classrooms = classroom;
        })

    return classrooms;
}


checkbox1.addEventListener('change', function() {

    const id = '62e6ba28fb4176d6698c3773';
    if (this.checked) {
        arrayStudents.push(id)
    } else {
        arrayStudents = arrayStudents.filter(ele =>  ele !== id)
    }
  });

  checkbox2.addEventListener('change', function() {

    const id = '62e6f1bcfef01501ef190378';
    if (this.checked) {
        arrayStudents.push(id)
    } else {
        arrayStudents = arrayStudents.filter(ele =>  ele !== id)
    }
  });

  checkbox3.addEventListener('change', function() {

    const id = '62e6fa66fef01501ef190385';
    if (this.checked) {
        arrayStudents.push(id)
    } else {
        arrayStudents = arrayStudents.filter(ele =>  ele !== id)
    }
  });


let checkList = document.getElementById('list1');
checkList.getElementsByClassName('anchor')[0].onclick = function(evt) {
  if (checkList.classList.contains('visible'))
    checkList.classList.remove('visible');
  else
    checkList.classList.add('visible');
}