import Message from "@/components/message";
export default function ConfirmationMessage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-green-50 dark:bg-background">
      <div className="w-full max-w-lg">
        <Message />
      </div>
    </div>
  );
}
