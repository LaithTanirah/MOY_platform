import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  id: string;
  label: string;
  error?: string;
  file?: File;
  onChange: (file: File) => void;
}

export default function FileUpload({
  id,
  label,
  error,
  file,
  onChange,
}: FileUploadProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        {label} <span className="text-destructive">*</span>
      </label>

      <label
        htmlFor={id}
        className={cn(
          "flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer transition",
          "bg-muted hover:bg-muted/70",
          error ? "border-red-500" : "border-primary"
        )}
      >
        <div className="flex flex-col items-center gap-2 text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16v-8m0 0l-3 3m3-3l3 3m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1"
            />
          </svg>

          <span className="text-sm font-medium">Choose file</span>

          <span className="text-xs text-muted-foreground">
            PDF, JPG, PNG
          </span>

          {file && (
            <p className="text-sm text-foreground mt-2">
              Selected file: <strong>{file.name}</strong>
            </p>
          )}
        </div>
      </label>

      <Input
        id={id}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        className="hidden"
        onChange={(e) => {
          const selected = e.target.files?.[0];
          if (selected) onChange(selected);
        }}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}