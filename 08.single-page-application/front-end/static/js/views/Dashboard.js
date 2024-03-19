import AbstactView from "./AbstactView.js";


export default  class extends AbstactView{
    constructor(){
        super()
        this.setTitle("Dashboard")
    }

    async getHTML(){
        return `
        <h1>Welcome Back, dom</h1>
        <p>
        This is the introduction to dom
        </p>
        <p>
        <a href="/posts" data-link>View Recent Posts</a>
        </p>
        `
    }
}