type Props = {
  onRun: () => void;
  loading: boolean;
};

export default function Toolbar({ onRun, loading }: Props) {
  return (
    <div className="flex gap-2">
      <button
        onClick={onRun}
        disabled={loading}
        className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
      >
        {loading ? "Running..." : "Run SQL"}
      </button>
    </div>
  );
}
