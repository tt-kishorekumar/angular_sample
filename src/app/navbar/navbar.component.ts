import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  userName = '';

  cartCount = 0;

  mobileMenuOpen = false;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {

    this.checkLoginStatus();

    this.updateCartCount();

    window.addEventListener(
      'storage',
      () => {

        this.checkLoginStatus();

        this.updateCartCount();

      }
    );
  }


  checkLoginStatus(): void {

    const user =
      localStorage.getItem('currentUser');

    if (user) {

      const currentUser =
        JSON.parse(user);

      this.isLoggedIn = true;

      this.userName =
        currentUser.name || '';

    } else {

      this.isLoggedIn = false;

      this.userName = '';
    }
  }


  updateCartCount(): void {

    const cart =
      JSON.parse(
        localStorage.getItem('cart') || '[]'
      );

    this.cartCount =
      cart.reduce(
        (total: number, item: any) =>
          total + item.quantity,
        0
      );
  }


  logout(): void {

    localStorage.removeItem(
      'currentUser'
    );

    this.isLoggedIn = false;

    this.userName = '';

    this.mobileMenuOpen = false;

    this.router.navigate(['/']);
  }


  toggleMobileMenu(): void {

    this.mobileMenuOpen =
      !this.mobileMenuOpen;
  }


  closeMobileMenu(): void {

    this.mobileMenuOpen = false;
  }
}