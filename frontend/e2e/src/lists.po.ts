import { tap } from 'rxjs/operators';
import { browser, by, element, ElementArrayFinder } from 'protractor';

export class ListsPage {
  static HtmlTagComponent = 'app-lists';
  
  getText(str: string): Promise<string> {
    return element(by.css(str)).getText() as Promise<string>;
  }

  addList() {
    return element(by.css('.sidebar button.has-text-white')).click();
  }

  addTask() {
    return element(by.css('.add-task button')).click();
  }

  editList() {
    return element(by.css('.dropdown-item:not(.has-text-danger)')).click();
  }

  deleteList() {
    return element(by.css('.dropdown-item.has-text-danger')).click();
  }

  editTask() {
    return element(by.css('.options-task button:not(.is-danger)')).click();
  }

  deleteTask() {
    return element(by.css('.options-task button.is-danger')).click();
  }

  logout() {
    return element(by.css('.logout')).click();
  }

  async selectList(name: string) {
    return await element.all(by.css('.list-menu a')).filter(async (elem) => await elem.getText() === name).first().click();
  }

  async findList(name: string) {
    return await element.all(by.css('.list-menu a')).filter(async (elem) => await elem.getText() === name).isPresent();
  }

  async findTask(name: string) {
    return await element.all(by.css('.task-menu .task')).filter(async (elem) => await elem.getText() === name).isPresent();
  }

  // getListsTitleText(): Promise<string> {
  //   return element(by.css('.container-lists .title')).getText() as Promise<string>;
  // }

  // getAddListButtonText(): Promise<string> {
  //   return element(by.css('.sidebar button.has-text-white')).getText() as Promise<string>;
  // }

  // getTasksTitleText(): Promise<string> {
  //   return element(by.css('.container-task-option-list .title')).getText() as Promise<string>;
  // }

  // getListEditText(): Promise<string> {
  //   return element(by.css('.dropdown-item:not(.has-text-danger)')).getText() as Promise<string>;
  // }

  // getListDeleteText(): Promise<string> {
  //   return element(by.css('.option-list .dropdown-item.has-text-danger')).getText() as Promise<string>;
  // }

  // getNoListSelectedText(): Promise<string> {
  //   return element(by.css('.container-task-option-list + h3')).getText() as Promise<string>;
  // }

  // getNoTaskText(): Promise<string> {
  //   return element(by.css('.task-menu h3')).getText() as Promise<string>;
  // }

  

  

  // findTask(name: string) {
  //   return element.all(by.css('.task-menu .task')).each(async (element, index) =>
  //   (await element.getText()) === name
  //     ? true
  //     : ''
  //   );
  // }

  // getList(name: string) {
  //   return element.all(by.css('.list-menu a')).each(async (element, index) =>
  //   (await element.getText()) === name
  //     ? element
  //     : ''
  //   );
  // }

  // getTask(name: string) {
  //   return element.all(by.css('.task-menu .task')).each(async (element, index) =>
  //   (await element.getText()) === name
  //     ? element
  //     : ''
  //   );
  // }

  // getTask(name: string) {
  //   return element.all(by.css('.task-menu .task')).filter(async elem => await elem.getText() === name).first();
  // }

  // element.all(by.css('.items li')).then(function(items) {
  //   expect(items.length).toBe(3);
  //   expect(items[0].getText()).toBe('First');
  // });

  // getTask(name: string) {
  //   return element.all(by.css('.task-menu .task')).filter(async (elem) => await elem.getText() === name).get(0);
  // }

  // editTaskElem(el: any) {
  //   return el.click();
  // }

  

  // async getSelectList(name: string) {
  //   return await element.all(by.css('.list-menu a')).filter(async (elem) => await elem.getText() === name).first().getText();
  // }
}
