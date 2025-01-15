import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class EstadisticasService {
  constructor(private http: HttpClient, private sessionService: SessionService) {}

  // Método para registrar la visita
  registrarVisita(sitioEvento: string) {
    const userId = localStorage.getItem('userId') || null;
    const sessionId = this.sessionService.getSessionId();

    const data = {
      sessionId: sessionId,
      userId: userId,
      sitioEvento: sitioEvento,
      tipoEvento: 'visita',
      createdAt: new Date(),
    };

    // Llamada al backend para registrar la visita
    return this.http.post(`http://localhost:3000/api/estadisticas`, data);
  }

  registrarClick(sitioEvento: string) {
    const userId = localStorage.getItem('userId') || null;
    const sessionId = this.sessionService.getSessionId();

    const data = {
      sessionId: sessionId,
      userId: userId,
      sitioEvento: sitioEvento,
      tipoEvento: 'click',
      createdAt: new Date(),
    };

    return this.http.post(`http://localhost:3000/api/estadisticas`, data); // Corregido
  }

  getUltimosEventos() {
    return this.http.get(`http://localhost:3000/api/estadisticas/ultimos`);
  }

  getEstadisticas(filtros: any) {
    return this.http.get(`http://localhost:3000/api/estadisticas`, { params: filtros });
  }
}
