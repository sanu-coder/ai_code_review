import prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css"
import './App.css';
import { useEffect, useState } from "react";
import Editor from 'react-simple-code-editor'
import { reviewCodeAPI } from "./apis/api";
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import "highlight.js/styles/github-dark.css";

function App() {
  const [load, setLoad] = useState(false);
  const [code, setCode] = useState(`function sum(){return 1+1;}`);
  const [review, setReview] = useState(``);


  async function reviewCode() {
    setLoad(true)
    const data = await reviewCodeAPI(code);
    setReview(data);
    setLoad(false);
  }
  useEffect(()=>{
    prism.highlightAll();
  }, []);

  return (
    <>
     <main>
      <div className='left'>
        <div className='code'>
          <Editor
          value={code}
          onValueChange={code => setCode(code)}
          highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
          padding={10}
          style={{
            fontSize : 18,
            backgroundColor : "#f5f5f5",
            border : '1px solid #ddd',
            borderRadius : "5px",
            height : "100%",
            width  : '100%'
          }}
          />
        </div>
        <button className='review' disabled={load} onClick={() => reviewCode()}>Review</button>
      </div>
      <div className='right'>
        <Markdown
        rehypePlugins={[rehypeHighlight]}
        >{review}</Markdown>
      </div>
     </main>
    </>
  );
}

export default App;
