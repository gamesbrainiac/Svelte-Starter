describe('Home', () => {

  beforeEach(() => {
    webdriver.get('http://localhost:9876/en/home');
  });

  it('getCurrentUrl toEqual', () => {
    expect(webdriver.getCurrentUrl()).toEqual('http://localhost:9876/en/home');
  });

  it('getText toEqual', () => {
    let el = webdriver.findElement(by.css('#page p:nth-child(1)'));
    expect(el.getText()).toEqual('Home');
  });

});
