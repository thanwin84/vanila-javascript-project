export default class AbstactView{
    constructor(){

    }

    setTitle(title){
        document.title = title
    }

    async getHTML(){
        return ""
    }
}