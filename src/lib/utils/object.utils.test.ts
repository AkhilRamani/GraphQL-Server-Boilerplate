import { ObjectUtils } from "./object.utils";

describe('ObjectUtils', () => {
    describe('pick', () => {
        it('should pick the specified keys from the object', () => {
            const result = ObjectUtils.pick({ a: 1, b: 2, c: 3 }, ['a', 'c'])
            expect(result).toStrictEqual({ a: 1, c: 3 });
        });
    });
});