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
  activeCardIndex = 1; // Second card active by default (0-indexed)

  cards = [
    {
      id: 0,
      title: 'Custom Software Development',
      description: 'Offer end-to-end custom software development services, tailored to the specific requirements of our clients.',
      icon: 'custom-dev'
    },
    {
      id: 1,
      title: 'Software Consulting',
      description: 'We offer this service to guide businesses in making informed decisions about their software development projects.',
      icon: 'consulting'
    },
    {
      id: 2,
      title: 'Multi-Platform Compatibility',
      description: 'Cross-platform support to access AI on desktop, mobile, or IoT devices.',
      icon: 'compatibility'
    }
  ];

  constructor(
    // private scrollAnimationService: ScrollAnimationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  setActiveCard(index: number) {
    this.activeCardIndex = index;
  }

  isCardActive(index: number): boolean {
    return this.activeCardIndex === index;
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
