import { render, screen, fireEvent } from '@testing-library/react'
import TaskPagination from '../Pagination'

describe('TaskPagination', () => {
  it('muestra el número correcto de páginas y dispara onPageChange', () => {
    const totalItems = 45
    const itemsPerPage = 10
    const currentPage = 2
    const onPageChange = jest.fn()

    render(
      <TaskPagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    )

    const page3 = screen.getByRole('button', { name: /go to page 3/i })
    expect(page3).toBeInTheDocument()

    fireEvent.click(page3)
    expect(onPageChange).toHaveBeenCalledWith(3)
  })
})
