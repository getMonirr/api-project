// selection

let id = 0;
const postBtn = document.getElementById('post-btn');
const titleInput = document.getElementById('title');
const emotionInput = document.getElementById('emotion');
const socialMediaPost = document.getElementById('load-social-post');
// const postContainer = document.getElementById('post-container');
// const postDiv = document.getElementById('post-div');

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
    titleInput.value = '';
    emotionInput.value = '';
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
socialMediaPost.addEventListener('click', () => {
    postContainer.classList.remove('hidden');
    postDiv.classList.remove('hidden');
    galleryContainer.classList.add('hidden');
    userCard.classList.add('hidden');
    loadMoreContainer.classList.add('hidden')

})



const handleDelete = (e) => {
    if (e.target.id === 'delete') {
        const targetPostId = parseInt(e.target.parentNode.id);
        fetch(`https://jsonplaceholder.typicode.com/posts/${targetPostId}`, {
            method: 'DELETE',
        });
        fetch(`https://jsonplaceholder.typicode.com/posts/1`)
            .then(res => res.json())
            .then(post => {
                if (post.id !== targetPostId) {
                    e.target.parentNode.parentNode.parentNode.remove(e.target)
                }
            })

    } else if (e.target.id === 'update') {
        console.log('update');
    }
}

// add event listener
postContainer.addEventListener('click', handleDelete);