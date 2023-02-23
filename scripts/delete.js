const postContainer = document.getElementById('post-container');


const handleDelete = (e) => {
    if(e.target.id === 'delete'){
        const targetPostId = parseInt(e.target.parentNode.id); 
        fetch(`https://jsonplaceholder.typicode.com/posts/${targetPostId}`,{
            method: 'DELETE',
        });
        fetch(`https://jsonplaceholder.typicode.com/posts/${targetPostId}`)
            .then(res => res.json())
            .then(post => {
                if(post.id !== targetPostId){
                    e.target.parentNode.parentNode.parentNode.remove(e.target)
                }
            })

    }else if(e.target.id === 'update'){
        console.log('update');
    }
}

// add event listener
postContainer.addEventListener('click',handleDelete);