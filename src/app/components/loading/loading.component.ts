import { Component, OnInit, OnDestroy, Output, EventEmitter, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

interface Particle {
  x: number;
  y: number;
  delay: number;
  duration: number;
}

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {
  @Output() loadingComplete = new EventEmitter<void>();

  isLoaded = false;
  progress = 0;
  logoError = false;
  particles: Particle[] = [];
  private progressInterval?: number;
  private particleInterval?: number;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.initializeParticles();
      this.startProgressAnimation();
      this.startParticleGeneration();
    }
  }

  ngOnDestroy() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
    if (this.particleInterval) {
      clearInterval(this.particleInterval);
    }
  }

  private initializeParticles() {
    // Create initial particles
    for (let i = 0; i < 20; i++) {
      this.particles.push(this.createParticle());
    }
  }

  private createParticle(): Particle {
    if (!this.isBrowser) {
      return { x: 0, y: 0, delay: 0, duration: 4 };
    }
    
    return {
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + 10,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2
    };
  }

  private startParticleGeneration() {
    if (!this.isBrowser) return;
    
    this.particleInterval = window.setInterval(() => {
      if (this.particles.length < 30) {
        this.particles.push(this.createParticle());
      }
      
      // Remove old particles that have completed their animation
      this.particles = this.particles.slice(-25);
    }, 500);
  }

  private startProgressAnimation() {
    if (!this.isBrowser) return;
    
    let currentProgress = 0;
    const targetProgress = 100;
    const duration = 3000; // 3 seconds
    const stepTime = 50; // Update every 50ms
    const increment = (targetProgress / duration) * stepTime;

    this.progressInterval = window.setInterval(() => {
      currentProgress += increment;
      this.progress = Math.min(currentProgress, targetProgress);

      if (this.progress >= targetProgress) {
        this.completeLoading();
      }
    }, stepTime);
  }

  private completeLoading() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
    
    // Add a small delay before fading out
    setTimeout(() => {
      this.isLoaded = true;
      
      // Emit loading complete after fade animation
      setTimeout(() => {
        this.loadingComplete.emit();
      }, 800); // Match the CSS transition duration
    }, 500);
  }

  // Handle logo loading error
  onLogoError(event: Event) {
    this.logoError = true;
  }

  // Handle window resize for particles
  onWindowResize() {
    if (this.isBrowser) {
      // Update particle positions if needed
      this.particles = this.particles.map(particle => ({
        ...particle,
        x: Math.min(particle.x, window.innerWidth)
      }));
    }
  }
}
