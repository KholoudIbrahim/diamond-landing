import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
// import { ScrollAnimationService } from '../../services/scroll-animation.service';

@Component({
  selector: 'app-testimonials-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials-carousel.component.html',
  styleUrls: ['./testimonials-carousel.component.scss'],
  // Temporarily disable animations for performance
  animations: []
})
export class TestimonialsCarouselComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('testimonialsContainer', { static: false }) testimonialsContainer!: ElementRef;

  currentSlide = 0;
  slideDirection = 'slideInLeft';
  autoplayInterval: any;
  isAutoplayPaused = false;
  private isBrowser: boolean;

  testimonials = [
    {
      name: 'Abdelaziz I.Wahman',
      title: 'Diamond Player',
      avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/b64b2d6f5aae19ad4eee4d9561abd49bd0893a4c?width=584',
      testimonial: 'Using this has transformed the way we work. Tasks that used to take hours are now completed in minutes. It\'s a game-changer for our team!'
    },
    {
      name: 'Anna K.',
      title: 'Diamond Player',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      testimonial: 'The user experience is absolutely incredible. Every feature is thoughtfully designed and the performance is outstanding. Highly recommended!'
    },
    {
      name: 'Marcus Johnson',
      title: 'Elite Diamond',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      testimonial: 'I\'ve tried many similar platforms, but this one stands out with its intuitive interface and powerful capabilities. It exceeds all expectations.'
    },
    {
      name: 'Sarah Williams',
      title: 'Premium Diamond',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      testimonial: 'The automation features have revolutionized our workflow. What used to be a tedious process is now seamless and efficient. Outstanding results!'
    },
    {
      name: 'David Chen',
      title: 'Master Diamond',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      testimonial: 'The level of customization and control is impressive. It adapts perfectly to our specific needs and has significantly improved our productivity.'
    }
  ];

  constructor(
    // private scrollAnimationService: ScrollAnimationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    // Temporarily disable autoplay for debugging
    // this.startAutoplay();
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return;

    // setTimeout(() => {
    //   if (this.testimonialsContainer) {
    //     this.scrollAnimationService.registerElement({
    //       element: this.testimonialsContainer,
    //       animationClass: 'fade-in-left',
    //       delay: 500
    //     });
    //   }
    // }, 200);
  }

  ngOnDestroy() {
    this.stopAutoplay();
    // if (this.testimonialsContainer) {
    //   this.scrollAnimationService.unregisterElement(this.testimonialsContainer);
    // }
  }

  getCurrentTestimonial() {
    return this.testimonials[this.currentSlide] || this.testimonials[0];
  }

  getProgressPercentage(): number {
    if (this.testimonials.length === 0) return 0;
    return Math.round(((this.currentSlide + 1) / this.testimonials.length) * 100);
  }

  startAutoplay() {
    this.stopAutoplay(); // Clear any existing interval
    this.autoplayInterval = setInterval(() => {
      if (!this.isAutoplayPaused) {
        this.nextSlide();
      }
    }, 5000); // Change slide every 5 seconds
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
  }

  pauseAutoplay() {
    this.isAutoplayPaused = true;
  }

  resumeAutoplay() {
    this.isAutoplayPaused = false;
  }

  nextSlide() {
    if (this.currentSlide < this.testimonials.length - 1) {
      this.currentSlide++;
      this.slideDirection = 'slideInRight';
    } else {
      this.currentSlide = 0;
      this.slideDirection = 'slideInRight';
    }
  }

  previousSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      this.slideDirection = 'slideInLeft';
    } else {
      this.currentSlide = this.testimonials.length - 1;
      this.slideDirection = 'slideInLeft';
    }
  }

  goToSlide(index: number) {
    if (index !== this.currentSlide) {
      this.slideDirection = index > this.currentSlide ? 'slideInRight' : 'slideInLeft';
      this.currentSlide = index;
    }
  }

  onMouseEnter() {
    this.pauseAutoplay();
  }

  onMouseLeave() {
    this.resumeAutoplay();
  }

  // Touch/swipe support for mobile
  private touchStartX = 0;
  private touchEndX = 0;

  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe();
  }

  private handleSwipe() {
    const swipeThreshold = 50; // minimum distance for a swipe
    const swipeDistance = this.touchStartX - this.touchEndX;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        // Swipe left - next slide
        this.nextSlide();
      } else {
        // Swipe right - previous slide
        this.previousSlide();
      }
    }
  }

  // Keyboard navigation support
  onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        this.previousSlide();
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.nextSlide();
        break;
      case ' ': // Space bar
        event.preventDefault();
        if (this.isAutoplayPaused) {
          this.resumeAutoplay();
        } else {
          this.pauseAutoplay();
        }
        break;
    }
  }
}
