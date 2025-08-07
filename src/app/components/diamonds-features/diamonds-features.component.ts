import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
// import { ScrollAnimationService } from '../../services/scroll-animation.service';

@Component({
  selector: 'app-diamonds-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './diamonds-features.component.html',
  styleUrls: ['./diamonds-features.component.scss'],
})
export class DiamondsFeatureComponent implements AfterViewInit, OnDestroy {
  @ViewChild('featuresSection', { static: false }) featuresSection!: ElementRef;
  @ViewChild('servicesGrid', { static: false }) servicesGrid!: ElementRef;

  private isBrowser: boolean;

  profiles = [
    {
      image: 'assets/images/features/Ellipse 1.png',
      alt: 'Diamond member 1',
    },
    {
      image: 'assets/images/features/Ellipse 2.png',
      alt: 'Diamond member 2',
    },
    {
      image: 'assets/images/features/Ellipse 3.png',
      alt: 'Diamond member 3',
    },
    {
      image: 'assets/images/features/Ellipse 4.png',
      alt: 'Diamond member 4',
    },
  ];

  constructor(
    // private scrollAnimationService: ScrollAnimationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return;

    // setTimeout(() => {
    //   if (this.featuresSection) {
    //     this.scrollAnimationService.registerElement({
    //       element: this.featuresSection,
    //       animationClass: 'fade-in-up',
    //       delay: 200
    //     });
    //   }

    //   if (this.servicesGrid) {
    //     this.scrollAnimationService.registerElement({
    //       element: this.servicesGrid,
    //       animationClass: 'fade-in-up',
    //       delay: 300
    //     });
    //   }
    // }, 100);
  }

  ngOnDestroy() {
    // if (this.featuresSection) {
    //   this.scrollAnimationService.unregisterElement(this.featuresSection);
    // }
    // if (this.servicesGrid) {
    //   this.scrollAnimationService.unregisterElement(this.servicesGrid);
    // }
  }
}
