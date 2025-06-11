document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('studentForm');
    const previewContainer = document.getElementById('previewContainer');
    const letterPreview = document.getElementById('letterPreview');
    const downloadBtn = document.getElementById('downloadBtn');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const matrix = document.getElementById('matrix').value;
        const exco = document.getElementById('exco').value;
        const templateFile = document.getElementById('template').files[0];
        
        if (!templateFile) {
            alert('Please upload a letter template');
            return;
        }
        
        // Create image preview
        const reader = new FileReader();
        reader.onload = function(e) {
            letterPreview.innerHTML = `
                <img src="${e.target.result}" alt="Letter Template" id="templateImage">
                <div class="overlay-text" id="name-display">${name}</div>
                <div class="overlay-text" id="matrix-display">${matrix}</div>
                <div class="overlay-text" id="exco-display">${exco}</div>
            `;
            
            // Adjust positions based on your template
            // You may need to tweak these values
            positionText(name, matrix, exco);
            
            previewContainer.style.display = 'block';
        };
        reader.readAsDataURL(templateFile);
    });
    
    downloadBtn.addEventListener('click', function() {
        // Use html2canvas to capture the preview
        html2canvas(letterPreview).then(canvas => {
            // Use jsPDF to create PDF
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm'
            });
            
            // Add image to PDF
            const imgData = canvas.toDataURL('image/png');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('NOTIS AMARAN KETIDAKHADIRAN PROGRAM MTKT.pdf');
        });
    });
    
    // Adjust text positions based on your template
    function positionText(name, matrix, exco) {
        // You'll need to adjust these values based on your specific template
        // This is just a starting point
        const nameDisplay = document.getElementById('name-display');
        const matrixDisplay = document.getElementById('matrix-display');
        const excoDisplay = document.getElementById('exco-display');
        
        // Example positions - adjust these to match your template
        nameDisplay.style.top = '40.7%';
        nameDisplay.style.left = '33%';
        
        matrixDisplay.style.top = '42.2%';
        matrixDisplay.style.left = '33%';
        
        excoDisplay.style.top = '43.8%';
        excoDisplay.style.left = '33%';
    }
});