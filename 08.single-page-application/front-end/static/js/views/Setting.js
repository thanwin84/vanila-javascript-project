import AbstactView from "./AbstactView.js";


export default  class extends AbstactView{
    constructor(){
        super()
        this.setTitle("Settings")
    }

    async getHTML(){
        return `
        <h1>Setting Page</h1>
        <p>This is setting page</p>
        `
    }
}