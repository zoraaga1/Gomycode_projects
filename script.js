// Drop list
const collapsibleContainer = document.querySelector(".collapsible-container");
collapsibleContainer.addEventListener("click", toggleCollapsible)
function toggleCollapsible() {
    const content = document.querySelector('.collapsible-content');
    content.classList.toggle('open');

    const triangle = document.querySelector('.triangle-down');
    if (content.classList.contains('open')) {
        triangle.style.transform = 'rotate(180deg)';
    } else {
        triangle.style.transform = 'rotate(0deg)';
    }
}

// show the from function
const addStudentBtn = document.querySelector("#add-student");
addStudentBtn.addEventListener("click", showform);
function showform() {
    document.querySelector(".form-visibility").style.display = "block"
}

// cancel the form
const cancelBtn = document.querySelector("#cancel-btn");
cancelBtn.addEventListener("click", cancel);
function cancel() {
    const nameInput = document.querySelector("#name-input");
    const ageInput = document.querySelector("#age-input");
    const noteInput = document.querySelector("#note-input");
    
    document.querySelector(".form-visibility").style.display = "none";
    
    nameInput.value = "";
    ageInput.value = "";
    noteInput.value = "";
}

//Check status
function checkStatus(note) {
    if (note >= 10) {
        return "Passed"
    }else {
        return "Failed"
    }

}

// get values from form's inputs
const addInfobtn = document.querySelector("#addinfo-btn");
addInfobtn.addEventListener("click", getValues);

function getValues() {
    var name = document.querySelector("#name-input").value;
    var age = document.querySelector("#age-input").value;
    var note = document.querySelector("#note-input").value;
    
    if (name && age && note) { 
        var student = {
            name: name,
            age: age,
            note: note,
            status: checkStatus(note)
        };

        var statusColor;
        if (student.status === "Passed") {
            statusColor = "green";
        } else {
            statusColor = "red";
        }

        var tableBody = document.querySelector("#student-table-body");

        var rowHTML = `
            <tr>
                <td>${name}</td>
                <td>${age}</td>
                <td>${note}</td>
                <td style="color: ${statusColor};">${student.status}</td>
            </tr>
        `;

        tableBody.innerHTML += rowHTML;

        // Clear inputs
        document.querySelector("#name-input").value = "";
        document.querySelector("#age-input").value = "";
        document.querySelector("#note-input").value = "";

        var storedStudents = localStorage.getItem("students");
        var students;

        if (storedStudents) {
            students = JSON.parse(storedStudents);
            students.push(student);
        } else {
            students = [student];
        }

        localStorage.setItem("students", JSON.stringify(students));

        var totalStudents = students.length;
        document.querySelector("#total-students").innerText = "Total Students: " + totalStudents;

        alert("Student added!");
    } else {
        alert("Please fill in all fields!");
    }
}


// call the students when the windows loaded
window.onload = function() {
    let storedStudents = localStorage.getItem("students");

    if (storedStudents) {
        let students = JSON.parse(storedStudents);
        let tableBody = document.querySelector("#student-table-body");

        for (var i = 0; i < students.length; i++) {
            var student = students[i];
            var statusColor;

            if (student.status === "Passed") {
                statusColor = "green";
            } else {
                statusColor = "red";
            }

            var rowHTML = `
                <tr>
                    <td>${student.name}</td>
                    <td>${student.age}</td>
                    <td>${student.note}/20</td>
                    <td style="color:${statusColor};">${student.status}</td>
                </tr>
            `;
            tableBody.innerHTML += rowHTML;
        }

        var totalStudents = students.length;
        document.querySelector("#total-students").innerText = "Total Students: " + totalStudents;
    }
}