export default function Loading() {
  return (
    <div className="flex justify-center items-center h-50">
      <div
        className="w-8 h-8 border-4 border-gray-700 border-t-transparent rounded-full animate-spin"
        aria-label="Loading..."
      />
    </div>
  );
}
