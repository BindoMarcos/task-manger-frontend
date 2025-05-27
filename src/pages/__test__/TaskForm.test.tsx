import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import * as taskService from '../../services/task'

const mockNavigate = jest.fn()
const mockUseParams = jest.fn()

jest.mock('react-router-dom', () => {
  const original = jest.requireActual('react-router-dom')
  return {
    __esModule: true,
    ...original,
    useNavigate: () => mockNavigate,
    useParams: () => mockUseParams(),
  }
})

import TaskForm from '../TaskForm'

describe('TaskForm Page', () => {
  beforeEach(() => jest.clearAllMocks())

  describe('Modo Crear', () => {
    beforeEach(() => mockUseParams.mockReturnValue({}))

    it('renderiza formulario de creación y llama createTask', async () => {
      const createSpy = jest
        .spyOn(taskService, 'createTask')
        .mockResolvedValue({
          id: 99,
          titulo: 'Prueba',
          descripcion: 'Desc',
          completada: false,
          fecha: '2025-05-27',
          creador: '',
        } as any)

      const { container } = render(<TaskForm />)

      fireEvent.change(screen.getByLabelText(/título/i), {
        target: { value: 'Prueba' },
      })
      fireEvent.change(screen.getByLabelText(/descripción/i), {
        target: { value: 'Desc' },
      })

      // Seleccionamos el input[type="date"] directamente
      const dateInput = container.querySelector('input[type="date"]') as HTMLInputElement
      fireEvent.change(dateInput, { target: { value: '2025-05-27' } })

      fireEvent.click(screen.getByRole('button', { name: /guardar/i }))

      await waitFor(() =>
        expect(createSpy).toHaveBeenCalledWith({
          titulo: 'Prueba',
          descripcion: 'Desc',
          completada: false,
          fecha: '2025-05-27',
          creador: '',
        })
      )
      expect(mockNavigate).toHaveBeenCalledWith('/tareas')
    })
  })

  describe('Modo Editar', () => {
    beforeEach(() => mockUseParams.mockReturnValue({ id: '3' }))

    it('carga tarea existente y llama updateTask', async () => {
      const mockTask = {
        titulo: 'Antigua',
        descripcion: 'DescA',
        fecha: '2025-05-28',
        completada: true,
        creador: 'x@x.com',
      }
      jest.spyOn(taskService, 'getTask').mockResolvedValue(mockTask as any)
      const updateSpy = jest
        .spyOn(taskService, 'updateTask')
        .mockResolvedValue({
          id: 3,
          titulo: 'Actualizada',
          descripcion: 'DescA',
          completada: true,
          fecha: '2025-05-28',
          creador: 'x@x.com',
        } as any)

      const { container } = render(<TaskForm />)
      await waitFor(() =>
        expect(screen.getByDisplayValue('Antigua')).toBeInTheDocument()
      )

      fireEvent.change(screen.getByLabelText(/título/i), {
        target: { value: 'Actualizada' },
      })

      fireEvent.click(screen.getByRole('button', { name: /guardar/i }))

      await waitFor(() =>
        expect(updateSpy).toHaveBeenCalledWith(3, {
          titulo: 'Actualizada',
          descripcion: 'DescA',
          completada: true,
          fecha: '2025-05-28',
          creador: 'x@x.com',
        })
      )
      expect(mockNavigate).toHaveBeenCalledWith('/tareas')
    })
  })
})
