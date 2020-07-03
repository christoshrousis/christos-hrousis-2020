
describe('Some basic tests.', () => {
    context('Pages exist', () => {
        it('Has major routes.', () => {
            cy.visit('http://localhost:8000/')
            cy.visit('http://localhost:8000/projects')
            cy.get('footer a:first').click()
            cy.location().should((location) => {
                expect(location.hash).to.be.empty
                expect(location.href).to.eq('http://localhost:8000/')
            })
        })
    })
})