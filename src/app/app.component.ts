import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { DiamondsFeatureComponent } from "./components/diamonds-features/diamonds-features.component";
import { ChallengesComponent } from './components/challenges/challenges.component';
import { BoostDiamondsComponent } from './components/boost-diamonds/boost-diamonds.component';
import { FooterComponent } from './components/footer/footer.component';
import { SmarterSolutionsComponent } from './components/smarter-solutions/smarter-solutions.component';
import { TestimonialsCarouselComponent } from './components/testimonials-carousel/testimonials-carousel.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CommonModule } from '@angular/common';
import { LoadingService} from './shared/services/loading.service';
import {LoadingInterceptor} from './shared/interceptors/loading.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from './components/loading/loading.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HomepageComponent,
    DiamondsFeatureComponent,
    ChallengesComponent,
    BoostDiamondsComponent,
    FooterComponent,
    SmarterSolutionsComponent,
    TestimonialsCarouselComponent,
    SlickCarouselModule,
    LoadingComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'diamond-landing' ;
}


