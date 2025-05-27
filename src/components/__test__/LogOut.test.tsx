import '@testing-library/jest-dom'  
import { render, screen, fireEvent } from '@testing-library/react'
import LogoutButton from '../LogOut'
import { useNavigate } from 'react-router-dom'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))

describe('LogoutButton', () => {
  it('renderiza el botón y al hacer click borra el token y navega a “/”', () => {
    const navigate = jest.fn()
    ;(useNavigate as jest.Mock).mockReturnValue(navigate)

    // Espiamos sessionStorage.removeItem
    const removeSpy = jest.spyOn(Storage.prototype, 'removeItem')

    render(<LogoutButton />)
    const btn = screen.getByRole('button', { name: /cerrar sesión/i })
    fireEvent.click(btn)

    expect(removeSpy).toHaveBeenCalledWith('token')
    expect(navigate).toHaveBeenCalledWith('/')
    removeSpy.mockRestore()
  })
})
