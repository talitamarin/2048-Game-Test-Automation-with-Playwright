import { createWorker, PSM } from 'tesseract.js';

export async function recognizeBoardText(imagePath: string): Promise<string> {
  const worker = await createWorker();
  
  try {
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    
    // Configurações específicas para melhorar o reconhecimento de números
    await worker.setParameters({
      tessedit_char_whitelist: '0123456789', // Apenas números
      tessedit_pageseg_mode: PSM.SINGLE_LINE,
    });

    const { data: { text } } = await worker.recognize(imagePath);
    return text;
  } finally {
    await worker.terminate();
  }
}
