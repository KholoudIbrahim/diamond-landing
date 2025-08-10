import { Component, OnInit, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-hero-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-banner.component.html',
  styleUrls: ['./hero-banner.component.scss'],
})
export class HeroBannerComponent implements OnInit {
  showDownloadModal = false;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    // Component initialization
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // Handle responsive behavior if needed
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

  onLogoError(event: Event) {
    // Handle logo loading error gracefully
    const target = event.target as HTMLImageElement;
    target.style.display = 'none';
    console.warn('Hero banner logo failed to load');
  }
}
