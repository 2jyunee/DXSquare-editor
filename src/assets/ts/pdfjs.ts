import * as pdfjsLib from 'pdfjs-dist'
import * as pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs'
import * as pdfViewer from 'pdfjs-dist/web/pdf_viewer.mjs'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker

export { pdfjsLib, pdfViewer }
