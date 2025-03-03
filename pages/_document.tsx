import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        {/* Remove Grammarly attributes that cause hydration issues */}
        <script dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              document.body.removeAttribute('data-new-gr-c-s-check-loaded');
              document.body.removeAttribute('data-gr-ext-installed');
            });
          `
        }} />
      </body>
    </Html>
  )
} 