import AbstactView from "./AbstactView.js";


export default  class extends AbstactView{
    constructor(){
        super()
        this.setTitle("Posts")
    }

    async getHTML(){
        return `
        <h1>Welcome to Post</h1>
        <p>
         this is a list of post page
        </p>
        
        `
    }
}