import { Injectable } from '@angular/core';

import { FormBase, TextboxField, DropdownField } from './dynamic-form';

////////////////////////////////////////////////////////////////////////

@Injectable()
export class UserService {

  constructor() {}

  getFields(objectModel) {
    let fields:FormBase<any>[] = [

      new TextboxField({
        key:'username',
        label:'Name',
        required: true,
        value: objectModel.username,
        placeholder: 'Username',
        order: 1
      }),
      
      new TextboxField({
        key:'email',
        label:'Email',
        type: 'email',
        required: true,
        value: objectModel.email,
        placeholder: 'Email',
        order: 2
      }),

      new DropdownField({
        key:'gender',
        label: 'Gender',
        options: [
          {key:'male',  value:'male'},
          {key:'female',  value:'female'}
        ],
        value: objectModel.gender,
        order: 3
      }),

      new TextboxField({
        key:'birthdate',
        label:'Birthdate',
        type: 'date',
        required: true,
        value: objectModel.birthdate,
        placeholder: 'Birthdate',
        order: 4
      }),
    ];

 
    return fields.sort((a,b) => a.order - b.order);
  }
}


////////////////////////////////////////////////////////////////////////

