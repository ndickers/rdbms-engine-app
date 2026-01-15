"use client";

import CodeMirror from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";
import { oneDark } from "@codemirror/theme-one-dark";
import { formatSQL } from "../lib/sqlFormatter";

type Props = {
  sql: string;
  onChange: (value: string) => void;
};

export default function SqlEditor({ sql, onChange }: Props) {
  return (
    <div className="border border-gray-300 rounded shadow-sm overflow-hidden">
      <CodeMirror
        value={sql}
        height="200px"
        // extensions={[sql()]}
        theme={oneDark}
        onChange={(value) => onChange(value)}
        onBlur={() => onChange(formatSQL(sql))}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLine: true,
          highlightActiveLineGutter: true,
          foldGutter: true,
          dropCursor: true,
        }}
      />
    </div>
  );
}
