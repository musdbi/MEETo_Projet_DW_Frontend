import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './StarRating.component.html',
  styleUrls: ['./StarRating.component.css']
})
export class StarRatingComponent {
  @Input() rating: number | null = null;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter<number>();

  stars: number[] = [1, 2, 3, 4, 5];

  rate(rating: number): void {
    this.rating = rating;
    this.ratingChange.emit(rating);
  }
}
