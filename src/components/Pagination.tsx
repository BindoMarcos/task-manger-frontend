import { Pagination, Stack } from "@mui/material";

interface TaskPaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const TaskPagination: React.FC<TaskPaginationProps> = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const handleChange = (_: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page);
  };

  return (
    <Stack spacing={2} alignItems="center" mt={2}>
      <Pagination
        count={pageCount}
        page={currentPage}
        onChange={handleChange}
        color="primary"
      />
    </Stack>
  );
};

export default TaskPagination;