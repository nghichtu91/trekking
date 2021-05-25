interface IHelperClass {
  getContainer: React.ReactNode | HTMLElement
  fileSizeValid: (fileUpload: File) => boolean
}

class Helper implements IHelperClass {
  getContainer = () => document.getElementById('popup')
  fileSizeValid = (fileUpload: File): boolean => {
    if (fileUpload.size > 1024000) {
      return false
    }
    return true
  }
}

const helper = new Helper()
export default helper
