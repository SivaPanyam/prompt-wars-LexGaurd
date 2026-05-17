import io
import PyPDF2
import docx

class DocumentExtractor:
    @staticmethod
    def extract_from_pdf(file_bytes: bytes) -> str:
        """Extract text from a PDF file using PyPDF2."""
        text = ""
        try:
            pdf_reader = PyPDF2.PdfReader(io.BytesIO(file_bytes))
            for page in pdf_reader.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
        except Exception as e:
            raise ValueError(f"Failed to parse PDF: {str(e)}")
        
        if not text.strip():
            # In a full OCR system, we would fallback to Tesseract here.
            raise ValueError("No extractable text found in PDF. It may be a scanned image.")
            
        return text

    @staticmethod
    def extract_from_docx(file_bytes: bytes) -> str:
        """Extract text from a DOCX file."""
        text = ""
        try:
            doc = docx.Document(io.BytesIO(file_bytes))
            for para in doc.paragraphs:
                text += para.text + "\n"
        except Exception as e:
            raise ValueError(f"Failed to parse DOCX: {str(e)}")
        
        return text

    @staticmethod
    def extract_text(file_bytes: bytes, filename: str, content_type: str) -> str:
        """Main routing method for file extraction."""
        if content_type == "application/pdf" or filename.lower().endswith('.pdf'):
            return DocumentExtractor.extract_from_pdf(file_bytes)
        elif content_type in ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/msword"] or filename.lower().endswith('.docx'):
            return DocumentExtractor.extract_from_docx(file_bytes)
        elif content_type == "text/plain" or filename.lower().endswith('.txt'):
            return file_bytes.decode('utf-8', errors='ignore')
        else:
            raise ValueError(f"Unsupported file type: {content_type} / {filename}")
