
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "./Theme";
import { ClerkProvider } from "@clerk/nextjs";
import Nav from "./_components/header";
import { shadesOfPurple } from '@clerk/themes'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Pinterest",
  description: "Pinterest clone",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{
      baseTheme: shadesOfPurple,
      variables: { colorBackground: 'white', colorPrimary: "#E50022", colorNeutral: "black", colorTextOnPrimaryBackground: "white", colorText: "black", colorTextSecondary: "black", colorInputBackground: "white", colorInputText: "black", borderRadius: "0.8rem" },
    }}>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            // enableSystem
            disableTransitionOnChange
          >
            <Nav/>
        {children}
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
