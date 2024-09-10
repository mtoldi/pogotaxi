import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-gray-100 rounded-lg">
        <SignUp />
      </div>
    </div>
  );
}
