const fs = require('fs');
const path = require('path');

let file = {
  // 递归删除文件和文件夹
  remove(filePath) {
    if (!fs.existsSync(filePath)) {
      throw new Error("无效目录:" + filePath);
    }
    let files = fs.readdirSync(filePath);
    for (let file of files) {
      let subFilePath = path.join(filePath, file);
      let stats = fs.statSync(subFilePath);
      if (stats.isDirectory()) {
        // 递归
        this.remove(subFilePath);
      } else {
        // 删除文件
        fs.unlinkSync(subFilePath);
      }
    }
    // 删除目录
    fs.rmdirSync(filePath);
  },
  // 递归复制文件和文件夹
  copy(oldFilePath, newFilePath) {
    if (!fs.existsSync(oldFilePath)) {
      throw new Error("无效目录:" + oldFilePath);
    }
    if (!fs.existsSync(newFilePath)) {
      // 创建目录
      fs.mkdirSync(newFilePath);
    }
    let files = fs.readdirSync(oldFilePath);
    for (let file of files) {
      let subOldFilePath = path.join(oldFilePath, file);  // 旧文件和目录
      let subNewFilePath = path.join(newFilePath, file);  // 新文件和目录
      let stats = fs.statSync(subOldFilePath);
      if (stats.isDirectory()) {
        // 递归
        this.copy(subOldFilePath, subNewFilePath);
      } else {
        // 复制文件
        fs.copyFileSync(subOldFilePath, subNewFilePath);
      }
    }
  },
  // 递归创建目录
  mkdirsSync(dirname, mode) {
    if (fs.existsSync(dirname)) {
      return true;
    } else {
      if (this.mkdirsSync(path.dirname(dirname), mode)) {
        fs.mkdirSync(dirname, mode);
        return true;
      }
    }
  }
}
module.exports = file;