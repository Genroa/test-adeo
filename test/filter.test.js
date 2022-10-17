const { filter } = require('../app');
const data = require('../data');

describe('filter test', () => {
    it('should show the animals matching with the ry string pattern', () => {
        // Proposal: don't muddle the returned result inside the function simply doing its job, convert it for testing in the test itself
        const result = JSON.stringify(filter(data, 'ry'));

        expect(result).toEqual('[{"name":"Uzuzozne","people":[{"name":"Lillie Abbott","animals":[{"name":"John Dory"}]}]},{"name":"Satanwi","people":[{"name":"Anthony Bruno","animals":[{"name":"Oryx"}]}]}]');
    });
});
