import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

interface NavItem {
  name: string;
  isActive: boolean;
  targetSelector?: string;
}

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('mainTitle', { static: false }) mainTitle!: ElementRef;
  @ViewChild('heroTitle', { static: false }) heroTitle!: ElementRef;
  @ViewChild('statsContainer', { static: false }) statsContainer!: ElementRef;
  @ViewChild('sideContent', { static: false }) sideContent!: ElementRef;

  currentSlide = 0;
  carouselInterval: any;
  activeNavItem = 0;
  showDownloadModal = false;
  private isBrowser: boolean;
  private navObserver?: IntersectionObserver;

  // Navigation items with target selectors
  navItems: NavItem[] = [
    { name: 'Home', isActive: true, targetSelector: 'app-homepage' },
    { name: 'Features', isActive: false, targetSelector: 'app-diamonds-features' },
    { name: 'Company', isActive: false, targetSelector: 'app-boost-diamonds' },
    { name: 'Contact Us', isActive: false, targetSelector: 'app-footer' },
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
    // Component initialization
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      setTimeout(() => {
        this.setupNavigationDetection();
      }, 1000);
    }
  }

  ngOnDestroy() {
    this.stopCarousel();
    if (this.navObserver) {
      this.navObserver.disconnect();
    }
  }

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

  setActiveNav(index: number, shouldScroll: boolean = true) {
    this.navItems.forEach((item, i) => {
      item.isActive = i === index;
    });
    this.activeNavItem = index;

    // Navigate to different sections based on nav item only if manually triggered
    if (shouldScroll) {
      this.navigateToSection(index);
    }
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
      case 2: // Boost diamonds / Company section
        targetElement = document.querySelector('app-boost-diamonds');
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

  openDownloadModal() {
    this.showDownloadModal = true;
    if (this.isBrowser) {
      document.body.style.overflow = 'hidden';
    }
  }

  closeModal() {
    this.showDownloadModal = false;
    if (this.isBrowser) {
      document.body.style.overflow = 'auto';
    }
  }


  private setupNavigationDetection() {
    if (!this.isBrowser) return;

    this.navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targetElement = entry.target as HTMLElement;
            const targetSelector = targetElement.tagName.toLowerCase();

            // Find corresponding nav item
            const navIndex = this.navItems.findIndex(item =>
              item.targetSelector?.includes(targetSelector)
            );

            if (navIndex !== -1 && !this.navItems[navIndex].isActive) {
              this.setActiveNav(navIndex, false);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '-80px 0px -60% 0px'
      }
    );

    // Observe all section elements
    setTimeout(() => {
      this.navItems.forEach((item) => {
        if (item.targetSelector) {
          const element = document.querySelector(item.targetSelector);
          if (element) {
            this.navObserver?.observe(element);
          }
        }
      });
    }, 500);
  }

}
