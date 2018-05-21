class ObjectCopy {

  constructor(object, blacklist = ['password', 'pass']) {
    this._originalVertex = [];
    this._vertexCopies = [];
    this.object = object;
    this.blacklist = blacklist;
  }

  copy() {
    return this._copy(this.object);
  }


  _copy(object) {
    // if is not a object, or its null or undefined returns the given value, as we need to change nothing
    if (!object || typeof(object) !== 'object') {
      return object;
    }

    // if this object was already visited, returns the copy of it
    const index = this._originalVertex.indexOf(object);
    if (index >= 0) {
      return this._vertexCopies[index];
    }

    // if none of the above case, we must create a copy of that object and mask it's values when necessary. We must also mark at the object which is his copy index
    let objectCopy = {};
    const length = this._vertexCopies.length;
    this._vertexCopies[length] = objectCopy;
    this._originalVertex[length] = object;

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

}

module.exports = ObjectCopy;