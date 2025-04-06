function formatFileName(str) {
    return str
      .normalize('NFD')                    // Tách ký tự có dấu thành ký tự + dấu
      .replace(/[\u0300-\u036f]/g, '')     // Xoá các dấu
      .replace(/đ/g, 'd')                  // Chuyển đ -> d
      .replace(/Đ/g, 'D')                  // Chuyển Đ -> D
      .replace(/\s+/g, '_')                // Thay khoảng trắng bằng "_"
      .toLowerCase();                      // (tuỳ chọn) chuyển thành chữ thường
  }

module.exports = {
    formatFileName
}