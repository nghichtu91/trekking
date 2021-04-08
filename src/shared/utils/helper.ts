interface IHelperClass {
  getContainer: React.ReactNode | HTMLElement
}

class Helper implements IHelperClass {
  getContainer = () => document.getElementById('popup')
}

const helper = new Helper()
export default helper
