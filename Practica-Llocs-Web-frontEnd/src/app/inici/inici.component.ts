import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EstadisticasService } from '../services/estadisticas.service';

@Component({
  selector: 'app-inici',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './inici.component.html',
  styleUrl: './inici.component.css'
})
export class IniciComponent {
  private estadisticasService = inject(EstadisticasService);

  ngOnInit() {
    // Registrar acceso a la sección de inicio
    this.estadisticasService.registrarVisita('inicio').subscribe();
  }
}
