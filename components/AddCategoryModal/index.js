import { useFormik } from "formik";
import validationSchema from "@/pages/validations/addCategoryValidations";
import {
    MDBContainer,
    MDBRow,
    MDBCardBody,
} from 'mdb-react-ui-kit';
import { addCategory } from "@/pages/api/categories";

export default function AddCategoryModal() {

    const { handleSubmit, handleChange, values, errors, touched, handleBlur, isSubmitting, setSubmitting, resetForm, dirty } = useFormik({
        initialValues:{
            categoryName:'',
        },
        onSubmit:(values,{resetForm})=>{
            addCategory(values);
            resetForm();
        },
        validationSchema,
    })
    
  return (
    <>
    {/* <!-- Modal toggle --> */}
    <button data-modal-target="defaultModal1" data-modal-toggle="defaultModal1" className="rounded-md bg-amber-500 px-3 py-2 text-sm border-none font-semibold text-white shadow-sm hover:bg-amber-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type="button">
      Kategori Ekle
    </button>
    
    {/* <!-- Main modal --> */}
    <div id="defaultModal1" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative w-full max-w-2xl max-h-full">
            {/* <!-- Modal content --> */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                {/* <!-- Modal header --> */}
                <div className="flex items-start justify-between p-3 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Kategori Ekle :
                    </h3>
                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal1">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                {/* <!-- Modal body --> */}
                <div className="container py-2">
                    <div className="lg:w-full mx-auto flex flex-wrap">
                        <MDBContainer>
                            <MDBRow>
                                <MDBCardBody>
                                    <MDBRow className='py-2 px-2'>
                                    <input type="text" name="categoryName" id="categoryName" placeholder="Kategori Adı" value={values.categoryName} onChange={handleChange} onBlur={handleBlur} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                    {errors.categoryName && touched.categoryName && (<div className="bg-red-100 border border-red-400 text-red-700 px-2 py-1 mt-1 rounded relative" role="alert">{errors.categoryName}</div>)}
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBRow>
                        </MDBContainer>
                    </div>
                </div>
                {/* <!-- Modal footer --> */}
                <div className="flex items-center p-2 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button data-modal-hide="defaultModal1" type="submit" className="ml-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Kaydet</button>
                </div>
                </form>
            </div>
        </div>
    </div> 
    </> 
  )
}