import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
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
  
  ngOnInit() {
  }
  
  constructor(
    private router: Router,
    private activateroute: ActivatedRoute,
  ) {
    this.activateroute.queryParams.subscribe(params => {
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


}



