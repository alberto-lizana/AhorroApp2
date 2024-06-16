import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateX(0)'
      })),
      state('out', style({
        transform: 'translateX(100%)'
      })),
      transition('in => out', animate('500ms ease-in-out')),
      transition('out => in', animate('150ms ease-in-out'))
    ])
  ]
})
export class HomePage implements OnInit{

  animationState = 'in'; 

  nombre: string = "";
  apellido: string = "";
  usuario: string = "";
  contrasena: string = "";

  Rcontrasena: string = "";
  isDBReady: boolean = false;
  selectedOption: string = "";

  educacionOptions: string[] = [];

  constructor(private router: Router,private alertController: AlertController,) {}


  ngOnInit() {
  }

   
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  limpiarDatos() {
    if (this.nombre.trim() !== '' || this.apellido.trim() !== '') {
      setTimeout(() => {
        this.animationState = 'in';
      }, 500); 

      this.nombre = '';
      this.apellido = '';
      this.selectedOption = '';
      this.usuario = '';
      this.contrasena = '';
      this.Rcontrasena = '';
      this.animationState = 'out'; 

    } else {
      this.nombre = '';
      this.apellido = '';
      this.selectedOption = '';
      this.usuario = '';
      this.contrasena = '';
      this.Rcontrasena = '';
      this.animationState = 'in'; 
    }
  }

  CrearCuenta() {
    if (this.nombre.trim() === '' || this.apellido.trim() === '' || this.usuario.trim() === '' || this.contrasena.trim() === '' || 
        this.Rcontrasena.trim() === '' || this.selectedOption.trim() === '')
        {
      this.presentAlert('Error', 'Campos vacíos');
    }
    else if (this.contrasena !== this.Rcontrasena) {
      this.presentAlert('Error', 'Las contraseñas no coinciden');
    }
    else {
      this.presentAlert('Correcto', 'Usuario creado con éxito');
      let navigationExtras: NavigationExtras = {
        state: {
          nombre: this.nombre,
          apellido: this.apellido,
          usuario: this.usuario,
          contrasena: this.contrasena,

          Rcontrasena: this.Rcontrasena,
          selectedOption: this.selectedOption,
        }
      };
      this.router.navigate(['/login'], navigationExtras);
      }
    }
  }

