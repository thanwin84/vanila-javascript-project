
const postsContainer = document.getElementById('posts-container')
const loader = document.querySelector('.loader')
const filter = document.getElementById('filter')

let limit = 5
let page = 1

async function getPosts(){
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
    const data = await response.json()
    return data
}

async function showPosts(){
    const posts = await getPosts()
    posts.forEach(post =>{
        const postElement = document.createElement('article')
        postElement.classList.add('post')
        postElement.innerHTML = `
        <div class="number">${post.id}</div>
            <div class="post-info">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">${post.body}</p>
            </div>
        `
        postsContainer.appendChild(postElement)
    })
}

// show loader and fetch more posts
function showloading(){
    loader.classList.add('show')
    setTimeout(()=>{
        loader.classList.remove('show')
        setTimeout(()=>{
            page++
            showPosts()
        }, 300)
    }, 1000)
}
// filter post by input
function filterPosts(e){
    const searchText = e.target.value.toUpperCase()
    const posts = document.querySelectorAll('.post')
    posts.forEach(post => {
        const title = post.querySelector('.post-title').innerText.toUpperCase()
        const body = post.querySelector('.post-body').innerText.toUpperCase()
       
        if (title.indexOf(searchText) > -1 || body.indexOf(searchText) > -1){
            post.style.display = "flex"
        } else {
            // hide post if it's not a match
            post.style.display = "none"
        }
    })
}

    
function debounce(callback, delay){
    let timeoutId;
    return function (){
        if (timeoutId){
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(()=>{
            console.log("done")
            callback()
        }, delay)
        
    }
}

// show initial posts
showPosts()

window.addEventListener('scroll', ()=>{
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement
    if (scrollTop + clientHeight >= scrollHeight - 5){
        showloading()
    }
})


filter.addEventListener('input', function(e){
    debounce(()=>filterPosts(e), 500)()
}
)