import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  nombre!: string;
  apellido!: string;
  usuario!: string;
  contrasena!: string;

  sueldo!: number;
  montoObjetivo!: number;
  porcentaje!: number;
  ahorroMensual!: number;
  tiempoParaAlcanzarMeta!: number; 
  montoDisponible!: number;
  Rcontrasena!: string;
  selectedOption!: number;

  montoEnReduccion: number = 0;

  valorASumarMercaderia: number = 0;
  valorTotalMercaderia: number = 0;

  valorASumarServicios: number = 0;
  valorTotalServicios: number = 0;

  valorASumarEntretenimiento: number = 0;
  valorTotalEntretenimiento: number = 0;

  porcentajeMercaderia: number = 0;
  porcentajeServicios: number = 0;
  porcentajeEntretenimiento: number = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras?.state) {
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
    });
  }

  ngOnInit() {
    this.loadState();
  }

  loadState() {
    const savedState = localStorage.getItem('financialState');
    if (savedState) {
      const state = JSON.parse(savedState);
      this.montoEnReduccion = state.montoEnReduccion ?? this.montoDisponible; // Mantén el monto si existe, o usa montoDisponible
      this.valorTotalMercaderia = state.valorTotalMercaderia;
      this.valorTotalServicios = state.valorTotalServicios;
      this.valorTotalEntretenimiento = state.valorTotalEntretenimiento;
      this.porcentajeMercaderia = state.porcentajeMercaderia;
      this.porcentajeServicios = state.porcentajeServicios;
      this.porcentajeEntretenimiento = state.porcentajeEntretenimiento;
    } else {
      this.montoEnReduccion = this.montoDisponible; // Inicializa montoEnReduccion si no hay estado guardado
    }
  }

  saveState() {
    const state = {
      montoEnReduccion: this.montoEnReduccion,
      valorTotalMercaderia: this.valorTotalMercaderia,
      valorTotalServicios: this.valorTotalServicios,
      valorTotalEntretenimiento: this.valorTotalEntretenimiento,
      porcentajeMercaderia: this.porcentajeMercaderia,
      porcentajeServicios: this.porcentajeServicios,
      porcentajeEntretenimiento: this.porcentajeEntretenimiento,
      nombre: this.nombre,
      apellido: this.apellido,
      usuario: this.usuario,
      contrasena: this.contrasena,
      sueldo: this.sueldo,
      montoObjetivo: this.montoObjetivo,
      porcentaje: this.porcentaje,
      ahorroMensual: this.ahorroMensual,
      tiempoParaAlcanzarMeta: this.tiempoParaAlcanzarMeta,
      montoDisponible: this.montoDisponible
    };
    localStorage.setItem('financialState', JSON.stringify(state));
  }


  async sumarGasto(categoria: string, valorASumar: number) {
    if (valorASumar > this.montoEnReduccion) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'El monto del gasto excede el monto disponible.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    switch (categoria) {
      case 'mercaderia':
        this.valorTotalMercaderia += valorASumar;
        this.montoEnReduccion -= valorASumar;
        break;
      case 'servicios':
        this.valorTotalServicios += valorASumar;
        this.montoEnReduccion -= valorASumar;
        break;
      case 'entretenimiento':
        this.valorTotalEntretenimiento += valorASumar;
        this.montoEnReduccion -= valorASumar;
        break;
      default:
        break;
    }
    this.calcularPorcentaje();
    this.saveState();
  }

  calcularPorcentaje() {
    if (this.montoDisponible > 0) {
      this.porcentajeMercaderia = Math.round((this.valorTotalMercaderia / this.montoDisponible) * 100);
      this.porcentajeServicios = Math.round((this.valorTotalServicios / this.montoDisponible) * 100);
      this.porcentajeEntretenimiento = Math.round((this.valorTotalEntretenimiento / this.montoDisponible) * 100);
    } else {
      this.porcentajeMercaderia = 0;
      this.porcentajeServicios = 0;
      this.porcentajeEntretenimiento = 0;
    }
  }

  reiniciar() {
    this.valorTotalMercaderia = 0;
    this.valorTotalServicios = 0;
    this.valorTotalEntretenimiento = 0;
    this.montoEnReduccion = this.montoDisponible;
    this.calcularPorcentaje();
    this.saveState();
  }
}