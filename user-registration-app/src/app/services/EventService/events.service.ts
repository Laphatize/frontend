
import { filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { BehaviorSubject ,  Observable } from 'rxjs';
import { AppConstants } from '../../AppConstants';

@Injectable()
export class EventsService {

  private url = `${AppConstants.SOCKET_BASE_URL}/events`;
  private socket;

  private broadcastSubject: BehaviorSubject<Event> = new BehaviorSubject<Event>(new Event(''));

  public next(event: Event): void {
    return this.broadcastSubject.next(event);
  }

  public subject(event: Event): Observable<Event> {
    return this.broadcastSubject.asObservable().pipe(filter(e => e.type === event.type));
  }

  constructor() { }

  getEvents() {
    return new Observable((observer) => {
      observer.complete();
      // this.socket = io(this.url, {
      //   path: '/v1/live',
      //   transportOptions: {
      //     polling: { extraHeaders: { idtoken } },
      //   },
      // });
      // this.socket.on('connect', () => {
      //   console.log('CONNECTED');
      //   this.next(new Event('connected'));
      // });
      //
      // this.socket.on('disconnect', () => {
      //   console.log('DISCONNECTED');
      //   this.next(new Event('disconnected'));
      // });
      // this.socket.on('event', (data) => {
      //   observer.next(data);
      // });
      // return () => {
      //   this.socket.disconnect();
      // };
    });
  }
}
