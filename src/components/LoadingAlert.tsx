import { Spinner } from "./Spinner";

export function LoadingAlert({ message }: { message: string }) {
  return (
    <div className="alert alert-info mb-12 shadow-lg">
      <div>
        <Spinner className="h-4 w-4 flex-shrink-0" />
        <ul className="list-disc pl-8">
          <li>{message}</li>
        </ul>
      </div>
    </div>
  );
}
