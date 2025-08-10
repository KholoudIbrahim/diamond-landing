import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AosService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  async initializeAOS() {
    if (!this.isBrowser) return;

    try {
      const AOS = await import('aos');
      
      AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: false, // Allow animations to trigger multiple times
        mirror: true, // Animate elements when scrolling past them
        offset: 50, // Trigger animations 50px before element comes into view
        delay: 0,
        disable: false, // Don't disable on mobile
        anchorPlacement: 'top-bottom',
        startEvent: 'DOMContentLoaded',
        animatedClassName: 'aos-animate',
        initClassName: 'aos-init',
        useClassNames: false,
        disableMutationObserver: false,
        throttleDelay: 99,
        debounceDelay: 50
      });

      // Refresh AOS after initialization to catch any dynamically added elements
      setTimeout(() => {
        AOS.refresh();
      }, 100);

      console.log('AOS initialized successfully');
    } catch (error) {
      console.error('Error initializing AOS:', error);
    }
  }

  refresh() {
    if (!this.isBrowser) return;
    
    import('aos').then(AOS => {
      AOS.refresh();
    });
  }

  refreshHard() {
    if (!this.isBrowser) return;
    
    import('aos').then(AOS => {
      AOS.refreshHard();
    });
  }
}
