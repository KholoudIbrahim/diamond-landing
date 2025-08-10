import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GlobalAnimationService {
  private observer?: IntersectionObserver;
  private isBrowser: boolean;
  private lastScrollY = 0;
  private scrollDirection = 'down';
  private animatedElements = new Set<HTMLElement>();
  private infiniteAnimationElements = new Set<HTMLElement>();
  private componentVisitedMap = new Map<string, boolean>();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  initializeAnimations() {
    if (!this.isBrowser) return;

    console.log('Global Animation Service: Initializing animations...');

    // Set up scroll direction tracking
    this.setupScrollTracking();

    // Wait for DOM to be ready, then setup animations
    setTimeout(() => {
      this.setupIntersectionObserver();
      this.animateAllComponents();
    }, 1000); // Reduced delay for faster initialization
  }

  private setupScrollTracking() {
    if (!this.isBrowser) return;

    this.lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      this.scrollDirection = currentScrollY > this.lastScrollY ? 'down' : 'up';
      this.lastScrollY = currentScrollY;
    });
  }

  private setupIntersectionObserver() {
    if (!this.isBrowser || this.observer) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting && !this.animatedElements.has(element)) {
            console.log('Element entered view:', element.tagName, element.className);

            // Track component visit for dynamic animations
            const componentTag = element.tagName.toLowerCase();
            this.componentVisitedMap.set(componentTag, true);

            // Apply infinite animations for specific elements
            this.applyInfiniteAnimations(element);

            this.animateElement(element);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
      }
    );
  }


  private animateAllComponents() {
    if (!this.isBrowser || !this.observer) return;

    console.log('Global Animation Service: Setting up component animations...');

    // Find only homepage animatable elements (others use AOS)
    const allAnimatableElements = document.querySelectorAll(
      'app-homepage .fade-in-up, app-homepage .fade-in-left, app-homepage .fade-in-right, app-homepage [data-animation]'
    );

    console.log(`Found ${allAnimatableElements.length} animatable elements`);

    allAnimatableElements.forEach((element, index) => {
      const htmlElement = element as HTMLElement;
      console.log(`Preparing element ${index}:`, htmlElement.tagName, htmlElement.className);

      this.prepareElementForAnimation(htmlElement);
      this.observer!.observe(htmlElement);
    });
  }

  private prepareComponentForAnimation(component: HTMLElement) {
    // Set initial state for entire component
    component.style.opacity = '0';
    component.style.transition = 'all 0.8s ease';

    // Check if this is the homepage component
    const isHomepage = component.tagName.toLowerCase() === 'app-homepage';

    if (isHomepage) {
      // Keep original homepage animations
      component.style.transform = this.scrollDirection === 'down' ? 'translateY(50px)' : 'translateY(-50px)';
    } else {
      // For other components, apply subtle vertical animation
      component.style.transform = 'translateY(30px)';
    }
  }

  private prepareElementForAnimation(element: HTMLElement) {
    // Only handle homepage elements (others use AOS)
    const isHomepage = element.closest('app-homepage') !== null;

    if (!isHomepage) return;

    // Set initial state for homepage elements only
    element.style.opacity = '0';
    element.style.transition = 'all 0.6s ease';

    // Apply homepage-specific animations
    if (element.classList.contains('fade-in-left')) {
      element.style.transform = 'translateX(-40px)';
      console.log('Homepage: fade-in-left applied');
    } else if (element.classList.contains('fade-in-right')) {
      element.style.transform = 'translateX(40px)';
      console.log('Homepage: fade-in-right applied');
    } else if (element.classList.contains('fade-in-up')) {
      element.style.transform = 'translateY(25px)';
      console.log('Homepage: fade-in-up applied');
    } else {
      element.style.transform = 'translateY(25px)';
      console.log('Homepage: default animation applied');
    }
  }

  private setEnhancedDirectionalAnimation(element: HTMLElement) {
    // Enhanced approach: check existing classes first, then apply position-based logic
    if (element.classList.contains('fade-in-left')) {
      element.style.transform = 'translateX(-70px)';
      element.classList.add('animate-left-to-right');
      console.log('Applied enhanced left-to-right animation to:', element.className);
    } else if (element.classList.contains('fade-in-right')) {
      element.style.transform = 'translateX(70px)';
      element.classList.add('animate-right-to-left');
      console.log('Applied enhanced right-to-left animation to:', element.className);
    } else {
      // Enhanced position-based detection with better responsiveness
      const rect = element.getBoundingClientRect();
      const viewportCenter = window.innerWidth / 2;
      const elementCenter = rect.left + rect.width / 2;

      // Consider scroll direction for dynamic animation
      const scrollBasedOffset = this.scrollDirection === 'down' ? 40 : -40;

      if (elementCenter < viewportCenter) {
        // Left side - animate from left to right with scroll consideration
        element.style.transform = `translateX(-70px) translateY(${scrollBasedOffset}px)`;
        element.classList.add('animate-left-to-right');
        console.log('Applied enhanced left-to-right (position-based) to:', element.className);
      } else {
        // Right side - animate from right to left with scroll consideration
        element.style.transform = `translateX(70px) translateY(${scrollBasedOffset}px)`;
        element.classList.add('animate-right-to-left');
        console.log('Applied enhanced right-to-left (position-based) to:', element.className);
      }
    }
  }


  private animateElement(element: HTMLElement) {
    const delay = parseFloat(element.dataset['delay'] || '0') * 1000;
    const isHomepage = element.closest('app-homepage') !== null;

    // Only animate homepage elements
    if (!isHomepage) return;

    console.log('Animating homepage element:', element.tagName, element.className);

    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translate(0, 0)';

      // Add a class to track animated state
      element.classList.add('animated');
      this.animatedElements.add(element);

      console.log('Homepage animation applied to:', element.tagName, element.className);
    }, delay);
  }


  private applyInfiniteAnimations(element: HTMLElement) {
    // Apply infinite animations for phones-container in boost-diamonds
    if (element.classList.contains('phones-container') && element.closest('app-boost-diamonds')) {
      setTimeout(() => {
        if (!this.infiniteAnimationElements.has(element)) {
          element.classList.add('slideInfiniteLeft');
          this.infiniteAnimationElements.add(element);
          console.log('Applied infinite left-to-right animation to phones-container');
        }
      }, 1000);
    }

    // Apply infinite animations to other specific elements
    if (element.classList.contains('data-analytics-container')) {
      setTimeout(() => {
        if (!this.infiniteAnimationElements.has(element)) {
          element.classList.add('slideInfiniteRight');
          this.infiniteAnimationElements.add(element);
          console.log('Applied infinite right-to-left animation to analytics container');
        }
      }, 1500);
    }
  }

  private applyPostAnimationEffects(element: HTMLElement) {
    // Add subtle continuous animations after main animation completes
    const componentTag = element.tagName.toLowerCase();

    if (componentTag === 'app-boost-diamonds') {
      const phonesContainer = element.querySelector('.phones-container') as HTMLElement;
      const analyticsContainer = element.querySelector('.data-analytics-container') as HTMLElement;

      if (phonesContainer && !this.infiniteAnimationElements.has(phonesContainer)) {
        phonesContainer.classList.add('slideInfiniteLeft');
        this.infiniteAnimationElements.add(phonesContainer);
        console.log('Post-animation: Applied infinite animation to phones-container');
      }

      if (analyticsContainer && !this.infiniteAnimationElements.has(analyticsContainer)) {
        analyticsContainer.classList.add('slideInfiniteRight');
        this.infiniteAnimationElements.add(analyticsContainer);
        console.log('Post-animation: Applied infinite animation to analytics-container');
      }
    }
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    this.animatedElements.clear();
    this.infiniteAnimationElements.clear();
    this.componentVisitedMap.clear();
  }
}
