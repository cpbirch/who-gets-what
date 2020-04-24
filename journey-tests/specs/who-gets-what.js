describe('Enter name and select shape', () => {

    let component;

    before(() => {
        browser.url('http://localhost:8080');
        component = $('who-gets-what');
    })

    afterEach(() => {
        // [TO DO]: Dirty hack to pause between tests as transition is too fast
        browser.pause(1000);
    })

    it('should have all page elements visible', () => {
        expect(component.shadow$('#name')).toBeDisplayed();
        expect(component.shadow$('#square')).toBeDisplayed();
        expect(component.shadow$('#circle')).toBeDisplayed();
        expect(component.shadow$('#triangle')).toBeDisplayed();
    })

    it('should correctly enter the name ', () => {
        const name = 'Joe Doe';
        const nameInput = component.shadow$('#name');

        nameInput.setValue(name);

        expect(nameInput).toHaveValue(name);
    })

    it('should click on any one of the shapes', () => {
        const randomIndex = Math.floor((Math.random() * 3));
        const shapes = component.shadow$$('input[name="shapes"]');

        shapes[randomIndex].click();

        expect(shapes[randomIndex]).toBeChecked();
    })

})