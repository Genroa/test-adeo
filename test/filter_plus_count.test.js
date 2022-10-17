const { filter, count } = require('../app');
const data = require('../data');

// This set of tests would maybe make sense in a scenario where the usage of both would require to test the proper order of things. But because they're called independently in the test right now (because the codebase doesn't have any function merging them apart from the main), this is a bit pointless for now.
describe('filter plus count test', () => {
    it('should show the animals matching with the bat string pattern, and the count', () => {
        const result = JSON.stringify(count(filter(data, 'bat')));

        expect(result).toEqual('[{"name":"Tohabdal [2]","people":[{"name":"Effie Houghton [1]","animals":[{"name":"Numbat"}]},{"name":"Owen Bongini [1]","animals":[{"name":"Numbat"}]}]},{"name":"Zuhackog [1]","people":[{"name":"Lawrence Camiciottoli [1]","animals":[{"name":"Numbat"}]}]}]');
    });
});
