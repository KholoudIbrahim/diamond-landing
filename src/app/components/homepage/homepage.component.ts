import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiamondsFeatureComponent } from '../diamonds-features/diamonds-features.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, DiamondsFeatureComponent],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {

}
