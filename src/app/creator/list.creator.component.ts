import {Component, OnInit} from '@angular/core';
import { IList } from '../structures/lista';
import { ListService } from '../services/lists.service';

@Component({
    selector: 'creator',
    templateUrl: 'list.creator.component.html',
})
export class ListCreatorComponent implements OnInit {

    constructor(private listS: ListService) {}
    
    public list : IList = {title:''}
    public errorMessage = '';

    ngOnInit(): void {

    }

    save(): void {
        this.listS.add(this.list).then((result) => {
            this.list.title = '';
        });
    }
}