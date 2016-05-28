import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { DynamicFormsExampleAppComponent } from '../app/dynamic-forms-example.component';

beforeEachProviders(() => [DynamicFormsExampleAppComponent]);

describe('App: DynamicFormsExample', () => {
  it('should create the app',
      inject([DynamicFormsExampleAppComponent], (app: DynamicFormsExampleAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'dynamic-forms-example works!\'',
      inject([DynamicFormsExampleAppComponent], (app: DynamicFormsExampleAppComponent) => {
    expect(app.title).toEqual('dynamic-forms-example works!');
  }));
});
