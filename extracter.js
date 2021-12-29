let allTaskData = new Object();
const userIds = new Array();
const ids = new Array();
const titles = new Array();
const completeness = new Array();
let extractData = function( ) {
    for (let index in allTaskData) {
        userIds.push(allTaskData[index]['userId']);
        ids.push(allTaskData[index]['id']);
        completeness.push(allTaskData[index]['completed']);
        titles.push(allTaskData[index]['title']);
    }
    
    let idChecker = new Set(userIds);
    const size = [...Array(idChecker.size).keys()];
    idChecker = Array.from(idChecker);
    for (let i in size) {
        const user = parseInt(idChecker[i]);

        const theUserElement = document.createElement('div');
        theUserElement.classList.add('user');
        theUserElement.setAttribute('id', 'user'+String(user))

        const theTaskElement = document.createElement('div');
        theTaskElement.classList.add('tasks');
        theTaskElement.setAttribute('id', 'task'+String(user))

        const theDiviser1 = document.createElement('div');

        const theDiviser2 = document.createElement('div');

        const mainDiv = document.getElementById('the-task');
        mainDiv.appendChild(theUserElement);
        mainDiv.appendChild(theTaskElement);
        mainDiv.appendChild(theDiviser1);
        mainDiv.appendChild(theDiviser2);
    }

    for (let i in titles) {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');

        const taskContent = document.createElement('p');
        taskContent.innerText = titles[i];

        const completenessContent = document.createElement('p');
        let comp, color;
        if (completeness[i]) {
            comp = 'YES';
            color = '#d0e0d9'; // light blue color
        } else {
            comp = 'NO';
            color = '#fce5cd'; // light red color
        }
        completenessContent.innerText = 'Completed: '+comp;

        taskDiv.appendChild(taskContent);
        taskDiv.appendChild(completenessContent);
        taskDiv.style.backgroundColor = color;

        const inserter = document.getElementById('task'+String(userIds[i]));
        inserter.appendChild(taskDiv);
    }
}

fetch('https://jsonplaceholder.cypress.io/todos')
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        allTaskData = data;
        extractData();
    });


let allUsersData = new Object();
const nameIds = new Array();
const names = new Array();
const userNames = new Array();
const emails = new Array();
let extractNames = function() {
    for (let index in allUsersData) {
        nameIds.push(allUsersData[index]['id']);
        names.push(allUsersData[index]['name']);
        userNames.push(allUsersData[index]['username']);
        emails.push(allUsersData[index]['email']);
    }

    for (let index in nameIds) {
        let id = 'user' + String(nameIds[index]);
        if (document.getElementById(id)) {
            let nameInserter = document.getElementById(id);

            const theName = document.createElement('p');
            theName.innerHTML = names[index];
            nameInserter.appendChild(theName);
            const theUserName = document.createElement('p');
            theUserName.innerHTML = 'User: ' + userNames[index];
            nameInserter.appendChild(theUserName);
            const theEmail = document.createElement('p');
            theEmail.innerHTML = emails[index];
            nameInserter.appendChild(theEmail);
        }
    }
}

fetch('https://jsonplaceholder.cypress.io/users')
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        allUsersData = data;
        setTimeout(() => extractNames(), 80);
    });
