import {useEffect, useState} from "react";
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML } from 'draft-convert';
import ReactHtmlParser from 'react-html-parser';

export default function RichTextEditor() {

    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    const [convertedContent, setConvertedContent] = useState('');
    useEffect(() => {
        let html = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(html);
    }, [editorState]);

    console.log(convertedContent);
    return (
        <div className='rich-text__editor'>
            <h1>Hello world</h1>
            <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
            />
            <div>
                {ReactHtmlParser(convertedContent)}
            </div>
        </div>
    )
}