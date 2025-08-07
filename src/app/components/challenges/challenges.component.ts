import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
// import { ScrollAnimationService } from '../../services/scroll-animation.service';

@Component({
  selector: 'app-challenges',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.scss'],
})
export class ChallengesComponent {
  @ViewChild('challengesSection', { static: false })
  challengesSection!: ElementRef;
  @ViewChild('titleSection', { static: false }) titleSection!: ElementRef;
  @ViewChild('contentSection', { static: false }) contentSection!: ElementRef;

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
  //     if (this.contentSection) {
  //       this.scrollAnimationService.registerElement({
  //         element: this.contentSection,
  //         animationClass: 'fade-in-up',
  //         delay: 100,
  //       });
  //     }

  //     if (this.challengesSection) {
  //       this.scrollAnimationService.registerElement({
  //         element: this.challengesSection,
  //         animationClass: 'fade-in-up',
  //         delay: 100,
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
  //   if (this.challengesSection) {
  //     this.scrollAnimationService.unregisterElement(this.challengesSection);
  //   }
  // }
}
