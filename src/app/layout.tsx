import { ReactQueryProvider } from "@/providers/queryClient";
import "./globals.css";
import { Provider } from "@/components/ui/provider"

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  return (
    <html suppressHydrationWarning>
      <body>
      <ReactQueryProvider>
        <Provider>{children}</Provider>
      </ReactQueryProvider>
      </body>
    </html>
  )
}
