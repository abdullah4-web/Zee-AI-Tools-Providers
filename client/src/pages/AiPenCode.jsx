import React, { useState, useEffect } from "react";
import { Editor } from "../components/Editor";
import './AiPenCode.css';
import PinCodePrompt from "./PinCodePrompt";
import NavBar from '../components/NavBar';


const AiPenCode = () => {
  const [html, setHtml] = useState(" <h1>Hello World </h1> ");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("// follow Abdullah Shah");
  const [srcDoc, setSrcDoc] = useState("");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
      <html>
        <body>${html}</body>
        <style>${css}</style>
        <script>${js}</script>
      </html>
      `);
      localStorage.setItem("battlefield", JSON.stringify({ html, css, js }));
    }, 250);
    return () => clearTimeout(timeout);
  }, [html, css, js]);
  useEffect(() => {
    const { html, css, js } = JSON.parse(
      localStorage.getItem("battlefield")
    ) || { html: "<h1> Hello World  </h1>", css: "", js: "// Follow Abdullah Shah" };
    setHtml(html);
    setCss(css);
    setJs(js);
  }, []);
  console.log(html, css, js);

  return (
    <>
  
    <div className="pane top-pane">
          <Editor
            language={"html"}
            displayName="HTML"
            value={html}
            onChange={setHtml}
          />
          <Editor
            language={"css"}
            displayName="CSS"
            value={css}
            onChange={setCss}
          />
          <Editor
            language={"js"}
            displayName="JS"
            value={js}
            onChange={setJs}
          />
        </div>
        <PinCodePrompt setHTML={setHtml} setCSS={setCss} setJS={setJs} />
        <div className="pane">
          <iframe
            srcDoc={srcDoc}
            title="output"
            sandbox="allow-scripts"
            frameBorder="0"
            width={"100%"}
            height="100%"
          ></iframe>
      
      </div>
 
    </>
  );
};

export default AiPenCode;

