import { by, element } from 'protractor';

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
}
