import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppBar, List, ListItem, Toolbar } from "@mui/material";
import Link from "next/link";

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
            <List className="flex">
              <ListItem>
                <Link href="/">Home</Link>
              </ListItem>
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
