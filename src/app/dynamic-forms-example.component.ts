	import { Component } from '@angular/core';

	import { DynamicFormComponent } from './dynamic-form';
	import { UserService }     from './user.service';

	@Component({
	  moduleId: module.id,
	  selector: 'dynamic-forms-example-app',
	  templateUrl: 'dynamic-forms-example.component.html',
	  styleUrls: ['dynamic-forms-example.component.css'],
	  directives: [DynamicFormComponent],
	  providers:  [UserService]
	})
	export class DynamicFormsExampleAppComponent {
		title = 'dynamic-forms-example works!';

		fields:any[];

		constructor(private service: UserService) {		
			this.fields = service.getFields({});
		}

		save(object) {

			// Here you can save the object
			alert(JSON.stringify(object));
		}

	}
