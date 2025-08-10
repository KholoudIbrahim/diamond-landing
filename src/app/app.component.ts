import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { DiamondsFeatureComponent } from "./components/diamonds-features/diamonds-features.component";
import { ChallengesComponent } from './components/challenges/challenges.component';
import { BoostDiamondsComponent } from './components/boost-diamonds/boost-diamonds.component';
import { FooterComponent } from './components/footer/footer.component';
import { SmarterSolutionsComponent } from './components/smarter-solutions/smarter-solutions.component';
import { TestimonialsCarouselComponent } from './components/testimonials-carousel/testimonials-carousel.component';
import { AosService } from './shared/services/aos.service';
import { GlobalAnimationService } from './shared/services/global-animation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    LoadingComponent,
    HomepageComponent,
    DiamondsFeatureComponent,
    ChallengesComponent,
    BoostDiamondsComponent,
    FooterComponent,
    SmarterSolutionsComponent,
    TestimonialsCarouselComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'diamond-landing';
  showLoading = true;
  private isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private aosService: AosService,
    private globalAnimationService: GlobalAnimationService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    // On server-side rendering, skip loading screen
    if (!this.isBrowser) {
      this.showLoading = false;
    } else {
      // Ensure loading screen shows on browser
      this.showLoading = true;
      // Prevent scroll during loading
      document.body.style.overflow = 'hidden';
    }
  }

  onLoadingComplete() {
    this.showLoading = false;

    // Ensure smooth scroll behavior is enabled
    if (this.isBrowser) {
      // Restore scroll after loading
      document.body.style.overflow = 'auto';
      document.documentElement.style.scrollBehavior = 'smooth';

      // Prevent horizontal overflow only
      document.body.style.overflowX = 'hidden';

      // Initialize AOS animations for most components
      this.aosService.initializeAOS();

      // Initialize custom animations specifically for homepage
      this.globalAnimationService.initializeAnimations();
    }
  }

  ngOnDestroy() {
    // AOS cleanup is handled automatically
    this.globalAnimationService.destroy();
  }
}
