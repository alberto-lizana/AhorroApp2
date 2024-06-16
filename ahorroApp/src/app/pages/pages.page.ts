import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.page.html',
  styleUrls: ['./pages.page.scss'],
})
export class PagesPage implements OnInit {

    nombre: string;
    apellido: string;
    usuario: string;
    contrasena: string;
    titulo!: string;
  
    Rcontrasena!: string;
    selectedOption!: number;
  
    sueldo!: number;
    montoObjetivo!: number;
    porcentaje!: number;
    ahorroMensual!: number;
    tiempoParaAlcanzarMeta!: number; 
    montoDisponible!: number;
  
    
    constructor(private router:Router){
      this.nombre = this.router.getCurrentNavigation()?.extras?.state?.['nombre'];
      this.apellido = this.router.getCurrentNavigation()?.extras?.state?.['apellido'];
      this.usuario = this.router.getCurrentNavigation()?.extras?.state?.['usuario'];
      this.contrasena = this.router.getCurrentNavigation()?.extras?.state?.['contrasena'];
  
      this.Rcontrasena = this.router.getCurrentNavigation()?.extras?.state?.['Rcontrasena'];
      this.selectedOption = this.router.getCurrentNavigation()?.extras?.state?.['selectedOption'];
      
      this.sueldo = this.router.getCurrentNavigation()?.extras?.state?.['sueldo'];
      this.montoObjetivo = this.router.getCurrentNavigation()?.extras?.state?.['montoObjetivo'];
      this.porcentaje = this.router.getCurrentNavigation()?.extras?.state?.['porcentaje'];
      
      this.ahorroMensual = this.router.getCurrentNavigation()?.extras?.state?.['ahorroMensual'];
      this.tiempoParaAlcanzarMeta = this.router.getCurrentNavigation()?.extras?.state?.['tiempoParaAlcanzarMeta'];
      this.montoDisponible = this.router.getCurrentNavigation()?.extras?.state?.['montoDisponible'];
    }
  
    ngOnInit() {
        
    }
  
    TransferenciaDeDatos(tab:any) {
      let navigationExtras: NavigationExtras = {
        state: {
          nombre: this.nombre,
          apellido: this.apellido,
          usuario: this.usuario,
          contrasena: this.contrasena,
  
          Rcontrasena: this.Rcontrasena,
          selectedOption: this.selectedOption,
    
          sueldo: this.sueldo,
          montoObjetivo: this.montoObjetivo,
          porcentaje: this.porcentaje,
          ahorroMensual: this.ahorroMensual,
          tiempoParaAlcanzarMeta: this.tiempoParaAlcanzarMeta,
          montoDisponible: this.sueldo - this.ahorroMensual
        }
      };
      this.router.navigate(['/pages/' + tab], navigationExtras);
      }
    
  
      cambiarTitulo(event: any) {
        // Extrae el nombre del tab seleccionado del evento
        const tab = event.tab;
  
        // Cambia el título basado en el tab seleccionado
        switch (tab) {

          case 'tab0':
            this.titulo = 'Principal';
            break;

          case 'tab1':
            this.titulo = 'Presupuesto';
            break;

          case 'tab2':
            this.titulo = 'Perfil';
            break;

          default:
            this.titulo = 'Ahorro y Presupuesto';
        }
  
      }
  }
  
