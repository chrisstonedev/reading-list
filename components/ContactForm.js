export default function ContactForm() {
    return (
        <div className="w-full max-w-xs">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" name="request" method="POST"
                  data-netlify="true" action="/success">
                <input type="hidden" name="form-name" value="feedback"/>
                <div className="mb-4">
                    <label htmlFor="title">
                        Book title:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text" id="title"/>
                </div>
                <div className="mb-4">
                    <label htmlFor="author">
                        Author:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text" id="author"/>
                </div>
                <div className="mb-4">
                    <label htmlFor="comments">
                        Comments:
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="comments"/>
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            type="submit">Send
                    </button>
                </div>
            </form>
        </div>
    )
}