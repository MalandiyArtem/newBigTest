import { Directive, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IframeService } from '../services/iframe.service';

@Directive({
  selector: '[appIsIframe]',
})
export class IsIframeDirective implements OnInit {
  constructor(
    private iframeService: IframeService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.iframeService.checkIsIframe(this.router.url);
  }
}
