const Schema = require('../lib/Schema.js');

describe('Schema', () => {
    it('validate a good schema', () => {
        const schema = new Schema({
            name: {
                type: String,
                required: true
            }, 
            age: {
                type: Number, 
            }, 
            weight: {
                type: String, 
            }
        });

        const dog = {
            name: 'scruffy',
            age: 69, 
            weight: '420 lbs'
        }; 

        expect(schema.validate(dog)).toEqual({
            name: 'scruffy', 
            age: 69,
            weight: '420 lbs'
        }); 
    });

    it('throws on a bad schema', () => {
        const schema = new Schema({
            name: {
                type: String, 
                required: true
            }, 
            age: {
                type: Number
            }, 
            weight: {
                type: String
            }
        });
        const dog = {
            age: 'scruffy',
            weight: '420 lbs'
        };

        expect(() => schema.validate(dog)).toThrowErrorMatchingSnapshot(); 
    });
});