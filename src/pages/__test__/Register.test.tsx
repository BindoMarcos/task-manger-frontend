import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Register from '../Register'
import * as auth from '../../services/auth'
import '@testing-library/jest-dom'

const originalLocation = window.location

beforeAll(() => {
  delete (window as any).location
  Object.defineProperty(window, 'location', {
    configurable: true,
    writable: true,
    value: { href: '', assign: jest.fn(), replace: jest.fn() } as unknown as Location
  })
})

afterAll(() => {
  Object.defineProperty(window, 'location', {
    configurable: true,
    writable: true,
    value: originalLocation
  })
})

describe('Register Page', () => {
  const registerSpy = jest.spyOn(auth, 'register')

  beforeEach(() => {
    registerSpy.mockClear()
    window.location.href = ''
  })

  it('renderiza campos y botón crear', () => {
    render(<Register />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /crear cuenta/i })).toBeInTheDocument()
  })

  it('registro exitoso redirige a /tareas', async () => {
    registerSpy.mockResolvedValueOnce(undefined)
    render(<Register />)
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'u@u.com' } })
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'pwd' } })
    fireEvent.click(screen.getByRole('button', { name: /crear cuenta/i }))
    await waitFor(() => expect(registerSpy).toHaveBeenCalledWith('u@u.com', 'pwd'))
    expect(window.location.href).toBe('/tareas')
  })

  it('registro fallido muestra error y botón “Logueate”', async () => {
    registerSpy.mockRejectedValueOnce(new Error('Ya existe'))
    render(<Register />)
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'u@u.com' } })
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'pwd' } })
    fireEvent.click(screen.getByRole('button', { name: /crear cuenta/i }))
    expect(await screen.findByText('Ya existe')).toBeInTheDocument()
    const btn = screen.getByRole('button', { name: /logueate/i })
    fireEvent.click(btn)
    expect(window.location.href).toBe('/')
  })
})
