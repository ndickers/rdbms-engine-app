type Props = {
  error: string | null;
};

export default function StatusBar({ error }: Props) {
  if (!error) return null;

  return (
    <div className="border border-red-300 bg-red-50 text-red-700 p-3 rounded">
      ❌ {error}
    </div>
  );
}
