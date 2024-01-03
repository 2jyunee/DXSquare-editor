<style scoped>
.ck.ck-editor__editable_inline {
    border: 1px solid transparent;
    overflow: auto;
    min-height: 70vh;
    padding: 0 var(--ck-spacing-standard);
}
</style>
<template>

  <div style="background-color: #ffffff;">
    
    <ckeditor id="doc-container" :editor="editor" :config= "editorConfig" v-model="editorData" @ready="onEditorReady"></ckeditor>
    <!-- <div id="presence-list-container"></div>
    <div id="outline" class="document-outline-container"></div>
    <div id="doc-container"></div>
    <div class="sidebar" id="sidebar"></div>
  </div>
  <div id="revision-viewer-container">
    <div class="container">
        <div id="revision-viewer-editor"></div>
        <div class="sidebar" id="revision-viewer-sidebar"></div>
    </div>-->
  </div>
</template>


<script setup lang="ts">
  // import BalloonEditor from '@ckeditor/ckeditor5-build-balloon-block'
  // import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic'
  // import { ImportWord } from '@ckeditor/ckeditor5-import-word'
  // import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office';
  // import '@/assets/external/editor4.22.1/ckeditor.js'
  import 'ckeditor5-custom-build/build/ckeditor'
  import { onMounted, ref } from 'vue'
  import { useEditorStore } from '@/stores/service'

  const props = defineProps({
    contents: { type: String, required: false, default: '' }
  })



  // CKEDITOR.ClassicEditor.create()
  const editor = ref(ClassicEditor)
  const editorData = ref(props.contents)
  const editorConfig = ref({})
  editorConfig.value = {
    toolbar: {item:[]},
    licenseKey: 'OFN0L0xyakFWUStRcFljZG95S1BLdGJ6NmZhMzNzei9OdzhRK2FOVWVzaHFOenJlRDNuenNzSGlpUmpFLU1qQXlOREF5TURJPQ==',
    htmlSupport: {
            allow: [
                {
                    name: /^.*$/,
                    styles: true,
                    attributes: true,
                    classes: true
                }
            ]
        },
        style: {
            definitions: [
                {
                    name: 'Article category',
                    element: 'h3',
                    classes: [ 'category' ]
                },
                {
                    name: 'Title',
                    element: 'h2',
                    classes: [ 'document-title' ]
                },
                {
                    name: 'Subtitle',
                    element: 'h3',
                    classes: [ 'document-subtitle' ]
                },
                {
                    name: 'Info box',
                    element: 'p',
                    classes: [ 'info-box' ]
                },
                {
                    name: 'Side quote',
                    element: 'blockquote',
                    classes: [ 'side-quote' ]
                },
                {
                    name: 'Marker',
                    element: 'span',
                    classes: [ 'marker' ]
                },
                {
                    name: 'Spoiler',
                    element: 'span',
                    classes: [ 'spoiler' ]
                },
                {
                    name: 'Code (dark)',
                    element: 'pre',
                    classes: [ 'fancy-code', 'fancy-code-dark' ]
                },
                {
                    name: 'Code (bright)',
                    element: 'pre',
                    classes: [ 'fancy-code', 'fancy-code-bright' ]
                }
            ]
        },
        fontFamily: {
            supportAllValues: true
        },
        fontSize: {
            options: [ 10, 12, 14, 'default', 18, 20, 22 ],
            supportAllValues: true
        },
        htmlEmbed: {
            showPreviews: true
        },
        list: {
            properties: {
                styles: true,
                startIndex: true,
                reversed: true
            }
        },
        placeholder: 'Type or paste your content here!',
        table: {
            contentToolbar: [
                'tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties', 'toggleTableCaption'
            ]
        },
    
  }
  
  const editorStore = useEditorStore()
  const onEditorReady = (editor) => {
    editorStore.setEditorObject(editor)
  }

  onMounted(() => {
    // editorStore.setEditorObject(editor.value)
    debugger;
    // CKEDITOR.ClassicEditor.create( document.querySelector( '#doc-container' ), {
    //   toolbar: {
    //         items: [
    //             'aiCommands', '|',
    //             'ckbox', 'uploadImage', '|',
    //             'exportPDF','exportWord', '|',
    //             'comment', 'trackChanges', 'revisionHistory', '|',
    //             'findAndReplace', 'selectAll', 'formatPainter', '|',
    //             'undo', 'redo',
    //             '-',
    //             'bold', 'italic', 'strikethrough', 'underline', 'removeFormat', '|',
    //             'bulletedList', 'numberedList', 'todoList', '|',
    //             'outdent', 'indent', '|',
    //             'alignment', '|',
    //             '-',
    //             'heading', '|',
    //             'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', 'highlight', '|',
    //             'link', 'blockQuote', 'insertTable', 'mediaEmbed', 'codeBlock', 'htmlEmbed', 'tableOfContents', 'insertTemplate', '|',
    //             'specialCharacters', 'horizontalLine', 'pageBreak', '|',
    //             // Intentionally skipped buttons to keep the toolbar smaller, feel free to enable them:
    //             // 'code', 'subscript', 'superscript', 'textPartLanguage', '|',
    //             // ** To use source editing remember to disable real-time collaboration plugins **
    //             // 'sourceEditing'
    //         ],
    //         shouldNotGroupWhenFull: true
    //     },
    //     // Changing the language of the interface requires loading the language file using the <script> tag.
    //     // language: 'es',
    //     list: {
    //         properties: {
    //             styles: true,
    //             startIndex: true,
    //             reversed: true
    //         }
    //     },
    //     // https://ckeditor.com/docs/ckeditor5/latest/features/headings.html#configuration
    //     heading: {
    //         options: [
    //             { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
    //             { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
    //             { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
    //             { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
    //             { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
    //             { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
    //             { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
    //         ]
    //     },
    //     // https://ckeditor.com/docs/ckeditor5/latest/features/font.html#configuring-the-font-family-feature
    //     fontFamily: {
    //         options: [
    //             'default',
    //             'Arial, Helvetica, sans-serif',
    //             'Courier New, Courier, monospace',
    //             'Georgia, serif',
    //             'Lucida Sans Unicode, Lucida Grande, sans-serif',
    //             'Tahoma, Geneva, sans-serif',
    //             'Times New Roman, Times, serif',
    //             'Trebuchet MS, Helvetica, sans-serif',
    //             'Verdana, Geneva, sans-serif'
    //         ],
    //         supportAllValues: true
    //     },
    //     // https://ckeditor.com/docs/ckeditor5/latest/features/font.html#configuring-the-font-size-feature
    //     fontSize: {
    //         options: [ 10, 12, 14, 'default', 18, 20, 22 ],
    //         supportAllValues: true
    //     },
    //     // Be careful with the setting below. It instructs CKEditor to accept ALL HTML markup.
    //     // https://ckeditor.com/docs/ckeditor5/latest/features/general-html-support.html#enabling-all-html-features
    //     // htmlSupport: {
    //     // 	allow: [
    //     // 		{
    //     // 			name: /.*/,
    //     // 			attributes: true,
    //     // 			classes: true,
    //     // 			styles: true
    //     // 		}
    //     // 	]
    //     // },
    //     // Be careful with enabling previews
    //     // https://ckeditor.com/docs/ckeditor5/latest/features/html-embed.html#content-previews
    //     htmlEmbed: {
    //         showPreviews: true
    //     },
    //     // https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html#configuration
    //     // mention: {
    //     //     feeds: [
    //     //         {
    //     //             marker: '@',
    //     //             feed: [
    //     //                 '@apple', '@bears', '@brownie', '@cake', '@cake', '@candy', '@canes', '@chocolate', '@cookie', '@cotton', '@cream',
    //     //                 '@cupcake', '@danish', '@donut', '@dragée', '@fruitcake', '@gingerbread', '@gummi', '@ice', '@jelly-o',
    //     //                 '@liquorice', '@macaroon', '@marzipan', '@oat', '@pie', '@plum', '@pudding', '@sesame', '@snaps', '@soufflé',
    //     //                 '@sugar', '@sweet', '@topping', '@wafer'
    //     //             ],
    //     //             minimumCharacters: 1
    //     //         }
    //     //     ]
    //     // },
    //     // https://ckeditor.com/docs/ckeditor5/latest/features/editor-placeholder.html#using-the-editor-configuration
    //     placeholder: 'Welcome to CKEditor 5!',
    //     // Used by real-time collaboration
    //     cloudServices: {
    //         // Be careful - do not use the development token endpoint on production systems!
    //         tokenUrl: 'https://103145.cke-cs.com/token/dev/jlnzv1IJr3zcqRDypvSYF2K2XhJjDDu3UEnj?limit=10',
    //         webSocketUrl: 'wss://103145.cke-cs.com/ws',
    //         uploadUrl: 'https://103145.cke-cs.com/easyimage/upload/'
    //     },
    //     collaboration: {
    //         // Modify the channelId to simulate editing different documents
    //         // https://ckeditor.com/docs/ckeditor5/latest/features/collaboration/real-time-collaboration/real-time-collaboration-integration.html#the-channelid-configuration-property
    //         channelId: 'document-id-6'
    //     },
    //     // https://ckeditor.com/docs/ckeditor5/latest/features/collaboration/annotations/annotations-custom-configuration.html#sidebar-configuration
    //     sidebar: {
    //         container: document.querySelector( '#sidebar' )
    //     },
    //     documentOutline: {
    //         container: document.querySelector( '#outline')
    //     },
    //     // // https://ckeditor.com/docs/ckeditor5/latest/features/collaboration/real-time-collaboration/users-in-real-time-collaboration.html#users-presence-list
    //     presenceList: {
    //         container: document.querySelector( '#presence-list-container' )
    //     },
    //     // Add configuration for the comments editor if the Comments plugin is added.
    //     // https://ckeditor.com/docs/ckeditor5/latest/features/collaboration/annotations/annotations-custom-configuration.html#comment-editor-configuration
    //     comments: {
    //         editorConfig: {
    //             extraPlugins: CKEDITOR.ClassicEditor.builtinPlugins.filter( plugin => {
    //                 // Use e.g. Ctrl+B in the comments editor to bold text.
    //                 return [ 'Bold', 'Italic', 'Underline', 'List', 'Autoformat', 'Mention' ].includes( plugin.pluginName );
    //             } ),
    //             // Combine mentions + Webhooks to notify users about new comments
    //             // https://ckeditor.com/docs/cs/latest/guides/webhooks/events.html
    //             mention: {
    //                 feeds: [
    //                     {
    //                         marker: '@',
    //                         feed: [
    //                             '@Baby Doe', '@Joe Doe', '@Jane Doe', '@Jane Roe', '@Richard Roe'
    //                         ],
    //                         minimumCharacters: 1
    //                     }
    //                 ]
    //             },
    //         }
    //     },
    //     // Do not include revision history configuration if you do not want to integrate it.
    //     // Remember to remove the 'revisionHistory' button from the toolbar in such a case.
    //     revisionHistory: {
    //         editorContainer: document.querySelector( '#editor-container' ),
    //         viewerContainer: document.querySelector( '#revision-viewer-container' ),
    //         viewerEditorElement: document.querySelector( '#revision-viewer-editor' ),
    //         viewerSidebarContainer: document.querySelector( '#revision-viewer-sidebar' ),
    //     },
    //     // https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/ckbox.html
    //     ckbox: {
    //         // Be careful - do not use the development token endpoint on production systems!
    //         tokenUrl: 'https://103145.cke-cs.com/token/dev/jlnzv1IJr3zcqRDypvSYF2K2XhJjDDu3UEnj?limit=10'
    //     },
    //     // AI Assistant feature configuration.
    //     // https://ckeditor.com/docs/ckeditor5/latest/features/ai-assistant.html
    //     // aiAssistant: {
    //     // //     // Provide the URL to the OpenAI proxy endpoint in your application.
    //     // //     apiUrl: 'http://url-to-your-openai-proxy-endpoint/'
    //     // },
    //     style: {
    //         definitions: [
    //             {
    //                 name: 'Article category',
    //                 element: 'h3',
    //                 classes: [ 'category' ]
    //             },
    //             {
    //                 name: 'Info box',
    //                 element: 'p',
    //                 classes: [ 'info-box' ]
    //             },
    //         ]
    //     },
    //     // License key is required only by the Pagination plugin and non-realtime Comments/Track changes.
    //     licenseKey: 'd2JqNWFoa1NacTlNeGxQdktYU3BXdjFRN0RoU3dGc2dPNCtEaDlZdXJxMmxtWEIxOFpwYWh6OXBYQmU5LU1qQXlOREF4TVRRPQ==',
    //     // licenseKey: 'NDdianJ3WnJjV0RNQUlob0hXYXBlNDB3SFIwcW1LblBCUFVPNW10cHptRUl3c1BRd3ZtOE5RQT0tTWpBeU5EQXlNREU9',
    //     removePlugins: [
    //         // Before enabling Pagination plugin, make sure to provide proper configuration and add relevant buttons to the toolbar
    //         // https://ckeditor.com/docs/ckeditor5/latest/features/pagination/pagination.html
    //         'Pagination',
    //         // Intentionally disabled, file uploads are handled by CKBox
    //         'Base64UploadAdapter',
    //         // Intentionally disabled, file uploads are handled by CKBox
    //         'CKFinder',
    //         // Intentionally disabled, file uploads are handled by CKBox
    //         'EasyImage',
    //         // Requires additional license key
    //         'WProofreader',
    //         // Incompatible with real-time collaboration
    //         'SourceEditing',
    //         // Careful, with the Mathtype plugin CKEditor will not load when loading this sample
    //         // from a local file system (file://) - load this site via HTTP server if you enable MathType
    //         'MathType'
    //         // If you would like to adjust enabled collaboration features:
    //         // 'RealTimeCollaborativeComments',
    //         // 'RealTimeCollaborativeTrackChanges',
    //         // 'RealTimeCollaborativeRevisionHistory',
    //         // 'PresenceList',
    //         // 'Comments',
    //         // 'TrackChanges',
    //         // 'TrackChangesData',
    //         // 'RevisionHistory',
    //     ]
    // }).then(editorObj => {
    //   window.editorObj = editorObj;
    //   editor.value = editorObj;

    //   return editorObj;
    // })


      debugger;
    //   Editor.builtinPlugins
    // ClassicEditor
    // .create( document.querySelector('#doc-container'), {
    //   // Editor configuration.
    // } )
    // .then( editorObj => {
    //   window.editorObj = editorObj;
    //   editor.value = editorObj;
    // } )
    // .catch();
  })
</script>
