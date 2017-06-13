const utils = require('./utils');
const Node = require('./Node');

// interface Attr // https://dom.spec.whatwg.org/#attr
module.exports = class Attr extends Node {

  constructor(ownerElement, name, value = null) {
    super(ownerElement.ownerDocument);
    this.ownerElement = ownerElement;
    this.name = name;
    this.nodeType = 2;
    this.nodeName = name;
    this._value = value;
  }

  get value() {
    return this._value;
  }

  set value(_value) {
    const oldValue = this._value;
    switch (this.name) {
      case 'class':
        const cl = this.ownerElement.classList;
        if (_value == null) {
          this._value = _value;
          cl.splice(0, cl.length);
        } else {
          this._value = String(_value);
          if (oldValue !== this._value) {
            cl.value = this._value;
          }
        }
        break;
      default:
        this._value = _value;
        break;
    }
    if (this.ownerElement && oldValue !== this._value) {
      utils.notifyAttributeChanged(
        this.ownerElement,
        this.name, oldValue, this._value
      );
    }
  }

};
