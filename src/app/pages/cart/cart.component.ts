import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  constructor(private cartService: CartService) {}

  cart: Cart = {
    items: [],
  };
  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ];
  dataSource: Array<CartItem> = [];

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }
  onClearCart(): void {
    this.cartService.clearCart();
  }
  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }
  getCartInfo() {
    const data = this.cartService.getTempCartData().subscribe((res) => {
      let mydata = JSON.parse(JSON.stringify(res));
      mydata.map((item: CartItem) => {
        this.cartService.addToCart(item);
      });
    });
  }
  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart,
      this.dataSource = this.cart.items;
    })
  }
  onAddQuantity(item:CartItem): void { 
    this.cartService.addToCart(item);
  }
  onSubtractQuantity(item: CartItem): void { 
  this.cartService.subtractQuantity(item);
  }
}
