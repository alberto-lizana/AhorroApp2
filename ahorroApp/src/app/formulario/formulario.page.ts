import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {

  nombre!: string;
  apellido!: string;
  usuario!: string;
  contrasena!: string;

  sueldo!: number;
  montoObjetivo!: number;
  porcentaje!: number;
  ahorroMensual!: number;
  tiempoParaAlcanzarMeta!: number; 
  montoDisponible: number = 0;
  Rcontrasena!: string;
  selectedOption!: number;
  

  constructor(private router: Router, private activateroute: ActivatedRoute,private alertController: AlertController,) 
  {  
    this.activateroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras?.state) {
        this.nombre = this.router.getCurrentNavigation()?.extras?.state?.['nombre'];
        this.apellido = this.router.getCurrentNavigation()?.extras?.state?.['apellido'];
        this.usuario = this.router.getCurrentNavigation()?.extras?.state?.['usuario'];
        this.contrasena = this.router.getCurrentNavigation()?.extras?.state?.['contrasena'];

        this.Rcontrasena = this.router.getCurrentNavigation()?.extras?.state?.['Rcontrasena'];
        this.selectedOption = this.router.getCurrentNavigation()?.extras?.state?.['selectedOption'];
      }
    });
}

  ngOnInit() {
  }

  actualizarPorcentaje(event: any) {
    this.porcentaje = event.detail.value;
  }

  actualizarPorcentajeInput(event: any) {
    const value = parseInt(event.target.value, 10);
    if (value >= 0 && value <= 100) {
      this.porcentaje = value;
    } else if (value < 0) {
      this.porcentaje = 0;
    } else if (value > 100) {
      this.porcentaje = 100;
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Aceptar']
    });
    await alert.present();
  }
    
  AhorroMensual() {
    return this.sueldo * (this.porcentaje / 100);
  }

  TiempoParaAlcanzarMeta() {
    let ahorroMensual = this.AhorroMensual();
    let tiempo = this.montoObjetivo / ahorroMensual;
    return parseFloat(tiempo.toFixed(1));
  }

  MontoDisponible() {
    return this.sueldo - this.AhorroMensual();
  }

  crearMeta() {
    if (this.sueldo === null || this.montoObjetivo === null || this.porcentaje === null || this.porcentaje > 100 || this.porcentaje < 0) {
      return this.presentAlert('¡Error!', 'Por favor, llene todos los campos')
    } else {
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
          ahorroMensual: this.AhorroMensual(),
          tiempoParaAlcanzarMeta: this.TiempoParaAlcanzarMeta(),
          montoDisponible: this.MontoDisponible()
        }
      };
      this.router.navigate(['/pages/page0'], navigationExtras);
      this.presentAlert('¡Perfecto!', 'Meta creada exitosamente');
    }
    return;
  }
}