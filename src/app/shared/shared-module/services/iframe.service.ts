import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IframeService {
  private myStream$ = new Subject<boolean>();
  constructor(private router: Router) {
  }

  checkIsIframe(page: string) {
    this.router.navigate([page]);
  }

  iframeMethod() {
    this.myStream$.next(true);
  }

  getIframeMethod() {
    return this.myStream$ as Observable;
  }
}
