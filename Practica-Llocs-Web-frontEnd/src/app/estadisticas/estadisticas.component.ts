import { Component, OnInit } from '@angular/core';
import { EstadisticasService } from '../services/estadisticas.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.css'
})
export class EstadisticasComponent implements OnInit {
  eventos: any[] = [];
  fechaInicio: string = '';
  fechaFinal: string = '';
  sitioEvento: string = '';
  tipoEvento: string = '';

  constructor(private estadisticasService: EstadisticasService) {}

  ngOnInit() {
    this.obtenerUltimosEventos();
  }

  obtenerUltimosEventos() {
    this.estadisticasService.getUltimosEventos().subscribe((data: any) => {
      this.eventos = data;
    });
  }

  aplicarFiltros() {
    const filtros = {
      fechaInicio: this.fechaInicio,
      fechaFinal: this.fechaFinal,
      sitioEvento: this.sitioEvento,
      tipoEvento: this.tipoEvento
    };

    this.estadisticasService.getEstadisticas(filtros).subscribe((data: any) => {
      this.eventos = data;
    });
  }
}
