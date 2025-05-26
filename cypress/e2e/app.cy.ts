describe('Flujo completo: Login → Tareas', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/auth/login', { token: 'xyz' }).as('login')
    cy.intercept('GET', '/api/tareas', [
      { id: 1, title: 'Tarea A', completed: false }
    ]).as('getTasks')
  })

  it('permite iniciar sesión y ver la lista de tareas', () => {
    cy.visit('/')
    cy.get('input[name="username"]').type('marcos')
    cy.get('input[name="password"]').type('1234')
    cy.get('button[type="submit"]').click()
    cy.wait('@login')

    // tras login, debería redirigir a /tasks
    cy.url().should('include', '/tareas')
    cy.wait('@getTasks')
    cy.contains('Tarea A')
  })
})
