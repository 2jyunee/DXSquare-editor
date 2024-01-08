<style scoped>
.ck.ck-editor__editable_inline {
    border: 1px solid transparent;
    overflow: auto;
    padding: 40px 80px 10px;
    min-height: 700px;
}

.padding-none .ck.ck-editor__editable_inline {
    overflow: auto;
    padding: 0;
    min-height: 700px;
}
.padding-none .ck.ck-editor__editable_inline>:last-child { 
    margin-bottom: 0;
}

.padding-none .ck.ck-editor__editable_inline>:first-child {
    margin-top: 0;
}
</style>
<template>

    <div style="background-color: #ffffff;">
        
        <ckeditor id="doc-container" :class="paddingNone" :editor="editor" :config= "editorConfig" v-model="editorData" @ready="onEditorReady"></ckeditor>
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
  import htmlToCanvas from 'html2canvas'
  import { onMounted, ref } from 'vue'
  import { useEditorStore, useServiceStore } from '@/stores/service'

  const props = defineProps({
    contents: { type: String, required: false, default: '' },
    paddingFlag: {type: Boolean, required: false, default: false}
  })


  //page-break ck-widget
  const paddingNone = ref('')
  const editor = ref(BalloonEditor)
  const editorData = ref(props.contents)
  const editorConfig = ref({})
  editorConfig.value = {
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
        placeholder: '내용을 입력해주세요.',
        table: {
            contentToolbar: [
                'tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties', 'toggleTableCaption'
            ]
        },
    
  }
  
  const editorStore = useEditorStore()
  const serviceStore = useServiceStore()

  const onEditorReady = (editor) => {
    editorStore.setEditorObject(editor)
    const command = editor.commands.get('pageBreak')
    command.on('execute', async () => {
        serviceStore.initEditingTemplateImgArr()
        const curHtmlStr = document.getElementById('doc-container')?.innerHTML
        if(curHtmlStr != '<div class="page -break ck-widget" contenteditable="false"><span class="page - break__label">페이지 나누기</span><div class="ck ck - reset_all ck - widget__type - around"><div class="ck ck - widget__type - around__button ck - widget__type - around__button_before" title="블록 앞에 단락 삽입" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 8"><path d="M9.055.263v3.972h-6.77M1 4.216l2-2.038m-2 2 2 2.038"></path></svg></div><div class="ck ck-widget__type-around__button ck-widget__type-around__button_after" title="블록 뒤에 단락 삽입" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 8"><path d="M9.055.263v3.972h-6.77M1 4.216l2-2.038m-2 2 2 2.038"></path></svg></div><div class="ck ck-widget__type-around__fake-caret"></div></div></div><p><br data-cke-filler="true"></p>') {
            // 썸네일 생성
            let domElems = new DOMParser().parseFromString(curHtmlStr, "text/html")
            let contentDomElem = Array.from(domElems.body.children)
            let container = document.createElement('div')
            container.style.position = 'absolute'
            container.style.top = '-99999px'

            for (let i = 0; i < contentDomElem!.length; i++) {
                if (contentDomElem[i].className.indexOf('page-break') > -1) {
                    document.body.appendChild(container);

                    let canvas = await htmlToCanvas(container)

                    let image = canvas.toDataURL()
                    serviceStore.appendEditingTemplateImgArr(image)
                    document.body.removeChild(container)
                    container.remove()
                    container = document.createElement('div')
                    container.style.position = 'absolute'
                    container.style.top = '-99999px'
                } else {
                    container.appendChild(contentDomElem[i])
                }
            }

            if (container.innerHTML) {
                debugger
                document.body.appendChild(container)
                let canvas = await htmlToCanvas(container)

                let image = canvas.toDataURL()
                serviceStore.appendEditingTemplateImgArr(image)
                // document.body.removeChild(container)
                container.remove()

            }
        }

    })

  }

  


  onMounted(() => {
    if(!props.paddingFlag) paddingNone.value = 'padding-none'
    else paddingNone.value = ''
  })
</script>
