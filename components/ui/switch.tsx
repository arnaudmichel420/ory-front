import { cn } from "@/lib/utils";
import * as SwitchPrimitive from "@rn-primitives/switch";
import { Platform } from "react-native";

type SwitchProps = React.ComponentProps<typeof SwitchPrimitive.Root>;

function Switch({ className, checked, disabled, ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      checked={checked}
      disabled={disabled}
      className={cn(
        "h-6 w-11 shrink-0 rounded-full border border-transparent bg-input p-0.5 active:bg-input/80",
        checked && "bg-primary active:bg-primary/90",
        disabled && "opacity-50",
        Platform.select({
          web: "cursor-pointer outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed",
        }),
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "h-5 w-5 rounded-full bg-background",
          checked && "translate-x-5",
          Platform.select({ web: "transition-transform" }),
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
