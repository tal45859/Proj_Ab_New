import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ResponseValidation } from 'src/app/model/ResponseValidation';

@Component({
  selector: 'app-alert-error',
  templateUrl: './alert-error.component.html',
  styleUrls: ['./alert-error.component.css']
})
export class AlertErrorComponent implements OnInit,OnDestroy {
  @Output() ObjToChangeFather = new EventEmitter<boolean>();
  @Input() ObjAlert:ResponseValidation={};
  public Timer:any;
  constructor() { }

  ngOnInit(): void {
    this.Timer = setInterval(() => {
      this.ObjToChangeFather.emit(false);
  }, 2500);
  }
  ngOnDestroy() {
    clearInterval(this.Timer);
}
}
