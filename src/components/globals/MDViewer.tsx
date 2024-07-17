import { useStore } from '@store';
import {
  MDXEditor,
  headingsPlugin,
  quotePlugin,
  listsPlugin,
  thematicBreakPlugin,
  linkPlugin,
  linkDialogPlugin,
  imagePlugin,
  tablePlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
  markdownShortcutPlugin,
  codeBlockPlugin,
  InsertCodeBlock,
  codeMirrorPlugin,
  // ChangeCodeMirrorLanguage,
  MDXEditorMethods,
} from '@mdxeditor/editor';
import { useEffect, useMemo, useRef } from 'react';

import '@mdxeditor/editor/style.css';

type Props = {};

export default function MDViewer({}: Props) {
  const { files, viewingFile, dispatch } = useStore();
  const mdEditor = useRef<MDXEditorMethods>(null);
  const content = useMemo(() => {
    const file = files.find((file) => file.name === viewingFile?.name);
    return file?.content || '';
  }, [files, viewingFile]);

  useEffect(() => {
    mdEditor.current?.setMarkdown(content);
  }, [content]);

  return (
    <div className="container">
      <MDXEditor
        ref={mdEditor}
        markdown={content}
        onChange={(content) => {
          if (!viewingFile) return;

          dispatch.updateContent({ ...viewingFile, content });
        }}
        // onError={(error) => console.error(error)}
        plugins={[
          headingsPlugin(),
          quotePlugin(),
          listsPlugin(),
          thematicBreakPlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          imagePlugin(),
          tablePlugin(),
          markdownShortcutPlugin(),
          codeBlockPlugin({ defaultCodeBlockLanguage: 'txt' }),
          codeMirrorPlugin({ codeBlockLanguages: { txt: 'Bash', js: 'JavaScript', css: 'CSS', '': 'Bash' } }),
          toolbarPlugin({
            toolbarContents: () => (
              <>
                {' '}
                <UndoRedo />
                <BlockTypeSelect />
                <CreateLink />
                <InsertImage />
                <InsertTable />
                <InsertThematicBreak />
                <ListsToggle />
                <BoldItalicUnderlineToggles />
                <InsertCodeBlock />
              </>
            ),
          }),
        ]}
      />
    </div>
  );
}
