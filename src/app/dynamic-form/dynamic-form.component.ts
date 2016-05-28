import { Component, Injectable, Input, Output, EventEmitter } from '@angular/core';
import { ControlGroup, FormBuilder, Validators } from '@angular/common';

////////////////////////////////////////////////////////////////////////

export class FormBase<T>{
  value:T;
  key:string;
  label:string;
  required:boolean;
  readonly:boolean;
  disabled:boolean; 
  order:number;
  controlType:string;
  placeholder:string;
  constructor(options:{
      value?:T,
      key?:string,
      label?:string,
      required?:boolean,
      readonly?:boolean,
      disabled?:boolean,
      order?:number,
      controlType?:string,
      placeholder?:string
    } = {}){
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.readonly = !!options.readonly;
    this.disabled = !!options.disabled;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.placeholder = options.placeholder || '';
  }
}

////////////////////////////////////////////////////////////////////////


export class TextboxField extends FormBase<string>{
  controlType = 'textbox';
  type:string;

  constructor(options:{} = {}){
    super(options);
    this.type = options['type'] || '';
  }
}

////////////////////////////////////////////////////////////////////////


export class DropdownField extends FormBase<string>{
  controlType = 'dropdown';
  options:{key:string, value:string}[] = [];

  constructor(options:{} = {}){
    super(options);
    this.options = options['options'] || [];
  }
}

////////////////////////////////////////////////////////////////////////


@Injectable()
export class FormControlService {

	constructor(private fb:FormBuilder){ }

	toControlGroup(fields:FormBase<any>[] ) {
		let group = {};

		fields.forEach(field => {
			group[field.key] = field.required ? [field.value || '', Validators.required] : [field.value || ''];
		});
		return this.fb.group(group);
	}
}

////////////////////////////////////////////////////////////////////////

@Component({
  selector:'df-field',
  template:`
<div [ngFormModel]="form" class="form-group">
  <label [attr.for]="field.key" class="control-label">{{field.label}}</label>
  <div [ngSwitch]="field.controlType">
    <input *ngSwitchWhen="'textbox'" [ngControl]="field.key" [id]="field.key" [type]="field.type" class="form-control" [placeholder]="field.placeholder" [disabled]="field.disabled" [readonly]="field.readonly">
    <select [id]="field.key" *ngSwitchWhen="'dropdown'" [ngControl]="field.key" class="form-control">
      <option style="display:none" value="">Choose an option</option>
      <option *ngFor="let opt of field.options" [value]="opt.key">{{opt.value}}</option>
    </select>
  </div>
  <div style="color: red;" *ngIf="!isValid">({{field.label}} is required)</div>
</div>`
})
export class DynamicFormFieldComponent {
  @Input() field:FormBase<any>;
  @Input() form:ControlGroup;
  get isValid() { return this.form.controls[this.field.key].valid; }
}

////////////////////////////////////////////////////////////////////////

@Component({
  selector:'dynamic-form',
  template:`
<div>
  <form (ngSubmit)="onSubmit()" [ngFormModel]="form">
    <div *ngFor="let field of fields" class="form-row">
      <df-field [field]="field" [form]="form"></df-field>
    </div>
    <div class="form-row">
      <button type="submit" [disabled]="!form.valid" class="btn btn-success btn-md">Save</button>
    </div>
  </form>
  
  <div *ngIf="payLoad" class="form-row">
    <br><strong>Saved the following values</strong><br>{{payLoad}}
  </div>
</div>`,
  directives: [DynamicFormFieldComponent],
  providers:  [FormControlService]
})
export class DynamicFormComponent {
  @Input() fields: FormBase<any>[] = [];
  @Output('send') submitted: EventEmitter<any> = new EventEmitter();
  form: ControlGroup;
  payLoad = '';

  constructor(private qcs: FormControlService) {  }
  
  ngOnInit(){
    this.form = this.qcs.toControlGroup(this.fields);
  }
   
  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
    this.submitted.emit(this.form.value);
  }
}


