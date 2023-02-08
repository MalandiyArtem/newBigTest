import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class IframeService {
  constructor(private router: Router) {
  }

  // This is the test of recording

  simpleFunction() {
  }

  checkIsIframe(page: string) {
    this.router.navigate([page]);
  }
}
