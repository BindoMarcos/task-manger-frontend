import Login from '../Login'
import * as auth from '../../services/auth'
import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

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
  // Restauramos la Location original
  Object.defineProperty(window, 'location', {
    configurable: true,
    writable: true,
    value: originalLocation
  })
})

describe('Login Page', () => {
  const loginSpy = jest.spyOn(auth, 'login')

  beforeEach(() => {
    loginSpy.mockClear()
    window.location.href = ''
  })

  it('renderiza campos y botones', () => {
    render(<Login />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /ingresar/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /registrate acá/i })).toBeInTheDocument()
  })

  it('login exitoso redirige a /tareas', async () => {
    loginSpy.mockResolvedValueOnce(undefined)
    render(<Login />)
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'a@a.com' } })
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '123' } })
    fireEvent.click(screen.getByRole('button', { name: /ingresar/i }))
    await waitFor(() => expect(loginSpy).toHaveBeenCalledWith('a@a.com', '123'))
    expect(window.location.href).toBe('/tareas')
  })

  it('login fallido muestra error', async () => {
    loginSpy.mockRejectedValueOnce(new Error('Credenciales inválidas'))
    render(<Login />)
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'x@x.com' } })
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'bad' } })
    fireEvent.click(screen.getByRole('button', { name: /ingresar/i }))
    expect(await screen.findByText('Credenciales inválidas')).toBeInTheDocument()
  })

  it('click en registrarse redirige a /registro', () => {
    render(<Login />)
    fireEvent.click(screen.getByRole('button', { name: /registrate acá/i }))
    expect(window.location.href).toBe('/registro')
  })
})