import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
// import { ScrollAnimationService } from '../../services/scroll-animation.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
  @ViewChild('mainTitle', { static: false }) mainTitle!: ElementRef;
  @ViewChild('heroTitle', { static: false }) heroTitle!: ElementRef;
  @ViewChild('statsContainer', { static: false }) statsContainer!: ElementRef;
  @ViewChild('sideContent', { static: false }) sideContent!: ElementRef;
  currentSlide = 0;
  carouselInterval: any;
  activeNavItem = 0;
  showDownloadModal = false;
  private isBrowser: boolean;

  // Navigation items
  navItems = [
    { name: 'Home', isActive: true },
    { name: 'Features', isActive: false },
    { name: 'Company', isActive: false },
    { name: 'Contact Us', isActive: false },
  ];

  // Carousel images defined in TypeScript
  carouselImages = [
    {
      url: 'assets/images/Group 559.png',
      alt: 'Diamond Crystal Formation',
    },
    {
      url: 'assets/images/Group 563.png',
      alt: 'Luxury Diamond Ring',
    },
    {
      url: 'assets/images/Group 539.png',
      alt: 'Diamond Mining',
    },
    {
      url: 'assets/images/Group 559.png',
      alt: 'Diamond Crystal Formation',
    },
    {
      url: 'assets/images/Group 563.png',
      alt: 'Luxury Diamond Ring',
    },
    {
      url: 'assets/images/Group 539.png',
      alt: 'Diamond Mining',
    },
  ];

  constructor(
    // private scrollAnimationService: ScrollAnimationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    // No auto-play to prevent SSR timeout
  }

  ngAfterViewInit() {
    // Register elements for scroll animations with delays
    // setTimeout(() => {
    //   if (this.mainTitle) {
    //     this.scrollAnimationService.registerElement({
    //       element: this.mainTitle,
    //       animationClass: 'fade-in-up',
    //       delay: 100
    //     });
    //   }

    //   if (this.heroTitle) {
    //     this.scrollAnimationService.registerElement({
    //       element: this.heroTitle,
    //       animationClass: 'fade-in-up',
    //       delay: 300
    //     });
    //   }

    //   if (this.sideContent) {
    //     this.scrollAnimationService.registerElement({
    //       element: this.sideContent,
    //       animationClass: 'fade-in-right',
    //       delay: 500
    //     });
    //   }

    //   if (this.statsContainer) {
    //     this.scrollAnimationService.registerElement({
    //       element: this.statsContainer,
    //       animationClass: 'fade-in-up',
    //       delay: 200
    //     });
    //   }
    // }, 100);
  }

  // ngOnDestroy() {
  //   this.stopCarousel();
  //   this.scrollAnimationService.destroy();
  // }

  startCarousel() {
    this.stopCarousel(); // Clear any existing interval
    this.carouselInterval = setInterval(() => {
      this.nextSlide();
    }, 1000);
  }

  stopCarousel() {
    if (this.carouselInterval) {
      clearTimeout(this.carouselInterval);
    }
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.carouselImages.length;
  }

  previousSlide() {
    this.currentSlide =
      this.currentSlide === 0
        ? this.carouselImages.length - 1
        : this.currentSlide - 1;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  setActiveNav(index: number) {
    this.navItems.forEach((item, i) => {
      item.isActive = i === index;
    });
    this.activeNavItem = index;

    // Navigate to different sections based on nav item
    this.navigateToSection(index);
  }

  navigateToSection(index: number) {
    if (!this.isBrowser) return;

    let targetElement: Element | null = null;

    switch(index) {
      case 0: // Homepage component (scroll to top)
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      case 1: // Diamond features
        targetElement = document.querySelector('app-diamonds-features');
        break;
      case 2: // Company values culture section
        targetElement = document.querySelector('app-boost-diamonds .company-values-section') ||
                       document.querySelector('app-boost-diamonds');
        break;
      case 3: // Footer
        targetElement = document.querySelector('app-footer');
        break;
    }

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  closeModal() {
    this.showDownloadModal = false;
  }
}
