import {Component,OnInit} from '@angular/core';
import {AuthServices} from '../services/auth.services';

//permite a la clase ejecutarce como componente
@Component({
selector: 'login',
templateUrl: 'login.component.html',
})
//declaracion de componentes 
export class LoginComponent implements OnInit {
    public errorMessage: string = '';

    constructor(private auth: AuthServices) {}
    
    ngOnInit(): void {
      this.auth.getUser().subscribe(console.log);
    }
    login() {
        this.errorMessage = '';
        this.auth.login().catch(error => {
            console.error('No se pudo iniciar sesión o guardar el usuario en Firestore.', error);
            this.errorMessage = 'No se pudo iniciar sesión o guardar tu usuario. Revisa la configuración y las reglas de Firebase.';
        });
    }
}