import { browser, logging } from 'protractor';
import { LoginSignupPage } from './login-signup.po';

describe(`<${LoginSignupPage.HtmlTagComponent}>`, () => {
  let page: LoginSignupPage;

  beforeEach(async () => {
    page = new LoginSignupPage();
    await page.navigateTo();
  });

  it('should navigate to login url', () => {
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'login');
  });

  describe(`displays`, () => {
    it('should display title', () => {
      expect(page.getText('.title')).toEqual('LOGIN');
    });

    it('should display email placeholder', () => {
      expect(page.getEmailPlaceholder()).toEqual('Email');
    });

    it('should display password placeholder', () => {
      expect(page.getPasswordPlaceholder()).toEqual('Password');
    });

    it('should display text button', () => {
      expect(page.getText('button')).toEqual('Login');
    });

    it('should display text before link', () => {
      expect(page.getText('.has-text-grey span:first-child')).toEqual('Not got an account?');
    });

    it('should display link', () => {
      expect(page.getLink()).toEqual(browser.baseUrl + 'signup');
    });

    it('should display text link', () => {
      expect(page.getText('.has-text-grey a')).toEqual('Sign up');
    });

    it('should display text after link', () => {
      expect(page.getText('.has-text-grey span:last-child')).toEqual('now!');
    });

  });

  describe(`actions`, () => {
    it('should do login', async () => {
      page.setEmail('test10@test.com');
      page.setPassword('12345678');
      await page.loginSignup();
      browser.waitForAngularEnabled(true);
      expect(await browser.getCurrentUrl()).toEqual(browser.baseUrl + 'lists');
    });

    it('should go signup', async () => {
      await page.changeLoginSignup();
      browser.waitForAngularEnabled(true);
      expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'signup');
    });

    it('should do signup', async () => {
      const random = Math.floor(Math.random() * (200 - 20)) + 20;
      await page.changeLoginSignup();
      page.setEmail('test' + random + '@test.com');
      page.setPassword('12345678');
      await page.loginSignup();
      await page.changeLoginSignup();
      page.setEmail('test' + random + '@test.com');
      page.setPassword('12345678');
      await page.loginSignup();
      browser.waitForAngularEnabled(true);
      expect(page.getListMenu()).toBeTruthy();
    });

    it('should go login', async () => {
      await page.changeLoginSignup();
      await page.changeLoginSignup();
      browser.waitForAngularEnabled(true);
      expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'login');
    });

  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
