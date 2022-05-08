import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CommandService } from '../../services/command/command.service';

import { CommandLineComponent } from './command-line.component';

describe('CommandLineComponent', () => {
  let component: CommandLineComponent;
  let fixture: ComponentFixture<CommandLineComponent>;
  let commandService: CommandService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommandLineComponent],
      imports: [FormsModule],
      providers: [
        {
          provide: CommandService,
          useValue: {
            processCommand: jest.fn()
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandLineComponent);
    component = fixture.componentInstance;
    commandService = TestBed.inject(CommandService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when submitting command', () => {
    beforeEach(() => {
      component.command = 'random command';
    });

    it('should call processCommand', () => {
      const command: string = component.command;
      component.onSubmitCommand();

      expect(commandService.processCommand).toHaveBeenCalledWith(command);
    });

    it('should reset the command string', () => {
      component.onSubmitCommand();

      expect(component.command).toEqual('');
    });
  });
});
