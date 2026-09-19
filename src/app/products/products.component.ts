import {
  Component,
  OnInit
} from '@angular/core';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { CartService } from '../services/cart.service';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  badge?: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];

  searchTerm = '';
  selectedCategory = 'All';
  selectedSort = 'featured';
  maxPrice = 100000;

  categories: string[] = [
    'All',
    'Electronics',
    'Fashion',
    'Beauty',
    'Home & Living'
  ];

  wishlist: number[] = [];
  addedProductId: number | null = null;

  constructor(
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.loadProducts();
    this.loadWishlist();

    this.route.queryParams.subscribe(params => {

      const category = params['category'];

      if (
        category &&
        this.categories.includes(category)
      ) {
        this.selectedCategory = category;
      } else {
        this.selectedCategory = 'All';
      }

      this.applyFilters();
    });
  }


  /* ================================
     PRODUCTS
  ================================= */

  loadProducts(): void {

    this.products = [

      {
        id: 1,
        name: 'Wireless Headphones Pro',
        category: 'Electronics',
        price: 2499,
        oldPrice: 3999,
        rating: 4.8,
        reviews: 124,
        image:
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85',
        description:
          'Premium wireless headphones with immersive sound.',
        badge: 'Best Seller'
      },

      {
        id: 2,
        name: 'Smart Watch Series X',
        category: 'Electronics',
        price: 3499,
        oldPrice: 4999,
        rating: 4.7,
        reviews: 98,
        image:
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85',
        description:
          'Modern smartwatch with fitness and smart features.',
        badge: 'Popular'
      },

      {
        id: 3,
        name: 'Premium Smartphone',
        category: 'Electronics',
        price: 28999,
        oldPrice: 32999,
        rating: 4.9,
        reviews: 245,
        image:
          'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=85',
        description:
          'Powerful smartphone with a premium modern design.',
        badge: 'Top Rated'
      },

      {
        id: 4,
        name: 'Minimal Backpack',
        category: 'Fashion',
        price: 1299,
        oldPrice: 1999,
        rating: 4.6,
        reviews: 76,
        image:
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85',
        description:
          'Minimal everyday backpack with spacious storage.',
        badge: 'Trending'
      },

      {
        id: 5,
        name: 'Classic Cotton Shirt',
        category: 'Fashion',
        price: 899,
        oldPrice: 1499,
        rating: 4.5,
        reviews: 63,
        image:
          'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=85',
        description:
          'Comfortable cotton shirt for everyday style.'
      },

      {
        id: 6,
        name: 'Urban Sneakers',
        category: 'Fashion',
        price: 2199,
        oldPrice: 3299,
        rating: 4.8,
        reviews: 112,
        image:
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85',
        description:
          'Stylish sneakers designed for comfort and movement.',
        badge: 'Best Seller'
      },

      {
        id: 7,
        name: 'Glow Skincare Kit',
        category: 'Beauty',
        price: 1599,
        oldPrice: 2499,
        rating: 4.7,
        reviews: 87,
        image:
          'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=85',
        description:
          'Complete skincare essentials for a healthy glow.',
        badge: 'New'
      },

      {
        id: 8,
        name: 'Premium Perfume',
        category: 'Beauty',
        price: 1899,
        oldPrice: 2799,
        rating: 4.6,
        reviews: 54,
        image:
          'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=85',
        description:
          'Elegant fragrance with a long-lasting premium scent.'
      },

      {
        id: 9,
        name: 'Modern Table Lamp',
        category: 'Home & Living',
        price: 999,
        oldPrice: 1599,
        rating: 4.5,
        reviews: 42,
        image:
          'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85',
        description:
          'Modern lighting designed to enhance your space.'
      },

      {
        id: 10,
        name: 'Smart Coffee Maker',
        category: 'Home & Living',
        price: 4299,
        oldPrice: 5999,
        rating: 4.8,
        reviews: 91,
        image:
          'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85',
        description:
          'Enjoy fresh coffee with convenient smart controls.',
        badge: 'Popular'
      },

      {
        id: 11,
        name: 'Decorative Plant Set',
        category: 'Home & Living',
        price: 799,
        oldPrice: 1199,
        rating: 4.4,
        reviews: 38,
        image:
          'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=85',
        description:
          'Beautiful decorative plants for modern interiors.'
      },

      {
        id: 12,
        name: 'Bluetooth Speaker',
        category: 'Electronics',
        price: 1799,
        oldPrice: 2699,
        rating: 4.7,
        reviews: 135,
        image:
          'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=85',
        description:
          'Compact wireless speaker with powerful sound.',
        badge: 'Best Seller'
      }

    ];

    this.applyFilters();
  }


  /* ================================
     FILTERS
  ================================= */

  applyFilters(): void {

    let results = [...this.products];

    if (this.searchTerm.trim()) {

      const search =
        this.searchTerm
          .toLowerCase()
          .trim();

      results = results.filter(product =>
        product.name
          .toLowerCase()
          .includes(search) ||

        product.category
          .toLowerCase()
          .includes(search) ||

        product.description
          .toLowerCase()
          .includes(search)
      );
    }


    if (this.selectedCategory !== 'All') {

      results = results.filter(product =>
        product.category === this.selectedCategory
      );
    }


    results = results.filter(product =>
      product.price <= this.maxPrice
    );


    switch (this.selectedSort) {

      case 'price-low':
        results.sort(
          (a, b) => a.price - b.price
        );
        break;

      case 'price-high':
        results.sort(
          (a, b) => b.price - a.price
        );
        break;

      case 'rating':
        results.sort(
          (a, b) => b.rating - a.rating
        );
        break;

      case 'newest':
        results.sort(
          (a, b) => b.id - a.id
        );
        break;

      default:
        break;
    }

    this.filteredProducts = results;
  }


  onSearch(): void {
    this.applyFilters();
  }


  selectCategory(category: string): void {

    this.selectedCategory = category;

    if (category === 'All') {

      this.router.navigate([
        '/products'
      ]);

    } else {

      this.router.navigate(
        ['/products'],
        {
          queryParams: {
            category: category
          }
        }
      );
    }

    this.applyFilters();
  }


  onPriceChange(): void {
    this.applyFilters();
  }


  onSortChange(): void {
    this.applyFilters();
  }


  clearFilters(): void {

    this.searchTerm = '';
    this.selectedCategory = 'All';
    this.selectedSort = 'featured';
    this.maxPrice = 100000;

    this.router.navigate([
      '/products'
    ]);

    this.applyFilters();
  }


  /* ================================
     DISCOUNT
  ================================= */

  getDiscount(product: Product): number {

    if (
      !product.oldPrice ||
      product.oldPrice <= product.price
    ) {
      return 0;
    }

    return Math.round(
      (
        (product.oldPrice - product.price) /
        product.oldPrice
      ) * 100
    );
  }


  /* ================================
     CART
  ================================= */

  addToCart(product: Product): void {

    this.cartService.addToCart({

      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1

    });

    this.showAddedMessage(product.id);
  }


  getCartQuantity(productId: number): number {

    return this.cartService.getQuantity(
      productId
    );
  }


  increaseQuantity(product: Product): void {

    this.cartService.increaseQuantity(
      product.id
    );
  }


  decreaseQuantity(product: Product): void {

    this.cartService.decreaseQuantity(
      product.id
    );
  }


  /* ================================
     WISHLIST
  ================================= */

  loadWishlist(): void {

    try {

      this.wishlist = JSON.parse(
        localStorage.getItem('wishlist') || '[]'
      );

    } catch {

      this.wishlist = [];

    }
  }


  toggleWishlist(product: Product): void {

    const index =
      this.wishlist.indexOf(product.id);

    if (index === -1) {

      this.wishlist.push(product.id);

    } else {

      this.wishlist.splice(index, 1);

    }

    localStorage.setItem(
      'wishlist',
      JSON.stringify(this.wishlist)
    );
  }


  isWishlisted(productId: number): boolean {

    return this.wishlist.includes(
      productId
    );
  }


  /* ================================
     ADD MESSAGE
  ================================= */

  showAddedMessage(productId: number): void {

    this.addedProductId = productId;

    setTimeout(() => {

      if (
        this.addedProductId === productId
      ) {
        this.addedProductId = null;
      }

    }, 1500);
  }

}