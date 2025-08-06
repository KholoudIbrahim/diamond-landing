import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-diamonds-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './diamonds-features.component.html',
  styleUrls: ['./diamonds-features.component.scss']
})
export class DiamondsFeatureComponent {
  profiles = [
    {
      image: 'https://cdn.builder.io/api/v1/image/assets%2Fcf4c6cd5ed564c5ab3b71aceba604312%2F7a2f766a37f245f9b5ac446158a14571?format=webp&width=800',
      alt: 'Diamond member 1'
    },
    {
      image: 'https://cdn.builder.io/o/assets%2Fcf4c6cd5ed564c5ab3b71aceba604312%2Fd8501cf21d924bd480333f2a76140ce5?alt=media&token=970a021c-a60a-4eff-9c61-b6895d639dcf&apiKey=cf4c6cd5ed564c5ab3b71aceba604312',
      alt: 'Diamond member 2'
    },
    {
      image: 'https://images.unsplash.com/photo-1494790108755-2616c0763ada?w=150&h=150&fit=crop&crop=face',
      alt: 'Diamond member 3'
    },
    {
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      alt: 'Diamond member 4'
    }
  ];
}
