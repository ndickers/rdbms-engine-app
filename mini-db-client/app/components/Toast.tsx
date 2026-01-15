type Props = {
  message: string;
  show: boolean;
};

export default function Toast({ message, show }: Props) {
  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-fade-in">
      ✅ {message}
    </div>
  );
}
