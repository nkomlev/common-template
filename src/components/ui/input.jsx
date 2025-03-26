import * as React from "react"
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils"

const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
)
Input.displayName = "Input";

const InputWithTitle = React.forwardRef(({ className, title , ...props }, ref) => {
  return (
    <div
      className={cn(
        "grid w-full items-center gap-1.5",
        className
      )}
    >
      <Label className="font-semibold">{title}</Label>
      <Input {...props} ref={ref} />
    </div>
  );
});
InputWithTitle.displayName = 'InputWithTitle';

export { Input, InputWithTitle }