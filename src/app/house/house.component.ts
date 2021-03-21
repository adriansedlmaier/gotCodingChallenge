import { Component, OnInit } from '@angular/core';
import { GotApiService } from '../_services/got.api.service';
import { IHouse } from '../_models/IHouse';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent implements OnInit {

  houses: IHouse[];
  private page = 1;

  constructor(private gotApiService: GotApiService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.gotApiService.getHouses(this.page).subscribe(data => {
      data.forEach(house => {
        if (house.swornMembers.length > 0) {
          const members = [];
          house.swornMembers.forEach(member => {
            this.gotApiService.getCharacter(member).subscribe(swornMember => {
              if (swornMember.name) {
                members.push(swornMember.name);
              }
            });
          });
          house.members = members;
        }
      });
      this.houses = data;
    });
  }

  next(): void {
    this.page += 1;
    this.fetchData();
  }

  back(): void {
    if (this.page > 1) {
      this.page -= 1;
      this.fetchData();
    }
  }

  showDetails(house: IHouse): void {
    house.details = !house.details;
  }

  onScroll(): void {
    this.fetchData();
  }
}
