"use client";

import { useEffect, useState } from "react";
import { runSQL, getDatabases } from "./lib/api";
import DatabaseSidebar from "./components/DatabaseSidebar";
import SqlEditor from "./components/SqlEditor";
import Toolbar from "./components/Toolbar";
import StatusBar from "./components/StatusBar";
import ResultTable from "./components/ResultTable";

export default function HomePage() {
  const [sql, setSql] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [databases, setDatabases] = useState<string[]>([]);
  const [currentDatabase, setCurrentDatabase] = useState<string | null>(null);

  useEffect(() => {
    getDatabases()
      .then(setDatabases)
      .catch(() => {});
  }, []);

  async function handleRun() {
    if (!sql.trim()) return;

    setLoading(true);
    setError(null);

    const response = await runSQL(sql);

    if (!response.success) {
      setError(response.error);
      setResult(null);
    } else {
      setResult(response.result);

      const match = sql.match(/USE\s+(\w+)/i);
      if (match) setCurrentDatabase(match[1]);

      getDatabases()
        .then(setDatabases)
        .catch(() => {});
    }

    setLoading(false);
  }

  return (
    <div className="flex h-screen">
      <DatabaseSidebar
        databases={databases}
        currentDatabase={currentDatabase}
      />

      <main className="flex-1 p-6 space-y-4">
        <h1 className="text-2xl font-bold">MiniDB SQL Client</h1>

        <SqlEditor sql={sql} onChange={setSql} />
        <Toolbar onRun={handleRun} loading={loading} />
        <StatusBar error={error} />

        {result && <ResultTable result={result} />}
      </main>
    </div>
  );
}
