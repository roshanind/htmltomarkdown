import { useEffect, useMemo, useRef } from 'react';
import {
  // plugins
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
  diffSourcePlugin,
  markdownShortcutPlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  // components
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
  InsertCodeBlock,
  MDXEditorMethods,
  DiffSourceToggleWrapper,
} from '@mdxeditor/editor';

import { useStore } from '@store';

import '@mdxeditor/editor/style.css';

/**
 * Markdown Editor component.
 * Renders a markdown editor with various plugins and toolbar options.
 */
export default function MDEditor() {
  const { files, dispatch } = useStore();
  const mdEditor = useRef<MDXEditorMethods>(null);
  const viewingFile = useMemo(() => {
    return files.find((file) => file.isViewing);
  }, [files]);

  useEffect(() => {
    mdEditor.current?.setMarkdown(viewingFile?.content || '');
  }, [viewingFile]);

  return (
    <div className="container">
      <MDXEditor
        ref={mdEditor}
        markdown={viewingFile?.content || ''}
        autoFocus
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
          diffSourcePlugin({
            diffMarkdown: viewingFile?.lastEditedContent || viewingFile?.content,
            viewMode: 'rich-text',
          }),
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
                <DiffSourceToggleWrapper>
                  <UndoRedo />
                </DiffSourceToggleWrapper>
              </>
            ),
          }),
        ]}
      />
    </div>
  );
}
