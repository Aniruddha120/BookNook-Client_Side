export default function Spinner({ full = true }: { full?: boolean }) {
  return (
    <div className={full ? "flex min-h-[50vh] items-center justify-center" : "flex justify-center py-6"}>
      <span className="loading loading-spinner loading-lg text-primary" />
    </div>
  );
}
