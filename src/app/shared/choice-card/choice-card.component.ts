import { Component, Input, OnInit } from '@angular/core';
import { IPerson } from './interfaces/person.interface';

@Component({
  selector: 'app-choice-card',
  templateUrl: './choice-card.component.html',
  styleUrls: ['./choice-card.component.sass']
})
export class ChoiceCardComponent implements OnInit {
  @Input() people!: IPerson[];

  counter: number = 0;

  currentPerson!: IPerson;

  gotMatch: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.currentPerson = this.people[this.counter]
  }

  like(): void {
    this.gotMatch = true;
  }

  continue(): void {
    this.counter++;
    
    if(this.gotMatch) this.gotMatch = false;
    if(!this.people[this.counter]) this.counter = 0;

    this.currentPerson = this.people[this.counter]
  }

}
