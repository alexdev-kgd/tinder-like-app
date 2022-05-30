import { Component, Input, OnInit } from '@angular/core';
import { IPerson } from './interfaces/person.interface';

@Component({
  selector: 'app-choice-card',
  templateUrl: './choice-card.component.html',
  styleUrls: ['./choice-card.component.sass']
})
export class ChoiceCardComponent implements OnInit {
  @Input() people: IPerson[] = [];

  counter: number = 0;

  currentPerson!: IPerson;

  gotMatch: boolean = false;

  isEmpty: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.currentPerson = this.people[this.counter]
    this.checkForEmptiness();
  }

  checkForEmptiness(): void {
    if(!this.people.length) this.isEmpty = true;
  }

  like(): void {
    this.gotMatch = true;
  }

  dislike(): void {
    this.remove();
    this.checkForEmptiness();
  }
  
  remove(): void {
    if (this.people.length === 1) this.isEmpty = true;
    if (this.people.length > 1) this.people.splice(this.counter, 1);
    if (!this.people[this.counter]) this.counter--;
    this.currentPerson = this.people[this.counter];
  }

  continue(): void {
    if (this.gotMatch) this.gotMatch = false;
    this.remove();
    this.checkForEmptiness();
  }

}
