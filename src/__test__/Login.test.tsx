import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { login } from '../services/auth'
import Login from '../pages/Login'
jest.mock('../services/auth')

describe('Login Page', () => {
  const mockedLogin = login as jest.MockedFunction<typeof login>

  beforeEach(() => {
    mockedLogin.mockReset()
  })

  it('muestra errores si faltan credenciales', async () => {
    render(<Login />, { wrapper: BrowserRouter })
    fireEvent.click(screen.getByRole('button', { name: /ingresar/i }))
    expect(await screen.findByText(/user o password requeridos/i)).toBeInTheDocument()
  })

  it('llama a login() con datos correctos y redirige', async () => {
    mockedLogin.mockResolvedValue({ token: 'abc' })
    render(<Login />, { wrapper: BrowserRouter })

    fireEvent.change(screen.getByLabelText(/usuario/i), { target: { value: 'test' } })
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '1234' } })
    fireEvent.click(screen.getByRole('button', { name: /ingresar/i }))

    await waitFor(() => {
      expect(mockedLogin).toHaveBeenCalledWith('test', '1234')
    })
  })
})
