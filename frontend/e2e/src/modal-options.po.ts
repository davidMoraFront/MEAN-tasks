import { by, element } from 'protractor';

export class ModalOptionsPage {
  static HtmlTagComponent = 'app-modal-options';

  getText(str: string): Promise<string> {
    return element(by.css(str)).getText() as Promise<string>;
  }

  getInputPlaceholder(): Promise<string> {
    return element(by.css('input')).getAttribute('placeholder') as Promise<string>;
  }

  setInputName(name: string): Promise<void> {
    return element(by.css('input')).sendKeys(name) as Promise<void>;
  }

  save() {
    return element(by.css('.modal.open .button.has-text-white')).click();
  }

  cancel() {
    return element(by.css('.modal button:not(.has-text-white)')).click();
  }

  getModal() {
    return element(by.css('.modal')).isDisplayed();
  }
}
