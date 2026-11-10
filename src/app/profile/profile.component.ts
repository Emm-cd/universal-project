import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthServices } from '../services/auth.services';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
    public nombre = '';
    public email = '';
    public loading = true;
    public saving = false;
    public successMessage = '';
    public errorMessage = '';
    private uid = '';

    constructor(
        private auth: AuthServices,
        private afAuth: AngularFireAuth,
        private users: UserService
    ) { }

    ngOnInit(): void {
        this.auth.getUser().subscribe(user => {
            this.uid = user.uid;
            this.email = user.email;
            this.nombre = user.nombre || '';
            this.loading = false;
        }, error => {
            console.error('No se pudo cargar el perfil del usuario.', error);
            this.errorMessage = 'No se pudo cargar tu perfil. Inténtalo de nuevo.';
            this.loading = false;
        });
    }

    save(): void {
        const user = this.afAuth.auth.currentUser;
        if (!user || user.uid !== this.uid) {
            this.errorMessage = 'No se encontró una sesión válida. Inicia sesión e inténtalo de nuevo.';
            return;
        }

        const nombre = this.nombre.trim();
        this.saving = true;
        this.successMessage = '';
        this.errorMessage = '';

        user.updateProfile({ displayName: nombre }).then(() => {
            return this.users.updateNombre(this.uid, nombre);
        }).then(() => {
            this.nombre = nombre;
            this.successMessage = 'Tu perfil se actualizó correctamente.';
        }).catch(error => {
            console.error('No se pudo actualizar el perfil del usuario.', error);
            this.errorMessage = 'No se pudo guardar tu perfil. Inténtalo de nuevo.';
        }).then(() => {
            this.saving = false;
        });
    }
}
