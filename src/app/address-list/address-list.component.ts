import { Component, OnInit, Inject, ElementRef, Renderer2, Input } from '@angular/core';
import { NavigationExtras, NavigationStart, Router } from '@angular/router';
import { ProductService, Product } from '../sheshine/services/product.service';
import { AddressService } from '../services/address.service';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Address } from '../services/address.model';
import { UserService } from '../services/user-profile.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent implements OnInit {
  addresses: Address[] = [];
  @Input() product: Product[] = [];
  selectedAddress: Address | null = null;
  private isBrowser: boolean;
  productIds: number[] = [];
  productQuantities: number[] = [];
  userId: number | null = null;

  constructor(
    private addressService: AddressService,
    private router: Router,
    private productService: ProductService,
    private el: ElementRef,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    // Load User ID and addresses
    this.userService.getUserId().subscribe(userId => {
      if (userId !== null && userId !== undefined) {

        this.userId = userId;
        this.loadAddresses();
        this.loadSelectedAddress();
      } else {

      }
    });

    this.route.paramMap.subscribe(() => {
      this.loadProductsFromNavigationState();
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Save the current URL before navigating to the new route
        sessionStorage.setItem('previousPage', this.router.url);
      }
    });
  }

  private loadAddresses(): void {
    if (this.userId !== null) {
      this.addressService.getAddressesByUserId(this.userId).subscribe(
        (addresses: Address[]) => {
          this.addresses = addresses;
  
          // Check if no addresses are found, and redirect to add-address page
          if (this.addresses.length === 0) {
            this.router.navigate(['/add-address']);  // Redirect to add-address page
          }
        }
      );
    }
  }


  goBack() {
    const previousPage = sessionStorage.getItem('previousPage');
    if (previousPage) {
      this.router.navigate(['/cart']);
    } else {
      this.router.navigate(['/cart']); // Fallback if no previous page is found
    }
  }
  // Method to load products from localStorage
  private loadProductsFromNavigationState() {
    const productIds = JSON.parse(localStorage.getItem('orderProductIds') || '[]');
    const quantities = JSON.parse(localStorage.getItem('orderQuantities') || '[]');

    if (productIds.length > 0 && quantities.length > 0) {



    }
  }

  private loadSelectedAddress(): void {
    if (this.userId !== null) {

      this.addressService.getSelectedAddress(this.userId).subscribe(
        address => {
          this.selectedAddress = address;

        }
      );
    } else {

    }
  }

  selectAddress(address: Address): void {
    this.addressService.selectAddress(address);
    this.selectedAddress = address;
  }

  deliver(): void {
    if (this.selectedAddress) {
      // Fetch data from localStorage
      const productIds = JSON.parse(localStorage.getItem('orderProductIds') || '[]');
      const productQuantities = JSON.parse(localStorage.getItem('orderQuantities') || '[]');

      if (productIds.length > 0 && productQuantities.length > 0) {


        // Navigate to the payment page
        this.router.navigate(['/payment']);
      } else {

      }
    } else {

    }
  }

  navigateToAddAddress(): void {
    localStorage.removeItem('selectedAddressId');

    // Retrieve product IDs and quantities from localStorage
    const productIds = JSON.parse(localStorage.getItem('orderProductIds') || '[]');
    const productQuantities = JSON.parse(localStorage.getItem('orderQuantities') || '[]');

    // Check if both productIds and productQuantities have data
    if (productIds.length > 0 && productQuantities.length > 0) {
      // Navigate to the add-address page with state
      this.router.navigate(['/add-address'])
      
    }
  }

  updateAddress(address: Address | null = null): void {
    // Retrieve product IDs and quantities from localStorage
    const productIds = JSON.parse(localStorage.getItem('orderProductIds') || '[]');
    const productQuantities = JSON.parse(localStorage.getItem('orderQuantities') || '[]');
  
    // Check if there is any product data
    if (productIds.length > 0 && productQuantities.length > 0) {
      // Store the address ID in localStorage
      if (address && address.id) {
        localStorage.setItem('selectedAddressId', address.id.toString());
      }
  
      // Navigate to the add-address page without query parameters
      this.router.navigate(['/add-address']);
    }
  }
  

  

  deleteAddress(id?: number): void {
    if (id !== undefined) {
      if (confirm('Are you sure you want to delete this address?')) {
        this.addressService.deleteAddress(id).subscribe(
          (response) => {
           
            if (response.status === 200) {
              alert('Address deleted successfully');
              this.loadAddresses();  // Refresh the address list
            } else {
              alert('Failed to delete address');
            }
          },
          (error) => {
           
            if (error.status === 200) {
              // Handle the case where a 200 status is returned but treated as an error
              alert('Address deleted successfully');
              this.loadAddresses();
            } else {
              alert('Error deleting address. Please try again.');
            }
          }
        );
      }
    } else {
      alert('Invalid address ID');
    }
  }

}
