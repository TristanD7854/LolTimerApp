import { Component, OnInit } from '@angular/core';
import { ProcessedCommand } from '../../models/command.model';
import { CommandService } from '../../services/command/command.service';

@Component({
  selector: 'command-line',
  templateUrl: './command-line.component.html',
  styleUrls: ['./command-line.component.scss']
})
export class CommandLineComponent {
  public command = '';
  public commandMsgAfterBeingProcessed!: ProcessedCommand;

  constructor(private commandService: CommandService) {}

  public onSubmitCommand(): void {
    this.commandMsgAfterBeingProcessed = this.commandService.processCommand(this.command);

    this.command = '';
  }
}
