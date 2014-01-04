// Jasmine tests for default app module

describe('App Routing', function () {
    
    it('should redirect to /join when accessing the root URL', function () {
        browser().navigateTo('localhost:8081');
        expect(browser().location().url()).toBe('/join');
    });
});
