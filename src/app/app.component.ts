import { Component , OnInit} from '@angular/core';

@Component({
    selector : 'app-root',
    templateUrl : './app.component.html',
    styleUrls : ['./app.component.css']
})

export class AppComponent implements OnInit {
    public inputValue : string = '';
    public checkArray : Array<any> = [];
    public deletedList : Array<any> = [];
    public count : number = 0;
    public visible : boolean = true;
    public condition : boolean = false;
    public mainDiv : any;

    public giveColors = function() {
        let dates = document.querySelectorAll('.list');
        for(let i = 0 ; i < dates.length ; i++) {
            dates[i].setAttribute('style','color:#fff;');
        }
    }

    constructor() {

    }

    ngOnInit() {
        
    } 

    addNewDiv() {
        if (this.inputValue != '') {
            let str = this.inputValue;
            let currentObject = {
                text : str,
                done : false,
                disabled : 1,
                active : 'Active',
                visibility : 'none',
                block : 'none'
            };
            this.checkArray.push(currentObject);
            this.count++;
            this.inputValue = ''; 
        }
    }

    removeDiv(index) {
        this.deletedList.push(this.checkArray[index]);
        this.checkArray.splice(index,1);
    }

    completeAction(index) {
        if (!this.checkArray[index].done) {
            this.checkArray[index].block = 'block';
            this.checkArray[index].done = true;
            this.checkArray[index].disabled = 0.3;
            this.checkArray[index].active = 'Completed';
            setTimeout(() => {
                this.checkArray[index].visibility = 'inline';
            },1000);
            this.count--;
        }
        else {
            this.checkArray[index].done = false;
            this.checkArray[index].block = 'none';
            this.checkArray[index].disabled = 1;
            this.checkArray[index].active = 'Active';
            this.checkArray[index].visibility = 'none';
            this.count++;
        }
    }

    showActives(block) {
        let parentBlock = block.parentElement;
        let parentAll = parentBlock.parentElement;
        let childElements = parentAll.children;
        let mainChild = childElements[1];
        let childrenArray = mainChild.children;
        for(let i = 0 ; i < childrenArray.length ; i++) {
            if (childrenArray[i].style.opacity == 1) {
                childrenArray[i].style.display = 'flex';
            }
            else {
                childrenArray[i].style.display = 'none';
            }
        }
        this.giveColors();
        block.style.color = "#000";
    }

    showCompleteds(block) {
        let parentBlock = block.parentElement;
        let parentAll = parentBlock.parentElement;
        let childElements = parentAll.children;
        let mainChild = childElements[1];
        let childrenArray = mainChild.children;
        for(let i = 0 ; i < childrenArray.length ; i++) {
            if (childrenArray[i].style.opacity == 0.3) {
                childrenArray[i].style.display = 'flex';
            }
            else {
                childrenArray[i].style.display = 'none';
            }
        }
        this.giveColors();
        block.style.color = "#000";
    }

    showAll(block) {
        let parentBlock = block.parentElement;
        let parentAll = parentBlock.parentElement;
        let childElements = parentAll.children;
        let mainChild = childElements[1];
        let childrenArray = mainChild.children;
        for(let i = 0 ; i < childrenArray.length ; i++) {
            if (childrenArray[i].style.opacity == 0.3 || childrenArray[i].style.opacity == 1) {
                childrenArray[i].style.display = 'flex';
            }
        }
        this.giveColors();
        block.style.color = "#000";
    }

    showDeleted(block) {
        if (!this.condition) {
            this.giveColors();
            block.style.color = "#000";
            if (this.deletedList.length != 0) {
                setTimeout(() => {
                    alert('Dear user notice that deleted lists are disabled ! They are only for reading.');
                },0);
                this.mainDiv = document.createElement('div'); 
                let last = document.getElementById('last-block');
                let parent = last.parentElement;
                parent.insertBefore(this.mainDiv,last);
                for(let i = 0 ; i < this.deletedList.length ; i++) {
                    let removed = document.createElement('div');
                    this.mainDiv.append(removed);
                    removed.setAttribute('style',`width:100%;height:53px;margin-left:0;margin-bottom:0;
                    border:2px solid #808080;border-bottom:none;overflow:hidden;position:relative;font-size:25px;
                    font-family:sans-serif;color:#000;text-indent:32px;cursor:pointer;padding-top:22px;`);
                    removed.setAttribute('title','Your action');
                    removed.innerHTML = this.deletedList[i].text;
                    if (this.checkArray.length == 0) {
                        this.count = 0;
                    }
                }
            }
            this.condition = true;
        }
        else {
            this.giveColors();
            if (this.deletedList.length != 0) {
                this.mainDiv.style.display = 'none';
            }
            this.condition = false;
        }
    }

    toClearMemory() {      
        if (this.deletedList.length != 0) {
            this.giveColors();
            this.mainDiv.style.display = 'none';
            this.deletedList.splice(0);
            setTimeout(() => {
                alert('The memory is cleared.');
            },0);
        }
    }
}
