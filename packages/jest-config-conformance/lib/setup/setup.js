'use strict';

global.__DEV__ = true;

jest.setTimeout(20000);

global.requestAnimationFrame = function requestAnimationFrame(callback) {
  // TODO: replace with async version
  // setTimeout(callback);
  callback();
};

const enzyme = jest.requireActual('enzyme');
const Adapter = jest.requireActual('enzyme-adapter-react-16');

enzyme.configure({ adapter: new Adapter() });

if (global.HTMLElement) {
  // This is a quirk that we need to bring in due to how our `tabbable` dependency
  // determines what nodes are focusable. Without this override, it's unable to
  // determine whether or not things are visible in JSDOM. With it, we get
  // expected tab order from the document.
  Object.defineProperty(HTMLElement.prototype, 'offsetParent', {
    get() {
      return this.parentNode;
    },
  });
}
