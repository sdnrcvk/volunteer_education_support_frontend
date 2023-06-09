import { FaEdit } from "react-icons/fa";
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardBody,
} from 'mdb-react-ui-kit';
import { useFormik } from "formik";
import { getAllCategories } from "@/pages/api/categories";
import { useState, useEffect } from "react";
import validationSchema from "@/pages/validations/addCourseValidations";
import { getCourseDetailByCourseId, updateCourse } from "@/pages/api/courses";

export default function EditCourseDetailModal({courseId}) {
    const [categories, setCategories]=useState([])
    const [courseDetail,setCourseDetail]=useState()


    useEffect(()=>{
        getAllCategories().then(data => {
            setCategories(data);
        }).catch(err => {
            console.log(err);
        });
    },[])
  
    useEffect(()=>{
        if(courseId){
          getCourseDetailByCourseId(courseId).then(data => {
            setCourseDetail(data);
          }).catch(err => {
            console.log(err);
          });
        }
      },[courseId])

      useEffect(() => {
        if (courseDetail) {
            resetForm({
                values: {
                    courseTitle: courseDetail.title || "",
                    category: courseDetail.category_id || "",
                    description: courseDetail.description || ""
                }
            });
        }
    }, [courseDetail]);

    const { handleSubmit, handleChange, values, errors, touched, handleBlur, resetForm } = useFormik({
        initialValues:{
            courseTitle:"",
            category:"",
            description:"" ,
        },
        onSubmit:values=>{
            updateCourse(values,courseId);
        },
        validationSchema,
    })
    
  return (
    <>
    {/* <!-- Modal toggle --> */}
    <button data-modal-target="defaultModal" data-modal-toggle="defaultModal" className="rounded-full w-10 h-10 bg-amber-200 p-0 border-0 inline-flex items-center justify-center hover:bg-amber-300 hover:text-amber-500 text-gray-500 ml-4" type="button">
        <FaEdit className="w-5 h-5"/>
    </button>
    
    {/* <!-- Main modal --> */}
    <div id="defaultModal" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative w-full max-w-2xl max-h-full">
            {/* <!-- Modal content --> */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                {/* <!-- Modal header --> */}
                <div className="flex items-start justify-between p-3 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Ders Düzenle :
                    </h3>
                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    {/* <!-- Modal body --> */}
                    <div className="container py-4">
                        <div className="lg:w-full mx-auto flex flex-wrap">
                            {/* Kişisel Bilgiler */}
                            <MDBContainer>
                                <MDBRow>
                                    <MDBCol lg="4">
                                        <MDBCard className="mb-4">
                                        <MDBCardBody className="text-center">
                                            <div className="mx-auto flex flex-wrap">
                                            <img alt="ecommerce" className="mx-auto object-cover object-center rounded border border-gray-200" src="https://images.unsplash.com/photo-1537495329792-41ae41ad3bf0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"/>
                                            </div>
                                        </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                    <MDBCol lg="8">
                                        <MDBCard className="mb-4">
                                        <MDBCardBody>
                                            <MDBRow className='py-2'>
                                            <input type="text" name="courseTitle" id="courseTitle" placeholder="Ders İlanı Başlık" value={values.courseTitle} onChange={handleChange} onBlur={handleBlur} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                            {errors.courseTitle && touched.courseTitle && (<div className="bg-red-100 border border-red-400 text-red-700 px-2 py-1 mt-1 rounded relative" role="alert">{errors.courseTitle}</div>)}
                                            </MDBRow>
                                            <hr />
                                            <MDBRow className='py-2'>
                                            <select id="category" name="category" value={values.category} onChange={handleChange} onBlur={handleBlur}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                                <option>Kategori Seçiniz</option>
                                                {categories?.map((category) => (
                                                    <option key={category.id} value={category.id}>{category.category_name}</option>
                                                ))}
                                            </select>
                                            {errors.category && touched.category && (<div className="bg-red-100 border border-red-400 text-red-700 px-2 py-1 mt-1 rounded relative" role="alert">{errors.category}</div>)}
                                            </MDBRow>
                                            <hr />
                                            <MDBRow className='py-2'>
                                            <textarea id="description" name="description" rows="10" value={values.description} onChange={handleChange} onBlur={handleBlur} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder='İlan hakkında bir şeyler yaz...'></textarea>
                                            {errors.description && touched.description && (<div className="bg-red-100 border border-red-400 text-red-700 px-2 py-1 mt-1 rounded relative" role="alert">{errors.description}</div>)}
                                            </MDBRow>
                                        </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                </MDBRow>
                            </MDBContainer>
                        </div>
                    </div>
                    {/* <!-- Modal footer --> */}
                    <div className="flex items-center p-2 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button data-modal-hide="defaultModal" type="submit" className="ml-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Kaydet</button>
                    </div>
                </form>
            </div>
        </div>
    </div> 
    </> 
  )
}