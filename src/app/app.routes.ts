import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
// import { BannerComponent } from './components/banner/banner.component';
import { DiamondsFeatureComponent } from './components/diamonds-features/diamonds-features.component';
import { FooterComponent } from './components/footer/footer.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  // { path: 'banner', component: BannerComponent },
  { path: 'features', component: DiamondsFeatureComponent },
  { path: 'footer', component: FooterComponent },
  { path: '**', redirectTo: '' },
];
