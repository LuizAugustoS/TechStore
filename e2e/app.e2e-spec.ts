import { LuizWebStoreTemplatePage } from './app.po';

describe('LuizWebStore App', function() {
  let page: LuizWebStoreTemplatePage;

  beforeEach(() => {
    page = new LuizWebStoreTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
