import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'request-actions-parent',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgFor ],
  templateUrl: './request-actions-parent.component.html',
  styleUrls: ['./request-actions-parent.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestActionsParentComponent implements OnInit {
  @Input({required: true}) content!: {
    isEditMode?: boolean,
    actionName: string,
    title: string,
    formJson: {controls: JsonControls[]},
    apiUrl: string,
  };

  public actionFrom: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder
  ) {}
  

  ngOnInit(): void {
    console.log(this.content.formJson.controls);

    for (const control of this.content.formJson.controls) {

      const validatorsToAdd = [];
      for (const [key, value] of Object.entries(control.validators!)) {

        switch (key) {
          case 'min':
            validatorsToAdd.push(Validators.min(value));
            break;
          case 'max':
            validatorsToAdd.push(Validators.max(value));
            break;
          case 'minLength':
            validatorsToAdd.push(Validators.minLength(value));
            break;
          case 'maxLength':
            validatorsToAdd.push(Validators.maxLength(value));
            break;
          case 'required':
            if (value) {
              validatorsToAdd.push(Validators.required);
            }
            break;
          case 'pattern':
            validatorsToAdd.push(Validators.pattern(value));
            break;
          default:
            break;
        }
      }

      this.actionFrom.addControl(control.name!, new FormControl(undefined, validatorsToAdd))
    }
  }


  submit() {
    // console.log(this.actionFrom.valid);
    // console.log(this.actionFrom.controls);
    this.actionFrom.markAllAsTouched();

    if (this.actionFrom.valid) {
      console.log(this.actionFrom.value);
      return
    }

    return
  }

  //#region Validations
  isControlValid(formName: FormGroup, controlName: string): boolean {
    const control = formName.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }
  isControlInvalid(formName: FormGroup, controlName: string): boolean {
    const control = formName.controls[controlName];
    return control.errors?.['required'] && (control.dirty || control.touched);
  }
  //#endregion Validations
  
}

interface JsonControls {
  id?:         number;
  name?:       string;
  label?:      string;
  value?:      string;
  type?:      string;
  validators?: JsonValidators;
}

interface JsonValidators {
  required?:  boolean;
  minLength?: number;
}
