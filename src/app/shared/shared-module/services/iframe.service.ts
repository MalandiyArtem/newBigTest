import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class IframeService {
  constructor(private router: Router) {
  }

  checkIsIframe(page: string) {
    this.router.navigate([page]);
  }
}
