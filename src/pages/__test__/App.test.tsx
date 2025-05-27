import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

describe('App Routing', () => {
    it('muestra Login en la ruta "/"', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        )
        expect(screen.getByText(/login/i)).toBeInTheDocument()
    })

    it('muestra Register en "/registro"', () => {
        render(
            <MemoryRouter initialEntries={['/registro']}>
                <App />
            </MemoryRouter>
        )
        expect(screen.getByText(/registrarse/i)).toBeInTheDocument()
    })

    it('muestra TaskList en "/tareas"', () => {
        render(
            <MemoryRouter initialEntries={['/tareas']}>
                <App />
            </MemoryRouter>
        )
        expect(screen.getByText(/^tareas$/i)).toBeInTheDocument()
    })

    it('muestra TaskForm (crear) en "/nueva"', () => {
        render(
            <MemoryRouter initialEntries={['/nueva']}>
                <App />
            </MemoryRouter>
        )
        expect(screen.getByText(/crear nueva tarea/i)).toBeInTheDocument()
    })
})
