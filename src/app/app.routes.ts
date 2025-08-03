import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { BannerComponent } from './components/banner/banner.component';

export const routes: Routes = [
  { path: '', component: BannerComponent },
  { path: 'home', component: HomepageComponent },
  { path: '**', redirectTo: '' },
];
