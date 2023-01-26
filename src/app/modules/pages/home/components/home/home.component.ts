import { Component } from '@angular/core';
import { ChatService } from 'src/app/shared/shared-module/services/chat.service';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { ParentMessageInterface } from '../../../../../shared/interfaces/parentMessage.interface';
import { AccessValidationService } from '../../../../../shared/shared-module/services/access-validation.service';
import { ConvergenceService } from '../../../../../shared/shared-module/services/convergence.service';
import { ActiveStreamService } from '../../../../../shared/shared-module/services/active-stream.service';
import { StreamType } from '../../../../../shared/enums/stream-type';

@Component({123123
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  valueInterval = 0;

  constructor(
    private chatService: ChatService,
  ) {
  }

  // Finished 123
}
