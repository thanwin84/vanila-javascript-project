import Dashboard from "./views/Dashboard.js"
import Post from "./views/Post.js"
import Setting from './views/Setting.js'




// function to naviaget to a new url
const navigateTo = url =>{
    // push the url to history stack
    history.pushState(null, null, url)
    // look up resource for the new url
    router()
}

const router = async()=>{
    
    const routes = [
        { 
            path: "/",
            view: Dashboard
        },
        {
            path: "/posts",
            view: Post
        },
        {
            path: "/setting",
            view: Setting
        }
    ]
    // test each route for potential match
    const potentialMatches = routes.map(route =>{
        return {
            route: route,
            isMatch: location.pathname === route.path
        }
    })

    // find the matrched route
    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch)
    if (!match){
        match = {route: routes[0], isMatch: true}
    }
    const view = new match.route.view()
    document.querySelector("#app").innerHTML = await view.getHTML()
    
}

// event listener for navigating back
window.addEventListener('popstate', router)

document.addEventListener("DOMContentLoaded", ()=>{
    
    document.body.addEventListener('click', (e)=>{
        if (e.target.matches("[data-link]")){
            e.preventDefault()
            // push the current url to history stack
            navigateTo(e.target.href)
        }
    })
    // call the router function to handle initial routing
    router()
})

