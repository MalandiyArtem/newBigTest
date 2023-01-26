import {
  Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { MediaControlService } from '../services/media-control.service';

@Directive({
  selector: '[appControl]',
})
export class ControlDirective implements OnInit, OnDestroy {
  @Input() activeClass = '';
  private mouseOnDocumentSubscription: Subscription | undefined;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private mediaControlService: MediaControlService,
  ) {
  }

  ngOnInit(): void {
    this.mouseOnDocumentSubscription = this.mediaControlService.getIsMouseOnDocument()
      .subscribe((state) => {
        if (state) {
          this.renderer.addClass(this.elementRef.nativeElement, this.activeClass);
        } else {
          this.renderer.removeClass(this.elementRef.nativeElement, this.activeClass);
        }
      });
  }

  ngOnDestroy(): void {
    this.mouseOnDocumentSubscription?.unsubscribe();
  }
}
