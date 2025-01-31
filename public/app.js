// Sample data to populate the table
const files = [
    { name: file.name, size: buffer.length, type: 'pdf' },
    { name: 'IMAGE.jpg', size: '500 KB', type: 'jpg' }
  ];
  
  // Function to create the table
  function populateFilesTable() {
    const tableContainer = document.querySelector('.files-table');
    tableContainer.innerHTML = `
      <div class="files-table-header">
        <div class="column-header table-cell">Name</div>
        <div class="column-header table-cell size-cell">Size</div>
      </div>
    `;
  
    files.forEach(file => {
      const row = document.createElement('div');
      row.classList.add('files-table-row');
      row.innerHTML = `
        <div class="table-cell name-cell ${file.type}">${file.name}</div>
        <div class="table-cell size-cell">${file.size}</div>
      `;
      tableContainer.appendChild(row);
    });
  }
  
  // Call the function to populate the table
  populateFilesTable();