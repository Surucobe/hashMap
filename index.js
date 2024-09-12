/*if (index < 0 || index >= this.buckets.length) {
  throw new Error("Trying to access index out of bound");
}*/

class HashMap {
  constructor(){
    this.buckets = new Array(16);
  }

  _hash(key){
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
     hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length;
   }
 
    return hashCode;
  }

  set(key, value){
    const index = this._hash(key);

    if(!this.buckets[index]){
      this.buckets[index] = [];
    }

    const bucket = this.buckets[index];
    for(let i = 0 ; i < bucket.length ; i++){
      if(bucket[i][0] === key){
        bucket[i][1] = value;
        return;
      }
    }

    this.buckets[index].push([key, value]);
  }

  get(key){
    const index = this._hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    if(this.buckets[index]){
      for(let i = 0; i < this.buckets[index].length ; i++){
        if(this.buckets[index][i][0] === key){
          return this.buckets[index][i][1]
        }
      }
    }

    return null;
  }

  has(key){
    const index = this._hash(key);
    if(!this.buckets[index]){
      throw new Error("Trying to access index out of bound");
    }

    for(let i = 0; i < this.buckets.length ; i++){
      if(this.buckets[index][i][0] === key){
        return true;
      }
    }

    return false;
  }

  remove(key){
    const index = this._hash(key);
    const bucket = this.buckets[index];

    if(!bucket){
      throw new Error("Trying to access index out of bound");
    }

    for(let i = 0; i < this.buckets[index].length ; i++){
      if(bucket[i][0] === key) {
        this.buckets[index].splice(i, 1);
        return true;
      }
    }

    return false;
  }

  length(){
    let keyCount = 0;

    for(let i = 0; i < this.buckets.length ; i++){
      if(this.buckets[i]){
        keyCount += this.buckets[i].length;
      }
    }

    return `Number of stored keys: ${keyCount}`;
  }

  clear(){
    this.buckets = new Array(16);
  }

  keys(){
    const keysArray = [];

    for(let i = 0; i < this.buckets.length; i++){
      if(this.buckets[i]){
        for(let k = 0; k < this.buckets[i].length; k++){
          keysArray.push(this.buckets[i][k][0]);
        }
      }
    }

    return keysArray
  }

  values(){
    const valuesArray = [];

    for(let i = 0; i < this.buckets.length; i++){
      if(this.buckets[i]){
        for(let k = 0; k < this.buckets[i].length; k++){
          valuesArray.push(this.buckets[i][k][1]);
        }
      }
    }

    return valuesArray
  }

  entries(){
    const entriesArray = [];

    for(let i = 0; i < this.buckets.length; i++){
      if(this.buckets[i]){
        for(let k = 0; k < this.buckets[i].length; k++){
          entriesArray.push(this.buckets[i][k]);
        }
      }
    }

    return entriesArray;
  }
}

export default HashMap;