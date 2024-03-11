import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';


import { Web3ModalProvider } from '../context/Web3Modal'

export const metadata = {
  title: 'Web3Modal',
  description: 'Web3Modal Example'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
       <body className={`${inter.className} antialiased`}>
          <Web3ModalProvider>
              {children}
          </Web3ModalProvider>    
      </body>
    </html>
  );
}
