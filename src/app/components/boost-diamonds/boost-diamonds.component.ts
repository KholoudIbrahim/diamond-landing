import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
// import { ScrollAnimationService } from '../../services/scroll-animation.service';

@Component({
  selector: 'app-boost-diamonds',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boost-diamonds.component.html',
  styleUrls: ['./boost-diamonds.component.scss']
})
export class BoostDiamondsComponent  {
  @ViewChild('sectionDescription', { static: false }) sectionDescription!: ElementRef;
  @ViewChild('phonesContainer', { static: false }) phonesContainer!: ElementRef;
  @ViewChild('valuesSection', { static: false }) valuesSection!: ElementRef;

  private isBrowser: boolean;

  constructor(
    // private scrollAnimationService: ScrollAnimationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return;

    // setTimeout(() => {
    //   if (this.sectionDescription) {
    //     this.scrollAnimationService.registerElement({
    //       element: this.sectionDescription,
    //       animationClass: 'fade-in-up',
    //       delay: 200
    //     });
    //   }

      // if (this.phonesContainer) {
      //   this.scrollAnimationService.registerElement({
      //     element: this.phonesContainer,
      //     animationClass: 'fade-in-up',
      //     delay: 400
      //   });
      // }

    //   if (this.valuesSection) {
    //     this.scrollAnimationService.registerElement({
    //       element: this.valuesSection,
    //       animationClass: 'fade-in-up',
    //       delay: 300
    //     });
    //   }
    // }, 100);
  }

  // ngOnDestroy() {
  //   if (this.sectionDescription) {
  //     this.scrollAnimationService.unregisterElement(this.sectionDescription);
  //   }
  //   if (this.phonesContainer) {
  //     this.scrollAnimationService.unregisterElement(this.phonesContainer);
  //   }
  //   if (this.valuesSection) {
  //     this.scrollAnimationService.unregisterElement(this.valuesSection);
  //   }
  // }
}
