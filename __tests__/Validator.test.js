const Validator = require('../lib/Validator');

describe('Validator', () => {
    let validator; 

    describe('required fields', () => {
        beforeAll(function(){
            validator = new Validator('age', {
                type: Number, 
                required: true
            });
        });

        it('returns the field', () => {
            const dog = {
                name: 'scruffy', 
                age: 69, 
                weight: '420 lbs'
            };

            expect(validator.validate(dog)).toEqual(69);
        });

        it('returns the field cast to type', () => {
            const dog = {
                name: 'scrapppp', 
                age: '69', 
                weight: '420 lbs', 
            }; 
            expect(validator.validate(dog)).toEqual(69);
        });

        it ('returns the field', () => {
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

        it('returns the field', () => {
            const dog = {
                name: 'scrapps',
                age: 69, 
                weight: '420 lbs'
            };

            expect(validator.validate(dog)).toEqual(69);

        });

        it('returns the field cast to type', () => {
            const dog = {
                name: 'scruffffffffff', 
                age: '69', 
                weight: '420 lbs'
            };

            expect(validator.validate(dog)).toEqual(69); 
        }); 

        it('returns the field', () => {
            const dog = {
                name: 'scrappers', 
                weight: '420 lbs'
            }; 

            expect(validator.validate(dog)).toBeNull(); 
        }); 
    });
});