import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Crisis } from './crisis-center/crisis';
import { CRISES } from './crisis-center/mock-crises';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class CrisisService {

  constructor(private messageService: MessageService) { }

  getCrises(): Observable<Crisis[]> {
    // TODO: send the message _after_ fetching the crises
    this.messageService.add('CrisisService: fetched crises');
    return of(CRISES);
  }

  getCrisis(id: string): Observable<Crisis> {
    return of(CRISES.find(crisis => crisis.id === +id));
  }

}
