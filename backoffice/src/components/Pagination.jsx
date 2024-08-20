import { Pagination as BPagination } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

function Pagination({ pageIndex, pageCount, incrementPage, canNextPage, decrementPage, canPrevPage, onClick }) {
  const totalPage = Array.from({ length: pageCount }, (_, i) => i);
  const displayedCount = pageIndex + 1 < 5 || pageIndex + 5 > pageCount ? 5 : 3;

  let start;
  if (pageIndex + 1 < 5) {
    start = Math.max(pageIndex - displayedCount, 0);
  } else if (pageIndex + 5 > pageCount) {
    start = pageCount - displayedCount;
  } else {
    start = pageIndex - 1;
  }

  return (
    <BPagination className="mb-0">
      <BPagination.Prev onClick={decrementPage} disabled={!canPrevPage} />
      {pageIndex + 1 >= 5 ? (
        <>
          <BPagination.Item onClick={() => onClick(0)}>1</BPagination.Item>
          <BPagination.Ellipsis disabled />
        </>
      ) : null}

      {totalPage.slice(start, start + displayedCount).map((page) => (
        <BPagination.Item key={uuidv4()} active={page === pageIndex} onClick={() => onClick(page)}>
          {page + 1}
        </BPagination.Item>
      ))}

      {pageIndex + 5 <= pageCount ? (
        <>
          <BPagination.Ellipsis disabled />
          <BPagination.Item onClick={() => onClick(pageCount - 1)}>{pageCount}</BPagination.Item>
        </>
      ) : null}
      <BPagination.Next onClick={incrementPage} disabled={!canNextPage} />
    </BPagination>
  );
}

export default Pagination;
