import api from '../api'
import * as taskService from '../task'

jest.mock('../api')

const mockTasks = [
  { id: 1, titulo: 'T1', descripcion: 'D1', completada: false, fecha: '2025-05-26', creador: '' },
]

describe('task service', () => {
  beforeEach(() => jest.clearAllMocks())

  it('getTasks hace GET a /tareas', async () => {
    ;(api.get as jest.Mock).mockResolvedValue({ data: mockTasks })

    const result = await taskService.getTasks()

    const base = ("http://localhost:8080/api").replace(/\/+$/, '')  
    expect(api.get).toHaveBeenCalledWith(`${base}/tareas`)
    expect(result).toEqual(mockTasks)
  })

  it('deleteTask hace DELETE a /tareas/:id', async () => {
    ;(api.delete as jest.Mock).mockResolvedValue({})

    await expect(taskService.deleteTask(42)).resolves.toBeUndefined()

    const base = ("http://localhost:8080/api").replace(/\/+$/, '')
    expect(api.delete).toHaveBeenCalledWith(`${base}/tareas/42`)
  })

  it('createTask hace POST a /tareas con el payload', async () => {
    const newTask = {
      titulo: 'Nueva',
      descripcion: 'Desc',
      completada: false,
      fecha: '2025-05-30',
      creador: '',
    }
    ;(api.post as jest.Mock).mockResolvedValue({ data: { id: 99, ...newTask } })

    const created = await taskService.createTask(newTask)

    const base = ("http://localhost:8080/api").replace(/\/+$/, '')
    expect(api.post).toHaveBeenCalledWith(`${base}/tareas`, newTask)
    expect(created.id).toBe(99)
  })

  it('updateTask hace PUT a /tareas/:id con el payload', async () => {
    const updates = {
      titulo: 'Upd',
      descripcion: 'DescU',
      completada: true,
      fecha: '2025-06-01',
      creador: '',
    }
    ;(api.put as jest.Mock).mockResolvedValue({ data: { id: 42, ...updates } })

    const updated = await taskService.updateTask(42, updates)

    const base = ("http://localhost:8080/api").replace(/\/+$/, '')
    expect(api.put).toHaveBeenCalledWith(`${base}/tareas/42`, updates)
    expect(updated.id).toBe(42)
  })
})
