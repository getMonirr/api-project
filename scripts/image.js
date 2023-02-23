
let prevLoad = 0;
let nextLoad = 10;

const galleryContainer = document.getElementById('gallery-container');
('load-more-container');
const userCard = document.getElementById('user-container');
const loadMoreBtn = document.getElementById('load-more');

const displayGalleryUI = (title, url, albumId, id) => {

    const galleryContainer = document.getElementById('gallery-container');
    ('load-more-container');
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card w-96 bg-base-100 shadow-xl">
    <figure><img src="${url}" alt="Shoes" /></figure>
    <div class="card-body">
      <h2 class="card-title">
        ${title}
        <div class="badge badge-secondary">NEW</div>
      </h2>
      <div class="card-actions justify-end">
        <div class="badge badge-outline">Album Id: ${albumId}</div> 
        <div class="badge badge-outline">Photo Id: ${id}</div>
      </div>
    </div>
  </div>
    `;
    galleryContainer.appendChild(div);
}

const getImgData = () => {
    userCard.classList.add('hidden');
    galleryContainer.classList.remove('hidden');
    loadMoreBtn.classList.remove('hidden');


    fetch('https://jsonplaceholder.typicode.com/photos')
        .then(res => res.json())
        .then(data => setImg(data))
}

const setImg = (data) => {
    data.slice(prevLoad, nextLoad).map(img => {
        const { title, id, url, albumId } = img;
        displayGalleryUI(title, url, albumId, id);
    })
}

const handleLoadMore = () => {
    prevLoad += 10;
    nextLoad += 10;
    getImgData();
}

// selection
const imageGallery = document.getElementById('load-image-gallery');

// add event listener
imageGallery.addEventListener('click', getImgData);
loadMoreBtn.addEventListener('click', handleLoadMore);
