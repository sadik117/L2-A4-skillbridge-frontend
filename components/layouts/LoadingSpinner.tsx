import { cn } from "@/lib/utils";
import { LucideIcon, Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "default" | "primary" | "gradient" | "dots" | "ring" | "pulse";
  className?: string;
  text?: string;
  fullScreen?: boolean;
  showIcon?: boolean;
  icon?: LucideIcon;
}

const LoadingSpinner = ({
  size = "md",
  variant = "default",
  className,
  text,
  fullScreen = false,
  showIcon = false,
  icon: Icon = Loader2,
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    xs: "h-4 w-4",
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  const variantClasses = {
    default: "border-2 border-muted-foreground/20 border-t-foreground",
    primary: "border-2 border-primary/20 border-t-primary",
    gradient: "border-2 border-transparent border-t-transparent",
    dots: "",
    ring: "",
    pulse: "",
  };

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-4">
          {variant === "default" || variant === "primary" ? (
            <div className={cn(
              "rounded-full animate-spin",
              sizeClasses[size],
              variantClasses[variant],
              "bg-gradient-to-r from-primary via-purple-600 to-primary animate-gradient-spin",
              className
            )} />
          ) : variant === "dots" ? (
            <div className={cn("flex items-center justify-center gap-1", sizeClasses[size])}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1/3 w-1/3 rounded-full bg-primary",
                    i === 0 && "animate-bounce",
                    i === 1 && "animate-bounce [animation-delay:0.1s]",
                    i === 2 && "animate-bounce [animation-delay:0.2s]"
                  )}
                />
              ))}
            </div>
          ) : variant === "ring" ? (
            <div className={cn("relative", sizeClasses[size])}>
              <div className="absolute inset-0 rounded-full border-4 border-muted-foreground/10" />
              <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin" />
            </div>
          ) : variant === "pulse" ? (
            <div className={cn(
              "rounded-full bg-gradient-to-r from-primary to-purple-600 animate-pulse",
              sizeClasses[size]
            )} />
          ) : null}
          
          {showIcon && (
            <Icon className={cn(
              "animate-spin text-primary",
              size === "xs" && "h-3 w-3",
              size === "sm" && "h-4 w-4",
              size === "md" && "h-5 w-5",
              size === "lg" && "h-6 w-6",
              size === "xl" && "h-8 w-8"
            )} />
          )}
          
          {text && (
            <p className="text-sm text-muted-foreground animate-pulse">
              {text}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      {variant === "default" || variant === "primary" ? (
        <div className={cn(
          "rounded-full animate-spin",
          sizeClasses[size],
          variantClasses[variant],
          "bg-gradient-to-r from-primary via-purple-600 to-primary animate-gradient-spin",
        )} />
      ) : variant === "dots" ? (
        <div className={cn("flex items-center justify-center gap-1", sizeClasses[size])}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                "h-1/3 w-1/3 rounded-full bg-primary",
                i === 0 && "animate-bounce",
                i === 1 && "animate-bounce [animation-delay:0.1s]",
                i === 2 && "animate-bounce [animation-delay:0.2s]"
              )}
            />
          ))}
        </div>
      ) : variant === "ring" ? (
        <div className={cn("relative", sizeClasses[size])}>
          <div className="absolute inset-0 rounded-full border-4 border-muted-foreground/10" />
          <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin" />
        </div>
      ) : variant === "pulse" ? (
        <div className={cn(
          "rounded-full bg-gradient-to-r from-primary to-purple-600 animate-pulse",
          sizeClasses[size]
        )} />
      ) : null}
      
      {showIcon && (
        <Icon className={cn(
          "animate-spin text-primary",
          size === "xs" && "h-3 w-3",
          size === "sm" && "h-4 w-4",
          size === "md" && "h-5 w-5",
          size === "lg" && "h-6 w-6",
          size === "xl" && "h-8 w-8"
        )} />
      )}
      
      {text && (
        <p className="text-sm text-muted-foreground animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

// Button Loading Spinner
interface ButtonLoadingSpinnerProps {
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "default" | "white";
}

const ButtonLoadingSpinner = ({ size = "md", variant = "default" }: ButtonLoadingSpinnerProps) => {
  const sizeClasses = {
    xs: "h-3 w-3",
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <div className="flex items-center justify-center">
      <div className={cn(
        "rounded-full border-2 animate-spin",
        sizeClasses[size],
        variant === "default" 
          ? "border-primary/20 border-t-primary" 
          : "border-white/20 border-t-white"
      )} />
    </div>
  );
};

// Page Loading Spinner
const PageLoadingSpinner = () => {
  return (
    <div className="flex min-h-[300px] items-center justify-center">
      <LoadingSpinner 
        size="lg" 
        variant="gradient" 
        text="Loading..."
        showIcon
      />
    </div>
  );
};

// Content Loading Skeleton
const ContentLoadingSkeleton = ({ type = "card", count = 1 }: { type?: "card" | "text" | "list"; count?: number }) => {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  if (type === "card") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skeletons.map((i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-6 animate-pulse">
            <div className="flex items-start gap-4 mb-4">
              <div className="h-16 w-16 rounded-full bg-muted" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="h-3 bg-muted rounded w-full" />
              <div className="h-3 bg-muted rounded w-4/5" />
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-border">
              <div className="h-6 bg-muted rounded w-16" />
              <div className="h-9 bg-muted rounded w-24" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "text") {
    return (
      <div className="space-y-4">
        {skeletons.map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-1/2" />
            <div className="h-4 bg-muted rounded w-5/6" />
          </div>
        ))}
      </div>
    );
  }

  if (type === "list") {
    return (
      <div className="space-y-3">
        {skeletons.map((i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
            <div className="h-10 w-10 rounded-full bg-muted" />
            <div className="flex-1 space-y-1.5">
              <div className="h-3 bg-muted rounded w-1/4" />
              <div className="h-2 bg-muted rounded w-1/6" />
            </div>
            <div className="h-8 bg-muted rounded w-20" />
          </div>
        ))}
      </div>
    );
  }

  return null;
};

// Shimmer Effect
const ShimmerEffect = () => {
  return (
    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
  );
};

export { 
  LoadingSpinner, 
  ButtonLoadingSpinner, 
  PageLoadingSpinner, 
  ContentLoadingSkeleton,
  ShimmerEffect 
};