const { getCaster } = require('./types.js');
module.exports = class Validator { constructor(field, {
    type, required }) {
    this.field = field;
    this.type = type;
    this.required = required ;
    this.caster = getCaster(type);
}
validate(obj) {
    const val = obj[this.field];
    if (this.required && !val) throw new Error(`${this.field} needs to be here. What are you doing. Serously.`);
    if (!this.requrired && !val) return null; 

    return this.caster(val);
}
};
