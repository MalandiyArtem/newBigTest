import {
  Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { FullscreenService } from '../services/fullscreen.service';

@Directive({
  selector: '[appIsFullscreen]',
})
export class IsFullscreenDirective implements OnInit, OnDestroy {
  @Input() activeClass: string | undefined;
  @Input() addClassInSmallScreen: boolean | undefined;
  private fullscreenSubscription: Subscription | undefined;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private fullscreenService: FullscreenService,
  ) { }

  ngOnInit(): void {
    this.fullscreenSubscription = this.fullscreenService.getIsFullScreen().subscribe((state) => {
      if (this.activeClass) {
        if (this.addClassInSmallScreen) {
          if (state) {
            this.renderer.removeClass(this.elementRef.nativeElement, this.activeClass);
          } else {
            this.renderer.addClass(this.elementRef.nativeElement, this.activeClass);
          }
        } else if (state) {
          this.renderer.addClass(this.elementRef.nativeElement, this.activeClass);
        } else {
          this.renderer.removeClass(this.elementRef.nativeElement, this.activeClass);
        }
      } else if (state) {
        this.renderer.removeAttribute(this.elementRef.nativeElement, 'hidden');
      } else {
        this.renderer.setAttribute(this.elementRef.nativeElement, 'hidden', String(!state));
      }
    });
  }

  ngOnDestroy(): void {
    this.fullscreenSubscription?.unsubscribe();
  }
}
