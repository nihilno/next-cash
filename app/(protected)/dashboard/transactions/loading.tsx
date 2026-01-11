function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center justify-center p-8"
    >
      <span>Loading transactions...</span>
    </div>
  );
}
export default Loading;
