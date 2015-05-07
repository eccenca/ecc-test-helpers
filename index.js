/* global before, beforeEach, afterEach */
import localStorage from 'localStorage';
import {jsdom} from 'jsdom';
import should from 'should';
import Intl from 'intl';

// say we're not in webpack environment
// this is required to skip including styles
global.__WEBPACK__ = false;

// init jsdom
global.document = jsdom();
global.window = global.document.defaultView;
global.navigator = global.window.navigator;

// local storage polyfill
global.window.localStorage = localStorage;
global.localStorage = localStorage;

// polyfill Intl for node
global.Intl = Intl;

// polyfill screen for node
global.screen = {
    width: 1000,
    height: 1000,
};

// import react after dom
const React = require('react/addons');

before(function() {
    // expose react and testutils
    this.React = React;
    this.TestUtils = React.addons.TestUtils;
});

beforeEach(function() {
    // create container
    this.container = global.window.document.createElement('div');
    // append to body to allow non-react libs to be testable too
    global.document.body.appendChild(this.container);
});

afterEach(function(done) {
    // clean jsdom
    this.React.unmountComponentAtNode(this.container);
    // remove from body
    global.document.body.removeChild(this.container);
    // timeout
    setTimeout(done);
});

export default should;
