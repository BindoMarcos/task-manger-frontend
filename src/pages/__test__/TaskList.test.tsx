import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import TaskList from '../TaskList'
import * as taskService from '../../services/task'
import * as userService from '../../services/user'
import '@testing-library/jest-dom'

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

describe('TaskList Page', () => {
  const tasks = [
    {
      id: 1,
      titulo: 'Tarea A',
      descripcion: 'Desc A',
      fecha: '2025-05-20',
      completada: true,
      creador: 'yo@yo.com',
    },
    {
      id: 2,
      titulo: 'Tarea B',
      descripcion: 'Desc B',
      fecha: '',
      completada: false,
      creador: 'otro@otro.com',
    },
  ]

  beforeEach(() => {
    jest
      .spyOn(taskService, 'getTasks')
      .mockResolvedValue(tasks)
    jest
      .spyOn(userService, 'getUserMail')
      .mockResolvedValue('yo@yo.com')
  })

  it('muestra la lista de tareas cargadas', async () => {
    render(<TaskList />)
    await waitFor(() =>
      expect(screen.getByText('Tarea A')).toBeInTheDocument()
    )
    expect(screen.getByText('Tarea B')).toBeInTheDocument()
  })

  it('navega a nueva tarea al hacer click', async () => {
    render(<TaskList />)
    await waitFor(() =>
      expect(screen.getByText('Tarea A')).toBeInTheDocument()
    )
    fireEvent.click(screen.getByRole('button', { name: /nueva tarea/i }))
    expect(mockNavigate).toHaveBeenCalledWith('/nueva')
  })
})
