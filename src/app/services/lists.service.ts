import {Injectable} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AuthServices } from './auth.services';
import { IList } from '../structures/lista';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ListService {
    
    public uid!: string;
    public listsCollection!: AngularFirestoreCollection<IList>;
    public lists! : Observable<IList[]>;

    constructor(public afs : AngularFirestore, private authService: AuthServices) {
        this.authService.getUser().subscribe(user => {
            this.uid = user.uid;

            if (this.uid)this.setCollection();
        })
    }
    setCollection() {
        this.listsCollection = this.afs.collection('users').doc(this.uid).collection<IList>('lists');
        this.lists = this.listsCollection.snapshotChanges().pipe(
            map(actions => actions.map(item => {
                const data = item.payload.doc.data() as IList;
                const id = item.payload.doc.id;
                return {...data, id};
            }))
        );
    }
    add(list: IList):Promise<any> {
        if(!this.listsCollection)throw Error('Debe asingar la coleccion antes de agregar un elemento');
        
        const createdAt = firebase.firestore.FieldValue.serverTimestamp();

        list.createdAt = createdAt;
        return this.listsCollection.add(list);
    }
}