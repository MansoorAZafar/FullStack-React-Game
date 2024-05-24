import 'bootstrap/dist/css/bootstrap.min.css';
export default function App({ Component, pageProps }) {
  const darkThemeStyles = `
    body {
      background-color: black;
      color: #ffffff;
    }
  `;

  return (
    <>
      <style jsx global>{darkThemeStyles}</style>
      <Component {...pageProps} />
    </>
  )
  
}
