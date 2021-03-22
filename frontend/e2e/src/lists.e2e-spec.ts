import { LoginSignupPage } from './login-signup.po';
import { ModalOptionsPage } from './modal-options.po';
import { browser, by, element, logging } from 'protractor';
import { ListsPage } from './lists.po';

describe(`<${ListsPage.HtmlTagComponent}>`, () => {
  let page: ListsPage;
  let modal: ModalOptionsPage;
  let login: LoginSignupPage;

  beforeEach(async () => {
    page = new ListsPage();
    modal = new ModalOptionsPage();
    login = new LoginSignupPage();
    await login.navigateTo();
    await login.setEmail('test10@test.com');
    await login.setPassword('12345678');
    await login.loginSignup();
  });

  describe('displays', () => {
    afterEach(async () => {
      await page.logout();
    });

    it('should display title list', async () => {
      expect(await page.getText('.container-lists .title')).toEqual('LISTS');
    });

    it('should display text button add', async () => {
      expect(await page.getText('.sidebar button.has-text-white')).toEqual('+ New List');
    });

    it('should display edit list text', async () => {
      await page.selectList('List test');
      browser.actions().mouseMove(element(by.css('.dropdown.is-hoverable'))).perform();
      expect(element(by.css('.dropdown-menu')).isDisplayed()).toBeTruthy();
      expect(page.getText('.dropdown-item:not(.has-text-danger)')).toEqual('Edit');
    });

    it('should display delete list text', async () => {
      await page.selectList('List test');
      browser.actions().mouseMove(element(by.css('.dropdown.is-hoverable'))).perform();
      expect(element(by.css('.dropdown-menu')).isDisplayed()).toBeTruthy();
      expect(page.getText('.option-list .dropdown-item.has-text-danger')).toEqual('Delete');
    });

    it('should display title task', () => {
      expect(page.getText('.container-task-option-list .title')).toEqual('TASKS');
    });

    it('should display text when not list selected', () => {
      expect(page.getText('.container-task-option-list + h3')).toEqual('Please select a list from the sidebar');
    });

    it('should display text when the selected list have not tasks', async () => {
      await page.selectList('List test');
      expect(page.getText('.task-menu h3')).toEqual('There are no tasks here! Click the add button to create a new task.');
    });
  
  });

  describe('actions', () => {
    afterEach(async () => {
      await page.logout();
    });

    it('should add new list', async () => {
      page.addList();
      modal.setInputName('List test');
      await modal.save();
      expect(page.findList('List test')).toEqual(true);
    });

    it('should edit data list', async () => {
      await page.selectList('List test');
      browser.actions().mouseMove(element(by.css('.dropdown.is-hoverable'))).perform();
      page.editList();
      modal.setInputName('List new test');
      await modal.save();
      expect(page.findList('List new test')).toBeTruthy();
    });

    it('should add new task', async () => {
      await page.selectList('List new test');
      page.addTask();
      modal.setInputName('Task test');
      await modal.save();
      expect(page.findTask('Task test')).toBeTruthy();
    });

    it('should edit data task', async () => {
      await page.selectList('List new test');
      browser.actions().mouseMove(element(by.css('.task-menu .task'))).perform();
      page.editTask();
      modal.setInputName('Task new test');
      await modal.save();
      expect(page.findList('Task test')).toBeFalsy();
    });

    it('should delete task', async () => {
      await page.selectList('List new test');
      browser.actions().mouseMove(element(by.css('.task-menu .task'))).perform();
      await page.deleteTask();
      expect(page.findTask('Task new test')).toBeFalsy();
    });

    it('should delete list', async () => {
      await page.selectList('List new test');
      browser.actions().mouseMove(element(by.css('.dropdown.is-hoverable'))).perform();
      await page.deleteList();
      expect(page.findList('List new test')).toBeFalsy();
    });

  });

  it('should do logout', async () => {
    await page.logout();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/login');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});