const galleryContainer = document.getElementById('gallery-container');
const userCard = document.getElementById('user-container');

const loadMoreContainer = document.getElementById('load-more-container');
const postDiv = document.getElementById('post-div');
const postContainer = document.getElementById('post-container');

const displayUI = (name, id, city, street, catchPhrase) => {
  const div = document.createElement('div');
  div.innerHTML = `
            <div class="card w-96 bg-base-100 shadow-xl">
                <figure><img src="https://source.unsplash.com/random" alt="Shoes" /></figure>
                <div class="card-body">
                  <h2 class="card-title">
                    ${name}
                    <div class="badge badge-secondary">${id}</div>
                  </h2>
                  <p>${catchPhrase}</p>
                  <div class="card-actions justify-end">
                    <div class="badge badge-outline">${city}</div> 
                    <div class="badge badge-outline">${street}</div>
                  </div>
                </div>
              </div>
    `;
  userCard.appendChild(div);
}
const loadUserData = () => {
  ('load-more-container');
  galleryContainer.classList.toggle('hidden');
  userCard.classList.remove('hidden');
  postDiv.classList.add('hidden');
  postContainer.classList.add('hidden');
  loadMoreContainer.classList.add('hidden');

  fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(data => setData(data))
}
const setData = (data) => {
  data.map(user => {
    const { name, address, company: { catchPhrase }, id } = user;
    const { street, city } = address;
    displayUI(name, id, street, city, catchPhrase);
  })

}


// add event listener 
const loadUser = document.getElementById('load-user');
loadUser.addEventListener('click', loadUserData);

