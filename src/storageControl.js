class Storage{
    constructor() {
    }

    static storeInStorage(item){
        let items = [];
        if(localStorage.getItem('calorie-app') === null){
            items = [];
            items.push(item);
            localStorage.setItem('calorie-app',JSON.stringify(items));
        }else{
            items = JSON.parse(localStorage.getItem('calorie-app'));
            items.push(item);
            localStorage.setItem('calorie-app', JSON.stringify(items));
        }
    }
    static getFromStorage(){
        let items;
        if(localStorage.getItem('calorie-app') === null){
            items = [];
            return items;
        }else{
            items = JSON.parse(localStorage.getItem('calorie-app'));
            return items;

        }
    }
    static updateStorage(updateItem){
        let items = JSON.parse(localStorage.getItem('calorie-app'));e
        items.forEach((item,index)=>{
            if(item.id === updateItem.id){
                items.splice(index,1,updateItem);
            }
        });
        localStorage.setItem('calorie-app',JSON.stringify(items));
    }
    static deleteStorage(id){
        let items = JSON.parse(localStorage.getItem('calorie-app'));
        items.forEach((item,index)=>{
            if(item.id === id){
                items.splice(index,1);
            }
        });
        localStorage.setItem('calorie-app',JSON.stringify(items));
    }
    static clearStorage(){
        localStorage.removeItem('calorie-app');
    }

}

export default Storage;