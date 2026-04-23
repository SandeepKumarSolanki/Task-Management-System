interface Props {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}: Props) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-end gap-2 mt-6">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className="px-3 py-1 border rounded-2xl disabled:opacity-50"
      >
        Prev
      </button>

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => setCurrentPage(i + 1)}
          className={`px-3 py-1 rounded-2xl border ${
            currentPage === i + 1 ? "bg-blue-600 text-white" : ""
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        className="px-3 py-1 border rounded-2xl disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}