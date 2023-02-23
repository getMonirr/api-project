// selection
const postBtn = document.getElementById('post-btn');
const titleInput = document.getElementById('title');
const emotionInput = document.getElementById('emotion');

const handlePost = (e) => {
    e.preventDefault();
    const title = titleInput.value;
    const emotion = emotionInput.value;
    const id = 0;
    postOnServer(title, emotion, (id + 1))
}

// display post in ui
const displayPost = (title,emotion) => {
    const postContainer = document.getElementById('post-container');
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card w-96 bg-primary text-primary-content my-4">
    <div class="card-body">
      <h2 class="card-title">${title}</h2>
      <p>${emotion}</p>
      <div class="card-actions justify-end">
        <button class="btn btn-warning btn-sm">Delete</button>
        <button class="btn btn-sm">Update</button>
      </div>
    </div>
  </div>
    `;
    postContainer.appendChild(div);
}

// set post
const setPost = (data) => {
    const { title, body } = data;
    displayPost(title, body);
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