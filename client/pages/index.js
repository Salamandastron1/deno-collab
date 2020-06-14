import Head from 'next/head'
import { useState } from 'react';


export default function Home() {
  const [url, setUrl] = useState('');
  const [tiny, setTiny] = useState('');

  const getTiny = async (e) => {
    e.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        url,
      }),
    }

    console.log(options);
    try {

    const tinyResponse = await fetch('http://localhost:8080/getTiny', options);
    const newTiny = await tinyResponse.json();
    setTiny(newTiny.url);
    } catch (err) {
      console.log(err);
    }

  }

  return (
    <div className="container">
      <Head>
        <title>Deno stuff</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <form onSubmit={(e) => getTiny(e)}>
          <h1>Shorten a URL</h1>
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
          <button type="submit">Submit</button>
        </form>
        {
          tiny ? <h2>Your shortened URL is: <a href={`localhost:8080/${tiny}`}>{`localhost:8080/${tiny}`}</a></h2> : null
        }
      </main>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }

        form {
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }

        h1 {
          width: max-content;
        }
      `}</style>
    </div>
  )
}
