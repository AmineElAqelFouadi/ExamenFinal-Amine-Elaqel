import { Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private sessionId: string;

  constructor() {
    // Si no existe un sessionId, lo generamos
    if (!localStorage.getItem('sessionId')) {
      this.sessionId = this.generateSessionId();
      localStorage.setItem('sessionId', this.sessionId);
    } else {
      this.sessionId = localStorage.getItem('sessionId')!;
    }
  }

  private generateSessionId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  getSessionId(): string {
    return this.sessionId;
  }
}
