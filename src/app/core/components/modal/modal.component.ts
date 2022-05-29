import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input()
  public header!: string;

  @Input()
  public text!: string;

  @Input()
  public hasDecision = false;

  @Input()
  public acceptText!: string;

  @Input()
  public cancelText!: string;

  @Output()
  public cancelEvent = new EventEmitter<boolean>();

  @Output()
  public acceptEvent = new EventEmitter<boolean>();

  public cancel() {
    this.cancelEvent.emit();
  }

  public accept() {
    this.acceptEvent.emit();
    this.cancelEvent.emit();
  }
}
