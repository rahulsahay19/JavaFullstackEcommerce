import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { Basket, BasketItem } from 'src/app/shared/models/basket';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  currentUser$?: Observable<User | null>;  
  constructor(
    public basketService: BasketService,
    public accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;  
  }

  getItemsCount(items: BasketItem[]) {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }
  logout() {
    this.accountService.logout();
  }
}
