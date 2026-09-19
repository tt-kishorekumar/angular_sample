import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartSubject =
    new BehaviorSubject<CartItem[]>(
      this.loadCart()
    );

  cart$ =
    this.cartSubject.asObservable();

  private cartCountSubject =
    new BehaviorSubject<number>(
      this.calculateCartCount(
        this.cartSubject.value
      )
    );

  cartCount$ =
    this.cartCountSubject.asObservable();


  constructor() {}


  /* =========================
     LOAD CART
     ========================= */

  private loadCart(): CartItem[] {

    try {

      return JSON.parse(
        localStorage.getItem('cart') || '[]'
      );

    } catch {

      return [];

    }
  }


  /* =========================
     SAVE CART
     ========================= */

  private saveCart(cart: CartItem[]): void {

    localStorage.setItem(
      'cart',
      JSON.stringify(cart)
    );

    this.cartSubject.next(cart);

    this.cartCountSubject.next(
      this.calculateCartCount(cart)
    );
  }


  /* =========================
     CART COUNT
     ========================= */

  private calculateCartCount(
    cart: CartItem[]
  ): number {

    return cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );
  }


  /* =========================
     GET CART
     ========================= */

  getCart(): CartItem[] {

    return this.cartSubject.value;
  }


  /* =========================
     ADD PRODUCT
     ========================= */

  addToCart(item: CartItem): void {

    const cart = [
      ...this.cartSubject.value
    ];

    const existingItem =
      cart.find(
        cartItem =>
          cartItem.id === item.id
      );

    if (existingItem) {

      existingItem.quantity += 1;

    } else {

      cart.push({
        ...item,
        quantity: 1
      });

    }

    this.saveCart(cart);
  }


  /* =========================
     INCREASE
     ========================= */

  increaseQuantity(
    productId: number
  ): void {

    const cart = [
      ...this.cartSubject.value
    ];

    const item =
      cart.find(
        cartItem =>
          cartItem.id === productId
      );

    if (!item) {
      return;
    }

    item.quantity += 1;

    this.saveCart(cart);
  }


  /* =========================
     DECREASE
     ========================= */

  decreaseQuantity(
    productId: number
  ): void {

    const cart = [
      ...this.cartSubject.value
    ];

    const item =
      cart.find(
        cartItem =>
          cartItem.id === productId
      );

    if (!item) {
      return;
    }

    item.quantity -= 1;

    const updatedCart =
      cart.filter(
        cartItem =>
          cartItem.quantity > 0
      );

    this.saveCart(updatedCart);
  }


  /* =========================
     REMOVE
     ========================= */

  removeFromCart(
    productId: number
  ): void {

    const updatedCart =
      this.cartSubject.value.filter(
        item =>
          item.id !== productId
      );

    this.saveCart(updatedCart);
  }


  /* =========================
     CLEAR
     ========================= */

  clearCart(): void {

    this.saveCart([]);
  }


  /* =========================
     PRODUCT QUANTITY
     ========================= */

  getQuantity(
    productId: number
  ): number {

    const item =
      this.cartSubject.value.find(
        cartItem =>
          cartItem.id === productId
      );

    return item
      ? item.quantity
      : 0;
  }
}