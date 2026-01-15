type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  result: any;
};

export default function ResultTable({ result }: Props) {
  if (!Array.isArray(result)) {
    return (
      <pre className="border p-3 bg-gray-50 rounded">
        {JSON.stringify(result, null, 2)}
      </pre>
    );
  }

  if (result.length === 0) {
    return <div className="text-gray-500">No rows returned.</div>;
  }

  const columns = Object.keys(result[0]);

  return (
    <div className="overflow-auto border rounded">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="border px-6 py-2 text-left font-semibold"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {result.map((row, i) => (
            <tr key={i} className="even:bg-gray-50 border border-gray-500">
              {columns.map((col) => (
                <td key={col} className="border border-gray-500 px-6 py-2">
                  {row[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
