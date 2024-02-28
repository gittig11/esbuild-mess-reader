import create_external_state from 'state_mini'
import Epub from 'epubjs'

// Epub 实例
const useState_book_instance = create_external_state()
export const useValue_book_instance = () => useState_book_instance().value
export const get_book_instance = () => useState_book_instance.get()

// loading
const useState_book_loading = create_external_state()
export const useValue_book_loading = () => useState_book_loading().value

// 书的目录
const useState_toc = create_external_state()
useState_book_instance.subscribe(async (book) => {
  useState_toc.set2(null)
  navigation = await book.loaded.navigation
  useState_toc.set2(navigation.toc)
})
export const useValue_toc = () => useState_toc().value

// 设置 Epub 实例
export const make_book = async (source) => {
  if (source) {
    const book = Epub()
    useState_book_loading.set2(true)
    await book.open(source) // http://epubjs.org/documentation/0.3///bookopen
    useState_book_loading.set2(false)
    useState_book_instance.set2(book)
  } else {
    useState_book_instance.set2(null)
    useState_toc.set2(null)
  }
}
