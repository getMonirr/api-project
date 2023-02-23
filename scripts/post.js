// selection

let id = 0;
const postBtn = document.getElementById('post-btn');
const titleInput = document.getElementById('title');
const emotionInput = document.getElementById('emotion');

const handlePost = (e) => {
    id += 1;
    e.preventDefault();
    const title = titleInput.value;
    const emotion = emotionInput.value;
    postOnServer(title, emotion, (id))
}

// display post in ui
const displayPost = (title, emotion, id) => {
    const postContainer = document.getElementById('post-container');
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card w-96 bg-primary text-primary-content my-4">
    <div class="card-body">
      <h2 class="card-title">${title}</h2>
      <p>${emotion}</p>
      <div id="${id}" class="card-actions justify-end">
        <button id="delete" class="btn btn-warning btn-sm">Delete</button>
        <button id="update" class="btn btn-sm">Update</button>
      </div>
    </div>
  </div>
    `;
    postContainer.appendChild(div);
}

// set post
const setPost = (data) => {
    const { title, body, id } = data;
    displayPost(title, body, id);
}

// post to and get form server
const postOnServer = (title, emotion, id) => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: title,
            body: emotion,
            userId: id,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((data) => setPost(data));
}





// add event listener

postBtn.addEventListener('submit', handlePost);