export class DynamicFormsExamplePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('dynamic-forms-example-app h1')).getText();
  }
}
