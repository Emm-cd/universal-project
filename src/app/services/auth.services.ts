import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

import { IUser } from '../structures/users';
import 'firebase/auth'
import { UserService } from './user.service';
@Injectable()
export class AuthServices {
    constructor(private afAuth: AngularFireAuth, private userS: UserService) { }
    
    getUser() : Observable<IUser>{
        return this.afAuth.authState.pipe(
            take(1),
            filter(user => !!user),
            map(user => user as IUser)
        );
    }
    
    login() : Promise<void>{
     return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
        .then(result=> {
            return this.userS.add({uid: result.user!.uid, email: result.user!.email!})
        }).catch(console.log);
    }
}