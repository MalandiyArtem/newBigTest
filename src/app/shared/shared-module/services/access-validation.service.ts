import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccessValidationService {
  private token = '123456';

  hasAccess(token: string) {
    return this.token === token;
  }
}
