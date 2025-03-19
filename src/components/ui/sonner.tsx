
import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:rounded-xl",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-[#8cdcd8] group-[.toast]:text-white group-[.toast]:hover:bg-[#7cc9c5] group-[.toast]:rounded-md group-[.toast]:font-medium",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:rounded-md",
          success: 
            "group-[.toaster]:bg-[#8cdcd8]/20 group-[.toaster]:border-[#8cdcd8] group-[.toaster]:border group-[.toaster]:text-foreground",
          error:
            "group-[.toaster]:bg-red-50 group-[.toaster]:border-red-200 group-[.toaster]:border group-[.toaster]:text-red-900",
          warning:
            "group-[.toaster]:bg-amber-50 group-[.toaster]:border-amber-200 group-[.toaster]:border group-[.toaster]:text-amber-900",
          info:
            "group-[.toaster]:bg-blue-50 group-[.toaster]:border-blue-200 group-[.toaster]:border group-[.toaster]:text-blue-900",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
