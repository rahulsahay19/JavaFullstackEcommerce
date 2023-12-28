import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pagination-header',
  templateUrl: './pagination-header.component.html',
  styleUrls: ['./pagination-header.component.scss']
})
export class PaginationHeaderComponent {
  @Input() totalElements: number = 0;
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 10;
}
