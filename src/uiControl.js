import ItemController from "./itemControl";

class UIController{
    constructor() {
        this.selectors = {
            addButton: '.add-btn',
            updateButton: '.btn-update',
            deleteButton: '.btn-delete',
            backButton: '.btn-back',
            itemName: '#item-name',
            itemCalories: '#item-calorie',
            listItem: '#list-item',
            listItems: '#list-item li',
            clearAll: '.clear-all',
            totalCalories: '#total-calorie',
        };
        let items = new ItemController.getItems();
        this.showDataItems(items);
    }
    getInputValue(){
        return{
            name: document.querySelector(this.selectors.itemName).value,
            calorie: document.querySelector(this.selectors.itemCalories).value
        }
    }

    showDataItems(items){
        let html = '';
        items.forEach(item =>{
            html += `
            <li id="item-${item.id}">
                <div class="uk-padding-small">
                    <span class="uk-icon" uk-icon="chevron-left"></span>
                    <span class="kiram_to_zendegi">${item.name}</span>
                    <span class="uk-badge uk-label-${item.calories > 900 ? 'danger' : 'success'}">${item.calories}</span>
                    <a href="#" class="uk-text-success">
                        <span class="uk-icon uk-float-left" uk-icon="icon: pencil; ratio: 1.3"></span>
                    </a>
                </div>
            </li>
            `;
        });
        document.querySelector(this.selectors.listItem).innerHTML = html;
    }
    clearInput(){
        document.querySelector(this.selectors.itemName).value = '';
        document.querySelector(this.selectors.itemCalories).value = '';
    }
    showTotal(total){
        document.querySelector(this.selectors.totalCalories).textContent = total;
    }
    hideButton(){
        document.querySelector(this.selectors.updateButton).classList.add('hide');
        document.querySelector(this.selectors.deleteButton).classList.add('hide');
        document.querySelector(this.selectors.backButton).classList.add('hide');
        document.querySelector(this.selectors.addButton).classList.remove('hide')
    }
    showButton(){
        document.querySelector(this.selectors.updateButton).classList.remove('hide');
        document.querySelector(this.selectors.deleteButton).classList.remove('hide');
        document.querySelector(this.selectors.backButton).classList.remove('hide');
        document.querySelector(this.selectors.addButton).classList.add('hide');
    }
    fillEditData(fName,fCalorie){
        document.querySelector(this.selectors.itemName).value = fName;
        document.querySelector(this.selectors.itemCalories).value = fCalorie;
    }
    showUpdateItems(item){

        const listItem = document.querySelectorAll(this.selectors.listItems);
        const liArr = Array.from(listItem);
        liArr.forEach( listItem =>{
           if(listItem.id === `item-${item.id}`){
               document.querySelector(`#${listItem.id}`).innerHTML = `
               <div class="uk-padding-small">
                    <span class="uk-icon" uk-icon="chevron-left"></span>
                    <span class="kiram_to_zendegi">${item.name}</span>
                    <span class="uk-badge uk-label-${item.calories > 900 ? 'danger' : 'success'}">${item.calories}</span>
                    <a href="#" class="uk-text-success">
                        <span class="uk-icon uk-float-left" uk-icon="icon: pencil; ratio: 1.3"></span>
                    </a>
                </div>
               `;
           }
        });
    }
    removeItem(id){
            let itemID = `#item-${id}`;
            let listItem = document.querySelector(itemID);
            listItem.remove();
    }
    removeItems(){

        const listItem = document.querySelectorAll(this.selectors.listItems);
        const listArr = Array.from(listItem);

        listArr.forEach( listItem =>{
            listItem.remove();
        });
    }


}

export default UIController;