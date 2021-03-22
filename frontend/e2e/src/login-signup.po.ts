import { browser, by, element } from 'protractor';

export class LoginSignupPage {
  static HtmlTagComponent = 'app-login-signup';
  
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl + 'login') as Promise<unknown>;
  }

  getText(str: string): Promise<string> {
    return element(by.css(str)).getText() as Promise<string>;
  }

  // getTitleText(): Promise<string> {
  //   return element(by.css('.title')).getText() as Promise<string>;
  // }

  getEmailPlaceholder(): Promise<string> {
    return element(by.css('[type="email"]')).getAttribute('placeholder') as Promise<string>;
  }

  getPasswordPlaceholder(): Promise<string> {
    return element(by.css('[type="password"]')).getAttribute('placeholder') as Promise<string>;
  }

  // getButtonText(): Promise<string> {
  //   return element(by.css('button')).getText() as Promise<string>;
  // }

  // getBeforeLinkText(): Promise<string> {
  //   return element(by.css('.has-text-grey span:first-child')).getText() as Promise<string>;
  // }

  getLink(): Promise<string> {
    return element(by.css('.has-text-grey a')).getAttribute('href') as Promise<string>;
  }

  // getLinkText(): Promise<string> {
  //   return element(by.css('.has-text-grey a')).getText() as Promise<string>;
  // }

  // getAfterLinkText(): Promise<string> {
  //   return element(by.css('.has-text-grey span:last-child')).getText() as Promise<string>;
  // }

  setEmail(email: string): Promise<void> {
    return element(by.css('[type="email"]')).sendKeys(email) as Promise<void>;
  }

  setPassword(password: string): Promise<void> {
    return element(by.css('[type="password"]')).sendKeys(password) as Promise<void>;
  }

  loginSignup() {
    return element(by.css('.container-box button.is-success')).click();
  }

  changeLoginSignup() {
    return element(by.css('.has-text-grey a')).click();
  }

  getListMenu() {
    return element(by.css('.list-menu')).isPresent();
  }

}
