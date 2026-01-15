type Props = {
  databases: string[];
  currentDatabase: string | null;
};

export default function DatabaseSidebar({ databases, currentDatabase }: Props) {
  return (
    <aside className="w-64 border-r p-4">
      <h2 className="font-semibold mb-2">Databases</h2>

      <ul className="space-y-1">
        {databases?.map((db) => (
          <li
            key={db}
            className={`px-3 py-2 rounded cursor-pointer hover:bg-gray-200 transition ${
              currentDatabase === db ? "bg-black text-white" : "bg-gray-50"
            }`}
          >
            {db}
          </li>
        ))}
      </ul>
    </aside>
  );
}
