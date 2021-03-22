import { browser } from 'protractor';

export class AppPage {
  static HtmlTagComponent = 'app-root';

  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl + 'login') as Promise<unknown>;
  }
}
