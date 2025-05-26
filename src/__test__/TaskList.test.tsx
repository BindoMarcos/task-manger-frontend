import { render, screen, waitFor } from '@testing-library/react'
import TaskList from '../pages/TaskList'
import { getTasks } from '../services/task'
jest.mock('../services/task')

describe('TaskList', () => {
  const mockedFetch = getTasks as jest.MockedFunction<typeof getTasks>

  it('muestra tareas recibidas del API', async () => {
    mockedFetch.mockResolvedValue([
      { id: 1, titulo: 'Comprar leche', completada: false, creador: "prueba" , fecha: "16-01-2023" },
      { id: 2, titulo: 'Enviar email', completada: true, creador: "prueba" , fecha: "12-05-2020"},
    ])
    render(<TaskList />)
    expect(screen.getByText(/cargando/i)).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('Comprar leche')).toBeInTheDocument()
      expect(screen.getByText('Enviar email')).toBeInTheDocument()
    })
  })
})
