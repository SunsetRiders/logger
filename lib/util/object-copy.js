class ObjectCopy {

  constructor(object, blacklist = ['password', 'pass']) {
    this._vertexCopies = [];
    this.object = object;
    this.blacklist = blacklist;
  }

  copy() {
    let copiedObject = this._copy(this.object);
    this._clean(this.object);
    this._clean(copiedObject);
    return copiedObject;
  }


  _copy(object) {
    // if is not a object, or its null or undefined returns the given value, as we need to change nothing
    if (!object || typeof(object) !== 'object') {
      return object;
    }

    // if this object was already visited, returns the copy of it
    if (object._objectCopyIndex) {
      return this._vertexCopies[object._objectCopyIndex];
    }

    // if none of the above case, we must create a copy of that object and mask it's values when necessary. We must also mark at the object which is his copy index
    let objectCopy = {};
    const length = this._vertexCopies.length;
    this._vertexCopies[length] = objectCopy;
    object._objectCopyIndex = length;

    const keys = Object.keys(object);
    for (let index in keys) {
      if (keys[index]) {
        const key = keys[index];
        if (this.blacklist.includes(key)) {
          objectCopy[key] = '**MASKED**';
          continue;
        }

        objectCopy[key] = this._copy(object[key])
      }
    }

    return objectCopy;
  }

  _clean(object) {
    if (!object || !object._objectCopyIndex) {
      return
    }

    delete object._objectCopyIndex

    const keys = Object.keys(object);
    for (let index in keys) {
      if (keys[index]) {
        const key = keys[index];
        const subObject = object[key];
        this._clean(subObject);
      }
    }
  }
}

module.exports = ObjectCopy;