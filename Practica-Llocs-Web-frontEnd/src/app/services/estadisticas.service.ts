import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionService } from './session.service';
import { environment } from 'src/environments/environment'; // Asegúrate de tener la URL correcta

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
    return this.http.post(`${environment.apiUrl}/api/estadisticas`, data);
  }
}
