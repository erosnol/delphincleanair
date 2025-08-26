import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const filename = params.filename;
    
    // Security check - only allow specific PDF files
    const allowedFiles = [
      'english-pdf-delphin.pdf',
      'book-delphin-spanish.pdf'
    ];
    
    if (!allowedFiles.includes(filename)) {
      return new NextResponse('File not found', { status: 404 });
    }
    
    // Read the PDF file
    const filePath = join(process.cwd(), 'public', 'ebooks', filename);
    const fileBuffer = await readFile(filePath);
    
    // Set appropriate headers for PDF download
    const headers = new Headers();
    headers.set('Content-Type', 'application/pdf');
    headers.set('Content-Disposition', `attachment; filename="${filename}"`);
    headers.set('Content-Length', fileBuffer.length.toString());
    
    return new NextResponse(fileBuffer as any, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Error serving PDF:', error);
    return new NextResponse('File not found', { status: 404 });
  }
}
