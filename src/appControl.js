import ItemController from "./itemControl";
import UIController from "./uiControl";
import Storage from "./storageControl";

class appController{
    constructor() {
        new UIController().hideButton();
        this.loadEvent();
        let ui = new UIController();
        let total = ItemController.totalCalories();
        ui.showTotal(total);
    }
    loadEvent(){
        const UIClass = new UIController();
        let idGenerator = new ItemController.generateID();
        document.querySelector(UIClass.selectors.addButton).addEventListener('click', e=>{
            let input = UIClass.getInputValue();
            if(input.name !== '' && input.calorie !== ''){
                let id = idGenerator.next().value;
                let item = new ItemController(id,input.name,input.calorie);
                ItemController.addItem(item);
                let items = ItemController.getItems();
                UIClass.showDataItems(items);
                let total = ItemController.totalCalories();
                UIClass.showTotal(total);
                UIClass.clearInput();
                Storage.storeInStorage(item);
            }else{
                alert('مقادیر نمیتواند خالی باشد.');
            }
        });
        document.querySelector(UIClass.selectors.listItem).addEventListener('click', e =>{
            e.preventDefault();
            if(e.target.parentElement.parentElement.classList.contains('uk-text-success')){
                const [valueName, valueAmount] = [e.target.parentElement.parentElement.parentElement.children[1].innerText, e.target.parentElement.parentElement.parentElement.children[2].innerText];

                const listID = e.target.parentNode.parentNode.parentNode.parentNode.id;
                const id = listID.split('-');

                let itemToEdit = ItemController.getItems(id[1]);

                ItemController.setCurrentItem(itemToEdit);// set id
                UIClass.fillEditData(valueName,valueAmount);
                UIClass.showButton(); // show edit button
            }
        });
        document.querySelector(UIClass.selectors.updateButton).addEventListener('click', e => {
            const input = UIClass.getInputValue();
            const updateItem = ItemController.updateItems(input.name,input.calorie);
            UIClass.showUpdateItems(updateItem);
            Storage.updateStorage(updateItem);
            UIClass.clearInput();
            UIClass.hideButton();

        });
        document.querySelector(UIClass.selectors.backButton).addEventListener('click', e=>{
            UIClass.clearInput();
            UIClass.hideButton();
        });

        document.querySelector(UIClass.selectors.deleteButton).addEventListener('click', e=>{
            if(confirm('این ردیف حذف میشه، مطمئن هستی ؟')) {
                const currentItemID = ItemController.getCurrentItem();
                ItemController.deleteItem(currentItemID);
                console.log(currentItemID);
                UIClass.removeItem(currentItemID);
                let total = ItemController.totalCalories();
                UIClass.showTotal(total);
                Storage.deleteStorage(currentItemID);
                UIClass.clearInput();
                UIClass.hideButton();

            }
        });
        let i = document.querySelectorAll(UIClass.selectors.clearAll);
        i[0].addEventListener('click', e=>{
            if(confirm('همه چیز پاک میشه مطمئن هستی ؟')){
                ItemController.clearItems();
                UIClass.removeItems();
                let total = ItemController.totalCalories();
                UIClass.showTotal(total);
                Storage.clearStorage();
            }
        });
        i[1].addEventListener('click', e=>{

            if(confirm('همه چیز پاک میشه مطمئن هستی ؟')){
                ItemController.clearItems();
                UIClass.removeItems();
                let total = ItemController.totalCalories();
                UIClass.showTotal(total);
                Storage.clearStorage();
            }
        });


    }
}

export default appController;