import Spinner from "@/components/global/spinner";

function Loading() {
  return (
    <div className="absolute inset-1/2">
      <Spinner />
    </div>
  );
}
export default Loading;
