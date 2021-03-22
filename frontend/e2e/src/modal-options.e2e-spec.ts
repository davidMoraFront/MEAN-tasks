import { ListsPage } from './lists.po';
import { LoginSignupPage } from './login-signup.po';
import { browser, logging, element, by } from 'protractor';
import { ModalOptionsPage } from './modal-options.po';

describe(`Modal`, () => {
  let page: ModalOptionsPage;
  let login: LoginSignupPage;
  let lists: ListsPage;

  beforeEach(async () => {
    page = new ModalOptionsPage();
    login = new LoginSignupPage();
    lists = new ListsPage();
    await login.navigateTo();
    await login.setEmail('test10@test.com');
    await login.setPassword('12345678');
    await login.loginSignup();
  });

  describe('displays', () => {

    it('should display title of new list', async () => {
      await lists.addList();
      browser.wait(page.getModal(), 1000);
      expect(page.getText('.modal .title')).toEqual('NEW LIST')
    });

    it('should display title of edit list', async () => {
      await lists.selectList('new list');
      browser.actions().mouseMove(element(by.css('.dropdown.is-hoverable'))).perform();
      await lists.editList();
      browser.wait(page.getModal(), 1000);
      expect(page.getText('.modal .title')).toEqual('EDIT LIST');
    });

    it('should display title of new task', async () => {
      await lists.selectList('new list');
      await lists.addTask();
      browser.wait(page.getModal(), 1000);
      expect(page.getText('.modal .title')).toEqual('NEW TASK');
    });

    it('should display title of edit task', async () => {
      await lists.selectList('new list');
      await lists.addTask();
      page.setInputName('Task test');
      await page.save();
      browser.actions().mouseMove(element(by.css('.task-menu .task'))).perform();
      await lists.editTask();
      browser.wait(page.getModal(), 1000);
      expect(page.getText('.modal .title')).toEqual('EDIT TASK');
    });

    it('should display input placeholder', async () => {
      await lists.addList();
      browser.wait(page.getModal(), 1000);
      expect(page.getInputPlaceholder()).toEqual('Enter name');
    });

    it('should display text button save', async () => {
      await lists.addList();
      browser.wait(page.getModal(), 1000);
      expect(page.getText('.modal button.has-text-white')).toEqual('Save');
    });

    it('should display text button cancel', async () => {
      await lists.addList();
      browser.wait(page.getModal(), 1000);
      expect(page.getText('.modal button:not(.has-text-white)')).toEqual('Cancel');
    });
  });

  describe('actions', () => {
    it('should save data and close modal', async () => {
      await lists.addList();
      await page.setInputName('List new test');
      await page.save();
      expect(page.getModal()).toBeFalsy();
    });
  
    it('should cancel data and close modal', async () => {
      await lists.addList();
      await page.setInputName('List other test');
      await page.cancel();
      expect(page.getModal()).toBeFalsy();
    });

    afterAll(async () => {
      await lists.selectList('List new test');
      await browser.actions().mouseMove(element(by.css('.dropdown.is-hoverable'))).perform();
      await lists.deleteList();
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