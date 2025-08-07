import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
// import { ScrollAnimationService } from '../../services/scroll-animation.service';

@Component({
  selector: 'app-smarter-solutions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './smarter-solutions.component.html',
  styleUrl: './smarter-solutions.component.scss'
})
export class SmarterSolutionsComponent {
  @ViewChild('titleSection', { static: false }) titleSection!: ElementRef;
  @ViewChild('contentSection', { static: false }) contentSection!: ElementRef;
  @ViewChild('imageSection', { static: false }) imageSection!: ElementRef;

  private isBrowser: boolean;

  constructor(
    // private scrollAnimationService: ScrollAnimationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  // ngAfterViewInit() {
  //   if (!this.isBrowser) return;

  //   setTimeout(() => {
  //     if (this.titleSection) {
  //       this.scrollAnimationService.registerElement({
  //         element: this.titleSection,
  //         animationClass: 'fade-in-up',
  //         delay: 200
  //       });
  //     }

  //     if (this.contentSection) {
  //       this.scrollAnimationService.registerElement({
  //         element: this.contentSection,
  //         animationClass: 'fade-in-left',
  //         delay: 400
  //       });
  //     }

  //     if (this.imageSection) {
  //       this.scrollAnimationService.registerElement({
  //         element: this.imageSection,
  //         animationClass: 'fade-in-right',
  //         delay: 300
  //       });
  //     }
  //   }, 100);
  // }

  // ngOnDestroy() {
  //   if (this.titleSection) {
  //     this.scrollAnimationService.unregisterElement(this.titleSection);
  //   }
  //   if (this.contentSection) {
  //     this.scrollAnimationService.unregisterElement(this.contentSection);
  //   }
  //   if (this.imageSection) {
  //     this.scrollAnimationService.unregisterElement(this.imageSection);
  //   }
  // }
}
