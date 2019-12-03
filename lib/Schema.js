const Property = require('./Validator.js');

module.exports = class Schema {
    constructor(schema) {
        this.schema = schema; 
        this.properties = Object.entries(schema)
            .map(([field, options]) => new Property(field, options)); 
    }

    validate(obj) {
        const validated = {}; 
        const errors = [];
        this.properties.forEach(validator => {
            try {
                validated[validator.field] = validator.validate(obj); 
            } catch (e) {
                errors.push(e); 
            }
        });

        if (errors.length > 0) {
            throw new Error(`this schema is not even close to valid. Sort your life out >> ${errors}`);
        }

        return validated; 
    }
};