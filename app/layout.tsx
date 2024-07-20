import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppBar, List, ListItem, Toolbar } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MyRegister",
  description: "Pupil Management App for Schools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppBar position="static" className="bg-primary">
          <Toolbar variant="dense">
            <List className="flex ml-auto">
              <ListItem>Home</ListItem>
              <ListItem>About</ListItem>
              <ListItem>Contact</ListItem>
            </List>
          </Toolbar>
        </AppBar>
        {children}
      </body>
    </html>
  );
}
