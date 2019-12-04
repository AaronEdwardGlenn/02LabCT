const Validator = require('../lib/Validator.js');

describe('Validator', () => {
    let validator; 

    describe('required fields', () => {
        beforeAll(function(){
            validator = new Validator('age', {
                type: Number, 
                required: true
            });
        });

        it('correctly returns the field that was alwasy correct. for realz', () => {
            const dog = {
                name: 'scruffy', 
                age: 69, 
                weight: '420 lbs'
            };

            expect(validator.validate(dog)).toEqual(69);
        });

        it('returns the field that was not input correctly and cast that field to type', () => {
            const dog = {
                name: 'scrapppp', 
                age: '69', 
                weight: '420 lbs', 
            }; 
            expect(validator.validate(dog)).toEqual(69);
        });

        it ('field does not exist and was required so explotion and error thrown', () => {
            const dog = {
                name: 'scruffy', 
                weight: '420 lbs'
            };

            expect(() => validator.validate(dog)).toThrowErrorMatchingSnapshot(); 
        });
    }); 

    describe('optional fields', () => {
        beforeAll(() => {
            validator = new Validator('age', {
                type: Number
            }); 
        }); 

        it('correctly returns the field that was alwasy correct. for realz', () => {
            const dog = {
                name: 'scrapps',
                age: 69, 
                weight: '420 lbs'
            };

            expect(validator.validate(dog)).toEqual(69);

        });

        it('returns the field that was not input correctly and cast that field to type', () => {
            const dog = {
                name: 'scruffffffffff', 
                age: '69', 
                weight: '420 lbs'
            };

            expect(validator.validate(dog)).toEqual(69); 
        }); 

        it('field does not exist and was not required so null is fine', () => {
            const dog = {
                name: 'scrappers', 
                weight: '420 lbs'
            }; 

            expect(validator.validate(dog)).toBeNull(); 
        }); 
    });
});