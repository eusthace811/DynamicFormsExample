import { DynamicFormsExamplePage } from './app.po';

describe('dynamic-forms-example App', function() {
  let page: DynamicFormsExamplePage;

  beforeEach(() => {
    page = new DynamicFormsExamplePage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('dynamic-forms-example works!');
  });
});
