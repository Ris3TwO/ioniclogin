import { Component } from '@angular/core';
import { NavController } from "@ionic/angular";

import { UserDetailService } from "../../services/user-detail.service";
import { ApiService } from "../../services/api.service";
import { Booking } from "../../type/booking";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  adminEmail: string = localStorage.getItem('email');
  userEmail:  string = 'contacto@tuten.cl';
  token: string = localStorage.getItem('token');
  items = [];
  booking: Booking ;
  bookings = [];
  searchText: string =''
  constructor(
    private api: ApiService,
    public navCtrl: NavController,
    public userDetailService: UserDetailService
   
    ) {
    this.start()
    }

  getUsersData()
  {
    this.api.getUsersData(this.userEmail, this.token)
      .subscribe(data => {
        this.processData(data);
      });
  }

  showInfo(user)
  {
    this.userDetailService.setData(user);
    this.navCtrl.navigateForward('/user-details');
  }

  processData(rawData: any)
  {
    for(let data of rawData ){

      this.booking              = new Booking();
      this.booking.bookingId    = data["bookingId"];
      this.booking.bookingTime  = data["bookingTime"];
      this.booking.bookingPrice = data["bookingPrice"];

      let bookingFields = JSON.parse(data["bookingFields"]);
      
      this.booking.firstName     = data.tutenUserClient.firstName
      this.booking.lastName      = data.tutenUserClient.lastName
      this.booking.streetAddress = bookingFields["location"]["streetAddress"];
    
      this.bookings.push(this.booking);
    }    
  }
  
  start()
  {
    this.items = this.bookings
  }
 
  getItems(ev: any)
  {
    // Restablece los elementos de nuevo para mostrar todos los elementos
    this.start()

    // Establece una variable al valor de la barra de búsqueda
    const val = ev.target.value;

    // Si el valor es una cadena vacía, no filtrará los elementos
    if (val && val.trim() != '')
    {
      this.items = this.items.filter((item) =>
      {
        return (JSON.stringify(item.bookingId).toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  ngOnInit()
  {
    // Obtiene los datos
    this.getUsersData()
  }
}
