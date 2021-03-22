import { Component, OnDestroy, OnInit } from '@angular/core';
import { GotApiService } from '../_services/got.api.service';
import { IHouse } from '../_models/IHouse';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent implements OnInit, OnDestroy {

  private cancelGetHouses$ = new Subject();
  private cancelGetCharacter$ = new Subject();

  houses: IHouse[];
  private page = 1;

  constructor(private gotApiService: GotApiService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  ngOnDestroy(): void {
    this.cancelGetHouses$.next();
    this.cancelGetHouses$.complete();
    this.cancelGetCharacter$.next();
    this.cancelGetCharacter$.complete();
  }

  fetchData(): void {
    this.cancelGetHouses$.next();
    this.gotApiService.getHouses(this.page)
      .pipe(takeUntil(this.cancelGetHouses$))
      .subscribe(data => {
        data.forEach(house => {
          if (house.swornMembers.length > 0) {
            const members = [];
            house.swornMembers.forEach(member => {
              this.cancelGetCharacter$.next();
              this.gotApiService.getCharacter(member).pipe(takeUntil(this.cancelGetCharacter$)).subscribe(swornMember => {
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

  checkSeats(house: IHouse): boolean {
    return house.seats !== null && house.seats[0] !== '';
  }
}
