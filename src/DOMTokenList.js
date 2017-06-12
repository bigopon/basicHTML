const afterChanges = dtl => {
  const attr = dtl._ownerElement.getAttributeNode('class');
  if (attr) {
    if (attr.value !== dtl.value) {
      attr.value = dtl.value;
    }
  } else {
    el.setAttribute('class', dtl.value);
  }
};

module.exports = class DOMTokenList extends Array {

  constructor(ownerElement) {
    super();
    this._ownerElement = ownerElement;
  }

  item(i) {
    return this[i];
  }

  contains(token) {
    return this.includes(token);
  }

  add(...tokens) {
    this.splice(0, this.length, ...new Set(this.concat(tokens)));
    afterChanges(this);
  }

  remove(...tokens) {
    this.push(...this.splice(0, this.length)
                    .filter(token => !tokens.includes(token)));
    afterChanges(this);
  }

  replace(token, newToken) {
    const i = this.indexOf(token);
    if (i < 0) this.add(newToken);
    else this[i] = newToken;
    afterChanges(this);
  }

  toggle(token, force) {
    let result = false;
    if (this.contains(token)) {
      if (force) result = true;
      else this.remove(token);
    } else {
      if (arguments.length < 2 || force) {
        result = true;
        this.add(token);
      }
    }
    return result;
  }

  get value() {
    return this.join(' ');
  }

  set value(className) {
    this.splice(0, this.length);
    this.add(...className.trim().split(/\s+/));
    afterChanges(this);
  }

};
