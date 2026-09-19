import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';

import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent
  implements OnInit, OnDestroy {


  isLoggedIn = false;

  userName = '';

  cartCount = 0;

  mobileMenuOpen = false;

  private cartSubscription?: Subscription;


  constructor(
    private router: Router,
    private cartService: CartService
  ) {}


  ngOnInit(): void {

    this.checkLoginStatus();

    /*
      IMPORTANT:
      Cart count now updates LIVE.
    */

    this.cartSubscription =
      this.cartService.cartCount$
        .subscribe(count => {

          this.cartCount = count;

        });


    window.addEventListener(
      'storage',
      this.handleStorageEvent
    );

  }


  /* =========================
     LOGIN
     ========================= */

  checkLoginStatus(): void {

    const user =
      localStorage.getItem(
        'currentUser'
      );

    if (user) {

      try {

        const currentUser =
          JSON.parse(user);

        this.isLoggedIn = true;

        this.userName =
          currentUser.name || '';

      } catch {

        this.isLoggedIn = false;

        this.userName = '';

      }

    } else {

      this.isLoggedIn = false;

      this.userName = '';

    }
  }


  /* =========================
     STORAGE
     ========================= */

  handleStorageEvent = (): void => {

    this.checkLoginStatus();

  };


  /* =========================
     LOGOUT
     ========================= */

  logout(): void {

    localStorage.removeItem(
      'currentUser'
    );

    this.isLoggedIn = false;

    this.userName = '';

    this.mobileMenuOpen = false;

    this.router.navigate(['/']);

  }


  /* =========================
     MOBILE MENU
     ========================= */

  toggleMobileMenu(): void {

    this.mobileMenuOpen =
      !this.mobileMenuOpen;

  }


  closeMobileMenu(): void {

    this.mobileMenuOpen = false;

  }


  /* =========================
     CLEANUP
     ========================= */

  ngOnDestroy(): void {

    this.cartSubscription?.unsubscribe();

    window.removeEventListener(
      'storage',
      this.handleStorageEvent
    );

  }

}